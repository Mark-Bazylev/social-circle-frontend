import{Q as X,a as N,b as Z,c as T}from"./QTabPanels.3cc365e1.js";import{_ as G,d as H,X as P,r as w,o as J,l as o,m as p,x as e,f as a,q as v,a4 as k,t as K,u as t,R as g,a5 as q,A as y,z as _,a6 as R,Q as V,F as Q,y as O,ap as U,Z as Y,v as I}from"./index.737d3221.js";import{u as ee,Q as x,a as F,b as i,c as ae}from"./friends-store.63435914.js";import{Q as B}from"./QToolbar.52cfa946.js";import{Q as te}from"./QPage.7f3ad2a1.js";import{u as se}from"./account-store.93e228d8.js";import"./QResizeObserver.8a719490.js";import"./selection.cf32c1d7.js";import"./auth-store.79001c12.js";import"./axios.37d53be1.js";const le=["src"],ne=["src"],oe={key:1,class:"q-pa-md row justify-center align-center text-black"},re=["src"],de={key:3,class:"q-pa-md row justify-center align-center text-black"},ie=["src"],ce={key:5,class:"q-pa-md row justify-center align-center text-black"},ue=H({__name:"FriendListPage",setup(fe){const A=se(),{getAllAccounts:D}=A,{accountsMap:c}=P(A),C=ee(),{getFriendsData:M,sendFriendRequest:j,acceptFriendRequest:$}=C,{friendsData:m,potentialFriends:h}=P(C),z=w([]),S=w({}),L=w({}),b=w("friends");J(async()=>{try{const l=await D();z.value=l.data.accounts;const u=await M()}catch(l){console.log(l)}});const E=async l=>{var u,n,r;try{S.value[l]=!0;const f=await j(l),s=(u=h.value)==null?void 0:u.findIndex(d=>d.toString()===l);s!=-1&&s!=null&&((n=h.value)==null||n.splice(s,1),(r=m.value)==null||r.sentRequests.push(l))}catch(f){console.log(f)}finally{S.value[l]=!1}},W=async l=>{var u,n,r;try{L.value[l]=!0,await $(l);const f=(u=m.value)==null?void 0:u.receivedRequests.findIndex(s=>s.toString()===l);f!=-1&&f!=null&&((n=m.value)==null||n.receivedRequests.splice(f,1),(r=m.value)==null||r.friendsList.push(l))}catch(f){console.log(f)}finally{L.value[l]=!1}};return(l,u)=>(o(),p(te,{class:"row q-ma-md"},{default:e(()=>[a(Y,{class:"friend-card"},{default:e(()=>[a(X,{modelValue:b.value,"onUpdate:modelValue":u[0]||(u[0]=n=>b.value=n),dense:"",class:"bg-indigo text-white"},{default:e(()=>[a(N,{name:"friends",label:"My Friends",class:"q-pa-sm"}),a(N,{name:"suggestions",label:"Suggestions",class:"q-pa-sm"})]),_:1},8,["modelValue"]),a(Z,{modelValue:b.value,"onUpdate:modelValue":u[1]||(u[1]=n=>b.value=n),animated:"",class:"shadow-2 rounded-borders"},{default:e(()=>[a(T,{name:"friends"},{default:e(()=>[a(x,null,{default:e(()=>{var n;return[(o(!0),v(Q,null,k(((n=t(m))==null?void 0:n.friendsList)||[],r=>K((o(),p(F,{key:r,clickable:"",to:{name:t(g).profile,params:{id:r}},class:"row"},{default:e(()=>[a(i,null,{default:e(()=>[a(q,null,{default:e(()=>[y("img",{src:t(c)[r].avatarUrl,alt:"avatar pic"},null,8,le)]),_:2},1024)]),_:2},1024),a(i,null,{default:e(()=>[_(R(t(c)[r].name),1)]),_:2},1024),a(i,null,{default:e(()=>[a(V,{to:{name:t(g).chat,params:{id:r}},icon:"chat",rounded:""},{default:e(()=>[_("chat")]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["to"])),[[I]])),128))]}),_:1})]),_:1}),a(T,{name:"suggestions"},{default:e(()=>{var n,r,f;return[a(B,{class:"bg-secondary text-white shadow-2 rounded-borders"},{default:e(()=>[_(" Sent Requests ")]),_:1}),(n=t(m))!=null&&n.sentRequests.length?(o(),p(x,{key:0},{default:e(()=>{var s;return[(o(!0),v(Q,null,k(((s=t(m))==null?void 0:s.sentRequests)||[],d=>(o(),p(F,{class:"row",key:d,to:{name:t(g).profile,params:{id:t(c)[d].createdBy}}},{default:e(()=>[a(i,null,{default:e(()=>[a(q,null,{default:e(()=>[y("img",{src:t(c)[d].avatarUrl,alt:"avatar pic"},null,8,ne)]),_:2},1024)]),_:2},1024),a(i,null,{default:e(()=>[_(R(t(c)[d].name),1)]),_:2},1024),a(i,null,{default:e(()=>[a(ae,null,{default:e(()=>[a(O,{name:"done"}),_(" Request Sent ")]),_:1})]),_:1})]),_:2},1032,["to"]))),128))]}),_:1})):(o(),v("div",oe," No Sent Requests ")),a(B,{class:"bg-secondary text-white shadow-2 rounded-borders"},{default:e(()=>[_(" Received Requests ")]),_:1}),(r=t(m))!=null&&r.receivedRequests.length?(o(),p(x,{key:2},{default:e(()=>{var s;return[(o(!0),v(Q,null,k(((s=t(m))==null?void 0:s.receivedRequests)||[],d=>(o(),p(F,{class:"row",key:d,to:{name:t(g).profile,params:{id:t(c)[d].createdBy}}},{default:e(()=>[a(i,null,{default:e(()=>[a(q,null,{default:e(()=>[y("img",{src:t(c)[d].avatarUrl,alt:"avatar pic"},null,8,re)]),_:2},1024)]),_:2},1024),a(i,null,{default:e(()=>[_(R(t(c)[d].name),1)]),_:2},1024),a(i,null,{default:e(()=>[a(V,{loading:L.value[d],onClick:U(_e=>W(d),["stop","prevent"]),icon:"person_add",rounded:""},{default:e(()=>[_("Accept")]),_:2},1032,["loading","onClick"])]),_:2},1024)]),_:2},1032,["to"]))),128))]}),_:1})):(o(),v("div",de," No Received Requests ")),a(B,{class:"bg-secondary text-white shadow-2 rounded-borders"},{default:e(()=>[_(" Suggested Friends ")]),_:1}),(f=t(h))!=null&&f.length?(o(),p(x,{key:4},{default:e(()=>[(o(!0),v(Q,null,k(t(h),s=>(o(),p(F,{class:"row",key:s,to:{name:t(g).profile,params:{id:t(c)[s].createdBy}}},{default:e(()=>[a(i,null,{default:e(()=>[a(q,null,{default:e(()=>[y("img",{src:t(c)[s].avatarUrl,alt:"avatar pic"},null,8,ie)]),_:2},1024)]),_:2},1024),a(i,null,{default:e(()=>[_(R(t(c)[s].name),1)]),_:2},1024),a(i,null,{default:e(()=>[y("div",null,[a(V,{loading:S.value[s],onClick:U(d=>E(s),["stop","prevent"]),icon:"person_add",rounded:""},{default:e(()=>[_("Add")]),_:2},1032,["loading","onClick"])])]),_:2},1024)]),_:2},1032,["to"]))),128))]),_:1})):(o(),v("div",ce," No Suggested Friends Left In this World "))]}),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}))}});var Re=G(ue,[["__scopeId","data-v-60ba6fa2"]]);export{Re as default};
