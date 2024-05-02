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
export class ContentRoute {
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
          h("path", { d: "M18 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0m1.418 7.973l.087-.007.05-.087 3.405-5.873a4 4 0 10-6.92 0l2.632 4.54c-1.4.176-4.087.686-5.025 2.058a1.95 1.95 0 00-.258 1.718c.386 1.273 1.888 1.548 3.343 1.815 1.732.317 2.448.551 2.395 1.176-.117 1.402-5.689 1.639-9.544 1.679l-.872 1.505c6.69-.031 11.686-.382 11.911-3.059.175-2.083-2.019-2.484-3.62-2.778-.868-.158-2.057-.376-2.178-.773a.456.456 0 01.061-.436c.547-.801 2.94-1.338 4.533-1.478M7 12a2.5 2.5 0 11.002-5.002A2.5 2.5 0 017 12m4.596-7.096A6.475 6.475 0 007 3a6.475 6.475 0 00-4.596 1.904 6.498 6.498 0 00-1.027 7.856L7 22.458l5.623-9.698a6.498 6.498 0 00-1.027-7.856", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M18 6a1.5 1.5 0 113-.001A1.5 1.5 0 0118 6m1.42 7.973l.085-.007.05-.086 3.405-5.874a4.001 4.001 0 00-6.289-4.835 4.001 4.001 0 00-.632 4.835l2.632 4.54c-1.4.176-4.086.686-5.024 2.058a1.949 1.949 0 00-.258 1.718c.385 1.273 1.888 1.548 3.342 1.815 1.733.317 2.448.551 2.396 1.176-.118 1.401-5.689 1.639-9.544 1.679l-.873 1.505c6.69-.03 11.687-.382 11.912-3.059.174-2.083-2.019-2.484-3.62-2.777-.868-.159-2.057-.377-2.178-.774a.456.456 0 01.061-.436c.547-.801 2.94-1.338 4.534-1.478M7 7a2.5 2.5 0 10.001 5 2.5 2.5 0 000-5m4.325 5.008L7 19.467l-4.326-7.459a5.007 5.007 0 01.79-6.044A4.97 4.97 0 017 4.5c1.335 0 2.591.52 3.535 1.464a5.007 5.007 0 01.791 6.044m.27-7.104A6.48 6.48 0 007 3a6.498 6.498 0 00-5.623 9.76L7 22.458l5.623-9.698a6.5 6.5 0 00-1.027-7.856", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-route"; }
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
