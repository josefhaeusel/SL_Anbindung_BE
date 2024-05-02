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
export class HomeWifiConnectionError {
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
          h("path", { d: "M12 18a2 2 0 110 4 2 2 0 010-4zm-1.08-4.4a7.14 7.14 0 00.722 1.925 4.496 4.496 0 00-3.502 2.163l-.11.195-1.437-1.49a6.494 6.494 0 014.327-2.792zm7.017-7.224a5.686 5.686 0 110 11.374 5.687 5.687 0 010-11.374zm-6.5 2.64a7.125 7.125 0 00-.612 2.063 8.985 8.985 0 00-5.8 3.25l-.19.24-1.408-1.458a10.98 10.98 0 018.01-4.095zm7.838.744l-1.338 1.337L16.6 9.76a.683.683 0 00-.966.965l1.338 1.338-1.338 1.337a.683.683 0 00.966.965l1.337-1.337 1.338 1.337a.679.679 0 00.965 0 .683.683 0 000-.965l-1.338-1.337 1.338-1.338a.683.683 0 00-.965-.965zM12 4.5c1.468 0 2.89.206 4.235.587a7.16 7.16 0 00-2.92 1.48A13.466 13.466 0 001.91 11.036l-.23.265L.287 9.855A15.46 15.46 0 0112 4.5z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M12 18a2 2 0 110 4 2 2 0 010-4zm-1.08-4.4a7.14 7.14 0 00.722 1.925 4.496 4.496 0 00-3.502 2.163l-.11.195-1.437-1.49a6.494 6.494 0 014.327-2.792zm7.017-7.224a5.686 5.686 0 110 11.374 5.687 5.687 0 010-11.374zm.007 1.499a4.193 4.193 0 00-4.188 4.187 4.193 4.193 0 004.188 4.188 4.192 4.192 0 004.187-4.188 4.192 4.192 0 00-4.187-4.187zm-6.508 1.14a7.125 7.125 0 00-.61 2.064 8.985 8.985 0 00-5.801 3.25l-.19.24-1.408-1.458a10.98 10.98 0 018.01-4.095zm7.84.745l-1.339 1.337L16.6 9.76a.683.683 0 00-.966.965l1.338 1.338-1.338 1.337a.683.683 0 00.966.965l1.337-1.337 1.338 1.337a.679.679 0 00.965 0 .683.683 0 000-.965l-1.338-1.337 1.338-1.338a.683.683 0 00-.965-.965zM12 4.5c1.468 0 2.89.206 4.235.587a7.16 7.16 0 00-2.92 1.48A13.466 13.466 0 001.91 11.036l-.23.265L.287 9.855A15.46 15.46 0 0112 4.5z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-home-wifi-connection-error"; }
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
