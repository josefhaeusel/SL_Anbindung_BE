'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const NavigationInternalLink = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M18.525 3L13.07 8.44 9.875 5.245l-2.01 9.705-.315 1.5 1.5-.315 7.895-1.635 1.81-.39-3.195-3.195L21 5.5V18a3 3 0 01-2.824 2.995L18 21H6a3 3 0 01-2.995-2.824L3 18V3h15.525zm2.63-.906c.2 0 .39.08.53.221a.745.745 0 01.077.97l-.077.09-7.54 7.53L16.74 13.5l-7.895 1.655L10.5 7.26l2.585 2.595 7.54-7.54a.745.745 0 01.53-.221z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M17.8 3l-1.5 1.5H4.5V18c0 .8.576 1.423 1.352 1.493L6 19.5h12c.8 0 1.423-.576 1.493-1.352L19.5 18V7.7L21 6.2V18a3.01 3.01 0 01-2.824 2.995L18 21H6a3.01 3.01 0 01-2.995-2.824L3 18V3h14.8zm2.85-.7c.3-.3.75-.3 1.05 0 .273.273.298.71.074.976L14.15 10.9l2.6 2.6-7.9 1.65 1.65-7.9 2.6 2.6 7.55-7.55z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
NavigationInternalLink.style = iconCss;

exports.scale_icon_navigation_internal_link = NavigationInternalLink;
