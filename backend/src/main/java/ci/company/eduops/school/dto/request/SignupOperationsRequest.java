package ci.company.eduops.school.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

/**
 * What the visitor described in the « Composer ma démo » walkthrough.
 *
 * <p>Optional in its entirety: someone who signs up straight from the header
 * has never seen that screen, and must not be refused for it.</p>
 *
 * <p><strong>This is user input, not trusted data.</strong> It arrives from
 * the browser's session storage, which anybody can edit from a console. Every
 * bound is therefore declared here and enforced again in the service: a
 * request asking for three hundred classes of nine thousand pupils each would
 * otherwise be honoured without a word.</p>
 */
public class SignupOperationsRequest {

    /** Un établissement qui déclarerait cinquante cycles s'est trompé. */
    @Size(max = 10)
    @Valid
    private List<CycleSpec> cycles = new ArrayList<>();

    @Min(0)
    @Max(20)
    private int classesPerLevel = 1;

    @Min(1)
    @Max(200)
    private int classCapacity = 35;

    @Size(max = 40)
    @Valid
    private List<SubjectSpec> subjects = new ArrayList<>();

    @Valid
    private FeesSpec fees;

    /** Un cycle et les niveaux qu'il contient. */
    public static class CycleSpec {

        @Size(max = 40)
        private String code;

        @Size(max = 120)
        private String name;

        /** Les noms de niveaux, dans l'ordre où l'école les a saisis. */
        @Size(max = 20)
        private List<String> levels = new ArrayList<>();

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<String> getLevels() {
            return levels;
        }

        public void setLevels(List<String> levels) {
            this.levels = levels;
        }
    }

    /** Une matière et son coefficient. */
    public static class SubjectSpec {

        @Size(max = 40)
        private String code;

        @Size(max = 120)
        private String name;

        /** Un coefficient nul rendrait la matière invisible dans la moyenne. */
        @Min(1)
        @Max(20)
        private int coefficient = 1;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getCoefficient() {
            return coefficient;
        }

        public void setCoefficient(int coefficient) {
            this.coefficient = coefficient;
        }
    }

    /**
     * Les frais annoncés.
     *
     * <p>En unités entières de la devise : le franc CFA n'a pas de centimes,
     * et une école qui saisit « 450000 » veut dire 450 000 F.</p>
     */
    public static class FeesSpec {

        @Min(0)
        private long registration;

        @Min(0)
        private long tuitionTotal;

        /** Trois tranches est l'usage ; au-delà de douze on facture au mois. */
        @Min(1)
        @Max(12)
        private int instalments = 3;

        @Size(max = 3)
        private String currency = "XOF";

        public long getRegistration() {
            return registration;
        }

        public void setRegistration(long registration) {
            this.registration = registration;
        }

        public long getTuitionTotal() {
            return tuitionTotal;
        }

        public void setTuitionTotal(long tuitionTotal) {
            this.tuitionTotal = tuitionTotal;
        }

        public int getInstalments() {
            return instalments;
        }

        public void setInstalments(int instalments) {
            this.instalments = instalments;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }
    }

    public List<CycleSpec> getCycles() {
        return cycles;
    }

    public void setCycles(List<CycleSpec> cycles) {
        this.cycles = cycles;
    }

    public int getClassesPerLevel() {
        return classesPerLevel;
    }

    public void setClassesPerLevel(int classesPerLevel) {
        this.classesPerLevel = classesPerLevel;
    }

    public int getClassCapacity() {
        return classCapacity;
    }

    public void setClassCapacity(int classCapacity) {
        this.classCapacity = classCapacity;
    }

    public List<SubjectSpec> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectSpec> subjects) {
        this.subjects = subjects;
    }

    public FeesSpec getFees() {
        return fees;
    }

    public void setFees(FeesSpec fees) {
        this.fees = fees;
    }
}
