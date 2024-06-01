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
import { Component, h, Prop, Host } from '@stencil/core';
/**
 * This is a superset of the default anchor `<a>` element.
 * @part anchor - the native achor element wrapping all contents
 * @part content - a wrapper around the default slot with the underline
 *
 * @slot default - here goes the actual text of the
 * @slot icon - a slot that will not be underlined and which position can be changed
 */
export class HelperText {
  constructor() {
    /** (optional) Injected CSS styles */
    this.variant = 'informational';
  }
  renderHelperIcon() {
    const variant = this.variant;
    if (variant === 'informational' || variant === 'warning') {
      return h("scale-icon-alert-information", null);
    }
    if (variant === 'danger') {
      return h("scale-icon-alert-error", null);
    }
    if (variant === 'success') {
      return h("scale-icon-action-success", null);
    }
  }
  render() {
    return (h(Host, null,
      h("div", { class: {
          'helper-text': true,
          'helper-text--informational': this.variant === 'informational',
          'helper-text--warning': this.variant === 'warning',
          'helper-text--danger': this.variant === 'danger',
          'helper-text--success': this.variant === 'success',
          'helper-text--neutral': this.variant === 'neutral',
        }, part: "base" },
        this.helperText ? (h("span", { part: "text" }, this.helperText)) : (h("span", { part: "text" },
          h("slot", null))),
        this.renderHelperIcon()),
      this.styles && h("style", null, this.styles)));
  }
  static get is() { return "scale-helper-text"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./helper-text.css"]
  }; }
  static get styleUrls() { return {
    "$": ["helper-text.css"]
  }; }
  static get properties() { return {
    "helperText": {
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
        "text": "(optional) Helper text"
      },
      "attribute": "helper-text",
      "reflect": false
    },
    "styles": {
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
        "text": "(optional) Injected CSS styles"
      },
      "attribute": "styles",
      "reflect": false
    },
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| 'neutral'\n    | 'informational'\n    | 'warning'\n    | 'danger'\n    | 'success'",
        "resolved": "\"danger\" | \"informational\" | \"neutral\" | \"success\" | \"warning\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Injected CSS styles"
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'informational'"
    }
  }; }
}
