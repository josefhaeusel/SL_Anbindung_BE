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
export class ContentRss {
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
          h("path", { d: "M19 2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zM7.22 18.5a1.725 1.725 0 110-3.45 1.725 1.725 0 010 3.45zm6.085-.5H11.76c.11-.408.167-.828.17-1.25A4.755 4.755 0 007.18 12a4.6 4.6 0 00-1.18.155v-1.54a6.13 6.13 0 011.18-.115 6.26 6.26 0 016.125 7.5zm4.545 0h-1.5a9.37 9.37 0 00.095-1.25A9.26 9.26 0 007.18 7.5 9.23 9.23 0 006 7.585v-1.5c.391-.051.785-.08 1.18-.085 5.935.006 10.744 4.815 10.75 10.75a10.29 10.29 0 01-.08 1.25z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M19 2a3.003 3.003 0 012.995 2.824L22 5v14a3.003 3.003 0 01-2.824 2.995L19 22H5a3.003 3.003 0 01-2.995-2.824L2 19V5a3.003 3.003 0 012.824-2.995L5 2h14zm0 1.5H5c-.776 0-1.42.598-1.493 1.356L3.5 5v14c0 .776.598 1.42 1.356 1.493L5 20.5h14c.776 0 1.42-.598 1.493-1.356L20.5 19V5c0-.776-.598-1.42-1.356-1.493L19 3.5zM7.22 15.06a1.72 1.72 0 110 3.44 1.72 1.72 0 010-3.44zm-.04-4.56a6.259 6.259 0 016.178 7.194l-.053.306H11.76c.105-.4.17-.815.17-1.25 0-2.62-2.13-4.75-4.75-4.75-.328 0-.643.038-.95.102l-.23.053v-1.54c.38-.075.775-.115 1.18-.115zm0-4.5c5.93 0 10.75 4.82 10.75 10.75 0 .283-.013.562-.037.838L17.85 18h-1.515c.055-.41.095-.825.095-1.25 0-5.1-4.15-9.25-9.25-9.25a8.19 8.19 0 00-.79.04L6 7.586V6.07c.39-.045.78-.07 1.18-.07z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-rss"; }
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
