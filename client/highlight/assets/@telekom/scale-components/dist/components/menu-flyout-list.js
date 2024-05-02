import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { e as emitEvent } from './utils.js';

const menuFlyoutListCss = ":host{box-sizing:content-box;position:fixed;z-index:100;pointer-events:none}.menu-flyout-list{display:none;position:absolute;pointer-events:initial;z-index:var(--scl-z-index-20);background:var(--telekom-color-background-surface);border-radius:var(--telekom-radius-standard);box-shadow:var(--telekom-shadow-overlay);overflow-y:hidden;margin-top:var(--spacing-y-list, 0);margin-bottom:var(--spacing-y-list, 0);margin-left:var(--spacing-x-list, 0);margin-right:var(--spacing-x-list, 0)}.menu-flyout-list::after{content:'';display:block;position:absolute;width:calc(100% - 2px);height:calc(100% - 2px);inset:0;border-radius:var(--telekom-radius-standard);border:1px solid transparent;pointer-events:none}.menu-flyout-list--opened{display:flex}.menu-flyout-list__list{padding:20px 0;overflow-y:auto;overflow-y:overlay;overscroll-behavior:contain;width:100%}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--direction-bottom-right{top:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--direction-bottom-left{top:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--direction-top-right{bottom:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--direction-top-left{bottom:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-left,.menu-flyout-list--direction-right{left:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-right,.menu-flyout-list--direction-left{right:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;left:auto;bottom:auto}.menu-flyout-list__scroll-up-indicator,.menu-flyout-list__scroll-down-indicator{position:absolute;width:0;border:5px solid transparent;pointer-events:none;opacity:0;left:50%}.menu-flyout-list__scroll-up-indicator{top:var(--telekom-spacing-composition-space-04);border-bottom:5px solid var(--telekom-color-ui-faint);border-top:0}.menu-flyout-list__scroll-down-indicator{bottom:var(--telekom-spacing-composition-space-04);border-top:5px solid var(--telekom-color-ui-faint);border-bottom:0}.menu-flyout-list--can-scroll-up .menu-flyout-list__scroll-up-indicator{opacity:1}.menu-flyout-list--can-scroll-down .menu-flyout-list__scroll-down-indicator{opacity:1}.menu-flyout-list--brand-header-dropdown ::slotted(scale-menu-flyout-item){--_min-width-moz:0;--_min-width:0}";

const PAD = 10;
const ITEM_ROLES = ['menuitem', 'menuitemcheckbox', 'menuitemradio'];
const MenuFlyoutList = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleOpen = createEvent(this, "scale-open", 7);
    this.scaleOpenLegacy = createEvent(this, "scaleOpen", 7);
    this.scaleClose = createEvent(this, "scale-close", 7);
    this.scaleCloseLegacy = createEvent(this, "scaleClose", 7);
    /** Used to force a re-render */
    this.forceRender = 0;
    /** */
    this.opened = false;
    /** (optional) Set preference for where the menu appears, space permitting */
    this.direction = 'bottom-right';
    /**  */
    this.active = false;
    /** (optional) Determines whether the flyout should close when a menu item is selected */
    this.closeOnSelect = true;
    /** (optional) set to true when using in telekom-brand-header */
    this.brandHeaderDropdown = false;
    /** (optional) set to true to prevent flipping orientation when off the screen vertically  */
    this.preventFlipVertical = false;
    /** Flags to know if content scrollable */
    this.canScrollUp = false;
    this.canScrollDown = false;
    /** When menu off the screen horizontally */
    this.flipHorizontal = false;
    /** When menu off the screen vertically */
    this.flipVertical = false;
    /** Set true when resize or when opened */
    this.needsCheckPlacement = true;
    this.handleScroll = () => {
      this.updateScrollIndicators();
    };
    this.handleWheel = (event) => {
      // TODO not sure this is doing anything atm
      this.stopWheelPropagation(event);
    };
  }
  get triggerRect() {
    return this.trigger().getBoundingClientRect();
  }
  componentDidLoad() {
    if (!this.hostElement.hasAttribute('role')) {
      this.hostElement.setAttribute('role', 'menu');
    }
  }
  componentDidRender() {
    if (this.opened && this.needsCheckPlacement) {
      this.setSize();
      this.checkPlacement();
    }
  }
  async open() {
    this.opened = true;
    emitEvent(this, 'scaleOpen', { list: this.hostElement });
  }
  async close(silent = false) {
    if (this.active && silent !== true) {
      emitEvent(this, 'scaleClose', { list: this.hostElement });
    }
    this.opened = false;
  }
  async setFocus() {
    if (this.focusedItemIndex != null) {
      this.focusItem();
    }
    else {
      this.setInitialItemsFocus();
    }
  }
  handleResize() {
    this.close();
  }
  handleKeydown(event) {
    if (!this.active) {
      return;
    }
    if (!this.hostElement.querySelector('app-navigation-user-menu')) {
      event.preventDefault();
    }
    if ('ArrowDown' === event.key) {
      this.shiftItemsFocus();
      return;
    }
    if ('ArrowUp' === event.key) {
      this.shiftItemsFocus(-1);
      return;
    }
    if ('ArrowLeft' === event.key || 'Escape' === event.key) {
      this.close();
      return;
    }
    if (' ' === event.key ||
      'Enter' === event.key ||
      'ArrowRight' === event.key) {
      const item = this.items[this.focusedItemIndex];
      if (item != null) {
        item.triggerEvent(event, this.closeOnSelect);
      }
    }
  }
  /**
   * We handle item clicks here, to avoid setting up
   * listeners on every item
   */
  handleClick(event) {
    const roleSelector = ITEM_ROLES.map((role) => `[role="${role}"]`).join(',');
    const item = event.target.closest(roleSelector);
    if (item != null) {
      event.stopImmediatePropagation();
      item.triggerEvent(event, this.closeOnSelect);
    }
  }
  /**
   * Focus newly selected item
   */
  handleScaleSelect({ detail }) {
    if (this.active && this.opened) {
      const index = this.items.findIndex((x) => x === detail.item);
      if (index != null) {
        this.focusedItemIndex = index;
        this.focusItem();
      }
    }
  }
  /**
   * Set `active` to false when a descendant opens
   */
  handleScaleOpen({ detail }) {
    if (detail.list !== this.hostElement) {
      this.active = false;
    }
  }
  openedChanged() {
    if (!this.opened) {
      this.active = false;
      this.focusedItemIndex = null;
      // Reset checks for boundary-aware placement
      this.needsCheckPlacement = true;
      this.flipHorizontal = false;
      this.flipVertical = false;
      this.hostElement.style.marginLeft = '';
      this.hostElement.style.marginTop = '';
      this.hostElement.style.marginRight = '';
      this.hostElement.style.marginBottom = '';
      if (this.trigger().tagName === 'SCALE-TELEKOM-NAV-ITEM') {
        this.trigger().style.color =
          'var(--telekom-color-text-and-icon-standard)';
      }
    }
    if (this.opened) {
      this.active = true;
      this.setFocus();
      this.setWindowSize();
      this.setPosition();
      this.padForNonOverlayScrollbars();
      this.updateScrollIndicators();
    }
    this.updateTriggerAttributes();
  }
  setInitialItemsFocus() {
    this.items = this.getListItems();
    this.focusedItemIndex = -1;
    if (this.items.length > 0) {
      this.shiftItemsFocus();
    }
  }
  shiftItemsFocus(direction = 1) {
    let nextIndex = this.focusedItemIndex + direction;
    if (nextIndex === this.items.length) {
      nextIndex = 0;
    }
    else if (nextIndex < 0) {
      nextIndex = this.items.length - 1;
    }
    this.focusedItemIndex = nextIndex;
    this.focusItem();
  }
  focusItem() {
    window.requestAnimationFrame(() => {
      try {
        this.items[this.focusedItemIndex].focus();
      }
      catch (err) { }
    });
  }
  updateTriggerAttributes() {
    const trigger = this.trigger();
    if ((trigger && trigger.getAttribute('aria-haspopup') === 'true') ||
      trigger.classList.contains('scale-menu-trigger')) {
      trigger.setAttribute('aria-expanded', String(this.opened));
    }
  }
  setWindowSize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
  setPosition() {
    const { top, left } = this.triggerRect;
    this.hostElement.style.left = !this.brandHeaderDropdown
      ? `${left}px`
      : `${left - 4}px`;
    if (this.trigger().tagName === 'SCALE-TELEKOM-NAV-ITEM') {
      this.hostElement.style.top = `${top - 12}px`;
      this.hostElement.style.left = `${left - 24}px`;
      this.trigger().style.color =
        'var(--telekom-color-text-and-icon-primary-standard)';
    }
    else {
      this.hostElement.style.top = `${top}px`;
    }
  }
  setSize() {
    const { width, height } = this.triggerRect;
    this.hostElement.style.height = `${height}px`;
    this.hostElement.style.width = `${width}px`;
    if (this.brandHeaderDropdown) {
      this.base.style.width = `240px`;
    }
  }
  checkPlacement() {
    this.needsCheckPlacement = false;
    let isOutOfBounds = false;
    const rect = this.base.getBoundingClientRect();
    // Check horizontal flips
    if (rect.left < PAD) {
      // console.log('off left edge');
      isOutOfBounds = true;
      if (this.direction.includes('left')) {
        this.flipHorizontal = true;
      }
    }
    if (rect.right > this.windowWidth - PAD) {
      // console.log('off right edge');
      isOutOfBounds = true;
      if (this.direction.includes('right')) {
        this.flipHorizontal = true;
      }
    }
    // Check vertical flips
    if (rect.top < PAD) {
      // console.log('off top edge');
      isOutOfBounds = true;
      if (this.direction.includes('top') && !this.preventFlipVertical) {
        this.flipVertical = true;
      }
    }
    if (rect.bottom > this.windowHeight - PAD) {
      // console.log('off bottom edge');
      isOutOfBounds = true;
      if (this.direction.includes('bottom') && !this.preventFlipVertical) {
        this.flipVertical = true;
      }
    }
    if (isOutOfBounds) {
      this.furtherAdjustPlacement();
    }
  }
  furtherAdjustPlacement() {
    // Apply flip class changes immediately to avoid frame flash
    this.base.className = this.getCssClassMap();
    // Force layout and style recalculation
    window.getComputedStyle(this.base);
    const rect = this.base.getBoundingClientRect();
    // TODO: add more functionality for order of priority of which edge to snap to
    // Shift to be snapped to a padded edge
    // Note can't use transform as it creates
    // a relative parent for nested position fixed elements
    let left = 0;
    let top = 0;
    if (rect.left < PAD) {
      // console.log('still off left edge');
      left = PAD - rect.left;
    }
    else if (rect.right > this.windowWidth - PAD) {
      // console.log('still off right edge');
      left = this.windowWidth - PAD - rect.right;
    }
    if (rect.top < PAD) {
      // console.log('still off top edge');
      top = PAD - rect.top;
    }
    else if (rect.bottom > this.windowHeight - PAD) {
      // console.log('still off bottom edge');
      top = this.windowHeight - PAD - rect.bottom;
    }
    this.hostElement.style.marginLeft = `${left}px`;
    this.hostElement.style.marginTop = `${top}px`;
    this.hostElement.style.marginRight = `${-left}px`;
    this.hostElement.style.marginBottom = `${-top}px`;
    // Re-render visibly next frame with correct placement to update vdom
    setTimeout(() => this.forceRender++);
  }
  /**
   * Add scrollbar width to menu, to avoid horizontal scrollbars
   * or scrollbar forcing text-overflow.
   * (This affects Firefox and Safari, where non-overlay scrollbars
   * eat into content width rather than add)
   */
  padForNonOverlayScrollbars() {
    this.base.style.paddingRight = `0px`;
    const scrollbarWidth = this.base.offsetWidth - this.base.clientWidth;
    this.base.style.paddingRight = `${scrollbarWidth}px`;
  }
  updateScrollIndicators() {
    // Reset
    this.canScrollDown = false;
    this.canScrollUp = false;
    const diff = this.list.scrollHeight - this.list.clientHeight;
    // Not scrollable
    if (diff) {
      if (this.list.scrollTop > 0) {
        this.canScrollUp = true;
      }
      if (this.list.scrollTop < diff) {
        this.canScrollDown = true;
      }
    }
    this.forceRender++;
  }
  /**
   * Check if going in a direction with content to reach, otherwise stop
   */
  stopWheelPropagation(event) {
    // This is enough for Chrome
    event.stopPropagation();
    // Needed for Safari and Firefox to prevent scrolling on non-scrollable lists
    if (!this.canScrollDown && !this.canScrollUp) {
      event.preventDefault();
    }
    // Needed for Safari to prevent scrolling past the end of a scrollable list
    if (event.deltaY > 0 && !this.canScrollDown) {
      event.preventDefault();
    }
    if (event.deltaY < 0 && !this.canScrollUp) {
      event.preventDefault();
    }
  }
  getListItems() {
    return Array.from(this.hostElement.children).filter((el) => ITEM_ROLES.includes(el.getAttribute('role')));
  }
  getCssClassMap() {
    return classnames('menu-flyout-list', `menu-flyout-list--direction-${this.direction}`, this.opened && 'menu-flyout-list--opened', this.canScrollUp && 'menu-flyout-list--can-scroll-up', this.canScrollDown && 'menu-flyout-list--can-scroll-down', this.flipHorizontal && `menu-flyout-list--flip-horizontal`, this.flipVertical && `menu-flyout-list--flip-vertical`, this.brandHeaderDropdown && `menu-flyout-list--brand-header-dropdown`);
  }
  render() {
    return (h(Host, { class: "scale-menu-flyout-list" }, this.styles && h("style", null, this.styles), h("div", { class: this.getCssClassMap(), ref: (el) => (this.base = el), part: "base", style: { maxHeight: `calc(${this.windowHeight}px - 20px)` }, onWheelCapture: this.handleWheel }, h("div", { class: "menu-flyout-list__list", ref: (el) => (this.list = el), onScroll: this.handleScroll }, h("slot", null)), h("div", { "aria-hidden": "true", class: "menu-flyout-list__scroll-up-indicator" }), h("div", { "aria-hidden": "true", class: "menu-flyout-list__scroll-down-indicator" }))));
  }
  get hostElement() { return this; }
  static get watchers() { return {
    "opened": ["openedChanged"]
  }; }
  static get style() { return menuFlyoutListCss; }
}, [1, "scale-menu-flyout-list", {
    "opened": [1540],
    "trigger": [16],
    "direction": [1025],
    "active": [1540],
    "closeOnSelect": [4, "close-on-select"],
    "brandHeaderDropdown": [4, "brand-header-dropdown"],
    "styles": [1],
    "preventFlipVertical": [4, "prevent-flip-vertical"],
    "forceRender": [32],
    "open": [64],
    "close": [64],
    "setFocus": [64]
  }, [[9, "resize", "handleResize"], [0, "keydown", "handleKeydown"], [0, "click", "handleClick"], [0, "scale-select", "handleScaleSelect"], [0, "scale-open", "handleScaleOpen"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-menu-flyout-list"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-menu-flyout-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MenuFlyoutList);
      }
      break;
  } });
}

export { MenuFlyoutList as M, defineCustomElement as d };
