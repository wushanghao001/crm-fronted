import{d as k,a8 as N,o as _,c as B,a as t,e as a,w as c,g as p,f as o,B as u,r as l,h as C}from"./index-CaCqaQsm.js";import{S as M}from"./Search-DyVoW-5t.js";import{N as D}from"./Input-6dDonCjL.js";import{N as S}from"./Select-KkQ7xfim.js";import{N as L}from"./Table-DwonveGl.js";import"./use-merged-state-BIQFwxnf.js";import"./Popover-Ds2ovcUj.js";import"./get-CIPtV0kc.js";const V={class:"space-y-6"},I={class:"flex items-center justify-between"},$={class:"bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"},q={class:"p-4 border-b border-gray-200 dark:border-gray-700"},H={class:"flex flex-wrap gap-4"},O={class:"flex-1 min-w-[200px]"},P={class:"p-4"},R=k({__name:"OpportunityList",setup(T){const r=l(""),n=l(""),g=l(!1),b=M,m=[{label:"全部",value:""},{label:"初步接触",value:"contact"},{label:"需求确认",value:"requirement"},{label:"方案报价",value:"proposal"},{label:"商务谈判",value:"negotiation"},{label:"签约成交",value:"closed"}],v=l([{id:1,name:"企业版升级项目",customerName:"北京科技有限公司",stage:"negotiation",amount:"¥25,600",probability:80,expectedDate:"2024-02-15",owner:"张三"},{id:2,name:"新系统采购",customerName:"上海贸易集团",stage:"proposal",amount:"¥18,800",probability:60,expectedDate:"2024-02-28",owner:"李四"},{id:3,name:"年度续约",customerName:"广州制造公司",stage:"closed",amount:"¥12,800",probability:100,expectedDate:"2024-01-20",owner:"张三"},{id:4,name:"专业版采购",customerName:"深圳科技有限公司",stage:"requirement",amount:"¥8,600",probability:40,expectedDate:"2024-03-10",owner:"王五"},{id:5,name:"多产品组合",customerName:"杭州互联网公司",stage:"contact",amount:"¥35,000",probability:20,expectedDate:"2024-03-31",owner:"李四"}]),i=C({page:1,pageSize:10,total:45}),w={contact:{label:"初步接触",class:"bg-gray-100 text-gray-700"},requirement:{label:"需求确认",class:"bg-blue-100 text-blue-700"},proposal:{label:"方案报价",class:"bg-yellow-100 text-yellow-700"},negotiation:{label:"商务谈判",class:"bg-orange-100 text-orange-700"},closed:{label:"签约成交",class:"bg-green-100 text-green-700"}},x=[{title:"机会名称",key:"name",width:180},{title:"客户名称",key:"customerName",width:180},{title:"销售阶段",key:"stage",width:120,render:s=>{const e=w[s.stage]||{label:s.stage,class:"bg-gray-100 text-gray-700"};return`<span class="px-2 py-1 rounded-full text-xs ${e.class}">${e.label}</span>`}},{title:"金额",key:"amount",width:100},{title:"成功率",key:"probability",width:100,render:s=>`<div class="flex items-center">
      <div class="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div class="h-full bg-green-500" style="width: ${s.probability}%"></div>
      </div>
      <span class="ml-2 text-sm">${s.probability}%</span>
    </div>`},{title:"预计成交",key:"expectedDate",width:120},{title:"负责人",key:"owner",width:100},{title:"操作",key:"actions",width:140,render:()=>`
      <button class="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors mx-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          <path d="M2.05 15H21a2 2 0 0 0 1.95-2.5L14.95 3a2 2 0 0 0-3.9 0L2.05 12.5A2 2 0 0 0 2.05 15"/>
        </svg>
      </button>
      <button class="p-2 text-green-500 hover:bg-green-50 rounded transition-colors mx-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          <path d="m15 5 4 4"/>
        </svg>
      </button>
      <button class="p-2 text-red-500 hover:bg-red-50 rounded transition-colors mx-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    `}],h=()=>{i.page=1},y=()=>{r.value="",n.value="",i.page=1};return(s,e)=>{const f=N("PlusIcon");return _(),B("div",V,[t("div",I,[e[3]||(e[3]=t("div",null,[t("h2",{class:"text-xl font-bold text-gray-800 dark:text-white"},"销售机会管理"),t("p",{class:"text-gray-500 dark:text-gray-400 mt-1"},"追踪和管理销售机会")],-1)),a(o(u),{type:"primary",class:"bg-blue-500 hover:bg-blue-600"},{default:c(()=>[a(f,{class:"w-4 h-4 mr-2"}),e[2]||(e[2]=p(" 添加机会 ",-1))]),_:1})]),t("div",$,[t("div",q,[t("div",H,[t("div",O,[a(o(D),{value:r.value,"onUpdate:value":e[0]||(e[0]=d=>r.value=d),placeholder:"搜索客户名称或机会名称",class:"w-full","prefix-icon":o(b)},null,8,["value","prefix-icon"])]),a(o(S),{value:n.value,"onUpdate:value":e[1]||(e[1]=d=>n.value=d),placeholder:"销售阶段",class:"w-40",options:m},null,8,["value"]),a(o(u),{type:"primary",onClick:h},{default:c(()=>[...e[4]||(e[4]=[p("搜索",-1)])]),_:1}),a(o(u),{onClick:y},{default:c(()=>[...e[5]||(e[5]=[p("重置",-1)])]),_:1})])]),t("div",P,[a(o(L),{columns:x,data:v.value,pagination:i,loading:g.value},null,8,["data","pagination","loading"])])])])}}});export{R as default};
