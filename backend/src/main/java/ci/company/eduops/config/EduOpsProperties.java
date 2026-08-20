package ci.company.eduops.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** Typed binding of every {@code eduops.*} setting in application.yml. */
@ConfigurationProperties(prefix = "eduops")
public class EduOpsProperties {

    private Api api = new Api();
    private School school = new School();
    private Numbering numbering = new Numbering();
    private Security security = new Security();
    private Cors cors = new Cors();
    private RateLimit rateLimit = new RateLimit();
    private Mail mail = new Mail();
    private App app = new App();
    private Storage storage = new Storage();
    private Bootstrap bootstrap = new Bootstrap();
    private Academic academic = new Academic();
    private Demo demo = new Demo();
    private Events events = new Events();

    public static class Api {
        private String basePath = "/api/v1";

        public String getBasePath() {
            return basePath;
        }

        public void setBasePath(String basePath) {
            this.basePath = basePath;
        }
    }

    public static class School {
        private String name = "EduOps School";
        private String code = "EDU";
        private String currency = "XOF";
        private String locale = "fr-CI";
        private String timezone = "Africa/Abidjan";

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getLocale() {
            return locale;
        }

        public void setLocale(String locale) {
            this.locale = locale;
        }

        public String getTimezone() {
            return timezone;
        }

        public void setTimezone(String timezone) {
            this.timezone = timezone;
        }
    }

    public static class Numbering {
        private String studentPattern = "EDU-{year}-{seq:6}";
        private String receiptPattern = "REC-{year}-{seq:8}";
        private String invoicePattern = "INV-{year}-{seq:8}";
        private String enrollmentPattern = "ENR-{year}-{seq:6}";
        private String admissionPattern = "ADM-{year}-{seq:6}";
        private String incidentPattern = "INC-{year}-{seq:6}";
        private String documentPattern = "DOC-{year}-{seq:8}";
        private String cashSessionPattern = "CSH-{year}-{seq:6}";

        public String getStudentPattern() {
            return studentPattern;
        }

        public void setStudentPattern(String studentPattern) {
            this.studentPattern = studentPattern;
        }

        public String getReceiptPattern() {
            return receiptPattern;
        }

        public void setReceiptPattern(String receiptPattern) {
            this.receiptPattern = receiptPattern;
        }

        public String getInvoicePattern() {
            return invoicePattern;
        }

        public void setInvoicePattern(String invoicePattern) {
            this.invoicePattern = invoicePattern;
        }

        public String getEnrollmentPattern() {
            return enrollmentPattern;
        }

        public void setEnrollmentPattern(String enrollmentPattern) {
            this.enrollmentPattern = enrollmentPattern;
        }

        public String getAdmissionPattern() {
            return admissionPattern;
        }

        public void setAdmissionPattern(String admissionPattern) {
            this.admissionPattern = admissionPattern;
        }

        public String getIncidentPattern() {
            return incidentPattern;
        }

        public void setIncidentPattern(String incidentPattern) {
            this.incidentPattern = incidentPattern;
        }

        public String getDocumentPattern() {
            return documentPattern;
        }

        public void setDocumentPattern(String documentPattern) {
            this.documentPattern = documentPattern;
        }

        public String getCashSessionPattern() {
            return cashSessionPattern;
        }

        public void setCashSessionPattern(String cashSessionPattern) {
            this.cashSessionPattern = cashSessionPattern;
        }
    }

    public static class Jwt {
        private String secret;
        private long expirationMs = 3_600_000L;
        private long refreshExpirationMs = 604_800_000L;
        private String issuer = "eduops";

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }

        public long getExpirationMs() {
            return expirationMs;
        }

        public void setExpirationMs(long expirationMs) {
            this.expirationMs = expirationMs;
        }

        public long getRefreshExpirationMs() {
            return refreshExpirationMs;
        }

        public void setRefreshExpirationMs(long refreshExpirationMs) {
            this.refreshExpirationMs = refreshExpirationMs;
        }

        public String getIssuer() {
            return issuer;
        }

        public void setIssuer(String issuer) {
            this.issuer = issuer;
        }
    }

    public static class Security {
        private Jwt jwt = new Jwt();
        private int maxFailedLogins = 5;
        private int lockDurationMinutes = 15;
        private int passwordMinLength = 10;
        private boolean requireHttps = false;

        public Jwt getJwt() {
            return jwt;
        }

        public void setJwt(Jwt jwt) {
            this.jwt = jwt;
        }

        public int getMaxFailedLogins() {
            return maxFailedLogins;
        }

        public void setMaxFailedLogins(int maxFailedLogins) {
            this.maxFailedLogins = maxFailedLogins;
        }

        public int getLockDurationMinutes() {
            return lockDurationMinutes;
        }

        public void setLockDurationMinutes(int lockDurationMinutes) {
            this.lockDurationMinutes = lockDurationMinutes;
        }

        public int getPasswordMinLength() {
            return passwordMinLength;
        }

        public void setPasswordMinLength(int passwordMinLength) {
            this.passwordMinLength = passwordMinLength;
        }

        public boolean isRequireHttps() {
            return requireHttps;
        }

        public void setRequireHttps(boolean requireHttps) {
            this.requireHttps = requireHttps;
        }
    }

    public static class Cors {
        private String allowedOrigins = "http://localhost:4200";
        private String allowedMethods = "GET,POST,PUT,PATCH,DELETE,OPTIONS";
        private String allowedHeaders = "*";
        private boolean allowCredentials = true;

        public String getAllowedOrigins() {
            return allowedOrigins;
        }

        public void setAllowedOrigins(String allowedOrigins) {
            this.allowedOrigins = allowedOrigins;
        }

        public String getAllowedMethods() {
            return allowedMethods;
        }

        public void setAllowedMethods(String allowedMethods) {
            this.allowedMethods = allowedMethods;
        }

        public String getAllowedHeaders() {
            return allowedHeaders;
        }

        public void setAllowedHeaders(String allowedHeaders) {
            this.allowedHeaders = allowedHeaders;
        }

        public boolean isAllowCredentials() {
            return allowCredentials;
        }

        public void setAllowCredentials(boolean allowCredentials) {
            this.allowCredentials = allowCredentials;
        }
    }

    public static class RateLimit {
        private boolean enabled = true;
        private int loginAttemptsPerMinute = 10;
        private int paymentRequestsPerMinute = 60;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public int getLoginAttemptsPerMinute() {
            return loginAttemptsPerMinute;
        }

        public void setLoginAttemptsPerMinute(int loginAttemptsPerMinute) {
            this.loginAttemptsPerMinute = loginAttemptsPerMinute;
        }

        public int getPaymentRequestsPerMinute() {
            return paymentRequestsPerMinute;
        }

        public void setPaymentRequestsPerMinute(int paymentRequestsPerMinute) {
            this.paymentRequestsPerMinute = paymentRequestsPerMinute;
        }
    }

    public static class Mail {
        private String from = "no-reply@eduops.local";
        private boolean enabled = true;
        private String provider = "MAILPIT";

        public String getFrom() {
            return from;
        }

        public void setFrom(String from) {
            this.from = from;
        }

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getProvider() {
            return provider;
        }

        public void setProvider(String provider) {
            this.provider = provider;
        }
    }

    public static class App {
        private String baseUrl = "http://localhost:4200";
        private String apiUrl = "http://localhost:8080";

        public String getBaseUrl() {
            return baseUrl;
        }

        public void setBaseUrl(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getApiUrl() {
            return apiUrl;
        }

        public void setApiUrl(String apiUrl) {
            this.apiUrl = apiUrl;
        }
    }

    public static class Storage {
        private String location = "./storage";

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }

    public static class Bootstrap {
        private String adminEmail = "admin@eduops.local";
        private String adminPassword = "ChangeMe!2026";

        public String getAdminEmail() {
            return adminEmail;
        }

        public void setAdminEmail(String adminEmail) {
            this.adminEmail = adminEmail;
        }

        public String getAdminPassword() {
            return adminPassword;
        }

        public void setAdminPassword(String adminPassword) {
            this.adminPassword = adminPassword;
        }
    }

    public static class Academic {
        private int defaultScaleMax = 20;
        private int defaultPassingMark = 10;
        private int roundingDecimals = 2;

        public int getDefaultScaleMax() {
            return defaultScaleMax;
        }

        public void setDefaultScaleMax(int defaultScaleMax) {
            this.defaultScaleMax = defaultScaleMax;
        }

        public int getDefaultPassingMark() {
            return defaultPassingMark;
        }

        public void setDefaultPassingMark(int defaultPassingMark) {
            this.defaultPassingMark = defaultPassingMark;
        }

        public int getRoundingDecimals() {
            return roundingDecimals;
        }

        public void setRoundingDecimals(int roundingDecimals) {
            this.roundingDecimals = roundingDecimals;
        }
    }

    public static class Demo {
        private boolean enabled = false;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }
    }

    public static class Relay {
        private boolean enabled = true;
        private int batchSize = 100;
        private long pollIntervalMs = 2000L;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public int getBatchSize() {
            return batchSize;
        }

        public void setBatchSize(int batchSize) {
            this.batchSize = batchSize;
        }

        public long getPollIntervalMs() {
            return pollIntervalMs;
        }

        public void setPollIntervalMs(long pollIntervalMs) {
            this.pollIntervalMs = pollIntervalMs;
        }
    }

    public static class Events {
        private Relay relay = new Relay();

        public Relay getRelay() {
            return relay;
        }

        public void setRelay(Relay relay) {
            this.relay = relay;
        }
    }

    public Api getApi() {
        return api;
    }

    public void setApi(Api api) {
        this.api = api;
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public Numbering getNumbering() {
        return numbering;
    }

    public void setNumbering(Numbering numbering) {
        this.numbering = numbering;
    }

    public Security getSecurity() {
        return security;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

    public Cors getCors() {
        return cors;
    }

    public void setCors(Cors cors) {
        this.cors = cors;
    }

    public RateLimit getRateLimit() {
        return rateLimit;
    }

    public void setRateLimit(RateLimit rateLimit) {
        this.rateLimit = rateLimit;
    }

    public Mail getMail() {
        return mail;
    }

    public void setMail(Mail mail) {
        this.mail = mail;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public Bootstrap getBootstrap() {
        return bootstrap;
    }

    public void setBootstrap(Bootstrap bootstrap) {
        this.bootstrap = bootstrap;
    }

    public Academic getAcademic() {
        return academic;
    }

    public void setAcademic(Academic academic) {
        this.academic = academic;
    }

    public Demo getDemo() {
        return demo;
    }

    public void setDemo(Demo demo) {
        this.demo = demo;
    }

    public Events getEvents() {
        return events;
    }

    public void setEvents(Events events) {
        this.events = events;
    }
}
