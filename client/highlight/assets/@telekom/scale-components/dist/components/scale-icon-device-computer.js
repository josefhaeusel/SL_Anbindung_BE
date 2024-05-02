import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const DeviceComputer = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M24 18c0 1.05-.82 1.918-1.851 1.994L22 20H2C.95 20 .082 19.18.006 18.149L0 18h24zM18.5 4.5a3.01 3.01 0 012.995 2.824l.005.176v9h-19v-9a3.01 3.01 0 012.824-2.995L5.5 4.5h13zm-11 4.25l3.65 3.55-1.65-.15 1 2.4-.95.4-1-2.4-1.05 1.3v-5.1z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M24 18c0 1.05-.82 1.918-1.851 1.994L22 20H2C.95 20 .082 19.18.006 18.149L0 18h24zM18.5 4.5a3.01 3.01 0 012.995 2.824l.005.176v9H20v-9c0-.8-.576-1.423-1.352-1.493L18.5 6h-13c-.8 0-1.423.576-1.493 1.352L4 7.5v9H2.5v-9a3.01 3.01 0 012.824-2.995L5.5 4.5h13zm-11 4.25l3.65 3.55-1.65-.15 1 2.4-.95.4-1-2.4-1.05 1.3v-5.1z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-device-computer", {
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
  const components = ["scale-icon-device-computer"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-device-computer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DeviceComputer);
      }
      break;
  } });
}

const ScaleIconDeviceComputer = DeviceComputer;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconDeviceComputer, defineCustomElement };
