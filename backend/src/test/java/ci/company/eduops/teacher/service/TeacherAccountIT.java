package ci.company.eduops.teacher.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.support.AbstractIntegrationTest;
import ci.company.eduops.teacher.dto.TeacherCreateRequest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.support.TransactionTemplate;
import java.time.LocalDate;
import java.util.UUID;
import static org.assertj.core.api.Assertions.*;

class TeacherAccountIT extends AbstractIntegrationTest {
    @Autowired TeacherCreateService create;
    @Autowired TeacherQueryService queries;
    @Autowired TeacherAccountService accounts;
    @Autowired JdbcTemplate jdbc;
    @Autowired TransactionTemplate transactions;
    @MockitoBean AuditService audit;
    UUID school, user;

    @BeforeEach void fixture() {
        school = UUID.randomUUID(); user = UUID.randomUUID();
        transactions.executeWithoutResult(tx -> {
            jdbc.execute("select set_config('app.bypass_rls','on',true)");
            jdbc.update("insert into school(id,code,name) values (?,?,?)", school, "IT-" + school.toString().substring(0,8), "École test");
            jdbc.update("insert into app_user(id,school_id,username,email,password_hash,first_name,last_name,status) values (?,?,?,?,?,?,?,'ACTIVE')",
                    user, school, user.toString(), user + "@example.test", "unused-test-hash", "Ada", "Koffi");
            jdbc.update("insert into app_user_role(user_id,role_id) select ?,id from app_role where code='TEACHER' and school_id is null", user);
        });
        TenantContext.setSchoolId(school);
    }
    @AfterEach void clear() { TenantContext.clear(); }

    @Test void createPersistsLinkAndUserIdentityAndRemovesAccountFromCandidates() {
        assertThat(accounts.available()).extracting(a -> a.id()).containsExactly(user);
        var result = create.create(new TeacherCreateRequest(user, "Mathématiques", "Master", LocalDate.now(), ContractType.PERMANENT, 24));
        assertThat(result.getUserAccountId()).isEqualTo(user);
        assertThat(result.getFullName()).isEqualTo("Ada Koffi");
        assertThat(accounts.available()).isEmpty();
        assertThatThrownBy(() -> create.create(new TeacherCreateRequest(user, null, null, LocalDate.now(), ContractType.PERMANENT, 24)))
                .isInstanceOf(BusinessException.class);
        transactions.executeWithoutResult(tx -> {
            jdbc.execute("select set_config('app.bypass_rls','on',true)");
            jdbc.update("update app_user set first_name='Adèle' where id=?", user);
        });
        assertThat(queries.detail(result.getId()).getFullName()).isEqualTo("Adèle Koffi");
        assertThat(queries.search(0,20,"Adèle",null).getContent()).hasSize(1);
        TenantContext.setSchoolId(UUID.randomUUID());
        assertThat(accounts.available()).isEmpty();
        assertThatThrownBy(() -> queries.detail(result.getId())).isInstanceOf(BusinessException.class);
    }

    @Test void searchOrdersByTheAccountNameNotTheStaleCopiedColumn() {
        UUID other = UUID.randomUUID();
        transactions.executeWithoutResult(tx -> {
            jdbc.execute("select set_config('app.bypass_rls','on',true)");
            jdbc.update("insert into app_user(id,school_id,username,email,password_hash,first_name,last_name,status) values (?,?,?,?,?,?,?,'ACTIVE')",
                    other, school, other.toString(), other + "@example.test", "unused-test-hash", "Mike", "Mike");
            jdbc.update("insert into app_user_role(user_id,role_id) select ?,id from app_role where code='TEACHER' and school_id is null", other);
        });
        // La fiche garde le nom copié à sa création ; le compte, lui, est renommé.
        create.create(new TeacherCreateRequest(user, null, null, LocalDate.now(), ContractType.PERMANENT, 24));
        create.create(new TeacherCreateRequest(other, null, null, LocalDate.now(), ContractType.PERMANENT, 24));
        transactions.executeWithoutResult(tx -> {
            jdbc.execute("select set_config('app.bypass_rls','on',true)");
            jdbc.update("update app_user set last_name='Zulu' where id=?", user);
        });
        // « Zulu » se classe après « Mike » parce que c'est le nom affiché : la
        // colonne teacher.last_name, restée à « Koffi », classerait l'inverse.
        assertThat(queries.search(0, 10, "", null).getContent())
                .extracting(row -> row.getLastName()).containsExactly("Mike", "Zulu");
    }

    @Test void legacyFileCanBeLinkedWithoutChangingItsIdentifier() {
        UUID teacher = UUID.randomUUID();
        transactions.executeWithoutResult(tx -> {
            jdbc.execute("select set_config('app.bypass_rls','on',true)");
            jdbc.update("insert into teacher(id,school_id,employee_number,first_name,last_name,email,hire_date) values (?,?,?,?,?,?,?)",
                    teacher, school, "ENS-OLD", "Ada", "Koffi", user + "@example.test", LocalDate.now());
        });
        accounts.linkExisting(teacher, user);
        assertThat(queries.detail(teacher).getUserAccountId()).isEqualTo(user);
        assertThat(queries.detail(teacher).getEmployeeNumber()).isEqualTo("ENS-OLD");
    }

    @Test void rosterStartsFromTheAccountAndAttachesTheFileOnceCreated() {
        // Avant la fiche : le compte au profil Enseignant est déjà une ligne, et
        // cette ligne porte l'action qui crée la fiche.
        var before = queries.roster(0, 20, "", null);
        assertThat(before.getContent()).hasSize(1);
        assertThat(before.getContent().get(0).getUserAccountId()).isEqualTo(user);
        assertThat(before.getContent().get(0).isHasTeacherRecord()).isFalse();
        assertThat(before.getContent().get(0).getFullName()).isEqualTo("Ada Koffi");
        assertThat(before.getContent().get(0).getEmployeeNumber()).isNull();

        var fiche = create.create(new TeacherCreateRequest(user, "Mathématiques", null,
                LocalDate.now(), ContractType.PERMANENT, 24));

        // Après la fiche : une seule ligne, qui porte maintenant le matricule.
        var after = queries.roster(0, 20, "", null);
        assertThat(after.getContent()).hasSize(1);
        assertThat(after.getContent().get(0).getId()).isEqualTo(fiche.getId());
        assertThat(after.getContent().get(0).isHasTeacherRecord()).isTrue();
        assertThat(after.getContent().get(0).getEmployeeNumber()).isNotBlank();
        assertThat(after.getContent().get(0).getSpeciality()).isEqualTo("Mathématiques");
    }

    @Test void rosterKeepsALegacyFileWithoutAccountAndSearchesItsEmployeeNumber() {
        UUID legacy = UUID.randomUUID();
        transactions.executeWithoutResult(tx -> {
            jdbc.execute("select set_config('app.bypass_rls','on',true)");
            jdbc.update("insert into teacher(id,school_id,employee_number,first_name,last_name,email,hire_date) values (?,?,?,?,?,?,?)",
                    legacy, school, "ENS-OLD", "Bintou", "Sanogo", "legacy-" + legacy + "@example.test", LocalDate.now());
        });
        // Le compte et la fiche restée sans compte sont deux lignes distinctes :
        // sans la seconde, plus aucun écran ne permettrait de la rattacher.
        var rows = queries.roster(0, 20, "", null);
        assertThat(rows.getContent()).extracting(r -> r.getEmployeeNumber())
                .containsExactlyInAnyOrder(null, "ENS-OLD");
        assertThat(queries.roster(0, 20, "ENS-OLD", null).getContent())
                .extracting(r -> r.getFullName()).containsExactly("Bintou Sanogo");
    }
}
