package ci.company.eduops.enrollment.service;

import java.util.ArrayList;
import java.util.List;

/**
 * Outcome of the pre-validation pipeline. Used by the "can this student be
 * enrolled?" preview endpoint so the registrar sees every blocker at once
 * instead of discovering them one by one.
 */
public class EnrollmentCheckResult {

    private final List<String> blockers = new ArrayList<>();
    private final List<String> warnings = new ArrayList<>();
    private int capacityMaximum;
    private long occupiedSeats;
    private int availableSeats;
    private int projectedAvailableSeats;

    public EnrollmentCheckResult blocker(String code) {
        blockers.add(code);
        return this;
    }

    public EnrollmentCheckResult warning(String code) {
        warnings.add(code);
        return this;
    }

    public boolean isAllowed() {
        return blockers.isEmpty();
    }

    public List<String> getBlockers() {
        return blockers;
    }

    public List<String> getWarnings() {
        return warnings;
    }

    public int getCapacityMaximum() {
        return capacityMaximum;
    }

    public void setCapacityMaximum(int capacityMaximum) {
        this.capacityMaximum = capacityMaximum;
    }

    public long getOccupiedSeats() {
        return occupiedSeats;
    }

    public void setOccupiedSeats(long occupiedSeats) {
        this.occupiedSeats = occupiedSeats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public int getProjectedAvailableSeats() {
        return projectedAvailableSeats;
    }

    public void setProjectedAvailableSeats(int projectedAvailableSeats) {
        this.projectedAvailableSeats = projectedAvailableSeats;
    }
}
