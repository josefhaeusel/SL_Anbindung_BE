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
import { Component, Prop, Host, Element, h } from '@stencil/core';
export class UserFileBoy {
  constructor() {
    /** (optional) The width and height in pixels */
    this.size = 24;
    /** (optional) Sets the icon color via the `fill` attribute */
    this.fill = 'currentColor';
    /** (optional) Alias for `fill` */
    this.color = 'currentColor';
    /** (optional) If `true`, the icon changes visually */
    this.selected = false;
    /** (optional) If `true` the SVG element will get `aria-hidden="true"` */
    this.decorative = false;
    /** (optional) If `true` the icon can receive focus */
    this.focusable = false;
  }
  connectedCallback() {
    if (!this.hostElement.hasAttribute('styles')) {
      this.hostElement.style.display = 'inline-flex';
    }
  }
  render() {
    const ariaHidden = this.decorative ? { 'aria-hidden': 'true' } : {};
    const focusable = this.focusable ? { tabindex: 0 } : {};
    return (h(Host, null,
      h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable),
        this.accessibilityTitle && h("title", null, this.accessibilityTitle),
        h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null,
          h("path", { d: "M9.561 19.006L12 21.447l2.44-2.44h1.674c1.017 0 1.948.395 2.637 1.052.792.755 1.028 1.532 1.18 2.442H4.068c.165-.99.455-1.835 1.347-2.591a3.811 3.811 0 012.471-.902h1.675zM12.204 2.5l.343 1.098c4.177-.135 5.488 3.414 5.813 6.473a8.354 8.354 0 01-.794.107 6.4 6.4 0 01.085 1.02c0 3.18-2.27 6.585-5.651 6.585-3.38 0-5.652-3.405-5.652-6.585 0-1.297.108-2.313.304-3.104-1.212-1.523-.654-2.962-.654-2.962l1.793.324c.243-1.522 1.664-2.61 4.413-2.956zM9.733 9.21c-.324.611-1.037 1.14-1.85 1.442-.02.179-.035.36-.035.546 0 2.455 1.668 5.085 4.152 5.085 2.483 0 4.151-2.629 4.151-5.086 0-.363-.044-.71-.12-1.04a6.616 6.616 0 01-2.397-.758c.308.882.612 1.722.612 1.722-2.821-.437-4.104-1.508-4.428-1.822l-.055-.056-.03-.033z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M9.561 19.006L12 21.447l2.44-2.44h1.674c1.017 0 1.948.395 2.637 1.052.792.755 1.028 1.532 1.18 2.442H4.068c.165-.99.455-1.835 1.347-2.591a3.811 3.811 0 012.471-.902h1.675zM12.204 2.5l.343 1.098c4.177-.135 5.488 3.414 5.813 6.473a8.354 8.354 0 01-.794.107 6.4 6.4 0 01.085 1.02c0 3.18-2.27 6.585-5.651 6.585-3.38 0-5.652-3.405-5.652-6.585 0-1.297.108-2.313.304-3.104-1.212-1.523-.654-2.962-.654-2.962l1.793.324c.243-1.522 1.664-2.61 4.413-2.956zM9.733 9.21c-.324.611-1.037 1.14-1.85 1.442-.02.179-.035.36-.035.546 0 2.455 1.668 5.085 4.152 5.085 2.483 0 4.151-2.629 4.151-5.086 0-.363-.044-.71-.12-1.04a6.616 6.616 0 01-2.397-.758c.308.882.612 1.722.612 1.722-2.821-.437-4.104-1.508-4.428-1.822l-.055-.056-.03-.033z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-user-file-boy"; }
  static get originalStyleUrls() { return {
    "$": ["../../icon/icon.css"]
  }; }
  static get styleUrls() { return {
    "$": ["../../icon/icon.css"]
  }; }
  static get properties() { return {
    "size": {
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
        "text": "(optional) The width and height in pixels"
      },
      "attribute": "size",
      "reflect": true,
      "defaultValue": "24"
    },
    "fill": {
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
        "text": "(optional) Sets the icon color via the `fill` attribute"
      },
      "attribute": "fill",
      "reflect": false,
      "defaultValue": "'currentColor'"
    },
    "color": {
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
        "text": "(optional) Alias for `fill`"
      },
      "attribute": "color",
      "reflect": false,
      "defaultValue": "'currentColor'"
    },
    "selected": {
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
        "text": "(optional) If `true`, the icon changes visually"
      },
      "attribute": "selected",
      "reflect": true,
      "defaultValue": "false"
    },
    "decorative": {
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
        "text": "(optional) If `true` the SVG element will get `aria-hidden=\"true\"`"
      },
      "attribute": "decorative",
      "reflect": false,
      "defaultValue": "false"
    },
    "accessibilityTitle": {
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
        "text": "(optional) When using the icon standalone, make it meaningful for accessibility"
      },
      "attribute": "accessibility-title",
      "reflect": false
    },
    "focusable": {
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
        "text": "(optional) If `true` the icon can receive focus"
      },
      "attribute": "focusable",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
