package ci.company.eduops.room.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Les listes de choix de l'écran Salles, en une lecture.
 *
 * <p>Les campus sont servis ici plutôt que par {@code /api/v1/campuses} : un
 * gestionnaire de salles reçoit {@code ROOM_VIEW} sans forcément
 * {@code CAMPUS_VIEW}, et son formulaire doit pouvoir proposer les campus
 * sans recevoir un 403 au moment d'ouvrir la liste déroulante.</p>
 */
@Schema(name = "RoomOptions", description = "Campus et types de salle disponibles")
public class RoomOptionsResponse {

    private List<CampusOption> campuses = new ArrayList<>();
    private List<String> roomTypes = new ArrayList<>();

    public List<CampusOption> getCampuses() {
        return campuses;
    }

    public void setCampuses(List<CampusOption> campuses) {
        this.campuses = campuses;
    }

    public List<String> getRoomTypes() {
        return roomTypes;
    }

    public void setRoomTypes(List<String> roomTypes) {
        this.roomTypes = roomTypes;
    }

    /** Un campus réduit à ce qu'il faut pour remplir une liste déroulante. */
    @Schema(name = "RoomCampusOption", description = "Campus proposé dans les filtres")
    public static class CampusOption {

        private UUID id;
        private String code;
        private String name;
        private String status;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}