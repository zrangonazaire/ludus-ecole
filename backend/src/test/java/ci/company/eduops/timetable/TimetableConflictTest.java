package ci.company.eduops.timetable;

import ci.company.eduops.common.domain.DayOfWeekEnum;
import ci.company.eduops.timetable.domain.TimetableSlot;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Timetable overlap rules (section 27 / section 86).
 *
 * <p>The authoritative guarantee is the set of PostgreSQL EXCLUDE constraints in
 * migration V15; these tests pin the in-memory overlap logic the API uses to
 * return a clean business error before the database has to refuse.</p>
 */
class TimetableConflictTest {

    @Test
    @DisplayName("professor A on Monday 08:00 for class A then class B -> the slots overlap")
    void detectsTeacherDoubleBooking() {
        TimetableSlot slotA = slot(DayOfWeekEnum.MONDAY, "08:00", "09:00");

        // Same teacher, same day, same hour, another class: this must be detected.
        assertThat(slotA.overlaps(LocalTime.of(8, 0), LocalTime.of(9, 0))).isTrue();
    }

    @Test
    @DisplayName("back-to-back slots do not overlap")
    void adjacentSlotsDoNotOverlap() {
        TimetableSlot slot = slot(DayOfWeekEnum.MONDAY, "08:00", "09:00");

        // 09:00-10:00 starts exactly when the previous ends: half-open interval.
        assertThat(slot.overlaps(LocalTime.of(9, 0), LocalTime.of(10, 0))).isFalse();
    }

    @Test
    @DisplayName("a partially overlapping slot is detected")
    void detectsPartialOverlap() {
        TimetableSlot slot = slot(DayOfWeekEnum.MONDAY, "08:00", "10:00");

        assertThat(slot.overlaps(LocalTime.of(9, 30), LocalTime.of(11, 0))).isTrue();
        assertThat(slot.overlaps(LocalTime.of(7, 0), LocalTime.of(8, 30))).isTrue();
    }

    @Test
    @DisplayName("a slot fully contained in another is detected")
    void detectsContainedOverlap() {
        TimetableSlot slot = slot(DayOfWeekEnum.MONDAY, "08:00", "12:00");

        assertThat(slot.overlaps(LocalTime.of(9, 0), LocalTime.of(10, 0))).isTrue();
    }

    @Test
    @DisplayName("the slot duration is computed in minutes")
    void computesDuration() {
        assertThat(slot(DayOfWeekEnum.TUESDAY, "08:00", "09:30").durationMinutes()).isEqualTo(90);
    }

    @Test
    @DisplayName("the week day maps both ways to java.time.DayOfWeek")
    void mapsDayOfWeek() {
        assertThat(DayOfWeekEnum.MONDAY.toJavaDay()).isEqualTo(java.time.DayOfWeek.MONDAY);
        assertThat(DayOfWeekEnum.from(java.time.DayOfWeek.FRIDAY)).isEqualTo(DayOfWeekEnum.FRIDAY);
        assertThat(DayOfWeekEnum.from(java.time.LocalDate.of(2026, 9, 14)))
                .isEqualTo(DayOfWeekEnum.MONDAY);
    }

    private TimetableSlot slot(DayOfWeekEnum day, String start, String end) {
        TimetableSlot slot = new TimetableSlot();
        slot.setDayOfWeek(day);
        slot.setStartTime(LocalTime.parse(start));
        slot.setEndTime(LocalTime.parse(end));
        slot.setActive(true);
        return slot;
    }
}
