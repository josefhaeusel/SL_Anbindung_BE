import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionReplyForward = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M4.72 7.506H15V10.5l6.87-4.25L15 2v3.006H4.72a1.25 1.25 0 000 2.5m7.114 4.995H10.5V9.5l-6.87 4.25L10.5 18v-3h1.334a6.167 6.167 0 016.159 6.16 1.25 1.25 0 102.5 0c0-4.774-3.885-8.66-8.66-8.66", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M4.238 7H15v3.5l6.871-4.25L15.001 2v3.5H4.237a.75.75 0 100 1.5m8.14 6H10.5V9.5l-6.87 4.25L10.5 18v-3.5h1.878a6.666 6.666 0 016.66 6.659.75.75 0 101.5 0c0-4.499-3.66-8.159-8.16-8.159", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-reply-forward", {
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
  const components = ["scale-icon-action-reply-forward"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-reply-forward":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionReplyForward);
      }
      break;
  } });
}

const ScaleIconActionReplyForward = ActionReplyForward;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionReplyForward, defineCustomElement };
