package ci.company.eduops.notification.service;

import ci.company.eduops.common.event.DomainEvent;
import ci.company.eduops.common.event.DomainEventType;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.notification.domain.Notification;
import ci.company.eduops.notification.domain.NotificationChannel;
import ci.company.eduops.notification.domain.NotificationStatus;
import ci.company.eduops.notification.repository.NotificationRepository;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Turns business events into messages people actually receive.
 *
 * <p>Runs from the outbox relay, on a scheduler — outside any HTTP request,
 * so no tenant is established. Hence {@link TenantBypass}: without it the
 * row-level policy would refuse every insert, and the inbox would stay empty
 * with nothing in the logs to explain why. The school comes from the event
 * itself, never from an ambient context that does not exist here.</p>
 *
 * <h2>Consent is not decoration</h2>
 *
 * <p>A guardian who declined financial notices does not receive payment
 * messages, even though the system could technically address them. The three
 * flags on the guardian link say what a family agreed to; overriding them
 * because a notification is convenient to send is how a school ends up
 * texting a father about arrears he explicitly asked not to hear about.</p>
 */
@Service
public class NotificationFactory {

    private static final Logger log = LoggerFactory.getLogger(NotificationFactory.class);

    private final NotificationRepository notificationRepository;
    private final StudentGuardianRepository studentGuardianRepository;
    private final StudentRepository studentRepository;

    public NotificationFactory(NotificationRepository notificationRepository,
                               StudentGuardianRepository studentGuardianRepository,
                               StudentRepository studentRepository) {
        this.notificationRepository = notificationRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.studentRepository = studentRepository;
    }

    /**
     * Crée les messages correspondant à cet événement.
     *
     * <p>Transaction séparée : une notification impossible à écrire ne doit pas
     * faire rejouer l'événement, sous peine d'envoyer cinq fois la même absence
     * à un parent le jour où le service de messages instantanés tombe.</p>
     */
    @TenantBypass
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public int createFor(DomainEvent event) {
        if (event.getSchoolId() == null) {
            // Sans école, la notification serait invisible de tous : mieux vaut
            // ne pas l'écrire et le dire.
            log.warn("Événement {} sans établissement : aucune notification créée",
                    event.getId());
            return 0;
        }

        DomainEventType type;
        try {
            type = DomainEventType.valueOf(event.getEventType());
        } catch (IllegalArgumentException exception) {
            return 0;
        }

        Recipe recipe = recipeFor(type, event);
        if (recipe == null) {
            return 0;
        }

        List<Notification> created = new ArrayList<>();
        for (UUID recipient : recipientsFor(event.getStudentId(), recipe.consent)) {
            created.add(build(event, recipe, recipient));
        }
        if (created.isEmpty()) {
            return 0;
        }
        notificationRepository.saveAll(created);
        log.debug("{} notification(s) créée(s) pour {}", created.size(), type);
        return created.size();
    }

    // ------------------------------------------------------------------

    /** Ce qu'un type d'événement produit comme message, et pour qui. */
    private record Recipe(String category, String title, String body,
                          String actionUrl, Consent consent) {
    }

    /** Le consentement requis pour recevoir ce message. */
    private enum Consent {
        GENERAL, ACADEMIC, FINANCIAL
    }

    private Recipe recipeFor(DomainEventType type, DomainEvent event) {
        String name = studentName(event.getStudentId());
        String link = event.getStudentId() == null
                ? null : "/students/" + event.getStudentId();

        return switch (type) {
            case ABSENCE_RECORDED -> new Recipe("ABSENCE",
                    "Absence signalée",
                    name + " a été porté(e) absent(e). Consultez le détail et "
                            + "déposez un justificatif si nécessaire.",
                    link, Consent.GENERAL);

            case GRADE_PUBLISHED -> new Recipe("GRADE",
                    "Nouvelles notes publiées",
                    "De nouvelles notes sont disponibles pour " + name + ".",
                    link, Consent.ACADEMIC);

            case REPORT_CARD_PUBLISHED -> new Recipe("REPORT_CARD",
                    "Bulletin disponible",
                    "Le bulletin de " + name + " est consultable.",
                    link, Consent.ACADEMIC);

            case PAYMENT_RECEIVED -> new Recipe("PAYMENT",
                    "Paiement enregistré",
                    "Un règlement a été enregistré pour " + name
                            + ". Le reçu est disponible.",
                    link, Consent.FINANCIAL);

            case PAYMENT_CANCELLED -> new Recipe("PAYMENT",
                    "Paiement annulé",
                    "Un règlement enregistré pour " + name + " a été annulé.",
                    link, Consent.FINANCIAL);

            case STUDENT_ENROLLED -> new Recipe("ENROLLMENT",
                    "Inscription confirmée",
                    "L'inscription de " + name + " est enregistrée.",
                    link, Consent.GENERAL);

            // Les autres types existent dans l'énumération mais ne concernent
            // pas les familles : les traiter ici enverrait des messages que
            // personne n'a demandés.
            default -> null;
        };
    }

    /**
     * Les comptes à prévenir : les responsables consentants, et l'élève.
     *
     * <p>Un ensemble ordonné plutôt qu'une liste : un adulte responsable de
     * deux enfants dans la même fratrie ne doit pas recevoir deux fois le
     * même message.</p>
     */
    private Set<UUID> recipientsFor(UUID studentId, Consent consent) {
        Set<UUID> recipients = new LinkedHashSet<>();
        if (studentId == null) {
            return recipients;
        }

        for (StudentGuardian link : studentGuardianRepository.findByStudentId(studentId)) {
            if (!accepts(link, consent)) {
                continue;
            }
            UUID account = link.getGuardian() == null
                    ? null : link.getGuardian().getUserAccountId();
            if (account != null) {
                recipients.add(account);
            }
        }

        // L'élève lui-même, quand il a un accès au portail. Le consentement
        // des responsables ne le concerne pas : il s'agit de sa scolarité.
        studentRepository.findById(studentId)
                .map(Student::getUserAccountId)
                .ifPresent(recipients::add);

        return recipients;
    }

    private boolean accepts(StudentGuardian link, Consent consent) {
        return switch (consent) {
            case GENERAL -> link.isReceivesNotifications();
            case ACADEMIC -> link.isReceivesAcademicReports();
            case FINANCIAL -> link.isReceivesFinancialNotifications();
        };
    }

    private Notification build(DomainEvent event, Recipe recipe, UUID recipient) {
        Notification notification = new Notification();
        notification.setSchoolId(event.getSchoolId());
        notification.setRecipientUserId(recipient);
        notification.setChannel(NotificationChannel.IN_APP);
        notification.setCategory(recipe.category());
        notification.setTitle(recipe.title());
        notification.setBody(recipe.body());
        notification.setActionUrl(recipe.actionUrl());
        notification.setStudentId(event.getStudentId());
        notification.setClassroomId(event.getClassroomId());
        // Remis dès l'écriture : une notification interne n'a pas de trajet.
        notification.setStatus(NotificationStatus.DELIVERED);
        notification.setSentAt(OffsetDateTime.now());

        Map<String, Object> payload = new LinkedHashMap<>();
        // L'événement d'origine, pour pouvoir remonter la chaîne le jour où
        // quelqu'un demande d'où sort un message.
        payload.put("eventId", event.getId() == null ? null : event.getId().toString());
        payload.put("eventType", event.getEventType());
        notification.setPayload(payload);
        return notification;
    }

    private String studentName(UUID studentId) {
        if (studentId == null) {
            return "l'élève";
        }
        return Optional.ofNullable(studentRepository.findById(studentId).orElse(null))
                .map(Student::fullName)
                .orElse("l'élève");
    }
}
