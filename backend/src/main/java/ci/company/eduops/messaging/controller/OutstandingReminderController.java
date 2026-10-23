package ci.company.eduops.messaging.controller;

import ci.company.eduops.messaging.domain.CampaignKind;
import ci.company.eduops.messaging.domain.MessageCampaign;
import ci.company.eduops.messaging.domain.MessageRecipient;
import ci.company.eduops.messaging.domain.ReminderType;
import ci.company.eduops.messaging.service.MessagingService;
import ci.company.eduops.notification.domain.NotificationChannel;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/** Bulk financial reminders from the outstanding balance board. */
@RestController
@RequestMapping("/api/v1/outstanding/reminders")
public class OutstandingReminderController {

    private final MessagingService messagingService;

    public OutstandingReminderController(MessagingService messagingService) {
        this.messagingService = messagingService;
    }

    public record PrepareRequest(
            @NotEmpty List<UUID> studentIds,
            @NotNull NotificationChannel channel,
            @Size(max = 200) String title,
            @Size(max = 200) String subject,
            @NotNull @Size(min = 1, max = 4000) String bodyTemplate) { }

    public record RecipientPreview(String name, String address) { }

    public record PreviewResponse(UUID campaignId, String title, String channel,
                                  int recipientCount, int unreachableCount,
                                  List<String> unreachable, int withoutConsent,
                                  String sample, boolean sampleIsExample,
                                  BigDecimal estimatedCost, String currency,
                                  int smsSegments, boolean gatewayLive, String gatewayName,
                                  List<RecipientPreview> recipients) { }

    public record RecipientResult(String name, String address, String status,
                                  String failureReason, OffsetDateTime sentAt) { }

    public record SendResponse(UUID campaignId, String status, int sentCount,
                               int failedCount, List<RecipientResult> recipients) { }

    @PostMapping("/prepare")
    @PreAuthorize("hasAuthority('MESSAGE_COMPOSE')")
    public ResponseEntity<PreviewResponse> prepare(@Valid @RequestBody PrepareRequest request) {
        var preview = messagingService.prepare(CampaignKind.REMINDER, ReminderType.UNPAID_FEES,
                request.channel(), request.title(), request.subject(), request.bodyTemplate(),
                request.studentIds(), null);
        MessageCampaign campaign = preview.getCampaign();
        return ResponseEntity.ok(new PreviewResponse(campaign.getId(), campaign.getTitle(),
                campaign.getChannel().name(), campaign.getRecipientCount(),
                preview.getUnreachable().size(), preview.getUnreachable(),
                preview.getWithoutConsent(), preview.getSample(), preview.isSampleIsExample(),
                campaign.getChannel() == NotificationChannel.WHATSAPP
                        ? null : campaign.getEstimatedCost(),
                campaign.getCurrency(), campaign.getSegmentCount(), preview.isGatewayLive(),
                preview.getGatewayName(), campaign.getRecipients().stream()
                        .map(recipient -> new RecipientPreview(recipient.getRecipientName(),
                                recipient.getAddress())).toList()));
    }

    @PostMapping("/{campaignId}/send")
    @PreAuthorize("hasAuthority('MESSAGE_SEND')")
    public ResponseEntity<SendResponse> send(@PathVariable UUID campaignId) {
        MessageCampaign campaign = messagingService.send(campaignId);
        List<RecipientResult> rows = campaign.getRecipients().stream()
                .map(OutstandingReminderController::result).toList();
        return ResponseEntity.ok(new SendResponse(campaign.getId(), campaign.getStatus().name(),
                campaign.getSentCount(), campaign.getFailedCount(), rows));
    }

    private static RecipientResult result(MessageRecipient recipient) {
        return new RecipientResult(recipient.getRecipientName(), recipient.getAddress(),
                recipient.getStatus().name(), recipient.getFailureReason(), recipient.getSentAt());
    }
}
