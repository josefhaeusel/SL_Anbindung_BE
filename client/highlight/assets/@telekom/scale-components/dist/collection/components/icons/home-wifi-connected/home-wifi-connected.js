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
export class HomeWifiConnected {
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
          h("path", { d: "M12 18a2 2 0 110 4 2 2 0 010-4zm-1.08-4.4a7.15 7.15 0 00.723 1.925A4.495 4.495 0 008.14 17.69l-.11.194-1.436-1.49A6.496 6.496 0 0110.92 13.6zm7.018-7.226a5.688 5.688 0 11-.002 11.376 5.688 5.688 0 01.002-11.376zm-6.5 2.642a7.08 7.08 0 00-.612 2.062 8.992 8.992 0 00-5.802 3.25l-.19.241-1.406-1.459a10.977 10.977 0 018.01-4.094zm8.395 1.031l-2.565 2.564-1.282-1.28a.683.683 0 00-.965.964l2.247 2.247 3.53-3.53a.681.681 0 10-.965-.965zM12 4.5c1.469 0 2.89.205 4.236.588a7.148 7.148 0 00-2.921 1.481A13.602 13.602 0 0012 6.5a13.463 13.463 0 00-10.091 4.537l-.228.263L.287 9.855A15.459 15.459 0 0112 4.5z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M12 18a2 2 0 110 4 2 2 0 010-4zm-1.08-4.4a7.15 7.15 0 00.723 1.925A4.495 4.495 0 008.14 17.69l-.11.194-1.436-1.49A6.496 6.496 0 0110.92 13.6zm7.018-7.226a5.688 5.688 0 11-.002 11.376 5.688 5.688 0 01.002-11.376zm.006 1.501a4.193 4.193 0 00-4.188 4.187 4.193 4.193 0 004.188 4.188 4.192 4.192 0 004.187-4.188 4.192 4.192 0 00-4.187-4.187zm-6.506 1.141a7.08 7.08 0 00-.612 2.062 8.992 8.992 0 00-5.802 3.25l-.19.241-1.406-1.459a10.977 10.977 0 018.01-4.094zm8.395 1.031l-2.565 2.564-1.282-1.28a.683.683 0 00-.965.964l2.247 2.247 3.53-3.53a.681.681 0 10-.965-.965zM12 4.5c1.469 0 2.89.205 4.236.588a7.148 7.148 0 00-2.921 1.481A13.602 13.602 0 0012 6.5a13.463 13.463 0 00-10.091 4.537l-.228.263L.287 9.855A15.459 15.459 0 0112 4.5z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-home-wifi-connected"; }
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
