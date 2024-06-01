import type { Components, JSX } from "../types/components";

interface ScaleIconContentBank extends Components.ScaleIconContentBank, HTMLElement {}
export const ScaleIconContentBank: {
  prototype: ScaleIconContentBank;
  new (): ScaleIconContentBank;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
