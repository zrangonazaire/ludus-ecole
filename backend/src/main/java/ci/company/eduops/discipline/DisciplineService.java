package ci.company.eduops.discipline;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * Registre de discipline : incidents et mesures.
 *
 * <h2>Pourquoi {@link BusinessException} et pas {@code ResponseStatusException}</h2>
 *
 * <p>Ce service levait des {@code ResponseStatusException} portant les bons
 * statuts — 400, 403, 404, 409. Aucun ne parvenait au navigateur. Le
 * {@code GlobalExceptionHandler} n'avait pas de méthode pour ce type, et son
 * {@code @ExceptionHandler(Exception.class)} l'attrapait : chaque refus
 * ressortait en <strong>500 INTERNAL_ERROR</strong>. « Aucune inscription
 * active à la date de l'incident » — la réponse exacte, calculée correctement —
 * s'affichait « Erreur interne. Le support a été notifié. », et l'écran, qui
 * distingue pourtant 400 et 409 pour choisir son message, ne voyait jamais que
 * des 500.</p>
 *
 * <p>{@link ErrorCode} est le contrat avec Angular : un code stable que la
 * table de traduction transforme en phrase française. Un statut HTTP nu n'en
 * dit pas assez — 409 couvre aussi bien « incident clôturé » que « quelqu'un
 * d'autre l'a modifié », et les deux appellent des gestes différents.</p>
 */
@Service
@Transactional
public class DisciplineService {

    /** Le message part vers une famille ivoirienne : jour, mois, année. */
    private static final DateTimeFormatter FRENCH_DATE = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final JdbcTemplate jdbc;

    public DisciplineService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private UUID school() {
        UUID id = TenantContext.getSchoolId();
        if (id == null) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED,
                    "Aucun établissement n'est associé à cette session.");
        }
        return id;
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> list() {
        var rows = jdbc.queryForList("""
            SELECT i.id, i.reference, i.student_id AS "studentId",
              s.first_name || ' ' || s.last_name AS "studentName", c.name AS "classroomName",
              i.incident_date::text AS "incidentDate", i.incident_type::text AS "incidentType",
              i.severity::text AS severity, i.description, i.location, i.status::text AS status,
              i.guardian_informed AS "guardianInformed", i.version
            FROM discipline_incident i JOIN student s ON s.id=i.student_id
            JOIN classroom c ON c.id=i.classroom_id WHERE s.school_id=?
            ORDER BY i.incident_date DESC, i.reported_at DESC
            """, school());
        for (var row : rows) {
            row.put("actions", jdbc.queryForList("""
                SELECT id, action_type::text AS "actionType", description FROM disciplinary_action
                WHERE incident_id=? ORDER BY decided_at
                """, row.get("id")));
        }
        return rows;
    }

    public void create(DisciplineController.IncidentRequest r) {
        var enrollments = jdbc.queryForList("""
            SELECT e.id, e.classroom_id, e.academic_year_id FROM enrollment e
            JOIN student s ON s.id=e.student_id JOIN academic_year y ON y.id=e.academic_year_id
            WHERE s.id=? AND s.school_id=? AND e.status IN ('ACTIVE','VALIDATED')
            AND ? BETWEEN y.start_date AND y.end_date ORDER BY e.enrollment_date DESC LIMIT 1
            """, r.studentId(), school(), r.incidentDate());
        if (enrollments.isEmpty()) {
            // Le message nomme les deux causes reelles, parce qu'aucune ne se
            // corrige sur cet ecran : la date hors annee scolaire, et
            // l'inscription encore en attente de validation.
            throw new BusinessException(ErrorCode.INCIDENT_STUDENT_NOT_ENROLLED,
                    "Cet élève n'a aucune inscription active au "
                            + FRENCH_DATE.format(r.incidentDate())
                            + ". Vérifiez que la date tombe dans l'année scolaire en cours "
                            + "et que son inscription est validée.")
                    .detail("incidentDate", r.incidentDate().toString());
        }
        var e = enrollments.getFirst();
        jdbc.update("""
            INSERT INTO discipline_incident(student_id,enrollment_id,classroom_id,academic_year_id,
              reference,incident_type,severity,incident_date,description,location)
            VALUES (?,?,?,?,?,?::incident_type,?::incident_severity,?,?,?)
            """, r.studentId(), e.get("id"), e.get("classroom_id"), e.get("academic_year_id"),
            reference(), r.incidentType(), r.severity(), r.incidentDate(),
            r.description().trim(), r.location());
    }

    /**
     * La référence portée par l'incident.
     *
     * <p>« INC- » suivi d'un UUID fait exactement 40 caractères, la largeur de
     * la colonne : cela tient, sans un caractère de marge. Raccourcir l'UUID
     * serait tentant pour la lisibilité, mais {@code reference} est unique sur
     * toute la table, tous établissements confondus — huit caractères
     * hexadécimaux entrent en collision bien avant cent mille incidents, et
     * cette collision se manifesterait par un enregistrement refusé sans
     * raison visible. La longueur reste donc entière ; c'est la colonne qu'il
     * faudra élargir le jour où le préfixe change.</p>
     */
    private String reference() {
        return "INC-" + UUID.randomUUID();
    }

    private Map<String, Object> lock(UUID id) {
        var rows = jdbc.queryForList("""
            SELECT i.* FROM discipline_incident i JOIN student s ON s.id=i.student_id
            WHERE i.id=? AND s.school_id=? FOR UPDATE OF i
            """, id, school());
        if (rows.isEmpty()) {
            throw new BusinessException(ErrorCode.INCIDENT_NOT_FOUND,
                    "Cet incident est introuvable dans le registre de l'établissement.");
        }
        var row = rows.getFirst();
        if (Set.of("CLOSED", "CANCELLED").contains(String.valueOf(row.get("status")))) {
            throw new BusinessException(ErrorCode.INCIDENT_CLOSED,
                    "Cet incident est clôturé : il reste consultable, mais son suivi "
                            + "et ses mesures ne changent plus.");
        }
        return row;
    }

    public void update(UUID id, DisciplineController.UpdateRequest r) {
        var row = lock(id);
        if (((Number) row.get("version")).longValue() != r.version()) {
            throw new BusinessException(ErrorCode.CONCURRENT_MODIFICATION,
                    "Cet incident a été modifié entre-temps. Rechargez le registre "
                            + "avant d'enregistrer votre suivi.");
        }
        jdbc.update("""
            UPDATE discipline_incident SET status=?::incident_status, guardian_informed=?,
              guardian_informed_at=CASE WHEN ? THEN COALESCE(guardian_informed_at,now()) ELSE NULL END,
              closed_at=CASE WHEN ? IN ('CLOSED','CANCELLED') THEN now() ELSE NULL END,
              version=version+1 WHERE id=?
            """, r.status(), r.guardianInformed(), r.guardianInformed(), r.status(), id);
    }

    public void action(UUID id, DisciplineController.ActionRequest r) {
        var row = lock(id);
        jdbc.update("""
            INSERT INTO disciplinary_action(incident_id,student_id,action_type,description)
            VALUES (?,?,?::disciplinary_action_type,?)
            """, id, row.get("student_id"), r.actionType(), r.description().trim());
        jdbc.update("UPDATE discipline_incident SET status='ACTION_TAKEN',version=version+1 WHERE id=?", id);
    }
}
