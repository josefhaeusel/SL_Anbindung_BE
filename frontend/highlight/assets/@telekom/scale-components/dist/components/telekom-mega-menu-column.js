import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { d as defineCustomElement$1 } from './navigation-right.js';

const telekomMegaMenuColumnCss = ":host{--spacing-x-icon:1ch;grid-column:auto / span 3}:host(:first-child){grid-column:3 / span 3}[part~='base']{display:flex;flex-direction:column}[part~='icon']{transform:translateY(-0.125ch)}@media screen and (min-width: 1296px){[part~='base']{flex-direction:row}[part~='icon'] ::slotted(*){padding-right:var(--spacing-x-icon)}}[part~='heading']{display:flex;align-items:flex-start;height:calc(var(--telekom-typography-line-spacing-standard) * 2rem);font-weight:var(--telekom-typography-font-weight-bold);line-height:var(--telekom-typography-line-spacing-tight)}[part~='heading-has-link'] [part~='heading']:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}[part~='heading-has-link'] [part~='heading']:active{color:var(--telekom-color-text-and-icon-primary-pressed)}[part~='icon-arrow-right']{margin-top:0.5ch;margin-left:0.5ch}";

const TelekomMegaMenuColumn = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.headingLevel = 2;
    this.headingHasLink = false;
  }
  connectedCallback() {
    if (this.hostElement.querySelector('a[slot="heading"]')) {
      this.headingHasLink = true;
    }
  }
  render() {
    return (h(Host, null, h("div", { part: classnames({
        base: true,
        'heading-has-link': this.headingHasLink,
      }) }, h("div", { part: "icon", "aria-hidden": "true" }, h("slot", { name: "icon" })), h("div", { part: "body" }, h("div", { part: "heading", role: "heading", "aria-level": this.headingLevel }, h("slot", { name: "heading" }), h("scale-icon-navigation-right", { part: "icon-arrow-right", size: 11, selected: true })), h("slot", null)))));
  }
  get hostElement() { return this; }
  static get style() { return telekomMegaMenuColumnCss; }
}, [1, "scale-telekom-mega-menu-column", {
    "headingLevel": [2, "heading-level"],
    "headingHasLink": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-mega-menu-column", "scale-icon-navigation-right"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-mega-menu-column":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomMegaMenuColumn);
      }
      break;
    case "scale-icon-navigation-right":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TelekomMegaMenuColumn as T, defineCustomElement as d };
