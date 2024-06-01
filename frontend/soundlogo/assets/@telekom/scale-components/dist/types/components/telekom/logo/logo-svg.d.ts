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
export declare class LogoSvg {
  hostElement: HTMLElement;
  /** (optional) Sets the icon color via the `fill` attribute */
  color?: string;
  innerRole?: 'link' | 'img';
  focusable: boolean;
  /** @deprecated (optional) When using the icon standalone, make it meaningful for accessibility */
  accessibilityTitle?: string;
  /** (optional) When using the icon standalone, make it meaningful for accessibility */
  logoTitle?: string;
  /** (optional) Hide all logo related titles */
  logoHideTitle?: boolean;
  componentWillLoad(): void;
  componentDidRender(): void;
  getColor(): any;
  getTitle: (title: string, linkAddition: string) => any;
  render(): any;
}
