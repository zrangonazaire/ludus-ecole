package ci.company.eduops.teacher.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.teacher.dto.response.TeacherResponse;
import ci.company.eduops.teacher.service.TeacherQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/teachers")
@Tag(name = "Teachers", description = "Le personnel enseignant")
public class TeacherController {

    private final ci.company.eduops.teacher.service.TeacherCreateService teacherCreateService;

    private final TeacherQueryService teacherQueryService;

    public TeacherController(TeacherQueryService teacherQueryService,
            ci.company.eduops.teacher.service.TeacherCreateService teacherCreateService) {
        this.teacherQueryService = teacherQueryService;
        this.teacherCreateService = teacherCreateService;
    }

    @org.springframework.web.bind.annotation.PostMapping
    @org.springframework.web.bind.annotation.ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('" + Permissions.TEACHER_MANAGE + "')")
    public TeacherResponse create(@jakarta.validation.Valid @org.springframework.web.bind.annotation.RequestBody
            ci.company.eduops.teacher.dto.TeacherCreateRequest request) {
        return teacherCreateService.create(request);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.TEACHER_VIEW + "')")
    @Operation(summary = "Rechercher des enseignants",
            description = "Recherche sur le nom, le prénom et le matricule.")
    public PageResponse<TeacherResponse> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        return teacherQueryService.search(page, size, search, status);
    }

    @GetMapping("/{teacherId}")
    @PreAuthorize("hasAuthority('" + Permissions.TEACHER_VIEW + "')")
    @Operation(summary = "La fiche d'un enseignant")
    public TeacherResponse detail(@PathVariable UUID teacherId) {
        return teacherQueryService.detail(teacherId);
    }
}
