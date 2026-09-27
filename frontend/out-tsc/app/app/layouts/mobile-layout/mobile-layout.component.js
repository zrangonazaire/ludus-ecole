import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.route;
function MobileLayoutComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12)(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 14);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", tab_r1.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r1.label);
} }
/**
 * Shared mobile-first shell for the teacher, parent and student portals
 * (sections 29, 45, 47).
 *
 * Header + content + bottom tab bar, not a compressed desktop layout
 * (section 55).
 */
export class MobileLayoutComponent {
    title;
    subtitle = '';
    tabs = [];
    auth = inject(AuthService);
    user = this.auth.currentUser;
    static ɵfac = function MobileLayoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MobileLayoutComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MobileLayoutComponent, selectors: [["eduops-mobile-layout"]], inputs: { title: "title", subtitle: "subtitle", tabs: "tabs" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 19, vars: 3, consts: [[1, "portal"], [1, "portal__header"], [1, "portal__identity"], ["src", "assets/branding/soocloo-logo.png", "alt", "Soocloo", "width", "108", "height", "40", 1, "soocloo-logo", "soocloo-logo--compact"], [1, "portal__title"], [1, "portal__subtitle"], [1, "portal__header-actions"], ["type", "button", "aria-label", "Notifications", 1, "icon-btn"], ["aria-hidden", "true"], ["size", "sm", 3, "name"], ["id", "main-content", "tabindex", "-1", 1, "portal__content"], ["aria-label", "Navigation", 1, "tabbar"], ["routerLinkActive", "tabbar__item--active", 1, "tabbar__item", 3, "routerLink"], ["aria-hidden", "true", 1, "tabbar__icon"], [1, "tabbar__label"]], template: function MobileLayoutComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementStart(4, "div")(5, "p", 4);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 6)(10, "button", 7)(11, "span", 8);
            i0.ɵɵtext(12, "\u25D4");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(13, "eduops-avatar", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "main", 10);
            i0.ɵɵelement(15, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "nav", 11);
            i0.ɵɵrepeaterCreate(17, MobileLayoutComponent_For_18_Template, 5, 3, "a", 12, _forTrack0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_2_0;
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.subtitle);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("name", (tmp_2_0 = (tmp_2_0 = ctx.user()) == null ? null : tmp_2_0.fullName) !== null && tmp_2_0 !== undefined ? tmp_2_0 : "");
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.tabs);
        } }, dependencies: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent], styles: ["@import 'styles/tokens';\n\n.portal[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  background: var(--surface-page);\n}\n\n.portal__header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: var(--z-topbar);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  padding-top: max(var(--space-3), env(safe-area-inset-top));\n  background: var(--surface-card);\n  border-bottom: 1px solid var(--border);\n}\n\n.portal__identity[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n\n.portal__logo[_ngcontent-%COMP%] {\n  width: 34px; height: 34px;\n  display: grid; place-items: center;\n  background: var(--brand); color: #fff;\n  border-radius: 9px;\n  font-family: var(--font-display); font-weight: 800;\n}\n\n.portal__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-md);\n  font-weight: 700;\n  color: var(--text-strong);\n  line-height: 1.2;\n}\n\n.portal__subtitle[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n.portal__header-actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); }\n\n.icon-btn[_ngcontent-%COMP%] {\n  width: 34px; height: 34px;\n  display: grid; place-items: center;\n  background: none;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n  color: var(--text-normal);\n}\n\n.portal__content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-4) var(--space-4) calc(var(--bottom-tab-height) + var(--space-8));\n}\n\n\n\n.tabbar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0; left: 0; right: 0;\n  height: var(--bottom-tab-height);\n  padding-bottom: env(safe-area-inset-bottom);\n  display: flex;\n  background: var(--surface-card);\n  border-top: 1px solid var(--border);\n  z-index: var(--z-sticky);\n}\n\n.tabbar__item[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 2px;\n  text-decoration: none;\n  color: var(--text-muted);\n  font-size: 11px;\n  font-weight: 600;\n  \n\n  min-height: 44px;\n  transition: color var(--transition-fast);\n}\n\n.tabbar__item[_ngcontent-%COMP%]:hover { text-decoration: none; }\n.tabbar__item--active[_ngcontent-%COMP%] { color: var(--brand); }\n.tabbar__icon[_ngcontent-%COMP%] { font-size: 18px; line-height: 1; }\n\n\n\n@include desktop {\n  .portal__content { max-width: 960px; margin: 0 auto; width: 100%; }\n  .tabbar { max-width: 960px; margin: 0 auto; border-radius: var(--radius-card) var(--radius-card) 0 0; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MobileLayoutComponent, [{
        type: Component,
        args: [{ selector: 'eduops-mobile-layout', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
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
  `, styles: ["@import 'styles/tokens';\n\n.portal {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  background: var(--surface-page);\n}\n\n.portal__header {\n  position: sticky;\n  top: 0;\n  z-index: var(--z-topbar);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  padding-top: max(var(--space-3), env(safe-area-inset-top));\n  background: var(--surface-card);\n  border-bottom: 1px solid var(--border);\n}\n\n.portal__identity { display: flex; align-items: center; gap: var(--space-3); }\n\n.portal__logo {\n  width: 34px; height: 34px;\n  display: grid; place-items: center;\n  background: var(--brand); color: #fff;\n  border-radius: 9px;\n  font-family: var(--font-display); font-weight: 800;\n}\n\n.portal__title {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-md);\n  font-weight: 700;\n  color: var(--text-strong);\n  line-height: 1.2;\n}\n\n.portal__subtitle { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n.portal__header-actions { display: flex; align-items: center; gap: var(--space-2); }\n\n.icon-btn {\n  width: 34px; height: 34px;\n  display: grid; place-items: center;\n  background: none;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n  color: var(--text-normal);\n}\n\n.portal__content {\n  flex: 1;\n  padding: var(--space-4) var(--space-4) calc(var(--bottom-tab-height) + var(--space-8));\n}\n\n/* ---------------- Bottom tab bar ---------------- */\n.tabbar {\n  position: fixed;\n  bottom: 0; left: 0; right: 0;\n  height: var(--bottom-tab-height);\n  padding-bottom: env(safe-area-inset-bottom);\n  display: flex;\n  background: var(--surface-card);\n  border-top: 1px solid var(--border);\n  z-index: var(--z-sticky);\n}\n\n.tabbar__item {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 2px;\n  text-decoration: none;\n  color: var(--text-muted);\n  font-size: 11px;\n  font-weight: 600;\n  /* 44px minimum touch target (section 90) */\n  min-height: 44px;\n  transition: color var(--transition-fast);\n}\n\n.tabbar__item:hover { text-decoration: none; }\n.tabbar__item--active { color: var(--brand); }\n.tabbar__icon { font-size: 18px; line-height: 1; }\n\n/* On a wide screen the portal is centred rather than stretched. */\n@include desktop {\n  .portal__content { max-width: 960px; margin: 0 auto; width: 100%; }\n  .tabbar { max-width: 960px; margin: 0 auto; border-radius: var(--radius-card) var(--radius-card) 0 0; }\n}\n"] }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], subtitle: [{
            type: Input
        }], tabs: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MobileLayoutComponent, { className: "MobileLayoutComponent", filePath: "frontend/src/app/layouts/mobile-layout/mobile-layout.component.ts", lineNumber: 59 }); })();
//# sourceMappingURL=mobile-layout.component.js.map