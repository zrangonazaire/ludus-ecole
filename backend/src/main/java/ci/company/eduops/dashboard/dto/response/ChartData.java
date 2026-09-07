package ci.company.eduops.dashboard.dto.response;

import java.util.ArrayList;
import java.util.List;

/** One chart: its categories, and one or more series over them. */
public class ChartData {

    private List<String> categories = new ArrayList<>();
    private List<ChartSeries> series = new ArrayList<>();

    /** An empty chart is a legitimate answer, not a missing one. */
    public static ChartData empty() {
        return new ChartData();
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<ChartSeries> getSeries() {
        return series;
    }

    public void setSeries(List<ChartSeries> series) {
        this.series = series;
    }
}
