'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const utils = require('./utils-e9c3b953.js');

const notificationCss = ":host{--width:100%;--width-toast:25rem;--radius:var(--telekom-radius-standard);--spacing-y:var(--telekom-spacing-composition-space-06);--spacing-y-inner:var(--telekom-spacing-composition-space-04);--spacing-x-aside:var(--telekom-spacing-composition-space-14);--duration-in:var(--telekom-motion-duration-transition);--duration-out:var(--telekom-motion-duration-transition);--easing-in:var(--telekom-motion-easing-enter);--easing-out:var(--telekom-motion-easing-exit);--translate-x:0;--translate-y:0;--translate-z:0;display:contents}[part~='base']{position:relative;display:none;box-sizing:border-box;border-radius:var(--radius);padding-right:var(--spacing-x-aside);width:var(--width);background:var(--_background-subtle);box-shadow:var(--_shadow);animation-duration:var(--duration)}[part~='base'][part~='open']{display:flex}@keyframes toggle{from{opacity:0;transform:translate3d(\n      var(--translate-x),\n      var(--translate-y),\n      var(--translate-z)\n    )}}[part~='in']{animation-name:toggle;animation-duration:var(--duration-in);animation-timing-function:var(--easing-in)}[part~='out']{animation-name:toggle;animation-direction:reverse;animation-duration:var(--duration-out);animation-timing-function:var(--easing-out)}[part~='variant-informational']{--_background-subtle:var(--telekom-color-functional-informational-subtle);--_background-accent:var(--telekom-color-functional-informational-standard);--_color-accent:var(--telekom-color-text-and-icon-functional-informational)}[part~='variant-warning']{--_background-subtle:var(--telekom-color-functional-warning-subtle);--_background-accent:var(--telekom-color-functional-warning-standard);--_color-accent:var(--telekom-color-text-and-icon-functional-warning)}[part~='variant-success']{--_background-subtle:var(--telekom-color-functional-success-subtle);--_background-accent:var(--telekom-color-functional-success-standard);--_color-accent:var(--telekom-color-text-and-icon-functional-success)}[part~='variant-danger']{--_background-subtle:var(--telekom-color-functional-danger-subtle);--_background-accent:var(--telekom-color-functional-danger-standard);--_color-accent:var(--telekom-color-text-and-icon-functional-danger)}[part~='type-banner']{--_shadow:var(--telekom-shadow-floating-standard)}[part~='type-toast']{--translate-x:var(--telekom-spacing-composition-space-05);--_shadow:var(--telekom-shadow-top);width:var(--width-toast)}[part='icon']{display:flex;flex-shrink:0;justify-content:center;align-items:flex-start;width:var(--spacing-x-aside);padding-top:var(--spacing-y);padding-bottom:var(--spacing-y);border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius);color:var(--_color-accent)}[part~='type-toast'] [part='icon']{background:var(--_background-accent);color:var(--telekom-color-text-and-icon-white-standard);align-items:center}[part~='type-toast'][part~='variant-warning'] [part='icon']{color:var(--telekom-color-text-and-icon-black-standard)}[part='body']{margin-top:var(--spacing-y);margin-bottom:var(--spacing-y)}[part~='type-toast'] [part='body']{padding-left:var(--spacing-y)}[part='heading'],[part='heading'] ::slotted(*){font:var(--telekom-text-style-heading-6);line-height:var(--telekom-typography-line-spacing-tight);margin:0}[part='text']{margin-top:var(--spacing-y-inner)}::slotted(*){font:var(--telekom-text-style-body)}::slotted(p){margin:0;margin-top:var(--spacing-y-inner)}[part='close-button']{--color-ghost:var(--telekom-text-and-icon-standard);position:absolute;right:var(--telekom-spacing-composition-space-03);top:var(--telekom-spacing-composition-space-03)}@media screen and (forced-colors: active), (-ms-high-contrast: active){[part~='base']{border:1px solid white}[part='close-button']{--color-ghost:white}}";

const ICON_SIZE = 20;
const iconVariantNameMap = {
  informational: 'scale-icon-alert-information',
  warning: 'scale-icon-alert-warning',
  success: 'scale-icon-action-success',
  danger: 'scale-icon-alert-error',
};
const Notification = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scaleOpen = index.createEvent(this, "scale-open", 7);
    this.scaleBeforeClose = index.createEvent(this, "scale-before-close", 7);
    this.scaleClose = index.createEvent(this, "scale-close", 7);
    /** (optional) Type */
    this.type = 'inline';
    /** (optional) Variant */
    this.variant = 'informational';
    /** (optional) Show the close button */
    this.dismissible = false;
    /** @deprecated - ariaRole should replace innerAriaLive */
    this.innerAriaLive = 'assertive';
    /** (optional) string prepended to the heading */
    this.innerRole = 'alert';
    /** (optional) Label for close button */
    this.closeButtonLabel = 'Close';
    /** (optional) `title` for close button */
    this.closeButtonTitle = 'Close';
    /** Default aria-level for heading */
    this.headingLevel = 2;
    /** (optional) string prepended to the heading */
    this.ariaHeading = 'Information';
    /** What actually triggers opening/closing the notification */
    this.isOpen = this.opened || false;
    this.hasTextSlot = false;
    this.lastCloseEventTrigger = null;
    this.open = () => {
      this.isOpen = true;
      this.animationState = 'in';
      requestAnimationFrame(async () => {
        await utils.animationsFinished(this.hostElement.shadowRoot);
        this.animationState = undefined;
        this.scaleOpen.emit();
        if (this.delay !== undefined) {
          setTimeout(this.timeout, this.delay);
        }
      });
    };
    this.close = () => {
      const event = this.scaleBeforeClose.emit({
        trigger: this.lastCloseEventTrigger,
      });
      this.lastCloseEventTrigger = null;
      const prevented = event.defaultPrevented;
      if (prevented) {
        this.opened = true;
        return;
      }
      this.animationState = 'out';
      requestAnimationFrame(async () => {
        await utils.animationsFinished(this.hostElement.shadowRoot);
        this.animationState = undefined;
        this.isOpen = false;
        this.scaleClose.emit();
      });
    };
    this.timeout = () => {
      this.lastCloseEventTrigger = 'TIMEOUT';
      this.opened = false;
    };
  }
  connectedCallback() {
    if (this.hostElement.hasAttribute('opened')) {
      if (this.innerAriaLive === 'polite' || this.innerRole === 'status') {
        this.innerRole = 'status';
      }
      this.isOpen = true;
    }
    if (this.delay !== undefined) {
      setTimeout(this.timeout, this.delay);
    }
    this.hasTextSlot = this.hostElement.querySelector('[slot="text"]') != null;
    // this.hasActionSlot =
    //   this.hostElement.querySelector('[slot="action"]') != null;
  }
  openedChanged(newValue) {
    if (newValue === true) {
      this.open();
      this.lastCloseEventTrigger = 'ATTRIBUTE';
    }
    else if (this.isOpen) {
      this.close();
    }
  }
  render() {
    const IconTag = iconVariantNameMap[this.variant];
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), index.h("div", { part: index$1.classnames('base', this.animationState, `type-${this.type}`, `variant-${this.variant}`, this.isOpen && 'open'), role: this.innerRole }, index.h("div", { part: "icon", "aria-hidden": "true" }, index.h("slot", { name: "icon" }, index.h(IconTag, { size: ICON_SIZE, selected: this.type === 'toast' }))), index.h("div", { part: "body" }, index.h("div", { part: "heading", role: "heading", "aria-level": this.headingLevel, "aria-label": `${this.ariaHeading} ${this.heading}` }, this.heading ? index.h("span", null, this.heading) : null, index.h("slot", { name: "heading" })), this.hasTextSlot && (index.h("div", { part: "text" }, index.h("slot", { name: "text" })))), this.dismissible && (index.h("scale-button", { part: "close-button", variant: "ghost", onClick: () => {
        this.lastCloseEventTrigger = 'CLOSE_BUTTON';
        this.opened = false;
      } }, index.h("slot", { name: "close-icon" }, index.h("scale-icon-action-circle-close", { "aria-label": this.closeButtonLabel, accessibilityTitle: this.closeButtonTitle, decorative: true, size: ICON_SIZE })))))));
  }
  get hostElement() { return index.getElement(this); }
  static get watchers() { return {
    "opened": ["openedChanged"]
  }; }
};
Notification.style = notificationCss;

exports.scale_notification = Notification;
