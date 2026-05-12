import{E as ce,ab as c,a_ as ut,r as A,a$ as vt,i as Z,b0 as gt,a7 as ht,aT as xt,J as mt,Y as yt,aM as St,b1 as Ct,b2 as wt,q as Tt,A as U,b3 as Rt,a9 as r,ax as l,a8 as C,aX as L,ay as zt,b4 as re,aJ as me,b5 as ne,ae as Pt,ag as Pe,g as oe,n as ie,l as Lt,u as $t,ah as Wt,b6 as Bt,W as At,_ as _t,b7 as Et,b8 as kt,aC as j,b9 as K,S as jt,aj as M,al as Q}from"./index-B_1Dn6po.js";import{A as Mt}from"./Add-B9TizugM.js";import{e as Vt,f as ye,o as Ht}from"./utils-BW4-TlXv.js";import{u as It}from"./Suffix-v_UuU28W.js";import{u as Se}from"./Select-s_pB9iWK.js";const Ot=ye(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[ye("&::-webkit-scrollbar",{width:0,height:0})]),Gt=ce({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=A(null);function n(s){!(s.currentTarget.offsetWidth<s.currentTarget.scrollWidth)||s.deltaY===0||(s.currentTarget.scrollLeft+=s.deltaY+s.deltaX,s.preventDefault())}const i=ut();return Ot.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Vt,ssr:i}),Object.assign({selfRef:e,handleWheel:n},{scrollTo(...s){var m;(m=e.value)===null||m===void 0||m.scrollTo(...s)}})},render(){return c("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ft=/\s/;function Dt(e){for(var n=e.length;n--&&Ft.test(e.charAt(n)););return n}var Nt=/^\s+/;function Xt(e){return e&&e.slice(0,Dt(e)+1).replace(Nt,"")}var Ce=NaN,Ut=/^[-+]0x[0-9a-f]+$/i,Yt=/^0b[01]+$/i,qt=/^0o[0-7]+$/i,Jt=parseInt;function we(e){if(typeof e=="number")return e;if(vt(e))return Ce;if(Z(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=Z(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Xt(e);var i=Yt.test(e);return i||qt.test(e)?Jt(e.slice(2),i?2:8):Ut.test(e)?Ce:+e}var le=function(){return gt.Date.now()},Kt="Expected a function",Qt=Math.max,Zt=Math.min;function ea(e,n,i){var f,s,m,v,p,g,h=0,y=!1,R=!1,z=!0;if(typeof e!="function")throw new TypeError(Kt);n=we(n)||0,Z(i)&&(y=!!i.leading,R="maxWait"in i,m=R?Qt(we(i.maxWait)||0,n):m,z="trailing"in i?!!i.trailing:z);function x(d){var B=f,I=s;return f=s=void 0,h=d,v=e.apply(I,B),v}function S(d){return h=d,p=setTimeout(W,n),y?x(d):v}function w(d){var B=d-g,I=d-h,O=n-B;return R?Zt(O,m-I):O}function P(d){var B=d-g,I=d-h;return g===void 0||B>=n||B<0||R&&I>=m}function W(){var d=le();if(P(d))return $(d);p=setTimeout(W,w(d))}function $(d){return p=void 0,z&&f?x(d):(f=s=void 0,v)}function V(){p!==void 0&&clearTimeout(p),h=0,f=g=s=p=void 0}function k(){return p===void 0?v:$(le())}function u(){var d=le(),B=P(d);if(f=arguments,s=this,g=d,B){if(p===void 0)return S(g);if(R)return clearTimeout(p),p=setTimeout(W,n),x(g)}return p===void 0&&(p=setTimeout(W,n)),v}return u.cancel=V,u.flush=k,u}var ta="Expected a function";function aa(e,n,i){var f=!0,s=!0;if(typeof e!="function")throw new TypeError(ta);return Z(i)&&(f="leading"in i?!!i.leading:f,s="trailing"in i?!!i.trailing:s),ea(e,n,{leading:f,maxWait:n,trailing:s})}const ra={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function na(e){const{textColor2:n,primaryColor:i,textColorDisabled:f,closeIconColor:s,closeIconColorHover:m,closeIconColorPressed:v,closeColorHover:p,closeColorPressed:g,tabColor:h,baseColor:y,dividerColor:R,fontWeight:z,textColor1:x,borderRadius:S,fontSize:w,fontWeightStrong:P}=e;return Object.assign(Object.assign({},ra),{colorSegment:h,tabFontSizeCard:w,tabTextColorLine:x,tabTextColorActiveLine:i,tabTextColorHoverLine:i,tabTextColorDisabledLine:f,tabTextColorSegment:x,tabTextColorActiveSegment:n,tabTextColorHoverSegment:n,tabTextColorDisabledSegment:f,tabTextColorBar:x,tabTextColorActiveBar:i,tabTextColorHoverBar:i,tabTextColorDisabledBar:f,tabTextColorCard:x,tabTextColorHoverCard:x,tabTextColorActiveCard:i,tabTextColorDisabledCard:f,barColor:i,closeIconColor:s,closeIconColorHover:m,closeIconColorPressed:v,closeColorHover:p,closeColorPressed:g,closeBorderRadius:S,tabColor:h,tabColorSegment:y,tabBorderColor:R,tabFontWeightActive:z,tabFontWeight:z,tabBorderRadius:S,paneTextColor:n,fontWeightStrong:P})}const oa={common:ht,self:na},Le=xt("n-tabs"),ia={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},la=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Rt(ia,["displayDirective"])),be=ce({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:la,setup(e){const{mergedClsPrefixRef:n,valueRef:i,typeRef:f,closableRef:s,tabStyleRef:m,addTabStyleRef:v,tabClassRef:p,addTabClassRef:g,tabChangeIdRef:h,onBeforeLeaveRef:y,triggerRef:R,handleAdd:z,activateTab:x,handleClose:S}=Tt(Le);return{trigger:R,mergedClosable:U(()=>{if(e.internalAddable)return!1;const{closable:w}=e;return w===void 0?s.value:w}),style:m,addStyle:v,tabClass:p,addTabClass:g,clsPrefix:n,value:i,type:f,handleClose(w){w.stopPropagation(),!e.disabled&&S(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){z();return}const{name:w}=e,P=++h.id;if(w!==i.value){const{value:W}=y;W?Promise.resolve(W(e.name,i.value)).then($=>{$&&h.id===P&&x(w)}):x(w)}}}},render(){const{internalAddable:e,clsPrefix:n,name:i,disabled:f,label:s,tab:m,value:v,mergedClosable:p,trigger:g,$slots:{default:h}}=this,y=s??m;return c("div",{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?c("div",{class:`${n}-tabs-tab-pad`}):null,c("div",Object.assign({key:i,"data-name":i,"data-disabled":f?!0:void 0},mt({class:[`${n}-tabs-tab`,v===i&&`${n}-tabs-tab--active`,f&&`${n}-tabs-tab--disabled`,p&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:g==="click"?this.activateTab:void 0,onMouseenter:g==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),c("span",{class:`${n}-tabs-tab__label`},e?c(yt,null,c("div",{class:`${n}-tabs-tab__height-placeholder`}," "),c(St,{clsPrefix:n},{default:()=>c(Mt,null)})):h?h():typeof y=="object"?y:Ct(y??i)),p&&this.type==="card"?c(wt,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:f}):null))}}),sa=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[l("segment-type",[r("tabs-rail",[C("&.transition-disabled",[r("tabs-capsule",`
 transition: none;
 `)])])]),l("top",[r("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),l("left",[r("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),l("left, right",`
 flex-direction: row;
 `,[r("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),l("right",`
 flex-direction: row-reverse;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),r("tabs-bar",`
 left: 0;
 `)]),l("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),r("tabs-bar",`
 top: 0;
 `)]),r("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[r("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),r("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[r("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[l("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),C("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),l("flex",[r("tabs-nav",`
 width: 100%;
 position: relative;
 `,[r("tabs-wrapper",`
 width: 100%;
 `,[r("tabs-tab",`
 margin-right: 0;
 `)])])]),r("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[L("prefix, suffix",`
 display: flex;
 align-items: center;
 `),L("prefix","padding-right: 16px;"),L("suffix","padding-left: 16px;")]),l("top, bottom",[C(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[C("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),C("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),l("shadow-start",[C("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),l("shadow-end",[C("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),l("left, right",[r("tabs-nav-scroll-content",`
 flex-direction: column;
 `),C(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[C("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),C("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),l("shadow-start",[C("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),l("shadow-end",[C("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),r("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[r("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[C("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),C("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),r("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),r("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),r("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),r("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[l("disabled",{cursor:"not-allowed"}),L("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),L("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),r("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[C("&.transition-disabled",`
 transition: none;
 `),l("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),r("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),r("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[C("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),C("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),C("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),C("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),C("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),l("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[C("&:hover",{color:"var(--n-tab-text-color-hover)"}),l("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),l("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[l("line-type",[l("top",[L("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 bottom: -1px;
 `)]),l("left",[L("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 right: -1px;
 `)]),l("right",[L("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 left: -1px;
 `)]),l("bottom",[L("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 top: -1px;
 `)]),L("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-bar",`
 border-radius: 0;
 `)]),l("card-type",[L("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[l("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[L("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),zt("disabled",[C("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),l("closable","padding-right: 8px;"),l("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),l("disabled","color: var(--n-tab-text-color-disabled);")])]),l("left, right",`
 flex-direction: column; 
 `,[L("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),r("tabs-wrapper",`
 flex-direction: column;
 `),r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),l("top",[l("card-type",[r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),L("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[l("active",`
 border-bottom: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),l("left",[l("card-type",[r("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),L("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[l("active",`
 border-right: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),l("right",[l("card-type",[r("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),L("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[l("active",`
 border-left: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),l("bottom",[l("card-type",[r("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),L("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[l("active",`
 border-top: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),se=aa,da=Object.assign(Object.assign({},Pe.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),va=ce({name:"Tabs",props:da,slots:Object,setup(e,{slots:n}){var i,f,s,m;const{mergedClsPrefixRef:v,inlineThemeDisabled:p,mergedComponentPropsRef:g}=Pt(e),h=Pe("Tabs","-tabs",sa,oa,e,v),y=A(null),R=A(null),z=A(null),x=A(null),S=A(null),w=A(null),P=A(!0),W=A(!0),$=Se(e,["labelSize","size"]),V=U(()=>{var t,a;if($.value)return $.value;const o=(a=(t=g==null?void 0:g.value)===null||t===void 0?void 0:t.Tabs)===null||a===void 0?void 0:a.size;return o||"medium"}),k=Se(e,["activeName","value"]),u=A((f=(i=k.value)!==null&&i!==void 0?i:e.defaultValue)!==null&&f!==void 0?f:n.default?(m=(s=re(n.default())[0])===null||s===void 0?void 0:s.props)===null||m===void 0?void 0:m.name:null),d=It(k,u),B={id:0},I=U(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});oe(d,()=>{B.id=0,Y(),pe()});function O(){var t;const{value:a}=d;return a===null?null:(t=y.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${a}"]`)}function $e(t){if(e.type==="card")return;const{value:a}=R;if(!a)return;const o=a.style.opacity==="0";if(t){const b=`${v.value}-tabs-bar--disabled`,{barWidth:T,placement:_}=e;if(t.dataset.disabled==="true"?a.classList.add(b):a.classList.remove(b),["top","bottom"].includes(_)){if(fe(["top","maxHeight","height"]),typeof T=="number"&&t.offsetWidth>=T){const E=Math.floor((t.offsetWidth-T)/2)+t.offsetLeft;a.style.left=`${E}px`,a.style.maxWidth=`${T}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",o&&(a.style.transition="none"),a.offsetWidth,o&&(a.style.transition="",a.style.opacity="1")}else{if(fe(["left","maxWidth","width"]),typeof T=="number"&&t.offsetHeight>=T){const E=Math.floor((t.offsetHeight-T)/2)+t.offsetTop;a.style.top=`${E}px`,a.style.maxHeight=`${T}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",o&&(a.style.transition="none"),a.offsetHeight,o&&(a.style.transition="",a.style.opacity="1")}}}function We(){if(e.type==="card")return;const{value:t}=R;t&&(t.style.opacity="0")}function fe(t){const{value:a}=R;if(a)for(const o of t)a.style[o]=""}function Y(){if(e.type==="card")return;const t=O();t?$e(t):We()}function pe(){var t;const a=(t=S.value)===null||t===void 0?void 0:t.$el;if(!a)return;const o=O();if(!o)return;const{scrollLeft:b,offsetWidth:T}=a,{offsetLeft:_,offsetWidth:E}=o;b>_?a.scrollTo({top:0,left:_,behavior:"smooth"}):_+E>b+T&&a.scrollTo({top:0,left:_+E-T,behavior:"smooth"})}const q=A(null);let ee=0,H=null;function Be(t){const a=q.value;if(a){ee=t.getBoundingClientRect().height;const o=`${ee}px`,b=()=>{a.style.height=o,a.style.maxHeight=o};H?(b(),H(),H=null):H=b}}function Ae(t){const a=q.value;if(a){const o=t.getBoundingClientRect().height,b=()=>{document.body.offsetHeight,a.style.maxHeight=`${o}px`,a.style.height=`${Math.max(ee,o)}px`};H?(H(),H=null,b()):H=b}}function _e(){const t=q.value;if(t){t.style.maxHeight="",t.style.height="";const{paneWrapperStyle:a}=e;if(typeof a=="string")t.style.cssText=a;else if(a){const{maxHeight:o,height:b}=a;o!==void 0&&(t.style.maxHeight=o),b!==void 0&&(t.style.height=b)}}}const ue={value:[]},ve=A("next");function Ee(t){const a=d.value;let o="next";for(const b of ue.value){if(b===a)break;if(b===t){o="prev";break}}ve.value=o,ke(t)}function ke(t){const{onActiveNameChange:a,onUpdateValue:o,"onUpdate:value":b}=e;a&&Q(a,t),o&&Q(o,t),b&&Q(b,t),u.value=t}function je(t){const{onClose:a}=e;a&&Q(a,t)}function ge(){const{value:t}=R;if(!t)return;const a="transition-disabled";t.classList.add(a),Y(),t.classList.remove(a)}const G=A(null);function te({transitionDisabled:t}){const a=y.value;if(!a)return;t&&a.classList.add("transition-disabled");const o=O();o&&G.value&&(G.value.style.width=`${o.offsetWidth}px`,G.value.style.height=`${o.offsetHeight}px`,G.value.style.transform=`translateX(${o.offsetLeft-Bt(getComputedStyle(a).paddingLeft)}px)`,t&&G.value.offsetWidth),t&&a.classList.remove("transition-disabled")}oe([d],()=>{e.type==="segment"&&ie(()=>{te({transitionDisabled:!1})})}),Lt(()=>{e.type==="segment"&&te({transitionDisabled:!0})});let he=0;function Me(t){var a;if(t.contentRect.width===0&&t.contentRect.height===0||he===t.contentRect.width)return;he=t.contentRect.width;const{type:o}=e;if((o==="line"||o==="bar")&&ge(),o!=="segment"){const{placement:b}=e;ae((b==="top"||b==="bottom"?(a=S.value)===null||a===void 0?void 0:a.$el:w.value)||null)}}const Ve=se(Me,64);oe([()=>e.justifyContent,()=>e.size],()=>{ie(()=>{const{type:t}=e;(t==="line"||t==="bar")&&ge()})});const F=A(!1);function He(t){var a;const{target:o,contentRect:{width:b,height:T}}=t,_=o.parentElement.parentElement.offsetWidth,E=o.parentElement.parentElement.offsetHeight,{placement:N}=e;if(!F.value)N==="top"||N==="bottom"?_<b&&(F.value=!0):E<T&&(F.value=!0);else{const{value:X}=x;if(!X)return;N==="top"||N==="bottom"?_-b>X.$el.offsetWidth&&(F.value=!1):E-T>X.$el.offsetHeight&&(F.value=!1)}ae(((a=S.value)===null||a===void 0?void 0:a.$el)||null)}const Ie=se(He,64);function Oe(){const{onAdd:t}=e;t&&t(),ie(()=>{const a=O(),{value:o}=S;!a||!o||o.scrollTo({left:a.offsetLeft,top:0,behavior:"smooth"})})}function ae(t){if(!t)return;const{placement:a}=e;if(a==="top"||a==="bottom"){const{scrollLeft:o,scrollWidth:b,offsetWidth:T}=t;P.value=o<=0,W.value=o+T>=b}else{const{scrollTop:o,scrollHeight:b,offsetHeight:T}=t;P.value=o<=0,W.value=o+T>=b}}const Ge=se(t=>{ae(t.target)},64);jt(Le,{triggerRef:M(e,"trigger"),tabStyleRef:M(e,"tabStyle"),tabClassRef:M(e,"tabClass"),addTabStyleRef:M(e,"addTabStyle"),addTabClassRef:M(e,"addTabClass"),paneClassRef:M(e,"paneClass"),paneStyleRef:M(e,"paneStyle"),mergedClsPrefixRef:v,typeRef:M(e,"type"),closableRef:M(e,"closable"),valueRef:d,tabChangeIdRef:B,onBeforeLeaveRef:M(e,"onBeforeLeave"),activateTab:Ee,handleClose:je,handleAdd:Oe}),Ht(()=>{Y(),pe()}),$t(()=>{const{value:t}=z;if(!t)return;const{value:a}=v,o=`${a}-tabs-nav-scroll-wrapper--shadow-start`,b=`${a}-tabs-nav-scroll-wrapper--shadow-end`;P.value?t.classList.remove(o):t.classList.add(o),W.value?t.classList.remove(b):t.classList.add(b)});const Fe={syncBarPosition:()=>{Y()}},De=()=>{te({transitionDisabled:!0})},xe=U(()=>{const{value:t}=V,{type:a}=e,o={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],b=`${t}${o}`,{self:{barColor:T,closeIconColor:_,closeIconColorHover:E,closeIconColorPressed:N,tabColor:X,tabBorderColor:Ne,paneTextColor:Xe,tabFontWeight:Ue,tabBorderRadius:Ye,tabFontWeightActive:qe,colorSegment:Je,fontWeightStrong:Ke,tabColorSegment:Qe,closeSize:Ze,closeIconSize:et,closeColorHover:tt,closeColorPressed:at,closeBorderRadius:rt,[j("panePadding",t)]:J,[j("tabPadding",b)]:nt,[j("tabPaddingVertical",b)]:ot,[j("tabGap",b)]:it,[j("tabGap",`${b}Vertical`)]:lt,[j("tabTextColor",a)]:st,[j("tabTextColorActive",a)]:dt,[j("tabTextColorHover",a)]:bt,[j("tabTextColorDisabled",a)]:ct,[j("tabFontSize",t)]:ft},common:{cubicBezierEaseInOut:pt}}=h.value;return{"--n-bezier":pt,"--n-color-segment":Je,"--n-bar-color":T,"--n-tab-font-size":ft,"--n-tab-text-color":st,"--n-tab-text-color-active":dt,"--n-tab-text-color-disabled":ct,"--n-tab-text-color-hover":bt,"--n-pane-text-color":Xe,"--n-tab-border-color":Ne,"--n-tab-border-radius":Ye,"--n-close-size":Ze,"--n-close-icon-size":et,"--n-close-color-hover":tt,"--n-close-color-pressed":at,"--n-close-border-radius":rt,"--n-close-icon-color":_,"--n-close-icon-color-hover":E,"--n-close-icon-color-pressed":N,"--n-tab-color":X,"--n-tab-font-weight":Ue,"--n-tab-font-weight-active":qe,"--n-tab-padding":nt,"--n-tab-padding-vertical":ot,"--n-tab-gap":it,"--n-tab-gap-vertical":lt,"--n-pane-padding-left":K(J,"left"),"--n-pane-padding-right":K(J,"right"),"--n-pane-padding-top":K(J,"top"),"--n-pane-padding-bottom":K(J,"bottom"),"--n-font-weight-strong":Ke,"--n-tab-color-segment":Qe}}),D=p?Wt("tabs",U(()=>`${V.value[0]}${e.type[0]}`),xe,e):void 0;return Object.assign({mergedClsPrefix:v,mergedValue:d,renderedNames:new Set,segmentCapsuleElRef:G,tabsPaneWrapperRef:q,tabsElRef:y,barElRef:R,addTabInstRef:x,xScrollInstRef:S,scrollWrapperElRef:z,addTabFixed:F,tabWrapperStyle:I,handleNavResize:Ve,mergedSize:V,handleScroll:Ge,handleTabsResize:Ie,cssVars:p?void 0:xe,themeClass:D==null?void 0:D.themeClass,animationDirection:ve,renderNameListRef:ue,yScrollElRef:w,handleSegmentResize:De,onAnimationBeforeLeave:Be,onAnimationEnter:Ae,onAnimationAfterEnter:_e,onRender:D==null?void 0:D.onRender},Fe)},render(){const{mergedClsPrefix:e,type:n,placement:i,addTabFixed:f,addable:s,mergedSize:m,renderNameListRef:v,onRender:p,paneWrapperClass:g,paneWrapperStyle:h,$slots:{default:y,prefix:R,suffix:z}}=this;p==null||p();const x=y?re(y()).filter(u=>u.type.__TAB_PANE__===!0):[],S=y?re(y()).filter(u=>u.type.__TAB__===!0):[],w=!S.length,P=n==="card",W=n==="segment",$=!P&&!W&&this.justifyContent;v.value=[];const V=()=>{const u=c("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},$?null:c("div",{class:`${e}-tabs-scroll-padding`,style:i==="top"||i==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),w?x.map((d,B)=>(v.value.push(d.props.name),de(c(be,Object.assign({},d.props,{internalCreatedByPane:!0,internalLeftPadded:B!==0&&(!$||$==="center"||$==="start"||$==="end")}),d.children?{default:d.children.tab}:void 0)))):S.map((d,B)=>(v.value.push(d.props.name),de(B!==0&&!$?ze(d):d))),!f&&s&&P?Re(s,(w?x.length:S.length)!==0):null,$?null:c("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return c("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},P&&s?c(ne,{onResize:this.handleTabsResize},{default:()=>u}):u,P?c("div",{class:`${e}-tabs-pad`}):null,P?null:c("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},k=W?"top":i;return c("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${m}-size`,$&&`${e}-tabs--flex`,`${e}-tabs--${k}`],style:this.cssVars},c("div",{class:[`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${k}`,`${e}-tabs-nav`]},me(R,u=>u&&c("div",{class:`${e}-tabs-nav__prefix`},u)),W?c(ne,{onResize:this.handleSegmentResize},{default:()=>c("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},c("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},c("div",{class:`${e}-tabs-wrapper`},c("div",{class:`${e}-tabs-tab`}))),w?x.map((u,d)=>(v.value.push(u.props.name),c(be,Object.assign({},u.props,{internalCreatedByPane:!0,internalLeftPadded:d!==0}),u.children?{default:u.children.tab}:void 0))):S.map((u,d)=>(v.value.push(u.props.name),d===0?u:ze(u))))}):c(ne,{onResize:this.handleNavResize},{default:()=>c("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(k)?c(Gt,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:V}):c("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},V()))}),f&&s&&P?Re(s,!0):null,me(z,u=>u&&c("div",{class:`${e}-tabs-nav__suffix`},u))),w&&(this.animated&&(k==="top"||k==="bottom")?c("div",{ref:"tabsPaneWrapperRef",style:h,class:[`${e}-tabs-pane-wrapper`,g]},Te(x,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Te(x,this.mergedValue,this.renderedNames)))}});function Te(e,n,i,f,s,m,v){const p=[];return e.forEach(g=>{const{name:h,displayDirective:y,"display-directive":R}=g.props,z=S=>y===S||R===S,x=n===h;if(g.key!==void 0&&(g.key=h),x||z("show")||z("show:lazy")&&i.has(h)){i.has(h)||i.add(h);const S=!z("if");p.push(S?At(g,[[_t,x]]):g)}}),v?c(Et,{name:`${v}-transition`,onBeforeLeave:f,onEnter:s,onAfterEnter:m},{default:()=>p}):p}function Re(e,n){return c(be,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof e=="object"&&e.disabled})}function ze(e){const n=kt(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function de(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}export{be as N,va as a};
