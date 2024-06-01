'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a0ea3d79.js');
const index$1 = require('./index-53f5a5fc.js');
const utils = require('./utils-e9c3b953.js');

const segmentedButtonCss = ":host{--background-color:var(--telekom-color-ui-faint);--radius:var(--telekom-radius-standard);--height:32px;--height-medium:40px;--height-large:44px;display:flex;flex-direction:column}.segmented-button{background-color:var(--background-color);border:0;border-radius:var(--radius);padding:0 var(--telekom-spacing-composition-space-02);width:fit-content;height:var(--height);display:inline-grid}.segmented-button--full-width{width:100%}.segmented-button--medium{height:var(--height-medium);padding:0 var(--telekom-spacing-composition-space-02)}.segmented-button--large{height:var(--height-large);padding:0 var(--telekom-spacing-composition-space-02)}.segmented-button--label{font-size:var(--telekom-typography-font-size-body);font-weight:var(--telekom-typography-font-weight-bold);margin-bottom:var(--telekom-spacing-composition-space-04)}.segmented-button--helper-text{margin-top:var(--telekom-spacing-composition-space-04)}";

const CHECKMARK_WIDTH_SMALL = 14;
const CHECKMARK_WIDTH_MEDIUM = 18 + 12;
const CHECKMARK_WIDTH_LARGE = 20 + 18;
const SegmentedButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scaleChange = index.createEvent(this, "scale-change", 7);
    this.scaleChangeLegacy = index.createEvent(this, "scaleChange", 7);
    /** segment position within button */
    this.position = 0;
    this.slottedSegments = 0;
    /** state */
    this.status = [];
    /** (optional) The size of the button */
    this.size = 'small';
    /** (optional) Allow more than one button to be selected */
    this.multiSelect = false;
    /** (optional) If `true`, the button is disabled */
    this.disabled = false;
    /** (optional) If `true`, expand to container width */
    this.fullWidth = false;
    /** (optional) If `true`, show error message */
    this.invalid = false;
    /** (optional) If `true`, show error message */
    this.helperText = 'Please select an option';
    /** (optional) aria-label attribute needed for icon-only buttons */
    this.ariaLabelTranslation = `segment button with $slottedSegments`;
    this.showHelperText = false;
    this.getAdjacentSiblings = (tempState, i) => {
      let adjacentSiblings = '';
      if (i !== 0 && tempState[i].selected && tempState[i - 1].selected) {
        adjacentSiblings = 'left';
      }
      if (i !== tempState.length - 1 &&
        tempState[i].selected &&
        tempState[i + 1].selected) {
        adjacentSiblings = `${adjacentSiblings ? adjacentSiblings + ' right' : 'right'}`;
      }
      return adjacentSiblings;
    };
  }
  scaleClickHandler(ev) {
    let tempState;
    if (!this.multiSelect) {
      if (!ev.detail.selected) {
        tempState = this.status.map((obj) => ev.detail.id === obj.id ? ev.detail : Object.assign({}, obj));
        /* clicked button has now selected state */
      }
      else {
        tempState = this.status.map((obj) => ev.detail.id === obj.id ? ev.detail : Object.assign(Object.assign({}, obj), { selected: false }));
      }
    }
    else {
      tempState = this.status.map((obj) => ev.detail.id === obj.id ? ev.detail : Object.assign({}, obj));
    }
    this.setState(tempState);
  }
  handlePropsChange() {
    this.propagatePropsToChildren();
  }
  /**
   * Keep props, needed in children buttons, in sync
   */
  propagatePropsToChildren() {
    this.getAllSegments().forEach((segment) => {
      segment.setAttribute('size', this.size);
      segment.setAttribute('selected-index', this.selectedIndex.toString());
      if (this.disabled) {
        segment.setAttribute('disabled', 'disabled');
      }
    });
  }
  componentDidLoad() {
    const tempState = [];
    const segments = this.getAllSegments();
    this.slottedSegments = segments.length;
    const longestButtonWidth = this.getLongestButtonWidth();
    segments.forEach((segment) => {
      this.position++;
      tempState.push({
        id: segment.getAttribute('segment-id') || segment.segmentId,
        selected: segment.hasAttribute('selected') || segment.selected,
      });
      segment.setAttribute('position', this.position.toString());
      segment.setAttribute('aria-description-translation', '$position $selected');
    });
    if (!this.fullWidth) {
      this.container.style.gridTemplateColumns = `repeat(${this.hostElement.children.length}, ${Math.ceil(longestButtonWidth)}px)`;
    }
    else {
      this.container.style.display = 'flex';
    }
    this.selectedIndex = this.getSelectedIndex();
    this.propagatePropsToChildren();
    this.position = 0;
    this.status = tempState;
    this.setState(tempState);
  }
  componentWillUpdate() {
    this.selectedIndex = this.getSelectedIndex();
    this.showHelperText = false;
    if (this.invalid &&
      this.status.filter((e) => e.selected === true).length <= 0) {
      this.showHelperText = true;
    }
  }
  getSelectedIndex() {
    if (this.multiSelect) {
      // in multi-select having no selected segments is allowed
      return -1;
    }
    else {
      const allSegments = this.getAllSegments();
      const selectedIndex = allSegments.findIndex((el) => el.selected === true);
      return selectedIndex;
    }
  }
  // all segmented buttons should have the same width, based on the largest one
  getLongestButtonWidth() {
    let tempWidth = 0;
    Array.from(this.hostElement.children).forEach((child) => {
      const selected = child.hasAttribute('selected');
      const iconOnly = child.hasAttribute('icon-only');
      const checkmark = this.size === 'small'
        ? CHECKMARK_WIDTH_SMALL
        : this.size === 'medium'
          ? CHECKMARK_WIDTH_MEDIUM
          : CHECKMARK_WIDTH_LARGE;
      if (selected || iconOnly) {
        tempWidth =
          child.getBoundingClientRect().width > tempWidth
            ? child.getBoundingClientRect().width
            : tempWidth;
      }
      else {
        tempWidth =
          child.getBoundingClientRect().width + checkmark > tempWidth
            ? child.getBoundingClientRect().width + checkmark
            : tempWidth;
      }
    });
    return tempWidth;
  }
  setState(tempState) {
    const segments = Array.from(this.hostElement.querySelectorAll('scale-segment'));
    segments.forEach((segment, i) => {
      segment.setAttribute('adjacent-siblings', this.getAdjacentSiblings(tempState, i));
      segment.setAttribute('selected', tempState[i].selected ? 'true' : 'false');
    });
    this.status = tempState;
    utils.emitEvent(this, 'scaleChange', this.status);
  }
  getAllSegments() {
    return Array.from(this.hostElement.querySelectorAll('scale-segment'));
  }
  getAriaLabelTranslation() {
    const filledText = this.ariaLabelTranslation.replace(/\$slottedSegments/g, `${this.slottedSegments}`);
    return filledText;
  }
  render() {
    return (index.h(index.Host, null, this.styles && index.h("style", null, this.styles), this.label && (index.h("span", { class: "segmented-button--label" }, " ", this.label, " ")), index.h("div", { class: this.getCssClassMap(), part: this.getBasePartMap(), "aria-label": this.getAriaLabelTranslation(), role: "group", ref: (el) => (this.container = el) }, index.h("slot", null)), this.showHelperText && (index.h("scale-helper-text", { class: "segmented-button--helper-text", helperText: this.helperText, variant: 'danger' }))));
  }
  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }
  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }
  getCssOrBasePartMap(mode) {
    const prefix = mode === 'basePart' ? '' : 'segmented-button--';
    return index$1.classnames('segmented-button', this.size && `${prefix}${this.size}`, this.fullWidth && `${prefix}full-width`);
  }
  get hostElement() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["handlePropsChange"],
    "size": ["handlePropsChange"],
    "selectedIndex": ["handlePropsChange"]
  }; }
};
SegmentedButton.style = segmentedButtonCss;

exports.scale_segmented_button = SegmentedButton;
