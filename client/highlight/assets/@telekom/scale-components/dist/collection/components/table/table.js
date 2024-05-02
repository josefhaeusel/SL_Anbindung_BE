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
import { Component, Prop, h, Element, Host, State } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
export class Table {
  constructor() {
    /** (optional) Display sort arrows on/off */
    this.showSort = false;
    /** (optional) Striped Table */
    this.striped = false;
    /** object of the slots in use */
    this.slots = {};
  }
  addSortIndicator(el) {
    el.insertAdjacentHTML('afterbegin', `
        <span class="scale-sort-indicator" aria-hidden="true">
          <scale-icon-content-sort-indicator-up class="scale-sort-indicator-icon up" size="16"></scale-icon-content-sort-indicator-up>
          <scale-icon-content-sort-indicator-down class="scale-sort-indicator-icon down" size="16"></scale-icon-content-sort-indicator-down>
        </span>`);
  }
  componentWillLoad() {
    if (this.showSort) {
      this.hostElement.querySelectorAll('th').forEach((th) => {
        this.addSortIndicator(th);
      });
    }
  }
  componentWillUpdate() {
    this.hostElement.querySelectorAll('th').forEach((th) => {
      // only cols that are NOT added dynamically have children (the sorting icon), added on componentWillLoad
      if (th.children.length === 0) {
        // this may not be needed
        th.classList.add('dynamically-added');
        if (this.showSort) {
          this.addSortIndicator(th);
        }
      }
    });
  }
  componentDidLoad() {
    const table = this.hostElement;
    const progressbar = table.querySelectorAll('scale-progress-bar');
    if (progressbar) {
      progressbar.forEach((el) => {
        el.showStatus = false;
      });
    }
    this.mutationObserver = new MutationObserver(() => {
      this.forceUpdate = String(Date.now());
    });
    this.mutationObserver.observe(this.hostElement, {
      childList: true,
      subtree: true,
    });
  }
  componentDidRender() {
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "size" is deprecated. Please use css overwrites for a small version!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
  render() {
    return (h(Host, { class: this.getCssClassMap() },
      this.styles && h("style", null, this.styles),
      h("slot", null)));
  }
  getCssClassMap() {
    return classNames('table', this.showSort && 'table--sortable', this.striped && 'table--striped');
  }
  static get is() { return "scale-table"; }
  static get originalStyleUrls() { return {
    "$": ["./table.css"]
  }; }
  static get styleUrls() { return {
    "$": ["table.css"]
  }; }
  static get properties() { return {
    "showSort": {
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
        "text": "(optional) Display sort arrows on/off"
      },
      "attribute": "show-sort",
      "reflect": false,
      "defaultValue": "false"
    },
    "size": {
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
            "text": "- css overwrite should replace size"
          }],
        "text": ""
      },
      "attribute": "size",
      "reflect": false
    },
    "striped": {
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
        "text": "(optional) Striped Table"
      },
      "attribute": "striped",
      "reflect": false,
      "defaultValue": "false"
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
  static get states() { return {
    "forceUpdate": {}
  }; }
  static get elementRef() { return "hostElement"; }
}
