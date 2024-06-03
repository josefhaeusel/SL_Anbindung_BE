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
import { EventEmitter } from '../../stencil-public-runtime';
declare type CloseEventTrigger = 'CLOSE_BUTTON' | 'ATTRIBUTE' | 'TIMEOUT';
export interface BeforeCloseEventDetail {
  trigger: CloseEventTrigger;
}
export declare class Notification {
  hostElement: HTMLElement;
  /** Heading */
  heading: string;
  /** (optional) Type */
  type?: 'inline' | 'banner' | 'toast';
  /** (optional) Variant */
  variant?: 'danger' | 'warning' | 'success' | 'informational';
  /** (optional) Visible */
  opened?: boolean;
  /** (optional) Show the close button */
  dismissible?: boolean;
  /** (optional) Time in milliseconds until it closes by itself */
  delay?: number;
  /** @deprecated - ariaRole should replace innerAriaLive */
  innerAriaLive?: string;
  /** (optional) string prepended to the heading */
  innerRole?: 'alert' | 'status';
  /** (optional) Label for close button */
  closeButtonLabel?: string;
  /** (optional) `title` for close button */
  closeButtonTitle?: string;
  /** Default aria-level for heading */
  headingLevel: number;
  /** (optional) string prepended to the heading */
  ariaHeading?: string;
  /** (optional) Injected styles */
  styles?: string;
  /** What actually triggers opening/closing the notification */
  isOpen: boolean;
  animationState: 'in' | 'out' | undefined;
  hasTextSlot: boolean;
  /** Fires after the notification has been opened  */
  scaleOpen: EventEmitter<void>;
  /** Fires on every close attempt. Calling `event.preventDefault()` will prevent the modal from closing */
  scaleBeforeClose: EventEmitter<BeforeCloseEventDetail>;
  /** Fires after the notification has been closed */
  scaleClose: EventEmitter<void>;
  private lastCloseEventTrigger;
  connectedCallback(): void;
  openedChanged(newValue: any): void;
  open: () => void;
  close: () => void;
  timeout: () => void;
  render(): any;
}
export {};
