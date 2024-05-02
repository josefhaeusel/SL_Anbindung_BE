import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const telekomNavListCss = ".scale-telekom-nav-list{--width:100%;--height:100%;--spacing-x-start:0;--flex-direction:row;--_spacing-x-slotted:var(--_spacing-x-slotted-main-nav, 24px);--_spacing-x-slotted-meta-nav-external:var(\n    --telekom-spacing-composition-space-07\n  );--_spacing-x-slotted-meta-nav:var(--telekom-spacing-composition-space-07);--_spacing-x-slotted-lang-switcher:var(\n    --telekom-spacing-composition-space-04\n  );--_spacing-x-slotted-main-nav:var(--telekom-spacing-composition-space-10);--_spacing-x-slotted-functions:var(--telekom-spacing-composition-space-08);display:flex;align-items:stretch;flex-direction:var(--flex-direction);width:var(--width);height:var(--height);margin-inline-start:var(--spacing-x-start)}.scale-telekom-nav-list[debug]{border:1px dotted gold}@media screen and (min-width: 1296px){.scale-telekom-nav-list{--_spacing-x-slotted-main-nav:var(--telekom-spacing-composition-space-14);--_spacing-x-slotted-meta-nav:var(--telekom-spacing-composition-space-07);--_spacing-x-slotted-meta-nav-external:var(\n      --telekom-spacing-composition-space-07\n    )}.scale-telekom-nav-list[debug]{border:1px dotted cyan}}@media screen and (min-width: 1680px){.scale-telekom-nav-list{--_spacing-x-slotted-main-nav:var(--telekom-spacing-composition-space-16)}.scale-telekom-nav-list[debug]{border:1px dotted magenta}}.scale-telekom-nav-list[variant='meta-nav-external']{--_spacing-x-slotted:var(--_spacing-x-slotted-meta-nav-external)}.scale-telekom-nav-list[variant='meta-nav']{--_spacing-x-slotted:var(--_spacing-x-slotted-meta-nav)}.scale-telekom-nav-list[variant='lang-switcher']{--_spacing-x-slotted:var(--telekom-spacing-composition-space-08)}@media screen and (min-width: 1040px){.scale-telekom-nav-list[variant='lang-switcher']{--_spacing-x-slotted:var(--telekom-spacing-composition-space-04)}}.scale-telekom-nav-list[variant='main-nav']{--_spacing-x-slotted:var(--_spacing-x-slotted-main-nav)}.scale-telekom-nav-list[variant='functions']{--_spacing-x-slotted:var(--_spacing-x-slotted-functions)}.scale-telekom-nav-list[alignment='left']{justify-content:flex-start}.scale-telekom-nav-list[alignment='right']{justify-content:flex-end}.scale-telekom-nav-list[alignment='center']{justify-content:center}.scale-telekom-nav-list[alignment='left']:not([variant='main-nav'])>.scale-telekom-nav-item button,.scale-telekom-nav-list[alignment='left']:not([variant='main-nav'])>.scale-telekom-nav-item a{margin-inline-end:var(--_spacing-x-slotted)}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item{position:relative;left:calc(-1 * var(--telekom-spacing-composition-space-06));margin-inline-end:0}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item button,.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item a{padding-inline-start:var(--telekom-spacing-composition-space-06)}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item button,.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item a{padding-inline-end:calc(\n    var(--_spacing-x-slotted) - var(--telekom-spacing-composition-space-06)\n  )}.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item button::after,.scale-telekom-nav-list[variant='main-nav']>.scale-telekom-nav-item a::after{margin-inline-start:var(--telekom-spacing-composition-space-06);width:calc(100% - var(--_spacing-x-slotted))}.scale-telekom-nav-list[alignment='right']:not([variant='main-nav'])>*:not(:first-child){margin-inline-start:var(--_spacing-x-slotted)}.scale-telekom-nav-list[slot='mobile-meta-nav'],.scale-telekom-nav-list[slot='mobile-meta-nav-external']{--flex-direction:column}";

const isDirectChild = (parent, child) => [...parent.children].includes(child);
const TelekomNavList = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.role = 'menu';
    this.alignment = 'left';
    this.variant = 'main-nav';
  }
  handleScaleExpanded(event) {
    if (event.detail.expanded) {
      this.closeExpandedFlyoutSiblings(event.target);
    }
  }
  closeExpandedFlyoutSiblings(target) {
    const siblingItems = [...this.hostElement.children].filter((x) => !x.contains(target));
    siblingItems.forEach((item) => {
      const flyout = item.querySelector('scale-telekom-nav-flyout');
      if (isDirectChild(item, flyout) && flyout.expanded) {
        flyout.expanded = false;
      }
    });
  }
  connectedCallback() {
    [...this.hostElement.children].forEach((el) => {
      el.setAttribute('variant', this.variant);
    });
  }
  render() {
    return (h(Host, { class: "scale-telekom-nav-list" }, h("slot", null)));
  }
  get hostElement() { return this; }
  static get style() { return telekomNavListCss; }
}, [4, "scale-telekom-nav-list", {
    "role": [513],
    "alignment": [513],
    "variant": [513]
  }, [[0, "scale-expanded", "handleScaleExpanded"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-nav-list"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-nav-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomNavList);
      }
      break;
  } });
}

export { TelekomNavList as T, defineCustomElement as d };
