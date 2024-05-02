'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const UserFileAdmin = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M18.796 12.5l.262 1.444a.523.523 0 00.738.379l.074-.043 1.206-.835 1.479 1.478-.835 1.207a.523.523 0 00.253.79l.083.022 1.444.262v2.091l-1.444.263a.523.523 0 00-.379.738l.043.074.835 1.206-1.478 1.479-1.207-.835a.523.523 0 00-.79.253l-.022.083L18.796 24h-2.091l-.262-1.444a.523.523 0 00-.738-.379l-.075.043-1.207.835-1.478-1.478.835-1.207a.523.523 0 00-.253-.79l-.083-.022L12 19.296v-2.091l1.444-.263a.523.523 0 00.379-.738l-.043-.074-.835-1.206 1.478-1.479 1.207.835c.288.2.678.063.79-.253l.022-.083.262-1.444h2.091zm-1.046 3.981a1.77 1.77 0 100 3.538 1.77 1.77 0 000-3.538zM7.405 15l3.095 3.095V20H.281l.172-1.031a4.734 4.734 0 014.461-3.964L5.138 15h2.267zM10.5.5c3.476 0 6 2.523 6 6 0 3.38-2.411 7-6 7s-6-3.62-6-7c0-3.477 2.523-6 6-6z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M18.796 12.5l.262 1.444a.523.523 0 00.738.379l.074-.043 1.206-.835 1.479 1.478-.835 1.207a.523.523 0 00.253.79l.083.022 1.444.262v2.091l-1.444.263a.523.523 0 00-.379.738l.043.074.835 1.206-1.478 1.479-1.207-.835a.523.523 0 00-.79.253l-.022.083L18.796 24h-2.091l-.262-1.444a.523.523 0 00-.738-.379l-.075.043-1.207.835-1.478-1.478.835-1.207a.523.523 0 00-.253-.79l-.083-.022L12 19.296v-2.091l1.444-.263a.523.523 0 00.379-.738l-.043-.074-.835-1.206 1.478-1.479 1.207.835c.288.2.678.063.79-.253l.022-.083.262-1.444h2.091zm-1.046 3.981a1.77 1.77 0 100 3.538 1.77 1.77 0 000-3.538zM7.405 15l3.095 3.095V20H.281l.172-1.031a4.734 4.734 0 014.461-3.964L5.138 15h2.267zM10.5.5c3.476 0 6 2.523 6 6 0 3.38-2.411 7-6 7s-6-3.62-6-7c0-3.477 2.523-6 6-6zm0 1.5C7.892 2 6 3.892 6 6.5 6 9.156 7.808 12 10.5 12S15 9.156 15 6.5C15 3.892 13.107 2 10.5 2z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
UserFileAdmin.style = iconCss;

exports.scale_icon_user_file_admin = UserFileAdmin;
