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
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';
export class Checkbox {
  constructor() {
    /** (optional) Input label */
    this.label = '';
    /** (optional) Hides the specified label visually */
    this.hideLabel = false;
    /** @deprecated - invalid should replace status */
    this.status = '';
    /** (optional) Input status */
    this.invalid = false;
    /** (optional) Input disabled */
    this.disabled = false;
    /** (optional) Active switch */
    this.checked = false;
    /** (optional) indeterminate */
    this.indeterminate = false;
    /** (optional) Input value */
    this.value = '';
    this.internalId = generateUniqueId();
    this.handleChange = (ev) => {
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
        ev.target.checked = true;
      }
      else {
        this.checked = ev.target.checked;
      }
      const { checked, indeterminate, value, disabled } = this;
      emitEvent(this, 'scaleChange', { checked, indeterminate, value, disabled });
    };
  }
  componentDidRender() {
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message: 'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.host,
      });
    }
    if (this.host.hasAttribute('aria-label')) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "ariaLabel" is deprecated. Please use the "ariaLabelCheckbox" property!',
        type: 'warn',
        source: this.host,
      });
    }
  }
  connectedCallback() {
    if (!this.inputId) {
      this.inputId = 'input-checkbox-' + this.internalId;
    }
  }
  /* Accessibility: rendering the icon *only* when checked, otherwise is always visible in HCM */
  renderIcon() {
    if (this.indeterminate) {
      return (h("scale-icon-action-minus", { part: "icon", decorative: true }));
    }
    if (this.checked) {
      return (h("scale-icon-action-checkmark", { part: "icon", decorative: true }));
    }
  }
  renderHelperIcon() {
    if (this.helperText && !this.invalid) {
      return (h("scale-icon-alert-information", { size: 11 }));
    }
    if (this.invalid) {
      return h("scale-icon-alert-error", { size: 11 });
    }
  }
  renderHelperText(text) {
    if (this.helperText && this.helperText !== '') {
      return (h("div", { part: "helper-text", id: text.id, "aria-live": "polite", "aria-relevant": "additions removals" },
        this.renderHelperIcon(),
        text.content));
    }
  }
  render() {
    const helperText = {
      id: this.helperText ? `helper-message-${this.internalId}` : null,
      content: this.helperText,
    };
    return (h(Host, { class: {
        checked: this.checked,
        indeterminate: this.indeterminate,
        disabled: this.disabled,
        error: this.status === 'error' || this.invalid,
        hideLabel: this.hideLabel,
      } },
      h("input", { type: "checkbox", part: "input", name: this.name || null, id: this.inputId, value: this.value, checked: this.checked, indeterminate: this.indeterminate, "aria-label": this.ariaLabelCheckbox, "aria-checked": this.indeterminate ? 'mixed' : false, "aria-invalid": this.status === 'error' || this.invalid ? 'true' : null, "aria-describedBy": helperText.id, disabled: this.disabled, required: this.required, onChange: this.handleChange }),
      h("label", { part: "container", htmlFor: this.inputId },
        h("span", { part: "checkbox" }, this.renderIcon()),
        h("span", { part: "label" }, this.label || h("slot", null))),
      this.renderHelperText(helperText)));
  }
  static get is() { return "scale-checkbox"; }
  static get originalStyleUrls() { return {
    "$": ["./checkbox.css"]
  }; }
  static get styleUrls() { return {
    "$": ["checkbox.css"]
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "(optional) Input label"
      },
      "attribute": "label",
      "reflect": false,
      "defaultValue": "''"
    },
    "ariaLabelCheckbox": {
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
        "text": "(optional) Input label output"
      },
      "attribute": "aria-label-checkbox",
      "reflect": false
    },
    "hideLabel": {
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
        "text": "(optional) Hides the specified label visually"
      },
      "attribute": "hide-label",
      "reflect": false,
      "defaultValue": "false"
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
      "reflect": false
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
      "reflect": true,
      "defaultValue": "false"
    },
    "checked": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Active switch"
      },
      "attribute": "checked",
      "reflect": true,
      "defaultValue": "false"
    },
    "indeterminate": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) indeterminate"
      },
      "attribute": "indeterminate",
      "reflect": true,
      "defaultValue": "false"
    },
    "value": {
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
        "text": "(optional) Input value"
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "''"
    },
    "inputId": {
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
        "text": "Emitted when the value has changed."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
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
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "host"; }
}
