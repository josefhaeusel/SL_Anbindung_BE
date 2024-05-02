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
export class HomePreferredWifi {
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
          h("path", { d: "M12.006 18a2 2 0 11-.001 4.001A2 2 0 0112.006 18zm-1.08-4.4c.15.684.394 1.33.722 1.926a4.494 4.494 0 00-3.501 2.162l-.11.195-1.438-1.49a6.494 6.494 0 014.327-2.792zm.517-4.584a7.157 7.157 0 00-.612 2.063 8.985 8.985 0 00-5.801 3.25l-.19.242-1.407-1.46a10.98 10.98 0 018.01-4.095zm6.505.247a.254.254 0 01.234.15l.59 1.441 1.563.115a.255.255 0 01.132.453l-1.193 1.008.373 1.517a.257.257 0 01-.099.267.258.258 0 01-.283.011l-1.324-.823-1.322.823a.257.257 0 01-.383-.278l.373-1.517-1.193-1.008a.257.257 0 01-.079-.275.252.252 0 01.225-.175l1.564-.115.59-1.443a.256.256 0 01.232-.15zM12.006 4.5c1.47 0 2.89.205 4.235.587a7.158 7.158 0 00-2.92 1.48 13.47 13.47 0 00-11.405 4.468l-.23.264L.293 9.854A15.464 15.464 0 0112.006 4.5zm5.938 1.875a5.687 5.687 0 11-.001 11.375 5.687 5.687 0 010-11.375z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M12.006 18a2 2 0 11-.001 4.001A2 2 0 0112.006 18zm-1.08-4.4c.15.684.394 1.33.722 1.926a4.494 4.494 0 00-3.501 2.162l-.11.195-1.438-1.49a6.494 6.494 0 014.327-2.792zm.517-4.584a7.157 7.157 0 00-.612 2.063 8.985 8.985 0 00-5.801 3.25l-.19.242-1.407-1.46a10.98 10.98 0 018.01-4.095zm6.505.247a.254.254 0 01.234.15l.59 1.441 1.563.115a.255.255 0 01.132.453l-1.193 1.008.373 1.517a.257.257 0 01-.099.267.258.258 0 01-.283.011l-1.324-.823-1.322.823a.257.257 0 01-.383-.278l.373-1.517-1.193-1.008a.257.257 0 01-.079-.275.252.252 0 01.225-.175l1.564-.115.59-1.443a.256.256 0 01.232-.15zM12.006 4.5c1.47 0 2.89.205 4.235.587a7.158 7.158 0 00-2.92 1.48 13.47 13.47 0 00-11.405 4.468l-.23.264L.293 9.854A15.464 15.464 0 0112.006 4.5zm5.938 1.875a5.687 5.687 0 11-.001 11.375 5.687 5.687 0 010-11.375zm0 1.5a4.192 4.192 0 00-4.187 4.187 4.192 4.192 0 004.187 4.188 4.192 4.192 0 004.187-4.188 4.192 4.192 0 00-4.187-4.187z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-home-preferred-wifi"; }
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
