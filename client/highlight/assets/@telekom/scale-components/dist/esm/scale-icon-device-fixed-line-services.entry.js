import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const DeviceFixedLineServices = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M20 11.5a3 3 0 012.995 2.824L23 14.5V24H1.5v-9.5a3 3 0 012.824-2.995L4.5 11.5V13a1.5 1.5 0 00-1.493 1.356L3 14.5v8h18.5v-8a1.5 1.5 0 00-1.356-1.493L20 13v-1.5zM15.5 0a3 3 0 012.995 2.824L18.5 3v15a3 3 0 01-2.824 2.995L15.5 21H9a3 3 0 01-2.995-2.824L6 18V3A3 3 0 018.824.005L9 0h6.5zm-3.25 15a.75.75 0 100 1.5.75.75 0 000-1.5zm2.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zm-5 0a.75.75 0 100 1.5.75.75 0 000-1.5zm2.5-2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm2.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zm-5 0a.75.75 0 100 1.5.75.75 0 000-1.5zm2.5-2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm2.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zm-5 0a.75.75 0 100 1.5.75.75 0 000-1.5zm5.75-5H9v3.5h6.5V5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M20 11.5a3.01 3.01 0 012.995 2.824L23 14.5V24H1.5v-9.5a3.01 3.01 0 012.824-2.995L4.5 11.5V13c-.8 0-1.423.576-1.493 1.352L3 14.5v8h18.5v-8c0-.8-.576-1.423-1.352-1.493L20 13v-1.5zM15.5 0a3.01 3.01 0 012.995 2.824L18.5 3v15a3.01 3.01 0 01-2.824 2.995L15.5 21H9a3.01 3.01 0 01-2.995-2.824L6 18V3A3.01 3.01 0 018.824.005L9 0h6.5zm0 1.5H9c-.8 0-1.423.576-1.493 1.352L7.5 3v15c0 .8.576 1.423 1.352 1.493L9 19.5h6.5c.8 0 1.423-.576 1.493-1.352L17 18V3c0-.8-.576-1.423-1.352-1.493L15.5 1.5zM14.75 15a.75.75 0 110 1.5.75.75 0 010-1.5zm-5 0a.75.75 0 110 1.5.75.75 0 010-1.5zm2.5 0a.75.75 0 110 1.5.75.75 0 010-1.5zm2.5-2.5a.75.75 0 110 1.5.75.75 0 010-1.5zm-5 0a.75.75 0 110 1.5.75.75 0 010-1.5zm2.5 0a.75.75 0 110 1.5.75.75 0 010-1.5zM9.75 10a.75.75 0 110 1.5.75.75 0 010-1.5zm2.5 0a.75.75 0 110 1.5.75.75 0 010-1.5zm2.5 0a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5v3.5H9V5h6.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
DeviceFixedLineServices.style = iconCss;

export { DeviceFixedLineServices as scale_icon_device_fixed_line_services };
