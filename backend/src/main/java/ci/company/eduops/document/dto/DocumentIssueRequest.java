package ci.company.eduops.document.dto;

import ci.company.eduops.document.domain.DocumentType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
public class DocumentIssueRequest {

    @NotNull
    private UUID studentId;
    @NotNull
    private DocumentType type;
    @NotNull
    private LocalDate issueDate;
    private LocalDate validUntil;
    @Size(max = 500)
    private String purpose;
    @Size(max = 250)
    private String recipient;
    @Size(max = 1000)
    private String additionalMention;
    private LocalDate meetingDate;
    private LocalTime meetingTime;
    @Size(max = 250)
    private String meetingPlace;
}

