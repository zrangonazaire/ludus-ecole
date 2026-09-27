import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { LoadingStateComponent } from '../loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.key;
function _forTrack1($index, $item) { return this.trackKey($item); }
const _c0 = a0 => ({ $implicit: a0 });
function DataTableComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state");
} }
function DataTableComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-empty-state", 0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r0.emptyTitle)("message", ctx_r0.emptyMessage);
} }
function DataTableComponent_Conditional_2_For_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function DataTableComponent_Conditional_2_For_7_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const column_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onSort(column_r3.key)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 9);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const column_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", column_r3.label, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.sortIndicator(column_r3.key));
} }
function DataTableComponent_Conditional_2_For_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const column_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", column_r3.label, " ");
} }
function DataTableComponent_Conditional_2_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtemplate(1, DataTableComponent_Conditional_2_For_7_Conditional_1_Template, 4, 2, "button", 7)(2, DataTableComponent_Conditional_2_For_7_Conditional_2_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("width", column_r3.width);
    i0.ɵɵclassProp("numeric", column_r3.numeric);
    i0.ɵɵattribute("aria-sort", ctx_r0.ariaSort(column_r3.key));
    i0.ɵɵadvance();
    i0.ɵɵconditional(column_r3.sortable ? 1 : 2);
} }
function DataTableComponent_Conditional_2_For_10_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const column_r6 = i0.ɵɵnextContext().$implicit;
    const row_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngTemplateOutlet", column_r6.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, row_r5));
} }
function DataTableComponent_Conditional_2_For_10_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const column_r6 = i0.ɵɵnextContext().$implicit;
    const row_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.valueOf(row_r5, column_r6.key), " ");
} }
function DataTableComponent_Conditional_2_For_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, DataTableComponent_Conditional_2_For_10_For_2_Conditional_1_Template, 1, 4, "ng-container", 12)(2, DataTableComponent_Conditional_2_For_10_For_2_Conditional_2_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r6 = ctx.$implicit;
    i0.ɵɵclassProp("numeric", column_r6.numeric);
    i0.ɵɵadvance();
    i0.ɵɵconditional(column_r6.template ? 1 : 2);
} }
function DataTableComponent_Conditional_2_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 10);
    i0.ɵɵlistener("click", function DataTableComponent_Conditional_2_For_10_Template_tr_click_0_listener() { const row_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.rowClickable && ctx_r0.rowClick.emit(row_r5)); })("keydown.enter", function DataTableComponent_Conditional_2_For_10_Template_tr_keydown_enter_0_listener() { const row_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.rowClickable && ctx_r0.rowClick.emit(row_r5)); });
    i0.ɵɵrepeaterCreate(1, DataTableComponent_Conditional_2_For_10_For_2_Template, 3, 3, "td", 11, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("is-clickable", ctx_r0.rowClickable);
    i0.ɵɵattribute("tabindex", ctx_r0.rowClickable ? 0 : null);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.columns);
} }
function DataTableComponent_Conditional_2_Conditional_11_Conditional_1_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r8);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r8);
} }
function DataTableComponent_Conditional_2_Conditional_11_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 13);
    i0.ɵɵtext(1, " Lignes par page ");
    i0.ɵɵelementStart(2, "select", 15);
    i0.ɵɵlistener("change", function DataTableComponent_Conditional_2_Conditional_11_Conditional_1_Template_select_change_2_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.pageSizeChange.emit(+$event.target.value)); });
    i0.ɵɵrepeaterCreate(3, DataTableComponent_Conditional_2_Conditional_11_Conditional_1_For_4_Template, 2, 2, "option", 16, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.pageSizeOptions);
} }
function DataTableComponent_Conditional_2_Conditional_11_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function DataTableComponent_Conditional_2_Conditional_11_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.pageChange.emit(ctx_r0.page.page - 1)); });
    i0.ɵɵtext(1, "Precedent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 14);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 17);
    i0.ɵɵlistener("click", function DataTableComponent_Conditional_2_Conditional_11_Conditional_2_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.pageChange.emit(ctx_r0.page.page + 1)); });
    i0.ɵɵtext(5, "Suivant");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.page.first);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3(" Page ", ctx_r0.page.page + 1, " / ", ctx_r0.page.totalPages, " \u2014 ", ctx_r0.page.totalElements, " resultat(s) ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.page.last);
} }
function DataTableComponent_Conditional_2_Conditional_11_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r0.page.totalElements, " resultat(s)");
} }
function DataTableComponent_Conditional_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 6);
    i0.ɵɵtemplate(1, DataTableComponent_Conditional_2_Conditional_11_Conditional_1_Template, 5, 1, "label", 13)(2, DataTableComponent_Conditional_2_Conditional_11_Conditional_2_Template, 6, 5)(3, DataTableComponent_Conditional_2_Conditional_11_Conditional_3_Template, 2, 1, "span", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.showPageSize ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.page.totalPages > 1 ? 2 : 3);
} }
function DataTableComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "table", 2)(2, "caption", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr");
    i0.ɵɵrepeaterCreate(6, DataTableComponent_Conditional_2_For_7_Template, 3, 6, "th", 4, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "tbody");
    i0.ɵɵrepeaterCreate(9, DataTableComponent_Conditional_2_For_10_Template, 3, 3, "tr", 5, _forTrack1, true);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, DataTableComponent_Conditional_2_Conditional_11_Template, 4, 2, "nav", 6);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.caption);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.columns);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.page.content);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.page.totalPages > 1 || ctx_r0.showPageSize ? 11 : -1);
} }
/**
 * Generic paginated table used by every list screen (section 52).
 * Keyboard accessible: rows are focusable and activate on Enter.
 */
export class DataTableComponent {
    columns = [];
    page = null;
    loading = false;
    rowClickable = false;
    caption = 'Tableau de données';
    emptyTitle = 'Aucun résultat';
    emptyMessage = 'Modifiez vos filtres pour elargir la recherche.';
    trackBy = 'id';
    sortKey;
    sortDirection = 'asc';
    /** Proposé quand showPageSize est vrai : [10, 20, 50, 100] par défaut. */
    pageSizeOptions = [10, 20, 50, 100];
    pageSize = 20;
    showPageSize = false;
    pageChange = new EventEmitter();
    pageSizeChange = new EventEmitter();
    sortChange = new EventEmitter();
    rowClick = new EventEmitter();
    trackKey(row) {
        return row[this.trackBy] ?? row;
    }
    /** Reads a possibly nested property path such as 'student.fullName'. */
    valueOf(row, key) {
        const value = key.split('.').reduce((acc, part) => acc?.[part], row);
        return value ?? '-';
    }
    onSort(key) {
        const direction = this.sortKey === key && this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortChange.emit({ key, direction });
    }
    sortIndicator(key) {
        if (this.sortKey !== key)
            return '';
        return this.sortDirection === 'asc' ? '▴' : '▾';
    }
    ariaSort(key) {
        if (this.sortKey !== key)
            return null;
        return this.sortDirection === 'asc' ? 'ascending' : 'descending';
    }
    static ɵfac = function DataTableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataTableComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataTableComponent, selectors: [["eduops-data-table"]], inputs: { columns: "columns", page: "page", loading: "loading", rowClickable: "rowClickable", caption: "caption", emptyTitle: "emptyTitle", emptyMessage: "emptyMessage", trackBy: "trackBy", sortKey: "sortKey", sortDirection: "sortDirection", pageSizeOptions: "pageSizeOptions", pageSize: "pageSize", showPageSize: "showPageSize" }, outputs: { pageChange: "pageChange", pageSizeChange: "pageSizeChange", sortChange: "sortChange", rowClick: "rowClick" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [[3, "title", "message"], [1, "table-wrapper"], [1, "table"], [1, "visually-hidden"], [3, "numeric", "width"], [3, "is-clickable"], ["aria-label", "Pagination", 1, "pager"], ["type", "button", 1, "table__sort"], ["type", "button", 1, "table__sort", 3, "click"], ["aria-hidden", "true"], [3, "click", "keydown.enter"], [3, "numeric"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "pager__size"], [1, "pager__info", "numeric"], [3, "change", "value"], [3, "value"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"]], template: function DataTableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DataTableComponent_Conditional_0_Template, 1, 0, "eduops-loading-state")(1, DataTableComponent_Conditional_1_Template, 1, 2, "eduops-empty-state", 0)(2, DataTableComponent_Conditional_2_Template, 12, 2);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading ? 0 : !ctx.page || ctx.page.content.length === 0 ? 1 : 2);
        } }, dependencies: [CommonModule, i1.NgTemplateOutlet, EmptyStateComponent, LoadingStateComponent], styles: [".table__sort[_ngcontent-%COMP%] {\n      background: none; border: 0; padding: 0; cursor: pointer;\n      font: inherit; color: inherit; text-transform: inherit; letter-spacing: inherit;\n      display: inline-flex; align-items: center; gap: 4px;\n    }\n    tr.is-clickable[_ngcontent-%COMP%] { cursor: pointer; }\n    .pager[_ngcontent-%COMP%] {\n      display: flex; align-items: center; justify-content: space-between;\n      gap: var(--space-3); padding: var(--space-4) var(--space-2) 0;\n      flex-wrap: wrap;\n    }\n    .pager__info[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--text-muted); }\n    .pager__size[_ngcontent-%COMP%] {\n      display: inline-flex; align-items: center; gap: 8px;\n      font-size: var(--text-sm); color: var(--text-muted);\n    }\n    .pager__size[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n      padding: 4px 8px; font-size: var(--text-sm);\n      border: 1px solid var(--border); border-radius: 6px;\n      background: var(--surface-card, #fff); cursor: pointer;\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataTableComponent, [{
        type: Component,
        args: [{ selector: 'eduops-data-table', standalone: true, imports: [CommonModule, EmptyStateComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
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

      @if (page.totalPages > 1 || showPageSize) {
        <nav class="pager" aria-label="Pagination">
          @if (showPageSize) {
            <label class="pager__size">
              Lignes par page
              <select [value]="pageSize" (change)="pageSizeChange.emit(+$any($event.target).value)">
                @for (size of pageSizeOptions; track size) {
                  <option [value]="size">{{ size }}</option>
                }
              </select>
            </label>
          }
          @if (page.totalPages > 1) {
            <button type="button" class="btn btn--secondary btn--sm"
                    [disabled]="page.first" (click)="pageChange.emit(page.page - 1)">Precedent</button>
            <span class="pager__info numeric">
              Page {{ page.page + 1 }} / {{ page.totalPages }} — {{ page.totalElements }} resultat(s)
            </span>
            <button type="button" class="btn btn--secondary btn--sm"
                    [disabled]="page.last" (click)="pageChange.emit(page.page + 1)">Suivant</button>
          } @else {
            <span class="pager__info numeric">{{ page.totalElements }} resultat(s)</span>
          }
        </nav>
      }
    }
  `, styles: ["\n    .table__sort {\n      background: none; border: 0; padding: 0; cursor: pointer;\n      font: inherit; color: inherit; text-transform: inherit; letter-spacing: inherit;\n      display: inline-flex; align-items: center; gap: 4px;\n    }\n    tr.is-clickable { cursor: pointer; }\n    .pager {\n      display: flex; align-items: center; justify-content: space-between;\n      gap: var(--space-3); padding: var(--space-4) var(--space-2) 0;\n      flex-wrap: wrap;\n    }\n    .pager__info { font-size: var(--text-sm); color: var(--text-muted); }\n    .pager__size {\n      display: inline-flex; align-items: center; gap: 8px;\n      font-size: var(--text-sm); color: var(--text-muted);\n    }\n    .pager__size select {\n      padding: 4px 8px; font-size: var(--text-sm);\n      border: 1px solid var(--border); border-radius: 6px;\n      background: var(--surface-card, #fff); cursor: pointer;\n    }\n  "] }]
    }], null, { columns: [{
            type: Input,
            args: [{ required: true }]
        }], page: [{
            type: Input
        }], loading: [{
            type: Input
        }], rowClickable: [{
            type: Input
        }], caption: [{
            type: Input
        }], emptyTitle: [{
            type: Input
        }], emptyMessage: [{
            type: Input
        }], trackBy: [{
            type: Input
        }], sortKey: [{
            type: Input
        }], sortDirection: [{
            type: Input
        }], pageSizeOptions: [{
            type: Input
        }], pageSize: [{
            type: Input
        }], showPageSize: [{
            type: Input
        }], pageChange: [{
            type: Output
        }], pageSizeChange: [{
            type: Output
        }], sortChange: [{
            type: Output
        }], rowClick: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DataTableComponent, { className: "DataTableComponent", filePath: "frontend/src/app/shared/ui/data-table/data-table.component.ts", lineNumber: 125 }); })();
//# sourceMappingURL=data-table.component.js.map