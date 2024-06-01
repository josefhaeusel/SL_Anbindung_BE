import { EventEmitter } from '../../stencil-public-runtime';
export declare class DropdownSelect {
  hostElement: HTMLElement;
  comboboxId?: string;
  label: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  transparent?: boolean;
  invalid?: boolean;
  variant?: 'informational' | 'warning' | 'danger' | 'success';
  value: any;
  /** @see {@url https://floating-ui.com/docs/computePosition#strategy} */
  floatingStrategy: 'absolute' | 'fixed';
  /** (optional) to hide the label */
  hideLabelVisually?: boolean;
  /** (optional) Screen reader text appended to the selected element */
  ariaLabelSelected?: string;
  /** (optional) Text displayed in high contrast mode only to indicate disabled state */
  hcmLabelDisabled?: string;
  scaleChange: EventEmitter<void>;
  scaleFocus: EventEmitter<void>;
  scaleBlur: EventEmitter<void>;
  scaleKeydown: EventEmitter<void>;
  options?: string | Array<{
    label: string;
    value: any;
  }>;
  open: boolean;
  currentIndex: number;
  queryString: string;
  queryTimeout: any;
  hasFocus: boolean;
  private comboEl;
  private listboxEl;
  private listboxPadEl;
  private hiddenInput;
  valueChange(newValue: any): void;
  connectedCallback(): void;
  componentDidRender(): void;
  componentDidLoad(): void;
  appendInputHidden(): void;
  updateInputHidden(value?: string): void;
  selectOption: (index: any) => void;
  handleOptionChange(index: any): void;
  bringIntoView(index: any): void;
  setOpen(open: any): void;
  handleOptionClick(event: any, index: any): void;
  getSearchString(char: any): string;
  buildQueryString(char: any): void;
  handleKeyDown: (event: any) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleClick: () => void;
  render(): any;
  getBasePartMap(): string;
  getOptionPartMap(index: number, disabled: boolean): string;
}
