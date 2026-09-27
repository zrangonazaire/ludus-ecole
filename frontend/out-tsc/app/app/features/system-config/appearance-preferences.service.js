import { Injectable, inject } from '@angular/core';
import * as i0 from "@angular/core";
const DEFAULTS = {
    brand: '#1f5fd6',
    fontSize: 'normal',
    currency: 'XOF',
    locale: 'fr-CI',
    timezone: 'Africa/Abidjan'
};
const FONT_PX = {
    small: '13px',
    normal: '14px',
    large: '16px'
};
function key(schoolId) {
    return `eduops.appearance.${schoolId ?? 'global'}`;
}
/**
 * Préférences « Apparence et région » : affichage local du front.
 *
 * <p>Stockées dans le navigateur (localStorage, par établissement), appliquées
 * immédiatement sur `:root` (couleur `--brand`, taille de police). Elles ne
 * remplacent pas les paramètres serveur (`PUT /api/v1/school` : devise, langue,
 * fuseau de l'établissement) — ce sont des surcharges d'affichage sur ce
 * navigateur, réversibles via « Réinitialiser ».</p>
 */
export class AppearancePreferencesService {
    constructor() {
        this.apply(this.load());
    }
    load(schoolId) {
        try {
            const raw = localStorage.getItem(key(schoolId));
            if (!raw) {
                return { ...DEFAULTS };
            }
            return { ...DEFAULTS, ...JSON.parse(raw) };
        }
        catch {
            return { ...DEFAULTS };
        }
    }
    save(prefs, schoolId) {
        try {
            localStorage.setItem(key(schoolId), JSON.stringify(prefs));
        }
        catch {
            // Stockage indisponible : les préférences restent valables pour la session.
        }
        this.apply(prefs);
    }
    reset(schoolId) {
        try {
            localStorage.removeItem(key(schoolId));
        }
        catch {
            // Rien à nettoyer.
        }
        this.apply(DEFAULTS);
        return { ...DEFAULTS };
    }
    defaults() {
        return { ...DEFAULTS };
    }
    /** Applique couleur + taille sur le document (idempotent). */
    apply(prefs) {
        try {
            const root = document.documentElement;
            root.style.setProperty('--brand', prefs.brand);
            root.style.setProperty('font-size', FONT_PX[prefs.fontSize] ?? FONT_PX.normal);
        }
        catch {
            // Rendu serveur ou DOM indisponible : rien à appliquer.
        }
    }
    static ɵfac = function AppearancePreferencesService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppearancePreferencesService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AppearancePreferencesService, factory: AppearancePreferencesService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppearancePreferencesService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
export function injectAppearance() {
    return inject(AppearancePreferencesService);
}
//# sourceMappingURL=appearance-preferences.service.js.map