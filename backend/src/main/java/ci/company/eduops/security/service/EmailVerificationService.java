package ci.company.eduops.security.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.notification.service.MailService;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.EmailVerificationToken;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.repository.EmailVerificationTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.Optional;
import java.util.UUID;

/**
 * Confirmation de l'adresse e-mail d'un compte.
 *
 * <h2>Garanties</h2>
 * <ul>
 *   <li>Le jeton fait 256 bits issus de {@link SecureRandom} ; seule son
 *       empreinte SHA-256 est stockée.</li>
 *   <li>Usage unique, durée de vie limitée, et un nouvel envoi invalide les
 *       liens précédents.</li>
 *   <li>Le renvoi répond toujours de la même façon, que l'adresse existe ou
 *       non : il ne sert pas à découvrir quelles adresses ont un compte.</li>
 *   <li>Délai minimal entre deux envois et plafond horaire par compte, pour
 *       que le formulaire ne serve pas à inonder une boîte de réception.</li>
 * </ul>
 */
@Service
public class EmailVerificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailVerificationService.class);
    private static final SecureRandom RANDOM = new SecureRandom();

    private final EmailVerificationTokenRepository tokenRepository;
    private final AppUserRepository userRepository;
    private final MailService mailService;
    private final EduOpsProperties properties;
    private final AuditService auditService;
    private final SchoolRepository schoolRepository;

    public EmailVerificationService(EmailVerificationTokenRepository tokenRepository,
                                    AppUserRepository userRepository,
                                    MailService mailService,
                                    EduOpsProperties properties,
                                    AuditService auditService,
                                    SchoolRepository schoolRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.properties = properties;
        this.auditService = auditService;
        this.schoolRepository = schoolRepository;
    }

    /**
     * Émet un jeton et envoie le message. À appeler dans la transaction qui a
     * créé le compte (ou dans celle du renvoi).
     */
    @Transactional(propagation = org.springframework.transaction.annotation.Propagation.MANDATORY)
    public void issueAndSend(AppUser user, String schoolName, String requestIp) {
        OffsetDateTime now = OffsetDateTime.now();
        tokenRepository.invalidateOpenTokens(user.getId(), now);

        String rawToken = generateToken();
        int ttlHours = properties.getSecurity().getEmailVerificationTtlHours();

        EmailVerificationToken token = new EmailVerificationToken();
        token.setUser(user);
        token.setTokenHash(hash(rawToken));
        token.setExpiresAt(now.plusHours(ttlHours));
        token.setRequestIp(truncate(requestIp, 64));
        tokenRepository.save(token);

        String link = properties.getApp().getBaseUrl().replaceAll("/+$", "")
                + "/verify-email?token=" + rawToken;
        mailService.sendHtml(user.getEmail(),
                EmailVerificationMail.subject(),
                EmailVerificationMail.html(user.getFirstName(), schoolName, link, ttlHours),
                EmailVerificationMail.text(user.getFirstName(), schoolName, link, ttlHours));
        // Le lien n'est volontairement jamais journalisé.
        log.info("Verification email queued for user {}", user.getId());
    }

    /** Crée et envoie le jeton dans une transaction ouverte après le commit de l'inscription. */
    @TenantBypass
    @Transactional(propagation = org.springframework.transaction.annotation.Propagation.REQUIRES_NEW)
    public void issueAndSendAfterCommit(UUID userId, String schoolName, String requestIp) {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "Signup administrator disappeared before email verification was queued"));
        issueAndSend(user, schoolName, requestIp);
    }

    /** Consomme le jeton et active le compte. */
    @TenantBypass
    @Transactional(noRollbackFor = BusinessException.class)
    public void verify(String rawToken) {
        if (rawToken == null || rawToken.isBlank() || rawToken.length() > 128) {
            throw BusinessException.of(ErrorCode.TOKEN_INVALID);
        }
        EmailVerificationToken token = tokenRepository.findByTokenHash(hash(rawToken.trim()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.TOKEN_INVALID));

        AppUser user = token.getUser();
        if (token.getConsumedAt() != null) {
            // Lien déjà utilisé : si le compte est actif, l'objectif est atteint.
            if (user.isEmailVerified() && user.getStatus() == UserStatus.ACTIVE) {
                return;
            }
            throw BusinessException.of(ErrorCode.TOKEN_INVALID);
        }
        if (!token.isUsable()) {
            throw BusinessException.of(ErrorCode.TOKEN_EXPIRED);
        }
        if (user.getStatus() == UserStatus.DISABLED || user.getStatus() == UserStatus.ARCHIVED) {
            // Un compte désactivé par un administrateur ne se réactive pas par e-mail.
            throw BusinessException.of(ErrorCode.ACCOUNT_DISABLED);
        }

        token.consume();
        tokenRepository.save(token);
        tokenRepository.invalidateOpenTokens(user.getId(), OffsetDateTime.now());
        user.markEmailVerified();
        userRepository.save(user);

        auditService.record(ci.company.eduops.audit.domain.AuditAction.UPDATE,
                        "AppUser", user.getId())
                .label(user.getEmail())
                .school(user.getSchoolId())
                .reason("EMAIL_VERIFIED")
                .save();
    }

    /**
     * Renvoie le lien de confirmation. Silencieux : aucune différence visible
     * entre « adresse inconnue », « déjà confirmée » et « envoyé ».
     */
    @TenantBypass
    @Transactional
    public void resend(String email, String requestIp) {
        if (email == null || email.isBlank()) {
            return;
        }
        Optional<AppUser> found = userRepository.findByEmailIgnoreCase(email.trim());
        if (found.isEmpty()) {
            return;
        }
        AppUser user = found.get();
        if (user.getStatus() != UserStatus.PENDING || user.isEmailVerified()) {
            return;
        }

        OffsetDateTime now = OffsetDateTime.now();
        EduOpsProperties.Security security = properties.getSecurity();
        Optional<OffsetDateTime> last = tokenRepository.lastIssuedAt(user.getId());
        if (last.isPresent() && last.get().isAfter(
                now.minus(Duration.ofSeconds(security.getEmailVerificationResendCooldownSeconds())))) {
            return;
        }
        if (tokenRepository.countIssuedSince(user.getId(), now.minusHours(1))
                >= security.getEmailVerificationMaxPerHour()) {
            log.warn("Verification email cap reached for user {}", user.getId());
            return;
        }
        issueAndSend(user, schoolLabel(user), requestIp);
    }

    private String schoolLabel(AppUser user) {
        if (user.getSchoolId() == null) {
            return "votre établissement";
        }
        return schoolRepository.findById(user.getSchoolId())
                .map(ci.company.eduops.school.domain.School::getName)
                .orElse("votre établissement");
    }

    private static String generateToken() {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    static String hash(String rawToken) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                    .digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 indisponible", ex);
        }
    }

    private static String truncate(String value, int max) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.length() <= max ? value : value.substring(0, max);
    }
}
