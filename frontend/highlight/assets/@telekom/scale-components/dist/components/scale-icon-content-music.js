import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentMusic = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M7.5 4.89v12.06a4.205 4.205 0 00-1.885-.695c-1.89-.22-3.44.88-3.465 2.455-.025 1.575 1.5 3.03 3.385 3.25C7.42 22.18 9 21.075 9 19.5V8.11l10.5-2.19v8.53a4.205 4.205 0 00-1.885-.695c-1.89-.22-3.44.88-3.465 2.455-.025 1.575 1.5 3.03 3.385 3.25C19.42 19.68 21 18.575 21 17V2.08L7.5 4.89z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M7.5 4.89v12.06a4.205 4.205 0 00-1.885-.695c-1.89-.215-3.44.885-3.465 2.46-.02 1.575 1.495 3.03 3.385 3.245C7.43 22.175 9 21.075 9 19.5V8.11l10.5-2.19v8.53a4.205 4.205 0 00-1.885-.695c-1.89-.215-3.44.885-3.465 2.46-.02 1.575 1.495 3.03 3.385 3.245C19.43 19.675 21 18.575 21 17V2.08L7.5 4.89z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-content-music", {
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
  const components = ["scale-icon-content-music"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-content-music":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContentMusic);
      }
      break;
  } });
}

const ScaleIconContentMusic = ContentMusic;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconContentMusic, defineCustomElement };
