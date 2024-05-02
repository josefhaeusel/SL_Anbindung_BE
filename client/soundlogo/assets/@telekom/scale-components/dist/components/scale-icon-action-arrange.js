import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionArrange = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M5.25 1l3.6 5.5H6.5V17h2.35l-3.6 5.5-3.6-5.5H4V6.5H1.65L5.25 1zm15.499 15.52a1.25 1.25 0 01.128 2.494l-.128.007H11v-2.5h9.749zM11 10.477l9.753.034a1.25 1.25 0 01.123 2.494l-.132.006L11 12.976v-2.5zM20.749 4.5a1.25 1.25 0 01.128 2.493L20.749 7H11V4.5h9.749z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M22 5.75a.75.75 0 00-.75-.75H11v1.5h10.25a.75.75 0 00.75-.75zM8.85 6.5L5.25 1l-3.6 5.5H4.5V17H1.65l3.6 5.5 3.6-5.5H6V6.5h2.85zm12.4 4.5H11v1.5h10.25a.75.75 0 100-1.5zm0 6H11v1.5h10.25a.75.75 0 100-1.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-arrange", {
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
  const components = ["scale-icon-action-arrange"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-arrange":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionArrange);
      }
      break;
  } });
}

const ScaleIconActionArrange = ActionArrange;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionArrange, defineCustomElement };
