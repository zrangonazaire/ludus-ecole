import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import type { DemoPriority } from '@core/models/demo-setup.models';
import { DemoSetupStore } from '@core/services/demo-setup.store';
import { environment } from '@env/environment';

interface SchoolPreview {
  id: 'primary' | 'secondary' | 'group';
  shortLabel: string;
  label: string;
  context: string;
  students: string;
  attendance: string;
  collection: string;
  cycles: string[];
  focus: string;
  alert: string;
}

interface Challenge {
  index: string;
  priority: DemoPriority;
  title: string;
  text: string;
  result: string;
}

interface RuleGroup {
  label: string;
  value: string;
  detail: string;
  tone: 'blue' | 'green' | 'gold' | 'purple';
}

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'eduops-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private readonly auth = inject(AuthService);
  private readonly demoSetup = inject(DemoSetupStore);

  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly menuOpen = signal(false);
  readonly activePreviewId = signal<SchoolPreview['id']>(this.demoSetup.draft().profile.preset);
  readonly selectedChallenge = signal<string | null>(null);
  readonly currentYear = new Date().getFullYear();

  readonly previews: SchoolPreview[] = [
    {
      id: 'primary', shortLabel: 'Primaire', label: 'Maternelle & primaire',
      context: '1 campus · 12 classes', students: '486', attendance: '94 %', collection: '82 %',
      cycles: ['Préscolaire', 'Primaire'], focus: 'Inscriptions & familles',
      alert: '8 dossiers à compléter'
    },
    {
      id: 'secondary', shortLabel: 'Secondaire', label: 'Collège & lycée',
      context: '2 cycles · 24 classes', students: '1 140', attendance: '91 %', collection: '76 %',
      cycles: ['Collège', 'Lycée'], focus: 'Notes & emplois du temps',
      alert: '3 conflits évités'
    },
    {
      id: 'group', shortLabel: 'Groupe', label: 'Groupe multi-campus',
      context: '3 campus · vue consolidée', students: '2 860', attendance: '93 %', collection: '88 %',
      cycles: ['Tous cycles', 'Multi-campus'], focus: 'Pilotage consolidé',
      alert: '2 campus à comparer'
    }
  ];

  readonly challenges: Challenge[] = [
    {
      index: '01', priority: 'organize', title: 'Réussir la rentrée sans fichiers dispersés',
      text: 'Dossiers, responsables, pièces et affectations suivent un même parcours contrôlé.',
      result: 'Une inscription lisible de bout en bout'
    },
    {
      index: '02', priority: 'collect', title: 'Recouvrer sans abîmer la relation parent',
      text: 'Échéanciers, reçus et relances partent du vrai solde de chaque famille.',
      result: 'Chacun sait ce qui est payé et attendu'
    },
    {
      index: '03', priority: 'organize', title: 'Publier des bulletins fiables',
      text: 'Barèmes, coefficients et règles d’arrondi sont définis par votre établissement.',
      result: 'Les calculs restent cohérents toute l’année'
    },
    {
      index: '04', priority: 'engage', title: 'Rapprocher l’école et les familles',
      text: 'Présences, informations et documents utiles deviennent accessibles sans déplacement.',
      result: 'Moins d’attente, plus de visibilité'
    }
  ];

  readonly ruleGroups: RuleGroup[] = [
    { label: 'Pédagogie', value: 'Trimestres · note /20', detail: 'Coefficients par niveau', tone: 'blue' },
    { label: 'Admissions', value: '40 places / classe', detail: 'Dérogation avec motif', tone: 'green' },
    { label: 'Finance', value: '3 échéances · XOF', detail: 'Espèces, virement, mobile money', tone: 'gold' },
    { label: 'Identité', value: 'GSH-2026-0001', detail: 'Vos formats de matricule et reçu', tone: 'purple' }
  ];

  readonly faq = signal<FaqItem[]>([
    {
      question: 'Puis-je essayer Soocloo sans importer mes vrais élèves ?',
      answer: 'Oui. Le parcours crée une école témoin avec une configuration fictive. Vous explorez les écrans et les rôles sans exposer les données de votre établissement.',
      open: true
    },
    {
      question: 'La plateforme convient-elle à mon organisation scolaire ?',
      answer: 'Le configurateur adapte les cycles, les périodes, le barème, les capacités, les frais, les moyens de paiement et les modules. Ces règles restent modifiables après la prise en main.',
      open: false
    },
    {
      question: 'Mes données sont-elles séparées de celles des autres écoles ?',
      answer: 'Oui. L’isolation est appliquée jusque dans la base de données : chaque établissement reste confiné à son propre périmètre, indépendamment des contrôles de l’interface.',
      open: false
    },
    {
      question: 'Que se passe-t-il si la connexion est instable ?',
      answer: 'Les parcours sont pensés pour rester légers. Les actions sensibles, notamment financières, attendent toujours la confirmation du serveur afin d’éviter une fausse validation.',
      open: false
    }
  ]);

  activePreview(): SchoolPreview {
    return this.previews.find((preview) => preview.id === this.activePreviewId()) ?? this.previews[0];
  }

  selectPreview(id: SchoolPreview['id']): void {
    this.activePreviewId.set(id);
  }

  chooseChallenge(challenge: Challenge): void {
    this.selectedChallenge.set(challenge.index);
    const current = this.demoSetup.draft().priorities;
    this.demoSetup.updatePriorities({ ...current, mainPriority: challenge.priority });
  }

  prepareDemo(): void {
    const profile = this.demoSetup.draft().profile;
    this.demoSetup.updateProfile({ ...profile, preset: this.activePreviewId() });
  }

  toggleFaq(index: number): void {
    this.faq.update((items) => items.map((item, current) =>
      current === index ? { ...item, open: !item.open } : item));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(id: string): void {
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ─────────────────────────────────────────────────────────── tarif

  /** Tarif d'entrée, lu depuis la configuration : une seule source. */
  readonly pricing = environment.pricing;

  /** Montant formaté à la française : 25 000, pas 25000 ni 25,000. */
  get startingPrice(): string {
    return new Intl.NumberFormat('fr-FR').format(this.pricing.startingFrom);
  }

  /**
   * Le franc CFA s'écrit « FCFA » pour le public ivoirien.
   *
   * <p>Le code ISO XOF est juste, mais il ne se lit pas : sur une page d'accueil
   * on affiche ce que les gens reconnaissent, et on garde le code pour les
   * documents comptables.</p>
   */
  get currencyLabel(): string {
    return environment.currency === 'XOF' ? 'FCFA' : environment.currency;
  }
}
