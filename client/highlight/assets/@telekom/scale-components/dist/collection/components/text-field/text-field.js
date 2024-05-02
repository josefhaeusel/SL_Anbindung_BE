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
import { Component, Prop, Element, Event, h, Host, State, } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';
export class TextField {
  constructor() {
    /** (optional) Input type */
    this.type = 'text';
    /** (optional) Input mode */
    this.inputModeType = 'text';
    /** (optional) Input name */
    this.name = '';
    /** Input label */
    this.label = '';
    /** (optional) Input helper text */
    this.helperText = '';
    /** @deprecated - invalid should replace status */
    this.status = '';
    /** (optional) Input status */
    this.invalid = false;
    /** (optional) Variant */
    this.variant = 'informational';
    /** (optional) Input placeHolder */
    this.placeholder = '';
    /** (optional) Input value */
    this.value = '';
    /** (optional) the step attribute specifies the interval between legal numbers in an <input type="number"> element. */
    this.step = '1';
    /** (optional) to avoid displaying the label */
    this.hideLabelVisually = false;
    /** (optional)) Makes type `input` behave as a controlled component in React */
    this.experimentalControlled = false;
    /** Whether the input element has focus */
    this.hasFocus = false;
    this.internalId = generateUniqueId();
    this.handleInput = (event) => {
      const target = event.target;
      if (this.experimentalControlled) {
        this.hostElement.querySelector('input').value = String(this.value);
        this.forceUpdate = String(Date.now());
      }
      if (target) {
        this.value = target.value || '';
        this.emitChange();
      }
      emitEvent(this, 'scaleInput', event);
    };
    this.handleChange = (event) => {
      const target = event.target;
      if (target) {
        this.value = target.value || '';
        this.emitChange();
      }
    };
    this.handleFocus = () => {
      emitEvent(this, 'scaleFocus');
      this.hasFocus = true;
    };
    this.handleBlur = () => {
      emitEvent(this, 'scaleBlur');
      this.hasFocus = false;
    };
    this.handleKeyDown = (event) => {
      emitEvent(this, 'scaleKeyDown', event);
    };
  }
  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-text-field-' + this.internalId;
    }
  }
  componentDidRender() {
    // When `experimentalControlled` is true,
    // make sure the <input> is always in sync with the value.
    const value = this.value == null ? '' : this.value.toString();
    const input = this.hostElement.querySelector('input');
    if (this.experimentalControlled && input.value.toString() !== value) {
      input.value = value;
    }
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message: 'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "size" is deprecated. Please use css overwrites for a small version!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  // We're not watching `value` like we used to
  // because we get unwanted `scaleChange` events
  // because how we keep this.value up-to-date for type="select"
  // `this.value = selectedValue`
  emitChange() {
    emitEvent(this, 'scaleChange', {
      value: this.value == null ? this.value : this.value.toString(),
    });
  }
  render() {
    const ariaInvalidAttr = this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    const ariaDetailedById = { 'aria-details': this.ariaDetailedId };
    const numericTypes = [
      'number',
      'date',
      'month',
      'week',
      'time',
      'datetime-local',
    ];
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      h("div", { class: this.getCssClassMap() },
        h("label", { class: "text-field__label", htmlFor: this.inputId }, this.label),
        h("input", Object.assign({ type: this.type, inputMode: this.inputModeType, class: "text-field__control", value: this.value }, (!!this.name ? { name: this.name } : {}), (!!this.inputAutofocus ? { autofocus: 'true' } : {}), { required: this.required, minLength: this.minLength, maxLength: this.maxLength, min: this.min, max: this.max, id: this.inputId, list: this.list, onInput: this.handleInput, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown }, (!!this.placeholder && !this.readonly
          ? { placeholder: this.placeholder }
          : {}), { disabled: this.disabled, readonly: this.readonly, autocomplete: this.inputAutocomplete }, ariaDetailedById, ariaInvalidAttr, (this.helperText ? ariaDescribedByAttr : {}), (numericTypes.includes(this.type) ? { step: this.step } : {}))),
        (!!this.helperText || !!this.counter) && (h("div", { class: "text-field__meta", "aria-live": "polite", "aria-relevant": "additions removals" },
          this.helperText && (h("scale-helper-text", { id: helperTextId, helperText: this.helperText, variant: this.invalid ? 'danger' : this.variant })),
          this.counter && (h("div", { class: "text-field__counter" },
            !!this.value ? String(this.value).length : 0,
            " /",
            ' ',
            this.maxLength)))))));
  }
  getCssClassMap() {
    // the numeric type as followings, eg input[type="date"], will print a placeholder in some browsers
    const numericTypes = ['date', 'month', 'week', 'time', 'datetime-local'];
    const animated = (this.value != null && this.value !== '') ||
      numericTypes.includes(this.type);
    return classNames('text-field', this.type && `text-field--type-${this.type}`, this.hasFocus && 'text-field--has-focus', this.disabled && `text-field--disabled`, this.transparent && 'text-field--transparent', this.status && `text-field--status-${this.status}`, this.invalid && `text-field--variant-danger`, this.variant && `text-field--variant-${this.variant}`, this.helperText && `text-field--helper-text`, this.readonly && `text-field--readonly`, this.hideLabelVisually && `text-field--hide-label`, animated && 'animated');
  }
  static get is() { return "scale-text-field"; }
  static get originalStyleUrls() { return {
    "$": ["./text-field.css"]
  }; }
  static get styleUrls() { return {
    "$": ["text-field.css"]
  }; }
  static get properties() { return {
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| 'email'\n    | 'hidden'\n    | 'number'\n    | 'password'\n    | 'tel'\n    | 'text'\n    | 'date'\n    | 'month' // example yyyy-mm\n    | 'week' // example yyyy-W##\n    | 'time' // example hh:mm\n    | 'datetime-local' // example yyyy-mm-ddThh:mm\n    | 'url'",
        "resolved": "\"date\" | \"datetime-local\" | \"email\" | \"hidden\" | \"month\" | \"number\" | \"password\" | \"tel\" | \"text\" | \"time\" | \"url\" | \"week\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Input type"
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'text'"
    },
    "inputModeType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| 'none'\n    | 'text'\n    | 'decimal'\n    | 'numeric'\n    | 'tel'\n    | 'search'\n    | 'email'\n    | 'url'",
        "resolved": "\"decimal\" | \"email\" | \"none\" | \"numeric\" | \"search\" | \"tel\" | \"text\" | \"url\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Input mode"
      },
      "attribute": "input-mode-type",
      "reflect": false,
      "defaultValue": "'text'"
    },
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
        "text": "(optional) Input name"
      },
      "attribute": "name",
      "reflect": false,
      "defaultValue": "''"
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Input label"
      },
      "attribute": "label",
      "reflect": false,
      "defaultValue": "''"
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
        "text": "(optional) Input helper text"
      },
      "attribute": "helper-text",
      "reflect": false,
      "defaultValue": "''"
    },
    "status": {
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
            "text": "- invalid should replace status"
          }],
        "text": ""
      },
      "attribute": "status",
      "reflect": false,
      "defaultValue": "''"
    },
    "invalid": {
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
        "text": "(optional) Input status"
      },
      "attribute": "invalid",
      "reflect": false,
      "defaultValue": "false"
    },
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'informational' | 'warning' | 'danger' | 'success'",
        "resolved": "\"danger\" | \"informational\" | \"success\" | \"warning\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Variant"
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'informational'"
    },
    "maxLength": {
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
        "text": "(optional) Input text string max length"
      },
      "attribute": "max-length",
      "reflect": false
    },
    "minLength": {
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
        "text": "(optional) Input text string min length"
      },
      "attribute": "min-length",
      "reflect": false
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
        "text": "(optional) define the numeric maximum value of input types such as month, date, time"
      },
      "attribute": "max",
      "reflect": false
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
        "text": "(optional) defines the numeric minimum value of input types such as month, date, time"
      },
      "attribute": "min",
      "reflect": false
    },
    "placeholder": {
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
        "text": "(optional) Input placeHolder"
      },
      "attribute": "placeholder",
      "reflect": false,
      "defaultValue": "''"
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
        "text": "(optional) Input disabled"
      },
      "attribute": "disabled",
      "reflect": false
    },
    "readonly": {
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
        "text": "(optional) Input readonly"
      },
      "attribute": "readonly",
      "reflect": false
    },
    "required": {
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
        "text": "(optional) Input required"
      },
      "attribute": "required",
      "reflect": false
    },
    "counter": {
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
        "text": "(optional) Input counter"
      },
      "attribute": "counter",
      "reflect": false
    },
    "value": {
      "type": "any",
      "mutable": true,
      "complexType": {
        "original": "string | number | null",
        "resolved": "number | string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Input value"
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "''"
    },
    "inputId": {
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
        "text": "(optional) Input checkbox id"
      },
      "attribute": "input-id",
      "reflect": false
    },
    "transparent": {
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
        "text": "(optional) input background transparent"
      },
      "attribute": "transparent",
      "reflect": false
    },
    "step": {
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
        "text": "(optional) the step attribute specifies the interval between legal numbers in an <input type=\"number\"> element."
      },
      "attribute": "step",
      "reflect": false,
      "defaultValue": "'1'"
    },
    "list": {
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
        "text": "(optional) input list"
      },
      "attribute": "list",
      "reflect": false
    },
    "inputAutofocus": {
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
        "text": "(optional) the input should automatically get focus when the page loads."
      },
      "attribute": "input-autofocus",
      "reflect": false
    },
    "inputAutocomplete": {
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
        "text": "(optional) custom value for autocomplete HTML attribute"
      },
      "attribute": "input-autocomplete",
      "reflect": false
    },
    "ariaDetailedId": {
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
        "text": "(optional) id or space separated list of ids of elements that provide or link to additional related information."
      },
      "attribute": "aria-detailed-id",
      "reflect": false
    },
    "hideLabelVisually": {
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
        "text": "(optional) to avoid displaying the label"
      },
      "attribute": "hide-label-visually",
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
    },
    "experimentalControlled": {
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
        "text": "(optional)) Makes type `input` behave as a controlled component in React"
      },
      "attribute": "experimental-controlled",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "hasFocus": {},
    "forceUpdate": {}
  }; }
  static get events() { return [{
      "method": "scaleInput",
      "name": "scale-input",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when a keyboard input occurred."
      },
      "complexType": {
        "original": "KeyboardEvent",
        "resolved": "KeyboardEvent",
        "references": {
          "KeyboardEvent": {
            "location": "global"
          }
        }
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
        "original": "KeyboardEvent",
        "resolved": "KeyboardEvent",
        "references": {
          "KeyboardEvent": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "scaleChange",
      "name": "scale-change",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the value has changed."
      },
      "complexType": {
        "original": "InputChangeEventDetail",
        "resolved": "InputChangeEventDetail",
        "references": {
          "InputChangeEventDetail": {
            "location": "global"
          }
        }
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
        "original": "InputChangeEventDetail",
        "resolved": "InputChangeEventDetail",
        "references": {
          "InputChangeEventDetail": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "scaleFocus",
      "name": "scale-focus",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the input has focus."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleFocusLegacy",
      "name": "scaleFocus",
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
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleBlur",
      "name": "scale-blur",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the input loses focus."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleBlurLegacy",
      "name": "scaleBlur",
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
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleKeyDown",
      "name": "scale-keydown",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted on keydown."
      },
      "complexType": {
        "original": "KeyboardEvent",
        "resolved": "KeyboardEvent",
        "references": {
          "KeyboardEvent": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "scaleKeyDownLegacy",
      "name": "scaleKeydown",
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
        "original": "KeyboardEvent",
        "resolved": "KeyboardEvent",
        "references": {
          "KeyboardEvent": {
            "location": "global"
          }
        }
      }
    }]; }
  static get elementRef() { return "hostElement"; }
}
