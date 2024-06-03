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
import { Component, h, Host, Prop } from '@stencil/core';
export class TelekomFooterContent {
  constructor() {
    /** (optional) Logo link */
    this.logoHref = '';
    /** (optional) set logo specific title */
    this.logoTitle = 'Telekom Logo';
    /** (optional) set logo specific title */
    this.logoHideTitle = false;
  }
  render() {
    return (h(Host, null,
      h("footer", null,
        h("slot", { name: "extended-navigation" }),
        h("div", { part: "base" },
          h("div", { part: "logo" },
            h("scale-logo", { part: "app-logo", variant: "white", style: {
                '--focus-outline': 'var(--telekom-line-weight-highlight) solid var(--telekom-color-functional-focus-on-dark-background)',
              }, transparent: true, href: this.logoHref, logoHideTitle: this.logoHideTitle, logoTitle: this.logoHideTitle ? undefined : this.logoTitle, focusable: this.logoHref ? true : false })),
          h("div", { part: "body" },
            h("div", { part: "notice" },
              h("slot", { name: "notice" })),
            h("div", { part: "navigation" },
              h("slot", { name: "navigation" })))))));
  }
  static get is() { return "scale-telekom-footer-content"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["telekom-footer-content.css"]
  }; }
  static get styleUrls() { return {
    "$": ["telekom-footer-content.css"]
  }; }
  static get properties() { return {
    "logoHref": {
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
        "text": "(optional) Logo link"
      },
      "attribute": "logo-href",
      "reflect": false,
      "defaultValue": "''"
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
        "text": "(optional) set logo specific title"
      },
      "attribute": "logo-title",
      "reflect": false,
      "defaultValue": "'Telekom Logo'"
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
        "text": "(optional) set logo specific title"
      },
      "attribute": "logo-hide-title",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
}
