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
export declare class Logo {
  hostElement: HTMLElement;
  /** (optional) Variant/color of the logo text and logo */
  variant: 'magenta' | 'white';
  /** (optional) Set transparent background */
  transparent: boolean;
  /** @deprecated; (optional) Language of the logo text/ claimOff showes just the T Logo */
  language?: 'de' | 'en' | 'cz' | 'hr' | 'hu' | 'me' | 'mk_lat' | 'mk_kyr' | 'ro' | 'sk' | string;
  /** (optional) The height in pixels */
  size?: number;
  /** (optional) Set a link */
  href?: string;
  /** (optional) When using the icon standalone, make it meaningful for accessibility */
  accessibilityTitle?: string;
  /** (optional) Injected CSS styles */
  styles?: string;
  focusable: boolean;
  scrollIntoViewOnFocus: boolean;
  /** (optional) set logo specific title */
  logoTitle?: string;
  /** (optional) Hide all logo related titles */
  logoHideTitle?: boolean;
  /** FIXME is this actually working? probably not because of shadow DOM? */
  logoAriaDescribedBy?: string;
  /** FIXME this is also probably not working properly, see below (it needs a string value) */
  logoAriaHidden?: boolean;
  componentDidRender(): void;
  render(): any;
  getCssClassMap(): string;
}
