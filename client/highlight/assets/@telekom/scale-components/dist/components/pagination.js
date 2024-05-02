import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { s as statusNote } from './status-note.js';
import { e as emitEvent } from './utils.js';
import { d as defineCustomElement$4 } from './navigation-double-left.js';
import { d as defineCustomElement$3 } from './navigation-double-right.js';
import { d as defineCustomElement$2 } from './navigation-left.js';
import { d as defineCustomElement$1 } from './navigation-right.js';

const paginationCss = ":host{--color:var(--telekom-color-text-and-icon-standard);--radius:var(--telekom-radius-standard);--font-size:var(--telekom-typography-font-size-small);--border:1px solid var(--telekom-color-ui-faint);--color-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-active:var(--telekom-color-text-and-icon-primary-pressed);--color-button:var(--telekom-color-ui-subtle);--border-button:var(--border);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--radius-first-prompt:var(--radius) 0 0 var(--radius);--radius-last-prompt:0 var(--radius) var(--radius) 0;--radius-first-prompt-stack:0 0 0 var(--radius);--radius-last-prompt-stack:0 0 var(--radius) 0;--stroke-svg:var(--telekom-color-ui-extra-strong);--stroke-svg-high-contrast:#fff;--width-button:44px;--padding-info:var(--telekom-spacing-composition-space-04);--height-button:44px;--line-height-info:calc(var(--height-button) - 2px)}.pagination{display:flex;overflow:auto;flex-wrap:wrap}.pagination__info,.pagination__info-responsive{color:var(--color);text-align:center;font-size:var(--font-size);font-weight:var(--telekom-typography-font-weight-medium);line-height:var(--line-height-info);padding:0 var(--padding-info);border:var(--border);flex-shrink:0;border-left:0;border-right:0;white-space:nowrap;order:1}.pagination__info-responsive{display:none}.pagination__info span,.pagination__info-responsive span{color:var(--telekom-color-text-and-icon-primary-standard);font-weight:var(--telekom-typography-font-weight-bold)}button{display:flex;flex-shrink:0;justify-content:center;align-items:center;padding:0;margin:0;height:var(--height-button);width:var(--width-button);color:var(--color-button);background:none;border:var(--border-button)}button:focus{outline:var(--focus-outline);outline-offset:-3px}.pagination__first-prompt{border-radius:var(--radius-first-prompt);margin-right:-1px}.pagination__last-prompt{border-radius:var(--radius-last-prompt);margin-left:-1px;order:2}.pagination__next-prompt{order:2}button svg{display:block}button:not(:disabled){cursor:pointer}button:not(:disabled) svg{color:var(--stroke-svg)}button:disabled svg{color:var(--telekom-color-text-and-icon-disabled)}button:not(:disabled):hover{border-color:var(--telekom-color-primary-hovered);z-index:1}button:not(:disabled):hover svg{color:var(--color-hover)}button:not(:disabled):active{border-color:var(--color-active);z-index:1}button:not(:disabled):active svg{color:var(--color-active)}.pagination--hide-borders .pagination__info,.pagination--hide-borders .pagination__info-responsive{border:0}.pagination--hide-borders .pagination__info-responsive{border-bottom:var(--border)}.pagination--hide-borders button{border-radius:0;border-top-width:0;border-bottom-width:0}.pagination--hide-borders .pagination__first-prompt{border-left-color:transparent}.pagination--hide-borders .pagination__last-prompt{border-right-color:transparent}.pagination--hide-borders button:not(:disabled):hover{border-width:1px;border-color:var(--telekom-color-primary-hovered)}.pagination__button-wrapper{display:flex}@media screen and (forced-colors: active), (-ms-high-contrast: active){button:not(:disabled) svg{color:var(--stroke-svg-high-contrast)}}@media screen and (max-width: 639px){:host{width:100%}.pagination{flex-direction:column}.pagination__info-responsive{display:initial;order:0;overflow:auto;border-left:var(--border);border-right:var(--border);border-bottom:0;border-radius:var(--radius) var(--radius) 0 0;line-height:var(--line-height-info)}.pagination__info{display:none;line-height:var(--line-height-info)}.pagination__first-prompt{border-radius:var(--radius-first-prompt-stack)}.pagination__last-prompt{border-radius:var(--radius-last-prompt-stack)}.pagination__next-prompt{margin-left:-1px}button{flex:1;height:var(--height-button)}.pagination--hide-borders .pagination__first-prompt{border-left-width:0}.pagination--hide-borders .pagination__last-prompt{border-right-width:0}}";

const DEFAULT_ICON_SIZE = 20;
const name = 'pagination';
const Pagination = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  /* 6. Lifecycle Events (call order) */
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scalePagination = createEvent(this, "scale-pagination", 7);
    this.scalePaginationLegacy = createEvent(this, "scalePagination", 7);
    /* 2. State Variables (alphabetical) */
    /* 3. Public Properties (alphabetical) */
    /** (optional) Deprecated; hideBorder should replace hideBorders */
    this.hideBorders = false;
    /** (optional) Set to true to hide top and bottom borders */
    this.hideBorder = false;
    /** (optional) Set number of rows/elements to show per page */
    this.pageSize = 10;
    /** (optional) Index of first element to display */
    this.startElement = 0;
    /** (optional) Total number of rows/elements used to calculate page displays */
    this.totalElements = 1;
    /** @deprecated - size should replace small */
    this.small = false;
    /** (optional) translation to 'Go to first page'  */
    this.ariaLabelFirstPage = 'Go to first page';
    /** (optional) translation to 'Go to next page'  */
    this.ariaLabelNextPage = 'Go to next page';
    /** (optional) translation to 'Go to previous page'  */
    this.ariaLabelPreviousPage = 'Go to previous page';
    /** (optional) translation to 'Go to last page'  */
    this.ariaLabelLastPage = 'Go to last page';
    /* 5. Private Properties (alphabetical) */
    /** Calculated width of largest text so buttons don't move while changing pages */
    this.maxWidth = 100;
  }
  componentWillLoad() {
    this.calculateWidth();
  }
  componentWillUpdate() { }
  componentDidRender() {
    if (this.hideBorders !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "hideBorders" is deprecated. Please use the "hideBorder" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "small" is deprecated. Please use css overwrite!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "size" is deprecated. Please use css overwrite!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  componentDidLoad() { }
  componentDidUpdate() { }
  disconnectedCallback() { }
  /* 7. Listeners */
  calculateWidth() {
    // calculate max possible width
    this.maxWidth = (this.totalElements.toString().length * 3 + 3) * 9;
  }
  /* 8. Public Methods */
  /* 9. Local Methods */
  goFirstPage() {
    this.startElement = 0;
    this.emitUpdate('FIRST');
  }
  goPreviousPage() {
    // Min to prevent going below 0
    this.startElement -= Math.min(this.pageSize, this.startElement);
    this.emitUpdate('PREVIOUS');
  }
  goNextPage() {
    this.startElement += this.pageSize;
    this.emitUpdate('NEXT');
  }
  goLastPage() {
    const p = this.pageSize;
    // Make sure startElement is multiple of pageSize
    this.startElement = Math.ceil((this.totalElements - p) / p) * p;
    this.emitUpdate('LAST');
  }
  emitUpdate(direction) {
    const data = {
      startElement: this.startElement,
      direction,
    };
    emitEvent(this, 'scalePagination', data);
  }
  /* 10. Render */
  render() {
    const total = this.totalElements;
    const start = this.startElement + 1;
    const end = Math.min(this.startElement + this.pageSize, total);
    const isAtStart = start === 1;
    const isAtEnd = end === total;
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { part: this.getBasePartMap(), class: this.getCssClassMap() }, h("div", { part: "info-responsive", class: `${name}__info-responsive` }, h("span", null, start, "-", end), ' ', "/ ", total), h("div", { class: `${name}__button-wrapper` }, h("div", { part: "info", class: `${name}__info`, style: { width: `${this.maxWidth}px` } }, h("span", null, start, "-", end), ' ', "/ ", total), h("button", { class: `${name}__first-prompt`, part: "first-prompt", disabled: isAtStart, onClick: () => this.goFirstPage(), "aria-label": this.ariaLabelFirstPage }, h("scale-icon-navigation-double-left", { size: DEFAULT_ICON_SIZE, decorative: true })), h("button", { class: `${name}__prev-prompt`, part: "prev-prompt", disabled: isAtStart, onClick: () => this.goPreviousPage(), "aria-label": this.ariaLabelPreviousPage }, h("scale-icon-navigation-left", { size: DEFAULT_ICON_SIZE, decorative: true })), h("button", { class: `${name}__next-prompt`, part: "next-prompt", disabled: isAtEnd, onClick: () => this.goNextPage(), "aria-label": this.ariaLabelNextPage }, h("scale-icon-navigation-right", { size: DEFAULT_ICON_SIZE, decorative: true })), h("button", { class: `${name}__last-prompt`, part: "last-prompt", disabled: isAtEnd, onClick: () => this.goLastPage(), "aria-label": this.ariaLabelLastPage }, h("scale-icon-navigation-double-right", { size: DEFAULT_ICON_SIZE, decorative: true }))))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const prefix = mode === 'basePart' ? '' : `${name}--`;
    return classnames(name, (this.hideBorder || this.hideBorders) && `${prefix}hide-borders`);
  }
  get hostElement() { return this; }
  static get watchers() { return {
    "totalElements": ["calculateWidth"]
  }; }
  static get style() { return paginationCss; }
}, [1, "scale-pagination", {
    "hideBorders": [4, "hide-borders"],
    "hideBorder": [4, "hide-border"],
    "pageSize": [2, "page-size"],
    "startElement": [2, "start-element"],
    "totalElements": [2, "total-elements"],
    "styles": [1],
    "small": [4],
    "size": [1],
    "ariaLabelFirstPage": [1, "aria-label-first-page"],
    "ariaLabelNextPage": [1, "aria-label-next-page"],
    "ariaLabelPreviousPage": [1, "aria-label-previous-page"],
    "ariaLabelLastPage": [1, "aria-label-last-page"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-pagination", "scale-icon-navigation-double-left", "scale-icon-navigation-double-right", "scale-icon-navigation-left", "scale-icon-navigation-right"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-pagination":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Pagination);
      }
      break;
    case "scale-icon-navigation-double-left":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "scale-icon-navigation-double-right":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
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

export { Pagination as P, defineCustomElement as d };
