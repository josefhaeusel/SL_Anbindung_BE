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
var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { h } from '@stencil/core';
// Expected content: a url string (eg: 'https://sample.com')
export const LinkCell = {
  defaults: {
    sortBy: 'text',
  },
  render: ({ content }) => {
    if (typeof content === 'string') {
      // Remove protocol (http/https)
      const urlNoProtocol = content.replace(/^https?\:\/\//i, '');
      return (h("scale-link", { href: content, target: "_blank" }, urlNoProtocol));
    }
    else {
      // if the type of content is not a string, the content is handled as
      // object of text and props (spread) which are passed as attributes to
      // the scale-link element
      const { text } = content, props = __rest(content, ["text"]);
      return h("scale-link", Object.assign({}, props), text);
    }
  },
};
