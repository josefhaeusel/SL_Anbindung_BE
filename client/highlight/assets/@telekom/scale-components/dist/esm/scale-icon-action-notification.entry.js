import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionNotification = class {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M22 16.95c-2.35-2.35-2.7-4.65-2.8-5.8L19 9.4c-.25-3.15-2.55-5.6-5.5-6.25V3c0-.85-.65-1.5-1.5-1.5s-1.5.65-1.5 1.5v.15C7.55 3.8 5.25 6.25 5 9.4l-.15 1.75c-.15 1.1-.5 3.4-2.85 5.8v3.55h7.05C9.3 21.9 10.5 23 12 23c1.5 0 2.7-1.1 2.95-2.5H22v-3.55z" }))) : (h("g", null, h("path", { d: "M22 16.95c-2.35-2.35-2.7-4.65-2.8-5.8L19 9.4c-.25-3.15-2.55-5.6-5.5-6.25V3c0-.85-.65-1.5-1.5-1.5s-1.5.65-1.5 1.5v.15C7.55 3.8 5.25 6.25 5 9.4l-.15 1.75c-.15 1.1-.5 3.4-2.85 5.8v3.55h7.05C9.3 21.9 10.5 23 12 23c1.5 0 2.7-1.1 2.95-2.5H22v-3.55zM20.5 19h-17v-1.45c1.6-1.7 2.6-3.9 2.8-6.25l.15-1.75C6.75 6.65 9.1 4.5 12 4.5s5.25 2.15 5.5 5.05l.15 1.75c.2 2.35 1.2 4.55 2.8 6.25V19h.05z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
ActionNotification.style = iconCss;

export { ActionNotification as scale_icon_action_notification };
