# EduOps en service public : une base, plusieurs écoles

Comment les données de chaque établissement client restent séparées, et pourquoi
la garantie n'est pas seulement applicative.

---

## Le problème

EduOps est désormais un service grand public : chaque client crée son compte, et
son école. Toutes les écoles partagent une seule base PostgreSQL.

Le schéma s'y prêtait déjà — `school` est la racine du modèle, et `school_id`
figure sur `student`, `teacher`, `payment`, `subject`, etc. Mais **le code ne
filtrait nulle part dessus**. En l'état, un compte de l'école A appelant
`GET /students` recevait les élèves de toutes les écoles.

Filtrer dans chaque service aurait été insuffisant : il suffit d'un `WHERE`
oublié dans une des dizaines de requêtes pour ouvrir une fuite, et rien ne le
signalerait.

---

## La réponse : la base refuse elle-même

L'isolation est déléguée à PostgreSQL, sous l'application.

```
Requête HTTP
     │
     ▼
JwtAuthenticationFilter ──► TenantContext.setSchoolId(…)   depuis le jeton
     │
     ▼
@Transactional
     │
TenantTransactionAspect ──► SET LOCAL app.current_school_id = '…'
     │
     ▼
PostgreSQL : chaque table applique sa politique RLS
     │
     ▼
Les lignes des autres écoles n'existent tout simplement pas
```

**57 tables** sont protégées : 20 par leur propre `school_id`, 37 par
rattachement à une table parente (`grade` via `academic_year`, `receipt` via
`payment`, etc.).

```sql
CREATE POLICY tenant_isolation ON student
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));
```

`USING` filtre les lectures, `WITH CHECK` empêche d'écrire une ligne rattachée à
une autre école. Les deux sont nécessaires.

### `FORCE`, sans quoi tout cela ne sert à rien

```sql
ALTER TABLE student FORCE ROW LEVEL SECURITY;
```

Sans `FORCE`, le propriétaire de la table contourne les politiques — et ici le
propriétaire est justement le rôle applicatif. `FORCE` est ce qui rend la
garantie réelle plutôt que décorative.

### `SET LOCAL`, et non `SET`

Le paramètre est posé **par transaction**. Une connexion rendue au pool puis
attribuée à une autre requête ne transporte jamais un tenant périmé.

---

## Sécurité par défaut

`current_school_id()` renvoie `NULL` quand rien n'est défini, et
`tenant_allows()` est alors faux : **aucune donnée métier n'est lisible**. Un
appelant non identifié ne voit rien, plutôt que tout. C'est exactement ce que
vérifie le test `nothingIsVisibleWithoutATenant`.

---

## Les exceptions, et pourquoi

Trois opérations doivent légitimement s'exécuter sans tenant :

| Opération | Raison |
|---|---|
| Inscription publique | L'école n'existe pas encore au moment de la créer |
| Authentification | On ignore à quelle école appartiennent les identifiants |
| Migrations Flyway | Elles s'exécutent avant toute session applicative |

Elles passent par `TenantContext.runWithoutTenant(…)`, qui active
`app.bypass_rls` pour la transaction en cours uniquement.

**Quatorze tables restent hors RLS**, et c'est délibéré : `app_user`,
`app_role`, `refresh_token`, `school`, le journal d'audit et l'infrastructure
d'événements. L'authentification a besoin d'y accéder avant qu'un tenant ne soit
connu. Le compromis est explicite : ces tables ne contiennent aucune donnée
scolaire — ni élève, ni note, ni paiement.

---

## La preuve

`TenantIsolationIT` crée deux écoles, insère un élève dans chacune, puis
**contourne volontairement la couche service** pour interroger les tables
directement :

```java
TenantContext.setSchoolId(schoolB);
List<?> visible = entityManager
        .createNativeQuery("SELECT student_number FROM student")
        .getResultList();

assertThat(visible).containsExactly("BETA-2026-000001");
assertThat(visible).doesNotContain("ALPHA-2026-000001");
```

Si l'isolation ne tenait qu'au code applicatif, ce test échouerait. Il passe
parce que la base elle-même refuse.

---

## Parcours d'un nouveau client

```
Page d'accueil  →  /signup  →  POST /api/v1/public/signup
                                       │
                    une seule transaction :
                      • l'établissement
                      • le campus principal
                      • l'année scolaire en cours + 3 trimestres
                      • le compte SCHOOL_ADMIN
                                       │
                    jetons renvoyés directement
                                       ▼
                              /onboarding
                    cycles → classes → matières → frais
                                       ▼
                              /dashboard
```

L'assistant propose la structure d'un établissement ivoirien courant, pré-cochée
et modifiable, plutôt qu'un tableau de bord vide. Chaque étape est facultative :
les mêmes écrans existent dans l'administration.

---

## Limites connues

- **Pas de quotas.** Toutes les écoles ont accès à tous les modules. Les tarifs
  affichés sont indicatifs. Les champs nécessaires à des plans n'existent pas
  encore.
- **Pas de vérification d'email.** Le compte est actif immédiatement. À ajouter
  avant une ouverture réelle au public, sinon n'importe qui peut créer des
  écoles en masse.
- **Pas de limitation de débit sur `/signup`.** Même remarque.
- **Le formulaire d'onboarding ne persiste pas encore.** Les écrans sont
  construits et validés, mais les appels `POST /cycles`, `/levels`, `/classes`,
  `/subjects`, `/fees` restent à câbler — le point d'ancrage est marqué dans
  `finish()`.
- **Les tables hors RLS** dépendent du contrôle applicatif. C'est acceptable
  pour l'authentification, à réexaminer si des données sensibles y arrivent.
