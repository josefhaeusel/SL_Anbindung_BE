'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const WeatherMoonClear = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M15.969 17.442c-.649-.252-3.322-1.348-4.553-4.569-1.531-4.01.61-7.204 1.754-8.37l.031-.029a7.877 7.877 0 012.181-1.556l-.006-.001A9.404 9.404 0 004.32 8.968a9.368 9.368 0 00-.218 5.499 9.398 9.398 0 004.22 5.649 9.339 9.339 0 006.245 1.271 9.327 9.327 0 006.14-3.636 7.93 7.93 0 01-4.739-.31z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M15.969 17.442c-.649-.252-3.322-1.348-4.553-4.569-1.531-4.01.61-7.204 1.754-8.37l.031-.029a7.877 7.877 0 012.181-1.556l-.006-.001A9.404 9.404 0 004.32 8.968a9.368 9.368 0 00-.218 5.499 9.398 9.398 0 004.22 5.649 9.339 9.339 0 006.245 1.271 9.327 9.327 0 006.14-3.636 7.93 7.93 0 01-4.739-.31z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
WeatherMoonClear.style = iconCss;

exports.scale_icon_weather_moon_clear = WeatherMoonClear;
