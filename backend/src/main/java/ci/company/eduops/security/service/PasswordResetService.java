package ci.company.eduops.security.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.notification.service.MailService;
import ci.company.eduops.security.dto.PasswordResetConfirmRequest;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.PasswordResetToken;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.repository.PasswordResetTokenRepository;
import ci.company.eduops.security.repository.RefreshTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Map;
import java.util.Optional;

/** Issues one-time password reset links without revealing whether an email exists. */
@Service
public class PasswordResetService {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String TEMPLATE_CODE = "PASSWORD_RESET";

    private final AppUserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EduOpsProperties properties;
    private final MailService mailService;

    public PasswordResetService(AppUserRepository userRepository,
                                PasswordResetTokenRepository tokenRepository,
                                RefreshTokenRepository refreshTokenRepository,
                                PasswordEncoder passwordEncoder,
                                EduOpsProperties properties,
                                MailService mailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
        this.mailService = mailService;
    }

    @TenantBypass
    @Transactional
    public void requestReset(String email) {
        Optional<AppUser> found = userRepository.findByEmailIgnoreCase(email.trim());
        if (found.isEmpty()) {
            return;
        }

        AppUser user = found.get();
        if (user.getStatus() != UserStatus.ACTIVE && user.getStatus() != UserStatus.LOCKED) {
            return;
        }

        int ttlMinutes = Math.max(1, properties.getSecurity().getPasswordResetTtlMinutes());
        OffsetDateTime now = OffsetDateTime.now();
        int cooldownSeconds = Math.max(0,
                properties.getSecurity().getPasswordResetResendCooldownSeconds());
        Optional<OffsetDateTime> last = tokenRepository.lastIssuedAt(user.getId());
        if (last.isPresent() && last.get().isAfter(now.minus(Duration.ofSeconds(cooldownSeconds)))) {
            return;
        }
        int maxPerHour = Math.max(1, properties.getSecurity().getPasswordResetMaxPerHour());
        if (tokenRepository.countIssuedSince(user.getId(), now.minusHours(1)) >= maxPerHour) {
            return;
        }
        tokenRepository.invalidateOpenForUser(user.getId(), now);

        String rawToken = generateToken();
        PasswordResetToken token = new PasswordResetToken();
        token.setUser(user);
        token.setTokenHash(hash(rawToken));
        token.setExpiresAt(now.plusMinutes(ttlMinutes));
        tokenRepository.save(token);

        String baseUrl = properties.getApp().getBaseUrl().replaceAll("/+$", "");
        String resetUrl = baseUrl + "/reset-password?token=" + rawToken;
        mailService.sendTemplate(user.getEmail(), TEMPLATE_CODE, Map.of(
                "firstName", user.getFirstName(),
                "resetUrl", resetUrl,
                "expiryMinutes", ttlMinutes));
    }

    @TenantBypass
    @Transactional
    public void confirmReset(PasswordResetConfirmRequest request) {
        if (request.getNewPassword().length() < properties.getSecurity().getPasswordMinLength()) {
            throw BusinessException.of(ErrorCode.PASSWORD_POLICY_VIOLATION);
        }

        PasswordResetToken token = tokenRepository.lockByTokenHash(hash(request.getToken().trim()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.TOKEN_INVALID));
        if (!token.isUsable()) {
            throw BusinessException.of(token.getUsedAt() == null
                    ? ErrorCode.TOKEN_EXPIRED
                    : ErrorCode.TOKEN_INVALID);
        }

        AppUser user = token.getUser();
        if (user.getStatus() == UserStatus.DISABLED || user.getStatus() == UserStatus.ARCHIVED
                || user.getStatus() == UserStatus.PENDING) {
            throw BusinessException.of(ErrorCode.ACCOUNT_DISABLED);
        }

        token.consume();
        tokenRepository.save(token);
        tokenRepository.invalidateOpenForUser(user.getId(), OffsetDateTime.now());

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setMustChangePassword(false);
        if (user.getStatus() == UserStatus.LOCKED) {
            user.setStatus(UserStatus.ACTIVE);
        }
        userRepository.save(user);
        refreshTokenRepository.revokeAllForUser(user.getId(), OffsetDateTime.now());
    }

    private static String generateToken() {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private static String hash(String rawToken) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                    .digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 is unavailable", ex);
        }
    }
}
