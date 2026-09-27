import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';
import { environment } from '@env/environment';
import { PERMISSIONS, ROLES } from '../models/auth.models';
import * as i0 from "@angular/core";
const ACCESS_TOKEN_KEY = 'eduops.accessToken';
const REFRESH_TOKEN_KEY = 'eduops.refreshToken';
const MOCK_PROFILES = {
    admin: {
        name: 'Aminata Kone',
        roles: [ROLES.SCHOOL_ADMIN],
        permissions: Object.values(PERMISSIONS)
    },
    prof: {
        name: 'Kouassi N\'Guessan',
        roles: [ROLES.TEACHER],
        permissions: [PERMISSIONS.PORTAL_TEACHER, PERMISSIONS.DASHBOARD_VIEW,
            PERMISSIONS.CLASS_VIEW, PERMISSIONS.STUDENT_VIEW, PERMISSIONS.TIMETABLE_VIEW,
            PERMISSIONS.ATTENDANCE_VIEW, PERMISSIONS.ATTENDANCE_CREATE,
            PERMISSIONS.ASSESSMENT_VIEW, PERMISSIONS.ASSESSMENT_CREATE,
            PERMISSIONS.GRADE_VIEW, PERMISSIONS.GRADE_CREATE, PERMISSIONS.REPORT_CARD_VIEW,
            PERMISSIONS.ALERT_VIEW,
            // Le professeur reçoit l'alerte et la conduite à tenir, jamais le
            // dossier. Se connecter en « prof » en démonstration montre exactement ce
            // que la salle des professeurs voit de la santé des élèves.
            PERMISSIONS.HEALTH_ALERT_VIEW]
    },
    parent: {
        name: 'Mariam Traore',
        roles: [ROLES.PARENT],
        permissions: [PERMISSIONS.PORTAL_PARENT]
    },
    eleve: {
        name: 'Yao Brou',
        roles: [ROLES.STUDENT],
        permissions: [PERMISSIONS.PORTAL_STUDENT]
    }
};
/**
 * Holds the session.
 *
 * Note: the tokens live in memory for the lifetime of the tab and are mirrored
 * to sessionStorage so a refresh does not log the user out. Everything is wiped
 * on logout (section 81: minimise locally stored data, clean up on sign-out).
 */
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);
    _accessToken = signal(this.readUsableToken());
    _currentUser = signal(this.restoreUser(this._accessToken()));
    currentUser = this._currentUser.asReadonly();
    /**
     * Une session vaut par l'identité qu'on en tire, pas par la présence d'un jeton.
     *
     * <p>Se contenter de vérifier que le jeton existe laissait passer un cas
     * précis et déroutant : un jeton illisible — celui d'une ancienne session de
     * démonstration, ou un jeton expiré au format inattendu — rendait
     * `isAuthenticated` vrai, `currentUser` nul et la liste des permissions
     * vide. « Mon espace » s'affichait donc sur la page d'accueil, et menait
     * droit à /forbidden. L'utilisateur était connecté sans avoir le droit
     * d'entrer nulle part.</p>
     */
    isAuthenticated = computed(() => this._accessToken() !== null && this._currentUser() !== null);
    permissions = computed(() => new Set(this._currentUser()?.permissions ?? []));
    roles = computed(() => new Set(this._currentUser()?.roles ?? []));
    login(request) {
        if (environment.useMockData) {
            return this.mockLogin(request).pipe(tap((res) => this.applySession(res)));
        }
        return this.http
            .post(`${environment.apiBaseUrl}/auth/login`, request)
            .pipe(tap((res) => this.applySession(res)));
    }
    logout() {
        this._accessToken.set(null);
        this._currentUser.set(null);
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        void this.router.navigate(['/login']);
    }
    accessToken() {
        return this._accessToken();
    }
    refreshToken() {
        return this.readStored(REFRESH_TOKEN_KEY);
    }
    /** True when the account holds the given fine-grained permission. */
    has(permission) {
        return this.permissions().has(permission);
    }
    hasAny(...permissions) {
        return permissions.some((p) => this.permissions().has(p));
    }
    hasRole(role) {
        return this.roles().has(role);
    }
    /** Landing route for the account, based on its primary role. */
    homeRoute() {
        if (this.hasRole('TEACHER'))
            return '/teacher/home';
        if (this.hasRole('PARENT'))
            return '/parent/home';
        if (this.hasRole('STUDENT'))
            return '/student/home';
        return '/dashboard';
    }
    /**
     * Adopts a session created elsewhere — today, by public signup, which already
     * returns tokens so the user is not asked to log in again straight away.
     *
     * <p>Roles and permissions are read from the access token when the caller
     * does not supply them. The token is not verified here: that is the server's
     * job on every call. This only decides what the interface shows.</p>
     */
    applyExternalSession(session) {
        const claims = this.decodeToken(session.accessToken);
        const roles = session.roles?.length ? session.roles : claims?.['roles'] ?? [];
        const tokenPermissions = session.permissions?.length
            ? session.permissions
            : claims?.['perms'] ?? [];
        const permissions = environment.useMockData
            && roles.includes(ROLES.SCHOOL_ADMIN)
            && tokenPermissions.length === 0
            ? Object.values(PERMISSIONS)
            : tokenPermissions;
        this._accessToken.set(session.accessToken);
        sessionStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
        this._currentUser.set({
            userId: session.userId,
            username: session.username,
            email: session.email,
            firstName: session.fullName.split(' ')[0] ?? '',
            lastName: session.fullName.split(' ').slice(1).join(' '),
            fullName: session.fullName,
            schoolId: session.schoolId,
            mustChangePassword: false,
            roles,
            permissions
        });
    }
    /** Reads the JWT payload. Presentation only — never a security decision. */
    decodeToken(token) {
        try {
            const payload = token.split('.')[1];
            if (!payload) {
                return null;
            }
            const normalised = payload.replace(/-/g, '+').replace(/_/g, '/');
            const padded = normalised.padEnd(Math.ceil(normalised.length / 4) * 4, '=');
            const json = atob(padded);
            return JSON.parse(json);
        }
        catch {
            return null;
        }
    }
    applySession(response) {
        this._accessToken.set(response.accessToken);
        sessionStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
        this._currentUser.set({
            userId: response.userId,
            username: response.username,
            email: response.email,
            firstName: response.fullName.split(' ')[0] ?? '',
            lastName: response.fullName.split(' ').slice(1).join(' '),
            fullName: response.fullName,
            schoolId: response.schoolId,
            mustChangePassword: response.mustChangePassword,
            roles: response.roles,
            permissions: response.permissions
        });
    }
    readStored(key) {
        try {
            return sessionStorage.getItem(key);
        }
        catch {
            return null;
        }
    }
    /**
     * Lit le jeton stocké, et le jette s'il n'est plus exploitable.
     *
     * <p>Un jeton dont on ne peut rien tirer n'est pas une session : le garder
     * ne fait que produire un utilisateur sans identité ni permission. Le cas
     * se présente en changeant `useMockData` — le jeton de démonstration
     * `mock-access-token.admin` n'est pas un JWT et devient indéchiffrable — et
     * se présentera de nouveau le jour où le format du jeton évoluera.</p>
     */
    readUsableToken() {
        const token = this.readStored(ACCESS_TOKEN_KEY);
        if (token && this.restoreUser(token) === null) {
            // On nettoie plutôt que de laisser une session fantôme : sans cela
            // l'écran d'accueil propose « Mon espace » et le garde refuse l'entrée.
            try {
                sessionStorage.removeItem(ACCESS_TOKEN_KEY);
                sessionStorage.removeItem(REFRESH_TOKEN_KEY);
            }
            catch {
                // sessionStorage indisponible : rien à nettoyer.
            }
            return null;
        }
        return token;
    }
    /** Rebuilds the UX identity from the access token after a page refresh. */
    restoreUser(token) {
        if (!token) {
            return null;
        }
        if (environment.useMockData && token.startsWith('mock-access-token.')) {
            const key = token.split('.').at(-1) ?? 'admin';
            const profile = MOCK_PROFILES[key] ?? MOCK_PROFILES['admin'];
            return {
                userId: `mock-user-${key}`,
                username: key,
                email: `${key}@soocloo.com`,
                firstName: profile.name.split(' ')[0] ?? '',
                lastName: profile.name.split(' ').slice(1).join(' '),
                fullName: profile.name,
                schoolId: 'mock-school',
                mustChangePassword: false,
                roles: profile.roles,
                permissions: profile.permissions
            };
        }
        const claims = this.decodeToken(token);
        const userId = typeof claims?.['uid'] === 'string' ? claims['uid'] : null;
        const username = typeof claims?.['sub'] === 'string' ? claims['sub'] : null;
        if (!userId || !username) {
            return null;
        }
        const roles = Array.isArray(claims?.['roles']) ? claims['roles'] : [];
        const permissions = Array.isArray(claims?.['perms']) ? claims['perms'] : [];
        return {
            userId,
            username,
            email: username,
            firstName: username.split('@')[0] ?? username,
            lastName: '',
            fullName: username,
            schoolId: typeof claims?.['sid'] === 'string' ? claims['sid'] : undefined,
            mustChangePassword: false,
            roles,
            permissions
        };
    }
    /** Offline demo login used while `useMockData` is on. */
    mockLogin(request) {
        const key = request.login.split('@')[0].toLowerCase();
        const profile = MOCK_PROFILES[key] ?? MOCK_PROFILES['admin'];
        return of({
            accessToken: `mock-access-token.${key}`,
            refreshToken: `mock-refresh-token.${key}`,
            tokenType: 'Bearer',
            expiresIn: 28800,
            userId: `mock-user-${key}`,
            username: key,
            email: `${key}@soocloo.com`,
            fullName: profile.name,
            schoolId: 'mock-school',
            mustChangePassword: false,
            roles: profile.roles,
            permissions: profile.permissions
        });
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=auth.service.js.map