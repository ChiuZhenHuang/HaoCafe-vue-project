"use strict";(self["webpackChunkproject"]=self["webpackChunkproject"]||[]).push([[677],{275:function(a,t,e){e.r(t),e.d(t,{default:function(){return w}});var o=e(3396);const n={class:"container-fluid mt-3 position-relative"};function s(a,t,e,s,r,i){const c=(0,o.up)("Navbar"),l=(0,o.up)("ToastMessages"),u=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(c),(0,o._)("div",n,[(0,o.Wm)(l),(0,o.Wm)(u)])],64)}e(560);var r=e(5820),i=e(8032),c=e(9242);const l={class:"navbar navbar-expand-lg bg-body-tertiary admin-nav"},u={class:"container-fluid"},p=(0,o._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},null,-1),d={class:"collapse navbar-collapse",id:"navbarText"},v={class:"navbar-nav me-auto mb-2 mb-lg-0"};function h(a,t,e,n,s,r){const i=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("nav",l,[(0,o._)("div",u,[(0,o.Wm)(i,{class:"nav-link mx-3","aria-current":"page",to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("用戶介面")])),_:1}),p,(0,o._)("div",d,[(0,o._)("div",v,[(0,o.Wm)(i,{class:"nav-link","aria-current":"page",to:"/dashboard/productComponent"},{default:(0,o.w5)((()=>[(0,o.Uk)("產品")])),_:1}),(0,o.Wm)(i,{class:"nav-link","aria-current":"page",to:"/dashboard/orders"},{default:(0,o.w5)((()=>[(0,o.Uk)("訂單")])),_:1}),(0,o.Wm)(i,{class:"nav-link","aria-current":"page",to:"/dashboard/coupons"},{default:(0,o.w5)((()=>[(0,o.Uk)("優惠券")])),_:1}),(0,o._)("a",{class:"nav-link",href:"#",onClick:t[0]||(t[0]=(0,c.iM)(((...a)=>r.logout&&r.logout(...a)),["prevent"]))},"登出")])])])])}var g={methods:{logout(){const a="https://vue3-course-api.hexschool.io/logout";this.$http.post(a).then((a=>{document.cookie=`hexToken=;expires= ${new Date(0).toGMTString()}`,this.$router.push("/login")}))}}},b=e(89);const m=(0,b.Z)(g,[["render",h]]);var k=m,f={components:{Navbar:k,ToastMessages:i.Z},provide(){return{emitter:r.Z}},created(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a;const t="https://vue3-course-api.hexschool.io/api/user/check";this.$http.post(t).then((a=>{a.data.success||this.$router.push("./login")}))}};const x=(0,b.Z)(f,[["render",s]]);var w=x}}]);
//# sourceMappingURL=677.74608c5a.js.map