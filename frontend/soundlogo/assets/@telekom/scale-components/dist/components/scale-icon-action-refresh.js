import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionRefresh = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M14.191 1.677l.119.013A10.635 10.635 0 0122.565 12a10.615 10.615 0 01-3.804 8.123l-.261.212 1.39 2.165h-6.675l2.68-6.13 1.42 2.175a8.435 8.435 0 00-3.47-14.78 1.065 1.065 0 01.346-2.088zM10.785 1.5l-2.68 6.13L6.68 5.45a8.44 8.44 0 003.19 14.716l.285.069h-.02a1.065 1.065 0 01-.235 2.1 1.245 1.245 0 01-.23-.025A10.56 10.56 0 015.255 3.861l.245-.196L4.11 1.5h6.675z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M13.35 2.55c.1-.4.5-.65.9-.55 4.65 1.05 8 5.25 8 10 0 3.041-1.398 5.943-3.745 7.895l-.255.205 1.6 2.4H13.2l2.7-6.15 1.6 2.45c2-1.65 3.25-4.15 3.25-6.8 0-4.05-2.9-7.65-6.85-8.55-.4-.1-.65-.5-.55-.9zM10.8 1.5L8.1 7.65 6.5 5.2c-2 1.6-3.25 4.1-3.25 6.8 0 4.05 2.9 7.65 6.85 8.55A.745.745 0 119.75 22c-4.65-1.05-8-5.25-8-10 0-3.09 1.398-5.946 3.7-7.895L5.7 3.9 4.1 1.5h6.7z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-refresh", {
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
  const components = ["scale-icon-action-refresh"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-refresh":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionRefresh);
      }
      break;
  } });
}

const ScaleIconActionRefresh = ActionRefresh;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionRefresh, defineCustomElement };
