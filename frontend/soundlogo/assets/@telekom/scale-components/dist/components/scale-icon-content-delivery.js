import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentDelivery = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M17.25 11.5a6.25 6.25 0 100 12.5 6.25 6.25 0 000-12.5zm2.6 3.814c.2 0 .39.08.53.221.294.29.3.762.015 1.06L16.5 20.5 14.045 18a.75.75 0 011.06-1.06l1.395 1.415 2.82-2.82a.745.745 0 01.53-.221zM9 6.5v14H3a3 3 0 01-3-3v-11h9zm10.5 0v3.835a7.745 7.745 0 00-9 3.615V6.5h9zM9 1.5V5H0l3-3.5h6zm7.5 0l3 3.5h-9V1.5h6z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M17.25 11.5c3.45 0 6.25 2.8 6.25 6.25S20.7 24 17.25 24 11 21.2 11 17.75s2.8-6.25 6.25-6.25zm3.1 4.05a.722.722 0 00-.965-.074l-.085.074-2.8 2.8-1.4-1.4c-.3-.3-.75-.3-1.05 0a.722.722 0 00-.074.965l.074.085 2.45 2.5 3.9-3.9c.3-.3.25-.75-.05-1.05zM16.5 1.5l3 3.5v5.35a8.086 8.086 0 00-1.125-.253L18 10.05V6.5h-7.5v3H9v-3H1.5v11c0 .8.576 1.423 1.352 1.493L3 19h6.6c.08.4.16.8.291 1.2l.109.3H3a3.01 3.01 0 01-2.995-2.824L0 17.5V5l3-3.5h13.5zM15.8 3h-5.3v2h7.05L15.8 3zM9 3H3.7L2 5h7V3z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-content-delivery", {
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
  const components = ["scale-icon-content-delivery"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-content-delivery":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContentDelivery);
      }
      break;
  } });
}

const ScaleIconContentDelivery = ContentDelivery;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconContentDelivery, defineCustomElement };
