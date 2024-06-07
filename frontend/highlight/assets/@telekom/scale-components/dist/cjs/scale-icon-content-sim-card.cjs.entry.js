'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentSimCard = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M21 1v19a3 3 0 01-3 3H6a3 3 0 01-3-3V7.5L9.5 1H21zm-6.5 8h-5A2.5 2.5 0 007 11.5v5A2.5 2.5 0 009.5 19h5a2.5 2.5 0 002.5-2.5v-5A2.5 2.5 0 0014.5 9zm-1 1.5a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3a2 2 0 012-2h3z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M21 1v19a3.01 3.01 0 01-2.824 2.995L18 23H6a3.01 3.01 0 01-2.995-2.824L3 20V7.5L9.5 1H21zm-1.5 1.5h-9.4L4.5 8.1V20c0 .8.576 1.423 1.352 1.493L6 21.5h12c.8 0 1.423-.576 1.493-1.352L19.5 20V2.5zm-5 6.5a2.473 2.473 0 012.495 2.333L17 11.5v5a2.473 2.473 0 01-2.333 2.495L14.5 19h-5a2.473 2.473 0 01-2.495-2.333L7 16.5v-5a2.473 2.473 0 012.333-2.495L9.5 9h5zm0 1.5h-5c-.51 0-.935.388-.993.884L8.5 11.5v5c0 .51.388.935.884.993l.116.007h5c.51 0 .935-.388.993-.884l.007-.116v-5c0-.51-.388-.935-.884-.993L14.5 10.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ContentSimCard.style = iconCss;

exports.scale_icon_content_sim_card = ContentSimCard;