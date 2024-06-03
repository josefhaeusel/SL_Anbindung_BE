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
export class ContentWaiting {
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
          h("path", { d: "M12 1.005c.444 0 .75.35.75.745 0 .402-.329.75-.75.75-5.239 0-9.5 4.261-9.5 9.5 0 5.238 4.261 9.5 9.5 9.5 5.238 0 9.5-4.262 9.5-9.5 0-.2.08-.39.22-.53.276-.28.78-.28 1.06 0 .14.14.22.335.22.53 0 6.066-4.934 11-11 11S1 18.066 1 12 5.934 1.005 12 1.005zm0 2.98a.75.75 0 01.743.649l.007.101v6.516l4.852.005a.75.75 0 01.1 1.493l-.103.006-6.349-.006V4.735a.75.75 0 01.75-.75zm9.71 4.635a.75.75 0 01.384 1.45.745.745 0 01-.915-.53.747.747 0 01.531-.92zM20.5 6.225a.746.746 0 011.025.275.744.744 0 01-.27 1.02.743.743 0 01-1.025-.27.745.745 0 01.27-1.025zM18.715 4.22a.76.76 0 011.065 0c.29.295.29.77 0 1.06-.15.15-.34.22-.53.22a.838.838 0 01-.51-.194.699.699 0 01-.239-.482.759.759 0 01.214-.604zm-2.24-1.475a.751.751 0 011.3.755.744.744 0 01-1.025.27.755.755 0 01-.275-1.025zm-2.546-.84a.751.751 0 011.45.385.755.755 0 01-.38.474.754.754 0 01-.938-.208.749.749 0 01-.132-.651z", "fill-rule": "evenodd" }))) : (h("g", null,
          h("path", { d: "M12 1.005c.444 0 .75.35.75.745 0 .402-.329.75-.75.75-5.239 0-9.5 4.261-9.5 9.5 0 5.238 4.261 9.5 9.5 9.5 5.238 0 9.5-4.262 9.5-9.5 0-.2.08-.39.22-.53.276-.28.78-.28 1.06 0 .14.14.22.335.22.53 0 6.066-4.934 11-11 11S1 18.066 1 12 5.934 1.005 12 1.005zm0 2.98a.75.75 0 01.743.649l.007.101v6.516l4.852.005a.75.75 0 01.1 1.493l-.103.006-6.349-.006V4.735a.75.75 0 01.75-.75zm9.71 4.635a.75.75 0 01.384 1.45.745.745 0 01-.915-.53.747.747 0 01.531-.92zM20.5 6.225a.746.746 0 011.025.275.744.744 0 01-.27 1.02.743.743 0 01-1.025-.27.745.745 0 01.27-1.025zM18.715 4.22a.76.76 0 011.065 0c.29.295.29.77 0 1.06-.15.15-.34.22-.53.22a.838.838 0 01-.51-.194.699.699 0 01-.239-.482.759.759 0 01.214-.604zm-2.24-1.475a.751.751 0 011.3.755.744.744 0 01-1.025.27.755.755 0 01-.275-1.025zm-2.546-.84a.751.751 0 011.45.385.755.755 0 01-.38.474.754.754 0 01-.938-.208.749.749 0 01-.132-.651z", "fill-rule": "evenodd" })))))));
  }
  static get is() { return "scale-icon-content-waiting"; }
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
