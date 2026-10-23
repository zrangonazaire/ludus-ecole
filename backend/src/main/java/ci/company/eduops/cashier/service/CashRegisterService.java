package ci.company.eduops.cashier.service;

import ci.company.eduops.cashier.domain.CashRegister;
import ci.company.eduops.cashier.domain.CashSessionStatus;
import ci.company.eduops.cashier.repository.CashRegisterRepository;
import ci.company.eduops.cashier.repository.CashSessionRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.service.CurrentUser;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CashRegisterService {
    private final CashRegisterRepository registers;
    private final CashSessionRepository sessions;
    private final AppUserRepository users;
    private final SchoolRepository schools;
    private final CurrentUser actor;

    public CashRegisterService(CashRegisterRepository registers, CashSessionRepository sessions,
                               AppUserRepository users, SchoolRepository schools, CurrentUser actor) {
        this.registers = registers;
        this.sessions = sessions;
        this.users = users;
        this.schools = schools;
        this.actor = actor;
    }

    public record CashierOption(UUID id, String name, String username) { }
    public record RegisterResponse(UUID id, String name, UUID cashierUserId, String cashierName,
                                   String cashierUsername, boolean openSession) { }
    public record Overview(List<RegisterResponse> registers, List<CashierOption> cashiers) { }

    @Transactional(readOnly = true)
    public Overview overview() {
        UUID schoolId = school();
        List<RegisterResponse> result = registers.findAllBySchool(schoolId).stream()
                .map(this::response).toList();
        List<CashierOption> candidates = users.findCashierAccounts(schoolId).stream()
                .map(user -> new CashierOption(user.getId(), user.fullName(), user.getUsername())).toList();
        return new Overview(result, candidates);
    }

    @Transactional
    public RegisterResponse create(String name, UUID cashierUserId) {
        UUID schoolId = school();
        CashRegister register = new CashRegister();
        register.setSchool(schools.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND)));
        register.setName(cleanName(name));
        register.setCashier(requireCashier(schoolId, cashierUserId));
        return save(register);
    }

    @Transactional
    public RegisterResponse update(UUID id, String name, UUID cashierUserId) {
        UUID schoolId = school();
        CashRegister register = registers.findInSchool(id, schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CASH_REGISTER_NOT_FOUND));
        if (sessions.existsByCashRegisterIdAndStatus(id, CashSessionStatus.OPEN)) {
            throw new BusinessException(ErrorCode.CASH_REGISTER_OPEN_SESSION);
        }
        register.setName(cleanName(name));
        register.setCashier(requireCashier(schoolId, cashierUserId));
        return save(register);
    }

    @Transactional(readOnly = true)
    public CashRegister requireAssigned(UUID schoolId, UUID cashierUserId) {
        return registers.findActiveForCashier(schoolId, cashierUserId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CASH_REGISTER_NOT_FOUND,
                        "Aucune caisse ne vous est attribuée. Demandez à l’administrateur de vous affecter une caisse."));
    }

    @Transactional(readOnly = true)
    public CashRegister requireRegister(UUID schoolId, UUID registerId) {
        CashRegister register = registers.findInSchool(registerId, schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CASH_REGISTER_NOT_FOUND));
        if (!register.isActive()) throw new BusinessException(ErrorCode.CASH_REGISTER_NOT_FOUND);
        return register;
    }

    private RegisterResponse save(CashRegister register) {
        try {
            return response(registers.saveAndFlush(register));
        } catch (DataIntegrityViolationException ex) {
            throw new BusinessException(ErrorCode.CASH_REGISTER_ASSIGNMENT_CONFLICT,
                    "Le nom de caisse ou l’affectation de ce caissier est déjà utilisé.");
        }
    }

    private AppUser requireCashier(UUID schoolId, UUID userId) {
        AppUser cashier = users.findByIdAndSchoolId(userId, schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CASHIER_PROFILE_REQUIRED));
        if (!cashier.hasRole("CASHIER") || !cashier.getStatus().canAuthenticate()) {
            throw new BusinessException(ErrorCode.CASHIER_PROFILE_REQUIRED,
                    "Choisissez un compte actif auquel le profil Caissier est attribué.");
        }
        return cashier;
    }

    private RegisterResponse response(CashRegister register) {
        AppUser cashier = register.getCashier();
        return new RegisterResponse(register.getId(), register.getName(), cashier.getId(),
                cashier.fullName(), cashier.getUsername(),
                sessions.existsByCashRegisterIdAndStatus(register.getId(), CashSessionStatus.OPEN));
    }

    private String cleanName(String name) {
        if (name == null || name.isBlank()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Le nom de la caisse est obligatoire.");
        }
        String clean = name.trim();
        if (clean.length() > 100) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Le nom de la caisse ne peut pas dépasser 100 caractères.");
        }
        return clean;
    }

    private UUID school() {
        UUID id = TenantContext.getSchoolId();
        if (id == null) throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        return id;
    }
}
