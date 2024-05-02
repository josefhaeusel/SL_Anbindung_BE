'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const statusNote = require('./status-note-dceee5a3.js');

const tableCss = "scale-table{--radius:var(--telekom-radius-standard) var(--telekom-radius-standard) 0 0;--background:var(--telekom-color-ui-state-fill-standard);--color:var(--telekom-color-text-and-icon-standard);--color-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-active:var(--telekom-color-text-and-icon-primary-pressed);--font-size:var(--telekom-typography-font-size-small);--font-weight:var(--telekom-typography-font-weight-bold);--spacing-tbody-td:var(--telekom-spacing-composition-space-06)\n    var(--telekom-spacing-composition-space-04);--border-bottom-tbody-td:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-ui-faint);--background-tbody:var(--telekom-color-ui-state-fill-standard);--background-tbody-tr-hover:var(--telekom-color-ui-state-fill-hovered);--background-tfoot:var(--telekom-color-ui-state-fill-standard);--border-bottom-tfoot-td:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-ui-extra-strong);--spacing-th-sortable:0 0 0 0;--background-th-sortable-hover:var(--telekom-color-ui-subtle);--background-th-sortable-active:var(--telekom-color-ui-faint);--box-shadow-th-sortable-focus:inset 0 0 0\n    var(--telekom-spacing-composition-space-02)\n    var(--telekom-color-functional-focus-standard);--background-tr-striped:var(--telekom-color-ui-subtle);--padding:var(--telekom-spacing-composition-space-00)\n    var(--telekom-spacing-composition-space-04)}.table{display:block;overflow:auto;border-radius:var(--radius);background:var(--background);color:var(--color)}.table table{width:100%;white-space:nowrap;border-spacing:0;border-collapse:collapse}.table th{padding:var(--padding);text-align:left;line-height:32px;color:var(--color);font-size:var(--font-size);background:var(--telekom-color-background-surface-subtle)}.table td{padding:var(--padding)}.table tbody tr td{padding:8px}.table tbody td{border-bottom:var(--border-bottom-tbody-td)}.table thead tr th:last-of-type,.table tbody tr td:last-of-type,.table tfoot tr td:last-of-type{padding-right:12px}.table tfoot{background:var(--background-tfoot)}.table tbody{background:var(--background-tbody)}.table tfoot tr td{padding:8px;font-weight:var(--font-weight);border-bottom:var(--border-bottom-tfoot-td)}.table .scale-sort-indicator-icon{display:none !important}.table tbody tr:hover{background:var(--background-tbody-tr-hover)}.table th:focus{outline:none}.table--size-default tbody tr td{padding:var(--spacing-tbody-td)}.table--sortable th{cursor:pointer;padding:var(--spacing-th-sortable);padding-right:0}.table--sortable th:hover{padding:var(--spacing-th-sortable);background:var(--background-th-sortable-hover)}.table--sortable th:active{background:var(--background-th-sortable-active)}.table--sortable th:focus{box-shadow:var(--box-shadow-th-sortable-focus);border-radius:var(--radius)}.table--sortable th .scale-sort-indicator-icon{display:inline-flex !important}.table--sortable th[aria-disabled]{padding:var(--padding);pointer-events:none}.table--sortable th:not([aria-sort]){padding:var(--padding);padding-right:var(--telekom-spacing-composition-space-07)}.table--sortable th[aria-sort='none']{padding:var(--padding);padding-right:var(--telekom-spacing-composition-space-05)}.table--sortable th[aria-sort='ascending'] .scale-sort-indicator .up{color:var(--color)}.table--sortable th:hover .scale-sort-indicator .up{color:var(--color-hover)}.table--sortable th:hover[aria-sort='ascending'] .scale-sort-indicator-icon.up{color:var(--color-hover)}.table--sortable th:active[aria-sort='ascending'] .scale-sort-indicator-icon.up{color:var(--color-active)}.table--sortable th[aria-sort='ascending'] .scale-sort-indicator{color:transparent}.table--sortable th:hover[aria-sort='ascending'] .scale-sort-indicator{color:transparent}.table--sortable th:active[aria-sort='ascending'] .scale-sort-indicator{color:transparent}.table--sortable th[aria-sort='descending'] .scale-sort-indicator-icon.up{color:transparent}.table--sortable th:hover[aria-sort='descending'] .scale-sort-indicator-icon.up{color:transparent}.table--sortable th:active[aria-sort='descending'] .scale-sort-indicator-icon.up{color:transparent}.table--sortable th[aria-sort='descending'] .scale-sort-indicator-icon{color:var(--color)}.table--sortable th:hover[aria-sort='descending'] .scale-sort-indicator-icon{color:var(--color-hover)}.table--sortable th:active[aria-sort='descending'] .scale-sort-indicator-icon{color:var(--color-active)}.table--sortable th .scale-sort-indicator{width:16px;height:16px;margin:0 0 0 4px;display:inline-block;position:relative}.table--sortable th .scale-sort-indicator-icon{top:4px;left:0;width:16px;height:16px;position:absolute}.table--sortable th .scale-sort-indicator{color:transparent}.table--sortable th[aria-sort='none']:hover{padding:0 0 0 0}.table--sortable th[aria-sort='none'] .scale-sort-indicator{display:none}.table--sortable th:not([aria-sort]):hover{padding:0 8px 0 0}.table--sortable th:not([aria-sort]) .scale-sort-indicator{display:none}.table--sortable th:hover .scale-sort-indicator{display:inline-block}.table--striped table tr:nth-child(even){background:var(--background-tr-striped)}";

const Table = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** (optional) Display sort arrows on/off */
    this.showSort = false;
    /** (optional) Striped Table */
    this.striped = false;
    /** object of the slots in use */
    this.slots = {};
  }
  addSortIndicator(el) {
    el.insertAdjacentHTML('afterbegin', `
        <span class="scale-sort-indicator" aria-hidden="true">
          <scale-icon-content-sort-indicator-up class="scale-sort-indicator-icon up" size="16"></scale-icon-content-sort-indicator-up>
          <scale-icon-content-sort-indicator-down class="scale-sort-indicator-icon down" size="16"></scale-icon-content-sort-indicator-down>
        </span>`);
  }
  componentWillLoad() {
    if (this.showSort) {
      this.hostElement.querySelectorAll('th').forEach((th) => {
        this.addSortIndicator(th);
      });
    }
  }
  componentWillUpdate() {
    this.hostElement.querySelectorAll('th').forEach((th) => {
      // only cols that are NOT added dynamically have children (the sorting icon), added on componentWillLoad
      if (th.children.length === 0) {
        // this may not be needed
        th.classList.add('dynamically-added');
        if (this.showSort) {
          this.addSortIndicator(th);
        }
      }
    });
  }
  componentDidLoad() {
    const table = this.hostElement;
    const progressbar = table.querySelectorAll('scale-progress-bar');
    if (progressbar) {
      progressbar.forEach((el) => {
        el.showStatus = false;
      });
    }
    this.mutationObserver = new MutationObserver(() => {
      this.forceUpdate = String(Date.now());
    });
    this.mutationObserver.observe(this.hostElement, {
      childList: true,
      subtree: true,
    });
  }
  componentDidRender() {
    if (this.size) {
      statusNote.statusNote({
        tag: 'deprecated',
        message: 'Property "size" is deprecated. Please use css overwrites for a small version!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.getCssClassMap() }, this.styles && index.h("style", null, this.styles), index.h("slot", null)));
  }
  getCssClassMap() {
    return index$1.classnames('table', this.showSort && 'table--sortable', this.striped && 'table--striped');
  }
  get hostElement() { return index.getElement(this); }
};
Table.style = tableCss;

exports.scale_table = Table;
