package ci.company.eduops.room.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "building_level")
@Getter @Setter
public class BuildingLevel {
    @Id @GeneratedValue private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;
    @Column(name = "level_number", nullable = false)
    private int number;
    @Column(nullable = false, length = 30)
    private String label;
}
