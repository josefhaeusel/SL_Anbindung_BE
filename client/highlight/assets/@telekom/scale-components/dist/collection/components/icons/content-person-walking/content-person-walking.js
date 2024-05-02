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
export class ContentPersonWalking {
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
          h("path", { d: "M9.512 5.71c1.372-.454 5.098-.372 5.847 1.452.11.27.217.547.32.823l.354.953.21.535c.165.398.328.734.463.872.042.043.1.098.172.16l.247.213.632.514.667.523.291.223a.926.926 0 01-1.119 1.473l-.835-.647-.47-.377-.308-.253-.279-.238a5.982 5.982 0 01-.32-.297c-.396-.404-.693-1.043-.989-1.804l-.198-.524-.271-.726-.176-.453-.46 5.588 2.666 2.76c.254.264.457.564.605.896l1.989 4.99a.921.921 0 01-1.613.863l-.058-.095-2.553-4.878-4.277-3.524a3.123 3.123 0 01-1.136-2.492l.012-.206.383-4.116c-.655.51-1.226 1.256-1.412 1.599a.994.994 0 00-.053.125l-.064.192-.073.25-.124.461-.133.535-.134.575-.18.826a.926.926 0 01-1.812-.376l.175-.811.114-.496.126-.516.133-.505c.135-.49.275-.917.4-1.145l.117-.199a5.95 5.95 0 01.166-.25l.212-.292c.585-.768 1.573-1.793 2.746-2.181zm-.624 9.988l.101.098.104.095 2.173 1.79-.162.608a3.114 3.114 0 01-.45.974l-.13.173-3.21 3.801a.924.924 0 01-1.534-1.005l.06-.105 2.847-4.252.201-2.177zM12.25 0a2.125 2.125 0 110 4.25 2.125 2.125 0 010-4.25z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M9.512 5.71c1.372-.454 5.098-.372 5.847 1.452.11.27.217.547.32.823l.354.953.21.535c.165.398.328.734.463.872.042.043.1.098.172.16l.247.213.632.514.667.523.291.223a.926.926 0 01-1.119 1.473l-.835-.647-.47-.377-.308-.253-.279-.238a5.982 5.982 0 01-.32-.297c-.396-.404-.693-1.043-.989-1.804l-.198-.524-.271-.726-.176-.453-.46 5.588 2.666 2.76c.254.264.457.564.605.896l1.989 4.99a.921.921 0 01-1.613.863l-.058-.095-2.553-4.878-4.277-3.524a3.123 3.123 0 01-1.136-2.492l.012-.206.383-4.116c-.655.51-1.226 1.256-1.412 1.599a.994.994 0 00-.053.125l-.064.192-.073.25-.124.461-.133.535-.134.575-.18.826a.926.926 0 01-1.812-.376l.175-.811.114-.496.126-.516.133-.505c.135-.49.275-.917.4-1.145l.117-.199a5.95 5.95 0 01.166-.25l.212-.292c.585-.768 1.573-1.793 2.746-2.181zm-.624 9.988l.101.098.104.095 2.173 1.79-.162.608a3.114 3.114 0 01-.45.974l-.13.173-3.21 3.801a.924.924 0 01-1.534-1.005l.06-.105 2.847-4.252.201-2.177zM12.25 0a2.125 2.125 0 110 4.25 2.125 2.125 0 010-4.25z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-person-walking"; }
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
