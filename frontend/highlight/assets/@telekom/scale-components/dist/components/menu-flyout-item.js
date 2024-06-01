import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { e as emitEvent } from './utils.js';
import { d as defineCustomElement$2 } from './action-checkmark.js';
import { d as defineCustomElement$1 } from './navigation-right.js';

const menuFlyoutItemCss = ":host{--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);display:block;position:relative;outline-color:transparent;padding-left:var(--telekom-spacing-composition-space-02);padding-right:var(--telekom-spacing-composition-space-02);--_min-width:fit-content;--_min-width-moz:-moz-fit-content}*{-webkit-tap-highlight-color:rgba(255, 255, 255, 0)}.menu-flyout-item{position:relative;display:flex;align-items:stretch;text-align:left;font-size:var(--telekom-typography-font-size-body);line-height:2.635em;padding:0\n    calc(\n      var(--telekom-spacing-composition-space-08) -\n        var(--telekom-spacing-composition-space-02)\n    );user-select:none;white-space:nowrap;border-radius:0;cursor:pointer;color:var(--telekom-color-text-and-icon-standard);max-width:calc(\n    100vw - 2 * var(--telekom-spacing-composition-space-08) - 2 * 10px\n  );overflow:hidden;min-width:var(--_min-width-moz);min-width:var(--_min-width)}.menu-flyout-item:focus:not(.menu-flyout-item--disabled),.menu-flyout-item:hover:not(.menu-flyout-item--disabled){color:var(--telekom-color-text-and-icon-primary-hovered)}:host(:focus) .menu-flyout-item:not(.menu-flyout-item--disabled){color:var(--telekom-color-text-and-icon-standard)}:host(:focus) .menu-flyout-item:hover:not(.menu-flyout-item--disabled){color:var(--telekom-color-text-and-icon-primary-hovered)}:host(:focus){outline:none}:host(:focus) .menu-flyout-item{outline:var(--focus-outline);border-radius:var(--telekom-radius-small)}:host(:active) .menu-flyout-item:not(.menu-flyout-item--disabled){color:var(--telekom-color-text-and-icon-primary-pressed)}:host([aria-expanded='true']) .menu-flyout-item{color:var(--telekom-color-text-and-icon-primary-standard)}.menu-flyout-item--disabled{outline:none;color:var(--telekom-color-text-and-icon-disabled);cursor:not-allowed}:host([active])::before{content:'';display:block;position:absolute;top:0;left:0;height:100%;width:0;background-color:var(--telekom-color-primary-standard);border-left:var(--telekom-spacing-composition-space-02) solid transparent}.menu-flyout-item--active{color:var(--telekom-color-text-and-icon-primary-standard)}@media screen and (forced-colors: active), (-ms-high-contrast: active){.menu-flyout-item--disabled:not(.menu-flyout-item--disabled),.menu-flyout-item--active:not(.menu-flyout-item--disabled){color:white;stroke:white}}.menu-flyout-item__label{flex:1 1 0;overflow:hidden;text-overflow:ellipsis}.menu-flyout-item__prefix{flex:0 0 auto;display:flex;align-items:center}.menu-flyout-item__check,slot[name='prefix']::slotted(:last-of-type){margin-right:var(--telekom-spacing-composition-space-04)}.menu-flyout-item__check{visibility:hidden}:host([aria-checked='true']) .menu-flyout-item__check{visibility:visible}.menu-flyout-item__suffix{flex:0 0 auto;display:flex;align-items:center}.menu-flyout-item__cascade,slot[name='suffix']::slotted(:first-of-type){margin-left:var(--telekom-spacing-composition-space-06)}";

const MenuFlyoutItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleSelect = createEvent(this, "scale-select", 7);
    this.scaleSelectLegacy = createEvent(this, "scaleSelect", 7);
    /** (optional) Set to true to display arrow icon suffix */
    this.cascade = false; // TODO rename to `hasMenu`?
    /** (optional) Mark as active */
    this.active = false;
    /** (optional) Set to true to display check prefix, false to display empty prefix */
    this.checked = false;
    /** (optional) Disabled */
    this.disabled = false;
    this.hasSlotSublist = false;
  }
  // TODO there is lot of room for improving this, aka edge-cases
  async triggerEvent(event, closeOnSelect = true) {
    const { key } = event;
    if (this.disabled) {
      return;
    }
    if (key === 'ArrowRight' && !this.hasSlotSublist) {
      return;
    }
    if (this.hasSlotSublist) {
      const sublist = this.hostElement.querySelector('[slot="sublist"]');
      if (sublist.hasAttribute('opened')) {
        sublist.removeAttribute('opened');
      }
      else {
        this.openSublist();
      }
      return;
    }
    const detail = {
      eventType: event.type,
      key,
      item: this.hostElement,
      closeOnSelect,
      originalEvent: event,
    };
    emitEvent(this, 'scaleSelect', detail);
  }
  connectedCallback() {
    this.hasSlotSublist =
      this.hostElement.querySelector('[slot="sublist"]') != null;
    if (this.hasSlotSublist) {
      this.cascade = true;
    }
  }
  openSublist() {
    const sublist = this.hostElement.querySelector('[slot="sublist"]');
    if (sublist == null) {
      return;
    }
    sublist.trigger = () => this.hostElement;
    sublist.direction = 'right';
    sublist.open();
  }
  getCssClassMap() {
    return classnames('menu-flyout-item', this.disabled && 'menu-flyout-item--disabled', this.checkable != null && 'menu-flyout-item--checkable', this.active && 'menu-flyout-item--active');
  }
  render() {
    const checked = this.checked ? 'true' : 'false';
    return (h(Host, { role: this.checkable ? `menuitem${this.checkable}` : 'menuitem', "aria-checked": this.checkable == null ? false : checked, "aria-disabled": this.disabled ? 'true' : undefined, tabindex: "-1" }, this.styles && h("style", null, this.styles), h("div", { class: this.getCssClassMap(), part: "base" }, h("span", { part: "prefix", class: "menu-flyout-item__prefix" }, this.checkable == null ? (h("slot", { name: "prefix" })) : (h("scale-icon-action-checkmark", { class: "menu-flyout-item__check", size: 16 }))), h("span", { part: "label", class: "menu-flyout-item__label" }, h("slot", null)), h("span", { part: "suffix", class: "menu-flyout-item__suffix" }, this.cascade ? (h("scale-icon-navigation-right", { class: "menu-flyout-item__cascade", size: 16 })) : (h("slot", { name: "suffix" })))), h("slot", { name: "sublist" })));
  }
  get hostElement() { return this; }
  static get style() { return menuFlyoutItemCss; }
}, [1, "scale-menu-flyout-item", {
    "cascade": [4],
    "active": [516],
    "checkable": [1],
    "checked": [1540],
    "disabled": [516],
    "value": [513],
    "styles": [1],
    "triggerEvent": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-menu-flyout-item", "scale-icon-action-checkmark", "scale-icon-navigation-right"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-menu-flyout-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MenuFlyoutItem);
      }
      break;
    case "scale-icon-action-checkmark":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-icon-navigation-right":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { MenuFlyoutItem as M, defineCustomElement as d };
