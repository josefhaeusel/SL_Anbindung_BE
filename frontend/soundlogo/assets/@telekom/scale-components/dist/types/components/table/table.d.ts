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
export declare class Table {
  mutationObserver: MutationObserver;
  hostElement: HTMLElement;
  /** (optional) Display sort arrows on/off */
  showSort?: boolean;
  /** @deprecated - css overwrite should replace size */
  size?: string;
  /** (optional) Striped Table */
  striped?: boolean;
  /** (optional) Injected CSS styles */
  styles?: string;
  /** "forceUpdate" hack, set it to trigger and re-render */
  forceUpdate: string;
  /** object of the slots in use */
  slots: {
    header?: Element;
    table?: Element;
  };
  addSortIndicator(el: any): void;
  componentWillLoad(): void;
  componentWillUpdate(): void;
  componentDidLoad(): void;
  componentDidRender(): void;
  disconnectedCallback(): void;
  render(): any;
  getCssClassMap(): string;
}
