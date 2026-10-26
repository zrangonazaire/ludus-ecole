package ci.company.eduops.report.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.enrollment.domain.EnrollmentKind;
import ci.company.eduops.enrollment.dto.request.EnrollmentCreateRequest;
import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.enrollment.service.EnrollmentService;
import ci.company.eduops.finance.domain.FeeSchedule;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.service.StudentFeeGenerationService;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.domain.GuardianRelationship;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.report.domain.ImportBatch;
import ci.company.eduops.report.domain.ImportBatchStatus;
import ci.company.eduops.report.dto.ImportPreviewResponse;
import ci.company.eduops.report.dto.ImportRowResponse;
import ci.company.eduops.report.repository.ImportBatchRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

/**
 * Import d'élèves depuis le classeur modèle.
 *
 * <p>Le fichier est analysé puis affiché, jamais inséré directement
 * (section 72). L'écriture n'a lieu qu'après confirmation explicite, et se
 * fait ligne par ligne à travers {@link EnrollmentService}, de sorte que
 * l'import obéisse exactement aux mêmes règles qu'une inscription manuelle :
 * affectation à la classe et génération automatique des frais liés au niveau.</p>
 */
@Service
public class StudentImportService {

    private static final Logger log = LoggerFactory.getLogger(StudentImportService.class);

    private static final DateTimeFormatter[] DATE_FORMATS = {
            DateTimeFormatter.ofPattern("dd/MM/yyyy"),
            DateTimeFormatter.ofPattern("d/M/yyyy"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("dd-MM-yyyy")
    };

    private static final DateTimeFormatter FRENCH_DATE =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    /** Sous quelle clé les lignes analysées dorment dans la colonne JSONB. */
    private static final String PREVIEW_ROWS = "rows";

    /** Ce que la colonne import_type porte pour ce module. */
    private static final String IMPORT_TYPE = "STUDENT";

    private final SchoolRepository schoolRepository;
    private final StudentRepository studentRepository;
    private final GuardianRepository guardianRepository;
    private final StudentGuardianRepository studentGuardianRepository;
    private final ClassroomRepository classroomRepository;
    private final AcademicYearRepository academicYearRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentService studentService;
    private final EnrollmentService enrollmentService;
    private final StudentFeeGenerationService feeGenerationService;
    private final ImportBatchRepository batchRepository;
    private final ObjectMapper objectMapper;
    private final CurrentUser currentUser;

    public StudentImportService(SchoolRepository schoolRepository,
                                StudentRepository studentRepository,
                                GuardianRepository guardianRepository,
                                StudentGuardianRepository studentGuardianRepository,
                                ClassroomRepository classroomRepository,
                                AcademicYearRepository academicYearRepository,
                                EnrollmentRepository enrollmentRepository,
                                StudentService studentService,
                                EnrollmentService enrollmentService,
                                StudentFeeGenerationService feeGenerationService,
                                ImportBatchRepository batchRepository,
                                ObjectMapper objectMapper,
                                CurrentUser currentUser) {
        this.schoolRepository = schoolRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.classroomRepository = classroomRepository;
        this.academicYearRepository = academicYearRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.studentService = studentService;
        this.enrollmentService = enrollmentService;
        this.feeGenerationService = feeGenerationService;
        this.batchRepository = batchRepository;
        this.objectMapper = objectMapper;
        this.currentUser = currentUser;
    }

    private record LevelFeeSummary(String levelName, BigDecimal totalAmount, int feeLinesCount, String currency) {}

    /**
     * Une ligne analysée, conservée jusqu'à la confirmation.
     *
     * <p>Classe et non {@code record} : cet objet fait un aller-retour par la
     * colonne JSONB, et une classe à accesseurs est ce que Jackson relit sans
     * dépendre des noms de paramètres conservés à la compilation.</p>
     */
    public static class ParsedRow {

        private int rowNumber;
        private UUID existingStudentId;
        private String lastName;
        private String firstName;
        private Gender gender;
        private LocalDate birthDate;
        private String birthPlace;
        private String nationality;
        private UUID classroomId;
        private String classroomName;
        private String levelName;
        private BigDecimal feesAmount;
        private int feeLinesCount;
        private String guardianName;
        private String guardianPhone;
        private String guardianEmail;
        private String relationship;
        private String previousSchool;
        private ImportRowResponse.Status status;

        public int getRowNumber() {
            return rowNumber;
        }

        public void setRowNumber(int rowNumber) {
            this.rowNumber = rowNumber;
        }

        public UUID getExistingStudentId() {
            return existingStudentId;
        }

        public void setExistingStudentId(UUID existingStudentId) {
            this.existingStudentId = existingStudentId;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public Gender getGender() {
            return gender;
        }

        public void setGender(Gender gender) {
            this.gender = gender;
        }

        public LocalDate getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(LocalDate birthDate) {
            this.birthDate = birthDate;
        }

        public String getBirthPlace() {
            return birthPlace;
        }

        public void setBirthPlace(String birthPlace) {
            this.birthPlace = birthPlace;
        }

        public String getNationality() {
            return nationality;
        }

        public void setNationality(String nationality) {
            this.nationality = nationality;
        }

        public UUID getClassroomId() {
            return classroomId;
        }

        public void setClassroomId(UUID classroomId) {
            this.classroomId = classroomId;
        }

        public String getClassroomName() {
            return classroomName;
        }

        public void setClassroomName(String classroomName) {
            this.classroomName = classroomName;
        }

        public String getLevelName() {
            return levelName;
        }

        public void setLevelName(String levelName) {
            this.levelName = levelName;
        }

        public BigDecimal getFeesAmount() {
            return feesAmount;
        }

        public void setFeesAmount(BigDecimal feesAmount) {
            this.feesAmount = feesAmount;
        }

        public int getFeeLinesCount() {
            return feeLinesCount;
        }

        public void setFeeLinesCount(int feeLinesCount) {
            this.feeLinesCount = feeLinesCount;
        }

        public String getGuardianName() {
            return guardianName;
        }

        public void setGuardianName(String guardianName) {
            this.guardianName = guardianName;
        }

        public String getGuardianPhone() {
            return guardianPhone;
        }

        public void setGuardianPhone(String guardianPhone) {
            this.guardianPhone = guardianPhone;
        }

        public String getGuardianEmail() {
            return guardianEmail;
        }

        public void setGuardianEmail(String guardianEmail) {
            this.guardianEmail = guardianEmail;
        }

        public String getRelationship() {
            return relationship;
        }

        public void setRelationship(String relationship) {
            this.relationship = relationship;
        }

        public String getPreviousSchool() {
            return previousSchool;
        }

        public void setPreviousSchool(String previousSchool) {
            this.previousSchool = previousSchool;
        }

        public ImportRowResponse.Status getStatus() {
            return status;
        }

        public void setStatus(ImportRowResponse.Status status) {
            this.status = status;
        }
    }

    // ------------------------------------------------------------------
    // 1. Analyse : rien n'est écrit
    // ------------------------------------------------------------------

    @Transactional
    public ImportPreviewResponse analyse(MultipartFile file) {
        return analyse(file, null);
    }

    @Transactional
    public ImportPreviewResponse analyse(MultipartFile file, UUID defaultClassroomId) {
        UUID schoolId = TenantContext.getSchoolId();
        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));

        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));
        String schoolCurrency = school.getCurrency() != null ? school.getCurrency() : "XOF";

        byte[] content = readBytes(file);
        String fileHash = sha256(content);

        Map<String, Classroom> classesByKey = new HashMap<>();
        Map<UUID, LevelFeeSummary> feesByClassroom = new HashMap<>();

        List<Classroom> activeClasses = new ArrayList<>(classroomRepository
                .findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE));
        List<Classroom> draftClasses = classroomRepository
                .findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.DRAFT);
        for (Classroom draft : draftClasses) {
            if (activeClasses.stream().noneMatch(c -> c.getId().equals(draft.getId()))) {
                activeClasses.add(draft);
            }
        }

        Classroom defaultClassroom = null;
        for (Classroom c : activeClasses) {
            classesByKey.put(normalise(c.getName()), c);
            classesByKey.put(normalise(c.getCode()), c);
            classesByKey.put(normaliseClassAlias(c.getName()), c);
            classesByKey.put(normaliseClassAlias(c.getCode()), c);
            feesByClassroom.put(c.getId(), computeLevelFeeSummary(c, schoolCurrency));
            if (defaultClassroomId != null && defaultClassroomId.equals(c.getId())) {
                defaultClassroom = c;
            }
        }

        List<ParsedRow> parsed = new ArrayList<>();
        ImportPreviewResponse preview = new ImportPreviewResponse();
        preview.setFileName(file.getOriginalFilename());
        preview.setCurrency(schoolCurrency);

        try (InputStream in = new ByteArrayInputStream(content);
             Workbook workbook = WorkbookFactory.create(in)) {

            Sheet sheet = workbook.getSheetAt(0);
            // Ligne 0 : en-têtes. À partir de la ligne 1 : élèves (la ligne d'exemple du modèle est ignorée).
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null || isBlank(row)) {
                    continue;
                }
                if (i == 1 && isTemplateExampleRow(row)) {
                    continue;
                }
                ImportRowResponse dto = new ImportRowResponse();
                dto.setRowNumber(i + 1);
                dto.setStatus(ImportRowResponse.Status.VALID);
                ParsedRow parsedRow = readRow(
                        row, dto, classesByKey, feesByClassroom, defaultClassroom, schoolId, year);
                parsed.add(parsedRow);
                preview.getRows().add(dto);
            }
        } catch (IOException | RuntimeException ex) {
            log.warn("Fichier d'import illisible : {}", ex.getMessage());
            throw BusinessException.of(ErrorCode.IMPORT_FILE_INVALID,
                    "Le fichier n'a pas pu être lu. Utilisez le modèle Excel fourni.");
        }

        summarise(preview);
        warnIfAlreadyImported(schoolId, fileHash, preview);

        ImportBatch batch = new ImportBatch();
        batch.setSchoolId(schoolId);
        batch.setImportType(IMPORT_TYPE);
        batch.setFileName(shorten(file.getOriginalFilename()));
        batch.setFileHash(fileHash);
        batch.setTotalRows(preview.getTotalRows());
        batch.setValidRows(preview.getValidRows() + preview.getWarningRows());
        batch.setInvalidRows(preview.getInvalidRows());
        batch.setDuplicateRows(preview.getDuplicateRows());
        batch.setStatus(preview.isImportable()
                ? ImportBatchStatus.PREVIEWED : ImportBatchStatus.REJECTED);
        batch.setUploadedBy(currentUser.id().orElse(null));
        batch.setUploadedAt(OffsetDateTime.now());
        batch.setPreview(Map.of(PREVIEW_ROWS,
                objectMapper.convertValue(parsed, List.class)));

        preview.setBatchId(batchRepository.save(batch).getId());

        log.info("Import analysé : {} ligne(s), {} valide(s), {} doublon(s), {} en erreur",
                preview.getTotalRows(), preview.getValidRows(),
                preview.getDuplicateRows(), preview.getInvalidRows());
        return preview;
    }

    private LevelFeeSummary computeLevelFeeSummary(Classroom classroom, String defaultCurrency) {
        List<FeeSchedule> schedules = feeGenerationService
                .findApplicableSchedulesForClassroom(classroom, false);
        BigDecimal total = BigDecimal.ZERO;
        int lines = 0;
        String currency = defaultCurrency;
        for (FeeSchedule schedule : schedules) {
            total = MoneyUtils.add(total, schedule.getTotalAmount());
            lines += schedule.getInstalments().isEmpty() ? 1 : schedule.getInstalments().size();
            if (schedule.getCurrency() != null && !schedule.getCurrency().isBlank()) {
                currency = schedule.getCurrency();
            }
        }
        String levelName = classroom.getLevel() != null ? classroom.getLevel().getName() : "";
        return new LevelFeeSummary(levelName, total, lines, currency);
    }

    private boolean isTemplateExampleRow(Row row) {
        return "kone".equals(normalise(cell(row, 0)))
                && "aya marie".equals(normalise(cell(row, 1)));
    }

    /**
     * Signale que ce fichier exact a déjà été importé.
     */
    private void warnIfAlreadyImported(UUID schoolId, String fileHash,
                                       ImportPreviewResponse preview) {
        if (fileHash == null) {
            return;
        }
        List<ImportBatch> previous = batchRepository.findImportedWithHash(schoolId, fileHash);
        if (previous.isEmpty()) {
            return;
        }
        ImportBatch last = previous.get(0);
        preview.setAlreadyImportedAt(last.getConfirmedAt() != null
                ? last.getConfirmedAt() : last.getUploadedAt());
        preview.setAlreadyImportedRows(last.getImportedRows());
    }

    private ParsedRow readRow(Row row,
                              ImportRowResponse dto,
                              Map<String, Classroom> classesByKey,
                              Map<UUID, LevelFeeSummary> feesByClassroom,
                              Classroom defaultClassroom,
                              UUID schoolId,
                              AcademicYear year) {
        String lastName = cell(row, 0);
        String firstName = cell(row, 1);
        String genderRaw = cell(row, 2);
        String birthRaw = cell(row, 3);
        String birthPlace = cell(row, 4);
        String nationality = cell(row, 5);
        String className = cell(row, 6);
        String guardianName = cell(row, 7);
        String guardianPhone = cell(row, 8);
        String guardianEmail = cell(row, 9);
        String relationship = cell(row, 10);
        String previousSchool = cell(row, 11);

        for (int i = 0; i < StudentImportTemplateService.COLUMNS.size(); i++) {
            dto.getValues().put(StudentImportTemplateService.COLUMNS.get(i), cell(row, i));
        }

        if (lastName.isBlank()) {
            dto.addError("Le nom est obligatoire");
        }
        if (firstName.isBlank()) {
            dto.addError("Le prénom est obligatoire");
        }

        Gender gender = parseGender(genderRaw);
        if (gender == null) {
            dto.addError("Sexe invalide (attendu : M ou F)");
        }

        LocalDate birthDate = parseDate(birthRaw);
        if (birthDate == null) {
            dto.addError("Date de naissance invalide (attendu : JJ/MM/AAAA)");
        } else if (birthDate.isAfter(LocalDate.now().minusYears(2))) {
            dto.addError("Date de naissance trop récente");
        }

        Classroom classroom = resolveClassroom(className, classesByKey, defaultClassroom);
        if (classroom != null && className.isBlank()) {
            dto.getValues().put("Classe", classroom.getName());
        }

        if (classroom == null) {
            if (className.isBlank()) {
                dto.addWarning("Aucune classe indiquée : choisissez une classe cible ou renseignez la colonne « Classe » pour associer les frais du niveau");
            } else {
                dto.addError("Classe « " + className + " » introuvable");
            }
        } else {
            dto.setClassroomName(classroom.getName());
            LevelFeeSummary feeSummary = feesByClassroom.get(classroom.getId());
            if (feeSummary != null) {
                dto.setLevelName(feeSummary.levelName());
                dto.setFeesAmount(feeSummary.totalAmount());
                dto.setFeeLinesCount(feeSummary.feeLinesCount());
                if (feeSummary.feeLinesCount() == 0) {
                    dto.addWarning("Aucun tarif actif sur le niveau « " + feeSummary.levelName()
                            + " » : pensez à configurer les frais du niveau dans Frais & Tarifs");
                }
            }
        }

        if (guardianPhone.isBlank()) {
            dto.addWarning("Aucun téléphone de responsable");
        }

        UUID existingStudentId = null;
        if (dto.getStatus() != ImportRowResponse.Status.INVALID && birthDate != null) {
            List<Student> duplicates = studentRepository.findPotentialDuplicates(
                    schoolId, firstName, lastName, birthDate);
            if (!duplicates.isEmpty()) {
                Student existing = duplicates.get(0);
                boolean alreadyEnrolledThisYear = enrollmentRepository
                        .findLiveEnrollment(existing.getId(), year.getId())
                        .isPresent();
                if (!alreadyEnrolledThisYear && classroom != null) {
                    // L'élève existe mais n'est pas encore inscrit cette année :
                    // on l'inscrit dans la classe et on lui associe les frais du niveau.
                    existingStudentId = existing.getId();
                    dto.setPreviewStudentNumber(existing.getStudentNumber());
                    dto.addWarning("Élève déjà enregistré : sera inscrit en "
                            + classroom.getName() + " avec les frais du niveau "
                            + (dto.getLevelName() != null ? dto.getLevelName() : ""));
                } else {
                    dto.setStatus(ImportRowResponse.Status.DUPLICATE);
                    dto.getWarnings().add("Un élève identique est déjà inscrit cette année : la ligne sera ignorée");
                }
            }
        }

        ParsedRow parsed = new ParsedRow();
        parsed.setRowNumber(dto.getRowNumber());
        parsed.setExistingStudentId(existingStudentId);
        parsed.setLastName(lastName);
        parsed.setFirstName(firstName);
        parsed.setGender(gender);
        parsed.setBirthDate(birthDate);
        parsed.setBirthPlace(birthPlace);
        parsed.setNationality(nationality);
        parsed.setClassroomId(classroom == null ? null : classroom.getId());
        parsed.setClassroomName(dto.getClassroomName());
        parsed.setLevelName(dto.getLevelName());
        parsed.setFeesAmount(dto.getFeesAmount());
        parsed.setFeeLinesCount(dto.getFeeLinesCount());
        parsed.setGuardianName(guardianName);
        parsed.setGuardianPhone(guardianPhone);
        parsed.setGuardianEmail(guardianEmail);
        parsed.setRelationship(relationship);
        parsed.setPreviousSchool(previousSchool);
        parsed.setStatus(dto.getStatus());
        return parsed;
    }

    private Classroom resolveClassroom(String rawClassName,
                                       Map<String, Classroom> classesByKey,
                                       Classroom defaultClassroom) {
        if (rawClassName == null || rawClassName.isBlank()) {
            return defaultClassroom;
        }
        Classroom exact = classesByKey.get(normalise(rawClassName));
        if (exact != null) {
            return exact;
        }
        Classroom aliased = classesByKey.get(normaliseClassAlias(rawClassName));
        if (aliased != null) {
            return aliased;
        }
        return null;
    }

    private void summarise(ImportPreviewResponse preview) {
        preview.setTotalRows(preview.getRows().size());
        preview.setValidRows((int) preview.getRows().stream()
                .filter(r -> r.getStatus() == ImportRowResponse.Status.VALID).count());
        preview.setWarningRows((int) preview.getRows().stream()
                .filter(r -> r.getStatus() == ImportRowResponse.Status.WARNING).count());
        preview.setDuplicateRows((int) preview.getRows().stream()
                .filter(r -> r.getStatus() == ImportRowResponse.Status.DUPLICATE).count());
        preview.setInvalidRows((int) preview.getRows().stream()
                .filter(r -> r.getStatus() == ImportRowResponse.Status.INVALID).count());
        preview.setImportable(preview.getValidRows() + preview.getWarningRows() > 0);

        BigDecimal totalFees = BigDecimal.ZERO;
        int totalFeeLines = 0;
        for (ImportRowResponse row : preview.getRows()) {
            if (row.getStatus() == ImportRowResponse.Status.VALID
                    || row.getStatus() == ImportRowResponse.Status.WARNING) {
                if (row.getFeesAmount() != null) {
                    totalFees = MoneyUtils.add(totalFees, row.getFeesAmount());
                }
                totalFeeLines += row.getFeeLinesCount();
            }
        }
        preview.setTotalFeesAmount(totalFees);
        preview.setTotalFeeLinesCreated(totalFeeLines);
    }

    // ------------------------------------------------------------------
    // 2. Confirmation : écriture effective + génération des frais de niveau
    // ------------------------------------------------------------------

    /**
     * Importe les lignes retenues, affecte chaque élève à sa classe et génère
     * systématiquement les frais rattachés au niveau de la classe.
     */
    @Transactional
    public ImportPreviewResponse confirm(UUID batchId) {
        UUID schoolId = TenantContext.getSchoolId();
        ImportBatch batch = batchRepository.findByIdAndSchoolId(batchId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.IMPORT_BATCH_NOT_FOUND,
                        "Cet aperçu est introuvable. Redéposez le fichier."));

        if (batch.getStatus() == ImportBatchStatus.IMPORTED) {
            throw BusinessException.of(ErrorCode.CONFLICT,
                    "Ce fichier a déjà été importé le "
                            + FRENCH_DATE.format(batch.getConfirmedAt())
                            + " : " + batch.getImportedRows() + " élève(s) créé(s).");
        }

        List<ParsedRow> rows = readRows(batch);

        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));

        AcademicYear activeYear = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElse(null);

        ImportPreviewResponse report = new ImportPreviewResponse();
        report.setBatchId(batchId);
        report.setFileName(batch.getFileName());
        report.setCurrency(school.getCurrency() != null ? school.getCurrency() : "XOF");
        int imported = 0;

        for (ParsedRow row : rows) {
            if (row.getStatus() == ImportRowResponse.Status.INVALID) {
                continue;
            }
            if (row.getStatus() == ImportRowResponse.Status.DUPLICATE) {
                // Si l'élève existe déjà et est déjà inscrit, on s'assure néanmoins
                // que les frais liés à son niveau lui ont bien été générés.
                ensureFeesForExistingDuplicate(row, schoolId, activeYear);
                continue;
            }
            ImportRowResponse result = new ImportRowResponse();
            result.setRowNumber(row.getRowNumber());
            result.setStatus(ImportRowResponse.Status.VALID);
            result.setClassroomName(row.getClassroomName());
            result.setLevelName(row.getLevelName());
            try {
                Student student = row.getExistingStudentId() != null
                        ? studentRepository.findById(row.getExistingStudentId())
                                .orElseGet(() -> createStudent(row, school))
                        : createStudent(row, school);
                attachGuardian(row, student, school);
                if (row.getClassroomId() != null) {
                    EnrollmentResponse enrollment = enrolWithLevelFees(
                            student, row.getClassroomId(), row.getExistingStudentId() != null);
                    result.setClassroomName(enrollment.getClassroomName());
                    result.setLevelName(enrollment.getLevelName());
                    result.setFeesAmount(enrollment.getTotalFeesDue());
                    result.setFeeLinesCount(enrollment.getFeeLinesCreated());
                }
                result.setPreviewStudentNumber(student.getStudentNumber());
                imported++;
            } catch (BusinessException ex) {
                // Une ligne refusée n'annule pas les autres : elle est signalée.
                result.addError(ex.getMessage());
            }
            report.getRows().add(result);
        }

        summarise(report);

        batch.setStatus(ImportBatchStatus.IMPORTED);
        batch.setImportedRows(imported);
        batch.setConfirmedBy(currentUser.id().orElse(null));
        batch.setConfirmedAt(OffsetDateTime.now());
        batch.setPreview(null);
        batch.setErrors(refusedRows(report));
        batchRepository.save(batch);

        log.info("Import confirmé : {} élève(s) inscrit(s), {} échéance(s) de frais de niveau générée(s) ({} {})",
                imported, report.getTotalFeeLinesCreated(),
                report.getTotalFeesAmount(), report.getCurrency());
        return report;
    }

    /**
     * Garantit que même un élève déjà inscrit auparavant dans la classe possède
     * toutes les lignes de frais associées à son niveau.
     */
    private void ensureFeesForExistingDuplicate(ParsedRow row, UUID schoolId, AcademicYear activeYear) {
        if (activeYear == null || row.getBirthDate() == null) {
            return;
        }
        List<Student> existingStudents = studentRepository.findPotentialDuplicates(
                schoolId, row.getFirstName(), row.getLastName(), row.getBirthDate());
        for (Student existing : existingStudents) {
            enrollmentRepository.findLiveEnrollment(existing.getId(), activeYear.getId())
                    .ifPresent(feeGenerationService::generateForEnrollment);
        }
    }

    /** Les lignes refusées à l'écriture, gardées pour que l'historique s'explique. */
    private Map<String, Object> refusedRows(ImportPreviewResponse report) {
        List<Map<String, Object>> refused = new ArrayList<>();
        for (ImportRowResponse row : report.getRows()) {
            if (row.getErrors().isEmpty()) {
                continue;
            }
            refused.add(Map.of("rowNumber", row.getRowNumber(),
                    "errors", List.copyOf(row.getErrors())));
        }
        return refused.isEmpty() ? null : Map.of("refused", refused);
    }

    /** Relit les lignes analysées depuis la colonne JSONB. */
    @SuppressWarnings("unchecked")
    private List<ParsedRow> readRows(ImportBatch batch) {
        Map<String, Object> preview = batch.getPreview();
        Object stored = preview == null ? null : preview.get(PREVIEW_ROWS);
        if (!(stored instanceof List<?> list) || list.isEmpty()) {
            throw BusinessException.of(ErrorCode.IMPORT_BATCH_NOT_FOUND,
                    "Cet aperçu ne contient plus de lignes à importer. "
                            + "Redéposez le fichier.");
        }
        List<ParsedRow> rows = new ArrayList<>();
        for (Object item : (List<Object>) list) {
            rows.add(objectMapper.convertValue(item, ParsedRow.class));
        }
        return rows;
    }

    private Student createStudent(ParsedRow row, School school) {
        Student student = new Student();
        student.setSchool(school);
        student.setStudentNumber(studentService.generateStudentNumber(school));
        student.setLastName(row.getLastName().trim());
        student.setFirstName(row.getFirstName().trim());
        student.setGender(row.getGender());
        student.setBirthDate(row.getBirthDate());
        student.setBirthPlace(blankToNull(row.getBirthPlace()));
        student.setNationality(blankToNull(row.getNationality()));
        student.setPreviousSchool(blankToNull(row.getPreviousSchool()));
        String responsibleEmail = blankToNull(row.getGuardianEmail());
        student.setMailResponsable(responsibleEmail == null ? null : responsibleEmail.toLowerCase(java.util.Locale.ROOT));
        student.setAdmissionDate(LocalDate.now());
        student.setStatus(StudentStatus.ADMITTED);
        return studentRepository.save(student);
    }

    /** Réutilise un responsable déjà connu au même numéro, plutôt que d'en créer un doublon. */
    private void attachGuardian(ParsedRow row, Student student, School school) {
        if (row.getGuardianName() == null || row.getGuardianName().isBlank()
                || row.getGuardianPhone() == null || row.getGuardianPhone().isBlank()) {
            return;
        }
        Guardian guardian = guardianRepository
                .findBySchoolIdAndPhone(school.getId(), row.getGuardianPhone().trim())
                .orElseGet(() -> {
                    Guardian created = new Guardian();
                    created.setSchool(school);
                    String[] parts = row.getGuardianName().trim().split("\\s+", 2);
                    created.setLastName(parts[0]);
                    created.setFirstName(parts.length > 1 ? parts[1] : parts[0]);
                    created.setPhone(row.getGuardianPhone().trim());
                    created.setEmail(blankToNull(row.getGuardianEmail()));
                    return guardianRepository.save(created);
                });

        if (studentGuardianRepository.existsByStudentIdAndGuardianId(
                student.getId(), guardian.getId())) {
            return;
        }
        StudentGuardian link = new StudentGuardian();
        link.setStudent(student);
        link.setGuardian(guardian);
        link.setRelationship(parseRelationship(row.getRelationship()));
        link.setPrimary(true);
        link.setFinancialResponsibility(true);
        link.setReceivesFinancialNotifications(true);
        studentGuardianRepository.save(link);
    }

    /**
     * Inscrit l'élève dans sa classe et déclenche la génération des frais liés au niveau.
     *
     * <p>Si la classe était en brouillon, elle est activée. Si l'effectif importé
     * dépasse la capacité initiale de la classe, la capacité est ajustée pour éviter
     * qu'une partie de la liste Excel ne soit créée sans classe ni frais de niveau.</p>
     */
    private EnrollmentResponse enrolWithLevelFees(Student student, UUID classroomId, boolean returning) {
        Classroom classroom = classroomRepository.findById(classroomId).orElse(null);
        if (classroom != null) {
            boolean modified = false;
            if (classroom.getStatus() == ClassroomStatus.DRAFT) {
                classroom.setStatus(ClassroomStatus.ACTIVE);
                modified = true;
            }
            long occupied = enrollmentRepository.countOccupiedSeats(classroomId);
            if (occupied >= classroom.getCapacityMaximum()) {
                classroom.setCapacityMaximum((int) occupied + 1);
                modified = true;
            }
            if (modified) {
                classroomRepository.saveAndFlush(classroom);
            }
        }

        EnrollmentCreateRequest request = new EnrollmentCreateRequest();
        request.setStudentId(student.getId());
        request.setClassroomId(classroomId);
        request.setEnrollmentKind(returning ? EnrollmentKind.RE_ENROLLMENT : EnrollmentKind.NEW);
        request.setValidateImmediately(true);
        // Clé stable : rejouer l'import ne crée pas de seconde inscription.
        request.setIdempotencyKey("import-" + student.getId());
        return enrollmentService.enroll(request);
    }

    // ------------------------------------------------------------------
    // lecture de cellules
    // ------------------------------------------------------------------

    private String cell(Row row, int index) {
        Cell cell = row.getCell(index, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
        if (cell == null) {
            return "";
        }
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> DateUtil.isCellDateFormatted(cell)
                    ? cell.getLocalDateTimeCellValue().toLocalDate()
                          .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                    : trimNumber(cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> cell.getCellFormula();
            default -> "";
        };
    }

    /** Évite qu'un numéro de téléphone lu en nombre devienne "225071122.0". */
    private String trimNumber(double value) {
        return value == Math.floor(value)
                ? String.valueOf((long) value)
                : String.valueOf(value);
    }

    private boolean isBlank(Row row) {
        for (int i = 0; i < 4; i++) {
            if (!cell(row, i).isBlank()) {
                return false;
            }
        }
        return true;
    }

    private Gender parseGender(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        String value = normalise(raw);
        if (value.startsWith("m") || value.startsWith("g")) {
            return Gender.MALE;
        }
        if (value.startsWith("f")) {
            return Gender.FEMALE;
        }
        return null;
    }

    private LocalDate parseDate(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        for (DateTimeFormatter format : DATE_FORMATS) {
            try {
                return LocalDate.parse(raw.trim(), format);
            } catch (DateTimeParseException ignored) {
                // essaie le format suivant
            }
        }
        return null;
    }

    private GuardianRelationship parseRelationship(String raw) {
        String value = normalise(raw);
        if (value.startsWith("mere") || value.startsWith("mère")) {
            return GuardianRelationship.MOTHER;
        }
        if (value.startsWith("pere") || value.startsWith("père")) {
            return GuardianRelationship.FATHER;
        }
        if (value.startsWith("tuteur") || value.startsWith("tutrice")) {
            return GuardianRelationship.TUTOR;
        }
        return GuardianRelationship.LEGAL_REPRESENTATIVE;
    }

    /** Minuscule sans accents, pour comparer « 6ème A » et « 6EME A ». */
    private String normalise(String value) {
        if (value == null) {
            return "";
        }
        return java.text.Normalizer.normalize(value.trim().toLowerCase(),
                        java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replaceAll("\\s+", " ");
    }

    /** Harmonise les abréviations courantes (« 6e A » -> « 6eme a », « Tle D » -> « terminale d »). */
    private String normaliseClassAlias(String value) {
        String base = normalise(value).replace("-", " ").replace("_", " ").replaceAll("\\s+", " ").trim();
        base = base.replaceAll("^([3456])e\\b", "$1eme");
        base = base.replaceAll("^2nde\\b", "seconde");
        base = base.replaceAll("^1ere\\b", "premiere");
        base = base.replaceAll("^1re\\b", "premiere");
        base = base.replaceAll("^tle\\b", "terminale");
        return base;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private byte[] readBytes(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException ex) {
            log.warn("Fichier d'import illisible : {}", ex.getMessage());
            throw BusinessException.of(ErrorCode.IMPORT_FILE_INVALID,
                    "Le fichier n'a pas pu être lu. Réessayez.");
        }
    }

    private String sha256(byte[] content) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(content);
            StringBuilder hex = new StringBuilder(digest.length * 2);
            for (byte b : digest) {
                hex.append(Character.forDigit((b >> 4) & 0xF, 16));
                hex.append(Character.forDigit(b & 0xF, 16));
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException ex) {
            log.warn("SHA-256 indisponible : l'import se poursuit sans empreinte");
            return null;
        }
    }

    /** Le nom de fichier tient dans 255 caractères, quoi qu'envoie le client. */
    private String shorten(String fileName) {
        String value = fileName == null || fileName.isBlank()
                ? "classeur.xlsx" : fileName.trim();
        byte[] bytes = value.getBytes(StandardCharsets.UTF_8);
        return bytes.length <= 255 ? value : value.substring(0, 200);
    }
}
