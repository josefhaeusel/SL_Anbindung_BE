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
import { Component, h, State, Prop, Host, Event, Watch, Element, Fragment, } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';
export class Slider {
  constructor() {
    /** (optional) the value of the slider */
    this.value = 0;
    /** (optional) multi-thumb */
    this.range = false;
    /** (optional) when `range` is true, the "from" value */
    this.valueFrom = 0;
    /** (optional) when `range` is true, the "to" value */
    this.valueTo = 0;
    /** t(optional) he minimal value of the slider */
    this.min = 0;
    /** (optional) the maximal value of the slider */
    this.max = 100;
    /** (optional) the step size to increase or decrease when dragging slider */
    this.step = 1;
    /** (optional) show a mark for each step */
    this.showStepMarks = false;
    /** (optional) slider display value */
    this.showValue = true;
    /** (optional) slider value unit */
    this.unit = '';
    /** (optional) unit position */
    this.unitPosition = 'after';
    /** (optional) number of decimal places */
    this.decimals = 0;
    /** (optional) disabled  */
    this.disabled = false;
    /** (optional) Aria label for range slider */
    this.innerAriaValueText = '$from to $to';
    // The actual position in % of the slider thumb
    this.position = 0;
    this.positionFrom = 25;
    this.positionTo = 75;
    // Don't know how to make TypeScript handle `this[offsetKey]`
    // private offsetLeft: number;
    // private offsetLeftFrom: number;
    // private offsetLeftTo: number;
    this.activeRangeThumb = null;
    this.internalId = generateUniqueId();
    this.lastThumbZIndex = 3;
    this.onButtonDown = (event) => {
      if (this.disabled) {
        return;
      }
      this.setActiveRangeThumbFromEvent(event);
      this.onDragStart();
      this.addGlobalListeners(event);
    };
    this.onKeyDown = (event) => {
      let steps = 0;
      this.setActiveRangeThumbFromEvent(event);
      if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
        steps = event.key === 'ArrowRight' ? this.step : -this.step;
      }
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        steps = event.key === 'ArrowUp' ? this.step * 10 : -this.step * 10;
      }
      const valueKey = this.getKeyFor('value');
      this.setValue(this[valueKey] + steps, valueKey);
      emitEvent(this, 'scaleChange', this.range ? [this.valueFrom, this.valueTo] : this.value);
    };
    this.onDragStart = () => {
      const offsetKey = this.getKeyFor('offsetLeft');
      this.dragging = true;
      this[offsetKey] = this.sliderTrack.getBoundingClientRect().left;
    };
    this.onDragging = (event) => {
      if (!this.dragging) {
        return;
      }
      const valueKey = this.getKeyFor('value');
      const offsetLeftKey = this.getKeyFor('offsetLeft');
      const offsetLeft = this[offsetLeftKey];
      const currentX = this.handleTouchEvent(event).clientX;
      const position = ((currentX - offsetLeft) / this.sliderTrack.offsetWidth) * 100;
      const nextValue = (position * (this.max - this.min)) / 100 + this.min;
      // https://stackoverflow.com/q/14627566
      const roundedNextValue = Math.ceil(nextValue / this.step) * this.step;
      this.setValue(roundedNextValue, valueKey);
    };
    this.onDragEnd = () => {
      this.dragging = false;
      emitEvent(this, 'scaleChange', this.range ? [this.valueFrom, this.valueTo] : this.value);
      this.removeGlobalListeners();
    };
    this.setValue = (nextValue, valueKey = 'value') => {
      this[valueKey] = this.clamp(nextValue);
      emitEvent(this, 'scaleInput', this.range ? [this.valueFrom, this.valueTo] : this.value);
    };
    this.setActiveRangeThumbFromEvent = (event) => {
      if (!this.range) {
        this.activeRangeThumb = null;
        return;
      }
      const part = event.target.part;
      this.activeRangeThumb = part.contains('from') ? 'From' : 'To';
    };
    this.setPosition = (thumb) => {
      const valueKey = this.getKeyFor('value', thumb);
      const positionKey = this.getKeyFor('position', thumb);
      const clampedValue = this.clamp(this[valueKey]);
      // https://stackoverflow.com/a/25835683
      // ((input - min) * 100) / (max - min)
      this[positionKey] =
        ((clampedValue - this.min) * 100) / (this.max - this.min);
    };
    /**
     * Utility function
     * e.g. 'value' -> 'valueFrom' if `activeRangeThumb='From'`
     * @param propName
     * @returns {string} The prop name with the range suffix if needed
     */
    this.getKeyFor = (propName, thumb) => {
      var _a;
      if (this.range) {
        return `${propName}${(_a = this.activeRangeThumb) !== null && _a !== void 0 ? _a : thumb}`;
      }
      return propName;
    };
    this.getTextValue = () => {
      var _a, _b, _c, _d;
      if (this.range) {
        const from = (_a = this.valueFrom) === null || _a === void 0 ? void 0 : _a.toFixed(this.decimals);
        const to = (_b = this.valueTo) === null || _b === void 0 ? void 0 : _b.toFixed(this.decimals);
        return this.unitPosition === 'before'
          ? `${this.unit}${from} - ${this.unit}${to}`
          : `${from}${this.unit} - ${to}${this.unit}`;
      }
      return this.unitPosition === 'before'
        ? `${this.unit}${(_c = this.value) === null || _c === void 0 ? void 0 : _c.toFixed(this.decimals)}`
        : `${(_d = this.value) === null || _d === void 0 ? void 0 : _d.toFixed(this.decimals)}${this.unit}`;
    };
    this.getNumberOfSteps = () => {
      const n = (this.max - this.min) / this.step + 1;
      return [...Array(n).keys()];
    };
    this.clamp = (val) => {
      let min = this.min;
      let max = this.max;
      // Take into account the other thumb, when `range=true`
      if (this.range) {
        if (this.activeRangeThumb === 'From') {
          max = Math.min(this.valueTo, this.max);
        }
        else if (this.activeRangeThumb === 'To') {
          min = Math.max(this.valueFrom, this.min);
        }
      }
      // Regular generic clamp
      return Math.min(Math.max(val, min), max);
    };
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  handleValueChange() {
    this.setPosition();
  }
  componentWillLoad() {
    if (this.sliderId == null) {
      this.sliderId = 'slider-' + this.internalId;
    }
    // Set initial position
    if (this.range) {
      this.setPosition('From');
      this.setPosition('To');
    }
    else {
      this.setPosition();
    }
  }
  disconnectedCallback() {
    this.removeGlobalListeners();
  }
  componentDidLoad() {
    if (this.customColor !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "customColor" is deprecated. 
          Please use css variable "--background-bar" to set the slider-bar color;
          e.g. <scale-slider value="20" style="--background-bar: green"></scale-slider>`,
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.thumbLarge !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "thumbLarge" is deprecated.`,
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.trackSmall !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "trackSmall" is deprecated.`,
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  handleTouchEvent(event) {
    return event.type.indexOf('touch') === 0 ? event.touches[0] : event;
  }
  addGlobalListeners(e) {
    this.lastThumbZIndex = this.lastThumbZIndex + 1;
    e.target.parentNode.style.zIndex = this.lastThumbZIndex.toString();
    window.addEventListener('mousemove', this.onDragging);
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchmove', this.onDragging);
    window.addEventListener('touchend', this.onDragEnd);
  }
  removeGlobalListeners() {
    window.removeEventListener('mousemove', this.onDragging);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchmove', this.onDragging);
    window.removeEventListener('touchend', this.onDragEnd);
  }
  getRangeAriaValueText() {
    const filledText = this.innerAriaValueText
      .replace(/\$from/g, `${this.valueFrom}`)
      .replace(/\$to/g, `${this.valueTo}`);
    return filledText;
  }
  render() {
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      h("div", { part: classNames('base', this.disabled && 'disabled') },
        h("div", { part: "label-wrapper" },
          !!this.label && (h("label", { part: "label", id: `${this.sliderId}-label`, htmlFor: this.sliderId }, this.label)),
          this.showValue && (h("div", { part: "value-text" }, this.getTextValue()))),
        h("div", { part: "track-wrapper" },
          h("div", { part: "track", ref: (el) => (this.sliderTrack = el) },
            h("div", { part: "bar", style: {
                left: (this.range ? this.positionFrom : 0) + '%',
                width: `${this.range
                  ? this.positionTo - this.positionFrom
                  : this.position}%`,
              } }),
            this.showStepMarks && (h("div", { part: "step-marks" }, this.getNumberOfSteps().map(() => (h("span", { part: "step-mark" }))))),
            h("div", { part: "inner-track" }, this.range ? (h(Fragment, null,
              h("div", { part: "thumb-wrapper from", style: { left: `${this.positionFrom}%` }, onMouseDown: this.onButtonDown, onTouchStart: this.onButtonDown },
                h("div", Object.assign({ part: "thumb from", tabindex: "0", role: "slider", id: this.sliderId + '-from', "aria-valuemin": this.min, "aria-valuenow": `${this.valueFrom} to ${this.valueTo}`, "aria-valuemax": this.max, "aria-valuetext": `${this.valueFrom} to ${this.valueTo}`, "aria-labelledby": `${this.sliderId}-label`, "aria-orientation": "horizontal", "aria-disabled": this.disabled }, (this.helperText ? ariaDescribedByAttr : {}), { onKeyDown: this.onKeyDown }))),
              h("div", { part: "thumb-wrapper to", style: { left: `${this.positionTo}%` }, onMouseDown: this.onButtonDown, onTouchStart: this.onButtonDown },
                h("div", Object.assign({ part: "thumb to", tabindex: "0", role: "slider", id: this.sliderId + '-to', "aria-valuemin": this.min, "aria-valuenow": this.value, "aria-valuemax": this.max, "aria-valuetext": this.getRangeAriaValueText(), "aria-labelledby": `${this.sliderId}-label`, "aria-orientation": "horizontal", "aria-disabled": this.disabled }, (this.helperText ? ariaDescribedByAttr : {}), { onKeyDown: this.onKeyDown }))))) : (h("div", { part: "thumb-wrapper", style: { left: `${this.position}%` }, onMouseDown: this.onButtonDown, onTouchStart: this.onButtonDown },
              h("div", Object.assign({ part: "thumb", tabindex: "0", role: "slider", id: this.sliderId, "aria-valuemin": this.min, "aria-valuenow": this.value, "aria-valuemax": this.max, "aria-valuetext": `${this.value}`, "aria-labelledby": `${this.sliderId}-label`, "aria-orientation": "horizontal", "aria-disabled": this.disabled }, (this.helperText ? ariaDescribedByAttr : {}), { onKeyDown: this.onKeyDown }))))))),
        h("input", { type: "hidden", value: this.getTextValue(), name: this.name }),
        this.helperText && (h("div", { part: "meta", id: helperTextId, "aria-live": "polite", "aria-relevant": "additions removals" },
          h("div", { part: "helper-text" }, this.helperText))))));
  }
  static get is() { return "scale-slider"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./slider.css"]
  }; }
  static get styleUrls() { return {
    "$": ["slider.css"]
  }; }
  static get properties() { return {
    "name": {
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
        "text": "(optional) the name of the slider"
      },
      "attribute": "name",
      "reflect": false
    },
    "value": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) the value of the slider"
      },
      "attribute": "value",
      "reflect": true,
      "defaultValue": "0"
    },
    "range": {
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
        "text": "(optional) multi-thumb"
      },
      "attribute": "range",
      "reflect": false,
      "defaultValue": "false"
    },
    "valueFrom": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) when `range` is true, the \"from\" value"
      },
      "attribute": "value-from",
      "reflect": true,
      "defaultValue": "0"
    },
    "valueTo": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) when `range` is true, the \"to\" value"
      },
      "attribute": "value-to",
      "reflect": true,
      "defaultValue": "0"
    },
    "min": {
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
        "text": "t(optional) he minimal value of the slider"
      },
      "attribute": "min",
      "reflect": false,
      "defaultValue": "0"
    },
    "max": {
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
        "text": "(optional) the maximal value of the slider"
      },
      "attribute": "max",
      "reflect": false,
      "defaultValue": "100"
    },
    "step": {
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
        "text": "(optional) the step size to increase or decrease when dragging slider"
      },
      "attribute": "step",
      "reflect": false,
      "defaultValue": "1"
    },
    "showStepMarks": {
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
        "text": "(optional) show a mark for each step"
      },
      "attribute": "show-step-marks",
      "reflect": false,
      "defaultValue": "false"
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
        "text": "(optional) slider label"
      },
      "attribute": "label",
      "reflect": false
    },
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
        "text": "(optional) helper text"
      },
      "attribute": "helper-text",
      "reflect": false
    },
    "showValue": {
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
        "text": "(optional) slider display value"
      },
      "attribute": "show-value",
      "reflect": false,
      "defaultValue": "true"
    },
    "unit": {
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
        "text": "(optional) slider value unit"
      },
      "attribute": "unit",
      "reflect": false,
      "defaultValue": "''"
    },
    "unitPosition": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'before' | 'after'",
        "resolved": "\"after\" | \"before\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) unit position"
      },
      "attribute": "unit-position",
      "reflect": false,
      "defaultValue": "'after'"
    },
    "decimals": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "0 | 1 | 2",
        "resolved": "0 | 1 | 2",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) number of decimal places"
      },
      "attribute": "decimals",
      "reflect": false,
      "defaultValue": "0"
    },
    "platform": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'ios' | 'android'",
        "resolved": "\"android\" | \"ios\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "name": "see",
            "text": ""
          }, {
            "name": "url",
            "text": "(https://caniuse.com/mdn-css_selectors_host-context)"
          }],
        "text": "(optional) adapt styles for a specific platform.\nIdeally done via a global `data-platform` attribute\n(e.g. data-platform=\"ios\" on `body`)\nbut browser support is not yet sufficient."
      },
      "attribute": "platform",
      "reflect": true
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
            "text": "(optional) slider custom color"
          }],
        "text": ""
      },
      "attribute": "custom-color",
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
        "text": "(optional) disabled"
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "trackSmall": {
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
            "text": "(optional) smaller track"
          }],
        "text": ""
      },
      "attribute": "track-small",
      "reflect": false
    },
    "thumbLarge": {
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
            "text": "(optional) larger thumb"
          }],
        "text": ""
      },
      "attribute": "thumb-large",
      "reflect": false
    },
    "sliderId": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Slider id"
      },
      "attribute": "slider-id",
      "reflect": false
    },
    "innerAriaValueText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "(optional) Aria label for range slider"
      },
      "attribute": "inner-aria-value-text",
      "reflect": false,
      "defaultValue": "'$from to $to'"
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
    "position": {},
    "positionFrom": {},
    "positionTo": {}
  }; }
  static get events() { return [{
      "method": "scaleChange",
      "name": "scale-change",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }, {
      "method": "scaleChangeLegacy",
      "name": "scaleChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "name": "deprecated",
            "text": "in v3 in favor of kebab-case event names"
          }],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }, {
      "method": "scaleInput",
      "name": "scale-input",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }, {
      "method": "scaleInputLegacy",
      "name": "scaleInput",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "name": "deprecated",
            "text": "in v3 in favor of kebab-case event names"
          }],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }]; }
  static get elementRef() { return "hostElement"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "handleValueChange"
    }, {
      "propName": "valueFrom",
      "methodName": "handleValueChange"
    }, {
      "propName": "valueTo",
      "methodName": "handleValueChange"
    }]; }
}
