import type { Components, JSX } from "../types/components";

interface ScaleNotification extends Components.ScaleNotification, HTMLElement {}
export const ScaleNotification: {
  prototype: ScaleNotification;
  new (): ScaleNotification;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
