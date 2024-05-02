import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionBackward = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M16.75 8.5H9.5V5.33L2.75 9.75l6.75 4.42V11h7.25a2.75 2.75 0 110 5.5h-4a1.25 1.25 0 000 2.5h4a5.25 5.25 0 000-10.5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M16.75 9H9.5V5.332L2.75 9.75l6.75 4.418V10.5h7.25A3.254 3.254 0 0120 13.75 3.254 3.254 0 0116.75 17h-4a.75.75 0 100 1.5h4a4.756 4.756 0 004.75-4.75A4.756 4.756 0 0016.75 9z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-backward", {
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
  const components = ["scale-icon-action-backward"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-backward":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionBackward);
      }
      break;
  } });
}

const ScaleIconActionBackward = ActionBackward;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionBackward, defineCustomElement };
