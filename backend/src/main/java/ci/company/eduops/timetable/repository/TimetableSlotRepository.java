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

    /**
     * Every slot of one class for the year, with its references already loaded.
     *
     * <p>The fetch joins are not an optimisation detail: without them the grid
     * issues one query per cell, and a full week is thirty-odd cells.</p>
     */
    @Query("""
           SELECT s FROM TimetableSlot s
           JOIN FETCH s.subject
           JOIN FETCH s.teacher
           LEFT JOIN FETCH s.room
           JOIN FETCH s.classroom
           WHERE s.classroom.id = :classroomId
             AND s.academicYear.id = :academicYearId
             AND s.active = true
           ORDER BY s.dayOfWeek, s.startTime
           """)
    List<TimetableSlot> findGridByClassroom(@Param("classroomId") UUID classroomId,
                                            @Param("academicYearId") UUID academicYearId);

    /** Same grid, seen from one teacher: reveals overloads and idle gaps. */
    @Query("""
           SELECT s FROM TimetableSlot s
           JOIN FETCH s.subject
           JOIN FETCH s.teacher
           LEFT JOIN FETCH s.room
           JOIN FETCH s.classroom
           WHERE s.teacher.id = :teacherId
             AND s.academicYear.id = :academicYearId
             AND s.active = true
           ORDER BY s.dayOfWeek, s.startTime
           """)
    List<TimetableSlot> findGridByTeacher(@Param("teacherId") UUID teacherId,
                                          @Param("academicYearId") UUID academicYearId);

    /** Same grid, seen from one room: shows when a lab or IT room is free. */
    @Query("""
           SELECT s FROM TimetableSlot s
           JOIN FETCH s.subject
           JOIN FETCH s.teacher
           LEFT JOIN FETCH s.room
           JOIN FETCH s.classroom
           WHERE s.room.id = :roomId
             AND s.academicYear.id = :academicYearId
             AND s.active = true
           ORDER BY s.dayOfWeek, s.startTime
           """)
    List<TimetableSlot> findGridByRoom(@Param("roomId") UUID roomId,
                                       @Param("academicYearId") UUID academicYearId);

    /** Weekly minutes taught by one teacher, to flag overloads. */
    @Query("""
           SELECT s FROM TimetableSlot s
           WHERE s.academicYear.id = :academicYearId AND s.active = true
           """)
    List<TimetableSlot> findAllActiveForYear(@Param("academicYearId") UUID academicYearId);

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

    /**
     * Nombre de cours actifs par salle, pour l'écran des salles.
     *
     * <p>Une seule requête pour toutes les salles : la liste affiche l'occupation
     * de chaque ligne, et compter salle par salle ferait autant d'allers-retours
     * que de salles. Les salles jamais placées n'apparaissent pas dans le
     * résultat, le service les lit comme zéro.</p>
     */
    @Query("""
           SELECT s.room.id, COUNT(s) FROM TimetableSlot s
           WHERE s.room IS NOT NULL AND s.active = true
           GROUP BY s.room.id
           """)
    List<Object[]> countActiveByRoom();

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
