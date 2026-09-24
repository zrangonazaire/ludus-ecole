package ci.company.eduops.student.controller;

import ci.company.eduops.student.dto.response.StudentStatementResponse;
import ci.company.eduops.student.service.StudentStatementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentStatementController {
    private final StudentStatementService service;

    @GetMapping("/{studentId}/statement")
    @PreAuthorize("hasAuthority('STUDENT_VIEW') and hasAuthority('FINANCE_VIEW') and hasAuthority('PAYMENT_VIEW')")
    public StudentStatementResponse statement(@PathVariable UUID studentId) {
        return service.get(studentId);
    }
}
