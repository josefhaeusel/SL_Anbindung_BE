import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$i } from './app-mega-menu2.js';
import { d as defineCustomElement$h } from './app-navigation-main-mobile2.js';
import { d as defineCustomElement$g } from './app-navigation-sector-mobile2.js';
import { d as defineCustomElement$f } from './app-navigation-user-menu2.js';
import { d as defineCustomElement$e } from './app-header.js';
import { d as defineCustomElement$d } from './button.js';
import { d as defineCustomElement$c } from './icon.js';
import { d as defineCustomElement$b } from './navigation-left.js';
import { d as defineCustomElement$a } from './navigation-right.js';
import { d as defineCustomElement$9 } from './logo.js';
import { d as defineCustomElement$8 } from './logo-svg.js';
import { d as defineCustomElement$7 } from './menu-flyout.js';
import { d as defineCustomElement$6 } from './menu-flyout-list.js';
import { d as defineCustomElement$5 } from './nav-icon.js';
import { d as defineCustomElement$4 } from './nav-main.js';
import { d as defineCustomElement$3 } from './nav-segment.js';
import { d as defineCustomElement$2 } from './notification-badge.js';

const appShellCss = ":host{--background:var(--telekom-color-background-canvas, #fff);--spacing-x:var(--telekom-spacing-composition-space-08);--min-height:100vh}.sr-only{position:absolute;left:-10000px;overflow:hidden}.shell{display:flex;min-height:var(--min-height);flex-direction:column}.shell .content{box-sizing:border-box;align-self:center;width:100%;background:var(--background);padding-left:var(--spacing-x);padding-right:var(--spacing-x);flex:1}@media (min-width: 1552px){.shell .content{max-width:var(--header-max-width)}}";

const Shell = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.portalName = '';
    this.claimLang = 'de';
    this.mainNavigation = [];
    this.iconNavigation = [];
    this.userNavigation = [];
    this.sectorNavigation = [];
    this.addonNavigation = [];
    this.activeRouteId = '';
    this.activeSectorId = '';
    this.sticky = false;
    this.scrolled = false;
  }
  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
  }
  render() {
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { part: "base", class: "shell" }, this.hasSlotHeader ? (h("slot", { name: "header" })) : (h("scale-app-header", { logoClick: this.logoClick, logoAriaDescribedBy: this.logoAriaDescribedBy, logoHref: this.logoHref, logoTitle: this.logoTitle, logoHideTitle: this.logoHideTitle, portalName: this.portalName, mainNavigation: this.mainNavigation, iconNavigation: this.iconNavigation, userNavigation: this.userNavigation, sectorNavigation: this.sectorNavigation, addonNavigation: this.addonNavigation, activeRouteId: this.activeRouteId, activeSectorId: this.activeSectorId, claimLang: this.claimLang, sticky: this.sticky, userMenuAriaLabel: this.userMenuAriaLabel })), h("main", { class: "content" }, h("slot", null)), h("slot", { name: "footer" }))));
  }
  get hostElement() { return this; }
  static get style() { return appShellCss; }
}, [1, "scale-app-shell", {
    "portalName": [1, "portal-name"],
    "claimLang": [1, "claim-lang"],
    "logoHref": [1, "logo-href"],
    "logoTitle": [1, "logo-title"],
    "logoHideTitle": [4, "logo-hide-title"],
    "logoClick": [8, "logo-click"],
    "logoAriaDescribedBy": [1, "logo-aria-described-by"],
    "mainNavigation": [8, "main-navigation"],
    "iconNavigation": [8, "icon-navigation"],
    "userNavigation": [8, "user-navigation"],
    "sectorNavigation": [8, "sector-navigation"],
    "addonNavigation": [8, "addon-navigation"],
    "activeRouteId": [1, "active-route-id"],
    "activeSectorId": [1, "active-sector-id"],
    "userMenuAriaLabel": [1, "user-menu-aria-label"],
    "sticky": [4],
    "styles": [1],
    "scrolled": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-app-shell", "app-mega-menu", "app-navigation-main-mobile", "app-navigation-sector-mobile", "app-navigation-user-menu", "scale-app-header", "scale-button", "scale-icon", "scale-icon-navigation-left", "scale-icon-navigation-right", "scale-logo", "scale-logo-svg", "scale-menu-flyout", "scale-menu-flyout-list", "scale-nav-icon", "scale-nav-main", "scale-nav-segment", "scale-notification-badge"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-app-shell":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Shell);
      }
      break;
    case "app-mega-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "app-navigation-main-mobile":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "app-navigation-sector-mobile":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "app-navigation-user-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "scale-app-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "scale-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "scale-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "scale-icon-navigation-left":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "scale-icon-navigation-right":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "scale-logo":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "scale-logo-svg":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "scale-menu-flyout":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "scale-menu-flyout-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "scale-nav-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "scale-nav-main":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "scale-nav-segment":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "scale-notification-badge":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ScaleAppShell = Shell;
const defineCustomElement = defineCustomElement$1;

export { ScaleAppShell, defineCustomElement };
