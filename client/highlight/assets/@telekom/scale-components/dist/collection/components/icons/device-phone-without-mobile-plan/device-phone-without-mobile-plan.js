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
export class DevicePhoneWithoutMobilePlan {
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
          h("path", { d: "M14.69 14.689a.75.75 0 01-1.06 0L12 13.06l-1.628 1.629a.751.751 0 01-1.061-1.061L10.94 12l-1.63-1.629a.749.749 0 111.06-1.06L12 10.939l1.629-1.628a.75.75 0 011.06 1.06L13.06 12l1.63 1.628a.75.75 0 010 1.061zM12 21a1.25 1.25 0 11.001-2.5 1.25 1.25 0 010 2.5zM10 3.5h4V2h-4v1.5zm6-3H8a3 3 0 00-3 3v17a3 3 0 003 3h8a3 3 0 003-3v-17a3 3 0 00-3-3z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M14.69 9.311a.75.75 0 00-1.061 0l-1.628 1.628-1.629-1.628a.75.75 0 10-1.061 1.061L10.94 12l-1.629 1.628a.75.75 0 101.061 1.061l1.629-1.629 1.628 1.629a.751.751 0 001.062-1.061L13.061 12l1.629-1.628a.75.75 0 000-1.061zM12.001 18.5a1.25 1.25 0 10-.002 2.498 1.25 1.25 0 00.002-2.498zm5.5 2c0 .827-.674 1.5-1.5 1.5h-8c-.827 0-1.5-.673-1.5-1.5v-17c0-.827.673-1.5 1.5-1.5h2v1.5h4V2h2c.826 0 1.5.673 1.5 1.5v17zm-1.5-20h-8a3 3 0 00-3 3v17a3 3 0 003 3h8a3 3 0 003-3v-17a3 3 0 00-3-3z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-device-phone-without-mobile-plan"; }
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
