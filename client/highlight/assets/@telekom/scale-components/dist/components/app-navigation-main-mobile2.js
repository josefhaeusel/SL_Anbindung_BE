import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { f as findSelected, a as findRootNode } from './menu-utils.js';
import { d as defineCustomElement$2 } from './navigation-left.js';
import { d as defineCustomElement$1 } from './navigation-right.js';

const appNavigationMainMobileCss = "app-navigation-main-mobile{--min-height:calc(100vh - 56px - 56px);--font-size:var(--telekom-typography-font-size-headline-3);--font-weight:var(--telekom-typography-font-weight-extra-bold);--line-height:3.333;--border-bottom:1px solid var(--telekom-color-ui-faint);--color:var(--telekom-color-text-and-icon-standard);--color-selected:var(--telekom-color-text-and-icon-primary-standard);--font-size-child:var(--telekom-typography-font-size-headline-3);--line-height-child:2.5;--font-weight-child:var(--telekom-typography-font-weight-regular);--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);width:100%}.main-navigation-mobile{width:100%;position:relative}.main-navigation-mobile__main-menu{width:100%;list-style:none;padding:0;margin:0;min-height:var(--min-height)}.main-navigation-mobile__item{font-size:var(--font-size);font-weight:var(--font-weight);line-height:var(--line-height)}.main-navigation-mobile__item--selected{border-right:2px solid var(--color-selected)}.main-navigation-mobile__item-link{text-decoration:none;color:var(--color);transition:var(--transition)}.main-navigation-mobile__item-link--selected{color:var(--color-selected);transition:var(--transition)}.main-navigation-mobile__item-link--selected svg{margin-right:-2px}.main-navigation-mobile__item-wrapper{box-sizing:border-box;width:calc(100% - 34px);display:flex;justify-content:space-between;margin-left:34px;border-bottom:var(--border-bottom);padding-right:34px;align-items:center}.main-navigation-mobile__child-menu{position:absolute;top:0;left:0;background:var(--telekom-color-background-surface);width:100%;min-height:var(--min-height)}.main-navigation-mobile__child-menu-current-item{line-height:var(--line-height)}.main-navigation-mobile__child-menu-current-item svg{margin-right:6px;margin-top:-4px}.main-navigation-mobile__child-menu-current{font-size:var(--telekom-typography-font-size-headline-3);font-weight:var(--telekom-typography-font-weight-extra-bold);color:var(--color-selected);text-decoration:none}.main-navigation-mobile__child-menu-current-wrapper{width:calc(100% - 34px);display:flex;align-items:center;border-bottom:var(--border-bottom);margin-left:34px}.main-navigation-mobile__child-menu-current app-icon{margin-right:var(--telekom-spacing-composition-space-04)}.main-navigation-mobile__child-menu-current .icon-back{fill:var(--color-selected)}.main-navigation-mobile__child-menu-items{list-style:none;margin:0;padding:0}.main-navigation-mobile__child-menu-item-link{text-decoration:none;color:var(--color)}.main-navigation-mobile__child-menu-item-link.selected{color:var(--color-selected)}.main-navigation-mobile__child-menu-item-link.selected .main-navigation-mobile__child-menu-item-wrapper{border-right:2px solid var(--color-selected)}.main-navigation-mobile__child-menu-item-link.selected svg{margin-right:38px}.main-navigation-mobile__child-menu-item{font-size:var(--font-size-child);line-height:var(--line-height-child);font-weight:var(--font-weight-child)}.main-navigation-mobile__child-menu-item-wrapper{width:calc(100% - 64px);display:flex;justify-content:space-between;align-items:center;border-bottom:var(--border-bottom);margin-left:var(--telekom-spacing-composition-space-17);box-sizing:border-box}.main-navigation-mobile__child-menu-item-wrapper svg{margin-right:var(--telekom-spacing-composition-space-12)}";

const hasChildren = (item) => Array.isArray(item.children) && item.children.length > 0;
const MainNavigationMobile = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.closeMenu = createEvent(this, "closeMenu", 7);
    this.selected = undefined;
    this.parent = undefined;
  }
  handleActiveRoute(newValue) {
    this.selected = findSelected(this.navigation, newValue, null).selected;
    this.parent = findSelected(this.navigation, newValue).parent;
  }
  componentWillLoad() {
    this.selected = findSelected(this.navigation, this.activeRouteId, null).selected;
    this.parent = findSelected(this.navigation, this.activeRouteId).parent;
  }
  closeMenuHandler() {
    this.closeMenu.emit();
  }
  handlePrevSelected(event, item) {
    event.preventDefault();
    const selected = findSelected(this.navigation, item.id).parent;
    this.selected = selected;
    this.parent = selected;
  }
  handleSelect(event, item) {
    const { selected, parent } = findSelected(this.navigation, item.id);
    this.selected = selected;
    this.parent = parent;
    if (typeof item.onClick === 'function') {
      item.onClick(event);
    }
    if (!hasChildren(selected)) {
      this.closeMenuHandler();
    }
  }
  childMenuPage() {
    const section = this.selected && hasChildren(this.selected) ? this.selected : this.parent;
    const { selected, parent } = findSelected(this.navigation, this.activeRouteId);
    if (!section) {
      return h("div", null);
    }
    const isActive = (child) => (selected && child.id === selected.id) ||
      (parent && parent.id === child.id);
    return (h("div", { class: "main-navigation-mobile__child-menu" }, h("a", { class: "main-navigation-mobile__child-menu-current", href: section.href || 'javascript:void(0);', onClick: (event) => {
        this.handlePrevSelected(event, section);
      }, tabIndex: 0, onKeyDown: (event) => {
        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          this.handlePrevSelected(event, section);
          if (!this.selected) {
            // focus first main navigation item to ease tab navigation
            this.mainNavigationWrapper.querySelector('a').focus();
          }
        }
        if (['Escape', 'Esc'].includes(event.key)) {
          this.hide();
        }
      } }, h("div", { class: "main-navigation-mobile__child-menu-current-item" }, h("div", { class: "main-navigation-mobile__child-menu-current-wrapper" }, h("scale-icon-navigation-left", null), h("div", null, section.name)))), h("ul", { class: "main-navigation-mobile__child-menu-items", ref: (el) => {
        this.childrenWrapper = el;
      } }, section.children.map((child) => (h("li", { class: "main-navigation-mobile__child-menu-item" }, h("a", { "aria-current": isActive(child) ? 'true' : 'false', "aria-haspopup": hasChildren(child) ? 'true' : 'false', class: `main-navigation-mobile__child-menu-item-link ${isActive(child) ? 'selected' : ''}`, href: child.href || 'javascript:void(0);', tabIndex: 0, onClick: (event) => {
        this.handleSelect(event, child);
      }, onKeyDown: (event) => {
        if (['Enter', ' '].includes(event.key)) {
          this.handleSelect(event, child);
          setTimeout(() => {
            // focus first child menu item link to ease tab navigation
            const firstChildren = this.childrenWrapper.querySelector('a');
            if (firstChildren) {
              this.childrenWrapper.querySelector('a').focus();
            }
          });
        }
        if (['Escape', 'Esc'].includes(event.key)) {
          this.hide();
        }
      } }, h("div", { class: "main-navigation-mobile__child-menu-item-wrapper" }, h("span", null, child.name), isActive(child) && h("span", { class: "sr-only" }, "active"), hasChildren(child) && (h("scale-icon-navigation-right", null))))))))));
  }
  render() {
    const { selected } = findSelected(this.navigation, this.activeRouteId);
    const rootNode = selected && findRootNode(this.navigation, selected.id);
    const isActive = (itemId) => rootNode && rootNode.id === itemId;
    return (h("div", { class: "main-navigation-mobile" }, this.childMenuPage(), h("ul", { class: "main-navigation-mobile__main-menu", ref: (el) => {
        this.mainNavigationWrapper = el;
      } }, (this.navigation || []).map((item) => (h("li", { class: `main-navigation-mobile__item${isActive(item.id)
        ? ' main-navigation-mobile__item--selected'
        : ''}` }, h("a", { "aria-current": isActive(item.id) ? 'true' : 'false', "aria-haspopup": hasChildren(item) ? 'true' : 'false', class: `main-navigation-mobile__item-link${isActive(item.id)
        ? ' main-navigation-mobile__item-link--selected'
        : ''}`, href: item.href || 'javascript:void(0);', onClick: (event) => {
        this.handleSelect(event, item);
      }, onKeyDown: (event) => {
        if (['Enter', ' '].includes(event.key)) {
          this.handleSelect(event, item);
          setTimeout(() => {
            // focus first child menu item link to ease tab navigation
            const firstChildren = this.childrenWrapper.querySelector('a');
            if (firstChildren) {
              this.childrenWrapper.querySelector('a').focus();
            }
          });
        }
        if (['Escape', 'Esc'].includes(event.key)) {
          this.hide();
        }
      },
      // hide from tab navigation when on childMenuPage
      tabIndex: this.selected ? -1 : 0 }, h("div", { class: "main-navigation-mobile__item-wrapper" }, h("span", null, item.name), isActive(item.id) && h("span", { class: "sr-only" }, "active"), hasChildren(item) && (h("scale-icon-navigation-right", null))))))))));
  }
  static get watchers() { return {
    "activeRouteId": ["handleActiveRoute"]
  }; }
  static get style() { return appNavigationMainMobileCss; }
}, [0, "app-navigation-main-mobile", {
    "hide": [16],
    "navigation": [16],
    "activeRouteId": [1, "active-route-id"],
    "selected": [32],
    "parent": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["app-navigation-main-mobile", "scale-icon-navigation-left", "scale-icon-navigation-right"];
  components.forEach(tagName => { switch (tagName) {
    case "app-navigation-main-mobile":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MainNavigationMobile);
      }
      break;
    case "scale-icon-navigation-left":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-icon-navigation-right":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { MainNavigationMobile as M, defineCustomElement as d };
