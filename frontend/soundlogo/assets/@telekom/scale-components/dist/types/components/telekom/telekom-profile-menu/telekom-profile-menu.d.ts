/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 */
export declare class TelekomProfileMenu {
  hostElement: HTMLElement;
  userMenuDesktopTrigger?: HTMLSpanElement;
  label: string;
  accessibilityLabel?: string;
  closeMenuAccessibilityLabel: string;
  appName: string;
  serviceName: string;
  serviceDescription: string;
  loggedIn: boolean;
  loginUrl?: string;
  loginLabel: string;
  loginHelpUrl?: string;
  loginHelpLabel: string;
  registerHeadline: string;
  registerUrl?: string;
  registerLabel: string;
  userInfo: any;
  serviceLinks: any;
  loginSettingsLabel?: string;
  loginSettingsUrl?: string;
  hideLoginSettings: boolean;
  logoutLabel: string;
  logoutUrl?: string;
  logoutHandler?: string;
  menuOpen: boolean;
  onKeydown(event: KeyboardEvent): void;
  openMenu(event: any): void;
  closeMenu(event: any): void;
  printSignInMenu(): any;
  printProfileTrigger(): any;
  buildLogoutButton(): {
    type: string;
    name: string;
    href: string;
    variant: string;
    onClick: string;
  };
  buildUserNavigation(): any[];
  serviceLinksEmpty(): boolean;
  buildDesktopMenuStyles(): string;
  buildMobileMenuStyles(): string;
  printLabel(): any;
  render(): any;
}
