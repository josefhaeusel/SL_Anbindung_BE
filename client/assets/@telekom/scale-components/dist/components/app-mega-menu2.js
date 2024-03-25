import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { s as statusNote } from './status-note.js';

const appMegaMenuCss = "app-mega-menu{--box-shadow:var(--telekom-shadow-top);--spacing-y:2.125rem;--spacing-right:var(--telekom-spacing-composition-space-06);--spacing-left:var(--telekom-spacing-composition-space-08);--background:var(--telekom-color-background-surface);--color-selected:var(--telekom-color-text-and-icon-primary-standard);--color-hover:var(--telekom-color-text-and-icon-primary-hovered);--font-size-row-title:var(--telekom-typography-font-size-body);--spacing-bottom-row-title:1.125rem;--font-weight-row-title:var(--telekom-typography-font-weight-extra-bold);--color-row-title:var(--telekom-color-text-and-icon-standard);--font-size-row-item:var(--telekom-typography-font-size-body);--line-height-row-item:var(--telekom-typography-line-spacing-loose);--font-weight-row-item:var(--telekom-typography-font-weight-medium);--color-row-item:var(--telekom-color-text-and-icon-standard);--spacing-bottom-row-item:var(--telekom-spacing-composition-space-04)}.mega-menu{width:100%;position:absolute;top:calc(var(--header-brand-height) * -1);left:0;border-radius:0 0 var(--header-border-radius) var(--header-border-radius);padding-top:calc(var(--header-nav-height) + var(--header-brand-height));display:none;pointer-events:none;transition:none;box-shadow:var(--box-shadow)}.mega-menu__wrapper{padding:var(--spacing-y) var(--spacing-right) var(--spacing-y)\n    var(--spacing-left);background:var(--background);pointer-events:none;border-radius:var(--header-border-radius)}.mega-menu__container{max-width:1168px;margin:0 auto;display:grid;grid-template-columns:repeat(5, minmax(min-content, 240px));list-style:none;padding-left:var(--telekom-spacing-composition-space-10)}.mega-menu__row-title{cursor:default;font-size:var(--font-size-row-title);margin-bottom:var(--spacing-bottom-row-title);font-weight:var(--font-weight-row-title);color:var(--color-row-title)}.mega-menu__row-item{font-size:var(--font-size-row-item);line-height:var(--line-height-row-item);font-weight:var(--font-weight-row-item);color:var(--color-row-item);margin-bottom:var(--spacing-bottom-row-item);text-decoration:none;transition:color, border 0.15s ease-in-out;display:block;margin-bottom:7px}.mega-menu__row-item:hover,.mega-menu__row-item:hover span{color:var(--color-hover)}.mega-menu__row-item.active span{padding-bottom:2px;margin-bottom:-2px;display:inline-block;border-bottom:1px solid var(--color-selected)}.mega-menu__row-item.active{color:var(--color-selected)}.mega-menu__row-item.active:hover{color:var(--color-hover)}.mega-menu__row-item.active:hover span{color:var(--color-hover);border-bottom:1px solid var(--color-hover)}.mega-menu__row li{list-style:none}.mega-menu__row ul{padding-inline-start:0}@media screen and (forced-colors: active), (-ms-high-contrast: active){.mega-menu{border:1px solid hsl(0, 0%, 100%)}}";

const MegaMenu = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.navigation = [];
  }
  componentWillLoad() {
    this.hasCustomBody = !!this.hostElement.querySelector('[slot="custom-body"]');
  }
  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.isActive !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "isActive" is deprecated. Please use the "active" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  render() {
    return (h("div", { class: "mega-menu" }, h("div", { class: "mega-menu__wrapper" }, this.hasCustomBody ? (h("slot", { name: "custom-body" })) : (h("ul", { class: "mega-menu__container" }, this.navigation.map((child) => (h("li", { class: "mega-menu__row" }, h("div", { class: "mega-menu__row-title" }, child.name), h("ul", null, child.children &&
      child.children.length > 0 &&
      child.children.map((menuItem) => (h("li", null, h("a", { class: `mega-menu__row-item ${this.activeRouteId === menuItem.id ? 'active' : ''}`, "aria-current": this.activeRouteId === menuItem.id
          ? 'true'
          : 'false', href: menuItem.href || 'javascript:void(0);', tabIndex: this.active || this.isActive ? 0 : -1, onClick: (event) => {
          this.hide();
          if (typeof menuItem.onClick === 'function') {
            menuItem.onClick(event);
          }
        }, onKeyDown: (event) => {
          if (['Escape', 'Esc'].includes(event.key)) {
            this.hide();
          }
        } }, h("span", null, menuItem.name), this.activeRouteId === menuItem.id && (h("span", { class: "sr-only" }, "active")))))))))))))));
  }
  get hostElement() { return this; }
  static get style() { return appMegaMenuCss; }
}, [4, "app-mega-menu", {
    "navigation": [16],
    "hide": [16],
    "activeRouteId": [1, "active-route-id"],
    "isActive": [4, "is-active"],
    "active": [4]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["app-mega-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "app-mega-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MegaMenu);
      }
      break;
  } });
}

export { MegaMenu as M, defineCustomElement as d };
