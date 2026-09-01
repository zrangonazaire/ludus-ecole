package ci.company.eduops.messaging.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/** What one school pays per SMS, and how much it allows itself to send. */
@Entity
@Table(name = "messaging_settings")
@Getter
@Setter
public class MessagingSettings extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false, unique = true)
    private School school;

    /** Le nom affiché à la place du numéro, quand l'opérateur le permet. */
    @Column(name = "sms_sender_name", length = 11)
    private String smsSenderName;

    /** Prix d'un segment. Jamais un flottant : multiplié par des milliers. */
    @Column(name = "sms_unit_cost", nullable = false, precision = 10, scale = 2)
    private BigDecimal smsUnitCost = BigDecimal.ZERO;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    /**
     * Plafond quotidien de segments.
     *
     * <p>Ce nombre est ce qui sépare une erreur de filtre d'un désastre
     * facturable. Il refuse l'envoi, il ne le tronque pas : une relance
     * partiellement partie est pire qu'une relance refusée, parce que
     * personne ne sait qui l'a reçue.</p>
     */
    @Column(name = "daily_sms_cap", nullable = false)
    private int dailySmsCap = 500;

    @Column(name = "reply_to_email", length = 180)
    private String replyToEmail;

    @Column(name = "signature", length = 200)
    private String signature;

    /** Whether a send of this size stays within today's allowance. */
    public boolean allows(int segmentsToday, int segmentsRequested) {
        return dailySmsCap <= 0 || segmentsToday + segmentsRequested <= dailySmsCap;
    }
}
