import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const telekomMegaMenuCss = ".scale-telekom-mega-menu{--spacing-y:var(--telekom-spacing-composition-space-18);--column-gap:var(--telekom-spacing-composition-space-10);--max-width-container:var(--scl-grid-max-width, 1504px);--spacing-x:var(--telekom-spacing-composition-space-08);--grid-template-columns:repeat(16, minmax(0, 1fr));display:block;padding-left:var(--spacing-x);padding-right:var(--spacing-x);margin-left:auto;margin-right:auto;max-width:var(--max-width-container)}.scale-telekom-mega-menu-container{box-sizing:border-box;display:grid;grid-template-columns:var(--grid-template-columns);grid-column:auto;column-gap:var(--column-gap);padding-top:var(--spacing-y);padding-bottom:var(--spacing-y);font-size:var(--telekom-typography-font-size-body);line-height:var(--telekom-typography-line-spacing-standard)}.scale-telekom-mega-menu :where(ul,ol){list-style:none;margin:0;padding:0}.scale-telekom-mega-menu :where(a){display:inline-block;color:var(--telekom-color-text-and-icon-standard);text-decoration:none}.scale-telekom-mega-menu :where(ul a){width:100%}.scale-telekom-mega-menu .scale-icon{width:20px;height:20px}.scale-telekom-mega-menu :where(a):hover{color:var(--telekom-color-text-and-icon-primary-hovered)}.scale-telekom-mega-menu :where(a):active{color:var(--telekom-color-text-and-icon-primary-pressed)}.scale-telekom-mega-menu :where(a):focus-visible{outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);outline-offset:1px;border-radius:var(--telekom-radius-small)}.scale-telekom-mega-menu :where(li+li){margin-top:var(--telekom-spacing-composition-space-07)}@media screen and (min-width: 1040px){.scale-telekom-mega-menu{--spacing-x:var(--telekom-spacing-composition-space-08)}}.scale-telekom-mega-menu[children-too-many] scale-telekom-mega-menu-column:first-child{grid-column:2 / span 3}@media screen and (min-width: 1680px){.scale-telekom-mega-menu[children-too-many] scale-telekom-mega-menu-column:first-child{grid-column:1 / span 3}}";

const TelekomMegaMenu = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** :) */
    this.childrenTooMany = false;
  }
  connectedCallback() {
    if (this.hostElement.children.length > 4) {
      this.childrenTooMany = true;
    }
  }
  render() {
    return (h(Host, { class: "scale-telekom-mega-menu", "children-too-many": this.childrenTooMany }, h("div", { class: "scale-telekom-mega-menu-container" }, h("slot", null))));
  }
  get hostElement() { return this; }
  static get style() { return telekomMegaMenuCss; }
}, [4, "scale-telekom-mega-menu", {
    "childrenTooMany": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-mega-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-mega-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomMegaMenu);
      }
      break;
  } });
}

export { TelekomMegaMenu as T, defineCustomElement as d };
