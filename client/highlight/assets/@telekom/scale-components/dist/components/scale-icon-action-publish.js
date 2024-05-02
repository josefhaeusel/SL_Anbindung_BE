import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionPublish = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M12 9.125l3.275 5H12.73v7.625a.75.75 0 01-1.493.102l-.007-.102v-7.625h-2.5l3.27-5zM21 3.5V16a3 3 0 01-2.698 2.987l-.177.013H14.25v-3.375h1.035a1.5 1.5 0 001.337-2.178l-.082-.142-3.275-5a1.5 1.5 0 00-2.411-.12l-.089.12-3.275 5a1.5 1.5 0 001.11 2.313l.15.007h1V19H6a3 3 0 01-2.995-2.824L3 16V3.5h18zM5 4.375a.625.625 0 100 1.25.625.625 0 000-1.25zm2 0a.625.625 0 100 1.25.625.625 0 000-1.25zm2 0a.625.625 0 100 1.25.625.625 0 000-1.25z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12 8.25L16.42 15h-3.67v6.75a.75.75 0 01-1.493.102l-.007-.102V15H7.582l4.419-6.75zm9-4.75V16a3 3 0 01-2.824 2.995L18 19h-2v-1.5h2c.778 0 1.42-.596 1.493-1.356L19.5 16V6.5h-15V16c0 .778.596 1.42 1.356 1.493L6 17.5h2V19H6a3 3 0 01-2.995-2.824L3 16V3.5h18zM5 4.375a.625.625 0 100 1.25.625.625 0 000-1.25zm2 0a.625.625 0 100 1.25.625.625 0 000-1.25zm2 0a.625.625 0 100 1.25.625.625 0 000-1.25z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-publish", {
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
  const components = ["scale-icon-action-publish"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-publish":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionPublish);
      }
      break;
  } });
}

const ScaleIconActionPublish = ActionPublish;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconActionPublish, defineCustomElement };
