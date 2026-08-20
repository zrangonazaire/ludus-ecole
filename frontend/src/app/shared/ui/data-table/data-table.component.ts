import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageResponse } from '@core/models/common.models';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { LoadingStateComponent } from '../loading-state/loading-state.component';

export interface TableColumn<T = object> {
  key: string;
  label: string;
  numeric?: boolean;
  width?: string;
  sortable?: boolean;
  /** Optional custom cell template; receives `{ $implicit: row }`. */
  template?: TemplateRef<{ $implicit: T }>;
}

/**
 * Generic paginated table used by every list screen (section 52).
 * Keyboard accessible: rows are focusable and activate on Enter.
 */
@Component({
  selector: 'eduops-data-table',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading) {
      <eduops-loading-state />
    } @else if (!page || page.content.length === 0) {
      <eduops-empty-state [title]="emptyTitle" [message]="emptyMessage" />
    } @else {
      <div class="table-wrapper">
        <table class="table">
          <caption class="visually-hidden">{{ caption }}</caption>
          <thead>
            <tr>
              @for (column of columns; track column.key) {
                <th [class.numeric]="column.numeric" [style.width]="column.width"
                    [attr.aria-sort]="ariaSort(column.key)">
                  @if (column.sortable) {
                    <button type="button" class="table__sort" (click)="onSort(column.key)">
                      {{ column.label }}
                      <span aria-hidden="true">{{ sortIndicator(column.key) }}</span>
                    </button>
                  } @else {
                    {{ column.label }}
                  }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of page.content; track trackKey(row)) {
              <tr [class.is-clickable]="rowClickable"
                  [attr.tabindex]="rowClickable ? 0 : null"
                  (click)="rowClickable && rowClick.emit(row)"
                  (keydown.enter)="rowClickable && rowClick.emit(row)">
                @for (column of columns; track column.key) {
                  <td [class.numeric]="column.numeric">
                    @if (column.template) {
                      <ng-container [ngTemplateOutlet]="column.template"
                                    [ngTemplateOutletContext]="{ $implicit: row }" />
                    } @else {
                      {{ valueOf(row, column.key) }}
                    }
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (page.totalPages > 1) {
        <nav class="pager" aria-label="Pagination">
          <button type="button" class="btn btn--secondary btn--sm"
                  [disabled]="page.first" (click)="pageChange.emit(page.page - 1)">Precedent</button>
          <span class="pager__info numeric">
            Page {{ page.page + 1 }} / {{ page.totalPages }} — {{ page.totalElements }} resultat(s)
          </span>
          <button type="button" class="btn btn--secondary btn--sm"
                  [disabled]="page.last" (click)="pageChange.emit(page.page + 1)">Suivant</button>
        </nav>
      }
    }
  `,
  styles: [`
    .table__sort {
      background: none; border: 0; padding: 0; cursor: pointer;
      font: inherit; color: inherit; text-transform: inherit; letter-spacing: inherit;
      display: inline-flex; align-items: center; gap: 4px;
    }
    tr.is-clickable { cursor: pointer; }
    .pager {
      display: flex; align-items: center; justify-content: space-between;
      gap: var(--space-3); padding: var(--space-4) var(--space-2) 0;
      flex-wrap: wrap;
    }
    .pager__info { font-size: var(--text-sm); color: var(--text-muted); }
  `]
})
export class DataTableComponent<T extends object> {
  @Input({ required: true }) columns: TableColumn<T>[] = [];
  @Input() page: PageResponse<T> | null = null;
  @Input() loading = false;
  @Input() rowClickable = false;
  @Input() caption = 'Tableau de donnees';
  @Input() emptyTitle = 'Aucun resultat';
  @Input() emptyMessage = 'Modifiez vos filtres pour elargir la recherche.';
  @Input() trackBy: string = 'id';
  @Input() sortKey?: string;
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ key: string; direction: 'asc' | 'desc' }>();
  @Output() rowClick = new EventEmitter<T>();

  trackKey(row: T): unknown {
    return (row as Record<string, unknown>)[this.trackBy as string] ?? row;
  }

  /** Reads a possibly nested property path such as 'student.fullName'. */
  valueOf(row: T, key: string): unknown {
    const value = key.split('.').reduce<unknown>(
      (acc, part) => (acc as Record<string, unknown> | undefined)?.[part], row);
    return value ?? '-';
  }

  onSort(key: string): void {
    const direction: 'asc' | 'desc' =
      this.sortKey === key && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ key, direction });
  }

  sortIndicator(key: string): string {
    if (this.sortKey !== key) return '';
    return this.sortDirection === 'asc' ? '▴' : '▾';
  }

  ariaSort(key: string): string | null {
    if (this.sortKey !== key) return null;
    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }
}
