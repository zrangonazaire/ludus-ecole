package ci.company.eduops.audit.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Une ligne du journal, telle qu'un écran a le droit de la montrer.
 *
 * <h2>Ce que cette classe ne porte pas</h2>
 *
 * <p>Ni {@code oldValue} ni {@code newValue}. Le journal enregistre le
 * contenu des champs modifiés, et il enregistre tout : dossiers médicaux,
 * paiements, coordonnées des familles. Le rendre lisible à quiconque détient
 * {@code AUDIT_VIEW} ferait de l'audit une porte dérobée vers des données que
 * cette même personne ne peut pas ouvrir directement — exactement ce que le
 * cloisonnement du module santé s'attache à empêcher.</p>
 *
 * <p>Restent les <em>noms</em> des champs touchés : « téléphone, adresse »
 * suffit à savoir quoi vérifier, et à savoir auprès de qui. Ajouter un champ
 * de valeur ici annulerait la protection sans qu'aucun écran ne change
 * d'apparence, donc sans que personne ne s'en aperçoive.</p>
 */
public class AuditEntryResponse {

    private Long id;
    private OffsetDateTime occurredAt;
    private String action;
    private String actionLabel;
    private String entityType;
    private String entityTypeLabel;
    private UUID entityId;

    /** Le libellé lisible de l'objet touché : « KONE Aminata », « 6ème A ». */
    private String entityLabel;

    private String username;
    private UUID userId;

    /** Les champs modifiés, par leur nom. Jamais leur contenu. */
    private List<String> changedFields = List.of();

    private String reason;
    private boolean success;
    private String errorCode;
    private String ipAddress;
    private UUID correlationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OffsetDateTime getOccurredAt() {
        return occurredAt;
    }

    public void setOccurredAt(OffsetDateTime occurredAt) {
        this.occurredAt = occurredAt;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getActionLabel() {
        return actionLabel;
    }

    public void setActionLabel(String actionLabel) {
        this.actionLabel = actionLabel;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityTypeLabel() {
        return entityTypeLabel;
    }

    public void setEntityTypeLabel(String entityTypeLabel) {
        this.entityTypeLabel = entityTypeLabel;
    }

    public UUID getEntityId() {
        return entityId;
    }

    public void setEntityId(UUID entityId) {
        this.entityId = entityId;
    }

    public String getEntityLabel() {
        return entityLabel;
    }

    public void setEntityLabel(String entityLabel) {
        this.entityLabel = entityLabel;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<String> getChangedFields() {
        return changedFields;
    }

    public void setChangedFields(List<String> changedFields) {
        this.changedFields = changedFields;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public UUID getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(UUID correlationId) {
        this.correlationId = correlationId;
    }
}
