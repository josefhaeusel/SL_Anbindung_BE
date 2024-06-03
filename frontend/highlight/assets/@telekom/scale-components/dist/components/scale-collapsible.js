import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { e as emitEvent } from './utils.js';

const collapsibleCss = ":host{--spacing-y:var(--telekom-spacing-composition-space-06);--font:var(--telekom-text-style-heading-5);--border-width-button:var(--telekom-spacing-composition-space-02);--radius-button:var(--telekom-radius-small);--spacing-left-button:0;--spacing-left-button-text:var(--telekom-spacing-composition-space-04);--color-button-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-button-active:var(--telekom-color-text-and-icon-primary-pressed);--background-button-hover:none;--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--spacing-right-content:var(--telekom-spacing-composition-space-14);--spacing-left-content:34px;--spacing-top-content:var(--telekom-spacing-composition-space-06);--spacing-bottom-content:var(--telekom-spacing-composition-space-08)}.collapsible{position:relative;margin:var(--spacing-y) 0}.collapsible--expanded:before{top:0;left:0;right:0;width:100%;border:var(--telekom-spacing-composition-space-01) solid transparent;content:'';display:block;position:absolute;pointer-events:none;bottom:calc(-1 * var(--spacing-y))}.collapsible__heading{margin:0}.collapsible__button{color:currentColor;width:100%;display:flex;text-align:left;align-items:center;padding-top:0;border-color:transparent;border-style:solid;padding-right:0;padding-bottom:0;background-color:transparent;font:var(--font);border-width:var(--border-width-button);border-radius:var(--radius-button);padding-left:var(--spacing-left-button);font-family:inherit;word-spacing:inherit;letter-spacing:inherit}.collapsible__button-text{margin-left:var(--spacing-left-button-text)}.collapsible__button:hover{cursor:pointer;color:var(--color-button-hover);background-color:var(--background-button-hover)}.collapsible__button:active{color:var(--color-button-active);background-color:transparent}.collapsible__button:focus{outline:var(--focus-outline)}.collapsible__icon{flex-shrink:0}.collapsible__icon-right{margin-left:auto}.collapsible__button[aria-expanded='true'] .collapsible__icon{}.collapsible__content{padding-right:var(--spacing-right-content);padding-left:var(--spacing-left-content);margin-top:var(--spacing-top-content);margin-bottom:var(--spacing-bottom-content)}::slotted(*:not([slot='heading'])){font:var(--telekom-text-style-body)}";

const DEFAULT_ICON_SIZE = 24;
let i = 0;
const Collapsible = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleExpand = createEvent(this, "scale-expand", 7);
    this.scaleExpandLegacy = createEvent(this, "scaleExpand", 7);
    /** Default aria-level for heading */
    this.headingLevel = 2;
    this.iconLocation = 'left';
    this.handleClick = () => {
      this.expanded = !this.expanded;
      emitEvent(this, 'scaleExpand', { expanded: this.expanded });
    };
  }
  componentWillLoad() {
    const j = i++;
    this.headingId = 'collapsable-heading-' + j;
    this.panelId = 'collapsable-panel-' + j;
  }
  componentDidLoad() {
    this.setHeadingFromLightDOM();
  }
  /**
   * @deprecated Safe to remove in 4.0
   * @see https://github.com/telekom/scale/pull/319
   */
  setHeadingFromLightDOM() {
    const lightHeading = this.hostElement.querySelector(':first-child');
    if (lightHeading == null) {
      return;
    }
    // Only proceed if the element is not a heading and has no `slot` attribute
    const isHeading = lightHeading.tagName.charAt(0).toUpperCase() === 'H';
    const hasSlotAttr = lightHeading.hasAttribute('slot');
    if (isHeading && !hasSlotAttr) {
      this.headingElement.innerHTML = lightHeading.innerHTML;
      lightHeading.style.display = 'none';
    }
  }
  render() {
    const IconTag = this.expanded
      ? 'scale-icon-navigation-collapse-down'
      : 'scale-icon-navigation-right';
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { class: this.getCssClassMap(), part: classnames('base', this.expanded && 'expanded') }, h("h2", { "aria-level": this.headingLevel, class: "collapsible__heading", part: "heading" }, h("button", { id: this.headingId, class: "collapsible__button", part: "button", onClick: this.handleClick, "aria-expanded": this.expanded ? 'true' : 'false', "aria-controls": this.panelId }, this.iconLocation === 'left' ? (h(IconTag, { size: DEFAULT_ICON_SIZE, decorative: true, class: "collapsible__icon", part: classnames('icon', this.expanded && 'expanded') })) : null, h("span", { ref: (el) => (this.headingElement = el), class: "collapsible__button-text", part: "button-text" }, h("slot", { name: "heading" })), this.iconLocation === 'right' ? (h(IconTag, { size: DEFAULT_ICON_SIZE, decorative: true, class: "collapsible__icon collapsible__icon-right", part: classnames('icon', this.expanded && 'expanded') })) : null)), h("div", { id: this.panelId, role: "region", "aria-labelledby": this.headingId, hidden: !this.expanded, class: "collapsible__content", part: "content" }, h("slot", null)))));
  }
  getCssClassMap() {
    return classnames('collapsible', this.expanded && 'collapsible--expanded');
  }
  get hostElement() { return this; }
  static get style() { return collapsibleCss; }
}, [1, "scale-collapsible", {
    "expanded": [1540],
    "headingLevel": [2, "heading-level"],
    "styles": [1],
    "iconLocation": [1, "icon-location"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-collapsible"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-collapsible":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Collapsible);
      }
      break;
  } });
}

const ScaleCollapsible = Collapsible;
const defineCustomElement = defineCustomElement$1;

export { ScaleCollapsible, defineCustomElement };
