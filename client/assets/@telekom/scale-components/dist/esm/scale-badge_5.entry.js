import { r as registerInstance, h, a as Host, g as getElement, c as createEvent } from './index-6d95a4bc.js';
import { c as classnames } from './index-713f92a5.js';
import { s as statusNote } from './status-note-0089e9c9.js';
import { e as emitEvent, a as animationsFinished } from './utils-c4af5b47.js';

const badgeCss = ":host{--background-color-circle:var(--telekom-color-primary-standard);--color-circle:var(--telekom-color-text-and-icon-inverted-standard);--font-size-circle:var(--telekom-typography-font-size-badge);--font-weight-circle:bold;--border-radius-circle:var(--telekom-radius-circle);--font-color-label:var(--telekom-color-text-and-icon-standard);--_display-circle:flex;display:flex}:host([no-dot]){--_display-circle:none}:host::part(base){display:inline-flex;position:relative;align-items:center}:host::part(circle){display:var(--_display-circle);position:absolute;align-items:center;justify-content:center;font-size:var(--font-size-circle);font-weight:var(--font-weight-circle);border-radius:var(--border-radius-circle);background-color:var(--background-color-circle);color:var(--color-circle)}:host::part(circle has-count){padding:0 2px;top:-8px;right:-5px;height:14px;min-width:10px}:host::part(circle no-count){top:-4px;right:-2px;height:8px;min-width:8px}:host::part(label){margin-left:8px;font-weight:400;font-size:12px;color:var(--font-color-label);display:flex;align-items:center}:host::part(visually-hidden){clip-path:inset(100%);clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}";

const Badge = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** a11y text for getting meaningful value. */
    this.ariaLabelTranslation = '$label - $count item';
    this.formatter = new Intl.NumberFormat('en', {
      // @ts-ignore
      notation: 'compact',
    });
  }
  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }
  getAriaLabel() {
    const filledText = this.ariaLabelTranslation
      .replace(/\$count/g, `${this.count}`)
      .replace(/\$label/g, `${this.label}`);
    return filledText;
  }
  render() {
    return (h(Host, null, h("span", { part: "base", "aria-label": this.count ? this.getAriaLabel() : this.label }, h("slot", null), h("slot", { name: "dot" }), h("span", { "aria-hidden": "true", part: classnames(`circle`, this.count ? `has-count` : 'no-count') }, !this.count ? '' : this.formatter.format(this.count)), h("span", { "aria-hidden": "true", id: "raw-count", part: "visually-hidden" }, this.count)), h("span", { id: "label", part: classnames('label', this.labelVisuallyHidden && 'visually-hidden'), "aria-hidden": "true" }, this.label)));
  }
  get hostElement() { return getElement(this); }
};
Badge.style = badgeCss;

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const UserFileUser = class {
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
    return (h(Host, null, h("svg", Object.assign({ class: "scale-icon", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, viewBox: "0 0 24 24" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), h("g", { fill: ((this.fill === 'currentColor') ? this.color : this.fill) }, this.selected ? (h("g", null, h("path", { d: "M8.9 16.5l3.1 3.1 3.1-3.1h2.25a4.73 4.73 0 014.656 3.73l.044.22.2 1.05H1.8l.15-1.05a4.73 4.73 0 014.474-3.945l.226-.005H8.9zM12 2c3.5 0 6 2.5 6 6 0 3.4-2.4 7-6 7s-6-3.6-6-7c0-3.5 2.5-6 6-6z", "fill-rule": "evenodd" }))) : (h("g", null, h("path", { d: "M8.9 16.5l3.1 3.1 3.1-3.1h2.25a4.73 4.73 0 014.656 3.73l.044.22.2 1.05H1.8l.15-1.05a4.73 4.73 0 014.474-3.945l.226-.005H8.9zM12 2c3.5 0 6 2.5 6 6 0 3.4-2.4 7-6 7s-6-3.6-6-7c0-3.5 2.5-6 6-6zm0 1.5C9.4 3.5 7.5 5.4 7.5 8c0 2.65 1.8 5.5 4.5 5.5s4.5-2.85 4.5-5.5c0-2.6-1.9-4.5-4.5-4.5z", "fill-rule": "evenodd" })))))));
  }
  get hostElement() { return getElement(this); }
};
UserFileUser.style = iconCss;

const telekomMobileFlyoutCanvasCss = ":host{display:block;height:100%;overflow-y:auto;--max-width:572px;--spacing:var(--telekom-spacing-composition-space-07)\n    var(--telekom-spacing-composition-space-06)\n    var(--telekom-spacing-composition-space-14);background:var(--telekom-color-background-surface)}[part='base']{padding:var(--spacing);display:flex;justify-content:center;flex-direction:column;margin:0 auto;max-width:var(--max-width)}[part~='header']{display:flex;justify-content:space-between;align-items:flex-start}[part~='heading']{margin:0;font-size:var(--font-size-app-name);font-weight:var(--font-weight-app-name);line-height:var(--line-height-app-name);color:var(--telekom-color-text-and-icon-primary-standard);letter-spacing:0.02em;text-decoration:none}[part~='close-button']{position:absolute;right:var(--telekom-spacing-composition-space-06);color:var(--telekom-color-text-and-icon-standard)}[part~='close-button']:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}[part~='close-button']:active{color:var(--telekom-color-text-and-icon-primary-pressed)}[part~='body'],slot[name='row']::slotted(*){margin-top:var(--telekom-spacing-composition-space-08)}:host([type='subtle']) [part~='body']{margin-top:var(--telekom-spacing-composition-space-06)}:host([type='subtle']) [part~='meta']{margin-top:var(--telekom-spacing-composition-space-05)}";

const TelekomMobileFlyoutCanvas = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scaleCloseNavFlyout = createEvent(this, "scale-close-nav-flyout", 7);
    this.closeButtonLabel = 'Close';
    this.closeButtonTitle = null;
  }
  render() {
    return (h(Host, null, h("div", { part: "base" }, h("div", { part: "header" }, h("slot", { name: "heading" }, h("h2", { part: "heading" }, this.appName)), h("a", { href: "javascript:void(0)", onClick: (event) => {
        event.preventDefault();
        emitEvent(this, 'scaleCloseNavFlyout', {
          originalEvent: event,
        });
      }, title: this.closeButtonTitle, "aria-label": this.closeButtonLabel, part: "close-button" }, h("slot", { name: "close-icon" }, h("scale-icon-action-close", { decorative: true, size: 20 })))), h("div", { part: "body" }, h("slot", { name: "row" }, h("slot", { name: "mobile-before-main-nav" }), h("slot", { name: "mobile-main-nav" }), h("slot", { name: "mobile-after-main-nav" }), h("div", { part: "meta" }, h("div", null, h("slot", { name: "mobile-meta-nav-external" }), h("slot", { name: "mobile-meta-nav" })), h("div", null, h("slot", { name: "mobile-lang-switcher" }))), h("slot", { name: "mobile-bottom" }))))));
  }
  get hostElement() { return getElement(this); }
};
TelekomMobileFlyoutCanvas.style = telekomMobileFlyoutCanvasCss;

const telekomNavFlyoutCss = ":host{--top:var(--scl-telekom-header-height, 0);--left:0;--width:100vw;--height:auto;--min-height:25vh;--position:fixed;--background:var(--telekom-color-background-surface);--background-variant-mobile:var(--telekom-color-background-canvas);--background-backdrop:var(--telekom-color-background-canvas);--shadow:none;--z-index:7;--duration:0;--duration-backdrop-in:0;--duration-backdrop-out:0;--translate-x:0;--translate-y:0;--translate-z:0;display:contents}[part~='variant-mobile']{--height:100vh;--top:0;--background:var(--background-variant-mobile)}:host([debug]) [part~='base']{outline:1px dotted gold}[part~='base']{display:none;position:var(--position);z-index:var(--z-index);top:var(--top);left:var(--left);width:var(--width);height:var(--height);min-height:var(--min-height);background:var(--background);box-shadow:var(--shadow);animation-duration:var(--duration);border-top:1px solid var(--telekom-color-ui-faint)}[part~='base'][part~='expanded']{display:block}[part~='backdrop']{display:none;position:var(--position);background-color:var(--telekom-color-background-backdrop);top:var(--top);left:var(--left);width:var(--width);height:100vh;animation-duration:var(--duration)}[part~='backdrop'][part~='expanded']:not([part~='variant-mobile']){display:block}[part~='backdrop'][part~='expanded'][part~='in']{animation-duration:var(--duration-backdrop-in)}[part~='backdrop'][part~='expanded'][part~='out']{animation-duration:var(--duration-backdrop-out)}@keyframes toggle{from{opacity:0;transform:translate3d(\n      var(--translate-x),\n      var(--translate-y),\n      var(--translate-z)\n    )}}[part~='in']{animation-name:toggle;animation-timing-function:var(--telekom-motion-easing-enter)}[part~='out']{animation-name:toggle;animation-fill-mode:forwards;animation-direction:reverse;animation-timing-function:var(--telekom-motion-easing-exit)}";

const TelekomNavItem$1 = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scaleExpanded = createEvent(this, "scale-expanded", 7);
    /** Open the flyout menu */
    this.expanded = false;
    /** (optional) Variant ("mobile" gives it a fixed height of `100vh`) */
    this.variant = null;
    /** (optinal) Whether the flyout should open on hover (needs better name!) */
    this.hover = false;
    this.isExpanded = this.expanded;
    this.handleSpaceOrEnterForHover = (event) => {
      if (this.isExpanded) {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        this.expanded = true;
        this.show();
      }
    };
    this.handleTriggerClick = (event) => {
      if (event.ctrlKey) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      this.expanded = !this.expanded;
      this.parentElement.removeEventListener('mouseleave', this.handlePointerOut);
    };
    this.handlePointerIn = () => {
      if (this.isExpanded) {
        return;
      }
      this.expanded = true;
      this.hostElement.parentElement.addEventListener('mouseleave', this.handlePointerOut);
      if (this.hostElement.querySelector('scale-telekom-mega-menu') !== null) {
        this.hostElement
          .querySelector('scale-telekom-mega-menu')
          .addEventListener('mouseleave', this.handlePointerOut);
      }
    };
    this.handlePointerOut = () => {
      this.expanded = false;
      this.hostElement.removeEventListener('mouseleave', this.handlePointerOut);
      if (this.hostElement.querySelector('scale-telekom-mega-menu') !== null) {
        this.hostElement
          .querySelector('scale-telekom-mega-menu')
          .addEventListener('mouseleave', this.handlePointerOut);
      }
    };
  }
  handleWindowKeydown(event) {
    if (!this.isExpanded) {
      return;
    }
    if (event.key === 'Escape') {
      this.expanded = false;
      try {
        this.triggerElement.focus();
      }
      catch (err) { }
    }
  }
  handleScaleCloseNavFlyout() {
    this.expanded = false;
  }
  handleDocumentClick(event) {
    if (!this.isExpanded) {
      return;
    }
    const { target } = event;
    const isNotTrigger = () => target !== this.triggerElement && !this.triggerElement.contains(target);
    const isNotWithin = () => !this.hostElement.contains(target);
    if (isNotTrigger() && isNotWithin()) {
      this.expanded = false;
    }
  }
  expandedChanged(newValue) {
    newValue ? this.show() : this.hide();
  }
  connectedCallback() {
    this.parentElement = this.hostElement.parentElement;
    if (this.triggerElement == null) {
      return;
    }
    this.triggerElement.setAttribute('aria-haspopup', 'true');
    this.triggerElement.setAttribute('aria-expanded', String(this.expanded));
    if (this.hover) {
      this.triggerElement.addEventListener('mouseenter', this.handlePointerIn);
      this.triggerElement.addEventListener('keypress', this.handleSpaceOrEnterForHover);
    }
    else {
      this.triggerElement.addEventListener('click', this.handleTriggerClick);
    }
  }
  disconnectedCallback() {
    this.triggerElement.removeEventListener('click', this.handleTriggerClick);
    this.triggerElement.removeEventListener('mouseenter', this.handlePointerIn);
    this.triggerElement.removeEventListener('keypress', this.handleSpaceOrEnterForHover);
  }
  async show() {
    this.isExpanded = true;
    this.animationState = 'in';
    requestAnimationFrame(async () => {
      await animationsFinished(this.hostElement.shadowRoot);
      this.animationState = undefined;
      this.triggerElement.setAttribute('aria-expanded', 'true');
      emitEvent(this, 'scaleExpanded', { expanded: true });
    });
  }
  async hide() {
    this.animationState = 'out';
    requestAnimationFrame(async () => {
      await animationsFinished(this.hostElement.shadowRoot);
      this.animationState = undefined;
      this.isExpanded = false;
      this.triggerElement.setAttribute('aria-expanded', 'false');
      emitEvent(this, 'scaleExpanded', { expanded: false });
    });
  }
  /**
   * Get the trigger element "on demand".
   * Either query by `trigger-selector` or
   * get the previous sibling.
   */
  get triggerElement() {
    if (this.triggerSelector) {
      return this.hostElement.ownerDocument.querySelector(this.triggerSelector);
    }
    return this.hostElement.previousElementSibling;
  }
  render() {
    return (h(Host, null, h("div", { part: classnames('base', this.animationState, `variant-${this.variant}`, {
        expanded: this.isExpanded,
      }) }, h("slot", null)), h("div", { part: classnames('backdrop', this.animationState, `variant-${this.variant}`, {
        expanded: this.isExpanded,
      }), onClick: () => (this.expanded = false) })));
  }
  get hostElement() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedChanged"]
  }; }
};
TelekomNavItem$1.style = telekomNavFlyoutCss;

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
const TelekomNavItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get hostElement() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeChanged"],
    "variant": ["activeChanged"]
  }; }
};
TelekomNavItem.style = telekomNavItemCss;

export { Badge as scale_badge, UserFileUser as scale_icon_user_file_user, TelekomMobileFlyoutCanvas as scale_telekom_mobile_flyout_canvas, TelekomNavItem$1 as scale_telekom_nav_flyout, TelekomNavItem as scale_telekom_nav_item };