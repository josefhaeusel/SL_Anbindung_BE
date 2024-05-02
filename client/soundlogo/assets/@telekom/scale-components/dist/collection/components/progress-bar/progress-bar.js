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
import { Component, Prop, h, Host, Element } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
const ICON_SIZE = 16;
let i = 0;
export class ProgressBar {
  constructor() {
    /** (optional) Progress bar busy switch */
    this.busy = false;
    /** (required) Progress bar percentage */
    this.percentage = 0;
    /** (optional) Progress bar percentage to start the animation from (default: 0) */
    this.percentageStart = 0;
    /** (optional) Progress bar percentage text */
    this.showStatus = true;
    this.transitions = (width, widthStart) => `
    @keyframes showProgress {
      from {
        width: ${widthStart}%;
      }
      to {
        width: ${width}%;
      }
    }
  `;
    this.progressStyle = () => {
      const customColor = this.customColor
        ? { '--background': this.customColor }
        : {};
      return Object.assign({ '--progress': this.disabled ? '100%' : `${this.percentage}%` }, customColor);
    };
  }
  componentWillLoad() {
    if (this.progressBarId == null) {
      this.progressBarId = 'progress-bar-' + i++;
    }
    if (this.disabled) {
      this.showStatus = false;
    }
  }
  componentWillUpdate() { }
  disconnectedCallback() { }
  componentDidRender() {
    if (this.customColor !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "customColor" is deprecated. 
          Please use css variable "--background" to set the progress bar background color;
          e.g. <scale-progress-bar percentage="20" style="--background: green"></scale-progress-bar>`,
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  render() {
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      h("style", null, this.transitions(this.percentage, this.percentageStart)),
      h("div", { part: this.getBasePartMap(), class: this.getCssClassMap() },
        h("div", { class: "progress-bar__top-container" },
          !!this.label ? (h("label", { part: "label", class: "progress-bar__label", htmlFor: this.progressBarId }, this.label)) : (h("span", null, " ")),
          !!this.showStatus &&
            !this.hasError &&
            this.percentage <= 100 &&
            this.percentage !== 100 && (h("div", { part: "status", class: "progress-bar__status", "aria-hidden": "true" },
            this.percentage,
            "%")),
          this.hasError ? (h("div", { class: "progress-bar__icon" },
            h("scale-icon-alert-error", { size: ICON_SIZE }))) : this.percentage >= 100 ? (h("div", { class: "progress-bar__icon" },
            h("scale-icon-action-success", { size: ICON_SIZE }))) : null),
        h("div", { part: "wrapper", class: "progress-bar__wrapper" },
          h("div", { part: "outer", class: "progress-bar__outer", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": this.percentage, "aria-busy": this.busy, "aria-valuetext": `${this.percentage}%`, "aria-label": this.label, id: this.progressBarId }, this.percentage > 0 && (h("div", { part: "inner", class: "progress-bar__inner", style: this.progressStyle() }))),
          h("slot", { name: "icon" }))),
      !!this.statusDescription && (h("div", { part: "status-description", class: "progress-bar__status-description", role: "alert" }, this.statusDescription)),
      !this.mute && (h("span", { "aria-live": "polite", class: "progress-bar__aria-live" }, this.percentage !== Math.round(this.percentage / 10) * 10
        ? `${Math.round(this.percentage / 10) * 10}%`
        : null))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const component = 'progress-bar';
    const prefix = mode === 'basePart' ? '' : `${component}--`;
    return classNames(component, this.hasError && `${prefix}has-error`, this.disabled && `${prefix}disabled`, this.percentage >= 100 && `${prefix}completed`);
  }
  static get is() { return "scale-progress-bar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./progress-bar.css"]
  }; }
  static get styleUrls() { return {
    "$": ["progress-bar.css"]
  }; }
  static get properties() { return {
    "busy": {
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
        "text": "(optional) Progress bar busy switch"
      },
      "attribute": "busy",
      "reflect": false,
      "defaultValue": "false"
    },
    "percentage": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "(required) Progress bar percentage"
      },
      "attribute": "percentage",
      "reflect": false,
      "defaultValue": "0"
    },
    "percentageStart": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "(optional) Progress bar percentage to start the animation from (default: 0)"
      },
      "attribute": "percentage-start",
      "reflect": false,
      "defaultValue": "0"
    },
    "customColor": {
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
            "text": "- (optional) Progress bar customColor"
          }],
        "text": ""
      },
      "attribute": "custom-color",
      "reflect": false
    },
    "showStatus": {
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
        "text": "(optional) Progress bar percentage text"
      },
      "attribute": "show-status",
      "reflect": false,
      "defaultValue": "true"
    },
    "icon": {
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
        "text": "(optional) Progress bar icon indicator"
      },
      "attribute": "icon",
      "reflect": false
    },
    "statusDescription": {
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
        "text": "(optional) Progress bar status description text"
      },
      "attribute": "status-description",
      "reflect": false
    },
    "hasError": {
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
        "text": "(optional) Progress bar error"
      },
      "attribute": "has-error",
      "reflect": false
    },
    "disabled": {
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
        "text": "(optional) Progress bar disabled"
      },
      "attribute": "disabled",
      "reflect": false
    },
    "progressBarId": {
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
        "text": "(optional) Progress bar id"
      },
      "attribute": "progress-bar-id",
      "reflect": false
    },
    "label": {
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
        "text": "(optional) Progress bar label"
      },
      "attribute": "label",
      "reflect": false
    },
    "mute": {
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
        "text": "(optional) disables aria-live"
      },
      "attribute": "mute",
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
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
