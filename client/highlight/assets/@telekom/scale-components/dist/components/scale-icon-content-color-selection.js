import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentColorSelection = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M20.5 19c0 .827-.673 1.5-1.5 1.5h-8.394l11.564-6.677-3.31-5.733-.866 1.5 2.128 3.684-8.981 5.185 7.004-12.131L12.5 3.069v1.732l3.596 2.076L11 15.703V2H2v17c0 1.654 1.345 3 3 3h14c1.654 0 3-1.346 3-3v-3.347l-1.5.867V19zm-12.94-.44a1.5 1.5 0 11-2.121-2.12 1.5 1.5 0 012.121 2.12z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M20.5 19c0 .827-.673 1.5-1.5 1.5h-8.394l11.564-6.677-3.31-5.733-.866 1.5 2.128 3.684-8.981 5.185 7.004-12.131L12.5 3.069v1.732l3.596 2.076L11 15.703V2H2v17c0 1.654 1.345 3 3 3h14c1.654 0 3-1.346 3-3v-3.347l-1.5.867V19zm-12.94-.44a1.5 1.5 0 11-2.121-2.12 1.5 1.5 0 012.121 2.12z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-content-color-selection", {
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
  const components = ["scale-icon-content-color-selection"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-content-color-selection":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContentColorSelection);
      }
      break;
  } });
}

const ScaleIconContentColorSelection = ContentColorSelection;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconContentColorSelection, defineCustomElement };
