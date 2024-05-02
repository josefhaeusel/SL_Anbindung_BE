'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const statusNote = require('./status-note-dceee5a3.js');
const utils = require('./utils-e9c3b953.js');

const inputCss = ".input{position:relative}.input .input__helper-text,.input .input__counter{font-weight:var(--telekom-typography-font-weight-bold)}.input .input__input,.input .input__select{width:100%;height:var(--telekom-spacing-composition-space-14);margin:0;display:flex;outline:none;padding:var(--telekom-spacing-composition-space-05)\n    var(--telekom-spacing-composition-space-05);z-index:1;box-sizing:border-box;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));font-family:inherit;font-size:var(--telekom-typography-font-size-body);border-radius:var(--telekom-radius-standard);border:var(--telekom-line-weight-standard) solid\n    var(--telekom-color-ui-border-standard)}.input .input__textarea{width:100%;margin:0;resize:vertical;display:flex;outline:none;padding:var(--telekom-spacing-composition-space-05)\n    var(--telekom-spacing-composition-space-05);z-index:1;box-sizing:border-box;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));font-family:inherit;font-size:var(--telekom-typography-font-size-body);border-radius:var(--telekom-radius-standard);border:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-ui-border-standard)}.input .input__select{appearance:none;-webkit-appearance:none}.input .input__select-wrapper{position:relative}.input .input__counter{display:flex;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));margin-left:auto;padding-right:var(--telekom-spacing-composition-space-05);justify-content:flex-end;font-size:var(--telekom-typography-font-size-small);line-height:var(--telekom-typography-line-spacing-standard);color:var(--telekom-color-text-and-icon-standard)}.input .input__helper-text{transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));padding-left:var(--telekom-spacing-composition-space-05);font-size:var(--telekom-typography-font-size-small);line-height:var(--telekom-typography-line-spacing-standard);color:var(--telekom-color-text-and-icon-functional-informational)}.input .input__meta{display:flex;justify-content:space-between;margin-top:var(--telekom-spacing-composition-space-03)}.input:not(.input--disabled):hover .input__select-wrapper{--icon-color:var(--telekom-color-text-and-icon-primary-hovered, #f90984)}.input:not(.input--disabled):active .input__select-wrapper{--icon-color:var(--telekom-color-text-and-icon-primary-pressed, #cb0068)}.input:not(.input--disabled) .input__input:hover,.input:not(.input--disabled) .input__input:focus,.input:not(.input--disabled) .input__select:hover,.input:not(.input--disabled) .input__select:focus,.input:not(.input--disabled) .input__textarea:hover,.input:not(.input--disabled) .input__textarea:focus{border-color:var(--telekom-color-ui-border-hovered)}.input:not(.input--disabled) .input__input:focus,.input:not(.input--disabled) .input__select:focus,.input:not(.input--disabled) .input__textarea:focus{box-shadow:0 0 0 var(--telekom-spacing-composition-space-02)\n    var(--telekom-color-functional-focus-standard)}.input:not(.input--disabled) .input__input:focus::placeholder,.input:not(.input--disabled) .input__select:focus::placeholder,.input:not(.input--disabled) .input__textarea:focus::placeholder{color:var(--telekom-color-text-and-icon-additional);transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard))}.input .input__select-wrapper scale-icon{top:50%;right:var(--telekom-spacing-composition-space-05);position:absolute;transform:translateY(-50%);pointer-events:none}.input .input__input::placeholder,.input .input__select::placeholder,.input .input__textarea::placeholder,.input ::placeholder{color:transparent;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard))}.input--variant-static .input__label{color:var(--telekom-color-text-and-icon-additional);display:flex;font-weight:var(--telekom-typography-font-weight-medium)}.input--variant-animated .input__input,.input--variant-animated .input__select{padding:var(--telekom-spacing-composition-space-05)\n    var(--telekom-spacing-composition-space-05) 0\n    calc(var(--telekom-spacing-composition-space-05) - 1px)}.input--variant-animated .input__textarea{padding-top:var(--telekom-spacing-composition-space-08)}.input--variant-animated .input__label{top:0;left:0;color:var(--telekom-color-text-and-icon-additional);display:flex;z-index:var(--scl-z-index-10);position:absolute;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));pointer-events:none;font-size:var(--telekom-typography-font-size-body);transform:translate(\n    var(--telekom-spacing-composition-space-05),\n    calc(\n      (\n          var(--telekom-spacing-composition-space-14) -\n            var(--telekom-typography-font-size-body)\n        ) / 2\n    )\n  );font-weight:var(--telekom-typography-font-weight-medium)}.input--variant-animated.input--has-focus .input__label,.input--variant-animated.animated .input__label{color:var(--telekom-color-text-and-icon-additional);transform:translate(\n    var(--telekom-spacing-composition-space-05),\n    var(--telekom-spacing-composition-space-04)\n  );transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));font-size:var(--telekom-typography-font-size-badge);font-weight:var(--telekom-typography-font-weight-bold)}.input--status-error .input__input,.input--status-error .input__textarea,.input--status-error .input__select{border:var(--telekom-spacing-composition-space-02) solid\n    var(--telekom-color-functional-danger-standard)}.input--status-error .input__helper-text{color:var(--telekom-color-text-and-icon-functional-danger)}.input--status-error .input__counter{color:var(--telekom-color-text-and-icon-functional-danger)}.input--size-small .input__input{height:var(--telekom-spacing-composition-space-12)}.input--size-small .input__select{height:var(--telekom-spacing-composition-space-12)}.input--size-small .input__label{top:0;left:0;color:var(--telekom-color-text-and-icon-additional);display:flex;z-index:var(--scl-z-index-10);position:absolute;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));pointer-events:none;font-size:var(--telekom-typography-font-size-body);transform:translate(\n    var(--telekom-spacing-composition-space-05),\n    calc(\n      (\n          var(--telekom-spacing-composition-space-12) -\n            var(--telekom-typography-font-size-body)\n        ) / 2\n    )\n  );font-weight:var(--telekom-typography-font-weight-medium)}.input--size-small.input--has-focus .input__label,.input--size-small.animated .input__label{color:var(--telekom-color-text-and-icon-additional);transform:translate(\n    var(--telekom-spacing-composition-space-05),\n    var(--telekom-spacing-composition-space-03)\n  );transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));font-size:var(--telekom-typography-font-size-badge);font-weight:var(--telekom-typography-font-weight-medium)}.input--transparent .input__input,.input--transparent .input__textarea,.input--transparent.input--type-radio .input__radio,.input--transparent .input__select{background-color:transparent}.input--type-checkbox{display:flex;flex-wrap:wrap;align-items:center}.input--type-checkbox input{width:0;height:0;opacity:0;position:absolute}.input--type-checkbox .input__meta{width:100%}.input--type-checkbox .input__helper-text{padding-left:var(--telekom-spacing-composition-space-10)}.input--type-checkbox label{color:var(--telekom-color-text-and-icon-standard);font-weight:var(--telekom-typography-font-weight-medium)}.input--type-checkbox .input__checkbox-container{width:var(--telekom-spacing-composition-space-06);height:var(--telekom-spacing-composition-space-06);display:flex;position:relative;align-items:center;margin-right:var(--telekom-spacing-composition-space-04)}.input--type-checkbox input:disabled~label{color:var(--telekom-color-ui-disabled)}.input--type-checkbox input:checked:disabled~label{color:var(--telekom-color-ui-disabled)}.input--type-checkbox input:checked:disabled~.input__checkbox-container .input__checkbox-placeholder{background:var(--telekom-color-ui-disabled)}.input--type-checkbox input:checked:disabled~.input__checkbox-container scale-icon{--icon-color:var(--telekom-color-text-and-icon-disabled)}.input--type-checkbox input:checked:not([disabled]):hover~.input__checkbox-container .input__checkbox-placeholder,.input--type-checkbox input:checked:not([disabled])~.input__checkbox-container:hover .input__checkbox-placeholder{box-shadow:none;border-color:var(--telekom-color-primary-hovered, #f90984);background:var(--telekom-color-primary-hovered, #f90984)}.input--type-checkbox input:checked:not([disabled]):active~.input__checkbox-container .input__checkbox-placeholder,.input--type-checkbox input:checked:not([disabled])~.input__checkbox-container:active .input__checkbox-placeholder{border-color:var(--telekom-color-primary-pressed, #cb0068);background:var(--telekom-color-primary-pressed, #cb0068)}.input--type-checkbox input:checked:not([disabled]):active~.input__checkbox-container scale-icon,.input--type-checkbox input:checked:not([disabled])~.input__checkbox-container:active scale-icon{--icon-color:var(--telekom-color-text-and-icon-standard)}.input--type-checkbox input:checked:not([disabled])~.input__checkbox-container .input__checkbox-placeholder{border:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-primary-standard, #e20074);background:var(--telekom-color-primary-standard, #e20074)}.input--type-checkbox input:disabled~.input__checkbox-container .input__checkbox-placeholder{border-color:var(--telekom-color-ui-disabled)}.input--type-checkbox input:focus~.input__checkbox-container .input__checkbox-placeholder{box-shadow:0 0 0 var(--telekom-spacing-composition-space-02)\n    var(--telekom-color-functional-focus-standard)}.input--type-checkbox input:not([disabled]):hover~.input__checkbox-container .input__checkbox-placeholder,.input--type-checkbox input:not([disabled])~.input__checkbox-container:hover .input__checkbox-placeholder{box-shadow:none;border-color:var(--telekom-color-primary-hovered, #f90984)}.input--type-checkbox input:not([disabled]):hover~.input__checkbox-container~label,.input--type-checkbox input:not([disabled])~.input__checkbox-container:hover~label{color:var(--telekom-color-text-and-icon-primary-hovered, #f90984)}.input--type-checkbox input:not([disabled]):active~.input__checkbox-container .input__checkbox-placeholder,.input--type-checkbox input:not([disabled])~.input__checkbox-container:active .input__checkbox-placeholder{border-color:var(--telekom-color-primary-pressed, #cb0068);background:var(--telekom-color-primary-pressed, #cb0068)}.input--type-checkbox input:not([disabled]):active~.input__checkbox-container scale-icon,.input--type-checkbox input:not([disabled])~.input__checkbox-container:active scale-icon{--icon-color:var(--telekom-color-text-and-icon-primary-pressed, #cb0068)}.input--type-checkbox input:not([disabled]):active~.input__checkbox-container~label,.input--type-checkbox input:not([disabled])~.input__checkbox-container:active~label{color:var(--telekom-color-text-and-icon-primary-pressed, #cb0068)}.input--type-checkbox .input__checkbox-container .input__checkbox-placeholder{width:var(--telekom-spacing-composition-space-06);height:var(--telekom-spacing-composition-space-06);margin:0;box-sizing:border-box;transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));border-radius:var(--telekom-radius-standard);border:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-text-and-icon-standard);background:var(--telekom-color-background-surface)}.input--type-checkbox .input__checkbox-container scale-icon{top:calc(0.5 * var(--telekom-spacing-composition-space-05));left:calc(0.5 * var(--telekom-spacing-composition-space-05));width:var(--telekom-spacing-composition-space-05);height:var(--telekom-spacing-composition-space-05);position:absolute;user-select:none;--icon-color:var(--telekom-color-text-and-icon-inverted-standard)}.input--type-checkbox .input__checkbox-container~label{transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard))}.input--type-checkbox.input--status-error .input__checkbox-container .input__checkbox-placeholder{border:var(--telekom-spacing-composition-space-02) solid\n    var(--telekom-color-functional-danger-standard)}.input--type-radio{display:flex;flex-wrap:wrap;align-items:center}.input--type-radio .input__meta{width:100%}.input--type-radio .input__helper-text{margin-top:var(--telekom-spacing-composition-space-03);padding-left:var(--telekom-spacing-composition-space-08)}.input--type-radio label{color:var(--telekom-color-text-and-icon-standard);transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));font-weight:var(--telekom-typography-font-weight-medium)}.input--type-radio input{width:var(--telekom-spacing-composition-space-06);height:var(--telekom-spacing-composition-space-06);transition:all var(--telekom-motion-duration-transition)\n    cubic-bezier(var(--telekom-motion-easing-standard));border-radius:var(--telekom-radius-circle);-webkit-appearance:none;background-color:#fff;border:var(--telekom-line-weight-standard) solid\n    var(--telekom-color-ui-border-standard);margin:0 var(--telekom-spacing-composition-space-04) 0 0}.input--type-radio input:focus{outline:none;box-shadow:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard)}.input--type-radio:hover input:not(:checked):not([disabled]){box-shadow:none;border-color:var(--telekom-color-text-and-icon-primary-hovered)}.input--type-radio:hover input:not(:checked):not([disabled])~label{color:var(--telekom-color-text-and-icon-primary-hovered)}.input--type-radio input:active{border:var(--telekom-spacing-composition-space-04) solid\n    var(--telekom-color-primary-pressed)}.input--type-radio input:not(:checked):not([disabled]):active~label{color:var(--telekom-color-text-and-icon-primary-pressed)}.input--type-radio input:disabled{border:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-ui-border-disabled)}.input--type-radio input:disabled~label{color:var(--telekom-color-text-and-icon-disabled)}.input--type-radio.input--status-error input{border:var(--telekom-spacing-composition-space-02) solid\n    var(--telekom-color-functional-danger-standard)}.input--type-radio input:checked{border:calc(0.5 * var(--telekom-spacing-composition-space-05)) solid\n    var(--telekom-color-primary-standard)}.input--type-radio input:checked:active{border:calc(0.5 * var(--telekom-spacing-composition-space-05)) solid\n    var(--telekom-color-primary-pressed, #cb0068)}.input--type-radio input:checked:disabled{background:var(--telekom-color-ui-disabled);border:calc(0.5 * var(--telekom-spacing-composition-space-05)) solid\n    var(--telekom-color-ui-border-disabled)}.input--type-radio input:checked:disabled~label{color:var(--telekom-color-text-and-icon-disabled)}.input__textarea-label-safety-background{top:var(--telekom-spacing-composition-space-02);left:var(--telekom-spacing-composition-space-02);right:var(--telekom-spacing-composition-space-02);position:absolute;pointer-events:none;border-radius:var(--telekom-radius-standard);height:var(--telekom-spacing-composition-space-08);background-color:var(--telekom-color-background-surface, #ffffff)}.input--disabled .input__textarea-label-safety-background{background-color:transparent}.input--disabled label,.input--disabled .input__label,.input--disabled input,.input--disabled .input__input,.input--disabled .input__checkbox-container,.input--disabled .input__radio,.input--disabled .input__select,.input--disabled .input__textarea,.input--disabled .input__helper-text{cursor:not-allowed;border-color:var(--telekom-color-ui-disabled);color:var(--telekom-color-text-and-icon-disabled);background:var(--telekom-color-ui-disabled)}.input--disabled .input__select-wrapper{--icon-color:var(--telekom-color-text-and-icon-disabled)}.input--disabled.animated label.input__label{color:var(--telekom-color-text-and-icon-disabled)}";

const SELECT_ICON = 'M20.65 7.4c-.3-.3-.75-.3-1.05 0L12 15 4.4 7.4c-.3-.3-.75-.3-1.05 0s-.3.75 0 1.05L12 17.1l8.65-8.65c.3-.25.3-.75 0-1.05z';
const Input = class {
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
    /** (optional) Input type */
    this.type = 'text';
    /** (optional) Input name */
    this.name = '';
    /** (optional) Input label variant */
    this.variant = 'static';
    /** (optional) Input label */
    this.label = '';
    /** (optional) Input size */
    this.size = '';
    /** (optional) Input helper text */
    this.helperText = '';
    /** @deprecated - invalid should replace status */
    this.status = '';
    /** (optional) Input status */
    this.invalid = false;
    /** (optional) Input placeHolder */
    this.placeholder = '';
    /** (optional) Active switch */
    this.checked = false;
    /** (optional) Input value */
    this.value = '';
    /** (optional) Makes type `select` behave as a controlled component in React */
    this.controlled = false;
    /** Whether the input element has focus */
    this.hasFocus = false;
    this.internalId = utils.generateUniqueId();
    // Handle checkbox/radio change (click on label)
    this.handleCheckChange = (event) => {
      this.checked = event.target.checked;
    };
    // Handle click on checkbox visual element
    this.handleCheckboxClick = () => {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    };
    // Handle change on <select> independently
    // so we can allow "controlled" (React) behavior,
    // in which only the `value` changing does update
    // the actual <select> value, not the user's input.
    this.handleSelectChange = (event) => {
      const target = event.target;
      if (this.controlled) {
        utils.emitEvent(this, 'scaleChange', { value: target.value });
        this.selectElement.value = String(this.value);
        this.forceUpdate = String(Date.now());
      }
      else {
        this.value = target.value || '';
        this.emitChange();
      }
    };
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
      this.inputId = 'input-' + this.internalId;
    }
    // Default icon for `select` type
    if (this.type === 'select' && this.icon == null) {
      this.icon = SELECT_ICON;
    }
  }
  componentDidLoad() {
    // tslint:disable-next-line:no-console
    statusNote.statusNote({
      tag: 'deprecated',
      source: this.el,
      type: 'warn',
      extraMessage: `Please use <${{
        select: 'scale-dropdown',
        checkbox: 'scale-checkbox',
        radio: 'scale-radio-button',
        textarea: 'scale-textarea',
      }[this.type] || 'scale-text-field'}> instead.`,
    });
    // Keep this.value up-to-date for type="select".
    // This is important also for React, where `value` is used to control the element state.
    if (this.type === 'select') {
      const select = this.selectElement;
      const selectedValue = select.selectedIndex > -1
        ? select.options[select.selectedIndex].value
        : null;
      // If we have a `value` passed, set it on the <select> element
      // Otherwise, if we have an <option selected>, set its value on `value`
      if (this.value) {
        select.value = String(this.value);
      }
      else if (selectedValue) {
        this.value = selectedValue;
      }
    }
    // This is a workaroud to prevent a bug in Stencil:
    // when using slots without Shadow DOM (possible only with Stencil)
    // sometimes an update in the Light DOM does not trigger a re-render
    // thus causing unexpected results.
    // https://gitlab.com/scale-ds/scale-telekom/-/issues/16
    if (this.type === 'select' && this.selectElement) {
      this.mutationObserver = new MutationObserver(() => {
        this.forceUpdate = String(Date.now());
      });
      this.mutationObserver.observe(this.el, {
        childList: true,
        subtree: true,
      });
    }
  }
  componentWillUpdate() { }
  componentDidRender() {
    // When type `select` and `controlled` is true,
    // make sure the <select> is always in sync with the value.
    const value = this.value == null ? '' : this.value.toString();
    if (this.type === 'select' &&
      this.controlled &&
      this.selectElement.value.toString() !== value) {
      this.selectElement.value = value;
    }
    if (this.status !== '') {
      statusNote.statusNote({
        tag: 'deprecated',
        message: 'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.el,
      });
    }
  }
  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
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
  checkedChanged() {
    utils.emitEvent(this, 'scaleChange', { value: this.checked });
  }
  render() {
    const Tag = this.type === 'textarea' ? 'textarea' : 'input';
    const ariaInvalidAttr = this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    if (this.type === 'checkbox') {
      return (index.h(index.Host, { checked: this.checked }, index.h("div", { class: this.getCssClassMap() }, index.h("input", Object.assign({ type: "checkbox", name: this.name, id: this.inputId, onChange: this.handleCheckChange, value: this.value, checked: this.checked, disabled: this.disabled }, ariaInvalidAttr, ariaDescribedByAttr)), index.h("div", { class: index$1.classnames('input__checkbox-container'), onClick: this.handleCheckboxClick }, index.h("span", { class: index$1.classnames('input__checkbox-placeholder') }), !!this.icon && this.checked && (index.h("scale-icon", { path: this.icon, size: 12 }))), index.h("label", { htmlFor: this.inputId }, this.label), !!this.helperText && (index.h("div", { class: "input__meta", id: helperTextId, "aria-live": "polite", "aria-relevant": "additions removals" }, index.h("div", { class: "input__helper-text" }, this.helperText))))));
    }
    if (this.type === 'radio') {
      return (index.h(index.Host, null, index.h("div", { class: this.getCssClassMap() }, index.h("input", Object.assign({ type: "radio", name: this.name, id: this.inputId, onChange: this.handleCheckChange, value: this.value, checked: this.checked, disabled: this.disabled }, ariaInvalidAttr, ariaDescribedByAttr)), index.h("label", { htmlFor: this.inputId }, this.label), !!this.helperText && (index.h("div", { class: "input__meta", id: helperTextId, "aria-live": "polite", "aria-relevant": "additions removals" }, index.h("div", { class: "input__helper-text" }, this.helperText))))));
    }
    return (index.h(index.Host, null, index.h("div", { class: this.getCssClassMap() }, index.h("label", { class: "input__label", htmlFor: this.inputId }, this.label), this.type === 'select' ? (index.h("div", { class: "input__select-wrapper" }, index.h("select", Object.assign({ ref: (el) => (this.selectElement = el), class: index$1.classnames('input__select'),
      // @ts-ignore
      value: this.value, onChange: this.handleSelectChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, disabled: this.disabled, required: this.required, multiple: this.multiple, id: this.inputId, name: this.name, size: this.visibleSize }, ariaInvalidAttr, ariaDescribedByAttr), index.h("slot", null)), !!this.icon && index.h("scale-icon", { path: this.icon }))) : (index.h(Tag, Object.assign({ type: this.type, class: index$1.classnames(`input__${this.type === 'textarea' ? 'textarea' : 'input'}`, this.customResize && this.customResize.id), style: !!this.resize && { resize: this.resize }, value: this.value }, (!!this.name ? { name: this.name } : {}), { required: this.required, minLength: this.minLength, maxLength: this.maxLength, id: this.inputId, onInput: this.handleInput, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown }, (!!this.placeholder ? { placeholder: this.placeholder } : {}), { disabled: this.disabled }, (!!this.rows ? { rows: this.rows } : {}), (!!this.cols ? { cols: this.cols } : {}), ariaInvalidAttr, ariaDescribedByAttr))), this.type === 'textarea' && this.variant === 'animated' && (index.h("span", { class: "input__textarea-label-safety-background", "aria-hidden": "true" })), (!!this.helperText || !!this.counter) && (index.h("div", { class: "input__meta", id: helperTextId, "aria-live": "polite", "aria-relevant": "additions removals" }, !!this.helperText && (index.h("div", { class: "input__helper-text" }, this.helperText)), this.counter && (index.h("div", { class: "input__counter" }, !!this.value ? String(this.value).length : 0, " /", ' ', this.maxLength)))))));
  }
  getCssClassMap() {
    return index$1.classnames('input', this.type && `input--type-${this.type}`, this.hasFocus && 'input--has-focus', this.checked && `input--checked`, this.resize && `input--resize-${this.resize}`, this.variant && `input--variant-${this.variant}`, this.disabled && `input--disabled`, this.transparent && 'input--transparent', this.status && `input--status-${this.status}`, this.invalid && `input--status-error`, this.size && `input--size-${this.size}`, this.value != null && this.value !== '' && 'animated');
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"]
  }; }
};
Input.style = inputCss;

exports.scale_input = Input;
