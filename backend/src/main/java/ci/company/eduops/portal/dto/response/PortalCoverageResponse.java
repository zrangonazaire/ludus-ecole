package ci.company.eduops.portal.dto.response;

import java.util.List;

/**
 * Combien de familles et d'élèves peuvent réellement se connecter.
 *
 * <p>Le chiffre qui compte n'est pas « combien de comptes existent » mais
 * « combien de personnes peuvent ouvrir le portail aujourd'hui ». Un compte
 * créé sans droit de portail, ou désactivé, gonfle le premier sans rien
 * changer au second — et c'est ainsi qu'une école croit avoir déployé son
 * portail alors que personne n'y entre.</p>
 */
public class PortalCoverageResponse {

    private long guardianTotal;
    private long guardianConnected;
    private long studentTotal;
    private long studentConnected;

    /** Le détail, ligne par ligne. */
    private List<PortalAccessResponse> people = List.of();

    public long getGuardianTotal() {
        return guardianTotal;
    }

    public void setGuardianTotal(long guardianTotal) {
        this.guardianTotal = guardianTotal;
    }

    public long getGuardianConnected() {
        return guardianConnected;
    }

    public void setGuardianConnected(long guardianConnected) {
        this.guardianConnected = guardianConnected;
    }

    public long getStudentTotal() {
        return studentTotal;
    }

    public void setStudentTotal(long studentTotal) {
        this.studentTotal = studentTotal;
    }

    public long getStudentConnected() {
        return studentConnected;
    }

    public void setStudentConnected(long studentConnected) {
        this.studentConnected = studentConnected;
    }

    public List<PortalAccessResponse> getPeople() {
        return people;
    }

    public void setPeople(List<PortalAccessResponse> people) {
        this.people = people;
    }
}
