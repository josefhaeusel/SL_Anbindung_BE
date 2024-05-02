'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ContentFlexibleTariffs = class {
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
    return (index.h(index.Host, null, index.h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && index.h("title", null, this.accessibilityTitle), index.h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (index.h("g", null, index.h("path", { d: "M7.205 8.69L5.92 10.66l2.685 1.755A10.17 10.17 0 0112 16.08a10.175 10.175 0 013.095-3.458l.3-.202 2.685-1.755-1.285-1.97h6.57l-2.69 6.02-1.285-1.97-2.685 1.755a7.725 7.725 0 00-3.496 6.22l-.004.28v1.275a1.255 1.255 0 01-.138.586l-.067.114V23a1 1 0 01-.17.21l-.105.085H12.7a1.256 1.256 0 01-.488.19l-.132.015H12l-.14-.006a1.255 1.255 0 01-.915-.544.455.455 0 01-.045-.085 1.09 1.09 0 01-.147-.396l-.015-.179.002-.04V21l-.004-.28a7.725 7.725 0 00-3.264-6.063L7.24 14.5l-2.685-1.75-1.285 1.97L.635 8.69h6.57zM12 1l3.6 5.5h-2.35v6.25a1.25 1.25 0 01-2.494.128l-.006-.128V6.5H8.4L12 1z", "fill-rule": "evenodd" }))) : (index.h("g", null, index.h("path", { d: "M7.2 8.5l-1.55 2.4 2.7 1.75c1.65 1.1 2.9 2.6 3.65 4.4.659-1.647 1.85-3.117 3.363-4.201l.287-.199 2.7-1.75-1.55-2.4h6.65l-2.65 6-1.55-2.4-2.7 1.75c-2.269 1.497-3.652 3.925-3.745 6.611l-.005.289v1.45a.772.772 0 01-.651.743l-.099.007-.099-.007a.778.778 0 01-.644-.644L11.3 22.2v-1.45l-.005-.289c-.09-2.59-1.379-4.94-3.505-6.447l-.24-.164-2.7-1.75-1.55 2.4-2.65-6H7.2zM12 1l3.6 5.5h-2.85v6.55c0 .4-.35.75-.75.75a.772.772 0 01-.743-.651l-.007-.099V6.5H8.4L12 1z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return index.getElement(this); }
};
ContentFlexibleTariffs.style = iconCss;

exports.scale_icon_content_flexible_tariffs = ContentFlexibleTariffs;
