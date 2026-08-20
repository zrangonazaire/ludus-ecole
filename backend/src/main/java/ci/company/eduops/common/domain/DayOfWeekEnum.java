package ci.company.eduops.common.domain;

import java.time.DayOfWeek;

/** Persisted week day. Mirrors the PostgreSQL {@code day_of_week} enum. */
public enum DayOfWeekEnum {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY;

    public DayOfWeek toJavaDay() {
        return DayOfWeek.valueOf(name());
    }

    public static DayOfWeekEnum from(DayOfWeek day) {
        return valueOf(day.name());
    }

    public static DayOfWeekEnum from(java.time.LocalDate date) {
        return from(date.getDayOfWeek());
    }
}
