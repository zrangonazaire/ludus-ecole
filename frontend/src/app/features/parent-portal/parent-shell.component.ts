import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent, TabItem } from '@layouts/mobile-layout/mobile-layout.component';

@Component({
  selector: 'eduops-parent-shell',
  standalone: true,
  imports: [MobileLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <eduops-mobile-layout title="Espace parent" subtitle="EduOps" [tabs]="tabs" />
  `
})
export class ParentShellComponent {
  readonly tabs: TabItem[] = [
    { label: 'Accueil', route: '/parent/home', icon: '▤' },
    { label: 'Enfants', route: '/parent/children', icon: '◍' },
    { label: 'Scolarite', route: '/parent/academics', icon: '◉' },
    { label: 'Paiements', route: '/parent/payments', icon: '◧' },
    { label: 'Profil', route: '/parent/profile', icon: '◌' }
  ];
}
