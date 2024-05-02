import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { s as statusNote } from './status-note.js';

const navSegmentCss = "scale-nav-segment{--transition:all 0.2s ease-in-out;--color:var(--telekom-color-text-and-icon-white-standard);--spacing-y:var(--telekom-spacing-composition-space-03);--font-size:var(--telekom-typography-font-size-caption);--font-weight:var(--telekom-typography-font-weight-extra-bold);--line-height:var(--telekom-typography-line-spacing-extra-tight);--border-bottom:1px solid var(--telekom-color-text-and-icon-white-standard);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard)}.sr-only{position:absolute;left:-10000px;overflow:hidden}.segment-navigation__item{list-style:none}.segment-navigation__item-link{color:var(--color);padding:var(--spacing-y) 0;font-size:var(--font-size);font-weight:var(--font-weight);line-height:var(--line-height);transition:var(--transition);text-decoration:none}.segment-navigation__item-link:hover,.segment-navigation__item-link.active{border-bottom:var(--border-bottom);transition:var(--transition)}.segment-navigation__item-link:focus{outline:var(--focus-outline)}";

const NavSegment = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** (optional) href value */
    this.href = 'javascript:void(0);';
  }
  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.isActive !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "isActive" is deprecated. Please use the "active" property!',
        type: 'warn',
        source: this.host,
      });
    }
  }
  render() {
    return (h("li", { class: this.getCssClassMap() }, h("a", { class: classnames('segment-navigation__item-link', (this.active || this.isActive) && 'active'), href: this.href, onFocus: () => {
        window.scrollTo({ top: 0 });
      }, "aria-current": this.active || this.isActive ? 'true' : 'false' }, h("slot", null), (this.active || this.isActive) && (h("span", { class: "sr-only" }, "active")))));
  }
  getCssClassMap() {
    return classnames('segment-navigation__item');
  }
  get host() { return this; }
  static get style() { return navSegmentCss; }
}, [4, "scale-nav-segment", {
    "isActive": [4, "is-active"],
    "active": [4],
    "href": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-nav-segment"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-nav-segment":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NavSegment);
      }
      break;
  } });
}

export { NavSegment as N, defineCustomElement as d };
