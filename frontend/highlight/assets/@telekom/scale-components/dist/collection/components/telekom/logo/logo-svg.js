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
import { Component, h, Prop, Host, Element } from '@stencil/core';
import statusNote from '../../../utils/status-note';
let i = 0;
const colors = {
  magenta: '#e20074',
  white: '#ffffff',
};
export class LogoSvg {
  constructor() {
    /** (optional) Sets the icon color via the `fill` attribute */
    this.color = 'magenta';
    this.innerRole = 'img';
    this.focusable = true;
    this.getTitle = (title, linkAddition) => {
      if (!this.logoHideTitle) {
        return this.logoTitle ? (h("title", { id: `logo-title-${i}` }, this.logoTitle)) : (h("title", { id: `logo-title-${i}` }, `${title} ${this.innerRole === 'link' ? linkAddition : ''}`));
      }
    };
  }
  componentWillLoad() {
    i++;
  }
  componentDidRender() {
    if (this.accessibilityTitle) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "accessibilityTitle" is deprecated. Please use the "logoTitle" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  getColor() {
    return this.color === 'magenta' || 'white'
      ? colors[this.color]
      : this.color;
  }
  render() {
    return (h(Host, null,
      h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 38", part: "logo-svg", fill: this.getColor(), role: this.innerRole === 'link' ? null : 'img', "aria-labelledby": `logo-title-${i}` },
        this.getTitle('Telekom Logo', '- Go to Start Page'),
        h("path", { d: "M7.6 25.1H0v-7.6h7.6v7.6ZM0 0v12.9h2.3v-.4c0-6.1 3.4-9.9 9.9-9.9h.4V30c0 3.8-1.5 5.3-5.3 5.3H6.1V38h19.8v-2.7h-1.1c-3.8 0-5.3-1.5-5.3-5.3V2.7h.4c6.5 0 9.9 3.8 9.9 9.9v.4h2.3V0H0Zm24.3 25.1h7.6v-7.6h-7.6v7.6Z" }))));
  }
  static get is() { return "scale-logo-svg"; }
  static get properties() { return {
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
        "text": "(optional) Sets the icon color via the `fill` attribute"
      },
      "attribute": "color",
      "reflect": false,
      "defaultValue": "'magenta'"
    },
    "innerRole": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'link' | 'img'",
        "resolved": "\"img\" | \"link\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "inner-role",
      "reflect": false,
      "defaultValue": "'img'"
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "focusable",
      "reflect": false,
      "defaultValue": "true"
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
        "tags": [{
            "name": "deprecated",
            "text": "(optional) When using the icon standalone, make it meaningful for accessibility"
          }],
        "text": ""
      },
      "attribute": "accessibility-title",
      "reflect": false
    },
    "logoTitle": {
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
      "attribute": "logo-title",
      "reflect": false
    },
    "logoHideTitle": {
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
        "text": "(optional) Hide all logo related titles"
      },
      "attribute": "logo-hide-title",
      "reflect": false
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
