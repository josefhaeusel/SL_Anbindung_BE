'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const helperTextCss = ":host{--color-informational:var(\n    --telekom-color-text-and-icon-functional-informational\n  );--color-warning:var(--telekom-color-text-and-icon-functional-warning);--color-danger:var(--telekom-color-text-and-icon-functional-danger);--color-success:var(--telekom-color-text-and-icon-functional-success);--color-neutral:var(--telekom-color-text-and-icon-additional);--font-size:0.75rem;--font-weight:700;--line-height:1.35;--icon-size-helper-text:11px}.helper-text{display:flex;align-items:flex-start;flex-direction:row-reverse;justify-content:flex-end;font-size:var(--font-size);font-weight:var(--font-weight);line-height:var(--line-height)}[part='text']{text-align:left}scale-icon-alert-information,scale-icon-alert-error,scale-icon-action-success{display:flex;justify-content:center;align-items:center;margin-right:var(--telekom-spacing-composition-space-03);margin-top:0.1666em;}.scale-icon{height:var(--icon-size-helper-text);width:var(--icon-size-helper-text)}.helper-text--informational{color:var(--color-informational)}.helper-text--warning{color:var(--color-warning)}.helper-text--danger{color:var(--color-danger)}.helper-text--success{color:var(--color-success)}.helper-text--neutral{color:var(--color-neutral)}";

const HelperText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** (optional) Injected CSS styles */
    this.variant = 'informational';
  }
  renderHelperIcon() {
    const variant = this.variant;
    if (variant === 'informational' || variant === 'warning') {
      return index.h("scale-icon-alert-information", null);
    }
    if (variant === 'danger') {
      return index.h("scale-icon-alert-error", null);
    }
    if (variant === 'success') {
      return index.h("scale-icon-action-success", null);
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: {
        'helper-text': true,
        'helper-text--informational': this.variant === 'informational',
        'helper-text--warning': this.variant === 'warning',
        'helper-text--danger': this.variant === 'danger',
        'helper-text--success': this.variant === 'success',
        'helper-text--neutral': this.variant === 'neutral',
      }, part: "base" }, this.helperText ? (index.h("span", { part: "text" }, this.helperText)) : (index.h("span", { part: "text" }, index.h("slot", null))), this.renderHelperIcon()), this.styles && index.h("style", null, this.styles)));
  }
};
HelperText.style = helperTextCss;

exports.scale_helper_text = HelperText;
