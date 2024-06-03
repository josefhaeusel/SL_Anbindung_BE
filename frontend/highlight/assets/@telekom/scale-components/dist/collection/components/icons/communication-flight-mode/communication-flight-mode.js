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
export class CommunicationFlightMode {
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
          h("path", { d: "M9.239 23.262a1.428 1.428 0 01-1.262-.773l-2.231-4.353-4.327-2.185a1.422 1.422 0 01.805-2.679l5.085.59 3.197-3.498-8.233-5.328a1.546 1.546 0 01-.25-2.403 1.536 1.536 0 011.455-.409c1.546.371 9.064 2.176 11.869 2.93l.207-.188c3.729-3.4 5.981-5.449 7.403-4.035.199.198.435.553.422 1.117-.045 1.966-3.469 5.408-4.576 6.47.759 2.802 2.538 10.11 2.943 11.933a1.548 1.548 0 01-.5 1.51l-.039.034a1.544 1.544 0 01-1.239.363 1.55 1.55 0 01-1.085-.698l-5.327-8.315-3.519 3.228.617 5.095c.053.437-.096.866-.407 1.177a1.43 1.43 0 01-1.008.417z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M13.857 11.033l6.289 9.817.569.58-.492-.567.041-.036a.051.051 0 00.018-.05c-.426-1.92-2.38-9.932-3.044-12.293l-.125-.447.345-.313c2.551-2.304 4.596-5.143 4.419-5.764-.608-.15-3.333 2.31-5.312 4.114l-.819.746-.4-.11C12.971 6.045 4.752 4.071 3.128 3.682l-.049.014.008.08 9.722 6.291-4.91 5.37-5.406-.625 4.365 2.203 2.255 4.402-.657-5.429 5.401-4.956zm-4.618 12.23a1.428 1.428 0 01-1.262-.773l-2.231-4.354-4.327-2.185a1.422 1.422 0 01.805-2.679l5.085.59 3.197-3.498-8.233-5.328a1.546 1.546 0 01-.25-2.403 1.536 1.536 0 011.455-.409c1.546.371 9.064 2.176 11.869 2.93l.207-.188c3.729-3.4 5.981-5.449 7.403-4.035.199.198.435.553.422 1.117-.045 1.966-3.469 5.408-4.576 6.47.759 2.802 2.538 10.11 2.943 11.933a1.548 1.548 0 01-.5 1.51l-.039.034a1.544 1.544 0 01-1.239.363 1.55 1.55 0 01-1.085-.698l-5.327-8.315-3.519 3.228.617 5.095c.053.437-.096.866-.407 1.177a1.43 1.43 0 01-1.008.417z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-communication-flight-mode"; }
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
