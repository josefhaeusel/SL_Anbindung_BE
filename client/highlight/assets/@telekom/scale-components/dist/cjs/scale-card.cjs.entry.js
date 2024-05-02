'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');

const cardCss = ":host{--background:var(--telekom-color-background-surface);--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--radius:var(--telekom-radius-large);--box-shadow:var(--telekom-shadow-raised-standard);--box-shadow-hover:var(--telekom-shadow-raised-hover);--box-shadow-focus:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard);--box-shadow-active:var(--telekom-shadow-raised-pressed);--spacing-body:var(--telekom-spacing-composition-space-08);--spacing-body-slotted:0;--spacing-body-slotted-interactive:0;--font-body-slotted:var(--telekom-text-style-body)}.card-border{border:1px solid transparent}.card{width:100%;overflow:hidden;box-sizing:border-box;background:var(--background);transition:var(--transition);border-radius:var(--radius);box-shadow:var(--box-shadow)}.card__body{padding:var(--spacing-body)}.card__body ::slotted(*){margin:var(--spacing-body-slotted)}.card--interactive{color:inherit;cursor:pointer;display:block;outline:none;text-decoration:none}.card--interactive:hover{box-shadow:var(--box-shadow-hover)}.card--interactive:focus{box-shadow:var(--telekom-shadow-raised-hover), var(--box-shadow-focus)}.card--interactive:active{border:none;box-shadow:var(--box-shadow-active)}.card--interactive .card__body ::slotted(*){margin:var(--spacing-body-slotted-interactive)}.card__body ::slotted(*){font:var(--font-body-slotted)}";

const Card = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), index.h("div", { class: "card-border", part: "border" }, index.h(Tag, Object.assign({ class: this.getCssClassMap(), part: index$1.classnames('base', !!this.to && 'interactive') }, (!this.to ? { role: 'group' } : {}), (!!this.to ? { href: this.to } : {}), (!!this.target ? { target: this.target } : {}), (!!this.rel ? { rel: this.rel } : {}), (!!this.label ? { ['aria-label']: this.label } : {})), index.h("div", { class: "card__body", part: "body" }, index.h("slot", null))))));
  }
  getCssClassMap() {
    return index$1.classnames('card', !!this.to && 'card--interactive');
  }
};
Card.style = cardCss;

exports.scale_card = Card;
