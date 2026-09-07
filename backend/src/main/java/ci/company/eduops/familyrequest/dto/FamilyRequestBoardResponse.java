package ci.company.eduops.familyrequest.dto;

import java.util.List;

/**
 * The queue, with its counters.
 *
 * <p>The counters describe the whole queue, not the filtered view: someone who
 * narrows the list to « Prêtes » still needs to see that four requests are
 * overdue elsewhere. Counting only what is on screen would hide exactly what
 * the screen exists to surface.</p>
 */
public class FamilyRequestBoardResponse {

    private long total;
    private long newCount;
    private long inProgressCount;
    private long waitingFamilyCount;
    private long readyCount;
    private long completedCount;
    private long overdueCount;
    private List<FamilyRequestResponse> requests;

    public FamilyRequestBoardResponse() {
    }

    public FamilyRequestBoardResponse(long total, long newCount, long inProgressCount,
                                      long waitingFamilyCount, long readyCount,
                                      long completedCount, long overdueCount,
                                      List<FamilyRequestResponse> requests) {
        this.total = total;
        this.newCount = newCount;
        this.inProgressCount = inProgressCount;
        this.waitingFamilyCount = waitingFamilyCount;
        this.readyCount = readyCount;
        this.completedCount = completedCount;
        this.overdueCount = overdueCount;
        this.requests = requests;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getNewCount() {
        return newCount;
    }

    public void setNewCount(long newCount) {
        this.newCount = newCount;
    }

    public long getInProgressCount() {
        return inProgressCount;
    }

    public void setInProgressCount(long inProgressCount) {
        this.inProgressCount = inProgressCount;
    }

    public long getWaitingFamilyCount() {
        return waitingFamilyCount;
    }

    public void setWaitingFamilyCount(long waitingFamilyCount) {
        this.waitingFamilyCount = waitingFamilyCount;
    }

    public long getReadyCount() {
        return readyCount;
    }

    public void setReadyCount(long readyCount) {
        this.readyCount = readyCount;
    }

    public long getCompletedCount() {
        return completedCount;
    }

    public void setCompletedCount(long completedCount) {
        this.completedCount = completedCount;
    }

    public long getOverdueCount() {
        return overdueCount;
    }

    public void setOverdueCount(long overdueCount) {
        this.overdueCount = overdueCount;
    }

    public List<FamilyRequestResponse> getRequests() {
        return requests;
    }

    public void setRequests(List<FamilyRequestResponse> requests) {
        this.requests = requests;
    }
}
