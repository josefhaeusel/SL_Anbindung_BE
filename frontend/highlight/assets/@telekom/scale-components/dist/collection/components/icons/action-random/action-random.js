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
export class ActionRandom {
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
          h("path", { d: "M2.674 4.163A6.147 6.147 0 017.45 6.451l.161.21 6.858 9.257c.65.867 1.648 1.4 2.722 1.463l.216.007h.715v-2.302l5.388 3.526-5.388 3.527v-2.302h-.715a6.147 6.147 0 01-4.775-2.288l-.162-.21-6.857-9.257A3.678 3.678 0 002.89 6.619l-.216-.007h-.98A1.224 1.224 0 011.57 4.17l.126-.007h.98zm5.246 8.66l1.528 2.057-1.837 2.478a6.147 6.147 0 01-4.658 2.473l-.264.006h-.98a1.224 1.224 0 01-.125-2.443l.125-.006h.98a3.684 3.684 0 002.804-1.3l.135-.17 2.292-3.095zM18.122 1.86l5.388 3.527-5.388 3.526V6.612h-.73a3.681 3.681 0 00-2.803 1.3l-.135.17-2.253 3.095-1.528-2.057 1.836-2.478a6.147 6.147 0 014.636-2.472l.262-.007h.715V1.861z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M2.23 4.5c1.729 0 3.376.79 4.466 2.125l.159.205 7 9.45a4.28 4.28 0 003.18 1.713l.235.007H18v-2.85l5.5 3.6-5.5 3.6V19.5h-.735a5.768 5.768 0 01-4.461-2.125l-.159-.205-7-9.45a4.28 4.28 0 00-3.18-1.713L2.23 6h-.98a.749.749 0 01-.102-1.493L1.25 4.5h.98zm5.65 8.76l.935 1.26-1.965 2.65a5.768 5.768 0 01-4.361 2.324l-.259.006h-.98a.749.749 0 01-.102-1.493L1.25 18h.98c1.261 0 2.47-.571 3.27-1.535l.145-.185 2.235-3.02zM18 1.65l5.5 3.6-5.5 3.6V6h-.73a4.277 4.277 0 00-3.269 1.535l-.146.185-2.235 3.02-.935-1.26 1.965-2.65a5.768 5.768 0 014.361-2.324l.259-.006H18V1.65z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-action-random"; }
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
