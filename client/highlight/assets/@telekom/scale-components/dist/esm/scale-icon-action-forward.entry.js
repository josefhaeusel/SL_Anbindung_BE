import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionForward = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** (optional) The width and height in pixels */
    this.size = 24;
    /** (optional) Sets the icon color via the `fill` attribute */
    this.fill = 'currentColor';
    /** (optional) Alias for `fill` */
    this.color = 'currentColor';
    /** (optional) If `true`, the icon changes visually */
    this.selected = false;
    /** (optional) If `true` the SVG element will get `aria-hidden="true"` */
    this.decorative = false;
    /** (optional) If `true` the icon can receive focus */
    this.focusable = false;
  }
  connectedCallback() {
    if (!this.hostElement.hasAttribute('styles')) {
      this.hostElement.style.display = 'inline-flex';
    }
  }
  render() {
    const ariaHidden = this.decorative ? { 'aria-hidden': 'true' } : {};
    const focusable = this.focusable ? { tabindex: 0 } : {};
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M20.25 7.752l-6.75-4.4v2.861h-2.264c-4.687 0-8.5 3.813-8.5 8.5V19a1.5 1.5 0 103 0v-4.287c0-3.032 2.468-5.5 5.5-5.5H13.5v2.938l6.75-4.399z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M13.5 12.151l6.75-4.399-6.75-4.4V7h-2.25C6.979 7 3.5 10.476 3.5 14.75v4.987a.75.75 0 101.5 0V14.75a6.257 6.257 0 016.25-6.25h2.25v3.651z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
ActionForward.style = iconCss;

export { ActionForward as scale_icon_action_forward };
