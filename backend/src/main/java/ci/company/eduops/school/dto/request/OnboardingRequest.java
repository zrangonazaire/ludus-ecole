package ci.company.eduops.school.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

/**
 * What the setup wizard decided, sent in one go.
 *
 * <p>The wizard used to end on a {@code setTimeout} and a success message
 * announcing « 7 niveaux, 14 classes et 8 matières prêts ». Nothing was
 * created; the component did not even inject a data source. Telling a head
 * teacher their school is configured when it is not is worse than any error
 * message, because they only find out weeks later, from a screen that should
 * have had their pupils in it.</p>
 *
 * <h2>One call, one transaction</h2>
 *
 * <p>Ten separate calls from the browser would leave a school half configured
 * the day one of them fails — and nobody could tell which half. Everything
 * arrives here together and is created together, or nothing is.</p>
 *
 * <p>Class names are resolved by the wizard, which already computes them for
 * the preview ({@code classNamesFor}). Sending them rather than a naming rule
 * means the school gets exactly the names it was shown, including the ones it
 * typed itself.</p>
 */
public class OnboardingRequest {

    @NotEmpty(message = "Sélectionnez au moins un cycle.")
    @Size(max = 10)
    @Valid
    private List<CycleSetup> cycles = new ArrayList<>();

    @Size(max = 60)
    @Valid
    private List<SubjectSetup> subjects = new ArrayList<>();

    /** Un cycle retenu, et les niveaux qu'on y ouvre. */
    public static class CycleSetup {

        @NotBlank
        @Size(max = 40)
        private String code;

        @NotBlank
        @Size(max = 120)
        private String name;

        @NotEmpty(message = "Un cycle sans niveau n'a rien à ouvrir.")
        @Size(max = 20)
        @Valid
        private List<LevelSetup> levels = new ArrayList<>();

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

        public List<LevelSetup> getLevels() {
            return levels;
        }

        public void setLevels(List<LevelSetup> levels) {
            this.levels = levels;
        }
    }

    /**
     * Un niveau, avec ses classes et sa scolarité.
     *
     * <p>Tout est propre au niveau : une école ne facture pas le CP1 comme la
     * terminale, et la base le modélise déjà — {@code fee_schedule.level_id}
     * rattache un tarif à un seul niveau. L'assistant ne doit pas aplatir
     * cela.</p>
     */
    public static class LevelSetup {

        @NotBlank
        @Size(max = 40)
        private String code;

        @NotBlank
        @Size(max = 120)
        private String name;

        /**
         * Les noms de classes, déjà résolus par l'assistant.
         *
         * <p>Vide est accepté : ouvrir un niveau sans classe est un choix
         * légitime, on les créera à la rentrée.</p>
         */
        @Size(max = 20)
        private List<@Size(max = 120) String> classNames = new ArrayList<>();

        @Min(1)
        @Max(200)
        private int capacity = 35;

        /** En unités entières : le franc CFA n'a pas de centimes. */
        @Min(0)
        private long registrationFee;

        @Min(0)
        private long tuitionTotal;

        @Min(1)
        @Max(12)
        private int instalments = 3;

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

        public List<String> getClassNames() {
            return classNames;
        }

        public void setClassNames(List<String> classNames) {
            this.classNames = classNames;
        }

        public int getCapacity() {
            return capacity;
        }

        public void setCapacity(int capacity) {
            this.capacity = capacity;
        }

        public long getRegistrationFee() {
            return registrationFee;
        }

        public void setRegistrationFee(long registrationFee) {
            this.registrationFee = registrationFee;
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
    }

    /** Une matière retenue, avec son coefficient. */
    public static class SubjectSetup {

        @NotBlank
        @Size(max = 40)
        private String code;

        @NotBlank
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

    public List<CycleSetup> getCycles() {
        return cycles;
    }

    public void setCycles(List<CycleSetup> cycles) {
        this.cycles = cycles;
    }

    public List<SubjectSetup> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectSetup> subjects) {
        this.subjects = subjects;
    }
}
