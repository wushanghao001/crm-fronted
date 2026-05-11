import{A as U,bj as ro,aO as lo,E as ke,n as ko,ab as u,I as pt,a_ as mt,l as Ro,r as T,bC as wt,i as Ct,bD as yt,a as xt,bE as go,bF as St,bG as Ot,bH as $t,bI as Io,bJ as Pt,a6 as po,aR as kt,a7 as Ue,a8 as Q,a9 as B,ay as ge,aX as j,ax as q,bK as Rt,T as To,ae as Ke,ag as pe,aB as mo,q as It,u as wo,ah as Ge,bi as Tt,g as ze,aj as se,bL as xo,bM as Ft,J as zt,W as Co,aJ as Me,Y as Fo,bl as Mt,ad as Ve,_ as zo,ak as fo,S as Be,bk as Bt,bn as _t,bm as At,bN as Et,b8 as Wt,bO as Dt,bP as Ht,bo as jt,ai as Mo,aK as So,al as ne,aS as W,b2 as Lt,aC as te,b9 as vo,bQ as Oo,aT as Nt,bR as Vt,b1 as Ne,aa as Ut,af as Kt,aY as Gt}from"./index-DdIGAe-A.js";import{u as Jt,i as Yt,N as Xt,c as qt,a as Qt,d as Zt,f as en,p as ao}from"./utils-C4-STCM_.js";import{c as on,d as tn,a as Bo,u as xe,B as _o,V as Ao,h as io}from"./FocusDetector-BhtZSAsO.js";import{u as bo,b as nn,a as rn}from"./Suffix-CSx2gjd0.js";import{b as Eo,k as Wo}from"./_baseIsEqual-CYdxKdKu.js";import{c as ln,t as yo,i as Do,g as an,b as sn}from"./get-C6uR6pNn.js";import{f as so}from"./format-length-B-p6aW7q.js";function Ho(e,t){return U(()=>{for(const r of t)if(e[r]!==void 0)return e[r];return e[t[t.length-1]]})}const Pe="@@mmoContext",cn={mounted(e,{value:t}){e[Pe]={handler:void 0},typeof t=="function"&&(e[Pe].handler=t,lo("mousemoveoutside",e,t))},updated(e,{value:t}){const r=e[Pe];typeof t=="function"?r.handler?r.handler!==t&&(ro("mousemoveoutside",e,r.handler),r.handler=t,lo("mousemoveoutside",e,t)):(e[Pe].handler=t,lo("mousemoveoutside",e,t)):r.handler&&(ro("mousemoveoutside",e,r.handler),r.handler=void 0)},unmounted(e){const{handler:t}=e[Pe];t&&ro("mousemoveoutside",e,t),e[Pe].handler=void 0}},ve="v-hidden",dn=tn("[v-hidden]",{display:"none!important"}),$o=ke({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){const r=T(null),a=T(null);function l(s){const{value:n}=r,{getCounter:b,getTail:w}=e;let h;if(b!==void 0?h=b():h=a.value,!n||!h)return;h.hasAttribute(ve)&&h.removeAttribute(ve);const{children:C}=n;if(s.showAllItemsBeforeCalculate)for(const F of C)F.hasAttribute(ve)&&F.removeAttribute(ve);const _=n.offsetWidth,$=[],P=t.tail?w==null?void 0:w():null;let f=P?P.offsetWidth:0,x=!1;const S=n.children.length-(t.tail?1:0);for(let F=0;F<S-1;++F){if(F<0)continue;const L=C[F];if(x){L.hasAttribute(ve)||L.setAttribute(ve,"");continue}else L.hasAttribute(ve)&&L.removeAttribute(ve);const E=L.offsetWidth;if(f+=E,$[F]=E,f>_){const{updateCounter:z}=e;for(let N=F;N>=0;--N){const G=S-1-N;z!==void 0?z(G):h.textContent=`${G}`;const y=h.offsetWidth;if(f-=$[N],f+y<=_||N===0){x=!0,F=N-1,P&&(F===-1?(P.style.maxWidth=`${_-y}px`,P.style.boxSizing="border-box"):P.style.maxWidth="");const{onUpdateCount:D}=e;D&&D(G);break}}}}const{onUpdateOverflow:k}=e;x?k!==void 0&&k(!0):(k!==void 0&&k(!1),h.setAttribute(ve,""))}const d=mt();return dn.mount({id:"vueuc/overflow",head:!0,anchorMetaName:on,ssr:d}),Ro(()=>l({showAllItemsBeforeCalculate:!1})),{selfRef:r,counterRef:a,sync:l}},render(){const{$slots:e}=this;return ko(()=>this.sync({showAllItemsBeforeCalculate:!1})),u("div",{class:"v-overflow",ref:"selfRef"},[pt(e,"default"),e.counter?e.counter():u("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});let co;function un(){return co===void 0&&(co=navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")),co}function Po(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}var hn=1,fn=2;function vn(e,t,r,a){var l=r.length,d=l;if(e==null)return!d;for(e=Object(e);l--;){var s=r[l];if(s[2]?s[1]!==e[s[0]]:!(s[0]in e))return!1}for(;++l<d;){s=r[l];var n=s[0],b=e[n],w=s[1];if(s[2]){if(b===void 0&&!(n in e))return!1}else{var h=new wt,C;if(!(C===void 0?Eo(w,b,hn|fn,a,h):C))return!1}}return!0}function jo(e){return e===e&&!Ct(e)}function bn(e){for(var t=Wo(e),r=t.length;r--;){var a=t[r],l=e[a];t[r]=[a,l,jo(l)]}return t}function Lo(e,t){return function(r){return r==null?!1:r[e]===t&&(t!==void 0||e in Object(r))}}function gn(e){var t=bn(e);return t.length==1&&t[0][2]?Lo(t[0][0],t[0][1]):function(r){return r===e||vn(r,e,t)}}function pn(e,t){return e!=null&&t in Object(e)}function mn(e,t,r){t=ln(t,e);for(var a=-1,l=t.length,d=!1;++a<l;){var s=yo(t[a]);if(!(d=e!=null&&r(e,s)))break;e=e[s]}return d||++a!=l?d:(l=e==null?0:e.length,!!l&&yt(l)&&xt(s,l)&&(go(e)||St(e)))}function wn(e,t){return e!=null&&mn(e,t,pn)}var Cn=1,yn=2;function xn(e,t){return Do(e)&&jo(t)?Lo(yo(e),t):function(r){var a=an(r,e);return a===void 0&&a===t?wn(r,e):Eo(t,a,Cn|yn)}}function Sn(e){return function(t){return t==null?void 0:t[e]}}function On(e){return function(t){return sn(t,e)}}function $n(e){return Do(e)?Sn(yo(e)):On(e)}function Pn(e){return typeof e=="function"?e:e==null?Ot:typeof e=="object"?go(e)?xn(e[0],e[1]):gn(e):$n(e)}function kn(e,t){return e&&$t(e,t,Wo)}function Rn(e,t){return function(r,a){if(r==null)return r;if(!Io(r))return e(r,a);for(var l=r.length,d=-1,s=Object(r);++d<l&&a(s[d],d,s)!==!1;);return r}}var In=Rn(kn);function Tn(e,t){var r=-1,a=Io(e)?Array(e.length):[];return In(e,function(l,d,s){a[++r]=t(l,d,s)}),a}function Fn(e,t){var r=go(e)?Pt:Tn;return r(e,Pn(t))}const zn={space:"6px",spaceArrow:"10px",arrowOffset:"10px",arrowOffsetVertical:"10px",arrowHeight:"6px",padding:"8px 14px"};function Mn(e){const{boxShadow2:t,popoverColor:r,textColor2:a,borderRadius:l,fontSize:d,dividerColor:s}=e;return Object.assign(Object.assign({},zn),{fontSize:d,borderRadius:l,color:r,dividerColor:s,textColor:a,boxShadow:t})}const No=po({name:"Popover",common:Ue,peers:{Scrollbar:kt},self:Mn}),uo={top:"bottom",bottom:"top",left:"right",right:"left"},X="var(--n-arrow-height) * 1.414",Bn=Q([B("popover",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `,[Q(">",[B("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ge("raw",`
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `,[ge("scrollable",[ge("show-header-or-footer","padding: var(--n-padding);")])]),j("header",`
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `),j("footer",`
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `),q("scrollable, show-header-or-footer",[j("content",`
 padding: var(--n-padding);
 `)])]),B("popover-shared",`
 transform-origin: inherit;
 `,[B("popover-arrow-wrapper",`
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `,[B("popover-arrow",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${X});
 height: calc(${X});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),Q("&.popover-transition-enter-from, &.popover-transition-leave-to",`
 opacity: 0;
 transform: scale(.85);
 `),Q("&.popover-transition-enter-to, &.popover-transition-leave-from",`
 transform: scale(1);
 opacity: 1;
 `),Q("&.popover-transition-enter-active",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),Q("&.popover-transition-leave-active",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)]),ie("top-start",`
 top: calc(${X} / -2);
 left: calc(${be("top-start")} - var(--v-offset-left));
 `),ie("top",`
 top: calc(${X} / -2);
 transform: translateX(calc(${X} / -2)) rotate(45deg);
 left: 50%;
 `),ie("top-end",`
 top: calc(${X} / -2);
 right: calc(${be("top-end")} + var(--v-offset-left));
 `),ie("bottom-start",`
 bottom: calc(${X} / -2);
 left: calc(${be("bottom-start")} - var(--v-offset-left));
 `),ie("bottom",`
 bottom: calc(${X} / -2);
 transform: translateX(calc(${X} / -2)) rotate(45deg);
 left: 50%;
 `),ie("bottom-end",`
 bottom: calc(${X} / -2);
 right: calc(${be("bottom-end")} + var(--v-offset-left));
 `),ie("left-start",`
 left: calc(${X} / -2);
 top: calc(${be("left-start")} - var(--v-offset-top));
 `),ie("left",`
 left: calc(${X} / -2);
 transform: translateY(calc(${X} / -2)) rotate(45deg);
 top: 50%;
 `),ie("left-end",`
 left: calc(${X} / -2);
 bottom: calc(${be("left-end")} + var(--v-offset-top));
 `),ie("right-start",`
 right: calc(${X} / -2);
 top: calc(${be("right-start")} - var(--v-offset-top));
 `),ie("right",`
 right: calc(${X} / -2);
 transform: translateY(calc(${X} / -2)) rotate(45deg);
 top: 50%;
 `),ie("right-end",`
 right: calc(${X} / -2);
 bottom: calc(${be("right-end")} + var(--v-offset-top));
 `),...Fn({top:["right-start","left-start"],right:["top-end","bottom-end"],bottom:["right-end","left-end"],left:["top-start","bottom-start"]},(e,t)=>{const r=["right","left"].includes(t),a=r?"width":"height";return e.map(l=>{const d=l.split("-")[1]==="end",n=`calc((${`var(--v-target-${a}, 0px)`} - ${X}) / 2)`,b=be(l);return Q(`[v-placement="${l}"] >`,[B("popover-shared",[q("center-arrow",[B("popover-arrow",`${t}: calc(max(${n}, ${b}) ${d?"+":"-"} var(--v-offset-${r?"left":"top"}));`)])])])})})]);function be(e){return["top","bottom"].includes(e.split("-")[0])?"var(--n-arrow-offset)":"var(--n-arrow-offset-vertical)"}function ie(e,t){const r=e.split("-")[0],a=["top","bottom"].includes(r)?"height: var(--n-space-arrow);":"width: var(--n-space-arrow);";return Q(`[v-placement="${e}"] >`,[B("popover-shared",`
 margin-${uo[r]}: var(--n-space);
 `,[q("show-arrow",`
 margin-${uo[r]}: var(--n-space-arrow);
 `),q("overlap",`
 margin: 0;
 `),Rt("popover-arrow-wrapper",`
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${r}: 100%;
 ${uo[r]}: auto;
 ${a}
 `,[B("popover-arrow",t)])])])}const Vo=Object.assign(Object.assign({},pe.props),{to:xe.propTo,show:Boolean,trigger:String,showArrow:Boolean,delay:Number,duration:Number,raw:Boolean,arrowPointToCenter:Boolean,arrowClass:String,arrowStyle:[String,Object],arrowWrapperClass:String,arrowWrapperStyle:[String,Object],displayDirective:String,x:Number,y:Number,flip:Boolean,overlap:Boolean,placement:String,width:[Number,String],keepAliveOnHover:Boolean,scrollable:Boolean,contentClass:String,contentStyle:[Object,String],headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],internalDeactivateImmediately:Boolean,animated:Boolean,onClickoutside:Function,internalTrapFocus:Boolean,internalOnAfterLeave:Function,minWidth:Number,maxWidth:Number});function _n({arrowClass:e,arrowStyle:t,arrowWrapperClass:r,arrowWrapperStyle:a,clsPrefix:l}){return u("div",{key:"__popover-arrow__",style:a,class:[`${l}-popover-arrow-wrapper`,r]},u("div",{class:[`${l}-popover-arrow`,e],style:t}))}const An=ke({name:"PopoverBody",inheritAttrs:!1,props:Vo,setup(e,{slots:t,attrs:r}){const{namespaceRef:a,mergedClsPrefixRef:l,inlineThemeDisabled:d,mergedRtlRef:s}=Ke(e),n=pe("Popover","-popover",Bn,No,e,l),b=mo("Popover",s,l),w=T(null),h=It("NPopover"),C=T(null),_=T(e.show),$=T(!1);wo(()=>{const{show:y}=e;y&&!un()&&!e.internalDeactivateImmediately&&($.value=!0)});const P=U(()=>{const{trigger:y,onClickoutside:D}=e,A=[],{positionManuallyRef:{value:m}}=h;return m||(y==="click"&&!D&&A.push([Ve,z,void 0,{capture:!0}]),y==="hover"&&A.push([cn,E])),D&&A.push([Ve,z,void 0,{capture:!0}]),(e.displayDirective==="show"||e.animated&&$.value)&&A.push([zo,e.show]),A}),f=U(()=>{const{common:{cubicBezierEaseInOut:y,cubicBezierEaseIn:D,cubicBezierEaseOut:A},self:{space:m,spaceArrow:H,padding:ae,fontSize:g,textColor:K,dividerColor:V,color:re,boxShadow:Z,borderRadius:ce,arrowHeight:ee,arrowOffset:oe,arrowOffsetVertical:ue}}=n.value;return{"--n-box-shadow":Z,"--n-bezier":y,"--n-bezier-ease-in":D,"--n-bezier-ease-out":A,"--n-font-size":g,"--n-text-color":K,"--n-color":re,"--n-divider-color":V,"--n-border-radius":ce,"--n-arrow-height":ee,"--n-arrow-offset":oe,"--n-arrow-offset-vertical":ue,"--n-padding":ae,"--n-space":m,"--n-space-arrow":H}}),x=U(()=>{const y=e.width==="trigger"?void 0:so(e.width),D=[];y&&D.push({width:y});const{maxWidth:A,minWidth:m}=e;return A&&D.push({maxWidth:so(A)}),m&&D.push({maxWidth:so(m)}),d||D.push(f.value),D}),S=d?Ge("popover",void 0,f,e):void 0;h.setBodyInstance({syncPosition:k}),Tt(()=>{h.setBodyInstance(null)}),ze(se(e,"show"),y=>{e.animated||(y?_.value=!0:_.value=!1)});function k(){var y;(y=w.value)===null||y===void 0||y.syncPosition()}function F(y){e.trigger==="hover"&&e.keepAliveOnHover&&e.show&&h.handleMouseEnter(y)}function L(y){e.trigger==="hover"&&e.keepAliveOnHover&&h.handleMouseLeave(y)}function E(y){e.trigger==="hover"&&!N().contains(fo(y))&&h.handleMouseMoveOutside(y)}function z(y){(e.trigger==="click"&&!N().contains(fo(y))||e.onClickoutside)&&h.handleClickOutside(y)}function N(){return h.getTriggerElement()}Be(Bt,C),Be(_t,null),Be(At,null);function G(){if(S==null||S.onRender(),!(e.displayDirective==="show"||e.show||e.animated&&$.value))return null;let D;const A=h.internalRenderBodyRef.value,{value:m}=l;if(A)D=A([`${m}-popover-shared`,(b==null?void 0:b.value)&&`${m}-popover--rtl`,S==null?void 0:S.themeClass.value,e.overlap&&`${m}-popover-shared--overlap`,e.showArrow&&`${m}-popover-shared--show-arrow`,e.arrowPointToCenter&&`${m}-popover-shared--center-arrow`],C,x.value,F,L);else{const{value:H}=h.extraClassRef,{internalTrapFocus:ae}=e,g=!xo(t.header)||!xo(t.footer),K=()=>{var V,re;const Z=g?u(Fo,null,Me(t.header,oe=>oe?u("div",{class:[`${m}-popover__header`,e.headerClass],style:e.headerStyle},oe):null),Me(t.default,oe=>oe?u("div",{class:[`${m}-popover__content`,e.contentClass],style:e.contentStyle},t):null),Me(t.footer,oe=>oe?u("div",{class:[`${m}-popover__footer`,e.footerClass],style:e.footerStyle},oe):null)):e.scrollable?(V=t.default)===null||V===void 0?void 0:V.call(t):u("div",{class:[`${m}-popover__content`,e.contentClass],style:e.contentStyle},t),ce=e.scrollable?u(Mt,{themeOverrides:n.value.peerOverrides.Scrollbar,theme:n.value.peers.Scrollbar,contentClass:g?void 0:`${m}-popover__content ${(re=e.contentClass)!==null&&re!==void 0?re:""}`,contentStyle:g?void 0:e.contentStyle},{default:()=>Z}):Z,ee=e.showArrow?_n({arrowClass:e.arrowClass,arrowStyle:e.arrowStyle,arrowWrapperClass:e.arrowWrapperClass,arrowWrapperStyle:e.arrowWrapperStyle,clsPrefix:m}):null;return[ce,ee]};D=u("div",zt({class:[`${m}-popover`,`${m}-popover-shared`,(b==null?void 0:b.value)&&`${m}-popover--rtl`,S==null?void 0:S.themeClass.value,H.map(V=>`${m}-${V}`),{[`${m}-popover--scrollable`]:e.scrollable,[`${m}-popover--show-header-or-footer`]:g,[`${m}-popover--raw`]:e.raw,[`${m}-popover-shared--overlap`]:e.overlap,[`${m}-popover-shared--show-arrow`]:e.showArrow,[`${m}-popover-shared--center-arrow`]:e.arrowPointToCenter}],ref:C,style:x.value,onKeydown:h.handleKeydown,onMouseenter:F,onMouseleave:L},r),ae?u(Ft,{active:e.show,autoFocus:!0},{default:K}):K())}return Co(D,P.value)}return{displayed:$,namespace:a,isMounted:h.isMountedRef,zIndex:h.zIndexRef,followerRef:w,adjustedTo:xe(e),followerEnabled:_,renderContentNode:G}},render(){return u(Bo,{ref:"followerRef",zIndex:this.zIndex,show:this.show,enabled:this.followerEnabled,to:this.adjustedTo,x:this.x,y:this.y,flip:this.flip,placement:this.placement,containerClass:this.namespace,overlap:this.overlap,width:this.width==="trigger"?"target":void 0,teleportDisabled:this.adjustedTo===xe.tdkey},{default:()=>this.animated?u(To,{name:"popover-transition",appear:this.isMounted,onEnter:()=>{this.followerEnabled=!0},onAfterLeave:()=>{var e;(e=this.internalOnAfterLeave)===null||e===void 0||e.call(this),this.followerEnabled=!1,this.displayed=!1}},{default:this.renderContentNode}):this.renderContentNode()})}}),En=Object.keys(Vo),Wn={focus:["onFocus","onBlur"],click:["onClick"],hover:["onMouseenter","onMouseleave"],manual:[],nested:["onFocus","onBlur","onMouseenter","onMouseleave","onClick"]};function Dn(e,t,r){Wn[t].forEach(a=>{e.props?e.props=Object.assign({},e.props):e.props={};const l=e.props[a],d=r[a];l?e.props[a]=(...s)=>{l(...s),d(...s)}:e.props[a]=d})}const Hn={show:{type:Boolean,default:void 0},defaultShow:Boolean,showArrow:{type:Boolean,default:!0},trigger:{type:String,default:"hover"},delay:{type:Number,default:100},duration:{type:Number,default:100},raw:Boolean,placement:{type:String,default:"top"},x:Number,y:Number,arrowPointToCenter:Boolean,disabled:Boolean,getDisabled:Function,displayDirective:{type:String,default:"if"},arrowClass:String,arrowStyle:[String,Object],arrowWrapperClass:String,arrowWrapperStyle:[String,Object],flip:{type:Boolean,default:!0},animated:{type:Boolean,default:!0},width:{type:[Number,String],default:void 0},overlap:Boolean,keepAliveOnHover:{type:Boolean,default:!0},zIndex:Number,to:xe.propTo,scrollable:Boolean,contentClass:String,contentStyle:[Object,String],headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],onClickoutside:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],internalDeactivateImmediately:Boolean,internalSyncTargetWithParent:Boolean,internalInheritedEventHandlers:{type:Array,default:()=>[]},internalTrapFocus:Boolean,internalExtraClass:{type:Array,default:()=>[]},onShow:[Function,Array],onHide:[Function,Array],arrow:{type:Boolean,default:void 0},minWidth:Number,maxWidth:Number},jn=Object.assign(Object.assign(Object.assign({},pe.props),Hn),{internalOnAfterLeave:Function,internalRenderBody:Function}),Ln=ke({name:"Popover",inheritAttrs:!1,props:jn,slots:Object,__popover__:!0,setup(e){const t=Mo(),r=T(null),a=U(()=>e.show),l=T(e.defaultShow),d=bo(a,l),s=So(()=>e.disabled?!1:d.value),n=()=>{if(e.disabled)return!0;const{getDisabled:g}=e;return!!(g!=null&&g())},b=()=>n()?!1:d.value,w=Ho(e,["arrow","showArrow"]),h=U(()=>e.overlap?!1:w.value);let C=null;const _=T(null),$=T(null),P=So(()=>e.x!==void 0&&e.y!==void 0);function f(g){const{"onUpdate:show":K,onUpdateShow:V,onShow:re,onHide:Z}=e;l.value=g,K&&ne(K,g),V&&ne(V,g),g&&re&&ne(re,!0),g&&Z&&ne(Z,!1)}function x(){C&&C.syncPosition()}function S(){const{value:g}=_;g&&(window.clearTimeout(g),_.value=null)}function k(){const{value:g}=$;g&&(window.clearTimeout(g),$.value=null)}function F(){const g=n();if(e.trigger==="focus"&&!g){if(b())return;f(!0)}}function L(){const g=n();if(e.trigger==="focus"&&!g){if(!b())return;f(!1)}}function E(){const g=n();if(e.trigger==="hover"&&!g){if(k(),_.value!==null||b())return;const K=()=>{f(!0),_.value=null},{delay:V}=e;V===0?K():_.value=window.setTimeout(K,V)}}function z(){const g=n();if(e.trigger==="hover"&&!g){if(S(),$.value!==null||!b())return;const K=()=>{f(!1),$.value=null},{duration:V}=e;V===0?K():$.value=window.setTimeout(K,V)}}function N(){z()}function G(g){var K;b()&&(e.trigger==="click"&&(S(),k(),f(!1)),(K=e.onClickoutside)===null||K===void 0||K.call(e,g))}function y(){if(e.trigger==="click"&&!n()){S(),k();const g=!b();f(g)}}function D(g){e.internalTrapFocus&&g.key==="Escape"&&(S(),k(),f(!1))}function A(g){l.value=g}function m(){var g;return(g=r.value)===null||g===void 0?void 0:g.targetRef}function H(g){C=g}return Be("NPopover",{getTriggerElement:m,handleKeydown:D,handleMouseEnter:E,handleMouseLeave:z,handleClickOutside:G,handleMouseMoveOutside:N,setBodyInstance:H,positionManuallyRef:P,isMountedRef:t,zIndexRef:se(e,"zIndex"),extraClassRef:se(e,"internalExtraClass"),internalRenderBodyRef:se(e,"internalRenderBody")}),wo(()=>{d.value&&n()&&f(!1)}),{binderInstRef:r,positionManually:P,mergedShowConsideringDisabledProp:s,uncontrolledShow:l,mergedShowArrow:h,getMergedShow:b,setShow:A,handleClick:y,handleMouseEnter:E,handleMouseLeave:z,handleFocus:F,handleBlur:L,syncPosition:x}},render(){var e;const{positionManually:t,$slots:r}=this;let a,l=!1;if(!t&&(a=Et(r,"trigger"),a)){a=Wt(a),a=a.type===Dt?u("span",[a]):a;const d={onClick:this.handleClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onFocus:this.handleFocus,onBlur:this.handleBlur};if(!((e=a.type)===null||e===void 0)&&e.__popover__)l=!0,a.props||(a.props={internalSyncTargetWithParent:!0,internalInheritedEventHandlers:[]}),a.props.internalSyncTargetWithParent=!0,a.props.internalInheritedEventHandlers?a.props.internalInheritedEventHandlers=[d,...a.props.internalInheritedEventHandlers]:a.props.internalInheritedEventHandlers=[d];else{const{internalInheritedEventHandlers:s}=this,n=[d,...s],b={onBlur:w=>{n.forEach(h=>{h.onBlur(w)})},onFocus:w=>{n.forEach(h=>{h.onFocus(w)})},onClick:w=>{n.forEach(h=>{h.onClick(w)})},onMouseenter:w=>{n.forEach(h=>{h.onMouseenter(w)})},onMouseleave:w=>{n.forEach(h=>{h.onMouseleave(w)})}};Dn(a,s?"nested":t?"manual":this.trigger,b)}}return u(_o,{ref:"binderInstRef",syncTarget:!l,syncTargetWithParent:this.internalSyncTargetWithParent},{default:()=>{this.mergedShowConsideringDisabledProp;const d=this.getMergedShow();return[this.internalTrapFocus&&d?Co(u("div",{style:{position:"fixed",top:0,right:0,bottom:0,left:0}}),[[Ht,{enabled:d,zIndex:this.zIndex}]]):null,t?null:u(Ao,null,{default:()=>a}),u(An,jt(this.$props,En,Object.assign(Object.assign({},this.$attrs),{showArrow:this.mergedShowArrow,show:d})),{default:()=>{var s,n;return(n=(s=this.$slots).default)===null||n===void 0?void 0:n.call(s)},header:()=>{var s,n;return(n=(s=this.$slots).header)===null||n===void 0?void 0:n.call(s)},footer:()=>{var s,n;return(n=(s=this.$slots).footer)===null||n===void 0?void 0:n.call(s)}})]}})}}),Nn={closeIconSizeTiny:"12px",closeIconSizeSmall:"12px",closeIconSizeMedium:"14px",closeIconSizeLarge:"14px",closeSizeTiny:"16px",closeSizeSmall:"16px",closeSizeMedium:"18px",closeSizeLarge:"18px",padding:"0 7px",closeMargin:"0 0 0 4px"};function Vn(e){const{textColor2:t,primaryColorHover:r,primaryColorPressed:a,primaryColor:l,infoColor:d,successColor:s,warningColor:n,errorColor:b,baseColor:w,borderColor:h,opacityDisabled:C,tagColor:_,closeIconColor:$,closeIconColorHover:P,closeIconColorPressed:f,borderRadiusSmall:x,fontSizeMini:S,fontSizeTiny:k,fontSizeSmall:F,fontSizeMedium:L,heightMini:E,heightTiny:z,heightSmall:N,heightMedium:G,closeColorHover:y,closeColorPressed:D,buttonColor2Hover:A,buttonColor2Pressed:m,fontWeightStrong:H}=e;return Object.assign(Object.assign({},Nn),{closeBorderRadius:x,heightTiny:E,heightSmall:z,heightMedium:N,heightLarge:G,borderRadius:x,opacityDisabled:C,fontSizeTiny:S,fontSizeSmall:k,fontSizeMedium:F,fontSizeLarge:L,fontWeightStrong:H,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:w,colorCheckable:"#0000",colorHoverCheckable:A,colorPressedCheckable:m,colorChecked:l,colorCheckedHover:r,colorCheckedPressed:a,border:`1px solid ${h}`,textColor:t,color:_,colorBordered:"rgb(250, 250, 252)",closeIconColor:$,closeIconColorHover:P,closeIconColorPressed:f,closeColorHover:y,closeColorPressed:D,borderPrimary:`1px solid ${W(l,{alpha:.3})}`,textColorPrimary:l,colorPrimary:W(l,{alpha:.12}),colorBorderedPrimary:W(l,{alpha:.1}),closeIconColorPrimary:l,closeIconColorHoverPrimary:l,closeIconColorPressedPrimary:l,closeColorHoverPrimary:W(l,{alpha:.12}),closeColorPressedPrimary:W(l,{alpha:.18}),borderInfo:`1px solid ${W(d,{alpha:.3})}`,textColorInfo:d,colorInfo:W(d,{alpha:.12}),colorBorderedInfo:W(d,{alpha:.1}),closeIconColorInfo:d,closeIconColorHoverInfo:d,closeIconColorPressedInfo:d,closeColorHoverInfo:W(d,{alpha:.12}),closeColorPressedInfo:W(d,{alpha:.18}),borderSuccess:`1px solid ${W(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:W(s,{alpha:.12}),colorBorderedSuccess:W(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:W(s,{alpha:.12}),closeColorPressedSuccess:W(s,{alpha:.18}),borderWarning:`1px solid ${W(n,{alpha:.35})}`,textColorWarning:n,colorWarning:W(n,{alpha:.15}),colorBorderedWarning:W(n,{alpha:.12}),closeIconColorWarning:n,closeIconColorHoverWarning:n,closeIconColorPressedWarning:n,closeColorHoverWarning:W(n,{alpha:.12}),closeColorPressedWarning:W(n,{alpha:.18}),borderError:`1px solid ${W(b,{alpha:.23})}`,textColorError:b,colorError:W(b,{alpha:.1}),colorBorderedError:W(b,{alpha:.08}),closeIconColorError:b,closeIconColorHoverError:b,closeIconColorPressedError:b,closeColorHoverError:W(b,{alpha:.12}),closeColorPressedError:W(b,{alpha:.18})})}const Un={common:Ue,self:Vn},Kn={color:Object,type:{type:String,default:"default"},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Gn=B("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[q("strong",`
 font-weight: var(--n-font-weight-strong);
 `),j("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),j("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),j("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),j("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),q("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[j("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),j("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),q("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),q("icon, avatar",[q("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),q("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),q("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[ge("disabled",[Q("&:hover","background-color: var(--n-color-hover-checkable);",[ge("checked","color: var(--n-text-color-hover-checkable);")]),Q("&:active","background-color: var(--n-color-pressed-checkable);",[ge("checked","color: var(--n-text-color-pressed-checkable);")])]),q("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[ge("disabled",[Q("&:hover","background-color: var(--n-color-checked-hover);"),Q("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Jn=Object.assign(Object.assign(Object.assign({},pe.props),Kn),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),Yn=Nt("n-tag"),ho=ke({name:"Tag",props:Jn,slots:Object,setup(e){const t=T(null),{mergedBorderedRef:r,mergedClsPrefixRef:a,inlineThemeDisabled:l,mergedRtlRef:d,mergedComponentPropsRef:s}=Ke(e),n=U(()=>{var f,x;return e.size||((x=(f=s==null?void 0:s.value)===null||f===void 0?void 0:f.Tag)===null||x===void 0?void 0:x.size)||"medium"}),b=pe("Tag","-tag",Gn,Un,e,a);Be(Yn,{roundRef:se(e,"round")});function w(){if(!e.disabled&&e.checkable){const{checked:f,onCheckedChange:x,onUpdateChecked:S,"onUpdate:checked":k}=e;S&&S(!f),k&&k(!f),x&&x(!f)}}function h(f){if(e.triggerClickOnClose||f.stopPropagation(),!e.disabled){const{onClose:x}=e;x&&ne(x,f)}}const C={setTextContent(f){const{value:x}=t;x&&(x.textContent=f)}},_=mo("Tag",d,a),$=U(()=>{const{type:f,color:{color:x,textColor:S}={}}=e,k=n.value,{common:{cubicBezierEaseInOut:F},self:{padding:L,closeMargin:E,borderRadius:z,opacityDisabled:N,textColorCheckable:G,textColorHoverCheckable:y,textColorPressedCheckable:D,textColorChecked:A,colorCheckable:m,colorHoverCheckable:H,colorPressedCheckable:ae,colorChecked:g,colorCheckedHover:K,colorCheckedPressed:V,closeBorderRadius:re,fontWeightStrong:Z,[te("colorBordered",f)]:ce,[te("closeSize",k)]:ee,[te("closeIconSize",k)]:oe,[te("fontSize",k)]:ue,[te("height",k)]:Se,[te("color",f)]:Re,[te("textColor",f)]:Ie,[te("border",f)]:Oe,[te("closeIconColor",f)]:ye,[te("closeIconColorHover",f)]:he,[te("closeIconColorPressed",f)]:le,[te("closeColorHover",f)]:$e,[te("closeColorPressed",f)]:me}}=b.value,we=vo(E);return{"--n-font-weight-strong":Z,"--n-avatar-size-override":`calc(${Se} - 8px)`,"--n-bezier":F,"--n-border-radius":z,"--n-border":Oe,"--n-close-icon-size":oe,"--n-close-color-pressed":me,"--n-close-color-hover":$e,"--n-close-border-radius":re,"--n-close-icon-color":ye,"--n-close-icon-color-hover":he,"--n-close-icon-color-pressed":le,"--n-close-icon-color-disabled":ye,"--n-close-margin-top":we.top,"--n-close-margin-right":we.right,"--n-close-margin-bottom":we.bottom,"--n-close-margin-left":we.left,"--n-close-size":ee,"--n-color":x||(r.value?ce:Re),"--n-color-checkable":m,"--n-color-checked":g,"--n-color-checked-hover":K,"--n-color-checked-pressed":V,"--n-color-hover-checkable":H,"--n-color-pressed-checkable":ae,"--n-font-size":ue,"--n-height":Se,"--n-opacity-disabled":N,"--n-padding":L,"--n-text-color":S||Ie,"--n-text-color-checkable":G,"--n-text-color-checked":A,"--n-text-color-hover-checkable":y,"--n-text-color-pressed-checkable":D}}),P=l?Ge("tag",U(()=>{let f="";const{type:x,color:{color:S,textColor:k}={}}=e;return f+=x[0],f+=n.value[0],S&&(f+=`a${Oo(S)}`),k&&(f+=`b${Oo(k)}`),r.value&&(f+="c"),f}),$,e):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:_,mergedClsPrefix:a,contentRef:t,mergedBordered:r,handleClick:w,handleCloseClick:h,cssVars:l?void 0:$,themeClass:P==null?void 0:P.themeClass,onRender:P==null?void 0:P.onRender})},render(){var e,t;const{mergedClsPrefix:r,rtlEnabled:a,closable:l,color:{borderColor:d}={},round:s,onRender:n,$slots:b}=this;n==null||n();const w=Me(b.avatar,C=>C&&u("div",{class:`${r}-tag__avatar`},C)),h=Me(b.icon,C=>C&&u("div",{class:`${r}-tag__icon`},C));return u("div",{class:[`${r}-tag`,this.themeClass,{[`${r}-tag--rtl`]:a,[`${r}-tag--strong`]:this.strong,[`${r}-tag--disabled`]:this.disabled,[`${r}-tag--checkable`]:this.checkable,[`${r}-tag--checked`]:this.checkable&&this.checked,[`${r}-tag--round`]:s,[`${r}-tag--avatar`]:w,[`${r}-tag--icon`]:h,[`${r}-tag--closable`]:l}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},h||w,u("span",{class:`${r}-tag__content`,ref:"contentRef"},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e)),!this.checkable&&l?u(Lt,{clsPrefix:r,class:`${r}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:s,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?u("div",{class:`${r}-tag__border`,style:{borderColor:d}}):null)}}),Xn={paddingSingle:"0 26px 0 12px",paddingMultiple:"3px 26px 0 12px",clearSize:"16px",arrowSize:"16px"};function qn(e){const{borderRadius:t,textColor2:r,textColorDisabled:a,inputColor:l,inputColorDisabled:d,primaryColor:s,primaryColorHover:n,warningColor:b,warningColorHover:w,errorColor:h,errorColorHover:C,borderColor:_,iconColor:$,iconColorDisabled:P,clearColor:f,clearColorHover:x,clearColorPressed:S,placeholderColor:k,placeholderColorDisabled:F,fontSizeTiny:L,fontSizeSmall:E,fontSizeMedium:z,fontSizeLarge:N,heightTiny:G,heightSmall:y,heightMedium:D,heightLarge:A,fontWeight:m}=e;return Object.assign(Object.assign({},Xn),{fontSizeTiny:L,fontSizeSmall:E,fontSizeMedium:z,fontSizeLarge:N,heightTiny:G,heightSmall:y,heightMedium:D,heightLarge:A,borderRadius:t,fontWeight:m,textColor:r,textColorDisabled:a,placeholderColor:k,placeholderColorDisabled:F,color:l,colorDisabled:d,colorActive:l,border:`1px solid ${_}`,borderHover:`1px solid ${n}`,borderActive:`1px solid ${s}`,borderFocus:`1px solid ${n}`,boxShadowHover:"none",boxShadowActive:`0 0 0 2px ${W(s,{alpha:.2})}`,boxShadowFocus:`0 0 0 2px ${W(s,{alpha:.2})}`,caretColor:s,arrowColor:$,arrowColorDisabled:P,loadingColor:s,borderWarning:`1px solid ${b}`,borderHoverWarning:`1px solid ${w}`,borderActiveWarning:`1px solid ${b}`,borderFocusWarning:`1px solid ${w}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 0 2px ${W(b,{alpha:.2})}`,boxShadowFocusWarning:`0 0 0 2px ${W(b,{alpha:.2})}`,colorActiveWarning:l,caretColorWarning:b,borderError:`1px solid ${h}`,borderHoverError:`1px solid ${C}`,borderActiveError:`1px solid ${h}`,borderFocusError:`1px solid ${C}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 0 2px ${W(h,{alpha:.2})}`,boxShadowFocusError:`0 0 0 2px ${W(h,{alpha:.2})}`,colorActiveError:l,caretColorError:h,clearColor:f,clearColorHover:x,clearColorPressed:S})}const Uo=po({name:"InternalSelection",common:Ue,peers:{Popover:No},self:qn}),Qn=Q([B("base-selection",`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[B("base-loading",`
 color: var(--n-loading-color);
 `),B("base-selection-tags","min-height: var(--n-height);"),j("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),j("state-border",`
 z-index: 1;
 border-color: #0000;
 `),B("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[j("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),B("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[j("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),B("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[j("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),B("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),B("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[B("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[j("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),j("render-label",`
 color: var(--n-text-color);
 `)]),ge("disabled",[Q("&:hover",[j("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),q("focus",[j("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),q("active",[j("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),B("base-selection-label","background-color: var(--n-color-active);"),B("base-selection-tags","background-color: var(--n-color-active);")])]),q("disabled","cursor: not-allowed;",[j("arrow",`
 color: var(--n-arrow-color-disabled);
 `),B("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[B("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),j("render-label",`
 color: var(--n-text-color-disabled);
 `)]),B("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),B("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),B("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[j("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),j("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>q(`${e}-status`,[j("state-border",`border: var(--n-border-${e});`),ge("disabled",[Q("&:hover",[j("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),q("active",[j("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),B("base-selection-label",`background-color: var(--n-color-active-${e});`),B("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),q("focus",[j("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),B("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),B("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[Q("&:last-child","padding-right: 0;"),B("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[j("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Zn=ke({name:"InternalSelection",props:Object.assign(Object.assign({},pe.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:r}=Ke(e),a=mo("InternalSelection",r,t),l=T(null),d=T(null),s=T(null),n=T(null),b=T(null),w=T(null),h=T(null),C=T(null),_=T(null),$=T(null),P=T(!1),f=T(!1),x=T(!1),S=pe("InternalSelection","-internal-selection",Qn,Uo,e,se(e,"clsPrefix")),k=U(()=>e.clearable&&!e.disabled&&(x.value||e.active)),F=U(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Ne(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),L=U(()=>{const i=e.selectedOption;if(i)return i[e.labelField]}),E=U(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function z(){var i;const{value:v}=l;if(v){const{value:J}=d;J&&(J.style.width=`${v.offsetWidth}px`,e.maxTagCount!=="responsive"&&((i=_.value)===null||i===void 0||i.sync({showAllItemsBeforeCalculate:!1})))}}function N(){const{value:i}=$;i&&(i.style.display="none")}function G(){const{value:i}=$;i&&(i.style.display="inline-block")}ze(se(e,"active"),i=>{i||N()}),ze(se(e,"pattern"),()=>{e.multiple&&ko(z)});function y(i){const{onFocus:v}=e;v&&v(i)}function D(i){const{onBlur:v}=e;v&&v(i)}function A(i){const{onDeleteOption:v}=e;v&&v(i)}function m(i){const{onClear:v}=e;v&&v(i)}function H(i){const{onPatternInput:v}=e;v&&v(i)}function ae(i){var v;(!i.relatedTarget||!(!((v=s.value)===null||v===void 0)&&v.contains(i.relatedTarget)))&&y(i)}function g(i){var v;!((v=s.value)===null||v===void 0)&&v.contains(i.relatedTarget)||D(i)}function K(i){m(i)}function V(){x.value=!0}function re(){x.value=!1}function Z(i){!e.active||!e.filterable||i.target!==d.value&&i.preventDefault()}function ce(i){A(i)}const ee=T(!1);function oe(i){if(i.key==="Backspace"&&!ee.value&&!e.pattern.length){const{selectedOptions:v}=e;v!=null&&v.length&&ce(v[v.length-1])}}let ue=null;function Se(i){const{value:v}=l;if(v){const J=i.target.value;v.textContent=J,z()}e.ignoreComposition&&ee.value?ue=i:H(i)}function Re(){ee.value=!0}function Ie(){ee.value=!1,e.ignoreComposition&&H(ue),ue=null}function Oe(i){var v;f.value=!0,(v=e.onPatternFocus)===null||v===void 0||v.call(e,i)}function ye(i){var v;f.value=!1,(v=e.onPatternBlur)===null||v===void 0||v.call(e,i)}function he(){var i,v;if(e.filterable)f.value=!1,(i=w.value)===null||i===void 0||i.blur(),(v=d.value)===null||v===void 0||v.blur();else if(e.multiple){const{value:J}=n;J==null||J.blur()}else{const{value:J}=b;J==null||J.blur()}}function le(){var i,v,J;e.filterable?(f.value=!1,(i=w.value)===null||i===void 0||i.focus()):e.multiple?(v=n.value)===null||v===void 0||v.focus():(J=b.value)===null||J===void 0||J.focus()}function $e(){const{value:i}=d;i&&(G(),i.focus())}function me(){const{value:i}=d;i&&i.blur()}function we(i){const{value:v}=h;v&&v.setTextContent(`+${i}`)}function Je(){const{value:i}=C;return i}function Ye(){return d.value}let Te=null;function Fe(){Te!==null&&window.clearTimeout(Te)}function Xe(){e.active||(Fe(),Te=window.setTimeout(()=>{E.value&&(P.value=!0)},100))}function qe(){Fe()}function Qe(i){i||(Fe(),P.value=!1)}ze(E,i=>{i||(P.value=!1)}),Ro(()=>{wo(()=>{const i=w.value;i&&(e.disabled?i.removeAttribute("tabindex"):i.tabIndex=f.value?-1:0)})}),Jt(s,e.onResize);const{inlineThemeDisabled:_e}=e,Ae=U(()=>{const{size:i}=e,{common:{cubicBezierEaseInOut:v},self:{fontWeight:J,borderRadius:Ze,color:eo,placeholderColor:oo,textColor:Ee,paddingSingle:We,paddingMultiple:De,caretColor:to,colorDisabled:no,textColorDisabled:He,placeholderColorDisabled:Ce,colorActive:o,boxShadowFocus:c,boxShadowActive:p,boxShadowHover:I,border:O,borderFocus:R,borderHover:M,borderActive:Y,arrowColor:de,arrowColorDisabled:Ko,loadingColor:Go,colorActiveWarning:Jo,boxShadowFocusWarning:Yo,boxShadowActiveWarning:Xo,boxShadowHoverWarning:qo,borderWarning:Qo,borderFocusWarning:Zo,borderHoverWarning:et,borderActiveWarning:ot,colorActiveError:tt,boxShadowFocusError:nt,boxShadowActiveError:rt,boxShadowHoverError:lt,borderError:at,borderFocusError:it,borderHoverError:st,borderActiveError:ct,clearColor:dt,clearColorHover:ut,clearColorPressed:ht,clearSize:ft,arrowSize:vt,[te("height",i)]:bt,[te("fontSize",i)]:gt}}=S.value,je=vo(We),Le=vo(De);return{"--n-bezier":v,"--n-border":O,"--n-border-active":Y,"--n-border-focus":R,"--n-border-hover":M,"--n-border-radius":Ze,"--n-box-shadow-active":p,"--n-box-shadow-focus":c,"--n-box-shadow-hover":I,"--n-caret-color":to,"--n-color":eo,"--n-color-active":o,"--n-color-disabled":no,"--n-font-size":gt,"--n-height":bt,"--n-padding-single-top":je.top,"--n-padding-multiple-top":Le.top,"--n-padding-single-right":je.right,"--n-padding-multiple-right":Le.right,"--n-padding-single-left":je.left,"--n-padding-multiple-left":Le.left,"--n-padding-single-bottom":je.bottom,"--n-padding-multiple-bottom":Le.bottom,"--n-placeholder-color":oo,"--n-placeholder-color-disabled":Ce,"--n-text-color":Ee,"--n-text-color-disabled":He,"--n-arrow-color":de,"--n-arrow-color-disabled":Ko,"--n-loading-color":Go,"--n-color-active-warning":Jo,"--n-box-shadow-focus-warning":Yo,"--n-box-shadow-active-warning":Xo,"--n-box-shadow-hover-warning":qo,"--n-border-warning":Qo,"--n-border-focus-warning":Zo,"--n-border-hover-warning":et,"--n-border-active-warning":ot,"--n-color-active-error":tt,"--n-box-shadow-focus-error":nt,"--n-box-shadow-active-error":rt,"--n-box-shadow-hover-error":lt,"--n-border-error":at,"--n-border-focus-error":it,"--n-border-hover-error":st,"--n-border-active-error":ct,"--n-clear-size":ft,"--n-clear-color":dt,"--n-clear-color-hover":ut,"--n-clear-color-pressed":ht,"--n-arrow-size":vt,"--n-font-weight":J}}),fe=_e?Ge("internal-selection",U(()=>e.size[0]),Ae,e):void 0;return{mergedTheme:S,mergedClearable:k,mergedClsPrefix:t,rtlEnabled:a,patternInputFocused:f,filterablePlaceholder:F,label:L,selected:E,showTagsPanel:P,isComposing:ee,counterRef:h,counterWrapperRef:C,patternInputMirrorRef:l,patternInputRef:d,selfRef:s,multipleElRef:n,singleElRef:b,patternInputWrapperRef:w,overflowRef:_,inputTagElRef:$,handleMouseDown:Z,handleFocusin:ae,handleClear:K,handleMouseEnter:V,handleMouseLeave:re,handleDeleteOption:ce,handlePatternKeyDown:oe,handlePatternInputInput:Se,handlePatternInputBlur:ye,handlePatternInputFocus:Oe,handleMouseEnterCounter:Xe,handleMouseLeaveCounter:qe,handleFocusout:g,handleCompositionEnd:Ie,handleCompositionStart:Re,onPopoverUpdateShow:Qe,focus:le,focusInput:$e,blur:he,blurInput:me,updateCounter:we,getCounter:Je,getTail:Ye,renderLabel:e.renderLabel,cssVars:_e?void 0:Ae,themeClass:fe==null?void 0:fe.themeClass,onRender:fe==null?void 0:fe.onRender}},render(){const{status:e,multiple:t,size:r,disabled:a,filterable:l,maxTagCount:d,bordered:s,clsPrefix:n,ellipsisTagPopoverProps:b,onRender:w,renderTag:h,renderLabel:C}=this;w==null||w();const _=d==="responsive",$=typeof d=="number",P=_||$,f=u(Vt,null,{default:()=>u(nn,{clsPrefix:n,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var S,k;return(k=(S=this.$slots).arrow)===null||k===void 0?void 0:k.call(S)}})});let x;if(t){const{labelField:S}=this,k=H=>u("div",{class:`${n}-base-selection-tag-wrapper`,key:H.value},h?h({option:H,handleClose:()=>{this.handleDeleteOption(H)}}):u(ho,{size:r,closable:!H.disabled,disabled:a,onClose:()=>{this.handleDeleteOption(H)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>C?C(H,!0):Ne(H[S],H,!0)})),F=()=>($?this.selectedOptions.slice(0,d):this.selectedOptions).map(k),L=l?u("div",{class:`${n}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},u("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${n}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),u("span",{ref:"patternInputMirrorRef",class:`${n}-base-selection-input-tag__mirror`},this.pattern)):null,E=_?()=>u("div",{class:`${n}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},u(ho,{size:r,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a})):void 0;let z;if($){const H=this.selectedOptions.length-d;H>0&&(z=u("div",{class:`${n}-base-selection-tag-wrapper`,key:"__counter__"},u(ho,{size:r,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${H}`})))}const N=_?l?u($o,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:F,counter:E,tail:()=>L}):u($o,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:F,counter:E}):$&&z?F().concat(z):F(),G=P?()=>u("div",{class:`${n}-base-selection-popover`},_?F():this.selectedOptions.map(k)):void 0,y=P?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},b):null,A=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?u("div",{class:`${n}-base-selection-placeholder ${n}-base-selection-overlay`},u("div",{class:`${n}-base-selection-placeholder__inner`},this.placeholder)):null,m=l?u("div",{ref:"patternInputWrapperRef",class:`${n}-base-selection-tags`},N,_?null:L,f):u("div",{ref:"multipleElRef",class:`${n}-base-selection-tags`,tabindex:a?void 0:0},N,f);x=u(Fo,null,P?u(Ln,Object.assign({},y,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>m,default:G}):m,A)}else if(l){const S=this.pattern||this.isComposing,k=this.active?!S:!this.selected,F=this.active?!1:this.selected;x=u("div",{ref:"patternInputWrapperRef",class:`${n}-base-selection-label`,title:this.patternInputFocused?void 0:Po(this.label)},u("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${n}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),F?u("div",{class:`${n}-base-selection-label__render-label ${n}-base-selection-overlay`,key:"input"},u("div",{class:`${n}-base-selection-overlay__wrapper`},h?h({option:this.selectedOption,handleClose:()=>{}}):C?C(this.selectedOption,!0):Ne(this.label,this.selectedOption,!0))):null,k?u("div",{class:`${n}-base-selection-placeholder ${n}-base-selection-overlay`,key:"placeholder"},u("div",{class:`${n}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,f)}else x=u("div",{ref:"singleElRef",class:`${n}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?u("div",{class:`${n}-base-selection-input`,title:Po(this.label),key:"input"},u("div",{class:`${n}-base-selection-input__content`},h?h({option:this.selectedOption,handleClose:()=>{}}):C?C(this.selectedOption,!0):Ne(this.label,this.selectedOption,!0))):u("div",{class:`${n}-base-selection-placeholder ${n}-base-selection-overlay`,key:"placeholder"},u("div",{class:`${n}-base-selection-placeholder__inner`},this.placeholder)),f);return u("div",{ref:"selfRef",class:[`${n}-base-selection`,this.rtlEnabled&&`${n}-base-selection--rtl`,this.themeClass,e&&`${n}-base-selection--${e}-status`,{[`${n}-base-selection--active`]:this.active,[`${n}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${n}-base-selection--disabled`]:this.disabled,[`${n}-base-selection--multiple`]:this.multiple,[`${n}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},x,s?u("div",{class:`${n}-base-selection__border`}):null,s?u("div",{class:`${n}-base-selection__state-border`}):null)}});function er(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}const or=po({name:"Select",common:Ue,peers:{InternalSelection:Uo,InternalSelectMenu:Yt},self:er}),tr=Q([B("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),B("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Ut({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),nr=Object.assign(Object.assign({},pe.props),{to:xe.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),ur=ke({name:"Select",props:nr,slots:Object,setup(e){const{mergedClsPrefixRef:t,mergedBorderedRef:r,namespaceRef:a,inlineThemeDisabled:l,mergedComponentPropsRef:d}=Ke(e),s=pe("Select","-select",tr,or,e,t),n=T(e.defaultValue),b=se(e,"value"),w=bo(b,n),h=T(!1),C=T(""),_=Ho(e,["items","options"]),$=T([]),P=T([]),f=U(()=>P.value.concat($.value).concat(_.value)),x=U(()=>{const{filter:o}=e;if(o)return o;const{labelField:c,valueField:p}=e;return(I,O)=>{if(!O)return!1;const R=O[c];if(typeof R=="string")return ao(I,R);const M=O[p];return typeof M=="string"?ao(I,M):typeof M=="number"?ao(I,String(M)):!1}}),S=U(()=>{if(e.remote)return _.value;{const{value:o}=f,{value:c}=C;return!c.length||!e.filterable?o:en(o,x.value,c,e.childrenField)}}),k=U(()=>{const{valueField:o,childrenField:c}=e,p=Qt(o,c);return qt(S.value,p)}),F=U(()=>Zt(f.value,e.valueField,e.childrenField)),L=T(!1),E=bo(se(e,"show"),L),z=T(null),N=T(null),G=T(null),{localeRef:y}=rn("Select"),D=U(()=>{var o;return(o=e.placeholder)!==null&&o!==void 0?o:y.value.placeholder}),A=[],m=T(new Map),H=U(()=>{const{fallbackOption:o}=e;if(o===void 0){const{labelField:c,valueField:p}=e;return I=>({[c]:String(I),[p]:I})}return o===!1?!1:c=>Object.assign(o(c),{value:c})});function ae(o){const c=e.remote,{value:p}=m,{value:I}=F,{value:O}=H,R=[];return o.forEach(M=>{if(I.has(M))R.push(I.get(M));else if(c&&p.has(M))R.push(p.get(M));else if(O){const Y=O(M);Y&&R.push(Y)}}),R}const g=U(()=>{if(e.multiple){const{value:o}=w;return Array.isArray(o)?ae(o):[]}return null}),K=U(()=>{const{value:o}=w;return!e.multiple&&!Array.isArray(o)?o===null?null:ae([o])[0]||null:null}),V=Kt(e,{mergedSize:o=>{var c,p;const{size:I}=e;if(I)return I;const{mergedSize:O}=o||{};if(O!=null&&O.value)return O.value;const R=(p=(c=d==null?void 0:d.value)===null||c===void 0?void 0:c.Select)===null||p===void 0?void 0:p.size;return R||"medium"}}),{mergedSizeRef:re,mergedDisabledRef:Z,mergedStatusRef:ce}=V;function ee(o,c){const{onChange:p,"onUpdate:value":I,onUpdateValue:O}=e,{nTriggerFormChange:R,nTriggerFormInput:M}=V;p&&ne(p,o,c),O&&ne(O,o,c),I&&ne(I,o,c),n.value=o,R(),M()}function oe(o){const{onBlur:c}=e,{nTriggerFormBlur:p}=V;c&&ne(c,o),p()}function ue(){const{onClear:o}=e;o&&ne(o)}function Se(o){const{onFocus:c,showOnFocus:p}=e,{nTriggerFormFocus:I}=V;c&&ne(c,o),I(),p&&he()}function Re(o){const{onSearch:c}=e;c&&ne(c,o)}function Ie(o){const{onScroll:c}=e;c&&ne(c,o)}function Oe(){var o;const{remote:c,multiple:p}=e;if(c){const{value:I}=m;if(p){const{valueField:O}=e;(o=g.value)===null||o===void 0||o.forEach(R=>{I.set(R[O],R)})}else{const O=K.value;O&&I.set(O[e.valueField],O)}}}function ye(o){const{onUpdateShow:c,"onUpdate:show":p}=e;c&&ne(c,o),p&&ne(p,o),L.value=o}function he(){Z.value||(ye(!0),L.value=!0,e.filterable&&De())}function le(){ye(!1)}function $e(){C.value="",P.value=A}const me=T(!1);function we(){e.filterable&&(me.value=!0)}function Je(){e.filterable&&(me.value=!1,E.value||$e())}function Ye(){Z.value||(E.value?e.filterable?De():le():he())}function Te(o){var c,p;!((p=(c=G.value)===null||c===void 0?void 0:c.selfRef)===null||p===void 0)&&p.contains(o.relatedTarget)||(h.value=!1,oe(o),le())}function Fe(o){Se(o),h.value=!0}function Xe(){h.value=!0}function qe(o){var c;!((c=z.value)===null||c===void 0)&&c.$el.contains(o.relatedTarget)||(h.value=!1,oe(o),le())}function Qe(){var o;(o=z.value)===null||o===void 0||o.focus(),le()}function _e(o){var c;E.value&&(!((c=z.value)===null||c===void 0)&&c.$el.contains(fo(o))||le())}function Ae(o){if(!Array.isArray(o))return[];if(H.value)return Array.from(o);{const{remote:c}=e,{value:p}=F;if(c){const{value:I}=m;return o.filter(O=>p.has(O)||I.has(O))}else return o.filter(I=>p.has(I))}}function fe(o){i(o.rawNode)}function i(o){if(Z.value)return;const{tag:c,remote:p,clearFilterAfterSelect:I,valueField:O}=e;if(c&&!p){const{value:R}=P,M=R[0]||null;if(M){const Y=$.value;Y.length?Y.push(M):$.value=[M],P.value=A}}if(p&&m.value.set(o[O],o),e.multiple){const R=Ae(w.value),M=R.findIndex(Y=>Y===o[O]);if(~M){if(R.splice(M,1),c&&!p){const Y=v(o[O]);~Y&&($.value.splice(Y,1),I&&(C.value=""))}}else R.push(o[O]),I&&(C.value="");ee(R,ae(R))}else{if(c&&!p){const R=v(o[O]);~R?$.value=[$.value[R]]:$.value=A}We(),le(),ee(o[O],o)}}function v(o){return $.value.findIndex(p=>p[e.valueField]===o)}function J(o){E.value||he();const{value:c}=o.target;C.value=c;const{tag:p,remote:I}=e;if(Re(c),p&&!I){if(!c){P.value=A;return}const{onCreate:O}=e,R=O?O(c):{[e.labelField]:c,[e.valueField]:c},{valueField:M,labelField:Y}=e;_.value.some(de=>de[M]===R[M]||de[Y]===R[Y])||$.value.some(de=>de[M]===R[M]||de[Y]===R[Y])?P.value=A:P.value=[R]}}function Ze(o){o.stopPropagation();const{multiple:c,tag:p,remote:I,clearCreatedOptionsOnClear:O}=e;!c&&e.filterable&&le(),p&&!I&&O&&($.value=A),ue(),c?ee([],[]):ee(null,null)}function eo(o){!io(o,"action")&&!io(o,"empty")&&!io(o,"header")&&o.preventDefault()}function oo(o){Ie(o)}function Ee(o){var c,p,I,O,R;if(!e.keyboard){o.preventDefault();return}switch(o.key){case" ":if(e.filterable)break;o.preventDefault();case"Enter":if(!(!((c=z.value)===null||c===void 0)&&c.isComposing)){if(E.value){const M=(p=G.value)===null||p===void 0?void 0:p.getPendingTmNode();M?fe(M):e.filterable||(le(),We())}else if(he(),e.tag&&me.value){const M=P.value[0];if(M){const Y=M[e.valueField],{value:de}=w;e.multiple&&Array.isArray(de)&&de.includes(Y)||i(M)}}}o.preventDefault();break;case"ArrowUp":if(o.preventDefault(),e.loading)return;E.value&&((I=G.value)===null||I===void 0||I.prev());break;case"ArrowDown":if(o.preventDefault(),e.loading)return;E.value?(O=G.value)===null||O===void 0||O.next():he();break;case"Escape":E.value&&(Gt(o),le()),(R=z.value)===null||R===void 0||R.focus();break}}function We(){var o;(o=z.value)===null||o===void 0||o.focus()}function De(){var o;(o=z.value)===null||o===void 0||o.focusInput()}function to(){var o;E.value&&((o=N.value)===null||o===void 0||o.syncPosition())}Oe(),ze(se(e,"options"),Oe);const no={focus:()=>{var o;(o=z.value)===null||o===void 0||o.focus()},focusInput:()=>{var o;(o=z.value)===null||o===void 0||o.focusInput()},blur:()=>{var o;(o=z.value)===null||o===void 0||o.blur()},blurInput:()=>{var o;(o=z.value)===null||o===void 0||o.blurInput()}},He=U(()=>{const{self:{menuBoxShadow:o}}=s.value;return{"--n-menu-box-shadow":o}}),Ce=l?Ge("select",void 0,He,e):void 0;return Object.assign(Object.assign({},no),{mergedStatus:ce,mergedClsPrefix:t,mergedBordered:r,namespace:a,treeMate:k,isMounted:Mo(),triggerRef:z,menuRef:G,pattern:C,uncontrolledShow:L,mergedShow:E,adjustedTo:xe(e),uncontrolledValue:n,mergedValue:w,followerRef:N,localizedPlaceholder:D,selectedOption:K,selectedOptions:g,mergedSize:re,mergedDisabled:Z,focused:h,activeWithoutMenuOpen:me,inlineThemeDisabled:l,onTriggerInputFocus:we,onTriggerInputBlur:Je,handleTriggerOrMenuResize:to,handleMenuFocus:Xe,handleMenuBlur:qe,handleMenuTabOut:Qe,handleTriggerClick:Ye,handleToggle:fe,handleDeleteOption:i,handlePatternInput:J,handleClear:Ze,handleTriggerBlur:Te,handleTriggerFocus:Fe,handleKeydown:Ee,handleMenuAfterLeave:$e,handleMenuClickOutside:_e,handleMenuScroll:oo,handleMenuKeydown:Ee,handleMenuMousedown:eo,mergedTheme:s,cssVars:l?void 0:He,themeClass:Ce==null?void 0:Ce.themeClass,onRender:Ce==null?void 0:Ce.onRender})},render(){return u("div",{class:`${this.mergedClsPrefix}-select`},u(_o,null,{default:()=>[u(Ao,null,{default:()=>u(Zn,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,t;return[(t=(e=this.$slots).arrow)===null||t===void 0?void 0:t.call(e)]}})}),u(Bo,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===xe.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>u(To,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,t,r;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),Co(u(Xt,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(t=this.menuProps)===null||t===void 0?void 0:t.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(r=this.menuProps)===null||r===void 0?void 0:r.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var a,l;return[(l=(a=this.$slots).empty)===null||l===void 0?void 0:l.call(a)]},header:()=>{var a,l;return[(l=(a=this.$slots).header)===null||l===void 0?void 0:l.call(a)]},action:()=>{var a,l;return[(l=(a=this.$slots).action)===null||l===void 0?void 0:l.call(a)]}}),this.displayDirective==="show"?[[zo,this.mergedShow],[Ve,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ve,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{ur as N,Ln as a,ho as b,Hn as c,No as p,_n as r,or as s,Ho as u};
