import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { s as statusNote } from './status-note.js';
import { e as emitEvent } from './utils.js';
import { d as defineCustomElement$7 } from './action-circle-close.js';
import { d as defineCustomElement$6 } from './action-success.js';
import { d as defineCustomElement$5 } from './alert-error.js';
import { d as defineCustomElement$4 } from './alert-information.js';
import { d as defineCustomElement$3 } from './alert-warning.js';
import { d as defineCustomElement$2 } from './link.js';

const notificationBannerCss = ":host{--width:100%;--radius:var(--telekom-radius-standard);--background-error:var(--telekom-color-functional-danger-subtle);--background-warning:var(--telekom-color-functional-warning-subtle);--background-informational:var(\n    --telekom-color-functional-informational-subtle\n  );--background-success:var(--telekom-color-functional-success-subtle)}.notification-banner{border-radius:var(--radius);width:var(--width);position:relative;box-shadow:var(--telekom-shadow-overlay);min-height:48px}.notification-banner--variant-error{background-color:var(--background-error)}.notification-banner--variant-warning{background-color:var(--background-warning)}.notification-banner--variant-informational{background-color:var(--background-informational)}.notification-banner--variant-success{background-color:var(--background-success)}.notification-banner__heading{margin:14px 48px 14px 48px;padding:13px 0 13px 0;font-weight:var(--telekom-typography-font-weight-bold);line-height:22px}.notification-banner__text ::slotted(*){margin:-10px 0px -25px 0px;line-height:16px;padding:13px 0 15px 0}.notification-banner--has-no-link .notification-banner__text ::slotted(*){margin:-10px 0px -14px 0px;line-height:16px;padding-bottom:15px}.notification-banner--has-no-text .notification-banner__link ::slotted(*){margin:0;padding:0px 0px 0px 16px}.notification-banner--has-text .notification-banner__link ::slotted(*){margin:20px 0 0 0;padding-bottom:2px;line-height:20px}::slotted(*){font-weight:var(--telekom-typography-font-weight-regular)}.notification-banner__button-close{position:absolute;top:8px;right:13.5px;color:#191919;border:none;cursor:pointer;margin:0;padding:0;background:transparent}.notification-banner__button-close svg{height:19px;width:19px;padding:6.5px;border-radius:20%;color:var(--telekom-color-text-and-icon-standard)}.notification-banner__button-close:hover svg{background-color:white;color:var(--telekom-color-text-and-icon-primary-hovered)}.notification-banner__icon-success{position:absolute;top:12.5px;left:17px;height:20px;width:20px;color:var(--telekom-color-text-and-icon-functional-success)}.notification-banner__icon-error{position:absolute;top:12px;left:17px;height:20px;width:20px;color:var(--telekom-color-text-and-icon-functional-danger)}.notification-banner__icon-information{position:absolute;top:12px;left:17px;height:20px;width:20px;color:var(--telekom-color-text-and-icon-functional-informational)}@media screen and (forced-colors: active), (-ms-high-contrast: active){.notification-banner__button-close svg{color:hsl(0, 0%, 100%)}.notification-banner{border:1px solid hsl(0, 0%, 100%)}.notification-banner__heading{margin:0px 48px 0px 48px}}";

const NotificationBanner = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleClose = createEvent(this, "scale-close", 7);
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
      emitEvent(this, 'scaleClose');
    };
  }
  componentWillLoad() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
    this.hasSlotLink = !!this.hostElement.querySelector('[slot=link]');
  }
  componentDidUpdate() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
    this.hasSlotLink = !!this.hostElement.querySelector('[slot=link]');
  }
  connectedCallback() {
    statusNote({ source: this.hostElement, type: 'warn' });
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
  }
  async open() {
    this.opened = true;
  }
  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (h("scale-icon-action-success", { class: "notification-banner__icon-success", color: "#187431", "accessibility-title": "success", "aria-hidden": "true" }));
        case 'informational':
          return (h("scale-icon-alert-information", { class: "notification-banner__icon-information", "accessibility-title": "information", "aria-hidden": "true" }));
        case 'error':
          return (h("scale-icon-alert-error", { class: "notification-banner__icon-error", "accessibility-title": "error", "aria-hidden": "true" }));
        case 'warning':
          return (h("scale-icon-alert-warning", { class: "notification-banner__icon-information", color: "#AE461C", "aria-hidden": "true" }));
      }
    }
    return;
  }
  render() {
    if (!this.opened) {
      return null;
    }
    return (h(Host, null, h("div", { role: "alert", style: { display: `${this.opened ? '' : 'none'}` }, part: this.getBasePartMap(), class: this.getCssClassMap(), tabindex: "0" }, h("div", { part: "container", class: "notification-banner__container" }, this.handleIcons(), h("div", { part: "heading", class: "notification-banner__heading" }, h("slot", null), this.dismissible && (h("button", { part: "button-dismissable", type: "button", class: "notification-banner__button-close", onClick: () => this.close(), tabindex: 0, "aria-label": this.closeButtonLabel, title: this.closeButtonTitle, onKeyDown: (e) => {
        if (e.key === 'Enter') {
          this.close();
        }
      } }, h("scale-icon-action-circle-close", null))), this.hasSlotText && (h("div", { part: "text", class: "notification-banner__text" }, h("slot", { name: "text" }))), this.hasSlotLink && (h("scale-link", { href: this.href, class: "notification-banner__link", role: "link" }, h("slot", { name: "link" }))))))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const name = 'notification-banner';
    const prefix = mode === 'basePart' ? '' : `${name}--`;
    return classnames(name, this.variant && `${prefix}variant-${this.variant}`, this.hasSlotText && `${prefix}has-text`, !this.hasSlotText && `${prefix}has-no-text`, this.hasSlotLink && `${prefix}has-link`, !this.hasSlotLink && `${prefix}has-no-link`);
  }
  get hostElement() { return this; }
  static get style() { return notificationBannerCss; }
}, [1, "scale-notification-banner", {
    "variant": [1],
    "dismissible": [4],
    "opened": [516],
    "autoHide": [4, "auto-hide"],
    "autoHideDuration": [2, "auto-hide-duration"],
    "href": [1],
    "closeButtonLabel": [1, "close-button-label"],
    "closeButtonTitle": [1, "close-button-title"],
    "open": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-notification-banner", "scale-icon-action-circle-close", "scale-icon-action-success", "scale-icon-alert-error", "scale-icon-alert-information", "scale-icon-alert-warning", "scale-link"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-notification-banner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NotificationBanner);
      }
      break;
    case "scale-icon-action-circle-close":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "scale-icon-action-success":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "scale-icon-alert-error":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "scale-icon-alert-information":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "scale-icon-alert-warning":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "scale-link":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ScaleNotificationBanner = NotificationBanner;
const defineCustomElement = defineCustomElement$1;

export { ScaleNotificationBanner, defineCustomElement };
