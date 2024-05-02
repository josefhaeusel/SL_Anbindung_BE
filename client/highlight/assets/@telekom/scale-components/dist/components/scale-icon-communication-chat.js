import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const CommunicationChat = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M3.5 8.5V10a1.5 1.5 0 00-1.493 1.356L2 11.5v5a1.5 1.5 0 001.356 1.493L3.5 18H5v2.32L7.32 18H12a1.5 1.5 0 00.999-.388l.111-.112h.275l.92.92a3 3 0 01-2.1 1.073L12 19.5H7.94l-2.375 2.355a1.21 1.21 0 01-2.058-.723L3.5 21v-1.5a3 3 0 01-2.995-2.824L.5 16.5v-5a3 3 0 012.824-2.995L3.5 8.5zm19.5-6V13a3 3 0 01-2.824 2.995L20 16h-.5v1.875a1.5 1.5 0 01-2.453 1.162l-.112-.102L14 16H8a3 3 0 01-2.995-2.824L5 13V2.5h18z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M3.5 8.5V10c-.8 0-1.423.576-1.493 1.352L2 11.5v5c0 .8.576 1.423 1.352 1.493L3.5 18H5v2.3L7.3 18h5c.394 0 .71-.153.985-.392l.115-.108 1.05 1.05a3.027 3.027 0 01-1.94.893l-.21.007H7.95l-2.4 2.4c-.25.25-.55.35-.85.35-.563 0-1.125-.396-1.193-1.063L3.5 21v-1.5a3.01 3.01 0 01-2.995-2.824L.5 16.5v-5a3.01 3.01 0 012.824-2.995L3.5 8.5zm19.5-6V13a3.01 3.01 0 01-2.824 2.995L20 16h-.5v1.9c0 .9-.75 1.5-1.5 1.5-.306 0-.65-.115-.933-.345l-.117-.105L14 16H8a3.01 3.01 0 01-2.995-2.824L5 13V2.5h18zM21.5 4h-15v9c0 .8.576 1.423 1.352 1.493L8 14.5h6.65L18 17.85V14.5h2c.8 0 1.423-.576 1.493-1.352L21.5 13V4z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-communication-chat", {
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
  const components = ["scale-icon-communication-chat"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-communication-chat":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CommunicationChat);
      }
      break;
  } });
}

const ScaleIconCommunicationChat = CommunicationChat;
const defineCustomElement = defineCustomElement$1;

export { ScaleIconCommunicationChat, defineCustomElement };
