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
export class CommunicationPhoneNumber {
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
          h("path", { d: "M16.05 13.3l-1.7 1.7c-.25.25-.7.3-1 .05-.55-.45-1.4-1.15-2.3-2.05-.9-.9-1.6-1.75-2.05-2.3a.76.76 0 01.05-1l1.7-1.7L7.4 2c-1.1.1-3.45.35-4.7 2.25C1.55 6.1 2.2 8.35 2.4 9c.85 2.35 2.65 5 5.1 7.5 2.5 2.5 5.15 4.3 7.45 5.1.35.1 1.25.4 2.25.4.8 0 1.7-.15 2.5-.65 1.9-1.2 2.15-3.55 2.25-4.7l-5.9-3.35z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M16.05 13.3l-1.7 1.7c-.25.25-.7.3-1 .05-.55-.45-1.4-1.15-2.3-2.05-.9-.9-1.6-1.75-2.05-2.3a.76.76 0 01.05-1l1.7-1.7L7.4 2c-1.1.1-3.45.35-4.7 2.25C1.55 6.1 2.2 8.35 2.4 9c.85 2.35 2.65 5 5.1 7.5 2.5 2.5 5.15 4.3 7.45 5.1.35.1 1.25.4 2.25.4.8 0 1.7-.15 2.5-.65 1.9-1.2 2.15-3.55 2.25-4.7l-5.9-3.35zm2.9 6.7c-1.25.8-3 .3-3.45.15-2.1-.7-4.55-2.4-6.9-4.75-2.3-2.3-4-4.75-4.7-6.9-.15-.5-.65-2.2.15-3.45C4.5 4.3 5.4 3.8 6.65 3.6l2.3 4.05-.95.9c-.8.8-.9 2.1-.15 3 .5.6 1.25 1.5 2.15 2.45.95.95 1.85 1.7 2.45 2.15.9.7 2.2.65 3-.15l.9-.9 4.05 2.3c-.25 1.25-.7 2.15-1.45 2.6z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-communication-phone-number"; }
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
