package ci.company.eduops.cashier.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.security.entity.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cash_register")
@Getter
@Setter
public class CashRegister extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cashier_user_id", nullable = false)
    private AppUser cashier;

    @Column(name = "active", nullable = false)
    private boolean active = true;
}
