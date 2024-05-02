import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const telekomFooterExtendedNavigationCss = "[part~='telekom-footer-extended-navigation']{--extended-navigation-background:var(\n    --telekom-color-background-surface-subtle\n  );--_max-width-container:var(--scl-grid-max-width, 1680px);--spacing-x:var(--telekom-spacing-composition-space-08);--column-gap:var(--telekom-spacing-composition-space-10);--heading-color:var(--telekom-color-text-and-icon-standard);--heading-weight:var(--telekom-typography-font-weight-bold);--link-color:var(--telekom-color-text-and-icon-standard);width:100%;display:flex;background-color:var(--extended-navigation-background);align-items:center;justify-content:center}[part~='extended-navigation-container']{max-width:var(--_max-width-container);padding-left:var(--_spacing-x-container);padding-right:var(--_spacing-x-container);width:100%;display:flex;flex-direction:column}[part~='telekom-footer-extended-navigation'] :where(ul){display:flex;flex-direction:column;align-items:flex-start;list-style:none;padding:0;margin:0;gap:0}[part~='telekom-footer-extended-navigation'] :where(a){font:var(--telekom-text-style-body);color:var(--link-color);margin-top:var(--telekom-spacing-composition-space-07);border:none}[part~='telekom-footer-extended-navigation'] :where(li:first-child){padding-top:1px}[part~='telekom-footer-extended-navigation'] :where(li:first-child) a{margin-top:0}[part~='telekom-footer-extended-navigation'] :where(a):hover{color:var(--telekom-color-text-and-icon-primary-hovered)}[part~='telekom-footer-extended-navigation'] :where(a):active{color:var(--telekom-color-text-and-icon-primary-pressed)}[part~='telekom-footer-extended-navigation'] :where(scale-telekom-footer-extended-navigation-column){display:grid;flex-direction:column;grid-column:auto / span 4}scale-telekom-footer-extended-navigation-column,scale-telekom-footer-extended-navigation-column[expanded]{border-bottom:1px solid var(--telekom-color-ui-faint)}scale-telekom-footer-extended-navigation-column:last-of-type,scale-telekom-footer-extended-navigation-column[expanded]:last-of-type{border-bottom:none;margin-bottom:var(--telekom-spacing-composition-space-07);padding-bottom:0}scale-telekom-footer-extended-navigation-column:first-of-type{margin-top:var(--telekom-spacing-composition-space-07)}@media screen and (min-width: 640px){[part~='telekom-footer-extended-navigation'] :where(li:first-child){padding-top:var(--telekom-spacing-composition-space-07)}[part~='extended-navigation-container']{display:grid;grid-template-columns:repeat(16, minmax(0, 1fr));column-gap:var(--column-gap)}scale-telekom-footer-extended-navigation-column,scale-telekom-footer-extended-navigation-column[expanded],scale-telekom-footer-extended-navigation-column:first-of-type,scale-telekom-footer-extended-navigation-column:last-of-type,scale-telekom-footer-extended-navigation-column[expanded]:last-of-type{margin-bottom:var(--telekom-spacing-composition-space-14);margin-top:var(--telekom-spacing-composition-space-14);padding-bottom:0;border-bottom:0}}@media screen and (max-width: 640px){[part~='telekom-footer-extended-navigation'] :where(ul){padding-bottom:20px}[part~='telekom-footer-extended-navigation'] :where(li:first-child){padding-top:0px}}";

const TelekomFooterExtendedNavigation = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  //   @Prop() variant: 'standard' | 'slim' = 'standard';
  render() {
    return (h(Host, { part: "telekom-footer-extended-navigation" }, h("div", { part: "extended-navigation-container" }, h("slot", null))));
  }
  get hostElement() { return this; }
  static get style() { return telekomFooterExtendedNavigationCss; }
}, [4, "scale-telekom-footer-extended-navigation"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-footer-extended-navigation"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-footer-extended-navigation":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomFooterExtendedNavigation);
      }
      break;
  } });
}

const ScaleTelekomFooterExtendedNavigation = TelekomFooterExtendedNavigation;
const defineCustomElement = defineCustomElement$1;

export { ScaleTelekomFooterExtendedNavigation, defineCustomElement };
