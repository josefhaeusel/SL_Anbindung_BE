import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const dropdownSelectItemCss = "/*!*option*!*/[part~='base']{display:flex;justify-content:flex-start;align-items:center}[part~='prefix'],[part~='label'],[part~='suffix']{display:inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:1}";

const DropdownSelectItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("div", { part: "base" }, h("div", { part: "prefix" }, h("slot", { name: "prefix" })), h("div", { part: "label" }, h("slot", null)), h("div", { part: "suffix" }, h("slot", { name: "suffix" }))));
  }
  get hostElement() { return this; }
  static get style() { return dropdownSelectItemCss; }
}, [1, "scale-dropdown-select-item", {
    "selected": [4],
    "focused": [4],
    "value": [520],
    "disabled": [516]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-dropdown-select-item"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-dropdown-select-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DropdownSelectItem);
      }
      break;
  } });
}

export { DropdownSelectItem as D, defineCustomElement as d };
