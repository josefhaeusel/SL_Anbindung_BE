import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const CommunicationMessageOutgoing = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M19.506 3v6.697l-.841-.551a1.195 1.195 0 00-1.227-.052 1.2 1.2 0 00-.623.925l-.007.131v1.65h-2.55c-1.075 0-1.95.875-1.95 1.95 0 1.026.797 1.87 1.805 1.945l.145.005h2.55v1.65l.008.076.012.074h-6.203l-3.274 3.274a1.63 1.63 0 01-1.167.491c-.81 0-1.591-.597-1.671-1.514l-.007-.155V17.5H3.363a2.857 2.857 0 01-2.852-2.69l-.005-.167V3h19zm-1.498 7.15l5.5 3.6-5.5 3.6V14.5h-3.75a.75.75 0 01-.102-1.493l.102-.007h3.75v-2.85z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M19.5 3v6.339L18 8.357V4.5H2v10.143c0 .704.54 1.285 1.227 1.35l.13.007H6v3.596c0 .134.165.237.285.117L9.998 16H16.5v1.5h-5.881l-3.274 3.274a1.63 1.63 0 01-1.167.491c-.81 0-1.591-.597-1.671-1.514l-.007-.155V17.5H3.357a2.857 2.857 0 01-2.852-2.69L.5 14.644V3h19zM18 10.15l5.5 3.6-5.5 3.6V14.5h-3.75a.75.75 0 01-.102-1.493L14.25 13H18v-2.85z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
CommunicationMessageOutgoing.style = iconCss;

export { CommunicationMessageOutgoing as scale_icon_communication_message_outgoing };
