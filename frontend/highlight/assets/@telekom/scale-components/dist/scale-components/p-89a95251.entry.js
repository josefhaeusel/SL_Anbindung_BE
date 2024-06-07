import{r as o,h as t,a,g as r}from"./p-d52b3602.js";import{c as i}from"./p-c608c6dc.js";import{h as n,i as e}from"./p-086c9d13.js";const s={small:16,large:20},c=class{constructor(t){o(this,t),this.size="large",this.variant="primary",this.disabled=!1,this.iconOnly=!1,this.iconPosition="before",this.target="_self",this.handleClick=o=>{if(n(this.hostElement)){const t=this.hostElement.closest("form");if(t){o.preventDefault();const a=document.createElement("button");this.type&&(a.type=this.type),a.style.display="none",t.appendChild(a),a.click(),a.remove()}}}}handleHostClick(o){!0===this.disabled&&o.stopImmediatePropagation()}async setFocus(){this.focusableElement.focus()}componentDidLoad(){this.setChildrenIconSize()}connectedCallback(){this.setIconPositionProp(),this.appendEnterKeySubmitFallback()}disconnectedCallback(){this.cleanUpEnterKeySubmitFallback()}appendEnterKeySubmitFallback(){if(n(this.hostElement)){const o=this.hostElement.closest("form");if(null==o)return;if(null!=o.querySelector('input[type="submit"]'))return;this.fallbackSubmitInputElement=document.createElement("input"),this.fallbackSubmitInputElement.type="submit",this.fallbackSubmitInputElement.hidden=!0,o.appendChild(this.fallbackSubmitInputElement)}}cleanUpEnterKeySubmitFallback(){if(null!=this.fallbackSubmitInputElement)try{this.fallbackSubmitInputElement.remove(),this.fallbackSubmitInputElement=null}catch(o){}}setIconPositionProp(){const o=Array.from(this.hostElement.childNodes).filter((o=>!(3===o.nodeType&&""===o.nodeValue.trim()))),t=o.length>1?o[o.length-1]:null;!this.iconOnly&&t&&e(t)&&(this.iconPosition="after")}setChildrenIconSize(){null!=this.size&&null!=s[this.size]&&Array.from(this.hostElement.childNodes).filter(e).forEach((o=>{24===o.size&&(o.size=s[this.size])}))}render(){const o=i("base",this.variant&&`variant-${this.variant}`,this.iconOnly&&"icon-only",!this.iconOnly&&this.iconPosition,this.disabled&&"disabled");return t(a,null,this.styles&&t("style",null,this.styles),this.href?t("a",{ref:o=>this.focusableElement=o,class:this.getCssClassMap(),href:this.disabled?null:this.href,download:this.download,target:this.target,rel:"_blank"===this.target?"noopener noreferrer":void 0,part:o,tabIndex:this.innerTabindex,role:"link","aria-disabled":this.disabled?"true":null,"aria-label":this.innerAriaLabel},t("slot",null)):t("button",{ref:o=>this.focusableElement=o,class:this.getCssClassMap(),onClick:this.handleClick,disabled:this.disabled,type:this.type,part:o,tabIndex:this.innerTabindex,name:this.name,value:this.value,"aria-label":this.innerAriaLabel},t("slot",null)))}getCssClassMap(){return i("button",this.size&&`button--size-${this.size}`,this.variant&&`button--variant-${this.variant}`,this.iconOnly&&"button--icon-only",!this.iconOnly&&this.iconPosition&&`button--icon-${this.iconPosition}`,this.disabled&&"button--disabled")}get hostElement(){return r(this)}};c.style=":host{--width:auto;--spacing-x-right:var(--telekom-spacing-composition-space-07);--spacing-x-left:var(--telekom-spacing-composition-space-07);--spacing-x-icon-only:var(--telekom-spacing-composition-space-05);--min-height:var(--telekom-spacing-composition-space-13);--min-width:var(--telekom-spacing-composition-space-13);--radius:var(--telekom-radius-standard);--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--color-focus:var(--telekom-color-functional-focus-standard);--font-weight:var(--telekom-typography-font-weight-bold);--font-size:var(--telekom-typography-font-size-body);--line-height:var(--telekom-typography-line-spacing-tight);--spacing-icon-x:var(--telekom-spacing-composition-space-04);--vertical-align:middle;--font-size-small:var(--telekom-typography-font-size-caption);--line-height-small:1.125rem;--min-height-small:var(--telekom-spacing-composition-space-10);--spacing-x-right-small:var(--telekom-spacing-composition-space-06);--spacing-x-left-small:var(--telekom-spacing-composition-space-06);--spacing-x-icon-only-small:var(--telekom-spacing-composition-space-00);--spacing-icon-x-small:var(--telekom-spacing-composition-space-03);--radius-primary:var(--radius);--background-primary:var(--telekom-color-primary-standard);--background-primary-hover:var(--telekom-color-primary-hovered);--background-primary-active:var(--telekom-color-primary-pressed);--background-primary-disabled:var(--telekom-color-ui-disabled);--color-primary:var(--telekom-color-text-and-icon-white-standard);--color-primary-disabled:var(--telekom-color-text-and-icon-disabled);--radius-secondary:var(--radius);--border-width-secondary:var(--telekom-spacing-composition-space-01);--background-secondary:transparent;--color-secondary:var(--telekom-color-text-and-icon-standard);--color-secondary-hover:var(--telekom-color-text-and-icon-standard);--color-secondary-active:var(--telekom-color-text-and-icon-standard);--color-secondary-disabled:var(--telekom-color-text-and-icon-disabled);--background-secondary:var(--telekom-color-ui-state-fill-standard);--background-secondary-hover:var(--telekom-color-ui-state-fill-hovered);--background-secondary-active:var(--telekom-color-ui-state-fill-pressed);--background-secondary-disabled:none;--border-secondary:var(--telekom-color-ui-border-standard);--border-secondary-hover:var(--telekom-color-ui-border-hovered);--border-secondary-active:var(--telekom-color-ui-border-pressed);--border-secondary-focus:var(--telekom-color-functional-focus-standard);--border-secondary-white:var(--telekom-color-ui-white);--color-secondary-white:var(--telekom-color-ui-white);--background-secondary-white-hover:var(\n    --telekom-color-ui-state-fill-hovered-inverted\n  );--background-secondary-white-active:var(\n    --telekom-color-ui-state-fill-pressed-inverted\n  );--secondary-white-opacity:0.5;--radius-ghost:var(--radius);--border-width-ghost:var(--telekom-spacing-composition-space-01);--spacing-x-ghost:var(--telekom-spacing-composition-space-04);--color-ghost:var(--telekom-color-text-and-icon-link-standard);--color-ghost-hover:var(--telekom-color-text-and-icon-link-hovered);--color-ghost-active:var(--telekom-color-text-and-icon-link-active);--color-ghost-disabled:var(--telekom-color-text-and-icon-disabled);--background-ghost-hover:var(--telekom-color-ui-state-fill-hovered);--background-ghost-active:var(--telekom-color-ui-state-fill-pressed);display:inline-block}.button{box-sizing:border-box;display:inline-flex;align-items:center;position:relative;border:0;outline:none;cursor:pointer;user-select:none;font-family:inherit;word-spacing:inherit;letter-spacing:inherit;justify-content:center;text-decoration:none;font-weight:var(--font-weight);font-size:var(--font-size);line-height:var(--line-height);min-height:var(--min-height);min-width:var(--min-width);width:var(--width);padding-left:var(--spacing-x-left);padding-right:var(--spacing-x-right);vertical-align:var(--vertical-align);transition:var(--transition)}.button.button--size-small{font-size:var(--font-size-small);line-height:var(--line-height-small);min-height:var(--min-height-small);padding-left:var(--spacing-x-left-small);padding-right:var(--spacing-x-right-small)}.button:not(.button--disabled):focus{outline:var(--telekom-line-weight-highlight) solid var(--color-focus);outline-offset:var(--telekom-spacing-composition-space-01)}.button.button--icon-before:not(.button--icon-only) ::slotted(*){margin-right:var(--spacing-icon-x);margin-left:calc(var(--spacing-icon-x-small) * -1);margin-top:var(--spacing-icon-x);margin-bottom:var(--spacing-icon-x)}.button.button--icon-before:not(.button--icon-only).button--size-small ::slotted(*){margin-right:var(--spacing-icon-x-small);margin-left:calc(var(--spacing-icon-x) * -0.5)}.button.button--icon-after:not(.button--icon-only) ::slotted(*){margin-left:var(--spacing-icon-x);margin-right:calc(var(--spacing-icon-x-small) * -1);margin-top:var(--spacing-icon-x);margin-bottom:var(--spacing-icon-x)}.button.button--icon-after:not(.button--icon-only).button--size-small ::slotted(*){margin-left:var(--spacing-icon-x-small);margin-right:calc(var(--spacing-icon-x) * -0.5)}.button:after{top:0;left:0;width:100%;border:var(--telekom-spacing-composition-space-01) solid transparent;height:100%;content:'';display:block;position:absolute;box-sizing:border-box;pointer-events:none;border-radius:var(--radius)}.button--icon-only{padding-left:var(--spacing-x-icon-only);padding-right:var(--spacing-x-icon-only)}.button--icon-only.button--variant-secondary{padding-left:calc(var(--spacing-x-icon-only) - 1px);padding-right:calc(var(--spacing-x-icon-only) - 1px)}.button--icon-only.button--size-small{padding-left:var(--spacing-x-icon-only-small);padding-right:var(--spacing-x-icon-only-small);min-width:32px}.button--icon-only.button--size-small.button--variant-secondary{padding-left:calc(var(--spacing-x-icon-only-small) - 1px);padding-right:calc(var(--spacing-x-icon-only-small) - 1px)}.button--disabled{cursor:not-allowed}.button--variant-primary{text-align:center;border-radius:var(--radius);background:var(--background-primary);color:var(--color-primary)}.button--variant-primary:not(.button--disabled):hover{background:var(--background-primary-hover)}.button--variant-primary:not(.button--disabled):active{background:var(--background-primary-active)}.button--disabled.button--variant-primary{background:var(--background-primary-disabled);color:var(--color-primary-disabled)}.button--variant-secondary{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary);background-color:var(--background-secondary);border-color:var(--border-secondary)}.button--variant-secondary:not(.button--disabled):hover{color:var(--color-secondary-hover);background-color:var(--background-secondary-hover);border-color:var(--border-secondary-hover)}.button--variant-secondary:not(.button--disabled):active{color:var(--color-secondary-active);background-color:var(--background-secondary-active);border-color:var(--border-secondary-active)}.button--disabled.button--variant-secondary{color:var(--color-secondary-disabled);background-color:var(--background-secondary-disabled)}.button--variant-ghost{background:transparent;text-align:center;border-radius:var(--radius-ghost);border:var(--border-width-ghost) solid transparent;color:var(--color-ghost);padding-left:var(--spacing-x-ghost);padding-right:var(--spacing-x-ghost)}.button--variant-ghost:not(.button--disabled):hover{color:var(--color-ghost-hover);background-color:var(--background-ghost-hover)}.button--variant-ghost:not(.button--disabled):active{color:var(--color-ghost-active);background-color:var(--background-ghost-active)}.button--disabled.button--variant-ghost{color:var(--color-ghost-disabled)}.button--variant-secondary-white{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary-white);background-color:var(--background-secondary);border-color:var(--border-secondary-white)}.button--variant-secondary-white:not(.button--disabled):hover{background-color:var(--background-secondary-white-hover)}.button--variant-secondary-white:not(.button--disabled):active{background-color:var(--background-secondary-white-active)}.button--disabled.button--variant-secondary-white{opacity:var(--secondary-white-opacity)}";const l=class{constructor(t){o(this,t),this.size=24,this.fill="var(--icon-color, currentColor)",this.stroke="transparent",this.focusable=!1,this.decorative=!1}render(){const o={fill:this.fill,stroke:this.stroke},r=this.decorative?{"aria-hidden":"true"}:{},i=this.focusable?{tabindex:0}:{};return t(a,null,t("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",class:this.getCssClassMap(),part:"base",width:this.size,height:this.size,viewBox:"0 0 24 24",role:"img"},r,i),this.accessibilityTitle&&t("title",null,this.accessibilityTitle),this.path?t("path",Object.assign({d:this.path},o,{part:"path"})):t("use",Object.assign({xlinkHref:`#icon-${this.name}`},o))))}getCssClassMap(){return i("icon")}};l.style="scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";export{c as scale_button,l as scale_icon}