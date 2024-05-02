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
export class AlertPasswordBreaking {
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
          h("path", { d: "M17.25 6.013a4.75 4.75 0 014.03 2.241l.11.186-1.345.673a3.248 3.248 0 00-2.795-1.6 3.254 3.254 0 00-3.244 3.066l-.005.184V12.5h9.5V19a3 3 0 01-2.824 2.995L20.5 22H14a3 3 0 01-2.994-2.824L11 19v-6.5h1.5v-1.737a4.756 4.756 0 014.75-4.75zm0 9.487c-.69 0-1.25.56-1.25 1.25 0 .363.157.686.404.914l.096.08V19H18v-1.256c.302-.228.5-.586.5-.994 0-.69-.559-1.25-1.25-1.25zM22 2v4.712a6.221 6.221 0 00-9.005-.514 1.248 1.248 0 00-2.494.052c0 .69.559 1.25 1.25 1.25.065 0 .128-.01.191-.02a6.19 6.19 0 00-.908 2.72l-.02.3H3.501A3.003 3.003 0 01.506 7.676L.5 7.5V2H22zM8.25 5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm-3.5 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M23.5 12.5V19a3 3 0 01-2.824 2.995L20.5 22H14a3 3 0 01-2.995-2.824L11 19v-6.5h1.5v-1.736a4.756 4.756 0 014.75-4.75c1.775 0 3.327.979 4.142 2.426l-1.344.671a3.252 3.252 0 00-2.798-1.598 3.254 3.254 0 00-3.25 3.25V12.5h9.5zM22 14h-9.5v5c0 .778.596 1.42 1.356 1.493L14 20.5h6.5c.778 0 1.42-.596 1.493-1.356L22 19v-5zm-4.75 1.5a1.25 1.25 0 01.751 2.25L18 19h-1.5v-1.25a1.25 1.25 0 01.75-2.25zM22 2v4.707a6.298 6.298 0 00-1.5-1.28V3.5H2v4C2 8.327 2.673 9 3.5 9h7.753a6.22 6.22 0 00-.248 1.5H3.5c-1.655 0-3-1.345-3-3V2H22zM4.75 5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3.5 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3.5 0c.67 0 1.216.526 1.248 1.188a6.249 6.249 0 00-1.067 1.297A1.25 1.25 0 1111.75 5z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-alert-password-breaking"; }
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
