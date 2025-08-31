(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function yi(e,t){const n=new Set(e.split(","));return t?r=>n.has(r.toLowerCase()):r=>n.has(r)}const oe={},Bt=[],Te=()=>{},pl=()=>!1,dr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),_i=e=>e.startsWith("onUpdate:"),pe=Object.assign,Ai=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},gl=Object.prototype.hasOwnProperty,Y=(e,t)=>gl.call(e,t),V=Array.isArray,Vt=e=>hr(e)==="[object Map]",ks=e=>hr(e)==="[object Set]",U=e=>typeof e=="function",me=e=>typeof e=="string",Zt=e=>typeof e=="symbol",ce=e=>e!==null&&typeof e=="object",Ps=e=>(ce(e)||U(e))&&U(e.then)&&U(e.catch),Ms=Object.prototype.toString,hr=e=>Ms.call(e),vl=e=>hr(e).slice(8,-1),Os=e=>hr(e)==="[object Object]",wi=e=>me(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Gn=yi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),mr=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},bl=/-(\w)/g,Ye=mr(e=>e.replace(bl,(t,n)=>n?n.toUpperCase():"")),yl=/\B([A-Z])/g,en=mr(e=>e.replace(yl,"-$1").toLowerCase()),pr=mr(e=>e.charAt(0).toUpperCase()+e.slice(1)),Or=mr(e=>e?`on${pr(e)}`:""),gt=(e,t)=>!Object.is(e,t),Rr=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},tr=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},_l=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let oa;const Rs=()=>oa||(oa=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function xi(e){if(V(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=me(r)?El(r):xi(r);if(i)for(const a in i)t[a]=i[a]}return t}else if(me(e)||ce(e))return e}const Al=/;(?![^(]*\))/g,wl=/:([^]+)/,xl=/\/\*[^]*?\*\//g;function El(e){const t={};return e.replace(xl,"").split(Al).forEach(n=>{if(n){const r=n.split(wl);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function Ei(e){let t="";if(me(e))t=e;else if(V(e))for(let n=0;n<e.length;n++){const r=Ei(e[n]);r&&(t+=r+" ")}else if(ce(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Sl="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Cl=yi(Sl);function Ts(e){return!!e||e===""}const kl=e=>me(e)?e:e==null?"":V(e)||ce(e)&&(e.toString===Ms||!U(e.toString))?JSON.stringify(e,Is,2):String(e),Is=(e,t)=>t&&t.__v_isRef?Is(e,t.value):Vt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,i],a)=>(n[Tr(r,a)+" =>"]=i,n),{})}:ks(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Tr(n))}:Zt(t)?Tr(t):ce(t)&&!V(t)&&!Os(t)?String(t):t,Tr=(e,t="")=>{var n;return Zt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ze;class zs{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ze,!t&&ze&&(this.index=(ze.scopes||(ze.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=ze;try{return ze=this,t()}finally{ze=n}}}on(){ze=this}off(){ze=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this._active=!1}}}function Pl(e){return new zs(e)}function Ml(e,t=ze){t&&t.active&&t.effects.push(e)}function Ol(){return ze}let kt;class Si{constructor(t,n,r,i){this.fn=t,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Ml(this,i)}get dirty(){if(this._dirtyLevel===1){Tt();for(let t=0;t<this._depsLength;t++){const n=this.deps[t];if(n.computed&&(Rl(n.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),It()}return this._dirtyLevel>=2}set dirty(t){this._dirtyLevel=t?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=mt,n=kt;try{return mt=!0,kt=this,this._runnings++,la(this),this.fn()}finally{ca(this),this._runnings--,kt=n,mt=t}}stop(){var t;this.active&&(la(this),ca(this),(t=this.onStop)==null||t.call(this),this.active=!1)}}function Rl(e){return e.value}function la(e){e._trackId++,e._depsLength=0}function ca(e){if(e.deps&&e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)Ls(e.deps[t],e);e.deps.length=e._depsLength}}function Ls(e,t){const n=e.get(t);n!==void 0&&t._trackId!==n&&(e.delete(t),e.size===0&&e.cleanup())}let mt=!0,Yr=0;const Ns=[];function Tt(){Ns.push(mt),mt=!1}function It(){const e=Ns.pop();mt=e===void 0?!0:e}function Ci(){Yr++}function ki(){for(Yr--;!Yr&&Gr.length;)Gr.shift()()}function $s(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const r=e.deps[e._depsLength];r!==t?(r&&Ls(r,e),e.deps[e._depsLength++]=t):e._depsLength++}}const Gr=[];function Hs(e,t,n){Ci();for(const r of e.keys())if(r._dirtyLevel<t&&e.get(r)===r._trackId){const i=r._dirtyLevel;r._dirtyLevel=t,i===0&&(r._shouldSchedule=!0,r.trigger())}Fs(e),ki()}function Fs(e){for(const t of e.keys())t.scheduler&&t._shouldSchedule&&(!t._runnings||t.allowRecurse)&&e.get(t)===t._trackId&&(t._shouldSchedule=!1,Gr.push(t.scheduler))}const js=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},qr=new WeakMap,Pt=Symbol(""),Xr=Symbol("");function Se(e,t,n){if(mt&&kt){let r=qr.get(e);r||qr.set(e,r=new Map);let i=r.get(n);i||r.set(n,i=js(()=>r.delete(n))),$s(kt,i)}}function Qe(e,t,n,r,i,a){const s=qr.get(e);if(!s)return;let o=[];if(t==="clear")o=[...s.values()];else if(n==="length"&&V(e)){const l=Number(r);s.forEach((f,c)=>{(c==="length"||!Zt(c)&&c>=l)&&o.push(f)})}else switch(n!==void 0&&o.push(s.get(n)),t){case"add":V(e)?wi(n)&&o.push(s.get("length")):(o.push(s.get(Pt)),Vt(e)&&o.push(s.get(Xr)));break;case"delete":V(e)||(o.push(s.get(Pt)),Vt(e)&&o.push(s.get(Xr)));break;case"set":Vt(e)&&o.push(s.get(Pt));break}Ci();for(const l of o)l&&Hs(l,2);ki()}const Tl=yi("__proto__,__v_isRef,__isVue"),Ds=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Zt)),fa=Il();function Il(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=G(this);for(let a=0,s=this.length;a<s;a++)Se(r,"get",a+"");const i=r[t](...n);return i===-1||i===!1?r[t](...n.map(G)):i}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Tt(),Ci();const r=G(this)[t].apply(this,n);return ki(),It(),r}}),e}function zl(e){const t=G(this);return Se(t,"has",e),t.hasOwnProperty(e)}class Bs{constructor(t=!1,n=!1){this._isReadonly=t,this._shallow=n}get(t,n,r){const i=this._isReadonly,a=this._shallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return a;if(n==="__v_raw")return r===(i?a?Yl:Ws:a?Ks:Us).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const s=V(t);if(!i){if(s&&Y(fa,n))return Reflect.get(fa,n,r);if(n==="hasOwnProperty")return zl}const o=Reflect.get(t,n,r);return(Zt(n)?Ds.has(n):Tl(n))||(i||Se(t,"get",n),a)?o:Ce(o)?s&&wi(n)?o:o.value:ce(o)?i?Gs(o):vr(o):o}}class Vs extends Bs{constructor(t=!1){super(!1,t)}set(t,n,r,i){let a=t[n];if(!this._shallow){const l=Yt(a);if(!nr(r)&&!Yt(r)&&(a=G(a),r=G(r)),!V(t)&&Ce(a)&&!Ce(r))return l?!1:(a.value=r,!0)}const s=V(t)&&wi(n)?Number(n)<t.length:Y(t,n),o=Reflect.set(t,n,r,i);return t===G(i)&&(s?gt(r,a)&&Qe(t,"set",n,r):Qe(t,"add",n,r)),o}deleteProperty(t,n){const r=Y(t,n);t[n];const i=Reflect.deleteProperty(t,n);return i&&r&&Qe(t,"delete",n,void 0),i}has(t,n){const r=Reflect.has(t,n);return(!Zt(n)||!Ds.has(n))&&Se(t,"has",n),r}ownKeys(t){return Se(t,"iterate",V(t)?"length":Pt),Reflect.ownKeys(t)}}class Ll extends Bs{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Nl=new Vs,$l=new Ll,Hl=new Vs(!0),Pi=e=>e,gr=e=>Reflect.getPrototypeOf(e);function Rn(e,t,n=!1,r=!1){e=e.__v_raw;const i=G(e),a=G(t);n||(gt(t,a)&&Se(i,"get",t),Se(i,"get",a));const{has:s}=gr(i),o=r?Pi:n?Ti:gn;if(s.call(i,t))return o(e.get(t));if(s.call(i,a))return o(e.get(a));e!==i&&e.get(t)}function Tn(e,t=!1){const n=this.__v_raw,r=G(n),i=G(e);return t||(gt(e,i)&&Se(r,"has",e),Se(r,"has",i)),e===i?n.has(e):n.has(e)||n.has(i)}function In(e,t=!1){return e=e.__v_raw,!t&&Se(G(e),"iterate",Pt),Reflect.get(e,"size",e)}function ua(e){e=G(e);const t=G(this);return gr(t).has.call(t,e)||(t.add(e),Qe(t,"add",e,e)),this}function da(e,t){t=G(t);const n=G(this),{has:r,get:i}=gr(n);let a=r.call(n,e);a||(e=G(e),a=r.call(n,e));const s=i.call(n,e);return n.set(e,t),a?gt(t,s)&&Qe(n,"set",e,t):Qe(n,"add",e,t),this}function ha(e){const t=G(this),{has:n,get:r}=gr(t);let i=n.call(t,e);i||(e=G(e),i=n.call(t,e)),r&&r.call(t,e);const a=t.delete(e);return i&&Qe(t,"delete",e,void 0),a}function ma(){const e=G(this),t=e.size!==0,n=e.clear();return t&&Qe(e,"clear",void 0,void 0),n}function zn(e,t){return function(r,i){const a=this,s=a.__v_raw,o=G(s),l=t?Pi:e?Ti:gn;return!e&&Se(o,"iterate",Pt),s.forEach((f,c)=>r.call(i,l(f),l(c),a))}}function Ln(e,t,n){return function(...r){const i=this.__v_raw,a=G(i),s=Vt(a),o=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,f=i[e](...r),c=n?Pi:t?Ti:gn;return!t&&Se(a,"iterate",l?Xr:Pt),{next(){const{value:d,done:m}=f.next();return m?{value:d,done:m}:{value:o?[c(d[0]),c(d[1])]:c(d),done:m}},[Symbol.iterator](){return this}}}}function ot(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Fl(){const e={get(a){return Rn(this,a)},get size(){return In(this)},has:Tn,add:ua,set:da,delete:ha,clear:ma,forEach:zn(!1,!1)},t={get(a){return Rn(this,a,!1,!0)},get size(){return In(this)},has:Tn,add:ua,set:da,delete:ha,clear:ma,forEach:zn(!1,!0)},n={get(a){return Rn(this,a,!0)},get size(){return In(this,!0)},has(a){return Tn.call(this,a,!0)},add:ot("add"),set:ot("set"),delete:ot("delete"),clear:ot("clear"),forEach:zn(!0,!1)},r={get(a){return Rn(this,a,!0,!0)},get size(){return In(this,!0)},has(a){return Tn.call(this,a,!0)},add:ot("add"),set:ot("set"),delete:ot("delete"),clear:ot("clear"),forEach:zn(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(a=>{e[a]=Ln(a,!1,!1),n[a]=Ln(a,!0,!1),t[a]=Ln(a,!1,!0),r[a]=Ln(a,!0,!0)}),[e,n,t,r]}const[jl,Dl,Bl,Vl]=Fl();function Mi(e,t){const n=t?e?Vl:Bl:e?Dl:jl;return(r,i,a)=>i==="__v_isReactive"?!e:i==="__v_isReadonly"?e:i==="__v_raw"?r:Reflect.get(Y(n,i)&&i in r?n:r,i,a)}const Ul={get:Mi(!1,!1)},Kl={get:Mi(!1,!0)},Wl={get:Mi(!0,!1)},Us=new WeakMap,Ks=new WeakMap,Ws=new WeakMap,Yl=new WeakMap;function Gl(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ql(e){return e.__v_skip||!Object.isExtensible(e)?0:Gl(vl(e))}function vr(e){return Yt(e)?e:Oi(e,!1,Nl,Ul,Us)}function Ys(e){return Oi(e,!1,Hl,Kl,Ks)}function Gs(e){return Oi(e,!0,$l,Wl,Ws)}function Oi(e,t,n,r,i){if(!ce(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const a=i.get(e);if(a)return a;const s=ql(e);if(s===0)return e;const o=new Proxy(e,s===2?r:n);return i.set(e,o),o}function Ut(e){return Yt(e)?Ut(e.__v_raw):!!(e&&e.__v_isReactive)}function Yt(e){return!!(e&&e.__v_isReadonly)}function nr(e){return!!(e&&e.__v_isShallow)}function qs(e){return Ut(e)||Yt(e)}function G(e){const t=e&&e.__v_raw;return t?G(t):e}function Ri(e){return tr(e,"__v_skip",!0),e}const gn=e=>ce(e)?vr(e):e,Ti=e=>ce(e)?Gs(e):e;class Xs{constructor(t,n,r,i){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Si(()=>t(this._value),()=>qn(this,1),()=>this.dep&&Fs(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!i,this.__v_isReadonly=r}get value(){const t=G(this);return(!t._cacheable||t.effect.dirty)&&gt(t._value,t._value=t.effect.run())&&qn(t,2),Qs(t),t.effect._dirtyLevel>=1&&qn(t,1),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Xl(e,t,n=!1){let r,i;const a=U(e);return a?(r=e,i=Te):(r=e.get,i=e.set),new Xs(r,i,a||!i,n)}function Qs(e){mt&&kt&&(e=G(e),$s(kt,e.dep||(e.dep=js(()=>e.dep=void 0,e instanceof Xs?e:void 0))))}function qn(e,t=2,n){e=G(e);const r=e.dep;r&&Hs(r,t)}function Ce(e){return!!(e&&e.__v_isRef===!0)}function Js(e){return Zs(e,!1)}function Ql(e){return Zs(e,!0)}function Zs(e,t){return Ce(e)?e:new Jl(e,t)}class Jl{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:G(t),this._value=n?t:gn(t)}get value(){return Qs(this),this._value}set value(t){const n=this.__v_isShallow||nr(t)||Yt(t);t=n?t:G(t),gt(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:gn(t),qn(this,2))}}function Mt(e){return Ce(e)?e.value:e}const Zl={get:(e,t,n)=>Mt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return Ce(i)&&!Ce(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function eo(e){return Ut(e)?e:new Proxy(e,Zl)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function pt(e,t,n,r){let i;try{i=r?e(...r):e()}catch(a){br(a,t,n)}return i}function He(e,t,n,r){if(U(e)){const a=pt(e,t,n,r);return a&&Ps(a)&&a.catch(s=>{br(s,t,n)}),a}const i=[];for(let a=0;a<e.length;a++)i.push(He(e[a],t,n,r));return i}function br(e,t,n,r=!0){const i=t?t.vnode:null;if(t){let a=t.parent;const s=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const f=a.ec;if(f){for(let c=0;c<f.length;c++)if(f[c](e,s,o)===!1)return}a=a.parent}const l=t.appContext.config.errorHandler;if(l){pt(l,null,10,[e,s,o]);return}}ec(e,n,i,r)}function ec(e,t,n,r=!0){console.error(e)}let vn=!1,Qr=!1;const be=[];let Ke=0;const Kt=[];let ft=null,Et=0;const to=Promise.resolve();let Ii=null;function no(e){const t=Ii||to;return e?t.then(this?e.bind(this):e):t}function tc(e){let t=Ke+1,n=be.length;for(;t<n;){const r=t+n>>>1,i=be[r],a=bn(i);a<e||a===e&&i.pre?t=r+1:n=r}return t}function zi(e){(!be.length||!be.includes(e,vn&&e.allowRecurse?Ke+1:Ke))&&(e.id==null?be.push(e):be.splice(tc(e.id),0,e),ro())}function ro(){!vn&&!Qr&&(Qr=!0,Ii=to.then(ao))}function nc(e){const t=be.indexOf(e);t>Ke&&be.splice(t,1)}function rc(e){V(e)?Kt.push(...e):(!ft||!ft.includes(e,e.allowRecurse?Et+1:Et))&&Kt.push(e),ro()}function pa(e,t,n=vn?Ke+1:0){for(;n<be.length;n++){const r=be[n];if(r&&r.pre){if(e&&r.id!==e.uid)continue;be.splice(n,1),n--,r()}}}function io(e){if(Kt.length){const t=[...new Set(Kt)].sort((n,r)=>bn(n)-bn(r));if(Kt.length=0,ft){ft.push(...t);return}for(ft=t,Et=0;Et<ft.length;Et++)ft[Et]();ft=null,Et=0}}const bn=e=>e.id==null?1/0:e.id,ic=(e,t)=>{const n=bn(e)-bn(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function ao(e){Qr=!1,vn=!0,be.sort(ic);try{for(Ke=0;Ke<be.length;Ke++){const t=be[Ke];t&&t.active!==!1&&pt(t,null,14)}}finally{Ke=0,be.length=0,io(),vn=!1,Ii=null,(be.length||Kt.length)&&ao()}}function ac(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||oe;let i=n;const a=t.startsWith("update:"),s=a&&t.slice(7);if(s&&s in r){const c=`${s==="modelValue"?"model":s}Modifiers`,{number:d,trim:m}=r[c]||oe;m&&(i=n.map(g=>me(g)?g.trim():g)),d&&(i=n.map(_l))}let o,l=r[o=Or(t)]||r[o=Or(Ye(t))];!l&&a&&(l=r[o=Or(en(t))]),l&&He(l,e,6,i);const f=r[o+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[o])return;e.emitted[o]=!0,He(f,e,6,i)}}function so(e,t,n=!1){const r=t.emitsCache,i=r.get(e);if(i!==void 0)return i;const a=e.emits;let s={},o=!1;if(!U(e)){const l=f=>{const c=so(f,t,!0);c&&(o=!0,pe(s,c))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!a&&!o?(ce(e)&&r.set(e,null),null):(V(a)?a.forEach(l=>s[l]=null):pe(s,a),ce(e)&&r.set(e,s),s)}function yr(e,t){return!e||!dr(t)?!1:(t=t.slice(2).replace(/Once$/,""),Y(e,t[0].toLowerCase()+t.slice(1))||Y(e,en(t))||Y(e,t))}let we=null,_r=null;function rr(e){const t=we;return we=e,_r=e&&e.type.__scopeId||null,t}function Li(e){_r=e}function Ni(){_r=null}function Pe(e,t=we,n){if(!t||e._n)return e;const r=(...i)=>{r._d&&Ca(-1);const a=rr(t);let s;try{s=e(...i)}finally{rr(a),r._d&&Ca(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function Ir(e){const{type:t,vnode:n,proxy:r,withProxy:i,props:a,propsOptions:[s],slots:o,attrs:l,emit:f,render:c,renderCache:d,data:m,setupState:g,ctx:C,inheritAttrs:I}=e;let z,y;const A=rr(e);try{if(n.shapeFlag&4){const F=i||r,K=F;z=Ue(c.call(K,F,d,a,g,m,C)),y=l}else{const F=t;z=Ue(F.length>1?F(a,{attrs:l,slots:o,emit:f}):F(a,null)),y=t.props?l:sc(l)}}catch(F){un.length=0,br(F,e,1),z=le(Gt)}let M=z;if(y&&I!==!1){const F=Object.keys(y),{shapeFlag:K}=M;F.length&&K&7&&(s&&F.some(_i)&&(y=oc(y,s)),M=qt(M,y))}return n.dirs&&(M=qt(M),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&(M.transition=n.transition),z=M,rr(A),z}const sc=e=>{let t;for(const n in e)(n==="class"||n==="style"||dr(n))&&((t||(t={}))[n]=e[n]);return t},oc=(e,t)=>{const n={};for(const r in e)(!_i(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function lc(e,t,n){const{props:r,children:i,component:a}=e,{props:s,children:o,patchFlag:l}=t,f=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?ga(r,s,f):!!s;if(l&8){const c=t.dynamicProps;for(let d=0;d<c.length;d++){const m=c[d];if(s[m]!==r[m]&&!yr(f,m))return!0}}}else return(i||o)&&(!o||!o.$stable)?!0:r===s?!1:r?s?ga(r,s,f):!0:!!s;return!1}function ga(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const a=r[i];if(t[a]!==e[a]&&!yr(n,a))return!0}return!1}function cc({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const oo="components";function G1(e,t){return uc(oo,e,!0,t)||e}const fc=Symbol.for("v-ndc");function uc(e,t,n=!0,r=!1){const i=we||ye;if(i){const a=i.type;if(e===oo){const o=sf(a,!1);if(o&&(o===t||o===Ye(t)||o===pr(Ye(t))))return a}const s=va(i[e]||a[e],t)||va(i.appContext[e],t);return!s&&r?a:s}}function va(e,t){return e&&(e[t]||e[Ye(t)]||e[pr(Ye(t))])}const dc=e=>e.__isSuspense;function hc(e,t){t&&t.pendingBranch?V(e)?t.effects.push(...e):t.effects.push(e):rc(e)}const mc=Symbol.for("v-scx"),pc=()=>Je(mc),Nn={};function Xn(e,t,n){return lo(e,t,n)}function lo(e,t,{immediate:n,deep:r,flush:i,once:a,onTrack:s,onTrigger:o}=oe){if(t&&a){const H=t;t=(...te)=>{H(...te),K()}}const l=ye,f=H=>r===!0?H:Ft(H,r===!1?1:void 0);let c,d=!1,m=!1;if(Ce(e)?(c=()=>e.value,d=nr(e)):Ut(e)?(c=()=>f(e),d=!0):V(e)?(m=!0,d=e.some(H=>Ut(H)||nr(H)),c=()=>e.map(H=>{if(Ce(H))return H.value;if(Ut(H))return f(H);if(U(H))return pt(H,l,2)})):U(e)?t?c=()=>pt(e,l,2):c=()=>(g&&g(),He(e,l,3,[C])):c=Te,t&&r){const H=c;c=()=>Ft(H())}let g,C=H=>{g=M.onStop=()=>{pt(H,l,4),g=M.onStop=void 0}},I;if(Er)if(C=Te,t?n&&He(t,l,3,[c(),m?[]:void 0,C]):c(),i==="sync"){const H=pc();I=H.__watcherHandles||(H.__watcherHandles=[])}else return Te;let z=m?new Array(e.length).fill(Nn):Nn;const y=()=>{if(!(!M.active||!M.dirty))if(t){const H=M.run();(r||d||(m?H.some((te,ge)=>gt(te,z[ge])):gt(H,z)))&&(g&&g(),He(t,l,3,[H,z===Nn?void 0:m&&z[0]===Nn?[]:z,C]),z=H)}else M.run()};y.allowRecurse=!!t;let A;i==="sync"?A=y:i==="post"?A=()=>Ee(y,l&&l.suspense):(y.pre=!0,l&&(y.id=l.uid),A=()=>zi(y));const M=new Si(c,Te,A),F=Ol(),K=()=>{M.stop(),F&&Ai(F.effects,M)};return t?n?y():z=M.run():i==="post"?Ee(M.run.bind(M),l&&l.suspense):M.run(),I&&I.push(K),K}function gc(e,t,n){const r=this.proxy,i=me(e)?e.includes(".")?co(r,e):()=>r[e]:e.bind(r,r);let a;U(t)?a=t:(a=t.handler,n=t);const s=Cn(this),o=lo(i,a.bind(r),n);return s(),o}function co(e,t){const n=t.split(".");return()=>{let r=e;for(let i=0;i<n.length&&r;i++)r=r[n[i]];return r}}function Ft(e,t,n=0,r){if(!ce(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++}if(r=r||new Set,r.has(e))return e;if(r.add(e),Ce(e))Ft(e.value,t,n,r);else if(V(e))for(let i=0;i<e.length;i++)Ft(e[i],t,n,r);else if(ks(e)||Vt(e))e.forEach(i=>{Ft(i,t,n,r)});else if(Os(e))for(const i in e)Ft(e[i],t,n,r);return e}function wt(e,t,n,r){const i=e.dirs,a=t&&t.dirs;for(let s=0;s<i.length;s++){const o=i[s];a&&(o.oldValue=a[s].value);let l=o.dir[r];l&&(Tt(),He(l,n,8,[e.el,o,e,t]),It())}}/*! #__NO_SIDE_EFFECTS__ */function fo(e,t){return U(e)?pe({name:e.name},t,{setup:e}):e}const cn=e=>!!e.type.__asyncLoader,uo=e=>e.type.__isKeepAlive;function vc(e,t){ho(e,"a",t)}function bc(e,t){ho(e,"da",t)}function ho(e,t,n=ye){const r=e.__wdc||(e.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return e()});if(Ar(t,r,n),n){let i=n.parent;for(;i&&i.parent;)uo(i.parent.vnode)&&yc(r,t,n,i),i=i.parent}}function yc(e,t,n,r){const i=Ar(t,e,r,!0);mo(()=>{Ai(r[t],i)},n)}function Ar(e,t,n=ye,r=!1){if(n){const i=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;Tt();const o=Cn(n),l=He(t,n,e,s);return o(),It(),l});return r?i.unshift(a):i.push(a),a}}const nt=e=>(t,n=ye)=>(!Er||e==="sp")&&Ar(e,(...r)=>t(...r),n),_c=nt("bm"),Ac=nt("m"),wc=nt("bu"),xc=nt("u"),Ec=nt("bum"),mo=nt("um"),Sc=nt("sp"),Cc=nt("rtg"),kc=nt("rtc");function Pc(e,t=ye){Ar("ec",e,t)}function zr(e,t,n={},r,i){if(we.isCE||we.parent&&cn(we.parent)&&we.parent.isCE)return t!=="default"&&(n.name=t),le("slot",n,r&&r());let a=e[t];a&&a._c&&(a._d=!1),Ge();const s=a&&po(a(n)),o=Gc(Me,{key:n.key||s&&s.key||`_${t}`},s||(r?r():[]),s&&e._===1?64:-2);return!i&&o.scopeId&&(o.slotScopeIds=[o.scopeId+"-s"]),a&&a._c&&(a._d=!0),o}function po(e){return e.some(t=>sr(t)?!(t.type===Gt||t.type===Me&&!po(t.children)):!0)?e:null}const Jr=e=>e?ko(e)?ji(e)||e.proxy:Jr(e.parent):null,fn=pe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Jr(e.parent),$root:e=>Jr(e.root),$emit:e=>e.emit,$options:e=>$i(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,zi(e.update)}),$nextTick:e=>e.n||(e.n=no.bind(e.proxy)),$watch:e=>gc.bind(e)}),Lr=(e,t)=>e!==oe&&!e.__isScriptSetup&&Y(e,t),Mc={get({_:e},t){const{ctx:n,setupState:r,data:i,props:a,accessCache:s,type:o,appContext:l}=e;let f;if(t[0]!=="$"){const g=s[t];if(g!==void 0)switch(g){case 1:return r[t];case 2:return i[t];case 4:return n[t];case 3:return a[t]}else{if(Lr(r,t))return s[t]=1,r[t];if(i!==oe&&Y(i,t))return s[t]=2,i[t];if((f=e.propsOptions[0])&&Y(f,t))return s[t]=3,a[t];if(n!==oe&&Y(n,t))return s[t]=4,n[t];Zr&&(s[t]=0)}}const c=fn[t];let d,m;if(c)return t==="$attrs"&&Se(e,"get",t),c(e);if((d=o.__cssModules)&&(d=d[t]))return d;if(n!==oe&&Y(n,t))return s[t]=4,n[t];if(m=l.config.globalProperties,Y(m,t))return m[t]},set({_:e},t,n){const{data:r,setupState:i,ctx:a}=e;return Lr(i,t)?(i[t]=n,!0):r!==oe&&Y(r,t)?(r[t]=n,!0):Y(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,propsOptions:a}},s){let o;return!!n[s]||e!==oe&&Y(e,s)||Lr(t,s)||(o=a[0])&&Y(o,s)||Y(r,s)||Y(fn,s)||Y(i.config.globalProperties,s)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Y(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function ba(e){return V(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Zr=!0;function Oc(e){const t=$i(e),n=e.proxy,r=e.ctx;Zr=!1,t.beforeCreate&&ya(t.beforeCreate,e,"bc");const{data:i,computed:a,methods:s,watch:o,provide:l,inject:f,created:c,beforeMount:d,mounted:m,beforeUpdate:g,updated:C,activated:I,deactivated:z,beforeDestroy:y,beforeUnmount:A,destroyed:M,unmounted:F,render:K,renderTracked:H,renderTriggered:te,errorCaptured:ge,serverPrefetch:_e,expose:Re,inheritAttrs:at,components:At,directives:je,filters:nn}=t;if(f&&Rc(f,r,null),s)for(const J in s){const q=s[J];U(q)&&(r[J]=q.bind(n))}if(i){const J=i.call(n,n);ce(J)&&(e.data=vr(J))}if(Zr=!0,a)for(const J in a){const q=a[J],qe=U(q)?q.bind(n,n):U(q.get)?q.get.bind(n,n):Te,st=!U(q)&&U(q.set)?q.set.bind(n):Te,De=Le({get:qe,set:st});Object.defineProperty(r,J,{enumerable:!0,configurable:!0,get:()=>De.value,set:xe=>De.value=xe})}if(o)for(const J in o)go(o[J],r,n,J);if(l){const J=U(l)?l.call(n):l;Reflect.ownKeys(J).forEach(q=>{Qn(q,J[q])})}c&&ya(c,e,"c");function de(J,q){V(q)?q.forEach(qe=>J(qe.bind(n))):q&&J(q.bind(n))}if(de(_c,d),de(Ac,m),de(wc,g),de(xc,C),de(vc,I),de(bc,z),de(Pc,ge),de(kc,H),de(Cc,te),de(Ec,A),de(mo,F),de(Sc,_e),V(Re))if(Re.length){const J=e.exposed||(e.exposed={});Re.forEach(q=>{Object.defineProperty(J,q,{get:()=>n[q],set:qe=>n[q]=qe})})}else e.exposed||(e.exposed={});K&&e.render===Te&&(e.render=K),at!=null&&(e.inheritAttrs=at),At&&(e.components=At),je&&(e.directives=je)}function Rc(e,t,n=Te){V(e)&&(e=ei(e));for(const r in e){const i=e[r];let a;ce(i)?"default"in i?a=Je(i.from||r,i.default,!0):a=Je(i.from||r):a=Je(i),Ce(a)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>a.value,set:s=>a.value=s}):t[r]=a}}function ya(e,t,n){He(V(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function go(e,t,n,r){const i=r.includes(".")?co(n,r):()=>n[r];if(me(e)){const a=t[e];U(a)&&Xn(i,a)}else if(U(e))Xn(i,e.bind(n));else if(ce(e))if(V(e))e.forEach(a=>go(a,t,n,r));else{const a=U(e.handler)?e.handler.bind(n):t[e.handler];U(a)&&Xn(i,a,e)}}function $i(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:s}}=e.appContext,o=a.get(t);let l;return o?l=o:!i.length&&!n&&!r?l=t:(l={},i.length&&i.forEach(f=>ir(l,f,s,!0)),ir(l,t,s)),ce(t)&&a.set(t,l),l}function ir(e,t,n,r=!1){const{mixins:i,extends:a}=t;a&&ir(e,a,n,!0),i&&i.forEach(s=>ir(e,s,n,!0));for(const s in t)if(!(r&&s==="expose")){const o=Tc[s]||n&&n[s];e[s]=o?o(e[s],t[s]):t[s]}return e}const Tc={data:_a,props:Aa,emits:Aa,methods:on,computed:on,beforeCreate:Ae,created:Ae,beforeMount:Ae,mounted:Ae,beforeUpdate:Ae,updated:Ae,beforeDestroy:Ae,beforeUnmount:Ae,destroyed:Ae,unmounted:Ae,activated:Ae,deactivated:Ae,errorCaptured:Ae,serverPrefetch:Ae,components:on,directives:on,watch:zc,provide:_a,inject:Ic};function _a(e,t){return t?e?function(){return pe(U(e)?e.call(this,this):e,U(t)?t.call(this,this):t)}:t:e}function Ic(e,t){return on(ei(e),ei(t))}function ei(e){if(V(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Ae(e,t){return e?[...new Set([].concat(e,t))]:t}function on(e,t){return e?pe(Object.create(null),e,t):t}function Aa(e,t){return e?V(e)&&V(t)?[...new Set([...e,...t])]:pe(Object.create(null),ba(e),ba(t??{})):t}function zc(e,t){if(!e)return t;if(!t)return e;const n=pe(Object.create(null),e);for(const r in t)n[r]=Ae(e[r],t[r]);return n}function vo(){return{app:null,config:{isNativeTag:pl,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Lc=0;function Nc(e,t){return function(r,i=null){U(r)||(r=pe({},r)),i!=null&&!ce(i)&&(i=null);const a=vo(),s=new WeakSet;let o=!1;const l=a.app={_uid:Lc++,_component:r,_props:i,_container:null,_context:a,_instance:null,version:lf,get config(){return a.config},set config(f){},use(f,...c){return s.has(f)||(f&&U(f.install)?(s.add(f),f.install(l,...c)):U(f)&&(s.add(f),f(l,...c))),l},mixin(f){return a.mixins.includes(f)||a.mixins.push(f),l},component(f,c){return c?(a.components[f]=c,l):a.components[f]},directive(f,c){return c?(a.directives[f]=c,l):a.directives[f]},mount(f,c,d){if(!o){const m=le(r,i);return m.appContext=a,d===!0?d="svg":d===!1&&(d=void 0),c&&t?t(m,f):e(m,f,d),o=!0,l._container=f,f.__vue_app__=l,ji(m.component)||m.component.proxy}},unmount(){o&&(e(null,l._container),delete l._container.__vue_app__)},provide(f,c){return a.provides[f]=c,l},runWithContext(f){ar=l;try{return f()}finally{ar=null}}};return l}}let ar=null;function Qn(e,t){if(ye){let n=ye.provides;const r=ye.parent&&ye.parent.provides;r===n&&(n=ye.provides=Object.create(r)),n[e]=t}}function Je(e,t,n=!1){const r=ye||we;if(r||ar){const i=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:ar._context.provides;if(i&&e in i)return i[e];if(arguments.length>1)return n&&U(t)?t.call(r&&r.proxy):t}}function $c(e,t,n,r=!1){const i={},a={};tr(a,xr,1),e.propsDefaults=Object.create(null),bo(e,t,i,a);for(const s in e.propsOptions[0])s in i||(i[s]=void 0);n?e.props=r?i:Ys(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Hc(e,t,n,r){const{props:i,attrs:a,vnode:{patchFlag:s}}=e,o=G(i),[l]=e.propsOptions;let f=!1;if((r||s>0)&&!(s&16)){if(s&8){const c=e.vnode.dynamicProps;for(let d=0;d<c.length;d++){let m=c[d];if(yr(e.emitsOptions,m))continue;const g=t[m];if(l)if(Y(a,m))g!==a[m]&&(a[m]=g,f=!0);else{const C=Ye(m);i[C]=ti(l,o,C,g,e,!1)}else g!==a[m]&&(a[m]=g,f=!0)}}}else{bo(e,t,i,a)&&(f=!0);let c;for(const d in o)(!t||!Y(t,d)&&((c=en(d))===d||!Y(t,c)))&&(l?n&&(n[d]!==void 0||n[c]!==void 0)&&(i[d]=ti(l,o,d,void 0,e,!0)):delete i[d]);if(a!==o)for(const d in a)(!t||!Y(t,d))&&(delete a[d],f=!0)}f&&Qe(e,"set","$attrs")}function bo(e,t,n,r){const[i,a]=e.propsOptions;let s=!1,o;if(t)for(let l in t){if(Gn(l))continue;const f=t[l];let c;i&&Y(i,c=Ye(l))?!a||!a.includes(c)?n[c]=f:(o||(o={}))[c]=f:yr(e.emitsOptions,l)||(!(l in r)||f!==r[l])&&(r[l]=f,s=!0)}if(a){const l=G(n),f=o||oe;for(let c=0;c<a.length;c++){const d=a[c];n[d]=ti(i,l,d,f[d],e,!Y(f,d))}}return s}function ti(e,t,n,r,i,a){const s=e[n];if(s!=null){const o=Y(s,"default");if(o&&r===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&U(l)){const{propsDefaults:f}=i;if(n in f)r=f[n];else{const c=Cn(i);r=f[n]=l.call(null,t),c()}}else r=l}s[0]&&(a&&!o?r=!1:s[1]&&(r===""||r===en(n))&&(r=!0))}return r}function yo(e,t,n=!1){const r=t.propsCache,i=r.get(e);if(i)return i;const a=e.props,s={},o=[];let l=!1;if(!U(e)){const c=d=>{l=!0;const[m,g]=yo(d,t,!0);pe(s,m),g&&o.push(...g)};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}if(!a&&!l)return ce(e)&&r.set(e,Bt),Bt;if(V(a))for(let c=0;c<a.length;c++){const d=Ye(a[c]);wa(d)&&(s[d]=oe)}else if(a)for(const c in a){const d=Ye(c);if(wa(d)){const m=a[c],g=s[d]=V(m)||U(m)?{type:m}:pe({},m);if(g){const C=Sa(Boolean,g.type),I=Sa(String,g.type);g[0]=C>-1,g[1]=I<0||C<I,(C>-1||Y(g,"default"))&&o.push(d)}}}const f=[s,o];return ce(e)&&r.set(e,f),f}function wa(e){return e[0]!=="$"}function xa(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Ea(e,t){return xa(e)===xa(t)}function Sa(e,t){return V(t)?t.findIndex(n=>Ea(n,e)):U(t)&&Ea(t,e)?0:-1}const _o=e=>e[0]==="_"||e==="$stable",Hi=e=>V(e)?e.map(Ue):[Ue(e)],Fc=(e,t,n)=>{if(t._n)return t;const r=Pe((...i)=>Hi(t(...i)),n);return r._c=!1,r},Ao=(e,t,n)=>{const r=e._ctx;for(const i in e){if(_o(i))continue;const a=e[i];if(U(a))t[i]=Fc(i,a,r);else if(a!=null){const s=Hi(a);t[i]=()=>s}}},wo=(e,t)=>{const n=Hi(t);e.slots.default=()=>n},jc=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=G(t),tr(t,"_",n)):Ao(t,e.slots={})}else e.slots={},t&&wo(e,t);tr(e.slots,xr,1)},Dc=(e,t,n)=>{const{vnode:r,slots:i}=e;let a=!0,s=oe;if(r.shapeFlag&32){const o=t._;o?n&&o===1?a=!1:(pe(i,t),!n&&o===1&&delete i._):(a=!t.$stable,Ao(t,i)),s=t}else t&&(wo(e,t),s={default:1});if(a)for(const o in i)!_o(o)&&s[o]==null&&delete i[o]};function ni(e,t,n,r,i=!1){if(V(e)){e.forEach((m,g)=>ni(m,t&&(V(t)?t[g]:t),n,r,i));return}if(cn(r)&&!i)return;const a=r.shapeFlag&4?ji(r.component)||r.component.proxy:r.el,s=i?null:a,{i:o,r:l}=e,f=t&&t.r,c=o.refs===oe?o.refs={}:o.refs,d=o.setupState;if(f!=null&&f!==l&&(me(f)?(c[f]=null,Y(d,f)&&(d[f]=null)):Ce(f)&&(f.value=null)),U(l))pt(l,o,12,[s,c]);else{const m=me(l),g=Ce(l),C=e.f;if(m||g){const I=()=>{if(C){const z=m?Y(d,l)?d[l]:c[l]:l.value;i?V(z)&&Ai(z,a):V(z)?z.includes(a)||z.push(a):m?(c[l]=[a],Y(d,l)&&(d[l]=c[l])):(l.value=[a],e.k&&(c[e.k]=l.value))}else m?(c[l]=s,Y(d,l)&&(d[l]=s)):g&&(l.value=s,e.k&&(c[e.k]=s))};i||C?I():(I.id=-1,Ee(I,n))}}}const Ee=hc;function Bc(e){return Vc(e)}function Vc(e,t){const n=Rs();n.__VUE__=!0;const{insert:r,remove:i,patchProp:a,createElement:s,createText:o,createComment:l,setText:f,setElementText:c,parentNode:d,nextSibling:m,setScopeId:g=Te,insertStaticContent:C}=e,I=(u,h,p,_=null,v=null,E=null,P=void 0,x=null,S=!!h.dynamicChildren)=>{if(u===h)return;u&&!an(u,h)&&(_=b(u),xe(u,v,E,!0),u=null),h.patchFlag===-2&&(S=!1,h.dynamicChildren=null);const{type:w,ref:T,shapeFlag:j}=h;switch(w){case wr:z(u,h,p,_);break;case Gt:y(u,h,p,_);break;case $r:u==null&&A(h,p,_,P);break;case Me:At(u,h,p,_,v,E,P,x,S);break;default:j&1?K(u,h,p,_,v,E,P,x,S):j&6?je(u,h,p,_,v,E,P,x,S):(j&64||j&128)&&w.process(u,h,p,_,v,E,P,x,S,N)}T!=null&&v&&ni(T,u&&u.ref,E,h||u,!h)},z=(u,h,p,_)=>{if(u==null)r(h.el=o(h.children),p,_);else{const v=h.el=u.el;h.children!==u.children&&f(v,h.children)}},y=(u,h,p,_)=>{u==null?r(h.el=l(h.children||""),p,_):h.el=u.el},A=(u,h,p,_)=>{[u.el,u.anchor]=C(u.children,h,p,_,u.el,u.anchor)},M=({el:u,anchor:h},p,_)=>{let v;for(;u&&u!==h;)v=m(u),r(u,p,_),u=v;r(h,p,_)},F=({el:u,anchor:h})=>{let p;for(;u&&u!==h;)p=m(u),i(u),u=p;i(h)},K=(u,h,p,_,v,E,P,x,S)=>{h.type==="svg"?P="svg":h.type==="math"&&(P="mathml"),u==null?H(h,p,_,v,E,P,x,S):_e(u,h,v,E,P,x,S)},H=(u,h,p,_,v,E,P,x)=>{let S,w;const{props:T,shapeFlag:j,transition:$,dirs:B}=u;if(S=u.el=s(u.type,E,T&&T.is,T),j&8?c(S,u.children):j&16&&ge(u.children,S,null,_,v,Nr(u,E),P,x),B&&wt(u,null,_,"created"),te(S,u,u.scopeId,P,_),T){for(const Z in T)Z!=="value"&&!Gn(Z)&&a(S,Z,null,T[Z],E,u.children,_,v,ve);"value"in T&&a(S,"value",null,T.value,E),(w=T.onVnodeBeforeMount)&&Ve(w,_,u)}B&&wt(u,null,_,"beforeMount");const W=Uc(v,$);W&&$.beforeEnter(S),r(S,h,p),((w=T&&T.onVnodeMounted)||W||B)&&Ee(()=>{w&&Ve(w,_,u),W&&$.enter(S),B&&wt(u,null,_,"mounted")},v)},te=(u,h,p,_,v)=>{if(p&&g(u,p),_)for(let E=0;E<_.length;E++)g(u,_[E]);if(v){let E=v.subTree;if(h===E){const P=v.vnode;te(u,P,P.scopeId,P.slotScopeIds,v.parent)}}},ge=(u,h,p,_,v,E,P,x,S=0)=>{for(let w=S;w<u.length;w++){const T=u[w]=x?ut(u[w]):Ue(u[w]);I(null,T,h,p,_,v,E,P,x)}},_e=(u,h,p,_,v,E,P)=>{const x=h.el=u.el;let{patchFlag:S,dynamicChildren:w,dirs:T}=h;S|=u.patchFlag&16;const j=u.props||oe,$=h.props||oe;let B;if(p&&xt(p,!1),(B=$.onVnodeBeforeUpdate)&&Ve(B,p,h,u),T&&wt(h,u,p,"beforeUpdate"),p&&xt(p,!0),w?Re(u.dynamicChildren,w,x,p,_,Nr(h,v),E):P||q(u,h,x,null,p,_,Nr(h,v),E,!1),S>0){if(S&16)at(x,h,j,$,p,_,v);else if(S&2&&j.class!==$.class&&a(x,"class",null,$.class,v),S&4&&a(x,"style",j.style,$.style,v),S&8){const W=h.dynamicProps;for(let Z=0;Z<W.length;Z++){const se=W[Z],he=j[se],Ie=$[se];(Ie!==he||se==="value")&&a(x,se,he,Ie,v,u.children,p,_,ve)}}S&1&&u.children!==h.children&&c(x,h.children)}else!P&&w==null&&at(x,h,j,$,p,_,v);((B=$.onVnodeUpdated)||T)&&Ee(()=>{B&&Ve(B,p,h,u),T&&wt(h,u,p,"updated")},_)},Re=(u,h,p,_,v,E,P)=>{for(let x=0;x<h.length;x++){const S=u[x],w=h[x],T=S.el&&(S.type===Me||!an(S,w)||S.shapeFlag&70)?d(S.el):p;I(S,w,T,null,_,v,E,P,!0)}},at=(u,h,p,_,v,E,P)=>{if(p!==_){if(p!==oe)for(const x in p)!Gn(x)&&!(x in _)&&a(u,x,p[x],null,P,h.children,v,E,ve);for(const x in _){if(Gn(x))continue;const S=_[x],w=p[x];S!==w&&x!=="value"&&a(u,x,w,S,P,h.children,v,E,ve)}"value"in _&&a(u,"value",p.value,_.value,P)}},At=(u,h,p,_,v,E,P,x,S)=>{const w=h.el=u?u.el:o(""),T=h.anchor=u?u.anchor:o("");let{patchFlag:j,dynamicChildren:$,slotScopeIds:B}=h;B&&(x=x?x.concat(B):B),u==null?(r(w,p,_),r(T,p,_),ge(h.children||[],p,T,v,E,P,x,S)):j>0&&j&64&&$&&u.dynamicChildren?(Re(u.dynamicChildren,$,p,v,E,P,x),(h.key!=null||v&&h===v.subTree)&&xo(u,h,!0)):q(u,h,p,T,v,E,P,x,S)},je=(u,h,p,_,v,E,P,x,S)=>{h.slotScopeIds=x,u==null?h.shapeFlag&512?v.ctx.activate(h,p,_,P,S):nn(h,p,_,v,E,P,S):zt(u,h,S)},nn=(u,h,p,_,v,E,P)=>{const x=u.component=ef(u,_,v);if(uo(u)&&(x.ctx.renderer=N),tf(x),x.asyncDep){if(v&&v.registerDep(x,de),!u.el){const S=x.subTree=le(Gt);y(null,S,h,p)}}else de(x,u,h,p,v,E,P)},zt=(u,h,p)=>{const _=h.component=u.component;if(lc(u,h,p))if(_.asyncDep&&!_.asyncResolved){J(_,h,p);return}else _.next=h,nc(_.update),_.effect.dirty=!0,_.update();else h.el=u.el,_.vnode=h},de=(u,h,p,_,v,E,P)=>{const x=()=>{if(u.isMounted){let{next:T,bu:j,u:$,parent:B,vnode:W}=u;{const $t=Eo(u);if($t){T&&(T.el=W.el,J(u,T,P)),$t.asyncDep.then(()=>{u.isUnmounted||x()});return}}let Z=T,se;xt(u,!1),T?(T.el=W.el,J(u,T,P)):T=W,j&&Rr(j),(se=T.props&&T.props.onVnodeBeforeUpdate)&&Ve(se,B,T,W),xt(u,!0);const he=Ir(u),Ie=u.subTree;u.subTree=he,I(Ie,he,d(Ie.el),b(Ie),u,v,E),T.el=he.el,Z===null&&cc(u,he.el),$&&Ee($,v),(se=T.props&&T.props.onVnodeUpdated)&&Ee(()=>Ve(se,B,T,W),v)}else{let T;const{el:j,props:$}=h,{bm:B,m:W,parent:Z}=u,se=cn(h);if(xt(u,!1),B&&Rr(B),!se&&(T=$&&$.onVnodeBeforeMount)&&Ve(T,Z,h),xt(u,!0),j&&ae){const he=()=>{u.subTree=Ir(u),ae(j,u.subTree,u,v,null)};se?h.type.__asyncLoader().then(()=>!u.isUnmounted&&he()):he()}else{const he=u.subTree=Ir(u);I(null,he,p,_,u,v,E),h.el=he.el}if(W&&Ee(W,v),!se&&(T=$&&$.onVnodeMounted)){const he=h;Ee(()=>Ve(T,Z,he),v)}(h.shapeFlag&256||Z&&cn(Z.vnode)&&Z.vnode.shapeFlag&256)&&u.a&&Ee(u.a,v),u.isMounted=!0,h=p=_=null}},S=u.effect=new Si(x,Te,()=>zi(w),u.scope),w=u.update=()=>{S.dirty&&S.run()};w.id=u.uid,xt(u,!0),w()},J=(u,h,p)=>{h.component=u;const _=u.vnode.props;u.vnode=h,u.next=null,Hc(u,h.props,_,p),Dc(u,h.children,p),Tt(),pa(u),It()},q=(u,h,p,_,v,E,P,x,S=!1)=>{const w=u&&u.children,T=u?u.shapeFlag:0,j=h.children,{patchFlag:$,shapeFlag:B}=h;if($>0){if($&128){st(w,j,p,_,v,E,P,x,S);return}else if($&256){qe(w,j,p,_,v,E,P,x,S);return}}B&8?(T&16&&ve(w,v,E),j!==w&&c(p,j)):T&16?B&16?st(w,j,p,_,v,E,P,x,S):ve(w,v,E,!0):(T&8&&c(p,""),B&16&&ge(j,p,_,v,E,P,x,S))},qe=(u,h,p,_,v,E,P,x,S)=>{u=u||Bt,h=h||Bt;const w=u.length,T=h.length,j=Math.min(w,T);let $;for($=0;$<j;$++){const B=h[$]=S?ut(h[$]):Ue(h[$]);I(u[$],B,p,null,v,E,P,x,S)}w>T?ve(u,v,E,!0,!1,j):ge(h,p,_,v,E,P,x,S,j)},st=(u,h,p,_,v,E,P,x,S)=>{let w=0;const T=h.length;let j=u.length-1,$=T-1;for(;w<=j&&w<=$;){const B=u[w],W=h[w]=S?ut(h[w]):Ue(h[w]);if(an(B,W))I(B,W,p,null,v,E,P,x,S);else break;w++}for(;w<=j&&w<=$;){const B=u[j],W=h[$]=S?ut(h[$]):Ue(h[$]);if(an(B,W))I(B,W,p,null,v,E,P,x,S);else break;j--,$--}if(w>j){if(w<=$){const B=$+1,W=B<T?h[B].el:_;for(;w<=$;)I(null,h[w]=S?ut(h[w]):Ue(h[w]),p,W,v,E,P,x,S),w++}}else if(w>$)for(;w<=j;)xe(u[w],v,E,!0),w++;else{const B=w,W=w,Z=new Map;for(w=W;w<=$;w++){const ke=h[w]=S?ut(h[w]):Ue(h[w]);ke.key!=null&&Z.set(ke.key,w)}let se,he=0;const Ie=$-W+1;let $t=!1,ia=0;const rn=new Array(Ie);for(w=0;w<Ie;w++)rn[w]=0;for(w=B;w<=j;w++){const ke=u[w];if(he>=Ie){xe(ke,v,E,!0);continue}let Be;if(ke.key!=null)Be=Z.get(ke.key);else for(se=W;se<=$;se++)if(rn[se-W]===0&&an(ke,h[se])){Be=se;break}Be===void 0?xe(ke,v,E,!0):(rn[Be-W]=w+1,Be>=ia?ia=Be:$t=!0,I(ke,h[Be],p,null,v,E,P,x,S),he++)}const aa=$t?Kc(rn):Bt;for(se=aa.length-1,w=Ie-1;w>=0;w--){const ke=W+w,Be=h[ke],sa=ke+1<T?h[ke+1].el:_;rn[w]===0?I(null,Be,p,sa,v,E,P,x,S):$t&&(se<0||w!==aa[se]?De(Be,p,sa,2):se--)}}},De=(u,h,p,_,v=null)=>{const{el:E,type:P,transition:x,children:S,shapeFlag:w}=u;if(w&6){De(u.component.subTree,h,p,_);return}if(w&128){u.suspense.move(h,p,_);return}if(w&64){P.move(u,h,p,N);return}if(P===Me){r(E,h,p);for(let j=0;j<S.length;j++)De(S[j],h,p,_);r(u.anchor,h,p);return}if(P===$r){M(u,h,p);return}if(_!==2&&w&1&&x)if(_===0)x.beforeEnter(E),r(E,h,p),Ee(()=>x.enter(E),v);else{const{leave:j,delayLeave:$,afterLeave:B}=x,W=()=>r(E,h,p),Z=()=>{j(E,()=>{W(),B&&B()})};$?$(E,W,Z):Z()}else r(E,h,p)},xe=(u,h,p,_=!1,v=!1)=>{const{type:E,props:P,ref:x,children:S,dynamicChildren:w,shapeFlag:T,patchFlag:j,dirs:$}=u;if(x!=null&&ni(x,null,p,u,!0),T&256){h.ctx.deactivate(u);return}const B=T&1&&$,W=!cn(u);let Z;if(W&&(Z=P&&P.onVnodeBeforeUnmount)&&Ve(Z,h,u),T&6)On(u.component,p,_);else{if(T&128){u.suspense.unmount(p,_);return}B&&wt(u,null,h,"beforeUnmount"),T&64?u.type.remove(u,h,p,v,N,_):w&&(E!==Me||j>0&&j&64)?ve(w,h,p,!1,!0):(E===Me&&j&384||!v&&T&16)&&ve(S,h,p),_&&Lt(u)}(W&&(Z=P&&P.onVnodeUnmounted)||B)&&Ee(()=>{Z&&Ve(Z,h,u),B&&wt(u,null,h,"unmounted")},p)},Lt=u=>{const{type:h,el:p,anchor:_,transition:v}=u;if(h===Me){Nt(p,_);return}if(h===$r){F(u);return}const E=()=>{i(p),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(u.shapeFlag&1&&v&&!v.persisted){const{leave:P,delayLeave:x}=v,S=()=>P(p,E);x?x(u.el,E,S):S()}else E()},Nt=(u,h)=>{let p;for(;u!==h;)p=m(u),i(u),u=p;i(h)},On=(u,h,p)=>{const{bum:_,scope:v,update:E,subTree:P,um:x}=u;_&&Rr(_),v.stop(),E&&(E.active=!1,xe(P,u,h,p)),x&&Ee(x,h),Ee(()=>{u.isUnmounted=!0},h),h&&h.pendingBranch&&!h.isUnmounted&&u.asyncDep&&!u.asyncResolved&&u.suspenseId===h.pendingId&&(h.deps--,h.deps===0&&h.resolve())},ve=(u,h,p,_=!1,v=!1,E=0)=>{for(let P=E;P<u.length;P++)xe(u[P],h,p,_,v)},b=u=>u.shapeFlag&6?b(u.component.subTree):u.shapeFlag&128?u.suspense.next():m(u.anchor||u.el);let R=!1;const k=(u,h,p)=>{u==null?h._vnode&&xe(h._vnode,null,null,!0):I(h._vnode||null,u,h,null,null,null,p),R||(R=!0,pa(),io(),R=!1),h._vnode=u},N={p:I,um:xe,m:De,r:Lt,mt:nn,mc:ge,pc:q,pbc:Re,n:b,o:e};let X,ae;return t&&([X,ae]=t(N)),{render:k,hydrate:X,createApp:Nc(k,X)}}function Nr({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function xt({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Uc(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function xo(e,t,n=!1){const r=e.children,i=t.children;if(V(r)&&V(i))for(let a=0;a<r.length;a++){const s=r[a];let o=i[a];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=i[a]=ut(i[a]),o.el=s.el),n||xo(s,o)),o.type===wr&&(o.el=s.el)}}function Kc(e){const t=e.slice(),n=[0];let r,i,a,s,o;const l=e.length;for(r=0;r<l;r++){const f=e[r];if(f!==0){if(i=n[n.length-1],e[i]<f){t[r]=i,n.push(r);continue}for(a=0,s=n.length-1;a<s;)o=a+s>>1,e[n[o]]<f?a=o+1:s=o;f<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,s=n[a-1];a-- >0;)n[a]=s,s=t[s];return n}function Eo(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Eo(t)}const Wc=e=>e.__isTeleport,Me=Symbol.for("v-fgt"),wr=Symbol.for("v-txt"),Gt=Symbol.for("v-cmt"),$r=Symbol.for("v-stc"),un=[];let Ne=null;function Ge(e=!1){un.push(Ne=e?null:[])}function Yc(){un.pop(),Ne=un[un.length-1]||null}let yn=1;function Ca(e){yn+=e}function So(e){return e.dynamicChildren=yn>0?Ne||Bt:null,Yc(),yn>0&&Ne&&Ne.push(e),e}function rt(e,t,n,r,i,a){return So(D(e,t,n,r,i,a,!0))}function Gc(e,t,n,r,i){return So(le(e,t,n,r,i,!0))}function sr(e){return e?e.__v_isVNode===!0:!1}function an(e,t){return e.type===t.type&&e.key===t.key}const xr="__vInternal",Co=({key:e})=>e??null,Jn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?me(e)||Ce(e)||U(e)?{i:we,r:e,k:t,f:!!n}:e:null);function D(e,t=null,n=null,r=0,i=null,a=e===Me?0:1,s=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Co(t),ref:t&&Jn(t),scopeId:_r,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:we};return o?(Fi(l,n),a&128&&e.normalize(l)):n&&(l.shapeFlag|=me(n)?8:16),yn>0&&!s&&Ne&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&Ne.push(l),l}const le=qc;function qc(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===fc)&&(e=Gt),sr(e)){const o=qt(e,t,!0);return n&&Fi(o,n),yn>0&&!a&&Ne&&(o.shapeFlag&6?Ne[Ne.indexOf(e)]=o:Ne.push(o)),o.patchFlag|=-2,o}if(of(e)&&(e=e.__vccOpts),t){t=Xc(t);let{class:o,style:l}=t;o&&!me(o)&&(t.class=Ei(o)),ce(l)&&(qs(l)&&!V(l)&&(l=pe({},l)),t.style=xi(l))}const s=me(e)?1:dc(e)?128:Wc(e)?64:ce(e)?4:U(e)?2:0;return D(e,t,n,r,i,s,a,!0)}function Xc(e){return e?qs(e)||xr in e?pe({},e):e:null}function qt(e,t,n=!1){const{props:r,ref:i,patchFlag:a,children:s}=e,o=t?Qc(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:o,key:o&&Co(o),ref:t&&t.ref?n&&i?V(i)?i.concat(Jn(t)):[i,Jn(t)]:Jn(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Me?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&qt(e.ssContent),ssFallback:e.ssFallback&&qt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function ee(e=" ",t=0){return le(wr,null,e,t)}function Ue(e){return e==null||typeof e=="boolean"?le(Gt):V(e)?le(Me,null,e.slice()):typeof e=="object"?ut(e):le(wr,null,String(e))}function ut(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:qt(e)}function Fi(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(V(t))n=16;else if(typeof t=="object")if(r&65){const i=t.default;i&&(i._c&&(i._d=!1),Fi(e,i()),i._c&&(i._d=!0));return}else{n=32;const i=t._;!i&&!(xr in t)?t._ctx=we:i===3&&we&&(we.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else U(t)?(t={default:t,_ctx:we},n=32):(t=String(t),r&64?(n=16,t=[ee(t)]):n=8);e.children=t,e.shapeFlag|=n}function Qc(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const i in r)if(i==="class")t.class!==r.class&&(t.class=Ei([t.class,r.class]));else if(i==="style")t.style=xi([t.style,r.style]);else if(dr(i)){const a=t[i],s=r[i];s&&a!==s&&!(V(a)&&a.includes(s))&&(t[i]=a?[].concat(a,s):s)}else i!==""&&(t[i]=r[i])}return t}function Ve(e,t,n,r=null){He(e,t,7,[n,r])}const Jc=vo();let Zc=0;function ef(e,t,n){const r=e.type,i=(t?t.appContext:e.appContext)||Jc,a={uid:Zc++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,scope:new zs(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:yo(r,i),emitsOptions:so(r,i),emit:null,emitted:null,propsDefaults:oe,inheritAttrs:r.inheritAttrs,ctx:oe,data:oe,props:oe,attrs:oe,slots:oe,refs:oe,setupState:oe,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=ac.bind(null,a),e.ce&&e.ce(a),a}let ye=null,or,ri;{const e=Rs(),t=(n,r)=>{let i;return(i=e[n])||(i=e[n]=[]),i.push(r),a=>{i.length>1?i.forEach(s=>s(a)):i[0](a)}};or=t("__VUE_INSTANCE_SETTERS__",n=>ye=n),ri=t("__VUE_SSR_SETTERS__",n=>Er=n)}const Cn=e=>{const t=ye;return or(e),e.scope.on(),()=>{e.scope.off(),or(t)}},ka=()=>{ye&&ye.scope.off(),or(null)};function ko(e){return e.vnode.shapeFlag&4}let Er=!1;function tf(e,t=!1){t&&ri(t);const{props:n,children:r}=e.vnode,i=ko(e);$c(e,n,i,t),jc(e,r);const a=i?nf(e,t):void 0;return t&&ri(!1),a}function nf(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Ri(new Proxy(e.ctx,Mc));const{setup:r}=n;if(r){const i=e.setupContext=r.length>1?af(e):null,a=Cn(e);Tt();const s=pt(r,e,0,[e.props,i]);if(It(),a(),Ps(s)){if(s.then(ka,ka),t)return s.then(o=>{Pa(e,o,t)}).catch(o=>{br(o,e,0)});e.asyncDep=s}else Pa(e,s,t)}else Po(e,t)}function Pa(e,t,n){U(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ce(t)&&(e.setupState=eo(t)),Po(e,n)}let Ma;function Po(e,t,n){const r=e.type;if(!e.render){if(!t&&Ma&&!r.render){const i=r.template||$i(e).template;if(i){const{isCustomElement:a,compilerOptions:s}=e.appContext.config,{delimiters:o,compilerOptions:l}=r,f=pe(pe({isCustomElement:a,delimiters:o},s),l);r.render=Ma(i,f)}}e.render=r.render||Te}{const i=Cn(e);Tt();try{Oc(e)}finally{It(),i()}}}function rf(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return Se(e,"get","$attrs"),t[n]}}))}function af(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return rf(e)},slots:e.slots,emit:e.emit,expose:t}}function ji(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(eo(Ri(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in fn)return fn[n](e)},has(t,n){return n in t||n in fn}}))}function sf(e,t=!0){return U(e)?e.displayName||e.name:e.name||t&&e.__name}function of(e){return U(e)&&"__vccOpts"in e}const Le=(e,t)=>Xl(e,t,Er);function Mo(e,t,n){const r=arguments.length;return r===2?ce(t)&&!V(t)?sr(t)?le(e,null,[t]):le(e,t):le(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&sr(n)&&(n=[n]),le(e,t,n))}const lf="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const cf="http://www.w3.org/2000/svg",ff="http://www.w3.org/1998/Math/MathML",dt=typeof document<"u"?document:null,Oa=dt&&dt.createElement("template"),uf={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i=t==="svg"?dt.createElementNS(cf,e):t==="mathml"?dt.createElementNS(ff,e):dt.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:e=>dt.createTextNode(e),createComment:e=>dt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>dt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,a){const s=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{Oa.innerHTML=r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e;const o=Oa.content;if(r==="svg"||r==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}t.insertBefore(o,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},df=Symbol("_vtc");function hf(e,t,n){const r=e[df];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const mf=Symbol("_vod"),pf=Symbol("");function gf(e,t,n){const r=e.style,i=r.display,a=me(n);if(n&&!a){if(t&&!me(t))for(const s in t)n[s]==null&&ii(r,s,"");for(const s in n)ii(r,s,n[s])}else if(a){if(t!==n){const s=r[pf];s&&(n+=";"+s),r.cssText=n}}else t&&e.removeAttribute("style");mf in e&&(r.display=i)}const Ra=/\s*!important$/;function ii(e,t,n){if(V(n))n.forEach(r=>ii(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=vf(e,t);Ra.test(n)?e.setProperty(en(r),n.replace(Ra,""),"important"):e[r]=n}}const Ta=["Webkit","Moz","ms"],Hr={};function vf(e,t){const n=Hr[t];if(n)return n;let r=Ye(t);if(r!=="filter"&&r in e)return Hr[t]=r;r=pr(r);for(let i=0;i<Ta.length;i++){const a=Ta[i]+r;if(a in e)return Hr[t]=a}return t}const Ia="http://www.w3.org/1999/xlink";function bf(e,t,n,r,i){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(Ia,t.slice(6,t.length)):e.setAttributeNS(Ia,t,n);else{const a=Cl(t);n==null||a&&!Ts(n)?e.removeAttribute(t):e.setAttribute(t,a?"":n)}}function yf(e,t,n,r,i,a,s){if(t==="innerHTML"||t==="textContent"){r&&s(r,i,a),e[t]=n??"";return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){e._value=n;const f=o==="OPTION"?e.getAttribute("value"):e.value,c=n??"";f!==c&&(e.value=c),n==null&&e.removeAttribute(t);return}let l=!1;if(n===""||n==null){const f=typeof e[t];f==="boolean"?n=Ts(n):n==null&&f==="string"?(n="",l=!0):f==="number"&&(n=0,l=!0)}try{e[t]=n}catch{}l&&e.removeAttribute(t)}function _f(e,t,n,r){e.addEventListener(t,n,r)}function Af(e,t,n,r){e.removeEventListener(t,n,r)}const za=Symbol("_vei");function wf(e,t,n,r,i=null){const a=e[za]||(e[za]={}),s=a[t];if(r&&s)s.value=r;else{const[o,l]=xf(t);if(r){const f=a[t]=Cf(r,i);_f(e,o,f,l)}else s&&(Af(e,o,s,l),a[t]=void 0)}}const La=/(?:Once|Passive|Capture)$/;function xf(e){let t;if(La.test(e)){t={};let r;for(;r=e.match(La);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):en(e.slice(2)),t]}let Fr=0;const Ef=Promise.resolve(),Sf=()=>Fr||(Ef.then(()=>Fr=0),Fr=Date.now());function Cf(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;He(kf(r,n.value),t,5,[r])};return n.value=e,n.attached=Sf(),n}function kf(e,t){if(V(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>i=>!i._stopped&&r&&r(i))}else return t}const Na=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Pf=(e,t,n,r,i,a,s,o,l)=>{const f=i==="svg";t==="class"?hf(e,r,f):t==="style"?gf(e,n,r):dr(t)?_i(t)||wf(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Mf(e,t,r,f))?yf(e,t,r,a,s,o,l):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),bf(e,t,r,f))};function Mf(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&Na(t)&&U(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const i=e.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Na(t)&&me(n)?!1:t in e}const Of=pe({patchProp:Pf},uf);let $a;function Rf(){return $a||($a=Bc(Of))}const Tf=(...e)=>{const t=Rf().createApp(...e),{mount:n}=t;return t.mount=r=>{const i=zf(r);if(!i)return;const a=t._component;!U(a)&&!a.render&&!a.template&&(a.template=i.innerHTML),i.innerHTML="";const s=n(i,!1,If(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),s},t};function If(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function zf(e){return me(e)?document.querySelector(e):e}var Lf=!1;/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const Nf=Symbol();var Ha;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(Ha||(Ha={}));function $f(){const e=Pl(!0),t=e.run(()=>Js({}));let n=[],r=[];const i=Ri({install(a){i._a=a,a.provide(Nf,i),a.config.globalProperties.$pinia=i,r.forEach(s=>n.push(s)),r=[]},use(a){return!this._a&&!Lf?r.push(a):n.push(a),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return i}const Hf="/assets/montana-dsEKHcT6.jpg";/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Ht=typeof window<"u";function Ff(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const Q=Object.assign;function jr(e,t){const n={};for(const r in t){const i=t[r];n[r]=Fe(i)?i.map(e):e(i)}return n}const dn=()=>{},Fe=Array.isArray,jf=/\/$/,Df=e=>e.replace(jf,"");function Dr(e,t,n="/"){let r,i={},a="",s="";const o=t.indexOf("#");let l=t.indexOf("?");return o<l&&o>=0&&(l=-1),l>-1&&(r=t.slice(0,l),a=t.slice(l+1,o>-1?o:t.length),i=e(a)),o>-1&&(r=r||t.slice(0,o),s=t.slice(o,t.length)),r=Kf(r??t,n),{fullPath:r+(a&&"?")+a+s,path:r,query:i,hash:s}}function Bf(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Fa(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Vf(e,t,n){const r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&Xt(t.matched[r],n.matched[i])&&Oo(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Xt(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Oo(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Uf(e[n],t[n]))return!1;return!0}function Uf(e,t){return Fe(e)?ja(e,t):Fe(t)?ja(t,e):e===t}function ja(e,t){return Fe(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Kf(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let a=n.length-1,s,o;for(s=0;s<r.length;s++)if(o=r[s],o!==".")if(o==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var _n;(function(e){e.pop="pop",e.push="push"})(_n||(_n={}));var hn;(function(e){e.back="back",e.forward="forward",e.unknown=""})(hn||(hn={}));function Wf(e){if(!e)if(Ht){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Df(e)}const Yf=/^[^#]+#/;function Gf(e,t){return e.replace(Yf,"#")+t}function qf(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Sr=()=>({left:window.pageXOffset,top:window.pageYOffset});function Xf(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=qf(i,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Da(e,t){return(history.state?history.state.position-t:-1)+e}const ai=new Map;function Qf(e,t){ai.set(e,t)}function Jf(e){const t=ai.get(e);return ai.delete(e),t}let Zf=()=>location.protocol+"//"+location.host;function Ro(e,t){const{pathname:n,search:r,hash:i}=t,a=e.indexOf("#");if(a>-1){let o=i.includes(e.slice(a))?e.slice(a).length:1,l=i.slice(o);return l[0]!=="/"&&(l="/"+l),Fa(l,"")}return Fa(n,e)+r+i}function eu(e,t,n,r){let i=[],a=[],s=null;const o=({state:m})=>{const g=Ro(e,location),C=n.value,I=t.value;let z=0;if(m){if(n.value=g,t.value=m,s&&s===C){s=null;return}z=I?m.position-I.position:0}else r(g);i.forEach(y=>{y(n.value,C,{delta:z,type:_n.pop,direction:z?z>0?hn.forward:hn.back:hn.unknown})})};function l(){s=n.value}function f(m){i.push(m);const g=()=>{const C=i.indexOf(m);C>-1&&i.splice(C,1)};return a.push(g),g}function c(){const{history:m}=window;m.state&&m.replaceState(Q({},m.state,{scroll:Sr()}),"")}function d(){for(const m of a)m();a=[],window.removeEventListener("popstate",o),window.removeEventListener("beforeunload",c)}return window.addEventListener("popstate",o),window.addEventListener("beforeunload",c,{passive:!0}),{pauseListeners:l,listen:f,destroy:d}}function Ba(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?Sr():null}}function tu(e){const{history:t,location:n}=window,r={value:Ro(e,n)},i={value:t.state};i.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function a(l,f,c){const d=e.indexOf("#"),m=d>-1?(n.host&&document.querySelector("base")?e:e.slice(d))+l:Zf()+e+l;try{t[c?"replaceState":"pushState"](f,"",m),i.value=f}catch(g){console.error(g),n[c?"replace":"assign"](m)}}function s(l,f){const c=Q({},t.state,Ba(i.value.back,l,i.value.forward,!0),f,{position:i.value.position});a(l,c,!0),r.value=l}function o(l,f){const c=Q({},i.value,t.state,{forward:l,scroll:Sr()});a(c.current,c,!0);const d=Q({},Ba(r.value,l,null),{position:c.position+1},f);a(l,d,!1),r.value=l}return{location:r,state:i,push:o,replace:s}}function nu(e){e=Wf(e);const t=tu(e),n=eu(e,t.state,t.location,t.replace);function r(a,s=!0){s||n.pauseListeners(),history.go(a)}const i=Q({location:"",base:e,go:r,createHref:Gf.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function ru(e){return typeof e=="string"||e&&typeof e=="object"}function To(e){return typeof e=="string"||typeof e=="symbol"}const lt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Io=Symbol("");var Va;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Va||(Va={}));function Qt(e,t){return Q(new Error,{type:e,[Io]:!0},t)}function Xe(e,t){return e instanceof Error&&Io in e&&(t==null||!!(e.type&t))}const Ua="[^/]+?",iu={sensitive:!1,strict:!1,start:!0,end:!0},au=/[.+*?^${}()[\]/\\]/g;function su(e,t){const n=Q({},iu,t),r=[];let i=n.start?"^":"";const a=[];for(const f of e){const c=f.length?[]:[90];n.strict&&!f.length&&(i+="/");for(let d=0;d<f.length;d++){const m=f[d];let g=40+(n.sensitive?.25:0);if(m.type===0)d||(i+="/"),i+=m.value.replace(au,"\\$&"),g+=40;else if(m.type===1){const{value:C,repeatable:I,optional:z,regexp:y}=m;a.push({name:C,repeatable:I,optional:z});const A=y||Ua;if(A!==Ua){g+=10;try{new RegExp(`(${A})`)}catch(F){throw new Error(`Invalid custom RegExp for param "${C}" (${A}): `+F.message)}}let M=I?`((?:${A})(?:/(?:${A}))*)`:`(${A})`;d||(M=z&&f.length<2?`(?:/${M})`:"/"+M),z&&(M+="?"),i+=M,g+=20,z&&(g+=-8),I&&(g+=-20),A===".*"&&(g+=-50)}c.push(g)}r.push(c)}if(n.strict&&n.end){const f=r.length-1;r[f][r[f].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&(i+="(?:/|$)");const s=new RegExp(i,n.sensitive?"":"i");function o(f){const c=f.match(s),d={};if(!c)return null;for(let m=1;m<c.length;m++){const g=c[m]||"",C=a[m-1];d[C.name]=g&&C.repeatable?g.split("/"):g}return d}function l(f){let c="",d=!1;for(const m of e){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const g of m)if(g.type===0)c+=g.value;else if(g.type===1){const{value:C,repeatable:I,optional:z}=g,y=C in f?f[C]:"";if(Fe(y)&&!I)throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);const A=Fe(y)?y.join("/"):y;if(!A)if(z)m.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${C}"`);c+=A}}return c||"/"}return{re:s,score:r,keys:a,parse:o,stringify:l}}function ou(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function lu(e,t){let n=0;const r=e.score,i=t.score;for(;n<r.length&&n<i.length;){const a=ou(r[n],i[n]);if(a)return a;n++}if(Math.abs(i.length-r.length)===1){if(Ka(r))return 1;if(Ka(i))return-1}return i.length-r.length}function Ka(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const cu={type:0,value:""},fu=/[a-zA-Z0-9_]/;function uu(e){if(!e)return[[]];if(e==="/")return[[cu]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${f}": ${g}`)}let n=0,r=n;const i=[];let a;function s(){a&&i.push(a),a=[]}let o=0,l,f="",c="";function d(){f&&(n===0?a.push({type:0,value:f}):n===1||n===2||n===3?(a.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:f,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),f="")}function m(){f+=l}for(;o<e.length;){if(l=e[o++],l==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:l==="/"?(f&&d(),s()):l===":"?(d(),n=1):m();break;case 4:m(),n=r;break;case 1:l==="("?n=2:fu.test(l)?m():(d(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&o--);break;case 2:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=3:c+=l;break;case 3:d(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&o--,c="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${f}"`),d(),s(),i}function du(e,t,n){const r=su(uu(e.path),n),i=Q(r,{record:e,parent:t,children:[],alias:[]});return t&&!i.record.aliasOf==!t.record.aliasOf&&t.children.push(i),i}function hu(e,t){const n=[],r=new Map;t=Ga({strict:!1,end:!0,sensitive:!1},t);function i(c){return r.get(c)}function a(c,d,m){const g=!m,C=mu(c);C.aliasOf=m&&m.record;const I=Ga(t,c),z=[C];if("alias"in c){const M=typeof c.alias=="string"?[c.alias]:c.alias;for(const F of M)z.push(Q({},C,{components:m?m.record.components:C.components,path:F,aliasOf:m?m.record:C}))}let y,A;for(const M of z){const{path:F}=M;if(d&&F[0]!=="/"){const K=d.record.path,H=K[K.length-1]==="/"?"":"/";M.path=d.record.path+(F&&H+F)}if(y=du(M,d,I),m?m.alias.push(y):(A=A||y,A!==y&&A.alias.push(y),g&&c.name&&!Ya(y)&&s(c.name)),C.children){const K=C.children;for(let H=0;H<K.length;H++)a(K[H],y,m&&m.children[H])}m=m||y,(y.record.components&&Object.keys(y.record.components).length||y.record.name||y.record.redirect)&&l(y)}return A?()=>{s(A)}:dn}function s(c){if(To(c)){const d=r.get(c);d&&(r.delete(c),n.splice(n.indexOf(d),1),d.children.forEach(s),d.alias.forEach(s))}else{const d=n.indexOf(c);d>-1&&(n.splice(d,1),c.record.name&&r.delete(c.record.name),c.children.forEach(s),c.alias.forEach(s))}}function o(){return n}function l(c){let d=0;for(;d<n.length&&lu(c,n[d])>=0&&(c.record.path!==n[d].record.path||!zo(c,n[d]));)d++;n.splice(d,0,c),c.record.name&&!Ya(c)&&r.set(c.record.name,c)}function f(c,d){let m,g={},C,I;if("name"in c&&c.name){if(m=r.get(c.name),!m)throw Qt(1,{location:c});I=m.record.name,g=Q(Wa(d.params,m.keys.filter(A=>!A.optional).map(A=>A.name)),c.params&&Wa(c.params,m.keys.map(A=>A.name))),C=m.stringify(g)}else if("path"in c)C=c.path,m=n.find(A=>A.re.test(C)),m&&(g=m.parse(C),I=m.record.name);else{if(m=d.name?r.get(d.name):n.find(A=>A.re.test(d.path)),!m)throw Qt(1,{location:c,currentLocation:d});I=m.record.name,g=Q({},d.params,c.params),C=m.stringify(g)}const z=[];let y=m;for(;y;)z.unshift(y.record),y=y.parent;return{name:I,path:C,params:g,matched:z,meta:gu(z)}}return e.forEach(c=>a(c)),{addRoute:a,resolve:f,removeRoute:s,getRoutes:o,getRecordMatcher:i}}function Wa(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function mu(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:pu(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function pu(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Ya(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function gu(e){return e.reduce((t,n)=>Q(t,n.meta),{})}function Ga(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function zo(e,t){return t.children.some(n=>n===e||zo(e,n))}const Lo=/#/g,vu=/&/g,bu=/\//g,yu=/=/g,_u=/\?/g,No=/\+/g,Au=/%5B/g,wu=/%5D/g,$o=/%5E/g,xu=/%60/g,Ho=/%7B/g,Eu=/%7C/g,Fo=/%7D/g,Su=/%20/g;function Di(e){return encodeURI(""+e).replace(Eu,"|").replace(Au,"[").replace(wu,"]")}function Cu(e){return Di(e).replace(Ho,"{").replace(Fo,"}").replace($o,"^")}function si(e){return Di(e).replace(No,"%2B").replace(Su,"+").replace(Lo,"%23").replace(vu,"%26").replace(xu,"`").replace(Ho,"{").replace(Fo,"}").replace($o,"^")}function ku(e){return si(e).replace(yu,"%3D")}function Pu(e){return Di(e).replace(Lo,"%23").replace(_u,"%3F")}function Mu(e){return e==null?"":Pu(e).replace(bu,"%2F")}function lr(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function Ou(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let i=0;i<r.length;++i){const a=r[i].replace(No," "),s=a.indexOf("="),o=lr(s<0?a:a.slice(0,s)),l=s<0?null:lr(a.slice(s+1));if(o in t){let f=t[o];Fe(f)||(f=t[o]=[f]),f.push(l)}else t[o]=l}return t}function qa(e){let t="";for(let n in e){const r=e[n];if(n=ku(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(Fe(r)?r.map(a=>a&&si(a)):[r&&si(r)]).forEach(a=>{a!==void 0&&(t+=(t.length?"&":"")+n,a!=null&&(t+="="+a))})}return t}function Ru(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=Fe(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return t}const Tu=Symbol(""),Xa=Symbol(""),Bi=Symbol(""),jo=Symbol(""),oi=Symbol("");function sn(){let e=[];function t(r){return e.push(r),()=>{const i=e.indexOf(r);i>-1&&e.splice(i,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function ht(e,t,n,r,i){const a=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((s,o)=>{const l=d=>{d===!1?o(Qt(4,{from:n,to:t})):d instanceof Error?o(d):ru(d)?o(Qt(2,{from:t,to:d})):(a&&r.enterCallbacks[i]===a&&typeof d=="function"&&a.push(d),s())},f=e.call(r&&r.instances[i],t,n,l);let c=Promise.resolve(f);e.length<3&&(c=c.then(l)),c.catch(d=>o(d))})}function Br(e,t,n,r){const i=[];for(const a of e)for(const s in a.components){let o=a.components[s];if(!(t!=="beforeRouteEnter"&&!a.instances[s]))if(Iu(o)){const f=(o.__vccOpts||o)[t];f&&i.push(ht(f,n,r,a,s))}else{let l=o();i.push(()=>l.then(f=>{if(!f)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${a.path}"`));const c=Ff(f)?f.default:f;a.components[s]=c;const m=(c.__vccOpts||c)[t];return m&&ht(m,n,r,a,s)()}))}}return i}function Iu(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Qa(e){const t=Je(Bi),n=Je(jo),r=Le(()=>t.resolve(Mt(e.to))),i=Le(()=>{const{matched:l}=r.value,{length:f}=l,c=l[f-1],d=n.matched;if(!c||!d.length)return-1;const m=d.findIndex(Xt.bind(null,c));if(m>-1)return m;const g=Ja(l[f-2]);return f>1&&Ja(c)===g&&d[d.length-1].path!==g?d.findIndex(Xt.bind(null,l[f-2])):m}),a=Le(()=>i.value>-1&&$u(n.params,r.value.params)),s=Le(()=>i.value>-1&&i.value===n.matched.length-1&&Oo(n.params,r.value.params));function o(l={}){return Nu(l)?t[Mt(e.replace)?"replace":"push"](Mt(e.to)).catch(dn):Promise.resolve()}return{route:r,href:Le(()=>r.value.href),isActive:a,isExactActive:s,navigate:o}}const zu=fo({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Qa,setup(e,{slots:t}){const n=vr(Qa(e)),{options:r}=Je(Bi),i=Le(()=>({[Za(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Za(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=t.default&&t.default(n);return e.custom?a:Mo("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},a)}}}),Lu=zu;function Nu(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function $u(e,t){for(const n in t){const r=t[n],i=e[n];if(typeof r=="string"){if(r!==i)return!1}else if(!Fe(i)||i.length!==r.length||r.some((a,s)=>a!==i[s]))return!1}return!0}function Ja(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Za=(e,t,n)=>e??t??n,Hu=fo({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=Je(oi),i=Le(()=>e.route||r.value),a=Je(Xa,0),s=Le(()=>{let f=Mt(a);const{matched:c}=i.value;let d;for(;(d=c[f])&&!d.components;)f++;return f}),o=Le(()=>i.value.matched[s.value]);Qn(Xa,Le(()=>s.value+1)),Qn(Tu,o),Qn(oi,i);const l=Js();return Xn(()=>[l.value,o.value,e.name],([f,c,d],[m,g,C])=>{c&&(c.instances[d]=f,g&&g!==c&&f&&f===m&&(c.leaveGuards.size||(c.leaveGuards=g.leaveGuards),c.updateGuards.size||(c.updateGuards=g.updateGuards))),f&&c&&(!g||!Xt(c,g)||!m)&&(c.enterCallbacks[d]||[]).forEach(I=>I(f))},{flush:"post"}),()=>{const f=i.value,c=e.name,d=o.value,m=d&&d.components[c];if(!m)return es(n.default,{Component:m,route:f});const g=d.props[c],C=g?g===!0?f.params:typeof g=="function"?g(f):g:null,z=Mo(m,Q({},C,t,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return es(n.default,{Component:z,route:f})||z}}});function es(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const Do=Hu;function Fu(e){const t=hu(e.routes,e),n=e.parseQuery||Ou,r=e.stringifyQuery||qa,i=e.history,a=sn(),s=sn(),o=sn(),l=Ql(lt);let f=lt;Ht&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=jr.bind(null,b=>""+b),d=jr.bind(null,Mu),m=jr.bind(null,lr);function g(b,R){let k,N;return To(b)?(k=t.getRecordMatcher(b),N=R):N=b,t.addRoute(N,k)}function C(b){const R=t.getRecordMatcher(b);R&&t.removeRoute(R)}function I(){return t.getRoutes().map(b=>b.record)}function z(b){return!!t.getRecordMatcher(b)}function y(b,R){if(R=Q({},R||l.value),typeof b=="string"){const h=Dr(n,b,R.path),p=t.resolve({path:h.path},R),_=i.createHref(h.fullPath);return Q(h,p,{params:m(p.params),hash:lr(h.hash),redirectedFrom:void 0,href:_})}let k;if("path"in b)k=Q({},b,{path:Dr(n,b.path,R.path).path});else{const h=Q({},b.params);for(const p in h)h[p]==null&&delete h[p];k=Q({},b,{params:d(h)}),R.params=d(R.params)}const N=t.resolve(k,R),X=b.hash||"";N.params=c(m(N.params));const ae=Bf(r,Q({},b,{hash:Cu(X),path:N.path})),u=i.createHref(ae);return Q({fullPath:ae,hash:X,query:r===qa?Ru(b.query):b.query||{}},N,{redirectedFrom:void 0,href:u})}function A(b){return typeof b=="string"?Dr(n,b,l.value.path):Q({},b)}function M(b,R){if(f!==b)return Qt(8,{from:R,to:b})}function F(b){return te(b)}function K(b){return F(Q(A(b),{replace:!0}))}function H(b){const R=b.matched[b.matched.length-1];if(R&&R.redirect){const{redirect:k}=R;let N=typeof k=="function"?k(b):k;return typeof N=="string"&&(N=N.includes("?")||N.includes("#")?N=A(N):{path:N},N.params={}),Q({query:b.query,hash:b.hash,params:"path"in N?{}:b.params},N)}}function te(b,R){const k=f=y(b),N=l.value,X=b.state,ae=b.force,u=b.replace===!0,h=H(k);if(h)return te(Q(A(h),{state:typeof h=="object"?Q({},X,h.state):X,force:ae,replace:u}),R||k);const p=k;p.redirectedFrom=R;let _;return!ae&&Vf(r,N,k)&&(_=Qt(16,{to:p,from:N}),De(N,N,!0,!1)),(_?Promise.resolve(_):Re(p,N)).catch(v=>Xe(v)?Xe(v,2)?v:st(v):q(v,p,N)).then(v=>{if(v){if(Xe(v,2))return te(Q({replace:u},A(v.to),{state:typeof v.to=="object"?Q({},X,v.to.state):X,force:ae}),R||p)}else v=At(p,N,!0,u,X);return at(p,N,v),v})}function ge(b,R){const k=M(b,R);return k?Promise.reject(k):Promise.resolve()}function _e(b){const R=Nt.values().next().value;return R&&typeof R.runWithContext=="function"?R.runWithContext(b):b()}function Re(b,R){let k;const[N,X,ae]=ju(b,R);k=Br(N.reverse(),"beforeRouteLeave",b,R);for(const h of N)h.leaveGuards.forEach(p=>{k.push(ht(p,b,R))});const u=ge.bind(null,b,R);return k.push(u),ve(k).then(()=>{k=[];for(const h of a.list())k.push(ht(h,b,R));return k.push(u),ve(k)}).then(()=>{k=Br(X,"beforeRouteUpdate",b,R);for(const h of X)h.updateGuards.forEach(p=>{k.push(ht(p,b,R))});return k.push(u),ve(k)}).then(()=>{k=[];for(const h of ae)if(h.beforeEnter)if(Fe(h.beforeEnter))for(const p of h.beforeEnter)k.push(ht(p,b,R));else k.push(ht(h.beforeEnter,b,R));return k.push(u),ve(k)}).then(()=>(b.matched.forEach(h=>h.enterCallbacks={}),k=Br(ae,"beforeRouteEnter",b,R),k.push(u),ve(k))).then(()=>{k=[];for(const h of s.list())k.push(ht(h,b,R));return k.push(u),ve(k)}).catch(h=>Xe(h,8)?h:Promise.reject(h))}function at(b,R,k){o.list().forEach(N=>_e(()=>N(b,R,k)))}function At(b,R,k,N,X){const ae=M(b,R);if(ae)return ae;const u=R===lt,h=Ht?history.state:{};k&&(N||u?i.replace(b.fullPath,Q({scroll:u&&h&&h.scroll},X)):i.push(b.fullPath,X)),l.value=b,De(b,R,k,u),st()}let je;function nn(){je||(je=i.listen((b,R,k)=>{if(!On.listening)return;const N=y(b),X=H(N);if(X){te(Q(X,{replace:!0}),N).catch(dn);return}f=N;const ae=l.value;Ht&&Qf(Da(ae.fullPath,k.delta),Sr()),Re(N,ae).catch(u=>Xe(u,12)?u:Xe(u,2)?(te(u.to,N).then(h=>{Xe(h,20)&&!k.delta&&k.type===_n.pop&&i.go(-1,!1)}).catch(dn),Promise.reject()):(k.delta&&i.go(-k.delta,!1),q(u,N,ae))).then(u=>{u=u||At(N,ae,!1),u&&(k.delta&&!Xe(u,8)?i.go(-k.delta,!1):k.type===_n.pop&&Xe(u,20)&&i.go(-1,!1)),at(N,ae,u)}).catch(dn)}))}let zt=sn(),de=sn(),J;function q(b,R,k){st(b);const N=de.list();return N.length?N.forEach(X=>X(b,R,k)):console.error(b),Promise.reject(b)}function qe(){return J&&l.value!==lt?Promise.resolve():new Promise((b,R)=>{zt.add([b,R])})}function st(b){return J||(J=!b,nn(),zt.list().forEach(([R,k])=>b?k(b):R()),zt.reset()),b}function De(b,R,k,N){const{scrollBehavior:X}=e;if(!Ht||!X)return Promise.resolve();const ae=!k&&Jf(Da(b.fullPath,0))||(N||!k)&&history.state&&history.state.scroll||null;return no().then(()=>X(b,R,ae)).then(u=>u&&Xf(u)).catch(u=>q(u,b,R))}const xe=b=>i.go(b);let Lt;const Nt=new Set,On={currentRoute:l,listening:!0,addRoute:g,removeRoute:C,hasRoute:z,getRoutes:I,resolve:y,options:e,push:F,replace:K,go:xe,back:()=>xe(-1),forward:()=>xe(1),beforeEach:a.add,beforeResolve:s.add,afterEach:o.add,onError:de.add,isReady:qe,install(b){const R=this;b.component("RouterLink",Lu),b.component("RouterView",Do),b.config.globalProperties.$router=R,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>Mt(l)}),Ht&&!Lt&&l.value===lt&&(Lt=!0,F(i.location).catch(X=>{}));const k={};for(const X in lt)Object.defineProperty(k,X,{get:()=>l.value[X],enumerable:!0});b.provide(Bi,R),b.provide(jo,Ys(k)),b.provide(oi,l);const N=b.unmount;Nt.add(b),b.unmount=function(){Nt.delete(b),Nt.size<1&&(f=lt,je&&je(),je=null,l.value=lt,Lt=!1,J=!1),N()}}};function ve(b){return b.reduce((R,k)=>R.then(()=>_e(k)),Promise.resolve())}return On}function ju(e,t){const n=[],r=[],i=[],a=Math.max(t.matched.length,e.matched.length);for(let s=0;s<a;s++){const o=t.matched[s];o&&(e.matched.find(f=>Xt(f,o))?r.push(o):n.push(o));const l=e.matched[s];l&&(t.matched.find(f=>Xt(f,l))||i.push(l))}return[n,r,i]}const _t=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n},Vi=e=>(Li("data-v-2c780179"),e=e(),Ni(),e),Du={class:"greetings"},Bu=Vi(()=>D("span",{class:"title"},"PhD Research Scientist",-1)),Vu=Vi(()=>D("br",null,null,-1)),Uu=Vi(()=>D("span",{class:"subtitle"},[ee("Department of Linguistics,"),D("br"),ee("The Ohio State University")],-1)),Ku={__name:"HelloWorld",props:{msg:{type:String,required:!0}},setup(e){return(t,n)=>(Ge(),rt("div",Du,[D("h1",null,kl(e.msg),1),Bu,Vu,Uu]))}},Wu=_t(Ku,[["__scopeId","data-v-2c780179"]]),Yu=e=>(Li("data-v-06192204"),e=e(),Ni(),e),Gu=Yu(()=>D("img",{alt:"Colors",class:"logo",src:Hf},null,-1)),qu={class:"wrapper"},Xu={__name:"App",setup(e){return(t,n)=>(Ge(),rt(Me,null,[D("header",null,[Gu,D("div",qu,[le(Wu,{msg:"Sara Court"})])]),le(Mt(Do))],64))}},Qu=_t(Xu,[["__scopeId","data-v-06192204"]]),Ju="modulepreload",Zu=function(e){return"/"+e},ts={},$n=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){const a=document.getElementsByTagName("link");i=Promise.all(n.map(s=>{if(s=Zu(s),s in ts)return;ts[s]=!0;const o=s.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!r)for(let d=a.length-1;d>=0;d--){const m=a[d];if(m.href===s&&(!o||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${l}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":Ju,o||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),o)return new Promise((d,m)=>{c.addEventListener("load",d),c.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${s}`)))})}))}return i.then(()=>t()).catch(a=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a})},e0="data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8BMzMzRzMzM1czMzNVMzMzVTMzM1UzMzNVMzMzVTMzM1H///8B////Af///wH///8B////Af///wH///8BMzMzSQwMjGcAAKn5AACp/wAAqf8AAKn/AACp/wAAqf0HB5hrMzMzUf///wH///8B////Af///wH///8BMzMzSQsLkF8AAKr5AACq/wAAqv8AAKr/AACq/wAAqv8AAKr/AACq/QkJll8zMzNP////Af///wH///8B////ATMzM00AAKv5AACr/wAAq/8AAKvFAACrqwAAq6sAAKvDAACr/wAAq/8AAKv5MzMzTf///wH///8B////Af///wEzMzNLAACt/wAArf8AAK3dAACtCf///wH///8BAACtCQAArd8AAK3/AACt/zMzM0v///8B////Af///wH///8BMzMzSwAArv8AAK7/AACuif///wH///8B////Af///wEAAK6JAACu/wAArv8zMzNL////Af///wH///8B////ATMzM0sAALD/AACw/wAAsIf///8B////Af///wH///8BAACwhwAAsP8AALD/MzMzS////wH///8B////Af///wEzMzNLAACy/wAAsf8AALGH////Af///wH///8B////AQAAsYcAALL/AACy/zMzM0v///8B////Af///wH///8BMzMzSwAAs/8AALP/AACzh////wH///8B////Af///wEAALOHAACz/wAAs/8zMzNL////Af///wH///8B////ATMzM0sAALX/AAC1/wAAtYf///8B////Af///wH///8BAAC1hwAAtf8AALX/MzMzS////wH///8B////Af///wEzMzNLAAC2/wAAtv8AALaJ////Af///wH///8B////AQAAtosAALb/AAC2/zMzM0v///8B////Af///wH///8BMzMzSwAAuP8AALj/AAC44QAAuAn///8B////AQAAuAkAALjjAAC4/wAAuP8zMzNL////Af///wH///8B////ATMzM00AALnxAAC5/wAAuf8AALm5AAC5mQAAuZkAALm3AAC5/wAAuf8AALnzMzMzTf///wH///8B////Af///wEzMzNHDw+RSQAAuukAALr/AAC6/wAAuv8AALr/AAC6/wAAuv8AALrpDQ2YRTMzM0n///8B////Af///wH///8B////ATMzM0cVFYM9AAC73wAAu/8AALv/AAC7/wAAu/8AALvfDg6XMTMzM1H///8B////Af///wH///8B////Af///wH///8BMzMzRzMzM1czMzNVMzMzVTMzM1UzMzNVMzMzVTMzM1f///8B////Af///wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==",t0="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%3e%3cpath%20fill='%230A66C2'%20d='M12.225%2012.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926%200-1.068.724-1.068%201.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95%201.684-.925%201.802%200%202.135%201.185%202.135%202.728l-.001%203.14zM4.67%205.715a1.037%201.037%200%2001-1.032-1.031c0-.566.466-1.032%201.032-1.032.566%200%201.031.466%201.032%201.032%200%20.566-.466%201.032-1.032%201.032zm.889%206.51h-1.78V6.498h1.78v5.727zM13.11%202H2.885A.88.88%200%20002%202.866v10.268a.88.88%200%2000.885.866h10.226a.882.882%200%2000.889-.866V2.865a.88.88%200%2000-.889-.864z'/%3e%3c/svg%3e",n0={},r0={class:"item"},i0={class:"details"};function a0(e,t){return Ge(),rt("div",r0,[D("i",null,[zr(e.$slots,"icon",{},void 0,!0)]),D("div",i0,[D("h3",null,[zr(e.$slots,"heading",{},void 0,!0)]),zr(e.$slots,"default",{},void 0,!0)])])}const Hn=_t(n0,[["render",a0],["__scopeId","data-v-f4a791c4"]]),s0={},o0={width:"30",height:"30",fill:"#000000",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},l0=D("path",{id:"assets_1_",d:`M31,0.64H10C9.801,0.64,9.64,0.801,9.64,1v2.64H1C0.801,3.64,0.64,3.801,0.64,4v27
	c0,0.199,0.161,0.36,0.36,0.36h21c0.199,0,0.36-0.161,0.36-0.36v-2.64H31c0.199,0,0.36-0.161,0.36-0.36V1
	C31.36,0.801,31.199,0.64,31,0.64z M21.64,30.64H1.36V4.36h14.28V10c0,0.199,0.161,0.36,0.36,0.36h5.64V30.64z M16.36,4.869
	l4.771,4.771H16.36V4.869z M30.64,27.64h-8.28V10c0-0.096-0.038-0.187-0.105-0.254l-6-6C16.187,3.678,16.096,3.64,16,3.64h-5.64
	V1.36h20.28C30.64,1.36,30.64,27.64,30.64,27.64z M19.36,16c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36
	S3.801,15.64,4,15.64h15C19.199,15.64,19.36,15.801,19.36,16z M19.36,19c0,0.199-0.161,0.36-0.36,0.36H4
	c-0.199,0-0.36-0.161-0.36-0.36S3.801,18.64,4,18.64h15C19.199,18.64,19.36,18.801,19.36,19z M19.36,22
	c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,21.64,4,21.64h15C19.199,21.64,19.36,21.801,19.36,22z
	 M19.36,25c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,24.64,4,24.64h15
	C19.199,24.64,19.36,24.801,19.36,25z`},null,-1),c0=D("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),f0=[l0,c0];function u0(e,t){return Ge(),rt("svg",o0,f0)}const d0=_t(s0,[["render",u0]]),h0={},m0={fill:"#000000",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 32 32","xml:space":"preserve"},p0=D("path",{id:"machine--learning--01_1_",d:`M12,1.64c-0.002,0-0.004,0-0.006,0c-1.473,0-2.691,0.759-3.239,2h-0.48
	c-0.003,0-0.006,0-0.009,0c-1.271,0-2.478,0.425-3.398,1.199C3.892,5.659,3.354,6.79,3.352,8.021
	c-0.001,0.995,0.526,2.097,1.025,2.791c-2.223,0.77-3.734,2.633-3.737,4.688c-0.003,2.046,1.507,3.91,3.734,4.687
	c-0.506,0.692-1.044,1.788-1.045,2.766c-0.003,2.426,2.215,4.403,4.947,4.408h0.48c0.543,1.238,1.764,1.998,3.244,2
	c0.002,0,0.004,0,0.007,0c1.972,0,3.351-1.381,3.354-3.36V5C15.363,3.025,13.982,1.643,12,1.64z M12,18.64
	c-0.353,0-0.64-0.287-0.64-0.64s0.287-0.64,0.64-0.64s0.64,0.287,0.64,0.64S12.353,18.64,12,18.64z M14.64,13.64h-2.28V7.305
	c0.575-0.159,1-0.681,1-1.305c0-0.75-0.61-1.36-1.36-1.36S10.64,5.25,10.64,6c0,0.625,0.425,1.146,1,1.305v6.335H10
	c-0.001,0-0.001,0-0.002,0C9.2,13.64,8.641,14.199,8.64,15v0.64H6.305c-0.159-0.575-0.681-1-1.305-1c-0.75,0-1.36,0.61-1.36,1.36
	S4.25,17.36,5,17.36c0.625,0,1.147-0.426,1.305-1H8.64v5.834c-0.575,0.159-1,0.681-1,1.306c0,0.75,0.61,1.36,1.36,1.36
	s1.36-0.61,1.36-1.36c0-0.625-0.425-1.147-1-1.306V15c0.001-0.401,0.239-0.641,0.639-0.641H10h4.64v11.639
	c-0.003,1.456-0.908,2.46-2.28,2.61v-9.303c0.575-0.159,1-0.681,1-1.306c0-0.75-0.61-1.36-1.36-1.36s-1.36,0.61-1.36,1.36
	c0,0.625,0.425,1.147,1,1.306v9.31c-1.103-0.114-1.951-0.742-2.3-1.735C9.289,26.736,9.153,26.64,9,26.64H8.276
	c-2.036-0.003-4.23-1.413-4.228-3.686c0.002-0.966,0.714-2.209,1.206-2.699c0.092-0.091,0.127-0.225,0.093-0.35
	s-0.132-0.222-0.257-0.254c-2.199-0.566-3.733-2.273-3.73-4.151c0.003-1.876,1.522-3.573,3.695-4.141h2.64
	c0.159,0.575,0.681,1,1.305,1c0.75,0,1.36-0.61,1.36-1.36S9.75,9.64,9,9.64c-0.625,0-1.146,0.425-1.305,1H5.162
	C4.685,10.099,4.07,8.949,4.071,8.022C4.073,7.006,4.52,6.072,5.332,5.39c0.779-0.655,1.849-1.03,2.936-1.03
	c0.002,0,0.005,0,0.008,0H9c0.152,0,0.288-0.096,0.339-0.239c0.392-1.103,1.384-1.761,2.655-1.761c0.002,0,0.003,0,0.005,0
	C13.582,2.363,14.643,3.423,14.64,5V13.64z M12,6.64c-0.353,0-0.64-0.287-0.64-0.64S11.647,5.36,12,5.36S12.64,5.647,12.64,6
	S12.353,6.64,12,6.64z M9,22.86c0.353,0,0.64,0.287,0.64,0.64S9.353,24.14,9,24.14s-0.64-0.287-0.64-0.64S8.647,22.86,9,22.86z
	 M5.64,16c0,0.353-0.287,0.64-0.64,0.64S4.36,16.353,4.36,16S4.647,15.36,5,15.36S5.64,15.647,5.64,16z M8.36,11
	c0-0.353,0.287-0.64,0.64-0.64S9.64,10.647,9.64,11S9.353,11.64,9,11.64S8.36,11.353,8.36,11z M31.36,15.5
	c0.002-2.046-1.508-3.909-3.734-4.687c0.507-0.692,1.044-1.788,1.046-2.767c0.002-1.231-0.54-2.365-1.526-3.193
	c-0.917-0.77-2.163-1.212-3.421-1.214h-0.48c-0.544-1.238-1.764-1.998-3.243-2c-0.003,0-0.005,0-0.008,0
	c-0.972,0-1.808,0.323-2.418,0.933C16.965,3.185,16.642,4.023,16.64,5v20.999c-0.003,1.976,1.378,3.357,3.359,3.361
	c0.003,0,0.005,0,0.007,0c1.473,0,2.69-0.76,3.238-2h0.479c0.004,0,0.007,0,0.01,0c1.271,0,2.478-0.426,3.398-1.199
	c0.977-0.82,1.515-1.95,1.517-3.182c0.001-0.995-0.526-2.098-1.025-2.791C29.847,19.418,31.357,17.555,31.36,15.5z M20,12.36
	c0.353,0,0.64,0.287,0.64,0.64s-0.287,0.64-0.64,0.64s-0.64-0.287-0.64-0.64S19.647,12.36,20,12.36z M26.946,19.64h-2.641
	c-0.159-0.575-0.681-1-1.306-1c-0.75,0-1.36,0.61-1.36,1.36s0.61,1.36,1.36,1.36c0.624,0,1.147-0.425,1.306-1h2.533
	c0.476,0.541,1.091,1.691,1.089,2.618c-0.001,1.016-0.448,1.95-1.26,2.631c-0.781,0.657-1.865,1.01-2.943,1.03H23
	c-0.152,0-0.288,0.097-0.339,0.239c-0.393,1.104-1.385,1.761-2.655,1.761c-0.002,0-0.004,0-0.005,0
	c-0.781-0.001-1.445-0.252-1.919-0.725C17.608,27.441,17.358,26.78,17.36,26v-8.64h2.279v6.334c-0.575,0.159-1,0.681-1,1.306
	c0,0.75,0.61,1.36,1.36,1.36s1.36-0.61,1.36-1.36c0-0.624-0.425-1.147-1-1.306V17.36h1.639c0.001,0,0.002,0,0.003,0
	c0.799,0,1.356-0.559,1.358-1.36v-0.64h2.334c0.159,0.575,0.681,1,1.306,1c0.75,0,1.36-0.61,1.36-1.36s-0.61-1.36-1.36-1.36
	c-0.625,0-1.147,0.425-1.306,1H23.36V8.805c0.575-0.159,1-0.681,1-1.305c0-0.75-0.61-1.36-1.36-1.36s-1.36,0.61-1.36,1.36
	c0,0.624,0.425,1.146,1,1.305V16c0,0.401-0.238,0.641-0.638,0.641c-0.001,0-0.001,0-0.002,0h-4.64V5
	c0.001-0.781,0.252-1.445,0.725-1.918c0.397-0.398,0.933-0.627,1.555-0.693v9.305c-0.575,0.159-1,0.681-1,1.305
	c0,0.75,0.61,1.36,1.36,1.36s1.36-0.61,1.36-1.36c0-0.624-0.425-1.146-1-1.305v-9.31c1.103,0.115,1.951,0.742,2.3,1.736
	c0.051,0.144,0.188,0.24,0.34,0.24h0.724c1.092,0.001,2.17,0.383,2.959,1.045c0.82,0.689,1.271,1.626,1.269,2.641
	c-0.001,0.966-0.714,2.209-1.205,2.699c-0.092,0.091-0.127,0.225-0.094,0.35c0.034,0.125,0.133,0.222,0.258,0.254
	c2.198,0.567,3.732,2.274,3.729,4.151C30.638,17.374,29.12,19.07,26.946,19.64z M23.64,20c0,0.353-0.287,0.64-0.64,0.64
	s-0.64-0.287-0.64-0.64s0.287-0.64,0.64-0.64S23.64,19.647,23.64,20z M20,24.36c0.353,0,0.64,0.287,0.64,0.64s-0.287,0.64-0.64,0.64
	s-0.64-0.287-0.64-0.64S19.647,24.36,20,24.36z M23,8.14c-0.353,0-0.64-0.287-0.64-0.64S22.647,6.86,23,6.86s0.64,0.287,0.64,0.64
	S23.353,8.14,23,8.14z M26.36,15c0-0.353,0.287-0.64,0.64-0.64s0.64,0.287,0.64,0.64s-0.287,0.64-0.64,0.64S26.36,15.353,26.36,15z`},null,-1),g0=D("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),v0=[p0,g0];function b0(e,t){return Ge(),rt("svg",m0,v0)}const y0=_t(h0,[["render",b0]]),_0={},A0={height:"32",width:"32",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},w0=D("path",{id:"sunny_1_",d:`M16,29.36c-0.199,0-0.36-0.161-0.36-0.36v-3c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v3
	C16.36,29.199,16.199,29.36,16,29.36z M25.192,25.553c-0.092,0-0.185-0.035-0.255-0.105l-2.121-2.121
	c-0.141-0.141-0.141-0.369,0-0.51s0.369-0.141,0.51,0l2.121,2.121c0.141,0.141,0.141,0.369,0,0.51
	C25.377,25.518,25.284,25.553,25.192,25.553z M6.808,25.553c-0.092,0-0.184-0.035-0.254-0.105c-0.141-0.141-0.141-0.369,0-0.51
	l2.121-2.121c0.141-0.141,0.368-0.141,0.509,0s0.141,0.369,0,0.51l-2.121,2.121C6.992,25.518,6.9,25.553,6.808,25.553z M16,23.36
	c-4.058,0-7.36-3.302-7.36-7.36S11.942,8.64,16,8.64c4.059,0,7.36,3.302,7.36,7.36C23.36,20.059,20.059,23.36,16,23.36z M16,9.36
	c-3.661,0-6.64,2.979-6.64,6.64s2.979,6.64,6.64,6.64s6.64-2.979,6.64-6.64S19.661,9.36,16,9.36z M29,16.36h-3
	c-0.199,0-0.36-0.161-0.36-0.36s0.161-0.36,0.36-0.36h3c0.199,0,0.36,0.161,0.36,0.36S29.199,16.36,29,16.36z M6,16.36H3
	c-0.199,0-0.36-0.161-0.36-0.36S2.801,15.64,3,15.64h3c0.199,0,0.36,0.161,0.36,0.36S6.199,16.36,6,16.36z M23.071,9.289
	c-0.092,0-0.185-0.035-0.255-0.105c-0.141-0.141-0.141-0.368,0-0.509l2.121-2.121c0.141-0.141,0.369-0.141,0.51,0
	s0.141,0.368,0,0.509l-2.121,2.121C23.256,9.253,23.163,9.289,23.071,9.289z M8.929,9.289c-0.092,0-0.184-0.035-0.254-0.105
	L6.553,7.062c-0.141-0.141-0.141-0.368,0-0.509s0.368-0.141,0.509,0l2.121,2.121c0.141,0.141,0.141,0.368,0,0.509
	C9.113,9.253,9.021,9.289,8.929,9.289z M16,6.36c-0.199,0-0.36-0.161-0.36-0.36V3c0-0.199,0.161-0.36,0.36-0.36S16.36,2.801,16.36,3
	v3C16.36,6.199,16.199,6.36,16,6.36z`},null,-1),x0=D("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),E0=[w0,x0];function S0(e,t){return Ge(),rt("svg",A0,E0)}const C0=_t(_0,[["render",S0]]),k0={},P0={height:"32",width:"32",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},M0=D("path",{id:"cloud-pak--for-data_1_",d:`M9.5,10c0,0.276-0.224,0.5-0.5,0.5S8.5,10.276,8.5,10S8.724,9.5,9,9.5S9.5,9.724,9.5,10z
	 M17,8.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S17.276,8.5,17,8.5z M12,7.5c-0.276,0-0.5,0.224-0.5,0.5
	s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S12.276,7.5,12,7.5z M8,19.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5
	S8.276,19.5,8,19.5z M21,11.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S21.276,11.5,21,11.5z M11,16.5
	c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S11.276,16.5,11,16.5z M25,19.5c-0.276,0-0.5,0.224-0.5,0.5
	s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S25.276,19.5,25,19.5z M16,25.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5
	c0.276,0,0.5-0.224,0.5-0.5S16.276,25.5,16,25.5z M22,21.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5
	S22.276,21.5,22,21.5z M22,16.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S22.276,16.5,22,16.5z
	 M16.171,31.317l13-7c0.116-0.063,0.189-0.185,0.189-0.317V8c0-0.132-0.073-0.254-0.189-0.317l-13-7
	c-0.107-0.058-0.234-0.058-0.342,0l-13,7C2.713,7.746,2.64,7.868,2.64,8v16c0,0.133,0.073,0.254,0.189,0.317l13,7
	c0.054,0.028,0.112,0.043,0.171,0.043C16.059,31.36,16.117,31.346,16.171,31.317z M3.36,8.215L16,1.409l12.64,6.806v15.57L16,30.591
	L3.36,23.785V8.215z M25.36,14c0,0.75-0.61,1.36-1.36,1.36c-0.507,0-0.945-0.282-1.179-0.694l-5.055,1.264
	c0.001,0.024,0.008,0.046,0.008,0.071c0,0.359-0.109,0.692-0.293,0.972l0.851,0.85C18.53,17.709,18.756,17.64,19,17.64
	c0.75,0,1.36,0.61,1.36,1.36s-0.61,1.36-1.36,1.36s-1.36-0.61-1.36-1.36c0-0.244,0.07-0.47,0.183-0.668l-0.85-0.851
	c-0.28,0.184-0.613,0.293-0.972,0.293c-0.191,0-0.372-0.038-0.545-0.095l-2.492,4.361c0.245,0.246,0.397,0.585,0.397,0.959
	c0,0.75-0.61,1.36-1.36,1.36s-1.36-0.61-1.36-1.36s0.61-1.36,1.36-1.36c0.117,0,0.228,0.019,0.336,0.047l2.494-4.364
	c-0.367-0.325-0.603-0.795-0.603-1.323c0-0.024,0.006-0.047,0.007-0.07L9.18,14.665C8.945,15.078,8.507,15.36,8,15.36
	c-0.75,0-1.36-0.61-1.36-1.36S7.25,12.64,8,12.64c0.739,0,1.339,0.593,1.357,1.328l5.052,1.263c0.097-0.2,0.24-0.368,0.4-0.518
	l-1.445-2.409C13.247,12.337,13.127,12.36,13,12.36c-0.75,0-1.36-0.61-1.36-1.36S12.25,9.64,13,9.64s1.36,0.61,1.36,1.36
	c0,0.363-0.145,0.692-0.378,0.936l1.439,2.398c0.183-0.065,0.375-0.109,0.58-0.109c0.191,0,0.372,0.038,0.545,0.095l2.492-4.361
	C18.792,9.713,18.64,9.374,18.64,9c0-0.75,0.61-1.36,1.36-1.36S21.36,8.25,21.36,9s-0.61,1.36-1.36,1.36
	c-0.117,0-0.228-0.019-0.336-0.047l-2.493,4.365c0.174,0.155,0.316,0.343,0.421,0.554l5.051-1.263
	C22.66,13.233,23.261,12.64,24,12.64C24.75,12.64,25.36,13.25,25.36,14z M19.36,9c0,0.353,0.287,0.64,0.64,0.64S20.64,9.353,20.64,9
	S20.353,8.36,20,8.36S19.36,8.647,19.36,9z M13.64,11c0-0.353-0.287-0.64-0.64-0.64s-0.64,0.287-0.64,0.64s0.287,0.64,0.64,0.64
	S13.64,11.353,13.64,11z M8.64,14c0-0.353-0.287-0.64-0.64-0.64S7.36,13.647,7.36,14S7.647,14.64,8,14.64
	C8.353,14.64,8.64,14.353,8.64,14z M12.64,23c0-0.353-0.287-0.64-0.64-0.64s-0.64,0.287-0.64,0.64s0.287,0.64,0.64,0.64
	S12.64,23.353,12.64,23z M18.36,19c0,0.353,0.287,0.64,0.64,0.64s0.64-0.287,0.64-0.64s-0.287-0.64-0.64-0.64S18.36,18.647,18.36,19
	z M17.054,16c0-0.581-0.473-1.054-1.054-1.054S14.946,15.419,14.946,16c0,0.581,0.473,1.054,1.054,1.054
	C16.581,17.054,17.054,16.581,17.054,16z M24.64,14c0-0.353-0.287-0.64-0.64-0.64s-0.64,0.287-0.64,0.64s0.287,0.64,0.64,0.64
	S24.64,14.353,24.64,14z`},null,-1),O0=D("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),R0=[M0,O0];function T0(e,t){return Ge(),rt("svg",P0,R0)}const I0=_t(k0,[["render",T0]]),ne=e=>(Li("data-v-2703dc18"),e=e(),Ni(),e),z0=ne(()=>D("div",{class:"tagline"},"Computational Linguist • Machine Learning Engineer • Data Analyst • Community Builder",-1)),L0=ne(()=>D("a",{href:"https://linguistics.osu.edu/people/court.22",target:"_blank",rel:"noopener"},"PhD Candidate",-1)),N0=ne(()=>D("a",{href:"https://linguistics.osu.edu/",target:"_blank",rel:"noopener"},"Linguistics Department",-1)),$0=ne(()=>D("a",{href:"https://linguistics.osu.edu/",target:"_blank",rel:"noopener"},"The Ohio State University.",-1)),H0=ne(()=>D("a",{href:"https://linguistics.osu.edu/people/elsner.14",target:"_blank",rel:"noopener"},[D("br"),ee("Micha Elsner")],-1)),F0=ne(()=>D("a",{href:"https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf",target:"_blank",rel:"noopener"},"Weaver",-1)),j0=ne(()=>D("a",{href:"https://create.nyu.edu/cogscidiy/",target:"_blank",rel:"noopener"},"fostering",-1)),D0=ne(()=>D("a",{href:"https://docs.google.com/presentation/d/1Y0awbZV4GOCnW-fH4Ls7q_gpGkb5QUaKW40CBcKTTE8/edit?slide=id.p#slide=id.p",target:"_blank",rel:"noopener"},"inclusive AI",-1)),B0=ne(()=>D("a",{href:"https://docs.google.com/presentation/d/1IZ889fnGPOsdOHee9eArs8hfRm19TX5HDsNPGn7Tebc/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310",target:"_blank",rel:"noopener"},"development",-1)),V0=ne(()=>D("a",{href:"https://aclanthology.org/2020.coling-main.258/",target:"_blank",rel:"noopener"},"computational morphologist,",-1)),U0=ne(()=>D("a",{href:"https://aclanthology.org/2022.sigmorphon-1.22/",target:"_blank",rel:"noopener"},"models",-1)),K0=ne(()=>D("a",{href:"https://aclanthology.org/2023.scil-1.4.pdf",target:"_blank",rel:"noopener"},"languages in contact",-1)),W0=ne(()=>D("a",{href:"https://docs.google.com/presentation/d/1iHJTTw4V7vCU4mJeAJWkUTKetmbyZOQHkHvWieAblMA/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310",target:"_blank",rel:"noopener"},"low-resource domains",-1)),Y0=ne(()=>D("a",{href:"https://aclanthology.org/2024.wmt-1.125/",target:"_blank",rel:"noopener"},"responsible machine translation",-1)),G0=ne(()=>D("a",{href:"https://aclanthology.org/2022.computel-1.20/",target:"_blank",rel:"noopener"},"collaborative data annotation.",-1)),q0=ne(()=>D("br",null,null,-1)),X0=ne(()=>D("a",{href:"https://scholar.google.com/citations?user=zi74VNEAAAAJ&hl",target:"_blank",rel:"noopener"},"Google Scholar",-1)),Q0=ne(()=>D("a",{href:"https://www.linkedin.com/in/sarakc/",target:"_blank",rel:"noopener"},"LinkedIn",-1)),J0=ne(()=>D("br",null,null,-1)),Z0=ne(()=>D("a",{href:"src/assets/cv.pdf"},"resume | C.V.",-1)),ed=ne(()=>D("img",{alt:"osu",class:"icon",src:e0},null,-1)),td=ne(()=>D("a",{href:"https://linguistics.osu.edu/people/court.22",target:"_blank",rel:"noopener"},"Sara Court",-1)),nd=ne(()=>D("br",null,null,-1)),rd=ne(()=>D("img",{alt:"linkedin",class:"icon",src:t0},null,-1)),id=ne(()=>D("a",{href:"https://www.linkedin.com/in/sarakc/",target:"_blank",rel:"noopener"},"LinkedIn",-1)),ad=ne(()=>D("br",null,null,-1)),sd=ne(()=>D("a",{href:"mailto:court.22@osu.edu"},"court DOT 22 AT osu DOT edu",-1)),od={__name:"TheWelcome",setup(e){return(t,n)=>(Ge(),rt(Me,null,[le(Hn,null,{icon:Pe(()=>[le(C0)]),heading:Pe(()=>[ee("About")]),default:Pe(()=>[z0,ee(" I'm currently a "),L0,ee("in the "),N0,ee("at"),$0,H0,ee("is my advisor. I'm a"),F0,ee("to my core and committed to"),j0,D0,B0,ee(". ")]),_:1}),le(Hn,null,{icon:Pe(()=>[le(y0)]),heading:Pe(()=>[ee("Research")]),default:Pe(()=>[ee(" I'm a"),V0,ee("among other things. I build and analyze"),U0,ee("for typologically diverse"),K0,ee("and other "),W0,ee("with applications in"),Y0,ee("and tools for"),G0,q0]),_:1}),le(Hn,null,{icon:Pe(()=>[le(d0)]),heading:Pe(()=>[ee("Resume")]),default:Pe(()=>[ee(" Check out my"),X0,ee("page and"),Q0,ee("profile to learn more about the work that I do. "),J0,ee("Feel free to reach out via email to request an up-to-date "),Z0,ee("in .pdf format. ")]),_:1}),le(Hn,null,{icon:Pe(()=>[le(I0)]),heading:Pe(()=>[ee("Contact")]),default:Pe(()=>[ed,ee(),td,nd,rd,ee(),id,ad,ee(" ✉️ "),sd]),_:1})],64))}},ld=_t(od,[["__scopeId","data-v-2703dc18"]]),cd={__name:"HomeView",setup(e){return(t,n)=>(Ge(),rt("main",null,[le(ld)]))}},fd=Fu({history:nu("/"),routes:[{path:"/",name:"home",component:cd},{path:"/research",name:"research",component:()=>$n(()=>import("./ResearchView-JB0pyAlx.js"),__vite__mapDeps([0,1]))},{path:"/CV",name:"CV",component:()=>$n(()=>import("./CVView-LM76SQ50.js"),__vite__mapDeps([2,1]))},{path:"/contact",name:"contact",component:()=>$n(()=>import("./ContactView-MynZhFUZ.js"),__vite__mapDeps([3,1]))},{path:"/projects",name:"projects",component:()=>$n(()=>import("./ProjectsView-RirX3qW1.js"),__vite__mapDeps([4,1]))}]});function ns(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ns(Object(n),!0).forEach(function(r){ue(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ns(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function cr(e){"@babel/helpers - typeof";return cr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},cr(e)}function ud(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function rs(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function dd(e,t,n){return t&&rs(e.prototype,t),n&&rs(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function ue(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ui(e,t){return md(e)||gd(e,t)||Bo(e,t)||bd()}function kn(e){return hd(e)||pd(e)||Bo(e)||vd()}function hd(e){if(Array.isArray(e))return li(e)}function md(e){if(Array.isArray(e))return e}function pd(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function gd(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],i=!0,a=!1,s,o;try{for(n=n.call(e);!(i=(s=n.next()).done)&&(r.push(s.value),!(t&&r.length===t));i=!0);}catch(l){a=!0,o=l}finally{try{!i&&n.return!=null&&n.return()}finally{if(a)throw o}}return r}}function Bo(e,t){if(e){if(typeof e=="string")return li(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return li(e,t)}}function li(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function vd(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function bd(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var is=function(){},Ki={},Vo={},Uo=null,Ko={mark:is,measure:is};try{typeof window<"u"&&(Ki=window),typeof document<"u"&&(Vo=document),typeof MutationObserver<"u"&&(Uo=MutationObserver),typeof performance<"u"&&(Ko=performance)}catch{}var yd=Ki.navigator||{},as=yd.userAgent,ss=as===void 0?"":as,vt=Ki,ie=Vo,os=Uo,Fn=Ko;vt.document;var it=!!ie.documentElement&&!!ie.head&&typeof ie.addEventListener=="function"&&typeof ie.createElement=="function",Wo=~ss.indexOf("MSIE")||~ss.indexOf("Trident/"),jn,Dn,Bn,Vn,Un,Ze="___FONT_AWESOME___",ci=16,Yo="fa",Go="svg-inline--fa",Ot="data-fa-i2svg",fi="data-fa-pseudo-element",_d="data-fa-pseudo-element-pending",Wi="data-prefix",Yi="data-icon",ls="fontawesome-i2svg",Ad="async",wd=["HTML","HEAD","STYLE","SCRIPT"],qo=function(){try{return!0}catch{return!1}}(),re="classic",fe="sharp",Gi=[re,fe];function Pn(e){return new Proxy(e,{get:function(n,r){return r in n?n[r]:n[re]}})}var An=Pn((jn={},ue(jn,re,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),ue(jn,fe,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),jn)),wn=Pn((Dn={},ue(Dn,re,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),ue(Dn,fe,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),Dn)),xn=Pn((Bn={},ue(Bn,re,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),ue(Bn,fe,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),Bn)),xd=Pn((Vn={},ue(Vn,re,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),ue(Vn,fe,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),Vn)),Ed=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,Xo="fa-layers-text",Sd=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Cd=Pn((Un={},ue(Un,re,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),ue(Un,fe,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),Un)),Qo=[1,2,3,4,5,6,7,8,9,10],kd=Qo.concat([11,12,13,14,15,16,17,18,19,20]),Pd=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],St={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},En=new Set;Object.keys(wn[re]).map(En.add.bind(En));Object.keys(wn[fe]).map(En.add.bind(En));var Md=[].concat(Gi,kn(En),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",St.GROUP,St.SWAP_OPACITY,St.PRIMARY,St.SECONDARY]).concat(Qo.map(function(e){return"".concat(e,"x")})).concat(kd.map(function(e){return"w-".concat(e)})),mn=vt.FontAwesomeConfig||{};function Od(e){var t=ie.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Rd(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(ie&&typeof ie.querySelector=="function"){var Td=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Td.forEach(function(e){var t=Ui(e,2),n=t[0],r=t[1],i=Rd(Od(n));i!=null&&(mn[r]=i)})}var Jo={styleDefault:"solid",familyDefault:"classic",cssPrefix:Yo,replacementClass:Go,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};mn.familyPrefix&&(mn.cssPrefix=mn.familyPrefix);var Jt=O(O({},Jo),mn);Jt.autoReplaceSvg||(Jt.observeMutations=!1);var L={};Object.keys(Jo).forEach(function(e){Object.defineProperty(L,e,{enumerable:!0,set:function(n){Jt[e]=n,pn.forEach(function(r){return r(L)})},get:function(){return Jt[e]}})});Object.defineProperty(L,"familyPrefix",{enumerable:!0,set:function(t){Jt.cssPrefix=t,pn.forEach(function(n){return n(L)})},get:function(){return Jt.cssPrefix}});vt.FontAwesomeConfig=L;var pn=[];function Id(e){return pn.push(e),function(){pn.splice(pn.indexOf(e),1)}}var ct=ci,We={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function zd(e){if(!(!e||!it)){var t=ie.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=ie.head.childNodes,r=null,i=n.length-1;i>-1;i--){var a=n[i],s=(a.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=a)}return ie.head.insertBefore(t,r),e}}var Ld="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Sn(){for(var e=12,t="";e-- >0;)t+=Ld[Math.random()*62|0];return t}function tn(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function qi(e){return e.classList?tn(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Zo(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Nd(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(Zo(e[n]),'" ')},"").trim()}function Cr(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function Xi(e){return e.size!==We.size||e.x!==We.x||e.y!==We.y||e.rotate!==We.rotate||e.flipX||e.flipY}function $d(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,i={transform:"translate(".concat(n/2," 256)")},a="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),o="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(a," ").concat(s," ").concat(o)},f={transform:"translate(".concat(r/2*-1," -256)")};return{outer:i,inner:l,path:f}}function Hd(e){var t=e.transform,n=e.width,r=n===void 0?ci:n,i=e.height,a=i===void 0?ci:i,s=e.startCentered,o=s===void 0?!1:s,l="";return o&&Wo?l+="translate(".concat(t.x/ct-r/2,"em, ").concat(t.y/ct-a/2,"em) "):o?l+="translate(calc(-50% + ".concat(t.x/ct,"em), calc(-50% + ").concat(t.y/ct,"em)) "):l+="translate(".concat(t.x/ct,"em, ").concat(t.y/ct,"em) "),l+="scale(".concat(t.size/ct*(t.flipX?-1:1),", ").concat(t.size/ct*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var Fd=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function el(){var e=Yo,t=Go,n=L.cssPrefix,r=L.replacementClass,i=Fd;if(n!==e||r!==t){var a=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),o=new RegExp("\\.".concat(t),"g");i=i.replace(a,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(r))}return i}var cs=!1;function Vr(){L.autoAddCss&&!cs&&(zd(el()),cs=!0)}var jd={mixout:function(){return{dom:{css:el,insertCss:Vr}}},hooks:function(){return{beforeDOMElementCreation:function(){Vr()},beforeI2svg:function(){Vr()}}}},et=vt||{};et[Ze]||(et[Ze]={});et[Ze].styles||(et[Ze].styles={});et[Ze].hooks||(et[Ze].hooks={});et[Ze].shims||(et[Ze].shims=[]);var $e=et[Ze],tl=[],Dd=function e(){ie.removeEventListener("DOMContentLoaded",e),fr=1,tl.map(function(t){return t()})},fr=!1;it&&(fr=(ie.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(ie.readyState),fr||ie.addEventListener("DOMContentLoaded",Dd));function Bd(e){it&&(fr?setTimeout(e,0):tl.push(e))}function Mn(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,i=e.children,a=i===void 0?[]:i;return typeof e=="string"?Zo(e):"<".concat(t," ").concat(Nd(r),">").concat(a.map(Mn).join(""),"</").concat(t,">")}function fs(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Vd=function(t,n){return function(r,i,a,s){return t.call(n,r,i,a,s)}},Ur=function(t,n,r,i){var a=Object.keys(t),s=a.length,o=i!==void 0?Vd(n,i):n,l,f,c;for(r===void 0?(l=1,c=t[a[0]]):(l=0,c=r);l<s;l++)f=a[l],c=o(c,t[f],f,t);return c};function Ud(e){for(var t=[],n=0,r=e.length;n<r;){var i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){var a=e.charCodeAt(n++);(a&64512)==56320?t.push(((i&1023)<<10)+(a&1023)+65536):(t.push(i),n--)}else t.push(i)}return t}function ui(e){var t=Ud(e);return t.length===1?t[0].toString(16):null}function Kd(e,t){var n=e.length,r=e.charCodeAt(t),i;return r>=55296&&r<=56319&&n>t+1&&(i=e.charCodeAt(t+1),i>=56320&&i<=57343)?(r-55296)*1024+i-56320+65536:r}function us(e){return Object.keys(e).reduce(function(t,n){var r=e[n],i=!!r.icon;return i?t[r.iconName]=r.icon:t[n]=r,t},{})}function di(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,i=r===void 0?!1:r,a=us(t);typeof $e.hooks.addPack=="function"&&!i?$e.hooks.addPack(e,us(t)):$e.styles[e]=O(O({},$e.styles[e]||{}),a),e==="fas"&&di("fa",t)}var Kn,Wn,Yn,jt=$e.styles,Wd=$e.shims,Yd=(Kn={},ue(Kn,re,Object.values(xn[re])),ue(Kn,fe,Object.values(xn[fe])),Kn),Qi=null,nl={},rl={},il={},al={},sl={},Gd=(Wn={},ue(Wn,re,Object.keys(An[re])),ue(Wn,fe,Object.keys(An[fe])),Wn);function qd(e){return~Md.indexOf(e)}function Xd(e,t){var n=t.split("-"),r=n[0],i=n.slice(1).join("-");return r===e&&i!==""&&!qd(i)?i:null}var ol=function(){var t=function(a){return Ur(jt,function(s,o,l){return s[l]=Ur(o,a,{}),s},{})};nl=t(function(i,a,s){if(a[3]&&(i[a[3]]=s),a[2]){var o=a[2].filter(function(l){return typeof l=="number"});o.forEach(function(l){i[l.toString(16)]=s})}return i}),rl=t(function(i,a,s){if(i[s]=s,a[2]){var o=a[2].filter(function(l){return typeof l=="string"});o.forEach(function(l){i[l]=s})}return i}),sl=t(function(i,a,s){var o=a[2];return i[s]=s,o.forEach(function(l){i[l]=s}),i});var n="far"in jt||L.autoFetchSvg,r=Ur(Wd,function(i,a){var s=a[0],o=a[1],l=a[2];return o==="far"&&!n&&(o="fas"),typeof s=="string"&&(i.names[s]={prefix:o,iconName:l}),typeof s=="number"&&(i.unicodes[s.toString(16)]={prefix:o,iconName:l}),i},{names:{},unicodes:{}});il=r.names,al=r.unicodes,Qi=kr(L.styleDefault,{family:L.familyDefault})};Id(function(e){Qi=kr(e.styleDefault,{family:L.familyDefault})});ol();function Ji(e,t){return(nl[e]||{})[t]}function Qd(e,t){return(rl[e]||{})[t]}function Ct(e,t){return(sl[e]||{})[t]}function ll(e){return il[e]||{prefix:null,iconName:null}}function Jd(e){var t=al[e],n=Ji("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function bt(){return Qi}var Zi=function(){return{prefix:null,iconName:null,rest:[]}};function kr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,r=n===void 0?re:n,i=An[r][e],a=wn[r][e]||wn[r][i],s=e in $e.styles?e:null;return a||s||null}var ds=(Yn={},ue(Yn,re,Object.keys(xn[re])),ue(Yn,fe,Object.keys(xn[fe])),Yn);function Pr(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,i=r===void 0?!1:r,a=(t={},ue(t,re,"".concat(L.cssPrefix,"-").concat(re)),ue(t,fe,"".concat(L.cssPrefix,"-").concat(fe)),t),s=null,o=re;(e.includes(a[re])||e.some(function(f){return ds[re].includes(f)}))&&(o=re),(e.includes(a[fe])||e.some(function(f){return ds[fe].includes(f)}))&&(o=fe);var l=e.reduce(function(f,c){var d=Xd(L.cssPrefix,c);if(jt[c]?(c=Yd[o].includes(c)?xd[o][c]:c,s=c,f.prefix=c):Gd[o].indexOf(c)>-1?(s=c,f.prefix=kr(c,{family:o})):d?f.iconName=d:c!==L.replacementClass&&c!==a[re]&&c!==a[fe]&&f.rest.push(c),!i&&f.prefix&&f.iconName){var m=s==="fa"?ll(f.iconName):{},g=Ct(f.prefix,f.iconName);m.prefix&&(s=null),f.iconName=m.iconName||g||f.iconName,f.prefix=m.prefix||f.prefix,f.prefix==="far"&&!jt.far&&jt.fas&&!L.autoFetchSvg&&(f.prefix="fas")}return f},Zi());return(e.includes("fa-brands")||e.includes("fab"))&&(l.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(l.prefix="fad"),!l.prefix&&o===fe&&(jt.fass||L.autoFetchSvg)&&(l.prefix="fass",l.iconName=Ct(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||s==="fa")&&(l.prefix=bt()||"fas"),l}var Zd=function(){function e(){ud(this,e),this.definitions={}}return dd(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];var s=i.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(o){n.definitions[o]=O(O({},n.definitions[o]||{}),s[o]),di(o,s[o]);var l=xn[re][o];l&&di(l,s[o]),ol()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var i=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(i).map(function(a){var s=i[a],o=s.prefix,l=s.iconName,f=s.icon,c=f[2];n[o]||(n[o]={}),c.length>0&&c.forEach(function(d){typeof d=="string"&&(n[o][d]=f)}),n[o][l]=f}),n}}]),e}(),hs=[],Dt={},Wt={},e1=Object.keys(Wt);function t1(e,t){var n=t.mixoutsTo;return hs=e,Dt={},Object.keys(Wt).forEach(function(r){e1.indexOf(r)===-1&&delete Wt[r]}),hs.forEach(function(r){var i=r.mixout?r.mixout():{};if(Object.keys(i).forEach(function(s){typeof i[s]=="function"&&(n[s]=i[s]),cr(i[s])==="object"&&Object.keys(i[s]).forEach(function(o){n[s]||(n[s]={}),n[s][o]=i[s][o]})}),r.hooks){var a=r.hooks();Object.keys(a).forEach(function(s){Dt[s]||(Dt[s]=[]),Dt[s].push(a[s])})}r.provides&&r.provides(Wt)}),n}function hi(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];var a=Dt[e]||[];return a.forEach(function(s){t=s.apply(null,[t].concat(r))}),t}function Rt(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=Dt[e]||[];i.forEach(function(a){a.apply(null,n)})}function tt(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Wt[e]?Wt[e].apply(null,t):void 0}function mi(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||bt();if(t)return t=Ct(n,t)||t,fs(cl.definitions,n,t)||fs($e.styles,n,t)}var cl=new Zd,n1=function(){L.autoReplaceSvg=!1,L.observeMutations=!1,Rt("noAuto")},r1={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return it?(Rt("beforeI2svg",t),tt("pseudoElements2svg",t),tt("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;L.autoReplaceSvg===!1&&(L.autoReplaceSvg=!0),L.observeMutations=!0,Bd(function(){a1({autoReplaceSvgRoot:n}),Rt("watch",t)})}},i1={icon:function(t){if(t===null)return null;if(cr(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Ct(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=kr(t[0]);return{prefix:r,iconName:Ct(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(L.cssPrefix,"-"))>-1||t.match(Ed))){var i=Pr(t.split(" "),{skipLookups:!0});return{prefix:i.prefix||bt(),iconName:Ct(i.prefix,i.iconName)||i.iconName}}if(typeof t=="string"){var a=bt();return{prefix:a,iconName:Ct(a,t)||t}}}},Oe={noAuto:n1,config:L,dom:r1,parse:i1,library:cl,findIconDefinition:mi,toHtml:Mn},a1=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?ie:n;(Object.keys($e.styles).length>0||L.autoFetchSvg)&&it&&L.autoReplaceSvg&&Oe.dom.i2svg({node:r})};function Mr(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return Mn(r)})}}),Object.defineProperty(e,"node",{get:function(){if(it){var r=ie.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function s1(e){var t=e.children,n=e.main,r=e.mask,i=e.attributes,a=e.styles,s=e.transform;if(Xi(s)&&n.found&&!r.found){var o=n.width,l=n.height,f={x:o/l/2,y:.5};i.style=Cr(O(O({},a),{},{"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")}))}return[{tag:"svg",attributes:i,children:t}]}function o1(e){var t=e.prefix,n=e.iconName,r=e.children,i=e.attributes,a=e.symbol,s=a===!0?"".concat(t,"-").concat(L.cssPrefix,"-").concat(n):a;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:O(O({},i),{},{id:s}),children:r}]}]}function ea(e){var t=e.icons,n=t.main,r=t.mask,i=e.prefix,a=e.iconName,s=e.transform,o=e.symbol,l=e.title,f=e.maskId,c=e.titleId,d=e.extra,m=e.watchable,g=m===void 0?!1:m,C=r.found?r:n,I=C.width,z=C.height,y=i==="fak",A=[L.replacementClass,a?"".concat(L.cssPrefix,"-").concat(a):""].filter(function(_e){return d.classes.indexOf(_e)===-1}).filter(function(_e){return _e!==""||!!_e}).concat(d.classes).join(" "),M={children:[],attributes:O(O({},d.attributes),{},{"data-prefix":i,"data-icon":a,class:A,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(I," ").concat(z)})},F=y&&!~d.classes.indexOf("fa-fw")?{width:"".concat(I/z*16*.0625,"em")}:{};g&&(M.attributes[Ot]=""),l&&(M.children.push({tag:"title",attributes:{id:M.attributes["aria-labelledby"]||"title-".concat(c||Sn())},children:[l]}),delete M.attributes.title);var K=O(O({},M),{},{prefix:i,iconName:a,main:n,mask:r,maskId:f,transform:s,symbol:o,styles:O(O({},F),d.styles)}),H=r.found&&n.found?tt("generateAbstractMask",K)||{children:[],attributes:{}}:tt("generateAbstractIcon",K)||{children:[],attributes:{}},te=H.children,ge=H.attributes;return K.children=te,K.attributes=ge,o?o1(K):s1(K)}function ms(e){var t=e.content,n=e.width,r=e.height,i=e.transform,a=e.title,s=e.extra,o=e.watchable,l=o===void 0?!1:o,f=O(O(O({},s.attributes),a?{title:a}:{}),{},{class:s.classes.join(" ")});l&&(f[Ot]="");var c=O({},s.styles);Xi(i)&&(c.transform=Hd({transform:i,startCentered:!0,width:n,height:r}),c["-webkit-transform"]=c.transform);var d=Cr(c);d.length>0&&(f.style=d);var m=[];return m.push({tag:"span",attributes:f,children:[t]}),a&&m.push({tag:"span",attributes:{class:"sr-only"},children:[a]}),m}function l1(e){var t=e.content,n=e.title,r=e.extra,i=O(O(O({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),a=Cr(r.styles);a.length>0&&(i.style=a);var s=[];return s.push({tag:"span",attributes:i,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var Kr=$e.styles;function pi(e){var t=e[0],n=e[1],r=e.slice(4),i=Ui(r,1),a=i[0],s=null;return Array.isArray(a)?s={tag:"g",attributes:{class:"".concat(L.cssPrefix,"-").concat(St.GROUP)},children:[{tag:"path",attributes:{class:"".concat(L.cssPrefix,"-").concat(St.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(L.cssPrefix,"-").concat(St.PRIMARY),fill:"currentColor",d:a[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:s}}var c1={found:!1,width:512,height:512};function f1(e,t){!qo&&!L.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function gi(e,t){var n=t;return t==="fa"&&L.styleDefault!==null&&(t=bt()),new Promise(function(r,i){if(tt("missingIconAbstract"),n==="fa"){var a=ll(e)||{};e=a.iconName||e,t=a.prefix||t}if(e&&t&&Kr[t]&&Kr[t][e]){var s=Kr[t][e];return r(pi(s))}f1(e,t),r(O(O({},c1),{},{icon:L.showMissingIcons&&e?tt("missingIconAbstract")||{}:{}}))})}var ps=function(){},vi=L.measurePerformance&&Fn&&Fn.mark&&Fn.measure?Fn:{mark:ps,measure:ps},ln='FA "6.5.1"',u1=function(t){return vi.mark("".concat(ln," ").concat(t," begins")),function(){return fl(t)}},fl=function(t){vi.mark("".concat(ln," ").concat(t," ends")),vi.measure("".concat(ln," ").concat(t),"".concat(ln," ").concat(t," begins"),"".concat(ln," ").concat(t," ends"))},ta={begin:u1,end:fl},Zn=function(){};function gs(e){var t=e.getAttribute?e.getAttribute(Ot):null;return typeof t=="string"}function d1(e){var t=e.getAttribute?e.getAttribute(Wi):null,n=e.getAttribute?e.getAttribute(Yi):null;return t&&n}function h1(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(L.replacementClass)}function m1(){if(L.autoReplaceSvg===!0)return er.replace;var e=er[L.autoReplaceSvg];return e||er.replace}function p1(e){return ie.createElementNS("http://www.w3.org/2000/svg",e)}function g1(e){return ie.createElement(e)}function ul(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?p1:g1:n;if(typeof e=="string")return ie.createTextNode(e);var i=r(e.tag);Object.keys(e.attributes||[]).forEach(function(s){i.setAttribute(s,e.attributes[s])});var a=e.children||[];return a.forEach(function(s){i.appendChild(ul(s,{ceFn:r}))}),i}function v1(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var er={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(i){n.parentNode.insertBefore(ul(i),n)}),n.getAttribute(Ot)===null&&L.keepOriginalSource){var r=ie.createComment(v1(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~qi(n).indexOf(L.replacementClass))return er.replace(t);var i=new RegExp("".concat(L.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var a=r[0].attributes.class.split(" ").reduce(function(o,l){return l===L.replacementClass||l.match(i)?o.toSvg.push(l):o.toNode.push(l),o},{toNode:[],toSvg:[]});r[0].attributes.class=a.toSvg.join(" "),a.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",a.toNode.join(" "))}var s=r.map(function(o){return Mn(o)}).join(`
`);n.setAttribute(Ot,""),n.innerHTML=s}};function vs(e){e()}function dl(e,t){var n=typeof t=="function"?t:Zn;if(e.length===0)n();else{var r=vs;L.mutateApproach===Ad&&(r=vt.requestAnimationFrame||vs),r(function(){var i=m1(),a=ta.begin("mutate");e.map(i),a(),n()})}}var na=!1;function hl(){na=!0}function bi(){na=!1}var ur=null;function bs(e){if(os&&L.observeMutations){var t=e.treeCallback,n=t===void 0?Zn:t,r=e.nodeCallback,i=r===void 0?Zn:r,a=e.pseudoElementsCallback,s=a===void 0?Zn:a,o=e.observeMutationsRoot,l=o===void 0?ie:o;ur=new os(function(f){if(!na){var c=bt();tn(f).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!gs(d.addedNodes[0])&&(L.searchPseudoElements&&s(d.target),n(d.target)),d.type==="attributes"&&d.target.parentNode&&L.searchPseudoElements&&s(d.target.parentNode),d.type==="attributes"&&gs(d.target)&&~Pd.indexOf(d.attributeName))if(d.attributeName==="class"&&d1(d.target)){var m=Pr(qi(d.target)),g=m.prefix,C=m.iconName;d.target.setAttribute(Wi,g||c),C&&d.target.setAttribute(Yi,C)}else h1(d.target)&&i(d.target)})}}),it&&ur.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function b1(){ur&&ur.disconnect()}function y1(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,i){var a=i.split(":"),s=a[0],o=a.slice(1);return s&&o.length>0&&(r[s]=o.join(":").trim()),r},{})),n}function _1(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",i=Pr(qi(e));return i.prefix||(i.prefix=bt()),t&&n&&(i.prefix=t,i.iconName=n),i.iconName&&i.prefix||(i.prefix&&r.length>0&&(i.iconName=Qd(i.prefix,e.innerText)||Ji(i.prefix,ui(e.innerText))),!i.iconName&&L.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=e.firstChild.data)),i}function A1(e){var t=tn(e.attributes).reduce(function(i,a){return i.name!=="class"&&i.name!=="style"&&(i[a.name]=a.value),i},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return L.autoA11y&&(n?t["aria-labelledby"]="".concat(L.replacementClass,"-title-").concat(r||Sn()):(t["aria-hidden"]="true",t.focusable="false")),t}function w1(){return{iconName:null,title:null,titleId:null,prefix:null,transform:We,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ys(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=_1(e),r=n.iconName,i=n.prefix,a=n.rest,s=A1(e),o=hi("parseNodeAttributes",{},e),l=t.styleParser?y1(e):[];return O({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:i,transform:We,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:a,styles:l,attributes:s}},o)}var x1=$e.styles;function ml(e){var t=L.autoReplaceSvg==="nest"?ys(e,{styleParser:!1}):ys(e);return~t.extra.classes.indexOf(Xo)?tt("generateLayersText",e,t):tt("generateSvgReplacementMutation",e,t)}var yt=new Set;Gi.map(function(e){yt.add("fa-".concat(e))});Object.keys(An[re]).map(yt.add.bind(yt));Object.keys(An[fe]).map(yt.add.bind(yt));yt=kn(yt);function _s(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!it)return Promise.resolve();var n=ie.documentElement.classList,r=function(d){return n.add("".concat(ls,"-").concat(d))},i=function(d){return n.remove("".concat(ls,"-").concat(d))},a=L.autoFetchSvg?yt:Gi.map(function(c){return"fa-".concat(c)}).concat(Object.keys(x1));a.includes("fa")||a.push("fa");var s=[".".concat(Xo,":not([").concat(Ot,"])")].concat(a.map(function(c){return".".concat(c,":not([").concat(Ot,"])")})).join(", ");if(s.length===0)return Promise.resolve();var o=[];try{o=tn(e.querySelectorAll(s))}catch{}if(o.length>0)r("pending"),i("complete");else return Promise.resolve();var l=ta.begin("onTree"),f=o.reduce(function(c,d){try{var m=ml(d);m&&c.push(m)}catch(g){qo||g.name==="MissingIcon"&&console.error(g)}return c},[]);return new Promise(function(c,d){Promise.all(f).then(function(m){dl(m,function(){r("active"),r("complete"),i("pending"),typeof t=="function"&&t(),l(),c()})}).catch(function(m){l(),d(m)})})}function E1(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ml(e).then(function(n){n&&dl([n],t)})}function S1(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:mi(t||{}),i=n.mask;return i&&(i=(i||{}).icon?i:mi(i||{})),e(r,O(O({},n),{},{mask:i}))}}var C1=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,i=r===void 0?We:r,a=n.symbol,s=a===void 0?!1:a,o=n.mask,l=o===void 0?null:o,f=n.maskId,c=f===void 0?null:f,d=n.title,m=d===void 0?null:d,g=n.titleId,C=g===void 0?null:g,I=n.classes,z=I===void 0?[]:I,y=n.attributes,A=y===void 0?{}:y,M=n.styles,F=M===void 0?{}:M;if(t){var K=t.prefix,H=t.iconName,te=t.icon;return Mr(O({type:"icon"},t),function(){return Rt("beforeDOMElementCreation",{iconDefinition:t,params:n}),L.autoA11y&&(m?A["aria-labelledby"]="".concat(L.replacementClass,"-title-").concat(C||Sn()):(A["aria-hidden"]="true",A.focusable="false")),ea({icons:{main:pi(te),mask:l?pi(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:K,iconName:H,transform:O(O({},We),i),symbol:s,title:m,maskId:c,titleId:C,extra:{attributes:A,styles:F,classes:z}})})}},k1={mixout:function(){return{icon:S1(C1)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=_s,n.nodeCallback=E1,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,i=r===void 0?ie:r,a=n.callback,s=a===void 0?function(){}:a;return _s(i,s)},t.generateSvgReplacementMutation=function(n,r){var i=r.iconName,a=r.title,s=r.titleId,o=r.prefix,l=r.transform,f=r.symbol,c=r.mask,d=r.maskId,m=r.extra;return new Promise(function(g,C){Promise.all([gi(i,o),c.iconName?gi(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(I){var z=Ui(I,2),y=z[0],A=z[1];g([n,ea({icons:{main:y,mask:A},prefix:o,iconName:i,transform:l,symbol:f,maskId:d,title:a,titleId:s,extra:m,watchable:!0})])}).catch(C)})},t.generateAbstractIcon=function(n){var r=n.children,i=n.attributes,a=n.main,s=n.transform,o=n.styles,l=Cr(o);l.length>0&&(i.style=l);var f;return Xi(s)&&(f=tt("generateAbstractTransformGrouping",{main:a,transform:s,containerWidth:a.width,iconWidth:a.width})),r.push(f||a.icon),{children:r,attributes:i}}}},P1={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=r.classes,a=i===void 0?[]:i;return Mr({type:"layer"},function(){Rt("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(o){Array.isArray(o)?o.map(function(l){s=s.concat(l.abstract)}):s=s.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(L.cssPrefix,"-layers")].concat(kn(a)).join(" ")},children:s}]})}}}},M1={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=r.title,a=i===void 0?null:i,s=r.classes,o=s===void 0?[]:s,l=r.attributes,f=l===void 0?{}:l,c=r.styles,d=c===void 0?{}:c;return Mr({type:"counter",content:n},function(){return Rt("beforeDOMElementCreation",{content:n,params:r}),l1({content:n.toString(),title:a,extra:{attributes:f,styles:d,classes:["".concat(L.cssPrefix,"-layers-counter")].concat(kn(o))}})})}}}},O1={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=r.transform,a=i===void 0?We:i,s=r.title,o=s===void 0?null:s,l=r.classes,f=l===void 0?[]:l,c=r.attributes,d=c===void 0?{}:c,m=r.styles,g=m===void 0?{}:m;return Mr({type:"text",content:n},function(){return Rt("beforeDOMElementCreation",{content:n,params:r}),ms({content:n,transform:O(O({},We),a),title:o,extra:{attributes:d,styles:g,classes:["".concat(L.cssPrefix,"-layers-text")].concat(kn(f))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var i=r.title,a=r.transform,s=r.extra,o=null,l=null;if(Wo){var f=parseInt(getComputedStyle(n).fontSize,10),c=n.getBoundingClientRect();o=c.width/f,l=c.height/f}return L.autoA11y&&!i&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,ms({content:n.innerHTML,width:o,height:l,transform:a,title:i,extra:s,watchable:!0})])}}},R1=new RegExp('"',"ug"),As=[1105920,1112319];function T1(e){var t=e.replace(R1,""),n=Kd(t,0),r=n>=As[0]&&n<=As[1],i=t.length===2?t[0]===t[1]:!1;return{value:ui(i?t[0]:t),isSecondary:r||i}}function ws(e,t){var n="".concat(_d).concat(t.replace(":","-"));return new Promise(function(r,i){if(e.getAttribute(n)!==null)return r();var a=tn(e.children),s=a.filter(function(te){return te.getAttribute(fi)===t})[0],o=vt.getComputedStyle(e,t),l=o.getPropertyValue("font-family").match(Sd),f=o.getPropertyValue("font-weight"),c=o.getPropertyValue("content");if(s&&!l)return e.removeChild(s),r();if(l&&c!=="none"&&c!==""){var d=o.getPropertyValue("content"),m=~["Sharp"].indexOf(l[2])?fe:re,g=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?wn[m][l[2].toLowerCase()]:Cd[m][f],C=T1(d),I=C.value,z=C.isSecondary,y=l[0].startsWith("FontAwesome"),A=Ji(g,I),M=A;if(y){var F=Jd(I);F.iconName&&F.prefix&&(A=F.iconName,g=F.prefix)}if(A&&!z&&(!s||s.getAttribute(Wi)!==g||s.getAttribute(Yi)!==M)){e.setAttribute(n,M),s&&e.removeChild(s);var K=w1(),H=K.extra;H.attributes[fi]=t,gi(A,g).then(function(te){var ge=ea(O(O({},K),{},{icons:{main:te,mask:Zi()},prefix:g,iconName:M,extra:H,watchable:!0})),_e=ie.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(_e,e.firstChild):e.appendChild(_e),_e.outerHTML=ge.map(function(Re){return Mn(Re)}).join(`
`),e.removeAttribute(n),r()}).catch(i)}else r()}else r()})}function I1(e){return Promise.all([ws(e,"::before"),ws(e,"::after")])}function z1(e){return e.parentNode!==document.head&&!~wd.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(fi)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function xs(e){if(it)return new Promise(function(t,n){var r=tn(e.querySelectorAll("*")).filter(z1).map(I1),i=ta.begin("searchPseudoElements");hl(),Promise.all(r).then(function(){i(),bi(),t()}).catch(function(){i(),bi(),n()})})}var L1={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=xs,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,i=r===void 0?ie:r;L.searchPseudoElements&&xs(i)}}},Es=!1,N1={mixout:function(){return{dom:{unwatch:function(){hl(),Es=!0}}}},hooks:function(){return{bootstrap:function(){bs(hi("mutationObserverCallbacks",{}))},noAuto:function(){b1()},watch:function(n){var r=n.observeMutationsRoot;Es?bi():bs(hi("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Ss=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,i){var a=i.toLowerCase().split("-"),s=a[0],o=a.slice(1).join("-");if(s&&o==="h")return r.flipX=!0,r;if(s&&o==="v")return r.flipY=!0,r;if(o=parseFloat(o),isNaN(o))return r;switch(s){case"grow":r.size=r.size+o;break;case"shrink":r.size=r.size-o;break;case"left":r.x=r.x-o;break;case"right":r.x=r.x+o;break;case"up":r.y=r.y-o;break;case"down":r.y=r.y+o;break;case"rotate":r.rotate=r.rotate+o;break}return r},n)},$1={mixout:function(){return{parse:{transform:function(n){return Ss(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var i=r.getAttribute("data-fa-transform");return i&&(n.transform=Ss(i)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,i=n.transform,a=n.containerWidth,s=n.iconWidth,o={transform:"translate(".concat(a/2," 256)")},l="translate(".concat(i.x*32,", ").concat(i.y*32,") "),f="scale(".concat(i.size/16*(i.flipX?-1:1),", ").concat(i.size/16*(i.flipY?-1:1),") "),c="rotate(".concat(i.rotate," 0 0)"),d={transform:"".concat(l," ").concat(f," ").concat(c)},m={transform:"translate(".concat(s/2*-1," -256)")},g={outer:o,inner:d,path:m};return{tag:"g",attributes:O({},g.outer),children:[{tag:"g",attributes:O({},g.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:O(O({},r.icon.attributes),g.path)}]}]}}}},Wr={x:0,y:0,width:"100%",height:"100%"};function Cs(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function H1(e){return e.tag==="g"?e.children:[e]}var F1={hooks:function(){return{parseNodeAttributes:function(n,r){var i=r.getAttribute("data-fa-mask"),a=i?Pr(i.split(" ").map(function(s){return s.trim()})):Zi();return a.prefix||(a.prefix=bt()),n.mask=a,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,i=n.attributes,a=n.main,s=n.mask,o=n.maskId,l=n.transform,f=a.width,c=a.icon,d=s.width,m=s.icon,g=$d({transform:l,containerWidth:d,iconWidth:f}),C={tag:"rect",attributes:O(O({},Wr),{},{fill:"white"})},I=c.children?{children:c.children.map(Cs)}:{},z={tag:"g",attributes:O({},g.inner),children:[Cs(O({tag:c.tag,attributes:O(O({},c.attributes),g.path)},I))]},y={tag:"g",attributes:O({},g.outer),children:[z]},A="mask-".concat(o||Sn()),M="clip-".concat(o||Sn()),F={tag:"mask",attributes:O(O({},Wr),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[C,y]},K={tag:"defs",children:[{tag:"clipPath",attributes:{id:M},children:H1(m)},F]};return r.push(K,{tag:"rect",attributes:O({fill:"currentColor","clip-path":"url(#".concat(M,")"),mask:"url(#".concat(A,")")},Wr)}),{children:r,attributes:i}}}},j1={provides:function(t){var n=!1;vt.matchMedia&&(n=vt.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],i={fill:"currentColor"},a={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:O(O({},i),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=O(O({},a),{},{attributeName:"opacity"}),o={tag:"circle",attributes:O(O({},i),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||o.children.push({tag:"animate",attributes:O(O({},a),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:O(O({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(o),r.push({tag:"path",attributes:O(O({},i),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:O(O({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:O(O({},i),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:O(O({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},D1={hooks:function(){return{parseNodeAttributes:function(n,r){var i=r.getAttribute("data-fa-symbol"),a=i===null?!1:i===""?!0:i;return n.symbol=a,n}}}},B1=[jd,k1,P1,M1,O1,L1,N1,$1,F1,j1,D1];t1(B1,{mixoutsTo:Oe});Oe.noAuto;Oe.config;var V1=Oe.library;Oe.dom;Oe.parse;Oe.findIconDefinition;Oe.toHtml;Oe.icon;Oe.layer;Oe.text;Oe.counter;var U1=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},K1={exports:{}};(function(e){(function(t){var n=function(y,A,M){if(!f(A)||d(A)||m(A)||g(A)||l(A))return A;var F,K=0,H=0;if(c(A))for(F=[],H=A.length;K<H;K++)F.push(n(y,A[K],M));else{F={};for(var te in A)Object.prototype.hasOwnProperty.call(A,te)&&(F[y(te,M)]=n(y,A[te],M))}return F},r=function(y,A){A=A||{};var M=A.separator||"_",F=A.split||/(?=[A-Z])/;return y.split(F).join(M)},i=function(y){return C(y)?y:(y=y.replace(/[\-_\s]+(.)?/g,function(A,M){return M?M.toUpperCase():""}),y.substr(0,1).toLowerCase()+y.substr(1))},a=function(y){var A=i(y);return A.substr(0,1).toUpperCase()+A.substr(1)},s=function(y,A){return r(y,A).toLowerCase()},o=Object.prototype.toString,l=function(y){return typeof y=="function"},f=function(y){return y===Object(y)},c=function(y){return o.call(y)=="[object Array]"},d=function(y){return o.call(y)=="[object Date]"},m=function(y){return o.call(y)=="[object RegExp]"},g=function(y){return o.call(y)=="[object Boolean]"},C=function(y){return y=y-0,y===y},I=function(y,A){var M=A&&"process"in A?A.process:A;return typeof M!="function"?y:function(F,K){return M(F,y,K)}},z={camelize:i,decamelize:s,pascalize:a,depascalize:s,camelizeKeys:function(y,A){return n(I(i,A),y)},decamelizeKeys:function(y,A){return n(I(s,A),y,A)},pascalizeKeys:function(y,A){return n(I(a,A),y)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=z:t.humps=z})(U1)})(K1);var W1=!1;try{W1=!0}catch{}var Y1={prefix:"fas",iconName:"user-secret",icon:[448,512,[128373],"f21b","M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"]};V1.add(Y1);const ra=Tf(Qu);ra.use($f());ra.use(fd);ra.mount("#app");export{_t as _,ee as a,D as b,rt as c,le as d,Ge as o,G1 as r};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ResearchView-JB0pyAlx.js","assets/ResearchView-ug8e6cRs.css","assets/CVView-LM76SQ50.js","assets/ContactView-MynZhFUZ.js","assets/ProjectsView-RirX3qW1.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
