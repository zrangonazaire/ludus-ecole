package ci.company.eduops.messaging.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.messaging.domain.CampaignKind;
import ci.company.eduops.messaging.domain.CampaignStatus;
import ci.company.eduops.messaging.domain.MessageCampaign;
import ci.company.eduops.messaging.domain.MessageRecipient;
import ci.company.eduops.messaging.domain.MessagingSettings;
import ci.company.eduops.messaging.domain.ReminderType;
import ci.company.eduops.messaging.repository.MessageCampaignRepository;
import ci.company.eduops.messaging.repository.MessagingSettingsRepository;
import ci.company.eduops.notification.domain.NotificationChannel;
import ci.company.eduops.notification.service.MailService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Reminders and announcements to families.
 *
 * <p>Two ideas run through this class.</p>
 *
 * <p><strong>Nothing is sent in one step.</strong> {@link #prepare} resolves
 * the recipients, renders the message for each of them, counts the SMS
 * segments and prices the lot — and stops. {@link #send} is a separate call,
 * behind a separate permission. An SMS cannot be recalled, and the failure
 * this screen exists to prevent is a filter that quietly matches the whole
 * school.</p>
 *
 * <p><strong>What went out is kept, not recomputed.</strong> Each recipient
 * row freezes the rendered text and the address used. Re-rendering the
 * template six months later would show today's balance on a reminder that
 * quoted another figure, and the school would be arguing about a message it
 * can no longer produce.</p>
 *
 * <p>Five refusals live here rather than on the screen:</p>
 * <ul>
 *   <li>No send of a campaign that is not a draft — two clicks must not send
 *       twice.</li>
 *   <li>No send without recipients: an empty campaign that reports success
 *       teaches the school that the reminder went out.</li>
 *   <li>No send beyond the daily SMS cap. It refuses rather than truncates: a
 *       half-sent reminder is worse than a refused one, because nobody knows
 *       who received it.</li>
 *   <li>No campaign whose template uses a placeholder nothing will fill.</li>
 *   <li>No editing a campaign once it has left.</li>
 * </ul>
 */
@Service
public class MessagingService {

    private static final Logger log = LoggerFactory.getLogger(MessagingService.class);

    private static final DateTimeFormatter DAY = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    /** Beyond this many unjustified absences, the family is written to. */
    private static final int ABSENCE_THRESHOLD = 3;

    private final MessageCampaignRepository campaignRepository;
    private final MessagingSettingsRepository settingsRepository;
    private final AcademicYearRepository academicYearRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final SchoolRepository schoolRepository;
    private final RecipientResolver recipientResolver;
    private final MessageRenderer renderer;
    private final SmsSegmentCounter segmentCounter;
    private final SmsGateway smsGateway;
    private final MailService mailService;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public MessagingService(MessageCampaignRepository campaignRepository,
                            MessagingSettingsRepository settingsRepository,
                            AcademicYearRepository academicYearRepository,
                            EnrollmentRepository enrollmentRepository,
                            StudentFeeRepository studentFeeRepository,
                            SchoolRepository schoolRepository,
                            RecipientResolver recipientResolver,
                            MessageRenderer renderer,
                            SmsSegmentCounter segmentCounter,
                            SmsGateway smsGateway,
                            MailService mailService,
                            AuditService auditService,
                            CurrentUser currentUser) {
        this.campaignRepository = campaignRepository;
        this.settingsRepository = settingsRepository;
        this.academicYearRepository = academicYearRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.schoolRepository = schoolRepository;
        this.recipientResolver = recipientResolver;
        this.renderer = renderer;
        this.segmentCounter = segmentCounter;
        this.smsGateway = smsGateway;
        this.mailService = mailService;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // ------------------------------------------------------- listes calculées

    /** One pupil the school has a reason to write about. */
    public static class ReminderRow {

        private final Student student;
        private final String classroomName;
        private final Map<String, String> variables;

        ReminderRow(Student student, String classroomName, Map<String, String> variables) {
            this.student = student;
            this.classroomName = classroomName;
            this.variables = variables;
        }

        public Student getStudent() {
            return student;
        }

        public String getClassroomName() {
            return classroomName;
        }

        /** What the template can substitute for this pupil. */
        public Map<String, String> getVariables() {
            return variables;
        }
    }

    /**
     * Builds one reminder list from the modules that already know.
     *
     * <p>Computed on demand, never stored. A frozen list would keep chasing a
     * family that paid yesterday, which is exactly how a school loses the
     * habit of trusting its reminders.</p>
     */
    @Transactional(readOnly = true)
    public List<ReminderRow> reminderList(ReminderType type, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Map<UUID, Enrollment> enrollments = enrollmentsByStudent(year.getId());

        return switch (type) {
            case UNPAID_FEES -> unpaidFees(year, enrollments);
            // Les autres listes sont calculées par leurs modules respectifs et
            // seront branchées ici ; renvoyer une liste vide est honnête, et
            // l'écran le dit plutôt que de laisser croire à zéro impayé.
            case REPEATED_ABSENCE, MISSING_VACCINE, OVERDUE_EXAM,
                 MISSING_DOCUMENT, REPORT_CARD -> List.of();
        };
    }

    /** Pupils whose fees are outstanding, with the amount owed. */
    private List<ReminderRow> unpaidFees(AcademicYear year,
                                          Map<UUID, Enrollment> enrollments) {
        Map<UUID, BigDecimal> owedByStudent = new LinkedHashMap<>();
        Map<UUID, Student> students = new LinkedHashMap<>();

        for (StudentFee fee : studentFeeRepository.findAllOutstandingForYear(year.getId())) {
            Student student = fee.getStudent();
            BigDecimal remaining = fee.getAmountRemaining() != null
                    ? fee.getAmountRemaining()
                    : fee.getAmountDue().subtract(fee.getAmountPaid());
            if (remaining.signum() <= 0) {
                continue;
            }
            students.putIfAbsent(student.getId(), student);
            owedByStudent.merge(student.getId(), remaining, BigDecimal::add);
        }

        List<ReminderRow> rows = new ArrayList<>();
        for (Map.Entry<UUID, BigDecimal> entry : owedByStudent.entrySet()) {
            Student student = students.get(entry.getKey());
            String classroom = classroomNameOf(student.getId(), enrollments);
            Map<String, String> variables = baseVariables(student, classroom);
            variables.put("montant", entry.getValue().toPlainString());
            variables.put("detail", "scolarité");
            rows.add(new ReminderRow(student, classroom, variables));
        }
        return rows;
    }

    // ------------------------------------------------------------ préparation

    /** What a prepared campaign looks like before anything leaves. */
    public static class Preview {

        private MessageCampaign campaign;
        private List<String> unreachable = new ArrayList<>();
        private int withoutConsent;
        private String sample;
        private boolean unicode;
        private List<String> offenders = new ArrayList<>();
        private String suggestion;
        private boolean gatewayLive;
        private String gatewayName;
        private long capRemaining;

        public MessageCampaign getCampaign() {
            return campaign;
        }

        public List<String> getUnreachable() {
            return unreachable;
        }

        public int getWithoutConsent() {
            return withoutConsent;
        }

        /** Le message rendu pour un destinataire réel, pas un exemple inventé. */
        public String getSample() {
            return sample;
        }

        public boolean isUnicode() {
            return unicode;
        }

        public List<String> getOffenders() {
            return offenders;
        }

        public String getSuggestion() {
            return suggestion;
        }

        public boolean isGatewayLive() {
            return gatewayLive;
        }

        public String getGatewayName() {
            return gatewayName;
        }

        public long getCapRemaining() {
            return capRemaining;
        }
    }

    /**
     * Resolves, renders and prices a campaign without sending it.
     *
     * @param kind      reminder or free announcement
     * @param reminder  the list to draw from, when this is a reminder
     * @param channel   EMAIL or SMS
     * @param title     what the log will call it
     * @param subject   the e-mail subject; ignored for SMS
     * @param template  the body, with its placeholders
     * @param studentIds explicit recipients, for a free announcement
     */
    @Transactional
    public Preview prepare(CampaignKind kind, ReminderType reminder,
                           NotificationChannel channel, String title, String subject,
                           String template, List<UUID> studentIds, UUID academicYearId) {
        currentUser.requirePermission("MESSAGE_COMPOSE");

        if (channel != NotificationChannel.EMAIL && channel != NotificationChannel.SMS) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Seuls le courriel et le SMS sont gérés par cet écran.");
        }
        List<String> unknown = renderer.unknownPlaceholders(template);
        if (!unknown.isEmpty()) {
            throw new BusinessException(ErrorCode.MESSAGE_UNKNOWN_PLACEHOLDER,
                    "Le message utilise une variable inconnue : {" + unknown.get(0)
                            + "}. Elle partirait telle quelle à toutes les familles.");
        }

        AcademicYear year = resolveYear(academicYearId);
        School school = requireSchool(year);
        MessagingSettings settings = settingsFor(school);

        List<ReminderRow> rows = kind.isReminder()
                ? reminderList(reminder, year.getId())
                : explicitRows(studentIds, year);

        List<Student> students = rows.stream().map(ReminderRow::getStudent).toList();
        RecipientResolver.Resolution resolution =
                recipientResolver.resolve(students, channel, reminder);

        MessageCampaign campaign = new MessageCampaign();
        campaign.setSchool(school);
        campaign.setAcademicYear(year);
        campaign.setKind(kind);
        campaign.setReminder(kind.isReminder() ? reminder : null);
        campaign.setChannel(channel);
        campaign.setTitle(title != null && !title.isBlank() ? title.trim()
                : (reminder != null ? reminder.defaultTitle() : "Message aux familles"));
        campaign.setSubject(channel == NotificationChannel.EMAIL ? subject : null);
        campaign.setBodyTemplate(template);
        campaign.setAudienceLabel(describeAudience(kind, reminder, rows.size()));
        campaign.setCurrency(settings.getCurrency());
        campaign.setStatus(CampaignStatus.DRAFT);
        campaign.setCreatedBy(currentUser.id().orElse(null));

        // Le message est rendu maintenant, destinataire par destinataire, et
        // conservé tel quel. C'est ce texte qui partira, pas le gabarit.
        Map<UUID, ReminderRow> rowByStudent = new HashMap<>();
        for (ReminderRow row : rows) {
            rowByStudent.put(row.getStudent().getId(), row);
        }

        int segments = 0;
        for (RecipientResolver.Target target : resolution.getTargets()) {
            ReminderRow row = rowByStudent.get(target.getStudent().getId());
            Map<String, String> variables = row != null
                    ? new LinkedHashMap<>(row.getVariables())
                    : baseVariables(target.getStudent(), "");
            variables.put("tuteur", target.getGuardian().fullName());
            variables.put("ecole", school.getName());
            variables.put("date", LocalDate.now().format(DAY));

            String body = renderer.render(template, variables);

            MessageRecipient recipient = new MessageRecipient();
            recipient.setCampaign(campaign);
            recipient.setGuardian(target.getGuardian());
            recipient.setStudent(target.getStudent());
            recipient.setRecipientName(target.getGuardian().fullName());
            recipient.setAddress(target.getAddress());
            recipient.setChannel(channel);
            recipient.setRenderedSubject(campaign.getSubject());
            recipient.setRenderedBody(body);

            short count = channel == NotificationChannel.SMS
                    ? (short) segmentCounter.estimate(body).getSegments() : 1;
            recipient.setSegments(count);
            if (channel == NotificationChannel.SMS) {
                segments += count;
            }
            campaign.getRecipients().add(recipient);
        }

        campaign.setRecipientCount(campaign.getRecipients().size());
        campaign.setSegmentCount(segments);
        campaign.setEstimatedCost(channel == NotificationChannel.SMS
                ? settings.getSmsUnitCost().multiply(BigDecimal.valueOf(segments))
                : BigDecimal.ZERO);

        MessageCampaign saved = campaignRepository.save(campaign);
        log.info("Campaign prepared: {} recipient(s), {} segment(s), {} {}",
                saved.getRecipientCount(), saved.getSegmentCount(),
                saved.getEstimatedCost(), saved.getCurrency());

        Preview preview = new Preview();
        preview.campaign = saved;
        preview.unreachable = resolution.getUnreachable();
        preview.withoutConsent = resolution.getWithoutConsent();
        preview.gatewayLive = smsGateway.isLive();
        preview.gatewayName = smsGateway.describe();

        if (!saved.getRecipients().isEmpty()) {
            String sample = saved.getRecipients().get(0).getRenderedBody();
            preview.sample = sample;
            SmsSegmentCounter.Estimate estimate = segmentCounter.estimate(sample);
            preview.unicode = estimate.isUnicode();
            preview.offenders = estimate.getOffenders();
            preview.suggestion = estimate.getSuggestion();
        }
        long usedToday = campaignRepository.countSmsSegmentsSince(
                school.getId(), OffsetDateTime.now().minusDays(1));
        preview.capRemaining = Math.max(0, settings.getDailySmsCap() - usedToday);
        return preview;
    }

    // ------------------------------------------------------------------ envoi

    /**
     * Actually sends a prepared campaign.
     *
     * <p>Each recipient is attempted in turn; one refusal is recorded on its
     * own row and the rest carry on. A campaign of four hundred must not be
     * lost to a single malformed number.</p>
     */
    @Transactional
    public MessageCampaign send(UUID campaignId) {
        currentUser.requirePermission("MESSAGE_SEND");
        MessageCampaign campaign = campaignRepository.findWithRecipients(campaignId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MESSAGE_CAMPAIGN_NOT_FOUND));

        if (!campaign.getStatus().canSend()) {
            throw new BusinessException(ErrorCode.MESSAGE_ALREADY_SENT,
                    "Cette campagne est « " + campaign.getStatus()
                            + " » : elle ne peut plus être envoyée.");
        }
        if (campaign.getRecipients().isEmpty()) {
            throw new BusinessException(ErrorCode.MESSAGE_NO_RECIPIENT,
                    "Aucun destinataire : rien à envoyer. Vérifiez les "
                            + "consentements et les numéros des familles.");
        }

        MessagingSettings settings = settingsFor(campaign.getSchool());
        if (campaign.getChannel() == NotificationChannel.SMS) {
            long usedToday = campaignRepository.countSmsSegmentsSince(
                    campaign.getSchool().getId(), OffsetDateTime.now().minusDays(1));
            if (!settings.allows((int) usedToday, campaign.getSegmentCount())) {
                // On refuse, on ne tronque pas : une relance partiellement
                // partie est pire qu'une relance refusée, parce que personne
                // ne sait qui l'a reçue.
                throw new BusinessException(ErrorCode.MESSAGE_DAILY_CAP_REACHED,
                        "Plafond quotidien atteint : " + usedToday + " SMS déjà "
                                + "envoyés sur " + settings.getDailySmsCap()
                                + ". Cet envoi en demande " + campaign.getSegmentCount()
                                + ".");
            }
        }

        campaign.setStatus(CampaignStatus.SENDING);
        for (MessageRecipient recipient : campaign.getRecipients()) {
            try {
                String reference = deliver(recipient, settings);
                recipient.succeed(reference);
            } catch (RuntimeException e) {
                // Un numéro refusé n'annule pas les trois cent quatre-vingt-dix-neuf autres.
                recipient.fail(e.getMessage());
                log.warn("Delivery failed for {} : {}",
                        recipient.getRecipientName(), e.getMessage());
            }
        }
        campaign.close(currentUser.id().orElse(null));

        MessageCampaign saved = campaignRepository.save(campaign);
        auditService.logUpdate("MessageCampaign", saved.getId(), saved.getTitle(),
                Map.of("status", CampaignStatus.DRAFT.name()),
                Map.of("status", CampaignStatus.SENT.name(),
                        "sent", String.valueOf(saved.getSentCount()),
                        "failed", String.valueOf(saved.getFailedCount()),
                        "cost", saved.getEstimatedCost().toPlainString()));
        log.info("Campaign sent: {} ok, {} failed", saved.getSentCount(), saved.getFailedCount());
        return saved;
    }

    /** One message out, through the right channel. */
    @Transactional(propagation = Propagation.MANDATORY)
    protected String deliver(MessageRecipient recipient, MessagingSettings settings) {
        if (recipient.getChannel() == NotificationChannel.SMS) {
            return smsGateway.send(recipient.getAddress(), recipient.getRenderedBody(),
                    settings.getSmsSenderName());
        }
        mailService.send(recipient.getAddress(),
                recipient.getRenderedSubject() != null
                        ? recipient.getRenderedSubject()
                        : recipient.getCampaign().getTitle(),
                recipient.getRenderedBody());
        return null;
    }

    /** Drops a campaign that was prepared and thought better of. */
    @Transactional
    public MessageCampaign cancel(UUID campaignId, String reason) {
        currentUser.requirePermission("MESSAGE_COMPOSE");
        MessageCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MESSAGE_CAMPAIGN_NOT_FOUND));
        if (!campaign.getStatus().isEditable()) {
            throw new BusinessException(ErrorCode.MESSAGE_ALREADY_SENT,
                    "Une campagne déjà partie ne s'annule pas : les messages sont "
                            + "chez les familles.");
        }
        campaign.cancel(reason != null && !reason.isBlank()
                ? reason.trim() : "Annulée avant envoi.");
        return campaignRepository.save(campaign);
    }

    // --------------------------------------------------------------- lecture

    @Transactional(readOnly = true)
    public List<MessageCampaign> history(UUID academicYearId, CampaignStatus status) {
        currentUser.requirePermission("MESSAGE_VIEW");
        return campaignRepository.findForYear(resolveYear(academicYearId).getId(), status);
    }

    @Transactional(readOnly = true)
    public MessageCampaign campaign(UUID campaignId) {
        currentUser.requirePermission("MESSAGE_VIEW");
        return campaignRepository.findWithRecipients(campaignId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MESSAGE_CAMPAIGN_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public MessagingSettings settings() {
        currentUser.requirePermission("MESSAGE_VIEW");
        return settingsFor(requireSchool(resolveYear(null)));
    }

    @Transactional
    public MessagingSettings saveSettings(String senderName, BigDecimal unitCost,
                                          int dailyCap, String replyTo, String signature) {
        currentUser.requirePermission("MESSAGE_SETTINGS");
        MessagingSettings settings = settingsFor(requireSchool(resolveYear(null)));
        settings.setSmsSenderName(blankToNull(senderName));
        settings.setSmsUnitCost(unitCost != null ? unitCost : BigDecimal.ZERO);
        settings.setDailySmsCap(Math.max(0, dailyCap));
        settings.setReplyToEmail(blankToNull(replyTo));
        settings.setSignature(blankToNull(signature));
        return settingsRepository.save(settings);
    }

    /** Whether messages actually leave the building. The screen says so. */
    public boolean gatewayLive() {
        return smsGateway.isLive();
    }

    public String gatewayName() {
        return smsGateway.describe();
    }

    // ------------------------------------------------------------- plomberie

    private List<ReminderRow> explicitRows(List<UUID> studentIds, AcademicYear year) {
        Map<UUID, Enrollment> enrollments = enrollmentsByStudent(year.getId());
        List<ReminderRow> rows = new ArrayList<>();
        for (Enrollment enrollment : enrollments.values()) {
            Student student = enrollment.getStudent();
            if (studentIds != null && !studentIds.isEmpty()
                    && !studentIds.contains(student.getId())) {
                continue;
            }
            String classroom = enrollment.getClassroom() != null
                    ? enrollment.getClassroom().getName() : "";
            rows.add(new ReminderRow(student, classroom,
                    baseVariables(student, classroom)));
        }
        return rows;
    }

    private Map<String, String> baseVariables(Student student, String classroom) {
        Map<String, String> variables = new LinkedHashMap<>();
        variables.put("eleve", student.fullName());
        variables.put("matricule", student.getStudentNumber());
        variables.put("classe", classroom);
        variables.put("date", LocalDate.now().format(DAY));
        return variables;
    }

    private String describeAudience(CampaignKind kind, ReminderType reminder, int pupils) {
        if (kind.isReminder() && reminder != null) {
            return reminder.defaultTitle() + " — " + pupils + " élève(s) concerné(s)";
        }
        return pupils + " élève(s) sélectionné(s)";
    }

    private Map<UUID, Enrollment> enrollmentsByStudent(UUID yearId) {
        Map<UUID, Enrollment> byStudent = new LinkedHashMap<>();
        for (Enrollment enrollment : enrollmentRepository.findActiveByYear(yearId)) {
            byStudent.put(enrollment.getStudent().getId(), enrollment);
        }
        return byStudent;
    }

    private String classroomNameOf(UUID studentId, Map<UUID, Enrollment> enrollments) {
        Enrollment enrollment = enrollments.get(studentId);
        return enrollment != null && enrollment.getClassroom() != null
                ? enrollment.getClassroom().getName() : "";
    }

    private MessagingSettings settingsFor(School school) {
        return settingsRepository.findBySchoolId(school.getId())
                .orElseGet(() -> {
                    MessagingSettings created = new MessagingSettings();
                    created.setSchool(school);
                    return settingsRepository.save(created);
                });
    }

    private School requireSchool(AcademicYear year) {
        if (year.getSchool() != null) {
            return year.getSchool();
        }
        return schoolRepository.findById(requireSchoolId())
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchoolId(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active."));
    }

    private UUID requireSchoolId() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
