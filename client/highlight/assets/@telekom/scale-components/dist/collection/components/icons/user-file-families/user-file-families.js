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
export class UserFileFamilies {
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
          h("path", { d: "M12.25 16.5l2.85 2.75 2.75-2.75h1.6c1.883 0 3.532 1.305 3.914 3.15l.036.2.1.65H6.6l.1-.65c.29-1.883 1.884-3.253 3.75-3.345l.2-.005h1.6zm-5.4 0c-.375.375-.68.785-.946 1.23L5.75 18H4.5c-.897 0-1.66.58-1.87 1.445l-.03.155-.15.9H.95l.2-1.15c.24-1.589 1.594-2.76 3.168-2.845L4.5 16.5h2.35zm8.2-11.75C18 4.75 20.1 6.9 20.1 9.8c0 2.8-2.05 5.85-5.05 5.85C12 15.65 10 12.6 10 9.8c0-2.95 2.1-5.05 5.05-5.05zm-7 1.15c.55 0 1.05.1 1.5.25-.25.4-.5.85-.65 1.35-.25-.05-.55-.1-.85-.1-1.7 0-2.85 1.2-2.85 2.85 0 1.7 1.15 3.5 2.85 3.5.5 0 .9-.15 1.3-.4.25.45.5.85.8 1.25-.6.4-1.3.65-2.1.65-2.6 0-4.35-2.6-4.35-5 0-2.5 1.9-4.35 4.35-4.35z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M12.25 16.5l2.85 2.75 2.75-2.75h1.6c1.883 0 3.532 1.305 3.914 3.15l.036.2.1.65H6.6l.1-.65c.29-1.883 1.884-3.253 3.75-3.345l.2-.005h1.6zm-5.4 0c-.375.375-.68.785-.946 1.23L5.75 18H4.5c-.897 0-1.66.58-1.87 1.445l-.03.155-.15.9H.95l.2-1.15c.24-1.589 1.594-2.76 3.168-2.845L4.5 16.5h2.35zm8.2-11.75C18 4.75 20.1 6.9 20.1 9.8c0 2.8-2.05 5.85-5.05 5.85C12 15.65 10 12.6 10 9.8c0-2.95 2.1-5.05 5.05-5.05zm-7 1.15c.55 0 1.05.1 1.5.25-.25.4-.5.85-.65 1.35-.25-.05-.55-.1-.85-.1-1.7 0-2.85 1.2-2.85 2.85 0 1.7 1.15 3.5 2.85 3.5.5 0 .9-.15 1.3-.4.25.45.5.85.8 1.25-.6.4-1.3.65-2.1.65-2.6 0-4.35-2.6-4.35-5 0-2.5 1.9-4.35 4.35-4.35zm7 .35c-2.1 0-3.55 1.45-3.55 3.55 0 2.1 1.45 4.35 3.55 4.35 2.15 0 3.55-2.25 3.55-4.35 0-2.1-1.45-3.55-3.55-3.55z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-user-file-families"; }
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
