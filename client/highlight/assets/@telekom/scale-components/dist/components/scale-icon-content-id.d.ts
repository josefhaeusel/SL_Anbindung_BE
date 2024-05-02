import type { Components, JSX } from "../types/components";

interface ScaleIconContentId extends Components.ScaleIconContentId, HTMLElement {}
export const ScaleIconContentId: {
  prototype: ScaleIconContentId;
  new (): ScaleIconContentId;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
