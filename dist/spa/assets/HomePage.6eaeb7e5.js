import{_,r as n,c as u,d,X as p,l as s,m,x as a,f as t,Y as f,q as o,u as v,F as P,Z as g,$ as h,a0 as y,A as S}from"./index.737d3221.js";import{Q as k}from"./QPage.7f3ad2a1.js";import{u as w,P as x,a as F}from"./PostsSkeleton.f832b1db.js";import{u as C}from"./account-store.93e228d8.js";import{u as b}from"./friends-store.63435914.js";import"./auth-store.79001c12.js";import"./axios.37d53be1.js";import"./use-quasar.8362b04f.js";import"./dates.89413a91.js";const B=e=>(h("data-v-7171ab2c"),e=e(),y(),e),H={key:0},I={key:1,class:"posts-container"},Q=B(()=>S("h4",null,"No Posts to show",-1)),q=[Q],M={key:1},N=w(),A=b(),{getPosts:D,getFriendsPosts:E}=N,{getFriendsData:R}=A,l=n([]),c=u(()=>l.value.slice().reverse()),r=n(!1);async function V(){await D(),l.value=await E(),await R()}const T=d({async beforeRouteEnter(){try{r.value=!1,await V()}catch(e){console.log("failed to load Home Page",e)}finally{r.value=!0}}}),X=d({...T,__name:"HomePage",setup(e){const{accountsMap:i}=p(C());return(Y,Z)=>(s(),m(k,{class:"q-pa-md q-gutter-md"},{default:a(()=>[t(g,{class:"relative-position card-example",flat:"",bordered:""},{default:a(()=>[t(f,null,{default:a(()=>[r.value?(s(),o(P,{key:0},[c.value.length!=0?(s(),o("div",H,[t(x,{posts:c.value,accountsMap:v(i)},null,8,["posts","accountsMap"])])):(s(),o("div",I,q))],64)):(s(),o("div",M,[t(F)]))]),_:1})]),_:1})]),_:1}))}});var W=_(X,[["__scopeId","data-v-7171ab2c"]]);export{W as default};
