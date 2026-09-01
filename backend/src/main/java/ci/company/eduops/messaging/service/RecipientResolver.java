package ci.company.eduops.messaging.service;

import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.messaging.domain.ReminderType;
import ci.company.eduops.notification.domain.NotificationChannel;
import ci.company.eduops.student.domain.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Who actually gets written to, for one pupil.
 *
 * <p>Not « every guardian linked to the child ». {@code student_guardian}
 * carries three separate consents — {@code receivesNotifications},
 * {@code receivesAcademicReports}, {@code receivesFinancialNotifications} —
 * and they exist because the parent who pays the fees is often not the parent
 * who is told about a fever. Ignoring them would send a demand for money to
 * the aunt who does the school run.</p>
 *
 * <p>A guardian with no usable address for the chosen channel is skipped and
 * reported, never silently dropped: « 12 familles sans numéro » is something
 * the secretary can act on. Nothing is something they will discover in a
 * month.</p>
 */
@Component
public class RecipientResolver {

    private static final Logger log = LoggerFactory.getLogger(RecipientResolver.class);

    private final StudentGuardianRepository studentGuardianRepository;

    public RecipientResolver(StudentGuardianRepository studentGuardianRepository) {
        this.studentGuardianRepository = studentGuardianRepository;
    }

    /** One resolved addressee, before the message is rendered for them. */
    public static class Target {

        private final Guardian guardian;
        private final Student student;
        private final String address;
        private final NotificationChannel channel;

        Target(Guardian guardian, Student student, String address,
               NotificationChannel channel) {
            this.guardian = guardian;
            this.student = student;
            this.address = address;
            this.channel = channel;
        }

        public Guardian getGuardian() {
            return guardian;
        }

        public Student getStudent() {
            return student;
        }

        public String getAddress() {
            return address;
        }

        public NotificationChannel getChannel() {
            return channel;
        }
    }

    /** What resolving produced, including who could not be reached. */
    public static class Resolution {

        private final List<Target> targets = new ArrayList<>();
        private final List<String> unreachable = new ArrayList<>();
        private int withoutConsent;

        public List<Target> getTargets() {
            return targets;
        }

        /** Pupils whose family has no usable address for this channel. */
        public List<String> getUnreachable() {
            return unreachable;
        }

        /** Pupils whose guardians all declined this kind of message. */
        public int getWithoutConsent() {
            return withoutConsent;
        }
    }

    /**
     * Resolves the addressees for a set of pupils.
     *
     * @param students the pupils concerned
     * @param channel  EMAIL or SMS; IN_APP and PUSH are not handled here
     * @param reminder the kind of reminder, or null for a free announcement
     */
    public Resolution resolve(List<Student> students, NotificationChannel channel,
                              ReminderType reminder) {
        Resolution resolution = new Resolution();
        // Une famille avec trois enfants dans l'ecole ne recoit pas trois fois
        // la meme annonce : on dedoublonne par tuteur et par adresse.
        Map<String, Target> unique = new LinkedHashMap<>();

        for (Student student : students) {
            List<StudentGuardian> links =
                    studentGuardianRepository.findByStudentId(student.getId());
            boolean anyConsent = false;
            boolean anyAddress = false;

            for (StudentGuardian link : links) {
                if (!consents(link, reminder)) {
                    continue;
                }
                anyConsent = true;
                Guardian guardian = link.getGuardian();
                String address = addressFor(guardian, channel);
                if (address == null) {
                    continue;
                }
                anyAddress = true;
                String key = channel.name() + '|' + address.toLowerCase();
                unique.putIfAbsent(key, new Target(guardian, student, address, channel));
            }

            if (!anyConsent && !links.isEmpty()) {
                resolution.withoutConsent++;
            } else if (!anyAddress) {
                resolution.unreachable.add(student.fullName());
            }
        }

        resolution.getTargets().addAll(unique.values());
        log.debug("Resolved {} target(s) for {} pupil(s), {} unreachable",
                resolution.getTargets().size(), students.size(),
                resolution.getUnreachable().size());
        return resolution;
    }

    /**
     * Whether this guardian agreed to this kind of message.
     *
     * <p>A free announcement rides on the general consent. A financial
     * reminder needs the financial one — and an academic message the academic
     * one — because that is what the family was asked.</p>
     */
    private boolean consents(StudentGuardian link, ReminderType reminder) {
        if (reminder == null) {
            return link.isReceivesNotifications();
        }
        if (reminder.isFinancial()) {
            return link.isReceivesFinancialNotifications();
        }
        if (reminder.isAcademic()) {
            return link.isReceivesAcademicReports();
        }
        return link.isReceivesNotifications();
    }

    private String addressFor(Guardian guardian, NotificationChannel channel) {
        if (channel == NotificationChannel.SMS) {
            String phone = blankToNull(guardian.getPhone());
            return phone != null ? phone : blankToNull(guardian.getPhoneSecondary());
        }
        if (channel == NotificationChannel.EMAIL) {
            return blankToNull(guardian.getEmail());
        }
        return null;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
