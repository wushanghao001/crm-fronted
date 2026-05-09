import{d as x,a8 as b,o as f,c as k,a as t,e as s,w as n,g as i,f as o,B as l,r as d,h as y}from"./index-CaCqaQsm.js";import{S as _}from"./Search-DyVoW-5t.js";import{N as C}from"./Input-6dDonCjL.js";import{N as B}from"./Table-DwonveGl.js";import"./use-merged-state-BIQFwxnf.js";const A={class:"space-y-6"},N={class:"flex items-center justify-between"},M={class:"bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"},L={class:"p-4 border-b border-gray-200 dark:border-gray-700"},S={class:"flex flex-wrap gap-4"},V={class:"flex-1 min-w-[200px]"},I={class:"p-4"},E=x({__name:"RoleList",setup(H){const r=d(""),c=d(!1),p=_,u=d([{id:1,name:"管理员",description:"系统管理员，拥有全部权限",permissions:"全部",userCount:1,createdAt:"2024-01-01"},{id:2,name:"销售",description:"销售角色，可管理客户和销售机会",permissions:"客户管理、销售机会",userCount:5,createdAt:"2024-01-01"},{id:3,name:"客服",description:"客服角色，可处理服务请求",permissions:"服务管理",userCount:3,createdAt:"2024-01-01"},{id:4,name:"财务",description:"财务角色，可查看订单和报表",permissions:"订单管理、统计分析",userCount:2,createdAt:"2024-01-05"},{id:5,name:"运营",description:"运营角色，可管理产品和内容",permissions:"产品管理",userCount:2,createdAt:"2024-01-10"}]),a=y({page:1,pageSize:10,total:10}),m=[{title:"角色名称",key:"name",width:140},{title:"描述",key:"description",width:250},{title:"权限",key:"permissions",width:200},{title:"用户数",key:"userCount",width:80},{title:"创建时间",key:"createdAt",width:120},{title:"操作",key:"actions",width:160,render:()=>`
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
    `}],g=()=>{a.page=1},h=()=>{r.value="",a.page=1};return(P,e)=>{const w=b("PlusIcon");return f(),k("div",A,[t("div",N,[e[2]||(e[2]=t("div",null,[t("h2",{class:"text-xl font-bold text-gray-800 dark:text-white"},"权限管理"),t("p",{class:"text-gray-500 dark:text-gray-400 mt-1"},"管理角色和权限")],-1)),s(o(l),{type:"primary",class:"bg-blue-500 hover:bg-blue-600"},{default:n(()=>[s(w,{class:"w-4 h-4 mr-2"}),e[1]||(e[1]=i(" 添加角色 ",-1))]),_:1})]),t("div",M,[t("div",L,[t("div",S,[t("div",V,[s(o(C),{value:r.value,"onUpdate:value":e[0]||(e[0]=v=>r.value=v),placeholder:"搜索角色名称",class:"w-full","prefix-icon":o(p)},null,8,["value","prefix-icon"])]),s(o(l),{type:"primary",onClick:g},{default:n(()=>[...e[3]||(e[3]=[i("搜索",-1)])]),_:1}),s(o(l),{onClick:h},{default:n(()=>[...e[4]||(e[4]=[i("重置",-1)])]),_:1})])]),t("div",I,[s(o(B),{columns:m,data:u.value,pagination:a,loading:c.value},null,8,["data","pagination","loading"])])])])}}});export{E as default};
