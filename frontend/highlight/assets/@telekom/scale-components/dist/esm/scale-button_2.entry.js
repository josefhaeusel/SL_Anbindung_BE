import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';
import { c as classnames } from './index-713f92a5.js';
import { h as hasShadowDom, i as isScaleIcon } from './utils-c4af5b47.js';

const buttonCss = ":host{--width:auto;--spacing-x-right:var(--telekom-spacing-composition-space-07);--spacing-x-left:var(--telekom-spacing-composition-space-07);--spacing-x-icon-only:var(--telekom-spacing-composition-space-05);--min-height:var(--telekom-spacing-composition-space-13);--min-width:var(--telekom-spacing-composition-space-13);--radius:var(--telekom-radius-standard);--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--color-focus:var(--telekom-color-functional-focus-standard);--font-weight:var(--telekom-typography-font-weight-bold);--font-size:var(--telekom-typography-font-size-body);--line-height:var(--telekom-typography-line-spacing-tight);--spacing-icon-x:var(--telekom-spacing-composition-space-04);--vertical-align:middle;--font-size-small:var(--telekom-typography-font-size-caption);--line-height-small:1.125rem;--min-height-small:var(--telekom-spacing-composition-space-10);--spacing-x-right-small:var(--telekom-spacing-composition-space-06);--spacing-x-left-small:var(--telekom-spacing-composition-space-06);--spacing-x-icon-only-small:var(--telekom-spacing-composition-space-00);--spacing-icon-x-small:var(--telekom-spacing-composition-space-03);--radius-primary:var(--radius);--background-primary:var(--telekom-color-primary-standard);--background-primary-hover:var(--telekom-color-primary-hovered);--background-primary-active:var(--telekom-color-primary-pressed);--background-primary-disabled:var(--telekom-color-ui-disabled);--color-primary:var(--telekom-color-text-and-icon-white-standard);--color-primary-disabled:var(--telekom-color-text-and-icon-disabled);--radius-secondary:var(--radius);--border-width-secondary:var(--telekom-spacing-composition-space-01);--background-secondary:transparent;--color-secondary:var(--telekom-color-text-and-icon-standard);--color-secondary-hover:var(--telekom-color-text-and-icon-standard);--color-secondary-active:var(--telekom-color-text-and-icon-standard);--color-secondary-disabled:var(--telekom-color-text-and-icon-disabled);--background-secondary:var(--telekom-color-ui-state-fill-standard);--background-secondary-hover:var(--telekom-color-ui-state-fill-hovered);--background-secondary-active:var(--telekom-color-ui-state-fill-pressed);--background-secondary-disabled:none;--border-secondary:var(--telekom-color-ui-border-standard);--border-secondary-hover:var(--telekom-color-ui-border-hovered);--border-secondary-active:var(--telekom-color-ui-border-pressed);--border-secondary-focus:var(--telekom-color-functional-focus-standard);--border-secondary-white:var(--telekom-color-ui-white);--color-secondary-white:var(--telekom-color-ui-white);--background-secondary-white-hover:var(\n    --telekom-color-ui-state-fill-hovered-inverted\n  );--background-secondary-white-active:var(\n    --telekom-color-ui-state-fill-pressed-inverted\n  );--secondary-white-opacity:0.5;--radius-ghost:var(--radius);--border-width-ghost:var(--telekom-spacing-composition-space-01);--spacing-x-ghost:var(--telekom-spacing-composition-space-04);--color-ghost:var(--telekom-color-text-and-icon-link-standard);--color-ghost-hover:var(--telekom-color-text-and-icon-link-hovered);--color-ghost-active:var(--telekom-color-text-and-icon-link-active);--color-ghost-disabled:var(--telekom-color-text-and-icon-disabled);--background-ghost-hover:var(--telekom-color-ui-state-fill-hovered);--background-ghost-active:var(--telekom-color-ui-state-fill-pressed);display:inline-block}.button{box-sizing:border-box;display:inline-flex;align-items:center;position:relative;border:0;outline:none;cursor:pointer;user-select:none;font-family:inherit;word-spacing:inherit;letter-spacing:inherit;justify-content:center;text-decoration:none;font-weight:var(--font-weight);font-size:var(--font-size);line-height:var(--line-height);min-height:var(--min-height);min-width:var(--min-width);width:var(--width);padding-left:var(--spacing-x-left);padding-right:var(--spacing-x-right);vertical-align:var(--vertical-align);transition:var(--transition)}.button.button--size-small{font-size:var(--font-size-small);line-height:var(--line-height-small);min-height:var(--min-height-small);padding-left:var(--spacing-x-left-small);padding-right:var(--spacing-x-right-small)}.button:not(.button--disabled):focus{outline:var(--telekom-line-weight-highlight) solid var(--color-focus);outline-offset:var(--telekom-spacing-composition-space-01)}.button.button--icon-before:not(.button--icon-only) ::slotted(*){margin-right:var(--spacing-icon-x);margin-left:calc(var(--spacing-icon-x-small) * -1);margin-top:var(--spacing-icon-x);margin-bottom:var(--spacing-icon-x)}.button.button--icon-before:not(.button--icon-only).button--size-small ::slotted(*){margin-right:var(--spacing-icon-x-small);margin-left:calc(var(--spacing-icon-x) * -0.5)}.button.button--icon-after:not(.button--icon-only) ::slotted(*){margin-left:var(--spacing-icon-x);margin-right:calc(var(--spacing-icon-x-small) * -1);margin-top:var(--spacing-icon-x);margin-bottom:var(--spacing-icon-x)}.button.button--icon-after:not(.button--icon-only).button--size-small ::slotted(*){margin-left:var(--spacing-icon-x-small);margin-right:calc(var(--spacing-icon-x) * -0.5)}.button:after{top:0;left:0;width:100%;border:var(--telekom-spacing-composition-space-01) solid transparent;height:100%;content:'';display:block;position:absolute;box-sizing:border-box;pointer-events:none;border-radius:var(--radius)}.button--icon-only{padding-left:var(--spacing-x-icon-only);padding-right:var(--spacing-x-icon-only)}.button--icon-only.button--variant-secondary{padding-left:calc(var(--spacing-x-icon-only) - 1px);padding-right:calc(var(--spacing-x-icon-only) - 1px)}.button--icon-only.button--size-small{padding-left:var(--spacing-x-icon-only-small);padding-right:var(--spacing-x-icon-only-small);min-width:32px}.button--icon-only.button--size-small.button--variant-secondary{padding-left:calc(var(--spacing-x-icon-only-small) - 1px);padding-right:calc(var(--spacing-x-icon-only-small) - 1px)}.button--disabled{cursor:not-allowed}.button--variant-primary{text-align:center;border-radius:var(--radius);background:var(--background-primary);color:var(--color-primary)}.button--variant-primary:not(.button--disabled):hover{background:var(--background-primary-hover)}.button--variant-primary:not(.button--disabled):active{background:var(--background-primary-active)}.button--disabled.button--variant-primary{background:var(--background-primary-disabled);color:var(--color-primary-disabled)}.button--variant-secondary{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary);background-color:var(--background-secondary);border-color:var(--border-secondary)}.button--variant-secondary:not(.button--disabled):hover{color:var(--color-secondary-hover);background-color:var(--background-secondary-hover);border-color:var(--border-secondary-hover)}.button--variant-secondary:not(.button--disabled):active{color:var(--color-secondary-active);background-color:var(--background-secondary-active);border-color:var(--border-secondary-active)}.button--disabled.button--variant-secondary{color:var(--color-secondary-disabled);background-color:var(--background-secondary-disabled)}.button--variant-ghost{background:transparent;text-align:center;border-radius:var(--radius-ghost);border:var(--border-width-ghost) solid transparent;color:var(--color-ghost);padding-left:var(--spacing-x-ghost);padding-right:var(--spacing-x-ghost)}.button--variant-ghost:not(.button--disabled):hover{color:var(--color-ghost-hover);background-color:var(--background-ghost-hover)}.button--variant-ghost:not(.button--disabled):active{color:var(--color-ghost-active);background-color:var(--background-ghost-active)}.button--disabled.button--variant-ghost{color:var(--color-ghost-disabled)}.button--variant-secondary-white{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary-white);background-color:var(--background-secondary);border-color:var(--border-secondary-white)}.button--variant-secondary-white:not(.button--disabled):hover{background-color:var(--background-secondary-white-hover)}.button--variant-secondary-white:not(.button--disabled):active{background-color:var(--background-secondary-white-active)}.button--disabled.button--variant-secondary-white{opacity:var(--secondary-white-opacity)}";

const DEFAULT_ICON_SIZE = 24;
const buttonIconSizeMap = {
  small: 16,
  large: 20,
};
const Button = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** (optional) The size of the button */
    this.size = 'large';
    /** (optional) Button variant */
    this.variant = 'primary';
    /** (optional) If `true`, the button is disabled */
    this.disabled = false;
    /** (optional) Set to `true` when the button contains only an icon */
    this.iconOnly = false;
    /** (optional) Icon position related to the label */
    this.iconPosition = 'before';
    /** (optional) The target attribute for the <a> tag */
    this.target = '_self';
    /**
     * Hack to make the button behave has expected when inside forms.
     * @see https://github.com/ionic-team/ionic-framework/blob/master/core/src/components/button/button.tsx#L155-L175
     */
    this.handleClick = (ev) => {
      // No need to check for `disabled` because disabled buttons won't emit clicks
      if (hasShadowDom(this.hostElement)) {
        const parentForm = this.hostElement.closest('form');
        if (parentForm) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          if (this.type) {
            fakeButton.type = this.type;
          }
          fakeButton.style.display = 'none';
          parentForm.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
  }
  /**
   * Prevent clicks from being emitted from the host
   * when the component is `disabled`.
   */
  handleHostClick(event) {
    if (this.disabled === true) {
      event.stopImmediatePropagation();
    }
  }
  async setFocus() {
    this.focusableElement.focus();
  }
  componentDidLoad() {
    this.setChildrenIconSize();
  }
  connectedCallback() {
    this.setIconPositionProp();
    this.appendEnterKeySubmitFallback();
  }
  disconnectedCallback() {
    this.cleanUpEnterKeySubmitFallback();
  }
  /**
   * In order for forms to be submitted with the Enter key
   * there has to be a `button` or an `input[type="submit"]` in the form.
   * Browsers do not take the <button> inside the Shadow DOM into account for this matter.
   * So we carefully append an `input[type="submit"]` to overcome this.
   *
   * @see https://stackoverflow.com/a/35235768
   * @see https://github.com/telekom/scale/issues/859
   */
  appendEnterKeySubmitFallback() {
    if (hasShadowDom(this.hostElement)) {
      const parentForm = this.hostElement.closest('form');
      if (parentForm == null) {
        return;
      }
      const hasSubmitInputAlready = parentForm.querySelector('input[type="submit"]') != null;
      if (hasSubmitInputAlready) {
        return;
      }
      this.fallbackSubmitInputElement = document.createElement('input');
      this.fallbackSubmitInputElement.type = 'submit';
      this.fallbackSubmitInputElement.hidden = true;
      parentForm.appendChild(this.fallbackSubmitInputElement);
    }
  }
  cleanUpEnterKeySubmitFallback() {
    if (this.fallbackSubmitInputElement != null) {
      try {
        this.fallbackSubmitInputElement.remove();
        this.fallbackSubmitInputElement = null;
      }
      catch (err) { }
    }
  }
  /**
   * Detect whether the last node is an element (not text).
   * If so, it's probably an icon, so we set `iconPosition` to `after`.
   */
  setIconPositionProp() {
    const nodes = Array.from(this.hostElement.childNodes).filter((node) => {
      // ignore empty text nodes, which are probably due to formatting
      return !(node.nodeType === 3 && node.nodeValue.trim() === '');
    });
    const lastNode = nodes.length > 1 ? nodes[nodes.length - 1] : null;
    if (!this.iconOnly && lastNode && isScaleIcon(lastNode)) {
      this.iconPosition = 'after';
    }
  }
  /**
   * Set any children icon's size according the button size.
   */
  setChildrenIconSize() {
    if (this.size != null && buttonIconSizeMap[this.size] != null) {
      const icons = Array.from(this.hostElement.childNodes).filter(isScaleIcon);
      icons.forEach((icon) => {
        if (icon.size === DEFAULT_ICON_SIZE) {
          icon.size = buttonIconSizeMap[this.size];
        }
      });
    }
  }
  render() {
    const basePart = classnames('base', this.variant && `variant-${this.variant}`, this.iconOnly && 'icon-only', !this.iconOnly && this.iconPosition, this.disabled && 'disabled');
    return (h(Host, null, this.styles && h("style", null, this.styles), this.href ? (h("a", { ref: (el) => (this.focusableElement = el), class: this.getCssClassMap(), href: this.disabled ? null : this.href, download: this.download, target: this.target, rel: this.target === '_blank' ? 'noopener noreferrer' : undefined, part: basePart, tabIndex: this.innerTabindex, role: "link", "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.innerAriaLabel }, h("slot", null))) : (h("button", { ref: (el) => (this.focusableElement = el), class: this.getCssClassMap(), onClick: this.handleClick, disabled: this.disabled, type: this.type, part: basePart, tabIndex: this.innerTabindex, name: this.name, value: this.value, "aria-label": this.innerAriaLabel }, h("slot", null)))));
  }
  getCssClassMap() {
    return classnames('button', this.size && `button--size-${this.size}`, this.variant && `button--variant-${this.variant}`, this.iconOnly && `button--icon-only`, !this.iconOnly &&
      this.iconPosition &&
      `button--icon-${this.iconPosition}`, this.disabled && `button--disabled`);
  }
  get hostElement() { return getElement(this); }
};
Button.style = buttonCss;

const iconCss = "scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";

const Icon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Will be used for both `width` and `height`, all icons are square.
     * Keep in mind the `viewBox` attribute is set to "0 0 24 24".
     */
    this.size = 24;
    /** The SVG `fill` attribute */
    this.fill = 'var(--icon-color, currentColor)';
    /** The SVG `stroke` attribute */
    this.stroke = 'transparent';
    /** (optional) If `true` the icon can receive focus */
    this.focusable = false;
    /** (optional) If `true` the svg element will get aria-hidden="true" */
    this.decorative = false;
  }
  render() {
    const pathAttributes = {
      fill: this.fill,
      stroke: this.stroke,
    };
    const ariaHidden = this.decorative ? { 'aria-hidden': 'true' } : {};
    const focusable = this.focusable ? { tabindex: 0 } : {};
    return (h(Host, null, h("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", class: this.getCssClassMap(), part: "base", width: this.size, height: this.size, viewBox: "0 0 24 24", role: "img" }, ariaHidden, focusable), this.accessibilityTitle && h("title", null, this.accessibilityTitle), this.path ? (h("path", Object.assign({ d: this.path }, pathAttributes, { part: "path" }))) : (h("use", Object.assign({ xlinkHref: `#icon-${this.name}` }, pathAttributes))))));
  }
  getCssClassMap() {
    return classnames('icon');
  }
};
Icon.style = iconCss;

export { Button as scale_button, Icon as scale_icon };
