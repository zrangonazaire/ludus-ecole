# Mailpit

Mailpit captures every outgoing email in DEV so nothing reaches real recipients.

- SMTP: `mailpit:1025` (inside the compose network) / `localhost:1025` (host)
- Web UI: http://localhost:8025

The backend never talks to Mailpit directly: it goes through the `MailService`
abstraction (`ci.company.eduops.notification.service.MailService`), configured by
profile:

| Profile | Transport            |
|---------|----------------------|
| dev     | Mailpit              |
| test    | Mailpit / test SMTP  |
| prod    | Real SMTP relay      |
