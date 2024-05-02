import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionZoomOut = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M21.385 19.615l-4.92-4.915a8 8 0 10-1.765 1.765l4.915 4.92c.49.487 1.28.487 1.77 0a1.26 1.26 0 000-1.77zM13 10.75H7a.75.75 0 110-1.5h6a.75.75 0 110 1.5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M10 2c4.42 0 8 3.58 8 8 0 1.65-.505 3.177-1.36 4.445l-.175.25 4.92 4.92c.485.49.485 1.28.005 1.77a1.245 1.245 0 01-.885.365c-.274 0-.549-.088-.776-.268l-.109-.097-4.92-4.92A7.961 7.961 0 0110 18c-4.42 0-8-3.58-8-8s3.58-8 8-8zm0 1.5A6.506 6.506 0 003.5 10c0 3.585 2.915 6.5 6.5 6.5s6.5-2.915 6.5-6.5-2.915-6.5-6.5-6.5zm3 5.75a.749.749 0 01.102 1.493L13 10.75H7a.749.749 0 01-.102-1.493L7 9.25h6z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-zoom-out", {
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
  const components = ["scale-icon-action-zoom-out"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-zoom-out":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionZoomOut);
      }
      break;
  } });
}

const ScaleIconActionZoomOut = ActionZoomOut;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionZoomOut, defineCustomElement };
