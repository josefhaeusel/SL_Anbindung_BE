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
import { Component, Prop, h, Host, Event, Element, } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
export class Chip {
  constructor() {
    /** (optional) */
    this.variant = 'standard';
    /** (optional) */
    this.type = 'persistent';
    /** (optional) */
    this.selected = false;
    /** (optional) chip aria-role */
    this.ariaRoleTitle = 'switch';
    /** @deprecated (optional) chip aria-checked - should be derived from selected state attribute */
    this.ariaCheckedState = false;
    /** (optional) chip disabled */
    this.disabled = false;
    /** (optional) Dismiss label */
    this.dismissText = 'dismiss';
    this.handleClose = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.disabled && this.type !== 'dynamic') {
        return;
      }
      emitEvent(this, 'scaleClose', event);
    };
    this.handleClick = (event) => {
      if (this.type !== 'dynamic') {
        this.selected = !this.selected;
      }
      event.preventDefault();
      event.stopPropagation();
      if (this.disabled && this.type !== 'dynamic') {
        return;
      }
      emitEvent(this, 'scaleChange', event);
    };
  }
  componentDidRender() {
    // handle no setted icon size attribute
    const defaultIconSize = 24;
    const iconSlot = this.hostElement.querySelector('[slot="chip-icon"]');
    if (iconSlot !== null) {
      if (iconSlot.children[0].getAttribute('size') === String(defaultIconSize)) {
        iconSlot.children[0].setAttribute('size', String(16));
      }
      if (this.selected) {
        iconSlot.children[0].setAttribute('selected', String(true));
      }
      else {
        iconSlot.children[0].setAttribute('selected', String(false));
      }
    }
  }
  disconnectedCallback() { }
  getIcon() {
    if (this.type === 'dynamic' && this.selected) {
      return (h("button", { part: "button-dismissable", disabled: this.disabled, "aria-label": this.dismissText, onClick: !this.disabled ? this.handleClose : null },
        h("scale-icon-action-close", { "accessibility-title": "close", size: 16, selected: true })));
    }
    else if (this.type === 'persistent' && this.selected) {
      return (h("scale-icon-action-checkmark", { "accessibility-title": "success", size: 16, selected: true }));
    }
    else if (this.type === 'persistent') {
      return (h("scale-icon-action-checkmark", { "accessibility-title": "success", size: 16 }));
    }
  }
  render() {
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      this.type === 'dynamic' && this.selected ? (h("span", { role: this.ariaRoleTitle, tabindex: this.selected ? '0' : '-1', part: this.getBasePartMap(), class: this.getCssClassMap(), "aria-checked": this.selected.toString(), onClick: !this.disabled || this.type === 'dynamic'
          ? this.handleClick
          : null },
        h("slot", { name: "chip-icon" }),
        h("span", { class: "chip-label" },
          h("slot", null)),
        this.selected ? this.getIcon() : null)) : (h("span", { role: this.ariaRoleTitle, "aria-checked": this.selected.toString(), tabindex: this.selected ? '0' : '-1', part: this.getBasePartMap(), class: this.getCssClassMap(), onClick: !this.disabled || this.type === 'dynamic'
          ? this.handleClick
          : null },
        h("slot", { name: "chip-icon" }),
        h("span", { class: "chip-label" },
          h("slot", null)),
        this.selected ? this.getIcon() : null))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const component = 'chip';
    const prefix = mode === 'basePart' ? '' : `${component}--`;
    return classNames(mode === 'basePart' ? 'base' : component, !!this.selected && `${prefix}selected`, !!this.disabled && `${prefix}disabled`, this.type && `${prefix}type-${this.type}`, this.variant && `${prefix}variant-${this.variant}`);
  }
  static get is() { return "scale-chip"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./chip.css"]
  }; }
  static get styleUrls() { return {
    "$": ["chip.css"]
  }; }
  static get properties() { return {
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'standard' | 'outline'",
        "resolved": "\"outline\" | \"standard\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional)"
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'standard'"
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'dynamic' | 'persistent'",
        "resolved": "\"dynamic\" | \"persistent\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional)"
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'persistent'"
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
        "text": "(optional)"
      },
      "attribute": "selected",
      "reflect": false,
      "defaultValue": "false"
    },
    "ariaRoleTitle": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| 'switch'\n    | 'radio'\n    | 'option'\n    | 'menuitemreadio'\n    | 'menuitemcheckbox'\n    | 'checkbox'",
        "resolved": "\"checkbox\" | \"menuitemcheckbox\" | \"menuitemreadio\" | \"option\" | \"radio\" | \"switch\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) chip aria-role"
      },
      "attribute": "aria-role-title",
      "reflect": false,
      "defaultValue": "'switch'"
    },
    "ariaCheckedState": {
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
            "text": "(optional) chip aria-checked - should be derived from selected state attribute"
          }],
        "text": ""
      },
      "attribute": "aria-checked-state",
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
        "text": "(optional) chip label"
      },
      "attribute": "label",
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
        "text": "(optional) chip disabled"
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "dismissText": {
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
        "text": "(optional) Dismiss label"
      },
      "attribute": "dismiss-text",
      "reflect": false,
      "defaultValue": "'dismiss'"
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
        "text": "(optional) Change icon click event"
      },
      "complexType": {
        "original": "MouseEvent",
        "resolved": "MouseEvent",
        "references": {
          "MouseEvent": {
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
        "original": "MouseEvent",
        "resolved": "MouseEvent",
        "references": {
          "MouseEvent": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "scaleClose",
      "name": "scale-close",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "(optional) Close icon click event"
      },
      "complexType": {
        "original": "MouseEvent",
        "resolved": "MouseEvent",
        "references": {
          "MouseEvent": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "scaleCloseLegacy",
      "name": "scaleClose",
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
        "original": "MouseEvent",
        "resolved": "MouseEvent",
        "references": {
          "MouseEvent": {
            "location": "global"
          }
        }
      }
    }]; }
  static get elementRef() { return "hostElement"; }
}
