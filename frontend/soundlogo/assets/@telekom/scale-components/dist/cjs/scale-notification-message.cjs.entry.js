'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const statusNote = require('./status-note-dceee5a3.js');
const utils = require('./utils-e9c3b953.js');

const notificationMessageCss = ":host{--width:100%;--radius:var(--telekom-radius-standard);--border:var(--telekom-line-weight-standard) solid transparent;--background-error:var(--telekom-color-functional-danger-subtle);--background-warning:var(--telekom-color-functional-warning-subtle);--background-informational:var(\n    --telekom-color-functional-informational-subtle\n  );--background-success:var(--telekom-color-functional-success-subtle)}.notification-message{border:var(--border);border-radius:var(--radius);width:var(--width);position:relative}.notification-message--variant-error{background:var(--background-error)}.notification-message--variant-warning{background-color:var(--background-warning)}.notification-message--variant-informational{background-color:var(--background-informational)}.notification-message--variant-success{background-color:var(--background-success)}.notification-message__heading{margin:14px 48px 14px 48px;font-weight:var(--telekom-typography-font-weight-bold);line-height:var(--telekom-typography-line-spacing-standard)}.notification-message__text{margin:8px 48px 15px 48px}::slotted(*){font-weight:var(--telekom-typography-font-weight-regular)}.notification-message__icon-close{position:absolute;top:8px;right:13.5px;border:none;cursor:pointer;margin:0;padding:0;background:transparent;color:var(--telekom-color-text-and-icon-standard)}.notification-message__icon-close svg{height:19px;width:19px;padding:6.5px;border-radius:20%}.notification-message__icon-close:hover svg{background-color:hsl(0, 0%, 100%);color:var(--telekom-color-text-and-icon-primary-hovered)}.notification-message__icon-success{position:absolute;top:12.5px;left:17px;height:20px;width:20px;color:var(--telekom-color-text-and-icon-functional-success)}.notification-message__icon-error{position:absolute;top:12px;left:17px;height:20px;width:20px;color:var(--telekom-color-text-and-icon-functional-danger)}.notification-message__icon-information{position:absolute;top:12px;left:17px;height:20px;width:20px;color:var(--telekom-color-text-and-icon-functional-informational)}@media screen and (forced-colors: active), (-ms-high-contrast: active){.notification-message__icon-close{color:hsl(0, 0%, 100%)}.notification-message{border:1px solid hsl(0, 0%, 100%)}}";

const NotificationMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scaleClose = index.createEvent(this, "scale-close", 7);
    this.variant = 'informational';
    this.dismissible = false;
    this.autoHide = false;
    this.autoHideDuration = 3000;
    /** (optional) Label for close button */
    this.closeButtonLabel = 'close';
    /** (optional) Title for close button */
    this.closeButtonTitle = 'close';
    this.close = () => {
      this.opened = false;
      utils.emitEvent(this, 'scaleClose');
    };
  }
  componentWillLoad() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
  }
  componentDidRender() {
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
  }
  componentDidUpdate() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
  }
  connectedCallback() {
    statusNote.statusNote({ source: this.hostElement, type: 'warn' });
  }
  async open() {
    this.opened = true;
  }
  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (index.h("scale-icon-action-success", { class: "notification-message__icon-success", color: "#187431", "aria-hidden": "true" }));
        case 'informational':
          return (index.h("scale-icon-alert-information", { class: "notification-message__icon-information", "aria-hidden": "true" }));
        case 'error':
          return (index.h("scale-icon-alert-error", { class: "notification-message__icon-error", "aria-hidden": "true" }));
        case 'warning':
          return (index.h("scale-icon-alert-warning", { class: "notification-message__icon-information", color: "#AE461C", "aria-hidden": "true" }));
      }
    }
    return;
  }
  render() {
    if (!this.opened) {
      return null;
    }
    return (index.h(index.Host, null, index.h("div", { role: "alert", style: { display: `${this.opened ? '' : 'none'}` }, part: this.getBasePartMap(), class: this.getCssClassMap(), tabindex: "0" }, index.h("div", { part: "container", class: "notification-message__container" }, this.handleIcons(), index.h("div", { part: "heading", class: "notification-message__heading" }, index.h("slot", null, "\u2003"), this.dismissible && (index.h("button", { part: "button-dismissable", type: "button", class: "notification-message__icon-close", onClick: () => this.close(), tabindex: 0, "aria-label": this.closeButtonLabel, title: this.closeButtonTitle, onKeyDown: (e) => {
        if (e.key === 'Enter') {
          this.close();
        }
      } }, index.h("scale-icon-action-circle-close", null)))), this.hasSlotText && (index.h("div", { part: "text", class: "notification-message__text" }, index.h("slot", { name: "text" })))))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const name = 'notification-message';
    const prefix = mode === 'basePart' ? '' : `${name}--`;
    return index$1.classnames(name, this.variant && `${prefix}variant-${this.variant}`);
  }
  get hostElement() { return index.getElement(this); }
};
NotificationMessage.style = notificationMessageCss;

exports.scale_notification_message = NotificationMessage;
