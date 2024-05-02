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
export declare class TabPanel {
  generatedId: number;
  el: HTMLElement;
  /** True for smaller height and font size */
  /** @deprecated - no more size difference */
  small?: boolean;
  /** (optional) size  */
  /** @deprecated  - no more size difference */
  size: 'small' | 'large';
  /** (optional) adds tab-index="0" to the panel, set to false to exclude the tab-panel from the tab sequence, e.g. if the first element in the panel is a focusable button */
  tabbablePanel?: boolean;
  /** (optional) Injected CSS styles */
  styles?: string;
  componentDidRender(): void;
  setTabIndex(): {
    tabindex: string;
  };
  render(): any;
}
