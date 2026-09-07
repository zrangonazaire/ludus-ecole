package ci.company.eduops.dashboard.dto.response;

import java.util.ArrayList;
import java.util.List;

/** One line or set of bars on a chart. */
public class ChartSeries {

    private String name;
    private List<Number> data = new ArrayList<>();
    private String color;

    public ChartSeries() {
    }

    public ChartSeries(String name, List<Number> data) {
        this.name = name;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Number> getData() {
        return data;
    }

    public void setData(List<Number> data) {
        this.data = data;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
