package ci.company.eduops.finance.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.finance.domain.FeeCategory;
import ci.company.eduops.finance.domain.FeeRecurrence;
import ci.company.eduops.finance.domain.FeeSchedule;
import ci.company.eduops.finance.domain.FeeScheduleInstalment;
import ci.company.eduops.finance.domain.FeeType;
import ci.company.eduops.finance.dto.request.FeeApplyRequest;
import ci.company.eduops.finance.dto.request.FeeScheduleUpsertRequest;
import ci.company.eduops.finance.dto.request.FeeTypeUpsertRequest;
import ci.company.eduops.finance.dto.response.FeeScheduleResponse;
import ci.company.eduops.finance.dto.response.FeeTypeResponse;
import ci.company.eduops.finance.dto.response.InstalmentResponse;
import ci.company.eduops.finance.dto.response.LevelFeesResponse;
import ci.company.eduops.finance.repository.FeeCategoryRepository;
import ci.company.eduops.finance.repository.FeeScheduleRepository;
import ci.company.eduops.finance.repository.FeeTypeRepository;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * The school's price list: what each level costs, and when it falls due.
 *
 * <p>Two objects, deliberately kept apart. A <em>fee type</em> — inscription,
 * scolarité, cantine — exists once for the whole school. Its <em>price</em>
 * belongs to the level, because tuition rises with the level while the canteen
 * costs the same to everyone.</p>
 *
 * <p>Three refusals live here rather than in the screen:</p>
 * <ul>
 *   <li>instalments that do not add up to the announced total. The total is
 *       what the family is told it owes; the instalments are what it is
 *       actually billed. A gap between the two surfaces months later, as a
 *       balance nobody can explain;</li>
 *   <li>deleting a price that has already produced student fees — the lines
 *       families are paying against would be orphaned, and any receipt issued
 *       since would point at nothing;</li>
 *   <li>archiving a fee type that is still priced somewhere.</li>
 * </ul>
 */
@Service
public class FeeConfigurationService {

    private static final Logger log = LoggerFactory.getLogger(FeeConfigurationService.class);

    private static final Map<FeeRecurrence, String> RECURRENCE_LABELS = Map.of(
            FeeRecurrence.ONE_TIME, "Une seule fois",
            FeeRecurrence.ANNUAL, "Chaque année",
            FeeRecurrence.TERM, "Chaque période",
            FeeRecurrence.MONTHLY, "Chaque mois");

    private final FeeTypeRepository feeTypeRepository;
    private final FeeScheduleRepository feeScheduleRepository;
    private final FeeCategoryRepository feeCategoryRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final LevelRepository levelRepository;
    private final AcademicYearRepository academicYearRepository;
    private final SchoolRepository schoolRepository;
    private final AuditService auditService;

    public FeeConfigurationService(FeeTypeRepository feeTypeRepository,
                                   FeeScheduleRepository feeScheduleRepository,
                                   FeeCategoryRepository feeCategoryRepository,
                                   StudentFeeRepository studentFeeRepository,
                                   LevelRepository levelRepository,
                                   AcademicYearRepository academicYearRepository,
                                   SchoolRepository schoolRepository,
                                   AuditService auditService) {
        this.feeTypeRepository = feeTypeRepository;
        this.feeScheduleRepository = feeScheduleRepository;
        this.feeCategoryRepository = feeCategoryRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.levelRepository = levelRepository;
        this.academicYearRepository = academicYearRepository;
        this.schoolRepository = schoolRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------- types de frais

    @Transactional(readOnly = true)
    public List<FeeTypeResponse> listTypes(UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(academicYearId);

        Map<UUID, Integer> pricedLevels = new HashMap<>();
        for (FeeSchedule schedule : feeScheduleRepository.findAllOfYear(year.getId())) {
            if (schedule.getLevel() != null) {
                pricedLevels.merge(schedule.getFeeType().getId(), 1, Integer::sum);
            }
        }

        List<FeeTypeResponse> result = new ArrayList<>();
        for (FeeType type : feeTypeRepository.findBySchoolIdAndStatus(
                schoolId, CommonStatus.ACTIVE)) {
            result.add(describeType(type, pricedLevels.getOrDefault(type.getId(), 0)));
        }
        result.sort((a, b) -> a.getName().compareToIgnoreCase(b.getName()));
        return result;
    }

    @Transactional
    public FeeTypeResponse createType(FeeTypeUpsertRequest request) {
        UUID schoolId = requireSchool();
        String code = normaliseCode(request.getCode());

        if (feeTypeRepository.existsBySchoolIdAndCode(schoolId, code)) {
            throw new BusinessException(ErrorCode.FEE_TYPE_CODE_ALREADY_USED).detail("code", code);
        }
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));

        FeeType type = new FeeType();
        type.setSchool(school);
        type.setCode(code);
        applyType(type, request);
        type.setStatus(CommonStatus.ACTIVE);

        FeeType saved = feeTypeRepository.save(type);
        auditService.logCreate("FeeType", saved.getId(), saved.getName(),
                Map.<String, Object>of(
                        "code", saved.getCode(),
                        "category", saved.getCategory(),
                        "mandatory", saved.isMandatory()));
        log.info("Type de frais {} ({}) créé", saved.getName(), saved.getCode());
        return describeType(saved, 0);
    }

    @Transactional
    public FeeTypeResponse updateType(UUID id, FeeTypeUpsertRequest request) {
        FeeType type = requireType(id);
        String code = normaliseCode(request.getCode());

        if (!code.equals(type.getCode())
                && feeTypeRepository.existsBySchoolIdAndCode(requireSchool(), code)) {
            throw new BusinessException(ErrorCode.FEE_TYPE_CODE_ALREADY_USED).detail("code", code);
        }

        Map<String, Object> before = Map.<String, Object>of(
                "code", type.getCode(),
                "name", type.getName(),
                "mandatory", type.isMandatory());

        type.setCode(code);
        applyType(type, request);

        FeeType saved = feeTypeRepository.save(type);
        auditService.logUpdate("FeeType", saved.getId(), saved.getName(), before,
                Map.<String, Object>of(
                        "code", saved.getCode(),
                        "name", saved.getName(),
                        "mandatory", saved.isMandatory()));
        return describeType(saved, (int) feeScheduleRepository
                .countByFeeTypeIdAndStatus(saved.getId(), CommonStatus.ACTIVE));
    }

    @Transactional
    public FeeTypeResponse archiveType(UUID id) {
        FeeType type = requireType(id);
        long priced = feeScheduleRepository.countByFeeTypeIdAndStatus(id, CommonStatus.ACTIVE);
        if (priced > 0) {
            throw new BusinessException(ErrorCode.FEE_TYPE_IN_USE,
                    "Supprimez d'abord les tarifs de ce type de frais.")
                    .detail("schedules", priced);
        }
        type.setStatus(CommonStatus.ARCHIVED);
        FeeType saved = feeTypeRepository.save(type);
        auditService.logCancel("FeeType", saved.getId(), saved.getName(), null);
        return describeType(saved, 0);
    }

    // ------------------------------------------------------- tarifs par niveau

    /** Every level of the school with what it costs, empty ones included. */
    @Transactional(readOnly = true)
    public List<LevelFeesResponse> overview(UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(academicYearId);
        String currency = schoolCurrency(schoolId);

        Map<UUID, List<FeeSchedule>> byLevel = new HashMap<>();
        for (FeeSchedule schedule : feeScheduleRepository.findAllOfYear(year.getId())) {
            UUID key = schedule.getLevel() == null ? null : schedule.getLevel().getId();
            byLevel.computeIfAbsent(key, k -> new ArrayList<>()).add(schedule);
        }
        // A price with no level applies to every level, so it is folded into each.
        List<FeeSchedule> schoolWide = byLevel.getOrDefault(null, List.of());

        List<LevelFeesResponse> result = new ArrayList<>();
        for (Level level : levelRepository.findBySchool(schoolId, CommonStatus.ACTIVE)) {
            List<FeeSchedule> own = new ArrayList<>(
                    byLevel.getOrDefault(level.getId(), List.of()));
            own.addAll(schoolWide);
            result.add(describeLevel(level, own, currency));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public LevelFeesResponse forLevel(UUID levelId, UUID academicYearId) {
        Level level = requireLevel(levelId);
        AcademicYear year = resolveYear(academicYearId);
        List<FeeSchedule> schedules = feeScheduleRepository.findAllOfYear(year.getId()).stream()
                .filter(s -> s.getLevel() == null || s.getLevel().getId().equals(levelId))
                .toList();
        return describeLevel(level, schedules, schoolCurrency(requireSchool()));
    }

    /**
     * Creates or replaces the price of one fee type on one level.
     *
     * <p>Returns the whole overview rather than the single level: a price with
     * no level applies to all of them, so there is no one row to send back.</p>
     */
    @Transactional
    public List<LevelFeesResponse> saveSchedule(FeeScheduleUpsertRequest request,
                                                UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        FeeType type = requireType(request.getFeeTypeId());
        Level level = request.getLevelId() == null ? null : requireLevel(request.getLevelId());

        FeeSchedule schedule = write(year, type, level, request);
        auditService.logCreate("FeeSchedule", schedule.getId(), schedule.getLabel(),
                Map.<String, Object>of(
                        "level", level == null ? "tous les niveaux" : level.getName(),
                        "amount", schedule.getTotalAmount().toPlainString(),
                        "instalments", schedule.getInstalments().size()));

        return overview(year.getId());
    }

    /**
     * Removes a price.
     *
     * @throws BusinessException when student fees were already generated from it
     */
    @Transactional
    public void deleteSchedule(UUID scheduleId) {
        FeeSchedule schedule = requireSchedule(scheduleId);

        if (studentFeeRepository.existsForSchedule(scheduleId)) {
            throw new BusinessException(ErrorCode.FEE_SCHEDULE_IN_USE,
                    "Des frais ont déjà été générés depuis ce tarif. "
                            + "Le montant reste modifiable pour les futures inscriptions, "
                            + "mais le tarif ne peut plus être supprimé.")
                    .detail("label", schedule.getLabel());
        }
        feeScheduleRepository.delete(schedule);
        auditService.logCancel("FeeSchedule", scheduleId, schedule.getLabel(), null);
    }

    /**
     * Applies one price to several levels at once.
     *
     * <p>Levels whose price already produced student fees are skipped in
     * replace mode: rewriting them would change what families already owe.</p>
     */
    @Transactional
    public List<LevelFeesResponse> applyToLevels(FeeApplyRequest request, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        FeeType type = requireType(request.getSchedule().getFeeTypeId());
        List<LevelFeesResponse> touched = new ArrayList<>();

        for (UUID levelId : request.getLevelIds()) {
            Level level = requireLevel(levelId);
            boolean exists = feeScheduleRepository.existsByAcademicYearIdAndFeeTypeIdAndLevelId(
                    year.getId(), type.getId(), levelId);
            if (exists && !request.isReplaceExisting()) {
                continue;
            }
            write(year, type, level, request.getSchedule());
            touched.add(forLevel(levelId, year.getId()));
        }

        auditService.logUpdate("FeeSchedule", null, "Application groupée", Map.of(),
                Map.<String, Object>of(
                        "feeType", type.getName(),
                        "levels", touched.size(),
                        "replaceExisting", request.isReplaceExisting()));
        log.info("Tarif {} appliqué à {} niveau(x)", type.getName(), touched.size());
        return touched;
    }

    /** Read-only validation before the operation enters the circuit. */
    @Transactional(readOnly = true)
    public UUID validateChange(String operation, UUID target, UUID yearId, Object input) {
        requireSchool();
        switch (operation) {
            case "CREATE_TYPE", "UPDATE_TYPE" -> {
                FeeTypeUpsertRequest dto = (FeeTypeUpsertRequest) input;
                String code = normaliseCode(dto.getCode());
                FeeType existing = operation.equals("UPDATE_TYPE") ? requireType(target) : null;
                if ((existing == null || !existing.getCode().equals(code))
                        && feeTypeRepository.existsBySchoolIdAndCode(requireSchool(), code)) {
                    throw new BusinessException(ErrorCode.FEE_TYPE_CODE_ALREADY_USED);
                }
                applyType(new FeeType(), dto);
            }
            case "ARCHIVE_TYPE" -> {
                requireType(target);
                if (feeScheduleRepository.countByFeeTypeIdAndStatus(target, CommonStatus.ACTIVE) > 0)
                    throw new BusinessException(ErrorCode.FEE_TYPE_IN_USE);
            }
            case "DELETE_SCHEDULE" -> {
                requireSchedule(target);
                if (studentFeeRepository.existsForSchedule(target)) throw new BusinessException(ErrorCode.FEE_SCHEDULE_IN_USE);
            }
            case "SAVE_SCHEDULE", "APPLY_SCHEDULE" -> {
                AcademicYear year = resolveYear(yearId);
                if (year.getStatus() != AcademicYearStatus.ACTIVE)
                    throw new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE);
                FeeScheduleUpsertRequest dto;
                if (input instanceof FeeApplyRequest group) {
                    group.getLevelIds().forEach(this::requireLevel);
                    dto = group.getSchedule();
                } else {
                    dto = (FeeScheduleUpsertRequest) input;
                    if (dto.getLevelId() != null) requireLevel(dto.getLevelId());
                }
                FeeType type = requireType(dto.getFeeTypeId());
                if (type.getStatus() != CommonStatus.ACTIVE) throw new BusinessException(ErrorCode.FEE_TYPE_NOT_FOUND);
                BigDecimal total = MoneyUtils.normalize(dto.getTotalAmount());
                if (total.signum() < 0) throw new BusinessException(ErrorCode.FEE_AMOUNT_INVALID);
                var plan = buildInstalments(dto, total, year);
                if (!plan.isEmpty() && plan.stream().map(FeeScheduleInstalment::getAmount)
                        .reduce(BigDecimal.ZERO, BigDecimal::add).compareTo(total) != 0)
                    throw new BusinessException(ErrorCode.FEE_INSTALMENTS_MISMATCH);
                return year.getId();
            }
            default -> throw new BusinessException(ErrorCode.VALIDATION_ERROR);
        }
        return null;
    }

    @Transactional(readOnly = true)
    public String changeBaseline(String operation, UUID target, UUID year, Object input) {
        if (operation.equals("CREATE_TYPE")) return "new";
        if (operation.equals("UPDATE_TYPE") || operation.equals("ARCHIVE_TYPE")) {
            FeeType type = requireType(target);
            return type.getId() + ":" + type.getVersion();
        }
        if (operation.equals("DELETE_SCHEDULE")) {
            FeeSchedule schedule = requireSchedule(target);
            return schedule.getId() + ":" + schedule.getVersion();
        }
        FeeScheduleUpsertRequest dto = input instanceof FeeApplyRequest group ? group.getSchedule() : (FeeScheduleUpsertRequest) input;
        List<UUID> targets = input instanceof FeeApplyRequest group ? group.getLevelIds() : java.util.Collections.singletonList(dto.getLevelId());
        var type = requireType(dto.getFeeTypeId());
        String schedules = feeScheduleRepository.findAllOfYear(year).stream()
                .filter(s -> s.getFeeType().getId().equals(dto.getFeeTypeId()))
                .filter(s -> targets.contains(s.getLevel() == null ? null : s.getLevel().getId()))
                .map(s -> s.getId() + ":" + s.getVersion()).sorted().collect(java.util.stream.Collectors.joining(","));
        return type.getId() + ":" + type.getVersion() + "/" + schedules;
    }

    @Transactional(readOnly = true)
    public String typeName(UUID id) { return requireType(id).getName(); }
    @Transactional(readOnly = true)
    public String scheduleName(UUID id) { return requireSchedule(id).getLabel(); }

    private FeeSchedule requireSchedule(UUID id) {
        return feeScheduleRepository.findById(id)
                .filter(s -> s.getAcademicYear().getSchool().getId().equals(requireSchool()))
                .orElseThrow(() -> new BusinessException(ErrorCode.FEE_SCHEDULE_NOT_FOUND));
    }

    // ------------------------------------------------------------- internals

    private FeeSchedule write(AcademicYear year, FeeType type, Level level,
                              FeeScheduleUpsertRequest request) {
        BigDecimal total = MoneyUtils.normalize(request.getTotalAmount());
        if (total.compareTo(BigDecimal.ZERO) < 0) {
            throw new BusinessException(ErrorCode.FEE_AMOUNT_INVALID);
        }

        FeeSchedule schedule = feeScheduleRepository.findAllOfYear(year.getId()).stream()
                .filter(s -> s.getFeeType().getId().equals(type.getId()))
                .filter(s -> sameLevel(s, level))
                .findFirst()
                .orElseGet(FeeSchedule::new);

        boolean creating = schedule.getId() == null;
        if (!creating && studentFeeRepository.existsForSchedule(schedule.getId())) {
            log.info("Tarif {} déjà utilisé : le nouveau montant ne vaudra que pour "
                    + "les prochaines inscriptions", schedule.getLabel());
        }

        schedule.setAcademicYear(year);
        schedule.setFeeType(type);
        schedule.setLevel(level);
        schedule.setCampus(null);
        schedule.setLabel(blankToNull(request.getLabel()) != null
                ? request.getLabel().trim()
                : type.getName() + (level == null ? "" : " " + level.getName()));
        schedule.setTotalAmount(total);
        schedule.setCurrency(schoolCurrency(requireSchool()));
        schedule.setAppliesToNewStudents(request.isAppliesToNewStudents());
        schedule.setAppliesToReturningStudents(request.isAppliesToReturningStudents());
        schedule.setStatus(CommonStatus.ACTIVE);

        schedule.getInstalments().clear();
        for (FeeScheduleInstalment instalment : buildInstalments(request, total, year)) {
            schedule.addInstalment(instalment);
        }

        if (!schedule.instalmentsMatchTotal()) {
            BigDecimal sum = schedule.getInstalments().stream()
                    .map(FeeScheduleInstalment::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            throw new BusinessException(ErrorCode.FEE_INSTALMENTS_MISMATCH,
                    "Les échéances totalisent " + sum.toPlainString()
                            + " alors que le montant annoncé est " + total.toPlainString() + ".")
                    .detail("sum", sum)
                    .detail("total", total);
        }
        return feeScheduleRepository.save(schedule);
    }

    /**
     * Turns the request into instalments.
     *
     * <p>Either the caller listed them, or it asked for N regular due dates. In
     * the second case the rounding difference goes on the first instalment, so
     * the plan adds up to the announced total to the last franc rather than
     * leaving a few francs unbilled on every student.</p>
     */
    private List<FeeScheduleInstalment> buildInstalments(FeeScheduleUpsertRequest request,
                                                         BigDecimal total, AcademicYear year) {
        List<FeeScheduleInstalment> result = new ArrayList<>();

        if (!request.getInstalments().isEmpty()) {
            int sequence = 1;
            for (FeeScheduleUpsertRequest.InstalmentRequest row : request.getInstalments()) {
                BigDecimal amount = MoneyUtils.normalize(row.getAmount());
                if (amount.compareTo(BigDecimal.ZERO) <= 0) {
                    throw new BusinessException(ErrorCode.FEE_AMOUNT_INVALID);
                }
                FeeScheduleInstalment instalment = new FeeScheduleInstalment();
                instalment.setSequence(sequence);
                instalment.setLabel(blankToNull(row.getLabel()) != null
                        ? row.getLabel().trim() : ordinal(sequence) + " tranche");
                instalment.setAmount(amount);
                instalment.setDueDate(row.getDueDate());
                instalment.setGraceDays(Math.max(0, row.getGraceDays()));
                result.add(instalment);
                sequence++;
            }
            return result;
        }

        int count = request.getInstalmentCount() == null ? 0 : request.getInstalmentCount();
        if (count <= 0 || total.compareTo(BigDecimal.ZERO) == 0) {
            return result;
        }

        BigDecimal share = MoneyUtils.normalize(
                total.divide(BigDecimal.valueOf(count), MoneyUtils.SCALE, MoneyUtils.ROUNDING));
        BigDecimal firstShare = MoneyUtils.subtract(
                total, MoneyUtils.multiply(share, BigDecimal.valueOf(count - 1L)));

        LocalDate due = request.getFirstDueDate() != null
                ? request.getFirstDueDate()
                : year.getStartDate().plusMonths(1);
        int step = request.getMonthsBetweenInstalments() == null
                || request.getMonthsBetweenInstalments() <= 0
                ? 3 : request.getMonthsBetweenInstalments();

        for (int i = 1; i <= count; i++) {
            FeeScheduleInstalment instalment = new FeeScheduleInstalment();
            instalment.setSequence(i);
            instalment.setLabel(ordinal(i) + " tranche");
            instalment.setAmount(i == 1 ? firstShare : share);
            instalment.setDueDate(due);
            instalment.setGraceDays(0);
            result.add(instalment);
            due = due.plusMonths(step);
        }
        return result;
    }

    private boolean sameLevel(FeeSchedule schedule, Level level) {
        if (level == null) {
            return schedule.getLevel() == null;
        }
        return schedule.getLevel() != null && schedule.getLevel().getId().equals(level.getId());
    }

    private void applyType(FeeType type, FeeTypeUpsertRequest request) {
        type.setName(request.getName().trim());
        type.setDescription(blankToNull(request.getDescription()));
        type.setMandatory(request.isMandatory());
        type.setRefundable(request.isRefundable());
        type.setCategory(resolveCategory(request.getCategory()));
        type.setRecurrence(parse(FeeRecurrence.class, request.getRecurrence(),
                FeeRecurrence.ANNUAL, "Périodicité inconnue : "));
    }

    /**
     * La catégorie vient de la table {@code fee_category} (V54), pas d'un
     * enum : elle doit exister pour cette école, sinon la clé étrangère
     * (school_id, category) refuserait l'écriture sans que l'écran ne
     * sache dire pourquoi.
     */
    private String resolveCategory(String value) {
        String code = value == null || value.isBlank() ? "OTHER" : value.trim().toUpperCase(Locale.ROOT);
        if (!feeCategoryRepository.existsBySchoolIdAndCode(requireSchool(), code)) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Catégorie de frais inconnue : " + code);
        }
        return code;
    }

    private <E extends Enum<E>> E parse(Class<E> type, String value, E fallback, String message) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        try {
            return Enum.valueOf(type, value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, message + value);
        }
    }

    private FeeTypeResponse describeType(FeeType type, int pricedLevels) {
        FeeTypeResponse response = new FeeTypeResponse();
        response.setId(type.getId());
        response.setCode(type.getCode());
        response.setName(type.getName());
        response.setCategory(type.getCategory());
        response.setCategoryLabel(categoryLabel(type.getCategory()));
        response.setRecurrence(type.getRecurrence().name());
        response.setRecurrenceLabel(
                RECURRENCE_LABELS.getOrDefault(type.getRecurrence(), "Chaque année"));
        response.setMandatory(type.isMandatory());
        response.setRefundable(type.isRefundable());
        response.setDescription(type.getDescription());
        response.setStatus(type.getStatus().name());
        response.setPricedLevels(pricedLevels);
        response.setDeletable(pricedLevels == 0
                && !studentFeeRepository.existsForFeeType(type.getId()));
        return response;
    }

    private LevelFeesResponse describeLevel(Level level, List<FeeSchedule> schedules,
                                            String currency) {
        LevelFeesResponse response = new LevelFeesResponse();
        response.setLevelId(level.getId());
        response.setLevelName(level.getName());
        response.setLevelCode(level.getCode());
        response.setCycleId(level.getCycle().getId());
        response.setCycleName(level.getCycle().getName());
        response.setSequence(level.getSequence());
        response.setCurrency(currency);

        BigDecimal mandatory = MoneyUtils.ZERO;
        BigDecimal optional = MoneyUtils.ZERO;
        int instalments = 0;
        List<FeeScheduleResponse> rows = new ArrayList<>(schedules.size());

        for (FeeSchedule schedule : schedules) {
            rows.add(describeSchedule(schedule));
            if (schedule.getFeeType().isMandatory()) {
                mandatory = MoneyUtils.add(mandatory, schedule.getTotalAmount());
                instalments = Math.max(instalments, schedule.getInstalments().size());
            } else {
                optional = MoneyUtils.add(optional, schedule.getTotalAmount());
            }
        }
        rows.sort((a, b) -> a.getFeeTypeName().compareToIgnoreCase(b.getFeeTypeName()));

        response.setSchedules(rows);
        response.setScheduleCount(rows.size());
        response.setMandatoryTotal(mandatory);
        response.setOptionalTotal(optional);
        response.setInstalmentCount(instalments);
        response.setReady(mandatory.compareTo(BigDecimal.ZERO) > 0);
        return response;
    }

    private FeeScheduleResponse describeSchedule(FeeSchedule schedule) {
        FeeScheduleResponse response = new FeeScheduleResponse();
        response.setId(schedule.getId());
        response.setFeeTypeId(schedule.getFeeType().getId());
        response.setFeeTypeCode(schedule.getFeeType().getCode());
        response.setFeeTypeName(schedule.getFeeType().getName());
        response.setCategory(schedule.getFeeType().getCategory());
        response.setMandatory(schedule.getFeeType().isMandatory());
        response.setLabel(schedule.getLabel());
        response.setTotalAmount(schedule.getTotalAmount());
        response.setCurrency(schedule.getCurrency());
        response.setAppliesToNewStudents(schedule.isAppliesToNewStudents());
        response.setAppliesToReturningStudents(schedule.isAppliesToReturningStudents());
        response.setStatus(schedule.getStatus().name());
        response.setLocked(studentFeeRepository.existsForSchedule(schedule.getId()));

        if (schedule.getLevel() != null) {
            response.setLevelId(schedule.getLevel().getId());
            response.setLevelName(schedule.getLevel().getName());
        }

        List<InstalmentResponse> instalments = new ArrayList<>();
        for (FeeScheduleInstalment instalment : schedule.getInstalments()) {
            InstalmentResponse item = new InstalmentResponse();
            item.setId(instalment.getId());
            item.setSequence(instalment.getSequence());
            item.setLabel(instalment.getLabel());
            item.setAmount(instalment.getAmount());
            item.setDueDate(instalment.getDueDate());
            item.setGraceDays(instalment.getGraceDays());
            instalments.add(item);
        }
        response.setInstalments(instalments);
        return response;
    }

    private String schoolCurrency(UUID schoolId) {
        return schoolRepository.findById(schoolId)
                .map(School::getCurrency)
                .orElse("XOF");
    }

    /**
     * Libellé d'une rubrique, lu dans {@code fee_category} — la table
     * remplaçant l'enum d'origine (V54). Repli sur le code lui-même si la
     * ligne venait à manquer : un reçu vaut mieux avec son code qu'avec
     * rien du tout.
     */
    @Transactional(readOnly = true)
    public String categoryLabel(String code) {
        return feeCategoryRepository.findBySchoolIdAndCode(requireSchool(), code)
                .map(FeeCategory::getLabel)
                .orElse(code);
    }

    private FeeType requireType(UUID id) {
        FeeType type = feeTypeRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.FEE_TYPE_NOT_FOUND));
        if (!type.getSchool().getId().equals(requireSchool())) {
            throw new BusinessException(ErrorCode.FEE_TYPE_NOT_FOUND);
        }
        return type;
    }

    private Level requireLevel(UUID levelId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new BusinessException(ErrorCode.LEVEL_NOT_FOUND));
        if (!level.getCycle().getSchool().getId().equals(requireSchool())) {
            throw new BusinessException(ErrorCode.LEVEL_NOT_FOUND);
        }
        return level;
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .filter(y -> y.getSchool().getId().equals(requireSchool()))
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchool(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active : ouvrez-en une avant de définir "
                                + "les frais."));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private static String ordinal(int sequence) {
        return sequence == 1 ? "1re" : sequence + "e";
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }

    /** Codes stay ASCII and uppercase: they end up in exports and receipts. */
    private static String normaliseCode(String value) {
        String stripped = Normalizer.normalize(value.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String code = stripped.toUpperCase(Locale.ROOT).replaceAll("[^A-Z0-9-]+", "");
        if (code.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le code doit contenir au moins une lettre ou un chiffre.");
        }
        return code;
    }
}
