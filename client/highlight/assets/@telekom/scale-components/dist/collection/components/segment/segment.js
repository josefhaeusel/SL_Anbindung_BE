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
import { Component, Prop, h, Host, Element, Event, Method, } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
let i = 0;
export class Segment {
  constructor() {
    /** (optional) The size of the segment */
    this.size = 'small';
    /** (optional) If `true`, the segment is selected */
    this.selected = false;
    /** (optional) If `true`, the segment is disabled */
    this.disabled = false;
    /** (optional) translation of 'selected */
    this.ariaLangSelected = 'selected';
    /** (optional) translation of 'deselected */
    this.ariaLangDeselected = 'deselected';
    /** a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties.  */
    this.ariaDescriptionTranslation = '$selected';
    this.handleClick = (event) => {
      if (parseInt(this.selectedIndex, 10) + 1 === this.position) {
        return;
      }
      event.preventDefault();
      this.selected = !this.selected;
      emitEvent(this, 'scaleClick', {
        id: this.segmentId,
        selected: this.selected,
      });
    };
  }
  async setFocus() {
    this.focusableElement.focus();
  }
  componentWillLoad() {
    if (this.segmentId == null) {
      this.segmentId = 'segment-' + i++;
    }
  }
  componentDidUpdate() {
    this.handleIcon();
  }
  getAriaDescriptionTranslation() {
    const replaceSelected = this.selected
      ? this.ariaLangSelected
      : this.ariaLangDeselected;
    const filledText = this.ariaDescriptionTranslation
      .replace(/\$position/g, `${this.position}`)
      .replace(/\$selected/g, `${replaceSelected}`);
    return filledText;
  }
  handleIcon() {
    Array.from(this.hostElement.childNodes).forEach((child) => {
      if (child.nodeType === 1 &&
        child.nodeName.substr(0, 10) === 'SCALE-ICON') {
        const icon = this.hostElement.querySelector(child.nodeName);
        switch (this.size) {
          case 'small':
            icon.setAttribute('size', '14');
            break;
          case 'medium':
            icon.setAttribute('size', '16');
            break;
          case 'large':
            icon.setAttribute('size', '20');
            break;
        }
        icon.style.display = 'inline-flex';
        icon.style.marginRight = '4px';
        this.hasIcon = true;
      }
      if (child.nodeType === 3 && this.hostElement.childNodes.length === 1) {
        this.textOnly = true;
        const span = document.createElement('span');
        child.parentNode.insertBefore(span, child);
        span.appendChild(child);
      }
      if (child.nodeType === 1 &&
        child.nodeName.substr(0, 10) === 'SCALE-ICON' &&
        this.hostElement.childNodes.length === 1) {
        this.iconOnly = true;
        this.hostElement.setAttribute('icon-only', 'true');
        const icon = this.hostElement.querySelector(child.nodeName);
        icon.style.marginRight = '0px';
        this.selected
          ? icon.setAttribute('selected', '')
          : icon.removeAttribute('selected');
      }
    });
  }
  render() {
    return (h(Host, null,
      this.styles && h("style", null, this.styles),
      h("button", { ref: (el) => (this.focusableElement = el), class: this.getCssClassMap(), id: this.segmentId, onClick: this.handleClick, disabled: this.disabled, type: "button", style: { width: this.width }, "aria-label": this.ariaLabelSegment, "aria-pressed": this.selected, part: this.getBasePartMap(), "aria-description": this.getAriaDescriptionTranslation() },
        h("div", { class: "segment--mask" },
          !this.iconOnly && (h("div", { class: "success-icon-container" },
            h("scale-icon-action-checkmark", { size: this.size === 'small'
                ? 14
                : this.size === 'medium'
                  ? 16
                  : 20, class: "scale-icon-action-checkmark", "aria-hidden": "true", selected: true }))),
          h("div", { class: "icon-container" },
            h("slot", { name: "segment-icon" })),
          h("slot", null)))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const prefix = mode === 'basePart' ? '' : 'segment--';
    return classNames('segment', this.size && `${prefix}${this.size}`, this.selected && `${prefix}selected`, this.disabled && `${prefix}disabled`, this.adjacentSiblings &&
      `${prefix}${this.adjacentSiblings.replace(/ /g, '-')}-sibling-selected`, this.hasIcon && `${prefix}has-icon`, this.iconOnly && `${prefix}icon-only`);
  }
  static get is() { return "scale-segment"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["segment.css"]
  }; }
  static get styleUrls() { return {
    "$": ["segment.css"]
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
        "text": "(optional) The size of the segment"
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'small'"
    },
    "selected": {
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
        "text": "(optional) If `true`, the segment is selected"
      },
      "attribute": "selected",
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
        "text": "(optional) If `true`, the segment is disabled"
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "segmentId": {
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
        "text": "(optional) segment's id"
      },
      "attribute": "segment-id",
      "reflect": true
    },
    "ariaLabelSegment": {
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
        "text": "(optional) aria-label attribute needed for icon-only segments"
      },
      "attribute": "aria-label-segment",
      "reflect": false
    },
    "width": {
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
        "text": "(optional) Segment width set to ensure that all segments have the same width"
      },
      "attribute": "width",
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
    "adjacentSiblings": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "| 'left'\n    | 'right'\n    | 'leftright'",
        "resolved": "\"left\" | \"leftright\" | \"right\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "adjacent-siblings",
      "reflect": true
    },
    "ariaLangSelected": {
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
        "text": "(optional) translation of 'selected"
      },
      "attribute": "aria-lang-selected",
      "reflect": false,
      "defaultValue": "'selected'"
    },
    "ariaLangDeselected": {
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
        "text": "(optional) translation of 'deselected"
      },
      "attribute": "aria-lang-deselected",
      "reflect": false,
      "defaultValue": "'deselected'"
    },
    "ariaDescriptionTranslation": {
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
        "text": "a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties."
      },
      "attribute": "aria-description-translation",
      "reflect": false,
      "defaultValue": "'$selected'"
    },
    "position": {
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
        "text": "(optional) position within group"
      },
      "attribute": "position",
      "reflect": false
    },
    "hasIcon": {
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
        "text": "(optional) position within group"
      },
      "attribute": "has-icon",
      "reflect": false
    },
    "textOnly": {
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
        "text": "(optional) position within group"
      },
      "attribute": "text-only",
      "reflect": false
    },
    "iconOnly": {
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
        "text": "(optional) position within group"
      },
      "attribute": "icon-only",
      "reflect": false
    },
    "selectedIndex": {
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
        "text": "(optional) the index of the currently selected segment in the segmented-button"
      },
      "attribute": "selected-index",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "scaleClick",
      "name": "scale-click",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when button is clicked"
      },
      "complexType": {
        "original": "{\n    id: string;\n    selected: boolean;\n  }",
        "resolved": "{ id: string; selected: boolean; }",
        "references": {}
      }
    }, {
      "method": "scaleClickLegacy",
      "name": "scaleClick",
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
        "original": "{\n    id: string;\n    selected: boolean;\n  }",
        "resolved": "{ id: string; selected: boolean; }",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "setFocus": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
