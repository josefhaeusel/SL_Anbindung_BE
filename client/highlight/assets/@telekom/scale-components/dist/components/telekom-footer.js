import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';

const telekomFooterCss = ".scale-telekom-footer{--font-size:var(--telekom-typography-font-size-caption);--font-color:var(--telekom-color-text-and-icon-white-standard);--font-large:var(--telekom-text-style-ui);--background-footer:var(--telekom-color-ui-black);--background-footer-minimal:var(--telekom-color-background-canvas);--_nav-items-bottom-margin:var(--telekom-spacing-composition-space-08);--_nav-items-spacing:var(--telekom-spacing-composition-space-05)}.scale-telekom-footer :where(ul),.scale-telekom-footer[type='minimal'] :where(ul){display:flex;flex-wrap:wrap;align-items:flex-start;flex-direction:column;gap:var(--_nav-items-spacing);padding:0;margin:0;width:100%;color:var(--font-color);list-style:none}.scale-telekom-footer[type='minimal'] scale-telekom-footer-content{--background-footer:var(--background-footer-minimal);--_font-color:var(--telekom-color-text-and-icon-additional);--_display-logo:none;--_navigation-container-padding:var(--telekom-spacing-composition-space-06) 0\n    var(--telekom-spacing-composition-space-06) 0;--_nav-items-bottom-margin:0}.scale-telekom-footer :where(a,span),.scale-telekom-footer[type='minimal'] :where(a,span){display:flex;justify-content:center;font-size:var(--font-size);color:var(--font-color);line-height:140%;text-decoration:none;border:1px solid rgba(0, 0, 0, 0);border-radius:2px}.scale-telekom-footer[type='minimal'] :where(a,span){color:var(--telekom-color-text-and-icon-standard)}.scale-telekom-footer[type='minimal'] :where(ul){margin-bottom:0}.scale-telekom-footer[type='minimal'] a:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}.scale-telekom-footer[type='minimal'] a:active{color:var(--telekom-color-text-and-icon-primary-pressed)}.scale-telekom-footer :where(a:hover){border-radius:0;border-bottom:1px solid var(--font-color)}.scale-telekom-footer :where(a:active){color:var(--telekom-color-text-and-icon-white-additional);border-bottom:1px solid var(--telekom-color-text-and-icon-white-additional)}.scale-telekom-footer[type='minimal'] :where(a:focus-visible){outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);outline-offset:1px}.scale-telekom-footer:not([type='minimal']) :where(a:focus-visible){outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-on-dark-background);outline-offset:1px}.scale-telekom-footer:not([type='minimal']) scale-telekom-footer-extended-navigation-column :where(a:focus-visible){outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);outline-offset:1px}@media screen and (min-width: 640px){.scale-telekom-footer :where(ul),.scale-telekom-footer[type='minimal'] :where(ul){display:flex;flex-direction:row;align-items:center;list-style:none;column-gap:var(--_nav-items-spacing);row-gap:var(--telekom-spacing-composition-space-03)}}@media screen and (min-width: 1040px){.scale-telekom-footer :where(ul),.scale-telekom-footer[type='minimal'] :where(ul){--_nav-items-spacing:var(--telekom-spacing-composition-space-08);row-gap:var(--telekom-spacing-composition-space-04)}.scale-telekom-footer :where(a,span){font:var(--font-large)}}@media screen and (min-width: 1296px){.scale-telekom-footer :where(ul),.scale-telekom-footer[type='minimal'] :where(ul){--_nav-items-spacing:var(--telekom-spacing-composition-space-14)}}";

const TelekomFooter = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.type = 'standard';
  }
  render() {
    return (h(Host, { class: classnames('scale-telekom-footer', {
      // slim: this.type === 'minimal',
      }) }, h("slot", null)));
  }
  get hostElement() { return this; }
  static get style() { return telekomFooterCss; }
}, [4, "scale-telekom-footer", {
    "type": [513]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-footer"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomFooter);
      }
      break;
  } });
}

export { TelekomFooter as T, defineCustomElement as d };
