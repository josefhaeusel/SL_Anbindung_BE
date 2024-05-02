import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { r as renderIcon } from './render-icon.js';
import { s as statusNote } from './status-note.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './notification-badge.js';

const navIconCss = "scale-nav-icon{--spacing-mobile:var(--telekom-spacing-composition-space-00) 6px;--font-size-mobile:var(--telekom-typography-font-size-badge);--line-height-mobile:var(--telekom-typography-line-spacing-tight);--font-weight-mobile:var(--telekom-typography-font-weight-bold);--spacing-desktop:0 0 0 var(--telekom-spacing-composition-space-06);--font-size-desktop:var(--telekom-typography-font-size-small);--line-height-desktop:var(--telekom-typography-line-spacing-standard);--color:var(--telekom-color-text-and-icon-standard);--color-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-active:var(--telekom-color-text-and-icon-primary-pressed);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard)}.meta-navigation__item-link{color:var(--color);display:flex;transition:all 0.2s ease-in-out;align-items:center;font-weight:var(--font-weight-mobile);text-decoration:none;height:var(--header-nav-height)}.meta-navigation__item--selected .meta-navigation__item-link{color:var(--color)}@media screen and (forced-colors: active), (-ms-high-contrast: active){.meta-navigation__item-link{color:var(--telekom-color-text-and-icon-inverted-standard)}}.meta-navigation__item-link:hover{color:var(--color-hover)}.meta-navigation__item-link:active{color:var(--color-active)}.meta-navigation__item-link:focus{outline:var(--focus-outline)}@media (max-width: 1039px){.meta-navigation__item-link{min-width:24px;height:auto}.meta-navigation__item-link{margin:var(--spacing-mobile);font-size:var(--font-size-mobile);line-height:var(--line-height-mobile);flex-direction:column}.meta-navigation__item.mobile-menu{width:50px;text-align:center;cursor:pointer}.meta-navigation__item-link .meta-navigation__item-link-icon{width:18px;height:18px;margin-bottom:4px}}@media (min-width: 1040px){.meta-navigation__item scale-menu-flyout{height:24px}.meta-navigation__item-link{margin:var(--spacing-desktop);font-size:var(--font-size-desktop);line-height:var(--line-height-desktop)}.meta-navigation__item-link .meta-navigation__item-link-icon{margin-right:6px}}";

const NavIcon = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** (optional) href value */
    this.href = 'javascript:void(0);';
    // DEPRECATED - mobileMenuOpen should replace isMobileMenuOpen
    this.isMobileMenuOpen = false;
    this.mobileMenuOpen = false;
    this.badge = false;
  }
  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.isActive !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "isActive" is deprecated. Please use the "active" property!',
        type: 'warn',
        source: this.host,
      });
    }
    if (this.isMobileMenuOpen !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "isMobileMenuOpen" is deprecated. Please use the "mobileMenuOpen" property!',
        type: 'warn',
        source: this.host,
      });
    }
  }
  render() {
    return (h("li", { class: this.getCssClassMap() }, h("a", { class: "meta-navigation__item-link", ref: this.refMobileMenuToggle ||
        this.refMobileUserMenuToggle ||
        this.refUserMenuToggle, href: this.href, role: this.href === 'javascript:void(0);' ? 'button' : null, onClick: this.clickLink, onKeyDown: (event) => {
        if (!this.refMobileMenuToggle) {
          return;
        }
        if (['Enter', ' ', 'Escape', 'Esc'].includes(event.key)) {
          event.preventDefault();
          this.clickLink(event);
        }
      } }, this.badge || (this.badgeLabel && this.badge) || this.badgeLabel ? (h("scale-notification-badge", { label: this.badgeLabel, type: "nav-icon" }, renderIcon({
      tag: `scale-icon-${this.icon}`,
      attributes: {
        class: 'meta-navigation__item-link-icon',
        selected: this.active || this.isActive,
      },
    }))) : (renderIcon({
      tag: `scale-icon-${this.icon}`,
      attributes: {
        class: 'meta-navigation__item-link-icon',
        selected: this.active || this.isActive,
      },
    })), h("span", { class: "meta-navigation__item-label" }, h("slot", null)))));
  }
  getCssClassMap() {
    return classnames('meta-navigation__item', (this.active ||
      this.isActive ||
      this.mobileMenuOpen ||
      this.isMobileMenuOpen) &&
      'meta-navigation__item--selected', !!this.refMobileMenuToggle && 'mobile-menu');
  }
  get host() { return this; }
  static get style() { return navIconCss; }
}, [4, "scale-nav-icon", {
    "isActive": [4, "is-active"],
    "active": [4],
    "href": [1],
    "clickLink": [8, "click-link"],
    "icon": [1],
    "isMobileMenuOpen": [4, "is-mobile-menu-open"],
    "mobileMenuOpen": [4, "mobile-menu-open"],
    "refMobileMenuToggle": [8, "ref-mobile-menu-toggle"],
    "refMobileUserMenuToggle": [8, "ref-mobile-user-menu-toggle"],
    "refUserMenuToggle": [8, "ref-user-menu-toggle"],
    "badge": [4],
    "badgeLabel": [2, "badge-label"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-nav-icon", "scale-icon", "scale-notification-badge"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-nav-icon":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NavIcon);
      }
      break;
    case "scale-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-notification-badge":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { NavIcon as N, defineCustomElement as d };
