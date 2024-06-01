import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { d as defineCustomElement$2 } from './logo.js';
import { d as defineCustomElement$1 } from './logo-svg.js';

const telekomHeaderCss = ":host{--shadow:0px 2px 9px rgba(0, 0, 0, 0.15);--background:var(--telekom-color-background-surface);--background-logo:var(--telekom-color-primary-standard);--transition-common-scrolled:height var(--telekom-motion-duration-immediate)\n      var(--telekom-motion-easing-standard),\n    width var(--telekom-motion-duration-immediate),\n    margin var(--telekom-motion-duration-immediate);--font-size-app-name:var(--telekom-typography-font-size-body);--line-height-app-name:var(--telekom-typography-line-spacing-tight);--font-weight-app-name:var(--telekom-typography-font-weight-extra-bold);--_height:60px;--_base-height:60px;--_height-logo-svg:36px;--_height-bottom-bar:60px;--_height-top-bar:0;--_display-bottom-app-name:none;--_display-top-app-name:none;--_display-main-nav:none;--_display-meta-nav:none;--_display-meta-nav-external:none;--_display-lang-switcher:none;--_max-width-container:none;--_spacing-x-container:var(--telekom-spacing-composition-space-06);--_column-gap-container:var(--telekom-spacing-composition-space-10);--_grid-template-columns-container:auto;--_grid-column-body:auto;--_spacing-left-body:0;--_spacing-right-top-app-name:var(--telekom-spacing-composition-space-10);--_spacing-right-bottom-app-name:var(--telekom-spacing-composition-space-10);--_left-logo:0;--_justify-content-bottom-body:end;--_animation-name:toggle;--scl-telekom-header-height:var(--_height)}@media screen and (min-width: 640px){:host{--_display-bottom-app-name:block;--_spacing-left-body:74px}}@media screen and (min-width: 1040px){:host,:host([scrolled-back]){--_height:84px;--_base-height:84px;--_height-logo-svg:44px;--_height-top-bar:30px;--_height-bottom-bar:54px;--_display-main-nav:block;--_display-meta-nav:block;--_display-meta-nav-external:block;--_display-lang-switcher:block;--_display-top-app-name:block;--_display-bottom-app-name:none;--_grid-template-columns-container:repeat(16, minmax(0, 1fr));--_grid-column-body:3 / span 14;--_spacing-left-body:0;--_spacing-right-bottom-app-name:52px;--_spacing-x-container:var(--telekom-spacing-composition-space-08);--_justify-content-bottom-body:space-between;--scl-telekom-header-height:var(--_height)}:host([type='slim']){--_animation-name:none;--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-07\n    )}:host([type='slim'][scrolled]){--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-07\n    )}:host([type='slim']),:host([scrolled]){--_height:72px;--_height-logo-svg:40px;--_height-top-bar:0;--_height-bottom-bar:72px;--_display-meta-nav:none;--_display-meta-nav-external:none;--_display-lang-switcher:none;--_display-top-app-name:none;--_display-bottom-app-name:block;--_spacing-left-body:var(--telekom-spacing-composition-space-06);--scl-telekom-header-height:var(--_height)}:host([scrolled]){--_spacing-left-body:0}:host([type='slim']),:host([scrolled][app-name]){--_grid-column-body:2 / span 15}}@media screen and (min-width: 1296px){:host,:host([scrolled-back]){--_height:96px;--_base-height:96px;--_height-logo-svg:48px;--_height-top-bar:30px;--_height-bottom-bar:66px;--scl-telekom-header-height:var(--_height)}:host([type='slim']){--_height:84px;--_base-height:84px;--_height-logo-svg:44px;--_height-top-bar:0;--_height-bottom-bar:84px;--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-14\n    );--_spacing-left-body:4px}:host([type='slim'][scrolled]){--_height:72px;--_height-logo-svg:40px;--_height-top-bar:0;--_height-bottom-bar:72px;--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-15\n    );--_spacing-left-body:0}}@media screen and (min-width: 1680px){:host,:host([scrolled-back]){--_height:120px;--_base-height:120px;--_height-logo-svg:60px;--_height-top-bar:30px;--_height-bottom-bar:90px;--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-12\n    );--_left-logo:var(--_spacing-x-container);--scl-telekom-header-height:var(--_height)}:host{--_max-width-container:var(--scl-grid-max-width, 1504px)}:host([type='slim']){--_height:96px;--_base-height:96px;--_height-logo-svg:48px;--_height-top-bar:0;--_height-bottom-bar:96px;--_display-meta-nav:none;--_display-meta-nav-external:none;--_display-lang-switcher:none;--_display-top-app-name:none;--_display-bottom-app-name:block;--_spacing-left-body:24px;--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-14\n    );--scl-telekom-header-height:var(--_height);--scl-telekom-header-bottom-spacing:36px}:host([type='slim'][scrolled]){--_height:72px;--_height-logo-svg:40px;--_height-top-bar:0;--_height-bottom-bar:72px;--_display-meta-nav:none;--_display-meta-nav-external:none;--_display-lang-switcher:none;--_display-top-app-name:none;--_display-bottom-app-name:block;--_spacing-right-bottom-app-name:var(\n      --telekom-spacing-composition-space-12\n    );--scl-telekom-header-height:var(--_height)}}:host([type='subtle']){--shadow:none;--background:transparent}slot[name='logo']{position:absolute;top:0;left:var(--_left-logo);display:flex;align-items:center;justify-content:center;height:var(--_height);width:var(--_height);background:var(--background-logo);transition:var(--transition-common-scrolled)}[part~='meta-nav-external']{display:var(--_display-meta-nav-external);flex:1}[part~='meta-nav']{display:var(--_display-meta-nav);}[part~='lang-switcher']{display:var(--_display-lang-switcher);}slot[name='main-nav']{display:var(--_display-main-nav);flex:1}slot[name='functions']{display:block;}@media screen and (min-width: 1040px){slot[name='main-nav'],slot[name='functions']{padding-top:var(--telekom-spacing-composition-space-06)}}@media screen and (min-width: 1296px){slot[name='main-nav'],slot[name='functions']{padding-top:var(--telekom-spacing-composition-space-07)}}@media screen and (min-width: 1680px){slot[name='main-nav'],slot[name='functions']{padding-top:var(--telekom-spacing-composition-space-10)}:host([scrolled]) slot[name='functions'],:host([scrolled]) slot[name='main-nav']{padding-top:var(--telekom-spacing-composition-space-02)}}[part~='base']{height:var(--_base-height);width:100%;transition:var(--transition-common-scrolled)}[part~='fixed-wrapper']{position:fixed;z-index:99;width:100%;height:var(--_height);background-color:var(--background);box-shadow:var(--shadow);transition:var(--transition-common-scrolled)}[part~='container']{box-sizing:content-box;display:grid;grid-template-columns:var(--_grid-template-columns-container);column-gap:var(--_column-gap-container);position:relative;max-width:var(--_max-width-container);margin-left:auto;margin-right:auto;padding-left:var(--_spacing-x-container);padding-right:var(--_spacing-x-container);transition:var(--transition-common-scrolled)}[part~='app-logo']{height:var(--_height);width:var(--_height);display:flex;align-items:center;justify-content:center;transition:var(--transition-common-scrolled)}:host::part(logo-svg){height:var(--_height-logo-svg);transition:var(--transition-common-scrolled);margin-top:4px}:host::part(logo){height:calc(var(--_height) - 6px);width:calc(var(--_height) - 6px);display:flex;align-items:center;justify-content:center;transition:var(--transition-common-scrolled)}[part~='body']{display:block;grid-column:var(--_grid-column-body);flex:1;margin-left:var(--_spacing-left-body);transition:var(--transition-common-scrolled)}[part~='top-bar']{height:var(--_height-top-bar);display:flex;align-items:end;width:100%;transition:var(--transition-common-scrolled)}[part~='top-app-name']{display:var(--_display-top-app-name);margin-right:var(--_spacing-right-top-app-name)}[part~='top-body']{display:inline-flex;flex:1;transition:var(--transition-common-scrolled)}[part~='bottom-bar']{display:flex;justify-content:space-between;align-items:center;transition:var(--transition-common-scrolled)}[part~='bottom-app-name']{display:var(--_display-bottom-app-name);margin-right:var(--_spacing-right-bottom-app-name);animation-duration:var(--telekom-motion-duration-animation);min-width:108px}@media screen and (min-width: 1040px){:host([scrolled]) [part~='bottom-app-name']{animation-name:var(--_animation-name);animation-timing-function:var(--telekom-motion-easing-enter)}:host([scrolled-back]) [part~=' bottom-app-name']{animation-name:var(--_animation-name);animation-direction:reverse;animation-timing-function:var(--telekom-motion-easing-exit)}}[part~='bottom-body'],[part~='main-nav']{justify-content:var(--_justify-content-bottom-body);height:var(--_height-bottom-bar);display:inline-flex;flex:1;transition:var(--transition-common-scrolled)}[part~='app-name-text']{font-size:var(--font-size-app-name);font-weight:var(--font-weight-app-name);line-height:var(--line-height-app-name);color:var(--telekom-color-text-and-icon-primary-standard);letter-spacing:0.02em;text-decoration:none}@media screen and (min-width: 1040px){:host{--font-size-app-name:var(--telekom-typography-font-size-small)}}[part~='app-name-text']:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}[part~='app-name-text']:active{color:var(--telekom-color-text-and-icon-primary-pressed)}@keyframes toggle{from{opacity:0;transform:translate3d(\n      var(--translate-x),\n      var(--translate-y),\n      var(--translate-z)\n    )}}";

const TelekomHeader = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.type = '';
    this.metaNavAriaLabel = 'Meta navigation';
    this.metaNavExternalAriaLabel = 'External meta navigation';
    this.langSwitcherAriaLabel = 'Language switcher';
    this.mainNavAriaLabel = 'Main navigation';
    this.scrolledBack = false;
    this.pageYOffset = 0;
  }
  onScroll() {
    // 48px is the height of the header, set scrolled when the user scrolls past it
    // todo: calculate this value dynamically (for slim header, smaller viewports, etc)
    this.scrolled = window.pageYOffset > 48;
    this.scrolledBack =
      this.pageYOffset !== window.pageYOffset && window.pageYOffset <= 0;
    this.pageYOffset = pageYOffset;
  }
  render() {
    return (h(Host, { scrolled: this.type !== 'subtle' && this.scrolled, "scrolled-back": this.type !== 'subtle' && this.scrolledBack }, h("header", { part: classnames('base', this.type, {
        scrolled: this.type !== 'subtle' && this.scrolled,
        'scrolled-back': this.type !== 'subtle' && this.scrolledBack,
      }) }, h("div", { part: "fixed-wrapper" }, h("div", { part: "container" }, h("slot", { name: "logo" }, h("scale-logo", { part: "app-logo", variant: "white", href: this.logoHref, logoTitle: this.logoTitle, logoHideTitle: this.logoHideTitle, focusable: this.logoHref ? true : false })), h("div", { part: "body" }, h("div", { part: "top-bar" }, this.appName ? (h("div", { part: "top-app-name" }, this.appNameLink ? (h("a", { part: "app-name-text", onClick: this.appNameClick, href: this.appNameLink }, this.appName)) : (h("span", { part: "app-name-text" }, this.appName)))) : null, h("div", { part: "top-body" }, h("nav", { part: "meta-nav-external", "aria-label": this.metaNavExternalAriaLabel }, h("slot", { name: "meta-nav-external" })), h("nav", { part: "meta-nav", "aria-label": this.metaNavAriaLabel }, h("slot", { name: "meta-nav" })), h("nav", { part: "lang-switcher", "aria-label": this.langSwitcherAriaLabel }, h("slot", { name: "lang-switcher" })))), h("div", { part: "bottom-bar" }, this.appName ? (h("div", { part: "bottom-app-name" }, this.appNameLink ? (h("a", { part: "app-name-text", onClick: this.appNameClick, href: this.appNameLink }, this.appName)) : (h("span", { part: "app-name-text" }, this.appName)))) : null, h("div", { part: "bottom-body" }, h("nav", { part: "main-nav", "aria-label": this.mainNavAriaLabel }, h("slot", { name: "main-nav" })), h("slot", { name: "functions" })))))))));
  }
  get hostElement() { return this; }
  static get style() { return telekomHeaderCss; }
}, [1, "scale-telekom-header", {
    "appName": [513, "app-name"],
    "appNameLink": [1, "app-name-link"],
    "appNameClick": [8, "app-name-click"],
    "logoHref": [1, "logo-href"],
    "logoTitle": [1, "logo-title"],
    "logoHideTitle": [4, "logo-hide-title"],
    "type": [1],
    "metaNavAriaLabel": [1, "meta-nav-aria-label"],
    "metaNavExternalAriaLabel": [1, "meta-nav-external-aria-label"],
    "langSwitcherAriaLabel": [1, "lang-switcher-aria-label"],
    "mainNavAriaLabel": [1, "main-nav-aria-label"],
    "scrolled": [32],
    "scrolledBack": [32],
    "pageYOffset": [32]
  }, [[5, "scroll", "onScroll"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-header", "scale-logo", "scale-logo-svg"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomHeader);
      }
      break;
    case "scale-logo":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "scale-logo-svg":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TelekomHeader as T, defineCustomElement as d };
