import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { e as emitEvent } from './utils.js';
import { d as defineCustomElement$1 } from './action-close.js';

const telekomMobileFlyoutCanvasCss = ":host{display:block;height:100%;overflow-y:auto;--max-width:572px;--spacing:var(--telekom-spacing-composition-space-07)\n    var(--telekom-spacing-composition-space-06)\n    var(--telekom-spacing-composition-space-14);background:var(--telekom-color-background-surface)}[part='base']{padding:var(--spacing);display:flex;justify-content:center;flex-direction:column;margin:0 auto;max-width:var(--max-width)}[part~='header']{display:flex;justify-content:space-between;align-items:flex-start}[part~='heading']{margin:0;font-size:var(--font-size-app-name);font-weight:var(--font-weight-app-name);line-height:var(--line-height-app-name);color:var(--telekom-color-text-and-icon-primary-standard);letter-spacing:0.02em;text-decoration:none}[part~='close-button']{position:absolute;right:var(--telekom-spacing-composition-space-06);color:var(--telekom-color-text-and-icon-standard)}[part~='close-button']:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}[part~='close-button']:active{color:var(--telekom-color-text-and-icon-primary-pressed)}[part~='body'],slot[name='row']::slotted(*){margin-top:var(--telekom-spacing-composition-space-08)}:host([type='subtle']) [part~='body']{margin-top:var(--telekom-spacing-composition-space-06)}:host([type='subtle']) [part~='meta']{margin-top:var(--telekom-spacing-composition-space-05)}";

const TelekomMobileFlyoutCanvas = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleCloseNavFlyout = createEvent(this, "scale-close-nav-flyout", 7);
    this.closeButtonLabel = 'Close';
    this.closeButtonTitle = null;
  }
  render() {
    return (h(Host, null, h("div", { part: "base" }, h("div", { part: "header" }, h("slot", { name: "heading" }, h("h2", { part: "heading" }, this.appName)), h("a", { href: "javascript:void(0)", onClick: (event) => {
        event.preventDefault();
        emitEvent(this, 'scaleCloseNavFlyout', {
          originalEvent: event,
        });
      }, title: this.closeButtonTitle, "aria-label": this.closeButtonLabel, part: "close-button" }, h("slot", { name: "close-icon" }, h("scale-icon-action-close", { decorative: true, size: 20 })))), h("div", { part: "body" }, h("slot", { name: "row" }, h("slot", { name: "mobile-before-main-nav" }), h("slot", { name: "mobile-main-nav" }), h("slot", { name: "mobile-after-main-nav" }), h("div", { part: "meta" }, h("div", null, h("slot", { name: "mobile-meta-nav-external" }), h("slot", { name: "mobile-meta-nav" })), h("div", null, h("slot", { name: "mobile-lang-switcher" }))), h("slot", { name: "mobile-bottom" }))))));
  }
  get hostElement() { return this; }
  static get style() { return telekomMobileFlyoutCanvasCss; }
}, [1, "scale-telekom-mobile-flyout-canvas", {
    "appName": [1, "app-name"],
    "appNameLink": [1, "app-name-link"],
    "appNameClick": [8, "app-name-click"],
    "closeButtonLabel": [1, "close-button-label"],
    "closeButtonTitle": [1, "close-button-title"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-mobile-flyout-canvas", "scale-icon-action-close"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-mobile-flyout-canvas":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomMobileFlyoutCanvas);
      }
      break;
    case "scale-icon-action-close":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TelekomMobileFlyoutCanvas as T, defineCustomElement as d };
