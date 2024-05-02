import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const TProductTelekom1T1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M22.002 2v17a3 3 0 01-2.824 2.995L19 22H5a3 3 0 01-2.994-2.824L2 19V2h20zm-5.435 4.5H7.4v3.74h.655v-.11c0-1.76.982-2.86 2.837-2.86h.11v7.92c0 1.1-.437 1.54-1.529 1.54h-.327v.77h5.675v-.77h-.328c-1.091 0-1.528-.44-1.528-1.54V7.27h.11c1.855 0 2.837 1.1 2.837 2.86v.11h.655V6.5zm0 4.889h-2.445v2.444h2.445V11.39zm-6.723 0H7.4v2.444h2.444V11.39z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M16.567 6.5v3.74h-.655v-.11c0-1.76-.982-2.86-2.837-2.86h-.11v7.92c0 1.1.437 1.54 1.528 1.54h.328v.77H9.146v-.77h.327c1.092 0 1.528-.44 1.528-1.54V7.27h-.109c-1.855 0-2.837 1.1-2.837 2.86v.11H7.4V6.5h9.167zm0 4.889v2.444h-2.445V11.39h2.445zm-6.723 0v2.444H7.4V11.39h2.444zM2 2v17a3 3 0 003 3h14a3 3 0 003-3V2H2zm18.5 17c0 .827-.673 1.5-1.5 1.5H5c-.827 0-1.5-.673-1.5-1.5V3.5h17V19z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-t-product-telekom-1t1", {
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
  const components = ["scale-icon-t-product-telekom-1t1"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-t-product-telekom-1t1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TProductTelekom1T1);
      }
      break;
  } });
}

const ScaleIconTProductTelekom1t1 = TProductTelekom1T1;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconTProductTelekom1t1, defineCustomElement };
