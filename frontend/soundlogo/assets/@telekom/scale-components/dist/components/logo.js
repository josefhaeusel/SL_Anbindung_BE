import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { s as statusNote } from './status-note.js';
import { d as defineCustomElement$1 } from './logo-svg.js';

const logoCss = ":host{--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--background-magenta:var(--telekom-color-background-canvas);--background-white:var(--telekom-color-primary-standard)}[part~='logo']{display:inline-flex;height:var(--logo-size);position:relative}[part~='logo']:focus,[part~='logo']:focus-visible{outline:var(--focus-outline);outline-offset:2px;border-radius:2px}[part~='variant-magenta']{background-color:var(--background-magenta)}[part~='variant-white']{background-color:var(--background-white)}[part~='transparent']{background-color:transparent}[part~='icon'] svg{height:var(--logo-size)}[part~='icon']:focus-visible{outline:none}[part~='icon'] svg:focus{outline:none}";

const Logo = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** (optional) Variant/color of the logo text and logo */
    this.variant = 'magenta';
    /** (optional) Set transparent background */
    this.transparent = false;
    /** (optional) The height in pixels */
    this.size = 38;
    /** (optional) Set a link */
    this.href = 'javascript:void(0);';
    this.focusable = true;
    this.scrollIntoViewOnFocus = false;
    /** (optional) set logo specific title */
    this.logoTitle = 'Telekom Logo';
    /** FIXME this is also probably not working properly, see below (it needs a string value) */
    this.logoAriaHidden = false;
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
    if (this.language) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "language" is deprecated. Localized brand claim is not shown anymore.',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  render() {
    return (h(Host, { exportparts: "logo-svg" }, h("style", null, this.size ? `:host { --logo-size: ${this.size}px; }` : '', this.styles), h("a", { href: this.href, part: this.getCssClassMap(), tabindex: this.focusable === false ? '-1' : '0', onFocus: () => {
        if (this.scrollIntoViewOnFocus === true) {
          window.scrollTo({ top: 0 });
        }
      }, title: this.logoHideTitle ? undefined : this.logoTitle, "aria-describedby": this.logoAriaDescribedBy, "aria-hidden": this.logoAriaHidden }, h("scale-logo-svg", { part: "icon", color: this.variant, logoTitle: this.logoTitle, logoHideTitle: this.logoHideTitle }))));
  }
  getCssClassMap() {
    return classnames(`logo`, this.variant && `variant-${this.variant}`, this.transparent && `transparent`);
  }
  get hostElement() { return this; }
  static get style() { return logoCss; }
}, [1, "scale-logo", {
    "variant": [1],
    "transparent": [4],
    "language": [1],
    "size": [2],
    "href": [1],
    "accessibilityTitle": [1, "accessibility-title"],
    "styles": [1],
    "focusable": [4],
    "scrollIntoViewOnFocus": [4, "scroll-into-view-on-focus"],
    "logoTitle": [1, "logo-title"],
    "logoHideTitle": [4, "logo-hide-title"],
    "logoAriaDescribedBy": [1, "logo-aria-described-by"],
    "logoAriaHidden": [4, "logo-aria-hidden"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-logo", "scale-logo-svg"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-logo":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Logo);
      }
      break;
    case "scale-logo-svg":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { Logo as L, defineCustomElement as d };
