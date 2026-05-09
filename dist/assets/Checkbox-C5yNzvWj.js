import{v as le,x as ne,D as de,s as l,I as i,G as r,H as y,V as x,al as ie,am as te,an as se,d as be,ao as he,ap as ue,p as ke,F as ve,z as fe,r as B,N as xe,aq as me,A as I,ar as ge,L as pe,a5 as Ce,Y as ze,C as H,Z as $,_ as F}from"./index-CaCqaQsm.js";import{u as we}from"./use-merged-state-BIQFwxnf.js";const ye={sizeSmall:"14px",sizeMedium:"16px",sizeLarge:"18px",labelPadding:"0 8px",labelFontWeight:"400"};function Se(o){const{baseColor:a,inputColorDisabled:s,cardColor:m,modalColor:g,popoverColor:M,textColorDisabled:b,borderColor:h,primaryColor:u,textColor2:c,fontSizeSmall:k,fontSizeMedium:p,fontSizeLarge:C,borderRadiusSmall:S,lineHeight:z}=o;return Object.assign(Object.assign({},ye),{labelLineHeight:z,fontSizeSmall:k,fontSizeMedium:p,fontSizeLarge:C,borderRadius:S,color:a,colorChecked:u,colorDisabled:s,colorDisabledChecked:s,colorTableHeader:m,colorTableHeaderModal:g,colorTableHeaderPopover:M,checkMarkColor:a,checkMarkColorDisabled:b,checkMarkColorDisabledChecked:b,border:`1px solid ${h}`,borderDisabled:`1px solid ${h}`,borderDisabledChecked:`1px solid ${h}`,borderChecked:`1px solid ${u}`,borderFocus:`1px solid ${u}`,boxShadowFocus:`0 0 0 2px ${ne(u,{alpha:.3})}`,textColor:c,textColorDisabled:b})}const Re={common:le,self:Se},De=de("n-checkbox-group"),Me=()=>l("svg",{viewBox:"0 0 64 64",class:"check-icon"},l("path",{d:"M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"})),$e=()=>l("svg",{viewBox:"0 0 100 100",class:"line-icon"},l("path",{d:"M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"})),Te=i([r("checkbox",`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[y("show-label","line-height: var(--n-label-line-height);"),i("&:hover",[r("checkbox-box",[x("border","border: var(--n-border-checked);")])]),i("&:focus:not(:active)",[r("checkbox-box",[x("border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),y("inside-table",[r("checkbox-box",`
 background-color: var(--n-merged-color-table);
 `)]),y("checked",[r("checkbox-box",`
 background-color: var(--n-color-checked);
 `,[r("checkbox-icon",[i(".check-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),y("indeterminate",[r("checkbox-box",[r("checkbox-icon",[i(".check-icon",`
 opacity: 0;
 transform: scale(.5);
 `),i(".line-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),y("checked, indeterminate",[i("&:focus:not(:active)",[r("checkbox-box",[x("border",`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),r("checkbox-box",`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[x("border",{border:"var(--n-border-checked)"})])]),y("disabled",{cursor:"not-allowed"},[y("checked",[r("checkbox-box",`
 background-color: var(--n-color-disabled-checked);
 `,[x("border",{border:"var(--n-border-disabled-checked)"}),r("checkbox-icon",[i(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled-checked)"})])])]),r("checkbox-box",`
 background-color: var(--n-color-disabled);
 `,[x("border",`
 border: var(--n-border-disabled);
 `),r("checkbox-icon",[i(".check-icon, .line-icon",`
 fill: var(--n-check-mark-color-disabled);
 `)])]),x("label",`
 color: var(--n-text-color-disabled);
 `)]),r("checkbox-box-wrapper",`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),r("checkbox-box",`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[x("border",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),r("checkbox-icon",`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[i(".check-icon, .line-icon",`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),ie({left:"1px",top:"1px"})])]),x("label",`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[i("&:empty",{display:"none"})])]),te(r("checkbox",`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),se(r("checkbox",`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),Be=Object.assign(Object.assign({},I.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),Ie=be({name:"Checkbox",props:Be,setup(o){const a=ve(De,null),s=B(null),{mergedClsPrefixRef:m,inlineThemeDisabled:g,mergedRtlRef:M,mergedComponentPropsRef:b}=fe(o),h=B(o.defaultChecked),u=ze(o,"checked"),c=we(u,h),k=xe(()=>{if(a){const e=a.valueSetRef.value;return e&&o.value!==void 0?e.has(o.value):!1}else return c.value===o.checkedValue}),p=me(o,{mergedSize(e){var n,d;const{size:t}=o;if(t!==void 0)return t;if(a){const{value:f}=a.mergedSizeRef;if(f!==void 0)return f}if(e){const{mergedSize:f}=e;if(f!==void 0)return f.value}const v=(d=(n=b==null?void 0:b.value)===null||n===void 0?void 0:n.Checkbox)===null||d===void 0?void 0:d.size;return v||"medium"},mergedDisabled(e){const{disabled:n}=o;if(n!==void 0)return n;if(a){if(a.disabledRef.value)return!0;const{maxRef:{value:d},checkedCountRef:t}=a;if(d!==void 0&&t.value>=d&&!k.value)return!0;const{minRef:{value:v}}=a;if(v!==void 0&&t.value<=v&&k.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:C,mergedSizeRef:S}=p,z=I("Checkbox","-checkbox",Te,Re,o,m);function w(e){if(a&&o.value!==void 0)a.toggleCheckbox(!k.value,o.value);else{const{onChange:n,"onUpdate:checked":d,onUpdateChecked:t}=o,{nTriggerFormInput:v,nTriggerFormChange:f}=p,D=k.value?o.uncheckedValue:o.checkedValue;d&&$(d,D,e),t&&$(t,D,e),n&&$(n,D,e),v(),f(),h.value=D}}function V(e){C.value||w(e)}function _(e){if(!C.value)switch(e.key){case" ":case"Enter":w(e)}}function P(e){switch(e.key){case" ":e.preventDefault()}}const j={focus:()=>{var e;(e=s.value)===null||e===void 0||e.focus()},blur:()=>{var e;(e=s.value)===null||e===void 0||e.blur()}},K=ge("Checkbox",M,m),T=H(()=>{const{value:e}=S,{common:{cubicBezierEaseInOut:n},self:{borderRadius:d,color:t,colorChecked:v,colorDisabled:f,colorTableHeader:D,colorTableHeaderModal:N,colorTableHeaderPopover:L,checkMarkColor:U,checkMarkColorDisabled:E,border:O,borderFocus:A,borderDisabled:G,borderChecked:W,boxShadowFocus:Y,textColor:q,textColorDisabled:Z,checkMarkColorDisabledChecked:J,colorDisabledChecked:Q,borderDisabledChecked:X,labelPadding:ee,labelLineHeight:oe,labelFontWeight:re,[F("fontSize",e)]:ce,[F("size",e)]:ae}}=z.value;return{"--n-label-line-height":oe,"--n-label-font-weight":re,"--n-size":ae,"--n-bezier":n,"--n-border-radius":d,"--n-border":O,"--n-border-checked":W,"--n-border-focus":A,"--n-border-disabled":G,"--n-border-disabled-checked":X,"--n-box-shadow-focus":Y,"--n-color":t,"--n-color-checked":v,"--n-color-table":D,"--n-color-table-modal":N,"--n-color-table-popover":L,"--n-color-disabled":f,"--n-color-disabled-checked":Q,"--n-text-color":q,"--n-text-color-disabled":Z,"--n-check-mark-color":U,"--n-check-mark-color-disabled":E,"--n-check-mark-color-disabled-checked":J,"--n-font-size":ce,"--n-label-padding":ee}}),R=g?pe("checkbox",H(()=>S.value[0]),T,o):void 0;return Object.assign(p,j,{rtlEnabled:K,selfRef:s,mergedClsPrefix:m,mergedDisabled:C,renderedChecked:k,mergedTheme:z,labelId:Ce(),handleClick:V,handleKeyUp:_,handleKeyDown:P,cssVars:g?void 0:T,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender})},render(){var o;const{$slots:a,renderedChecked:s,mergedDisabled:m,indeterminate:g,privateInsideTable:M,cssVars:b,labelId:h,label:u,mergedClsPrefix:c,focusable:k,handleKeyUp:p,handleKeyDown:C,handleClick:S}=this;(o=this.onRender)===null||o===void 0||o.call(this);const z=he(a.default,w=>u||w?l("span",{class:`${c}-checkbox__label`,id:h},u||w):null);return l("div",{ref:"selfRef",class:[`${c}-checkbox`,this.themeClass,this.rtlEnabled&&`${c}-checkbox--rtl`,s&&`${c}-checkbox--checked`,m&&`${c}-checkbox--disabled`,g&&`${c}-checkbox--indeterminate`,M&&`${c}-checkbox--inside-table`,z&&`${c}-checkbox--show-label`],tabindex:m||!k?void 0:0,role:"checkbox","aria-checked":g?"mixed":s,"aria-labelledby":h,style:b,onKeyup:p,onKeydown:C,onClick:S,onMousedown:()=>{ke("selectstart",window,w=>{w.preventDefault()},{once:!0})}},l("div",{class:`${c}-checkbox-box-wrapper`}," ",l("div",{class:`${c}-checkbox-box`},l(ue,null,{default:()=>this.indeterminate?l("div",{key:"indeterminate",class:`${c}-checkbox-icon`},$e()):l("div",{key:"check",class:`${c}-checkbox-icon`},Me())}),l("div",{class:`${c}-checkbox-box__border`}))),z)}});export{Ie as N};
