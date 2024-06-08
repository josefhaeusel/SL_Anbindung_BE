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
import { Component, Prop, h, Host, Element, State, Listen, } from '@stencil/core';
const LOGIN_DEFAULT = 'https://www.telekom.de';
const LOGIN_HELP_DEFAULT = 'https://www.telekom.de';
const REGISTER_DEFAULT = 'https://www.telekom.de';
const LOGIN_SETTINGS_DEFAULT = 'https://account.idm.telekom.com/account-manager/';
const LOGOUT_DEFAULT = 'https://accounts.login.idm.telekom.com/sessionmessage/logout';
const readData = (data) => {
  let parsedData;
  try {
    parsedData = JSON.parse(data);
  }
  catch (error) {
    // console.error("Error parsing data! error: " + error);
    // console.error("data: " + data);
    parsedData = data;
  }
  return parsedData;
};
export class TelekomProfileMenu {
  constructor() {
    this.menuOpen = false;
  }
  onKeydown(event) {
    if (this.menuOpen && 'Escape' === event.key) {
      this.userMenuDesktopTrigger.click();
    }
  }
  openMenu(event) {
    if (event.target.id === 'user-menu-desktop') {
      this.menuOpen = true;
    }
  }
  closeMenu(event) {
    if (event.target.id === 'user-menu-desktop') {
      this.menuOpen = false;
    }
  }
  printSignInMenu() {
    return (h("div", { class: "profile-menu-login" },
      h("strong", null, this.serviceName),
      h("p", null, this.serviceDescription),
      h("scale-button", { href: this.loginUrl || LOGIN_DEFAULT }, this.loginLabel),
      h("div", { class: "footer" },
        h("p", null,
          h("scale-link", { "omit-underline": "true", href: this.loginHelpUrl || LOGIN_HELP_DEFAULT }, this.loginHelpLabel)),
        h("div", { id: "signUp" },
          h("p", null, this.registerHeadline),
          h("p", null,
            h("scale-link", { "omit-underline": "true", href: this.registerUrl || REGISTER_DEFAULT }, this.registerLabel))))));
  }
  printProfileTrigger() {
    if (!this.loggedIn) {
      return (h("scale-icon-user-file-user", { selected: this.menuOpen }));
    }
    // logged in
    return (h("scale-badge", { "no-dot": "true" },
      h("scale-icon-user-file-user", { selected: this.menuOpen }),
      h("div", { slot: "dot", class: "mydot" },
        h("scale-icon-action-checkmark", null))));
  }
  buildLogoutButton() {
    return {
      type: 'button',
      name: this.logoutLabel,
      href: this.logoutUrl || LOGOUT_DEFAULT,
      variant: 'secondary',
      onClick: this.logoutHandler,
    };
  }
  buildUserNavigation() {
    const divider = [{ type: 'divider' }];
    const userInfo = readData(this.userInfo);
    if (!userInfo) {
      // console.error("userInfo missing");
    }
    userInfo.type = 'userInfo';
    let serviceLinks = readData(this.serviceLinks);
    if (!serviceLinks) {
      // console.error("serviceLinks missing");
      serviceLinks = [];
    }
    for (const el of serviceLinks) {
      el.type = 'item';
    }
    const loginSettings = {
      type: 'item',
      name: this.loginSettingsLabel || 'Login-Settings',
      href: this.loginSettingsUrl || LOGIN_SETTINGS_DEFAULT,
      icon: 'service-settings',
    };
    let menu = [];
    menu = menu.concat(userInfo);
    if (!this.serviceLinksEmpty()) {
      menu = menu.concat(divider);
    }
    menu = menu.concat(serviceLinks);
    if (!this.hideLoginSettings) {
      menu = menu.concat(loginSettings);
    }
    if (!this.serviceLinksEmpty()) {
      menu = menu.concat(divider);
    }
    menu = menu.concat(this.buildLogoutButton());
    return menu;
  }
  serviceLinksEmpty() {
    return (this.hideLoginSettings && this.serviceLinks.length < 1) === true;
  }
  buildDesktopMenuStyles() {
    let style = '.app-navigation-user-menu { padding: 12px 24px 4px 24px; box-sizing: border-box; }';
    style +=
      '.scale-icon { width: 20px; height: 20px; display: flex; align-self: center; }';
    if (this.serviceLinksEmpty()) {
      style += 'scale-button { margin-top: 32px !important; }';
    }
    return style;
  }
  buildMobileMenuStyles() {
    let style = '.app-navigation-user-menu__user-info--name { margin-bottom: 0 !important; }';
    style += '.scale-icon { width: 20px; height: 20px; }';
    if (this.serviceLinksEmpty()) {
      style += 'scale-button { margin-top: 32px !important; }';
    }
    return style;
  }
  printLabel() {
    if (!this.accessibilityLabel) {
      return h("span", { class: "flyout-label" }, this.label);
    }
    return (h("div", { class: "flyout-label" },
      h("span", { "aria-hidden": "true" }, this.label),
      h("span", { class: "visually-hidden" }, this.accessibilityLabel)));
  }
  render() {
    return (h(Host, null,
      h("scale-telekom-nav-item", { class: "user-menu-desktop" },
        h("scale-menu-flyout", { direction: "bottom-left", "onScale-open": (event) => this.openMenu(event), "onScale-close": (event) => this.closeMenu(event), triggerHasPopup: false },
          h("a", { href: "javascript:void(0);", slot: "trigger", role: "button", "aria-controls": "user-menu-desktop" },
            this.printProfileTrigger(),
            this.printLabel()),
          h("scale-menu-flyout-list", { id: "user-menu-desktop", preventFlipVertical: true, role: "none" },
            this.loggedIn && [
              h("app-navigation-user-menu", { hide: () => {
                  this.userMenuDesktopTrigger.click();
                }, navigation: this.buildUserNavigation(), styles: this.buildDesktopMenuStyles() }),
            ],
            !this.loggedIn && [
              h("app-navigation-user-menu", { navigation: [] }, this.printSignInMenu()),
            ]),
          h("div", { slot: "trigger", class: "user-menu-trigger", ref: (el) => (this.userMenuDesktopTrigger = el) }))),
      h("scale-telekom-nav-item", { class: "user-menu-mobile" },
        h("button", null,
          this.printProfileTrigger(),
          this.printLabel()),
        h("scale-telekom-nav-flyout", { variant: "mobile" },
          h("scale-telekom-mobile-flyout-canvas", { appName: this.appName, closeButtonLabel: this.closeMenuAccessibilityLabel },
            this.loggedIn && [
              h("app-navigation-user-menu", { slot: "mobile-main-nav", navigation: this.buildUserNavigation(), styles: this.buildMobileMenuStyles() }),
            ],
            !this.loggedIn && [
              h("app-navigation-user-menu", { slot: "mobile-main-nav", navigation: [] }, this.printSignInMenu()),
            ])))));
  }
  static get is() { return "scale-telekom-profile-menu"; }
  static get originalStyleUrls() { return {
    "$": ["telekom-profile-menu.css"]
  }; }
  static get styleUrls() { return {
    "$": ["telekom-profile-menu.css"]
  }; }
  static get properties() { return {
    "label": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "label",
      "reflect": false
    },
    "accessibilityLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "accessibility-label",
      "reflect": false
    },
    "closeMenuAccessibilityLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "close-menu-accessibility-label",
      "reflect": false
    },
    "appName": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "app-name",
      "reflect": false
    },
    "serviceName": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "service-name",
      "reflect": false
    },
    "serviceDescription": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "service-description",
      "reflect": false
    },
    "loggedIn": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logged-in",
      "reflect": false
    },
    "loginUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "login-url",
      "reflect": false
    },
    "loginLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "login-label",
      "reflect": false
    },
    "loginHelpUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "login-help-url",
      "reflect": false
    },
    "loginHelpLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "login-help-label",
      "reflect": false
    },
    "registerHeadline": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "register-headline",
      "reflect": false
    },
    "registerUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "register-url",
      "reflect": false
    },
    "registerLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "register-label",
      "reflect": false
    },
    "userInfo": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "user-info",
      "reflect": false
    },
    "serviceLinks": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "service-links",
      "reflect": false
    },
    "loginSettingsLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "login-settings-label",
      "reflect": false
    },
    "loginSettingsUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "login-settings-url",
      "reflect": false
    },
    "hideLoginSettings": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "hide-login-settings",
      "reflect": false
    },
    "logoutLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logout-label",
      "reflect": false
    },
    "logoutUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logout-url",
      "reflect": false
    },
    "logoutHandler": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logout-handler",
      "reflect": false
    }
  }; }
  static get states() { return {
    "menuOpen": {}
  }; }
  static get elementRef() { return "hostElement"; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "onKeydown",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
