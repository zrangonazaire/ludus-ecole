package ci.company.eduops.attendance.controller;

import ci.company.eduops.attendance.dto.request.AbsenceFilter;
import ci.company.eduops.attendance.dto.request.AttendanceJustifyRequest;
import ci.company.eduops.attendance.dto.request.AttendanceSheetSubmitRequest;
import ci.company.eduops.attendance.dto.response.AbsenceDigestResponse;
import ci.company.eduops.attendance.dto.response.AbsenceResponse;
import ci.company.eduops.attendance.dto.response.AttendanceDayResponse;
import ci.company.eduops.attendance.dto.response.AttendanceSheetResponse;
import ci.company.eduops.attendance.dto.response.LessonSlotResponse;
import ci.company.eduops.attendance.service.AttendanceService;
import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/attendance")
@Tag(name = "Attendance", description = "Appel, suivi des absences et justificatifs")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/day")
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_VIEW + "')")
    @Operation(summary = "L'appel du jour, classe par classe",
            description = """
                    Renvoie toutes les classes actives, y compris celles dont l'appel
                    n'a pas encore été fait : ce sont elles qui comptent. Une classe
                    absente de la liste passerait pour une classe en règle.

                    Le taux de présence ne porte que sur les classes appelées. Compter
                    les autres présentes gonflerait le taux à mesure que l'appel se
                    fait mal.
                    """)
    public ResponseEntity<AttendanceDayResponse> day(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(attendanceService.day(date, academicYearId));
    }

    @GetMapping("/lessons")
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_VIEW + "')")
    @Operation(summary = "Les cours d'une classe ce jour-là",
            description = """
                    Lus dans l'emploi du temps, avec l'état de l'appel de chacun.

                    Liste vide quand la classe n'a pas d'emploi du temps : au primaire,
                    un maître tient sa classe toute la journée et l'appel quotidien
                    suffit. Au collège, chaque cours a le sien — sans quoi un élève parti
                    après la récréation reste compté présent jusqu'au soir.
                    """)
    public ResponseEntity<List<LessonSlotResponse>> lessons(
            @RequestParam UUID classroomId,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                attendanceService.lessons(classroomId, date, academicYearId));
    }

    @GetMapping("/sheet")
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_VIEW + "')")
    @Operation(summary = "Ouvrir la feuille d'appel d'une classe",
            description = """
                    Renvoie la feuille déjà enregistrée, ou une feuille vierge où chacun
                    est présent. Rien n'est écrit à l'ouverture : consulter une classe
                    ne doit pas enregistrer que tout le monde était là.

                    Sans `subjectId`, c'est l'appel du jour. Avec, c'est l'appel d'un
                    cours : les deux coexistent sans s'écraser.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Feuille ouverte"),
            @ApiResponse(responseCode = "400", description = "INVALID_ATTENDANCE — date future",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<AttendanceSheetResponse> sheet(
            @RequestParam UUID classroomId,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) UUID subjectId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                attendanceService.openSheet(classroomId, date, subjectId, academicYearId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_CREATE + "')")
    @Operation(summary = "Enregistrer une feuille d'appel",
            description = """
                    La feuille part entière. Une moitié enregistrée se lirait
                    « douze présents, et rien de connu sur les autres ».

                    Rejouer le même envoi avec la même `idempotencyKey` renvoie la
                    première feuille sans rien modifier : l'appel se fait dans un
                    couloir, le réseau tombe, la personne appuie une seconde fois.

                    Les parents des élèves absents ou en retard sont prévenus à
                    l'enregistrement, une seule fois par changement de marque.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Feuille enregistrée"),
            @ApiResponse(responseCode = "400", description = "INVALID_ATTENDANCE — retard sans "
                    + "heure d'arrivée, ou date future",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "ATTENDANCE_SESSION_LOCKED, "
                    + "ATTENDANCE_STUDENT_NOT_IN_CLASS",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<AttendanceSheetResponse> submit(
            @Valid @RequestBody AttendanceSheetSubmitRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(attendanceService.submit(request, academicYearId));
    }

    @GetMapping("/absences")
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_VIEW + "')")
    @Operation(summary = "Suivi des absences sur une période",
            description = """
                    Absences et retards ensemble : trois quarts d'heure perdus chaque
                    matin est un problème de scolarité, et une liste qui ne montrerait
                    que les absences entières ne le ferait jamais apparaître.

                    Les compteurs portent sur toute la période ; seule la liste obéit
                    au filtre. Des totaux qui suivraient le filtre permettraient de
                    réduire la vue jusqu'à ce que l'établissement paraisse en règle.
                    """)
    public ResponseEntity<AbsenceDigestResponse> absences(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(required = false) UUID classroomId,
            @RequestParam(required = false) AbsenceFilter filter,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                attendanceService.absences(from, to, classroomId, filter, academicYearId));
    }

    @PostMapping("/{attendanceId}/justify")
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_JUSTIFY + "')")
    @Operation(summary = "Enregistrer le justificatif d'une absence",
            description = """
                    L'absence devient justifiée, elle ne disparaît pas. Une absence
                    effacée laisserait un conseil de classe se demander pourquoi un
                    élève a manqué un trimestre avec un dossier vierge.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Justificatif enregistré"),
            @ApiResponse(responseCode = "409", description = "ATTENDANCE_SESSION_LOCKED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<AbsenceResponse> justify(
            @PathVariable UUID attendanceId,
            @Valid @RequestBody AttendanceJustifyRequest request) {
        return ResponseEntity.ok(attendanceService.justify(attendanceId, request));
    }

    @PostMapping("/{attendanceId}/remind")
    @PreAuthorize("hasAuthority('" + Permissions.ATTENDANCE_UPDATE + "')")
    @Operation(summary = "Relancer la famille pour une absence non justifiée",
            description = """
                    La relance est inscrite sur la ligne, pas seulement envoyée. Sans
                    cette trace, deux personnes qui se partagent le travail appellent
                    deux fois la même famille et oublient la suivante.
                    """)
    public ResponseEntity<AbsenceResponse> remind(@PathVariable UUID attendanceId) {
        return ResponseEntity.ok(attendanceService.notifyGuardian(attendanceId));
    }
}
