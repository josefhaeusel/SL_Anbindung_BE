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
export class ContentDiscount {
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
          h("path", { d: "M12.44 1.535l8.785 1.3 1.3 8.78-10.305 10.31a3.065 3.065 0 01-4.325 0l-5.76-5.765a3.05 3.05 0 010-4.32L12.44 1.535zm.635 12.8a1.925 1.925 0 100 2.705v.02a1.905 1.905 0 000-2.725zm-1.344.557a.785.785 0 01.574.228.83.83 0 01-1.17 1.17.79.79 0 01.035-1.14.785.785 0 01.561-.258zm3.574-3.877L6.5 13.05l1 1 8.805-2.035-1-1zm-3.423-3.446A1.925 1.925 0 009.78 8a1.905 1.905 0 000 2.7 1.925 1.925 0 102.102-3.131zm-1.287 1.266a.83.83 0 011.125-.045.775.775 0 01-.035 1.135.775.775 0 01-1.135.035.83.83 0 01.045-1.125zm7.745-3.12a1.018 1.018 0 00-1.44 0 1 1 0 000 1.44 1 1 0 001.44 0 1.018 1.018 0 000-1.44z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M12.441 1.533l8.781 1.302 1.303 8.782L12.22 21.922a3.048 3.048 0 01-2.162.895 3.04 3.04 0 01-1.993-.74l-.168-.155-5.762-5.762a3.056 3.056 0 01-.132-4.18l.132-.142L12.441 1.534zm.526 1.594L3.196 12.9A1.546 1.546 0 002.74 14c0 .363.124.707.352.985l.104.115 5.762 5.762c.294.294.685.456 1.1.456.364 0 .708-.124.986-.352l.114-.104 9.772-9.772-1.028-6.935-6.935-1.028zm.1 11.23c.755.755.762 1.948.008 2.701a1.906 1.906 0 01-2.71 0 1.915 1.915 0 01-.008-2.717 1.905 1.905 0 012.71.016zm-1.899.795c-.333.333-.348.82-.032 1.136.316.317.795.292 1.128-.04.332-.333.356-.812.04-1.128-.317-.316-.803-.3-1.136.032zm4.17-4.121l.982.981-8.804 2.037-.981-.982 8.803-2.037zM12.492 8.02a1.91 1.91 0 01.007 2.718c-.755.755-1.947.746-2.71-.016a1.895 1.895 0 01-.008-2.702 1.906 1.906 0 012.71 0zm-1.9.811c-.333.333-.349.82-.04 1.128.324.325.803.3 1.136-.032.332-.333.356-.811.031-1.136-.308-.309-.794-.292-1.127.04zm7.029-3.413a1.018 1.018 0 11.002 2.038 1.018 1.018 0 01-.002-2.038z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-discount"; }
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
