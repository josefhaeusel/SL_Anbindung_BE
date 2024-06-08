import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { r as renderIcon } from './render-icon.js';
import { d as defineCustomElement$2 } from './button.js';
import { d as defineCustomElement$1 } from './icon.js';

const appNavigationUserMenuCss = ":host{--border-width-divider:var(--telekom-spacing-composition-space-01);--color-divider:var(--telekom-color-ui-subtle);--color-menu-item-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-menu-item-active:var(--telekom-color-text-and-icon-primary-pressed);--box-shadow-focus:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard)}.app-navigation-user-menu{width:100%;position:relative;min-width:260px}.app-navigation-user-menu__divider{margin:var(--telekom-spacing-composition-space-06) 0;border:0;border-top:var(--border-width-divider) solid var(--color-divider)}@media (min-width: 1040px){.app-navigation-user-menu__user-info{margin:var(--telekom-spacing-composition-space-05)\n      var(--telekom-spacing-composition-space-08) 0\n      var(--telekom-spacing-composition-space-08)}}@media (max-width: 1039px){.app-navigation-user-menu__user-info{margin:var(--telekom-spacing-composition-space-08)\n      var(--telekom-spacing-composition-space-06) 0\n      var(--telekom-spacing-composition-space-06)}}.app-navigation-user-menu__user-info--name{font:var(--telekom-text-style-heading-5);margin-bottom:var(--telekom-spacing-composition-space-03)}.app-navigation-user-menu__user-info--email{color:var(--telekom-color-text-and-icon-additional);font:var(--telekom-text-style-body)}.app-navigation-user-menu__item{display:flex;font:var(--telekom-text-style-heading-6);padding:var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-06);border-radius:calc(var(--telekom-radius-small) / 2);color:var(--telekom-color-text-and-icon-standard);text-decoration:none}@media (min-width: 1040px){.app-navigation-user-menu__item{padding:var(--telekom-spacing-composition-space-04)\n      var(--telekom-spacing-composition-space-08)}}.app-navigation-user-menu__item:hover{color:var(--color-menu-item-hover)}.app-navigation-user-menu__item:active{color:var(--color-menu-item-active)}.app-navigation-user-menu__item:focus{outline:none;box-shadow:var(--box-shadow-focus)}.app-navigation-user-menu__item--icon-prefix{margin-right:var(--telekom-spacing-composition-space-04)}.app-navigation-user-menu__item--icon-suffix{margin-left:var(--telekom-spacing-composition-space-04)}.app-navigation-user-menu__button{padding:var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-06)}@media (min-width: 1040px){.app-navigation-user-menu__button{padding:var(--telekom-spacing-composition-space-04)\n      var(--telekom-spacing-composition-space-08)}}@media (min-width: 1040px){.app-navigation-user-menu{padding-bottom:var(--telekom-spacing-composition-space-03)}}";

const AppNavigationUserMenu = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.closeMenu = createEvent(this, "closeMenu", 7);
  }
  render() {
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { class: "app-navigation-user-menu" }, h("slot", null), this.navigation.map((item) => {
      if (item.type === 'divider') {
        return (h("hr", { class: "app-navigation-user-menu__divider", part: "rule-horizontal" }));
      }
      if (item.type === 'userInfo') {
        return (h("div", { class: "app-navigation-user-menu__user-info", part: "userInfo" }, h("div", { class: "app-navigation-user-menu__user-info--name scl-font-variant-heading-4" }, item.name), h("div", { class: "app-navigation-user-menu__user-info--email" }, item.email)));
      }
      if (item.type === 'item') {
        return (h("a", { href: item.href || 'javascript:void(0);', target: item.target || '_self', tabindex: 0, class: "app-navigation-user-menu__item", part: "item", onClick: (e) => {
            e.stopImmediatePropagation();
            if (item.onClick) {
              item.onClick(e);
            }
            this.hide();
          }, onKeyDown: (e) => {
            if ([' ', 'Enter'].includes(e.key)) {
              if (item.onClick) {
                e.stopImmediatePropagation();
                e.preventDefault();
                item.onClick(e);
              }
              this.hide();
            }
          } }, item.icon &&
          (!item.iconPosition || item.iconPosition === 'prefix')
          ? renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {
              class: `app-navigation-user-menu__item--icon-prefix`,
            },
          })
          : null, item.name, item.icon && item.iconPosition === 'suffix'
          ? renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {
              class: `app-navigation-user-menu__item--icon-suffix`,
            },
          })
          : null));
      }
      if (item.type === 'button') {
        return (h("scale-button", { class: "app-navigation-user-menu__button", part: "button", onClick: (e) => {
            if (item.onClick) {
              e.stopImmediatePropagation();
              e.preventDefault();
              item.onClick(e);
            }
            this.hide();
          }, onKeyDown: (e) => {
            if ([' ', 'Enter'].includes(e.key)) {
              if (item.onClick) {
                e.stopImmediatePropagation();
                e.preventDefault();
                item.onClick(e);
              }
              this.hide();
            }
          }, href: item.href, variant: item.variant || 'primary' }, item.icon &&
          (!item.iconPosition || item.iconPosition === 'prefix')
          ? renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {},
          })
          : null, item.name, item.icon && item.iconPosition === 'suffix'
          ? renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {},
          })
          : null));
      }
    }))));
  }
  get hostElement() { return this; }
  static get style() { return appNavigationUserMenuCss; }
}, [1, "app-navigation-user-menu", {
    "hide": [16],
    "navigation": [8],
    "styles": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["app-navigation-user-menu", "scale-button", "scale-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "app-navigation-user-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AppNavigationUserMenu);
      }
      break;
    case "scale-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { AppNavigationUserMenu as A, defineCustomElement as d };
