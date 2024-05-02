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
export class ActionStreamOn {
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
          h("path", { d: "M1.75 18a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0-3.5a4.755 4.755 0 014.75 4.75 4.895 4.895 0 01-.11 1.004l-.06.246H4.75a3.25 3.25 0 00-4.057-4.323L.5 16.25v-1.58c.408-.11.828-.167 1.25-.17zm0-3.5A8.26 8.26 0 0110 19.25c-.005.314-.03.628-.071.94l-.049.31h-1.5c.078-.412.118-.83.12-1.25a6.76 6.76 0 00-6.75-6.75 6.88 6.88 0 00-.94.057l-.31.048v-1.5c.414-.065.831-.1 1.25-.105zM20.5 3.5a3 3 0 012.995 2.824l.005.176v11a3 3 0 01-2.824 2.995l-.176.005h-9.09a9.37 9.37 0 00.09-1.25A9.75 9.75 0 001.75 9.5a9.37 9.37 0 00-.835.041L.5 9.59V6.5a3 3 0 012.824-2.995L3.5 3.5h17z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M1.75 11C6.3 11 10 14.7 10 19.25c0 .337-.028.647-.063.95l-.037.3H8.4c.05-.4.1-.8.1-1.25 0-3.7-3.05-6.75-6.75-6.75-.338 0-.647.028-.95.063l-.3.037v-1.5c.4-.05.8-.1 1.25-.1zm0 3.5c2.6 0 4.75 2.15 4.75 4.75a5.1 5.1 0 01-.096 1.01l-.054.24h-1.6c.15-.4.25-.8.25-1.25C5 17.45 3.55 16 1.75 16c-.375 0-.715.07-1.05.18l-.2.07v-1.6c.4-.1.8-.15 1.25-.15zm0 3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM20.5 3.5a3.01 3.01 0 012.995 2.824l.005.176v11a3.01 3.01 0 01-2.824 2.995l-.176.005h-9.1c.075-.425.1-.712.106-.938l.001-.206L11.5 19h9c.8 0 1.423-.576 1.493-1.352L22 17.5v-11c0-.8-.576-1.423-1.352-1.493L20.5 5h-17c-.753 0-1.417.576-1.493 1.352L2 6.5v3l-.136-.007-.232.001-.24.011-.306.024-.178.019L.5 9.6V6.5a3.01 3.01 0 012.824-2.995L3.5 3.5h17z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-action-stream-on"; }
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
