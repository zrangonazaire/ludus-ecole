# Écrans d'accès et d'authentification

## 1. Landing page (page d'accueil publique)

- **Route** : `/`
- **Composant** : `features/landing/landing.component.ts`
- **État** : ✅ Implémenté
- **Permissions** : aucune (publique)

**Description** : Vitrine publique d'EduOps. Toute l'illustration est en SVG/CSS inline
(le code est volontairement léger pour charger instantanément même sur connexion lente).

**Contenu** :
- En-tête avec navigation (lien « Connexion » et « Créer mon établissement »).
- Section **héros** + statistiques clés.
- Bénéfices par rôle : **Direction**, **Enseignant**, **Parent**.
- Les **fonctionnalités** du produit (élèves & inscriptions, classes & capacités,
  emploi du temps, présence hors-ligne, paiements…).
- Les **offres tarifaires** (Etablissement / Groupe scolaire).
- Une **FAQ** interactive (accordéon) qui répond aux questions de sécurité des données,
  de changement d'année, de mode hors-ligne et de permissions.

---

## 2. Inscription d'établissement (Signup)

- **Route** : la route n'est pas dans `app.routes.ts` (composant public autonome).
- **Composant** : `features/signup/signup.component.ts`
- **État** : ✅ Implémenté (formulaire, connexion en 2 étapes)
- **Permissions** : aucune (publique)

**Description** : Permet à un établissement de se créer et à son administrateur de
créer son compte. **Assisté en deux étapes** pour ne pas noyer l'utilisateur.

**Étape 1 — L'école** (`schoolForm`) :
- Nom, **code de l'école** (vérifié **en direct** pour éviter les doublons), ville,
  pays (défaut Côte d'Ivoire), téléphone, devise (défaut XOF).

**Étape 2 — L'administrateur** (`adminForm`) :
- Prénom, nom, **email** (vérifié en direct), téléphone,
  mot de passe (avec **jauge de robustesse** : longueur, majuscule, minuscule, chiffre),
  acceptation des conditions.

**Comportement** : à la soumission, l'API renvoie une session déjà valide ;
l'utilisateur est connecté automatiquement et redirigé vers la suite du parcours.
Un toast de bienvenue confirme la création (nom de l'établissement + année scolaire).

---

## 3. Connexion (Login)

- **Route** : `/login`
- **Composant** : `features/auth/login/login.component.ts`
- **État** : ✅ Implémenté
- **Permissions** : aucune (publique)

**Description** : Écran de connexion plein écran avec un panneau de formulaire à gauche
et un encart de marque à droite.

**Contenu** :
- Champ **Identifiant ou email** et **Mot de passe** (validations requises).
- Bouton **Se connecter** avec état « Connexion… » pendant l'appel.
- Lien **Mot de passe oublié ?**.
- Affichage d'une erreur « Identifiant ou mot de passe incorrect. » en cas d'échec.
- **Mode démonstration** (actif quand les données mock sont activées) : boutons
  à un clic pour les profils **Administration**, **Enseignant**, **Parent**, **Elève**.

**Comportement** : après connexion, redirection vers `returnUrl` si présent, sinon vers
la page d'accueil du rôle (`homeRoute()`).

---

## 4. Accès refusé (Forbidden)

- **Route** : `/forbidden`
- **Composant** : `features/auth/forbidden/forbidden.component.ts`
- **État** : ✅ Implémenté
- **Permissions** : après connexion, quand l'utilisateur n'a pas le droit de voir une page.

**Description** : Écran centré « 403 — Accès refusé » avec un bouton
« Retour à l'accueil » qui renvoie vers la page d'accueil du rôle de l'utilisateur.
