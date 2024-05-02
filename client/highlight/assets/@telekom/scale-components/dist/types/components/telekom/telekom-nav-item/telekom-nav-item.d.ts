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
import { HTMLStencilElement } from '../../../stencil-public-runtime';
export declare class TelekomNavItem {
  hostElement: HTMLStencilElement;
  active?: boolean;
  variant?: 'meta-nav-external' | 'meta-nav' | 'lang-switcher' | 'main-nav' | 'functions';
  role: string | null;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  activeChanged(newValue: boolean): void;
  connectedCallback(): void;
  componentDidLoad(): void;
  get linkElement(): HTMLAnchorElement | null;
  render(): any;
}
