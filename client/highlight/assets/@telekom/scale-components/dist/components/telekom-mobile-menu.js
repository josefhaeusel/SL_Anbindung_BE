import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './navigation-left.js';

const telekomMobileMenuCss = ":host{--spacing:var(--telekom-spacing-composition-space-06);--background:var(--telekom-color-background-surface);--max-width:572px;--spacing-close-button:var(--telekom-spacing-composition-space-04);--radius-close-button:var(--telekom-radius-standard);--transition-close-button:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--box-shadow-close-button-focus:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard);--color:var(--telekom-color-text-and-icon-standard);--color-hover:var(--telekom-color-primary-hovered);--color-active:var(--telekom-color-primary-pressed)}:host::part(base){margin:0 auto;background:var(--background);display:flex;justify-content:center;flex-direction:column;max-width:var(--max-width)}:host::part(back-button){display:flex;align-items:center;border:none;background:transparent;color:var(--color);font:var(--telekom-text-style-lead-text);width:100%;height:72px;cursor:pointer;padding:0}scale-icon-navigation-left{margin-right:12px}:host::part(nav){padding:var(--spacing) 0;max-width:var(--max-width);width:100%}:host::part(links-top){display:flex}[part~='app-name']>*{font-size:var(--font-size-app-name);font-weight:var(--font-weight-app-name);line-height:var(--line-height-app-name);color:var(--telekom-color-text-and-icon-primary-standard);letter-spacing:0.02em;text-decoration:none}[part~='app-name']>*:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}[part~='app-name']>*:active{color:var(--telekom-color-text-and-icon-primary-pressed)}";

function elementDepth(el) {
  let depth = 0;
  while (null !== el.parentElement) {
    el = el.parentElement;
    depth++;
  }
  return depth;
}
const TelekomMobileMenu = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scaleCloseNavFlyout = createEvent(this, "scale-close-nav-flyout", 7);
    this.backButtonTitle = 'Back';
    this.setLevelAttributeForAllItems = () => {
      const offset = Math.min(...Array.from(this.menuItems).map((x) => elementDepth(x)));
      Array.from(this.menuItems).forEach((item) => {
        const level = elementDepth(item) - offset;
        item.setAttribute('level', String(level));
      });
    };
    this.back = () => {
      Array.from(this.openItems).forEach((element) => {
        if (element.getAttribute('level') === String(+this.currentLevel - 1)) {
          element.setAttribute('active', '');
          // @ts-ignore
          element.open = false;
          return element.removeAttribute('open');
        }
      });
      this.currentLevel = String(+this.currentLevel - 1);
      Array.from(this.menuItems).forEach((element) => {
        element.setAttribute('current-level', this.currentLevel);
      });
    };
  }
  handleSetMenuItemActive(e) {
    this.menuItems.forEach((element) => element.removeAttribute('active'));
    e.target.setAttribute('active', '');
    if (e.target.parentElement.tagName === 'SCALE-TELEKOM-MOBILE-MENU-ITEM') {
      e.target.parentElement.setAttribute('active', '');
    }
  }
  handleSetMenuItemOpen(e) {
    e.target.setAttribute('open', '');
    this.currentLevel = String(+e.target.getAttribute('level') + 1);
    Array.from(this.menuItems).forEach((element) => {
      element.setAttribute('current-level', this.currentLevel);
    });
  }
  connectedCallback() {
    this.setLevelAttributeForAllItems();
    this.currentLevel = this.activeItem
      ? String(+this.activeItem.getAttribute('level'))
      : '0';
    Array.from(this.menuItems).forEach((element) => {
      element.setAttribute('current-level', this.currentLevel);
    });
  }
  componentWillRender() { }
  get menuItems() {
    return this.hostElement.querySelectorAll('scale-telekom-mobile-menu-item');
  }
  get activeItem() {
    return Array.from(this.menuItems).find((element) => 
    // @ts-ignore
    element.hasAttribute('active') || element.active);
  }
  get openItems() {
    return Array.from(this.menuItems).filter((element) => 
    // @ts-ignore
    element.hasAttribute('open') || element.open);
  }
  render() {
    return (h(Host, null, h("div", { part: "base" }, h("nav", { part: "nav" }, +this.currentLevel > 0 ? (h("button", { part: "back-button", onClick: () => {
        this.back();
      } }, h("scale-icon-navigation-left", { size: 20 }), this.backButtonTitle)) : null, h("slot", null)))));
  }
  get hostElement() { return this; }
  static get style() { return telekomMobileMenuCss; }
}, [1, "scale-telekom-mobile-menu", {
    "backButtonTitle": [1, "back-button-title"],
    "appName": [1, "app-name"],
    "appNameLink": [1, "app-name-link"],
    "appNameClick": [8, "app-name-click"],
    "currentLevel": [32]
  }, [[0, "scale-set-menu-item-active", "handleSetMenuItemActive"], [0, "scale-set-menu-item-open", "handleSetMenuItemOpen"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-mobile-menu", "scale-icon-navigation-left"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-mobile-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomMobileMenu);
      }
      break;
    case "scale-icon-navigation-left":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TelekomMobileMenu as T, defineCustomElement as d };
