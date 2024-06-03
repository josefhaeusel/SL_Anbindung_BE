import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { b as isClickOutside } from './utils.js';

const menuFlyoutCss = ":host{--spacing-y-list:0;--spacing-x-list:0}";

const MENU_SELECTOR = '.scale-menu-flyout-list';
const isButtonOrLink = (el) => {
  if (el.tagName.toUpperCase() === 'BUTTON' ||
    el.tagName.toUpperCase() === 'A' ||
    el.getAttribute('role') === 'button') {
    return el;
  }
};
const MenuFlyout = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** (optional) Determines whether the flyout should close when a menu item is selected */
    this.closeOnSelect = true;
    /** (optional) Determines whether the flyout trigger should get the aria-haspopup attribute */
    this.triggerHasPopup = true;
    /** (optional) Set preference for where the menu appears, space permitting */
    this.direction = 'bottom-right';
    this.lists = new Set();
    this.closeAll = () => {
      this.lists.forEach(async (list) => {
        await list.close(); // Wait for `scale-close` event to fire
        list.active = false; // Make sure focus control is right while reopening
      });
    };
    this.toggle = () => {
      const list = this.getListElement();
      if (list.opened) {
        this.closeAll();
        return;
      }
      if (this.direction != null) {
        // Overwrite `direction` in list
        list.direction = this.direction;
      }
      list.trigger = () => this.trigger;
      list.open();
    };
  }
  async handleScaleOpen({ detail }) {
    // Close the previous active list and its parents if
    // - it's not the root and
    // - it's not the one being opened
    // (useful only with "click" interactions)
    const rootList = this.getListElement();
    if (this.activeList &&
      this.activeList.active &&
      this.activeList !== rootList &&
      this.activeList !== detail.list) {
      let list = this.activeList;
      while (list != null && list !== rootList) {
        await list.close(true);
        list = list.parentElement.closest(MENU_SELECTOR);
      }
    }
    this.activeList = detail.list;
  }
  handleScaleSelect({ detail }) {
    if (detail.closeOnSelect === false) {
      return;
    }
    if (this.closeOnSelect) {
      window.requestAnimationFrame(() => {
        this.closeAll();
      });
    }
  }
  handleScaleClose({ detail }) {
    const parent = detail.list != null
      ? detail.list.parentNode.closest(MENU_SELECTOR)
      : null;
    if (parent) {
      window.requestAnimationFrame(() => {
        parent.active = true;
        parent.setFocus();
      });
    }
  }
  handleWindowScroll() {
    this.closeAll();
  }
  handleOutsideClick(event) {
    if (isClickOutside(event, this.hostElement)) {
      this.closeAll();
    }
  }
  handleKeydown(event) {
    if ('Tab' === event.key &&
      !this.hostElement.querySelector('app-navigation-user-menu')) {
      if (this.trigger.tagName === 'SCALE-TELEKOM-NAV-ITEM') {
        this.trigger.firstElementChild.focus();
      }
      this.closeAll();
      return;
    }
  }
  componentDidLoad() {
    const triggerSlot = this.hostElement.querySelector('[slot="trigger"]');
    const tagName = triggerSlot ? triggerSlot.tagName.toUpperCase() : '';
    // TODO a different, more global, solution less dependent on tag names
    // would be great…
    if (triggerSlot && tagName === 'SCALE-BUTTON') {
      this.trigger = triggerSlot.shadowRoot.querySelector('button');
    }
    else if (triggerSlot && tagName === 'SCALE-NAV-ICON') {
      this.trigger = triggerSlot.querySelector('a');
    }
    else {
      this.trigger = triggerSlot;
    }
    this.lists = new Set(Array.from(this.hostElement.querySelectorAll(MENU_SELECTOR)));
    this.setTriggerAttributes();
  }
  setTriggerAttributes() {
    const triggers = Array.from(this.hostElement.querySelectorAll('[role="menuitem"]'))
      .filter((el) => el.querySelector('[slot="sublist"]') != null)
      .concat([isButtonOrLink(this.trigger)])
      .filter((x) => x != null);
    triggers.forEach((el) => {
      if (this.triggerHasPopup) {
        el.setAttribute('aria-haspopup', 'true');
      }
      el.classList.add('scale-menu-trigger');
      el.setAttribute('aria-expanded', 'false');
    });
  }
  getListElement() {
    // TODO use [role="menu"]?
    return Array.from(this.hostElement.children).find((el) => el.tagName.toUpperCase().startsWith('SCALE-MENU-FLYOUT'));
  }
  render() {
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { part: "trigger", onClick: this.toggle }, h("slot", { name: "trigger" })), h("slot", null)));
  }
  get hostElement() { return this; }
  static get style() { return menuFlyoutCss; }
}, [1, "scale-menu-flyout", {
    "closeOnSelect": [4, "close-on-select"],
    "triggerHasPopup": [4, "trigger-has-popup"],
    "direction": [1],
    "styles": [1]
  }, [[0, "scale-open", "handleScaleOpen"], [0, "scale-select", "handleScaleSelect"], [0, "scale-close", "handleScaleClose"], [9, "scroll", "handleWindowScroll"], [4, "click", "handleOutsideClick"], [0, "keydown", "handleKeydown"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-menu-flyout"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-menu-flyout":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MenuFlyout);
      }
      break;
  } });
}

export { MenuFlyout as M, defineCustomElement as d };
