package ci.company.eduops.messaging.service;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Substitutes {@code {eleve}}, {@code {montant}} and friends into a template.
 *
 * <p>Placeholders are French words rather than {@code ${student.fullName}}
 * because a secretary writes these, not a developer. The list is deliberately
 * short: every variable is one more thing that can be empty on the day it
 * matters.</p>
 *
 * <p>An unknown placeholder is left visible, braces and all. Silently blanking
 * it would send « Votre enfant  est absent » to four hundred families before
 * anyone noticed the typo.</p>
 */
@Component
public class MessageRenderer {

    private static final Pattern PLACEHOLDER = Pattern.compile("\\{(\\w+)}");

    /** The variables offered by the screen, with what they mean. */
    public static final Map<String, String> AVAILABLE = new LinkedHashMap<>();

    static {
        AVAILABLE.put("eleve", "Nom complet de l'élève");
        AVAILABLE.put("classe", "Classe de l'élève");
        AVAILABLE.put("matricule", "Matricule de l'élève");
        AVAILABLE.put("tuteur", "Nom du parent ou tuteur destinataire");
        AVAILABLE.put("ecole", "Nom de l'établissement");
        AVAILABLE.put("montant", "Montant dû, pour une relance de scolarité");
        AVAILABLE.put("nombre", "Nombre en cause : absences, vaccins manquants…");
        AVAILABLE.put("detail", "Précision propre à la relance");
        AVAILABLE.put("date", "Date du jour");
    }

    /** Renders one message for one recipient. */
    public String render(String template, Map<String, String> variables) {
        if (template == null) {
            return "";
        }
        Matcher matcher = PLACEHOLDER.matcher(template);
        StringBuilder out = new StringBuilder();
        while (matcher.find()) {
            String key = matcher.group(1);
            String value = variables.get(key);
            // Une variable inconnue reste visible : mieux vaut un « {eleve } »
            // repere a la relecture qu'un trou silencieux dans 400 messages.
            matcher.appendReplacement(out,
                    Matcher.quoteReplacement(value != null ? value : matcher.group(0)));
        }
        matcher.appendTail(out);
        return out.toString();
    }

    /**
     * The placeholders a template uses that no variable will fill.
     *
     * <p>Shown before sending, next to the preview. This is the check that
     * catches « {eleve } » with a stray space, or « {élève } » with an accent
     * the pattern does not match.</p>
     */
    public List<String> unknownPlaceholders(String template) {
        List<String> unknown = new ArrayList<>();
        if (template == null) {
            return unknown;
        }
        Matcher matcher = PLACEHOLDER.matcher(template);
        while (matcher.find()) {
            String key = matcher.group(1);
            if (!AVAILABLE.containsKey(key) && !unknown.contains(key)) {
                unknown.add(key);
            }
        }
        return unknown;
    }
}
