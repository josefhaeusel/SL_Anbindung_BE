import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-6d95a4bc.js';
import { c as classnames } from './index-713f92a5.js';
import { s as statusNote } from './status-note-0089e9c9.js';
import { e as emitEvent } from './utils-c4af5b47.js';

const notificationToastCss = ":host{--width:366px;--width-icon-container:48px;--radius:var(--telekom-radius-standard);--background:var(--telekom-color-background-surface);--z-index:100;--box-shadow:var(--telekom-shadow-raised-standard);--background-success-icon-container:var(\n    --telekom-color-functional-success-standard\n  );--background-warning-icon-container:var(\n    --telekom-color-functional-warning-standard\n  );--background-error-icon-container:var(\n    --telekom-color-functional-danger-standard\n  );--background-informational-icon-container:var(\n    --telekom-color-functional-informational-standard\n  );--background-success-text-container:var(\n    --telekom-color-functional-success-subtle\n  );--background-warning-text-container:var(\n    --telekom-color-functional-warning-subtle\n  );--background-error-text-container:var(\n    --telekom-color-functional-danger-subtle\n  );--background-informational-text-container:var(\n    --telekom-color-functional-informational-subtle\n  )}.notification-toast{width:calc(var(--width) - var(--width-icon-container));opacity:1;z-index:var(--z-index);position:fixed;background:var(--background);box-shadow:var(--box-shadow);box-sizing:border-box;border-radius:0 var(--radius) var(--radius) 0;flex-direction:column;justify-content:space-between}.notification-toast.notification-toast--story{position:absolute}.notification-toast.notification-toast--story.notification-toast--hide{opacity:0}.notification-toast.notification-toast--story.notification-toast--opened{opacity:1}.notification-toast.notification-toast--variant-success{background:var(--background-success-text-container)}.notification-toast.notification-toast--variant-warning{background:var(--background-warning-text-container)}.notification-toast.notification-toast--variant-error{background:var(--background-error-text-container)}.notification-toast.notification-toast--variant-informational{background:var(--background-informational-text-container)}.notification-toast__icon{position:absolute;top:50%;left:50%;margin:-10px 0 0 -10px}.notification-toast__icon-container{height:100%;width:var(--width-icon-container);position:absolute;left:calc(var(--width-icon-container) * -1 + 1px);top:0;float:left;border-radius:var(--radius) 0 0 var(--radius)}.notification-toast.notification-toast--variant-success .notification-toast__icon-container{background:var(--background-success-icon-container)}.notification-toast.notification-toast--variant-warning .notification-toast__icon-container{background:var(--background-warning-icon-container)}.notification-toast.notification-toast--variant-error .notification-toast__icon-container{background:var(--background-error-icon-container)}.notification-toast.notification-toast--variant-informational .notification-toast__icon-container{background:var(--background-informational-icon-container)}::slotted([slot='header']){margin:0;padding:3px var(--width-icon-container) 0 10px;font-weight:bold;font-size:16px}::slotted([slot='body']){padding:3px 0 0 10px;margin:0}::slotted([slot='link']){padding:10px 0 15px 10px;margin:0}.notification-toast__text-container{width:calc(var(--width) - calc(var(--width-icon-container) * 1));min-height:33px;float:left;position:relative;margin:0 0 0 1px;padding:15px 0 0 0}.notification-toast__button-close{position:absolute;top:10px;right:7.5px;color:#191919;border:none;cursor:pointer;margin:0;padding:0;background:transparent}.notification-toast__button-close svg{height:19px;width:19px;padding:7.5px 6.5px 6.5px 6.5px;border-radius:20%;color:var(--telekom-color-text-and-icon-standard)}.notification-toast__button-close:hover svg{background-color:white;color:var(--telekom-color-text-and-icon-primary-hovered)}@media screen and (forced-colors: active), (-ms-high-contrast: active){.notification-toast__button-close svg{color:hsl(0, 0%, 100%)}.notification-toast{border:1px solid hsl(0, 0%, 100%)}.notification-toast__icon-container{border:1px solid hsl(0, 0%, 100%);margin-top:-1px}}";

const NotificationToast = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scaleClosing = createEvent(this, "scale-closing", 7);
    this.scaleClose = createEvent(this, "scale-close", 7);
    /** (optional) Toast variant */
    this.variant = 'informational';
    /** (optional) Animated toast */
    this.animated = true;
    /** (optional) Alignment choose for top and bottom */
    this.alignment = 'top-right';
    /** (optional) Toast position at the top */
    this.positionVertical = 12;
    /** (optional) Toast position right */
    this.positionHorizontal = 12;
    /** (optional) Toast auto hide */
    this.autoHide = false;
    /** (optional) Toast auto hide duration */
    this.autoHideDuration = 3000;
    /** (optional) Toast fade duration */
    this.fadeDuration = 500;
    /** (optional) Label for close button */
    this.closeButtonLabel = 'close';
    /** (optional) Title for close button */
    this.closeButtonTitle = 'close';
    /** (optional) Toast state height with offset */
    this.toastHeightWithOffset = 0;
    this.hideToast = false;
    this.close = () => {
      emitEvent(this, 'scaleClosing');
      this.hideToast = true;
      setTimeout(() => {
        this.opened = false;
        emitEvent(this, 'scaleClose');
      }, this.fadeDuration);
    };
    this.transitions = (offset) => `
      @keyframes fadeIn {
        from {
          opacity: 0;
          ${this.alignmentVertical}: -${offset}px;
        }
        to {
          opacity: 1;
          ${this.alignmentVertical}: ${this.positionVertical}px;
        }
      }
  
      @keyframes fadeOut {
        from {
          opacity: 1;
          ${this.alignmentVertical}: ${this.positionVertical}px;
        }
        to {
          opacity: 0;
          ${this.alignmentVertical}: -${offset}px;
        }
      }
    `;
    this.animationStyle = (offset) => {
      if (this.animated) {
        return `
        .notification-toast--show {
          ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
          animation: fadeIn ${this.fadeDuration / 1000}s ease-in-out;
          ${this.alignmentVertical}: ${this.positionVertical}px;
          opacity: 1;
        },
        .notification-toast--show {
          ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
          animation: fadeOut ${this.fadeDuration / 1000}s ease-in-out;
          ${this.alignmentVertical}: -${offset}px;
          opacity: 0;
        }
      `;
      }
      return `
    .notification-toast--show {
      ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
      ${this.alignmentVertical}: ${this.positionVertical}px;
      opacity: 1;
    },
    .notification-toast--show {
      ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
      ${this.alignmentVertical}: -${offset}px;
      opacity: 0;
    }
  `;
    };
  }
  connectedCallback() {
    statusNote({ source: this.element, type: 'warn' });
  }
  componentWillLoad() {
    const alignmentParts = this.alignment.split('-');
    this.alignmentVertical = alignmentParts[0];
    this.alignmentHorizontal = alignmentParts[1];
  }
  componentDidRender() {
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
  }
  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (h("scale-icon-action-success", { class: "notification-toast__icon", size: 20, color: "#ffffff", selected: true, "aria-hidden": "true" }));
        case 'informational':
          return (h("scale-icon-alert-information", { class: "notification-toast__icon", size: 20, selected: true, color: "#ffffff", "aria-hidden": "true" }));
        case 'error':
          return (h("scale-icon-alert-error", { class: "notification-toast__icon", size: 20, selected: true, color: "#ffffff", "aria-hidden": "true" }));
        case 'warning':
          return (h("scale-icon-alert-warning", { class: "notification-toast__icon", color: "#ffff", size: 20, selected: true, "aria-hidden": "true" }));
      }
    }
    return;
  }
  /** Toast method: open() */
  async open() {
    this.opened = true;
    this.hideToast = false;
  }
  render() {
    if (this.opened) {
      return (h(Host, null, this.styles && h("style", null, this.styles), h("style", null, this.transitions(this.toastHeightWithOffset)), h("style", null, this.animationStyle(this.toastHeightWithOffset)), h("div", { role: "alert", style: { display: `${this.opened ? '' : 'none'}` }, class: this.getCssClassMap(), part: this.getBasePartMap(), tabindex: "0" }, h("div", { class: "notification-toast__icon-container" }, this.handleIcons()), h("div", { class: "notification-toast__text-container" }, h("slot", { name: "header" }), h("slot", { name: "body" }), h("scale-link", { href: this.href, class: "notification-toast__link", role: "link" }, h("slot", { name: "link" }))), h("button", { part: "button-dismissable", type: "button", class: "notification-toast__button-close", onClick: () => this.close(), tabindex: 0, "aria-label": this.closeButtonLabel, title: this.closeButtonTitle, onKeyDown: (e) => {
          if (e.key === 'Enter') {
            this.close();
          }
        } }, h("scale-icon-action-circle-close", null)))));
    }
  }
  getToastHeightWithOffset() {
    const toastHeight = this.element.shadowRoot.querySelector('.toast').scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.positionVertical;
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const component = 'notification-toast';
    const prefix = mode === 'basePart' ? '' : `${component}`;
    return classnames(mode === 'basePart' ? 'base' : component, this.variant && `${prefix}--variant-${this.variant}`, !!this.opened && `${prefix}--opened`, !!!this.hideToast && `${prefix}--show`, !!this.hideToast && `${prefix}--hide`, this.story && `${prefix}--story`);
  }
  get element() { return getElement(this); }
};
NotificationToast.style = notificationToastCss;

export { NotificationToast as scale_notification_toast };
