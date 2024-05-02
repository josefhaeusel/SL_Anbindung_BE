import { r as registerInstance, h, a as Host, g as getElement } from './index-6d95a4bc.js';
import { s as statusNote } from './status-note-0089e9c9.js';

const tabPanelCss = ":host{--spacing-top:var(--telekom-spacing-composition-space-08)}.tab-panel{margin-top:var(--spacing-top)}";

let i = 0;
const TabPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.generatedId = i++;
    /** True for smaller height and font size */
    /** @deprecated - no more size difference */
    this.small = false;
    /** (optional) size  */
    /** @deprecated  - no more size difference */
    this.size = 'small';
    /** (optional) adds tab-index="0" to the panel, set to false to exclude the tab-panel from the tab sequence, e.g. if the first element in the panel is a focusable button */
    this.tabbablePanel = true;
  }
  componentDidRender() {
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "small" is deprecated.',
        type: 'warn',
        source: this.el,
      });
    }
  }
  setTabIndex() {
    if (this.tabbablePanel === true) {
      return { tabindex: '0' };
    }
  }
  render() {
    return (h(Host, Object.assign({ id: `scale-tab-panel-${this.generatedId}`, role: "tabpanel" }, this.setTabIndex()), this.styles && h("style", null, this.styles), h("div", { part: "tab-panel", class: "tab-panel" }, h("slot", null))));
  }
  get el() { return getElement(this); }
};
TabPanel.style = tabPanelCss;

export { TabPanel as scale_tab_panel };
