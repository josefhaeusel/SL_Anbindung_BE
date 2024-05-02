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
import { h } from '@stencil/core';
// Expected content: number, eg 10230.32
// Options
// style?: string 'bar' | 'progress'
// min?: number 0
// max?: number 100
export const GraphCell = {
  defaults: {
    sortBy: 'number',
  },
  render: ({ field, content }) => {
    const { style = 'progress', min = 0, max = 100 } = field;
    // Convert content to 0>100 range for progress bar
    const progress = parseFloat((((content - min) / (max - min)) * 100).toPrecision(String(content).replace('.', '').length));
    // I really don't know the difference between bar and progress
    switch (style) {
      case 'bar':
        return (h("div", { class: `tbody__bar-cell` },
          h("scale-progress-bar", { class: "data-grid-progress-bar", "aria-hidden": "true", percentage: progress, 
            // showStatus={true}
            mute: true }),
          h("p", { class: `scl-body` }, content)));
      default:
        // progress
        return (h("scale-progress-bar", { class: "data-grid-progress-bar", percentage: progress, showStatus: true, mute: true }));
    }
  },
};