package ci.company.eduops.school.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.notification.service.MailService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.domain.SchoolStatus;
import ci.company.eduops.school.dto.request.SignupRequest;
import ci.company.eduops.school.dto.response.SignupResponse;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.entity.AppRole;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.jwt.JwtTokenProvider;
import ci.company.eduops.security.repository.AppRoleRepository;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.service.EduOpsUserDetails;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.domain.TermStatus;
import ci.company.eduops.term.domain.TermType;
import ci.company.eduops.term.repository.TermRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Month;
import java.time.OffsetDateTime;
import java.util.Map;

/**
 * Public self-service signup.
 *
 * <p>Creates, in one transaction, everything a school needs to be usable:
 * the school itself, its main campus, the current academic year with three
 * terms, and the administrator account.</p>
 *
 * <p>Runs with the tenant bypass, because the school it is about to create does
 * not exist yet. Every later request is confined by Row-Level Security.</p>
 */
@Service
public class SignupService {

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);

    private final SchoolRepository schoolRepository;
    private final CampusRepository campusRepository;
    private final AcademicYearRepository academicYearRepository;
    private final TermRepository termRepository;
    private final AppUserRepository userRepository;
    private final AppRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final MailService mailService;
    private final AuditService auditService;
    private final SignupProvisioningService provisioningService;
    private final EduOpsProperties properties;

    public SignupService(SchoolRepository schoolRepository,
                         CampusRepository campusRepository,
                         AcademicYearRepository academicYearRepository,
                         TermRepository termRepository,
                         AppUserRepository userRepository,
                         AppRoleRepository roleRepository,
                         PasswordEncoder passwordEncoder,
                         JwtTokenProvider tokenProvider,
                         MailService mailService,
                         AuditService auditService,
                         SignupProvisioningService provisioningService,
                         EduOpsProperties properties) {
        this.schoolRepository = schoolRepository;
        this.campusRepository = campusRepository;
        this.academicYearRepository = academicYearRepository;
        this.termRepository = termRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.mailService = mailService;
        this.auditService = auditService;
        this.provisioningService = provisioningService;
        this.properties = properties;
    }

    @Transactional
    @TenantBypass
    public SignupResponse signup(SignupRequest request) {
        return TenantContext.runWithoutTenant(() -> doSignup(request));
    }

    private SignupResponse doSignup(SignupRequest request) {
        validate(request);

        String code = request.getSchoolCode().trim().toUpperCase();
        String email = request.getEmail().trim().toLowerCase();

        if (schoolRepository.existsByCode(code)) {
            throw BusinessException.of(ErrorCode.CONFLICT,
                            "Ce code établissement est déjà utilisé.")
                    .detail("field", "schoolCode");
        }
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw BusinessException.of(ErrorCode.CONFLICT,
                            "Un compte existe déjà avec cet email.")
                    .detail("field", "email");
        }

        School school = createSchool(request, code);
        Campus campus = createMainCampus(school, request);
        AcademicYear year = createCurrentAcademicYear(school);
        createTerms(year);
        AppUser admin = createAdministrator(request, school, email);

        // Ce que le visiteur a decrit dans « Composer ma demo » devient reel.
        // Dans la meme transaction : une ecole a moitie configuree est plus
        // difficile a reparer qu'une ecole vide, parce que personne ne sait
        // ce qui manque.
        SignupProvisioningService.Provisioned provisioned =
                provisioningService.provision(school, year, request.getOperations());

        auditService.record(AuditAction.CREATE, "School", school.getId())
                .label(school.getName())
                .school(school.getId())
                .newValue(Map.<String, Object>of(
                        "code", school.getCode(),
                        "admin", email,
                        "campus", campus.getCode(),
                        "academicYear", year.getCode(),
                        "cycles", String.valueOf(provisioned.getCycles()),
                        "levels", String.valueOf(provisioned.getLevels()),
                        "classrooms", String.valueOf(provisioned.getClassrooms()),
                        "subjects", String.valueOf(provisioned.getSubjects())))
                .save();

        sendWelcomeEmail(admin, school);

        log.info("Nouvelle école '{}' ({}) créée par {}", school.getName(), code, email);
        return buildResponse(school, admin, year, provisioned);
    }

    private void validate(SignupRequest request) {
        if (!request.isAcceptedTerms()) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                            "Vous devez accepter les conditions d'utilisation.")
                    .detail("field", "acceptedTerms");
        }
        String password = request.getPassword();
        boolean strong = password.length() >= properties.getSecurity().getPasswordMinLength()
                && password.chars().anyMatch(Character::isUpperCase)
                && password.chars().anyMatch(Character::isLowerCase)
                && password.chars().anyMatch(Character::isDigit);
        if (!strong) {
            throw BusinessException.of(ErrorCode.PASSWORD_POLICY_VIOLATION,
                            "Le mot de passe doit contenir au moins "
                            + properties.getSecurity().getPasswordMinLength()
                            + " caractères, dont une majuscule, une minuscule et un chiffre.")
                    .detail("field", "password");
        }
    }

    private School createSchool(SignupRequest request, String code) {
        School school = new School();
        school.setCode(code);
        school.setName(request.getSchoolName().trim());
        school.setCity(request.getCity());
        if (request.getCountry() != null && !request.getCountry().isBlank()) {
            school.setCountry(request.getCountry().trim());
        }
        school.setPhone(request.getSchoolPhone());
        school.setEmail(request.getEmail().trim().toLowerCase());
        if (request.getCurrency() != null && !request.getCurrency().isBlank()) {
            school.setCurrency(request.getCurrency().toUpperCase());
        }
        school.setStatus(SchoolStatus.ACTIVE);
        // Numbering patterns default to the school's own code.
        school.setStudentNumberPattern(code + "-{year}-{seq:6}");
        school.setReceiptNumberPattern("REC-{year}-{seq:8}");
        school.setInvoiceNumberPattern("INV-{year}-{seq:8}");
        return schoolRepository.save(school);
    }

    private Campus createMainCampus(School school, SignupRequest request) {
        Campus campus = new Campus();
        campus.setSchool(school);
        campus.setCode("PRINCIPAL");
        campus.setName("Campus principal");
        campus.setCity(request.getCity());
        campus.setPhone(request.getSchoolPhone());
        campus.setMain(true);
        campus.setStatus(CommonStatus.ACTIVE);
        return campusRepository.save(campus);
    }

    /**
     * Opens the academic year that matches today's date. A school year is
     * assumed to start in September, so signing up in March lands on the year
     * that began the previous September.
     */
    private AcademicYear createCurrentAcademicYear(School school) {
        LocalDate today = LocalDate.now();
        int startYear = today.getMonthValue() >= Month.SEPTEMBER.getValue()
                ? today.getYear()
                : today.getYear() - 1;

        AcademicYear year = new AcademicYear();
        year.setSchool(school);
        year.setCode(startYear + "-" + (startYear + 1));
        year.setLabel("Année scolaire " + startYear + "-" + (startYear + 1));
        year.setStartDate(LocalDate.of(startYear, 9, 15));
        year.setEndDate(LocalDate.of(startYear + 1, 7, 10));
        year.setStatus(AcademicYearStatus.ACTIVE);
        year.setEnrollmentOpenAt(OffsetDateTime.now().minusDays(1));
        year.setEnrollmentCloseAt(OffsetDateTime.now().plusMonths(10));
        return academicYearRepository.save(year);
    }

    /** Three trimesters, the common arrangement; editable afterwards. */
    private void createTerms(AcademicYear year) {
        int startYear = year.getStartDate().getYear();
        record TermSpec(String code, String name, LocalDate from, LocalDate to) {
        }
        var specs = java.util.List.of(
                new TermSpec("T1", "1er trimestre",
                        LocalDate.of(startYear, 9, 15), LocalDate.of(startYear, 12, 20)),
                new TermSpec("T2", "2e trimestre",
                        LocalDate.of(startYear + 1, 1, 5), LocalDate.of(startYear + 1, 3, 28)),
                new TermSpec("T3", "3e trimestre",
                        LocalDate.of(startYear + 1, 4, 6), LocalDate.of(startYear + 1, 7, 10)));

        int sequence = 1;
        for (TermSpec spec : specs) {
            Term term = new Term();
            term.setAcademicYear(year);
            term.setCode(spec.code());
            term.setName(spec.name());
            term.setTermType(TermType.TRIMESTER);
            term.setSequence(sequence);
            term.setStartDate(spec.from());
            term.setEndDate(spec.to());
            term.setStatus(sequence == 1 ? TermStatus.OPEN : TermStatus.PLANNED);
            termRepository.save(term);
            sequence++;
        }
    }

    private AppUser createAdministrator(SignupRequest request, School school, String email) {
        AppRole schoolAdmin = roleRepository.findByCode("SCHOOL_ADMIN")
                .orElseThrow(() -> new IllegalStateException(
                        "Rôle SCHOOL_ADMIN absent : la migration V30 a-t-elle été appliquée ?"));

        AppUser admin = new AppUser();
        admin.setUsername(email);
        admin.setEmail(email);
        admin.setFirstName(request.getFirstName().trim());
        admin.setLastName(request.getLastName().trim());
        admin.setPhone(request.getPhone());
        admin.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        admin.setStatus(UserStatus.ACTIVE);
        admin.setMustChangePassword(false);
        admin.setSchoolId(school.getId());
        admin.addRole(schoolAdmin);
        return userRepository.save(admin);
    }

    private void sendWelcomeEmail(AppUser admin, School school) {
        mailService.sendTemplate(admin.getEmail(), "ACCOUNT_CREATED", Map.<String, Object>of(
                "firstName", admin.getFirstName(),
                "schoolName", school.getName(),
                "username", admin.getUsername(),
                "temporaryPassword", "(celui que vous avez choisi)",
                "appBaseUrl", properties.getApp().getBaseUrl()));
    }

    private SignupResponse buildResponse(School school, AppUser admin, AcademicYear year,
                                         SignupProvisioningService.Provisioned provisioned) {
        EduOpsUserDetails principal = new EduOpsUserDetails(admin);

        SignupResponse response = new SignupResponse();
        response.setSchoolId(school.getId());
        response.setSchoolCode(school.getCode());
        response.setSchoolName(school.getName());
        response.setUserId(admin.getId());
        response.setEmail(admin.getEmail());
        response.setFullName(admin.fullName());
        response.setAcademicYearId(year.getId());
        response.setAcademicYearCode(year.getCode());
        response.setAccessToken(tokenProvider.generateAccessToken(principal));
        response.setRefreshToken(tokenProvider.generateRefreshToken(principal));
        response.setExpiresIn(tokenProvider.accessTokenValiditySeconds());
        // L'assistant n'a de sens que s'il reste quelque chose a poser. Quand
        // le parcours « Composer ma demo » a deja cree cycles, niveaux et
        // classes, l'y envoyer le ferait buter sur son propre refus : il
        // s'interdit de tourner deux fois pour ne pas doubler les classes.
        // C'est une friction que la creation a l'inscription a introduite ;
        // elle se resout ici, en disant simplement la verite au client.
        response.setOnboardingRequired(provisioned.isEmpty());
        return response;
    }
}
