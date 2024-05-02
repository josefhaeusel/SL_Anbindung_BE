'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentShop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M12 1a4.48 4.48 0 014.495 4.287l.005.213V7h4.45l.9 12.8c.05.8-.25 1.65-.8 2.25-.504.55-1.218.89-1.989.943L18.85 23H5.15c-.85 0-1.65-.35-2.2-.95a3.049 3.049 0 01-.805-2.039l.005-.211.9-12.8H7.5V5.5C7.5 3 9.5 1 12 1zM8.25 9.75a1 1 0 110 2 1 1 0 010-2zm7.5 0a1 1 0 110 2 1 1 0 010-2zM12 2.5a3.01 3.01 0 00-2.995 2.824L9 5.5V7h6V5.5c0-1.65-1.35-3-3-3z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M12 1a4.48 4.48 0 014.495 4.287l.005.213V7h4.45l.9 12.8c.05.8-.25 1.65-.8 2.25-.504.55-1.218.89-1.989.943L18.85 23H5.15c-.85 0-1.65-.35-2.2-.95a3.049 3.049 0 01-.805-2.039l.005-.211.9-12.8H7.5V5.5C7.5 3 9.5 1 12 1zm7.55 7.5H4.45l-.8 11.35c-.05.45.1.8.4 1.15.262.306.602.46.95.493l.15.007h13.7c.4 0 .8-.2 1.1-.5.214-.257.355-.588.391-.929l.009-.171-.8-11.4zM8.25 9.75a1 1 0 110 2 1 1 0 010-2zm7.5 0a1 1 0 110 2 1 1 0 010-2zM12 2.5a3.01 3.01 0 00-2.995 2.824L9 5.5V7h6V5.5c0-1.65-1.35-3-3-3z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ContentShop.style = iconCss;

exports.scale_icon_content_shop = ContentShop;
