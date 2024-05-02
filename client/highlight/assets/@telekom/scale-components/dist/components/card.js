import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';

const cardCss = ":host{--background:var(--telekom-color-background-surface);--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--radius:var(--telekom-radius-large);--box-shadow:var(--telekom-shadow-raised-standard);--box-shadow-hover:var(--telekom-shadow-raised-hover);--box-shadow-focus:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard);--box-shadow-active:var(--telekom-shadow-raised-pressed);--spacing-body:var(--telekom-spacing-composition-space-08);--spacing-body-slotted:0;--spacing-body-slotted-interactive:0;--font-body-slotted:var(--telekom-text-style-body)}.card-border{border:1px solid transparent}.card{width:100%;overflow:hidden;box-sizing:border-box;background:var(--background);transition:var(--transition);border-radius:var(--radius);box-shadow:var(--box-shadow)}.card__body{padding:var(--spacing-body)}.card__body ::slotted(*){margin:var(--spacing-body-slotted)}.card--interactive{color:inherit;cursor:pointer;display:block;outline:none;text-decoration:none}.card--interactive:hover{box-shadow:var(--box-shadow-hover)}.card--interactive:focus{box-shadow:var(--telekom-shadow-raised-hover), var(--box-shadow-focus)}.card--interactive:active{border:none;box-shadow:var(--box-shadow-active)}.card--interactive .card__body ::slotted(*){margin:var(--spacing-body-slotted-interactive)}.card__body ::slotted(*){font:var(--font-body-slotted)}";

const Card = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** (optional) Link card */
    this.to = '';
    /** (optional) Label of the card */
    this.label = '';
    /** (optional) Link card target */
    this.target = '_self';
    /** (optional) Link card rel */
    this.rel = '';
  }
  render() {
    const Tag = !!this.to ? 'a' : 'div';
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { class: "card-border", part: "border" }, h(Tag, Object.assign({ class: this.getCssClassMap(), part: classnames('base', !!this.to && 'interactive') }, (!this.to ? { role: 'group' } : {}), (!!this.to ? { href: this.to } : {}), (!!this.target ? { target: this.target } : {}), (!!this.rel ? { rel: this.rel } : {}), (!!this.label ? { ['aria-label']: this.label } : {})), h("div", { class: "card__body", part: "body" }, h("slot", null))))));
  }
  getCssClassMap() {
    return classnames('card', !!this.to && 'card--interactive');
  }
  static get style() { return cardCss; }
}, [1, "scale-card", {
    "to": [1],
    "label": [1],
    "target": [1],
    "rel": [1],
    "styles": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-card"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-card":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Card);
      }
      break;
  } });
}

export { Card as C, defineCustomElement as d };
