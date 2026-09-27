import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS as P } from '@core/models/auth.models';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.route;
function RoadmapComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵtext(1, "V\u00E9rifier ma configuration");
    i0.ɵɵelementEnd();
} }
function RoadmapComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵtext(1, "Se connecter pour appliquer ce guide");
    i0.ɵɵelementEnd();
} }
function RoadmapComponent_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 9)(1, "span", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const ɵ$index_29_r2 = ctx.$index;
    i0.ɵɵproperty("fragment", step_r1.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_29_r2 + 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", step_r1.title, " ");
} }
function RoadmapComponent_For_18_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const instruction_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(instruction_r3);
} }
function RoadmapComponent_For_18_For_15_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", link_r4.route);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", link_r4.label, " \u2192");
} }
function RoadmapComponent_For_18_For_15_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", link_r4.label, " \u2014 acc\u00E8s selon votre profil");
} }
function RoadmapComponent_For_18_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoadmapComponent_For_18_For_15_Conditional_0_Template, 2, 2, "a", 17)(1, RoadmapComponent_For_18_For_15_Conditional_1_Template, 2, 1, "span", 18);
} if (rf & 2) {
    const link_r4 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r4.auth.has(link_r4.permission) ? 0 : 1);
} }
function RoadmapComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 11)(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "section")(4, "h2", 14);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 15)(7, "strong");
    i0.ɵɵtext(8, "Avant de commencer :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ul");
    i0.ɵɵrepeaterCreate(11, RoadmapComponent_For_18_For_12_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 16);
    i0.ɵɵrepeaterCreate(14, RoadmapComponent_For_18_For_15_Template, 2, 1, null, null, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const step_r6 = ctx.$implicit;
    const ɵ$index_38_r7 = ctx.$index;
    i0.ɵɵproperty("id", step_r6.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_38_r7 + 1);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-labelledby", step_r6.id + "-title");
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", step_r6.id + "-title");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(step_r6.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", step_r6.prerequisite, "");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(step_r6.instructions);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(step_r6.links);
} }
export class RoadmapComponent {
    auth = inject(AuthService);
    steps = [
        {
            id: 'configuration', title: 'Préparer l’année scolaire',
            prerequisite: 'Commencer avec un compte administrateur.',
            instructions: ['Vérifiez les informations de l’établissement dans Configuration.',
                'Créez les années et leurs périodes, puis activez l’année scolaire utilisée.'],
            links: [{ label: 'Années et périodes', route: '/academic-years', permission: P.ACADEMIC_YEAR_VIEW }]
        },
        {
            id: 'structure', title: 'Créer les niveaux, salles et classes',
            prerequisite: 'L’année scolaire doit être définie.',
            instructions: ['Définissez les cycles et niveaux, puis les campus et salles.',
                'Créez les classes et renseignez leur salle habituelle si nécessaire.',
                'La classe est le groupe d’élèves ; la salle est le lieu du cours.'],
            links: [{ label: 'Niveaux', route: '/levels', permission: P.LEVEL_VIEW },
                { label: 'Campus', route: '/campus', permission: P.CAMPUS_VIEW },
                { label: 'Salles', route: '/rooms', permission: P.ROOM_VIEW },
                { label: 'Classes', route: '/classes', permission: P.CLASS_VIEW }]
        },
        {
            id: 'enseignements', title: 'Affecter les enseignants aux matières et classes',
            prerequisite: 'Les niveaux et classes doivent exister.',
            instructions: ['Renseignez les matières, le programme et les enseignants.',
                'Associez un enseignant à une matière et une classe dans Affectation des enseignants.',
                'Ces affectations alimentent « Matières à poser » dans le planning.'],
            links: [{ label: 'Matières', route: '/subjects', permission: P.SUBJECT_VIEW },
                { label: 'Enseignants', route: '/teachers', permission: P.TEACHER_VIEW },
                { label: 'Affectations', route: '/teacher-assignments', permission: P.TEACHER_MANAGE }]
        },
        {
            id: 'planning', title: 'Construire l’emploi du temps',
            prerequisite: 'Classes, matières et affectations prêtes ; salles à utiliser enregistrées.',
            instructions: ['Ouvrez « Par classe » et vérifiez la classe sélectionnée en haut.',
                'Choisissez la salle dans « Salle des cours posés », puis glissez une matière sur le jour et l’heure souhaités.',
                'Vérifiez les conflits signalés : classe, professeur ou salle déjà occupés.',
                'Déplacez un cours par glisser-déposer. Cliquez sur son nom pour voir le détail et modifier sa salle.',
                '« Annuler ce cours » retire, après confirmation, le créneau hebdomadaire, pas seulement une séance datée.',
                'Contrôlez les vues professeur et salle, puis publiez le planning.',
                'La classe est obligatoire dès la création. Pour changer de classe, annulez puis reprogrammez dans la bonne classe : la modification directe n’existe pas encore.'],
            links: [{ label: 'Emploi du temps', route: '/timetable', permission: P.TIMETABLE_VIEW }]
        },
        {
            id: 'eleves', title: 'Inscrire les élèves',
            prerequisite: 'Classes et année prêtes. Peut se faire en parallèle du planning.',
            instructions: ['Créez les dossiers élèves et leurs responsables légaux.',
                'Enregistrez et validez les inscriptions dans l’année et la classe concernées.'],
            links: [{ label: 'Élèves', route: '/students', permission: P.STUDENT_VIEW },
                { label: 'Inscriptions', route: '/enrollments', permission: P.ENROLLMENT_VIEW }]
        },
        {
            id: 'suivi', title: 'Suivre les présences et les résultats',
            prerequisite: 'Élèves inscrits, cours et affectations prêts.',
            instructions: ['Faites l’appel et suivez les absences.',
                'Préparez les évaluations, saisissez les notes et contrôlez les bulletins avant publication.'],
            links: [{ label: 'Présences', route: '/attendance', permission: P.ATTENDANCE_VIEW },
                { label: 'Évaluations', route: '/assessments', permission: P.ASSESSMENT_VIEW },
                { label: 'Bulletins', route: '/report-cards', permission: P.REPORT_CARD_VIEW }]
        },
        {
            id: 'finance', title: 'Gérer le plan de facturation et les paiements',
            prerequisite: 'Préparer les frais avant les encaissements, en parallèle de la pédagogie.',
            instructions: ['Configurez les frais et vérifiez la situation des élèves inscrits.',
                'Enregistrez les paiements et suivez les impayés selon vos droits.'],
            links: [{ label: 'Frais', route: '/finance', permission: P.FINANCE_VIEW },
                { label: 'Encaissements', route: '/payments', permission: P.PAYMENT_VIEW }]
        },
        {
            id: 'pilotage', title: 'Contrôler et préparer la suite',
            prerequisite: 'Des données ont été enregistrées pendant l’année.',
            instructions: ['Consultez le tableau de bord et les rapports.',
                'Préparez la nouvelle année et les réinscriptions en fin de cycle scolaire.'],
            links: [{ label: 'Tableau de bord', route: '/dashboard', permission: P.DASHBOARD_VIEW },
                { label: 'Rapports', route: '/reports', permission: P.REPORT_VIEW },
                { label: 'Réinscriptions', route: '/promotions', permission: P.ENROLLMENT_CREATE }]
        }
    ];
    static ɵfac = function RoadmapComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RoadmapComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RoadmapComponent, selectors: [["eduops-roadmap"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 19, vars: 1, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], ["routerLink", "/", 1, "btn", "btn--ghost"], ["routerLink", "/setup", 1, "btn", "btn--ghost"], ["routerLink", "/login", 1, "btn", "btn--ghost"], [1, "guide-note"], ["aria-label", "\u00C9tapes du guide", 1, "overview"], ["routerLink", "/roadmap", 3, "fragment"], [1, "roadmap"], [1, "step", 3, "id"], ["aria-hidden", "true", 1, "marker"], ["aria-hidden", "true", 1, "marker", "step__marker"], [3, "id"], [1, "prerequisite"], [1, "step__links"], [1, "btn", "btn--ghost", "btn--sm", 3, "routerLink"], [1, "restricted"]], template: function RoadmapComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Roadmap \u2014 Guide d\u2019utilisation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Les \u00E9tapes \u00E0 suivre, de la pr\u00E9paration de l\u2019ann\u00E9e au suivi quotidien.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "a", 4);
            i0.ɵɵtext(8, "\u2190 Retour \u00E0 l\u2019accueil");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, RoadmapComponent_Conditional_9_Template, 2, 0, "a", 5)(10, RoadmapComponent_Conditional_10_Template, 2, 0, "a", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "p", 7);
            i0.ɵɵtext(12, "Ce guide indique l\u2019ordre conseill\u00E9, pas votre progression r\u00E9elle. Les inscriptions et la pr\u00E9paration des frais peuvent avancer en parall\u00E8le du planning. Les liens vers les \u00E9crans sont propos\u00E9s selon vos droits ; les modifications n\u00E9cessitent les droits de gestion.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "nav", 8);
            i0.ɵɵrepeaterCreate(14, RoadmapComponent_For_15_Template, 4, 3, "a", 9, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "ol", 10);
            i0.ɵɵrepeaterCreate(17, RoadmapComponent_For_18_Template, 16, 6, "li", 11, _forTrack0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.auth.isAuthenticated() ? 9 : 10);
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.steps);
        } }, dependencies: [RouterLink], styles: [".guide-note[_ngcontent-%COMP%] { color: var(--text-muted); line-height: 1.6; }\n.overview[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: var(--space-3);\n  margin: var(--space-5) 0;\n  a {\n    display: flex; align-items: center; gap: var(--space-3);\n    padding: var(--space-3); color: var(--text-strong);\n    background: var(--surface-card); border: 1px solid var(--border);\n    border-radius: var(--radius-card); text-decoration: none;\n    &:hover { border-color: var(--brand); }\n  }\n}\n.marker[_ngcontent-%COMP%] {\n  display: grid; place-items: center; flex-shrink: 0;\n  width: 34px; height: 34px; border-radius: 50%;\n  background: var(--brand); color: white; font-weight: 700;\n}\n.roadmap[_ngcontent-%COMP%] { list-style: none; padding: 0; margin: 0; }\n.step[_ngcontent-%COMP%] {\n  position: relative; margin-left: 17px; padding: 0 0 var(--space-5) var(--space-6);\n  border-left: 2px solid var(--border); scroll-margin-top: 90px;\n  &:last-child { border-left-color: transparent; }\n  &__marker { position: absolute; left: -18px; top: var(--space-4); }\n  section {\n    padding: var(--space-5); background: var(--surface-card);\n    border: 1px solid var(--border); border-radius: var(--radius-card);\n  }\n  &:target section { border-color: var(--brand); }\n  h2 { margin: 0 0 var(--space-3); font-size: var(--text-lg); color: var(--text-strong); }\n  ul { padding-left: var(--space-5); line-height: 1.7; }\n  &__links { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }\n}\n.prerequisite[_ngcontent-%COMP%], .restricted[_ngcontent-%COMP%] { color: var(--text-muted); font-size: var(--text-sm); }\na[_ngcontent-%COMP%]:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }\n@media (max-width: 600px) {\n  .overview[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .step[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] { padding: var(--space-3); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RoadmapComponent, [{
        type: Component,
        args: [{ selector: 'eduops-roadmap', standalone: true, imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Roadmap \u2014 Guide d\u2019utilisation</h1>\n      <p class=\"page__meta\">Les \u00E9tapes \u00E0 suivre, de la pr\u00E9paration de l\u2019ann\u00E9e au suivi quotidien.</p>\n      <a class=\"btn btn--ghost\" routerLink=\"/\">\u2190 Retour \u00E0 l\u2019accueil</a>\n    </div>\n    @if (auth.isAuthenticated()) {\n      <a class=\"btn btn--ghost\" routerLink=\"/setup\">V\u00E9rifier ma configuration</a>\n    } @else {\n      <a class=\"btn btn--ghost\" routerLink=\"/login\">Se connecter pour appliquer ce guide</a>\n    }\n  </header>\n\n  <p class=\"guide-note\">Ce guide indique l\u2019ordre conseill\u00E9, pas votre progression r\u00E9elle.\n    Les inscriptions et la pr\u00E9paration des frais peuvent avancer en parall\u00E8le du planning.\n    Les liens vers les \u00E9crans sont propos\u00E9s selon vos droits ; les modifications n\u00E9cessitent les droits de gestion.</p>\n\n  <nav aria-label=\"\u00C9tapes du guide\" class=\"overview\">\n    @for (step of steps; track step.id; let i = $index) {\n      <a routerLink=\"/roadmap\" [fragment]=\"step.id\">\n        <span class=\"marker\" aria-hidden=\"true\">{{ i + 1 }}</span>{{ step.title }}\n      </a>\n    }\n  </nav>\n\n  <ol class=\"roadmap\">\n    @for (step of steps; track step.id; let i = $index) {\n      <li class=\"step\" [id]=\"step.id\">\n        <span class=\"marker step__marker\" aria-hidden=\"true\">{{ i + 1 }}</span>\n        <section [attr.aria-labelledby]=\"step.id + '-title'\">\n          <h2 [id]=\"step.id + '-title'\">{{ step.title }}</h2>\n          <p class=\"prerequisite\"><strong>Avant de commencer :</strong> {{ step.prerequisite }}</p>\n          <ul>\n            @for (instruction of step.instructions; track instruction) {\n              <li>{{ instruction }}</li>\n            }\n          </ul>\n          <div class=\"step__links\">\n            @for (link of step.links; track link.route) {\n              @if (auth.has(link.permission)) {\n                <a class=\"btn btn--ghost btn--sm\" [routerLink]=\"link.route\">{{ link.label }} \u2192</a>\n              } @else {\n                <span class=\"restricted\">{{ link.label }} \u2014 acc\u00E8s selon votre profil</span>\n              }\n            }\n          </div>\n        </section>\n      </li>\n    }\n  </ol>\n</div>\n", styles: [".guide-note { color: var(--text-muted); line-height: 1.6; }\n.overview {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: var(--space-3);\n  margin: var(--space-5) 0;\n  a {\n    display: flex; align-items: center; gap: var(--space-3);\n    padding: var(--space-3); color: var(--text-strong);\n    background: var(--surface-card); border: 1px solid var(--border);\n    border-radius: var(--radius-card); text-decoration: none;\n    &:hover { border-color: var(--brand); }\n  }\n}\n.marker {\n  display: grid; place-items: center; flex-shrink: 0;\n  width: 34px; height: 34px; border-radius: 50%;\n  background: var(--brand); color: white; font-weight: 700;\n}\n.roadmap { list-style: none; padding: 0; margin: 0; }\n.step {\n  position: relative; margin-left: 17px; padding: 0 0 var(--space-5) var(--space-6);\n  border-left: 2px solid var(--border); scroll-margin-top: 90px;\n  &:last-child { border-left-color: transparent; }\n  &__marker { position: absolute; left: -18px; top: var(--space-4); }\n  section {\n    padding: var(--space-5); background: var(--surface-card);\n    border: 1px solid var(--border); border-radius: var(--radius-card);\n  }\n  &:target section { border-color: var(--brand); }\n  h2 { margin: 0 0 var(--space-3); font-size: var(--text-lg); color: var(--text-strong); }\n  ul { padding-left: var(--space-5); line-height: 1.7; }\n  &__links { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }\n}\n.prerequisite, .restricted { color: var(--text-muted); font-size: var(--text-sm); }\na:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }\n@media (max-width: 600px) {\n  .overview { grid-template-columns: 1fr; }\n  .step section { padding: var(--space-3); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RoadmapComponent, { className: "RoadmapComponent", filePath: "frontend/src/app/features/roadmap/roadmap.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=roadmap.component.js.map