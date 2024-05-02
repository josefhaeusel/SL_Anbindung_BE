import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentPriceTag = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M12.445 1.535l8.78 1.3 1.295 8.78L12.215 21.92a3.052 3.052 0 01-4.153.155l-.167-.155-5.76-5.76a3.05 3.05 0 01-.133-4.179l.133-.141 10.31-10.305zM17.5 5.5a1 1 0 110 2 1 1 0 010-2z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12.445 1.535l8.78 1.3 1.295 8.78L12.215 21.92a3.052 3.052 0 01-4.153.155l-.167-.155-5.76-5.76a3.05 3.05 0 01-.133-4.179l.133-.141 10.31-10.305zm.525 1.59L3.195 12.9A1.543 1.543 0 002.74 14c0 .363.122.707.35.985l.105.115 5.765 5.76c.295.295.685.455 1.1.455.363 0 .707-.123.985-.35l.115-.105 9.77-9.77-1.03-6.935-6.93-1.03zM17.5 5.5a1 1 0 110 2 1 1 0 010-2z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-content-price-tag", {
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
  const components = ["scale-icon-content-price-tag"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-content-price-tag":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContentPriceTag);
      }
      break;
  } });
}

const ScaleIconContentPriceTag = ContentPriceTag;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconContentPriceTag, defineCustomElement };
