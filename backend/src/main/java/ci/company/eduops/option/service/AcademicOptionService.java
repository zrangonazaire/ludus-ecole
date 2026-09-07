package ci.company.eduops.option.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.option.domain.AcademicOption;
import ci.company.eduops.option.domain.OptionCategory;
import ci.company.eduops.option.domain.OptionChoiceStatus;
import ci.company.eduops.option.domain.OptionOffering;
import ci.company.eduops.option.domain.StudentOptionChoice;
import ci.company.eduops.option.dto.AcademicOptionResponse;
import ci.company.eduops.option.dto.OptionChoiceAssignRequest;
import ci.company.eduops.option.dto.OptionChoiceResponse;
import ci.company.eduops.option.dto.OptionChoiceStatusRequest;
import ci.company.eduops.option.dto.OptionLevelResponse;
import ci.company.eduops.option.dto.OptionOfferingResponse;
import ci.company.eduops.option.dto.OptionOfferingsSaveRequest;
import ci.company.eduops.option.dto.OptionOverviewResponse;
import ci.company.eduops.option.dto.OptionUpsertRequest;
import ci.company.eduops.option.repository.AcademicOptionRepository;
import ci.company.eduops.option.repository.OptionOfferingRepository;
import ci.company.eduops.option.repository.StudentOptionChoiceRepository;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class AcademicOptionService {

    private final AcademicOptionRepository optionRepository;
    private final OptionOfferingRepository offeringRepository;
    private final StudentOptionChoiceRepository choiceRepository;
    private final AcademicYearRepository academicYearRepository;
    private final LevelRepository levelRepository;
    private final SchoolRepository schoolRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CurrentUser currentUser;
    private final AuditService auditService;

    public AcademicOptionService(AcademicOptionRepository optionRepository,
                                 OptionOfferingRepository offeringRepository,
                                 StudentOptionChoiceRepository choiceRepository,
                                 AcademicYearRepository academicYearRepository,
                                 LevelRepository levelRepository,
                                 SchoolRepository schoolRepository,
                                 StudentRepository studentRepository,
                                 EnrollmentRepository enrollmentRepository,
                                 CurrentUser currentUser,
                                 AuditService auditService) {
        this.optionRepository = optionRepository;
        this.offeringRepository = offeringRepository;
        this.choiceRepository = choiceRepository;
        this.academicYearRepository = academicYearRepository;
        this.levelRepository = levelRepository;
        this.schoolRepository = schoolRepository;
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.currentUser = currentUser;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public OptionOverviewResponse overview(UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(academicYearId, schoolId);
        List<Level> levels = levelRepository.findBySchool(schoolId, CommonStatus.ACTIVE);
        List<AcademicOption> options = optionRepository
                .findBySchoolIdAndStatusOrderByNameAsc(schoolId, CommonStatus.ACTIVE);
        List<OptionOffering> offerings = offeringRepository
                .findForOverview(schoolId, year.getId(), CommonStatus.ACTIVE);

        Map<UUID, Map<OptionChoiceStatus, Long>> counts = choiceCounts(year.getId());
        Map<UUID, List<OptionOffering>> byOption = new HashMap<>();
        offerings.forEach(row -> byOption
                .computeIfAbsent(row.getOption().getId(), ignored -> new ArrayList<>())
                .add(row));

        List<AcademicOptionResponse> optionResponses = options.stream()
                .map(option -> describeOption(option,
                        byOption.getOrDefault(option.getId(), List.of()), counts))
                .toList();
        List<OptionLevelResponse> levelResponses = levels.stream()
                .map(level -> new OptionLevelResponse(level.getId(), level.getCode(),
                        level.getName(), level.getCycle().getName(), level.getSequence()))
                .toList();

        return new OptionOverviewResponse(
                year.getId(), year.getCode(), levelResponses, optionResponses,
                optionResponses.size(), offerings.size(),
                optionResponses.stream().mapToInt(AcademicOptionResponse::totalCapacity).sum(),
                optionResponses.stream().mapToLong(AcademicOptionResponse::confirmedCount).sum(),
                optionResponses.stream().mapToLong(AcademicOptionResponse::waitlistedCount).sum());
    }

    @Transactional
    public OptionOverviewResponse create(OptionUpsertRequest request, UUID academicYearId) {
        UUID schoolId = requireSchool();
        String code = normaliseCode(request.code());
        if (optionRepository.existsBySchoolIdAndCodeIgnoreCase(schoolId, code)) {
            throw new BusinessException(ErrorCode.OPTION_CODE_ALREADY_USED)
                    .detail("code", code);
        }
        AcademicOption option = new AcademicOption();
        option.setSchool(schoolRepository.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND)));
        apply(option, request, code);
        optionRepository.save(option);
        auditService.logCreate("AcademicOption", option.getId(), option.getName(),
                Map.of("code", option.getCode(), "category", option.getCategory().name()));
        return overview(academicYearId);
    }

    @Transactional
    public OptionOverviewResponse update(UUID optionId, OptionUpsertRequest request,
                                         UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicOption option = requireOption(optionId, schoolId);
        String code = normaliseCode(request.code());
        if (optionRepository.existsBySchoolIdAndCodeIgnoreCaseAndIdNot(schoolId, code, optionId)) {
            throw new BusinessException(ErrorCode.OPTION_CODE_ALREADY_USED)
                    .detail("code", code);
        }
        Map<String, Object> before = Map.of(
                "code", option.getCode(), "name", option.getName(),
                "category", option.getCategory().name());
        apply(option, request, code);
        optionRepository.save(option);
        auditService.logUpdate("AcademicOption", option.getId(), option.getName(), before,
                Map.of("code", option.getCode(), "name", option.getName(),
                        "category", option.getCategory().name()));
        return overview(academicYearId);
    }

    @Transactional
    public OptionOverviewResponse archive(UUID optionId, UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicOption option = requireOption(optionId, schoolId);
        option.setStatus(CommonStatus.INACTIVE);
        optionRepository.save(option);
        offeringRepository.findByOptionIdAndAcademicYearId(optionId,
                        resolveYear(academicYearId, schoolId).getId())
                .forEach(offering -> offering.setStatus(CommonStatus.INACTIVE));
        auditService.logCancel("AcademicOption", option.getId(), option.getName(),
                "Option archivée");
        return overview(academicYearId);
    }

    @Transactional
    public OptionOverviewResponse saveOfferings(UUID optionId,
                                                OptionOfferingsSaveRequest request,
                                                UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicOption option = requireOption(optionId, schoolId);
        AcademicYear year = resolveYear(academicYearId, schoolId);
        validateDates(request.choiceStartDate(), request.choiceEndDate());

        Map<UUID, Level> allowedLevels = new HashMap<>();
        levelRepository.findBySchool(schoolId, CommonStatus.ACTIVE)
                .forEach(level -> allowedLevels.put(level.getId(), level));
        Set<UUID> selected = new HashSet<>(request.levelIds());
        if (selected.size() != request.levelIds().size()
                || !allowedLevels.keySet().containsAll(selected)) {
            throw new BusinessException(ErrorCode.LEVEL_NOT_FOUND,
                    "Un ou plusieurs niveaux ne font pas partie de l’établissement.");
        }

        Map<UUID, OptionOffering> existing = new HashMap<>();
        offeringRepository.findByOptionIdAndAcademicYearId(optionId, year.getId())
                .forEach(row -> existing.put(row.getLevel().getId(), row));

        for (Map.Entry<UUID, OptionOffering> entry : existing.entrySet()) {
            if (!selected.contains(entry.getKey())) {
                entry.getValue().setStatus(CommonStatus.INACTIVE);
            }
        }
        for (UUID levelId : selected) {
            OptionOffering offering = existing.get(levelId);
            if (offering == null) {
                offering = new OptionOffering();
                offering.setOption(option);
                offering.setAcademicYear(year);
                offering.setLevel(allowedLevels.get(levelId));
            }
            long confirmed = offering.getId() == null ? 0
                    : choiceRepository.countByOfferingIdAndStatus(
                            offering.getId(), OptionChoiceStatus.CONFIRMED);
            if (request.capacity() < confirmed) {
                throw new BusinessException(ErrorCode.OPTION_CAPACITY_REACHED,
                        "La capacité ne peut pas être inférieure aux choix déjà confirmés.")
                        .detail("level", allowedLevels.get(levelId).getName())
                        .detail("confirmed", confirmed);
            }
            offering.setCapacity(request.capacity());
            offering.setWeeklyHours(request.weeklyHours());
            offering.setChoiceStartDate(request.choiceStartDate());
            offering.setChoiceEndDate(request.choiceEndDate());
            offering.setStatus(CommonStatus.ACTIVE);
            offeringRepository.save(offering);
        }

        auditService.logUpdate("OptionOffering", option.getId(), option.getName(), Map.of(),
                Map.of("levels", selected.size(), "capacity", request.capacity(),
                        "weeklyHours", request.weeklyHours().toPlainString()));
        return overview(year.getId());
    }

    @Transactional(readOnly = true)
    public PageResponse<OptionChoiceResponse> choices(UUID academicYearId, UUID offeringId,
                                                       OptionChoiceStatus status, String search,
                                                       int page, int size) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(academicYearId, schoolId);
        String cleanSearch = search == null || search.isBlank() ? null : search.trim();
        Page<StudentOptionChoice> result = choiceRepository.search(
                schoolId, year.getId(), offeringId,
                status == null ? "" : status.name(), cleanSearch,
                PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), 100),
                        Sort.by(Sort.Direction.DESC, "chosenAt")));
        return PageResponse.from(result, this::describeChoice);
    }

    @Transactional
    public OptionChoiceResponse assign(OptionChoiceAssignRequest request) {
        UUID schoolId = requireSchool();
        OptionOffering offering = requireOffering(request.offeringId(), schoolId);
        if (offering.getStatus() != CommonStatus.ACTIVE
                || offering.getOption().getStatus() != CommonStatus.ACTIVE) {
            throw new BusinessException(ErrorCode.OPTION_OFFERING_NOT_FOUND);
        }
        Student student = studentRepository.findById(request.studentId())
                .filter(item -> item.getSchool().getId().equals(schoolId))
                .orElseThrow(() -> new BusinessException(ErrorCode.STUDENT_NOT_FOUND));
        Enrollment enrollment = enrollmentRepository
                .findActiveEnrollment(student.getId(), offering.getAcademicYear().getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ENROLLMENT_NOT_FOUND,
                        "L’élève n’a pas d’inscription active pour cette année scolaire."));
        if (!enrollment.getClassroom().getLevel().getId().equals(offering.getLevel().getId())) {
            throw new BusinessException(ErrorCode.OPTION_LEVEL_MISMATCH);
        }
        if (choiceRepository.existsByOfferingIdAndStudentId(offering.getId(), student.getId())) {
            throw new BusinessException(ErrorCode.OPTION_CHOICE_ALREADY_EXISTS);
        }

        StudentOptionChoice choice = new StudentOptionChoice();
        choice.setOffering(offering);
        choice.setStudent(student);
        choice.setEnrollment(enrollment);
        choice.setPriority(request.priority() <= 0 ? 1 : request.priority());
        choice.setNotes(trimToNull(request.notes()));
        OptionChoiceStatus initial = request.confirmImmediately()
                ? confirmationStatus(offering) : OptionChoiceStatus.REQUESTED;
        choice.setStatus(initial);
        if (initial == OptionChoiceStatus.CONFIRMED) {
            choice.setConfirmedAt(OffsetDateTime.now());
            choice.setConfirmedBy(currentUser.requireId());
        }
        choiceRepository.save(choice);
        auditService.logCreate("StudentOptionChoice", choice.getId(),
                student.fullName() + " — " + offering.getOption().getName(),
                Map.of("status", initial.name(), "priority", choice.getPriority()));
        return describeChoice(choice);
    }

    @Transactional
    public OptionChoiceResponse changeStatus(UUID choiceId, OptionChoiceStatusRequest request) {
        UUID schoolId = requireSchool();
        StudentOptionChoice choice = choiceRepository.findById(choiceId)
                .filter(row -> row.getOffering().getOption().getSchool().getId().equals(schoolId))
                .orElseThrow(() -> new BusinessException(ErrorCode.OPTION_CHOICE_NOT_FOUND));
        OptionChoiceStatus before = choice.getStatus();
        if (request.status() == OptionChoiceStatus.CONFIRMED
                && before != OptionChoiceStatus.CONFIRMED
                && confirmationStatus(choice.getOffering()) != OptionChoiceStatus.CONFIRMED) {
            throw new BusinessException(ErrorCode.OPTION_CAPACITY_REACHED);
        }
        choice.changeStatus(request.status(), currentUser.requireId());
        choiceRepository.save(choice);
        auditService.logUpdate("StudentOptionChoice", choice.getId(),
                choice.getStudent().fullName() + " — " + choice.getOffering().getOption().getName(),
                Map.of("status", before.name()), Map.of("status", request.status().name()));
        return describeChoice(choice);
    }

    private AcademicOptionResponse describeOption(
            AcademicOption option, List<OptionOffering> offerings,
            Map<UUID, Map<OptionChoiceStatus, Long>> counts) {
        List<OptionOfferingResponse> rows = offerings.stream()
                .map(row -> describeOffering(row, counts.getOrDefault(row.getId(), Map.of())))
                .toList();
        return new AcademicOptionResponse(
                option.getId(), option.getCode(), option.getName(), option.getCategory(),
                categoryLabel(option.getCategory()), option.getLanguageCode(),
                option.getDescription(), option.getColorHex(), rows, rows.size(),
                rows.stream().mapToInt(OptionOfferingResponse::capacity).sum(),
                rows.stream().mapToLong(OptionOfferingResponse::requestedCount).sum(),
                rows.stream().mapToLong(OptionOfferingResponse::confirmedCount).sum(),
                rows.stream().mapToLong(OptionOfferingResponse::waitlistedCount).sum());
    }

    private OptionOfferingResponse describeOffering(
            OptionOffering row, Map<OptionChoiceStatus, Long> counts) {
        long requested = counts.getOrDefault(OptionChoiceStatus.REQUESTED, 0L);
        long confirmed = counts.getOrDefault(OptionChoiceStatus.CONFIRMED, 0L);
        long waitlisted = counts.getOrDefault(OptionChoiceStatus.WAITLISTED, 0L);
        return new OptionOfferingResponse(
                row.getId(), row.getOption().getId(), row.getLevel().getId(),
                row.getLevel().getCode(), row.getLevel().getName(), row.getCapacity(),
                requested, confirmed, waitlisted,
                Math.max(0, row.getCapacity() - (int) confirmed), row.getWeeklyHours(),
                row.getChoiceStartDate(), row.getChoiceEndDate());
    }

    private OptionChoiceResponse describeChoice(StudentOptionChoice choice) {
        OptionOffering offering = choice.getOffering();
        Enrollment enrollment = choice.getEnrollment();
        Student student = choice.getStudent();
        return new OptionChoiceResponse(
                choice.getId(), offering.getId(), offering.getOption().getId(),
                offering.getOption().getCode(), offering.getOption().getName(),
                offering.getOption().getColorHex(), student.getId(), student.getStudentNumber(),
                student.fullName(), student.getPhotoUrl(), enrollment.getId(),
                enrollment.getClassroom().getName(), offering.getLevel().getId(),
                offering.getLevel().getName(), choice.getPriority(), choice.getStatus(),
                statusLabel(choice.getStatus()), choice.getNotes(), choice.getChosenAt(),
                choice.getConfirmedAt());
    }

    private Map<UUID, Map<OptionChoiceStatus, Long>> choiceCounts(UUID yearId) {
        Map<UUID, Map<OptionChoiceStatus, Long>> counts = new HashMap<>();
        for (Object[] row : choiceRepository.countByOfferingAndStatus(yearId)) {
            counts.computeIfAbsent((UUID) row[0], ignored ->
                    new EnumMap<>(OptionChoiceStatus.class))
                    .put((OptionChoiceStatus) row[1], (Long) row[2]);
        }
        return counts;
    }

    private OptionChoiceStatus confirmationStatus(OptionOffering offering) {
        long confirmed = choiceRepository.countByOfferingIdAndStatus(
                offering.getId(), OptionChoiceStatus.CONFIRMED);
        return confirmed < offering.getCapacity()
                ? OptionChoiceStatus.CONFIRMED : OptionChoiceStatus.WAITLISTED;
    }

    private void apply(AcademicOption option, OptionUpsertRequest request, String code) {
        option.setCode(code);
        option.setName(request.name().trim());
        option.setCategory(request.category());
        option.setLanguageCode(trimToNull(request.languageCode()));
        option.setDescription(trimToNull(request.description()));
        option.setColorHex(request.colorHex() == null ? "#2563EB"
                : request.colorHex().toUpperCase(Locale.ROOT));
        option.setStatus(CommonStatus.ACTIVE);
    }

    private AcademicOption requireOption(UUID optionId, UUID schoolId) {
        return optionRepository.findByIdAndSchoolId(optionId, schoolId)
                .filter(option -> option.getStatus() == CommonStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.OPTION_NOT_FOUND));
    }

    private OptionOffering requireOffering(UUID offeringId, UUID schoolId) {
        return offeringRepository.findByIdAndSchool(offeringId, schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.OPTION_OFFERING_NOT_FOUND));
    }

    private AcademicYear resolveYear(UUID academicYearId, UUID schoolId) {
        AcademicYear year = academicYearId == null
                ? academicYearRepository.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                            "Aucune année scolaire active."))
                : academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        if (!year.getSchool().getId().equals(schoolId)) {
            throw new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND);
        }
        return year;
    }

    private void validateDates(LocalDate start, LocalDate end) {
        if (start != null && end != null && end.isBefore(start)) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "La date de fin des choix doit être postérieure à la date d’ouverture.");
        }
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        }
        return schoolId;
    }

    private String normaliseCode(String value) {
        return value.trim().toUpperCase(Locale.ROOT).replace(' ', '-');
    }

    private String trimToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String categoryLabel(OptionCategory category) {
        return switch (category) {
            case LANGUAGE -> "Langue vivante";
            case ACADEMIC -> "Enseignement académique";
            case ARTS -> "Arts et culture";
            case SPORT -> "Sport";
            case TECHNICAL -> "Technique et numérique";
            case OTHER -> "Autre";
        };
    }

    private String statusLabel(OptionChoiceStatus status) {
        return switch (status) {
            case REQUESTED -> "Demandé";
            case CONFIRMED -> "Confirmé";
            case WAITLISTED -> "Liste d’attente";
            case CANCELLED -> "Annulé";
        };
    }
}
