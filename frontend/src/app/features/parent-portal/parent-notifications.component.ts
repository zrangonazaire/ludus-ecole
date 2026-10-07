import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ParentNotification {
  id: string;
  category: 'ATTENDANCE' | 'ACADEMIC' | 'FINANCE' | 'ADMIN';
  title: string;
  message: string;
  date: string;
  read: boolean;
  childName?: string;
}

@Component({
  selector: 'eduops-parent-notifications',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Notifications & Messages</h1>
        <p class="page-head__sub">Restez informé en temps réel des événements scolaires de vos enfants</p>
      </div>

      <div class="actions">
        <button class="btn btn--outline" (click)="markAllAsRead()">
          Tout marquer comme lu
        </button>
      </div>
    </header>

    <div class="filter-pills">
      <button class="pill-btn" [class.pill-btn--active]="selectedFilter() === 'ALL'" (click)="selectedFilter.set('ALL')">
        Toutes ({{ notifications().length }})
      </button>
      <button class="pill-btn" [class.pill-btn--active]="selectedFilter() === 'ATTENDANCE'" (click)="selectedFilter.set('ATTENDANCE')">
        Vie scolaire & Absences
      </button>
      <button class="pill-btn" [class.pill-btn--active]="selectedFilter() === 'ACADEMIC'" (click)="selectedFilter.set('ACADEMIC')">
        Notes & Bulletins
      </button>
      <button class="pill-btn" [class.pill-btn--active]="selectedFilter() === 'FINANCE'" (click)="selectedFilter.set('FINANCE')">
        Finances & Reçus
      </button>
      <button class="pill-btn" [class.pill-btn--active]="selectedFilter() === 'ADMIN'" (click)="selectedFilter.set('ADMIN')">
        Circulaires
      </button>
    </div>

    <div class="notif-list">
      @for (item of filteredNotifications(); track item.id) {
        <div class="notif-card card" [class.notif-card--unread]="!item.read" (click)="toggleRead(item)">
          <div class="notif-card__icon" [ngClass]="'icon--' + item.category.toLowerCase()">
            {{ getCategoryIcon(item.category) }}
          </div>

          <div class="notif-card__body">
            <div class="notif-card__meta">
              <span class="category-tag">{{ getCategoryLabel(item.category) }}</span>
              @if (item.childName) {
                <span class="child-tag">Élève : {{ item.childName }}</span>
              }
              <span class="notif-date">{{ item.date }}</span>
            </div>

            <h3 class="notif-card__title">{{ item.title }}</h3>
            <p class="notif-card__text">{{ item.message }}</p>
          </div>

          @if (!item.read) {
            <span class="unread-dot" title="Non lu"></span>
          }
        </div>
      } @empty {
        <div class="empty-box card">
          <p class="empty-box__text">Aucune notification pour le moment.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }

    .filter-pills {
      display: flex; gap: var(--space-2); margin-bottom: var(--space-6); overflow-x: auto;
    }
    .pill-btn {
      padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border-medium);
      background: var(--surface); color: var(--text-muted); font-size: var(--text-xs);
      font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s ease;
    }
    .pill-btn:hover { background: var(--surface-subtle); color: var(--text-strong); }
    .pill-btn--active { background: #1b365d; color: #fff; border-color: #1b365d; }

    .notif-list { display: flex; flex-direction: column; gap: var(--space-3); }
    .notif-card {
      display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-4);
      border: 1px solid var(--border-light); border-radius: var(--radius-card); background: var(--surface);
      cursor: pointer; position: relative; transition: all 0.2s ease;
    }
    .notif-card:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .notif-card--unread { background: #fdfefe; border-left: 4px solid #1b365d; }

    .notif-card__icon {
      width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center;
      justify-content: center; font-size: 20px; flex-shrink: 0;
    }
    .icon--attendance { background: #fef2f2; color: #dc2626; }
    .icon--academic { background: #eff6ff; color: #2563eb; }
    .icon--finance { background: #f0fdf4; color: #16a34a; }
    .icon--admin { background: #faf5ff; color: #7c3aed; }

    .notif-card__body { flex: 1; }
    .notif-card__meta { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
    .category-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); }
    .child-tag { font-size: 11px; background: var(--surface-subtle); padding: 1px 6px; border-radius: 4px; color: #1b365d; font-weight: 600; }
    .notif-date { font-size: 11px; color: var(--text-light); margin-left: auto; }

    .notif-card__title { font-size: var(--text-md); margin: 0 0 4px; font-family: var(--font-display); color: var(--text-strong); }
    .notif-card__text { font-size: var(--text-sm); margin: 0; color: var(--text-muted); line-height: 1.4; }

    .unread-dot {
      width: 10px; height: 10px; border-radius: 50%; background: #1b365d;
      position: absolute; top: var(--space-4); right: var(--space-4);
    }

    .btn {
      padding: 8px 14px; border-radius: var(--radius-button); font-size: var(--text-xs);
      font-weight: 600; cursor: pointer;
    }
    .btn--outline { border: 1px solid var(--border-medium); background: var(--surface); color: var(--text-strong); }
    .btn--outline:hover { background: var(--surface-subtle); }

    .empty-box { padding: var(--space-8); text-align: center; }
    .empty-box__text { color: var(--text-muted); margin: 0; font-size: var(--text-sm); }
  `]
})
export class ParentNotificationsComponent {
  readonly selectedFilter = signal<'ALL' | 'ATTENDANCE' | 'ACADEMIC' | 'FINANCE' | 'ADMIN'>('ALL');

  readonly notifications = signal<ParentNotification[]>([
    {
      id: 'n1',
      category: 'ATTENDANCE',
      title: 'Retard enregistré ce matin',
      message: 'Emmanuel Kouassi a été enregistré avec 10 minutes de retard au cours de Mathématiques de 08:00.',
      date: 'Aujourd’hui à 08:12',
      read: false,
      childName: 'Emmanuel'
    },
    {
      id: 'n2',
      category: 'ACADEMIC',
      title: 'Nouvelle note de Sciences Physiques',
      message: 'Une note de 16/20 a été attribuée lors du devoir surveillé N°1 (coefficient 2).',
      date: 'Hier à 16:30',
      read: false,
      childName: 'Emmanuel'
    },
    {
      id: 'n3',
      category: 'FINANCE',
      title: 'Reçu de paiement Tranche 2 disponible',
      message: 'Votre versement de 250 000 FCFA a été validé. Le reçu REC-2026-00890 est prêt à être téléchargé.',
      date: '04 Octobre 2026',
      read: true,
      childName: 'Emmanuel'
    },
    {
      id: 'n4',
      category: 'ADMIN',
      title: 'Réunion parents-professeurs du 1er Trimestre',
      message: 'La réunion générale se tiendra le samedi 24 octobre à 09h00 dans le grand amphithéâtre.',
      date: '01 Octobre 2026',
      read: true
    }
  ]);

  filteredNotifications() {
    const filter = this.selectedFilter();
    if (filter === 'ALL') return this.notifications();
    return this.notifications().filter((n) => n.category === filter);
  }

  toggleRead(item: ParentNotification): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
  }

  markAllAsRead(): void {
    this.notifications.update((list) => list.map((n) => ({ ...n, read: true })));
  }

  getCategoryIcon(cat: string): string {
    switch (cat) {
      case 'ATTENDANCE': return '⏰';
      case 'ACADEMIC': return '📝';
      case 'FINANCE': return '💰';
      default: return '📢';
    }
  }

  getCategoryLabel(cat: string): string {
    switch (cat) {
      case 'ATTENDANCE': return 'Vie scolaire';
      case 'ACADEMIC': return 'Pédagogie';
      case 'FINANCE': return 'Finance';
      default: return 'Administration';
    }
  }
}
