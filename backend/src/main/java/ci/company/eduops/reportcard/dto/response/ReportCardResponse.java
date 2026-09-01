package ci.company.eduops.reportcard.dto.response;

import ci.company.eduops.promotion.domain.PromotionDecisionType;
import ci.company.eduops.reportcard.domain.ReportCardStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * One pupil's report card for one term.
 *
 * <p>Everything on it was computed once, at generation, and stored. It is not
 * recomputed on each read: a report card handed to a family in December must
 * still say in June exactly what it said then, even if a mark was corrected in
 * between. A correction produces a new revision, it does not rewrite the old
 * one.</p>
 */
@Schema(name = "ReportCard", description = "Le bulletin d'un élève")
public class ReportCardResponse {

    private UUID id;
    private String reference;

    @Schema(description = "Le code qu'une famille peut présenter pour faire vérifier "
            + "l'authenticité du bulletin", example = "A7K2-9QX4")
    private String verificationCode;

    private UUID studentId;
    private String studentName;
    private String studentNumber;
    private String photoUrl;

    private UUID classroomId;
    private String classroomName;
    private String levelName;
    private UUID termId;
    private String termName;
    private String academicYearCode;

    @Schema(description = "Nulle quand aucune matière n'a de note validée", example = "13.25")
    private BigDecimal generalAverage;

    private BigDecimal classAverage;
    private BigDecimal classMinAverage;
    private BigDecimal classMaxAverage;

    @Schema(description = "Rang à égalité : deux moyennes identiques partagent le rang, "
            + "et le suivant saute (1, 2, 2, 4).", example = "4")
    private Integer rankInClass;

    private Integer classSize;

    @Schema(description = "Rang et effectif ensemble, tels qu'imprimés", example = "4 / 32")
    private String rankLabel;

    private BigDecimal totalCoefficient;

    @Schema(description = "Barème sur lequel les moyennes sont exprimées", example = "20")
    private BigDecimal scaleMax;

    @Schema(description = "Moyenne à partir de laquelle l'élève a la moyenne", example = "10")
    private BigDecimal passingMark;

    @Schema(description = "Vrai quand la moyenne générale atteint la moyenne de passage")
    private boolean passing;

    private int absenceCount;
    private int justifiedAbsenceCount;
    private int latenessCount;

    private String generalRemark;
    private String headTeacherRemark;
    private String principalRemark;
    private PromotionDecisionType councilDecision;
    private String councilDecisionLabel;

    private ReportCardStatus status;
    private String statusLabel;

    @Schema(description = "Faux une fois le bulletin publié : les appréciations aussi "
            + "sont figées.")
    private boolean editable;

    @Schema(description = "Numéro de révision. Une correction de note après publication "
            + "produit une révision suivante, l'ancienne restant consultable.",
            example = "1")
    private int revision;

    private OffsetDateTime generatedAt;
    private OffsetDateTime publishedAt;

    private List<ReportCardLineResponse> lines = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
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

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public String getAcademicYearCode() {
        return academicYearCode;
    }

    public void setAcademicYearCode(String academicYearCode) {
        this.academicYearCode = academicYearCode;
    }

    public BigDecimal getGeneralAverage() {
        return generalAverage;
    }

    public void setGeneralAverage(BigDecimal generalAverage) {
        this.generalAverage = generalAverage;
    }

    public BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(BigDecimal classAverage) {
        this.classAverage = classAverage;
    }

    public BigDecimal getClassMinAverage() {
        return classMinAverage;
    }

    public void setClassMinAverage(BigDecimal classMinAverage) {
        this.classMinAverage = classMinAverage;
    }

    public BigDecimal getClassMaxAverage() {
        return classMaxAverage;
    }

    public void setClassMaxAverage(BigDecimal classMaxAverage) {
        this.classMaxAverage = classMaxAverage;
    }

    public Integer getRankInClass() {
        return rankInClass;
    }

    public void setRankInClass(Integer rankInClass) {
        this.rankInClass = rankInClass;
    }

    public Integer getClassSize() {
        return classSize;
    }

    public void setClassSize(Integer classSize) {
        this.classSize = classSize;
    }

    public String getRankLabel() {
        return rankLabel;
    }

    public void setRankLabel(String rankLabel) {
        this.rankLabel = rankLabel;
    }

    public BigDecimal getTotalCoefficient() {
        return totalCoefficient;
    }

    public void setTotalCoefficient(BigDecimal totalCoefficient) {
        this.totalCoefficient = totalCoefficient;
    }

    public BigDecimal getScaleMax() {
        return scaleMax;
    }

    public void setScaleMax(BigDecimal scaleMax) {
        this.scaleMax = scaleMax;
    }

    public BigDecimal getPassingMark() {
        return passingMark;
    }

    public void setPassingMark(BigDecimal passingMark) {
        this.passingMark = passingMark;
    }

    public boolean isPassing() {
        return passing;
    }

    public void setPassing(boolean passing) {
        this.passing = passing;
    }

    public int getAbsenceCount() {
        return absenceCount;
    }

    public void setAbsenceCount(int absenceCount) {
        this.absenceCount = absenceCount;
    }

    public int getJustifiedAbsenceCount() {
        return justifiedAbsenceCount;
    }

    public void setJustifiedAbsenceCount(int justifiedAbsenceCount) {
        this.justifiedAbsenceCount = justifiedAbsenceCount;
    }

    public int getLatenessCount() {
        return latenessCount;
    }

    public void setLatenessCount(int latenessCount) {
        this.latenessCount = latenessCount;
    }

    public String getGeneralRemark() {
        return generalRemark;
    }

    public void setGeneralRemark(String generalRemark) {
        this.generalRemark = generalRemark;
    }

    public String getHeadTeacherRemark() {
        return headTeacherRemark;
    }

    public void setHeadTeacherRemark(String headTeacherRemark) {
        this.headTeacherRemark = headTeacherRemark;
    }

    public String getPrincipalRemark() {
        return principalRemark;
    }

    public void setPrincipalRemark(String principalRemark) {
        this.principalRemark = principalRemark;
    }

    public PromotionDecisionType getCouncilDecision() {
        return councilDecision;
    }

    public void setCouncilDecision(PromotionDecisionType councilDecision) {
        this.councilDecision = councilDecision;
    }

    public String getCouncilDecisionLabel() {
        return councilDecisionLabel;
    }

    public void setCouncilDecisionLabel(String councilDecisionLabel) {
        this.councilDecisionLabel = councilDecisionLabel;
    }

    public ReportCardStatus getStatus() {
        return status;
    }

    public void setStatus(ReportCardStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public int getRevision() {
        return revision;
    }

    public void setRevision(int revision) {
        this.revision = revision;
    }

    public OffsetDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(OffsetDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public OffsetDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(OffsetDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

    public List<ReportCardLineResponse> getLines() {
        return lines;
    }

    public void setLines(List<ReportCardLineResponse> lines) {
        this.lines = lines;
    }
}
