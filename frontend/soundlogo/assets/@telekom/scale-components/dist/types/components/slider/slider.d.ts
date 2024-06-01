/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { EventEmitter } from '../../stencil-public-runtime';
export declare class Slider {
  sliderTrack?: HTMLDivElement;
  hostElement: HTMLElement;
  /** (optional) the name of the slider */
  name?: string;
  /** (optional) the value of the slider */
  value?: number;
  /** (optional) multi-thumb */
  range?: boolean;
  /** (optional) when `range` is true, the "from" value */
  valueFrom?: number;
  /** (optional) when `range` is true, the "to" value */
  valueTo?: number;
  /** t(optional) he minimal value of the slider */
  min?: number;
  /** (optional) the maximal value of the slider */
  max?: number;
  /** (optional) the step size to increase or decrease when dragging slider */
  step?: number;
  /** (optional) show a mark for each step */
  showStepMarks?: boolean;
  /** (optional) slider label */
  label?: string;
  /** (optional) helper text */
  helperText?: string;
  /** (optional) slider display value */
  showValue?: boolean;
  /** (optional) slider value unit */
  unit?: string;
  /** (optional) unit position */
  unitPosition?: 'before' | 'after';
  /** (optional) number of decimal places */
  decimals?: 0 | 1 | 2;
  /**
   * (optional) adapt styles for a specific platform.
   * Ideally done via a global `data-platform` attribute
   * (e.g. data-platform="ios" on `body`)
   * but browser support is not yet sufficient.
   * @see @url(https://caniuse.com/mdn-css_selectors_host-context)
   */
  platform?: 'ios' | 'android';
  /** @deprecated (optional) slider custom color */
  customColor?: string;
  /** (optional) disabled  */
  disabled?: boolean;
  /** @deprecated (optional) smaller track */
  trackSmall?: boolean;
  /** @deprecated (optional) larger thumb */
  thumbLarge?: boolean;
  /** (optional) Slider id */
  sliderId?: string;
  /** (optional) Aria label for range slider */
  innerAriaValueText: string;
  /** (optional) Injected CSS styles */
  styles?: string;
  position: number;
  positionFrom: number;
  positionTo: number;
  scaleChange: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  scaleChangeLegacy: EventEmitter<number>;
  scaleInput: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  scaleInputLegacy: EventEmitter<number>;
  private dragging;
  private activeRangeThumb;
  private readonly internalId;
  private lastThumbZIndex;
  constructor();
  handleValueChange(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  onButtonDown: (event: any) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onDragStart: () => void;
  onDragging: (event: any) => void;
  onDragEnd: () => void;
  handleTouchEvent(event: any): MouseEvent | Touch;
  setValue: (nextValue: number, valueKey?: string | 'value' | 'valueFrom' | 'valueTo') => void;
  setActiveRangeThumbFromEvent: (event: any) => void;
  setPosition: (thumb?: string) => void;
  /**
   * Utility function
   * e.g. 'value' -> 'valueFrom' if `activeRangeThumb='From'`
   * @param propName
   * @returns {string} The prop name with the range suffix if needed
   */
  getKeyFor: (propName: 'value' | 'offsetLeft' | 'position', thumb?: string) => string;
  getTextValue: () => string;
  getNumberOfSteps: () => number[];
  clamp: (val: number) => number;
  addGlobalListeners(e: any): void;
  removeGlobalListeners(): void;
  getRangeAriaValueText(): string;
  render(): any;
}
