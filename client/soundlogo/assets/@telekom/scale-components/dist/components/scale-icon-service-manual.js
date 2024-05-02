import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ServiceManual = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M21 17.5L15.5 23v-4a1.5 1.5 0 011.355-1.493L17 17.5h4zM21 1v15.5h-4a2.5 2.5 0 00-2.495 2.335L14.5 19v4H6a3 3 0 01-2.995-2.824L3 20V1h18zm-7.228 5.316c-.428 0-.856.098-1.254.306-1.151.602-1.693 1.933-1.427 3.239l.043.186-3.43 3.429A1.567 1.567 0 009.8 15.798l.119-.107 3.331-3.331c.304.104.62.158.937.158.427 0 .855-.1 1.252-.306 1.103-.577 1.638-1.824 1.448-3.075l-.034-.188-2.081 1.088-.785-.623-.063-1.001 2.086-1.09c-.603-.643-1.419-1.007-2.238-1.007z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M9.92 15.691l3.33-3.33a2.78 2.78 0 002.19-.149c1.157-.606 1.69-1.95 1.412-3.262l-2.08 1.087-.785-.623-.064-1 2.081-1.088c-.919-.979-2.328-1.31-3.486-.703-1.206.63-1.744 2.061-1.385 3.423l-3.429 3.43a1.567 1.567 0 002.215 2.215zm9.58 1.31h-3a1.5 1.5 0 00-1.5 1.5v3H6c-.827 0-1.5-.674-1.5-1.5V2.5h15V17zM3 1v19a3 3 0 003 3h10l5-5V1H3z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-service-manual", {
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
  const components = ["scale-icon-service-manual"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-service-manual":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ServiceManual);
      }
      break;
  } });
}

const ScaleIconServiceManual = ServiceManual;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconServiceManual, defineCustomElement };