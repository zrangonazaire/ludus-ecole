package ci.company.eduops.supply;

import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.level.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SupplyListService {
    private final SupplyListRepository lists;
    private final LevelRepository levels;
    private final AcademicYearRepository years;
    private final AuditService audit;

    public record YearOption(UUID id, String label, String status) {}
    public record Response(UUID id, Long version, String schoolName, String levelName,
                           String yearLabel, String title, String notes, List<SupplyListRequest.Item> items) {}

    @Transactional(readOnly = true)
    public List<YearOption> years() {
        return years.findBySchoolOrderByStartDateDesc(school()).stream()
                .map(y -> new YearOption(y.getId(), y.getLabel(), y.getStatus().name())).toList();
    }

    @Transactional(readOnly = true)
    public Response get(UUID levelId, UUID yearId) {
        var context = context(levelId, yearId);
        var list = lists.findBySchoolIdAndLevelIdAndAcademicYearId(school(), levelId, yearId).orElse(null);
        return response(list, context);
    }

    @Transactional
    public Response save(UUID levelId, UUID yearId, SupplyListRequest request) {
        var context = context(levelId, yearId);
        if (years.findById(yearId).orElseThrow().getStatus().isFinished()) {
            throw new BusinessException(ErrorCode.CONFLICT);
        }
        var list = lists.findBySchoolIdAndLevelIdAndAcademicYearId(school(), levelId, yearId).orElse(null);
        if (!Objects.equals(list == null ? null : list.getVersion(), request.version())) {
            throw new BusinessException(ErrorCode.CONCURRENT_MODIFICATION);
        }
        boolean creating = list == null;
        Map<String, Object> before = creating ? Map.of() : snapshot(list);
        if (creating) {
            list = new SupplyList();
            list.setSchoolId(school());
            list.setLevelId(levelId);
            list.setAcademicYearId(yearId);
        }
        list.setTitle(request.title().trim());
        list.setNotes(request.notes().trim());
        list.setItems(request.items().stream().map(i -> new SupplyListRequest.Item(
                i.name().trim(), i.quantity(), i.details().trim())).toList());
        lists.saveAndFlush(list);
        if (creating) audit.logCreate("SupplyList", list.getId(), list.getTitle(), snapshot(list));
        else audit.logUpdate("SupplyList", list.getId(), list.getTitle(), before, snapshot(list));
        return response(list, context);
    }

    private UUID school() {
        UUID id = TenantContext.getSchoolId();
        if (id == null) throw new BusinessException(ErrorCode.ACCESS_DENIED);
        return id;
    }

    private String[] context(UUID levelId, UUID yearId) {
        UUID schoolId = school();
        var level = levels.findById(levelId)
                .filter(l -> schoolId.equals(l.getCycle().getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND));
        var year = years.findById(yearId).filter(y -> schoolId.equals(y.getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND));
        return new String[]{year.getSchool().getName(), level.getName(), year.getLabel()};
    }

    private Response response(SupplyList list, String[] context) {
        return new Response(list == null ? null : list.getId(), list == null ? null : list.getVersion(),
                context[0], context[1], context[2], list == null ? "Liste de fournitures scolaires" : list.getTitle(),
                list == null ? "" : list.getNotes(), list == null ? List.of() : list.getItems());
    }

    private Map<String, Object> snapshot(SupplyList list) {
        return Map.of("levelId", list.getLevelId(), "academicYearId", list.getAcademicYearId(),
                "title", list.getTitle(), "notes", list.getNotes(), "items", list.getItems());
    }
}
