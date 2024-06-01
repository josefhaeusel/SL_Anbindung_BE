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
export class ContentFood {
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
          h("path", { d: "M5.002 1v6.25c0 1.24 1.009 2.25 2.25 2.25a2.253 2.253 0 002.244-2.096l.005-.154V1h1.5v6.25a3.75 3.75 0 01-2.062 3.346l-.177.084.61 10.573a2.124 2.124 0 11-4.244.152l.003-.152.61-10.573a3.755 3.755 0 01-2.234-3.223l-.006-.207V1h1.5zM17.23 0c1.334 0 2.46.958 2.688 2.256l.024.172 1.026 9.24a3.005 3.005 0 01-.745 2.333 3.005 3.005 0 01-2.04.993l-.196.006h-.203l.713 6.269a2.005 2.005 0 11-3.991.376l-.005-.15V2.73A2.732 2.732 0 0117.23 0zM8 1v6.25a.75.75 0 01-1.493.102l-.006-.102V1h1.5z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M17.229 0c1.334 0 2.46.958 2.688 2.256l.024.172 1.027 9.24a3.005 3.005 0 01-.746 2.333 3.005 3.005 0 01-2.04.993l-.195.006h-.203l.713 6.269a2.005 2.005 0 11-3.992.376l-.005-.15V2.73A2.732 2.732 0 0117.229 0zM5 1v6.25C5 8.49 6.01 9.5 7.25 9.5a2.253 2.253 0 002.245-2.096L9.5 7.25V1H11v6.25a3.75 3.75 0 01-2.062 3.346l-.178.084.61 10.573a2.124 2.124 0 11-4.244.152l.003-.152.61-10.573a3.755 3.755 0 01-2.233-3.223L3.5 7.25V1H5zm12.229.5c-.635 0-1.16.485-1.223 1.104L16 2.729V13.5h1.986a1.48 1.48 0 001.118-.5 1.48 1.48 0 00.382-1.005l-.01-.16-1.026-9.242A1.227 1.227 0 0017.229 1.5zM8 1v6.25a.75.75 0 01-1.493.102L6.5 7.25V1H8z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-food"; }
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
