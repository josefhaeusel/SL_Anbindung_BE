import{r as t,c as i,h as e,a as o,g as s}from"./p-d52b3602.js";import{r as n}from"./p-301193c6.js";import{b as l,e as a}from"./p-086c9d13.js";import{c as r}from"./p-c608c6dc.js";const c=class{constructor(e){t(this,e),this.closeMenu=i(this,"closeMenu",7)}render(){return e(o,null,this.styles&&e("style",null,this.styles),e("div",{class:"app-navigation-user-menu"},e("slot",null),this.navigation.map((t=>"divider"===t.type?e("hr",{class:"app-navigation-user-menu__divider",part:"rule-horizontal"}):"userInfo"===t.type?e("div",{class:"app-navigation-user-menu__user-info",part:"userInfo"},e("div",{class:"app-navigation-user-menu__user-info--name scl-font-variant-heading-4"},t.name),e("div",{class:"app-navigation-user-menu__user-info--email"},t.email)):"item"===t.type?e("a",{href:t.href||"javascript:void(0);",target:t.target||"_self",tabindex:0,class:"app-navigation-user-menu__item",part:"item",onClick:i=>{i.stopImmediatePropagation(),t.onClick&&t.onClick(i),this.hide()},onKeyDown:i=>{[" ","Enter"].includes(i.key)&&(i.stopImmediatePropagation(),i.preventDefault(),t.onClick&&t.onClick(i),this.hide())}},!t.icon||t.iconPosition&&"prefix"!==t.iconPosition?null:n({tag:`scale-icon-${t.icon}`,attributes:{class:"app-navigation-user-menu__item--icon-prefix"}}),t.name,t.icon&&"suffix"===t.iconPosition?n({tag:`scale-icon-${t.icon}`,attributes:{class:"app-navigation-user-menu__item--icon-suffix"}}):null):"button"===t.type?e("scale-button",{class:"app-navigation-user-menu__button",part:"button",onClick:i=>{t.onClick&&t.onClick(i),this.hide()},onKeyDown:i=>{[" ","Enter"].includes(i.key)&&(i.stopImmediatePropagation(),i.preventDefault(),t.onClick&&t.onClick(i),this.hide())},href:t.href,variant:t.variant||"primary"},!t.icon||t.iconPosition&&"prefix"!==t.iconPosition?null:n({tag:`scale-icon-${t.icon}`,attributes:{}}),t.name,t.icon&&"suffix"===t.iconPosition?n({tag:`scale-icon-${t.icon}`,attributes:{}}):null):void 0))))}get hostElement(){return s(this)}};c.style=":host{--border-width-divider:var(--telekom-spacing-composition-space-01);--color-divider:var(--telekom-color-ui-subtle);--color-menu-item-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-menu-item-active:var(--telekom-color-text-and-icon-primary-pressed);--box-shadow-focus:0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard)}.app-navigation-user-menu{width:100%;position:relative;min-width:260px}.app-navigation-user-menu__divider{margin:var(--telekom-spacing-composition-space-06) 0;border:0;border-top:var(--border-width-divider) solid var(--color-divider)}@media (min-width: 1040px){.app-navigation-user-menu__user-info{margin:var(--telekom-spacing-composition-space-05)\n      var(--telekom-spacing-composition-space-08) 0\n      var(--telekom-spacing-composition-space-08)}}@media (max-width: 1039px){.app-navigation-user-menu__user-info{margin:var(--telekom-spacing-composition-space-08)\n      var(--telekom-spacing-composition-space-06) 0\n      var(--telekom-spacing-composition-space-06)}}.app-navigation-user-menu__user-info--name{font:var(--telekom-text-style-heading-5);margin-bottom:var(--telekom-spacing-composition-space-03)}.app-navigation-user-menu__user-info--email{color:var(--telekom-color-text-and-icon-additional);font:var(--telekom-text-style-body)}.app-navigation-user-menu__item{display:flex;font:var(--telekom-text-style-heading-6);padding:var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-06);border-radius:calc(var(--telekom-radius-small) / 2);color:var(--telekom-color-text-and-icon-standard);text-decoration:none}@media (min-width: 1040px){.app-navigation-user-menu__item{padding:var(--telekom-spacing-composition-space-04)\n      var(--telekom-spacing-composition-space-08)}}.app-navigation-user-menu__item:hover{color:var(--color-menu-item-hover)}.app-navigation-user-menu__item:active{color:var(--color-menu-item-active)}.app-navigation-user-menu__item:focus{outline:none;box-shadow:var(--box-shadow-focus)}.app-navigation-user-menu__item--icon-prefix{margin-right:var(--telekom-spacing-composition-space-04)}.app-navigation-user-menu__item--icon-suffix{margin-left:var(--telekom-spacing-composition-space-04)}.app-navigation-user-menu__button{padding:var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-06)}@media (min-width: 1040px){.app-navigation-user-menu__button{padding:var(--telekom-spacing-composition-space-04)\n      var(--telekom-spacing-composition-space-08)}}@media (min-width: 1040px){.app-navigation-user-menu{padding-bottom:var(--telekom-spacing-composition-space-03)}}";const u=t=>{if("BUTTON"===t.tagName.toUpperCase()||"A"===t.tagName.toUpperCase()||"button"===t.getAttribute("role"))return t},h=class{constructor(i){t(this,i),this.closeOnSelect=!0,this.triggerHasPopup=!0,this.direction="bottom-right",this.lists=new Set,this.closeAll=()=>{this.lists.forEach((async t=>{await t.close(),t.active=!1}))},this.toggle=()=>{const t=this.getListElement();t.opened?this.closeAll():(null!=this.direction&&(t.direction=this.direction),t.trigger=()=>this.trigger,t.open())}}async handleScaleOpen({detail:t}){const i=this.getListElement();if(this.activeList&&this.activeList.active&&this.activeList!==i&&this.activeList!==t.list){let t=this.activeList;for(;null!=t&&t!==i;)await t.close(!0),t=t.parentElement.closest(".scale-menu-flyout-list")}this.activeList=t.list}handleScaleSelect({detail:t}){!1!==t.closeOnSelect&&this.closeOnSelect&&window.requestAnimationFrame((()=>{this.closeAll()}))}handleScaleClose({detail:t}){const i=null!=t.list?t.list.parentNode.closest(".scale-menu-flyout-list"):null;i&&window.requestAnimationFrame((()=>{i.active=!0,i.setFocus()}))}handleWindowScroll(){this.closeAll()}handleOutsideClick(t){l(t,this.hostElement)&&this.closeAll()}handleKeydown(t){if("Tab"===t.key&&!this.hostElement.querySelector("app-navigation-user-menu"))return"SCALE-TELEKOM-NAV-ITEM"===this.trigger.tagName&&this.trigger.firstElementChild.focus(),void this.closeAll()}componentDidLoad(){const t=this.hostElement.querySelector('[slot="trigger"]'),i=t?t.tagName.toUpperCase():"";this.trigger=t&&"SCALE-BUTTON"===i?t.shadowRoot.querySelector("button"):t&&"SCALE-NAV-ICON"===i?t.querySelector("a"):t,this.lists=new Set(Array.from(this.hostElement.querySelectorAll(".scale-menu-flyout-list"))),this.setTriggerAttributes()}setTriggerAttributes(){Array.from(this.hostElement.querySelectorAll('[role="menuitem"]')).filter((t=>null!=t.querySelector('[slot="sublist"]'))).concat([u(this.trigger)]).filter((t=>null!=t)).forEach((t=>{this.triggerHasPopup&&t.setAttribute("aria-haspopup","true"),t.classList.add("scale-menu-trigger"),t.setAttribute("aria-expanded","false")}))}getListElement(){return Array.from(this.hostElement.children).find((t=>t.tagName.toUpperCase().startsWith("SCALE-MENU-FLYOUT")))}render(){return e(o,null,this.styles&&e("style",null,this.styles),e("div",{part:"trigger",onClick:this.toggle},e("slot",{name:"trigger"})),e("slot",null))}get hostElement(){return s(this)}};h.style=":host{--spacing-y-list:0;--spacing-x-list:0}";const p=["menuitem","menuitemcheckbox","menuitemradio"],m=class{constructor(e){t(this,e),this.scaleOpen=i(this,"scale-open",7),this.scaleOpenLegacy=i(this,"scaleOpen",7),this.scaleClose=i(this,"scale-close",7),this.scaleCloseLegacy=i(this,"scaleClose",7),this.forceRender=0,this.opened=!1,this.direction="bottom-right",this.active=!1,this.closeOnSelect=!0,this.brandHeaderDropdown=!1,this.preventFlipVertical=!1,this.canScrollUp=!1,this.canScrollDown=!1,this.flipHorizontal=!1,this.flipVertical=!1,this.needsCheckPlacement=!0,this.handleScroll=()=>{this.updateScrollIndicators()},this.handleWheel=t=>{this.stopWheelPropagation(t)}}get triggerRect(){return this.trigger().getBoundingClientRect()}componentDidLoad(){this.hostElement.hasAttribute("role")||this.hostElement.setAttribute("role","menu")}componentDidRender(){this.opened&&this.needsCheckPlacement&&(this.setSize(),this.checkPlacement())}async open(){this.opened=!0,a(this,"scaleOpen",{list:this.hostElement})}async close(t=!1){this.active&&!0!==t&&a(this,"scaleClose",{list:this.hostElement}),this.opened=!1}async setFocus(){null!=this.focusedItemIndex?this.focusItem():this.setInitialItemsFocus()}handleResize(){this.close()}handleKeydown(t){if(this.active)if(this.hostElement.querySelector("app-navigation-user-menu")||t.preventDefault(),"ArrowDown"!==t.key)if("ArrowUp"!==t.key)if("ArrowLeft"!==t.key&&"Escape"!==t.key){if(" "===t.key||"Enter"===t.key||"ArrowRight"===t.key){const i=this.items[this.focusedItemIndex];null!=i&&i.triggerEvent(t,this.closeOnSelect)}}else this.close();else this.shiftItemsFocus(-1);else this.shiftItemsFocus()}handleClick(t){const i=p.map((t=>`[role="${t}"]`)).join(","),e=t.target.closest(i);null!=e&&(t.stopImmediatePropagation(),e.triggerEvent(t,this.closeOnSelect))}handleScaleSelect({detail:t}){if(this.active&&this.opened){const i=this.items.findIndex((i=>i===t.item));null!=i&&(this.focusedItemIndex=i,this.focusItem())}}handleScaleOpen({detail:t}){t.list!==this.hostElement&&(this.active=!1)}openedChanged(){this.opened||(this.active=!1,this.focusedItemIndex=null,this.needsCheckPlacement=!0,this.flipHorizontal=!1,this.flipVertical=!1,this.hostElement.style.marginLeft="",this.hostElement.style.marginTop="",this.hostElement.style.marginRight="",this.hostElement.style.marginBottom="","SCALE-TELEKOM-NAV-ITEM"===this.trigger().tagName&&(this.trigger().style.color="var(--telekom-color-text-and-icon-standard)")),this.opened&&(this.active=!0,this.setFocus(),this.setWindowSize(),this.setPosition(),this.padForNonOverlayScrollbars(),this.updateScrollIndicators()),this.updateTriggerAttributes()}setInitialItemsFocus(){this.items=this.getListItems(),this.focusedItemIndex=-1,this.items.length>0&&this.shiftItemsFocus()}shiftItemsFocus(t=1){let i=this.focusedItemIndex+t;i===this.items.length?i=0:i<0&&(i=this.items.length-1),this.focusedItemIndex=i,this.focusItem()}focusItem(){window.requestAnimationFrame((()=>{try{this.items[this.focusedItemIndex].focus()}catch(t){}}))}updateTriggerAttributes(){const t=this.trigger();(t&&"true"===t.getAttribute("aria-haspopup")||t.classList.contains("scale-menu-trigger"))&&t.setAttribute("aria-expanded",String(this.opened))}setWindowSize(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}setPosition(){const{top:t,left:i}=this.triggerRect;this.hostElement.style.left=this.brandHeaderDropdown?i-4+"px":`${i}px`,"SCALE-TELEKOM-NAV-ITEM"===this.trigger().tagName?(this.hostElement.style.top=t-12+"px",this.hostElement.style.left=i-24+"px",this.trigger().style.color="var(--telekom-color-text-and-icon-primary-standard)"):this.hostElement.style.top=`${t}px`}setSize(){const{width:t,height:i}=this.triggerRect;this.hostElement.style.height=`${i}px`,this.hostElement.style.width=`${t}px`,this.brandHeaderDropdown&&(this.base.style.width="240px")}checkPlacement(){this.needsCheckPlacement=!1;let t=!1;const i=this.base.getBoundingClientRect();i.left<10&&(t=!0,this.direction.includes("left")&&(this.flipHorizontal=!0)),i.right>this.windowWidth-10&&(t=!0,this.direction.includes("right")&&(this.flipHorizontal=!0)),i.top<10&&(t=!0,this.direction.includes("top")&&!this.preventFlipVertical&&(this.flipVertical=!0)),i.bottom>this.windowHeight-10&&(t=!0,this.direction.includes("bottom")&&!this.preventFlipVertical&&(this.flipVertical=!0)),t&&this.furtherAdjustPlacement()}furtherAdjustPlacement(){this.base.className=this.getCssClassMap(),window.getComputedStyle(this.base);const t=this.base.getBoundingClientRect();let i=0,e=0;t.left<10?i=10-t.left:t.right>this.windowWidth-10&&(i=this.windowWidth-10-t.right),t.top<10?e=10-t.top:t.bottom>this.windowHeight-10&&(e=this.windowHeight-10-t.bottom),this.hostElement.style.marginLeft=`${i}px`,this.hostElement.style.marginTop=`${e}px`,this.hostElement.style.marginRight=-i+"px",this.hostElement.style.marginBottom=-e+"px",setTimeout((()=>this.forceRender++))}padForNonOverlayScrollbars(){this.base.style.paddingRight="0px",this.base.style.paddingRight=this.base.offsetWidth-this.base.clientWidth+"px"}updateScrollIndicators(){this.canScrollDown=!1,this.canScrollUp=!1;const t=this.list.scrollHeight-this.list.clientHeight;t&&(this.list.scrollTop>0&&(this.canScrollUp=!0),this.list.scrollTop<t&&(this.canScrollDown=!0)),this.forceRender++}stopWheelPropagation(t){t.stopPropagation(),this.canScrollDown||this.canScrollUp||t.preventDefault(),t.deltaY>0&&!this.canScrollDown&&t.preventDefault(),t.deltaY<0&&!this.canScrollUp&&t.preventDefault()}getListItems(){return Array.from(this.hostElement.children).filter((t=>p.includes(t.getAttribute("role"))))}getCssClassMap(){return r("menu-flyout-list",`menu-flyout-list--direction-${this.direction}`,this.opened&&"menu-flyout-list--opened",this.canScrollUp&&"menu-flyout-list--can-scroll-up",this.canScrollDown&&"menu-flyout-list--can-scroll-down",this.flipHorizontal&&"menu-flyout-list--flip-horizontal",this.flipVertical&&"menu-flyout-list--flip-vertical",this.brandHeaderDropdown&&"menu-flyout-list--brand-header-dropdown")}render(){return e(o,{class:"scale-menu-flyout-list"},this.styles&&e("style",null,this.styles),e("div",{class:this.getCssClassMap(),ref:t=>this.base=t,part:"base",style:{maxHeight:`calc(${this.windowHeight}px - 20px)`},onWheelCapture:this.handleWheel},e("div",{class:"menu-flyout-list__list",ref:t=>this.list=t,onScroll:this.handleScroll},e("slot",null)),e("div",{"aria-hidden":"true",class:"menu-flyout-list__scroll-up-indicator"}),e("div",{"aria-hidden":"true",class:"menu-flyout-list__scroll-down-indicator"})))}get hostElement(){return s(this)}static get watchers(){return{opened:["openedChanged"]}}};m.style=":host{box-sizing:content-box;position:fixed;z-index:100;pointer-events:none}.menu-flyout-list{display:none;position:absolute;pointer-events:initial;z-index:var(--scl-z-index-20);background:var(--telekom-color-background-surface);border-radius:var(--telekom-radius-standard);box-shadow:var(--telekom-shadow-overlay);overflow-y:hidden;margin-top:var(--spacing-y-list, 0);margin-bottom:var(--spacing-y-list, 0);margin-left:var(--spacing-x-list, 0);margin-right:var(--spacing-x-list, 0)}.menu-flyout-list::after{content:'';display:block;position:absolute;width:calc(100% - 2px);height:calc(100% - 2px);inset:0;border-radius:var(--telekom-radius-standard);border:1px solid transparent;pointer-events:none}.menu-flyout-list--opened{display:flex}.menu-flyout-list__list{padding:20px 0;overflow-y:auto;overflow-y:overlay;overscroll-behavior:contain;width:100%}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--direction-bottom-right{top:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--direction-bottom-left{top:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--direction-top-right{bottom:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--direction-top-left{bottom:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-left,.menu-flyout-list--direction-right{left:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-right,.menu-flyout-list--direction-left{right:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;left:auto;bottom:auto}.menu-flyout-list__scroll-up-indicator,.menu-flyout-list__scroll-down-indicator{position:absolute;width:0;border:5px solid transparent;pointer-events:none;opacity:0;left:50%}.menu-flyout-list__scroll-up-indicator{top:var(--telekom-spacing-composition-space-04);border-bottom:5px solid var(--telekom-color-ui-faint);border-top:0}.menu-flyout-list__scroll-down-indicator{bottom:var(--telekom-spacing-composition-space-04);border-top:5px solid var(--telekom-color-ui-faint);border-bottom:0}.menu-flyout-list--can-scroll-up .menu-flyout-list__scroll-up-indicator{opacity:1}.menu-flyout-list--can-scroll-down .menu-flyout-list__scroll-down-indicator{opacity:1}.menu-flyout-list--brand-header-dropdown ::slotted(scale-menu-flyout-item){--_min-width-moz:0;--_min-width:0}";export{c as app_navigation_user_menu,h as scale_menu_flyout,m as scale_menu_flyout_list}