'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionPopUpWindow = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M23.5 10v9a3 3 0 01-2.824 2.995L20.5 22h-9a3 3 0 01-2.995-2.824L8.5 19v-9h15zM22 13H10v6a1.5 1.5 0 001.356 1.493l.144.007h9a1.5 1.5 0 001.493-1.356L22 19v-6zM18.5 2v6.5H7v9H3.5a3 3 0 01-2.995-2.824L.5 14.5V2h18zm-16 .875a.625.625 0 100 1.25.625.625 0 000-1.25zm2 0a.625.625 0 100 1.25.625.625 0 000-1.25zm2 0a.625.625 0 100 1.25.625.625 0 000-1.25z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M23.5 10v9a3.01 3.01 0 01-2.824 2.995L20.5 22h-9a3.01 3.01 0 01-2.995-2.824L8.5 19v-9h15zM22 13H10v6c0 .8.576 1.423 1.352 1.493l.148.007h9c.8 0 1.423-.576 1.493-1.352L22 19v-6zM18.5 2v6.5H17V5H2v9.5c0 .8.576 1.423 1.352 1.493L3.5 16H7v1.5H3.5a3.01 3.01 0 01-2.995-2.824L.5 14.5V2h18zm-12 .9c-.35 0-.6.25-.6.6s.25.65.6.65.6-.35.6-.65c0-.3-.25-.6-.6-.6zm-2 0c-.35 0-.6.25-.6.6s.25.65.6.65.6-.35.6-.65c0-.3-.25-.6-.6-.6zm-2 0c-.35 0-.6.25-.6.6s.25.65.6.65.6-.35.6-.65c0-.3-.25-.6-.6-.6z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ActionPopUpWindow.style = iconCss;

exports.scale_icon_action_pop_up_window = ActionPopUpWindow;
