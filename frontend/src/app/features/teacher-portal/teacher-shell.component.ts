import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent, TabItem } from '@layouts/mobile-layout/mobile-layout.component';

@Component({
  selector: 'eduops-teacher-shell',
  standalone: true,
  imports: [MobileLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <eduops-mobile-layout title="Espace enseignant" subtitle="EduOps" [tabs]="tabs" />
  `
})
export class TeacherShellComponent {
  readonly tabs: TabItem[] = [
    { label: 'Accueil', route: '/teacher/home', icon: '▤' },
    { label: 'Classes', route: '/teacher/classes', icon: '▦' },
    { label: 'Presences', route: '/teacher/attendance', icon: '◇' },
    { label: 'Notes', route: '/teacher/grades', icon: '◉' },
    { label: 'Profil', route: '/teacher/profile', icon: '◍' }
  ];
}
