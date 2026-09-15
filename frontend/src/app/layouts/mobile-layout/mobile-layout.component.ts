import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
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
 * (section 55).
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
          <img class="soocloo-logo soocloo-logo--compact" src="assets/branding/soocloo-logo.png" alt="Soocloo" width="108" height="40">
          <div>
            <p class="portal__title">{{ title }}</p>
            <p class="portal__subtitle">{{ subtitle }}</p>
          </div>
        </div>
        <div class="portal__header-actions">
          <button type="button" class="icon-btn" aria-label="Notifications">
            <span aria-hidden="true">◔</span>
          </button>
          <eduops-avatar [name]="user()?.fullName ?? ''" size="sm" />
        </div>
      </header>

      <main class="portal__content" id="main-content" tabindex="-1">
        <router-outlet />
      </main>

      <nav class="tabbar" aria-label="Navigation">
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
}
