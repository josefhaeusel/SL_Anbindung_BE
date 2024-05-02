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
export class CommunicationVoiceMessage {
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
          h("path", { d: "M22.45 3v12.55a3.01 3.01 0 01-2.824 2.995l-.176.005h-7l-3.5 3.5c-.35.35-.75.5-1.2.5-.855 0-1.665-.632-1.744-1.595L6 20.8v-2.3H4.5a3.01 3.01 0 01-2.995-2.824L1.5 15.5V3h20.95zm-11.7 4c.367 0 .691.294.743.651l.007.099v6c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L10 13.75v-6c0-.4.35-.75.75-.75zm3 1c.367 0 .691.294.743.651l.007.099v4c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L13 12.75v-4c0-.4.35-.75.75-.75zm-6 1c.367 0 .691.294.743.651l.007.099v2c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L7 11.75v-2c0-.4.35-.75.75-.75zm9 0c.367 0 .691.294.743.651l.007.099v2c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L16 11.75v-2c0-.4.35-.75.75-.75z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M22.45 3v12.55a3.01 3.01 0 01-2.824 2.995l-.176.005h-7l-3.5 3.5c-.35.35-.75.5-1.2.5-.855 0-1.665-.632-1.744-1.595L6 20.8v-2.3H4.5a3.01 3.01 0 01-2.995-2.824L1.5 15.5V3h20.95zM21 4.5H3v11c0 .8.576 1.423 1.352 1.493L4.5 17h3v3.8c0 .182.207.322.394.196l.056-.046L11.9 17h7.6c.8 0 1.423-.576 1.493-1.352L21 15.5v-11zM10.75 7c.367 0 .691.294.743.651l.007.099v6c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L10 13.75v-6c0-.4.35-.75.75-.75zm3 1c.367 0 .691.294.743.651l.007.099v4c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L13 12.75v-4c0-.4.35-.75.75-.75zm-6 1c.367 0 .691.294.743.651l.007.099v2c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L7 11.75v-2c0-.4.35-.75.75-.75zm9 0c.367 0 .691.294.743.651l.007.099v2c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651L16 11.75v-2c0-.4.35-.75.75-.75z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-communication-voice-message"; }
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
