import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const TProductUsage = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M12 1c6.05 0 11 4.95 11 11s-4.95 11-11 11S1 18.05 1 12 5.95 1 12 1zM6.45 6.45a.722.722 0 01.965-.074l.085.074 4.1 4.1c.15-.05.25-.05.4-.05.85 0 1.5.65 1.5 1.5s-.65 1.5-1.5 1.5-1.5-.65-1.5-1.5c0-.113 0-.197.021-.295l.029-.105-4.1-4.1c-.3-.3-.3-.75 0-1.05zm-1.1 2.1l2.3 2.3c-.08.28-.128.592-.144.91L7.5 12h-3a7.28 7.28 0 01.706-3.172l.144-.278zM12 4.5a7.49 7.49 0 017.496 7.257L19.5 12h-3c0-2.5-2-4.5-4.5-4.5-.32 0-.64.032-.934.096l-.216.054-2.3-2.3c1-.55 2.2-.85 3.45-.85z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12 1c6.05 0 11 4.95 11 11s-4.95 11-11 11S1 18.05 1 12 5.95 1 12 1zm0 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zM6.45 6.45a.722.722 0 01.965-.074l.085.074 4.1 4.1c.15-.05.25-.05.4-.05.85 0 1.5.65 1.5 1.5s-.65 1.5-1.5 1.5-1.5-.65-1.5-1.5c0-.113 0-.197.021-.295l.029-.105-4.1-4.1c-.3-.3-.3-.75 0-1.05zm-1.1 2.1l2.3 2.3c-.08.28-.128.592-.144.91L7.5 12h-3a7.28 7.28 0 01.706-3.172l.144-.278zM12 4.5a7.49 7.49 0 017.496 7.257L19.5 12h-3c0-2.5-2-4.5-4.5-4.5-.32 0-.64.032-.934.096l-.216.054-2.3-2.3c1-.55 2.2-.85 3.45-.85z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-t-product-usage", {
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
  const components = ["scale-icon-t-product-usage"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-t-product-usage":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TProductUsage);
      }
      break;
  } });
}

const ScaleIconTProductUsage = TProductUsage;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconTProductUsage, defineCustomElement };