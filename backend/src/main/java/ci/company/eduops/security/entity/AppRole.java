package ci.company.eduops.security.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/** A named bundle of permissions (section 61). */
@Entity
@Table(name = "app_role")
public class AppRole {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "code", nullable = false, length = 60)
    private String code;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "description")
    private String description;

    @Column(name = "system_role", nullable = false)
    private boolean systemRole;

    /** NULL for built-in profiles; tenant id for a school-created profile. */
    @Column(name = "school_id")
    private UUID schoolId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "app_role_permission",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"))
    private Set<AppPermission> permissions = new HashSet<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isSystemRole() {
        return systemRole;
    }

    public void setSystemRole(boolean systemRole) {
        this.systemRole = systemRole;
    }

    public UUID getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(UUID schoolId) {
        this.schoolId = schoolId;
    }

    public Set<AppPermission> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<AppPermission> permissions) {
        this.permissions = permissions;
    }
}
