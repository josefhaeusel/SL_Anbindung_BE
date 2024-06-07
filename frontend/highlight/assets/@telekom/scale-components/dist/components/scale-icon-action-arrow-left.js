import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionArrowLeft = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M21.092 10.75H6.099l4.83-3.81a1.249 1.249 0 10-1.547-1.962l-8.91 7.025 8.91 7.026a1.248 1.248 0 001.755-.208 1.249 1.249 0 00-.207-1.755L6.092 13.25h15a1.25 1.25 0 000-2.5", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M21.5 11.25H5.16l5.905-4.661a.751.751 0 00-.93-1.178L1.79 12l8.346 6.589a.75.75 0 00.93-1.178L5.16 12.75H21.5a.75.75 0 000-1.5", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-arrow-left", {
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
  const components = ["scale-icon-action-arrow-left"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-arrow-left":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionArrowLeft);
      }
      break;
  } });
}

const ScaleIconActionArrowLeft = ActionArrowLeft;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionArrowLeft, defineCustomElement };