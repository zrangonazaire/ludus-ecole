package ci.company.eduops.tenant;

import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.school.dto.request.SignupRequest;
import ci.company.eduops.school.dto.response.SignupResponse;
import ci.company.eduops.school.service.SignupService;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.support.AbstractIntegrationTest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Proves that one school cannot read another's data.
 *
 * <p>This is the test that matters most now that EduOps is a public service. It
 * deliberately goes <em>around</em> the service layer and queries the tables
 * directly: if isolation only worked because a service remembered to filter,
 * these assertions would fail. They pass because PostgreSQL Row-Level Security
 * (migration V31) enforces it below the application.</p>
 */
class TenantIsolationIT extends AbstractIntegrationTest {

    @Autowired
    private SignupService signupService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TransactionTemplate transactionTemplate;

    @PersistenceContext
    private EntityManager entityManager;

    private UUID schoolA;
    private UUID schoolB;

    @BeforeEach
    void createTwoSchools() {
        schoolA = signup("ALPHA", "alpha@example.test").getSchoolId();
        schoolB = signup("BETA", "beta@example.test").getSchoolId();
        insertStudent(schoolA, "ALPHA-2026-000001", "Aya", "Kone");
        insertStudent(schoolB, "BETA-2026-000001", "Yao", "Brou");
        TenantContext.clear();
    }

    @Test
    @DisplayName("l'ecole A ne voit que ses propres eleves")
    @Transactional
    void schoolOnlySeesItsOwnStudents() {
        TenantContext.setSchoolId(schoolA);
        applyTenant();

        assertThat(visibleStudentNumbers()).containsExactly("ALPHA-2026-000001");
    }

    @Test
    @DisplayName("l'ecole B ne voit pas les eleves de l'ecole A")
    @Transactional
    void schoolCannotSeeAnotherSchoolStudents() {
        TenantContext.setSchoolId(schoolB);
        applyTenant();

        List<String> visible = visibleStudentNumbers();

        assertThat(visible).containsExactly("BETA-2026-000001");
        assertThat(visible).doesNotContain("ALPHA-2026-000001");
    }

    @Test
    @DisplayName("un COUNT global ne compte que le tenant courant")
    @Transactional
    void countIsScopedToTheTenant() {
        TenantContext.setSchoolId(schoolA);
        applyTenant();
        assertThat(studentRepository.count()).isEqualTo(1L);

        TenantContext.setSchoolId(schoolB);
        applyTenant();
        assertThat(studentRepository.count()).isEqualTo(1L);
    }

    @Test
    @DisplayName("sans tenant defini, aucune donnee metier n'est lisible")
    @Transactional
    void nothingIsVisibleWithoutATenant() {
        TenantContext.clear();
        applyTenant();

        // Fails closed: an unidentified caller sees nothing at all.
        assertThat(visibleStudentNumbers()).isEmpty();
    }

    @Test
    @DisplayName("les annees scolaires sont isolees comme les eleves")
    @Transactional
    void academicYearsAreIsolatedToo() {
        TenantContext.setSchoolId(schoolA);
        applyTenant();

        List<UUID> owners = visibleAcademicYearOwners();

        assertThat(owners).containsExactly(schoolA);
    }

    @Test
    @DisplayName("les profils personnalises sont isoles mais les profils systeme restent visibles")
    @Transactional
    void customAccessProfilesAreIsolated() {
        insertAccessProfile(schoolA, "SURVEILLANT", "Surveillant Alpha");
        insertAccessProfile(schoolB, "SURVEILLANT", "Surveillant Beta");

        TenantContext.setSchoolId(schoolA);
        applyTenant();

        assertThat(visibleCustomProfileOwners()).containsExactly(schoolA);
        assertThat(visibleSystemProfileCount()).isGreaterThan(0L);
    }

    // ------------------------------------------------------------------
    // helpers
    // ------------------------------------------------------------------

    /**
     * Reads straight from the table, bypassing every repository and service.
     * The raw {@code Query} returns an untyped list, hence the explicit cast.
     */
    @SuppressWarnings("unchecked")
    private List<String> visibleStudentNumbers() {
        return (List<String>) entityManager
                .createNativeQuery("SELECT student_number FROM student")
                .getResultList();
    }

    @SuppressWarnings("unchecked")
    private List<UUID> visibleAcademicYearOwners() {
        return (List<UUID>) entityManager
                .createNativeQuery("SELECT school_id FROM academic_year")
                .getResultList();
    }

    @SuppressWarnings("unchecked")
    private List<UUID> visibleCustomProfileOwners() {
        return (List<UUID>) entityManager
                .createNativeQuery("SELECT school_id FROM app_role WHERE system_role = false")
                .getResultList();
    }

    private long visibleSystemProfileCount() {
        return ((Number) entityManager
                .createNativeQuery("SELECT count(*) FROM app_role WHERE system_role = true")
                .getSingleResult()).longValue();
    }

    /** Mirrors what TenantTransactionAspect does on a real request. */
    private void applyTenant() {
        UUID schoolId = TenantContext.getSchoolId();
        entityManager
                .createNativeQuery("SELECT set_config('app.current_school_id', :value, true)")
                .setParameter("value", schoolId == null ? "" : schoolId.toString())
                .getSingleResult();
        entityManager
                .createNativeQuery("SELECT set_config('app.bypass_rls', 'off', true)")
                .getSingleResult();
    }

    private SignupResponse signup(String code, String email) {
        SignupRequest request = new SignupRequest();
        request.setSchoolName("Ecole " + code);
        request.setSchoolCode(code);
        request.setCity("Abidjan");
        request.setCurrency("XOF");
        request.setFirstName("Admin");
        request.setLastName(code);
        request.setEmail(email);
        request.setPassword("MotDePasse2026");
        request.setAcceptedTerms(true);
        return signupService.signup(request);
    }

    /**
     * Inserts the fixture with the RLS bypass.
     *
     * <p>Uses a TransactionTemplate rather than {@code @Transactional}: this is
     * called from {@code @BeforeEach} within the same class, and a self-call
     * would never go through the transactional proxy. The bypass and the INSERT
     * must share one transaction for {@code set_config(..., true)} to apply.</p>
     */
    private void insertStudent(UUID schoolId, String number, String firstName, String lastName) {
        transactionTemplate.executeWithoutResult(status -> {
            entityManager
                    .createNativeQuery("SELECT set_config('app.bypass_rls', 'on', true)")
                    .getSingleResult();
            entityManager.createNativeQuery("""
                            INSERT INTO student (school_id, student_number, first_name, last_name,
                                                 gender, birth_date, status)
                            VALUES (:school, :number, :first, :last,
                                    CAST('FEMALE' AS gender), :birth, CAST('ACTIVE' AS student_status))
                            """)
                    .setParameter("school", schoolId)
                    .setParameter("number", number)
                    .setParameter("first", firstName)
                    .setParameter("last", lastName)
                    .setParameter("birth", LocalDate.of(2012, 5, 14))
                    .executeUpdate();
        });
    }

    private void insertAccessProfile(UUID schoolId, String code, String label) {
        transactionTemplate.executeWithoutResult(status -> {
            entityManager
                    .createNativeQuery("SELECT set_config('app.bypass_rls', 'on', true)")
                    .getSingleResult();
            entityManager.createNativeQuery("""
                            INSERT INTO app_role (code, label, description, system_role, school_id)
                            VALUES (:code, :label, 'Profil de test', false, :school)
                            """)
                    .setParameter("code", code)
                    .setParameter("label", label)
                    .setParameter("school", schoolId)
                    .executeUpdate();
        });
    }
}
