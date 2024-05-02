'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const renderIcon = require('./render-icon-a46f6da1.js');
const utils = require('./utils-e9c3b953.js');
const index$1 = require('./index-53f5a5fc.js');

const appNavigationUserMenuCss = ":host{--border-width-divider:var(--telekom-spacing-composition-space-01);--color-divider:var(--telekom-color-ui-subtle);--color-menu-item-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-menu-item-active:var(--telekom-color-text-and-icon-primary-pressed);--box-shadow-focus:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard)}.app-navigation-user-menu{width:100%;position:relative;min-width:260px}.app-navigation-user-menu__divider{margin:var(--telekom-spacing-composition-space-06) 0;border:0;border-top:var(--border-width-divider) solid var(--color-divider)}@media (min-width: 1040px){.app-navigation-user-menu__user-info{margin:var(--telekom-spacing-composition-space-05)\n      var(--telekom-spacing-composition-space-08) 0\n      var(--telekom-spacing-composition-space-08)}}@media (max-width: 1039px){.app-navigation-user-menu__user-info{margin:var(--telekom-spacing-composition-space-08)\n      var(--telekom-spacing-composition-space-06) 0\n      var(--telekom-spacing-composition-space-06)}}.app-navigation-user-menu__user-info--name{font:var(--telekom-text-style-heading-5);margin-bottom:var(--telekom-spacing-composition-space-03)}.app-navigation-user-menu__user-info--email{color:var(--telekom-color-text-and-icon-additional);font:var(--telekom-text-style-body)}.app-navigation-user-menu__item{display:flex;font:var(--telekom-text-style-heading-6);padding:var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-06);border-radius:calc(var(--telekom-radius-small) / 2);color:var(--telekom-color-text-and-icon-standard);text-decoration:none}@media (min-width: 1040px){.app-navigation-user-menu__item{padding:var(--telekom-spacing-composition-space-04)\n      var(--telekom-spacing-composition-space-08)}}.app-navigation-user-menu__item:hover{color:var(--color-menu-item-hover)}.app-navigation-user-menu__item:active{color:var(--color-menu-item-active)}.app-navigation-user-menu__item:focus{outline:none;box-shadow:var(--box-shadow-focus)}.app-navigation-user-menu__item--icon-prefix{margin-right:var(--telekom-spacing-composition-space-04)}.app-navigation-user-menu__item--icon-suffix{margin-left:var(--telekom-spacing-composition-space-04)}.app-navigation-user-menu__button{padding:var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-06)}@media (min-width: 1040px){.app-navigation-user-menu__button{padding:var(--telekom-spacing-composition-space-04)\n      var(--telekom-spacing-composition-space-08)}}@media (min-width: 1040px){.app-navigation-user-menu{padding-bottom:var(--telekom-spacing-composition-space-03)}}";

const AppNavigationUserMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeMenu = index.createEvent(this, "closeMenu", 7);
  }
  render() {
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), index.h("div", { class: "app-navigation-user-menu" }, index.h("slot", null), this.navigation.map((item) => {
      if (item.type === 'divider') {
        return (index.h("hr", { class: "app-navigation-user-menu__divider", part: "rule-horizontal" }));
      }
      if (item.type === 'userInfo') {
        return (index.h("div", { class: "app-navigation-user-menu__user-info", part: "userInfo" }, index.h("div", { class: "app-navigation-user-menu__user-info--name scl-font-variant-heading-4" }, item.name), index.h("div", { class: "app-navigation-user-menu__user-info--email" }, item.email)));
      }
      if (item.type === 'item') {
        return (index.h("a", { href: item.href || 'javascript:void(0);', target: item.target || '_self', tabindex: 0, class: "app-navigation-user-menu__item", part: "item", onClick: (e) => {
            e.stopImmediatePropagation();
            if (item.onClick) {
              item.onClick(e);
            }
            this.hide();
          }, onKeyDown: (e) => {
            if ([' ', 'Enter'].includes(e.key)) {
              e.stopImmediatePropagation();
              e.preventDefault();
              if (item.onClick) {
                item.onClick(e);
              }
              this.hide();
            }
          } }, item.icon &&
          (!item.iconPosition || item.iconPosition === 'prefix')
          ? renderIcon.renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {
              class: `app-navigation-user-menu__item--icon-prefix`,
            },
          })
          : null, item.name, item.icon && item.iconPosition === 'suffix'
          ? renderIcon.renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {
              class: `app-navigation-user-menu__item--icon-suffix`,
            },
          })
          : null));
      }
      if (item.type === 'button') {
        return (index.h("scale-button", { class: "app-navigation-user-menu__button", part: "button", onClick: (e) => {
            if (item.onClick) {
              item.onClick(e);
            }
            this.hide();
          }, onKeyDown: (e) => {
            if ([' ', 'Enter'].includes(e.key)) {
              e.stopImmediatePropagation();
              e.preventDefault();
              if (item.onClick) {
                item.onClick(e);
              }
              this.hide();
            }
          }, href: item.href, variant: item.variant || 'primary' }, item.icon &&
          (!item.iconPosition || item.iconPosition === 'prefix')
          ? renderIcon.renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {},
          })
          : null, item.name, item.icon && item.iconPosition === 'suffix'
          ? renderIcon.renderIcon({
            tag: `scale-icon-${item.icon}`,
            attributes: {},
          })
          : null));
      }
    }))));
  }
  get hostElement() { return index.getElement(this); }
};
AppNavigationUserMenu.style = appNavigationUserMenuCss;

const menuFlyoutCss = ":host{--spacing-y-list:0;--spacing-x-list:0}";

const MENU_SELECTOR = '.scale-menu-flyout-list';
const isButtonOrLink = (el) => {
  if (el.tagName.toUpperCase() === 'BUTTON' ||
    el.tagName.toUpperCase() === 'A' ||
    el.getAttribute('role') === 'button') {
    return el;
  }
};
const MenuFlyout = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    if (utils.isClickOutside(event, this.hostElement)) {
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
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), index.h("div", { part: "trigger", onClick: this.toggle }, index.h("slot", { name: "trigger" })), index.h("slot", null)));
  }
  get hostElement() { return index.getElement(this); }
};
MenuFlyout.style = menuFlyoutCss;

const menuFlyoutListCss = ":host{box-sizing:content-box;position:fixed;z-index:100;pointer-events:none}.menu-flyout-list{display:none;position:absolute;pointer-events:initial;z-index:var(--scl-z-index-20);background:var(--telekom-color-background-surface);border-radius:var(--telekom-radius-standard);box-shadow:var(--telekom-shadow-overlay);overflow-y:hidden;margin-top:var(--spacing-y-list, 0);margin-bottom:var(--spacing-y-list, 0);margin-left:var(--spacing-x-list, 0);margin-right:var(--spacing-x-list, 0)}.menu-flyout-list::after{content:'';display:block;position:absolute;width:calc(100% - 2px);height:calc(100% - 2px);inset:0;border-radius:var(--telekom-radius-standard);border:1px solid transparent;pointer-events:none}.menu-flyout-list--opened{display:flex}.menu-flyout-list__list{padding:20px 0;overflow-y:auto;overflow-y:overlay;overscroll-behavior:contain;width:100%}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--direction-bottom-right{top:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--direction-bottom-left{top:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--direction-top-right{bottom:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--direction-top-left{bottom:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-left,.menu-flyout-list--direction-right{left:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-right,.menu-flyout-list--direction-left{right:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;left:auto;bottom:auto}.menu-flyout-list__scroll-up-indicator,.menu-flyout-list__scroll-down-indicator{position:absolute;width:0;border:5px solid transparent;pointer-events:none;opacity:0;left:50%}.menu-flyout-list__scroll-up-indicator{top:var(--telekom-spacing-composition-space-04);border-bottom:5px solid var(--telekom-color-ui-faint);border-top:0}.menu-flyout-list__scroll-down-indicator{bottom:var(--telekom-spacing-composition-space-04);border-top:5px solid var(--telekom-color-ui-faint);border-bottom:0}.menu-flyout-list--can-scroll-up .menu-flyout-list__scroll-up-indicator{opacity:1}.menu-flyout-list--can-scroll-down .menu-flyout-list__scroll-down-indicator{opacity:1}.menu-flyout-list--brand-header-dropdown ::slotted(scale-menu-flyout-item){--_min-width-moz:0;--_min-width:0}";

const PAD = 10;
const ITEM_ROLES = ['menuitem', 'menuitemcheckbox', 'menuitemradio'];
const MenuFlyoutList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scaleOpen = index.createEvent(this, "scale-open", 7);
    this.scaleOpenLegacy = index.createEvent(this, "scaleOpen", 7);
    this.scaleClose = index.createEvent(this, "scale-close", 7);
    this.scaleCloseLegacy = index.createEvent(this, "scaleClose", 7);
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
    utils.emitEvent(this, 'scaleOpen', { list: this.hostElement });
  }
  async close(silent = false) {
    if (this.active && silent !== true) {
      utils.emitEvent(this, 'scaleClose', { list: this.hostElement });
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
    return index$1.classnames('menu-flyout-list', `menu-flyout-list--direction-${this.direction}`, this.opened && 'menu-flyout-list--opened', this.canScrollUp && 'menu-flyout-list--can-scroll-up', this.canScrollDown && 'menu-flyout-list--can-scroll-down', this.flipHorizontal && `menu-flyout-list--flip-horizontal`, this.flipVertical && `menu-flyout-list--flip-vertical`, this.brandHeaderDropdown && `menu-flyout-list--brand-header-dropdown`);
  }
  render() {
    return (index.h(index.Host, { class: "scale-menu-flyout-list" }, this.styles && index.h("style", null, this.styles), index.h("div", { class: this.getCssClassMap(), ref: (el) => (this.base = el), part: "base", style: { maxHeight: `calc(${this.windowHeight}px - 20px)` }, onWheelCapture: this.handleWheel }, index.h("div", { class: "menu-flyout-list__list", ref: (el) => (this.list = el), onScroll: this.handleScroll }, index.h("slot", null)), index.h("div", { "aria-hidden": "true", class: "menu-flyout-list__scroll-up-indicator" }), index.h("div", { "aria-hidden": "true", class: "menu-flyout-list__scroll-down-indicator" }))));
  }
  get hostElement() { return index.getElement(this); }
  static get watchers() { return {
    "opened": ["openedChanged"]
  }; }
};
MenuFlyoutList.style = menuFlyoutListCss;

exports.app_navigation_user_menu = AppNavigationUserMenu;
exports.scale_menu_flyout = MenuFlyout;
exports.scale_menu_flyout_list = MenuFlyoutList;
