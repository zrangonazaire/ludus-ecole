import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { environment } from '@env/environment';
import { ApprovalCircuit } from './approval-circuit.store';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';

interface CircuitUser {
  id: string; username: string; firstName: string; lastName: string; status: string;
}


/**
 * Onglet Circuits de validation (modele Krindja).
 * Tableau CODE / NOM / NIVEAUX + Modifier / Supprimer, bouton
 * Nouveau circuit. La modale porte Code, Nom, niveaux avec code
 * (ex. DOPI), membres valideurs, mode Tous / Un seul, Dernier niveau.
 */
@Component({
  selector: 'eduops-system-config-circuit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './system-config-circuit.component.html',
  styleUrl: './system-config.component.scss'
})
export class SystemConfigCircuitComponent implements OnInit {
  private readonly http = inject(HttpClient);
  protected readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly store = inject(ApprovalCircuitService);
  private readonly destroyRef = inject(DestroyRef);

  readonly circuits = signal<ApprovalCircuit[]>([]);
  readonly users = signal<CircuitUser[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);

  readonly draft = signal<ApprovalCircuit | null>(null);
  readonly draftIsNew = signal(false);
  readonly draftError = signal('');
  readonly saving = signal(false);
  readonly memberPick = signal<Record<number, string | undefined>>({});

  canEdit(): boolean {
    return this.auth.hasAny('SCHOOL_MANAGE', 'DISCOUNT_REQUEST_MANAGE');
  }

  ngOnInit(): void {
    this.loadCircuits();
    this.http.get<CircuitUser[]>(`${environment.apiBaseUrl}/users`)
      .pipe(catchError(() => of([] as CircuitUser[])),
        takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          this.users.set(users.filter((u) => u.status === 'ACTIVE'));
          this.loading.set(false);
        },
        error: () => { this.loading.set(false); this.failed.set(true); }
      });
  }

  private loadCircuits(): void {
    this.store.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: rows => {
        this.circuits.set(rows.map(c => ({ ...c, usage: c.usage ?? 'DISCOUNT',
          levels: c.levels.map((l, i) => ({ code: l.code, mode: l.mode,
            memberIds: l.members.map(m => m.id), isLast: i === c.levels.length - 1 })) })));
        this.loading.set(false);
      },
      error: () => { this.failed.set(true); this.loading.set(false); }
    });
  }

  reload(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.ngOnInit();
  }

  userLabel(id: string): string {
    const u = this.users().find((x) => x.id === id);
    return u ? `${u.firstName} ${u.lastName} (${u.username})` : 'Compte introuvable';
  }

  openNew(): void {
    if (!this.canEdit()) {
      return;
    }
    this.draftIsNew.set(true);
    this.draftError.set('');
    this.memberPick.set({});
    this.draft.set({
      id: '', code: '', name: '', usage: 'DISCOUNT',
      levels: [{ code: '', memberIds: [], mode: 'ALL', isLast: true }]
    });
  }

  openEdit(circuit: ApprovalCircuit): void {
    if (!this.canEdit()) {
      return;
    }
    this.draftIsNew.set(false);
    this.draftError.set('');
    this.memberPick.set({});
    this.draft.set(structuredClone(circuit));
  }

  closeDraft(): void {
    if (this.saving()) {
      return;
    }
    this.draft.set(null);
  }

  updateDraft(field: 'code' | 'name' | 'usage', value: string): void {
    this.draft.update((d) => d ? { ...d, [field]: value } : d);
  }


  addDraftLevel(): void {
    this.draft.update((d) => {
      if (!d || d.levels.length >= 5) {
        return d;
      }
      const levels = [...d.levels.map((l) => ({ ...l, isLast: false })),
        { code: '', memberIds: [] as string[], mode: 'ALL' as const, isLast: true }];
      return { ...d, levels };
    });
  }

  removeDraftLevel(index: number): void {
    this.draft.update((d) => {
      if (!d || d.levels.length <= 1) {
        return d;
      }
      const levels = d.levels.filter((_, i) => i !== index)
        .map((l, i, all) => ({ ...l, isLast: i === all.length - 1 }));
      return { ...d, levels };
    });
  }

  updateDraftLevel(index: number, value: string): void {
    this.draft.update((d) => {
      if (!d) {
        return d;
      }
      return { ...d, levels: d.levels.map((l, i) => i === index ? { ...l, code: value } : l) };
    });
  }

  setDraftMode(index: number, mode: 'ALL' | 'ONE'): void {
    this.draft.update((d) => {
      if (!d) {
        return d;
      }
      return { ...d, levels: d.levels.map((l, i) => i === index ? { ...l, mode } : l) };
    });
  }

  isDraftLast(index: number): boolean {
    const d = this.draft();
    return !!d && index === d.levels.length - 1;
  }

  addDraftMember(index: number): void {
    const userId = this.memberPick()[index];
    if (!userId) {
      return;
    }
    this.draft.update((d) => {
      if (!d) {
        return d;
      }
      const levels = d.levels.map((l, i) => i === index && !l.memberIds.includes(userId)
        ? { ...l, memberIds: [...l.memberIds, userId] } : l);
      return { ...d, levels };
    });
    this.memberPick.update((p) => ({ ...p, [index]: '' }));
  }

  setMemberPick(index: number, value: string): void {
    this.memberPick.update((p) => ({ ...p, [index]: value }));
  }

  removeDraftMember(index: number, userId: string): void {
    this.draft.update((d) => {
      if (!d) {
        return d;
      }
      const levels = d.levels.map((l, i) => i === index
        ? { ...l, memberIds: l.memberIds.filter((m) => m !== userId) } : l);
      return { ...d, levels };
    });
  }

  saveDraft(): void {
    const d = this.draft();
    if (!d || !this.canEdit() || this.saving()) {
      return;
    }
    const code = d.code.trim().toUpperCase();
    const name = d.name.trim();
    if (!code) {
      this.draftError.set('Donnez un code au circuit (ex. VAL-ADM).');
      return;
    }
    if (!name) {
      this.draftError.set('Donnez un nom au circuit (ex. VALIDATION DOSSIER ADMISSION).');
      return;
    }
    const clash = this.circuits().some((c) => c.id !== d.id
      && c.code.trim().toUpperCase() === code);
    if (clash) {
      this.draftError.set(`Le code ${code} est déjà utilisé par un autre circuit.`);
      return;
    }
    if (d.levels.some((l) => !l.code.trim())) {
      this.draftError.set('Chaque niveau doit avoir un code (ex. DOPI).');
      return;
    }
    if (d.levels.some((l) => l.memberIds.length === 0)) {
      this.draftError.set('Affectez au moins un membre à chaque niveau.');
      return;
    }
    this.saving.set(true);
    const payload = { code, name, usage: d.usage, levels: d.levels.map(l => ({
      code: l.code, mode: l.mode, memberIds: l.memberIds
    })) };
    const save = this.draftIsNew() ? this.store.create(payload) : this.store.update(d.id, payload);
    save.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false); this.draft.set(null); this.loadCircuits();
        this.notifications.success(`Circuit ${code} enregistré.`, 'Circuit enregistré');
      },
      error: err => {
        this.saving.set(false);
        this.draftError.set(err?.error?.message ?? 'Enregistrement impossible.');
      }
    });
  }

  deleteCircuit(id: string): void {
    if (!this.canEdit()) {
      return;
    }
    this.store.remove(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.loadCircuits(); this.notifications.success('Le circuit est supprimé.'); },
      error: err => this.notifications.error(err?.error?.message ?? 'Suppression impossible.')
    });
  }
}
