package ci.company.eduops.report.service;

import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.tenant.TenantContext;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.XSSFDataValidationHelper;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Produit le classeur modèle que le secrétariat remplit hors ligne.
 *
 * <p>Le modèle n'est pas un fichier figé : il est généré pour l'établissement
 * qui le demande, avec ses classes réelles proposées en liste déroulante. Un
 * fichier générique obligerait à saisir les noms de classe à la main, et
 * l'import échouerait sur des fautes de frappe.</p>
 */
@Service
public class StudentImportTemplateService {

    /** Ordre des colonnes ; il fait foi pour la lecture comme pour l'écriture. */
    public static final List<String> COLUMNS = List.of(
            "Nom", "Prénoms", "Sexe", "Date de naissance", "Lieu de naissance",
            "Nationalité", "Classe", "Nom du responsable", "Téléphone du responsable",
            "Email du responsable", "Lien de parenté", "École précédente");

    private final ClassroomRepository classroomRepository;
    private final AcademicYearRepository academicYearRepository;

    public StudentImportTemplateService(ClassroomRepository classroomRepository,
                                        AcademicYearRepository academicYearRepository) {
        this.classroomRepository = classroomRepository;
        this.academicYearRepository = academicYearRepository;
    }

    @Transactional(readOnly = true)
    public byte[] build() {
        UUID schoolId = TenantContext.getSchoolId();
        List<String> classNames = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .map(year -> classroomRepository
                        .findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE)
                        .stream()
                        .map(c -> c.getName())
                        .sorted()
                        .toList())
                .orElse(List.of());

        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            XSSFSheet sheet = workbook.createSheet("Élèves");
            writeHeader(workbook, sheet);
            writeExample(sheet);
            applyClassDropdown(sheet, classNames);
            writeHelpSheet(workbook, classNames);

            for (int i = 0; i < COLUMNS.size(); i++) {
                sheet.autoSizeColumn(i);
                // autoSizeColumn serre trop : on laisse respirer les colonnes.
                sheet.setColumnWidth(i, Math.min(sheet.getColumnWidth(i) + 900, 8000));
            }
            sheet.createFreezePane(0, 1);

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException ex) {
            throw new IllegalStateException("Impossible de générer le modèle Excel", ex);
        }
    }

    private void writeHeader(Workbook workbook, Sheet sheet) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setBorderBottom(BorderStyle.THIN);

        Row header = sheet.createRow(0);
        for (int i = 0; i < COLUMNS.size(); i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(COLUMNS.get(i));
            cell.setCellStyle(style);
        }
    }

    /** Une ligne d'exemple, en gris clair, que l'import ignore. */
    private void writeExample(Sheet sheet) {
        CellStyle style = sheet.getWorkbook().createCellStyle();
        Font font = sheet.getWorkbook().createFont();
        font.setItalic(true);
        font.setColor(IndexedColors.GREY_50_PERCENT.getIndex());
        style.setFont(font);

        List<String> example = List.of(
                "KONE", "Aya Marie", "F", "14/05/2012", "Abidjan",
                "Ivoirienne", "6ème A", "KONE Mariam", "+225 07 11 22 33",
                "mariam.kone@mail.ci", "Mère", "EPP Cocody");

        Row row = sheet.createRow(1);
        for (int i = 0; i < example.size(); i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(example.get(i));
            cell.setCellStyle(style);
        }
    }

    /** Liste déroulante des classes réelles, pour éviter les fautes de frappe. */
    private void applyClassDropdown(XSSFSheet sheet, List<String> classNames) {
        if (classNames.isEmpty()) {
            return;
        }
        int classColumn = COLUMNS.indexOf("Classe");
        DataValidationHelper helper = new XSSFDataValidationHelper(sheet);
        DataValidationConstraint constraint =
                helper.createExplicitListConstraint(classNames.toArray(new String[0]));
        CellRangeAddressList range = new CellRangeAddressList(2, 500, classColumn, classColumn);
        DataValidation validation = helper.createValidation(constraint, range);
        validation.setShowErrorBox(true);
        validation.setErrorStyle(DataValidation.ErrorStyle.STOP);
        validation.createErrorBox("Classe inconnue",
                "Choisissez une classe existante dans la liste.");
        sheet.addValidationData(validation);
    }

    /** Feuille d'aide : consignes et rappel des classes disponibles. */
    private void writeHelpSheet(Workbook workbook, List<String> classNames) {
        Sheet help = workbook.createSheet("Mode d'emploi");
        CellStyle bold = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        bold.setFont(font);

        String[][] lines = {
                {"Comment remplir ce fichier", ""},
                {"", ""},
                {"1.", "Remplissez une ligne par élève, à partir de la ligne 3."},
                {"2.", "La ligne 2 est un exemple : vous pouvez l'effacer, elle sera ignorée."},
                {"3.", "Les colonnes Nom, Prénoms, Sexe et Date de naissance sont obligatoires."},
                {"4.", "Sexe : M ou F."},
                {"5.", "Date de naissance au format JJ/MM/AAAA."},
                {"6.", "Classe : choisissez dans la liste déroulante."},
                {"7.", "Le matricule est attribué automatiquement : ne le saisissez pas."},
                {"", ""},
                {"Ce qui se passe ensuite", ""},
                {"", "Le fichier est d'abord analysé et affiché à l'écran."},
                {"", "Les doublons et les erreurs sont signalés ligne par ligne."},
                {"", "Rien n'est enregistré tant que vous n'avez pas confirmé."},
                {"", ""},
                {"Classes disponibles", ""}
        };

        int r = 0;
        for (String[] line : lines) {
            Row row = help.createRow(r++);
            Cell first = row.createCell(0);
            first.setCellValue(line[0]);
            if (!line[0].isBlank() && line[1].isBlank()) {
                first.setCellStyle(bold);
            }
            row.createCell(1).setCellValue(line[1]);
        }
        for (String name : classNames) {
            help.createRow(r++).createCell(1).setCellValue(name);
        }
        help.setColumnWidth(0, 3000);
        help.setColumnWidth(1, 16000);
    }
}
