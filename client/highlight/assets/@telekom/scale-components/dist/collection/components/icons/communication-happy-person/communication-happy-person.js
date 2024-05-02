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
export class CommunicationHappyPerson {
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
          h("path", { d: "M11.75 4.75a2.126 2.126 0 100-4.252 2.126 2.126 0 00.002 4.252m7.44-1.426a.925.925 0 00-1.301.138c-.68.838-1.576 1.854-1.828 2.028-1.951 1.341-7.306.664-8.816-.75-.238-.263-1.007-1.756-1.576-2.985a.926.926 0 00-1.679.779c.517 1.116 1.46 3.06 1.977 3.543.609.571 1.55 1.045 2.65 1.39-.086 1.056-.274 3.4-.377 5.04-.111 1.778-.19 4.755-.218 5.953-.012.5.192.983.558 1.324l3.652 3.392a.95.95 0 001.368-1.313l-3.024-3.541.287-3.477 3.36 1.339-.657 4.149a.95.95 0 001.86.379l1.337-5.346a.951.951 0 00-.495-1.079l-3.523-1.774.51-4.441c1.492-.063 2.885-.392 3.854-1.057.597-.411 1.849-1.933 2.218-2.389a.926.926 0 00-.137-1.302", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M11.75 4.75a2.126 2.126 0 100-4.252 2.126 2.126 0 00.002 4.252m7.44-1.426a.925.925 0 00-1.301.138c-.68.838-1.576 1.854-1.828 2.028-1.951 1.341-7.306.664-8.816-.75-.238-.263-1.007-1.756-1.576-2.985a.926.926 0 00-1.679.779c.517 1.116 1.46 3.06 1.977 3.543.609.571 1.55 1.045 2.65 1.39-.086 1.056-.274 3.4-.377 5.04-.111 1.778-.19 4.755-.218 5.953-.012.5.192.983.558 1.324l3.652 3.392a.95.95 0 001.368-1.313l-3.024-3.541.287-3.477 3.36 1.339-.657 4.149a.95.95 0 001.86.379l1.337-5.346a.951.951 0 00-.495-1.079l-3.523-1.774.51-4.441c1.492-.063 2.885-.392 3.854-1.057.597-.411 1.849-1.933 2.218-2.389a.926.926 0 00-.137-1.302", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-communication-happy-person"; }
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
