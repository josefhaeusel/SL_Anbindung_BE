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
import { Component, Prop, h, Host, Element, State, Listen, Event, Watch, } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
const CHECKMARK_WIDTH_SMALL = 14;
const CHECKMARK_WIDTH_MEDIUM = 18 + 12;
const CHECKMARK_WIDTH_LARGE = 20 + 18;
export class SegmentedButton {
  constructor() {
    /** segment position within button */
    this.position = 0;
    this.slottedSegments = 0;
    /** state */
    this.status = [];
    /** (optional) The size of the button */
    this.size = 'small';
    /** (optional) Allow more than one button to be selected */
    this.multiSelect = false;
    /** (optional) If `true`, the button is disabled */
    this.disabled = false;
    /** (optional) If `true`, expand to container width */
    this.fullWidth = false;
    /** (optional) If `true`, show error message */
    this.invalid = false;
    /** (optional) If `true`, show error message */
    this.helperText = 'Please select an option';
    /** (optional) aria-label attribute needed for icon-only buttons */
    this.ariaLabelTranslation = `segment button with $slottedSegments`;
    this.showHelperText = false;
    this.getAdjacentSiblings = (tempState, i) => {
      let adjacentSiblings = '';
      if (i !== 0 && tempState[i].selected && tempState[i - 1].selected) {
        adjacentSiblings = 'left';
      }
      if (i !== tempState.length - 1 &&
        tempState[i].selected &&
        tempState[i + 1].selected) {
        adjacentSiblings = `${adjacentSiblings ? adjacentSiblings + ' right' : 'right'}`;
      }
      return adjacentSiblings;
    };
  }
  scaleClickHandler(ev) {
    let tempState;
    if (!this.multiSelect) {
      if (!ev.detail.selected) {
        tempState = this.status.map((obj) => ev.detail.id === obj.id ? ev.detail : Object.assign({}, obj));
        /* clicked button has now selected state */
      }
      else {
        tempState = this.status.map((obj) => ev.detail.id === obj.id ? ev.detail : Object.assign(Object.assign({}, obj), { selected: false }));
      }
    }
    else {
      tempState = this.status.map((obj) => ev.detail.id === obj.id ? ev.detail : Object.assign({}, obj));
    }
    this.setState(tempState);
  }
  handlePropsChange() {
    this.propagatePropsToChildren();
  }
  /**
   * Keep props, needed in children buttons, in sync
   */
  propagatePropsToChildren() {
    this.getAllSegments().forEach((segment) => {
      segment.setAttribute('size', this.size);
      segment.setAttribute('selected-index', this.selectedIndex.toString());
      if (this.disabled) {
        segment.setAttribute('disabled', true && 'disabled');
      }
    });
  }
  componentDidLoad() {
    const tempState = [];
    const segments = this.getAllSegments();
    this.slottedSegments = segments.length;
    const longestButtonWidth = this.getLongestButtonWidth();
    segments.forEach((segment) => {
      this.position++;
      tempState.push({
        id: segment.getAttribute('segment-id') || segment.segmentId,
        selected: segment.hasAttribute('selected') || segment.selected,
      });
      segment.setAttribute('position', this.position.toString());
      segment.setAttribute('aria-description-translation', '$position $selected');
    });
    if (!this.fullWidth) {
      this.container.style.gridTemplateColumns = `repeat(${this.hostElement.children.length}, ${Math.ceil(longestButtonWidth)}px)`;
    }
    else {
      this.container.style.display = 'flex';
    }
    this.selectedIndex = this.getSelectedIndex();
    this.propagatePropsToChildren();
    this.position = 0;
    this.status = tempState;
    this.setState(tempState);
  }
  componentWillUpdate() {
    this.selectedIndex = this.getSelectedIndex();
    this.showHelperText = false;
    if (this.invalid &&
      this.status.filter((e) => e.selected === true).length <= 0) {
      this.showHelperText = true;
    }
  }
  getSelectedIndex() {
    if (this.multiSelect) {
      // in multi-select having no selected segments is allowed
      return -1;
    }
    else {
      const allSegments = this.getAllSegments();
      const selectedIndex = allSegments.findIndex((el) => el.selected === true);
      return selectedIndex;
    }
  }
  // all segmented buttons should have the same width, based on the largest one
  getLongestButtonWidth() {
    let tempWidth = 0;
    Array.from(this.hostElement.children).forEach((child) => {
      const selected = child.hasAttribute('selected');
      const iconOnly = child.hasAttribute('icon-only');
      const checkmark = this.size === 'small'
        ? CHECKMARK_WIDTH_SMALL
        : this.size === 'medium'
          ? CHECKMARK_WIDTH_MEDIUM
          : CHECKMARK_WIDTH_LARGE;
      if (selected || iconOnly) {
        tempWidth =
          child.getBoundingClientRect().width > tempWidth
            ? child.getBoundingClientRect().width
            : tempWidth;
      }
      else {
        tempWidth =
          child.getBoundingClientRect().width + checkmark > tempWidth
            ? child.getBoundingClientRect().width + checkmark
            : tempWidth;
      }
    });
    return tempWidth;
  }
  setState(tempState) {
    const segments = Array.from(this.hostElement.querySelectorAll('scale-segment'));
    segments.forEach((segment, i) => {
      segment.setAttribute('adjacent-siblings', this.getAdjacentSiblings(tempState, i));
      segment.setAttribute('selected', tempState[i].selected ? 'true' : 'false');
    });
    this.status = tempState;
    emitEvent(this, 'scaleChange', this.status);
  }
  getAllSegments() {
    return Array.from(this.hostElement.querySelectorAll('scale-segment'));
  }
  getAriaLabelTranslation() {
    const filledText = this.ariaLabelTranslation.replace(/\$slottedSegments/g, `${this.slottedSegments}`);
    return filledText;
  }
  render() {
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      this.label && (h("span", { class: "segmented-button--label" },
        " ",
        this.label,
        " ")),
      h("div", { class: this.getCssClassMap(), part: this.getBasePartMap(), "aria-label": this.getAriaLabelTranslation(), role: "group", ref: (el) => (this.container = el) },
        h("slot", null)),
      this.showHelperText && (h("scale-helper-text", { class: "segmented-button--helper-text", helperText: this.helperText, variant: 'danger' }))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const prefix = mode === 'basePart' ? '' : 'segmented-button--';
    return classNames('segmented-button', this.size && `${prefix}${this.size}`, this.fullWidth && `${prefix}full-width`);
  }
  static get is() { return "scale-segmented-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["segmented-button.css"]
  }; }
  static get styleUrls() { return {
    "$": ["segmented-button.css"]
  }; }
  static get properties() { return {
    "size": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'small' | 'medium' | 'large'",
        "resolved": "\"large\" | \"medium\" | \"small\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) The size of the button"
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'small'"
    },
    "multiSelect": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "(optional) Allow more than one button to be selected"
      },
      "attribute": "multi-select",
      "reflect": false,
      "defaultValue": "false"
    },
    "selectedIndex": {
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
        "text": "(optional) the index of the selected segment"
      },
      "attribute": "selected-index",
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
        "text": "(optional) If `true`, the button is disabled"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "fullWidth": {
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
        "text": "(optional) If `true`, expand to container width"
      },
      "attribute": "full-width",
      "reflect": false,
      "defaultValue": "false"
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
        "text": "(optional) If `true`, show error message"
      },
      "attribute": "invalid",
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
        "text": "(optional) If `true`, show error message"
      },
      "attribute": "helper-text",
      "reflect": false,
      "defaultValue": "'Please select an option'"
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
        "text": "(optional) Button label"
      },
      "attribute": "label",
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
    "ariaLabelTranslation": {
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
        "text": "(optional) aria-label attribute needed for icon-only buttons"
      },
      "attribute": "aria-label-translation",
      "reflect": false,
      "defaultValue": "`segment button with $slottedSegments`"
    },
    "longestButtonWidth": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "longest-button-width",
      "reflect": false
    }
  }; }
  static get states() { return {
    "status": {}
  }; }
  static get events() { return [{
      "method": "scaleChange",
      "name": "scale-change",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when button is clicked"
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
  static get elementRef() { return "hostElement"; }
  static get watchers() { return [{
      "propName": "disabled",
      "methodName": "handlePropsChange"
    }, {
      "propName": "size",
      "methodName": "handlePropsChange"
    }, {
      "propName": "selectedIndex",
      "methodName": "handlePropsChange"
    }]; }
  static get listeners() { return [{
      "name": "scaleClick",
      "method": "scaleClickHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
