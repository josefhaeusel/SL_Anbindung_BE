import{r as t,h as i,a as s,g as e}from"./p-d52b3602.js";const l=class{constructor(i){t(this,i),this.size=24,this.fill="currentColor",this.color="currentColor",this.selected=!1,this.decorative=!1,this.focusable=!1}connectedCallback(){this.hostElement.hasAttribute("styles")||(this.hostElement.style.display="inline-flex")}render(){return i(s,null,i("svg",Object.assign({class:"scale-icon",xmlns:"http://www.w3.org/2000/svg",width:this.size,height:this.size,viewBox:"0 0 24 24"},this.decorative?{"aria-hidden":"true"}:{},this.focusable?{tabindex:0}:{}),this.accessibilityTitle&&i("title",null,this.accessibilityTitle),i("g",{fill:"currentColor"===this.fill?this.color:this.fill},i("g",null,i("path",this.selected?{d:"M12 .85L.45 12.45 1.5 13.5 12 3l10.5 10.5 1.05-1.05L12 .85zM3.5 13.6V19l.005.176A3.01 3.01 0 006.5 22h4.75v-5.25c0-.4.35-.75.75-.75.367 0 .691.294.743.651l.007.099V22h4.75l.176-.005A3.01 3.01 0 0020.5 19v-5.4L12 5.1l-8.5 8.5z","fill-rule":"evenodd"}:{d:"M19 12.1l1.5 1.5V19a3.01 3.01 0 01-2.824 2.995L17.5 22h-11a3.01 3.01 0 01-2.995-2.824L3.5 19v-5.4L5 12.1V19c0 .8.576 1.423 1.352 1.493l.148.007h4.75v-3.75c0-.4.35-.75.75-.75.367 0 .691.294.743.651l.007.099v3.75h4.75c.8 0 1.423-.576 1.493-1.352L19 19v-6.9zM12 .85l11.55 11.6-1.05 1.05L12 3 1.5 13.5.45 12.45 12 .85z","fill-rule":"evenodd"})))))}get hostElement(){return e(this)}};l.style="scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";export{l as scale_icon_home_home}