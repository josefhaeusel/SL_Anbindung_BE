'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const CommunicationNewEmail = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M10.803 19.303l1.992 1.993-2.737.743.745-2.736zm10.815-10.26a1.444 1.444 0 011.12 2.355l-.1.11-8.935 8.93-2.041-2.043 8.936-8.93c.28-.281.65-.422 1.02-.422zM19 5.87v3.072L10.936 17H2.479a2.475 2.475 0 01-2.474-2.31L0 14.53V5.87l7.31 6.246a3.375 3.375 0 004.21.136l.17-.136L19 5.87zM19 3v.898l-8.284 7.077c-.636.542-1.621.576-2.3.101l-.131-.101L0 3.898V3h19z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M10.803 19.303l1.992 1.993-2.737.743.745-2.736zm10.815-10.26a1.444 1.444 0 011.12 2.355l-.1.11-8.935 8.93-2.041-2.043 8.936-8.93c.28-.281.65-.422 1.02-.422zM19 3v5.942l-1.5 1.499V7.15l-5.81 4.963a3.366 3.366 0 01-2.19.814c-.7 0-1.399-.22-1.995-.66l-.194-.154L1.5 7.152v7.377c0 .498.378.908.865.964l.114.007h9.958L10.936 17H2.479a2.476 2.476 0 01-2.474-2.31L0 14.53V2.999h19zm-1.5 1.5h-16v.679l6.785 5.795c.66.563 1.6.6 2.295.106l.136-.106L17.5 5.179v-.68z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
CommunicationNewEmail.style = iconCss;

exports.scale_icon_communication_new_email = CommunicationNewEmail;
