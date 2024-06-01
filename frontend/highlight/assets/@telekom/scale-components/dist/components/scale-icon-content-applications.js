import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentApplications = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M9 13a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h5zm11 0a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2h5zM9 2a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h5zm11 0a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2V4a2 2 0 012-2h5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M8.5 13a2.473 2.473 0 012.495 2.333L11 15.5v4a2.473 2.473 0 01-2.333 2.495L8.5 22h-4a2.473 2.473 0 01-2.495-2.333L2 19.5v-4a2.473 2.473 0 012.333-2.495L4.5 13h4zm11 0a2.473 2.473 0 012.495 2.333L22 15.5v4a2.473 2.473 0 01-2.333 2.495L19.5 22h-4a2.473 2.473 0 01-2.495-2.333L13 19.5v-4a2.473 2.473 0 012.333-2.495L15.5 13h4zm-11 1.5h-4c-.51 0-.935.388-.993.884L3.5 15.5v4c0 .51.388.935.884.993l.116.007h4c.51 0 .935-.388.993-.884L9.5 19.5v-4c0-.51-.388-.935-.884-.993L8.5 14.5zm11 0h-4c-.51 0-.935.388-.993.884l-.007.116v4c0 .51.388.935.884.993l.116.007h4c.51 0 .935-.388.993-.884l.007-.116v-4c0-.51-.388-.935-.884-.993L19.5 14.5zM8.5 2a2.473 2.473 0 012.495 2.333L11 4.5v4a2.473 2.473 0 01-2.333 2.495L8.5 11h-4a2.473 2.473 0 01-2.495-2.333L2 8.5v-4a2.473 2.473 0 012.333-2.495L4.5 2h4zm11 0a2.473 2.473 0 012.495 2.333L22 4.5v4a2.473 2.473 0 01-2.333 2.495L19.5 11h-4a2.473 2.473 0 01-2.495-2.333L13 8.5v-4a2.473 2.473 0 012.333-2.495L15.5 2h4zm-11 1.5h-4c-.51 0-.935.388-.993.884L3.5 4.5v4c0 .51.388.935.884.993L4.5 9.5h4c.51 0 .935-.388.993-.884L9.5 8.5v-4c0-.51-.388-.935-.884-.993L8.5 3.5zm11 0h-4c-.51 0-.935.388-.993.884L14.5 4.5v4c0 .51.388.935.884.993l.116.007h4c.51 0 .935-.388.993-.884L20.5 8.5v-4c0-.51-.388-.935-.884-.993L19.5 3.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-content-applications", {
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
  const components = ["scale-icon-content-applications"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-content-applications":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContentApplications);
      }
      break;
  } });
}

const ScaleIconContentApplications = ContentApplications;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconContentApplications, defineCustomElement };
