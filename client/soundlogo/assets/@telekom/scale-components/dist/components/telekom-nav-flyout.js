import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { a as animationsFinished, e as emitEvent } from './utils.js';

const telekomNavFlyoutCss = ":host{--top:var(--scl-telekom-header-height, 0);--left:0;--width:100vw;--height:auto;--min-height:25vh;--position:fixed;--background:var(--telekom-color-background-surface);--background-variant-mobile:var(--telekom-color-background-canvas);--background-backdrop:var(--telekom-color-background-canvas);--shadow:none;--z-index:7;--duration:0;--duration-backdrop-in:0;--duration-backdrop-out:0;--translate-x:0;--translate-y:0;--translate-z:0;display:contents}[part~='variant-mobile']{--height:100vh;--top:0;--background:var(--background-variant-mobile)}:host([debug]) [part~='base']{outline:1px dotted gold}[part~='base']{display:none;position:var(--position);z-index:var(--z-index);top:var(--top);left:var(--left);width:var(--width);height:var(--height);min-height:var(--min-height);background:var(--background);box-shadow:var(--shadow);animation-duration:var(--duration);border-top:1px solid var(--telekom-color-ui-faint)}[part~='base'][part~='expanded']{display:block}[part~='backdrop']{display:none;position:var(--position);background-color:var(--telekom-color-background-backdrop);top:var(--top);left:var(--left);width:var(--width);height:100vh;animation-duration:var(--duration)}[part~='backdrop'][part~='expanded']:not([part~='variant-mobile']){display:block}[part~='backdrop'][part~='expanded'][part~='in']{animation-duration:var(--duration-backdrop-in)}[part~='backdrop'][part~='expanded'][part~='out']{animation-duration:var(--duration-backdrop-out)}@keyframes toggle{from{opacity:0;transform:translate3d(\n      var(--translate-x),\n      var(--translate-y),\n      var(--translate-z)\n    )}}[part~='in']{animation-name:toggle;animation-timing-function:var(--telekom-motion-easing-enter)}[part~='out']{animation-name:toggle;animation-fill-mode:forwards;animation-direction:reverse;animation-timing-function:var(--telekom-motion-easing-exit)}";

const TelekomNavItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleExpanded = createEvent(this, "scale-expanded", 7);
    /** Open the flyout menu */
    this.expanded = false;
    /** (optional) Variant ("mobile" gives it a fixed height of `100vh`) */
    this.variant = null;
    /** (optinal) Whether the flyout should open on hover (needs better name!) */
    this.hover = false;
    this.isExpanded = this.expanded;
    this.handleSpaceOrEnterForHover = (event) => {
      if (this.isExpanded) {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        this.expanded = true;
        this.show();
      }
    };
    this.handleTriggerClick = (event) => {
      if (event.ctrlKey) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      this.expanded = !this.expanded;
      this.parentElement.removeEventListener('mouseleave', this.handlePointerOut);
    };
    this.handlePointerIn = () => {
      if (this.isExpanded) {
        return;
      }
      this.expanded = true;
      this.hostElement.parentElement.addEventListener('mouseleave', this.handlePointerOut);
      if (this.hostElement.querySelector('scale-telekom-mega-menu') !== null) {
        this.hostElement
          .querySelector('scale-telekom-mega-menu')
          .addEventListener('mouseleave', this.handlePointerOut);
      }
    };
    this.handlePointerOut = () => {
      this.expanded = false;
      this.hostElement.removeEventListener('mouseleave', this.handlePointerOut);
      if (this.hostElement.querySelector('scale-telekom-mega-menu') !== null) {
        this.hostElement
          .querySelector('scale-telekom-mega-menu')
          .addEventListener('mouseleave', this.handlePointerOut);
      }
    };
  }
  handleWindowKeydown(event) {
    if (!this.isExpanded) {
      return;
    }
    if (event.key === 'Escape') {
      this.expanded = false;
      try {
        this.triggerElement.focus();
      }
      catch (err) { }
    }
  }
  handleScaleCloseNavFlyout() {
    this.expanded = false;
  }
  handleDocumentClick(event) {
    if (!this.isExpanded) {
      return;
    }
    const { target } = event;
    const isNotTrigger = () => target !== this.triggerElement && !this.triggerElement.contains(target);
    const isNotWithin = () => !this.hostElement.contains(target);
    if (isNotTrigger() && isNotWithin()) {
      this.expanded = false;
    }
  }
  expandedChanged(newValue) {
    newValue ? this.show() : this.hide();
  }
  connectedCallback() {
    this.parentElement = this.hostElement.parentElement;
    if (this.triggerElement == null) {
      return;
    }
    this.triggerElement.setAttribute('aria-haspopup', 'true');
    this.triggerElement.setAttribute('aria-expanded', String(this.expanded));
    if (this.hover) {
      this.triggerElement.addEventListener('mouseenter', this.handlePointerIn);
      this.triggerElement.addEventListener('keypress', this.handleSpaceOrEnterForHover);
    }
    else {
      this.triggerElement.addEventListener('click', this.handleTriggerClick);
    }
  }
  disconnectedCallback() {
    this.triggerElement.removeEventListener('click', this.handleTriggerClick);
    this.triggerElement.removeEventListener('mouseenter', this.handlePointerIn);
    this.triggerElement.removeEventListener('keypress', this.handleSpaceOrEnterForHover);
  }
  async show() {
    this.isExpanded = true;
    this.animationState = 'in';
    requestAnimationFrame(async () => {
      await animationsFinished(this.hostElement.shadowRoot);
      this.animationState = undefined;
      this.triggerElement.setAttribute('aria-expanded', 'true');
      emitEvent(this, 'scaleExpanded', { expanded: true });
    });
  }
  async hide() {
    this.animationState = 'out';
    requestAnimationFrame(async () => {
      await animationsFinished(this.hostElement.shadowRoot);
      this.animationState = undefined;
      this.isExpanded = false;
      this.triggerElement.setAttribute('aria-expanded', 'false');
      emitEvent(this, 'scaleExpanded', { expanded: false });
    });
  }
  /**
   * Get the trigger element "on demand".
   * Either query by `trigger-selector` or
   * get the previous sibling.
   */
  get triggerElement() {
    if (this.triggerSelector) {
      return this.hostElement.ownerDocument.querySelector(this.triggerSelector);
    }
    return this.hostElement.previousElementSibling;
  }
  render() {
    return (h(Host, null, h("div", { part: classnames('base', this.animationState, `variant-${this.variant}`, {
        expanded: this.isExpanded,
      }) }, h("slot", null)), h("div", { part: classnames('backdrop', this.animationState, `variant-${this.variant}`, {
        expanded: this.isExpanded,
      }), onClick: () => (this.expanded = false) })));
  }
  get hostElement() { return this; }
  static get watchers() { return {
    "expanded": ["expandedChanged"]
  }; }
  static get style() { return telekomNavFlyoutCss; }
}, [1, "scale-telekom-nav-flyout", {
    "expanded": [1540],
    "triggerSelector": [1, "trigger-selector"],
    "variant": [1],
    "hover": [4],
    "isExpanded": [32],
    "animationState": [32],
    "show": [64],
    "hide": [64]
  }, [[8, "keydown", "handleWindowKeydown"], [0, "scale-close-nav-flyout", "handleScaleCloseNavFlyout"], [4, "click", "handleDocumentClick"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-nav-flyout"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-nav-flyout":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomNavItem);
      }
      break;
  } });
}

export { TelekomNavItem as T, defineCustomElement as d };
