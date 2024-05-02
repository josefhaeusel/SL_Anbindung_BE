import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionExport = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M9.75 10v6.75a2.25 2.25 0 004.5 0V10h6.25v10.5a3 3 0 01-3 3h-11a3 3 0 01-3-3V10h6.25zM12 1l4.58 7h-3.83v8.75a.75.75 0 01-1.5 0V8H7.42L12 1z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M8.5 10v1.5H5v9c0 .778.596 1.42 1.356 1.493L6.5 22h11c.778 0 1.42-.596 1.493-1.356L19 20.5v-9h-3.5V10h5v10.5a3 3 0 01-2.824 2.995l-.176.005h-11a3 3 0 01-2.995-2.824L3.5 20.5V10h5zM12 1l4.582 7H12.75v8.75a.75.75 0 01-1.493.102l-.007-.102V8H7.418l4.583-7z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-export", {
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
  const components = ["scale-icon-action-export"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-export":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionExport);
      }
      break;
  } });
}

const ScaleIconActionExport = ActionExport;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionExport, defineCustomElement };
