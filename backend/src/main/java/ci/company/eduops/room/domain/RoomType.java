package ci.company.eduops.room.domain;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;

import java.util.Locale;

/**
 * Types de salle reconnus par l'établissement.
 *
 * <p>La colonne {@code room_type} reste un VARCHAR : une école qui ouvre un
 * atelier de mécanique ne doit pas attendre une migration. La liste est
 * fermée côté service pour que l'emploi du temps, l'écran des salles et les
 * rapports partagent le même vocabulaire, et pour que la valeur par défaut
 * {@code CLASSROOM} — celle de la base — reste valide.</p>
 */
public enum RoomType {

    /** Salle de classe ordinaire. */
    CLASSROOM,
    /** Laboratoire de sciences (physique, chimie, biologie). */
    SCIENCE_LAB,
    /** Salle informatique. */
    COMPUTER_LAB,
    /** Bibliothèque ou centre de documentation. */
    LIBRARY,
    /** Amphithéâtre. */
    AMPHITHEATRE,
    /** Gymnase ou plateau sportif couvert. */
    SPORTS_HALL,
    /** Atelier technique. */
    WORKSHOP,
    /** Cantine ou réfectoire. */
    CAFETERIA,
    /** Bureau administratif. */
    OFFICE,
    /** Salle polyvalente, spectacle, examen. */
    OTHER;

    /**
     * Lit le code envoyé par le client.
     *
     * <p>Obligatoire : une salle sans type ne peut pas être filtrée ni
     * réservée par nature (on ne place pas un cours de chimie dans un
     * gymnase).</p>
     */
    public static RoomType parse(String raw) {
        if (raw == null || raw.isBlank()) {
            throw new BusinessException(ErrorCode.ROOM_TYPE_INVALID,
                    "Le type de salle est obligatoire.");
        }
        try {
            return valueOf(raw.trim().toUpperCase(Locale.ROOT).replace(' ', '_'));
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ErrorCode.ROOM_TYPE_INVALID,
                    "Ce type de salle n'existe pas : " + raw.trim() + ".");
        }
    }
}