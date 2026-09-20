import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { GuidedTourService } from '@core/services/guided-tour.service';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

interface PageHelpCopy {
  readonly stepKey: string;
  readonly title: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly ctaLabel?: string;
}

interface PageHelpRule {
  readonly matches: (path: string) => boolean;
  readonly copy: PageHelpCopy;
}

interface RouteState {
  readonly path: string;
  readonly title: string;
}

const exact = (expected: string) => (path: string): boolean => path === expected;

/**
 * Copy for the screens where a generic explanation would not be useful enough.
 * Screens with several tabs keep their own in-component coachmark so the help
 * can change with the selected workflow.
 */
const PAGE_HELP_RULES: readonly PageHelpRule[] = [
  {
    matches: exact('/dashboard'),
    copy: {
      stepKey: 'dashboard',
      title: 'Lire le tableau de bord en un coup d’œil',
      description: 'Commencez par les éléments qui demandent une action, puis utilisez les indicateurs pour suivre la journée.',
      points: [
        'La configuration vous conduit directement à la prochaine étape utile.',
        'Les indicateurs résument les effectifs, les présences et les encaissements.',
        'Les alertes mettent en avant ce qui mérite votre attention.'
      ],
      ctaLabel: 'Découvrir le tableau de bord'
    }
  },
  {
    matches: exact('/setup'),
    copy: {
      stepKey: 'setup-status',
      title: 'Terminer la configuration sans se perdre',
      description: 'Cette page transforme la mise en place de l’établissement en une liste d’actions courtes et vérifiables.',
      points: [
        'Chaque étape est validée à partir des données réellement enregistrées.',
        'Le bouton principal ouvre toujours la prochaine action incomplète.',
        'Vous pouvez quitter puis reprendre plus tard sans recommencer.'
      ],
      ctaLabel: 'Voir les étapes'
    }
  },
  {
    matches: (path) => /^\/students\/[^/]+$/.test(path),
    copy: {
      stepKey: 'student-detail',
      title: 'Consulter le dossier complet de l’élève',
      description: 'Retrouvez ici l’identité, la scolarité et les informations de suivi sans revenir à la liste.',
      points: [
        'Les onglets regroupent les informations par usage.',
        'Les actions disponibles respectent vos autorisations.',
        'Revenez à la liste pour poursuivre votre recherche.'
      ]
    }
  },
  {
    matches: exact('/students'),
    copy: {
      stepKey: 'students',
      title: 'Retrouver rapidement un élève',
      description: 'Recherchez par nom ou matricule, affinez la liste, puis ouvrez le dossier qui vous intéresse.',
      points: [
        'Les filtres réduisent la liste sans modifier les dossiers.',
        'Un clic sur une ligne ouvre la fiche détaillée.',
        'Le compteur et la pagination portent sur le résultat filtré.'
      ]
    }
  },
  {
    matches: exact('/enrollments/new'),
    copy: {
      stepKey: 'enrollment-new',
      title: 'Inscrire un élève étape par étape',
      description: 'Le formulaire vous guide de l’identité de l’élève jusqu’à la validation de son inscription.',
      points: [
        'Les champs obligatoires sont signalés avant de poursuivre.',
        'Vous pouvez revenir à l’étape précédente sans perdre la saisie.',
        'Le récapitulatif permet une dernière vérification avant validation.'
      ],
      ctaLabel: 'Commencer l’inscription'
    }
  },
  {
    matches: exact('/enrollments'),
    copy: {
      stepKey: 'enrollments',
      title: 'Suivre les inscriptions',
      description: 'Consultez les dossiers enregistrés, leur classe et leur statut pour repérer immédiatement ceux à compléter.',
      points: [
        'La recherche retrouve un élève ou un dossier.',
        'Les statuts distinguent les inscriptions actives des dossiers en attente.',
        'Nouvelle inscription ouvre le parcours guidé de saisie.'
      ]
    }
  },
  {
    matches: exact('/classes'),
    copy: {
      stepKey: 'classes',
      title: 'Organiser les classes',
      description: 'Visualisez les capacités, les niveaux et les effectifs afin de répartir les élèves avec cohérence.',
      points: [
        'Les compteurs permettent de repérer une classe proche de sa capacité.',
        'Les filtres isolent rapidement un niveau ou une année.',
        'Ouvrez une classe pour consulter sa composition.'
      ]
    }
  },
  {
    matches: exact('/teachers'),
    copy: {
      stepKey: 'teachers',
      title: 'Gérer l’équipe enseignante',
      description: 'Retrouvez les enseignants, leurs coordonnées et leurs affectations depuis une liste unique.',
      points: [
        'La recherche accepte le nom et les coordonnées.',
        'Les affectations indiquent les classes et matières concernées.',
        'Les actions proposées dépendent de vos permissions.'
      ]
    }
  },
  {
    matches: exact('/subjects'),
    copy: {
      stepKey: 'subjects',
      title: 'Structurer les matières et le programme',
      description: 'Définissez les enseignements, leurs coefficients et les niveaux auxquels ils s’appliquent.',
      points: [
        'Utilisez les filtres pour travailler sur un niveau précis.',
        'Vérifiez les coefficients avant la création des évaluations.',
        'Les modifications alimentent ensuite les emplois du temps et les notes.'
      ]
    }
  },
  {
    matches: exact('/timetable'),
    copy: {
      stepKey: 'timetable',
      title: 'Construire et vérifier l’emploi du temps',
      description: 'Choisissez une classe, une période ou un enseignant pour visualiser les cours et éviter les conflits.',
      points: [
        'Les filtres changent la vue sans supprimer de séance.',
        'Les créneaux rendent visibles la matière, la salle et l’enseignant.',
        'Contrôlez les chevauchements avant de publier.'
      ]
    }
  },
  {
    matches: exact('/finance'),
    copy: {
      stepKey: 'finance',
      title: 'Configurer les frais de scolarité',
      description: 'Définissez les montants et échéances qui serviront au suivi financier de chaque élève.',
      points: [
        'Les barèmes peuvent varier selon le niveau.',
        'Les échéances déterminent ce qui est à venir ou en retard.',
        'Vérifiez les montants avant de les appliquer aux inscriptions.'
      ]
    }
  },
  {
    matches: exact('/payments'),
    copy: {
      stepKey: 'payments',
      title: 'Encaisser et retrouver un paiement',
      description: 'Consultez l’historique ou ouvrez Encaisser un paiement pour enregistrer un règlement et produire son reçu.',
      points: [
        'Sélectionnez d’abord l’élève concerné par le règlement.',
        'Le montant reçu est réparti sur les échéances encore ouvertes.',
        'Le reçu reste disponible dans l’historique après validation.'
      ],
      ctaLabel: 'Gérer les encaissements'
    }
  },
  {
    matches: exact('/outstanding'),
    copy: {
      stepKey: 'outstanding',
      title: 'Prioriser le recouvrement des impayés',
      description: 'Cette vue rassemble les soldes dus et fait remonter les retards les plus anciens pour orienter les relances.',
      points: [
        'Les indicateurs résument le total dû et les retards critiques.',
        'Les filtres isolent les échéances en retard ou à venir.',
        'Encaisser ouvre le paiement avec l’élève déjà sélectionné.'
      ],
      ctaLabel: 'Consulter les impayés'
    }
  },
  {
    matches: exact('/reports'),
    copy: {
      stepKey: 'reports',
      title: 'Produire un rapport exploitable',
      description: 'Choisissez le rapport, sa période et ses filtres avant de lancer l’aperçu ou l’export.',
      points: [
        'Les paramètres affichés dépendent du rapport choisi.',
        'L’aperçu permet de contrôler le périmètre avant export.',
        'Les chiffres respectent les filtres et l’année scolaire active.'
      ]
    }
  },
  {
    matches: exact('/alerts'),
    copy: {
      stepKey: 'alerts',
      title: 'Traiter les alertes par priorité',
      description: 'Commencez par les alertes les plus urgentes, ouvrez leur contexte, puis marquez celles qui sont résolues.',
      points: [
        'Les niveaux de gravité facilitent la priorisation.',
        'Les filtres séparent les alertes actives des éléments déjà traités.',
        'Chaque action conserve le contexte utile au suivi.'
      ]
    }
  },
  {
    matches: exact('/student-files'),
    copy: {
      stepKey: 'student-files',
      title: 'Éditer les documents officiels',
      description: 'Sélectionnez un élève et un type de document, vérifiez les informations, puis générez la version officielle.',
      points: [
        'La recherche permet de retrouver rapidement le bon dossier.',
        'L’aperçu évite une édition avec des informations incomplètes.',
        'L’historique conserve les générations et réimpressions.'
      ]
    }
  },
  {
    matches: exact('/requests'),
    copy: {
      stepKey: 'family-requests',
      title: 'Suivre les demandes des familles',
      description: 'Centralisez les demandes reçues, identifiez celles en attente et faites avancer leur traitement.',
      points: [
        'Les statuts distinguent les nouvelles demandes des dossiers terminés.',
        'Les filtres aident à répartir le travail par type ou priorité.',
        'Ouvrez une demande pour consulter son contexte et agir.'
      ]
    }
  },
  {
    matches: exact('/onboarding'),
    copy: {
      stepKey: 'onboarding',
      title: 'Configurer l’établissement sereinement',
      description: 'Le parcours prépare les niveaux, les classes, les matières et les frais nécessaires au démarrage.',
      points: [
        'Les valeurs proposées restent modifiables avant validation.',
        'Les actions groupées évitent de répéter la même saisie.',
        'Vous pouvez passer cette étape et la reprendre depuis Configuration.'
      ],
      ctaLabel: 'Commencer la configuration'
    }
  },
  {
    matches: exact('/teacher/home'),
    copy: {
      stepKey: 'teacher-home',
      title: 'Organiser votre journée de cours',
      description: 'Retrouvez les prochains cours, les actions à faire et les informations utiles à vos classes.',
      points: [
        'Les raccourcis ouvrent directement la présence ou la classe concernée.',
        'Les informations affichées sont limitées à vos affectations.',
        'La barre inférieure donne accès aux tâches les plus fréquentes.'
      ]
    }
  },
  {
    matches: exact('/teacher/classes'),
    copy: {
      stepKey: 'teacher-classes',
      title: 'Retrouver vos classes',
      description: 'Consultez uniquement les groupes qui vous sont affectés et ouvrez celui sur lequel vous souhaitez travailler.',
      points: [
        'Chaque carte résume l’effectif et la matière enseignée.',
        'L’accès aux élèves respecte vos affectations.',
        'Utilisez la navigation inférieure pour changer de tâche.'
      ]
    }
  },
  {
    matches: exact('/teacher/attendance'),
    copy: {
      stepKey: 'teacher-attendance',
      title: 'Faire l’appel rapidement',
      description: 'Choisissez la classe et la séance, signalez uniquement les exceptions, puis validez la feuille de présence.',
      points: [
        'Tous les élèves sont présents par défaut.',
        'Ajoutez un retard ou une absence sur la ligne concernée.',
        'Vérifiez le récapitulatif avant validation.'
      ]
    }
  },
  {
    matches: exact('/parent/home'),
    copy: {
      stepKey: 'parent-home',
      title: 'Suivre la scolarité de vos enfants',
      description: 'La page d’accueil rassemble les informations récentes et les accès aux notes, paiements et notifications.',
      points: [
        'Sélectionnez l’enfant concerné lorsque le foyer en compte plusieurs.',
        'Les alertes mettent en avant les nouveautés importantes.',
        'La barre inférieure reste accessible sur mobile.'
      ]
    }
  }
];

const OWN_HELP_PATHS = new Set([
  '/attendance', '/assessments', '/grades', '/report-cards',
  '/options', '/transfers', '/health', '/commencer'
]);

/**
 * Adds the same first-visit help behaviour as the configuration flow to every
 * authenticated screen. A route-specific rule wins; otherwise route metadata
 * supplies a concise fallback so new screens are covered from their first day.
 */
@Component({
  selector: 'eduops-page-help',
  standalone: true,
  imports: [StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (help(); as copy) {
      <eduops-step-coachmark
        flow="page-help"
        [stepKey]="copy.stepKey"
        [stepNumber]="1"
        [totalSteps]="1"
        eyebrow="Aide contextuelle"
        [title]="copy.title"
        [description]="copy.description"
        [points]="copy.points"
        [ctaLabel]="copy.ctaLabel ?? 'J’ai compris'" />
    }
  `
})
export class PageHelpComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly tour = inject(GuidedTourService);
  private readonly routeState = signal<RouteState>({ path: '/', title: '' });

  readonly help = computed<PageHelpCopy | null>(() => {
    const { path, title } = this.routeState();
    if (!this.auth.isAuthenticated() || this.tour.running() || OWN_HELP_PATHS.has(path)) {
      return null;
    }

    const rule = PAGE_HELP_RULES.find((candidate) => candidate.matches(path));
    if (rule) {
      return rule.copy;
    }

    if (!title) {
      return null;
    }

    return {
      stepKey: this.stableStepKey(path),
      title: `Bien utiliser « ${title} »`,
      description: `Cet écran rassemble les informations et les actions liées à ${title.toLocaleLowerCase('fr')}.`,
      points: [
        'Commencez par les filtres pour afficher le périmètre utile.',
        'Ouvrez un élément pour consulter son contexte avant d’agir.',
        'Les actions visibles tiennent compte de vos autorisations.'
      ]
    };
  });

  constructor() {
    this.updateRouteState(this.router.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => this.updateRouteState(event.urlAfterRedirects));
  }

  private updateRouteState(url: string): void {
    const path = (url.split(/[?#]/, 1)[0] || '/').replace(/\/$/, '') || '/';
    let route = this.activatedRoute.root;
    let title = '';
    while (route) {
      const candidate = route.snapshot.data['title'];
      if (typeof candidate === 'string' && candidate.trim()) {
        title = candidate.trim();
      }
      if (!route.firstChild) {
        break;
      }
      route = route.firstChild;
    }
    this.routeState.set({ path, title });
  }

  private stableStepKey(path: string): string {
    return path
      .replace(/^\//, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '') || 'screen';
  }
}
