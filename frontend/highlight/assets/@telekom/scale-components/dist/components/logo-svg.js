import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as statusNote } from './status-note.js';

let i = 0;
const colors = {
  magenta: '#e20074',
  white: '#ffffff',
};
const LogoSvg = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** (optional) Sets the icon color via the `fill` attribute */
    this.color = 'magenta';
    this.innerRole = 'img';
    this.focusable = true;
    this.getTitle = (title, linkAddition) => {
      if (!this.logoHideTitle) {
        return this.logoTitle ? (h("title", { id: `logo-title-${i}` }, this.logoTitle)) : (h("title", { id: `logo-title-${i}` }, `${title} ${this.innerRole === 'link' ? linkAddition : ''}`));
      }
    };
  }
  componentWillLoad() {
    i++;
  }
  componentDidRender() {
    if (this.accessibilityTitle) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "accessibilityTitle" is deprecated. Please use the "logoTitle" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  getColor() {
    return this.color === 'magenta' || 'white'
      ? colors[this.color]
      : this.color;
  }
  render() {
    return (h(Host, null, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 38", part: "logo-svg", fill: this.getColor(), role: this.innerRole === 'link' ? null : 'img', "aria-labelledby": `logo-title-${i}` }, this.getTitle('Telekom Logo', '- Go to Start Page'), h("path", { d: "M7.6 25.1H0v-7.6h7.6v7.6ZM0 0v12.9h2.3v-.4c0-6.1 3.4-9.9 9.9-9.9h.4V30c0 3.8-1.5 5.3-5.3 5.3H6.1V38h19.8v-2.7h-1.1c-3.8 0-5.3-1.5-5.3-5.3V2.7h.4c6.5 0 9.9 3.8 9.9 9.9v.4h2.3V0H0Zm24.3 25.1h7.6v-7.6h-7.6v7.6Z" }))));
  }
  get hostElement() { return this; }
}, [0, "scale-logo-svg", {
    "color": [1],
    "innerRole": [1, "inner-role"],
    "focusable": [4],
    "accessibilityTitle": [1, "accessibility-title"],
    "logoTitle": [1, "logo-title"],
    "logoHideTitle": [4, "logo-hide-title"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-logo-svg"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-logo-svg":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, LogoSvg);
      }
      break;
  } });
}

export { LogoSvg as L, defineCustomElement as d };
