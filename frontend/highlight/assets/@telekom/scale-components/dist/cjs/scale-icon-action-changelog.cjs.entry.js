'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionChangelog = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M2 15.5l3.44 2.25L2 20v-4.5zm19.25 1a1.25 1.25 0 01.128 2.494L21.25 19h-13a1.25 1.25 0 01-.128-2.494l.128-.006h13zM2 9.5l3.44 2.25L2 14V9.5zm19.25 1a1.25 1.25 0 01.128 2.494L21.25 13h-13a1.25 1.25 0 01-.128-2.494l.128-.006h13zM2 3.5l3.44 2.25L2 8V3.5zm19.25 1a1.25 1.25 0 01.128 2.494L21.25 7h-13a1.25 1.25 0 01-.128-2.494L8.25 4.5h13z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M2 15.5l3.45 2.25L2 20v-4.5zM21.25 17c.4 0 .75.35.75.75a.772.772 0 01-.651.743l-.099.007H7.5V17h13.75zM2 9.5l3.45 2.25L2 14V9.5zM21.25 11c.4 0 .75.35.75.75a.772.772 0 01-.651.743l-.099.007H7.5V11h13.75zM2 3.5l3.45 2.25L2 8V3.5zM21.25 5c.4 0 .75.35.75.75a.772.772 0 01-.651.743l-.099.007H7.5V5h13.75z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ActionChangelog.style = iconCss;

exports.scale_icon_action_changelog = ActionChangelog;
