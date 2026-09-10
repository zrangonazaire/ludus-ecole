package ci.company.eduops.portal.dto.response;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * L'état d'accès au portail d'une personne.
 *
 * <h2>Ce que cette classe ne porte pas</h2>
 *
 * <p>Ni l'identifiant du compte, ni l'identifiant de connexion. Cet écran
 * répond à « qui peut se connecter », pas à « comment se connecter à sa
 * place ». Exposer le nom d'utilisateur d'un parent à toute personne ayant
 * {@code SCHOOL_VIEW} lui donnerait la moitié d'un couple identifiant/mot de
 * passe, et rendrait la page de connexion attaquable compte par compte —
 * exactement ce que le message d'erreur uniforme s'attache à éviter.</p>
 */
public class PortalAccessResponse {

    /** L'identifiant métier : responsable ou élève, jamais le compte. */
    private UUID id;

    /** GUARDIAN ou STUDENT. */
    private String personType;
    private String personTypeLabel;

    private String fullName;

    /** Le matricule pour un élève, vide pour un responsable. */
    private String reference;

    /** Les élèves concernés, pour un responsable : « Aya, Yao ». */
    private String relatedTo;

    private boolean hasAccount;
    private boolean hasEmail;
    private boolean hasPhone;
    private boolean accountActive;
    private boolean portalPermissionGranted;

    /** Vrai seulement si tout est réuni pour se connecter aujourd'hui. */
    private boolean canSignIn;

    /** Ce qui manque, en une phrase adressée à qui doit agir. */
    private String blockingReason;

    private OffsetDateTime lastLoginAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPersonType() {
        return personType;
    }

    public void setPersonType(String personType) {
        this.personType = personType;
    }

    public String getPersonTypeLabel() {
        return personTypeLabel;
    }

    public void setPersonTypeLabel(String personTypeLabel) {
        this.personTypeLabel = personTypeLabel;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getRelatedTo() {
        return relatedTo;
    }

    public void setRelatedTo(String relatedTo) {
        this.relatedTo = relatedTo;
    }

    public boolean isHasAccount() {
        return hasAccount;
    }

    public void setHasAccount(boolean hasAccount) {
        this.hasAccount = hasAccount;
    }

    public boolean isHasEmail() {
        return hasEmail;
    }

    public void setHasEmail(boolean hasEmail) {
        this.hasEmail = hasEmail;
    }

    public boolean isHasPhone() {
        return hasPhone;
    }

    public void setHasPhone(boolean hasPhone) {
        this.hasPhone = hasPhone;
    }

    public boolean isAccountActive() {
        return accountActive;
    }

    public void setAccountActive(boolean accountActive) {
        this.accountActive = accountActive;
    }

    public boolean isPortalPermissionGranted() {
        return portalPermissionGranted;
    }

    public void setPortalPermissionGranted(boolean portalPermissionGranted) {
        this.portalPermissionGranted = portalPermissionGranted;
    }

    public boolean isCanSignIn() {
        return canSignIn;
    }

    public void setCanSignIn(boolean canSignIn) {
        this.canSignIn = canSignIn;
    }

    public String getBlockingReason() {
        return blockingReason;
    }

    public void setBlockingReason(String blockingReason) {
        this.blockingReason = blockingReason;
    }

    public OffsetDateTime getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(OffsetDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }
}
