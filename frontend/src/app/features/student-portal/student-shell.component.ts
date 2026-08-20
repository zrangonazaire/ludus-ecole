import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent, TabItem } from '@layouts/mobile-layout/mobile-layout.component';

@Component({
  selector: 'eduops-student-shell',
  standalone: true,
  imports: [MobileLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <eduops-mobile-layout title="Espace eleve" subtitle="EduOps" [tabs]="tabs" />
  `
})
export class StudentShellComponent {
  readonly tabs: TabItem[] = [
    { label: 'Accueil', route: '/student/home', icon: '▤' },
    { label: 'Emploi', route: '/student/timetable', icon: '▥' },
    { label: 'Notes', route: '/student/grades', icon: '◉' },
    { label: 'Bulletins', route: '/student/report-cards', icon: '▣' },
    { label: 'Profil', route: '/student/profile', icon: '◌' }
  ];
}
