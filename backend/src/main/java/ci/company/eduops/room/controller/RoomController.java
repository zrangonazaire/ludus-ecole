package ci.company.eduops.room.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.room.dto.request.RoomUpsertRequest;
import ci.company.eduops.room.dto.response.RoomOptionsResponse;
import ci.company.eduops.room.dto.response.RoomResponse;
import ci.company.eduops.room.service.RoomService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Bâtiments et salles physiques (section 19).
 *
 * <p>Ces salles sont celles que l'emploi du temps réserve et que les classes
 * prennent par défaut. Le module existait en base depuis la V4 mais n'avait
 * aucun point d'entrée : ni la direction ni le secrétariat ne pouvaient
 * déclarer un bâtiment, un étage ou une capacité.</p>
 */
@RestController
@RequestMapping("/api/v1/rooms")
@Tag(name = "Rooms", description = "Bâtiments, salles et capacités de l'établissement")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_VIEW + "')")
    @Operation(summary = "Lister les salles",
            description = "Filtrable par campus, bâtiment, type et recherche libre. "
                    + "Les salles archivées ne sortent que si `includeArchived` est vrai. "
                    + "Chaque ligne porte son occupation : cours actifs et classes qui "
                    + "l'utilisent par défaut.")
    public ResponseEntity<List<RoomResponse>> list(
            @RequestParam(required = false) UUID campusId,
            @RequestParam(required = false) String building,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "false") boolean includeArchived) {
        return ResponseEntity.ok(roomService.list(campusId, building, roomType, search,
                includeArchived));
    }

    @GetMapping("/options")
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_VIEW + "')")
    @Operation(summary = "Campus et types de salle",
            description = "Alimente les listes déroulantes de l'écran sans exiger "
                    + "CAMPUS_VIEW : le gestionnaire des salles n'est pas forcément "
                    + "administrateur des campus.")
    public ResponseEntity<RoomOptionsResponse> options() {
        return ResponseEntity.ok(roomService.options());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_VIEW + "')")
    @Operation(summary = "Détail d'une salle")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Salle trouvée"),
            @ApiResponse(responseCode = "404", description = "ROOM_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<RoomResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(roomService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_MANAGE + "')")
    @Operation(summary = "Créer une salle",
            description = "Le code est normalisé en majuscules et unique dans le campus. "
                    + "Une capacité non mesurée se saisit à 0.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Salle créée"),
            @ApiResponse(responseCode = "400", description = "ROOM_TYPE_INVALID",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "CAMPUS_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "ROOM_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<RoomResponse> create(@Valid @RequestBody RoomUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_MANAGE + "')")
    @Operation(summary = "Modifier une salle",
            description = "Changer une salle de campus est refusé tant que l'emploi du temps "
                    + "ou une classe s'appuie sur elle : le déplacement serait silencieux.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Salle modifiée"),
            @ApiResponse(responseCode = "404", description = "ROOM_NOT_FOUND ou CAMPUS_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "ROOM_CODE_ALREADY_USED ou ROOM_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<RoomResponse> update(@PathVariable UUID id,
                                               @Valid @RequestBody RoomUpsertRequest request) {
        return ResponseEntity.ok(roomService.update(id, request));
    }

    @PostMapping("/{id}/archive")
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_MANAGE + "')")
    @Operation(summary = "Archiver une salle",
            description = "Refusé si l'emploi du temps ou une classe active utilise encore la salle.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Salle archivée"),
            @ApiResponse(responseCode = "409", description = "ROOM_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<RoomResponse> archive(@PathVariable UUID id) {
        return ResponseEntity.ok(roomService.archive(id));
    }

    @PostMapping("/{id}/restore")
    @PreAuthorize("hasAuthority('" + Permissions.ROOM_MANAGE + "')")
    @Operation(summary = "Réactiver une salle archivée")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Salle réactivée"),
            @ApiResponse(responseCode = "404", description = "ROOM_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<RoomResponse> restore(@PathVariable UUID id) {
        return ResponseEntity.ok(roomService.restore(id));
    }
}