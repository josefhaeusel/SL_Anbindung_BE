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
import { Component, Prop, h, Element, Event, State, Host, Watch, } from '@stencil/core';
import cn from 'classnames';
import { animationsFinished } from '../../utils/utils';
const ICON_SIZE = 20;
const iconVariantNameMap = {
  informational: 'scale-icon-alert-information',
  warning: 'scale-icon-alert-warning',
  success: 'scale-icon-action-success',
  danger: 'scale-icon-alert-error',
};
export class Notification {
  constructor() {
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
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      h("div", { part: cn('base', this.animationState, `type-${this.type}`, `variant-${this.variant}`, this.isOpen && 'open'), role: this.innerRole },
        h("div", { part: "icon", "aria-hidden": "true" },
          h("slot", { name: "icon" },
            h(IconTag, { size: ICON_SIZE, selected: this.type === 'toast' }))),
        h("div", { part: "body" },
          h("div", { part: "heading", role: "heading", "aria-level": this.headingLevel, "aria-label": `${this.ariaHeading} ${this.heading}` },
            this.heading ? h("span", null, this.heading) : null,
            h("slot", { name: "heading" })),
          this.hasTextSlot && (h("div", { part: "text" },
            h("slot", { name: "text" })))),
        this.dismissible && (h("scale-button", { part: "close-button", variant: "ghost", onClick: () => {
            this.lastCloseEventTrigger = 'CLOSE_BUTTON';
            this.opened = false;
          } },
          h("slot", { name: "close-icon" },
            h("scale-icon-action-circle-close", { "aria-label": this.closeButtonLabel, accessibilityTitle: this.closeButtonTitle, decorative: true, size: ICON_SIZE })))))));
  }
  static get is() { return "scale-notification"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./notification.css"]
  }; }
  static get styleUrls() { return {
    "$": ["notification.css"]
  }; }
  static get properties() { return {
    "heading": {
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
        "text": "Heading"
      },
      "attribute": "heading",
      "reflect": false
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'inline' | 'banner' | 'toast'",
        "resolved": "\"banner\" | \"inline\" | \"toast\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Type"
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'inline'"
    },
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'danger' | 'warning' | 'success' | 'informational'",
        "resolved": "\"danger\" | \"informational\" | \"success\" | \"warning\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Variant"
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'informational'"
    },
    "opened": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Visible"
      },
      "attribute": "opened",
      "reflect": true
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
        "text": "(optional) Show the close button"
      },
      "attribute": "dismissible",
      "reflect": false,
      "defaultValue": "false"
    },
    "delay": {
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
        "text": "(optional) Time in milliseconds until it closes by itself"
      },
      "attribute": "delay",
      "reflect": false
    },
    "innerAriaLive": {
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
        "tags": [{
            "name": "deprecated",
            "text": "- ariaRole should replace innerAriaLive"
          }],
        "text": ""
      },
      "attribute": "inner-aria-live",
      "reflect": false,
      "defaultValue": "'assertive'"
    },
    "innerRole": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'alert' | 'status'",
        "resolved": "\"alert\" | \"status\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) string prepended to the heading"
      },
      "attribute": "inner-role",
      "reflect": false,
      "defaultValue": "'alert'"
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
      "defaultValue": "'Close'"
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
        "text": "(optional) `title` for close button"
      },
      "attribute": "close-button-title",
      "reflect": false,
      "defaultValue": "'Close'"
    },
    "headingLevel": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Default aria-level for heading"
      },
      "attribute": "heading-level",
      "reflect": false,
      "defaultValue": "2"
    },
    "ariaHeading": {
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
        "text": "(optional) string prepended to the heading"
      },
      "attribute": "aria-heading",
      "reflect": false,
      "defaultValue": "'Information'"
    },
    "styles": {
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
        "text": "(optional) Injected styles"
      },
      "attribute": "styles",
      "reflect": false
    }
  }; }
  static get states() { return {
    "isOpen": {},
    "animationState": {},
    "hasTextSlot": {}
  }; }
  static get events() { return [{
      "method": "scaleOpen",
      "name": "scale-open",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires after the notification has been opened"
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleBeforeClose",
      "name": "scale-before-close",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires on every close attempt. Calling `event.preventDefault()` will prevent the modal from closing"
      },
      "complexType": {
        "original": "BeforeCloseEventDetail",
        "resolved": "BeforeCloseEventDetail",
        "references": {
          "BeforeCloseEventDetail": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "scaleClose",
      "name": "scale-close",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires after the notification has been closed"
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get elementRef() { return "hostElement"; }
  static get watchers() { return [{
      "propName": "opened",
      "methodName": "openedChanged"
    }]; }
}
