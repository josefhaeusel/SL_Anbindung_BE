import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './logo.js';
import { d as defineCustomElement$1 } from './logo-svg.js';

const telekomFooterContentCss = ":host{--_max-width-container:none;--_spacing-x-container:var(--telekom-spacing-composition-space-06);--_nav-items-bottom-margin:var(--telekom-spacing-composition-space-08);--_nav-items-spacing:var(--telekom-spacing-composition-space-05);--_logo-top-margin:var(--telekom-spacing-composition-space-12);--_logo-bottom-margin:var(--telekom-spacing-composition-space-12);--_font-color:var(--telekom-color-text-and-icon-white-standard);--_font-size:var(--telekom-typography-font-size-caption);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--_display-logo:flex;--_navigation-container-padding:0 0 0 0}footer{width:100%;background-color:var(--background-footer);display:flex;justify-content:center;flex-direction:column;padding-bottom:var(--_nav-items-bottom-margin);align-items:center}[part~='base']{height:100%;max-width:var(--_max-width-container);padding-left:var(--_spacing-x-container);padding-right:var(--_spacing-x-container);position:relative;display:flex;flex:1;flex-direction:column;width:-moz-available;width:-webkit-fill-available;width:fill-available}[part~='logo']{display:var(--_display-logo);justify-content:center;height:100%;width:100%;margin-top:var(--_logo-top-margin);margin-bottom:var(--_logo-bottom-margin)}[part~='body']{display:flex;flex-direction:column;width:100%;padding:var(--_navigation-container-padding);margin:0;bottom:0}[part~='notice']{color:var(--_font-color);display:flex;flex:1 0 auto;margin-bottom:var(--telekom-spacing-composition-space-07);font-size:var(--_font-size);line-height:140%;margin-right:var(--telekom-spacing-composition-space-07)}[part~='app-logo']{--logo-size:var(--telekom-spacing-composition-space-11)}.scale-icon{height:16px;width:16px;margin-right:9px}@media screen and (min-width: 640px){:host{--_logo-top-margin:var(--telekom-spacing-composition-space-10);--_logo-bottom-margin:var(--telekom-spacing-composition-space-14);--_nav-items-spacing:var(--telekom-spacing-composition-space-06)}[part~='body']{flex-direction:column}[part~='navigation'] ul{list-style:none;display:flex;flex-direction:row;align-items:center}[part~='notice']{margin-bottom:var(--telekom-spacing-composition-space-04)}}@media screen and (min-width: 1040px){:host{--_logo-top-margin:var(--telekom-spacing-composition-space-14);--_logo-bottom-margin:var(--telekom-spacing-composition-space-18);--_nav-items-spacing:var(--telekom-spacing-composition-space-08);--_slim-padding:var(--telekom-spacing-composition-space-08);--_font-size:var(--telekom-typography-font-size-body);--_spacing-x-container:var(--telekom-spacing-composition-space-08)}[part~='body']{flex-direction:row}:host [part~='app-logo']{--logo-size:var(--telekom-spacing-composition-space-13)}:host [part~='notice']{margin-bottom:0}}@media screen and (min-width: 1296px){:host{--_logo-top-margin:var(--telekom-spacing-composition-space-16);--_logo-bottom-margin:var(--telekom-spacing-composition-space-19);--_nav-items-bottom-margin:var(--telekom-spacing-composition-space-10);--_nav-items-spacing:var(--telekom-spacing-composition-space-14);--_slim-padding:var(--telekom-spacing-composition-space-10)}:host [part~='app-logo']{--logo-size:var(--telekom-spacing-composition-space-14)}}@media screen and (min-width: 1680px){:host{--_max-width-container:var(--scl-grid-max-width, 1504px);--_logo-top-margin:var(--telekom-spacing-composition-space-18);--_logo-bottom-margin:96px}:host [part~='app-logo']{--logo-size:var(--telekom-spacing-composition-space-16)}}";

const TelekomFooterContent = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** (optional) Logo link */
    this.logoHref = '';
    /** (optional) set logo specific title */
    this.logoTitle = 'Telekom Logo';
    /** (optional) set logo specific title */
    this.logoHideTitle = false;
  }
  render() {
    return (h(Host, null, h("footer", null, h("slot", { name: "extended-navigation" }), h("div", { part: "base" }, h("div", { part: "logo" }, h("scale-logo", { part: "app-logo", variant: "white", style: {
        '--focus-outline': 'var(--telekom-line-weight-highlight) solid var(--telekom-color-functional-focus-on-dark-background)',
      }, transparent: true, href: this.logoHref, logoHideTitle: this.logoHideTitle, logoTitle: this.logoHideTitle ? undefined : this.logoTitle, focusable: this.logoHref ? true : false })), h("div", { part: "body" }, h("div", { part: "notice" }, h("slot", { name: "notice" })), h("div", { part: "navigation" }, h("slot", { name: "navigation" })))))));
  }
  static get style() { return telekomFooterContentCss; }
}, [1, "scale-telekom-footer-content", {
    "logoHref": [1, "logo-href"],
    "logoTitle": [1, "logo-title"],
    "logoHideTitle": [4, "logo-hide-title"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-footer-content", "scale-logo", "scale-logo-svg"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-footer-content":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomFooterContent);
      }
      break;
    case "scale-logo":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-logo-svg":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TelekomFooterContent as T, defineCustomElement as d };
