import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const UserFileFile = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M21 17.5L15.5 23v-4a1.5 1.5 0 011.356-1.493L17 17.5h4zM21 1v15.5h-4a2.5 2.5 0 00-2.495 2.336L14.5 19v4H6a3 3 0 01-2.995-2.824L3 20V1h18z", "fill-rule": "evenodd" }))) : (h("g", null, h("defs", null, h("path", { d: "M3 1v19c0 1.65 1.35 3 3 3h10l5-5V1H3zm1.5 19V2.5h15V17h-3c-.85 0-1.5.65-1.5 1.5v3H6c-.85 0-1.5-.65-1.5-1.5z", id: "a" }), h("path", { id: "c", d: "M0 0h12.002v16H0z" })), h("g", { fill: "none", "fill-rule": "evenodd" }, h("mask", { id: "b", fill: "#fff" }, h("use", { xlinkHref: "#a" })), h("use", { fill: "#000", xlinkHref: "#a" }), h("g", { mask: "url(#b)" }, h("g", { transform: "translate(6 4)" }, h("mask", { id: "d", fill: "#fff" }, h("use", { xlinkHref: "#c" })), h("path", { d: "M10.131 15h-8.25a.94.94 0 01-.88-.996V2a.94.94 0 01.876-1h4.124v5a.5.5 0 00.5.5h4.5V14a.94.94 0 01-.87 1zm.46-9.5h-3.59V1.58l3.59 3.92zm1.28-.09L7.061.16a.518.518 0 00-.37-.16h-4.81a1.94 1.94 0 00-1.88 1.998V14a1.94 1.94 0 001.878 2h8.252a1.94 1.94 0 001.87-2V5.75a.53.53 0 00-.13-.34z", fill: "#000", mask: "url(#d)" }))))))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-user-file-file", {
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
  const components = ["scale-icon-user-file-file"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-user-file-file":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, UserFileFile);
      }
      break;
  } });
}

const ScaleIconUserFileFile = UserFileFile;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconUserFileFile, defineCustomElement };
