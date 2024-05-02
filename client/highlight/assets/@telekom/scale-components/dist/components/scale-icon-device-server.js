import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const DeviceServer = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M21.002 16v3.5a3 3 0 01-2.824 2.995L18 22.5H6a3.001 3.001 0 01-2.994-2.824L3 19.5V16h18zm-5 1.5a1 1 0 100 2 1 1 0 000-2zm5-8v5h-18v-5h18zm-5 1.5a1 1 0 100 2 1 1 0 000-2zm2-9.5a3 3 0 012.994 2.824l.006.176V8h-18V4.5a3.001 3.001 0 012.823-2.995l.176-.005h12zm-2 3a1 1 0 100 2 1 1 0 000-2z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M18.002 1.5a3 3 0 012.995 2.824l.005.176v15a3 3 0 01-2.824 2.995l-.176.005h-12a3 3 0 01-2.995-2.824l-.005-.176v-15a3 3 0 012.823-2.995l.177-.005h12zm1.5 14.5h-15v3.5c0 .778.596 1.42 1.355 1.493l.145.007h12c.778 0 1.42-.596 1.493-1.356l.007-.144V16zm-3.5 1.5a1 1 0 110 2 1 1 0 010-2zm3.5-8h-15v5h15v-5zm-3.5 1.5a1 1 0 110 2 1 1 0 010-2zm2-8h-12c-.779 0-1.42.596-1.494 1.356l-.006.144V8h15V4.5c0-.827-.673-1.5-1.5-1.5zm-2 1.5a1 1 0 110 2 1 1 0 010-2z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-device-server", {
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
  const components = ["scale-icon-device-server"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-device-server":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DeviceServer);
      }
      break;
  } });
}

const ScaleIconDeviceServer = DeviceServer;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconDeviceServer, defineCustomElement };
