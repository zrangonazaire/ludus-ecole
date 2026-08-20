package ci.company.eduops.timetable.repository;

import ci.company.eduops.common.domain.DayOfWeekEnum;
import ci.company.eduops.timetable.domain.TimetableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TimetableSlotRepository extends JpaRepository<TimetableSlot, UUID> {

    List<TimetableSlot> findByTimetableIdAndActiveTrue(UUID timetableId);

    List<TimetableSlot> findByClassroomIdAndActiveTrue(UUID classroomId);

    List<TimetableSlot> findByTeacherIdAndActiveTrue(UUID teacherId);

    /** checkTeacherConflict(): any overlapping slot for this teacher that day. */
    @Query("""
           SELECT s FROM TimetableSlot s
           WHERE s.teacher.id = :teacherId
             AND s.academicYear.id = :academicYearId
             AND s.dayOfWeek = :day
             AND s.active = true
             AND (:excludeSlotId IS NULL OR s.id <> :excludeSlotId)
             AND s.startTime < :endTime AND :startTime < s.endTime
           """)
    List<TimetableSlot> findTeacherConflicts(@Param("teacherId") UUID teacherId,
                                             @Param("academicYearId") UUID academicYearId,
                                             @Param("day") DayOfWeekEnum day,
                                             @Param("startTime") LocalTime startTime,
                                             @Param("endTime") LocalTime endTime,
                                             @Param("excludeSlotId") UUID excludeSlotId);

    /** checkClassConflict(). */
    @Query("""
           SELECT s FROM TimetableSlot s
           WHERE s.classroom.id = :classroomId
             AND s.academicYear.id = :academicYearId
             AND s.dayOfWeek = :day
             AND s.active = true
             AND (:excludeSlotId IS NULL OR s.id <> :excludeSlotId)
             AND s.startTime < :endTime AND :startTime < s.endTime
           """)
    List<TimetableSlot> findClassConflicts(@Param("classroomId") UUID classroomId,
                                           @Param("academicYearId") UUID academicYearId,
                                           @Param("day") DayOfWeekEnum day,
                                           @Param("startTime") LocalTime startTime,
                                           @Param("endTime") LocalTime endTime,
                                           @Param("excludeSlotId") UUID excludeSlotId);

    /** checkRoomConflict(). */
    @Query("""
           SELECT s FROM TimetableSlot s
           WHERE s.room.id = :roomId
             AND s.academicYear.id = :academicYearId
             AND s.dayOfWeek = :day
             AND s.active = true
             AND (:excludeSlotId IS NULL OR s.id <> :excludeSlotId)
             AND s.startTime < :endTime AND :startTime < s.endTime
           """)
    List<TimetableSlot> findRoomConflicts(@Param("roomId") UUID roomId,
                                          @Param("academicYearId") UUID academicYearId,
                                          @Param("day") DayOfWeekEnum day,
                                          @Param("startTime") LocalTime startTime,
                                          @Param("endTime") LocalTime endTime,
                                          @Param("excludeSlotId") UUID excludeSlotId);
}
