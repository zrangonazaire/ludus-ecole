package ci.company.eduops.messaging.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.messaging.domain.MessageCampaign;
import ci.company.eduops.messaging.domain.MessageRecipient;
import ci.company.eduops.messaging.domain.MessageResponseRequest;
import ci.company.eduops.messaging.repository.MessageResponseRequestRepository;
import ci.company.eduops.security.service.CurrentUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;

@Service
public class MessageResponseService {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int TOKEN_TTL_DAYS = 30;
    private final MessageResponseRequestRepository repository;
    private final EduOpsProperties properties;
    private final CurrentUser currentUser;

    public MessageResponseService(MessageResponseRequestRepository repository,
                                  EduOpsProperties properties, CurrentUser currentUser) {
        this.repository = repository;
        this.properties = properties;
        this.currentUser = currentUser;
    }

    /** Creates one unguessable, one-use response link for a resolved recipient. */
    @Transactional
    public String createLink(MessageCampaign campaign, MessageRecipient recipient) {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        String rawToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

        MessageResponseRequest request = new MessageResponseRequest();
        request.setCampaign(campaign);
        request.setRecipient(recipient);
        request.setTokenHash(hash(rawToken));
        request.setExpiresAt(OffsetDateTime.now().plusDays(TOKEN_TTL_DAYS));
        repository.save(request);

        return properties.getApp().getBaseUrl().replaceAll("/+$", "")
                + "/opinion-response/" + rawToken;
    }

    @Transactional(readOnly = true)
    @TenantBypass
    public PublicRequest publicRequest(String token) {
        MessageResponseRequest request = findByToken(token);
        if (request.getAnsweredAt() != null) {
            return new PublicRequest(request.getCampaign().getSchool().getName(),
                    request.getCampaign().getTitle(), request.getCampaign().getResponseQuestion(),
                    true, request.getExpiresAt());
        }
        if (request.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw invalidLink();
        }
        return new PublicRequest(request.getCampaign().getSchool().getName(),
                request.getCampaign().getTitle(), request.getCampaign().getResponseQuestion(),
                false, request.getExpiresAt());
    }

    @Transactional
    @TenantBypass
    public void answer(String token, String answer) {
        MessageResponseRequest request = findByToken(token);
        if (request.getExpiresAt().isBefore(OffsetDateTime.now())
                || request.getAnsweredAt() != null) {
            throw invalidLink();
        }
        request.setAnswer(answer.trim());
        request.setAnsweredAt(OffsetDateTime.now());
        repository.save(request);
    }

    @Transactional(readOnly = true)
    public List<ReceivedResponse> received() {
        currentUser.requirePermission("MESSAGE_VIEW");
        return repository.findAnswered().stream()
                .map(request -> new ReceivedResponse(request.getId().toString(),
                        request.getCampaign().getTitle(),
                        request.getRecipient().getRecipientName(),
                        request.getRecipient().getAddress(), request.getAnswer(),
                        request.getAnsweredAt()))
                .toList();
    }

    private MessageResponseRequest findByToken(String token) {
        if (token == null || token.length() < 40 || token.length() > 100) {
            throw invalidLink();
        }
        return repository.findForPublicToken(hash(token)).orElseThrow(this::invalidLink);
    }

    private BusinessException invalidLink() {
        return new BusinessException(ErrorCode.RESOURCE_NOT_FOUND,
                "Ce lien de réponse est invalide, déjà utilisé ou expiré.");
    }

    private static String hash(String token) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                    .digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException impossible) {
            throw new IllegalStateException("SHA-256 is unavailable", impossible);
        }
    }

    public record PublicRequest(String schoolName, String campaignTitle, String question,
                                boolean answered, OffsetDateTime expiresAt) { }

    public record ReceivedResponse(String id, String campaignTitle, String recipientName,
                                   String recipientAddress, String answer,
                                   OffsetDateTime answeredAt) { }
}
