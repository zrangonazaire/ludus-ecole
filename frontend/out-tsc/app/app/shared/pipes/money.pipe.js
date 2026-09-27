import { Pipe } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Formats an amount in the school currency.
 * XOF has no minor unit, so no decimals are shown for francs CFA.
 */
export class MoneyPipe {
    transform(value, currency = environment.currency, compact = false) {
        if (value === null || value === undefined || Number.isNaN(value)) {
            return '-';
        }
        const noMinorUnit = currency === 'XOF' || currency === 'XAF';
        if (compact && Math.abs(value) >= 1_000_000) {
            return `${(value / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M ${currency}`;
        }
        const formatted = value.toLocaleString('fr-FR', {
            minimumFractionDigits: noMinorUnit ? 0 : 2,
            maximumFractionDigits: noMinorUnit ? 0 : 2
        });
        return `${formatted} ${currency}`;
    }
    static ɵfac = function MoneyPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MoneyPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "money", type: MoneyPipe, pure: true, standalone: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MoneyPipe, [{
        type: Pipe,
        args: [{ name: 'money', standalone: true }]
    }], null, null); })();
//# sourceMappingURL=money.pipe.js.map