package ci.company.eduops.messaging.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

/** Sends WhatsApp messages through Meta's Cloud API. Credentials are supplied as environment variables. */
@Component
public class WhatsAppCloudGateway implements WhatsAppGateway {

    private final RestClient client = RestClient.create();
    private final String token;
    private final String phoneNumberId;
    private final String templateName;
    private final String templateLanguage;
    private final String graphVersion;

    public WhatsAppCloudGateway(
            @Value("${messaging.whatsapp.access-token:}") String token,
            @Value("${messaging.whatsapp.phone-number-id:}") String phoneNumberId,
            @Value("${messaging.whatsapp.template-name:}") String templateName,
            @Value("${messaging.whatsapp.template-language:fr}") String templateLanguage,
            @Value("${messaging.whatsapp.graph-version:v23.0}") String graphVersion) {
        this.token = token == null ? "" : token.trim();
        this.phoneNumberId = phoneNumberId == null ? "" : phoneNumberId.trim();
        this.templateName = templateName == null ? "" : templateName.trim();
        this.templateLanguage = templateLanguage == null || templateLanguage.isBlank()
                ? "fr" : templateLanguage.trim();
        this.graphVersion = graphVersion == null || graphVersion.isBlank() ? "v23.0" : graphVersion.trim();
    }

    @Override
    public String send(String phone, String body) {
        if (!isLive()) {
            throw new SmsDeliveryException("WhatsApp Business requiert les identifiants Meta et un modèle approuvé à un paramètre.");
        }
        String digits = phone == null ? "" : phone.replaceAll("\\D", "");
        if (digits.length() < 8) {
            throw new SmsDeliveryException("Numéro de téléphone invalide pour WhatsApp.");
        }
        if (body == null || body.isBlank() || body.length() > 1024) {
            throw new SmsDeliveryException("Le rappel WhatsApp doit contenir entre 1 et 1 024 caractères.");
        }
        try {
            Map<?, ?> response = client.post()
                    .uri("https://graph.facebook.com/{version}/{phoneNumberId}/messages", graphVersion, phoneNumberId)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("messaging_product", "whatsapp", "recipient_type", "individual",
                            "to", digits, "type", "template", "template", Map.of(
                                    "name", templateName,
                                    "language", Map.of("code", templateLanguage),
                                    "components", List.of(Map.of("type", "body", "parameters",
                                            List.of(Map.of("type", "text", "text", body)))))))
                    .retrieve().body(Map.class);
            Object messages = response == null ? null : response.get("messages");
            if (messages instanceof List<?> list && !list.isEmpty() && list.get(0) instanceof Map<?, ?> message) {
                Object id = message.get("id");
                return id == null ? null : id.toString();
            }
            throw new SmsDeliveryException("WhatsApp n'a pas retourné de référence d'envoi.");
        } catch (RestClientResponseException exception) {
            throw new SmsDeliveryException("WhatsApp a refusé le message (HTTP "
                    + exception.getStatusCode().value() + ").");
        }
    }

    @Override public boolean isLive() {
        return !token.isBlank() && !phoneNumberId.isBlank() && !templateName.isBlank();
    }

    @Override
    public String describe() {
        return isLive() ? "WhatsApp Business Cloud API · modèle « " + templateName + " »"
                : "Non configuré (identifiants Meta et modèle de relance approuvé requis)";
    }
}
