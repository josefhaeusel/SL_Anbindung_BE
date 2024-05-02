'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionFilter2 = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M22 2H2v3.568c0 1.233.507 2.413 1.4 3.263L9 14.15v9.35l6-3v-6.35l5.6-5.319c.893-.85 1.4-2.03 1.4-3.263V2z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M22 2H2v3.568c0 1.233.507 2.413 1.4 3.263L9 14.15v9.35l6-3v-6.35l5.6-5.319c.893-.85 1.4-2.03 1.4-3.263V2zm-1.5 1.5v2.068c0 .819-.34 1.612-.934 2.175l-5.598 5.32-.468.443v6.067l-3 1.5v-7.567l-.467-.443-5.599-5.32A3.009 3.009 0 013.5 5.568V3.5h17z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ActionFilter2.style = iconCss;

exports.scale_icon_action_filter_2 = ActionFilter2;
