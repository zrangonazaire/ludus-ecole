package ci.company.eduops.security.service;

import org.springframework.web.util.HtmlUtils;

/**
 * Gabarit du message de confirmation d'adresse e-mail.
 *
 * <p>Mise en page en tableaux et styles en ligne : c'est la seule construction
 * rendue de façon fiable par Outlook, Gmail et les clients mobiles. Toute
 * valeur saisie par l'utilisateur (nom, établissement) est échappée avant
 * d'entrer dans le HTML.</p>
 */
final class EmailVerificationMail {

    private static final String BRAND = "#1d4ed8";

    private EmailVerificationMail() {
    }

    static String subject() {
        return "Confirmez votre adresse e-mail - Soocloo";
    }

    static String html(String firstName, String schoolName, String link, int validHours) {
        String name = HtmlUtils.htmlEscape(firstName);
        String school = HtmlUtils.htmlEscape(schoolName);
        String href = HtmlUtils.htmlEscape(link);
        return """
                <!DOCTYPE html>
                <html lang="fr">
                <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
                <body style="margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;color:#111827;">
                <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
                <tr><td align="center">
                  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%%;background:#ffffff;border-radius:12px;overflow:hidden;">
                    <tr><td style="background:%1$s;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:700;">Soocloo</td></tr>
                    <tr><td style="padding:32px;">
                      <h1 style="margin:0 0 16px;font-size:20px;">Bonjour %2$s,</h1>
                      <p style="margin:0 0 16px;line-height:1.6;">L'établissement <strong>%3$s</strong> vient d'être créé sur Soocloo, et vous en êtes l'administrateur.</p>
                      <p style="margin:0 0 24px;line-height:1.6;">Pour activer votre compte et sécuriser l'accès, confirmez que cette adresse e-mail est bien la vôtre :</p>
                      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;"><tr>
                        <td style="background:%1$s;border-radius:8px;"><a href="%4$s" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-weight:600;">Confirmer mon adresse e-mail</a></td>
                      </tr></table>
                      <p style="margin:0 0 8px;font-size:13px;color:#4b5563;line-height:1.5;">Ce lien est personnel, valable %5$d heures et utilisable une seule fois.</p>
                      <p style="margin:0 0 8px;font-size:13px;color:#4b5563;line-height:1.5;">Le bouton ne fonctionne pas ? Copiez cette adresse dans votre navigateur :<br><span style="word-break:break-all;color:%1$s;">%4$s</span></p>
                      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
                      <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message : aucun compte ne sera activé. Soocloo ne vous demandera jamais votre mot de passe par e-mail.</p>
                    </td></tr>
                  </table>
                  <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">&copy; Soocloo - message automatique, merci de ne pas y répondre.</p>
                </td></tr>
                </table>
                </body>
                </html>
                """.formatted(BRAND, name, school, href, validHours);
    }

    static String text(String firstName, String schoolName, String link, int validHours) {
        return """
                Bonjour %s,

                L'établissement "%s" vient d'être créé sur Soocloo, et vous en êtes l'administrateur.

                Pour activer votre compte, confirmez votre adresse e-mail en ouvrant ce lien :
                %s

                Ce lien est personnel, valable %d heures et utilisable une seule fois.

                Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : aucun compte ne sera activé.
                Soocloo ne vous demandera jamais votre mot de passe par e-mail.
                """.formatted(firstName, schoolName, link, validHours);
    }
}
