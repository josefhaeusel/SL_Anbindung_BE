import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const AlertImprintDataprivacy = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M12 1l9.5 2.15v8c0 2.85-.95 5.55-2.6 7.75a12.863 12.863 0 01-4.844 3.9l-.378.167-.18.075-.343.133-.314.113-.413.135-.428.127c-2.64-.754-4.43-2.062-5.508-3.078l-.277-.27-.241-.25a5.328 5.328 0 01-.108-.118l-.19-.216-.158-.189-.218-.279c-1.674-2.152-2.707-4.808-2.794-7.616L2.5 11.15v-8L12 1zm-1.4 12l1.4 1.4 1.4-1.4h1c.897 0 1.66.624 1.911 1.494l.039.156.15.85h-9l.15-.85c.142-.897.908-1.571 1.793-1.644L9.6 13h1zM12 6.5c1.4 0 2.5 1 2.5 2.5 0 1.55-1.05 3-2.5 3s-2.5-1.5-2.5-3 1.1-2.5 2.5-2.5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12 1l9.5 2.15v8c0 2.85-.95 5.55-2.6 7.75a12.863 12.863 0 01-4.844 3.9l-.378.167-.18.075-.343.133-.314.113-.413.135-.428.127c-2.64-.754-4.43-2.062-5.508-3.078l-.277-.27-.241-.25a5.328 5.328 0 01-.108-.118l-.19-.216-.158-.189-.218-.279c-1.674-2.152-2.707-4.808-2.794-7.616L2.5 11.15v-8L12 1zm0 1.5L4 4.35v6.8c0 4.95 3.3 9.35 8 10.8 4.606-1.421 7.867-5.675 7.996-10.504L20 11.15v-6.8L12 2.5zM10.6 13l1.4 1.4 1.4-1.4h1c.897 0 1.66.624 1.911 1.494l.039.156.15.85h-9l.15-.85c.142-.897.908-1.571 1.793-1.644L9.6 13h1zM12 6.5c1.4 0 2.5 1 2.5 2.5 0 1.55-1.05 3-2.5 3s-2.5-1.5-2.5-3 1.1-2.5 2.5-2.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-alert-imprint-dataprivacy", {
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
  const components = ["scale-icon-alert-imprint-dataprivacy"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-alert-imprint-dataprivacy":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AlertImprintDataprivacy);
      }
      break;
  } });
}

const ScaleIconAlertImprintDataprivacy = AlertImprintDataprivacy;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconAlertImprintDataprivacy, defineCustomElement };