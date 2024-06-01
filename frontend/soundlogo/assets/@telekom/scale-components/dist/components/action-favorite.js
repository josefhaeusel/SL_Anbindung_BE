import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const ActionFavorite = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M22.614 9.215a1.713 1.713 0 00-1.51-1.184l-5.451-.399-2.065-5.061a1.713 1.713 0 00-1.592-1.07c-.702 0-1.327.42-1.592 1.07L8.339 7.633l-5.451.398c-.7.052-1.293.516-1.51 1.184a1.712 1.712 0 00.526 1.845l4.176 3.527-1.305 5.308a1.715 1.715 0 00.659 1.802c.567.413 1.32.44 1.917.07l4.645-2.881 4.646 2.881a1.716 1.716 0 002.575-1.871l-1.305-5.309 4.175-3.527a1.714 1.714 0 00.527-1.845", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M22.613 9.215a1.713 1.713 0 00-1.51-1.184l-5.451-.399-2.064-5.061a1.713 1.713 0 00-1.592-1.07c-.703 0-1.327.42-1.593 1.07L8.34 7.633l-5.452.398c-.7.052-1.292.516-1.51 1.184a1.712 1.712 0 00.526 1.845l4.176 3.527-1.304 5.308a1.715 1.715 0 00.658 1.802c.568.413 1.321.44 1.918.07l4.644-2.881 4.646 2.881a1.716 1.716 0 002.575-1.871l-1.305-5.309 4.176-3.527a1.714 1.714 0 00.526-1.845zm-1.494.699l-4.886 4.127 1.527 6.212c.03.119-.03.19-.084.23a.203.203 0 01-.244.009l-5.436-3.372-5.436 3.372a.206.206 0 01-.245-.009.206.206 0 01-.084-.23l1.527-6.211-4.886-4.128a.205.205 0 01-.067-.235.206.206 0 01.192-.151l6.38-.468 2.416-5.923a.205.205 0 01.203-.136c.067 0 .156.024.203.137l2.416 5.922 6.38.468a.206.206 0 01.192.151.206.206 0 01-.068.235z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return this; }
  static get style() { return iconCss; }
}, [0, "scale-icon-action-favorite", {
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
  const components = ["scale-icon-action-favorite"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-icon-action-favorite":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ActionFavorite);
      }
      break;
  } });
}

export { ActionFavorite as A, defineCustomElement as d };
