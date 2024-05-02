import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const NavigationDoubleRight = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M5.943 18.488l8.224-6.485-8.224-6.485A1.25 1.25 0 004.395 7.48l5.735 4.522-5.735 4.522a1.249 1.249 0 00.775 2.232c.27 0 .544-.088.773-.27m5.838.27a1.249 1.249 0 01-.775-2.232l5.735-4.522-5.735-4.522a1.25 1.25 0 011.548-1.963l8.224 6.485-8.224 6.485a1.243 1.243 0 01-.773.269", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M12.327 5.911a.75.75 0 10-.93 1.178L17.62 12l-6.222 4.911a.75.75 0 10.931 1.177L20.04 12l-7.712-6.089zm-6.69 0a.75.75 0 10-.93 1.178L10.927 12l-6.22 4.911a.75.75 0 00.93 1.177L13.347 12 5.636 5.911z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-navigation-double-right", {
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
  const components = ["scale-icon-navigation-double-right"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-navigation-double-right":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NavigationDoubleRight);
      }
      break;
  } });
}

export { NavigationDoubleRight as N, defineCustomElement as d };
