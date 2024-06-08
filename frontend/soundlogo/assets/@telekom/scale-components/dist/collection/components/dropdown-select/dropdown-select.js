import { Component, h, Host, Prop, Element, State, Watch, Event, } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { computePosition } from '@floating-ui/dom';
import { emitEvent, generateUniqueId } from '../../utils/utils';
var Actions;
(function (Actions) {
  Actions["Close"] = "Close";
  Actions["CloseSelect"] = "CloseSelect";
  Actions["First"] = "First";
  Actions["Last"] = "Last";
  Actions["Next"] = "Next";
  Actions["Open"] = "Open";
  Actions["PageDown"] = "PageDown";
  Actions["PageUp"] = "PageUp";
  Actions["Previous"] = "Previous";
  Actions["Select"] = "Select";
  Actions["Type"] = "Type";
})(Actions || (Actions = {}));
const DEFAULT_ICON_SIZE = 20;
const isElementValue = (x) => typeof x.value === 'string';
const readValue = (element) => isElementValue(element) ? element.value : null;
const isElementDisabled = (x) => {
  return typeof x.disable === 'boolean';
};
const readDisabled = (element) => {
  const attr = element.getAttribute('disabled');
  return ((attr !== null && `${attr}` !== 'false') ||
    (isElementDisabled(element) ? element.disable : false));
};
const readOptions = (hostElement) => {
  const children = Array.from(hostElement.children);
  const options = children.filter((x) => x.tagName !== 'INPUT' && x.hidden === false);
  return options.map((x) => {
    var _a;
    return ({
      label: x.textContent.trim(),
      value: (_a = x.getAttribute('value')) !== null && _a !== void 0 ? _a : readValue(x),
      disabled: readDisabled(x),
      ItemElement: h("span", { innerHTML: x.outerHTML }),
    });
  });
};
function getActionFromKey(event, open) {
  const { key, altKey, ctrlKey, metaKey } = event;
  if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
    return Actions['Open'];
  }
  if (key === 'Home') {
    return Actions['First'];
  }
  if (key === 'End') {
    return Actions['Last'];
  }
  if (['Backspace', 'Clear'].includes(key) ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)) {
    return Actions['Type'];
  }
  if (!open) {
    return;
  }
  if (key === 'ArrowUp' && altKey) {
    return Actions['CloseSelect'];
  }
  if (key === 'ArrowDown' && !altKey) {
    return Actions['Next'];
  }
  switch (key) {
    case 'ArrowUp':
      return Actions['Previous'];
    case 'PageUp':
      return Actions['PageUp'];
    case 'PageDown':
      return Actions['PageDown'];
    case 'Escape':
      return Actions['Close'];
    case 'Enter':
      return Actions['CloseSelect'];
    case ' ':
      return Actions['CloseSelect'];
  }
}
function jumpToIndex(from, action, options) {
  var _a;
  const JUMP_SIZE = 10;
  const findNearestEnabled = (current, step) => {
    let nextIndex = current;
    let nextOption;
    do {
      nextIndex += step;
      nextOption = options[nextIndex];
      if (nextOption === undefined) {
        break;
      }
    } while (nextOption === null || nextOption === void 0 ? void 0 : nextOption.disabled);
    return nextOption ? nextIndex : current;
  };
  let nearest;
  switch (action) {
    case Actions['First']:
      return ((_a = options[0]) === null || _a === void 0 ? void 0 : _a.disabled) ? findNearestEnabled(-1, 1) : 0;
    case Actions['Last']:
      nearest = findNearestEnabled(options.length, -1);
      return nearest === options.length ? -1 : nearest; // rare case when all options are disabled
    case Actions['Previous']:
      nearest = findNearestEnabled(from, from === -1 ? 1 : -1);
      return nearest === options.length ? -1 : nearest; // rare case when all options are disabled
    case Actions['Next']:
      return findNearestEnabled(from, 1);
    case Actions['PageUp']:
      const lowerBound = Math.max(from - JUMP_SIZE, -1);
      return findNearestEnabled(lowerBound, 1);
    case Actions['PageDown']:
      const upperBound = Math.min(from + JUMP_SIZE, options.length);
      nearest = findNearestEnabled(upperBound, -1);
      return nearest === options.length ? -1 : nearest; // rare case when all options are disabled
    default:
      return from;
  }
}
function matchEnabledOptions(options = [], filter) {
  return options.filter((option) => !option.disabled &&
    option.label.toLowerCase().indexOf(filter.toLowerCase()) === 0);
}
function getIndexByChar(values, filter, startIndex = 0) {
  const sortedOptions = [
    ...values.slice(startIndex),
    ...values.slice(0, startIndex),
  ];
  const firstHit = matchEnabledOptions(sortedOptions, filter)[0];
  const allMatchingChars = (array) => array.every((char) => char === array[0]);
  if (firstHit) {
    return values.indexOf(firstHit);
  }
  if (allMatchingChars(filter.split(''))) {
    const hits = matchEnabledOptions(sortedOptions, filter[0]);
    return values.indexOf(hits[0]);
  }
  return -1;
}
function keepInView(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;
  const isAboveParent = offsetTop < scrollTop;
  const isBelowParent = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
  if (isBelowParent) {
    return (scrollParent.scrollTop =
      offsetTop + offsetHeight - parentOffsetHeight);
  }
  if (isAboveParent) {
    return (scrollParent.scrollTop = offsetTop);
  }
}
function hasOverflow(element) {
  return element && element.clientHeight < element.scrollHeight;
}
function isInView(element) {
  const rect = element.getBoundingClientRect();
  const parentRect = {
    top: 0,
    left: 0,
    right: window.innerWidth || document.documentElement.clientWidth,
    bottom: window.innerHeight || document.documentElement.clientHeight,
  };
  return (rect.top >= parentRect.top &&
    rect.left >= parentRect.left &&
    rect.bottom <= parentRect.bottom &&
    rect.right <= parentRect.right);
}
let activeDropdown = null;
export class DropdownSelect {
  constructor() {
    this.comboboxId = 'combobox';
    this.helperText = '';
    this.invalid = false;
    this.variant = 'informational';
    /** @see {@url https://floating-ui.com/docs/computePosition#strategy} */
    this.floatingStrategy = 'absolute';
    /** (optional) to hide the label */
    this.hideLabelVisually = false;
    /** (optional) Screen reader text appended to the selected element */
    this.ariaLabelSelected = 'selected';
    /** (optional) Text displayed in high contrast mode only to indicate disabled state */
    this.hcmLabelDisabled = 'this field is disabled';
    this.options = '';
    this.open = false;
    this.currentIndex = -1;
    this.queryString = '';
    this.queryTimeout = null;
    this.hasFocus = false;
    this.selectOption = (index) => {
      this.currentIndex = index;
      this.value = readOptions(this.hostElement)[index].value;
      emitEvent(this, 'scaleChange', { value: this.value });
    };
    this.handleKeyDown = (event) => {
      var _a;
      const { key } = event;
      const options = readOptions(this.hostElement);
      const action = getActionFromKey(event, this.open);
      emitEvent(this, 'scaleKeydown', event);
      switch (action) {
        case Actions['Last']:
        case Actions['First']:
          this.setOpen(true);
        case Actions['Next']:
        case Actions['Previous']:
        case Actions['PageUp']:
        case Actions['PageDown']:
          event.preventDefault();
          return this.handleOptionChange(jumpToIndex(this.currentIndex, action, options));
        case Actions['CloseSelect']:
          event.preventDefault();
          if ((_a = options[this.currentIndex]) === null || _a === void 0 ? void 0 : _a.disabled) {
            return;
          }
          if (this.currentIndex !== -1) {
            this.selectOption(this.currentIndex);
          }
        case Actions['Close']:
          event.preventDefault();
          return this.setOpen(false);
        case Actions['Type']:
          return this.buildQueryString(key);
        case Actions['Open']:
          event.preventDefault();
          return this.setOpen(true);
      }
    };
    this.handleBlur = () => {
      this.setOpen(false);
      emitEvent(this, 'scaleBlur');
    };
    this.handleFocus = () => {
      emitEvent(this, 'scaleFocus');
    };
    this.handleClick = () => {
      // * This is a fix to prevent the dropdown from being opened when the user clicks on another combobox.
      // ! https://github.com/telekom/scale/issues/2285
      if (activeDropdown && activeDropdown !== this) {
        activeDropdown.setOpen(false);
      }
      this.setOpen(!this.open);
      activeDropdown = this;
      const indexOfValue = readOptions(this.hostElement).findIndex(({ value }) => value === this.value);
      if (indexOfValue > -1) {
        setTimeout(() => {
          this.bringIntoView(indexOfValue);
        });
      }
    };
  }
  valueChange(newValue) {
    this.currentIndex = readOptions(this.hostElement).findIndex(({ value }) => value === newValue);
    this.updateInputHidden(newValue);
  }
  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
    this.currentIndex =
      readOptions(this.hostElement).findIndex(({ value }) => value === this.value) || -1;
  }
  componentDidRender() {
    if (!this.open) {
      return;
    }
    if (this.floatingStrategy === 'fixed') {
      this.listboxPadEl.style.width = `${this.comboEl.getBoundingClientRect().width}px`;
    }
    computePosition(this.comboEl, this.listboxPadEl, {
      placement: 'bottom',
      strategy: this.floatingStrategy,
    }).then(({ x, y }) => {
      Object.assign(this.listboxPadEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }
  // this workaround is needed to make the component work with form
  // https://github.com/ionic-team/stencil/issues/2284
  componentDidLoad() {
    this.appendInputHidden();
  }
  appendInputHidden() {
    const input = document.createElement('input');
    input.name = this.name;
    input.id = this.name;
    input.value = this.value;
    input.type = 'hidden';
    this.hostElement.appendChild(input);
    this.hiddenInput = input;
  }
  updateInputHidden(value = this.value) {
    this.hiddenInput.value = value;
  }
  handleOptionChange(index) {
    this.currentIndex = index;
    if (index > -1) {
      this.bringIntoView(index);
    }
  }
  bringIntoView(index) {
    const options = this.listboxEl.querySelectorAll('[role=option]');
    if (hasOverflow(this.listboxEl)) {
      keepInView(options[index], this.listboxEl);
    }
    if (!isInView(options[index])) {
      options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  setOpen(open) {
    if (this.open === open) {
      return;
    }
    if (this.disabled) {
      return;
    }
    this.open = open;
    if (!this.open) {
      this.comboEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.comboEl.focus();
      this.currentIndex = -1;
    }
  }
  handleOptionClick(event, index) {
    event.stopPropagation();
    if (readOptions(this.hostElement)[index].disabled) {
      return;
    }
    this.handleOptionChange(index);
    this.selectOption(index);
    this.setOpen(false);
  }
  getSearchString(char) {
    if (typeof this.queryTimeout === 'number') {
      window.clearTimeout(this.queryTimeout);
    }
    this.queryTimeout = window.setTimeout(() => {
      this.queryString = '';
    }, 500);
    this.queryString += char;
    return this.queryString;
  }
  buildQueryString(char) {
    this.setOpen(true);
    const queryString = this.getSearchString(char);
    const queryIndex = getIndexByChar(readOptions(this.hostElement), queryString, this.currentIndex + 1);
    if (queryIndex >= 0) {
      this.handleOptionChange(queryIndex);
    }
    else {
      window.clearTimeout(this.queryTimeout);
      this.queryString = '';
    }
  }
  render() {
    var _a;
    const element = (_a = readOptions(this.hostElement).find(({ value }) => value === this.value)) !== null && _a !== void 0 ? _a : {};
    const ValueElement = element.ItemElement;
    const hasEmptyValueElement = element.value === '';
    const helperTextId = `helper-message-${generateUniqueId()}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    return (h(Host, null,
      h("div", { part: this.getBasePartMap() },
        h("div", { part: "combobox-container" },
          h("label", { id: `${this.comboboxId}-label`, part: "label" }, this.label),
          h("div", Object.assign({ ref: (el) => (this.comboEl = el), "aria-controls": `${this.comboboxId}-listbox`, "aria-expanded": this.open ? 'true' : 'false', "aria-haspopup": "listbox", "aria-labelledby": `${this.comboboxId}-label`, id: this.comboboxId, part: "combobox", role: "combobox", tabindex: this.disabled ? '-1' : '0', onBlur: this.handleBlur, onFocus: this.handleFocus, onClick: this.handleClick, onKeyDown: this.handleKeyDown }, (this.open
            ? {
              'aria-activedescendant': (readOptions(this.hostElement)[this.currentIndex] ||
                {}).value,
            }
            : {}), (this.helperText ? ariaDescribedByAttr : {}), (this.invalid ? { 'aria-invalid': 'true' } : {})),
            h("span", { part: "combobox-value" }, hasEmptyValueElement ? '' : ValueElement)),
          h("div", { part: "listbox-pad", ref: (el) => (this.listboxPadEl = el) },
            h("div", { part: "listbox-scroll-container", onMouseDown: (e) => {
                e.preventDefault();
              } },
              h("div", { ref: (el) => (this.listboxEl = el), part: "listbox", role: "listbox", id: `${this.comboboxId}-listbox`, "aria-labelledby": `${this.comboboxId}-label`, tabindex: "-1" }, readOptions(this.hostElement).map(({ value, disabled, ItemElement }, index) => (h("div", Object.assign({ role: "option", part: this.getOptionPartMap(index, disabled), id: value, onClick: (event) => {
                  this.handleOptionClick(event, index);
                } }, (value === this.value
                ? { 'aria-selected': 'true' }
                : {}), (disabled ? { 'aria-disabled': 'true' } : {})),
                ItemElement,
                value === this.value ? (h("div", null,
                  h("scale-icon-action-checkmark", { size: 16 }),
                  h("span", { class: "sr-only" }, this.ariaLabelSelected))) : null)))))),
          h("div", { part: "icon" }, this.open ? (h("scale-icon-navigation-collapse-up", { decorative: true, size: DEFAULT_ICON_SIZE })) : (h("scale-icon-navigation-collapse-down", { decorative: true, size: DEFAULT_ICON_SIZE })))),
        this.helperText && (h("scale-helper-text", { helperText: this.helperText, variant: this.invalid ? 'danger' : this.variant, id: helperTextId })),
        this.disabled && (h("div", { class: "hcm-disabled" }, this.hcmLabelDisabled)))));
  }
  getBasePartMap() {
    const animated = this.value != null && this.value !== '';
    return classNames('select', this.open && `open`, this.disabled && `disabled`, this.readonly && `readonly`, this.transparent && 'transparent', this.invalid && `invalid`, this.currentIndex > -1 && `steal-focus`, animated && 'animated', this.helperText && 'has-helper-text', this.floatingStrategy && `strategy-${this.floatingStrategy}`, this.hideLabelVisually && 'hide-label');
  }
  getOptionPartMap(index, disabled) {
    return classNames('option', index === this.currentIndex && `current`, disabled && `disabled`);
  }
  static get is() { return "scale-dropdown-select"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["dropdown-select.css"]
  }; }
  static get styleUrls() { return {
    "$": ["dropdown-select.css"]
  }; }
  static get properties() { return {
    "comboboxId": {
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
        "text": ""
      },
      "attribute": "combobox-id",
      "reflect": false,
      "defaultValue": "'combobox'"
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
        "text": ""
      },
      "attribute": "label",
      "reflect": false
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
        "text": ""
      },
      "attribute": "name",
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
        "text": ""
      },
      "attribute": "helper-text",
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
        "text": ""
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
        "text": ""
      },
      "attribute": "readonly",
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
        "text": ""
      },
      "attribute": "transparent",
      "reflect": false
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
        "text": ""
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
        "text": ""
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'informational'"
    },
    "value": {
      "type": "any",
      "mutable": true,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "value",
      "reflect": true
    },
    "floatingStrategy": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'absolute' | 'fixed'",
        "resolved": "\"absolute\" | \"fixed\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "name": "see",
            "text": "{"
          }, {
            "name": "url",
            "text": "https://floating-ui.com/docs/computePosition#strategy}"
          }],
        "text": ""
      },
      "attribute": "floating-strategy",
      "reflect": false,
      "defaultValue": "'absolute'"
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
        "text": "(optional) to hide the label"
      },
      "attribute": "hide-label-visually",
      "reflect": false,
      "defaultValue": "false"
    },
    "ariaLabelSelected": {
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
        "text": "(optional) Screen reader text appended to the selected element"
      },
      "attribute": "aria-label-selected",
      "reflect": false,
      "defaultValue": "'selected'"
    },
    "hcmLabelDisabled": {
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
        "text": "(optional) Text displayed in high contrast mode only to indicate disabled state"
      },
      "attribute": "hcm-label-disabled",
      "reflect": false,
      "defaultValue": "'this field is disabled'"
    }
  }; }
  static get states() { return {
    "options": {},
    "open": {},
    "currentIndex": {},
    "queryString": {},
    "queryTimeout": {},
    "hasFocus": {}
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
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleFocus",
      "name": "scale-focus",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
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
        "text": ""
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "scaleKeydown",
      "name": "scale-keydown",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get elementRef() { return "hostElement"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "valueChange"
    }]; }
}
