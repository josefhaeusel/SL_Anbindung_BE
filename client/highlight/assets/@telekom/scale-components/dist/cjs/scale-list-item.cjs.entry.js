'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');

const listItemCss = ":host(scale-list-item){--display:block;--font-size:var(--telekom-typography-font-size-body);--line-height:var(--telekom-typography-line-spacing-standard);--spacing-left:calc(0.5ch + var(--telekom-spacing-composition-space-07));--spacing-left-nested:calc(\n    0.5ch + var(--telekom-spacing-composition-space-06)\n  );--font-marker-ordered:var(--telekom-text-style-body);--font-marker-ordered-nested:var(--telekom-text-style-small-bold);--line-height-marker-ordered-nested:var(\n    --telekom-typography-line-spacing-standard\n  );--spacing-top-marker-ordered-nested:calc(\n    var(--telekom-spacing-composition-space-06) -\n      var(--telekom-spacing-composition-space-05)\n  );--spacing-right-no-marker:var(--telekom-spacing-composition-space-04);display:var(--display)}.list-item{position:relative;font-size:var(--font-size);line-height:var(--line-height);padding-left:var(--spacing-left);margin-top:var(--telekom-spacing-composition-space-03)}.list-item--nested{padding-left:var(--spacing-left-nested)}.list-item:before{content:'';top:0;left:0;position:absolute}.list-item--unordered:before{top:0.5em;border:var(--telekom-spacing-composition-space-01) solid currentColor;display:block;transform:scale(0.66);background:currentColor;box-sizing:border-box;border-radius:50%;width:var(--telekom-spacing-composition-space-04);height:var(--telekom-spacing-composition-space-04)}.list-item--nested.list-item--unordered:before{border:var(--telekom-spacing-composition-space-01) solid currentColor;background:transparent}.list-item--ordered:before{content:attr(data-index) '.';font:var(--font-marker-ordered);font-variant-numeric:tabular-nums}.list-item--nested.list-item--ordered:before{font:var(--telekom-text-style-small-bold);font-variant-numeric:tabular-nums;line-height:var(--line-height-marker-ordered-nested);padding-top:var(--spacing-top-marker-ordered-nested)}.list-item--no-marker{display:inline-flex;align-items:center;padding-left:0}.list-item--no-marker:before{display:none}.list-item--no-marker>::slotted(*){margin-right:var(--spacing-right-no-marker)}";

const ListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** Whether this is a child of an ordered scale-list, gets set automatically by its parent */
    this.ordered = false;
    /** If `false`, no marker or left padding will be visible */
    this.marker = true;
    this.hasNestedChild = false;
    this.isNested = false;
    this.handleSlotChange = ({ target }) => {
      this.hasNestedChild =
        target.assignedNodes().length > 0;
      this.isNested = this.isNestedCheck();
    };
    this.isNestedCheck = () => {
      return this.el.closest('scale-list[slot="nested"]') != null;
    };
  }
  componentWillLoad() {
    this.isNested = this.isNestedCheck();
  }
  connectedCallback() {
    if (!this.el.hasAttribute('role')) {
      this.el.setAttribute('role', 'listitem');
    }
  }
  render() {
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), index.h("div", { class: this.getCssClassMap(), "data-index": this.index, part: index$1.classnames('base', this.ordered ? 'ordered' : 'unordered', this.isNested && 'nested', !this.marker && 'no-marker') }, index.h("slot", null), index.h("div", { class: "list-item__nested-list", part: "nested-list", hidden: !this.hasNestedChild }, index.h("slot", { name: "nested", onSlotchange: this.handleSlotChange })))));
  }
  getCssClassMap() {
    const orderType = this.ordered ? 'ordered' : 'unordered';
    return index$1.classnames('list-item', this.isNested && 'list-item--nested', `list-item--${orderType}`, !this.marker && 'list-item--no-marker');
  }
  get el() { return index.getElement(this); }
};
ListItem.style = listItemCss;

exports.scale_list_item = ListItem;
