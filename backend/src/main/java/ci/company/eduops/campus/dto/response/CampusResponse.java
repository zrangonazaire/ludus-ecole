package ci.company.eduops.campus.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * Représentation d'un campus, avec les effectifs calculés par le backend.
 */
@Schema(name = "Campus", description = "Un site physique de l'établissement")
public class CampusResponse {

    private UUID id;
    private String code;
    private String name;
    private String addressLine1;
    private String city;
    private String phone;
    private String email;
    private boolean main;
    private String status;

    @Schema(description = "Nombre de salles rattachées")
    private int roomCount;

    @Schema(description = "Vrai quand l'archivage est autorisé (serveur)")
    private boolean archivable;

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

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isMain() {
        return main;
    }

    public void setMain(boolean main) {
        this.main = main;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }

    public boolean isArchivable() {
        return archivable;
    }

    public void setArchivable(boolean archivable) {
        this.archivable = archivable;
    }
}
