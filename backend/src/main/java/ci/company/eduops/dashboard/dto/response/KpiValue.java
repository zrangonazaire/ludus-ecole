package ci.company.eduops.dashboard.dto.response;

/** One figure on the home screen, already formatted for display. */
public class KpiValue {

    private String key;
    private String label;
    private Object value;
    /** Le texte affiché : le serveur formate, l'écran n'invente pas. */
    private String formatted;
    private Double delta;
    private String deltaLabel;
    /** up, down, flat. */
    private String trend;
    private Boolean live;
    /** neutral, success, warning, danger. */
    private String tone;
    private String suffix;
    private String icon;

    public KpiValue() {
    }

    public KpiValue(String key, String label, Object value, String formatted, String tone) {
        this.key = key;
        this.label = label;
        this.value = value;
        this.formatted = formatted;
        this.tone = tone;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public String getFormatted() {
        return formatted;
    }

    public void setFormatted(String formatted) {
        this.formatted = formatted;
    }

    public Double getDelta() {
        return delta;
    }

    public void setDelta(Double delta) {
        this.delta = delta;
    }

    public String getDeltaLabel() {
        return deltaLabel;
    }

    public void setDeltaLabel(String deltaLabel) {
        this.deltaLabel = deltaLabel;
    }

    public String getTrend() {
        return trend;
    }

    public void setTrend(String trend) {
        this.trend = trend;
    }

    public Boolean getLive() {
        return live;
    }

    public void setLive(Boolean live) {
        this.live = live;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
