import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-6d95a4bc.js';
import { c as classnames } from './index-713f92a5.js';
import { a as animationsFinished } from './utils-c4af5b47.js';

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
    registerInstance(this, hostRef);
    this.scaleOpen = createEvent(this, "scale-open", 7);
    this.scaleBeforeClose = createEvent(this, "scale-before-close", 7);
    this.scaleClose = createEvent(this, "scale-close", 7);
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
        await animationsFinished(this.hostElement.shadowRoot);
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
        await animationsFinished(this.hostElement.shadowRoot);
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
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { part: classnames('base', this.animationState, `type-${this.type}`, `variant-${this.variant}`, this.isOpen && 'open'), role: this.innerRole }, h("div", { part: "icon", "aria-hidden": "true" }, h("slot", { name: "icon" }, h(IconTag, { size: ICON_SIZE, selected: this.type === 'toast' }))), h("div", { part: "body" }, h("div", { part: "heading", role: "heading", "aria-level": this.headingLevel, "aria-label": `${this.ariaHeading} ${this.heading}` }, this.heading ? h("span", null, this.heading) : null, h("slot", { name: "heading" })), this.hasTextSlot && (h("div", { part: "text" }, h("slot", { name: "text" })))), this.dismissible && (h("scale-button", { part: "close-button", variant: "ghost", onClick: () => {
        this.lastCloseEventTrigger = 'CLOSE_BUTTON';
        this.opened = false;
      } }, h("slot", { name: "close-icon" }, h("scale-icon-action-circle-close", { "aria-label": this.closeButtonLabel, accessibilityTitle: this.closeButtonTitle, decorative: true, size: ICON_SIZE })))))));
  }
  get hostElement() { return getElement(this); }
  static get watchers() { return {
    "opened": ["openedChanged"]
  }; }
};
Notification.style = notificationCss;

export { Notification as scale_notification };
