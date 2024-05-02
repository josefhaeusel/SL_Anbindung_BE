import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionCompare = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M12 2a.75.75 0 01.743.648l.007.102v18.5a.75.75 0 01-1.493.102l-.007-.102V2.75A.75.75 0 0112 2zM2 7.582L8.75 12 2 16.418V7.582zm20 0v8.836L15.25 12 22 7.582z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12 2a.75.75 0 01.743.648l.007.102v18.5a.75.75 0 01-1.493.102l-.007-.102V2.75A.75.75 0 0112 2zM2 7.582L8.75 12 2 16.418V7.582zm20 0v8.836L15.25 12 22 7.582z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-compare", {
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
  const components = ["scale-icon-action-compare"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-compare":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionCompare);
      }
      break;
  } });
}

const ScaleIconActionCompare = ActionCompare;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionCompare, defineCustomElement };
