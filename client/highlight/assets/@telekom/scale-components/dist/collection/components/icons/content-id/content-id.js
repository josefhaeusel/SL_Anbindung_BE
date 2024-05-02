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
export class ContentId {
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
          h("path", { d: "M16.707 16.843v-3.729h.776c.829 0 1.365.553 1.365 1.864 0 1.312-.536 1.865-1.365 1.865h-.776zm3.39-1.864c0-1.934-.972-2.978-2.525-2.978h-2.069v5.958h2.069c1.552 0 2.525-1.044 2.525-2.98zm-6.967 2.98h1.204V12H13.13v5.958zm-5.376-2.905c1.206 0 2.083-1.226 2.083-2.492 0-1.265-.932-2.092-2.083-2.092-1.151 0-2.083.826-2.083 2.092s.877 2.492 2.083 2.492zm1.978.832h-.815L7.754 17.05l-1.162-1.162h-.817c-.804 0-1.492.573-1.638 1.363l-.134.72h7.5l-.133-.72a1.665 1.665 0 00-1.638-1.364zM22.001 19.5c0 .826-.674 1.5-1.5 1.5h-17c-.828 0-1.5-.674-1.5-1.5V7h8v2.5h4V7h8v12.5zm-8-14v-5h-4v5h-9.5v14a3 3 0 003 3h17a3 3 0 003-3v-14h-9.5z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M16.707 16.843v-3.729h.776c.829 0 1.365.553 1.365 1.864 0 1.312-.536 1.865-1.365 1.865h-.776zm3.39-1.864c0-1.934-.972-2.978-2.525-2.978h-2.069v5.958h2.069c1.552 0 2.525-1.044 2.525-2.98zm-6.967 2.98h1.204V12H13.13v5.958zm-5.376-2.905c1.206 0 2.083-1.226 2.083-2.492 0-1.265-.932-2.092-2.083-2.092-1.151 0-2.083.826-2.083 2.092s.877 2.492 2.083 2.492zm1.978.832h-.815L7.754 17.05l-1.162-1.162h-.817c-.804 0-1.492.573-1.638 1.363l-.134.72h7.5l-.133-.72a1.665 1.665 0 00-1.638-1.364zM22.001 19.5c0 .826-.674 1.5-1.5 1.5h-17c-.828 0-1.5-.674-1.5-1.5V7h8v2.5h4V7h8v12.5zm-8-14v-5h-4v5h-9.5v14a3 3 0 003 3h17a3 3 0 003-3v-14h-9.5z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-id"; }
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
