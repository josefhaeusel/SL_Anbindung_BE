import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentGenderMale = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M15.085 17.4a5.961 5.961 0 01-4.244 1.756A5.96 5.96 0 016.6 17.4a5.958 5.958 0 01-1.758-4.243c0-1.602.624-3.109 1.758-4.242a5.957 5.957 0 014.242-1.758c1.602 0 3.11.624 4.242 1.758a6.007 6.007 0 010 8.485zM21 8.5V3h-5.5l1.865 1.865-1.469 1.47a8.429 8.429 0 00-5.055-1.679c-2.27 0-4.404.885-6.01 2.49a8.446 8.446 0 00-2.49 6.01c0 2.271.885 4.406 2.49 6.011a8.445 8.445 0 006.01 2.49 8.45 8.45 0 006.011-2.49c3.014-3.013 3.277-7.74.811-11.065l1.47-1.47L21 8.5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M15.43 17.762a6.455 6.455 0 01-4.596 1.904 6.457 6.457 0 01-4.596-1.904 6.46 6.46 0 01-1.904-4.596c0-1.736.676-3.368 1.904-4.596a6.46 6.46 0 014.596-1.904c1.736 0 3.369.676 4.596 1.904a6.457 6.457 0 011.904 4.596 6.455 6.455 0 01-1.904 4.596zM21.001 8.5V3h-5.5l2.219 2.22-1.786 1.785a7.976 7.976 0 00-5.1-1.839 8 8 0 105.657 13.657 7.999 7.999 0 00.503-10.757l1.787-1.786 2.22 2.22z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-content-gender-male", {
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
  const components = ["scale-icon-content-gender-male"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-content-gender-male":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContentGenderMale);
      }
      break;
  } });
}

const ScaleIconContentGenderMale = ContentGenderMale;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconContentGenderMale, defineCustomElement };
