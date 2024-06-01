import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { s as statusNote } from './status-note.js';
import { d as defineCustomElement$2 } from './action-success.js';
import { d as defineCustomElement$1 } from './alert-error.js';

const progressBarCss = ":host{--track-color:var(--telekom-color-ui-faint);--bar-color:var(--telekom-color-primary-standard);--icon-color-error:var(--telekom-color-text-and-icon-functional-danger);--track-color-error:var(--telekom-color-functional-danger-subtle);--bar-color-error:var(--telekom-color-functional-danger-standard);--icon-color-success:var(--telekom-color-text-and-icon-functional-success);--track-color-success:var(--telekom-color-functional-success-subtle);--bar-color-success:var(--telekom-color-functional-success-standard);--bar-color-disabled:var(--telekom-color-ui-disabled);--color-disabled:var(--telekom-color-text-and-icon-disabled);--progress-bar-outer-size:6px;--progress-bar-inner-size:var(--telekom-spacing-composition-space-03);--font-label:var(--telekom-text-style-ui);--color-label:var(--telekom-color-text-and-icon-standard);--color-status-description:var(--telekom-color-text-and-icon-additional);--font-status-description:var(--telekom-text-style-small-bold)}.progress-bar{width:100%;max-width:30rem}.progress-bar--disabled{cursor:not-allowed}.progress-bar__top-container{display:flex;justify-content:space-between;align-items:center}.progress-bar--disabled .progress-bar__label,.progress-bar--disabled .progress-bar__status{color:var(--color-disabled)}.progress-bar__label{display:block;padding:var(--telekom-spacing-composition-space-05) 0;color:var(--color-label);font:var(--font-label)}.progress-bar__wrapper{width:100%;display:flex;box-sizing:border-box;align-items:center}.progress-bar__outer{width:100%;height:var(--progress-bar-outer-size);margin-left:0;overflow:hidden;position:relative;border-radius:var(--telekom-radius-pill);background:var(--track-color)}.progress-bar__inner{position:absolute;top:0;left:0;width:var(--progress, 0);height:var(--progress-bar-inner-size);display:flex;align-items:center;white-space:nowrap;justify-content:flex-end;border-radius:var(--telekom-radius-pill);border:1px solid transparent;background:var(--bar-color);transition:width var(--telekom-motion-duration-immediate)\n    var(--telekom-motion-easing-standard)}.progress-bar--disabled .progress-bar__inner{background:var(--bar-color-disabled)}.progress-bar__status{padding:var(--telekom-spacing-composition-space-05) 0;font:var(--font-label);font-variant-numeric:tabular-nums}.progress-bar--completed .progress-bar__icon{color:var(--icon-color-success)}.progress-bar--completed .progress-bar__outer{background:var(--track-color-success)}.progress-bar--completed .progress-bar__inner{background:var(--bar-color-success)}.progress-bar--has-error .progress-bar__icon{color:var(--icon-color-error)}.progress-bar--has-error .progress-bar__outer{background:var(--track-color-error)}.progress-bar--has-error .progress-bar__inner{background:var(--bar-color-error)}.progress-bar__status-description{color:var(--color-status-description);font:var(--font-status-description);margin-top:var(--telekom-spacing-composition-space-04)}.progress-bar__aria-live{clip:rect(0 0 0 0);width:1px;border:0;height:1px;margin:-1px;padding:0;overflow:hidden;position:absolute}";

const ICON_SIZE = 16;
let i = 0;
const ProgressBar = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** (optional) Progress bar busy switch */
    this.busy = false;
    /** (required) Progress bar percentage */
    this.percentage = 0;
    /** (optional) Progress bar percentage to start the animation from (default: 0) */
    this.percentageStart = 0;
    /** (optional) Progress bar percentage text */
    this.showStatus = true;
    this.transitions = (width, widthStart) => `
    @keyframes showProgress {
      from {
        width: ${widthStart}%;
      }
      to {
        width: ${width}%;
      }
    }
  `;
    this.progressStyle = () => {
      const customColor = this.customColor
        ? { '--background': this.customColor }
        : {};
      return Object.assign({ '--progress': this.disabled ? '100%' : `${this.percentage}%` }, customColor);
    };
  }
  componentWillLoad() {
    if (this.progressBarId == null) {
      this.progressBarId = 'progress-bar-' + i++;
    }
    if (this.disabled) {
      this.showStatus = false;
    }
  }
  componentWillUpdate() { }
  disconnectedCallback() { }
  componentDidRender() {
    if (this.customColor !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "customColor" is deprecated. 
          Please use css variable "--background" to set the progress bar background color;
          e.g. <scale-progress-bar percentage="20" style="--background: green"></scale-progress-bar>`,
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  render() {
    return (h(Host, null, this.styles && h("style", null, this.styles), h("style", null, this.transitions(this.percentage, this.percentageStart)), h("div", { part: this.getBasePartMap(), class: this.getCssClassMap() }, h("div", { class: "progress-bar__top-container" }, !!this.label ? (h("label", { part: "label", class: "progress-bar__label", htmlFor: this.progressBarId }, this.label)) : (h("span", null, " ")), !!this.showStatus &&
      !this.hasError &&
      this.percentage <= 100 &&
      this.percentage !== 100 && (h("div", { part: "status", class: "progress-bar__status", "aria-hidden": "true" }, this.percentage, "%")), this.hasError ? (h("div", { class: "progress-bar__icon" }, h("scale-icon-alert-error", { size: ICON_SIZE }))) : this.percentage >= 100 ? (h("div", { class: "progress-bar__icon" }, h("scale-icon-action-success", { size: ICON_SIZE }))) : null), h("div", { part: "wrapper", class: "progress-bar__wrapper" }, h("div", { part: "outer", class: "progress-bar__outer", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": this.percentage, "aria-busy": this.busy, "aria-valuetext": `${this.percentage}%`, "aria-label": this.label, id: this.progressBarId }, this.percentage > 0 && (h("div", { part: "inner", class: "progress-bar__inner", style: this.progressStyle() }))), h("slot", { name: "icon" }))), !!this.statusDescription && (h("div", { part: "status-description", class: "progress-bar__status-description", role: "alert" }, this.statusDescription)), !this.mute && (h("span", { "aria-live": "polite", class: "progress-bar__aria-live" }, this.percentage !== Math.round(this.percentage / 10) * 10
      ? `${Math.round(this.percentage / 10) * 10}%`
      : null))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const component = 'progress-bar';
    const prefix = mode === 'basePart' ? '' : `${component}--`;
    return classnames(component, this.hasError && `${prefix}has-error`, this.disabled && `${prefix}disabled`, this.percentage >= 100 && `${prefix}completed`);
  }
  get hostElement() { return this; }
  static get style() { return progressBarCss; }
}, [1, "scale-progress-bar", {
    "busy": [4],
    "percentage": [2],
    "percentageStart": [2, "percentage-start"],
    "customColor": [1, "custom-color"],
    "showStatus": [4, "show-status"],
    "icon": [1],
    "statusDescription": [1, "status-description"],
    "hasError": [4, "has-error"],
    "disabled": [4],
    "progressBarId": [1, "progress-bar-id"],
    "label": [1],
    "mute": [4],
    "styles": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-progress-bar", "scale-icon-action-success", "scale-icon-alert-error"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-progress-bar":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ProgressBar);
      }
      break;
    case "scale-icon-action-success":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-icon-alert-error":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { ProgressBar as P, defineCustomElement as d };
