import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { s as statusNote } from './status-note.js';
import { d as defineCustomElement$2 } from './navigation-collapse-down.js';

const sidebarNavCss = ":host{--max-width:15rem;--spacing-indent:var(--telekom-spacing-composition-space-08);--spacing-collapsible:var(--telekom-spacing-composition-space-06);--opacity-chevron:0;--left-current-border:0;--color-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-active:var(--telekom-color-text-and-icon-primary-pressed);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--color-toggle-button:var(--telekom-color-ui-regular);--border-y-toggle-button:1px solid var(--telekom-color-ui-faint);--radius-toggle-button:var(--telekom-radius-small)}.sidebar-nav--collapsible{--max-width:none;--spacing-indent:0;--opacity-chevron:1;--left-current-border:calc(-1 * var(--spacing-collapsible));padding-right:var(--spacing-collapsible);padding-left:var(--spacing-collapsible)}.sidebar-nav__list{list-style:none;max-width:var(--max-width);padding-left:0;margin-top:0;margin-bottom:0}.sidebar-nav__toggle-button{box-sizing:border-box;appearance:none;border:0;background-color:transparent;color:var(--color-toggle-button);width:100%;display:flex;justify-content:space-between;align-items:center;text-align:left;text-decoration:none;font-family:inherit;font-size:1rem;padding-top:1rem;padding-right:calc(0.5 * var(--spacing-indent));padding-bottom:1rem;padding-left:var(--spacing-indent);border-radius:var(--radius-toggle-button);border-bottom:var(--border-y-toggle-button);border-top:var(--border-y-toggle-button);cursor:pointer}.sidebar-nav__toggle-button:hover{color:var(--color-hover)}.sidebar-nav__toggle-button:active{color:var(--color-active)}.sidebar-nav__toggle-button:focus{outline:var(--focus-outline)}[aria-expanded='true'] .sidebar-nav__icon{transform:rotate(0.5turn)}";

const SidebarNav = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** Set to `true` to make the sidebar toggleable (useful for small screens) */
    this.collapsible = false;
    /** Automatically set `collapsible` based on this media query */
    this.collapsibleMediaQuery = '(max-width: 30em)';
    /** Label for toggle button */
    this.collapsibleLabel = 'Menu';
    this.collapsed = true;
    this.handleMediaQueryChange = (event) => {
      this.collapsible = event.matches;
    };
    this.toggle = () => {
      this.collapsed = !this.collapsed;
    };
  }
  componentDidLoad() {
    this.setNestingLevelOnChildren();
    this.setMatchMedia();
  }
  disconnectedCallback() {
    if (this.mq != null) {
      this.mq.removeListener(this.handleMediaQueryChange);
    }
  }
  componentDidRender() {
    if (this.el.hasAttribute('aria-label')) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "ariaLabel" is deprecated. Please use the "ariaLabelSidebarNav" property!',
        type: 'warn',
        source: this.el,
      });
    }
  }
  /**
   * Set `nesting-level` and `condensed` attributes in
   * <scale-sidebar-nav-collapsible> and <scale-sidebar-nav-item> children,
   * so styling different levels "automatically" is possible.
   */
  setNestingLevelOnChildren() {
    function setNestingLevel(el, level = 1) {
      Array.from(el.children).forEach((child) => {
        if (child.tagName.toUpperCase() === 'SCALE-SIDEBAR-NAV-COLLAPSIBLE') {
          setNestingLevel(child, level + 1);
          if (!child.hasAttribute('nesting-level')) {
            child.setAttribute('nesting-level', String(level));
          }
          if (level === 2 && !child.hasAttribute('condensed')) {
            child.setAttribute('condensed', 'true');
          }
        }
        if (child.tagName.toUpperCase() === 'SCALE-SIDEBAR-NAV-ITEM') {
          if (!child.hasAttribute('nesting-level')) {
            child.setAttribute('nesting-level', String(level));
          }
          if (level === 3 && !child.hasAttribute('condensed')) {
            child.setAttribute('condensed', 'true');
          }
        }
      });
    }
    setNestingLevel(this.el);
  }
  setMatchMedia() {
    if (this.collapsibleMediaQuery) {
      this.mq = window.matchMedia(this.collapsibleMediaQuery);
      // Recent versions of Safari throw with `addEventListener`
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
      this.mq.addListener(this.handleMediaQueryChange);
      this.collapsible = this.mq.matches;
    }
  }
  render() {
    const label = this.ariaLabelSidebarNav
      ? { 'aria-label': this.ariaLabelSidebarNav }
      : {};
    const hidden = this.collapsible ? { hidden: this.collapsed } : {};
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { part: this.getBasePartMap(), class: this.getCssClassMap() }, this.collapsible === true && (h("button", { part: "toggle-button", class: "sidebar-nav__toggle-button", "aria-expanded": this.collapsed ? 'false' : 'true', onClick: this.toggle }, this.collapsibleLabel, h("scale-icon-navigation-collapse-down", { part: "icon", class: "sidebar-nav__icon", size: 20 }))), h("nav", Object.assign({ part: "nav" }, label, hidden), h("ul", { part: "list", class: "sidebar-nav__list", role: "list" }, h("slot", null))))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const component = 'sidebar-nav';
    const prefix = mode === 'basePart' ? '' : `${component}--`;
    return classnames(component, this.collapsible && `${prefix}collapsible`);
  }
  get el() { return this; }
  static get style() { return sidebarNavCss; }
}, [1, "scale-sidebar-nav", {
    "ariaLabelSidebarNav": [1, "aria-label-sidebar-nav"],
    "collapsible": [1540],
    "collapsibleMediaQuery": [1, "collapsible-media-query"],
    "collapsibleLabel": [1, "collapsible-label"],
    "styles": [1],
    "collapsed": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-sidebar-nav", "scale-icon-navigation-collapse-down"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-sidebar-nav":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SidebarNav);
      }
      break;
    case "scale-icon-navigation-collapse-down":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ScaleSidebarNav = SidebarNav;
const defineCustomElement = defineCustomElement$1;

export { ScaleSidebarNav, defineCustomElement };
