import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { g as generateUniqueId, e as emitEvent } from './utils.js';
import { s as statusNote } from './status-note.js';
import { d as defineCustomElement$4 } from './helper-text.js';
import { d as defineCustomElement$3 } from './action-success.js';
import { d as defineCustomElement$2 } from './alert-error.js';
import { d as defineCustomElement$1 } from './alert-information.js';

const textFieldCss = "scale-text-field{--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--radius:var(--telekom-radius-standard);--border:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-ui-border-standard);--border-error:var(--telekom-spacing-composition-space-02) solid\n    var(--telekom-color-functional-danger-standard);--border-success:var(--telekom-spacing-composition-space-02) solid\n    var(--telekom-color-functional-success-standard);--border-warning:var(--telekom-spacing-composition-space-02) solid\n    var(--telekom-color-functional-warning-standard);--border-color-hover:var(--telekom-color-ui-border-hovered);--border-color-focus:var(--telekom-color-ui-border-hovered);--border-color-disabled:var(--telekom-color-ui-border-disabled);--background-color-hover:var(--telekom-color-ui-state-fill-hovered);--background-color-disabled:none;--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--height:44px;--spacing-x:var(--telekom-spacing-composition-space-05);--color-disabled:var(--telekom-color-text-and-icon-disabled);--background-disabled:none;--border-color-readonly:var(--telekom-color-ui-border-disabled);--background-readonly:var(--telekom-color-ui-disabled);--font-weight-meta:var(--telekom-line-weight-bold);--font-size-meta:var(--telekom-typography-font-size-small);--line-height-meta:var(--telekom-typography-line-spacing-standard);--spacing-y-meta:var(--telekom-spacing-composition-space-03);--color-meta:var(--telekom-color-text-and-icon-standard);--color-meta-error:var(--telekom-color-text-and-icon-functional-danger);--spacing-control:1.125rem\n    calc(2rem - var(--telekom-spacing-composition-space-01)) 0.25rem\n    calc(0.75rem - var(--telekom-spacing-composition-space-01));--transition-control:var(--transition);--background-control:var(--telekom-color-ui-state-fill-standard);--margin-bottom-control:var(--telekom-spacing-composition-space-03);--transition-counter:var(--transition);--color-counter-error:var(--color-meta-error);--font-size-helper-text:var(--telekom-typography-font-size-small);--line-height-helper-text:1.35;--font-weight-helper-text:var(--telekom-typography-font-weight-bold);--color-helper-text:var(\n    --telekom-color-text-and-icon-functional-informational\n  );--color-helper-text-error:var(--color-meta-error);--color-helper-text-success:var(\n    --telekom-color-text-and-icon-functional-success\n  );--color-helper-text-warning:var(\n    --telekom-color-text-and-icon-functional-warning\n  );--color-helper-text-neutral:var(--telekom-color-text-and-icon-additional);--helper-text-icon-size:11px;--transition-placeholder:var(--transition);--color-placeholder:var(--telekom-color-text-and-icon-additional);--color-label:var(--telekom-color-text-and-icon-additional);--color-label-readonly:var(--telekom-color-text-and-icon-standard);--z-index-label:var(--scl-z-index-10);--transition-label:var(--transition)}.text-field{position:relative}.text-field .text-field__control{width:100%;height:var(--height);margin:0;display:flex;outline:none;padding:var(--spacing-control);z-index:1;box-sizing:border-box;transition:var(--transition-control);font:var(--telekom-text-style-body);border-radius:var(--radius);border:var(--border);background-color:var(--background-control);color:var(--color-meta)}.text-field--hide-label .text-field__control{padding:5px var(--telekom-spacing-composition-space-12) 5px\n    calc(var(--spacing-x) - 1px)}.text-field--hide-label .text-field__label{visibility:hidden}.text-field.text-field--helper-text .text-field__control{margin-bottom:var(--margin-bottom-control)}.text-field .text-field__counter{display:flex;transition:var(--transition-counter);margin-left:auto;justify-content:flex-end;font:var(--telekom-text-style-small);color:var(--telekom-color-text-and-icon-standard)}.text-field scale-helper-text{--color-informational:var(--color-helper-text);--color-warning:var(--color-helper-text-warning);--color-danger:var(--color-helper-text-error);--color-success:var(--color-helper-text-success);--color-neutral:var(--color-helper-text-neutral);--font-size:var(--font-size-helper-text);--font-weight:var(--font-weight-helper-text);--line-height:var(--line-height-helper-text);--icon-size-helper-text:var(--helper-text-icon-size);font-weight:var(--telekom-typography-font-weight-bold);display:flex}.text-field .text-field__meta{display:flex;justify-content:space-between;margin-top:var(--spacing-y-meta);color:var(--color-meta)}.text-field:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:hover{border-color:var(--border-color-hover);background-color:var(--background-color-hover)}.text-field:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:focus{border-color:var(--border-color-focus);outline:var(--focus-outline);outline-offset:1px}.text-field:not(.text-field--disabled) .text-field__control:focus::placeholder{color:var(--color-placeholder)}.text-field .text-field__control::placeholder,.text-field ::placeholder{color:transparent;transition:var(--transition-placeholder)}.text-field__label{top:0;left:0;color:var(--color-label);display:flex;z-index:var(--z-index-label);position:absolute;transition:var(--transition-label);pointer-events:none;font:var(--telekom-text-style-ui);transform:translate(var(--spacing-x), 0.875rem)}.text-field--has-focus:not(.text-field--readonly) .text-field__label,.animated .text-field__label{font:var(--telekom-text-style-small-bold);transform:translate(\n    var(--spacing-x),\n    calc(0.25rem + var(--telekom-spacing-composition-space-01))\n  )}.text-field--variant-danger .text-field__control{border:var(--border-error)}.text-field--variant-success .text-field__control{border:var(--border-success)}.text-field--variant-warning .text-field__control{border:var(--border-warning)}.text-field--variant-danger:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:hover,.text-field--variant-danger:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:focus{border-color:var(--telekom-color-functional-danger-hovered)}.text-field--variant-success:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:hover,.text-field--variant-success:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:focus{border-color:var(--telekom-color-functional-success-hovered)}.text-field--variant-warning:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:hover,.text-field--variant-warning:not(.text-field--disabled):not(.text-field--readonly) .text-field__control:focus{border-color:var(--telekom-color-functional-warning-hovered)}.text-field--variant-danger .text-field__helper-text{color:var(--color-helper-text-error)}.text-field--variant-danger .text-field__counter{color:var(--color-counter-error)}.text-field--variant-success .text-field__helper-text{color:var(--color-helper-text-success)}.text-field--variant-success .text-field__counter{color:var(--telekom-color-text-and-icon-functional-success)}.text-field--variant-warning .text-field__helper-text{color:var(--color-helper-text-warning)}.text-field--variant-warning .text-field__counter{color:var(--telekom-color-text-and-icon-functional-warning)}.text-field--transparent .text-field__control{background-color:transparent}.text-field--readonly input,.text-field--readonly .text-field__control{color:var(--color-label-readonly);border:none;background:var(--background-readonly)}.text-field--readonly .text-field__control:focus{outline:var(--focus-outline);outline-offset:1px}.text-field--disabled label,.text-field--disabled .text-field__label,.text-field--disabled input,.text-field--disabled .text-field__control,.text-field--disabled .text-field__meta,.text-field--disabled .text-field__counter,.text-field--disabled .text-field__helper-text{cursor:not-allowed;border-color:var(--border-color-disabled);background-color:var(--background-color-disabled);color:var(--color-disabled);background:transparent}.text-field--disabled.animated label.text-field__label{color:var(--color-disabled)}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}input[type='number']{-moz-appearance:textfield}input[type='datetime-local']::-webkit-calendar-picker-indicator,input[type='time']::-webkit-calendar-picker-indicator,input[type='date']::-webkit-calendar-picker-indicator,input[type='week']::-webkit-calendar-picker-indicator,input[type='month']::-webkit-calendar-picker-indicator{position:absolute;right:12px}input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active{color-scheme:dark}@media screen and (forced-colors: active), (-ms-high-contrast: active){.text-field--readonly input,.text-field--readonly .text-field__control{border:1px solid}}";

const TextField = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.scaleInput = createEvent(this, "scale-input", 7);
    this.scaleInputLegacy = createEvent(this, "scaleInput", 7);
    this.scaleChange = createEvent(this, "scale-change", 7);
    this.scaleChangeLegacy = createEvent(this, "scaleChange", 7);
    this.scaleFocus = createEvent(this, "scale-focus", 7);
    this.scaleFocusLegacy = createEvent(this, "scaleFocus", 7);
    this.scaleBlur = createEvent(this, "scale-blur", 7);
    this.scaleBlurLegacy = createEvent(this, "scaleBlur", 7);
    this.scaleKeyDown = createEvent(this, "scale-keydown", 7);
    this.scaleKeyDownLegacy = createEvent(this, "scaleKeydown", 7);
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
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { class: this.getCssClassMap() }, h("label", { class: "text-field__label", htmlFor: this.inputId }, this.label), h("input", Object.assign({ type: this.type, inputMode: this.inputModeType, class: "text-field__control", value: this.value }, (!!this.name ? { name: this.name } : {}), (!!this.inputAutofocus ? { autofocus: 'true' } : {}), { required: this.required, minLength: this.minLength, maxLength: this.maxLength, min: this.min, max: this.max, id: this.inputId, list: this.list, onInput: this.handleInput, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown }, (!!this.placeholder && !this.readonly
      ? { placeholder: this.placeholder }
      : {}), { disabled: this.disabled, readonly: this.readonly, autocomplete: this.inputAutocomplete }, ariaDetailedById, ariaInvalidAttr, (this.helperText ? ariaDescribedByAttr : {}), (numericTypes.includes(this.type) ? { step: this.step } : {}))), (!!this.helperText || !!this.counter) && (h("div", { class: "text-field__meta", "aria-live": "polite", "aria-relevant": "additions removals" }, this.helperText && (h("scale-helper-text", { id: helperTextId, helperText: this.helperText, variant: this.invalid ? 'danger' : this.variant })), this.counter && (h("div", { class: "text-field__counter" }, !!this.value ? String(this.value).length : 0, " /", ' ', this.maxLength)))))));
  }
  getCssClassMap() {
    // the numeric type as followings, eg input[type="date"], will print a placeholder in some browsers
    const numericTypes = ['date', 'month', 'week', 'time', 'datetime-local'];
    const animated = (this.value != null && this.value !== '') ||
      numericTypes.includes(this.type);
    return classnames('text-field', this.type && `text-field--type-${this.type}`, this.hasFocus && 'text-field--has-focus', this.disabled && `text-field--disabled`, this.transparent && 'text-field--transparent', this.status && `text-field--status-${this.status}`, this.invalid && `text-field--variant-danger`, this.variant && `text-field--variant-${this.variant}`, this.helperText && `text-field--helper-text`, this.readonly && `text-field--readonly`, this.hideLabelVisually && `text-field--hide-label`, animated && 'animated');
  }
  get hostElement() { return this; }
  static get style() { return textFieldCss; }
}, [0, "scale-text-field", {
    "type": [1],
    "inputModeType": [1, "input-mode-type"],
    "name": [1],
    "label": [1],
    "size": [1],
    "helperText": [1, "helper-text"],
    "status": [1],
    "invalid": [4],
    "variant": [1],
    "maxLength": [2, "max-length"],
    "minLength": [2, "min-length"],
    "max": [2],
    "min": [2],
    "placeholder": [1],
    "disabled": [4],
    "readonly": [4],
    "required": [4],
    "counter": [4],
    "value": [1032],
    "inputId": [1, "input-id"],
    "transparent": [4],
    "step": [1],
    "list": [1],
    "inputAutofocus": [4, "input-autofocus"],
    "inputAutocomplete": [1, "input-autocomplete"],
    "ariaDetailedId": [1, "aria-detailed-id"],
    "hideLabelVisually": [4, "hide-label-visually"],
    "styles": [1],
    "experimentalControlled": [4, "experimental-controlled"],
    "hasFocus": [32],
    "forceUpdate": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-text-field", "scale-helper-text", "scale-icon-action-success", "scale-icon-alert-error", "scale-icon-alert-information"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-text-field":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TextField);
      }
      break;
    case "scale-helper-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "scale-icon-action-success":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "scale-icon-alert-error":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-icon-alert-information":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TextField as T, defineCustomElement as d };
