import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionHidePassword = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M3.815 2.776l.085.074L21.15 20.1c.3.3.3.75 0 1.05a.722.722 0 01-.965.074l-.085-.074L2.85 3.9c-.3-.3-.3-.75 0-1.05a.722.722 0 01.965-.074zM4.2 7.35L5.25 8.4l-.018.017 2.423 2.423A4.67 4.67 0 007.5 12a4.5 4.5 0 004.5 4.5 4.67 4.67 0 00.874-.089l.286-.066 2.285 2.28-.015.005.57.57c-1.2.5-2.5.8-4 .8-4.108 0-6.987-2.283-9.1-4.68l-.364-.425-.35-.423-.334-.421-.476-.62-.726-.981L.3 12l.35-.45.595-.806C1.969 9.776 2.8 8.73 3.774 7.76l.426-.41zM12 4c4.108 0 6.987 2.283 9.1 4.68l.364.425.35.423.334.421.476.62.726.981.35.45-.35.45-.595.806c-.724.968-1.555 2.014-2.529 2.983l-.426.411-1.05-1.05.018-.017-2.423-2.423c.1-.379.152-.768.155-1.16A4.5 4.5 0 0012 7.5a4.67 4.67 0 00-.874.089l-.286.066-2.285-2.28.015-.005L8 4.8c1.2-.5 2.5-.8 4-.8zm-3 8.19l2.8 2.8a3 3 0 01-2.783-2.621L9 12.19zm3.2-3.18a3 3 0 012.783 2.621l.017.179-2.8-2.8z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M2.85 2.85a.722.722 0 01.965-.074l.085.074L21.15 20.1c.3.3.3.75 0 1.05a.722.722 0 01-.965.074l-.085-.074L2.85 3.9c-.3-.3-.3-.75 0-1.05zm1.35 4.5L5.25 8.4c-1.1 1.05-2.1 2.3-3.05 3.6l.578.778.39.506.397.494C5.766 16.458 8.287 18.5 12 18.5c.919 0 1.76-.115 2.527-.345l.323-.105L16 19.2c-1.2.5-2.5.8-4 .8-4.108 0-6.987-2.283-9.1-4.68l-.364-.425-.35-.423-.334-.421-.476-.62-.726-.981L.3 12l.35-.45.595-.806C1.969 9.776 2.8 8.73 3.774 7.76l.426-.41zM12 4c4.108 0 6.987 2.283 9.1 4.68l.364.425.35.423.334.421.476.62.726.981.35.45-.35.45-.595.806c-.724.968-1.555 2.014-2.529 2.983l-.426.411-1.05-1.05c1.1-1.05 2.1-2.3 3.05-3.6l-.578-.778-.39-.506-.397-.494C18.234 7.542 15.713 5.5 12 5.5c-.919 0-1.76.115-2.527.345l-.323.105L8 4.8c1.2-.5 2.5-.8 4-.8zm-4.35 6.85l5.5 5.5c-.35.1-.75.15-1.15.15-2.5 0-4.5-2-4.5-4.5 0-.32.032-.64.096-.934l.054-.216zM12 7.5c2.5 0 4.5 2 4.5 4.5 0 .32-.032.64-.096.934l-.054.216-5.5-5.5c.35-.1.75-.15 1.15-.15z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-hide-password", {
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
  const components = ["scale-icon-action-hide-password"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-hide-password":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionHidePassword);
      }
      break;
  } });
}

export { ActionHidePassword as A, defineCustomElement as d };
