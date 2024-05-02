'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const utils = require('./utils-e9c3b953.js');

const collapsibleCss = ":host{--spacing-y:var(--telekom-spacing-composition-space-06);--font:var(--telekom-text-style-heading-5);--border-width-button:var(--telekom-spacing-composition-space-02);--radius-button:var(--telekom-radius-small);--spacing-left-button:0;--spacing-left-button-text:var(--telekom-spacing-composition-space-04);--color-button-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-button-active:var(--telekom-color-text-and-icon-primary-pressed);--background-button-hover:none;--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--spacing-right-content:var(--telekom-spacing-composition-space-14);--spacing-left-content:34px;--spacing-top-content:var(--telekom-spacing-composition-space-06);--spacing-bottom-content:var(--telekom-spacing-composition-space-08)}.collapsible{position:relative;margin:var(--spacing-y) 0}.collapsible--expanded:before{top:0;left:0;right:0;width:100%;border:var(--telekom-spacing-composition-space-01) solid transparent;content:'';display:block;position:absolute;pointer-events:none;bottom:calc(-1 * var(--spacing-y))}.collapsible__heading{margin:0}.collapsible__button{color:currentColor;width:100%;display:flex;text-align:left;align-items:center;padding-top:0;border-color:transparent;border-style:solid;padding-right:0;padding-bottom:0;background-color:transparent;font:var(--font);border-width:var(--border-width-button);border-radius:var(--radius-button);padding-left:var(--spacing-left-button);font-family:inherit;word-spacing:inherit;letter-spacing:inherit}.collapsible__button-text{margin-left:var(--spacing-left-button-text)}.collapsible__button:hover{cursor:pointer;color:var(--color-button-hover);background-color:var(--background-button-hover)}.collapsible__button:active{color:var(--color-button-active);background-color:transparent}.collapsible__button:focus{outline:var(--focus-outline)}.collapsible__icon{flex-shrink:0}.collapsible__icon-right{margin-left:auto}.collapsible__button[aria-expanded='true'] .collapsible__icon{}.collapsible__content{padding-right:var(--spacing-right-content);padding-left:var(--spacing-left-content);margin-top:var(--spacing-top-content);margin-bottom:var(--spacing-bottom-content)}::slotted(*:not([slot='heading'])){font:var(--telekom-text-style-body)}";

const DEFAULT_ICON_SIZE = 24;
let i = 0;
const Collapsible = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scaleExpand = index.createEvent(this, "scale-expand", 7);
    this.scaleExpandLegacy = index.createEvent(this, "scaleExpand", 7);
    /** Default aria-level for heading */
    this.headingLevel = 2;
    this.iconLocation = 'left';
    this.handleClick = () => {
      this.expanded = !this.expanded;
      utils.emitEvent(this, 'scaleExpand', { expanded: this.expanded });
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
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), index.h("div", { class: this.getCssClassMap(), part: index$1.classnames('base', this.expanded && 'expanded') }, index.h("h2", { "aria-level": this.headingLevel, class: "collapsible__heading", part: "heading" }, index.h("button", { id: this.headingId, class: "collapsible__button", part: "button", onClick: this.handleClick, "aria-expanded": this.expanded ? 'true' : 'false', "aria-controls": this.panelId }, this.iconLocation === 'left' ? (index.h(IconTag, { size: DEFAULT_ICON_SIZE, decorative: true, class: "collapsible__icon", part: index$1.classnames('icon', this.expanded && 'expanded') })) : null, index.h("span", { ref: (el) => (this.headingElement = el), class: "collapsible__button-text", part: "button-text" }, index.h("slot", { name: "heading" })), this.iconLocation === 'right' ? (index.h(IconTag, { size: DEFAULT_ICON_SIZE, decorative: true, class: "collapsible__icon collapsible__icon-right", part: index$1.classnames('icon', this.expanded && 'expanded') })) : null)), index.h("div", { id: this.panelId, role: "region", "aria-labelledby": this.headingId, hidden: !this.expanded, class: "collapsible__content", part: "content" }, index.h("slot", null)))));
  }
  getCssClassMap() {
    return index$1.classnames('collapsible', this.expanded && 'collapsible--expanded');
  }
  get hostElement() { return index.getElement(this); }
};
Collapsible.style = collapsibleCss;

exports.scale_collapsible = Collapsible;
