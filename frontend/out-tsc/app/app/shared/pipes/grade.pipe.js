import { Pipe } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Displays a mark on the school scale.
 *
 * Presentation only: the value itself is always computed by the backend
 * (rule 14). This pipe must never do arithmetic beyond rounding for display.
 */
export class GradePipe {
    transform(value, scaleMax = environment.gradingScaleMax, showScale = true) {
        if (value === null || value === undefined || Number.isNaN(value)) {
            return '-';
        }
        const formatted = value.toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return showScale ? `${formatted}/${scaleMax}` : formatted;
    }
    static ɵfac = function GradePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GradePipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "grade", type: GradePipe, pure: true, standalone: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GradePipe, [{
        type: Pipe,
        args: [{ name: 'grade', standalone: true }]
    }], null, null); })();
//# sourceMappingURL=grade.pipe.js.map