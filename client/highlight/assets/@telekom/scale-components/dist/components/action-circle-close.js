import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionCircleClose = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11A11 11 0 0012 1zm4.065 14a.745.745 0 010 1.06.75.75 0 01-1.06 0l-3-3-3 3a.755.755 0 01-.53.22.75.75 0 01-.54-1.28l3-3-3-3A.753.753 0 019 7.935l3 3 3-3A.753.753 0 0116.065 9l-3 3 3 3z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1zm0 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zM7.95 7.95a.722.722 0 01.965-.074L9 7.95l3 3 3-3c.3-.3.75-.3 1.05 0 .273.273.298.67.074.965L16.05 9l-3 3 3 3c.3.3.3.75 0 1.05a.722.722 0 01-.965.074L15 16.05l-3-3-3 3c-.3.3-.75.3-1.05 0a.722.722 0 01-.074-.965L7.95 15l3-3-3-3c-.3-.3-.3-.75 0-1.05z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-circle-close", {
    "size": [514],
    "fill": [1],
    "color": [1],
    "selected": [516],
    "decorative": [4],
    "accessibilityTitle": [1, "accessibility-title"],
    "focusable": [4]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-icon-action-circle-close"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-circle-close":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionCircleClose);
      }
      break;
  } });
}

export { ActionCircleClose as A, defineCustomElement as d };
