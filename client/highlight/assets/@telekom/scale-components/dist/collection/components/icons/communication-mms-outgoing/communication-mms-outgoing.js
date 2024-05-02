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
export class CommunicationMmsOutgoing {
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
          h("path", { d: "M19.503 3v9.697l-.842-.551a1.195 1.195 0 00-1.228-.052 1.2 1.2 0 00-.622.925l-.007.131v1.65h-2.55a1.953 1.953 0 00-1.852 2.559l.053.141h-1.833l-3.274 3.274a1.63 1.63 0 01-1.167.491c-.81 0-1.591-.597-1.671-1.514l-.007-.155V17.5H3.36a2.857 2.857 0 01-2.852-2.69l-.005-.167V3h19zm-1.499 10.15l5.5 3.6-5.5 3.6V17.5h-3.75a.75.75 0 01-.102-1.493l.102-.007h3.75v-2.85zm-3.076-4.905c-.767 0-1.355.495-1.355 1.287 0 .48.222.923.776 1.129l.146.046.477.136c.322.087.495.217.495.477-.001.266-.18.464-.54.464-.269 0-.48-.107-.575-.375l-.03-.107h-.83c.074.816.582 1.261 1.435 1.261.78 0 1.393-.463 1.393-1.293 0-.548-.327-.975-.86-1.164l-.137-.042-.476-.13c-.229-.062-.42-.167-.42-.458 0-.291.216-.452.5-.452.287 0 .455.123.528.367l.024.098h.817c-.081-.762-.532-1.244-1.368-1.244zm-5.41.093h-.767v4.133h.835v-2.333h.037l1.01 1.819h.265l1.015-1.819h.037v2.333h.829V8.338h-.768l-1.224 2.289h-.038l-1.23-2.29zm-5.012-.001h-.768v4.133h.836v-2.333h.037l1.009 1.82h.266l1.014-1.82h.037v2.333h.83V8.337h-.768l-1.224 2.29h-.038l-1.23-2.29z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M10.783 10.627h-.037l-1.232-2.29h-.767v4.134h.835v-2.333h.037l1.01 1.819h.265l1.015-1.819h.037v2.333h.829V8.338h-.768l-1.224 2.289zm-3.02 1.843V8.337h-.768l-1.224 2.29h-.037l-1.231-2.29h-.768v4.133h.835v-2.333h.037l1.009 1.82h.266l1.014-1.82h.038v2.333h.829zm7.16-.686c-.303 0-.531-.136-.605-.482h-.83c.075.816.582 1.261 1.436 1.261.78 0 1.392-.463 1.392-1.293 0-.593-.384-1.045-.996-1.206l-.476-.13c-.23-.062-.421-.167-.421-.458 0-.291.216-.452.5-.452.322 0 .495.155.552.465h.816c-.08-.762-.532-1.244-1.367-1.244-.767 0-1.355.495-1.355 1.287 0 .52.26.996.922 1.175l.476.136c.322.087.495.217.495.477 0 .266-.18.464-.538.464zM23.5 16.75l-5.5-3.6V16h-3.75a.75.75 0 100 1.5H18v2.85l5.5-3.6zM9.998 16l-3.713 3.713c-.12.12-.285.017-.285-.117V16H3.357A1.359 1.359 0 012 14.643V4.5h16v6.857l1.5.982V3H.5v11.643A2.857 2.857 0 003.357 17.5H4.5v2.096c0 1.004.822 1.67 1.678 1.67.41 0 .827-.152 1.167-.492l3.274-3.274H12V16H9.998z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-communication-mms-outgoing"; }
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
