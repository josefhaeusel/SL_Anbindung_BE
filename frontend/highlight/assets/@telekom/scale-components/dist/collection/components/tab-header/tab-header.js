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
import { Component, Element, Event, h, Host, Listen, Prop, State, Watch, } from '@stencil/core';
import classNames from 'classnames';
import { isScaleIcon } from '../../utils/utils';
import statusNote from '../../utils/status-note';
const PER_SPEC_ICON_SIZE = 20;
let i = 0;
export class TabHeader {
  constructor() {
    this.generatedId = i++;
    /** True for a disabled Tabnavigation */
    this.disabled = false;
    /** True for smaller height and font size */
    /** @deprecated - size should replace small */
    this.small = false;
    /** (optional) size  */
    this.size = 'small';
    this.hasFocus = false;
  }
  handleClick(event) {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.scaleSelect.emit();
  }
  selectedChanged(newValue) {
    if (!this.hostElement.isConnected) {
      return;
    }
    if (!this.disabled) {
      if (newValue === true && this.tabsHaveFocus()) {
        // Having focus on the host element, and not on inner elements,
        // is required because screen readers.
        this.hostElement.focus();
      }
      this.updateSlottedIcon();
    }
  }
  disabledChanged() {
    if (this.disabled) {
      this.selected = false;
    }
  }
  componentDidLoad() {
    this.setChildrenIconSize();
  }
  componentDidRender() {
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "small" is deprecated. Please use css overwrites.',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  /**
   * Whether current focused element is within parent `scale-tab-nav`.
   * Only if `true`, we imperatively focus the selected element.
   * @returns boolean
   */
  tabsHaveFocus() {
    const tabs = this.hostElement.closest('.scale-tab-nav');
    if (!tabs) {
      return false;
    }
    return tabs.contains(document.activeElement);
  }
  /**
   * Find slotted icons, and if any, add the `selected` attribute accordingly.
   */
  updateSlottedIcon() {
    const icons = Array.from(this.hostElement.childNodes).filter(isScaleIcon);
    const action = this.selected ? 'setAttribute' : 'removeAttribute';
    icons.forEach((child) => child[action]('selected', ''));
  }
  /**
   * Set any children icon's size according the button size.
   */
  setChildrenIconSize() {
    const icons = Array.from(this.hostElement.childNodes).filter(isScaleIcon);
    icons.forEach((icon) => {
      // This is meh people might actually want 24
      if (icon.size !== PER_SPEC_ICON_SIZE) {
        icon.size = PER_SPEC_ICON_SIZE;
      }
    });
  }
  render() {
    return (h(Host, { id: `scale-tab-header-${this.generatedId}`, role: this.disabled ? false : 'tab', "aria-selected": this.selected ? 'true' : 'false', tabindex: this.disabled ? false : this.selected ? '0' : '-1', onFocus: () => (this.hasFocus = true), onBlur: () => (this.hasFocus = false) },
      this.styles && h("style", null, this.styles),
      h("span", { part: this.getBasePartMap(), class: this.getCssClassMap() },
        h("slot", null))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const component = 'tab-header';
    const prefix = mode === 'basePart' ? '' : `${component}--`;
    return classNames(component, this.selected && `${prefix}selected`, this.size === 'large' && `${prefix}large`, this.hasFocus && `${prefix}has-focus`, this.disabled && `${prefix}disabled`);
  }
  static get is() { return "scale-tab-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./tab-header.css"]
  }; }
  static get styleUrls() { return {
    "$": ["tab-header.css"]
  }; }
  static get properties() { return {
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
        "text": "True for a disabled Tabnavigation"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
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
            "text": "- size should replace small"
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) size"
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'small'"
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
        "text": "(optional) Whether the tab is selected"
      },
      "attribute": "selected",
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
  static get states() { return {
    "hasFocus": {}
  }; }
  static get events() { return [{
      "method": "scaleSelect",
      "name": "scale-select",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "hostElement"; }
  static get watchers() { return [{
      "propName": "selected",
      "methodName": "selectedChanged"
    }, {
      "propName": "disabled",
      "methodName": "disabledChanged"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "handleClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
