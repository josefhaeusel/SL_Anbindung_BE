import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$e } from './app-navigation-user-menu2.js';
import { d as defineCustomElement$d } from './badge.js';
import { d as defineCustomElement$c } from './button.js';
import { d as defineCustomElement$b } from './icon.js';
import { d as defineCustomElement$a } from './action-checkmark.js';
import { d as defineCustomElement$9 } from './action-close.js';
import { d as defineCustomElement$8 } from './user-file-user.js';
import { d as defineCustomElement$7 } from './link.js';
import { d as defineCustomElement$6 } from './menu-flyout.js';
import { d as defineCustomElement$5 } from './menu-flyout-list.js';
import { d as defineCustomElement$4 } from './telekom-mobile-flyout-canvas.js';
import { d as defineCustomElement$3 } from './telekom-nav-flyout.js';
import { d as defineCustomElement$2 } from './telekom-nav-item.js';

const telekomProfileMenuCss = "/**\n * @license\n * Scale https://github.com/telekom/scale\n *\n * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG\n *\n * This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at https://mozilla.org/MPL/2.0/.\n\n */\n/**\n * @license\n * Scale https://github.com/telekom/scale\n *\n * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG\n *\n * This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at https://mozilla.org/MPL/2.0/.\n */\n\nscale-telekom-profile-menu scale-menu-flyout {\n  display: flex;\n  height: 100%;\n\n  > a {\n    box-sizing: border-box;\n    display: flex;\n    align-items: flex-end;\n    height: 100%;\n    position: relative;\n    font: inherit;\n    color: inherit;\n    background: none;\n    appearance: none;\n    padding: 0 0 var(--_spacing-bottom-slotted-bottom) 0;\n    border: none;\n    text-decoration: none;\n    cursor: pointer;\n    transition: padding-bottom var(--telekom-motion-duration-immediate)\n      var(--telekom-motion-easing-standard);\n\n    line-height: var(--telekom-typography-line-spacing-loose);\n    font-weight: var(--telekom-typography-font-weight-extra-bold);\n\n    > .flyout-label {\n      font-size: var(--scl-font-size-12);\n      font-weight: var(--telekom-typography-font-weight-regular);\n      margin-left: var(--scl-spacing-8);\n    }\n  }\n\n  > a:hover,\n  > a:hover svg {\n    color: var(--telekom-color-text-and-icon-primary-hovered);\n  }\n\n  > a[aria-expanded='true'],\n  > a[aria-expanded='true'] svg {\n    color: var(--telekom-color-text-and-icon-primary-standard);\n  }\n\n  > a[aria-expanded='true'] .flyout-label {\n    color: var(--telekom-color-text-and-icon-standard);\n  }\n}\n\n.user-menu-mobile {\n  display: flex;\n  height: 100%;\n}\n.user-menu-mobile .flyout-label [aria-hidden='true'] {\n  display: none;\n}\n.user-menu-mobile .mydot .scale-icon {\n  width: 12px;\n  height: 12px;\n}\n\n.scale-telekom-nav-item > button {\n  padding-bottom: var(--_spacing-bottom-slotted-bottom);\n}\n\n.user-menu-desktop {\n  display: none;\n}\n\n.user-menu-desktop scale-menu-flyout {\n  display: flex;\n}\n\n.user-menu-trigger {\n  position: relative;\n  left: 24px;\n}\n\n@media screen and (min-width: 640px) {\n  .user-menu-trigger {\n    top: calc(var(--_spacing-bottom-slotted-bottom) + 8px);\n  }\n}\n\n@media screen and (min-width: 1040px) {\n  .user-menu-mobile {\n    display: none;\n  }\n\n  .user-menu-desktop {\n    display: flex;\n    height: 100%;\n  }\n\n  scale-telekom-profile-menu scale-menu-flyout-list::part(base) {\n    top: calc(100% + var(--telekom-spacing-composition-space-03) - 16px);\n  }\n}\n\n@media screen and (min-width: 1296px) {\n  scale-telekom-header-data-back-compat .user-menu-trigger {\n    top: calc(var(--_spacing-bottom-slotted-bottom) + 12px);\n  }\n}\n\n.profile-menu-login {\n  min-width: 15em;\n  padding-right: var(--telekom-spacing-composition-space-06);\n\n  > scale-button {\n    display: block;\n    --width: 100%;\n    margin: 1.5em 0;\n  }\n}\n\n.profile-menu-login > strong {\n  display: flex;\n  font: var(--telekom-text-style-heading-5);\n  padding: var(--telekom-spacing-composition-space-04) 0;\n}\n@media screen and (min-width: 640px) {\n  .profile-menu-login > strong {\n    padding-top: var(--telekom-spacing-composition-space-10);\n  }\n  .profile-menu-login .footer {\n    padding-top: var(--telekom-spacing-composition-space-04);\n  }\n}\n@media screen and (min-width: 1040px) {\n  .profile-menu-login {\n    padding: 12px 24px 4px 24px;\n  }\n  .profile-menu-login > strong {\n    padding-top: 0;\n  }\n  .profile-menu-login > scale-button {\n    margin: 16px 0;\n  }\n  .profile-menu-login .footer {\n    padding-top: 0;\n  }\n}\n\n.profile-menu-login p {\n  line-height: 1.4em;\n  color: var(--telekom-color-text-and-icon-additional);\n  margin: 0;\n}\n.profile-menu-login #signUp {\n  margin-top: var(--telekom-spacing-composition-space-04);\n}\n.profile-menu-login #signUp p {\n  margin: 0;\n}\n\n.scale-telekom-nav-list[variant='functions']::part(circle) .scale-icon {\n  height: 12px;\n  width: 12px;\n}\n\n.mydot {\n  background: var(--telekom-color-functional-success-standard);\n  border: 2px solid #fff;\n  border-radius: 50%;\n  color: #fff;\n  display: flex;\n  height: 12px;\n  width: 12px;\n  position: absolute;\n  top: -4px;\n  right: -6px;\n}\nscale-telekom-profile-menu scale-menu-flyout a .mydot .scale-icon {\n  color: #fff !important;\n  height: 12px;\n  width: 12px;\n}\n\napp-navigation-user-menu {\n  --color-divider: transparent;\n}\n\napp-navigation-user-menu::part(userInfo) {\n  margin: 0;\n}\napp-navigation-user-menu::part(userInfo)\n  .app-navigation-user-menu__user-info--name {\n  margin-bottom: 0;\n}\n\napp-navigation-user-menu::part(rule-horizontal) {\n  visibility: hidden;\n  margin: var(--telekom-spacing-composition-space-05) 0;\n}\n\n@media screen and (min-width: 640px) {\n  app-navigation-user-menu::part(userInfo) {\n    padding-top: var(--telekom-spacing-composition-space-08);\n  }\n  app-navigation-user-menu::part(rule-horizontal) {\n    margin: var(--telekom-spacing-composition-space-08) 0\n      var(--telekom-spacing-composition-space-06) 0;\n  }\n}\n\napp-navigation-user-menu::part(item) {\n  margin-top: var(--telekom-spacing-composition-space-05);\n  margin-bottom: var(--telekom-spacing-composition-space-05);\n  padding: 0;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n}\n\napp-navigation-user-menu::part(button) {\n  padding-top: 0;\n  padding-left: 0;\n}\n@media screen and (min-width: 640px) {\n  app-navigation-user-menu::part(button) {\n    margin-top: -10px;\n  }\n}\n\n@media screen and (min-width: 1040px) {\n  app-navigation-user-menu::part(item) {\n    line-height: 200%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n    padding-top: 0;\n    padding-bottom: 0;\n    border: 0;\n  }\n\n  app-navigation-user-menu::part(userInfo) {\n    padding-top: 0;\n  }\n  app-navigation-user-menu::part(rule-horizontal) {\n    padding-top: 16px;\n    padding-bottom: 6px;\n    margin: 0;\n  }\n  app-navigation-user-menu::part(button) {\n    margin-top: 7px;\n    padding-bottom: 0;\n  }\n}\n\n.visually-hidden {\n  /* see https://www.a11yproject.com/posts/how-to-hide-content/ */\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  height: 1px;\n  overflow: hidden;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n";

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
const TelekomProfileMenu = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
    return (h("div", { class: "profile-menu-login" }, h("strong", null, this.serviceName), h("p", null, this.serviceDescription), h("scale-button", { href: this.loginUrl || LOGIN_DEFAULT }, this.loginLabel), h("div", { class: "footer" }, h("p", null, h("scale-link", { "omit-underline": "true", href: this.loginHelpUrl || LOGIN_HELP_DEFAULT }, this.loginHelpLabel)), h("div", { id: "signUp" }, h("p", null, this.registerHeadline), h("p", null, h("scale-link", { "omit-underline": "true", href: this.registerUrl || REGISTER_DEFAULT }, this.registerLabel))))));
  }
  printProfileTrigger() {
    if (!this.loggedIn) {
      return (h("scale-icon-user-file-user", { selected: this.menuOpen }));
    }
    // logged in
    return (h("scale-badge", { "no-dot": "true" }, h("scale-icon-user-file-user", { selected: this.menuOpen }), h("div", { slot: "dot", class: "mydot" }, h("scale-icon-action-checkmark", null))));
  }
  buildUserNavigation() {
    const divider = [{ type: 'divider' }];
    const userInfo = readData(this.userInfo);
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
    const logout = {
      type: 'button',
      name: this.logoutLabel,
      href: this.logoutUrl || LOGOUT_DEFAULT,
      variant: 'secondary',
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
    menu = menu.concat(logout);
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
    return (h("div", { class: "flyout-label" }, h("span", { "aria-hidden": "true" }, this.label), h("span", { class: "visually-hidden" }, this.accessibilityLabel)));
  }
  render() {
    return (h(Host, null, h("scale-telekom-nav-item", { class: "user-menu-desktop" }, h("scale-menu-flyout", { direction: "bottom-left", "onScale-open": (event) => this.openMenu(event), "onScale-close": (event) => this.closeMenu(event), triggerHasPopup: false }, h("a", { href: "javascript:void(0);", slot: "trigger", role: "button", "aria-controls": "user-menu-desktop" }, this.printProfileTrigger(), this.printLabel()), h("scale-menu-flyout-list", { id: "user-menu-desktop", preventFlipVertical: true, role: "none" }, this.loggedIn && [
      h("app-navigation-user-menu", { hide: () => {
          this.userMenuDesktopTrigger.click();
        }, navigation: this.buildUserNavigation(), styles: this.buildDesktopMenuStyles() }),
    ], !this.loggedIn && [
      h("app-navigation-user-menu", { navigation: [] }, this.printSignInMenu()),
    ]), h("div", { slot: "trigger", class: "user-menu-trigger", ref: (el) => (this.userMenuDesktopTrigger = el) }))), h("scale-telekom-nav-item", { class: "user-menu-mobile" }, h("button", null, this.printProfileTrigger(), this.printLabel()), h("scale-telekom-nav-flyout", { variant: "mobile" }, h("scale-telekom-mobile-flyout-canvas", { appName: this.appName, closeButtonLabel: this.closeMenuAccessibilityLabel }, this.loggedIn && [
      h("app-navigation-user-menu", { slot: "mobile-main-nav", navigation: this.buildUserNavigation(), styles: this.buildMobileMenuStyles() }),
    ], !this.loggedIn && [
      h("app-navigation-user-menu", { slot: "mobile-main-nav", navigation: [] }, this.printSignInMenu()),
    ])))));
  }
  get hostElement() { return this; }
  static get style() { return telekomProfileMenuCss; }
}, [0, "scale-telekom-profile-menu", {
    "label": [1],
    "accessibilityLabel": [1, "accessibility-label"],
    "closeMenuAccessibilityLabel": [1, "close-menu-accessibility-label"],
    "appName": [1, "app-name"],
    "serviceName": [1, "service-name"],
    "serviceDescription": [1, "service-description"],
    "loggedIn": [4, "logged-in"],
    "loginUrl": [1, "login-url"],
    "loginLabel": [1, "login-label"],
    "loginHelpUrl": [1, "login-help-url"],
    "loginHelpLabel": [1, "login-help-label"],
    "registerHeadline": [1, "register-headline"],
    "registerUrl": [1, "register-url"],
    "registerLabel": [1, "register-label"],
    "userInfo": [8, "user-info"],
    "serviceLinks": [8, "service-links"],
    "loginSettingsLabel": [1, "login-settings-label"],
    "loginSettingsUrl": [1, "login-settings-url"],
    "hideLoginSettings": [4, "hide-login-settings"],
    "logoutLabel": [1, "logout-label"],
    "logoutUrl": [1, "logout-url"],
    "menuOpen": [32]
  }, [[0, "keydown", "onKeydown"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-telekom-profile-menu", "app-navigation-user-menu", "scale-badge", "scale-button", "scale-icon", "scale-icon-action-checkmark", "scale-icon-action-close", "scale-icon-user-file-user", "scale-link", "scale-menu-flyout", "scale-menu-flyout-list", "scale-telekom-mobile-flyout-canvas", "scale-telekom-nav-flyout", "scale-telekom-nav-item"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-telekom-profile-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TelekomProfileMenu);
      }
      break;
    case "app-navigation-user-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "scale-badge":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "scale-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "scale-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "scale-icon-action-checkmark":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "scale-icon-action-close":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "scale-icon-user-file-user":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "scale-link":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "scale-menu-flyout":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "scale-menu-flyout-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "scale-telekom-mobile-flyout-canvas":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "scale-telekom-nav-flyout":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "scale-telekom-nav-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ScaleTelekomProfileMenu = TelekomProfileMenu;
const defineCustomElement = defineCustomElement$1;

export { ScaleTelekomProfileMenu, defineCustomElement };
