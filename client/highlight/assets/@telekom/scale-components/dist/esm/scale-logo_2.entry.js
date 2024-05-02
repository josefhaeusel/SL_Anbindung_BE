import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';
import { c as classnames } from './index-713f92a5.js';
import { s as statusNote } from './status-note-0089e9c9.js';

const logoCss = ":host{--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--background-magenta:var(--telekom-color-background-canvas);--background-white:var(--telekom-color-primary-standard)}[part~='logo']{display:inline-flex;height:var(--logo-size);position:relative}[part~='logo']:focus,[part~='logo']:focus-visible{outline:var(--focus-outline);outline-offset:2px;border-radius:2px}[part~='variant-magenta']{background-color:var(--background-magenta)}[part~='variant-white']{background-color:var(--background-white)}[part~='transparent']{background-color:transparent}[part~='icon'] svg{height:var(--logo-size)}[part~='icon']:focus-visible{outline:none}[part~='icon'] svg:focus{outline:none}";

const Logo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get hostElement() { return getElement(this); }
};
Logo.style = logoCss;

let i = 0;
const colors = {
  magenta: '#e20074',
  white: '#ffffff',
};
const LogoSvg = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get hostElement() { return getElement(this); }
};

export { Logo as scale_logo, LogoSvg as scale_logo_svg };
