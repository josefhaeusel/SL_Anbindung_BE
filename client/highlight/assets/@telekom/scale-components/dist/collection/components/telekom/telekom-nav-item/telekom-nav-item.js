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
import { Component, h, Host, Element, Prop, Watch } from '@stencil/core';
// TODO maybe we want to add the <scale-icon-navigation-external-link size="11"> icon
// automatically when inside variant="meta-nav-external"?
// TODO? turn into util
function toggleAriaCurrent(element, value, attrValue = 'page') {
  if (value) {
    element.setAttribute('aria-current', attrValue);
  }
  else {
    element.removeAttribute('aria-current');
  }
}
export class TelekomNavItem {
  constructor() {
    this.active = false;
    this.variant = 'main-nav';
    this.role = 'none';
    this.hideOnMobile = false;
    this.hideOnDesktop = false;
  }
  activeChanged(newValue) {
    if (this.linkElement == null) {
      return;
    }
    if (this.variant === 'lang-switcher' || this.variant === 'main-nav') {
      toggleAriaCurrent(this.linkElement, newValue, this.active ? 'true' : 'false');
    }
  }
  connectedCallback() {
    this.activeChanged(this.active);
  }
  componentDidLoad() {
    var _a;
    const child = Array.from(this.hostElement.children).find((el) => el.matches('a, button'));
    const parentRole = (_a = this.hostElement.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('role');
    if (parentRole === 'menu') {
      child.setAttribute('role', 'menuitem');
    }
  }
  get linkElement() {
    return this.hostElement.querySelector('a, button');
  }
  render() {
    return (
    // The `scale-telekom-nav-item` class is used to avoid coupling styles to the tagname
    // (which can be different based on who defines it)
    h(Host, { class: {
        'scale-telekom-nav-item': true,
        'scl-hide-on-mobile': this.hideOnMobile,
        'scl-hide-on-desktop': this.hideOnDesktop,
      } },
      h("slot", null)));
  }
  static get is() { return "scale-telekom-nav-item"; }
  static get originalStyleUrls() { return {
    "$": ["telekom-nav-item.css"]
  }; }
  static get styleUrls() { return {
    "$": ["telekom-nav-item.css"]
  }; }
  static get properties() { return {
    "active": {
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
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| 'meta-nav-external'\n    | 'meta-nav'\n    | 'lang-switcher'\n    | 'main-nav'\n    | 'functions'",
        "resolved": "\"functions\" | \"lang-switcher\" | \"main-nav\" | \"meta-nav\" | \"meta-nav-external\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "variant",
      "reflect": true,
      "defaultValue": "'main-nav'"
    },
    "role": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | null",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "role",
      "reflect": true,
      "defaultValue": "'none'"
    },
    "hideOnMobile": {
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
      "attribute": "hide-on-mobile",
      "reflect": true,
      "defaultValue": "false"
    },
    "hideOnDesktop": {
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
      "attribute": "hide-on-desktop",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "hostElement"; }
  static get watchers() { return [{
      "propName": "active",
      "methodName": "activeChanged"
    }, {
      "propName": "variant",
      "methodName": "activeChanged"
    }]; }
}
