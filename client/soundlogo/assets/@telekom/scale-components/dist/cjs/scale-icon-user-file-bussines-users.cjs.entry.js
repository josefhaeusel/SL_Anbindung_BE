'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const UserFileBussinesUsers = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M11.285 15.695a.884.884 0 011.354-.09l.076.09.975 1.345a2.42 2.42 0 01-.814.737l-.151.073.545 1.81 2.875-4.16h1.215a4.737 4.737 0 014.643 3.75l.042.22.17 1.03H1.78l.175-1.03a4.737 4.737 0 014.46-3.965l.225-.005h1.215l2.875 4.16.545-1.81a2.308 2.308 0 01-.842-.652l-.123-.158.975-1.345zM12 1c3.475 0 6 2.525 6 6 0 3.38-2.41 7-6 7s-6-3.62-6-7c0-3.475 2.525-6 6-6z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M11.285 15.695a.884.884 0 011.354-.09l.076.09.975 1.345a2.42 2.42 0 01-.814.737l-.151.073.545 1.81 2.875-4.16h1.215a4.737 4.737 0 014.643 3.75l.042.22.17 1.03H1.78l.175-1.03a4.737 4.737 0 014.46-3.965l.225-.005h1.215l2.875 4.16.545-1.81a2.308 2.308 0 01-.842-.652l-.123-.158.975-1.345zM12 1c3.475 0 6 2.525 6 6 0 3.38-2.41 7-6 7s-6-3.62-6-7c0-3.475 2.525-6 6-6zm0 1.5C9.395 2.5 7.5 4.395 7.5 7c0 2.655 1.81 5.5 4.5 5.5s4.5-2.845 4.5-5.5c0-2.605-1.895-4.5-4.5-4.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
UserFileBussinesUsers.style = iconCss;

exports.scale_icon_user_file_bussines_users = UserFileBussinesUsers;
