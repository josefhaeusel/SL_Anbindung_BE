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
import { Component, Element, h, Prop, Host } from '@stencil/core';
import statusNote from '../../utils/status-note';
let i = 0;
export class TabPanel {
  constructor() {
    this.generatedId = i++;
    /** True for smaller height and font size */
    /** @deprecated - no more size difference */
    this.small = false;
    /** (optional) size  */
    /** @deprecated  - no more size difference */
    this.size = 'small';
    /** (optional) adds tab-index="0" to the panel, set to false to exclude the tab-panel from the tab sequence, e.g. if the first element in the panel is a focusable button */
    this.tabbablePanel = true;
  }
  componentDidRender() {
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "small" is deprecated.',
        type: 'warn',
        source: this.el,
      });
    }
  }
  setTabIndex() {
    if (this.tabbablePanel === true) {
      return { tabindex: '0' };
    }
  }
  render() {
    return (h(Host, Object.assign({ id: `scale-tab-panel-${this.generatedId}`, role: "tabpanel" }, this.setTabIndex()),
      this.styles && h("style", null, this.styles),
      h("div", { part: "tab-panel", class: "tab-panel" },
        h("slot", null))));
  }
  static get is() { return "scale-tab-panel"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./tab-panel.css"]
  }; }
  static get styleUrls() { return {
    "$": ["tab-panel.css"]
  }; }
  static get properties() { return {
    "small": {
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
        "tags": [{
            "name": "deprecated",
            "text": "- no more size difference"
          }],
        "text": ""
      },
      "attribute": "small",
      "reflect": false,
      "defaultValue": "false"
    },
    "size": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'small' | 'large'",
        "resolved": "\"large\" | \"small\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "name": "deprecated",
            "text": "- no more size difference"
          }],
        "text": ""
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'small'"
    },
    "tabbablePanel": {
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
        "text": "(optional) adds tab-index=\"0\" to the panel, set to false to exclude the tab-panel from the tab sequence, e.g. if the first element in the panel is a focusable button"
      },
      "attribute": "tabbable-panel",
      "reflect": false,
      "defaultValue": "true"
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
    }
  }; }
  static get elementRef() { return "el"; }
}
