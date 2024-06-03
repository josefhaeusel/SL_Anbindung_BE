'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionMute = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M4.76 3.349c.2 0 .39.08.53.221l15.74 15.74a.745.745 0 010 1.06.75.75 0 01-1.06 0L4.23 4.63a.755.755 0 010-1.06.745.745 0 01.53-.221zM5.87 8.39L16 18.5v2h-2l-4.5-4H8a3 3 0 01-3-3v-3a2.97 2.97 0 01.87-2.11zM16 3.5v8.655l-5.525-5.52L14 3.5h2z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M4.23 3.57a.744.744 0 01.975-.073l.085.073 15.74 15.74a.745.745 0 010 1.06.754.754 0 01-.53.22.755.755 0 01-.437-.141l-.093-.079L4.23 4.63a.75.75 0 010-1.06zm1.64 4.82l1.06 1.06c-.232.236-.387.55-.422.898L6.5 10.5v3c0 .776.598 1.42 1.356 1.493L8 15h2.07l4.43 3.94v-1.92l1.5 1.5v1.98h-2l-4.5-4H8a3.003 3.003 0 01-2.995-2.824L5 13.5v-3c0-.756.277-1.445.74-1.97l.13-.14zM16 3.5v8.655l-1.5-1.5V5.06l-2.96 2.635-1.065-1.06L14 3.5h2z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ActionMute.style = iconCss;

exports.scale_icon_action_mute = ActionMute;
