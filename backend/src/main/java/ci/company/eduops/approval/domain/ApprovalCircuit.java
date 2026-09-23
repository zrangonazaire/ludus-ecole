package ci.company.eduops.approval.domain;

import ci.company.eduops.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * Un circuit de validation nommé (ex. VAL-ADM), propre à un établissement.
 *
 * <p>Le code est unique par école (insensible à la casse après normalisation
 * en majuscules). {@code usage} vaut DISCOUNT aujourd'hui : les réductions de
 * scolarité pré-remplissent une nouvelle demande depuis le premier circuit.
 * Demain, un autre usage (admissions, sorties de caisse) réutilisera la table
 * sans la dupliquer.</p>
 */
@Entity
@Table(name = "approval_circuit")
@Getter
@Setter
public class ApprovalCircuit extends BaseEntity {

    @Column(name = "school_id", nullable = false, updatable = false)
    private UUID schoolId;

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "usage", nullable = false, length = 30)
    private String usage = "DISCOUNT";

    @Column(name = "created_by", updatable = false)
    private UUID createdBy;
}
