'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const statusNote = require('./status-note-dceee5a3.js');
const utils = require('./utils-e9c3b953.js');

const radioButtonGroupCss = ":host{--font-weight-label:var(--telekom-typography-font-weight-medium);--font-size-label:var(--telekom-typography-font-size-body);--font-size-helper-text:var(--telekom-typography-font-size-small);--color-helper-text:var(\n    --telekom-color-text-and-icon-functional-informational\n  );--padding-bottom-helper-text:var(--telekom-spacing-composition-space-04);--margin-top-helper-text:var(--telekom-spacing-composition-space-03);--font-size-helper-text:var(--telekom-typography-font-size-small);--font-weight-helper-text:var(--telekom-typography-font-weight-bold);--font-size-error-helper-text:var(--telekom-typography-font-size-small);--color-error-helper-text:var(\n    --telekom-color-text-and-icon-functional-danger\n  );--padding-bottom-error-helper-text:var(\n    --telekom-spacing-composition-space-04\n  );--margin-top-error-helper-text:var(--telekom-spacing-composition-space-03);--font-weight-error-helper-text:var(--telekom-typography-font-weight-medium);--color-error-helper-text-hcm:var(\n    --telekom-color-text-and-icon-white-standard\n  );--line-height-helper-text:var(--telekom-typography-line-spacing-standard);--font-size-title:var(--font-size-label);--font-weight-title:var(--telekom-typography-font-weight-medium);--padding-bottom-title:var(--telekom-spacing-composition-space-03);--margin-left-title:var(--telekom-spacing-composition-space-02);--margin-top-slotted-item:var(--telekom-spacing-composition-space-05);margin-top:var(--margin-top-slotted-item)}.radio-button-group{display:inline-flex;flex-direction:column;border:0;margin:0;padding:0}.radio-button-group__container{display:flex;flex-direction:column}.radio-button-group__helper-text{color:var(--color-helper-text);font-size:var(--font-size-helper-text);font-weight:var(--font-weight-helper-text);display:flex;align-items:center;line-height:var(--line-height-helper-text)}.radio-button-group__helper-text--status-error{color:var(--color-error-helper-text);font-size:var(--font-size-error-helper-text);font-weight:var(--font-weight-error-helper-text)}.radio-button-group__title{margin:0;padding:0}.radio-button-group__title-label{font-size:var(--font-size-title);line-height:var(--telekom-typography-line-spacing-standard);font-weight:var(--telekom-typography-font-weight-bold)}::slotted(*){margin-top:calc(var(--margin-top-slotted-item))}@media screen and (forced-colors: active), (-ms-high-contrast: active){.radio-button-group__helper-text--status-error{color:var(--color-error-helper-text-hcm)}}.radio-button-group__helper-text scale-icon-alert-success,.radio-button-group__helper-text scale-icon-alert-warning,.radio-button-group__helper-text scale-icon-alert-information,.radio-button-group__helper-text scale-icon-alert-error{margin-right:var(--telekom-spacing-composition-space-03)}";

const RadioButtonGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** (optional) Input label */
    this.label = '';
    /** (optional) Input helper text */
    this.helperText = '';
    /** @deprecated - invalid should replace status */
    this.status = '';
    /** (optional) Input status */
    this.invalid = false;
    this.internalId = utils.generateUniqueId();
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
  renderHelperIcon() {
    if (this.helperText && !this.invalid) {
      return (index.h("scale-icon-alert-information", { size: 11 }));
    }
    if (this.invalid) {
      return index.h("scale-icon-alert-error", { size: 11 });
    }
  }
  render() {
    const helperTextId = `helper-message-${this.internalId}`;
    return (index.h("fieldset", { part: "base", class: "radio-button-group" }, index.h("legend", { class: "radio-button-group__title" }, index.h("label", { class: "radio-button-group__title-label", "aria-label": this.label }, this.label), this.helperText ? (index.h("div", { role: "text", id: helperTextId, class: this.getCssClassMap(), "aria-label": this.helperText }, this.renderHelperIcon(), index.h("span", null, this.helperText))) : null), index.h("div", { part: "container", class: "radio-button-group__container" }, index.h("slot", null))));
  }
  getCssClassMap() {
    return index$1.classnames('radio-button-group__helper-text', (this.status === 'error' || this.invalid) &&
      `radio-button-group__helper-text--status-error`);
  }
  get hostElement() { return index.getElement(this); }
};
RadioButtonGroup.style = radioButtonGroupCss;

exports.scale_radio_button_group = RadioButtonGroup;
