/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { Component, h, Host, Prop, Element, Method, Event, } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { emitEvent } from '../../utils/utils';
export class NotificationBanner {
  constructor() {
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
    return (h(Host, null,
      h("div", { role: "alert", style: { display: `${this.opened ? '' : 'none'}` }, part: this.getBasePartMap(), class: this.getCssClassMap(), tabindex: "0" },
        h("div", { part: "container", class: "notification-banner__container" },
          this.handleIcons(),
          h("div", { part: "heading", class: "notification-banner__heading" },
            h("slot", null),
            this.dismissible && (h("button", { part: "button-dismissable", type: "button", class: "notification-banner__button-close", onClick: () => this.close(), tabindex: 0, "aria-label": this.closeButtonLabel, title: this.closeButtonTitle, onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  this.close();
                }
              } },
              h("scale-icon-action-circle-close", null))),
            this.hasSlotText && (h("div", { part: "text", class: "notification-banner__text" },
              h("slot", { name: "text" }))),
            this.hasSlotLink && (h("scale-link", { href: this.href, class: "notification-banner__link", role: "link" },
              h("slot", { name: "link" }))))))));
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
    return classNames(name, this.variant && `${prefix}variant-${this.variant}`, this.hasSlotText && `${prefix}has-text`, !this.hasSlotText && `${prefix}has-no-text`, this.hasSlotLink && `${prefix}has-link`, !this.hasSlotLink && `${prefix}has-no-link`);
  }
  static get is() { return "scale-notification-banner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["notification-banner.css"]
  }; }
  static get styleUrls() { return {
    "$": ["notification-banner.css"]
  }; }
  static get properties() { return {
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'informational' | 'success' | 'warning' | 'error'",
        "resolved": "\"error\" | \"informational\" | \"success\" | \"warning\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'informational'"
    },
    "dismissible": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "dismissible",
      "reflect": false,
      "defaultValue": "false"
    },
    "opened": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "opened",
      "reflect": true
    },
    "autoHide": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "auto-hide",
      "reflect": false,
      "defaultValue": "false"
    },
    "autoHideDuration": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "auto-hide-duration",
      "reflect": false,
      "defaultValue": "3000"
    },
    "href": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "href",
      "reflect": false
    },
    "closeButtonLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Label for close button"
      },
      "attribute": "close-button-label",
      "reflect": false,
      "defaultValue": "'close'"
    },
    "closeButtonTitle": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Title for close button"
      },
      "attribute": "close-button-title",
      "reflect": false,
      "defaultValue": "'close'"
    }
  }; }
  static get events() { return [{
      "method": "scaleClose",
      "name": "scale-close",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when the notification banner has been dismissed"
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "open": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
