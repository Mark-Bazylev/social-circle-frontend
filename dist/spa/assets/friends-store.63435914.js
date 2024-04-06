import{p as m,c as s,h as o,B as q,a1 as y,aa as D,a2 as h,ab as Q,r as v,g as _,ac as E,ad as I,E as A,n as K}from"./index.737d3221.js";import{h as f}from"./auth-store.79001c12.js";import{u as $}from"./account-store.93e228d8.js";var T=m({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:a}){const n=s(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>o("div",{class:n.value},q(a.default))}}),W=m({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:a}){const n=s(()=>parseInt(e.lines,10)),l=s(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(n.value===1?" ellipsis":"")),u=s(()=>e.lines!==void 0&&n.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":n.value}:null);return()=>o("div",{style:u.value,class:l.value},q(a.default))}}),U=m({name:"QItem",props:{...y,...D,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:a,emit:n}){const{proxy:{$q:l}}=_(),u=h(e,l),{hasLink:i,linkAttrs:B,linkClass:F,linkTag:R,navigateOnClick:S}=Q(),c=v(null),d=v(null),k=s(()=>e.clickable===!0||i.value===!0||e.tag==="label"),r=s(()=>e.disable!==!0&&k.value===!0),w=s(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(u.value===!0?" q-item--dark":"")+(i.value===!0&&e.active===null?F.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(r.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),x=s(()=>{if(e.insetLevel===void 0)return null;const t=l.lang.rtl===!0?"Right":"Left";return{["padding"+t]:16+e.insetLevel*56+"px"}});function L(t){r.value===!0&&(d.value!==null&&(t.qKeyEvent!==!0&&document.activeElement===c.value?d.value.focus():document.activeElement===d.value&&c.value.focus()),S(t))}function p(t){if(r.value===!0&&E(t,[13,32])===!0){I(t),t.qKeyEvent=!0;const g=new MouseEvent("click",t);g.qKeyEvent=!0,c.value.dispatchEvent(g)}n("keyup",t)}function C(){const t=A(a.default,[]);return r.value===!0&&t.unshift(o("div",{class:"q-focus-helper",tabindex:-1,ref:d})),t}return()=>{const t={ref:c,class:w.value,style:x.value,role:"listitem",onClick:L,onKeyup:p};return r.value===!0?(t.tabindex=e.tabindex||"0",Object.assign(t,B.value)):k.value===!0&&(t["aria-disabled"]="true"),o(R.value,t,C())}}}),z=m({name:"QList",props:{...y,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:a}){const n=_(),l=h(e,n.proxy.$q),u=s(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(l.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>o(e.tag,{class:u.value},q(a.default))}});class j{getFriendsData(){return f.get("friendsRequest")}sendFriendRequest(a){return f.post("friendsRequest/send",{requestedUserId:a})}acceptFriendRequest(a){return f.post("friendsRequest/accept",{acceptedUserId:a})}}const b=new j,{addAccounts:N}=$(),G=K("friends",()=>{const e=v(null),a=v(null),n=async()=>{const i=await b.getFriendsData();return e.value=i.data.friendsData,a.value=i.data.potentialFriends,N(i.data.accountsMap),i.data};async function l(i){return await b.sendFriendRequest(i)}async function u(i){return await b.acceptFriendRequest(i)}return{friendsData:e,potentialFriends:a,getFriendsData:n,sendFriendRequest:l,acceptFriendRequest:u}});export{z as Q,U as a,T as b,W as c,G as u};
