package ci.company.eduops.security.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.security.dto.AuthResponse;
import ci.company.eduops.security.dto.ChangePasswordRequest;
import ci.company.eduops.security.dto.CurrentUserResponse;
import ci.company.eduops.security.dto.LoginRequest;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.RefreshToken;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.jwt.JwtTokenProvider;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.repository.RefreshTokenRepository;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.teacher.repository.TeacherRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

/** Issues and rotates sessions for application accounts. */
@Service
public class AuthenticationService {

    private final AppUserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TeacherRepository teacherRepository;
    private final GuardianRepository guardianRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final EduOpsProperties properties;
    private final CurrentUser currentUser;
    private final AuditService auditService;

    /**
     * Une empreinte contre laquelle comparer quand le compte n'existe pas.
     *
     * <p>Calculee au demarrage sur un secret aleatoire : aucune valeur n'est
     * ecrite dans le depot, et aucun mot de passe ne peut y correspondre. Son
     * seul role est de faire durer un echec « compte inconnu » aussi longtemps
     * qu'un echec « mot de passe faux ».</p>
     */
    private final String decoyHash;

    public AuthenticationService(AppUserRepository userRepository,
                                 RefreshTokenRepository refreshTokenRepository,
                                 TeacherRepository teacherRepository,
                                 GuardianRepository guardianRepository,
                                 StudentRepository studentRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtTokenProvider tokenProvider,
                                 EduOpsProperties properties,
                                 CurrentUser currentUser,
                                 AuditService auditService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.teacherRepository = teacherRepository;
        this.guardianRepository = guardianRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.properties = properties;
        this.currentUser = currentUser;
        this.auditService = auditService;
        this.decoyHash = passwordEncoder.encode(UUID.randomUUID().toString());
    }

    /**
     * Authenticates before a tenant is known. Failed-attempt counters deliberately
     * commit even when the request ends with a business error.
     */
    @TenantBypass
    @Transactional(noRollbackFor = BusinessException.class)
    public AuthResponse login(LoginRequest request, String userAgent, String ipAddress) {
        String login = request.getLogin().trim();
        AppUser user = userRepository.findByLogin(login).orElse(null);

        if (user == null) {
            // Le message ne distingue pas « ce compte n'existe pas » de « mot
            // de passe faux » : cette distinction offre a un attaquant
            // l'annuaire du personnel, et les identifiants d'ecole suivent
            // souvent la forme prenom.nom.
            //
            // Encore faut-il que le temps de reponse ne la donne pas quand
            // meme. Sans cette verification a vide, une adresse inconnue
            // repondait en quelques millisecondes et une adresse connue en
            // plusieurs centaines — BCrypt facteur 12 est lent par
            // construction. L'ecart se mesure depuis n'importe quel navigateur
            // et rend le message prudent inutile.
            passwordEncoder.matches(request.getPassword(), decoyHash);
            // Sans ecole : l'identifiant ne correspond a aucun compte, donc a
            // aucun etablissement. La ligne n'apparaitra dans aucun journal —
            // c'est le prix a payer pour ne pas creer un canal ou deviner
            // l'appartenance d'un identifiant inconnu.
            auditService.logLogin(null, null, login, false,
                    ErrorCode.INVALID_CREDENTIALS.name());
            throw BusinessException.of(ErrorCode.INVALID_CREDENTIALS);
        }

        if (user.isCurrentlyLocked()) {
            auditService.logLogin(user.getId(), user.getSchoolId(), login, false,
                    ErrorCode.ACCOUNT_LOCKED.name());
            throw BusinessException.of(ErrorCode.ACCOUNT_LOCKED);
        }
        if (user.getStatus() != UserStatus.ACTIVE && user.getStatus() != UserStatus.LOCKED) {
            auditService.logLogin(user.getId(), user.getSchoolId(), login, false,
                    ErrorCode.ACCOUNT_DISABLED.name());
            throw BusinessException.of(ErrorCode.ACCOUNT_DISABLED);
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            user.registerFailedLogin(
                    properties.getSecurity().getMaxFailedLogins(),
                    properties.getSecurity().getLockDurationMinutes());
            userRepository.save(user);
            ErrorCode refusal = user.isCurrentlyLocked()
                    ? ErrorCode.ACCOUNT_LOCKED
                    : ErrorCode.INVALID_CREDENTIALS;
            // Le mot de passe n'est evidemment pas consigne, ni sa longueur :
            // seule la tentative l'est.
            auditService.logLogin(user.getId(), user.getSchoolId(), login, false,
                    refusal.name());
            throw BusinessException.of(refusal);
        }

        auditService.logLogin(user.getId(), user.getSchoolId(), login, true, null);
        user.registerSuccessfulLogin();
        userRepository.save(user);
        return issueSession(user, userAgent, ipAddress);
    }

    /** Rotates a persisted refresh token and returns a complete new session. */
    @TenantBypass
    @Transactional
    public AuthResponse refresh(String rawToken, String userAgent, String ipAddress) {
        Claims claims = parseRefreshToken(rawToken);
        RefreshToken stored = refreshTokenRepository.findByTokenHash(tokenProvider.hash(rawToken))
                .orElseThrow(() -> BusinessException.of(ErrorCode.TOKEN_INVALID));
        if (!stored.isUsable()) {
            throw BusinessException.of(ErrorCode.TOKEN_EXPIRED);
        }

        UUID claimedUserId = tokenProvider.extractUserId(claims);
        AppUser user = stored.getUser();
        if (claimedUserId == null || !claimedUserId.equals(user.getId())) {
            throw BusinessException.of(ErrorCode.TOKEN_INVALID);
        }
        ensureCanAuthenticate(user);

        stored.revoke();
        refreshTokenRepository.save(stored);
        return issueSession(user, userAgent, ipAddress);
    }

    @Transactional(readOnly = true)
    public CurrentUserResponse me() {
        EduOpsUserDetails principal = currentUser.require();
        AppUser user = userRepository.findById(principal.getUserId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.UNAUTHENTICATED));

        CurrentUserResponse response = new CurrentUserResponse();
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setFullName(user.fullName());
        response.setSchoolId(user.getSchoolId());
        response.setMustChangePassword(user.isMustChangePassword());
        response.setRoles(user.roleCodes());
        response.setPermissions(user.permissionCodes());
        teacherRepository.findByUserAccountId(user.getId())
                .ifPresent(profile -> response.setTeacherId(profile.getId()));
        guardianRepository.findByUserAccountId(user.getId())
                .ifPresent(profile -> response.setGuardianId(profile.getId()));
        studentRepository.findByUserAccountId(user.getId())
                .ifPresent(profile -> response.setStudentId(profile.getId()));
        return response;
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        AppUser user = userRepository.findById(currentUser.requireId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.UNAUTHENTICATED));
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw BusinessException.of(ErrorCode.INVALID_CREDENTIALS);
        }
        if (request.getNewPassword().length() < properties.getSecurity().getPasswordMinLength()) {
            throw BusinessException.of(ErrorCode.PASSWORD_POLICY_VIOLATION);
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setMustChangePassword(false);
        userRepository.save(user);
        refreshTokenRepository.revokeAllForUser(user.getId(), OffsetDateTime.now());
    }

    private AuthResponse issueSession(AppUser user, String userAgent, String ipAddress) {
        EduOpsUserDetails principal = new EduOpsUserDetails(user);
        String accessToken = tokenProvider.generateAccessToken(principal);
        String refreshToken = tokenProvider.generateRefreshToken(principal);

        RefreshToken stored = new RefreshToken();
        stored.setUser(user);
        stored.setTokenHash(tokenProvider.hash(refreshToken));
        stored.setExpiresAt(OffsetDateTime.now()
                .plusSeconds(tokenProvider.refreshTokenValiditySeconds()));
        stored.setUserAgent(truncate(userAgent, 255));
        stored.setIpAddress(truncate(ipAddress, 64));
        refreshTokenRepository.save(stored);

        AuthResponse response = new AuthResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setExpiresIn(tokenProvider.accessTokenValiditySeconds());
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFullName(user.fullName());
        response.setSchoolId(user.getSchoolId());
        response.setMustChangePassword(user.isMustChangePassword());
        response.setRoles(user.roleCodes());
        response.setPermissions(user.permissionCodes());
        return response;
    }

    private Claims parseRefreshToken(String rawToken) {
        try {
            Claims claims = tokenProvider.parse(rawToken);
            if (!tokenProvider.isRefreshToken(claims)) {
                throw BusinessException.of(ErrorCode.TOKEN_INVALID);
            }
            return claims;
        } catch (ExpiredJwtException ex) {
            throw BusinessException.of(ErrorCode.TOKEN_EXPIRED);
        } catch (JwtException | IllegalArgumentException ex) {
            throw BusinessException.of(ErrorCode.TOKEN_INVALID);
        }
    }

    private void ensureCanAuthenticate(AppUser user) {
        if (user.isCurrentlyLocked()) {
            throw BusinessException.of(ErrorCode.ACCOUNT_LOCKED);
        }
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw BusinessException.of(ErrorCode.ACCOUNT_DISABLED);
        }
    }

    private String truncate(String value, int maxLength) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.length() <= maxLength ? value : value.substring(0, maxLength);
    }
}
