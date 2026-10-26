import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ROLES } from '@core/models/auth.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';

export interface TabItem {
  label: string;
  route: string;
  icon: string;
}

/**
 * Shared mobile-first shell for the teacher, parent and student portals
 * (sections 29, 45, 47).
 *
 * Header + content + bottom tab bar, not a compressed desktop layout
 * (section 55). Includes a direct return link to the Administration workspace
 * when previewed by a school administrator.
 */
@Component({
  selector: 'eduops-mobile-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="portal">
      <header class="portal__header">
        <div class="portal__identity">
          <a routerLink="/dashboard" class="portal__brand-link" aria-label="Accueil Soocloo">
            <img class="soocloo-logo soocloo-logo--compact" src="assets/branding/soocloo-logo.png" alt="Soocloo" width="108" height="40">
          </a>
          <div>
            <p class="portal__title">{{ title }}</p>
            <p class="portal__subtitle">{{ subtitle }}</p>
          </div>
        </div>
        <div class="portal__header-actions">
          @if (isAdmin()) {
            <a class="portal__back-admin" routerLink="/dashboard">
              <span aria-hidden="true">←</span> Administration
            </a>
          }
          <a class="icon-btn" routerLink="/notifications" aria-label="Messages et notifications" title="Messages">
            <span aria-hidden="true">🔔</span>
          </a>
          <eduops-avatar [name]="user()?.fullName ?? ''" size="sm" />
          <button type="button" class="portal__logout" (click)="logout()">Déconnexion</button>
        </div>
      </header>

      <main class="portal__content" id="main-content" tabindex="-1">
        <router-outlet />
      </main>

      <nav class="tabbar" aria-label="Navigation du portail">
        @for (tab of tabs; track tab.route) {
          <a class="tabbar__item" [routerLink]="tab.route" routerLinkActive="tabbar__item--active">
            <span class="tabbar__icon" aria-hidden="true">{{ tab.icon }}</span>
            <span class="tabbar__label">{{ tab.label }}</span>
          </a>
        }
      </nav>
    </div>
  `,
  styleUrl: './mobile-layout.component.scss'
})
export class MobileLayoutComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
  @Input({ required: true }) tabs: TabItem[] = [];

  private readonly auth = inject(AuthService);
  readonly user = this.auth.currentUser;
  readonly isAdmin = computed(() =>
    this.auth.hasRole(ROLES.SCHOOL_ADMIN) || this.auth.hasRole(ROLES.SUPER_ADMIN)
  );

  logout(): void {
    this.auth.logout();
  }
}
