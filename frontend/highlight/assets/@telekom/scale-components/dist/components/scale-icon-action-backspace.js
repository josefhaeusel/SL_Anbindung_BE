import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionBackspace = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M20 3.5H8L.5 12 8 20.5h12a3 3 0 003-3v-11a3 3 0 00-3-3zm-2 10.925a.745.745 0 010 1.075.75.75 0 01-1.06 0l-2.44-2.44-2.425 2.44a.75.75 0 01-1.075 0 .745.745 0 010-1.06L13.44 12 11 9.575A.76.76 0 0112.075 8.5l2.425 2.44 2.425-2.44A.76.76 0 0118 9.575L15.56 12 18 14.425z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M20 3.5a3.01 3.01 0 012.995 2.824L23 6.5v11a3.01 3.01 0 01-2.824 2.995L20 20.5H8L.5 12 8 3.5h12zM20 5H8.7l-6.2 7 6.2 7H20c.8 0 1.423-.576 1.493-1.352l.007-.148v-11c0-.8-.576-1.423-1.352-1.493L20 5zm-8.95 3.5a.722.722 0 01.965-.074l.085.074 2.4 2.45 2.45-2.45c.3-.3.75-.3 1.05 0a.742.742 0 01.03 1.021L15.55 12l2.35 2.4c.3.3.3.75 0 1.05a.722.722 0 01-.965.074l-.085-.074-2.4-2.4-2.4 2.4c-.3.3-.75.3-1.05 0a.722.722 0 01-.074-.965L11 14.4l2.45-2.45-2.4-2.4c-.3-.3-.3-.75 0-1.05z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-backspace", {
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
  const components = ["scale-icon-action-backspace"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-backspace":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionBackspace);
      }
      break;
  } });
}

const ScaleIconActionBackspace = ActionBackspace;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionBackspace, defineCustomElement };
