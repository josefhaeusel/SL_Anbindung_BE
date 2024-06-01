import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentStopwatch = class {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M14.5 1v1.5h-1.75v1.538a9.45 9.45 0 015.144 2.024l.265.218 1.311-1.31 1.06 1.06-1.31 1.311A9.453 9.453 0 0121.5 13.5c0 5.238-4.262 9.5-9.5 9.5-5.239 0-9.5-4.262-9.5-9.5 0-2.232.778-4.283 2.072-5.906l.209-.253L3.47 6.03l1.06-1.06 1.311 1.31a9.453 9.453 0 015.048-2.207l.361-.035V2.5H9.5V1h5zM12 7a6.5 6.5 0 016.496 6.267l.004.233H12V7z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M14.5 1v1.5h-1.75v1.538a9.45 9.45 0 015.144 2.024l.265.218 1.311-1.31 1.06 1.06-1.31 1.311A9.453 9.453 0 0121.5 13.5c0 5.238-4.262 9.5-9.5 9.5-5.239 0-9.5-4.262-9.5-9.5 0-2.232.778-4.283 2.072-5.906l.209-.253L3.47 6.03l1.06-1.06 1.311 1.31a9.453 9.453 0 015.048-2.207l.361-.035V2.5H9.5V1h5zM12 5.5c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM12 7a6.5 6.5 0 016.496 6.267l.004.233H12V7z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
ContentStopwatch.style = iconCss;

export { ContentStopwatch as scale_icon_content_stopwatch };
