import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const DeviceDeviceTv = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M1 3.5V16a3 3 0 003 3h5.44l-.11.21A1.5 1.5 0 018 20H5.5v1.5h13V20H16a1.5 1.5 0 01-1.325-.79L14.56 19H20a3 3 0 003-3V3.5H1zm8.5 11.35v-7.2l5.5 3.6-5.5 3.6z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M23 3.5V16a3.01 3.01 0 01-2.824 2.995L20 19h-5.45l.2.2c.227.455.661.744 1.151.793l.149.007h2.5v1.5h-13V20h2.5c.5 0 .959-.248 1.226-.669l.074-.131.1-.2H4a3.01 3.01 0 01-2.995-2.824L1 16V3.5h22zM21.5 5h-19v11c0 .8.576 1.423 1.352 1.493L4 17.5h16c.8 0 1.423-.576 1.493-1.352L21.5 16V5zm-12 2.65l5.5 3.6-5.5 3.6v-7.2z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-device-device-tv", {
    "size": [514],
    "fill": [1],
    "color": [1],
    "selected": [516],
    "decorative": [4],
    "accessibilityTitle": [1, "accessibility-title"],
    "focusable": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-icon-device-device-tv"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-device-device-tv":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DeviceDeviceTv);
      }
      break;
  } });
}

const ScaleIconDeviceDeviceTv = DeviceDeviceTv;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconDeviceDeviceTv, defineCustomElement };
