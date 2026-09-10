package ci.company.eduops.curriculum.controller;

import ci.company.eduops.curriculum.service.TeacherAssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/teacher-assignments")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('TEACHER_MANAGE')")
public class TeacherAssignmentController {
    private final TeacherAssignmentService service;
    @GetMapping
    public TeacherAssignmentService.Board board() { return service.board(); }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherAssignmentService.Row create(@Valid @RequestBody TeacherAssignmentService.Request request) { return service.create(request); }
    @PostMapping("/{id}/end")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void end(@PathVariable UUID id) { service.end(id); }
}
