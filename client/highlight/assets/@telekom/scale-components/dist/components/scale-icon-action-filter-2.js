import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionFilter2 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M22 2H2v3.568c0 1.233.507 2.413 1.4 3.263L9 14.15v9.35l6-3v-6.35l5.6-5.319c.893-.85 1.4-2.03 1.4-3.263V2z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M22 2H2v3.568c0 1.233.507 2.413 1.4 3.263L9 14.15v9.35l6-3v-6.35l5.6-5.319c.893-.85 1.4-2.03 1.4-3.263V2zm-1.5 1.5v2.068c0 .819-.34 1.612-.934 2.175l-5.598 5.32-.468.443v6.067l-3 1.5v-7.567l-.467-.443-5.599-5.32A3.009 3.009 0 013.5 5.568V3.5h17z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-filter-2", {
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
  const components = ["scale-icon-action-filter-2"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-filter-2":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionFilter2);
      }
      break;
  } });
}

const ScaleIconActionFilter2 = ActionFilter2;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionFilter2, defineCustomElement };
