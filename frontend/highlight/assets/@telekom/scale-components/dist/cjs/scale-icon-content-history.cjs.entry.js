'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentHistory = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M12 1.25a10.75 10.75 0 012.31 21.25 1.255 1.255 0 11-.52-2.455 8.24 8.24 0 10-7.214-1.856l.214.181 1.315-2 2.68 6.13H4.11l1.305-2A10.75 10.75 0 0112 1.25zm0 4a.75.75 0 01.743.648L12.75 6v5.55l3.85 2.035a.75.75 0 01-.588 1.376l-.112-.046-4.65-2.465V6a.75.75 0 01.75-.75z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M12 1.75c5.65 0 10.25 4.6 10.3 10.3 0 4.657-3.268 8.833-7.778 9.937l-.272.063h-.15c-.35 0-.65-.25-.75-.6-.1-.4.15-.8.55-.9 3.95-.85 6.85-4.45 6.85-8.55 0-4.8-3.95-8.75-8.75-8.75S3.25 7.2 3.25 12c0 2.548 1.156 4.957 3.023 6.606l.227.194 1.55-2.4 2.7 6.1H4.1l1.6-2.45C3.25 18.15 1.75 15.2 1.75 12 1.75 6.35 6.35 1.75 12 1.75zm0 3.5c.367 0 .691.294.743.651L12.75 6v5.55l3.85 2.05c.35.2.5.65.3 1-.1.25-.4.4-.65.4a.814.814 0 01-.267-.063L15.9 14.9l-4.65-2.45V6c0-.4.35-.75.75-.75z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ContentHistory.style = iconCss;

exports.scale_icon_content_history = ContentHistory;
