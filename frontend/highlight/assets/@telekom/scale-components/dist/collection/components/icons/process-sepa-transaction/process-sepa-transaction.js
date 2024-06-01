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
export class ProcessSepaTransaction {
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
          h("path", { d: "M3.512 1.008l6.674.012-2.68 6.112L6.2 5.13C4.21 6.82 3 9.332 3 12c0 4.18 2.956 7.874 7.029 8.784.566.126.953.619.972 1.174v.138a.748.748 0 01-.038.223 1.248 1.248 0 01-1.479.904C4.279 22.061.501 17.341.501 12c0-3.396 1.533-6.599 4.06-8.758l.265-.22-1.314-2.014zm9.518.698a1.245 1.245 0 011.486-.929C19.721 1.939 23.5 6.659 23.5 12c0 3.396-1.534 6.598-4.06 8.758l-.265.22 1.314 2.014-6.674-.012 2.68-6.112 1.306 2.002C19.79 17.179 21 14.666 21 12c0-4.18-2.956-7.874-7.029-8.784A1.245 1.245 0 0113 2.04l.002-.135c0-.07.012-.135.029-.199zm-.866 5.798c1.514 0 2.678.958 3.013 2.535l.037.2h-1.801c-.157-.762-.617-1.117-1.249-1.117-.714 0-1.175.381-1.414 1.23l-.045.176h1.84v1.262h-1.984v.644h1.985v1.262h-1.84c.223.96.696 1.393 1.458 1.393.586 0 1.025-.306 1.21-.96l.039-.157h1.801c-.276 1.696-1.472 2.734-3.05 2.734-1.63 0-2.738-1.033-3.16-2.795l-.047-.215H8.18v-1.262h.631v-.644h-.63v-1.262h.775c.381-1.906 1.498-3.024 3.207-3.024z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M13.773 1.152l.105.011C19.052 2.057 23 6.575 23 12c0 3.454-1.601 6.54-4.1 8.557l1.588 2.436-6.673-.013 2.68-6.112 1.577 2.42A9.465 9.465 0 0021.5 12c0-4.689-3.415-8.594-7.889-9.361a.74.74 0 01-.603-.628L13 1.904l.006-.097a.755.755 0 01.664-.65l.103-.005zM3.512 1.008l6.673.012-2.68 6.112-1.578-2.42A9.471 9.471 0 002.5 12c0 4.689 3.415 8.595 7.889 9.362a.74.74 0 01.603.627l.008.107-.006.097a.753.753 0 01-.872.644C4.948 21.943 1 17.425 1 12c0-3.454 1.601-6.54 4.1-8.557L3.512 1.008zm8.652 6.497c1.577 0 2.774 1.038 3.05 2.734h-1.802c-.157-.762-.617-1.117-1.248-1.117-.762 0-1.236.434-1.46 1.406h1.841v1.262H10.56v.644h1.985v1.262h-1.84c.223.96.697 1.393 1.459 1.393.631 0 1.091-.354 1.248-1.117h1.801c-.275 1.696-1.471 2.734-3.05 2.734-1.696 0-2.825-1.117-3.207-3.01h-.775v-1.262h.63v-.644h-.63v-1.262h.775c.382-1.906 1.498-3.024 3.208-3.024z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-process-sepa-transaction"; }
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
