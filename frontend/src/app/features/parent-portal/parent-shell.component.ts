import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent, TabItem } from '@layouts/mobile-layout/mobile-layout.component';

@Component({
  selector: 'eduops-parent-shell',
  standalone: true,
  imports: [MobileLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <eduops-mobile-layout title="Espace parent" subtitle="Soocloo" [tabs]="tabs" />
  `
})
export class ParentShellComponent {
  readonly tabs: TabItem[] = [
    { label: 'Accueil', route: '/parent/home', icon: '▤' },
    { label: 'Enfants', route: '/parent/children', icon: '◍' },
    { label: 'Scolarité', route: '/parent/academics', icon: '◉' },
    { label: 'Encaissements', route: '/parent/payments', icon: '◧' },
    { label: 'Profil', route: '/parent/profile', icon: '◌' }
  ];
}
