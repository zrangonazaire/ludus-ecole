package ci.company.eduops.dashboard.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.dashboard.dto.response.AcademicYearSummary;
import ci.company.eduops.dashboard.dto.response.ChartData;
import ci.company.eduops.dashboard.dto.response.ChartSeries;
import ci.company.eduops.dashboard.dto.response.ClassroomSummary;
import ci.company.eduops.dashboard.dto.response.DashboardAlertItem;
import ci.company.eduops.dashboard.dto.response.DashboardResponse;
import ci.company.eduops.dashboard.dto.response.FinancialBreakdown;
import ci.company.eduops.dashboard.dto.response.KpiValue;
import ci.company.eduops.dashboard.dto.response.TermSummary;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.repository.TermRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * The home screen.
 *
 * <p>Written for the school that has just signed up as much as for the one in
 * mid-term. On the first morning there are no pupils, no classes and no
 * payments — and that is a normal state. Every collection comes back empty,
 * every ratio guards its denominator, and the screen shows a school waiting to
 * be set up rather than « Une erreur est survenue », which is precisely the
 * wrong thing to tell someone on their first visit.</p>
 *
 * <p>Nothing here is invented. A figure that cannot be computed is absent, not
 * filled with a plausible number: a dashboard that shows a 92 % attendance
 * rate for a school with no pupils teaches its user to distrust every other
 * figure on the page.</p>
 */
@Service
public class DashboardService {

    private static final Logger log = LoggerFactory.getLogger(DashboardService.class);

    /** Au-delà, la classe est signalée comme trop chargée. */
    private static final double CROWDED_RATIO = 0.95;
    /** En deçà, elle est signalée comme sous-remplie. */
    private static final double SPARSE_RATIO = 0.40;

    private final AcademicYearRepository academicYearRepository;
    private final TermRepository termRepository;
    private final ClassroomRepository classroomRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final SchoolRepository schoolRepository;

    public DashboardService(AcademicYearRepository academicYearRepository,
                            TermRepository termRepository,
                            ClassroomRepository classroomRepository,
                            EnrollmentRepository enrollmentRepository,
                            StudentFeeRepository studentFeeRepository,
                            SchoolRepository schoolRepository) {
        this.academicYearRepository = academicYearRepository;
        this.termRepository = termRepository;
        this.classroomRepository = classroomRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.schoolRepository = schoolRepository;
    }

    /** Builds the home screen for the active year. */
    @Transactional(readOnly = true)
    public DashboardResponse load(UUID academicYearId, UUID campusId) {
        UUID schoolId = requireSchoolId();
        DashboardResponse response = new DashboardResponse();
        response.setCampusName(schoolRepository.findById(schoolId)
                .map(School::getName).orElse(""));

        AcademicYear year = academicYearId != null
                ? academicYearRepository.findById(academicYearId).orElse(null)
                : academicYearRepository
                        .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                        .orElse(null);

        if (year == null) {
            // Une école dont l'année n'est pas encore ouverte n'est pas une
            // erreur : c'est l'étape 1 de la configuration. On renvoie un
            // tableau de bord vide, avec le message qui dit quoi faire.
            response.getAlerts().add(new DashboardAlertItem(
                    "no-year", "SETUP", "INFO",
                    "Aucune année scolaire ouverte",
                    "Ouvrez une année scolaire pour commencer à inscrire des élèves."));
            log.debug("Dashboard requested for school {} with no active year", schoolId);
            return response;
        }

        response.setAcademicYear(toYear(year));
        termRepository.findCoveringDate(year.getId(), LocalDate.now())
                .ifPresent((term) -> response.setCurrentTerm(toTerm(term)));

        List<Classroom> classrooms =
                classroomRepository.findByAcademicYearIdAndStatus(
                        year.getId(), ClassroomStatus.ACTIVE);
        long pupils = enrollmentRepository.countActiveForYear(year.getId());

        response.setKpis(buildKpis(year, pupils, classrooms));
        response.setEnrollmentByLevel(enrollmentByLevel(classrooms));
        response.setFinancialBreakdown(financialBreakdown(year.getId()));
        response.setClassesNeedingAttention(classesNeedingAttention(classrooms));
        response.getAlerts().addAll(buildAlerts(year, pupils, classrooms));
        return response;
    }

    // ------------------------------------------------------------------ KPI

    private List<KpiValue> buildKpis(AcademicYear year, long pupils,
                                      List<Classroom> classrooms) {
        List<KpiValue> kpis = new ArrayList<>();

        kpis.add(kpi("students", "Élèves inscrits", pupils,
                String.valueOf(pupils), pupils == 0 ? "warning" : "neutral", "👥"));

        kpis.add(kpi("classes", "Classes ouvertes", classrooms.size(),
                String.valueOf(classrooms.size()),
                classrooms.isEmpty() ? "warning" : "neutral", "🏫"));

        int seats = classrooms.stream().mapToInt(Classroom::getCapacityMaximum).sum();
        // Le taux de remplissage n'a de sens qu'avec des places : sans classe,
        // il est absent plutot que zero. « 0 % » laisserait croire a un
        // etablissement desert alors qu'il n'est pas encore configure.
        if (seats > 0) {
            long rate = Math.round(pupils * 100.0 / seats);
            kpis.add(kpi("occupancy", "Taux de remplissage", rate, rate + " %",
                    rate > 95 ? "warning" : "success", "📊"));
        }

        BigDecimal outstanding = outstandingTotal(year.getId());
        if (outstanding.signum() > 0) {
            kpis.add(kpi("outstanding", "Impayés", outstanding,
                    format(outstanding) + " F", "danger", "💰"));
        }
        return kpis;
    }

    private KpiValue kpi(String key, String label, Object value,
                         String formatted, String tone, String icon) {
        KpiValue item = new KpiValue(key, label, value, formatted, tone);
        item.setIcon(icon);
        return item;
    }

    // --------------------------------------------------------------- charts

    /** Effectifs par niveau, à partir des classes ouvertes. */
    private ChartData enrollmentByLevel(List<Classroom> classrooms) {
        ChartData chart = ChartData.empty();
        if (classrooms.isEmpty()) {
            return chart;
        }
        Map<String, Long> byLevel = new LinkedHashMap<>();
        for (Classroom classroom : classrooms) {
            String level = classroom.getLevel() != null
                    ? classroom.getLevel().getName() : "Sans niveau";
            byLevel.merge(level,
                    enrollmentRepository.countOccupiedSeats(classroom.getId()), Long::sum);
        }
        chart.setCategories(new ArrayList<>(byLevel.keySet()));
        chart.setSeries(List.of(new ChartSeries("Élèves",
                new ArrayList<>(byLevel.values()))));
        return chart;
    }

    private FinancialBreakdown financialBreakdown(UUID yearId) {
        FinancialBreakdown breakdown = new FinancialBreakdown();
        BigDecimal due = BigDecimal.ZERO;
        BigDecimal paid = BigDecimal.ZERO;

        for (StudentFee fee : studentFeeRepository.findAllOutstandingForYear(yearId)) {
            due = due.add(fee.getAmountDue() != null ? fee.getAmountDue() : BigDecimal.ZERO);
            paid = paid.add(fee.getAmountPaid() != null ? fee.getAmountPaid() : BigDecimal.ZERO);
        }
        if (due.signum() == 0) {
            return breakdown;
        }
        breakdown.setLabels(List.of("Encaissé", "Reste dû"));
        breakdown.setValues(List.of(paid, due.subtract(paid).max(BigDecimal.ZERO)));
        return breakdown;
    }

    private BigDecimal outstandingTotal(UUID yearId) {
        BigDecimal total = BigDecimal.ZERO;
        for (StudentFee fee : studentFeeRepository.findAllOutstandingForYear(yearId)) {
            BigDecimal remaining = fee.getAmountRemaining() != null
                    ? fee.getAmountRemaining()
                    : safe(fee.getAmountDue()).subtract(safe(fee.getAmountPaid()));
            if (remaining.signum() > 0) {
                total = total.add(remaining);
            }
        }
        return total.setScale(2, RoundingMode.HALF_UP);
    }

    // -------------------------------------------------------------- attention

    /**
     * Classes worth a decision: nearly full, or nearly empty.
     *
     * <p>A class at 38 of 35 needs a second section; one at 8 of 35 probably
     * ought to be merged. Both cost money, and neither shows up anywhere else
     * until it is too late in the term to act.</p>
     */
    private List<ClassroomSummary> classesNeedingAttention(List<Classroom> classrooms) {
        List<ClassroomSummary> rows = new ArrayList<>();
        for (Classroom classroom : classrooms) {
            int capacity = classroom.getCapacityMaximum();
            if (capacity <= 0) {
                continue;
            }
            long occupied = enrollmentRepository.countOccupiedSeats(classroom.getId());
            double ratio = occupied / (double) capacity;
            String reason = null;
            if (ratio >= CROWDED_RATIO) {
                reason = occupied + " élèves pour " + capacity + " places";
            } else if (ratio > 0 && ratio <= SPARSE_RATIO) {
                reason = "Seulement " + occupied + " élèves sur " + capacity + " places";
            }
            if (reason == null) {
                continue;
            }
            ClassroomSummary row = new ClassroomSummary();
            row.setId(classroom.getId());
            row.setName(classroom.getName());
            row.setLevelName(classroom.getLevel() != null
                    ? classroom.getLevel().getName() : "");
            row.setCapacityMaximum(capacity);
            row.setCurrentEnrollment((int) occupied);
            row.setReason(reason);
            rows.add(row);
        }
        return rows;
    }

    /**
     * What to tell the head teacher this morning.
     *
     * <p>On an empty school these are setup steps, not failures. Saying « no
     * class yet » is useful; saying « an error occurred » is not.</p>
     */
    private List<DashboardAlertItem> buildAlerts(AcademicYear year, long pupils,
                                                  List<Classroom> classrooms) {
        List<DashboardAlertItem> alerts = new ArrayList<>();
        if (classrooms.isEmpty()) {
            alerts.add(new DashboardAlertItem("no-class", "SETUP", "INFO",
                    "Aucune classe ouverte",
                    "Créez vos classes pour pouvoir inscrire des élèves."));
        } else if (pupils == 0) {
            alerts.add(new DashboardAlertItem("no-pupil", "SETUP", "INFO",
                    "Aucun élève inscrit",
                    "Inscrivez vos premiers élèves, un par un ou par import Excel."));
        }
        if (termRepository.findByAcademicYearIdOrderBySequenceAsc(year.getId()).isEmpty()) {
            alerts.add(new DashboardAlertItem("no-term", "SETUP", "WARNING",
                    "Aucun trimestre défini",
                    "Sans trimestre, ni les notes ni les bulletins ne peuvent être saisis."));
        }
        return alerts;
    }

    // ------------------------------------------------------------ conversion

    private AcademicYearSummary toYear(AcademicYear year) {
        AcademicYearSummary summary = new AcademicYearSummary();
        summary.setId(year.getId());
        summary.setCode(year.getCode());
        summary.setLabel(year.getLabel());
        summary.setStartDate(year.getStartDate());
        summary.setEndDate(year.getEndDate());
        summary.setStatus(year.getStatus().name());
        return summary;
    }

    private TermSummary toTerm(Term term) {
        TermSummary summary = new TermSummary();
        summary.setId(term.getId());
        summary.setAcademicYearId(term.getAcademicYear().getId());
        summary.setName(term.getName());
        summary.setCode(term.getCode());
        summary.setSequence(term.getSequence());
        summary.setStartDate(term.getStartDate());
        summary.setEndDate(term.getEndDate());
        summary.setStatus(term.getStatus().name());
        return summary;
    }

    private String format(BigDecimal amount) {
        return amount.setScale(0, RoundingMode.HALF_UP).toPlainString();
    }

    private BigDecimal safe(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }

    private UUID requireSchoolId() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
