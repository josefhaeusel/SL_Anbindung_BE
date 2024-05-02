'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const utils = require('./utils-e9c3b953.js');
const statusNote = require('./status-note-dceee5a3.js');

const textareaCss = "scale-textarea{--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--radius:var(--telekom-radius-standard);--border:var(--telekom-line-weight-standard) solid\n    var(--telekom-color-ui-border-standard);--border-error:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-danger-standard);--border-color-hover:var(--telekom-color-ui-border-hovered);--border-color-focus:var(--telekom-color-ui-border-hovered);--border-color-disabled:var(--telekom-color-ui-border-disabled);--background-color-hover:var(--telekom-color-ui-state-fill-hovered);--background-color-disabled:none;--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--spacing-x-control:var(--telekom-spacing-composition-space-05);--spacing-bottom-control:var(--telekom-spacing-composition-space-05);--spacing-top-control:calc(\n    1.125rem - var(--telekom-spacing-composition-space-01)\n  );--color-disabled:var(--telekom-color-text-and-icon-disabled);--background-disabled:transparent;--border-color-readonly:transparent;--background-readonly:var(--telekom-color-ui-disabled);--font-weight-meta:var(--telekom-typography-font-weight-bold);--font-size-meta:var(--telekom-typography-font-size-small);--line-height-meta:var(--telekom-typography-line-spacing-standard);--spacing-y-meta:var(--telekom-spacing-composition-space-03);--color-meta:var(--telekom-color-text-and-icon-standard);--color-meta-error:var(--telekom-color-text-and-icon-functional-danger);--spacing-control:0 calc(2rem - var(--telekom-spacing-composition-space-01))\n    0.25rem calc(0.75rem - var(--telekom-spacing-composition-space-01));--transition-control:var(--transition);--background-control:var(--telekom-color-ui-state-fill-standard);--transition-counter:var(--transition);--color-counter-error:var(--color-meta-error);--transition-placeholder:var(--transition);--color-placeholder:var(--telekom-color-text-and-icon-additional);--color-label:var(--telekom-color-text-and-icon-additional);--color-label-readonly:var(--telekom-color-text-and-icon-standard);--z-index-label:var(--scl-z-index-10);--transition-label:var(--transition)}.textarea{position:relative;display:flex;flex-direction:column}.textarea__wrapper{display:flex;flex-direction:column;border-radius:var(--radius);border:var(--border)}.textarea__wrapper .textarea__control{margin:0;width:100%;resize:vertical;display:flex;outline:none;padding:var(--spacing-control);z-index:1;box-sizing:border-box;transition:var(--transition-control);font:var(--telekom-text-style-body);border:none;background-color:transparent;color:var(--color-meta);margin-top:var(--spacing-top-control)}.textarea .textarea__counter{display:flex;flex-shrink:0;transition:var(--transition-counter);margin-left:auto;justify-content:flex-end;font:var(--telekom-text-style-small);color:var(--telekom-color-text-and-icon-standard)}.textarea .textarea__meta{display:flex;justify-content:space-between;margin-top:var(--spacing-y-meta);color:var(--color-meta)}.textarea:not(.textarea--disabled):not(.textarea--readonly) .textarea__wrapper:hover{border-color:var(--border-color-hover);background-color:var(--background-color-hover)}.textarea:not(.textarea--disabled):not(.textarea--readonly).textarea--has-focus .textarea__wrapper{border-color:var(--border-color-focus);outline:var(--focus-outline);outline-offset:1px}.textarea:not(.textarea--disabled) .textarea__control:focus::placeholder{color:var(--color-placeholder)}.textarea .textarea__control::placeholder,.textarea ::placeholder{color:transparent;transition:var(--transition-placeholder)}.textarea__label{top:0;left:0;color:var(--color-label);display:flex;z-index:var(--z-index-label);position:absolute;transition:var(--transition-label);pointer-events:none;font:var(--telekom-text-style-ui);transform:translate(var(--spacing-x-control), 0.875rem)}.textarea--has-focus .textarea__label,.animated .textarea__label{font:var(--telekom-text-style-small-bold);transform:translate(\n    var(--spacing-x-control),\n    calc(0.25rem + var(--telekom-spacing-composition-space-01))\n  )}.textarea--status-error .textarea__wrapper{border:var(--border-error)}.textarea--status-error:not(.textarea--disabled):not(.textarea--readonly) .textarea__wrapper:hover,.textarea--status-error:not(.textarea--disabled):not(.textarea--readonly).textarea--has-focus .textarea__wrapper{border-color:var(--telekom-color-functional-danger-hovered)}.textarea--status-error .textarea__counter{color:var(--color-counter-error)}.textarea--transparent .textarea__control{background-color:transparent}.textarea--readonly .textarea__wrapper{border-color:var(--border-color-readonly);background:var(--background-readonly)}.textarea--readonly.textarea--has-focus .textarea__wrapper{outline:var(--focus-outline);outline-offset:1px}.textarea--readonly textarea,.textarea--readonly .textarea__wrapper .textarea__control{color:var(--color-label-readonly)}.textarea--disabled label,.textarea--disabled .textarea__label,.textarea--disabled textarea,.textarea--disabled .textarea__wrapper,.textarea--disabled .textarea__control,.textarea--disabled .textarea__meta{cursor:not-allowed;color:var(--color-disabled)}.textarea--disabled .textarea__wrapper{border-color:var(--border-color-disabled);background-color:var(--background-color-disabled)}";

const Textarea = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scaleInput = index.createEvent(this, "scale-input", 7);
    this.scaleInputLegacy = index.createEvent(this, "scaleInput", 7);
    this.scaleChange = index.createEvent(this, "scale-change", 7);
    this.scaleChangeLegacy = index.createEvent(this, "scaleChange", 7);
    this.scaleFocus = index.createEvent(this, "scale-focus", 7);
    this.scaleFocusLegacy = index.createEvent(this, "scaleFocus", 7);
    this.scaleBlur = index.createEvent(this, "scale-blur", 7);
    this.scaleBlurLegacy = index.createEvent(this, "scaleBlur", 7);
    this.scaleKeyDown = index.createEvent(this, "scale-keydown", 7);
    this.scaleKeyDownLegacy = index.createEvent(this, "scaleKeyDown", 7);
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
    /** (optional) Variant */
    this.variant = 'informational';
    /** (optional) Input placeHolder */
    this.placeholder = '';
    /** (optional) Input value */
    this.value = '';
    /** Whether the input element has focus */
    this.hasFocus = false;
    this.internalId = utils.generateUniqueId();
    this.handleInput = (event) => {
      const target = event.target;
      if (target) {
        this.value = target.value || '';
        this.emitChange();
      }
      utils.emitEvent(this, 'scaleInput', event);
    };
    this.handleChange = (event) => {
      const target = event.target;
      if (target) {
        this.value = target.value || '';
        this.emitChange();
      }
    };
    this.handleFocus = () => {
      utils.emitEvent(this, 'scaleFocus');
      this.hasFocus = true;
    };
    this.handleBlur = () => {
      utils.emitEvent(this, 'scaleBlur');
      this.hasFocus = false;
    };
    this.handleKeyDown = (event) => {
      utils.emitEvent(this, 'scaleKeyDown', event);
    };
  }
  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-textarea-' + this.internalId;
    }
  }
  componentDidRender() {
    if (this.status !== '') {
      statusNote.statusNote({
        tag: 'deprecated',
        message: 'Property "status" is deprecated. Please use the "invalid" property!',
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
    utils.emitEvent(this, 'scaleChange', {
      value: this.value == null ? this.value : this.value.toString(),
    });
  }
  render() {
    const ariaInvalidAttr = this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    const readonlyAttr = this.readonly ? { readonly: 'readonly' } : {};
    return (index.h(index.Host, null, index.h("div", { class: this.getCssClassMap() }, index.h("div", { class: "textarea__wrapper", onClick: () => this.focusableElement.focus(), style: !!this.resize &&
        this.resize === 'horizontal' && { width: 'max-content' } }, index.h("label", { class: "textarea__label", htmlFor: this.inputId }, this.label), index.h("textarea", Object.assign({ class: "textarea__control", style: !!this.resize && { resize: this.resize }, value: this.value }, (!!this.name ? { name: this.name } : {}), (!!this.inputAutofocus ? { autofocus: 'true' } : {}), { required: this.required, minLength: this.minLength, maxLength: this.maxLength, id: this.inputId, onInput: this.handleInput, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown }, (!!this.placeholder ? { placeholder: this.placeholder } : {}), { disabled: this.disabled }, readonlyAttr, (!!this.rows ? { rows: this.rows } : {}), (!!this.cols ? { cols: this.cols } : {}), ariaInvalidAttr, (this.helperText ? ariaDescribedByAttr : {}), { ref: (el) => (this.focusableElement = el) }))), (!!this.helperText || !!this.counter) && (index.h("div", { class: "textarea__meta", id: helperTextId, "aria-live": "polite", "aria-relevant": "additions removals" }, !!this.helperText && (index.h("scale-helper-text", { helperText: this.helperText, variant: this.invalid ? 'danger' : this.variant })), this.counter && (index.h("div", { class: "textarea__counter" }, !!this.value ? String(this.value).length : 0, " /", ' ', this.maxLength)))))));
  }
  getCssClassMap() {
    return index$1.classnames('textarea', this.hasFocus && 'textarea--has-focus', this.resize && `textarea--resize-${this.resize}`, this.disabled && `textarea--disabled`, this.transparent && 'textarea--transparent', this.status && `textarea--status-${this.status}`, this.invalid && `textarea--status-error`, this.variant && `textarea--variant-${this.variant}`, this.readonly && `textarea--readonly`, this.value != null && this.value !== '' && 'animated');
  }
  get hostElement() { return index.getElement(this); }
};
Textarea.style = textareaCss;

exports.scale_textarea = Textarea;
