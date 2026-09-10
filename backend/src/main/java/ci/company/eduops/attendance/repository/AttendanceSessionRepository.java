package ci.company.eduops.attendance.repository;

import ci.company.eduops.attendance.domain.AttendanceSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AttendanceSessionRepository extends JpaRepository<AttendanceSession, UUID> {

    List<AttendanceSession> findByClassroomIdAndSessionDate(UUID classroomId, LocalDate date);

    Optional<AttendanceSession> findByIdempotencyKey(String idempotencyKey);

    /**
     * La feuille d'un cours : une classe, un jour, une matière.
     *
     * <h2>Aucun paramètre nul</h2>
     *
     * <p>La version précédente acceptait un horaire et une matière facultatifs,
     * testés par {@code :startTime IS NULL}. C'est la forme qui a mis à terre
     * les écrans Personnel et Enseignants : sur un paramètre lié testé pour la
     * nullité, PostgreSQL n'a aucun type à inférer, et la requête échoue quelle
     * que soit la valeur envoyée. Elle n'avait jamais explosé ici parce qu'elle
     * n'avait jamais tourné — le seul appelant ne s'en servait que si une
     * matière était fournie, et l'écran n'en envoyait jamais.</p>
     *
     * <p>L'horaire ne fait pas partie de la clé : une feuille créée pour une
     * matière n'en porte pas. Conséquence assumée — deux cours de la même
     * matière le même jour partagent une feuille. Le jour où cela gêne, c'est
     * l'heure qu'il faudra enregistrer à la création, pas ce filtre qu'il
     * faudra durcir.</p>
     */
    @Query("""
           SELECT s FROM AttendanceSession s
           WHERE s.classroom.id = :classroomId AND s.sessionDate = :date
             AND s.subject.id = :subjectId
           """)
    Optional<AttendanceSession> findLessonSheet(@Param("classroomId") UUID classroomId,
                                                @Param("date") LocalDate date,
                                                @Param("subjectId") UUID subjectId);

    /**
     * The day register of one class: no subject, no time slot.
     *
     * <p>Distinct from {@link #findExisting} on purpose. That one treats a null
     * subject as "any subject", which is right when looking for a clash but
     * wrong here: it would hand back a teacher's maths sheet when asked for the
     * morning roll call, and the day's marks would be written over a lesson.</p>
     */
    @Query("""
           SELECT s FROM AttendanceSession s
           WHERE s.classroom.id = :classroomId AND s.sessionDate = :date
             AND s.subject IS NULL AND s.startTime IS NULL
           """)
    Optional<AttendanceSession> findDailyRegister(@Param("classroomId") UUID classroomId,
                                                  @Param("date") LocalDate date);

    Page<AttendanceSession> findByTeacherIdOrderBySessionDateDesc(UUID teacherId, Pageable pageable);

    /**
     * Every sheet of one day, all classes together.
     *
     * <p>Feeds the day view, which has to name the classes whose roll call is
     * still missing. A query per class would hide exactly those: a class with no
     * sheet returns nothing, and nothing is easy to skip over.</p>
     */
    @Query("""
           SELECT s FROM AttendanceSession s
           WHERE s.academicYear.id = :academicYearId AND s.sessionDate = :date
           """)
    List<AttendanceSession> findByYearAndDate(@Param("academicYearId") UUID academicYearId,
                                              @Param("date") LocalDate date);

    @Query("""
           SELECT COUNT(s) FROM AttendanceSession s
           WHERE s.academicYear.id = :academicYearId AND s.sessionDate = :date
             AND s.status = 'OPEN'
           """)
    long countOpenSheets(@Param("academicYearId") UUID academicYearId,
                         @Param("date") LocalDate date);
}
