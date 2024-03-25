import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionPower = class {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M9.286 4.4v2.648A7.01 7.01 0 005 13.5c0 3.86 3.14 7 7 7s7-3.14 7-7a7.004 7.004 0 00-3.977-6.31l-.237-.108V4.419C18.67 5.612 21.5 9.23 21.5 13.499c0 5.239-4.262 9.5-9.5 9.5s-9.5-4.261-9.5-9.5c0-4.199 2.741-7.766 6.526-9.017l.26-.082zm2.75-2.9c.647 0 1.18.492 1.244 1.122l.006.128v9.5a1.25 1.25 0 01-2.493.128l-.007-.128v-9.5c0-.69.56-1.25 1.25-1.25z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M14.25 4.796C18.125 5.8 21 9.315 21 13.5c0 4.963-4.038 9-9 9-4.963 0-9-4.037-9-9 0-4.092 2.75-7.544 6.493-8.633l.257-.071v1.55C6.71 7.304 4.5 10.148 4.5 13.5c0 4.136 3.364 7.5 7.5 7.5 4.135 0 7.5-3.364 7.5-7.5 0-3.261-2.092-6.042-5.005-7.072l-.245-.082v-1.55zM12 1.5a.75.75 0 01.743.648l.007.102v10.5a.75.75 0 01-1.493.102l-.007-.102V2.25A.75.75 0 0112 1.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
ActionPower.style = iconCss;

export { ActionPower as scale_icon_action_power };
