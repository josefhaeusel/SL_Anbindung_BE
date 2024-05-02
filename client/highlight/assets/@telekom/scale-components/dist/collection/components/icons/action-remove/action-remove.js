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
export class ActionRemove {
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
          h("path", { d: "M16 .5v3h5.5c.4 0 .75.35.75.75a.772.772 0 01-.651.743L21.5 5h-1.05l-.8 15.65c-.096 1.54-1.305 2.757-2.824 2.845l-.176.005H7.4c-1.54 0-2.803-1.16-2.984-2.674L4.4 20.65 3.55 5H2.5c-.4 0-.75-.35-.75-.75 0-.367.294-.691.651-.743L2.5 3.5H8v-3h8zm-4 7.25c.367 0 .691.294.743.651l.007.099v10c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651l-.007-.099v-10c0-.4.35-.75.75-.75zm3.5 0c.367 0 .691.294.743.651l.007.099v10c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651l-.007-.099v-10c0-.4.35-.75.75-.75zm-7 0c.367 0 .691.294.743.651l.007.099v10c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L7.75 18.5v-10c0-.4.35-.75.75-.75zm6-5.75h-5v1.5h5V2z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M16 .5v3h5.5c.4 0 .75.35.75.75a.772.772 0 01-.651.743L21.5 5h-1.05l-.8 15.65c-.096 1.54-1.305 2.757-2.824 2.845l-.176.005H7.4c-1.54 0-2.803-1.16-2.984-2.674L4.4 20.65 3.55 5H2.5c-.4 0-.75-.35-.75-.75 0-.367.294-.691.651-.743L2.5 3.5H8v-3h8zM18.95 5H5.05l.85 15.6a1.482 1.482 0 001.36 1.394L7.4 22h9.2c.753 0 1.373-.531 1.485-1.261l.015-.139.85-15.6zM12 7.75c.367 0 .691.294.743.651l.007.099v10c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651l-.007-.099v-10c0-.4.35-.75.75-.75zm3.5 0c.367 0 .691.294.743.651l.007.099v10c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651l-.007-.099v-10c0-.4.35-.75.75-.75zm-7 0c.367 0 .691.294.743.651l.007.099v10c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L7.75 18.5v-10c0-.4.35-.75.75-.75zm6-5.75h-5v1.5h5V2z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-action-remove"; }
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
