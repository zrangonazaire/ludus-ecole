package ci.company.eduops.timetable.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.timetable.dto.request.SlotUpsertRequest;
import ci.company.eduops.timetable.dto.response.TimetableConflictResponse;
import ci.company.eduops.timetable.dto.response.TimetableGridResponse;
import ci.company.eduops.timetable.dto.response.TimetablePaletteEntryResponse;
import ci.company.eduops.timetable.dto.response.TimetableSlotResponse;
import ci.company.eduops.timetable.service.TimetableService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
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

@RestController
@RequestMapping("/api/v1/timetables")
@Tag(name = "Timetables", description = "Grille hebdomadaire et détection des conflits")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping("/classroom/{classroomId}")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_VIEW + "')")
    @Operation(summary = "Semaine d'une classe",
            description = "Renvoie le brouillon s'il existe, sinon la version publiée. "
                    + "C'est la seule vue modifiable.")
    public ResponseEntity<TimetableGridResponse> classroomGrid(
            @PathVariable UUID classroomId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(timetableService.classroomGrid(classroomId, academicYearId));
    }

    @GetMapping("/teacher/{teacherId}")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_VIEW + "')")
    @Operation(summary = "Semaine d'un enseignant",
            description = "Agrège les cours de toutes ses classes, avec son total horaire.")
    public ResponseEntity<TimetableGridResponse> teacherGrid(
            @PathVariable UUID teacherId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(timetableService.teacherGrid(teacherId, academicYearId));
    }

    @GetMapping("/room/{roomId}")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_VIEW + "')")
    @Operation(summary = "Occupation d'une salle")
    public ResponseEntity<TimetableGridResponse> roomGrid(
            @PathVariable UUID roomId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(timetableService.roomGrid(roomId, academicYearId));
    }

    @GetMapping("/classroom/{classroomId}/palette")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_VIEW + "')")
    @Operation(summary = "Matières posables sur cette classe",
            description = """
                    Construite à partir des affectations d'enseignants : chaque entrée
                    est donc déjà valide au regard de la règle « un enseignant n'intervient
                    que sur ses matières ». Indique aussi le volume horaire prévu et
                    la part déjà posée sur la grille.
                    """)
    public ResponseEntity<List<TimetablePaletteEntryResponse>> palette(
            @PathVariable UUID classroomId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(timetableService.palette(classroomId, academicYearId));
    }

    @PostMapping("/slots/check")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_VIEW + "')")
    @Operation(summary = "Vérifier un placement sans rien écrire",
            description = """
                    Renvoie tous les empêchements d'un coup : enseignant occupé, classe
                    occupée, salle réservée, enseignant non affecté à la matière.
                    Le glisser-déposer appelle ce point d'entrée pendant le survol,
                    ce qui permet de refuser la case avant le lâcher.
                    """)
    public ResponseEntity<List<TimetableConflictResponse>> check(
            @Valid @RequestBody SlotUpsertRequest request,
            @RequestParam(required = false) UUID excludeSlotId) {
        return ResponseEntity.ok(timetableService.check(request, excludeSlotId));
    }

    @PostMapping("/slots")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_MANAGE + "')")
    @Operation(summary = "Placer un cours sur la grille")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Cours placé"),
            @ApiResponse(responseCode = "409",
                    description = "TIMETABLE_CONFLICT ou ROOM_CONFLICT. Le détail "
                            + "`conflicts` contient la liste complète des empêchements.",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<TimetableSlotResponse> createSlot(
            @Valid @RequestBody SlotUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(timetableService.saveSlot(request, null));
    }

    @PutMapping("/slots/{slotId}")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_MANAGE + "')")
    @Operation(summary = "Déplacer ou modifier un cours",
            description = "Le créneau d'origine est exclu de la détection de conflits : "
                    + "un cours ne peut pas entrer en conflit avec lui-même.")
    public ResponseEntity<TimetableSlotResponse> updateSlot(
            @PathVariable UUID slotId, @Valid @RequestBody SlotUpsertRequest request) {
        return ResponseEntity.ok(timetableService.saveSlot(request, slotId));
    }

    @DeleteMapping("/slots/{slotId}")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_MANAGE + "')")
    @Operation(summary = "Retirer un cours de la grille",
            description = "Le créneau est désactivé, pas supprimé : les feuilles d'appel "
                    + "et les séances déjà tenues y font référence.")
    public ResponseEntity<Void> deleteSlot(@PathVariable UUID slotId) {
        timetableService.deleteSlot(slotId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/classroom/{classroomId}/publish")
    @PreAuthorize("hasAuthority('" + Permissions.TIMETABLE_MANAGE + "')")
    @Operation(summary = "Publier l'emploi du temps d'une classe",
            description = "La version précédente est archivée dans la même transaction : "
                    + "le schéma n'autorise qu'un seul emploi du temps publié par classe.")
    public ResponseEntity<TimetableGridResponse> publish(
            @PathVariable UUID classroomId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(timetableService.publish(classroomId, academicYearId));
    }
}
