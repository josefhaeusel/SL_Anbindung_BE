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
import { Component, Element, Event, h, Host, Prop, } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';
export class RadioButton {
  constructor() {
    /** (optional) Input name */
    this.name = '';
    /** (optional) Input label */
    this.label = '';
    /** (optional) Input helper text */
    this.helperText = '';
    /** @deprecated - invalid should replace status */
    this.status = '';
    /** (optional) Input status */
    this.invalid = false;
    /** (optional) Input checked */
    this.checked = false;
    /** (optional) Input value */
    this.value = '';
    this.internalId = generateUniqueId();
    this.handleCheckedChange = (event) => {
      if (!this.disabled) {
        this.checked = event.target.checked;
        // I don't think this is ever going to be `false` but well...
        if (this.checked) {
          this.uncheckSiblings();
        }
        emitEvent(this, 'scaleChange', {
          value: this.value == null ? this.value : this.value.toString(),
        });
      }
    };
  }
  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-' + this.internalId;
    }
  }
  componentDidRender() {
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message: 'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  // We manually set `checked` to false on sibling <scale-radio-button> elements,
  // otherwise they stayed `checked` after being clicked once, forever.
  uncheckSiblings() {
    this.getSiblingRadios().forEach((radio) => {
      radio.checked = false;
    });
  }
  getSiblingRadios() {
    return Array.from(document.querySelectorAll(`scale-radio-button[name="${this.name}"]`)).filter((radio) => radio.inputId !== this.inputId);
  }
  renderHelperIcon() {
    if (this.helperText && !this.invalid) {
      return (h("scale-icon-alert-information", { size: 11 }));
    }
    if (this.invalid) {
      return h("scale-icon-alert-error", { size: 11 });
    }
  }
  render() {
    const ariaInvalidAttr = this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    return (h(Host, null,
      h("div", { class: this.getCssClassMap() },
        h("input", Object.assign({ type: "radio", name: this.name, id: this.inputId, onChange: this.handleCheckedChange, value: this.value, checked: this.checked, disabled: this.disabled }, ariaInvalidAttr, (this.helperText ? ariaDescribedByAttr : {}))),
        h("label", { htmlFor: this.inputId }, this.label),
        !!this.helperText && (h("div", { class: "radio-button__meta", id: helperTextId, "aria-live": "polite", "aria-relevant": "additions removals" },
          this.renderHelperIcon(),
          h("div", { class: "radio-button__helper-text" }, this.helperText))))));
  }
  getCssClassMap() {
    return classNames('radio-button', this.checked && `radio-button--checked`, this.disabled && `radio-button--disabled`, this.status && `radio-button--status-${this.status}`, this.invalid && `radio-button--status-error`);
  }
  static get is() { return "scale-radio-button"; }
  static get originalStyleUrls() { return {
    "$": ["./radio-button.css"]
  }; }
  static get styleUrls() { return {
    "$": ["radio-button.css"]
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
        "text": "(optional) Input label"
      },
      "attribute": "label",
      "reflect": false,
      "defaultValue": "''"
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
    "checked": {
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
        "text": "(optional) Input checked"
      },
      "attribute": "checked",
      "reflect": true,
      "defaultValue": "false"
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
    }]; }
  static get elementRef() { return "hostElement"; }
}
