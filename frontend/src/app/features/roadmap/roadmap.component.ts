import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS as P } from '@core/models/auth.models';

interface GuideStep {
  id: string;
  title: string;
  prerequisite: string;
  instructions: string[];
  links: { label: string; route: string; permission: string }[];
}

@Component({
  selector: 'eduops-roadmap',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss'
})
export class RoadmapComponent {
  readonly auth = inject(AuthService);
  readonly steps: GuideStep[] = [
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
      id: 'finance', title: 'Gérer les frais et les paiements',
      prerequisite: 'Préparer les frais avant les encaissements, en parallèle de la pédagogie.',
      instructions: ['Configurez les frais et vérifiez la situation des élèves inscrits.',
        'Enregistrez les paiements et suivez les impayés selon vos droits.'],
      links: [{ label: 'Frais', route: '/finance', permission: P.FINANCE_VIEW },
        { label: 'Paiements', route: '/payments', permission: P.PAYMENT_VIEW }]
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
}
