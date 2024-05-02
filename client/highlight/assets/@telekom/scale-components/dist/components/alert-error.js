import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const AlertError = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M23.075 18L14.6 3.32a3 3 0 00-5.2 0L.925 18a3 3 0 002.6 4.5H20.5a3 3 0 002.575-4.5zM11 8.25h2v6.5h-2v-6.5zm1 10.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M11.95 1.8c.938 0 1.875.44 2.483 1.318l.117.182 8.5 14.7c1.17 1.951-.18 4.378-2.383 4.496l-.167.004H3.55c-2.243 0-3.677-2.377-2.681-4.35L.95 18l8.4-14.7c.6-1 1.6-1.5 2.6-1.5zm.105 1.5h-.11a1.431 1.431 0 00-1.155.61l-.09.14-8.5 14.7c-.343.6-.208 1.09-.068 1.375l.068.125.077.12c.167.24.48.57 1.058.623L3.5 21h17c.75 0 1.15-.5 1.25-.75l.068-.125a1.47 1.47 0 00.048-1.227l-.066-.148-8.5-14.7c-.32-.56-.8-.704-1.107-.74l-.138-.01zM12 16.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm1-8V15h-2V8.5h2z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-alert-error", {
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
  const components = ["scale-icon-alert-error"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-alert-error":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AlertError);
      }
      break;
  } });
}

export { AlertError as A, defineCustomElement as d };
