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
import ci.company.eduops.report.domain.ImportBatch;
import ci.company.eduops.report.domain.ImportBatchStatus;
import ci.company.eduops.report.dto.ImportPreviewResponse;
import ci.company.eduops.report.dto.ImportRowResponse;
import ci.company.eduops.report.repository.ImportBatchRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.security.service.CurrentUser;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
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
    private final StudentService studentService;
    private final EnrollmentService enrollmentService;
    private final ImportBatchRepository batchRepository;
    private final ObjectMapper objectMapper;
    private final CurrentUser currentUser;

    public StudentImportService(SchoolRepository schoolRepository,
                                StudentRepository studentRepository,
                                GuardianRepository guardianRepository,
                                StudentGuardianRepository studentGuardianRepository,
                                ClassroomRepository classroomRepository,
                                AcademicYearRepository academicYearRepository,
                                StudentService studentService,
                                EnrollmentService enrollmentService,
                                ImportBatchRepository batchRepository,
                                ObjectMapper objectMapper,
                                CurrentUser currentUser) {
        this.schoolRepository = schoolRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.classroomRepository = classroomRepository;
        this.academicYearRepository = academicYearRepository;
        this.studentService = studentService;
        this.enrollmentService = enrollmentService;
        this.batchRepository = batchRepository;
        this.objectMapper = objectMapper;
        this.currentUser = currentUser;
    }

    /**
     * Une ligne analysée, conservée jusqu'à la confirmation.
     *
     * <p>Classe et non {@code record} : cet objet fait un aller-retour par la
     * colonne JSONB, et une classe à accesseurs est ce que Jackson relit sans
     * dépendre des noms de paramètres conservés à la compilation.</p>
     */
    public static class ParsedRow {

        private int rowNumber;
        private String lastName;
        private String firstName;
        private Gender gender;
        private LocalDate birthDate;
        private String birthPlace;
        private String nationality;
        private UUID classroomId;
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
        UUID schoolId = TenantContext.getSchoolId();
        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));

        // Les octets sont lus une fois : le flux d'un MultipartFile ne se
        // rembobine pas, et il faut a la fois le hacher et le passer a POI.
        byte[] content = readBytes(file);
        String fileHash = sha256(content);

        Map<String, Classroom> classesByName = new HashMap<>();
        for (Classroom c : classroomRepository
                .findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE)) {
            classesByName.put(normalise(c.getName()), c);
        }

        List<ParsedRow> parsed = new ArrayList<>();
        ImportPreviewResponse preview = new ImportPreviewResponse();
        preview.setFileName(file.getOriginalFilename());

        try (InputStream in = new ByteArrayInputStream(content);
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

    /**
     * Signale que ce fichier exact a déjà été importé.
     *
     * <p>Avertit, sans bloquer : une école peut légitimement redéposer une
     * liste corrigée sous le même nom, et seul le contenu identique au bit
     * près déclenche ce message. Mais réimporter deux fois la même liste crée
     * chaque élève en double, et c'est la faute la plus coûteuse à défaire
     * ici — mieux vaut la dire avant la confirmation qu'après.</p>
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

        ParsedRow parsed = new ParsedRow();
        parsed.setRowNumber(dto.getRowNumber());
        parsed.setLastName(lastName);
        parsed.setFirstName(firstName);
        parsed.setGender(gender);
        parsed.setBirthDate(birthDate);
        parsed.setBirthPlace(birthPlace);
        parsed.setNationality(nationality);
        parsed.setClassroomId(classroom == null ? null : classroom.getId());
        parsed.setGuardianName(guardianName);
        parsed.setGuardianPhone(guardianPhone);
        parsed.setGuardianEmail(guardianEmail);
        parsed.setRelationship(relationship);
        parsed.setPreviousSchool(previousSchool);
        parsed.setStatus(dto.getStatus());
        return parsed;
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
        UUID schoolId = TenantContext.getSchoolId();
        // L'ecole est dans la requete, jamais dans l'identifiant fourni : un
        // lot appartenant a un autre etablissement est introuvable, pas refuse.
        ImportBatch batch = batchRepository.findByIdAndSchoolId(batchId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.IMPORT_BATCH_NOT_FOUND,
                        "Cet aperçu est introuvable. Redéposez le fichier."));

        if (batch.getStatus() == ImportBatchStatus.IMPORTED) {
            // Sans ce garde-fou, un double-clic sur « Confirmer » creerait
            // chaque eleve deux fois.
            throw BusinessException.of(ErrorCode.CONFLICT,
                    "Ce fichier a déjà été importé le "
                            + FRENCH_DATE.format(batch.getConfirmedAt())
                            + " : " + batch.getImportedRows() + " élève(s) créé(s).");
        }

        List<ParsedRow> rows = readRows(batch);

        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));

        ImportPreviewResponse report = new ImportPreviewResponse();
        report.setBatchId(batchId);
        int imported = 0;

        for (ParsedRow row : rows) {
            if (row.getStatus() == ImportRowResponse.Status.INVALID
                    || row.getStatus() == ImportRowResponse.Status.DUPLICATE) {
                continue;
            }
            ImportRowResponse result = new ImportRowResponse();
            result.setRowNumber(row.getRowNumber());
            result.setStatus(ImportRowResponse.Status.VALID);
            try {
                Student student = createStudent(row, school);
                attachGuardian(row, student, school);
                if (row.getClassroomId() != null) {
                    enrol(student, row.getClassroomId());
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
        // Les lignes analysees ne servent plus : l'historique garde les
        // compteurs et le sort de chaque ligne, pas le fichier entier.
        batch.setPreview(null);
        batch.setErrors(refusedRows(report));
        batchRepository.save(batch);

        log.info("Import confirmé : {} élève(s) créé(s) sur {} ligne(s) retenues",
                imported, rows.size());
        return report;
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
        student.setAdmissionDate(LocalDate.now());
        student.setStatus(StudentStatus.ADMITTED);
        return studentRepository.save(student);
    }

    /** Réutilise un responsable déjà connu au même numéro, plutôt que d'en créer un doublon. */
    private void attachGuardian(ParsedRow row, Student student, School school) {
        if (row.getGuardianName().isBlank() || row.getGuardianPhone().isBlank()) {
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

    private byte[] readBytes(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException ex) {
            log.warn("Fichier d'import illisible : {}", ex.getMessage());
            throw BusinessException.of(ErrorCode.IMPORT_FILE_INVALID,
                    "Le fichier n'a pas pu être lu. Réessayez.");
        }
    }

    /**
     * Empreinte du contenu, pour reconnaître un fichier déjà importé.
     *
     * <p>Un défaut de hachage ne doit pas empêcher un import : sans empreinte,
     * on perd l'avertissement, pas la fonction. D'où le {@code null} plutôt
     * qu'une exception.</p>
     */
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
