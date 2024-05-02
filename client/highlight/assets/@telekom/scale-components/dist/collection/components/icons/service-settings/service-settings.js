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
export class ServiceSettings {
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
          h("path", { d: "M20.235 14.5L23 14v-4l-2.765-.5a1 1 0 01-.64-1.555l1.595-2.31-2.825-2.825-2.31 1.595a1 1 0 01-1.555-.64L14 1h-4l-.5 2.76a1 1 0 01-1.555.645L5.635 2.81 2.81 5.635l1.595 2.31a1 1 0 01-.64 1.555L1 10v4l2.76.5a1 1 0 01.645 1.555l-1.595 2.31 2.825 2.825 2.31-1.595a1 1 0 011.555.64L10 23h4l.5-2.765a1 1 0 011.555-.64l2.31 1.595 2.825-2.825-1.595-2.31a1 1 0 01.64-1.555zM12 15a3 3 0 110-6 3 3 0 010 6z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M14 1l.5 2.75a.992.992 0 001.448.71l.102-.06 2.3-1.6 2.85 2.85-1.6 2.3c-.378.567-.087 1.312.537 1.52l.113.03L23 10v4l-2.75.5a.992.992 0 00-.71 1.448l.06.102 1.6 2.3-2.85 2.85-2.3-1.6c-.567-.378-1.312-.087-1.52.537l-.03.113L14 23h-4l-.5-2.75c-.142-.661-.863-1.01-1.448-.71l-.102.06-2.3 1.6-2.85-2.85 1.6-2.3c.378-.567.087-1.312-.537-1.52l-.113-.03L1 14v-4l2.75-.5a.992.992 0 00.71-1.448L4.4 7.95l-1.6-2.3L5.65 2.8l2.3 1.6c.567.378 1.312.087 1.52-.537l.03-.113L10 1h4zm-1.25 1.5h-1.5l-.3 1.5c-.2 1.2-1.25 2.05-2.45 2.05-.438 0-.875-.115-1.246-.345L5.8 4.7 4.75 5.75l.9 1.3c.464.65.584 1.472.318 2.227L5.9 9.45c-.279.743-.902 1.27-1.67 1.462l-.18.038-1.55.3v1.5l1.55.25c.85.15 1.5.7 1.85 1.5a2.426 2.426 0 01-.149 2.247l-.101.153-.9 1.3 1.05 1.05 1.3-.9c.4-.3.9-.45 1.4-.45 1.145 0 2.154.774 2.418 1.889l.332 1.711h1.5l.3-1.55c.2-1.2 1.25-2.05 2.45-2.05.438 0 .875.115 1.246.345L18.2 19.25l1.05-1.05-.9-1.3c-.5-.7-.55-1.6-.25-2.3.279-.743.902-1.27 1.67-1.462l.18-.038 1.55-.3v-1.5l-1.55-.3c-.85-.15-1.5-.7-1.85-1.5a2.426 2.426 0 01.149-2.247l.101-.153.9-1.3-1.05-1.05-1.3.9c-.4.3-.9.45-1.4.45-1.145 0-2.154-.774-2.418-1.889L12.75 2.5zM12 9a3 3 0 110 6 3 3 0 010-6z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-service-settings"; }
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
