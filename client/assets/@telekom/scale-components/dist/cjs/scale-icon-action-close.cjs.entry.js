'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionClose = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M13.768 12l4.116-4.116a1.25 1.25 0 00-1.767-1.768L12 10.232 7.884 6.116a1.25 1.25 0 10-1.767 1.768L10.233 12l-4.116 4.116a1.249 1.249 0 101.767 1.768L12 13.768l4.117 4.116a1.246 1.246 0 001.767 0 1.25 1.25 0 000-1.768L13.768 12z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M12.93 12.402l4.47-4.47a.749.749 0 10-1.062-1.06l-4.47 4.47L7.4 6.871a.749.749 0 10-1.06 1.06l4.47 4.47-4.47 4.47a.75.75 0 001.06 1.061l4.47-4.47 4.47 4.47a.747.747 0 001.06 0 .75.75 0 000-1.06l-4.47-4.47z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ActionClose.style = iconCss;

exports.scale_icon_action_close = ActionClose;
