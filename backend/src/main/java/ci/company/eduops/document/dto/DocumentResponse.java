package ci.company.eduops.document.dto;

import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.document.domain.DocumentStatus;
import ci.company.eduops.document.domain.DocumentType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class DocumentResponse {
    private UUID id;
    private DocumentType type;
    private String typeLabel;
    private String documentNumber;
    private String verificationCode;
    private String title;
    private DocumentStatus status;
    private OffsetDateTime issuedAt;
    private LocalDate validUntil;

    private UUID studentId;
    private String studentName;
    private String studentNumber;
    private Gender gender;
    private LocalDate birthDate;
    private String birthPlace;
    private String nationality;
    private String photoUrl;

    private UUID enrollmentId;
    private String enrollmentNumber;
    private String classroomName;
    private String levelName;
    private UUID academicYearId;
    private String academicYearCode;

    private Map<String, Object> metadata = new LinkedHashMap<>();
    private DocumentLayoutDto layout;
    private OffsetDateTime revokedAt;
    private String revokeReason;
}

