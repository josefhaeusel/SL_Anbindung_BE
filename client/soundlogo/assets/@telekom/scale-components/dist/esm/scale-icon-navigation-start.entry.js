import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const NavigationStart = class {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M21.85 2.15c-.25-.25-.6-.3-.9-.15L.8 11.05c-.3.15-.5.45-.5.8 0 .35.25.6.55.7L8.95 15l2.45 8.1c.1.3.4.55.7.55h.05c.3 0 .6-.2.75-.45L22 3.05c.15-.3.1-.65-.15-.9z" }))) : (h("g", null, h("path", { d: "M21.85 2.15c-.25-.25-.6-.3-.9-.15L.8 11.05c-.3.15-.5.45-.5.8 0 .35.25.6.55.7L8.95 15l2.45 8.1c.1.3.4.55.7.55h.05c.3 0 .6-.2.75-.45L22 3.05c.15-.3.1-.65-.15-.9zm-9.5 18.7l-2.15-7.1-7.05-2.1 16.75-7.5-7.55 16.7z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
NavigationStart.style = iconCss;

export { NavigationStart as scale_icon_navigation_start };
