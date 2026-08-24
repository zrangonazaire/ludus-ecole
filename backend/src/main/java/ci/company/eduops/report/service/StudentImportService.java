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
import ci.company.eduops.enrollment.dto.request.EnrollmentCreateRequest;
import ci.company.eduops.enrollment.service.EnrollmentService;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.domain.GuardianRelationship;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.report.dto.ImportPreviewResponse;
import ci.company.eduops.report.dto.ImportRowResponse;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.service.StudentService;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
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
 * capacité des classes, double inscription, génération des frais.</p>
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

    /** Les aperçus vivent en mémoire entre l'analyse et la confirmation. */
    private final Map<UUID, List<ParsedRow>> pendingBatches = new HashMap<>();

    private final SchoolRepository schoolRepository;
    private final StudentRepository studentRepository;
    private final GuardianRepository guardianRepository;
    private final StudentGuardianRepository studentGuardianRepository;
    private final ClassroomRepository classroomRepository;
    private final AcademicYearRepository academicYearRepository;
    private final StudentService studentService;
    private final EnrollmentService enrollmentService;

    public StudentImportService(SchoolRepository schoolRepository,
                                StudentRepository studentRepository,
                                GuardianRepository guardianRepository,
                                StudentGuardianRepository studentGuardianRepository,
                                ClassroomRepository classroomRepository,
                                AcademicYearRepository academicYearRepository,
                                StudentService studentService,
                                EnrollmentService enrollmentService) {
        this.schoolRepository = schoolRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.classroomRepository = classroomRepository;
        this.academicYearRepository = academicYearRepository;
        this.studentService = studentService;
        this.enrollmentService = enrollmentService;
    }

    /** Une ligne analysée, conservée jusqu'à la confirmation. */
    private record ParsedRow(int rowNumber, String lastName, String firstName, Gender gender,
                             LocalDate birthDate, String birthPlace, String nationality,
                             UUID classroomId, String guardianName, String guardianPhone,
                             String guardianEmail, String relationship, String previousSchool,
                             ImportRowResponse.Status status) {
    }

    // ------------------------------------------------------------------
    // 1. Analyse : rien n'est écrit
    // ------------------------------------------------------------------

    @Transactional(readOnly = true)
    public ImportPreviewResponse analyse(MultipartFile file) {
        UUID schoolId = TenantContext.getSchoolId();
        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));

        Map<String, Classroom> classesByName = new HashMap<>();
        for (Classroom c : classroomRepository
                .findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE)) {
            classesByName.put(normalise(c.getName()), c);
        }

        List<ParsedRow> parsed = new ArrayList<>();
        ImportPreviewResponse preview = new ImportPreviewResponse();
        preview.setFileName(file.getOriginalFilename());

        try (InputStream in = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(in)) {

            Sheet sheet = workbook.getSheetAt(0);
            // Ligne 0 : en-têtes. Ligne 1 : exemple, volontairement ignorée.
            for (int i = 2; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null || isBlank(row)) {
                    continue;
                }
                ImportRowResponse dto = new ImportRowResponse();
                dto.setRowNumber(i + 1);
                dto.setStatus(ImportRowResponse.Status.VALID);
                ParsedRow parsedRow = readRow(row, dto, classesByName, schoolId);
                parsed.add(parsedRow);
                preview.getRows().add(dto);
            }
        } catch (IOException | RuntimeException ex) {
            log.warn("Fichier d'import illisible : {}", ex.getMessage());
            throw BusinessException.of(ErrorCode.IMPORT_FILE_INVALID,
                    "Le fichier n'a pas pu être lu. Utilisez le modèle Excel fourni.");
        }

        summarise(preview);

        UUID batchId = UUID.randomUUID();
        pendingBatches.put(batchId, parsed);
        preview.setBatchId(batchId);

        log.info("Import analysé : {} ligne(s), {} valide(s), {} doublon(s), {} en erreur",
                preview.getTotalRows(), preview.getValidRows(),
                preview.getDuplicateRows(), preview.getInvalidRows());
        return preview;
    }

    private ParsedRow readRow(Row row, ImportRowResponse dto,
                              Map<String, Classroom> classesByName, UUID schoolId) {
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

        Classroom classroom = className.isBlank() ? null : classesByName.get(normalise(className));
        if (className.isBlank()) {
            dto.addWarning("Aucune classe : l'élève sera créé sans inscription");
        } else if (classroom == null) {
            dto.addError("Classe « " + className + " » introuvable");
        }

        if (guardianPhone.isBlank()) {
            dto.addWarning("Aucun téléphone de responsable");
        }

        // Doublon : même nom, même prénom, même date de naissance
        if (dto.getStatus() != ImportRowResponse.Status.INVALID && birthDate != null
                && !studentRepository.findPotentialDuplicates(
                        schoolId, firstName, lastName, birthDate).isEmpty()) {
            dto.setStatus(ImportRowResponse.Status.DUPLICATE);
            dto.getWarnings().add("Un élève identique existe déjà : la ligne sera ignorée");
        }

        return new ParsedRow(dto.getRowNumber(), lastName, firstName, gender, birthDate,
                birthPlace, nationality, classroom == null ? null : classroom.getId(),
                guardianName, guardianPhone, guardianEmail, relationship, previousSchool,
                dto.getStatus());
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
    }

    // ------------------------------------------------------------------
    // 2. Confirmation : écriture effective
    // ------------------------------------------------------------------

    /**
     * Importe les lignes retenues.
     *
     * <p>Chaque élève passe par le service d'inscription habituel : une classe
     * pleine ou une règle métier bloque cette ligne-là, sans faire échouer les
     * autres. Le rapport final indique exactement ce qui est passé.</p>
     */
    @Transactional
    public ImportPreviewResponse confirm(UUID batchId) {
        List<ParsedRow> rows = pendingBatches.get(batchId);
        if (rows == null) {
            throw BusinessException.of(ErrorCode.IMPORT_BATCH_NOT_FOUND,
                    "Cet aperçu a expiré. Redéposez le fichier.");
        }

        UUID schoolId = TenantContext.getSchoolId();
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));

        ImportPreviewResponse report = new ImportPreviewResponse();
        report.setBatchId(batchId);
        int imported = 0;

        for (ParsedRow row : rows) {
            if (row.status() == ImportRowResponse.Status.INVALID
                    || row.status() == ImportRowResponse.Status.DUPLICATE) {
                continue;
            }
            ImportRowResponse result = new ImportRowResponse();
            result.setRowNumber(row.rowNumber());
            result.setStatus(ImportRowResponse.Status.VALID);
            try {
                Student student = createStudent(row, school);
                attachGuardian(row, student, school);
                if (row.classroomId() != null) {
                    enrol(student, row.classroomId());
                }
                result.setPreviewStudentNumber(student.getStudentNumber());
                imported++;
            } catch (BusinessException ex) {
                // Une ligne refusée n'annule pas les autres : elle est signalée.
                result.addError(ex.getMessage());
            }
            report.getRows().add(result);
        }

        pendingBatches.remove(batchId);
        summarise(report);
        log.info("Import confirmé : {} élève(s) créé(s) sur {} ligne(s) retenues",
                imported, rows.size());
        return report;
    }

    private Student createStudent(ParsedRow row, School school) {
        Student student = new Student();
        student.setSchool(school);
        student.setStudentNumber(studentService.generateStudentNumber(school));
        student.setLastName(row.lastName().trim());
        student.setFirstName(row.firstName().trim());
        student.setGender(row.gender());
        student.setBirthDate(row.birthDate());
        student.setBirthPlace(blankToNull(row.birthPlace()));
        student.setNationality(blankToNull(row.nationality()));
        student.setPreviousSchool(blankToNull(row.previousSchool()));
        student.setAdmissionDate(LocalDate.now());
        student.setStatus(StudentStatus.ADMITTED);
        return studentRepository.save(student);
    }

    /** Réutilise un responsable déjà connu au même numéro, plutôt que d'en créer un doublon. */
    private void attachGuardian(ParsedRow row, Student student, School school) {
        if (row.guardianName().isBlank() || row.guardianPhone().isBlank()) {
            return;
        }
        Guardian guardian = guardianRepository
                .findBySchoolIdAndPhone(school.getId(), row.guardianPhone().trim())
                .orElseGet(() -> {
                    Guardian created = new Guardian();
                    created.setSchool(school);
                    String[] parts = row.guardianName().trim().split("\\s+", 2);
                    created.setLastName(parts[0]);
                    created.setFirstName(parts.length > 1 ? parts[1] : parts[0]);
                    created.setPhone(row.guardianPhone().trim());
                    created.setEmail(blankToNull(row.guardianEmail()));
                    return guardianRepository.save(created);
                });

        if (studentGuardianRepository.existsByStudentIdAndGuardianId(
                student.getId(), guardian.getId())) {
            return;
        }
        StudentGuardian link = new StudentGuardian();
        link.setStudent(student);
        link.setGuardian(guardian);
        link.setRelationship(parseRelationship(row.relationship()));
        link.setPrimary(true);
        link.setFinancialResponsibility(true);
        studentGuardianRepository.save(link);
    }

    private void enrol(Student student, UUID classroomId) {
        EnrollmentCreateRequest request = new EnrollmentCreateRequest();
        request.setStudentId(student.getId());
        request.setClassroomId(classroomId);
        request.setValidateImmediately(true);
        // Clé stable : rejouer l'import ne crée pas de seconde inscription.
        request.setIdempotencyKey("import-" + student.getId());
        enrollmentService.enroll(request);
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

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
