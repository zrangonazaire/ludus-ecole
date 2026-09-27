import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';
import * as i0 from "@angular/core";
/**
 * Colour-coded status chip.
 *
 * The tone is derived from the backend status value in one place, so the same
 * status always looks the same wherever it appears.
 */
export class StatusBadgeComponent {
    set status(value) {
        this._status.set(value);
    }
    get status() {
        return this._status();
    }
    pill = false;
    toneOverride;
    _status = signal('');
    tone = computed(() => this.toneOverride ?? toneFor(this._status()));
    static ɵfac = function StatusBadgeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatusBadgeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatusBadgeComponent, selectors: [["eduops-status-badge"]], inputs: { status: "status", pill: "pill", toneOverride: "toneOverride" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 7, consts: [[1, "badge"]], template: function StatusBadgeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "statusLabel");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassMap("badge--" + ctx.tone());
            i0.ɵɵclassProp("badge--pill", ctx.pill);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 5, ctx.status), " ");
        } }, dependencies: [CommonModule, StatusLabelPipe], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatusBadgeComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-status-badge',
                standalone: true,
                imports: [CommonModule, StatusLabelPipe],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <span class="badge" [class]="'badge--' + tone()" [class.badge--pill]="pill">
      {{ status | statusLabel }}
    </span>
  `
            }]
    }], null, { status: [{
            type: Input,
            args: [{ required: true }]
        }], pill: [{
            type: Input
        }], toneOverride: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatusBadgeComponent, { className: "StatusBadgeComponent", filePath: "frontend/src/app/shared/ui/status-badge/status-badge.component.ts", lineNumber: 23 }); })();
/** Single mapping from a backend status to a visual tone. */
export function toneFor(status) {
    switch (status) {
        case 'ACTIVE':
        case 'VALIDATED':
        case 'PUBLISHED':
        case 'PAID':
        case 'PRESENT':
        case 'AVAILABLE':
        case 'GRADUATED':
        case 'PASS':
        case 'PROMOTED':
            return 'success';
        case 'WARNING':
        case 'PENDING':
        case 'SUBMITTED':
        case 'PARTIALLY_PAID':
        case 'DUE':
        case 'LATE':
        case 'EXCUSED_LATE':
        case 'SUSPENDED':
        case 'GRADING':
        case 'ORIENTATION_REQUIRED':
            return 'warning';
        case 'FULL':
        case 'OVER_CAPACITY':
        case 'OVERDUE':
        case 'ABSENT':
        case 'CANCELLED':
        case 'REJECTED':
        case 'FAILED':
        case 'CRITICAL':
        case 'REPEAT':
            return 'danger';
        case 'PLANNED':
        case 'OPEN':
        case 'ADMITTED':
        case 'INFO':
            return 'info';
        default:
            return 'neutral';
    }
}
//# sourceMappingURL=status-badge.component.js.map