import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const telekomNavItemCss = "@media screen and (max-width: 1039px){.scl-hide-on-mobile{display:none}}@media screen and (min-width: 1040px){.scl-hide-on-desktop{display:none}}.scale-telekom-nav-item{--_spacing-top-slotted-top:var(--telekom-spacing-composition-space-07);--_spacing-bottom-slotted-bottom:var(--telekom-spacing-composition-space-07);--_font-size-main-nav:var(--telekom-typography-font-size-body);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--color:var(--telekom-color-text-and-icon-standard);color:var(--color)}@media screen and (min-width: 640px){.scale-telekom-nav-item{--_spacing-bottom-slotted-bottom:var(\n      --telekom-spacing-composition-space-07\n    )}}@media screen and (min-width: 1040px){.scale-telekom-nav-item{--_spacing-top-slotted-top:var(--telekom-spacing-composition-space-05);--_spacing-bottom-slotted-bottom:var(\n      --telekom-spacing-composition-space-06\n    )}[scrolled] .scale-telekom-nav-item{--_spacing-bottom-slotted-bottom:var(\n      --telekom-spacing-composition-space-08\n    )}[type='slim'] .scale-telekom-nav-item,[type='slim'][scrolled] .scale-telekom-nav-item{--_spacing-bottom-slotted-bottom:var(\n      --telekom-spacing-composition-space-08\n    )}}@media screen and (min-width: 1296px){.scale-telekom-nav-item{--_spacing-top-slotted-top:var(--telekom-spacing-composition-space-05);--_spacing-bottom-slotted-bottom:var(\n      --telekom-spacing-composition-space-08\n    )}[type='slim'] .scale-telekom-nav-item{--_spacing-bottom-slotted-bottom:calc(\n      var(--telekom-spacing-composition-space-10) - 2px\n    )}}@media screen and (min-width: 1680px){.scale-telekom-nav-item{--_spacing-top-slotted-top:var(--telekom-spacing-composition-space-05);--_spacing-bottom-slotted-bottom:var(\n      --telekom-spacing-composition-space-10\n    );--_font-size-main-nav:var(--telekom-typography-font-size-callout)}[type='slim'] .scale-telekom-nav-item,[type='slim'][scrolled-back] .scale-telekom-nav-item{--_spacing-bottom-slotted-bottom:calc(\n      var(--telekom-spacing-composition-space-11)\n    )}[type='slim'][scrolled] .scale-telekom-nav-item{--_spacing-bottom-slotted-bottom:calc(\n      var(--telekom-spacing-composition-space-08)\n    )}}.scale-telekom-nav-item[debug]{border:1px dotted cyan}.scale-telekom-nav-item>:where(a,button){box-sizing:border-box;display:flex;align-items:flex-end;height:100%;position:relative;font:inherit;color:inherit;background:none;appearance:none;padding:0;border:none;text-decoration:none;cursor:pointer;transition:padding-bottom var(--telekom-motion-duration-immediate)\n    var(--telekom-motion-easing-standard)}.scale-telekom-nav-item>:where(a,button):hover,.scale-telekom-nav-item>:where(button[aria-expanded='true']){color:var(--telekom-color-text-and-icon-primary-hovered)}.scale-telekom-nav-item>:where(a,button):active{color:var(--telekom-color-text-and-icon-primary-pressed)}.scale-telekom-nav-item>:where(a,button):focus{border-radius:var(--telekom-radius-extra-small);outline:var(--focus-outline)}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(a,button),.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(a,button),.scale-telekom-nav-list[variant='main-nav']>scale-menu-flyout>.scale-telekom-nav-item>:where(a,button){font-size:var(--_font-size-main-nav);line-height:var(--telekom-typography-line-spacing-loose);font-weight:var(--telekom-typography-font-weight-extra-bold);padding-bottom:var(--_spacing-bottom-slotted-bottom)}@media screen and (min-width: 1680px){.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(a,button),.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(a,button){line-height:var(--telekom-typography-line-spacing-extra-tight);line-height:1.2}}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item[active]>:where(a,button),.scale-telekom-nav-list[variant='main-nav']>scale-menu-flyout>.scale-telekom-nav-item[active]>:where(a,button){color:var(--telekom-color-text-and-icon-primary-standard)}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(a,button):hover:after,.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(button[aria-expanded='true']):after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(a,button):hover:after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(button[aria-expanded='true']):after,.scale-telekom-nav-list[variant='main-nav']>scale-menu-flyout>.scale-telekom-nav-item>:where(a,button):hover:after{content:'';height:var(--telekom-spacing-composition-space-02);background:var(--telekom-color-text-and-icon-primary-hovered);display:block;position:absolute;bottom:0;left:0}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(a,button):has(scale-badge[label]):hover:after,.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(button[aria-expanded='true']):has(scale-badge[label]):after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(a,button):has(scale-badge[label]):hover:after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(button[aria-expanded='true']):has(scale-badge[label]):after{width:24px}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(a,button):active:after,.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item>:where(button[aria-expanded='true']):after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(a,button):active:after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item>:where(button[aria-expanded='true']):after,.scale-telekom-nav-list[variant='main-nav']>scale-menu-flyout>.scale-telekom-nav-item>:where(a,button):active:after{content:'';height:var(--telekom-spacing-composition-space-02);background:var(--telekom-color-text-and-icon-primary-pressed);display:block;position:absolute;bottom:0;left:0}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item[active]>:where(a,button):after,.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item[active]>:where(a,button):after,.scale-telekom-nav-list[variant='main-nav']>scale-menu-flyout>.scale-telekom-nav-item[active]>:where(a,button):after{content:'';height:var(--telekom-spacing-composition-space-03);background:var(--telekom-color-text-and-icon-primary-standard);display:block;position:absolute;bottom:0;left:0}@media screen and (forced-colors: active), (-ms-high-contrast: active){.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item[active]>:where(a,button),.scale-telekom-nav-list[variant='functions']>.scale-telekom-nav-item[active]>:where(a,button),.scale-telekom-nav-list[variant='main-nav']>scale-menu-flyout>.scale-telekom-nav-item[active]>:where(a,button){border-bottom:2px solid hsl(0, 0%, 100%)}}.scale-telekom-nav-list[variant='meta-nav-external']>.scale-telekom-nav-item>:where(a,button),.scale-telekom-nav-list[variant='meta-nav']>.scale-telekom-nav-item>:where(a,button),.scale-telekom-nav-list[variant='lang-switcher']>.scale-telekom-nav-item>:where(a,button){font-size:var(--telekom-typography-font-size-small);line-height:var(--telekom-typography-line-spacing-tight);font-weight:var(--telekom-typography-font-weight-regular);padding-top:var(--_spacing-top-slotted-top)}.scale-telekom-nav-list[variant='meta-nav-external']>.scale-telekom-nav-item>:where(a,button){display:flex;align-items:center}.scale-telekom-nav-list[variant='meta-nav-external']>.scale-telekom-nav-item>:where(a,button)>*{margin-inline-start:0.5ch}.scale-telekom-nav-list[variant='lang-switcher']>.scale-telekom-nav-item>a,.scale-telekom-nav-list[variant='meta-nav-external']>.scale-telekom-nav-item>a{font-size:var(--telekom-typography-font-size-body)}.scale-telekom-nav-list[variant='lang-switcher']>.scale-telekom-nav-item>:where(a,button):where([aria-current='true']){font-weight:var(--telekom-typography-font-weight-extra-bold)}.scale-telekom-nav-list[slot='mobile-meta-nav-external']>.scale-telekom-nav-item>a,.scale-telekom-nav-list[slot='mobile-meta-nav']>.scale-telekom-nav-item>a{font-size:var(--telekom-typography-font-size-body)}@media screen and (min-width: 1040px){.scale-telekom-nav-list[variant='meta-nav']{margin-right:var(--telekom-spacing-composition-space-10)}.scale-telekom-nav-list[variant='lang-switcher']>.scale-telekom-nav-item>a,.scale-telekom-nav-list[variant='meta-nav-external']>.scale-telekom-nav-item>a{font-size:var(--telekom-typography-font-size-small)}}.scale-telekom-nav-list[variant='functions'] .scale-icon{height:20px;width:20px}.scale-telekom-nav-list[variant='functions'] [slot='dot'] .scale-icon{height:12px;width:12px}@media screen and (min-width: 1680px){.scale-telekom-nav-list[variant='functions'] .scale-icon{height:24px;width:24px}}scale-telekom-mobile-flyout-canvas .scale-telekom-nav-list[variant='meta-nav-external'] .scale-icon{height:12px;width:12px}[slot='mobile-meta-nav'] .scale-telekom-nav-item,[slot='mobile-meta-nav-external'] .scale-telekom-nav-item{--_font-size-main-nav:16px;line-height:var(--telekom-typography-line-spacing-standard)}.scale-telekom-nav-list>scale-menu-flyout::part(trigger){height:100%}";

// TODO maybe we want to add the <scale-icon-navigation-external-link size="11"> icon
// automatically when inside variant="meta-nav-external"?
// TODO? turn into util
function toggleAriaCurrent(element, value, attrValue = 'page') {
  if (value) {
    element.setAttribute('aria-current', attrValue);
  }
  else {
    element.removeAttribute('aria-current');
  }
}
const TelekomNavItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.active = false;
    this.variant = 'main-nav';
    this.role = 'none';
    this.hideOnMobile = false;
    this.hideOnDesktop = false;
  }
  activeChanged(newValue) {
    if (this.linkElement == null) {
      return;
    }
    if (this.variant === 'lang-switcher' || this.variant === 'main-nav') {
      toggleAriaCurrent(this.linkElement, newValue, this.active ? 'true' : 'false');
    }
  }
  connectedCallback() {
    this.activeChanged(this.active);
  }
  componentDidLoad() {
    var _a;
    const child = Array.from(this.hostElement.children).find((el) => el.matches('a, button'));
    const parentRole = (_a = this.hostElement.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('role');
    if (parentRole === 'menu') {
      child.setAttribute('role', 'menuitem');
    }
  }
  get linkElement() {
    return this.hostElement.querySelector('a, button');
  }
  render() {
    return (
    // The `scale-telekom-nav-item` class is used to avoid coupling styles to the tagname
    // (which can be different based on who defines it)
    h(Host, { class: {
        'scale-telekom-nav-item': true,
        'scl-hide-on-mobile': this.hideOnMobile,
        'scl-hide-on-desktop': this.hideOnDesktop,
      } }, h("slot", null)));
  }
  get hostElement() { return this; }
  static get watchers() { return {
    "active": ["activeChanged"],
    "variant": ["activeChanged"]
  }; }
  static get style() { return telekomNavItemCss; }
}, [4, "scale-telekom-nav-item", {
    "active": [516],
    "variant": [513],
    "role": [513],
    "hideOnMobile": [516, "hide-on-mobile"],
    "hideOnDesktop": [516, "hide-on-desktop"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-nav-item"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-nav-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomNavItem);
      }
      break;
  } });
}

export { TelekomNavItem as T, defineCustomElement as d };
