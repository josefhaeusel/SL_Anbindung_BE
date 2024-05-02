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
import { Component, h, Host, Element, Event, Listen, Method, Prop, State, Watch, } from '@stencil/core';
import cx from 'classnames';
import { emitEvent, animationsFinished } from '../../../utils/utils';
/*
TODO add something like this with a better-named prop defaulting to false

if (this.allowInjectingStyleToBody) {
  this.bodyOverflowValue = document.body.style.overflow;
  // The following style will disable body from scrolling when modal is open
  document.body.style.setProperty('overflow', 'hidden');
}
*/
export class TelekomNavItem {
  constructor() {
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
    return (h(Host, null,
      h("div", { part: cx('base', this.animationState, `variant-${this.variant}`, {
          expanded: this.isExpanded,
        }) },
        h("slot", null)),
      h("div", { part: cx('backdrop', this.animationState, `variant-${this.variant}`, {
          expanded: this.isExpanded,
        }), onClick: () => (this.expanded = false) })));
  }
  static get is() { return "scale-telekom-nav-flyout"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["telekom-nav-flyout.css"]
  }; }
  static get styleUrls() { return {
    "$": ["telekom-nav-flyout.css"]
  }; }
  static get properties() { return {
    "expanded": {
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
        "text": "Open the flyout menu"
      },
      "attribute": "expanded",
      "reflect": true,
      "defaultValue": "false"
    },
    "triggerSelector": {
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
        "text": "(optional) Selector to query the trigger element in case it's not the previous sibling"
      },
      "attribute": "trigger-selector",
      "reflect": false
    },
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "null | 'mobile'",
        "resolved": "\"mobile\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Variant (\"mobile\" gives it a fixed height of `100vh`)"
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "null"
    },
    "hover": {
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
        "text": "(optinal) Whether the flyout should open on hover (needs better name!)"
      },
      "attribute": "hover",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "isExpanded": {},
    "animationState": {}
  }; }
  static get events() { return [{
      "method": "scaleExpanded",
      "name": "scale-expanded",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "show": {
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
    },
    "hide": {
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
  static get watchers() { return [{
      "propName": "expanded",
      "methodName": "expandedChanged"
    }]; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "handleWindowKeydown",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "scale-close-nav-flyout",
      "method": "handleScaleCloseNavFlyout",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "click",
      "method": "handleDocumentClick",
      "target": "document",
      "capture": false,
      "passive": false
    }]; }
}
