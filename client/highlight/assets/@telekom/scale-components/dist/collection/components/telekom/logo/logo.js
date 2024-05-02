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
import { Component, h, Prop, Host, Element } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../../utils/status-note';
export class Logo {
  constructor() {
    /** (optional) Variant/color of the logo text and logo */
    this.variant = 'magenta';
    /** (optional) Set transparent background */
    this.transparent = false;
    /** (optional) The height in pixels */
    this.size = 38;
    /** (optional) Set a link */
    this.href = 'javascript:void(0);';
    this.focusable = true;
    this.scrollIntoViewOnFocus = false;
    /** (optional) set logo specific title */
    this.logoTitle = 'Telekom Logo';
    /** FIXME this is also probably not working properly, see below (it needs a string value) */
    this.logoAriaHidden = false;
  }
  componentDidRender() {
    if (this.accessibilityTitle) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "accessibilityTitle" is deprecated. Please use the "logoTitle" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.language) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "language" is deprecated. Localized brand claim is not shown anymore.',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  render() {
    return (h(Host, { exportparts: "logo-svg" },
      h("style", null,
        this.size ? `:host { --logo-size: ${this.size}px; }` : '',
        this.styles),
      h("a", { href: this.href, part: this.getCssClassMap(), tabindex: this.focusable === false ? '-1' : '0', onFocus: () => {
          if (this.scrollIntoViewOnFocus === true) {
            window.scrollTo({ top: 0 });
          }
        }, title: this.logoHideTitle ? undefined : this.logoTitle, "aria-describedby": this.logoAriaDescribedBy, "aria-hidden": this.logoAriaHidden },
        h("scale-logo-svg", { part: "icon", color: this.variant, logoTitle: this.logoTitle, logoHideTitle: this.logoHideTitle }))));
  }
  getCssClassMap() {
    return classNames(`logo`, this.variant && `variant-${this.variant}`, this.transparent && `transparent`);
  }
  static get is() { return "scale-logo"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./logo.css"]
  }; }
  static get styleUrls() { return {
    "$": ["logo.css"]
  }; }
  static get properties() { return {
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'magenta' | 'white'",
        "resolved": "\"magenta\" | \"white\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "(optional) Variant/color of the logo text and logo"
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "'magenta'"
    },
    "transparent": {
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
        "text": "(optional) Set transparent background"
      },
      "attribute": "transparent",
      "reflect": false,
      "defaultValue": "false"
    },
    "language": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| 'de'\n    | 'en'\n    | 'cz'\n    | 'hr'\n    | 'hu'\n    | 'me'\n    | 'mk_lat'\n    | 'mk_kyr'\n    | 'ro'\n    | 'sk'\n    | string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "name": "deprecated",
            "text": "; (optional) Language of the logo text/ claimOff showes just the T Logo"
          }],
        "text": ""
      },
      "attribute": "language",
      "reflect": false
    },
    "size": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) The height in pixels"
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "38"
    },
    "href": {
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
        "text": "(optional) Set a link"
      },
      "attribute": "href",
      "reflect": false,
      "defaultValue": "'javascript:void(0);'"
    },
    "accessibilityTitle": {
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
        "text": "(optional) When using the icon standalone, make it meaningful for accessibility"
      },
      "attribute": "accessibility-title",
      "reflect": false
    },
    "styles": {
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
        "text": "(optional) Injected CSS styles"
      },
      "attribute": "styles",
      "reflect": false
    },
    "focusable": {
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
      "attribute": "focusable",
      "reflect": false,
      "defaultValue": "true"
    },
    "scrollIntoViewOnFocus": {
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
      "attribute": "scroll-into-view-on-focus",
      "reflect": false,
      "defaultValue": "false"
    },
    "logoTitle": {
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
        "text": "(optional) set logo specific title"
      },
      "attribute": "logo-title",
      "reflect": false,
      "defaultValue": "'Telekom Logo'"
    },
    "logoHideTitle": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "(optional) Hide all logo related titles"
      },
      "attribute": "logo-hide-title",
      "reflect": false
    },
    "logoAriaDescribedBy": {
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
        "text": "FIXME is this actually working? probably not because of shadow DOM?"
      },
      "attribute": "logo-aria-described-by",
      "reflect": false
    },
    "logoAriaHidden": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "FIXME this is also probably not working properly, see below (it needs a string value)"
      },
      "attribute": "logo-aria-hidden",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
