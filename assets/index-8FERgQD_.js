(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function xc(t,e){const n=new Set(t.split(","));return e?r=>n.has(r.toLowerCase()):r=>n.has(r)}const Mt={},Ar=[],ye=()=>{},lm=()=>!1,lo=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),kc=t=>t.startsWith("onUpdate:"),Yt=Object.assign,Cc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},fm=Object.prototype.hasOwnProperty,ct=(t,e)=>fm.call(t,e),nt=Array.isArray,_r=t=>fo(t)==="[object Map]",Iu=t=>fo(t)==="[object Set]",at=t=>typeof t=="function",Vt=t=>typeof t=="string",Vr=t=>typeof t=="symbol",Tt=t=>t!==null&&typeof t=="object",Lu=t=>(Tt(t)||at(t))&&at(t.then)&&at(t.catch),Nu=Object.prototype.toString,fo=t=>Nu.call(t),um=t=>fo(t).slice(8,-1),ju=t=>fo(t)==="[object Object]",Sc=t=>Vt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ei=xc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),uo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},dm=/-(\w)/g,Ve=uo(t=>t.replace(dm,(e,n)=>n?n.toUpperCase():"")),mm=/\B([A-Z])/g,Ur=uo(t=>t.replace(mm,"-$1").toLowerCase()),mo=uo(t=>t.charAt(0).toUpperCase()+t.slice(1)),Yo=uo(t=>t?`on${mo(t)}`:""),Rn=(t,e)=>!Object.is(t,e),Ko=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Bi=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},pm=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Kl;const Fu=()=>Kl||(Kl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ec(t){if(nt(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],a=Vt(r)?bm(r):Ec(r);if(a)for(const i in a)e[i]=a[i]}return e}else if(Vt(t)||Tt(t))return t}const hm=/;(?![^(]*\))/g,gm=/:([^]+)/,vm=/\/\*[^]*?\*\//g;function bm(t){const e={};return t.replace(vm,"").split(hm).forEach(n=>{if(n){const r=n.split(gm);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Mc(t){let e="";if(Vt(t))e=t;else if(nt(t))for(let n=0;n<t.length;n++){const r=Mc(t[n]);r&&(e+=r+" ")}else if(Tt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const ym="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",wm=xc(ym);function Hu(t){return!!t||t===""}const Am=t=>Vt(t)?t:t==null?"":nt(t)||Tt(t)&&(t.toString===Nu||!at(t.toString))?JSON.stringify(t,$u,2):String(t),$u=(t,e)=>e&&e.__v_isRef?$u(t,e.value):_r(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,a],i)=>(n[Go(r,i)+" =>"]=a,n),{})}:Iu(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Go(n))}:Vr(e)?Go(e):Tt(e)&&!nt(e)&&!ju(e)?String(e):e,Go=(t,e="")=>{var n;return Vr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let xe;class Bu{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=xe,!e&&xe&&(this.index=(xe.scopes||(xe.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=xe;try{return xe=this,e()}finally{xe=n}}}on(){xe=this}off(){xe=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function _m(t){return new Bu(t)}function xm(t,e=xe){e&&e.active&&e.effects.push(t)}function km(){return xe}let Jn;class Pc{constructor(e,n,r,a){this.fn=e,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,xm(this,a)}get dirty(){if(this._dirtyLevel===1){lr();for(let e=0;e<this._depsLength;e++){const n=this.deps[e];if(n.computed&&(Cm(n.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),fr()}return this._dirtyLevel>=2}set dirty(e){this._dirtyLevel=e?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Mn,n=Jn;try{return Mn=!0,Jn=this,this._runnings++,Gl(this),this.fn()}finally{ql(this),this._runnings--,Jn=n,Mn=e}}stop(){var e;this.active&&(Gl(this),ql(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function Cm(t){return t.value}function Gl(t){t._trackId++,t._depsLength=0}function ql(t){if(t.deps&&t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)Du(t.deps[e],t);t.deps.length=t._depsLength}}function Du(t,e){const n=t.get(e);n!==void 0&&e._trackId!==n&&(t.delete(e),t.size===0&&t.cleanup())}let Mn=!0,Ss=0;const Vu=[];function lr(){Vu.push(Mn),Mn=!1}function fr(){const t=Vu.pop();Mn=t===void 0?!0:t}function Oc(){Ss++}function zc(){for(Ss--;!Ss&&Es.length;)Es.shift()()}function Uu(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const r=t.deps[t._depsLength];r!==e?(r&&Du(r,t),t.deps[t._depsLength++]=e):t._depsLength++}}const Es=[];function Wu(t,e,n){Oc();for(const r of t.keys())if(r._dirtyLevel<e&&t.get(r)===r._trackId){const a=r._dirtyLevel;r._dirtyLevel=e,a===0&&(r._shouldSchedule=!0,r.trigger())}Yu(t),zc()}function Yu(t){for(const e of t.keys())e.scheduler&&e._shouldSchedule&&(!e._runnings||e.allowRecurse)&&t.get(e)===e._trackId&&(e._shouldSchedule=!1,Es.push(e.scheduler))}const Ku=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},Ms=new WeakMap,tr=Symbol(""),Ps=Symbol("");function oe(t,e,n){if(Mn&&Jn){let r=Ms.get(t);r||Ms.set(t,r=new Map);let a=r.get(n);a||r.set(n,a=Ku(()=>r.delete(n))),Uu(Jn,a)}}function Xe(t,e,n,r,a,i){const o=Ms.get(t);if(!o)return;let s=[];if(e==="clear")s=[...o.values()];else if(n==="length"&&nt(t)){const c=Number(r);o.forEach((u,l)=>{(l==="length"||!Vr(l)&&l>=c)&&s.push(u)})}else switch(n!==void 0&&s.push(o.get(n)),e){case"add":nt(t)?Sc(n)&&s.push(o.get("length")):(s.push(o.get(tr)),_r(t)&&s.push(o.get(Ps)));break;case"delete":nt(t)||(s.push(o.get(tr)),_r(t)&&s.push(o.get(Ps)));break;case"set":_r(t)&&s.push(o.get(tr));break}Oc();for(const c of s)c&&Wu(c,2);zc()}const Sm=xc("__proto__,__v_isRef,__isVue"),Gu=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Vr)),Xl=Em();function Em(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=dt(this);for(let i=0,o=this.length;i<o;i++)oe(r,"get",i+"");const a=r[e](...n);return a===-1||a===!1?r[e](...n.map(dt)):a}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){lr(),Oc();const r=dt(this)[e].apply(this,n);return zc(),fr(),r}}),t}function Mm(t){const e=dt(this);return oe(e,"has",t),e.hasOwnProperty(t)}class qu{constructor(e=!1,n=!1){this._isReadonly=e,this._shallow=n}get(e,n,r){const a=this._isReadonly,i=this._shallow;if(n==="__v_isReactive")return!a;if(n==="__v_isReadonly")return a;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(a?i?Bm:Ju:i?Zu:Qu).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=nt(e);if(!a){if(o&&ct(Xl,n))return Reflect.get(Xl,n,r);if(n==="hasOwnProperty")return Mm}const s=Reflect.get(e,n,r);return(Vr(n)?Gu.has(n):Sm(n))||(a||oe(e,"get",n),i)?s:se(s)?o&&Sc(n)?s:s.value:Tt(s)?a?e1(s):ho(s):s}}class Xu extends qu{constructor(e=!1){super(!1,e)}set(e,n,r,a){let i=e[n];if(!this._shallow){const c=zr(i);if(!Di(r)&&!zr(r)&&(i=dt(i),r=dt(r)),!nt(e)&&se(i)&&!se(r))return c?!1:(i.value=r,!0)}const o=nt(e)&&Sc(n)?Number(n)<e.length:ct(e,n),s=Reflect.set(e,n,r,a);return e===dt(a)&&(o?Rn(r,i)&&Xe(e,"set",n,r):Xe(e,"add",n,r)),s}deleteProperty(e,n){const r=ct(e,n);e[n];const a=Reflect.deleteProperty(e,n);return a&&r&&Xe(e,"delete",n,void 0),a}has(e,n){const r=Reflect.has(e,n);return(!Vr(n)||!Gu.has(n))&&oe(e,"has",n),r}ownKeys(e){return oe(e,"iterate",nt(e)?"length":tr),Reflect.ownKeys(e)}}class Pm extends qu{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Om=new Xu,zm=new Pm,Rm=new Xu(!0),Rc=t=>t,po=t=>Reflect.getPrototypeOf(t);function Ga(t,e,n=!1,r=!1){t=t.__v_raw;const a=dt(t),i=dt(e);n||(Rn(e,i)&&oe(a,"get",e),oe(a,"get",i));const{has:o}=po(a),s=r?Rc:n?Nc:wa;if(o.call(a,e))return s(t.get(e));if(o.call(a,i))return s(t.get(i));t!==a&&t.get(e)}function qa(t,e=!1){const n=this.__v_raw,r=dt(n),a=dt(t);return e||(Rn(t,a)&&oe(r,"has",t),oe(r,"has",a)),t===a?n.has(t):n.has(t)||n.has(a)}function Xa(t,e=!1){return t=t.__v_raw,!e&&oe(dt(t),"iterate",tr),Reflect.get(t,"size",t)}function Ql(t){t=dt(t);const e=dt(this);return po(e).has.call(e,t)||(e.add(t),Xe(e,"add",t,t)),this}function Zl(t,e){e=dt(e);const n=dt(this),{has:r,get:a}=po(n);let i=r.call(n,t);i||(t=dt(t),i=r.call(n,t));const o=a.call(n,t);return n.set(t,e),i?Rn(e,o)&&Xe(n,"set",t,e):Xe(n,"add",t,e),this}function Jl(t){const e=dt(this),{has:n,get:r}=po(e);let a=n.call(e,t);a||(t=dt(t),a=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return a&&Xe(e,"delete",t,void 0),i}function t0(){const t=dt(this),e=t.size!==0,n=t.clear();return e&&Xe(t,"clear",void 0,void 0),n}function Qa(t,e){return function(r,a){const i=this,o=i.__v_raw,s=dt(o),c=e?Rc:t?Nc:wa;return!t&&oe(s,"iterate",tr),o.forEach((u,l)=>r.call(a,c(u),c(l),i))}}function Za(t,e,n){return function(...r){const a=this.__v_raw,i=dt(a),o=_r(i),s=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=a[t](...r),l=n?Rc:e?Nc:wa;return!e&&oe(i,"iterate",c?Ps:tr),{next(){const{value:m,done:p}=u.next();return p?{value:m,done:p}:{value:s?[l(m[0]),l(m[1])]:l(m),done:p}},[Symbol.iterator](){return this}}}}function mn(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Tm(){const t={get(i){return Ga(this,i)},get size(){return Xa(this)},has:qa,add:Ql,set:Zl,delete:Jl,clear:t0,forEach:Qa(!1,!1)},e={get(i){return Ga(this,i,!1,!0)},get size(){return Xa(this)},has:qa,add:Ql,set:Zl,delete:Jl,clear:t0,forEach:Qa(!1,!0)},n={get(i){return Ga(this,i,!0)},get size(){return Xa(this,!0)},has(i){return qa.call(this,i,!0)},add:mn("add"),set:mn("set"),delete:mn("delete"),clear:mn("clear"),forEach:Qa(!0,!1)},r={get(i){return Ga(this,i,!0,!0)},get size(){return Xa(this,!0)},has(i){return qa.call(this,i,!0)},add:mn("add"),set:mn("set"),delete:mn("delete"),clear:mn("clear"),forEach:Qa(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=Za(i,!1,!1),n[i]=Za(i,!0,!1),e[i]=Za(i,!1,!0),r[i]=Za(i,!0,!0)}),[t,n,e,r]}const[Im,Lm,Nm,jm]=Tm();function Tc(t,e){const n=e?t?jm:Nm:t?Lm:Im;return(r,a,i)=>a==="__v_isReactive"?!t:a==="__v_isReadonly"?t:a==="__v_raw"?r:Reflect.get(ct(n,a)&&a in r?n:r,a,i)}const Fm={get:Tc(!1,!1)},Hm={get:Tc(!1,!0)},$m={get:Tc(!0,!1)},Qu=new WeakMap,Zu=new WeakMap,Ju=new WeakMap,Bm=new WeakMap;function Dm(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Vm(t){return t.__v_skip||!Object.isExtensible(t)?0:Dm(um(t))}function ho(t){return zr(t)?t:Ic(t,!1,Om,Fm,Qu)}function t1(t){return Ic(t,!1,Rm,Hm,Zu)}function e1(t){return Ic(t,!0,zm,$m,Ju)}function Ic(t,e,n,r,a){if(!Tt(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=a.get(t);if(i)return i;const o=Vm(t);if(o===0)return t;const s=new Proxy(t,o===2?r:n);return a.set(t,s),s}function xr(t){return zr(t)?xr(t.__v_raw):!!(t&&t.__v_isReactive)}function zr(t){return!!(t&&t.__v_isReadonly)}function Di(t){return!!(t&&t.__v_isShallow)}function n1(t){return xr(t)||zr(t)}function dt(t){const e=t&&t.__v_raw;return e?dt(e):t}function Lc(t){return Bi(t,"__v_skip",!0),t}const wa=t=>Tt(t)?ho(t):t,Nc=t=>Tt(t)?e1(t):t;class r1{constructor(e,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Pc(()=>e(this._value),()=>Mi(this,1),()=>this.dep&&Yu(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const e=dt(this);return(!e._cacheable||e.effect.dirty)&&Rn(e._value,e._value=e.effect.run())&&Mi(e,2),a1(e),e.effect._dirtyLevel>=1&&Mi(e,1),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Um(t,e,n=!1){let r,a;const i=at(t);return i?(r=t,a=ye):(r=t.get,a=t.set),new r1(r,a,i||!a,n)}function a1(t){Mn&&Jn&&(t=dt(t),Uu(Jn,t.dep||(t.dep=Ku(()=>t.dep=void 0,t instanceof r1?t:void 0))))}function Mi(t,e=2,n){t=dt(t);const r=t.dep;r&&Wu(r,e)}function se(t){return!!(t&&t.__v_isRef===!0)}function i1(t){return o1(t,!1)}function Wm(t){return o1(t,!0)}function o1(t,e){return se(t)?t:new Ym(t,e)}class Ym{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:dt(e),this._value=n?e:wa(e)}get value(){return a1(this),this._value}set value(e){const n=this.__v_isShallow||Di(e)||zr(e);e=n?e:dt(e),Rn(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:wa(e),Mi(this,2))}}function er(t){return se(t)?t.value:t}const Km={get:(t,e,n)=>er(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const a=t[e];return se(a)&&!se(n)?(a.value=n,!0):Reflect.set(t,e,n,r)}};function s1(t){return xr(t)?t:new Proxy(t,Km)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Pn(t,e,n,r){let a;try{a=r?t(...r):t()}catch(i){go(i,e,n)}return a}function ze(t,e,n,r){if(at(t)){const i=Pn(t,e,n,r);return i&&Lu(i)&&i.catch(o=>{go(o,e,n)}),i}const a=[];for(let i=0;i<t.length;i++)a.push(ze(t[i],e,n,r));return a}function go(t,e,n,r=!0){const a=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const u=i.ec;if(u){for(let l=0;l<u.length;l++)if(u[l](t,o,s)===!1)return}i=i.parent}const c=e.appContext.config.errorHandler;if(c){Pn(c,null,10,[t,o,s]);return}}Gm(t,n,a,r)}function Gm(t,e,n,r=!0){console.error(t)}let Aa=!1,Os=!1;const Gt=[];let He=0;const kr=[];let yn=null,Yn=0;const c1=Promise.resolve();let jc=null;function l1(t){const e=jc||c1;return t?e.then(this?t.bind(this):t):e}function qm(t){let e=He+1,n=Gt.length;for(;e<n;){const r=e+n>>>1,a=Gt[r],i=_a(a);i<t||i===t&&a.pre?e=r+1:n=r}return e}function Fc(t){(!Gt.length||!Gt.includes(t,Aa&&t.allowRecurse?He+1:He))&&(t.id==null?Gt.push(t):Gt.splice(qm(t.id),0,t),f1())}function f1(){!Aa&&!Os&&(Os=!0,jc=c1.then(d1))}function Xm(t){const e=Gt.indexOf(t);e>He&&Gt.splice(e,1)}function Qm(t){nt(t)?kr.push(...t):(!yn||!yn.includes(t,t.allowRecurse?Yn+1:Yn))&&kr.push(t),f1()}function e0(t,e,n=Aa?He+1:0){for(;n<Gt.length;n++){const r=Gt[n];if(r&&r.pre){if(t&&r.id!==t.uid)continue;Gt.splice(n,1),n--,r()}}}function u1(t){if(kr.length){const e=[...new Set(kr)].sort((n,r)=>_a(n)-_a(r));if(kr.length=0,yn){yn.push(...e);return}for(yn=e,Yn=0;Yn<yn.length;Yn++)yn[Yn]();yn=null,Yn=0}}const _a=t=>t.id==null?1/0:t.id,Zm=(t,e)=>{const n=_a(t)-_a(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function d1(t){Os=!1,Aa=!0,Gt.sort(Zm);try{for(He=0;He<Gt.length;He++){const e=Gt[He];e&&e.active!==!1&&Pn(e,null,14)}}finally{He=0,Gt.length=0,u1(),Aa=!1,jc=null,(Gt.length||kr.length)&&d1()}}function Jm(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Mt;let a=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const l=`${o==="modelValue"?"model":o}Modifiers`,{number:m,trim:p}=r[l]||Mt;p&&(a=n.map(g=>Vt(g)?g.trim():g)),m&&(a=n.map(pm))}let s,c=r[s=Yo(e)]||r[s=Yo(Ve(e))];!c&&i&&(c=r[s=Yo(Ur(e))]),c&&ze(c,t,6,a);const u=r[s+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[s])return;t.emitted[s]=!0,ze(u,t,6,a)}}function m1(t,e,n=!1){const r=e.emitsCache,a=r.get(t);if(a!==void 0)return a;const i=t.emits;let o={},s=!1;if(!at(t)){const c=u=>{const l=m1(u,e,!0);l&&(s=!0,Yt(o,l))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!s?(Tt(t)&&r.set(t,null),null):(nt(i)?i.forEach(c=>o[c]=null):Yt(o,i),Tt(t)&&r.set(t,o),o)}function vo(t,e){return!t||!lo(e)?!1:(e=e.slice(2).replace(/Once$/,""),ct(t,e[0].toLowerCase()+e.slice(1))||ct(t,Ur(e))||ct(t,e))}let ne=null,bo=null;function Vi(t){const e=ne;return ne=t,bo=t&&t.type.__scopeId||null,e}function Hc(t){bo=t}function $c(){bo=null}function me(t,e=ne,n){if(!e||t._n)return t;const r=(...a)=>{r._d&&d0(-1);const i=Vi(e);let o;try{o=t(...a)}finally{Vi(i),r._d&&d0(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function qo(t){const{type:e,vnode:n,proxy:r,withProxy:a,props:i,propsOptions:[o],slots:s,attrs:c,emit:u,render:l,renderCache:m,data:p,setupState:g,ctx:S,inheritAttrs:z}=t;let T,y;const A=Vi(t);try{if(n.shapeFlag&4){const j=a||r,$=j;T=je(l.call($,j,m,i,g,p,S)),y=c}else{const j=e;T=je(j.length>1?j(i,{attrs:c,slots:s,emit:u}):j(i,null)),y=e.props?c:tp(c)}}catch(j){ca.length=0,go(j,t,1),T=Pt(Rr)}let O=T;if(y&&z!==!1){const j=Object.keys(y),{shapeFlag:$}=O;j.length&&$&7&&(o&&j.some(kc)&&(y=ep(y,o)),O=Tr(O,y))}return n.dirs&&(O=Tr(O),O.dirs=O.dirs?O.dirs.concat(n.dirs):n.dirs),n.transition&&(O.transition=n.transition),T=O,Vi(A),T}const tp=t=>{let e;for(const n in t)(n==="class"||n==="style"||lo(n))&&((e||(e={}))[n]=t[n]);return e},ep=(t,e)=>{const n={};for(const r in t)(!kc(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function np(t,e,n){const{props:r,children:a,component:i}=t,{props:o,children:s,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?n0(r,o,u):!!o;if(c&8){const l=e.dynamicProps;for(let m=0;m<l.length;m++){const p=l[m];if(o[p]!==r[p]&&!vo(u,p))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?n0(r,o,u):!0:!!o;return!1}function n0(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(e[i]!==t[i]&&!vo(n,i))return!0}return!1}function rp({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const p1="components";function C7(t,e){return ip(p1,t,!0,e)||t}const ap=Symbol.for("v-ndc");function ip(t,e,n=!0,r=!1){const a=ne||qt;if(a){const i=a.type;if(t===p1){const s=Jp(i,!1);if(s&&(s===e||s===Ve(e)||s===mo(Ve(e))))return i}const o=r0(a[t]||i[t],e)||r0(a.appContext[t],e);return!o&&r?i:o}}function r0(t,e){return t&&(t[e]||t[Ve(e)]||t[mo(Ve(e))])}const op=t=>t.__isSuspense;function sp(t,e){e&&e.pendingBranch?nt(t)?e.effects.push(...t):e.effects.push(t):Qm(t)}const cp=Symbol.for("v-scx"),lp=()=>Qe(cp),Ja={};function Pi(t,e,n){return h1(t,e,n)}function h1(t,e,{immediate:n,deep:r,flush:a,once:i,onTrack:o,onTrigger:s}=Mt){if(e&&i){const N=e;e=(...q)=>{N(...q),$()}}const c=qt,u=N=>r===!0?N:hr(N,r===!1?1:void 0);let l,m=!1,p=!1;if(se(t)?(l=()=>t.value,m=Di(t)):xr(t)?(l=()=>u(t),m=!0):nt(t)?(p=!0,m=t.some(N=>xr(N)||Di(N)),l=()=>t.map(N=>{if(se(N))return N.value;if(xr(N))return u(N);if(at(N))return Pn(N,c,2)})):at(t)?e?l=()=>Pn(t,c,2):l=()=>(g&&g(),ze(t,c,3,[S])):l=ye,e&&r){const N=l;l=()=>hr(N())}let g,S=N=>{g=O.onStop=()=>{Pn(N,c,4),g=O.onStop=void 0}},z;if(_o)if(S=ye,e?n&&ze(e,c,3,[l(),p?[]:void 0,S]):l(),a==="sync"){const N=lp();z=N.__watcherHandles||(N.__watcherHandles=[])}else return ye;let T=p?new Array(t.length).fill(Ja):Ja;const y=()=>{if(!(!O.active||!O.dirty))if(e){const N=O.run();(r||m||(p?N.some((q,ft)=>Rn(q,T[ft])):Rn(N,T)))&&(g&&g(),ze(e,c,3,[N,T===Ja?void 0:p&&T[0]===Ja?[]:T,S]),T=N)}else O.run()};y.allowRecurse=!!e;let A;a==="sync"?A=y:a==="post"?A=()=>ae(y,c&&c.suspense):(y.pre=!0,c&&(y.id=c.uid),A=()=>Fc(y));const O=new Pc(l,ye,A),j=km(),$=()=>{O.stop(),j&&Cc(j.effects,O)};return e?n?y():T=O.run():a==="post"?ae(O.run.bind(O),c&&c.suspense):O.run(),z&&z.push($),$}function fp(t,e,n){const r=this.proxy,a=Vt(t)?t.includes(".")?g1(r,t):()=>r[t]:t.bind(r,r);let i;at(e)?i=e:(i=e.handler,n=e);const o=$a(this),s=h1(a,i.bind(r),n);return o(),s}function g1(t,e){const n=e.split(".");return()=>{let r=t;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function hr(t,e,n=0,r){if(!Tt(t)||t.__v_skip)return t;if(e&&e>0){if(n>=e)return t;n++}if(r=r||new Set,r.has(t))return t;if(r.add(t),se(t))hr(t.value,e,n,r);else if(nt(t))for(let a=0;a<t.length;a++)hr(t[a],e,n,r);else if(Iu(t)||_r(t))t.forEach(a=>{hr(a,e,n,r)});else if(ju(t))for(const a in t)hr(t[a],e,n,r);return t}function Dn(t,e,n,r){const a=t.dirs,i=e&&e.dirs;for(let o=0;o<a.length;o++){const s=a[o];i&&(s.oldValue=i[o].value);let c=s.dir[r];c&&(lr(),ze(c,n,8,[t.el,s,t,e]),fr())}}/*! #__NO_SIDE_EFFECTS__ */function v1(t,e){return at(t)?Yt({name:t.name},e,{setup:t}):t}const oa=t=>!!t.type.__asyncLoader,b1=t=>t.type.__isKeepAlive;function up(t,e){y1(t,"a",e)}function dp(t,e){y1(t,"da",e)}function y1(t,e,n=qt){const r=t.__wdc||(t.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return t()});if(yo(e,r,n),n){let a=n.parent;for(;a&&a.parent;)b1(a.parent.vnode)&&mp(r,e,n,a),a=a.parent}}function mp(t,e,n,r){const a=yo(e,t,r,!0);w1(()=>{Cc(r[e],a)},n)}function yo(t,e,n=qt,r=!1){if(n){const a=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;lr();const s=$a(n),c=ze(e,n,t,o);return s(),fr(),c});return r?a.unshift(i):a.push(i),i}}const sn=t=>(e,n=qt)=>(!_o||t==="sp")&&yo(t,(...r)=>e(...r),n),pp=sn("bm"),hp=sn("m"),gp=sn("bu"),vp=sn("u"),bp=sn("bum"),w1=sn("um"),yp=sn("sp"),wp=sn("rtg"),Ap=sn("rtc");function _p(t,e=qt){yo("ec",t,e)}function Xo(t,e,n={},r,a){if(ne.isCE||ne.parent&&oa(ne.parent)&&ne.parent.isCE)return e!=="default"&&(n.name=e),Pt("slot",n,r&&r());let i=t[e];i&&i._c&&(i._d=!1),We();const o=i&&A1(i(n)),s=Dp(he,{key:n.key||o&&o.key||`_${e}`},o||(r?r():[]),o&&t._===1?64:-2);return!a&&s.scopeId&&(s.slotScopeIds=[s.scopeId+"-s"]),i&&i._c&&(i._d=!0),s}function A1(t){return t.some(e=>Yi(e)?!(e.type===Rr||e.type===he&&!A1(e.children)):!0)?t:null}const zs=t=>t?T1(t)?Uc(t)||t.proxy:zs(t.parent):null,sa=Yt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>zs(t.parent),$root:t=>zs(t.root),$emit:t=>t.emit,$options:t=>Bc(t),$forceUpdate:t=>t.f||(t.f=()=>{t.effect.dirty=!0,Fc(t.update)}),$nextTick:t=>t.n||(t.n=l1.bind(t.proxy)),$watch:t=>fp.bind(t)}),Qo=(t,e)=>t!==Mt&&!t.__isScriptSetup&&ct(t,e),xp={get({_:t},e){const{ctx:n,setupState:r,data:a,props:i,accessCache:o,type:s,appContext:c}=t;let u;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return a[e];case 4:return n[e];case 3:return i[e]}else{if(Qo(r,e))return o[e]=1,r[e];if(a!==Mt&&ct(a,e))return o[e]=2,a[e];if((u=t.propsOptions[0])&&ct(u,e))return o[e]=3,i[e];if(n!==Mt&&ct(n,e))return o[e]=4,n[e];Rs&&(o[e]=0)}}const l=sa[e];let m,p;if(l)return e==="$attrs"&&oe(t,"get",e),l(t);if((m=s.__cssModules)&&(m=m[e]))return m;if(n!==Mt&&ct(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,ct(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:a,ctx:i}=t;return Qo(a,e)?(a[e]=n,!0):r!==Mt&&ct(r,e)?(r[e]=n,!0):ct(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:a,propsOptions:i}},o){let s;return!!n[o]||t!==Mt&&ct(t,o)||Qo(e,o)||(s=i[0])&&ct(s,o)||ct(r,o)||ct(sa,o)||ct(a.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:ct(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function a0(t){return nt(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Rs=!0;function kp(t){const e=Bc(t),n=t.proxy,r=t.ctx;Rs=!1,e.beforeCreate&&i0(e.beforeCreate,t,"bc");const{data:a,computed:i,methods:o,watch:s,provide:c,inject:u,created:l,beforeMount:m,mounted:p,beforeUpdate:g,updated:S,activated:z,deactivated:T,beforeDestroy:y,beforeUnmount:A,destroyed:O,unmounted:j,render:$,renderTracked:N,renderTriggered:q,errorCaptured:ft,serverPrefetch:ut,expose:_t,inheritAttrs:Wt,components:Zt,directives:jt,filters:Ae}=e;if(u&&Cp(u,r,null),o)for(const W in o){const et=o[W];at(et)&&(r[W]=et.bind(n))}if(a){const W=a.call(n,n);Tt(W)&&(t.data=ho(W))}if(Rs=!0,i)for(const W in i){const et=i[W],Jt=at(et)?et.bind(n,n):at(et.get)?et.get.bind(n,n):ye,Dt=!at(et)&&at(et.set)?et.set.bind(n):ye,Ht=Ce({get:Jt,set:Dt});Object.defineProperty(r,W,{enumerable:!0,configurable:!0,get:()=>Ht.value,set:wt=>Ht.value=wt})}if(s)for(const W in s)_1(s[W],r,n,W);if(c){const W=at(c)?c.call(n):c;Reflect.ownKeys(W).forEach(et=>{Oi(et,W[et])})}l&&i0(l,t,"c");function tt(W,et){nt(et)?et.forEach(Jt=>W(Jt.bind(n))):et&&W(et.bind(n))}if(tt(pp,m),tt(hp,p),tt(gp,g),tt(vp,S),tt(up,z),tt(dp,T),tt(_p,ft),tt(Ap,N),tt(wp,q),tt(bp,A),tt(w1,j),tt(yp,ut),nt(_t))if(_t.length){const W=t.exposed||(t.exposed={});_t.forEach(et=>{Object.defineProperty(W,et,{get:()=>n[et],set:Jt=>n[et]=Jt})})}else t.exposed||(t.exposed={});$&&t.render===ye&&(t.render=$),Wt!=null&&(t.inheritAttrs=Wt),Zt&&(t.components=Zt),jt&&(t.directives=jt)}function Cp(t,e,n=ye){nt(t)&&(t=Ts(t));for(const r in t){const a=t[r];let i;Tt(a)?"default"in a?i=Qe(a.from||r,a.default,!0):i=Qe(a.from||r):i=Qe(a),se(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function i0(t,e,n){ze(nt(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function _1(t,e,n,r){const a=r.includes(".")?g1(n,r):()=>n[r];if(Vt(t)){const i=e[t];at(i)&&Pi(a,i)}else if(at(t))Pi(a,t.bind(n));else if(Tt(t))if(nt(t))t.forEach(i=>_1(i,e,n,r));else{const i=at(t.handler)?t.handler.bind(n):e[t.handler];at(i)&&Pi(a,i,t)}}function Bc(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,s=i.get(e);let c;return s?c=s:!a.length&&!n&&!r?c=e:(c={},a.length&&a.forEach(u=>Ui(c,u,o,!0)),Ui(c,e,o)),Tt(e)&&i.set(e,c),c}function Ui(t,e,n,r=!1){const{mixins:a,extends:i}=e;i&&Ui(t,i,n,!0),a&&a.forEach(o=>Ui(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const s=Sp[o]||n&&n[o];t[o]=s?s(t[o],e[o]):e[o]}return t}const Sp={data:o0,props:s0,emits:s0,methods:na,computed:na,beforeCreate:te,created:te,beforeMount:te,mounted:te,beforeUpdate:te,updated:te,beforeDestroy:te,beforeUnmount:te,destroyed:te,unmounted:te,activated:te,deactivated:te,errorCaptured:te,serverPrefetch:te,components:na,directives:na,watch:Mp,provide:o0,inject:Ep};function o0(t,e){return e?t?function(){return Yt(at(t)?t.call(this,this):t,at(e)?e.call(this,this):e)}:e:t}function Ep(t,e){return na(Ts(t),Ts(e))}function Ts(t){if(nt(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function te(t,e){return t?[...new Set([].concat(t,e))]:e}function na(t,e){return t?Yt(Object.create(null),t,e):e}function s0(t,e){return t?nt(t)&&nt(e)?[...new Set([...t,...e])]:Yt(Object.create(null),a0(t),a0(e??{})):e}function Mp(t,e){if(!t)return e;if(!e)return t;const n=Yt(Object.create(null),t);for(const r in e)n[r]=te(t[r],e[r]);return n}function x1(){return{app:null,config:{isNativeTag:lm,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Pp=0;function Op(t,e){return function(r,a=null){at(r)||(r=Yt({},r)),a!=null&&!Tt(a)&&(a=null);const i=x1(),o=new WeakSet;let s=!1;const c=i.app={_uid:Pp++,_component:r,_props:a,_container:null,_context:i,_instance:null,version:eh,get config(){return i.config},set config(u){},use(u,...l){return o.has(u)||(u&&at(u.install)?(o.add(u),u.install(c,...l)):at(u)&&(o.add(u),u(c,...l))),c},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),c},component(u,l){return l?(i.components[u]=l,c):i.components[u]},directive(u,l){return l?(i.directives[u]=l,c):i.directives[u]},mount(u,l,m){if(!s){const p=Pt(r,a);return p.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),l&&e?e(p,u):t(p,u,m),s=!0,c._container=u,u.__vue_app__=c,Uc(p.component)||p.component.proxy}},unmount(){s&&(t(null,c._container),delete c._container.__vue_app__)},provide(u,l){return i.provides[u]=l,c},runWithContext(u){Wi=c;try{return u()}finally{Wi=null}}};return c}}let Wi=null;function Oi(t,e){if(qt){let n=qt.provides;const r=qt.parent&&qt.parent.provides;r===n&&(n=qt.provides=Object.create(r)),n[t]=e}}function Qe(t,e,n=!1){const r=qt||ne;if(r||Wi){const a=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Wi._context.provides;if(a&&t in a)return a[t];if(arguments.length>1)return n&&at(e)?e.call(r&&r.proxy):e}}function zp(t,e,n,r=!1){const a={},i={};Bi(i,Ao,1),t.propsDefaults=Object.create(null),k1(t,e,a,i);for(const o in t.propsOptions[0])o in a||(a[o]=void 0);n?t.props=r?a:t1(a):t.type.props?t.props=a:t.props=i,t.attrs=i}function Rp(t,e,n,r){const{props:a,attrs:i,vnode:{patchFlag:o}}=t,s=dt(a),[c]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const l=t.vnode.dynamicProps;for(let m=0;m<l.length;m++){let p=l[m];if(vo(t.emitsOptions,p))continue;const g=e[p];if(c)if(ct(i,p))g!==i[p]&&(i[p]=g,u=!0);else{const S=Ve(p);a[S]=Is(c,s,S,g,t,!1)}else g!==i[p]&&(i[p]=g,u=!0)}}}else{k1(t,e,a,i)&&(u=!0);let l;for(const m in s)(!e||!ct(e,m)&&((l=Ur(m))===m||!ct(e,l)))&&(c?n&&(n[m]!==void 0||n[l]!==void 0)&&(a[m]=Is(c,s,m,void 0,t,!0)):delete a[m]);if(i!==s)for(const m in i)(!e||!ct(e,m))&&(delete i[m],u=!0)}u&&Xe(t,"set","$attrs")}function k1(t,e,n,r){const[a,i]=t.propsOptions;let o=!1,s;if(e)for(let c in e){if(Ei(c))continue;const u=e[c];let l;a&&ct(a,l=Ve(c))?!i||!i.includes(l)?n[l]=u:(s||(s={}))[l]=u:vo(t.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(i){const c=dt(n),u=s||Mt;for(let l=0;l<i.length;l++){const m=i[l];n[m]=Is(a,c,m,u[m],t,!ct(u,m))}}return o}function Is(t,e,n,r,a,i){const o=t[n];if(o!=null){const s=ct(o,"default");if(s&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&at(c)){const{propsDefaults:u}=a;if(n in u)r=u[n];else{const l=$a(a);r=u[n]=c.call(null,e),l()}}else r=c}o[0]&&(i&&!s?r=!1:o[1]&&(r===""||r===Ur(n))&&(r=!0))}return r}function C1(t,e,n=!1){const r=e.propsCache,a=r.get(t);if(a)return a;const i=t.props,o={},s=[];let c=!1;if(!at(t)){const l=m=>{c=!0;const[p,g]=C1(m,e,!0);Yt(o,p),g&&s.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}if(!i&&!c)return Tt(t)&&r.set(t,Ar),Ar;if(nt(i))for(let l=0;l<i.length;l++){const m=Ve(i[l]);c0(m)&&(o[m]=Mt)}else if(i)for(const l in i){const m=Ve(l);if(c0(m)){const p=i[l],g=o[m]=nt(p)||at(p)?{type:p}:Yt({},p);if(g){const S=u0(Boolean,g.type),z=u0(String,g.type);g[0]=S>-1,g[1]=z<0||S<z,(S>-1||ct(g,"default"))&&s.push(m)}}}const u=[o,s];return Tt(t)&&r.set(t,u),u}function c0(t){return t[0]!=="$"}function l0(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function f0(t,e){return l0(t)===l0(e)}function u0(t,e){return nt(e)?e.findIndex(n=>f0(n,t)):at(e)&&f0(e,t)?0:-1}const S1=t=>t[0]==="_"||t==="$stable",Dc=t=>nt(t)?t.map(je):[je(t)],Tp=(t,e,n)=>{if(e._n)return e;const r=me((...a)=>Dc(e(...a)),n);return r._c=!1,r},E1=(t,e,n)=>{const r=t._ctx;for(const a in t){if(S1(a))continue;const i=t[a];if(at(i))e[a]=Tp(a,i,r);else if(i!=null){const o=Dc(i);e[a]=()=>o}}},M1=(t,e)=>{const n=Dc(e);t.slots.default=()=>n},Ip=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=dt(e),Bi(e,"_",n)):E1(e,t.slots={})}else t.slots={},e&&M1(t,e);Bi(t.slots,Ao,1)},Lp=(t,e,n)=>{const{vnode:r,slots:a}=t;let i=!0,o=Mt;if(r.shapeFlag&32){const s=e._;s?n&&s===1?i=!1:(Yt(a,e),!n&&s===1&&delete a._):(i=!e.$stable,E1(e,a)),o=e}else e&&(M1(t,e),o={default:1});if(i)for(const s in a)!S1(s)&&o[s]==null&&delete a[s]};function Ls(t,e,n,r,a=!1){if(nt(t)){t.forEach((p,g)=>Ls(p,e&&(nt(e)?e[g]:e),n,r,a));return}if(oa(r)&&!a)return;const i=r.shapeFlag&4?Uc(r.component)||r.component.proxy:r.el,o=a?null:i,{i:s,r:c}=t,u=e&&e.r,l=s.refs===Mt?s.refs={}:s.refs,m=s.setupState;if(u!=null&&u!==c&&(Vt(u)?(l[u]=null,ct(m,u)&&(m[u]=null)):se(u)&&(u.value=null)),at(c))Pn(c,s,12,[o,l]);else{const p=Vt(c),g=se(c),S=t.f;if(p||g){const z=()=>{if(S){const T=p?ct(m,c)?m[c]:l[c]:c.value;a?nt(T)&&Cc(T,i):nt(T)?T.includes(i)||T.push(i):p?(l[c]=[i],ct(m,c)&&(m[c]=l[c])):(c.value=[i],t.k&&(l[t.k]=c.value))}else p?(l[c]=o,ct(m,c)&&(m[c]=o)):g&&(c.value=o,t.k&&(l[t.k]=o))};a||S?z():(z.id=-1,ae(z,n))}}}const ae=sp;function Np(t){return jp(t)}function jp(t,e){const n=Fu();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:o,createText:s,createComment:c,setText:u,setElementText:l,parentNode:m,nextSibling:p,setScopeId:g=ye,insertStaticContent:S}=t,z=(f,d,h,w=null,v=null,k=null,M=void 0,x=null,C=!!d.dynamicChildren)=>{if(f===d)return;f&&!Zr(f,d)&&(w=b(f),wt(f,v,k,!0),f=null),d.patchFlag===-2&&(C=!1,d.dynamicChildren=null);const{type:_,ref:P,shapeFlag:F}=d;switch(_){case wo:T(f,d,h,w);break;case Rr:y(f,d,h,w);break;case Jo:f==null&&A(d,h,w,M);break;case he:Zt(f,d,h,w,v,k,M,x,C);break;default:F&1?$(f,d,h,w,v,k,M,x,C):F&6?jt(f,d,h,w,v,k,M,x,C):(F&64||F&128)&&_.process(f,d,h,w,v,k,M,x,C,I)}P!=null&&v&&Ls(P,f&&f.ref,k,d||f,!d)},T=(f,d,h,w)=>{if(f==null)r(d.el=s(d.children),h,w);else{const v=d.el=f.el;d.children!==f.children&&u(v,d.children)}},y=(f,d,h,w)=>{f==null?r(d.el=c(d.children||""),h,w):d.el=f.el},A=(f,d,h,w)=>{[f.el,f.anchor]=S(f.children,d,h,w,f.el,f.anchor)},O=({el:f,anchor:d},h,w)=>{let v;for(;f&&f!==d;)v=p(f),r(f,h,w),f=v;r(d,h,w)},j=({el:f,anchor:d})=>{let h;for(;f&&f!==d;)h=p(f),a(f),f=h;a(d)},$=(f,d,h,w,v,k,M,x,C)=>{d.type==="svg"?M="svg":d.type==="math"&&(M="mathml"),f==null?N(d,h,w,v,k,M,x,C):ut(f,d,v,k,M,x,C)},N=(f,d,h,w,v,k,M,x)=>{let C,_;const{props:P,shapeFlag:F,transition:L,dirs:H}=f;if(C=f.el=o(f.type,k,P&&P.is,P),F&8?l(C,f.children):F&16&&ft(f.children,C,null,w,v,Zo(f,k),M,x),H&&Dn(f,null,w,"created"),q(C,f,f.scopeId,M,w),P){for(const G in P)G!=="value"&&!Ei(G)&&i(C,G,null,P[G],k,f.children,w,v,st);"value"in P&&i(C,"value",null,P.value,k),(_=P.onVnodeBeforeMount)&&Le(_,w,f)}H&&Dn(f,null,w,"beforeMount");const B=Fp(v,L);B&&L.beforeEnter(C),r(C,d,h),((_=P&&P.onVnodeMounted)||B||H)&&ae(()=>{_&&Le(_,w,f),B&&L.enter(C),H&&Dn(f,null,w,"mounted")},v)},q=(f,d,h,w,v)=>{if(h&&g(f,h),w)for(let k=0;k<w.length;k++)g(f,w[k]);if(v){let k=v.subTree;if(d===k){const M=v.vnode;q(f,M,M.scopeId,M.slotScopeIds,v.parent)}}},ft=(f,d,h,w,v,k,M,x,C=0)=>{for(let _=C;_<f.length;_++){const P=f[_]=x?wn(f[_]):je(f[_]);z(null,P,d,h,w,v,k,M,x)}},ut=(f,d,h,w,v,k,M)=>{const x=d.el=f.el;let{patchFlag:C,dynamicChildren:_,dirs:P}=d;C|=f.patchFlag&16;const F=f.props||Mt,L=d.props||Mt;let H;if(h&&Vn(h,!1),(H=L.onVnodeBeforeUpdate)&&Le(H,h,d,f),P&&Dn(d,f,h,"beforeUpdate"),h&&Vn(h,!0),_?_t(f.dynamicChildren,_,x,h,w,Zo(d,v),k):M||et(f,d,x,null,h,w,Zo(d,v),k,!1),C>0){if(C&16)Wt(x,d,F,L,h,w,v);else if(C&2&&F.class!==L.class&&i(x,"class",null,L.class,v),C&4&&i(x,"style",F.style,L.style,v),C&8){const B=d.dynamicProps;for(let G=0;G<B.length;G++){const J=B[G],ot=F[J],Rt=L[J];(Rt!==ot||J==="value")&&i(x,J,ot,Rt,v,f.children,h,w,st)}}C&1&&f.children!==d.children&&l(x,d.children)}else!M&&_==null&&Wt(x,d,F,L,h,w,v);((H=L.onVnodeUpdated)||P)&&ae(()=>{H&&Le(H,h,d,f),P&&Dn(d,f,h,"updated")},w)},_t=(f,d,h,w,v,k,M)=>{for(let x=0;x<d.length;x++){const C=f[x],_=d[x],P=C.el&&(C.type===he||!Zr(C,_)||C.shapeFlag&70)?m(C.el):h;z(C,_,P,null,w,v,k,M,!0)}},Wt=(f,d,h,w,v,k,M)=>{if(h!==w){if(h!==Mt)for(const x in h)!Ei(x)&&!(x in w)&&i(f,x,h[x],null,M,d.children,v,k,st);for(const x in w){if(Ei(x))continue;const C=w[x],_=h[x];C!==_&&x!=="value"&&i(f,x,_,C,M,d.children,v,k,st)}"value"in w&&i(f,"value",h.value,w.value,M)}},Zt=(f,d,h,w,v,k,M,x,C)=>{const _=d.el=f?f.el:s(""),P=d.anchor=f?f.anchor:s("");let{patchFlag:F,dynamicChildren:L,slotScopeIds:H}=d;H&&(x=x?x.concat(H):H),f==null?(r(_,h,w),r(P,h,w),ft(d.children||[],h,P,v,k,M,x,C)):F>0&&F&64&&L&&f.dynamicChildren?(_t(f.dynamicChildren,L,h,v,k,M,x),(d.key!=null||v&&d===v.subTree)&&P1(f,d,!0)):et(f,d,h,P,v,k,M,x,C)},jt=(f,d,h,w,v,k,M,x,C)=>{d.slotScopeIds=x,f==null?d.shapeFlag&512?v.ctx.activate(d,h,w,M,C):Ae(d,h,w,v,k,M,C):xt(f,d,C)},Ae=(f,d,h,w,v,k,M)=>{const x=f.component=Gp(f,w,v);if(b1(f)&&(x.ctx.renderer=I),qp(x),x.asyncDep){if(v&&v.registerDep(x,tt),!f.el){const C=x.subTree=Pt(Rr);y(null,C,d,h)}}else tt(x,f,d,h,v,k,M)},xt=(f,d,h)=>{const w=d.component=f.component;if(np(f,d,h))if(w.asyncDep&&!w.asyncResolved){W(w,d,h);return}else w.next=d,Xm(w.update),w.effect.dirty=!0,w.update();else d.el=f.el,w.vnode=d},tt=(f,d,h,w,v,k,M)=>{const x=()=>{if(f.isMounted){let{next:P,bu:F,u:L,parent:H,vnode:B}=f;{const de=O1(f);if(de){P&&(P.el=B.el,W(f,P,M)),de.asyncDep.then(()=>{f.isUnmounted||x()});return}}let G=P,J;Vn(f,!1),P?(P.el=B.el,W(f,P,M)):P=B,F&&Ko(F),(J=P.props&&P.props.onVnodeBeforeUpdate)&&Le(J,H,P,B),Vn(f,!0);const ot=qo(f),Rt=f.subTree;f.subTree=ot,z(Rt,ot,m(Rt.el),b(Rt),f,v,k),P.el=ot.el,G===null&&rp(f,ot.el),L&&ae(L,v),(J=P.props&&P.props.onVnodeUpdated)&&ae(()=>Le(J,H,P,B),v)}else{let P;const{el:F,props:L}=d,{bm:H,m:B,parent:G}=f,J=oa(d);if(Vn(f,!1),H&&Ko(H),!J&&(P=L&&L.onVnodeBeforeMount)&&Le(P,G,d),Vn(f,!0),F&&Z){const ot=()=>{f.subTree=qo(f),Z(F,f.subTree,f,v,null)};J?d.type.__asyncLoader().then(()=>!f.isUnmounted&&ot()):ot()}else{const ot=f.subTree=qo(f);z(null,ot,h,w,f,v,k),d.el=ot.el}if(B&&ae(B,v),!J&&(P=L&&L.onVnodeMounted)){const ot=d;ae(()=>Le(P,G,ot),v)}(d.shapeFlag&256||G&&oa(G.vnode)&&G.vnode.shapeFlag&256)&&f.a&&ae(f.a,v),f.isMounted=!0,d=h=w=null}},C=f.effect=new Pc(x,ye,()=>Fc(_),f.scope),_=f.update=()=>{C.dirty&&C.run()};_.id=f.uid,Vn(f,!0),_()},W=(f,d,h)=>{d.component=f;const w=f.vnode.props;f.vnode=d,f.next=null,Rp(f,d.props,w,h),Lp(f,d.children,h),lr(),e0(f),fr()},et=(f,d,h,w,v,k,M,x,C=!1)=>{const _=f&&f.children,P=f?f.shapeFlag:0,F=d.children,{patchFlag:L,shapeFlag:H}=d;if(L>0){if(L&128){Dt(_,F,h,w,v,k,M,x,C);return}else if(L&256){Jt(_,F,h,w,v,k,M,x,C);return}}H&8?(P&16&&st(_,v,k),F!==_&&l(h,F)):P&16?H&16?Dt(_,F,h,w,v,k,M,x,C):st(_,v,k,!0):(P&8&&l(h,""),H&16&&ft(F,h,w,v,k,M,x,C))},Jt=(f,d,h,w,v,k,M,x,C)=>{f=f||Ar,d=d||Ar;const _=f.length,P=d.length,F=Math.min(_,P);let L;for(L=0;L<F;L++){const H=d[L]=C?wn(d[L]):je(d[L]);z(f[L],H,h,null,v,k,M,x,C)}_>P?st(f,v,k,!0,!1,F):ft(d,h,w,v,k,M,x,C,F)},Dt=(f,d,h,w,v,k,M,x,C)=>{let _=0;const P=d.length;let F=f.length-1,L=P-1;for(;_<=F&&_<=L;){const H=f[_],B=d[_]=C?wn(d[_]):je(d[_]);if(Zr(H,B))z(H,B,h,null,v,k,M,x,C);else break;_++}for(;_<=F&&_<=L;){const H=f[F],B=d[L]=C?wn(d[L]):je(d[L]);if(Zr(H,B))z(H,B,h,null,v,k,M,x,C);else break;F--,L--}if(_>F){if(_<=L){const H=L+1,B=H<P?d[H].el:w;for(;_<=L;)z(null,d[_]=C?wn(d[_]):je(d[_]),h,B,v,k,M,x,C),_++}}else if(_>L)for(;_<=F;)wt(f[_],v,k,!0),_++;else{const H=_,B=_,G=new Map;for(_=B;_<=L;_++){const At=d[_]=C?wn(d[_]):je(d[_]);At.key!=null&&G.set(At.key,_)}let J,ot=0;const Rt=L-B+1;let de=!1,qr=0;const _e=new Array(Rt);for(_=0;_<Rt;_++)_e[_]=0;for(_=H;_<=F;_++){const At=f[_];if(ot>=Rt){wt(At,v,k,!0);continue}let Ft;if(At.key!=null)Ft=G.get(At.key);else for(J=B;J<=L;J++)if(_e[J-B]===0&&Zr(At,d[J])){Ft=J;break}Ft===void 0?wt(At,v,k,!0):(_e[Ft-B]=_+1,Ft>=qr?qr=Ft:de=!0,z(At,d[Ft],h,null,v,k,M,x,C),ot++)}const Xr=de?Hp(_e):Ar;for(J=Xr.length-1,_=Rt-1;_>=0;_--){const At=B+_,Ft=d[At],Qr=At+1<P?d[At+1].el:w;_e[_]===0?z(null,Ft,h,Qr,v,k,M,x,C):de&&(J<0||_!==Xr[J]?Ht(Ft,h,Qr,2):J--)}}},Ht=(f,d,h,w,v=null)=>{const{el:k,type:M,transition:x,children:C,shapeFlag:_}=f;if(_&6){Ht(f.component.subTree,d,h,w);return}if(_&128){f.suspense.move(d,h,w);return}if(_&64){M.move(f,d,h,I);return}if(M===he){r(k,d,h);for(let F=0;F<C.length;F++)Ht(C[F],d,h,w);r(f.anchor,d,h);return}if(M===Jo){O(f,d,h);return}if(w!==2&&_&1&&x)if(w===0)x.beforeEnter(k),r(k,d,h),ae(()=>x.enter(k),v);else{const{leave:F,delayLeave:L,afterLeave:H}=x,B=()=>r(k,d,h),G=()=>{F(k,()=>{B(),H&&H()})};L?L(k,B,G):G()}else r(k,d,h)},wt=(f,d,h,w=!1,v=!1)=>{const{type:k,props:M,ref:x,children:C,dynamicChildren:_,shapeFlag:P,patchFlag:F,dirs:L}=f;if(x!=null&&Ls(x,null,h,f,!0),P&256){d.ctx.deactivate(f);return}const H=P&1&&L,B=!oa(f);let G;if(B&&(G=M&&M.onVnodeBeforeUnmount)&&Le(G,d,f),P&6)Ke(f.component,h,w);else{if(P&128){f.suspense.unmount(h,w);return}H&&Dn(f,null,d,"beforeUnmount"),P&64?f.type.remove(f,d,h,v,I,w):_&&(k!==he||F>0&&F&64)?st(_,d,h,!1,!0):(k===he&&F&384||!v&&P&16)&&st(C,d,h),w&&fe(f)}(B&&(G=M&&M.onVnodeUnmounted)||H)&&ae(()=>{G&&Le(G,d,f),H&&Dn(f,null,d,"unmounted")},h)},fe=f=>{const{type:d,el:h,anchor:w,transition:v}=f;if(d===he){ue(h,w);return}if(d===Jo){j(f);return}const k=()=>{a(h),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(f.shapeFlag&1&&v&&!v.persisted){const{leave:M,delayLeave:x}=v,C=()=>M(h,k);x?x(f.el,k,C):C()}else k()},ue=(f,d)=>{let h;for(;f!==d;)h=p(f),a(f),f=h;a(d)},Ke=(f,d,h)=>{const{bum:w,scope:v,update:k,subTree:M,um:x}=f;w&&Ko(w),v.stop(),k&&(k.active=!1,wt(M,f,d,h)),x&&ae(x,d),ae(()=>{f.isUnmounted=!0},d),d&&d.pendingBranch&&!d.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===d.pendingId&&(d.deps--,d.deps===0&&d.resolve())},st=(f,d,h,w=!1,v=!1,k=0)=>{for(let M=k;M<f.length;M++)wt(f[M],d,h,w,v)},b=f=>f.shapeFlag&6?b(f.component.subTree):f.shapeFlag&128?f.suspense.next():p(f.anchor||f.el);let R=!1;const E=(f,d,h)=>{f==null?d._vnode&&wt(d._vnode,null,null,!0):z(d._vnode||null,f,d,null,null,null,h),R||(R=!0,e0(),u1(),R=!1),d._vnode=f},I={p:z,um:wt,m:Ht,r:fe,mt:Ae,mc:ft,pc:et,pbc:_t,n:b,o:t};let U,Z;return e&&([U,Z]=e(I)),{render:E,hydrate:U,createApp:Op(E,U)}}function Zo({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Vn({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Fp(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function P1(t,e,n=!1){const r=t.children,a=e.children;if(nt(r)&&nt(a))for(let i=0;i<r.length;i++){const o=r[i];let s=a[i];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[i]=wn(a[i]),s.el=o.el),n||P1(o,s)),s.type===wo&&(s.el=o.el)}}function Hp(t){const e=t.slice(),n=[0];let r,a,i,o,s;const c=t.length;for(r=0;r<c;r++){const u=t[r];if(u!==0){if(a=n[n.length-1],t[a]<u){e[r]=a,n.push(r);continue}for(i=0,o=n.length-1;i<o;)s=i+o>>1,t[n[s]]<u?i=s+1:o=s;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function O1(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:O1(e)}const $p=t=>t.__isTeleport,he=Symbol.for("v-fgt"),wo=Symbol.for("v-txt"),Rr=Symbol.for("v-cmt"),Jo=Symbol.for("v-stc"),ca=[];let Ee=null;function We(t=!1){ca.push(Ee=t?null:[])}function Bp(){ca.pop(),Ee=ca[ca.length-1]||null}let xa=1;function d0(t){xa+=t}function z1(t){return t.dynamicChildren=xa>0?Ee||Ar:null,Bp(),xa>0&&Ee&&Ee.push(t),t}function cn(t,e,n,r,a,i){return z1(X(t,e,n,r,a,i,!0))}function Dp(t,e,n,r,a){return z1(Pt(t,e,n,r,a,!0))}function Yi(t){return t?t.__v_isVNode===!0:!1}function Zr(t,e){return t.type===e.type&&t.key===e.key}const Ao="__vInternal",R1=({key:t})=>t??null,zi=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Vt(t)||se(t)||at(t)?{i:ne,r:t,k:e,f:!!n}:t:null);function X(t,e=null,n=null,r=0,a=null,i=t===he?0:1,o=!1,s=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&R1(e),ref:e&&zi(e),scopeId:bo,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:ne};return s?(Vc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Vt(n)?8:16),xa>0&&!o&&Ee&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Ee.push(c),c}const Pt=Vp;function Vp(t,e=null,n=null,r=0,a=null,i=!1){if((!t||t===ap)&&(t=Rr),Yi(t)){const s=Tr(t,e,!0);return n&&Vc(s,n),xa>0&&!i&&Ee&&(s.shapeFlag&6?Ee[Ee.indexOf(t)]=s:Ee.push(s)),s.patchFlag|=-2,s}if(th(t)&&(t=t.__vccOpts),e){e=Up(e);let{class:s,style:c}=e;s&&!Vt(s)&&(e.class=Mc(s)),Tt(c)&&(n1(c)&&!nt(c)&&(c=Yt({},c)),e.style=Ec(c))}const o=Vt(t)?1:op(t)?128:$p(t)?64:Tt(t)?4:at(t)?2:0;return X(t,e,n,r,a,o,i,!0)}function Up(t){return t?n1(t)||Ao in t?Yt({},t):t:null}function Tr(t,e,n=!1){const{props:r,ref:a,patchFlag:i,children:o}=t,s=e?Wp(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:s,key:s&&R1(s),ref:e&&e.ref?n&&a?nt(a)?a.concat(zi(e)):[a,zi(e)]:zi(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==he?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Tr(t.ssContent),ssFallback:t.ssFallback&&Tr(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function yt(t=" ",e=0){return Pt(wo,null,t,e)}function je(t){return t==null||typeof t=="boolean"?Pt(Rr):nt(t)?Pt(he,null,t.slice()):typeof t=="object"?wn(t):Pt(wo,null,String(t))}function wn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Tr(t)}function Vc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(nt(e))n=16;else if(typeof e=="object")if(r&65){const a=e.default;a&&(a._c&&(a._d=!1),Vc(t,a()),a._c&&(a._d=!0));return}else{n=32;const a=e._;!a&&!(Ao in e)?e._ctx=ne:a===3&&ne&&(ne.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else at(e)?(e={default:e,_ctx:ne},n=32):(e=String(e),r&64?(n=16,e=[yt(e)]):n=8);t.children=e,t.shapeFlag|=n}function Wp(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const a in r)if(a==="class")e.class!==r.class&&(e.class=Mc([e.class,r.class]));else if(a==="style")e.style=Ec([e.style,r.style]);else if(lo(a)){const i=e[a],o=r[a];o&&i!==o&&!(nt(i)&&i.includes(o))&&(e[a]=i?[].concat(i,o):o)}else a!==""&&(e[a]=r[a])}return e}function Le(t,e,n,r=null){ze(t,e,7,[n,r])}const Yp=x1();let Kp=0;function Gp(t,e,n){const r=t.type,a=(e?e.appContext:t.appContext)||Yp,i={uid:Kp++,vnode:t,type:r,parent:e,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new Bu(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:C1(r,a),emitsOptions:m1(r,a),emit:null,emitted:null,propsDefaults:Mt,inheritAttrs:r.inheritAttrs,ctx:Mt,data:Mt,props:Mt,attrs:Mt,slots:Mt,refs:Mt,setupState:Mt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Jm.bind(null,i),t.ce&&t.ce(i),i}let qt=null,Ki,Ns;{const t=Fu(),e=(n,r)=>{let a;return(a=t[n])||(a=t[n]=[]),a.push(r),i=>{a.length>1?a.forEach(o=>o(i)):a[0](i)}};Ki=e("__VUE_INSTANCE_SETTERS__",n=>qt=n),Ns=e("__VUE_SSR_SETTERS__",n=>_o=n)}const $a=t=>{const e=qt;return Ki(t),t.scope.on(),()=>{t.scope.off(),Ki(e)}},m0=()=>{qt&&qt.scope.off(),Ki(null)};function T1(t){return t.vnode.shapeFlag&4}let _o=!1;function qp(t,e=!1){e&&Ns(e);const{props:n,children:r}=t.vnode,a=T1(t);zp(t,n,a,e),Ip(t,r);const i=a?Xp(t,e):void 0;return e&&Ns(!1),i}function Xp(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=Lc(new Proxy(t.ctx,xp));const{setup:r}=n;if(r){const a=t.setupContext=r.length>1?Zp(t):null,i=$a(t);lr();const o=Pn(r,t,0,[t.props,a]);if(fr(),i(),Lu(o)){if(o.then(m0,m0),e)return o.then(s=>{p0(t,s,e)}).catch(s=>{go(s,t,0)});t.asyncDep=o}else p0(t,o,e)}else I1(t,e)}function p0(t,e,n){at(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Tt(e)&&(t.setupState=s1(e)),I1(t,n)}let h0;function I1(t,e,n){const r=t.type;if(!t.render){if(!e&&h0&&!r.render){const a=r.template||Bc(t).template;if(a){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:s,compilerOptions:c}=r,u=Yt(Yt({isCustomElement:i,delimiters:s},o),c);r.render=h0(a,u)}}t.render=r.render||ye}{const a=$a(t);lr();try{kp(t)}finally{fr(),a()}}}function Qp(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return oe(t,"get","$attrs"),e[n]}}))}function Zp(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return Qp(t)},slots:t.slots,emit:t.emit,expose:e}}function Uc(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(s1(Lc(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in sa)return sa[n](t)},has(e,n){return n in e||n in sa}}))}function Jp(t,e=!0){return at(t)?t.displayName||t.name:t.name||e&&t.__name}function th(t){return at(t)&&"__vccOpts"in t}const Ce=(t,e)=>Um(t,e,_o);function L1(t,e,n){const r=arguments.length;return r===2?Tt(e)&&!nt(e)?Yi(e)?Pt(t,null,[e]):Pt(t,e):Pt(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Yi(n)&&(n=[n]),Pt(t,e,n))}const eh="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const nh="http://www.w3.org/2000/svg",rh="http://www.w3.org/1998/Math/MathML",An=typeof document<"u"?document:null,g0=An&&An.createElement("template"),ah={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const a=e==="svg"?An.createElementNS(nh,t):e==="mathml"?An.createElementNS(rh,t):An.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:t=>An.createTextNode(t),createComment:t=>An.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>An.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,a,i){const o=n?n.previousSibling:e.lastChild;if(a&&(a===i||a.nextSibling))for(;e.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{g0.innerHTML=r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t;const s=g0.content;if(r==="svg"||r==="mathml"){const c=s.firstChild;for(;c.firstChild;)s.appendChild(c.firstChild);s.removeChild(c)}e.insertBefore(s,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},ih=Symbol("_vtc");function oh(t,e,n){const r=t[ih];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const sh=Symbol("_vod"),ch=Symbol("");function lh(t,e,n){const r=t.style,a=r.display,i=Vt(n);if(n&&!i){if(e&&!Vt(e))for(const o in e)n[o]==null&&js(r,o,"");for(const o in n)js(r,o,n[o])}else if(i){if(e!==n){const o=r[ch];o&&(n+=";"+o),r.cssText=n}}else e&&t.removeAttribute("style");sh in t&&(r.display=a)}const v0=/\s*!important$/;function js(t,e,n){if(nt(n))n.forEach(r=>js(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=fh(t,e);v0.test(n)?t.setProperty(Ur(r),n.replace(v0,""),"important"):t[r]=n}}const b0=["Webkit","Moz","ms"],ts={};function fh(t,e){const n=ts[e];if(n)return n;let r=Ve(e);if(r!=="filter"&&r in t)return ts[e]=r;r=mo(r);for(let a=0;a<b0.length;a++){const i=b0[a]+r;if(i in t)return ts[e]=i}return e}const y0="http://www.w3.org/1999/xlink";function uh(t,e,n,r,a){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(y0,e.slice(6,e.length)):t.setAttributeNS(y0,e,n);else{const i=wm(e);n==null||i&&!Hu(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function dh(t,e,n,r,a,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,a,i),t[e]=n??"";return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){t._value=n;const u=s==="OPTION"?t.getAttribute("value"):t.value,l=n??"";u!==l&&(t.value=l),n==null&&t.removeAttribute(e);return}let c=!1;if(n===""||n==null){const u=typeof t[e];u==="boolean"?n=Hu(n):n==null&&u==="string"?(n="",c=!0):u==="number"&&(n=0,c=!0)}try{t[e]=n}catch{}c&&t.removeAttribute(e)}function mh(t,e,n,r){t.addEventListener(e,n,r)}function ph(t,e,n,r){t.removeEventListener(e,n,r)}const w0=Symbol("_vei");function hh(t,e,n,r,a=null){const i=t[w0]||(t[w0]={}),o=i[e];if(r&&o)o.value=r;else{const[s,c]=gh(e);if(r){const u=i[e]=yh(r,a);mh(t,s,u,c)}else o&&(ph(t,s,o,c),i[e]=void 0)}}const A0=/(?:Once|Passive|Capture)$/;function gh(t){let e;if(A0.test(t)){e={};let r;for(;r=t.match(A0);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Ur(t.slice(2)),e]}let es=0;const vh=Promise.resolve(),bh=()=>es||(vh.then(()=>es=0),es=Date.now());function yh(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ze(wh(r,n.value),e,5,[r])};return n.value=t,n.attached=bh(),n}function wh(t,e){if(nt(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>a=>!a._stopped&&r&&r(a))}else return e}const _0=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Ah=(t,e,n,r,a,i,o,s,c)=>{const u=a==="svg";e==="class"?oh(t,r,u):e==="style"?lh(t,n,r):lo(e)?kc(e)||hh(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):_h(t,e,r,u))?dh(t,e,r,i,o,s,c):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),uh(t,e,r,u))};function _h(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&_0(e)&&at(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const a=t.tagName;if(a==="IMG"||a==="VIDEO"||a==="CANVAS"||a==="SOURCE")return!1}return _0(e)&&Vt(n)?!1:e in t}const xh=Yt({patchProp:Ah},ah);let x0;function kh(){return x0||(x0=Np(xh))}const Ch=(...t)=>{const e=kh().createApp(...t),{mount:n}=e;return e.mount=r=>{const a=Eh(r);if(!a)return;const i=e._component;!at(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,Sh(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},e};function Sh(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Eh(t){return Vt(t)?document.querySelector(t):t}var Mh=!1;/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const Ph=Symbol();var k0;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(k0||(k0={}));function Oh(){const t=_m(!0),e=t.run(()=>i1({}));let n=[],r=[];const a=Lc({install(i){a._a=i,i.provide(Ph,a),i.config.globalProperties.$pinia=a,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!Mh?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return a}const zh="/assets/montana-dsEKHcT6.jpg";/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const mr=typeof window<"u";function Rh(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const ht=Object.assign;function ns(t,e){const n={};for(const r in e){const a=e[r];n[r]=Te(a)?a.map(t):t(a)}return n}const la=()=>{},Te=Array.isArray,Th=/\/$/,Ih=t=>t.replace(Th,"");function rs(t,e,n="/"){let r,a={},i="",o="";const s=e.indexOf("#");let c=e.indexOf("?");return s<c&&s>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,s>-1?s:e.length),a=t(i)),s>-1&&(r=r||e.slice(0,s),o=e.slice(s,e.length)),r=Fh(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:a,hash:o}}function Lh(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function C0(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Nh(t,e,n){const r=e.matched.length-1,a=n.matched.length-1;return r>-1&&r===a&&Ir(e.matched[r],n.matched[a])&&N1(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Ir(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function N1(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!jh(t[n],e[n]))return!1;return!0}function jh(t,e){return Te(t)?S0(t,e):Te(e)?S0(e,t):t===e}function S0(t,e){return Te(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function Fh(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),a=r[r.length-1];(a===".."||a===".")&&r.push("");let i=n.length-1,o,s;for(o=0;o<r.length;o++)if(s=r[o],s!==".")if(s==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var ka;(function(t){t.pop="pop",t.push="push"})(ka||(ka={}));var fa;(function(t){t.back="back",t.forward="forward",t.unknown=""})(fa||(fa={}));function Hh(t){if(!t)if(mr){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Ih(t)}const $h=/^[^#]+#/;function Bh(t,e){return t.replace($h,"#")+e}function Dh(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const xo=()=>({left:window.pageXOffset,top:window.pageYOffset});function Vh(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),a=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!a)return;e=Dh(a,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function E0(t,e){return(history.state?history.state.position-e:-1)+t}const Fs=new Map;function Uh(t,e){Fs.set(t,e)}function Wh(t){const e=Fs.get(t);return Fs.delete(t),e}let Yh=()=>location.protocol+"//"+location.host;function j1(t,e){const{pathname:n,search:r,hash:a}=e,i=t.indexOf("#");if(i>-1){let s=a.includes(t.slice(i))?t.slice(i).length:1,c=a.slice(s);return c[0]!=="/"&&(c="/"+c),C0(c,"")}return C0(n,t)+r+a}function Kh(t,e,n,r){let a=[],i=[],o=null;const s=({state:p})=>{const g=j1(t,location),S=n.value,z=e.value;let T=0;if(p){if(n.value=g,e.value=p,o&&o===S){o=null;return}T=z?p.position-z.position:0}else r(g);a.forEach(y=>{y(n.value,S,{delta:T,type:ka.pop,direction:T?T>0?fa.forward:fa.back:fa.unknown})})};function c(){o=n.value}function u(p){a.push(p);const g=()=>{const S=a.indexOf(p);S>-1&&a.splice(S,1)};return i.push(g),g}function l(){const{history:p}=window;p.state&&p.replaceState(ht({},p.state,{scroll:xo()}),"")}function m(){for(const p of i)p();i=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",l)}return window.addEventListener("popstate",s),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:c,listen:u,destroy:m}}function M0(t,e,n,r=!1,a=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:a?xo():null}}function Gh(t){const{history:e,location:n}=window,r={value:j1(t,n)},a={value:e.state};a.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,l){const m=t.indexOf("#"),p=m>-1?(n.host&&document.querySelector("base")?t:t.slice(m))+c:Yh()+t+c;try{e[l?"replaceState":"pushState"](u,"",p),a.value=u}catch(g){console.error(g),n[l?"replace":"assign"](p)}}function o(c,u){const l=ht({},e.state,M0(a.value.back,c,a.value.forward,!0),u,{position:a.value.position});i(c,l,!0),r.value=c}function s(c,u){const l=ht({},a.value,e.state,{forward:c,scroll:xo()});i(l.current,l,!0);const m=ht({},M0(r.value,c,null),{position:l.position+1},u);i(c,m,!1),r.value=c}return{location:r,state:a,push:s,replace:o}}function qh(t){t=Hh(t);const e=Gh(t),n=Kh(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const a=ht({location:"",base:t,go:r,createHref:Bh.bind(null,t)},e,n);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>e.state.value}),a}function Xh(t){return typeof t=="string"||t&&typeof t=="object"}function F1(t){return typeof t=="string"||typeof t=="symbol"}const pn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},H1=Symbol("");var P0;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(P0||(P0={}));function Lr(t,e){return ht(new Error,{type:t,[H1]:!0},e)}function Ge(t,e){return t instanceof Error&&H1 in t&&(e==null||!!(t.type&e))}const O0="[^/]+?",Qh={sensitive:!1,strict:!1,start:!0,end:!0},Zh=/[.+*?^${}()[\]/\\]/g;function Jh(t,e){const n=ht({},Qh,e),r=[];let a=n.start?"^":"";const i=[];for(const u of t){const l=u.length?[]:[90];n.strict&&!u.length&&(a+="/");for(let m=0;m<u.length;m++){const p=u[m];let g=40+(n.sensitive?.25:0);if(p.type===0)m||(a+="/"),a+=p.value.replace(Zh,"\\$&"),g+=40;else if(p.type===1){const{value:S,repeatable:z,optional:T,regexp:y}=p;i.push({name:S,repeatable:z,optional:T});const A=y||O0;if(A!==O0){g+=10;try{new RegExp(`(${A})`)}catch(j){throw new Error(`Invalid custom RegExp for param "${S}" (${A}): `+j.message)}}let O=z?`((?:${A})(?:/(?:${A}))*)`:`(${A})`;m||(O=T&&u.length<2?`(?:/${O})`:"/"+O),T&&(O+="?"),a+=O,g+=20,T&&(g+=-8),z&&(g+=-20),A===".*"&&(g+=-50)}l.push(g)}r.push(l)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=.7000000000000001}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const o=new RegExp(a,n.sensitive?"":"i");function s(u){const l=u.match(o),m={};if(!l)return null;for(let p=1;p<l.length;p++){const g=l[p]||"",S=i[p-1];m[S.name]=g&&S.repeatable?g.split("/"):g}return m}function c(u){let l="",m=!1;for(const p of t){(!m||!l.endsWith("/"))&&(l+="/"),m=!1;for(const g of p)if(g.type===0)l+=g.value;else if(g.type===1){const{value:S,repeatable:z,optional:T}=g,y=S in u?u[S]:"";if(Te(y)&&!z)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const A=Te(y)?y.join("/"):y;if(!A)if(T)p.length<2&&(l.endsWith("/")?l=l.slice(0,-1):m=!0);else throw new Error(`Missing required param "${S}"`);l+=A}}return l||"/"}return{re:o,score:r,keys:i,parse:s,stringify:c}}function t6(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function e6(t,e){let n=0;const r=t.score,a=e.score;for(;n<r.length&&n<a.length;){const i=t6(r[n],a[n]);if(i)return i;n++}if(Math.abs(a.length-r.length)===1){if(z0(r))return 1;if(z0(a))return-1}return a.length-r.length}function z0(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const n6={type:0,value:""},r6=/[a-zA-Z0-9_]/;function a6(t){if(!t)return[[]];if(t==="/")return[[n6]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${u}": ${g}`)}let n=0,r=n;const a=[];let i;function o(){i&&a.push(i),i=[]}let s=0,c,u="",l="";function m(){u&&(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:l,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=c}for(;s<t.length;){if(c=t[s++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(u&&m(),o()):c===":"?(m(),n=1):p();break;case 4:p(),n=r;break;case 1:c==="("?n=2:r6.test(c)?p():(m(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&s--);break;case 2:c===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+c:n=3:l+=c;break;case 3:m(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&s--,l="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${u}"`),m(),o(),a}function i6(t,e,n){const r=Jh(a6(t.path),n),a=ht(r,{record:t,parent:e,children:[],alias:[]});return e&&!a.record.aliasOf==!e.record.aliasOf&&e.children.push(a),a}function o6(t,e){const n=[],r=new Map;e=I0({strict:!1,end:!0,sensitive:!1},e);function a(l){return r.get(l)}function i(l,m,p){const g=!p,S=s6(l);S.aliasOf=p&&p.record;const z=I0(e,l),T=[S];if("alias"in l){const O=typeof l.alias=="string"?[l.alias]:l.alias;for(const j of O)T.push(ht({},S,{components:p?p.record.components:S.components,path:j,aliasOf:p?p.record:S}))}let y,A;for(const O of T){const{path:j}=O;if(m&&j[0]!=="/"){const $=m.record.path,N=$[$.length-1]==="/"?"":"/";O.path=m.record.path+(j&&N+j)}if(y=i6(O,m,z),p?p.alias.push(y):(A=A||y,A!==y&&A.alias.push(y),g&&l.name&&!T0(y)&&o(l.name)),S.children){const $=S.children;for(let N=0;N<$.length;N++)i($[N],y,p&&p.children[N])}p=p||y,(y.record.components&&Object.keys(y.record.components).length||y.record.name||y.record.redirect)&&c(y)}return A?()=>{o(A)}:la}function o(l){if(F1(l)){const m=r.get(l);m&&(r.delete(l),n.splice(n.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=n.indexOf(l);m>-1&&(n.splice(m,1),l.record.name&&r.delete(l.record.name),l.children.forEach(o),l.alias.forEach(o))}}function s(){return n}function c(l){let m=0;for(;m<n.length&&e6(l,n[m])>=0&&(l.record.path!==n[m].record.path||!$1(l,n[m]));)m++;n.splice(m,0,l),l.record.name&&!T0(l)&&r.set(l.record.name,l)}function u(l,m){let p,g={},S,z;if("name"in l&&l.name){if(p=r.get(l.name),!p)throw Lr(1,{location:l});z=p.record.name,g=ht(R0(m.params,p.keys.filter(A=>!A.optional).map(A=>A.name)),l.params&&R0(l.params,p.keys.map(A=>A.name))),S=p.stringify(g)}else if("path"in l)S=l.path,p=n.find(A=>A.re.test(S)),p&&(g=p.parse(S),z=p.record.name);else{if(p=m.name?r.get(m.name):n.find(A=>A.re.test(m.path)),!p)throw Lr(1,{location:l,currentLocation:m});z=p.record.name,g=ht({},m.params,l.params),S=p.stringify(g)}const T=[];let y=p;for(;y;)T.unshift(y.record),y=y.parent;return{name:z,path:S,params:g,matched:T,meta:l6(T)}}return t.forEach(l=>i(l)),{addRoute:i,resolve:u,removeRoute:o,getRoutes:s,getRecordMatcher:a}}function R0(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function s6(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:c6(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function c6(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function T0(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function l6(t){return t.reduce((e,n)=>ht(e,n.meta),{})}function I0(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function $1(t,e){return e.children.some(n=>n===t||$1(t,n))}const B1=/#/g,f6=/&/g,u6=/\//g,d6=/=/g,m6=/\?/g,D1=/\+/g,p6=/%5B/g,h6=/%5D/g,V1=/%5E/g,g6=/%60/g,U1=/%7B/g,v6=/%7C/g,W1=/%7D/g,b6=/%20/g;function Wc(t){return encodeURI(""+t).replace(v6,"|").replace(p6,"[").replace(h6,"]")}function y6(t){return Wc(t).replace(U1,"{").replace(W1,"}").replace(V1,"^")}function Hs(t){return Wc(t).replace(D1,"%2B").replace(b6,"+").replace(B1,"%23").replace(f6,"%26").replace(g6,"`").replace(U1,"{").replace(W1,"}").replace(V1,"^")}function w6(t){return Hs(t).replace(d6,"%3D")}function A6(t){return Wc(t).replace(B1,"%23").replace(m6,"%3F")}function _6(t){return t==null?"":A6(t).replace(u6,"%2F")}function Gi(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function x6(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let a=0;a<r.length;++a){const i=r[a].replace(D1," "),o=i.indexOf("="),s=Gi(o<0?i:i.slice(0,o)),c=o<0?null:Gi(i.slice(o+1));if(s in e){let u=e[s];Te(u)||(u=e[s]=[u]),u.push(c)}else e[s]=c}return e}function L0(t){let e="";for(let n in t){const r=t[n];if(n=w6(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(Te(r)?r.map(i=>i&&Hs(i)):[r&&Hs(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function k6(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=Te(r)?r.map(a=>a==null?null:""+a):r==null?r:""+r)}return e}const C6=Symbol(""),N0=Symbol(""),Yc=Symbol(""),Y1=Symbol(""),$s=Symbol("");function Jr(){let t=[];function e(r){return t.push(r),()=>{const a=t.indexOf(r);a>-1&&t.splice(a,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function _n(t,e,n,r,a){const i=r&&(r.enterCallbacks[a]=r.enterCallbacks[a]||[]);return()=>new Promise((o,s)=>{const c=m=>{m===!1?s(Lr(4,{from:n,to:e})):m instanceof Error?s(m):Xh(m)?s(Lr(2,{from:e,to:m})):(i&&r.enterCallbacks[a]===i&&typeof m=="function"&&i.push(m),o())},u=t.call(r&&r.instances[a],e,n,c);let l=Promise.resolve(u);t.length<3&&(l=l.then(c)),l.catch(m=>s(m))})}function as(t,e,n,r){const a=[];for(const i of t)for(const o in i.components){let s=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(S6(s)){const u=(s.__vccOpts||s)[e];u&&a.push(_n(u,n,r,i,o))}else{let c=s();a.push(()=>c.then(u=>{if(!u)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const l=Rh(u)?u.default:u;i.components[o]=l;const p=(l.__vccOpts||l)[e];return p&&_n(p,n,r,i,o)()}))}}return a}function S6(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function j0(t){const e=Qe(Yc),n=Qe(Y1),r=Ce(()=>e.resolve(er(t.to))),a=Ce(()=>{const{matched:c}=r.value,{length:u}=c,l=c[u-1],m=n.matched;if(!l||!m.length)return-1;const p=m.findIndex(Ir.bind(null,l));if(p>-1)return p;const g=F0(c[u-2]);return u>1&&F0(l)===g&&m[m.length-1].path!==g?m.findIndex(Ir.bind(null,c[u-2])):p}),i=Ce(()=>a.value>-1&&O6(n.params,r.value.params)),o=Ce(()=>a.value>-1&&a.value===n.matched.length-1&&N1(n.params,r.value.params));function s(c={}){return P6(c)?e[er(t.replace)?"replace":"push"](er(t.to)).catch(la):Promise.resolve()}return{route:r,href:Ce(()=>r.value.href),isActive:i,isExactActive:o,navigate:s}}const E6=v1({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:j0,setup(t,{slots:e}){const n=ho(j0(t)),{options:r}=Qe(Yc),a=Ce(()=>({[H0(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[H0(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:L1("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},i)}}}),M6=E6;function P6(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function O6(t,e){for(const n in e){const r=e[n],a=t[n];if(typeof r=="string"){if(r!==a)return!1}else if(!Te(a)||a.length!==r.length||r.some((i,o)=>i!==a[o]))return!1}return!0}function F0(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const H0=(t,e,n)=>t??e??n,z6=v1({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Qe($s),a=Ce(()=>t.route||r.value),i=Qe(N0,0),o=Ce(()=>{let u=er(i);const{matched:l}=a.value;let m;for(;(m=l[u])&&!m.components;)u++;return u}),s=Ce(()=>a.value.matched[o.value]);Oi(N0,Ce(()=>o.value+1)),Oi(C6,s),Oi($s,a);const c=i1();return Pi(()=>[c.value,s.value,t.name],([u,l,m],[p,g,S])=>{l&&(l.instances[m]=u,g&&g!==l&&u&&u===p&&(l.leaveGuards.size||(l.leaveGuards=g.leaveGuards),l.updateGuards.size||(l.updateGuards=g.updateGuards))),u&&l&&(!g||!Ir(l,g)||!p)&&(l.enterCallbacks[m]||[]).forEach(z=>z(u))},{flush:"post"}),()=>{const u=a.value,l=t.name,m=s.value,p=m&&m.components[l];if(!p)return $0(n.default,{Component:p,route:u});const g=m.props[l],S=g?g===!0?u.params:typeof g=="function"?g(u):g:null,T=L1(p,ht({},S,e,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(m.instances[l]=null)},ref:c}));return $0(n.default,{Component:T,route:u})||T}}});function $0(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const K1=z6;function R6(t){const e=o6(t.routes,t),n=t.parseQuery||x6,r=t.stringifyQuery||L0,a=t.history,i=Jr(),o=Jr(),s=Jr(),c=Wm(pn);let u=pn;mr&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=ns.bind(null,b=>""+b),m=ns.bind(null,_6),p=ns.bind(null,Gi);function g(b,R){let E,I;return F1(b)?(E=e.getRecordMatcher(b),I=R):I=b,e.addRoute(I,E)}function S(b){const R=e.getRecordMatcher(b);R&&e.removeRoute(R)}function z(){return e.getRoutes().map(b=>b.record)}function T(b){return!!e.getRecordMatcher(b)}function y(b,R){if(R=ht({},R||c.value),typeof b=="string"){const d=rs(n,b,R.path),h=e.resolve({path:d.path},R),w=a.createHref(d.fullPath);return ht(d,h,{params:p(h.params),hash:Gi(d.hash),redirectedFrom:void 0,href:w})}let E;if("path"in b)E=ht({},b,{path:rs(n,b.path,R.path).path});else{const d=ht({},b.params);for(const h in d)d[h]==null&&delete d[h];E=ht({},b,{params:m(d)}),R.params=m(R.params)}const I=e.resolve(E,R),U=b.hash||"";I.params=l(p(I.params));const Z=Lh(r,ht({},b,{hash:y6(U),path:I.path})),f=a.createHref(Z);return ht({fullPath:Z,hash:U,query:r===L0?k6(b.query):b.query||{}},I,{redirectedFrom:void 0,href:f})}function A(b){return typeof b=="string"?rs(n,b,c.value.path):ht({},b)}function O(b,R){if(u!==b)return Lr(8,{from:R,to:b})}function j(b){return q(b)}function $(b){return j(ht(A(b),{replace:!0}))}function N(b){const R=b.matched[b.matched.length-1];if(R&&R.redirect){const{redirect:E}=R;let I=typeof E=="function"?E(b):E;return typeof I=="string"&&(I=I.includes("?")||I.includes("#")?I=A(I):{path:I},I.params={}),ht({query:b.query,hash:b.hash,params:"path"in I?{}:b.params},I)}}function q(b,R){const E=u=y(b),I=c.value,U=b.state,Z=b.force,f=b.replace===!0,d=N(E);if(d)return q(ht(A(d),{state:typeof d=="object"?ht({},U,d.state):U,force:Z,replace:f}),R||E);const h=E;h.redirectedFrom=R;let w;return!Z&&Nh(r,I,E)&&(w=Lr(16,{to:h,from:I}),Ht(I,I,!0,!1)),(w?Promise.resolve(w):_t(h,I)).catch(v=>Ge(v)?Ge(v,2)?v:Dt(v):et(v,h,I)).then(v=>{if(v){if(Ge(v,2))return q(ht({replace:f},A(v.to),{state:typeof v.to=="object"?ht({},U,v.to.state):U,force:Z}),R||h)}else v=Zt(h,I,!0,f,U);return Wt(h,I,v),v})}function ft(b,R){const E=O(b,R);return E?Promise.reject(E):Promise.resolve()}function ut(b){const R=ue.values().next().value;return R&&typeof R.runWithContext=="function"?R.runWithContext(b):b()}function _t(b,R){let E;const[I,U,Z]=T6(b,R);E=as(I.reverse(),"beforeRouteLeave",b,R);for(const d of I)d.leaveGuards.forEach(h=>{E.push(_n(h,b,R))});const f=ft.bind(null,b,R);return E.push(f),st(E).then(()=>{E=[];for(const d of i.list())E.push(_n(d,b,R));return E.push(f),st(E)}).then(()=>{E=as(U,"beforeRouteUpdate",b,R);for(const d of U)d.updateGuards.forEach(h=>{E.push(_n(h,b,R))});return E.push(f),st(E)}).then(()=>{E=[];for(const d of Z)if(d.beforeEnter)if(Te(d.beforeEnter))for(const h of d.beforeEnter)E.push(_n(h,b,R));else E.push(_n(d.beforeEnter,b,R));return E.push(f),st(E)}).then(()=>(b.matched.forEach(d=>d.enterCallbacks={}),E=as(Z,"beforeRouteEnter",b,R),E.push(f),st(E))).then(()=>{E=[];for(const d of o.list())E.push(_n(d,b,R));return E.push(f),st(E)}).catch(d=>Ge(d,8)?d:Promise.reject(d))}function Wt(b,R,E){s.list().forEach(I=>ut(()=>I(b,R,E)))}function Zt(b,R,E,I,U){const Z=O(b,R);if(Z)return Z;const f=R===pn,d=mr?history.state:{};E&&(I||f?a.replace(b.fullPath,ht({scroll:f&&d&&d.scroll},U)):a.push(b.fullPath,U)),c.value=b,Ht(b,R,E,f),Dt()}let jt;function Ae(){jt||(jt=a.listen((b,R,E)=>{if(!Ke.listening)return;const I=y(b),U=N(I);if(U){q(ht(U,{replace:!0}),I).catch(la);return}u=I;const Z=c.value;mr&&Uh(E0(Z.fullPath,E.delta),xo()),_t(I,Z).catch(f=>Ge(f,12)?f:Ge(f,2)?(q(f.to,I).then(d=>{Ge(d,20)&&!E.delta&&E.type===ka.pop&&a.go(-1,!1)}).catch(la),Promise.reject()):(E.delta&&a.go(-E.delta,!1),et(f,I,Z))).then(f=>{f=f||Zt(I,Z,!1),f&&(E.delta&&!Ge(f,8)?a.go(-E.delta,!1):E.type===ka.pop&&Ge(f,20)&&a.go(-1,!1)),Wt(I,Z,f)}).catch(la)}))}let xt=Jr(),tt=Jr(),W;function et(b,R,E){Dt(b);const I=tt.list();return I.length?I.forEach(U=>U(b,R,E)):console.error(b),Promise.reject(b)}function Jt(){return W&&c.value!==pn?Promise.resolve():new Promise((b,R)=>{xt.add([b,R])})}function Dt(b){return W||(W=!b,Ae(),xt.list().forEach(([R,E])=>b?E(b):R()),xt.reset()),b}function Ht(b,R,E,I){const{scrollBehavior:U}=t;if(!mr||!U)return Promise.resolve();const Z=!E&&Wh(E0(b.fullPath,0))||(I||!E)&&history.state&&history.state.scroll||null;return l1().then(()=>U(b,R,Z)).then(f=>f&&Vh(f)).catch(f=>et(f,b,R))}const wt=b=>a.go(b);let fe;const ue=new Set,Ke={currentRoute:c,listening:!0,addRoute:g,removeRoute:S,hasRoute:T,getRoutes:z,resolve:y,options:t,push:j,replace:$,go:wt,back:()=>wt(-1),forward:()=>wt(1),beforeEach:i.add,beforeResolve:o.add,afterEach:s.add,onError:tt.add,isReady:Jt,install(b){const R=this;b.component("RouterLink",M6),b.component("RouterView",K1),b.config.globalProperties.$router=R,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>er(c)}),mr&&!fe&&c.value===pn&&(fe=!0,j(a.location).catch(U=>{}));const E={};for(const U in pn)Object.defineProperty(E,U,{get:()=>c.value[U],enumerable:!0});b.provide(Yc,R),b.provide(Y1,t1(E)),b.provide($s,c);const I=b.unmount;ue.add(b),b.unmount=function(){ue.delete(b),ue.size<1&&(u=pn,jt&&jt(),jt=null,c.value=pn,fe=!1,W=!1),I()}}};function st(b){return b.reduce((R,E)=>R.then(()=>ut(E)),Promise.resolve())}return Ke}function T6(t,e){const n=[],r=[],a=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const s=e.matched[o];s&&(t.matched.find(u=>Ir(u,s))?r.push(s):n.push(s));const c=t.matched[o];c&&(e.matched.find(u=>Ir(u,c))||a.push(c))}return[n,r,a]}const $n=(t,e)=>{const n=t.__vccOpts||t;for(const[r,a]of e)n[r]=a;return n},Kc=t=>(Hc("data-v-2c780179"),t=t(),$c(),t),I6={class:"greetings"},L6=Kc(()=>X("span",{class:"title"},"PhD Research Scientist",-1)),N6=Kc(()=>X("br",null,null,-1)),j6=Kc(()=>X("span",{class:"subtitle"},[yt("Department of Linguistics,"),X("br"),yt("The Ohio State University")],-1)),F6={__name:"HelloWorld",props:{msg:{type:String,required:!0}},setup(t){return(e,n)=>(We(),cn("div",I6,[X("h1",null,Am(t.msg),1),L6,N6,j6]))}},H6=$n(F6,[["__scopeId","data-v-2c780179"]]),$6=t=>(Hc("data-v-06192204"),t=t(),$c(),t),B6=$6(()=>X("img",{alt:"Colors",class:"logo",src:zh},null,-1)),D6={class:"wrapper"},V6={__name:"App",setup(t){return(e,n)=>(We(),cn(he,null,[X("header",null,[B6,X("div",D6,[Pt(H6,{msg:"Sara Court"})])]),Pt(er(K1))],64))}},U6=$n(V6,[["__scopeId","data-v-06192204"]]),W6="modulepreload",Y6=function(t){return"/"+t},B0={},En=function(e,n,r){let a=Promise.resolve();if(n&&n.length>0){const i=document.getElementsByTagName("link");a=Promise.all(n.map(o=>{if(o=Y6(o),o in B0)return;B0[o]=!0;const s=o.endsWith(".css"),c=s?'[rel="stylesheet"]':"";if(!!r)for(let m=i.length-1;m>=0;m--){const p=i[m];if(p.href===o&&(!s||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${c}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":W6,s||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),s)return new Promise((m,p)=>{l.addEventListener("load",m),l.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${o}`)))})}))}return a.then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})},K6="data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8BMzMzRzMzM1czMzNVMzMzVTMzM1UzMzNVMzMzVTMzM1H///8B////Af///wH///8B////Af///wH///8BMzMzSQwMjGcAAKn5AACp/wAAqf8AAKn/AACp/wAAqf0HB5hrMzMzUf///wH///8B////Af///wH///8BMzMzSQsLkF8AAKr5AACq/wAAqv8AAKr/AACq/wAAqv8AAKr/AACq/QkJll8zMzNP////Af///wH///8B////ATMzM00AAKv5AACr/wAAq/8AAKvFAACrqwAAq6sAAKvDAACr/wAAq/8AAKv5MzMzTf///wH///8B////Af///wEzMzNLAACt/wAArf8AAK3dAACtCf///wH///8BAACtCQAArd8AAK3/AACt/zMzM0v///8B////Af///wH///8BMzMzSwAArv8AAK7/AACuif///wH///8B////Af///wEAAK6JAACu/wAArv8zMzNL////Af///wH///8B////ATMzM0sAALD/AACw/wAAsIf///8B////Af///wH///8BAACwhwAAsP8AALD/MzMzS////wH///8B////Af///wEzMzNLAACy/wAAsf8AALGH////Af///wH///8B////AQAAsYcAALL/AACy/zMzM0v///8B////Af///wH///8BMzMzSwAAs/8AALP/AACzh////wH///8B////Af///wEAALOHAACz/wAAs/8zMzNL////Af///wH///8B////ATMzM0sAALX/AAC1/wAAtYf///8B////Af///wH///8BAAC1hwAAtf8AALX/MzMzS////wH///8B////Af///wEzMzNLAAC2/wAAtv8AALaJ////Af///wH///8B////AQAAtosAALb/AAC2/zMzM0v///8B////Af///wH///8BMzMzSwAAuP8AALj/AAC44QAAuAn///8B////AQAAuAkAALjjAAC4/wAAuP8zMzNL////Af///wH///8B////ATMzM00AALnxAAC5/wAAuf8AALm5AAC5mQAAuZkAALm3AAC5/wAAuf8AALnzMzMzTf///wH///8B////Af///wEzMzNHDw+RSQAAuukAALr/AAC6/wAAuv8AALr/AAC6/wAAuv8AALrpDQ2YRTMzM0n///8B////Af///wH///8B////ATMzM0cVFYM9AAC73wAAu/8AALv/AAC7/wAAu/8AALvfDg6XMTMzM1H///8B////Af///wH///8B////Af///wH///8BMzMzRzMzM1czMzNVMzMzVTMzM1UzMzNVMzMzVTMzM1f///8B////Af///wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==",G6="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%3e%3cpath%20fill='%230A66C2'%20d='M12.225%2012.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926%200-1.068.724-1.068%201.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95%201.684-.925%201.802%200%202.135%201.185%202.135%202.728l-.001%203.14zM4.67%205.715a1.037%201.037%200%2001-1.032-1.031c0-.566.466-1.032%201.032-1.032.566%200%201.031.466%201.032%201.032%200%20.566-.466%201.032-1.032%201.032zm.889%206.51h-1.78V6.498h1.78v5.727zM13.11%202H2.885A.88.88%200%20002%202.866v10.268a.88.88%200%2000.885.866h10.226a.882.882%200%2000.889-.866V2.865a.88.88%200%2000-.889-.864z'/%3e%3c/svg%3e",q6="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.35003%2016.88C9.35003%2016.95%209.28003%2017%209.18003%2017C9.08003%2017%209.00003%2017%209.00003%2016.88C9.00003%2016.76%209.08003%2016.76%209.17003%2016.76C9.26003%2016.76%209.35003%2016.81%209.35003%2016.88ZM8.35003%2016.73C8.35003%2016.8%208.35003%2016.88%208.49003%2016.9C8.52584%2016.9172%208.56701%2016.9195%208.6045%2016.9064C8.642%2016.8933%208.67275%2016.8658%208.69003%2016.83C8.69003%2016.76%208.69003%2016.69%208.55003%2016.66C8.41003%2016.63%208.37003%2016.66%208.35003%2016.73ZM9.77003%2016.68C9.68003%2016.68%209.62003%2016.76%209.63003%2016.84C9.64003%2016.92%209.72003%2016.95%209.82003%2016.93C9.92003%2016.91%209.97003%2016.84%209.96003%2016.77C9.95003%2016.7%209.87003%2016.67%209.77003%2016.68ZM11.9%204.00002C10.8454%203.99009%209.79962%204.19333%208.82547%204.59754C7.85132%205.00175%206.96887%205.5986%206.23107%206.35227C5.49328%207.10594%204.91535%208.0009%204.53197%208.98343C4.14859%209.96597%203.96765%2011.0158%204.00003%2012.07C3.97211%2013.7969%204.48426%2015.4894%205.46493%2016.9111C6.4456%2018.3328%207.84582%2019.4127%209.47003%2020C9.88003%2020.07%2010.03%2019.81%2010.03%2019.6C10.03%2019.39%2010.03%2018.26%2010.03%2017.6C10.03%2017.6%207.77003%2018.1%207.29003%2016.6C7.29003%2016.6%206.93003%2015.6%206.40003%2015.39C6.40003%2015.39%205.66003%2014.87%206.45003%2014.88C6.70877%2014.9149%206.95573%2015.01%207.17108%2015.1576C7.38643%2015.3052%207.56417%2015.5013%207.69003%2015.73C7.79466%2015.9351%207.9401%2016.1167%208.11742%2016.2635C8.29473%2016.4104%208.50019%2016.5195%208.72118%2016.5841C8.94218%2016.6487%209.17404%2016.6675%209.40255%2016.6393C9.63106%2016.6111%209.85139%2016.5364%2010.05%2016.42C10.0879%2016.0025%2010.2679%2015.6107%2010.56%2015.31C8.76003%2015.1%206.94003%2014.84%206.94003%2011.65C6.92091%2011.2896%206.97881%2010.9293%207.10985%2010.5931C7.2409%2010.2569%207.44209%209.95241%207.70003%209.70002C7.45667%208.96799%207.48507%208.17282%207.78003%207.46002C8.46003%207.24002%2010.01%208.35002%2010.01%208.35002C11.3342%207.97655%2012.7359%207.97655%2014.06%208.35002C14.06%208.35002%2015.61%207.24002%2016.29%207.46002C16.5914%208.17142%2016.6198%208.96894%2016.37%209.70002C16.6371%209.94893%2016.8489%2010.2511%2016.9919%2010.587C17.1348%2010.9229%2017.2057%2011.285%2017.2%2011.65C17.2%2014.85%2015.3%2015.1%2013.5%2015.31C13.6809%2015.5129%2013.8186%2015.7506%2013.9046%2016.0085C13.9905%2016.2664%2014.023%2016.5391%2014%2016.81C14%2017.93%2014%2019.31%2014%2019.58C13.9994%2019.6475%2014.015%2019.7142%2014.0456%2019.7744C14.0763%2019.8346%2014.1209%2019.8866%2014.1759%2019.9258C14.2308%2019.9651%2014.2945%2019.9905%2014.3613%2019.9999C14.4282%2020.0094%2014.4964%2020.0025%2014.56%2019.98C16.1813%2019.3978%2017.5786%2018.321%2018.5547%2016.9017C19.5309%2015.4824%2020.0364%2013.7922%2020%2012.07C20.0094%2011.0051%2019.8061%209.94902%2019.402%208.96371C18.9979%207.9784%2018.4011%207.08369%2017.6467%206.33205C16.8923%205.58041%2015.9953%204.98696%2015.0085%204.58651C14.0217%204.18606%2012.9649%203.98667%2011.9%204.00002ZM7.14003%2015.41C7.14003%2015.41%207.14003%2015.52%207.14003%2015.58C7.15118%2015.5912%207.16442%2015.6001%207.17901%2015.6061C7.1936%2015.6122%207.20923%2015.6153%207.22503%2015.6153C7.24082%2015.6153%207.25646%2015.6122%207.27105%2015.6061C7.28563%2015.6001%207.29888%2015.5912%207.31003%2015.58C7.31003%2015.58%207.31003%2015.47%207.31003%2015.4C7.31003%2015.33%207.18003%2015.37%207.14003%2015.41ZM6.79003%2015.14C6.79003%2015.14%206.79003%2015.24%206.86003%2015.27C6.86846%2015.2805%206.87913%2015.2889%206.89124%2015.2947C6.90335%2015.3004%206.91661%2015.3035%206.93003%2015.3035C6.94345%2015.3035%206.9567%2015.3004%206.96881%2015.2947C6.98093%2015.2889%206.99159%2015.2805%207.00003%2015.27C7.00003%2015.27%207.00003%2015.17%206.93003%2015.14C6.86003%2015.11%206.81003%2015.11%206.79003%2015.14ZM7.79003%2016.32C7.79003%2016.32%207.79003%2016.46%207.79003%2016.53C7.79003%2016.6%207.96003%2016.61%208.00003%2016.53C8.04003%2016.45%208.00003%2016.39%208.00003%2016.32C8.00003%2016.25%207.87003%2016.27%207.83003%2016.32H7.79003ZM7.42003%2015.83C7.42003%2015.83%207.42003%2015.95%207.42003%2016.03C7.42003%2016.11%207.56003%2016.14%207.61003%2016.11C7.63535%2016.0809%207.6493%2016.0436%207.6493%2016.005C7.6493%2015.9664%207.63535%2015.9291%207.61003%2015.9C7.56003%2015.82%207.48003%2015.79%207.42003%2015.83Z'%20fill='%23000000'/%3e%3c/svg%3e",X6={},Q6={class:"item"},Z6={class:"details"};function J6(t,e){return We(),cn("div",Q6,[X("i",null,[Xo(t.$slots,"icon",{},void 0,!0)]),X("div",Z6,[X("h3",null,[Xo(t.$slots,"heading",{},void 0,!0)]),Xo(t.$slots,"default",{},void 0,!0)])])}const ti=$n(X6,[["render",J6],["__scopeId","data-v-f4a791c4"]]),tg={},eg={width:"30",height:"30",fill:"#000000",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},ng=X("path",{id:"assets_1_",d:`M31,0.64H10C9.801,0.64,9.64,0.801,9.64,1v2.64H1C0.801,3.64,0.64,3.801,0.64,4v27
	c0,0.199,0.161,0.36,0.36,0.36h21c0.199,0,0.36-0.161,0.36-0.36v-2.64H31c0.199,0,0.36-0.161,0.36-0.36V1
	C31.36,0.801,31.199,0.64,31,0.64z M21.64,30.64H1.36V4.36h14.28V10c0,0.199,0.161,0.36,0.36,0.36h5.64V30.64z M16.36,4.869
	l4.771,4.771H16.36V4.869z M30.64,27.64h-8.28V10c0-0.096-0.038-0.187-0.105-0.254l-6-6C16.187,3.678,16.096,3.64,16,3.64h-5.64
	V1.36h20.28C30.64,1.36,30.64,27.64,30.64,27.64z M19.36,16c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36
	S3.801,15.64,4,15.64h15C19.199,15.64,19.36,15.801,19.36,16z M19.36,19c0,0.199-0.161,0.36-0.36,0.36H4
	c-0.199,0-0.36-0.161-0.36-0.36S3.801,18.64,4,18.64h15C19.199,18.64,19.36,18.801,19.36,19z M19.36,22
	c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,21.64,4,21.64h15C19.199,21.64,19.36,21.801,19.36,22z
	 M19.36,25c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,24.64,4,24.64h15
	C19.199,24.64,19.36,24.801,19.36,25z`},null,-1),rg=X("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),ag=[ng,rg];function ig(t,e){return We(),cn("svg",eg,ag)}const og=$n(tg,[["render",ig]]),sg={},cg={fill:"#000000",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 32 32","xml:space":"preserve"},lg=X("path",{id:"machine--learning--01_1_",d:`M12,1.64c-0.002,0-0.004,0-0.006,0c-1.473,0-2.691,0.759-3.239,2h-0.48
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
	S23.353,8.14,23,8.14z M26.36,15c0-0.353,0.287-0.64,0.64-0.64s0.64,0.287,0.64,0.64s-0.287,0.64-0.64,0.64S26.36,15.353,26.36,15z`},null,-1),fg=X("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),ug=[lg,fg];function dg(t,e){return We(),cn("svg",cg,ug)}const mg=$n(sg,[["render",dg]]),pg={},hg={height:"32",width:"32",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},gg=X("path",{id:"sunny_1_",d:`M16,29.36c-0.199,0-0.36-0.161-0.36-0.36v-3c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v3
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
	v3C16.36,6.199,16.199,6.36,16,6.36z`},null,-1),vg=X("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),bg=[gg,vg];function yg(t,e){return We(),cn("svg",hg,bg)}const wg=$n(pg,[["render",yg]]),Ag={},_g={height:"32",width:"32",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},xg=X("path",{id:"cloud-pak--for-data_1_",d:`M9.5,10c0,0.276-0.224,0.5-0.5,0.5S8.5,10.276,8.5,10S8.724,9.5,9,9.5S9.5,9.724,9.5,10z
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
	S24.64,14.353,24.64,14z`},null,-1),kg=X("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),Cg=[xg,kg];function Sg(t,e){return We(),cn("svg",_g,Cg)}const Eg=$n(Ag,[["render",Sg]]),vt=t=>(Hc("data-v-e0c29831"),t=t(),$c(),t),Mg=vt(()=>X("div",{class:"tagline"},"Computational Linguist • Machine Learning Engineer • Data Analyst • Community Builder",-1)),Pg=vt(()=>X("a",{href:"https://linguistics.osu.edu/people/court.22",target:"_blank",rel:"noopener"},"PhD Candidate",-1)),Og=vt(()=>X("a",{href:"https://linguistics.osu.edu/",target:"_blank",rel:"noopener"},"Linguistics Department",-1)),zg=vt(()=>X("a",{href:"https://linguistics.osu.edu/",target:"_blank",rel:"noopener"},"The Ohio State University.",-1)),Rg=vt(()=>X("a",{href:"https://linguistics.osu.edu/people/elsner.14",target:"_blank",rel:"noopener"},[X("br"),yt("Micha Elsner")],-1)),Tg=vt(()=>X("a",{href:"https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf",target:"_blank",rel:"noopener"},"Weaver",-1)),Ig=vt(()=>X("a",{href:"https://create.nyu.edu/cogscidiy/",target:"_blank",rel:"noopener"},"fostering",-1)),Lg=vt(()=>X("a",{href:"https://docs.google.com/presentation/d/1Y0awbZV4GOCnW-fH4Ls7q_gpGkb5QUaKW40CBcKTTE8/edit?slide=id.p#slide=id.p",target:"_blank",rel:"noopener"},"inclusive AI",-1)),Ng=vt(()=>X("a",{href:"https://docs.google.com/presentation/d/1IZ889fnGPOsdOHee9eArs8hfRm19TX5HDsNPGn7Tebc/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310",target:"_blank",rel:"noopener"},"development",-1)),jg=vt(()=>X("a",{href:"https://aclanthology.org/2020.coling-main.258/",target:"_blank",rel:"noopener"},"computational morphologist,",-1)),Fg=vt(()=>X("a",{href:"https://aclanthology.org/2022.sigmorphon-1.22/",target:"_blank",rel:"noopener"},"models",-1)),Hg=vt(()=>X("a",{href:"https://aclanthology.org/2023.scil-1.4.pdf",target:"_blank",rel:"noopener"},"languages in contact",-1)),$g=vt(()=>X("a",{href:"https://docs.google.com/presentation/d/1iHJTTw4V7vCU4mJeAJWkUTKetmbyZOQHkHvWieAblMA/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310",target:"_blank",rel:"noopener"},"low-resource domains",-1)),Bg=vt(()=>X("a",{href:"https://aclanthology.org/2024.wmt-1.125/",target:"_blank",rel:"noopener"},"responsible machine translation",-1)),Dg=vt(()=>X("a",{href:"https://aclanthology.org/2022.computel-1.20/",target:"_blank",rel:"noopener"},"collaborative data annotation.",-1)),Vg=vt(()=>X("br",null,null,-1)),Ug=vt(()=>X("a",{href:"https://scholar.google.com/citations?user=zi74VNEAAAAJ&hl",target:"_blank",rel:"noopener"},"Google Scholar",-1)),Wg=vt(()=>X("a",{href:"https://www.linkedin.com/in/sarakc/",target:"_blank",rel:"noopener"},"LinkedIn",-1)),Yg=vt(()=>X("br",null,null,-1)),Kg=vt(()=>X("a",{href:"/cv.pdf"},"resume | C.V.",-1)),Gg=vt(()=>X("img",{alt:"osu",class:"icon",src:K6},null,-1)),qg=vt(()=>X("a",{href:"https://linguistics.osu.edu/people/court.22",target:"_blank",rel:"noopener"},"Sara Court",-1)),Xg=vt(()=>X("br",null,null,-1)),Qg=vt(()=>X("img",{alt:"linkedin",class:"icon",src:G6},null,-1)),Zg=vt(()=>X("a",{href:"https://www.linkedin.com/in/sarakc/",target:"_blank",rel:"noopener"},"LinkedIn",-1)),Jg=vt(()=>X("img",{alt:"github",class:"icon",src:q6},null,-1)),t3=vt(()=>X("a",{href:"https://github.com/sarakc",target:"_blank",rel:"noopener"},"GitHub",-1)),e3=vt(()=>X("br",null,null,-1)),n3=vt(()=>X("a",{href:"mailto:court.22@osu.edu"},"court DOT 22 AT osu DOT edu",-1)),r3={__name:"TheWelcome",setup(t){return(e,n)=>(We(),cn(he,null,[Pt(ti,null,{icon:me(()=>[Pt(wg)]),heading:me(()=>[yt("About")]),default:me(()=>[Mg,yt(" I'm currently a "),Pg,yt("in the "),Og,yt("at"),zg,Rg,yt("is my advisor. I'm a"),Tg,yt("to my core and committed to"),Ig,Lg,Ng,yt(". ")]),_:1}),Pt(ti,null,{icon:me(()=>[Pt(mg)]),heading:me(()=>[yt("Research")]),default:me(()=>[yt(" I'm a"),jg,yt("among other things. I build and analyze"),Fg,yt("for typologically diverse"),Hg,yt("and other "),$g,yt("with applications in"),Bg,yt("and tools for"),Dg,Vg]),_:1}),Pt(ti,null,{icon:me(()=>[Pt(og)]),heading:me(()=>[yt("Resume")]),default:me(()=>[yt(" Check out my"),Ug,yt("page and"),Wg,yt("profile to learn more about the work that I do. "),Yg,yt("Feel free to reach out via email to request an up-to-date "),Kg,yt("in .pdf format. ")]),_:1}),Pt(ti,null,{icon:me(()=>[Pt(Eg)]),heading:me(()=>[yt("Contact")]),default:me(()=>[Gg,yt(),qg,Xg,Qg,yt(),Zg,Jg,t3,e3,yt(" ✉️ "),n3]),_:1})],64))}},a3=$n(r3,[["__scopeId","data-v-e0c29831"]]),i3={__name:"HomeView",setup(t){return(e,n)=>(We(),cn("main",null,[Pt(a3)]))}},o3=R6({history:qh("/"),routes:[{path:"/",name:"home",component:i3},{path:"/research",name:"research",component:()=>En(()=>import("./ResearchView-0zgBdhd-.js"),__vite__mapDeps([0,1]))},{path:"/CV",name:"CV",component:()=>En(()=>import("./CVView-HvmpH_8D.js"),__vite__mapDeps([2,1]))},{path:"/contact",name:"contact",component:()=>En(()=>import("./ContactView-DxPycDIP.js"),__vite__mapDeps([3,1]))},{path:"/projects",name:"projects",component:()=>En(()=>import("./ProjectsView-f_6bfWkJ.js"),__vite__mapDeps([4,1]))}]});function D0(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function D(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?D0(Object(n),!0).forEach(function(r){$t(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):D0(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function qi(t){"@babel/helpers - typeof";return qi=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},qi(t)}function s3(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function V0(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c3(t,e,n){return e&&V0(t.prototype,e),n&&V0(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function $t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Gc(t,e){return f3(t)||d3(t,e)||G1(t,e)||p3()}function Ba(t){return l3(t)||u3(t)||G1(t)||m3()}function l3(t){if(Array.isArray(t))return Bs(t)}function f3(t){if(Array.isArray(t))return t}function u3(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function d3(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,o,s;try{for(n=n.call(t);!(a=(o=n.next()).done)&&(r.push(o.value),!(e&&r.length===e));a=!0);}catch(c){i=!0,s=c}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw s}}return r}}function G1(t,e){if(t){if(typeof t=="string")return Bs(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Bs(t,e)}}function Bs(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function m3(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function p3(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var U0=function(){},qc={},q1={},X1=null,Q1={mark:U0,measure:U0};try{typeof window<"u"&&(qc=window),typeof document<"u"&&(q1=document),typeof MutationObserver<"u"&&(X1=MutationObserver),typeof performance<"u"&&(Q1=performance)}catch{}var h3=qc.navigator||{},W0=h3.userAgent,Y0=W0===void 0?"":W0,Tn=qc,St=q1,K0=X1,ei=Q1;Tn.document;var ln=!!St.documentElement&&!!St.head&&typeof St.addEventListener=="function"&&typeof St.createElement=="function",Z1=~Y0.indexOf("MSIE")||~Y0.indexOf("Trident/"),ni,ri,ai,ii,oi,tn="___FONT_AWESOME___",Ds=16,J1="fa",td="svg-inline--fa",ir="data-fa-i2svg",Vs="data-fa-pseudo-element",g3="data-fa-pseudo-element-pending",Xc="data-prefix",Qc="data-icon",G0="fontawesome-i2svg",v3="async",b3=["HTML","HEAD","STYLE","SCRIPT"],ed=function(){try{return!0}catch{return!1}}(),kt="classic",Lt="sharp",Zc=[kt,Lt];function Da(t){return new Proxy(t,{get:function(n,r){return r in n?n[r]:n[kt]}})}var Ca=Da((ni={},$t(ni,kt,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),$t(ni,Lt,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),ni)),Sa=Da((ri={},$t(ri,kt,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),$t(ri,Lt,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),ri)),Ea=Da((ai={},$t(ai,kt,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),$t(ai,Lt,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),ai)),y3=Da((ii={},$t(ii,kt,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),$t(ii,Lt,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),ii)),w3=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,nd="fa-layers-text",A3=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,_3=Da((oi={},$t(oi,kt,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),$t(oi,Lt,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),oi)),rd=[1,2,3,4,5,6,7,8,9,10],x3=rd.concat([11,12,13,14,15,16,17,18,19,20]),k3=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Gn={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Ma=new Set;Object.keys(Sa[kt]).map(Ma.add.bind(Ma));Object.keys(Sa[Lt]).map(Ma.add.bind(Ma));var C3=[].concat(Zc,Ba(Ma),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Gn.GROUP,Gn.SWAP_OPACITY,Gn.PRIMARY,Gn.SECONDARY]).concat(rd.map(function(t){return"".concat(t,"x")})).concat(x3.map(function(t){return"w-".concat(t)})),ua=Tn.FontAwesomeConfig||{};function S3(t){var e=St.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function E3(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(St&&typeof St.querySelector=="function"){var M3=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];M3.forEach(function(t){var e=Gc(t,2),n=e[0],r=e[1],a=E3(S3(n));a!=null&&(ua[r]=a)})}var ad={styleDefault:"solid",familyDefault:"classic",cssPrefix:J1,replacementClass:td,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ua.familyPrefix&&(ua.cssPrefix=ua.familyPrefix);var Nr=D(D({},ad),ua);Nr.autoReplaceSvg||(Nr.observeMutations=!1);var Y={};Object.keys(ad).forEach(function(t){Object.defineProperty(Y,t,{enumerable:!0,set:function(n){Nr[t]=n,da.forEach(function(r){return r(Y)})},get:function(){return Nr[t]}})});Object.defineProperty(Y,"familyPrefix",{enumerable:!0,set:function(e){Nr.cssPrefix=e,da.forEach(function(n){return n(Y)})},get:function(){return Nr.cssPrefix}});Tn.FontAwesomeConfig=Y;var da=[];function P3(t){return da.push(t),function(){da.splice(da.indexOf(t),1)}}var hn=Ds,Be={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function O3(t){if(!(!t||!ln)){var e=St.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=St.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return St.head.insertBefore(e,r),t}}var z3="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Pa(){for(var t=12,e="";t-- >0;)e+=z3[Math.random()*62|0];return e}function Wr(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Jc(t){return t.classList?Wr(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function id(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function R3(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(id(t[n]),'" ')},"").trim()}function ko(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function tl(t){return t.size!==Be.size||t.x!==Be.x||t.y!==Be.y||t.rotate!==Be.rotate||t.flipX||t.flipY}function T3(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),c={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:c,path:u}}function I3(t){var e=t.transform,n=t.width,r=n===void 0?Ds:n,a=t.height,i=a===void 0?Ds:a,o=t.startCentered,s=o===void 0?!1:o,c="";return s&&Z1?c+="translate(".concat(e.x/hn-r/2,"em, ").concat(e.y/hn-i/2,"em) "):s?c+="translate(calc(-50% + ".concat(e.x/hn,"em), calc(-50% + ").concat(e.y/hn,"em)) "):c+="translate(".concat(e.x/hn,"em, ").concat(e.y/hn,"em) "),c+="scale(".concat(e.size/hn*(e.flipX?-1:1),", ").concat(e.size/hn*(e.flipY?-1:1),") "),c+="rotate(".concat(e.rotate,"deg) "),c}var L3=`:root, :host {
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
}`;function od(){var t=J1,e=td,n=Y.cssPrefix,r=Y.replacementClass,a=L3;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(r))}return a}var q0=!1;function is(){Y.autoAddCss&&!q0&&(O3(od()),q0=!0)}var N3={mixout:function(){return{dom:{css:od,insertCss:is}}},hooks:function(){return{beforeDOMElementCreation:function(){is()},beforeI2svg:function(){is()}}}},en=Tn||{};en[tn]||(en[tn]={});en[tn].styles||(en[tn].styles={});en[tn].hooks||(en[tn].hooks={});en[tn].shims||(en[tn].shims=[]);var Me=en[tn],sd=[],j3=function t(){St.removeEventListener("DOMContentLoaded",t),Xi=1,sd.map(function(e){return e()})},Xi=!1;ln&&(Xi=(St.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(St.readyState),Xi||St.addEventListener("DOMContentLoaded",j3));function F3(t){ln&&(Xi?setTimeout(t,0):sd.push(t))}function Va(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?id(t):"<".concat(e," ").concat(R3(r),">").concat(i.map(Va).join(""),"</").concat(e,">")}function X0(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var H3=function(e,n){return function(r,a,i,o){return e.call(n,r,a,i,o)}},os=function(e,n,r,a){var i=Object.keys(e),o=i.length,s=a!==void 0?H3(n,a):n,c,u,l;for(r===void 0?(c=1,l=e[i[0]]):(c=0,l=r);c<o;c++)u=i[c],l=s(l,e[u],u,e);return l};function $3(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function Us(t){var e=$3(t);return e.length===1?e[0].toString(16):null}function B3(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Q0(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function Ws(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Q0(e);typeof Me.hooks.addPack=="function"&&!a?Me.hooks.addPack(t,Q0(e)):Me.styles[t]=D(D({},Me.styles[t]||{}),i),t==="fas"&&Ws("fa",e)}var si,ci,li,gr=Me.styles,D3=Me.shims,V3=(si={},$t(si,kt,Object.values(Ea[kt])),$t(si,Lt,Object.values(Ea[Lt])),si),el=null,cd={},ld={},fd={},ud={},dd={},U3=(ci={},$t(ci,kt,Object.keys(Ca[kt])),$t(ci,Lt,Object.keys(Ca[Lt])),ci);function W3(t){return~C3.indexOf(t)}function Y3(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!W3(a)?a:null}var md=function(){var e=function(i){return os(gr,function(o,s,c){return o[c]=os(s,i,{}),o},{})};cd=e(function(a,i,o){if(i[3]&&(a[i[3]]=o),i[2]){var s=i[2].filter(function(c){return typeof c=="number"});s.forEach(function(c){a[c.toString(16)]=o})}return a}),ld=e(function(a,i,o){if(a[o]=o,i[2]){var s=i[2].filter(function(c){return typeof c=="string"});s.forEach(function(c){a[c]=o})}return a}),dd=e(function(a,i,o){var s=i[2];return a[o]=o,s.forEach(function(c){a[c]=o}),a});var n="far"in gr||Y.autoFetchSvg,r=os(D3,function(a,i){var o=i[0],s=i[1],c=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:c}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:c}),a},{names:{},unicodes:{}});fd=r.names,ud=r.unicodes,el=Co(Y.styleDefault,{family:Y.familyDefault})};P3(function(t){el=Co(t.styleDefault,{family:Y.familyDefault})});md();function nl(t,e){return(cd[t]||{})[e]}function K3(t,e){return(ld[t]||{})[e]}function qn(t,e){return(dd[t]||{})[e]}function pd(t){return fd[t]||{prefix:null,iconName:null}}function G3(t){var e=ud[t],n=nl("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function In(){return el}var rl=function(){return{prefix:null,iconName:null,rest:[]}};function Co(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,r=n===void 0?kt:n,a=Ca[r][t],i=Sa[r][t]||Sa[r][a],o=t in Me.styles?t:null;return i||o||null}var Z0=(li={},$t(li,kt,Object.keys(Ea[kt])),$t(li,Lt,Object.keys(Ea[Lt])),li);function So(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(e={},$t(e,kt,"".concat(Y.cssPrefix,"-").concat(kt)),$t(e,Lt,"".concat(Y.cssPrefix,"-").concat(Lt)),e),o=null,s=kt;(t.includes(i[kt])||t.some(function(u){return Z0[kt].includes(u)}))&&(s=kt),(t.includes(i[Lt])||t.some(function(u){return Z0[Lt].includes(u)}))&&(s=Lt);var c=t.reduce(function(u,l){var m=Y3(Y.cssPrefix,l);if(gr[l]?(l=V3[s].includes(l)?y3[s][l]:l,o=l,u.prefix=l):U3[s].indexOf(l)>-1?(o=l,u.prefix=Co(l,{family:s})):m?u.iconName=m:l!==Y.replacementClass&&l!==i[kt]&&l!==i[Lt]&&u.rest.push(l),!a&&u.prefix&&u.iconName){var p=o==="fa"?pd(u.iconName):{},g=qn(u.prefix,u.iconName);p.prefix&&(o=null),u.iconName=p.iconName||g||u.iconName,u.prefix=p.prefix||u.prefix,u.prefix==="far"&&!gr.far&&gr.fas&&!Y.autoFetchSvg&&(u.prefix="fas")}return u},rl());return(t.includes("fa-brands")||t.includes("fab"))&&(c.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(c.prefix="fad"),!c.prefix&&s===Lt&&(gr.fass||Y.autoFetchSvg)&&(c.prefix="fass",c.iconName=qn(c.prefix,c.iconName)||c.iconName),(c.prefix==="fa"||o==="fa")&&(c.prefix=In()||"fas"),c}var q3=function(){function t(){s3(this,t),this.definitions={}}return c3(t,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var o=a.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=D(D({},n.definitions[s]||{}),o[s]),Ws(s,o[s]);var c=Ea[kt][s];c&&Ws(c,o[s]),md()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var o=a[i],s=o.prefix,c=o.iconName,u=o.icon,l=u[2];n[s]||(n[s]={}),l.length>0&&l.forEach(function(m){typeof m=="string"&&(n[s][m]=u)}),n[s][c]=u}),n}}]),t}(),J0=[],vr={},Cr={},X3=Object.keys(Cr);function Q3(t,e){var n=e.mixoutsTo;return J0=t,vr={},Object.keys(Cr).forEach(function(r){X3.indexOf(r)===-1&&delete Cr[r]}),J0.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(o){typeof a[o]=="function"&&(n[o]=a[o]),qi(a[o])==="object"&&Object.keys(a[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){vr[o]||(vr[o]=[]),vr[o].push(i[o])})}r.provides&&r.provides(Cr)}),n}function Ys(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=vr[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(r))}),e}function or(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=vr[t]||[];a.forEach(function(i){i.apply(null,n)})}function nn(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Cr[t]?Cr[t].apply(null,e):void 0}function Ks(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||In();if(e)return e=qn(n,e)||e,X0(hd.definitions,n,e)||X0(Me.styles,n,e)}var hd=new q3,Z3=function(){Y.autoReplaceSvg=!1,Y.observeMutations=!1,or("noAuto")},J3={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return ln?(or("beforeI2svg",e),nn("pseudoElements2svg",e),nn("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;Y.autoReplaceSvg===!1&&(Y.autoReplaceSvg=!0),Y.observeMutations=!0,F3(function(){ev({autoReplaceSvgRoot:n}),or("watch",e)})}},tv={icon:function(e){if(e===null)return null;if(qi(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:qn(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=Co(e[0]);return{prefix:r,iconName:qn(r,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(Y.cssPrefix,"-"))>-1||e.match(w3))){var a=So(e.split(" "),{skipLookups:!0});return{prefix:a.prefix||In(),iconName:qn(a.prefix,a.iconName)||a.iconName}}if(typeof e=="string"){var i=In();return{prefix:i,iconName:qn(i,e)||e}}}},ve={noAuto:Z3,config:Y,dom:J3,parse:tv,library:hd,findIconDefinition:Ks,toHtml:Va},ev=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,r=n===void 0?St:n;(Object.keys(Me.styles).length>0||Y.autoFetchSvg)&&ln&&Y.autoReplaceSvg&&ve.dom.i2svg({node:r})};function Eo(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(r){return Va(r)})}}),Object.defineProperty(t,"node",{get:function(){if(ln){var r=St.createElement("div");return r.innerHTML=t.html,r.children}}}),t}function nv(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,o=t.transform;if(tl(o)&&n.found&&!r.found){var s=n.width,c=n.height,u={x:s/c/2,y:.5};a.style=ko(D(D({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function rv(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(Y.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:D(D({},a),{},{id:o}),children:r}]}]}function al(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,c=t.title,u=t.maskId,l=t.titleId,m=t.extra,p=t.watchable,g=p===void 0?!1:p,S=r.found?r:n,z=S.width,T=S.height,y=a==="fak",A=[Y.replacementClass,i?"".concat(Y.cssPrefix,"-").concat(i):""].filter(function(ut){return m.classes.indexOf(ut)===-1}).filter(function(ut){return ut!==""||!!ut}).concat(m.classes).join(" "),O={children:[],attributes:D(D({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:A,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(z," ").concat(T)})},j=y&&!~m.classes.indexOf("fa-fw")?{width:"".concat(z/T*16*.0625,"em")}:{};g&&(O.attributes[ir]=""),c&&(O.children.push({tag:"title",attributes:{id:O.attributes["aria-labelledby"]||"title-".concat(l||Pa())},children:[c]}),delete O.attributes.title);var $=D(D({},O),{},{prefix:a,iconName:i,main:n,mask:r,maskId:u,transform:o,symbol:s,styles:D(D({},j),m.styles)}),N=r.found&&n.found?nn("generateAbstractMask",$)||{children:[],attributes:{}}:nn("generateAbstractIcon",$)||{children:[],attributes:{}},q=N.children,ft=N.attributes;return $.children=q,$.attributes=ft,s?rv($):nv($)}function tf(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,o=t.extra,s=t.watchable,c=s===void 0?!1:s,u=D(D(D({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});c&&(u[ir]="");var l=D({},o.styles);tl(a)&&(l.transform=I3({transform:a,startCentered:!0,width:n,height:r}),l["-webkit-transform"]=l.transform);var m=ko(l);m.length>0&&(u.style=m);var p=[];return p.push({tag:"span",attributes:u,children:[e]}),i&&p.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),p}function av(t){var e=t.content,n=t.title,r=t.extra,a=D(D(D({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=ko(r.styles);i.length>0&&(a.style=i);var o=[];return o.push({tag:"span",attributes:a,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var ss=Me.styles;function Gs(t){var e=t[0],n=t[1],r=t.slice(4),a=Gc(r,1),i=a[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(Y.cssPrefix,"-").concat(Gn.GROUP)},children:[{tag:"path",attributes:{class:"".concat(Y.cssPrefix,"-").concat(Gn.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(Y.cssPrefix,"-").concat(Gn.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var iv={found:!1,width:512,height:512};function ov(t,e){!ed&&!Y.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function qs(t,e){var n=e;return e==="fa"&&Y.styleDefault!==null&&(e=In()),new Promise(function(r,a){if(nn("missingIconAbstract"),n==="fa"){var i=pd(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&ss[e]&&ss[e][t]){var o=ss[e][t];return r(Gs(o))}ov(t,e),r(D(D({},iv),{},{icon:Y.showMissingIcons&&t?nn("missingIconAbstract")||{}:{}}))})}var ef=function(){},Xs=Y.measurePerformance&&ei&&ei.mark&&ei.measure?ei:{mark:ef,measure:ef},ra='FA "6.5.1"',sv=function(e){return Xs.mark("".concat(ra," ").concat(e," begins")),function(){return gd(e)}},gd=function(e){Xs.mark("".concat(ra," ").concat(e," ends")),Xs.measure("".concat(ra," ").concat(e),"".concat(ra," ").concat(e," begins"),"".concat(ra," ").concat(e," ends"))},il={begin:sv,end:gd},Ri=function(){};function nf(t){var e=t.getAttribute?t.getAttribute(ir):null;return typeof e=="string"}function cv(t){var e=t.getAttribute?t.getAttribute(Xc):null,n=t.getAttribute?t.getAttribute(Qc):null;return e&&n}function lv(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(Y.replacementClass)}function fv(){if(Y.autoReplaceSvg===!0)return Ti.replace;var t=Ti[Y.autoReplaceSvg];return t||Ti.replace}function uv(t){return St.createElementNS("http://www.w3.org/2000/svg",t)}function dv(t){return St.createElement(t)}function vd(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?uv:dv:n;if(typeof t=="string")return St.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){a.appendChild(vd(o,{ceFn:r}))}),a}function mv(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var Ti={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(a){n.parentNode.insertBefore(vd(a),n)}),n.getAttribute(ir)===null&&Y.keepOriginalSource){var r=St.createComment(mv(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(e){var n=e[0],r=e[1];if(~Jc(n).indexOf(Y.replacementClass))return Ti.replace(e);var a=new RegExp("".concat(Y.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,c){return c===Y.replacementClass||c.match(a)?s.toSvg.push(c):s.toNode.push(c),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return Va(s)}).join(`
`);n.setAttribute(ir,""),n.innerHTML=o}};function rf(t){t()}function bd(t,e){var n=typeof e=="function"?e:Ri;if(t.length===0)n();else{var r=rf;Y.mutateApproach===v3&&(r=Tn.requestAnimationFrame||rf),r(function(){var a=fv(),i=il.begin("mutate");t.map(a),i(),n()})}}var ol=!1;function yd(){ol=!0}function Qs(){ol=!1}var Qi=null;function af(t){if(K0&&Y.observeMutations){var e=t.treeCallback,n=e===void 0?Ri:e,r=t.nodeCallback,a=r===void 0?Ri:r,i=t.pseudoElementsCallback,o=i===void 0?Ri:i,s=t.observeMutationsRoot,c=s===void 0?St:s;Qi=new K0(function(u){if(!ol){var l=In();Wr(u).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!nf(m.addedNodes[0])&&(Y.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&Y.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&nf(m.target)&&~k3.indexOf(m.attributeName))if(m.attributeName==="class"&&cv(m.target)){var p=So(Jc(m.target)),g=p.prefix,S=p.iconName;m.target.setAttribute(Xc,g||l),S&&m.target.setAttribute(Qc,S)}else lv(m.target)&&a(m.target)})}}),ln&&Qi.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function pv(){Qi&&Qi.disconnect()}function hv(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),n}function gv(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=So(Jc(t));return a.prefix||(a.prefix=In()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=K3(a.prefix,t.innerText)||nl(a.prefix,Us(t.innerText))),!a.iconName&&Y.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function vv(t){var e=Wr(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return Y.autoA11y&&(n?e["aria-labelledby"]="".concat(Y.replacementClass,"-title-").concat(r||Pa()):(e["aria-hidden"]="true",e.focusable="false")),e}function bv(){return{iconName:null,title:null,titleId:null,prefix:null,transform:Be,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function of(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=gv(t),r=n.iconName,a=n.prefix,i=n.rest,o=vv(t),s=Ys("parseNodeAttributes",{},t),c=e.styleParser?hv(t):[];return D({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:Be,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:c,attributes:o}},s)}var yv=Me.styles;function wd(t){var e=Y.autoReplaceSvg==="nest"?of(t,{styleParser:!1}):of(t);return~e.extra.classes.indexOf(nd)?nn("generateLayersText",t,e):nn("generateSvgReplacementMutation",t,e)}var Ln=new Set;Zc.map(function(t){Ln.add("fa-".concat(t))});Object.keys(Ca[kt]).map(Ln.add.bind(Ln));Object.keys(Ca[Lt]).map(Ln.add.bind(Ln));Ln=Ba(Ln);function sf(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!ln)return Promise.resolve();var n=St.documentElement.classList,r=function(m){return n.add("".concat(G0,"-").concat(m))},a=function(m){return n.remove("".concat(G0,"-").concat(m))},i=Y.autoFetchSvg?Ln:Zc.map(function(l){return"fa-".concat(l)}).concat(Object.keys(yv));i.includes("fa")||i.push("fa");var o=[".".concat(nd,":not([").concat(ir,"])")].concat(i.map(function(l){return".".concat(l,":not([").concat(ir,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Wr(t.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),a("complete");else return Promise.resolve();var c=il.begin("onTree"),u=s.reduce(function(l,m){try{var p=wd(m);p&&l.push(p)}catch(g){ed||g.name==="MissingIcon"&&console.error(g)}return l},[]);return new Promise(function(l,m){Promise.all(u).then(function(p){bd(p,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),c(),l()})}).catch(function(p){c(),m(p)})})}function wv(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;wd(t).then(function(n){n&&bd([n],e)})}function Av(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:Ks(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Ks(a||{})),t(r,D(D({},n),{},{mask:a}))}}var _v=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?Be:r,i=n.symbol,o=i===void 0?!1:i,s=n.mask,c=s===void 0?null:s,u=n.maskId,l=u===void 0?null:u,m=n.title,p=m===void 0?null:m,g=n.titleId,S=g===void 0?null:g,z=n.classes,T=z===void 0?[]:z,y=n.attributes,A=y===void 0?{}:y,O=n.styles,j=O===void 0?{}:O;if(e){var $=e.prefix,N=e.iconName,q=e.icon;return Eo(D({type:"icon"},e),function(){return or("beforeDOMElementCreation",{iconDefinition:e,params:n}),Y.autoA11y&&(p?A["aria-labelledby"]="".concat(Y.replacementClass,"-title-").concat(S||Pa()):(A["aria-hidden"]="true",A.focusable="false")),al({icons:{main:Gs(q),mask:c?Gs(c.icon):{found:!1,width:null,height:null,icon:{}}},prefix:$,iconName:N,transform:D(D({},Be),a),symbol:o,title:p,maskId:l,titleId:S,extra:{attributes:A,styles:j,classes:T}})})}},xv={mixout:function(){return{icon:Av(_v)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=sf,n.nodeCallback=wv,n}}},provides:function(e){e.i2svg=function(n){var r=n.node,a=r===void 0?St:r,i=n.callback,o=i===void 0?function(){}:i;return sf(a,o)},e.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,o=r.titleId,s=r.prefix,c=r.transform,u=r.symbol,l=r.mask,m=r.maskId,p=r.extra;return new Promise(function(g,S){Promise.all([qs(a,s),l.iconName?qs(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(z){var T=Gc(z,2),y=T[0],A=T[1];g([n,al({icons:{main:y,mask:A},prefix:s,iconName:a,transform:c,symbol:u,maskId:m,title:i,titleId:o,extra:p,watchable:!0})])}).catch(S)})},e.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.transform,s=n.styles,c=ko(s);c.length>0&&(a.style=c);var u;return tl(o)&&(u=nn("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(u||i.icon),{children:r,attributes:a}}}},kv={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return Eo({type:"layer"},function(){or("beforeDOMElementCreation",{assembler:n,params:r});var o=[];return n(function(s){Array.isArray(s)?s.map(function(c){o=o.concat(c.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(Y.cssPrefix,"-layers")].concat(Ba(i)).join(" ")},children:o}]})}}}},Cv={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,o=r.classes,s=o===void 0?[]:o,c=r.attributes,u=c===void 0?{}:c,l=r.styles,m=l===void 0?{}:l;return Eo({type:"counter",content:n},function(){return or("beforeDOMElementCreation",{content:n,params:r}),av({content:n.toString(),title:i,extra:{attributes:u,styles:m,classes:["".concat(Y.cssPrefix,"-layers-counter")].concat(Ba(s))}})})}}}},Sv={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?Be:a,o=r.title,s=o===void 0?null:o,c=r.classes,u=c===void 0?[]:c,l=r.attributes,m=l===void 0?{}:l,p=r.styles,g=p===void 0?{}:p;return Eo({type:"text",content:n},function(){return or("beforeDOMElementCreation",{content:n,params:r}),tf({content:n,transform:D(D({},Be),i),title:s,extra:{attributes:m,styles:g,classes:["".concat(Y.cssPrefix,"-layers-text")].concat(Ba(u))}})})}}},provides:function(e){e.generateLayersText=function(n,r){var a=r.title,i=r.transform,o=r.extra,s=null,c=null;if(Z1){var u=parseInt(getComputedStyle(n).fontSize,10),l=n.getBoundingClientRect();s=l.width/u,c=l.height/u}return Y.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,tf({content:n.innerHTML,width:s,height:c,transform:i,title:a,extra:o,watchable:!0})])}}},Ev=new RegExp('"',"ug"),cf=[1105920,1112319];function Mv(t){var e=t.replace(Ev,""),n=B3(e,0),r=n>=cf[0]&&n<=cf[1],a=e.length===2?e[0]===e[1]:!1;return{value:Us(a?e[0]:e),isSecondary:r||a}}function lf(t,e){var n="".concat(g3).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=Wr(t.children),o=i.filter(function(q){return q.getAttribute(Vs)===e})[0],s=Tn.getComputedStyle(t,e),c=s.getPropertyValue("font-family").match(A3),u=s.getPropertyValue("font-weight"),l=s.getPropertyValue("content");if(o&&!c)return t.removeChild(o),r();if(c&&l!=="none"&&l!==""){var m=s.getPropertyValue("content"),p=~["Sharp"].indexOf(c[2])?Lt:kt,g=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(c[2])?Sa[p][c[2].toLowerCase()]:_3[p][u],S=Mv(m),z=S.value,T=S.isSecondary,y=c[0].startsWith("FontAwesome"),A=nl(g,z),O=A;if(y){var j=G3(z);j.iconName&&j.prefix&&(A=j.iconName,g=j.prefix)}if(A&&!T&&(!o||o.getAttribute(Xc)!==g||o.getAttribute(Qc)!==O)){t.setAttribute(n,O),o&&t.removeChild(o);var $=bv(),N=$.extra;N.attributes[Vs]=e,qs(A,g).then(function(q){var ft=al(D(D({},$),{},{icons:{main:q,mask:rl()},prefix:g,iconName:O,extra:N,watchable:!0})),ut=St.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(ut,t.firstChild):t.appendChild(ut),ut.outerHTML=ft.map(function(_t){return Va(_t)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Pv(t){return Promise.all([lf(t,"::before"),lf(t,"::after")])}function Ov(t){return t.parentNode!==document.head&&!~b3.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Vs)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function ff(t){if(ln)return new Promise(function(e,n){var r=Wr(t.querySelectorAll("*")).filter(Ov).map(Pv),a=il.begin("searchPseudoElements");yd(),Promise.all(r).then(function(){a(),Qs(),e()}).catch(function(){a(),Qs(),n()})})}var zv={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=ff,n}}},provides:function(e){e.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?St:r;Y.searchPseudoElements&&ff(a)}}},uf=!1,Rv={mixout:function(){return{dom:{unwatch:function(){yd(),uf=!0}}}},hooks:function(){return{bootstrap:function(){af(Ys("mutationObserverCallbacks",{}))},noAuto:function(){pv()},watch:function(n){var r=n.observeMutationsRoot;uf?Qs():af(Ys("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},df=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},n)},Tv={mixout:function(){return{parse:{transform:function(n){return df(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=df(a)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},c="translate(".concat(a.x*32,", ").concat(a.y*32,") "),u="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),l="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(c," ").concat(u," ").concat(l)},p={transform:"translate(".concat(o/2*-1," -256)")},g={outer:s,inner:m,path:p};return{tag:"g",attributes:D({},g.outer),children:[{tag:"g",attributes:D({},g.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:D(D({},r.icon.attributes),g.path)}]}]}}}},cs={x:0,y:0,width:"100%",height:"100%"};function mf(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Iv(t){return t.tag==="g"?t.children:[t]}var Lv={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?So(a.split(" ").map(function(o){return o.trim()})):rl();return i.prefix||(i.prefix=In()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.mask,s=n.maskId,c=n.transform,u=i.width,l=i.icon,m=o.width,p=o.icon,g=T3({transform:c,containerWidth:m,iconWidth:u}),S={tag:"rect",attributes:D(D({},cs),{},{fill:"white"})},z=l.children?{children:l.children.map(mf)}:{},T={tag:"g",attributes:D({},g.inner),children:[mf(D({tag:l.tag,attributes:D(D({},l.attributes),g.path)},z))]},y={tag:"g",attributes:D({},g.outer),children:[T]},A="mask-".concat(s||Pa()),O="clip-".concat(s||Pa()),j={tag:"mask",attributes:D(D({},cs),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[S,y]},$={tag:"defs",children:[{tag:"clipPath",attributes:{id:O},children:Iv(p)},j]};return r.push($,{tag:"rect",attributes:D({fill:"currentColor","clip-path":"url(#".concat(O,")"),mask:"url(#".concat(A,")")},cs)}),{children:r,attributes:a}}}},Nv={provides:function(e){var n=!1;Tn.matchMedia&&(n=Tn.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:D(D({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=D(D({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:D(D({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:D(D({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:D(D({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:D(D({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:D(D({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:D(D({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:D(D({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},jv={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},Fv=[N3,xv,kv,Cv,Sv,zv,Rv,Tv,Lv,Nv,jv];Q3(Fv,{mixoutsTo:ve});ve.noAuto;ve.config;var Hv=ve.library;ve.dom;ve.parse;ve.findIconDefinition;ve.toHtml;ve.icon;ve.layer;ve.text;ve.counter;var $v=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Bv={exports:{}};(function(t){(function(e){var n=function(y,A,O){if(!u(A)||m(A)||p(A)||g(A)||c(A))return A;var j,$=0,N=0;if(l(A))for(j=[],N=A.length;$<N;$++)j.push(n(y,A[$],O));else{j={};for(var q in A)Object.prototype.hasOwnProperty.call(A,q)&&(j[y(q,O)]=n(y,A[q],O))}return j},r=function(y,A){A=A||{};var O=A.separator||"_",j=A.split||/(?=[A-Z])/;return y.split(j).join(O)},a=function(y){return S(y)?y:(y=y.replace(/[\-_\s]+(.)?/g,function(A,O){return O?O.toUpperCase():""}),y.substr(0,1).toLowerCase()+y.substr(1))},i=function(y){var A=a(y);return A.substr(0,1).toUpperCase()+A.substr(1)},o=function(y,A){return r(y,A).toLowerCase()},s=Object.prototype.toString,c=function(y){return typeof y=="function"},u=function(y){return y===Object(y)},l=function(y){return s.call(y)=="[object Array]"},m=function(y){return s.call(y)=="[object Date]"},p=function(y){return s.call(y)=="[object RegExp]"},g=function(y){return s.call(y)=="[object Boolean]"},S=function(y){return y=y-0,y===y},z=function(y,A){var O=A&&"process"in A?A.process:A;return typeof O!="function"?y:function(j,$){return O(j,y,$)}},T={camelize:a,decamelize:o,pascalize:i,depascalize:o,camelizeKeys:function(y,A){return n(z(a,A),y)},decamelizeKeys:function(y,A){return n(z(o,A),y,A)},pascalizeKeys:function(y,A){return n(z(i,A),y)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};t.exports?t.exports=T:e.humps=T})($v)})(Bv);var Dv=!1;try{Dv=!0}catch{}var Vv={prefix:"fas",iconName:"user-secret",icon:[448,512,[128373],"f21b","M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"]};Hv.add(Vv);const sl=Ch(U6);sl.use(Oh());sl.use(o3);sl.mount("#app");(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function cl(t,e){const n=new Set(t.split(","));return e?r=>n.has(r.toLowerCase()):r=>n.has(r)}const Ot={},Sr=[],we=()=>{},Uv=()=>!1,Mo=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ll=t=>t.startsWith("onUpdate:"),Kt=Object.assign,fl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Wv=Object.prototype.hasOwnProperty,lt=(t,e)=>Wv.call(t,e),rt=Array.isArray,Er=t=>Po(t)==="[object Map]",Ad=t=>Po(t)==="[object Set]",it=t=>typeof t=="function",Ut=t=>typeof t=="string",Yr=t=>typeof t=="symbol",It=t=>t!==null&&typeof t=="object",_d=t=>(It(t)||it(t))&&it(t.then)&&it(t.catch),xd=Object.prototype.toString,Po=t=>xd.call(t),Yv=t=>Po(t).slice(8,-1),kd=t=>Po(t)==="[object Object]",ul=t=>Ut(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ii=cl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Oo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Kv=/-(\w)/g,Ue=Oo(t=>t.replace(Kv,(e,n)=>n?n.toUpperCase():"")),Gv=/\B([A-Z])/g,Kr=Oo(t=>t.replace(Gv,"-$1").toLowerCase()),zo=Oo(t=>t.charAt(0).toUpperCase()+t.slice(1)),ls=Oo(t=>t?`on${zo(t)}`:""),Nn=(t,e)=>!Object.is(t,e),fs=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Zi=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},qv=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let pf;const Cd=()=>pf||(pf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function dl(t){if(rt(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],a=Ut(r)?Jv(r):dl(r);if(a)for(const i in a)e[i]=a[i]}return e}else if(Ut(t)||It(t))return t}const Xv=/;(?![^(]*\))/g,Qv=/:([^]+)/,Zv=/\/\*[^]*?\*\//g;function Jv(t){const e={};return t.replace(Zv,"").split(Xv).forEach(n=>{if(n){const r=n.split(Qv);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function ml(t){let e="";if(Ut(t))e=t;else if(rt(t))for(let n=0;n<t.length;n++){const r=ml(t[n]);r&&(e+=r+" ")}else if(It(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const t5="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",e5=cl(t5);function Sd(t){return!!t||t===""}const n5=t=>Ut(t)?t:t==null?"":rt(t)||It(t)&&(t.toString===xd||!it(t.toString))?JSON.stringify(t,Ed,2):String(t),Ed=(t,e)=>e&&e.__v_isRef?Ed(t,e.value):Er(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,a],i)=>(n[us(r,i)+" =>"]=a,n),{})}:Ad(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>us(n))}:Yr(e)?us(e):It(e)&&!rt(e)&&!kd(e)?String(e):e,us=(t,e="")=>{var n;return Yr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ke;class Md{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ke,!e&&ke&&(this.index=(ke.scopes||(ke.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=ke;try{return ke=this,e()}finally{ke=n}}}on(){ke=this}off(){ke=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function r5(t){return new Md(t)}function a5(t,e=ke){e&&e.active&&e.effects.push(t)}function i5(){return ke}let nr;class pl{constructor(e,n,r,a){this.fn=e,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,a5(this,a)}get dirty(){if(this._dirtyLevel===1){ur();for(let e=0;e<this._depsLength;e++){const n=this.deps[e];if(n.computed&&(o5(n.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),dr()}return this._dirtyLevel>=2}set dirty(e){this._dirtyLevel=e?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=On,n=nr;try{return On=!0,nr=this,this._runnings++,hf(this),this.fn()}finally{gf(this),this._runnings--,nr=n,On=e}}stop(){var e;this.active&&(hf(this),gf(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function o5(t){return t.value}function hf(t){t._trackId++,t._depsLength=0}function gf(t){if(t.deps&&t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)Pd(t.deps[e],t);t.deps.length=t._depsLength}}function Pd(t,e){const n=t.get(e);n!==void 0&&e._trackId!==n&&(t.delete(e),t.size===0&&t.cleanup())}let On=!0,Zs=0;const Od=[];function ur(){Od.push(On),On=!1}function dr(){const t=Od.pop();On=t===void 0?!0:t}function hl(){Zs++}function gl(){for(Zs--;!Zs&&Js.length;)Js.shift()()}function zd(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const r=t.deps[t._depsLength];r!==e?(r&&Pd(r,t),t.deps[t._depsLength++]=e):t._depsLength++}}const Js=[];function Rd(t,e,n){hl();for(const r of t.keys())if(r._dirtyLevel<e&&t.get(r)===r._trackId){const a=r._dirtyLevel;r._dirtyLevel=e,a===0&&(r._shouldSchedule=!0,r.trigger())}Td(t),gl()}function Td(t){for(const e of t.keys())e.scheduler&&e._shouldSchedule&&(!e._runnings||e.allowRecurse)&&t.get(e)===e._trackId&&(e._shouldSchedule=!1,Js.push(e.scheduler))}const Id=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},tc=new WeakMap,rr=Symbol(""),ec=Symbol("");function ce(t,e,n){if(On&&nr){let r=tc.get(t);r||tc.set(t,r=new Map);let a=r.get(n);a||r.set(n,a=Id(()=>r.delete(n))),zd(nr,a)}}function Ze(t,e,n,r,a,i){const o=tc.get(t);if(!o)return;let s=[];if(e==="clear")s=[...o.values()];else if(n==="length"&&rt(t)){const c=Number(r);o.forEach((u,l)=>{(l==="length"||!Yr(l)&&l>=c)&&s.push(u)})}else switch(n!==void 0&&s.push(o.get(n)),e){case"add":rt(t)?ul(n)&&s.push(o.get("length")):(s.push(o.get(rr)),Er(t)&&s.push(o.get(ec)));break;case"delete":rt(t)||(s.push(o.get(rr)),Er(t)&&s.push(o.get(ec)));break;case"set":Er(t)&&s.push(o.get(rr));break}hl();for(const c of s)c&&Rd(c,2);gl()}const s5=cl("__proto__,__v_isRef,__isVue"),Ld=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Yr)),vf=c5();function c5(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=mt(this);for(let i=0,o=this.length;i<o;i++)ce(r,"get",i+"");const a=r[e](...n);return a===-1||a===!1?r[e](...n.map(mt)):a}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){ur(),hl();const r=mt(this)[e].apply(this,n);return gl(),dr(),r}}),t}function l5(t){const e=mt(this);return ce(e,"has",t),e.hasOwnProperty(t)}class Nd{constructor(e=!1,n=!1){this._isReadonly=e,this._shallow=n}get(e,n,r){const a=this._isReadonly,i=this._shallow;if(n==="__v_isReactive")return!a;if(n==="__v_isReadonly")return a;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(a?i?_5:$d:i?Hd:Fd).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=rt(e);if(!a){if(o&&lt(vf,n))return Reflect.get(vf,n,r);if(n==="hasOwnProperty")return l5}const s=Reflect.get(e,n,r);return(Yr(n)?Ld.has(n):s5(n))||(a||ce(e,"get",n),i)?s:le(s)?o&&ul(n)?s:s.value:It(s)?a?Dd(s):To(s):s}}class jd extends Nd{constructor(e=!1){super(!1,e)}set(e,n,r,a){let i=e[n];if(!this._shallow){const c=jr(i);if(!Ji(r)&&!jr(r)&&(i=mt(i),r=mt(r)),!rt(e)&&le(i)&&!le(r))return c?!1:(i.value=r,!0)}const o=rt(e)&&ul(n)?Number(n)<e.length:lt(e,n),s=Reflect.set(e,n,r,a);return e===mt(a)&&(o?Nn(r,i)&&Ze(e,"set",n,r):Ze(e,"add",n,r)),s}deleteProperty(e,n){const r=lt(e,n);e[n];const a=Reflect.deleteProperty(e,n);return a&&r&&Ze(e,"delete",n,void 0),a}has(e,n){const r=Reflect.has(e,n);return(!Yr(n)||!Ld.has(n))&&ce(e,"has",n),r}ownKeys(e){return ce(e,"iterate",rt(e)?"length":rr),Reflect.ownKeys(e)}}class f5 extends Nd{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const u5=new jd,d5=new f5,m5=new jd(!0),vl=t=>t,Ro=t=>Reflect.getPrototypeOf(t);function fi(t,e,n=!1,r=!1){t=t.__v_raw;const a=mt(t),i=mt(e);n||(Nn(e,i)&&ce(a,"get",e),ce(a,"get",i));const{has:o}=Ro(a),s=r?vl:n?Al:Oa;if(o.call(a,e))return s(t.get(e));if(o.call(a,i))return s(t.get(i));t!==a&&t.get(e)}function ui(t,e=!1){const n=this.__v_raw,r=mt(n),a=mt(t);return e||(Nn(t,a)&&ce(r,"has",t),ce(r,"has",a)),t===a?n.has(t):n.has(t)||n.has(a)}function di(t,e=!1){return t=t.__v_raw,!e&&ce(mt(t),"iterate",rr),Reflect.get(t,"size",t)}function bf(t){t=mt(t);const e=mt(this);return Ro(e).has.call(e,t)||(e.add(t),Ze(e,"add",t,t)),this}function yf(t,e){e=mt(e);const n=mt(this),{has:r,get:a}=Ro(n);let i=r.call(n,t);i||(t=mt(t),i=r.call(n,t));const o=a.call(n,t);return n.set(t,e),i?Nn(e,o)&&Ze(n,"set",t,e):Ze(n,"add",t,e),this}function wf(t){const e=mt(this),{has:n,get:r}=Ro(e);let a=n.call(e,t);a||(t=mt(t),a=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return a&&Ze(e,"delete",t,void 0),i}function Af(){const t=mt(this),e=t.size!==0,n=t.clear();return e&&Ze(t,"clear",void 0,void 0),n}function mi(t,e){return function(n,r){const a=this,i=a.__v_raw,o=mt(i),s=e?vl:t?Al:Oa;return!t&&ce(o,"iterate",rr),i.forEach((c,u)=>n.call(r,s(c),s(u),a))}}function pi(t,e,n){return function(...r){const a=this.__v_raw,i=mt(a),o=Er(i),s=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=a[t](...r),l=n?vl:e?Al:Oa;return!e&&ce(i,"iterate",c?ec:rr),{next(){const{value:m,done:p}=u.next();return p?{value:m,done:p}:{value:s?[l(m[0]),l(m[1])]:l(m),done:p}},[Symbol.iterator](){return this}}}}function gn(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function p5(){const t={get(a){return fi(this,a)},get size(){return di(this)},has:ui,add:bf,set:yf,delete:wf,clear:Af,forEach:mi(!1,!1)},e={get(a){return fi(this,a,!1,!0)},get size(){return di(this)},has:ui,add:bf,set:yf,delete:wf,clear:Af,forEach:mi(!1,!0)},n={get(a){return fi(this,a,!0)},get size(){return di(this,!0)},has(a){return ui.call(this,a,!0)},add:gn("add"),set:gn("set"),delete:gn("delete"),clear:gn("clear"),forEach:mi(!0,!1)},r={get(a){return fi(this,a,!0,!0)},get size(){return di(this,!0)},has(a){return ui.call(this,a,!0)},add:gn("add"),set:gn("set"),delete:gn("delete"),clear:gn("clear"),forEach:mi(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(a=>{t[a]=pi(a,!1,!1),n[a]=pi(a,!0,!1),e[a]=pi(a,!1,!0),r[a]=pi(a,!0,!0)}),[t,n,e,r]}const[h5,g5,v5,b5]=p5();function bl(t,e){const n=e?t?b5:v5:t?g5:h5;return(r,a,i)=>a==="__v_isReactive"?!t:a==="__v_isReadonly"?t:a==="__v_raw"?r:Reflect.get(lt(n,a)&&a in r?n:r,a,i)}const y5={get:bl(!1,!1)},w5={get:bl(!1,!0)},A5={get:bl(!0,!1)},Fd=new WeakMap,Hd=new WeakMap,$d=new WeakMap,_5=new WeakMap;function x5(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function k5(t){return t.__v_skip||!Object.isExtensible(t)?0:x5(Yv(t))}function To(t){return jr(t)?t:yl(t,!1,u5,y5,Fd)}function Bd(t){return yl(t,!1,m5,w5,Hd)}function Dd(t){return yl(t,!0,d5,A5,$d)}function yl(t,e,n,r,a){if(!It(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=a.get(t);if(i)return i;const o=k5(t);if(o===0)return t;const s=new Proxy(t,o===2?r:n);return a.set(t,s),s}function Mr(t){return jr(t)?Mr(t.__v_raw):!!(t&&t.__v_isReactive)}function jr(t){return!!(t&&t.__v_isReadonly)}function Ji(t){return!!(t&&t.__v_isShallow)}function Vd(t){return Mr(t)||jr(t)}function mt(t){const e=t&&t.__v_raw;return e?mt(e):t}function wl(t){return Zi(t,"__v_skip",!0),t}const Oa=t=>It(t)?To(t):t,Al=t=>It(t)?Dd(t):t;class Ud{constructor(e,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new pl(()=>e(this._value),()=>Li(this,1),()=>this.dep&&Td(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const e=mt(this);return(!e._cacheable||e.effect.dirty)&&Nn(e._value,e._value=e.effect.run())&&Li(e,2),Wd(e),e.effect._dirtyLevel>=1&&Li(e,1),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function C5(t,e,n=!1){let r,a;const i=it(t);return i?(r=t,a=we):(r=t.get,a=t.set),new Ud(r,a,i||!a,n)}function Wd(t){On&&nr&&(t=mt(t),zd(nr,t.dep||(t.dep=Id(()=>t.dep=void 0,t instanceof Ud?t:void 0))))}function Li(t,e=2,n){t=mt(t);const r=t.dep;r&&Rd(r,e)}function le(t){return!!(t&&t.__v_isRef===!0)}function Yd(t){return Kd(t,!1)}function S5(t){return Kd(t,!0)}function Kd(t,e){return le(t)?t:new E5(t,e)}class E5{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:mt(e),this._value=n?e:Oa(e)}get value(){return Wd(this),this._value}set value(e){const n=this.__v_isShallow||Ji(e)||jr(e);e=n?e:mt(e),Nn(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Oa(e),Li(this,2))}}function ar(t){return le(t)?t.value:t}const M5={get:(t,e,n)=>ar(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const a=t[e];return le(a)&&!le(n)?(a.value=n,!0):Reflect.set(t,e,n,r)}};function Gd(t){return Mr(t)?t:new Proxy(t,M5)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function zn(t,e,n,r){let a;try{a=r?t(...r):t()}catch(i){Io(i,e,n)}return a}function Re(t,e,n,r){if(it(t)){const i=zn(t,e,n,r);return i&&_d(i)&&i.catch(o=>{Io(o,e,n)}),i}const a=[];for(let i=0;i<t.length;i++)a.push(Re(t[i],e,n,r));return a}function Io(t,e,n,r=!0){const a=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const u=i.ec;if(u){for(let l=0;l<u.length;l++)if(u[l](t,o,s)===!1)return}i=i.parent}const c=e.appContext.config.errorHandler;if(c){zn(c,null,10,[t,o,s]);return}}P5(t,n,a,r)}function P5(t,e,n,r=!0){console.error(t)}let za=!1,nc=!1;const Xt=[];let $e=0;const Pr=[];let xn=null,Kn=0;const qd=Promise.resolve();let _l=null;function Xd(t){const e=_l||qd;return t?e.then(this?t.bind(this):t):e}function O5(t){let e=$e+1,n=Xt.length;for(;e<n;){const r=e+n>>>1,a=Xt[r],i=Ra(a);i<t||i===t&&a.pre?e=r+1:n=r}return e}function xl(t){(!Xt.length||!Xt.includes(t,za&&t.allowRecurse?$e+1:$e))&&(t.id==null?Xt.push(t):Xt.splice(O5(t.id),0,t),Qd())}function Qd(){!za&&!nc&&(nc=!0,_l=qd.then(Jd))}function z5(t){const e=Xt.indexOf(t);e>$e&&Xt.splice(e,1)}function R5(t){rt(t)?Pr.push(...t):(!xn||!xn.includes(t,t.allowRecurse?Kn+1:Kn))&&Pr.push(t),Qd()}function _f(t,e,n=za?$e+1:0){for(;n<Xt.length;n++){const r=Xt[n];if(r&&r.pre){if(t&&r.id!==t.uid)continue;Xt.splice(n,1),n--,r()}}}function Zd(t){if(Pr.length){const e=[...new Set(Pr)].sort((n,r)=>Ra(n)-Ra(r));if(Pr.length=0,xn){xn.push(...e);return}for(xn=e,Kn=0;Kn<xn.length;Kn++)xn[Kn]();xn=null,Kn=0}}const Ra=t=>t.id==null?1/0:t.id,T5=(t,e)=>{const n=Ra(t)-Ra(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function Jd(t){nc=!1,za=!0,Xt.sort(T5);try{for($e=0;$e<Xt.length;$e++){const e=Xt[$e];e&&e.active!==!1&&zn(e,null,14)}}finally{$e=0,Xt.length=0,Zd(),za=!1,_l=null,(Xt.length||Pr.length)&&Jd()}}function I5(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ot;let a=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const l=`${o==="modelValue"?"model":o}Modifiers`,{number:m,trim:p}=r[l]||Ot;p&&(a=n.map(g=>Ut(g)?g.trim():g)),m&&(a=n.map(qv))}let s,c=r[s=ls(e)]||r[s=ls(Ue(e))];!c&&i&&(c=r[s=ls(Kr(e))]),c&&Re(c,t,6,a);const u=r[s+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[s])return;t.emitted[s]=!0,Re(u,t,6,a)}}function t2(t,e,n=!1){const r=e.emitsCache,a=r.get(t);if(a!==void 0)return a;const i=t.emits;let o={},s=!1;if(!it(t)){const c=u=>{const l=t2(u,e,!0);l&&(s=!0,Kt(o,l))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!s?(It(t)&&r.set(t,null),null):(rt(i)?i.forEach(c=>o[c]=null):Kt(o,i),It(t)&&r.set(t,o),o)}function Lo(t,e){return!t||!Mo(e)?!1:(e=e.slice(2).replace(/Once$/,""),lt(t,e[0].toLowerCase()+e.slice(1))||lt(t,Kr(e))||lt(t,e))}let re=null,No=null;function to(t){const e=re;return re=t,No=t&&t.type.__scopeId||null,e}function kl(t){No=t}function Cl(){No=null}function pe(t,e=re,n){if(!e||t._n)return t;const r=(...a)=>{r._d&&Tf(-1);const i=to(e);let o;try{o=t(...a)}finally{to(i),r._d&&Tf(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function ds(t){const{type:e,vnode:n,proxy:r,withProxy:a,props:i,propsOptions:[o],slots:s,attrs:c,emit:u,render:l,renderCache:m,data:p,setupState:g,ctx:S,inheritAttrs:z}=t;let T,y;const A=to(t);try{if(n.shapeFlag&4){const j=a||r,$=j;T=Fe(l.call($,j,m,i,g,p,S)),y=c}else{const j=e;T=Fe(j.length>1?j(i,{attrs:c,slots:s,emit:u}):j(i,null)),y=e.props?c:L5(c)}}catch(j){ha.length=0,Io(j,t,1),T=zt(Fr)}let O=T;if(y&&z!==!1){const j=Object.keys(y),{shapeFlag:$}=O;j.length&&$&7&&(o&&j.some(ll)&&(y=N5(y,o)),O=Hr(O,y))}return n.dirs&&(O=Hr(O),O.dirs=O.dirs?O.dirs.concat(n.dirs):n.dirs),n.transition&&(O.transition=n.transition),T=O,to(A),T}const L5=t=>{let e;for(const n in t)(n==="class"||n==="style"||Mo(n))&&((e||(e={}))[n]=t[n]);return e},N5=(t,e)=>{const n={};for(const r in t)(!ll(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function j5(t,e,n){const{props:r,children:a,component:i}=t,{props:o,children:s,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?xf(r,o,u):!!o;if(c&8){const l=e.dynamicProps;for(let m=0;m<l.length;m++){const p=l[m];if(o[p]!==r[p]&&!Lo(u,p))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?xf(r,o,u):!0:!!o;return!1}function xf(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(e[i]!==t[i]&&!Lo(n,i))return!0}return!1}function F5({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const e2="components";function S7(t,e){return $5(e2,t,!0,e)||t}const H5=Symbol.for("v-ndc");function $5(t,e,n=!0,r=!1){const a=re||Qt;if(a){const i=a.type;if(t===e2){const s=I4(i,!1);if(s&&(s===e||s===Ue(e)||s===zo(Ue(e))))return i}const o=kf(a[t]||i[t],e)||kf(a.appContext[t],e);return!o&&r?i:o}}function kf(t,e){return t&&(t[e]||t[Ue(e)]||t[zo(Ue(e))])}const B5=t=>t.__isSuspense;function D5(t,e){e&&e.pendingBranch?rt(t)?e.effects.push(...t):e.effects.push(t):R5(t)}const V5=Symbol.for("v-scx"),U5=()=>Je(V5),hi={};function Ni(t,e,n){return n2(t,e,n)}function n2(t,e,{immediate:n,deep:r,flush:a,once:i,onTrack:o,onTrigger:s}=Ot){if(e&&i){const N=e;e=(...q)=>{N(...q),$()}}const c=Qt,u=N=>r===!0?N:br(N,r===!1?1:void 0);let l,m=!1,p=!1;if(le(t)?(l=()=>t.value,m=Ji(t)):Mr(t)?(l=()=>u(t),m=!0):rt(t)?(p=!0,m=t.some(N=>Mr(N)||Ji(N)),l=()=>t.map(N=>{if(le(N))return N.value;if(Mr(N))return u(N);if(it(N))return zn(N,c,2)})):it(t)?e?l=()=>zn(t,c,2):l=()=>(g&&g(),Re(t,c,3,[S])):l=we,e&&r){const N=l;l=()=>br(N())}let g,S=N=>{g=O.onStop=()=>{zn(N,c,4),g=O.onStop=void 0}},z;if($o)if(S=we,e?n&&Re(e,c,3,[l(),p?[]:void 0,S]):l(),a==="sync"){const N=U5();z=N.__watcherHandles||(N.__watcherHandles=[])}else return we;let T=p?new Array(t.length).fill(hi):hi;const y=()=>{if(!(!O.active||!O.dirty))if(e){const N=O.run();(r||m||(p?N.some((q,ft)=>Nn(q,T[ft])):Nn(N,T)))&&(g&&g(),Re(e,c,3,[N,T===hi?void 0:p&&T[0]===hi?[]:T,S]),T=N)}else O.run()};y.allowRecurse=!!e;let A;a==="sync"?A=y:a==="post"?A=()=>ie(y,c&&c.suspense):(y.pre=!0,c&&(y.id=c.uid),A=()=>xl(y));const O=new pl(l,we,A),j=i5(),$=()=>{O.stop(),j&&fl(j.effects,O)};return e?n?y():T=O.run():a==="post"?ie(O.run.bind(O),c&&c.suspense):O.run(),z&&z.push($),$}function W5(t,e,n){const r=this.proxy,a=Ut(t)?t.includes(".")?r2(r,t):()=>r[t]:t.bind(r,r);let i;it(e)?i=e:(i=e.handler,n=e);const o=Ua(this),s=n2(a,i.bind(r),n);return o(),s}function r2(t,e){const n=e.split(".");return()=>{let r=t;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function br(t,e,n=0,r){if(!It(t)||t.__v_skip)return t;if(e&&e>0){if(n>=e)return t;n++}if(r=r||new Set,r.has(t))return t;if(r.add(t),le(t))br(t.value,e,n,r);else if(rt(t))for(let a=0;a<t.length;a++)br(t[a],e,n,r);else if(Ad(t)||Er(t))t.forEach(a=>{br(a,e,n,r)});else if(kd(t))for(const a in t)br(t[a],e,n,r);return t}function Un(t,e,n,r){const a=t.dirs,i=e&&e.dirs;for(let o=0;o<a.length;o++){const s=a[o];i&&(s.oldValue=i[o].value);let c=s.dir[r];c&&(ur(),Re(c,n,8,[t.el,s,t,e]),dr())}}/*! #__NO_SIDE_EFFECTS__ */function a2(t,e){return it(t)?Kt({name:t.name},e,{setup:t}):t}const ma=t=>!!t.type.__asyncLoader,i2=t=>t.type.__isKeepAlive;function Y5(t,e){o2(t,"a",e)}function K5(t,e){o2(t,"da",e)}function o2(t,e,n=Qt){const r=t.__wdc||(t.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return t()});if(jo(e,r,n),n){let a=n.parent;for(;a&&a.parent;)i2(a.parent.vnode)&&G5(r,e,n,a),a=a.parent}}function G5(t,e,n,r){const a=jo(e,t,r,!0);s2(()=>{fl(r[e],a)},n)}function jo(t,e,n=Qt,r=!1){if(n){const a=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;ur();const s=Ua(n),c=Re(e,n,t,o);return s(),dr(),c});return r?a.unshift(i):a.push(i),i}}const fn=t=>(e,n=Qt)=>(!$o||t==="sp")&&jo(t,(...r)=>e(...r),n),q5=fn("bm"),X5=fn("m"),Q5=fn("bu"),Z5=fn("u"),J5=fn("bum"),s2=fn("um"),t4=fn("sp"),e4=fn("rtg"),n4=fn("rtc");function r4(t,e=Qt){jo("ec",t,e)}function ms(t,e,n={},r,a){if(re.isCE||re.parent&&ma(re.parent)&&re.parent.isCE)return e!=="default"&&(n.name=e),zt("slot",n,r&&r());let i=t[e];i&&i._c&&(i._d=!1),Ye();const o=i&&c2(i(n)),s=x4(ge,{key:n.key||o&&o.key||`_${e}`},o||(r?r():[]),o&&t._===1?64:-2);return!a&&s.scopeId&&(s.slotScopeIds=[s.scopeId+"-s"]),i&&i._c&&(i._d=!0),s}function c2(t){return t.some(e=>ro(e)?!(e.type===Fr||e.type===ge&&!c2(e.children)):!0)?t:null}const rc=t=>t?w2(t)?Pl(t)||t.proxy:rc(t.parent):null,pa=Kt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>rc(t.parent),$root:t=>rc(t.root),$emit:t=>t.emit,$options:t=>Sl(t),$forceUpdate:t=>t.f||(t.f=()=>{t.effect.dirty=!0,xl(t.update)}),$nextTick:t=>t.n||(t.n=Xd.bind(t.proxy)),$watch:t=>W5.bind(t)}),ps=(t,e)=>t!==Ot&&!t.__isScriptSetup&&lt(t,e),a4={get({_:t},e){const{ctx:n,setupState:r,data:a,props:i,accessCache:o,type:s,appContext:c}=t;let u;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return a[e];case 4:return n[e];case 3:return i[e]}else{if(ps(r,e))return o[e]=1,r[e];if(a!==Ot&&lt(a,e))return o[e]=2,a[e];if((u=t.propsOptions[0])&&lt(u,e))return o[e]=3,i[e];if(n!==Ot&&lt(n,e))return o[e]=4,n[e];ac&&(o[e]=0)}}const l=pa[e];let m,p;if(l)return e==="$attrs"&&ce(t,"get",e),l(t);if((m=s.__cssModules)&&(m=m[e]))return m;if(n!==Ot&&lt(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,lt(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:a,ctx:i}=t;return ps(a,e)?(a[e]=n,!0):r!==Ot&&lt(r,e)?(r[e]=n,!0):lt(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:a,propsOptions:i}},o){let s;return!!n[o]||t!==Ot&&lt(t,o)||ps(e,o)||(s=i[0])&&lt(s,o)||lt(r,o)||lt(pa,o)||lt(a.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:lt(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Cf(t){return rt(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let ac=!0;function i4(t){const e=Sl(t),n=t.proxy,r=t.ctx;ac=!1,e.beforeCreate&&Sf(e.beforeCreate,t,"bc");const{data:a,computed:i,methods:o,watch:s,provide:c,inject:u,created:l,beforeMount:m,mounted:p,beforeUpdate:g,updated:S,activated:z,deactivated:T,beforeDestroy:y,beforeUnmount:A,destroyed:O,unmounted:j,render:$,renderTracked:N,renderTriggered:q,errorCaptured:ft,serverPrefetch:ut,expose:_t,inheritAttrs:Wt,components:Zt,directives:jt,filters:Ae}=e;if(u&&o4(u,r,null),o)for(const tt in o){const W=o[tt];it(W)&&(r[tt]=W.bind(n))}if(a){const tt=a.call(n,n);It(tt)&&(t.data=To(tt))}if(ac=!0,i)for(const tt in i){const W=i[tt],et=it(W)?W.bind(n,n):it(W.get)?W.get.bind(n,n):we,Jt=!it(W)&&it(W.set)?W.set.bind(n):we,Dt=Se({get:et,set:Jt});Object.defineProperty(r,tt,{enumerable:!0,configurable:!0,get:()=>Dt.value,set:Ht=>Dt.value=Ht})}if(s)for(const tt in s)l2(s[tt],r,n,tt);if(c){const tt=it(c)?c.call(n):c;Reflect.ownKeys(tt).forEach(W=>{ji(W,tt[W])})}l&&Sf(l,t,"c");function xt(tt,W){rt(W)?W.forEach(et=>tt(et.bind(n))):W&&tt(W.bind(n))}if(xt(q5,m),xt(X5,p),xt(Q5,g),xt(Z5,S),xt(Y5,z),xt(K5,T),xt(r4,ft),xt(n4,N),xt(e4,q),xt(J5,A),xt(s2,j),xt(t4,ut),rt(_t))if(_t.length){const tt=t.exposed||(t.exposed={});_t.forEach(W=>{Object.defineProperty(tt,W,{get:()=>n[W],set:et=>n[W]=et})})}else t.exposed||(t.exposed={});$&&t.render===we&&(t.render=$),Wt!=null&&(t.inheritAttrs=Wt),Zt&&(t.components=Zt),jt&&(t.directives=jt)}function o4(t,e,n=we){rt(t)&&(t=ic(t));for(const r in t){const a=t[r];let i;It(a)?"default"in a?i=Je(a.from||r,a.default,!0):i=Je(a.from||r):i=Je(a),le(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Sf(t,e,n){Re(rt(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function l2(t,e,n,r){const a=r.includes(".")?r2(n,r):()=>n[r];if(Ut(t)){const i=e[t];it(i)&&Ni(a,i)}else if(it(t))Ni(a,t.bind(n));else if(It(t))if(rt(t))t.forEach(i=>l2(i,e,n,r));else{const i=it(t.handler)?t.handler.bind(n):e[t.handler];it(i)&&Ni(a,i,t)}}function Sl(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,s=i.get(e);let c;return s?c=s:!a.length&&!n&&!r?c=e:(c={},a.length&&a.forEach(u=>eo(c,u,o,!0)),eo(c,e,o)),It(e)&&i.set(e,c),c}function eo(t,e,n,r=!1){const{mixins:a,extends:i}=e;i&&eo(t,i,n,!0),a&&a.forEach(o=>eo(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const s=s4[o]||n&&n[o];t[o]=s?s(t[o],e[o]):e[o]}return t}const s4={data:Ef,props:Mf,emits:Mf,methods:aa,computed:aa,beforeCreate:ee,created:ee,beforeMount:ee,mounted:ee,beforeUpdate:ee,updated:ee,beforeDestroy:ee,beforeUnmount:ee,destroyed:ee,unmounted:ee,activated:ee,deactivated:ee,errorCaptured:ee,serverPrefetch:ee,components:aa,directives:aa,watch:l4,provide:Ef,inject:c4};function Ef(t,e){return e?t?function(){return Kt(it(t)?t.call(this,this):t,it(e)?e.call(this,this):e)}:e:t}function c4(t,e){return aa(ic(t),ic(e))}function ic(t){if(rt(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ee(t,e){return t?[...new Set([].concat(t,e))]:e}function aa(t,e){return t?Kt(Object.create(null),t,e):e}function Mf(t,e){return t?rt(t)&&rt(e)?[...new Set([...t,...e])]:Kt(Object.create(null),Cf(t),Cf(e??{})):e}function l4(t,e){if(!t)return e;if(!e)return t;const n=Kt(Object.create(null),t);for(const r in e)n[r]=ee(t[r],e[r]);return n}function f2(){return{app:null,config:{isNativeTag:Uv,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let f4=0;function u4(t,e){return function(n,r=null){it(n)||(n=Kt({},n)),r!=null&&!It(r)&&(r=null);const a=f2(),i=new WeakSet;let o=!1;const s=a.app={_uid:f4++,_component:n,_props:r,_container:null,_context:a,_instance:null,version:N4,get config(){return a.config},set config(c){},use(c,...u){return i.has(c)||(c&&it(c.install)?(i.add(c),c.install(s,...u)):it(c)&&(i.add(c),c(s,...u))),s},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),s},component(c,u){return u?(a.components[c]=u,s):a.components[c]},directive(c,u){return u?(a.directives[c]=u,s):a.directives[c]},mount(c,u,l){if(!o){const m=zt(n,r);return m.appContext=a,l===!0?l="svg":l===!1&&(l=void 0),u&&e?e(m,c):t(m,c,l),o=!0,s._container=c,c.__vue_app__=s,Pl(m.component)||m.component.proxy}},unmount(){o&&(t(null,s._container),delete s._container.__vue_app__)},provide(c,u){return a.provides[c]=u,s},runWithContext(c){no=s;try{return c()}finally{no=null}}};return s}}let no=null;function ji(t,e){if(Qt){let n=Qt.provides;const r=Qt.parent&&Qt.parent.provides;r===n&&(n=Qt.provides=Object.create(r)),n[t]=e}}function Je(t,e,n=!1){const r=Qt||re;if(r||no){const a=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:no._context.provides;if(a&&t in a)return a[t];if(arguments.length>1)return n&&it(e)?e.call(r&&r.proxy):e}}function d4(t,e,n,r=!1){const a={},i={};Zi(i,Ho,1),t.propsDefaults=Object.create(null),u2(t,e,a,i);for(const o in t.propsOptions[0])o in a||(a[o]=void 0);n?t.props=r?a:Bd(a):t.type.props?t.props=a:t.props=i,t.attrs=i}function m4(t,e,n,r){const{props:a,attrs:i,vnode:{patchFlag:o}}=t,s=mt(a),[c]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const l=t.vnode.dynamicProps;for(let m=0;m<l.length;m++){let p=l[m];if(Lo(t.emitsOptions,p))continue;const g=e[p];if(c)if(lt(i,p))g!==i[p]&&(i[p]=g,u=!0);else{const S=Ue(p);a[S]=oc(c,s,S,g,t,!1)}else g!==i[p]&&(i[p]=g,u=!0)}}}else{u2(t,e,a,i)&&(u=!0);let l;for(const m in s)(!e||!lt(e,m)&&((l=Kr(m))===m||!lt(e,l)))&&(c?n&&(n[m]!==void 0||n[l]!==void 0)&&(a[m]=oc(c,s,m,void 0,t,!0)):delete a[m]);if(i!==s)for(const m in i)(!e||!lt(e,m))&&(delete i[m],u=!0)}u&&Ze(t,"set","$attrs")}function u2(t,e,n,r){const[a,i]=t.propsOptions;let o=!1,s;if(e)for(let c in e){if(Ii(c))continue;const u=e[c];let l;a&&lt(a,l=Ue(c))?!i||!i.includes(l)?n[l]=u:(s||(s={}))[l]=u:Lo(t.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(i){const c=mt(n),u=s||Ot;for(let l=0;l<i.length;l++){const m=i[l];n[m]=oc(a,c,m,u[m],t,!lt(u,m))}}return o}function oc(t,e,n,r,a,i){const o=t[n];if(o!=null){const s=lt(o,"default");if(s&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&it(c)){const{propsDefaults:u}=a;if(n in u)r=u[n];else{const l=Ua(a);r=u[n]=c.call(null,e),l()}}else r=c}o[0]&&(i&&!s?r=!1:o[1]&&(r===""||r===Kr(n))&&(r=!0))}return r}function d2(t,e,n=!1){const r=e.propsCache,a=r.get(t);if(a)return a;const i=t.props,o={},s=[];let c=!1;if(!it(t)){const l=m=>{c=!0;const[p,g]=d2(m,e,!0);Kt(o,p),g&&s.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}if(!i&&!c)return It(t)&&r.set(t,Sr),Sr;if(rt(i))for(let l=0;l<i.length;l++){const m=Ue(i[l]);Pf(m)&&(o[m]=Ot)}else if(i)for(const l in i){const m=Ue(l);if(Pf(m)){const p=i[l],g=o[m]=rt(p)||it(p)?{type:p}:Kt({},p);if(g){const S=Rf(Boolean,g.type),z=Rf(String,g.type);g[0]=S>-1,g[1]=z<0||S<z,(S>-1||lt(g,"default"))&&s.push(m)}}}const u=[o,s];return It(t)&&r.set(t,u),u}function Pf(t){return t[0]!=="$"}function Of(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function zf(t,e){return Of(t)===Of(e)}function Rf(t,e){return rt(e)?e.findIndex(n=>zf(n,t)):it(e)&&zf(e,t)?0:-1}const m2=t=>t[0]==="_"||t==="$stable",El=t=>rt(t)?t.map(Fe):[Fe(t)],p4=(t,e,n)=>{if(e._n)return e;const r=pe((...a)=>El(e(...a)),n);return r._c=!1,r},p2=(t,e,n)=>{const r=t._ctx;for(const a in t){if(m2(a))continue;const i=t[a];if(it(i))e[a]=p4(a,i,r);else if(i!=null){const o=El(i);e[a]=()=>o}}},h2=(t,e)=>{const n=El(e);t.slots.default=()=>n},h4=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=mt(e),Zi(e,"_",n)):p2(e,t.slots={})}else t.slots={},e&&h2(t,e);Zi(t.slots,Ho,1)},g4=(t,e,n)=>{const{vnode:r,slots:a}=t;let i=!0,o=Ot;if(r.shapeFlag&32){const s=e._;s?n&&s===1?i=!1:(Kt(a,e),!n&&s===1&&delete a._):(i=!e.$stable,p2(e,a)),o=e}else e&&(h2(t,e),o={default:1});if(i)for(const s in a)!m2(s)&&o[s]==null&&delete a[s]};function sc(t,e,n,r,a=!1){if(rt(t)){t.forEach((p,g)=>sc(p,e&&(rt(e)?e[g]:e),n,r,a));return}if(ma(r)&&!a)return;const i=r.shapeFlag&4?Pl(r.component)||r.component.proxy:r.el,o=a?null:i,{i:s,r:c}=t,u=e&&e.r,l=s.refs===Ot?s.refs={}:s.refs,m=s.setupState;if(u!=null&&u!==c&&(Ut(u)?(l[u]=null,lt(m,u)&&(m[u]=null)):le(u)&&(u.value=null)),it(c))zn(c,s,12,[o,l]);else{const p=Ut(c),g=le(c),S=t.f;if(p||g){const z=()=>{if(S){const T=p?lt(m,c)?m[c]:l[c]:c.value;a?rt(T)&&fl(T,i):rt(T)?T.includes(i)||T.push(i):p?(l[c]=[i],lt(m,c)&&(m[c]=l[c])):(c.value=[i],t.k&&(l[t.k]=c.value))}else p?(l[c]=o,lt(m,c)&&(m[c]=o)):g&&(c.value=o,t.k&&(l[t.k]=o))};a||S?z():(z.id=-1,ie(z,n))}}}const ie=D5;function v4(t){return b4(t)}function b4(t,e){const n=Cd();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:o,createText:s,createComment:c,setText:u,setElementText:l,parentNode:m,nextSibling:p,setScopeId:g=we,insertStaticContent:S}=t,z=(f,d,h,w=null,v=null,k=null,M=void 0,x=null,C=!!d.dynamicChildren)=>{if(f===d)return;f&&!ta(f,d)&&(w=b(f),wt(f,v,k,!0),f=null),d.patchFlag===-2&&(C=!1,d.dynamicChildren=null);const{type:_,ref:P,shapeFlag:F}=d;switch(_){case Fo:T(f,d,h,w);break;case Fr:y(f,d,h,w);break;case gs:f==null&&A(d,h,w,M);break;case ge:Zt(f,d,h,w,v,k,M,x,C);break;default:F&1?$(f,d,h,w,v,k,M,x,C):F&6?jt(f,d,h,w,v,k,M,x,C):(F&64||F&128)&&_.process(f,d,h,w,v,k,M,x,C,I)}P!=null&&v&&sc(P,f&&f.ref,k,d||f,!d)},T=(f,d,h,w)=>{if(f==null)r(d.el=s(d.children),h,w);else{const v=d.el=f.el;d.children!==f.children&&u(v,d.children)}},y=(f,d,h,w)=>{f==null?r(d.el=c(d.children||""),h,w):d.el=f.el},A=(f,d,h,w)=>{[f.el,f.anchor]=S(f.children,d,h,w,f.el,f.anchor)},O=({el:f,anchor:d},h,w)=>{let v;for(;f&&f!==d;)v=p(f),r(f,h,w),f=v;r(d,h,w)},j=({el:f,anchor:d})=>{let h;for(;f&&f!==d;)h=p(f),a(f),f=h;a(d)},$=(f,d,h,w,v,k,M,x,C)=>{d.type==="svg"?M="svg":d.type==="math"&&(M="mathml"),f==null?N(d,h,w,v,k,M,x,C):ut(f,d,v,k,M,x,C)},N=(f,d,h,w,v,k,M,x)=>{let C,_;const{props:P,shapeFlag:F,transition:L,dirs:H}=f;if(C=f.el=o(f.type,k,P&&P.is,P),F&8?l(C,f.children):F&16&&ft(f.children,C,null,w,v,hs(f,k),M,x),H&&Un(f,null,w,"created"),q(C,f,f.scopeId,M,w),P){for(const G in P)G!=="value"&&!Ii(G)&&i(C,G,null,P[G],k,f.children,w,v,st);"value"in P&&i(C,"value",null,P.value,k),(_=P.onVnodeBeforeMount)&&Ne(_,w,f)}H&&Un(f,null,w,"beforeMount");const B=y4(v,L);B&&L.beforeEnter(C),r(C,d,h),((_=P&&P.onVnodeMounted)||B||H)&&ie(()=>{_&&Ne(_,w,f),B&&L.enter(C),H&&Un(f,null,w,"mounted")},v)},q=(f,d,h,w,v)=>{if(h&&g(f,h),w)for(let k=0;k<w.length;k++)g(f,w[k]);if(v){let k=v.subTree;if(d===k){const M=v.vnode;q(f,M,M.scopeId,M.slotScopeIds,v.parent)}}},ft=(f,d,h,w,v,k,M,x,C=0)=>{for(let _=C;_<f.length;_++){const P=f[_]=x?kn(f[_]):Fe(f[_]);z(null,P,d,h,w,v,k,M,x)}},ut=(f,d,h,w,v,k,M)=>{const x=d.el=f.el;let{patchFlag:C,dynamicChildren:_,dirs:P}=d;C|=f.patchFlag&16;const F=f.props||Ot,L=d.props||Ot;let H;if(h&&Wn(h,!1),(H=L.onVnodeBeforeUpdate)&&Ne(H,h,d,f),P&&Un(d,f,h,"beforeUpdate"),h&&Wn(h,!0),_?_t(f.dynamicChildren,_,x,h,w,hs(d,v),k):M||et(f,d,x,null,h,w,hs(d,v),k,!1),C>0){if(C&16)Wt(x,d,F,L,h,w,v);else if(C&2&&F.class!==L.class&&i(x,"class",null,L.class,v),C&4&&i(x,"style",F.style,L.style,v),C&8){const B=d.dynamicProps;for(let G=0;G<B.length;G++){const J=B[G],ot=F[J],Rt=L[J];(Rt!==ot||J==="value")&&i(x,J,ot,Rt,v,f.children,h,w,st)}}C&1&&f.children!==d.children&&l(x,d.children)}else!M&&_==null&&Wt(x,d,F,L,h,w,v);((H=L.onVnodeUpdated)||P)&&ie(()=>{H&&Ne(H,h,d,f),P&&Un(d,f,h,"updated")},w)},_t=(f,d,h,w,v,k,M)=>{for(let x=0;x<d.length;x++){const C=f[x],_=d[x],P=C.el&&(C.type===ge||!ta(C,_)||C.shapeFlag&70)?m(C.el):h;z(C,_,P,null,w,v,k,M,!0)}},Wt=(f,d,h,w,v,k,M)=>{if(h!==w){if(h!==Ot)for(const x in h)!Ii(x)&&!(x in w)&&i(f,x,h[x],null,M,d.children,v,k,st);for(const x in w){if(Ii(x))continue;const C=w[x],_=h[x];C!==_&&x!=="value"&&i(f,x,_,C,M,d.children,v,k,st)}"value"in w&&i(f,"value",h.value,w.value,M)}},Zt=(f,d,h,w,v,k,M,x,C)=>{const _=d.el=f?f.el:s(""),P=d.anchor=f?f.anchor:s("");let{patchFlag:F,dynamicChildren:L,slotScopeIds:H}=d;H&&(x=x?x.concat(H):H),f==null?(r(_,h,w),r(P,h,w),ft(d.children||[],h,P,v,k,M,x,C)):F>0&&F&64&&L&&f.dynamicChildren?(_t(f.dynamicChildren,L,h,v,k,M,x),(d.key!=null||v&&d===v.subTree)&&g2(f,d,!0)):et(f,d,h,P,v,k,M,x,C)},jt=(f,d,h,w,v,k,M,x,C)=>{d.slotScopeIds=x,f==null?d.shapeFlag&512?v.ctx.activate(d,h,w,M,C):Ae(d,h,w,v,k,M,C):xt(f,d,C)},Ae=(f,d,h,w,v,k,M)=>{const x=f.component=P4(f,w,v);if(i2(f)&&(x.ctx.renderer=I),O4(x),x.asyncDep){if(v&&v.registerDep(x,tt),!f.el){const C=x.subTree=zt(Fr);y(null,C,d,h)}}else tt(x,f,d,h,v,k,M)},xt=(f,d,h)=>{const w=d.component=f.component;if(j5(f,d,h))if(w.asyncDep&&!w.asyncResolved){W(w,d,h);return}else w.next=d,z5(w.update),w.effect.dirty=!0,w.update();else d.el=f.el,w.vnode=d},tt=(f,d,h,w,v,k,M)=>{const x=()=>{if(f.isMounted){let{next:P,bu:F,u:L,parent:H,vnode:B}=f;{const de=v2(f);if(de){P&&(P.el=B.el,W(f,P,M)),de.asyncDep.then(()=>{f.isUnmounted||x()});return}}let G=P,J;Wn(f,!1),P?(P.el=B.el,W(f,P,M)):P=B,F&&fs(F),(J=P.props&&P.props.onVnodeBeforeUpdate)&&Ne(J,H,P,B),Wn(f,!0);const ot=ds(f),Rt=f.subTree;f.subTree=ot,z(Rt,ot,m(Rt.el),b(Rt),f,v,k),P.el=ot.el,G===null&&F5(f,ot.el),L&&ie(L,v),(J=P.props&&P.props.onVnodeUpdated)&&ie(()=>Ne(J,H,P,B),v)}else{let P;const{el:F,props:L}=d,{bm:H,m:B,parent:G}=f,J=ma(d);if(Wn(f,!1),H&&fs(H),!J&&(P=L&&L.onVnodeBeforeMount)&&Ne(P,G,d),Wn(f,!0),F&&Z){const ot=()=>{f.subTree=ds(f),Z(F,f.subTree,f,v,null)};J?d.type.__asyncLoader().then(()=>!f.isUnmounted&&ot()):ot()}else{const ot=f.subTree=ds(f);z(null,ot,h,w,f,v,k),d.el=ot.el}if(B&&ie(B,v),!J&&(P=L&&L.onVnodeMounted)){const ot=d;ie(()=>Ne(P,G,ot),v)}(d.shapeFlag&256||G&&ma(G.vnode)&&G.vnode.shapeFlag&256)&&f.a&&ie(f.a,v),f.isMounted=!0,d=h=w=null}},C=f.effect=new pl(x,we,()=>xl(_),f.scope),_=f.update=()=>{C.dirty&&C.run()};_.id=f.uid,Wn(f,!0),_()},W=(f,d,h)=>{d.component=f;const w=f.vnode.props;f.vnode=d,f.next=null,m4(f,d.props,w,h),g4(f,d.children,h),ur(),_f(f),dr()},et=(f,d,h,w,v,k,M,x,C=!1)=>{const _=f&&f.children,P=f?f.shapeFlag:0,F=d.children,{patchFlag:L,shapeFlag:H}=d;if(L>0){if(L&128){Dt(_,F,h,w,v,k,M,x,C);return}else if(L&256){Jt(_,F,h,w,v,k,M,x,C);return}}H&8?(P&16&&st(_,v,k),F!==_&&l(h,F)):P&16?H&16?Dt(_,F,h,w,v,k,M,x,C):st(_,v,k,!0):(P&8&&l(h,""),H&16&&ft(F,h,w,v,k,M,x,C))},Jt=(f,d,h,w,v,k,M,x,C)=>{f=f||Sr,d=d||Sr;const _=f.length,P=d.length,F=Math.min(_,P);let L;for(L=0;L<F;L++){const H=d[L]=C?kn(d[L]):Fe(d[L]);z(f[L],H,h,null,v,k,M,x,C)}_>P?st(f,v,k,!0,!1,F):ft(d,h,w,v,k,M,x,C,F)},Dt=(f,d,h,w,v,k,M,x,C)=>{let _=0;const P=d.length;let F=f.length-1,L=P-1;for(;_<=F&&_<=L;){const H=f[_],B=d[_]=C?kn(d[_]):Fe(d[_]);if(ta(H,B))z(H,B,h,null,v,k,M,x,C);else break;_++}for(;_<=F&&_<=L;){const H=f[F],B=d[L]=C?kn(d[L]):Fe(d[L]);if(ta(H,B))z(H,B,h,null,v,k,M,x,C);else break;F--,L--}if(_>F){if(_<=L){const H=L+1,B=H<P?d[H].el:w;for(;_<=L;)z(null,d[_]=C?kn(d[_]):Fe(d[_]),h,B,v,k,M,x,C),_++}}else if(_>L)for(;_<=F;)wt(f[_],v,k,!0),_++;else{const H=_,B=_,G=new Map;for(_=B;_<=L;_++){const At=d[_]=C?kn(d[_]):Fe(d[_]);At.key!=null&&G.set(At.key,_)}let J,ot=0;const Rt=L-B+1;let de=!1,qr=0;const _e=new Array(Rt);for(_=0;_<Rt;_++)_e[_]=0;for(_=H;_<=F;_++){const At=f[_];if(ot>=Rt){wt(At,v,k,!0);continue}let Ft;if(At.key!=null)Ft=G.get(At.key);else for(J=B;J<=L;J++)if(_e[J-B]===0&&ta(At,d[J])){Ft=J;break}Ft===void 0?wt(At,v,k,!0):(_e[Ft-B]=_+1,Ft>=qr?qr=Ft:de=!0,z(At,d[Ft],h,null,v,k,M,x,C),ot++)}const Xr=de?w4(_e):Sr;for(J=Xr.length-1,_=Rt-1;_>=0;_--){const At=B+_,Ft=d[At],Qr=At+1<P?d[At+1].el:w;_e[_]===0?z(null,Ft,h,Qr,v,k,M,x,C):de&&(J<0||_!==Xr[J]?Ht(Ft,h,Qr,2):J--)}}},Ht=(f,d,h,w,v=null)=>{const{el:k,type:M,transition:x,children:C,shapeFlag:_}=f;if(_&6){Ht(f.component.subTree,d,h,w);return}if(_&128){f.suspense.move(d,h,w);return}if(_&64){M.move(f,d,h,I);return}if(M===ge){r(k,d,h);for(let P=0;P<C.length;P++)Ht(C[P],d,h,w);r(f.anchor,d,h);return}if(M===gs){O(f,d,h);return}if(w!==2&&_&1&&x)if(w===0)x.beforeEnter(k),r(k,d,h),ie(()=>x.enter(k),v);else{const{leave:P,delayLeave:F,afterLeave:L}=x,H=()=>r(k,d,h),B=()=>{P(k,()=>{H(),L&&L()})};F?F(k,H,B):B()}else r(k,d,h)},wt=(f,d,h,w=!1,v=!1)=>{const{type:k,props:M,ref:x,children:C,dynamicChildren:_,shapeFlag:P,patchFlag:F,dirs:L}=f;if(x!=null&&sc(x,null,h,f,!0),P&256){d.ctx.deactivate(f);return}const H=P&1&&L,B=!ma(f);let G;if(B&&(G=M&&M.onVnodeBeforeUnmount)&&Ne(G,d,f),P&6)Ke(f.component,h,w);else{if(P&128){f.suspense.unmount(h,w);return}H&&Un(f,null,d,"beforeUnmount"),P&64?f.type.remove(f,d,h,v,I,w):_&&(k!==ge||F>0&&F&64)?st(_,d,h,!1,!0):(k===ge&&F&384||!v&&P&16)&&st(C,d,h),w&&fe(f)}(B&&(G=M&&M.onVnodeUnmounted)||H)&&ie(()=>{G&&Ne(G,d,f),H&&Un(f,null,d,"unmounted")},h)},fe=f=>{const{type:d,el:h,anchor:w,transition:v}=f;if(d===ge){ue(h,w);return}if(d===gs){j(f);return}const k=()=>{a(h),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(f.shapeFlag&1&&v&&!v.persisted){const{leave:M,delayLeave:x}=v,C=()=>M(h,k);x?x(f.el,k,C):C()}else k()},ue=(f,d)=>{let h;for(;f!==d;)h=p(f),a(f),f=h;a(d)},Ke=(f,d,h)=>{const{bum:w,scope:v,update:k,subTree:M,um:x}=f;w&&fs(w),v.stop(),k&&(k.active=!1,wt(M,f,d,h)),x&&ie(x,d),ie(()=>{f.isUnmounted=!0},d),d&&d.pendingBranch&&!d.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===d.pendingId&&(d.deps--,d.deps===0&&d.resolve())},st=(f,d,h,w=!1,v=!1,k=0)=>{for(let M=k;M<f.length;M++)wt(f[M],d,h,w,v)},b=f=>f.shapeFlag&6?b(f.component.subTree):f.shapeFlag&128?f.suspense.next():p(f.anchor||f.el);let R=!1;const E=(f,d,h)=>{f==null?d._vnode&&wt(d._vnode,null,null,!0):z(d._vnode||null,f,d,null,null,null,h),R||(R=!0,_f(),Zd(),R=!1),d._vnode=f},I={p:z,um:wt,m:Ht,r:fe,mt:Ae,mc:ft,pc:et,pbc:_t,n:b,o:t};let U,Z;return e&&([U,Z]=e(I)),{render:E,hydrate:U,createApp:u4(E,U)}}function hs({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Wn({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function y4(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function g2(t,e,n=!1){const r=t.children,a=e.children;if(rt(r)&&rt(a))for(let i=0;i<r.length;i++){const o=r[i];let s=a[i];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[i]=kn(a[i]),s.el=o.el),n||g2(o,s)),s.type===Fo&&(s.el=o.el)}}function w4(t){const e=t.slice(),n=[0];let r,a,i,o,s;const c=t.length;for(r=0;r<c;r++){const u=t[r];if(u!==0){if(a=n[n.length-1],t[a]<u){e[r]=a,n.push(r);continue}for(i=0,o=n.length-1;i<o;)s=i+o>>1,t[n[s]]<u?i=s+1:o=s;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function v2(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:v2(e)}const A4=t=>t.__isTeleport,ge=Symbol.for("v-fgt"),Fo=Symbol.for("v-txt"),Fr=Symbol.for("v-cmt"),gs=Symbol.for("v-stc"),ha=[];let Pe=null;function Ye(t=!1){ha.push(Pe=t?null:[])}function _4(){ha.pop(),Pe=ha[ha.length-1]||null}let Ta=1;function Tf(t){Ta+=t}function b2(t){return t.dynamicChildren=Ta>0?Pe||Sr:null,_4(),Ta>0&&Pe&&Pe.push(t),t}function un(t,e,n,r,a,i){return b2(Q(t,e,n,r,a,i,!0))}function x4(t,e,n,r,a){return b2(zt(t,e,n,r,a,!0))}function ro(t){return t?t.__v_isVNode===!0:!1}function ta(t,e){return t.type===e.type&&t.key===e.key}const Ho="__vInternal",y2=({key:t})=>t??null,Fi=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ut(t)||le(t)||it(t)?{i:re,r:t,k:e,f:!!n}:t:null);function Q(t,e=null,n=null,r=0,a=null,i=t===ge?0:1,o=!1,s=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&y2(e),ref:e&&Fi(e),scopeId:No,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:re};return s?(Ml(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Ut(n)?8:16),Ta>0&&!o&&Pe&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Pe.push(c),c}const zt=k4;function k4(t,e=null,n=null,r=0,a=null,i=!1){if((!t||t===H5)&&(t=Fr),ro(t)){const s=Hr(t,e,!0);return n&&Ml(s,n),Ta>0&&!i&&Pe&&(s.shapeFlag&6?Pe[Pe.indexOf(t)]=s:Pe.push(s)),s.patchFlag|=-2,s}if(L4(t)&&(t=t.__vccOpts),e){e=C4(e);let{class:s,style:c}=e;s&&!Ut(s)&&(e.class=ml(s)),It(c)&&(Vd(c)&&!rt(c)&&(c=Kt({},c)),e.style=dl(c))}const o=Ut(t)?1:B5(t)?128:A4(t)?64:It(t)?4:it(t)?2:0;return Q(t,e,n,r,a,o,i,!0)}function C4(t){return t?Vd(t)||Ho in t?Kt({},t):t:null}function Hr(t,e,n=!1){const{props:r,ref:a,patchFlag:i,children:o}=t,s=e?S4(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:s,key:s&&y2(s),ref:e&&e.ref?n&&a?rt(a)?a.concat(Fi(e)):[a,Fi(e)]:Fi(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ge?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Hr(t.ssContent),ssFallback:t.ssFallback&&Hr(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function pt(t=" ",e=0){return zt(Fo,null,t,e)}function Fe(t){return t==null||typeof t=="boolean"?zt(Fr):rt(t)?zt(ge,null,t.slice()):typeof t=="object"?kn(t):zt(Fo,null,String(t))}function kn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Hr(t)}function Ml(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(rt(e))n=16;else if(typeof e=="object")if(r&65){const a=e.default;a&&(a._c&&(a._d=!1),Ml(t,a()),a._c&&(a._d=!0));return}else{n=32;const a=e._;!a&&!(Ho in e)?e._ctx=re:a===3&&re&&(re.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else it(e)?(e={default:e,_ctx:re},n=32):(e=String(e),r&64?(n=16,e=[pt(e)]):n=8);t.children=e,t.shapeFlag|=n}function S4(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const a in r)if(a==="class")e.class!==r.class&&(e.class=ml([e.class,r.class]));else if(a==="style")e.style=dl([e.style,r.style]);else if(Mo(a)){const i=e[a],o=r[a];o&&i!==o&&!(rt(i)&&i.includes(o))&&(e[a]=i?[].concat(i,o):o)}else a!==""&&(e[a]=r[a])}return e}function Ne(t,e,n,r=null){Re(t,e,7,[n,r])}const E4=f2();let M4=0;function P4(t,e,n){const r=t.type,a=(e?e.appContext:t.appContext)||E4,i={uid:M4++,vnode:t,type:r,parent:e,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new Md(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:d2(r,a),emitsOptions:t2(r,a),emit:null,emitted:null,propsDefaults:Ot,inheritAttrs:r.inheritAttrs,ctx:Ot,data:Ot,props:Ot,attrs:Ot,slots:Ot,refs:Ot,setupState:Ot,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=I5.bind(null,i),t.ce&&t.ce(i),i}let Qt=null,ao,cc;{const t=Cd(),e=(n,r)=>{let a;return(a=t[n])||(a=t[n]=[]),a.push(r),i=>{a.length>1?a.forEach(o=>o(i)):a[0](i)}};ao=e("__VUE_INSTANCE_SETTERS__",n=>Qt=n),cc=e("__VUE_SSR_SETTERS__",n=>$o=n)}const Ua=t=>{const e=Qt;return ao(t),t.scope.on(),()=>{t.scope.off(),ao(e)}},If=()=>{Qt&&Qt.scope.off(),ao(null)};function w2(t){return t.vnode.shapeFlag&4}let $o=!1;function O4(t,e=!1){e&&cc(e);const{props:n,children:r}=t.vnode,a=w2(t);d4(t,n,a,e),h4(t,r);const i=a?z4(t,e):void 0;return e&&cc(!1),i}function z4(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=wl(new Proxy(t.ctx,a4));const{setup:r}=n;if(r){const a=t.setupContext=r.length>1?T4(t):null,i=Ua(t);ur();const o=zn(r,t,0,[t.props,a]);if(dr(),i(),_d(o)){if(o.then(If,If),e)return o.then(s=>{Lf(t,s,e)}).catch(s=>{Io(s,t,0)});t.asyncDep=o}else Lf(t,o,e)}else A2(t,e)}function Lf(t,e,n){it(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:It(e)&&(t.setupState=Gd(e)),A2(t,n)}let Nf;function A2(t,e,n){const r=t.type;if(!t.render){if(!e&&Nf&&!r.render){const a=r.template||Sl(t).template;if(a){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:s,compilerOptions:c}=r,u=Kt(Kt({isCustomElement:i,delimiters:s},o),c);r.render=Nf(a,u)}}t.render=r.render||we}{const a=Ua(t);ur();try{i4(t)}finally{dr(),a()}}}function R4(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return ce(t,"get","$attrs"),e[n]}}))}function T4(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return R4(t)},slots:t.slots,emit:t.emit,expose:e}}function Pl(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(Gd(wl(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in pa)return pa[n](t)},has(e,n){return n in e||n in pa}}))}function I4(t,e=!0){return it(t)?t.displayName||t.name:t.name||e&&t.__name}function L4(t){return it(t)&&"__vccOpts"in t}const Se=(t,e)=>C5(t,e,$o);function _2(t,e,n){const r=arguments.length;return r===2?It(e)&&!rt(e)?ro(e)?zt(t,null,[e]):zt(t,e):zt(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&ro(n)&&(n=[n]),zt(t,e,n))}const N4="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const j4="http://www.w3.org/2000/svg",F4="http://www.w3.org/1998/Math/MathML",Cn=typeof document<"u"?document:null,jf=Cn&&Cn.createElement("template"),H4={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const a=e==="svg"?Cn.createElementNS(j4,t):e==="mathml"?Cn.createElementNS(F4,t):Cn.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:t=>Cn.createTextNode(t),createComment:t=>Cn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Cn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,a,i){const o=n?n.previousSibling:e.lastChild;if(a&&(a===i||a.nextSibling))for(;e.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{jf.innerHTML=r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t;const s=jf.content;if(r==="svg"||r==="mathml"){const c=s.firstChild;for(;c.firstChild;)s.appendChild(c.firstChild);s.removeChild(c)}e.insertBefore(s,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},$4=Symbol("_vtc");function B4(t,e,n){const r=t[$4];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const D4=Symbol("_vod"),V4=Symbol("");function U4(t,e,n){const r=t.style,a=r.display,i=Ut(n);if(n&&!i){if(e&&!Ut(e))for(const o in e)n[o]==null&&lc(r,o,"");for(const o in n)lc(r,o,n[o])}else if(i){if(e!==n){const o=r[V4];o&&(n+=";"+o),r.cssText=n}}else e&&t.removeAttribute("style");D4 in t&&(r.display=a)}const Ff=/\s*!important$/;function lc(t,e,n){if(rt(n))n.forEach(r=>lc(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=W4(t,e);Ff.test(n)?t.setProperty(Kr(r),n.replace(Ff,""),"important"):t[r]=n}}const Hf=["Webkit","Moz","ms"],vs={};function W4(t,e){const n=vs[e];if(n)return n;let r=Ue(e);if(r!=="filter"&&r in t)return vs[e]=r;r=zo(r);for(let a=0;a<Hf.length;a++){const i=Hf[a]+r;if(i in t)return vs[e]=i}return e}const $f="http://www.w3.org/1999/xlink";function Y4(t,e,n,r,a){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS($f,e.slice(6,e.length)):t.setAttributeNS($f,e,n);else{const i=e5(e);n==null||i&&!Sd(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function K4(t,e,n,r,a,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,a,i),t[e]=n??"";return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){t._value=n;const u=s==="OPTION"?t.getAttribute("value"):t.value,l=n??"";u!==l&&(t.value=l),n==null&&t.removeAttribute(e);return}let c=!1;if(n===""||n==null){const u=typeof t[e];u==="boolean"?n=Sd(n):n==null&&u==="string"?(n="",c=!0):u==="number"&&(n=0,c=!0)}try{t[e]=n}catch{}c&&t.removeAttribute(e)}function G4(t,e,n,r){t.addEventListener(e,n,r)}function q4(t,e,n,r){t.removeEventListener(e,n,r)}const Bf=Symbol("_vei");function X4(t,e,n,r,a=null){const i=t[Bf]||(t[Bf]={}),o=i[e];if(r&&o)o.value=r;else{const[s,c]=Q4(e);if(r){const u=i[e]=tb(r,a);G4(t,s,u,c)}else o&&(q4(t,s,o,c),i[e]=void 0)}}const Df=/(?:Once|Passive|Capture)$/;function Q4(t){let e;if(Df.test(t)){e={};let n;for(;n=t.match(Df);)t=t.slice(0,t.length-n[0].length),e[n[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Kr(t.slice(2)),e]}let bs=0;const Z4=Promise.resolve(),J4=()=>bs||(Z4.then(()=>bs=0),bs=Date.now());function tb(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Re(eb(r,n.value),e,5,[r])};return n.value=t,n.attached=J4(),n}function eb(t,e){if(rt(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>a=>!a._stopped&&r&&r(a))}else return e}const Vf=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,nb=(t,e,n,r,a,i,o,s,c)=>{const u=a==="svg";e==="class"?B4(t,r,u):e==="style"?U4(t,n,r):Mo(e)?ll(e)||X4(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):rb(t,e,r,u))?K4(t,e,r,i,o,s,c):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Y4(t,e,r,u))};function rb(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Vf(e)&&it(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const a=t.tagName;if(a==="IMG"||a==="VIDEO"||a==="CANVAS"||a==="SOURCE")return!1}return Vf(e)&&Ut(n)?!1:e in t}const ab=Kt({patchProp:nb},H4);let Uf;function ib(){return Uf||(Uf=v4(ab))}const ob=(...t)=>{const e=ib().createApp(...t),{mount:n}=e;return e.mount=r=>{const a=cb(r);if(!a)return;const i=e._component;!it(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,sb(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},e};function sb(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function cb(t){return Ut(t)?document.querySelector(t):t}var lb=!1;/*!
* pinia v2.1.7
* (c) 2023 Eduardo San Martin Morote
* @license MIT
*/const fb=Symbol();var Wf;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Wf||(Wf={}));function ub(){const t=r5(!0),e=t.run(()=>Yd({}));let n=[],r=[];const a=wl({install(i){a._a=i,i.provide(fb,a),i.config.globalProperties.$pinia=a,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!lb?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return a}const db="/assets/montana-dsEKHcT6.jpg";/*!
* vue-router v4.2.5
* (c) 2023 Eduardo San Martin Morote
* @license MIT
*/const pr=typeof window<"u";function mb(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const gt=Object.assign;function ys(t,e){const n={};for(const r in e){const a=e[r];n[r]=Ie(a)?a.map(t):t(a)}return n}const ga=()=>{},Ie=Array.isArray,pb=/\/$/,hb=t=>t.replace(pb,"");function ws(t,e,n="/"){let r,a={},i="",o="";const s=e.indexOf("#");let c=e.indexOf("?");return s<c&&s>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,s>-1?s:e.length),a=t(i)),s>-1&&(r=r||e.slice(0,s),o=e.slice(s,e.length)),r=yb(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:a,hash:o}}function gb(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Yf(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function vb(t,e,n){const r=e.matched.length-1,a=n.matched.length-1;return r>-1&&r===a&&$r(e.matched[r],n.matched[a])&&x2(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function $r(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function x2(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!bb(t[n],e[n]))return!1;return!0}function bb(t,e){return Ie(t)?Kf(t,e):Ie(e)?Kf(e,t):t===e}function Kf(t,e){return Ie(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function yb(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),a=r[r.length-1];(a===".."||a===".")&&r.push("");let i=n.length-1,o,s;for(o=0;o<r.length;o++)if(s=r[o],s!==".")if(s==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var Ia;(function(t){t.pop="pop",t.push="push"})(Ia||(Ia={}));var va;(function(t){t.back="back",t.forward="forward",t.unknown=""})(va||(va={}));function wb(t){if(!t)if(pr){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),hb(t)}const Ab=/^[^#]+#/;function _b(t,e){return t.replace(Ab,"#")+e}function xb(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const Bo=()=>({left:window.pageXOffset,top:window.pageYOffset});function kb(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),a=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!a)return;e=xb(a,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function Gf(t,e){return(history.state?history.state.position-e:-1)+t}const fc=new Map;function Cb(t,e){fc.set(t,e)}function Sb(t){const e=fc.get(t);return fc.delete(t),e}let Eb=()=>location.protocol+"//"+location.host;function k2(t,e){const{pathname:n,search:r,hash:a}=e,i=t.indexOf("#");if(i>-1){let o=a.includes(t.slice(i))?t.slice(i).length:1,s=a.slice(o);return s[0]!=="/"&&(s="/"+s),Yf(s,"")}return Yf(n,t)+r+a}function Mb(t,e,n,r){let a=[],i=[],o=null;const s=({state:p})=>{const g=k2(t,location),S=n.value,z=e.value;let T=0;if(p){if(n.value=g,e.value=p,o&&o===S){o=null;return}T=z?p.position-z.position:0}else r(g);a.forEach(y=>{y(n.value,S,{delta:T,type:Ia.pop,direction:T?T>0?va.forward:va.back:va.unknown})})};function c(){o=n.value}function u(p){a.push(p);const g=()=>{const S=a.indexOf(p);S>-1&&a.splice(S,1)};return i.push(g),g}function l(){const{history:p}=window;p.state&&p.replaceState(gt({},p.state,{scroll:Bo()}),"")}function m(){for(const p of i)p();i=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",l)}return window.addEventListener("popstate",s),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:c,listen:u,destroy:m}}function qf(t,e,n,r=!1,a=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:a?Bo():null}}function Pb(t){const{history:e,location:n}=window,r={value:k2(t,n)},a={value:e.state};a.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,l){const m=t.indexOf("#"),p=m>-1?(n.host&&document.querySelector("base")?t:t.slice(m))+c:Eb()+t+c;try{e[l?"replaceState":"pushState"](u,"",p),a.value=u}catch(g){console.error(g),n[l?"replace":"assign"](p)}}function o(c,u){const l=gt({},e.state,qf(a.value.back,c,a.value.forward,!0),u,{position:a.value.position});i(c,l,!0),r.value=c}function s(c,u){const l=gt({},a.value,e.state,{forward:c,scroll:Bo()});i(l.current,l,!0);const m=gt({},qf(r.value,c,null),{position:l.position+1},u);i(c,m,!1),r.value=c}return{location:r,state:a,push:s,replace:o}}function Ob(t){t=wb(t);const e=Pb(t),n=Mb(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const a=gt({location:"",base:t,go:r,createHref:_b.bind(null,t)},e,n);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>e.state.value}),a}function zb(t){return typeof t=="string"||t&&typeof t=="object"}function C2(t){return typeof t=="string"||typeof t=="symbol"}const vn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},S2=Symbol("");var Xf;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Xf||(Xf={}));function Br(t,e){return gt(new Error,{type:t,[S2]:!0},e)}function qe(t,e){return t instanceof Error&&S2 in t&&(e==null||!!(t.type&e))}const Qf="[^/]+?",Rb={sensitive:!1,strict:!1,start:!0,end:!0},Tb=/[.+*?^${}()[\]/\\]/g;function Ib(t,e){const n=gt({},Rb,e),r=[];let a=n.start?"^":"";const i=[];for(const u of t){const l=u.length?[]:[90];n.strict&&!u.length&&(a+="/");for(let m=0;m<u.length;m++){const p=u[m];let g=40+(n.sensitive?.25:0);if(p.type===0)m||(a+="/"),a+=p.value.replace(Tb,"\\$&"),g+=40;else if(p.type===1){const{value:S,repeatable:z,optional:T,regexp:y}=p;i.push({name:S,repeatable:z,optional:T});const A=y||Qf;if(A!==Qf){g+=10;try{new RegExp(`(${A})`)}catch(j){throw new Error(`Invalid custom RegExp for param "${S}" (${A}): `+j.message)}}let O=z?`((?:${A})(?:/(?:${A}))*)`:`(${A})`;m||(O=T&&u.length<2?`(?:/${O})`:"/"+O),T&&(O+="?"),a+=O,g+=20,T&&(g+=-8),z&&(g+=-20),A===".*"&&(g+=-50)}l.push(g)}r.push(l)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=.7000000000000001}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const o=new RegExp(a,n.sensitive?"":"i");function s(u){const l=u.match(o),m={};if(!l)return null;for(let p=1;p<l.length;p++){const g=l[p]||"",S=i[p-1];m[S.name]=g&&S.repeatable?g.split("/"):g}return m}function c(u){let l="",m=!1;for(const p of t){(!m||!l.endsWith("/"))&&(l+="/"),m=!1;for(const g of p)if(g.type===0)l+=g.value;else if(g.type===1){const{value:S,repeatable:z,optional:T}=g,y=S in u?u[S]:"";if(Ie(y)&&!z)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const A=Ie(y)?y.join("/"):y;if(!A)if(T)p.length<2&&(l.endsWith("/")?l=l.slice(0,-1):m=!0);else throw new Error(`Missing required param "${S}"`);l+=A}}return l||"/"}return{re:o,score:r,keys:i,parse:s,stringify:c}}function Lb(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Nb(t,e){let n=0;const r=t.score,a=e.score;for(;n<r.length&&n<a.length;){const i=Lb(r[n],a[n]);if(i)return i;n++}if(Math.abs(a.length-r.length)===1){if(Zf(r))return 1;if(Zf(a))return-1}return a.length-r.length}function Zf(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const jb={type:0,value:""},Fb=/[a-zA-Z0-9_]/;function Hb(t){if(!t)return[[]];if(t==="/")return[[jb]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${u}": ${g}`)}let n=0,r=n;const a=[];let i;function o(){i&&a.push(i),i=[]}let s=0,c,u="",l="";function m(){u&&(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:l,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=c}for(;s<t.length;){if(c=t[s++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(u&&m(),o()):c===":"?(m(),n=1):p();break;case 4:p(),n=r;break;case 1:c==="("?n=2:Fb.test(c)?p():(m(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&s--);break;case 2:c===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+c:n=3:l+=c;break;case 3:m(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&s--,l="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${u}"`),m(),o(),a}function $b(t,e,n){const r=Ib(Hb(t.path),n),a=gt(r,{record:t,parent:e,children:[],alias:[]});return e&&!a.record.aliasOf==!e.record.aliasOf&&e.children.push(a),a}function Bb(t,e){const n=[],r=new Map;e=eu({strict:!1,end:!0,sensitive:!1},e);function a(l){return r.get(l)}function i(l,m,p){const g=!p,S=Db(l);S.aliasOf=p&&p.record;const z=eu(e,l),T=[S];if("alias"in l){const O=typeof l.alias=="string"?[l.alias]:l.alias;for(const j of O)T.push(gt({},S,{components:p?p.record.components:S.components,path:j,aliasOf:p?p.record:S}))}let y,A;for(const O of T){const{path:j}=O;if(m&&j[0]!=="/"){const $=m.record.path,N=$[$.length-1]==="/"?"":"/";O.path=m.record.path+(j&&N+j)}if(y=$b(O,m,z),p?p.alias.push(y):(A=A||y,A!==y&&A.alias.push(y),g&&l.name&&!tu(y)&&o(l.name)),S.children){const $=S.children;for(let N=0;N<$.length;N++)i($[N],y,p&&p.children[N])}p=p||y,(y.record.components&&Object.keys(y.record.components).length||y.record.name||y.record.redirect)&&c(y)}return A?()=>{o(A)}:ga}function o(l){if(C2(l)){const m=r.get(l);m&&(r.delete(l),n.splice(n.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=n.indexOf(l);m>-1&&(n.splice(m,1),l.record.name&&r.delete(l.record.name),l.children.forEach(o),l.alias.forEach(o))}}function s(){return n}function c(l){let m=0;for(;m<n.length&&Nb(l,n[m])>=0&&(l.record.path!==n[m].record.path||!E2(l,n[m]));)m++;n.splice(m,0,l),l.record.name&&!tu(l)&&r.set(l.record.name,l)}function u(l,m){let p,g={},S,z;if("name"in l&&l.name){if(p=r.get(l.name),!p)throw Br(1,{location:l});z=p.record.name,g=gt(Jf(m.params,p.keys.filter(A=>!A.optional).map(A=>A.name)),l.params&&Jf(l.params,p.keys.map(A=>A.name))),S=p.stringify(g)}else if("path"in l)S=l.path,p=n.find(A=>A.re.test(S)),p&&(g=p.parse(S),z=p.record.name);else{if(p=m.name?r.get(m.name):n.find(A=>A.re.test(m.path)),!p)throw Br(1,{location:l,currentLocation:m});z=p.record.name,g=gt({},m.params,l.params),S=p.stringify(g)}const T=[];let y=p;for(;y;)T.unshift(y.record),y=y.parent;return{name:z,path:S,params:g,matched:T,meta:Ub(T)}}return t.forEach(l=>i(l)),{addRoute:i,resolve:u,removeRoute:o,getRoutes:s,getRecordMatcher:a}}function Jf(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Db(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:Vb(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function Vb(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function tu(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Ub(t){return t.reduce((e,n)=>gt(e,n.meta),{})}function eu(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function E2(t,e){return e.children.some(n=>n===t||E2(t,n))}const M2=/#/g,Wb=/&/g,Yb=/\//g,Kb=/=/g,Gb=/\?/g,P2=/\+/g,qb=/%5B/g,Xb=/%5D/g,O2=/%5E/g,Qb=/%60/g,z2=/%7B/g,Zb=/%7C/g,R2=/%7D/g,Jb=/%20/g;function Ol(t){return encodeURI(""+t).replace(Zb,"|").replace(qb,"[").replace(Xb,"]")}function ty(t){return Ol(t).replace(z2,"{").replace(R2,"}").replace(O2,"^")}function uc(t){return Ol(t).replace(P2,"%2B").replace(Jb,"+").replace(M2,"%23").replace(Wb,"%26").replace(Qb,"`").replace(z2,"{").replace(R2,"}").replace(O2,"^")}function ey(t){return uc(t).replace(Kb,"%3D")}function ny(t){return Ol(t).replace(M2,"%23").replace(Gb,"%3F")}function ry(t){return t==null?"":ny(t).replace(Yb,"%2F")}function io(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function ay(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const a=n[r].replace(P2," "),i=a.indexOf("="),o=io(i<0?a:a.slice(0,i)),s=i<0?null:io(a.slice(i+1));if(o in e){let c=e[o];Ie(c)||(c=e[o]=[c]),c.push(s)}else e[o]=s}return e}function nu(t){let e="";for(let n in t){const r=t[n];if(n=ey(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(Ie(r)?r.map(a=>a&&uc(a)):[r&&uc(r)]).forEach(a=>{a!==void 0&&(e+=(e.length?"&":"")+n,a!=null&&(e+="="+a))})}return e}function iy(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=Ie(r)?r.map(a=>a==null?null:""+a):r==null?r:""+r)}return e}const oy=Symbol(""),ru=Symbol(""),zl=Symbol(""),T2=Symbol(""),dc=Symbol("");function ea(){let t=[];function e(r){return t.push(r),()=>{const a=t.indexOf(r);a>-1&&t.splice(a,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Sn(t,e,n,r,a){const i=r&&(r.enterCallbacks[a]=r.enterCallbacks[a]||[]);return()=>new Promise((o,s)=>{const c=m=>{m===!1?s(Br(4,{from:n,to:e})):m instanceof Error?s(m):zb(m)?s(Br(2,{from:e,to:m})):(i&&r.enterCallbacks[a]===i&&typeof m=="function"&&i.push(m),o())},u=t.call(r&&r.instances[a],e,n,c);let l=Promise.resolve(u);t.length<3&&(l=l.then(c)),l.catch(m=>s(m))})}function As(t,e,n,r){const a=[];for(const i of t)for(const o in i.components){let s=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(sy(s)){const c=(s.__vccOpts||s)[e];c&&a.push(Sn(c,n,r,i,o))}else{let c=s();a.push(()=>c.then(u=>{if(!u)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const l=mb(u)?u.default:u;i.components[o]=l;const m=(l.__vccOpts||l)[e];return m&&Sn(m,n,r,i,o)()}))}}return a}function sy(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function au(t){const e=Je(zl),n=Je(T2),r=Se(()=>e.resolve(ar(t.to))),a=Se(()=>{const{matched:c}=r.value,{length:u}=c,l=c[u-1],m=n.matched;if(!l||!m.length)return-1;const p=m.findIndex($r.bind(null,l));if(p>-1)return p;const g=iu(c[u-2]);return u>1&&iu(l)===g&&m[m.length-1].path!==g?m.findIndex($r.bind(null,c[u-2])):p}),i=Se(()=>a.value>-1&&uy(n.params,r.value.params)),o=Se(()=>a.value>-1&&a.value===n.matched.length-1&&x2(n.params,r.value.params));function s(c={}){return fy(c)?e[ar(t.replace)?"replace":"push"](ar(t.to)).catch(ga):Promise.resolve()}return{route:r,href:Se(()=>r.value.href),isActive:i,isExactActive:o,navigate:s}}const cy=a2({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:au,setup(t,{slots:e}){const n=To(au(t)),{options:r}=Je(zl),a=Se(()=>({[ou(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[ou(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:_2("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},i)}}}),ly=cy;function fy(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function uy(t,e){for(const n in e){const r=e[n],a=t[n];if(typeof r=="string"){if(r!==a)return!1}else if(!Ie(a)||a.length!==r.length||r.some((i,o)=>i!==a[o]))return!1}return!0}function iu(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const ou=(t,e,n)=>t??e??n,dy=a2({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Je(dc),a=Se(()=>t.route||r.value),i=Je(ru,0),o=Se(()=>{let u=ar(i);const{matched:l}=a.value;let m;for(;(m=l[u])&&!m.components;)u++;return u}),s=Se(()=>a.value.matched[o.value]);ji(ru,Se(()=>o.value+1)),ji(oy,s),ji(dc,a);const c=Yd();return Ni(()=>[c.value,s.value,t.name],([u,l,m],[p,g,S])=>{l&&(l.instances[m]=u,g&&g!==l&&u&&u===p&&(l.leaveGuards.size||(l.leaveGuards=g.leaveGuards),l.updateGuards.size||(l.updateGuards=g.updateGuards))),u&&l&&(!g||!$r(l,g)||!p)&&(l.enterCallbacks[m]||[]).forEach(z=>z(u))},{flush:"post"}),()=>{const u=a.value,l=t.name,m=s.value,p=m&&m.components[l];if(!p)return su(n.default,{Component:p,route:u});const g=m.props[l],S=g?g===!0?u.params:typeof g=="function"?g(u):g:null,z=_2(p,gt({},S,e,{onVnodeUnmounted:T=>{T.component.isUnmounted&&(m.instances[l]=null)},ref:c}));return su(n.default,{Component:z,route:u})||z}}});function su(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const I2=dy;function my(t){const e=Bb(t.routes,t),n=t.parseQuery||ay,r=t.stringifyQuery||nu,a=t.history,i=ea(),o=ea(),s=ea(),c=S5(vn);let u=vn;pr&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=ys.bind(null,b=>""+b),m=ys.bind(null,ry),p=ys.bind(null,io);function g(b,R){let E,I;return C2(b)?(E=e.getRecordMatcher(b),I=R):I=b,e.addRoute(I,E)}function S(b){const R=e.getRecordMatcher(b);R&&e.removeRoute(R)}function z(){return e.getRoutes().map(b=>b.record)}function T(b){return!!e.getRecordMatcher(b)}function y(b,R){if(R=gt({},R||c.value),typeof b=="string"){const d=ws(n,b,R.path),h=e.resolve({path:d.path},R),w=a.createHref(d.fullPath);return gt(d,h,{params:p(h.params),hash:io(d.hash),redirectedFrom:void 0,href:w})}let E;if("path"in b)E=gt({},b,{path:ws(n,b.path,R.path).path});else{const d=gt({},b.params);for(const h in d)d[h]==null&&delete d[h];E=gt({},b,{params:m(d)}),R.params=m(R.params)}const I=e.resolve(E,R),U=b.hash||"";I.params=l(p(I.params));const Z=gb(r,gt({},b,{hash:ty(U),path:I.path})),f=a.createHref(Z);return gt({fullPath:Z,hash:U,query:r===nu?iy(b.query):b.query||{}},I,{redirectedFrom:void 0,href:f})}function A(b){return typeof b=="string"?ws(n,b,c.value.path):gt({},b)}function O(b,R){if(u!==b)return Br(8,{from:R,to:b})}function j(b){return q(b)}function $(b){return j(gt(A(b),{replace:!0}))}function N(b){const R=b.matched[b.matched.length-1];if(R&&R.redirect){const{redirect:E}=R;let I=typeof E=="function"?E(b):E;return typeof I=="string"&&(I=I.includes("?")||I.includes("#")?I=A(I):{path:I},I.params={}),gt({query:b.query,hash:b.hash,params:"path"in I?{}:b.params},I)}}function q(b,R){const E=u=y(b),I=c.value,U=b.state,Z=b.force,f=b.replace===!0,d=N(E);if(d)return q(gt(A(d),{state:typeof d=="object"?gt({},U,d.state):U,force:Z,replace:f}),R||E);const h=E;h.redirectedFrom=R;let w;return!Z&&vb(r,I,E)&&(w=Br(16,{to:h,from:I}),Ht(I,I,!0,!1)),(w?Promise.resolve(w):_t(h,I)).catch(v=>qe(v)?qe(v,2)?v:Dt(v):et(v,h,I)).then(v=>{if(v){if(qe(v,2))return q(gt({replace:f},A(v.to),{state:typeof v.to=="object"?gt({},U,v.to.state):U,force:Z}),R||h)}else v=Zt(h,I,!0,f,U);return Wt(h,I,v),v})}function ft(b,R){const E=O(b,R);return E?Promise.reject(E):Promise.resolve()}function ut(b){const R=ue.values().next().value;return R&&typeof R.runWithContext=="function"?R.runWithContext(b):b()}function _t(b,R){let E;const[I,U,Z]=py(b,R);E=As(I.reverse(),"beforeRouteLeave",b,R);for(const d of I)d.leaveGuards.forEach(h=>{E.push(Sn(h,b,R))});const f=ft.bind(null,b,R);return E.push(f),st(E).then(()=>{E=[];for(const d of i.list())E.push(Sn(d,b,R));return E.push(f),st(E)}).then(()=>{E=As(U,"beforeRouteUpdate",b,R);for(const d of U)d.updateGuards.forEach(h=>{E.push(Sn(h,b,R))});return E.push(f),st(E)}).then(()=>{E=[];for(const d of Z)if(d.beforeEnter)if(Ie(d.beforeEnter))for(const h of d.beforeEnter)E.push(Sn(h,b,R));else E.push(Sn(d.beforeEnter,b,R));return E.push(f),st(E)}).then(()=>(b.matched.forEach(d=>d.enterCallbacks={}),E=As(Z,"beforeRouteEnter",b,R),E.push(f),st(E))).then(()=>{E=[];for(const d of o.list())E.push(Sn(d,b,R));return E.push(f),st(E)}).catch(d=>qe(d,8)?d:Promise.reject(d))}function Wt(b,R,E){s.list().forEach(I=>ut(()=>I(b,R,E)))}function Zt(b,R,E,I,U){const Z=O(b,R);if(Z)return Z;const f=R===vn,d=pr?history.state:{};E&&(I||f?a.replace(b.fullPath,gt({scroll:f&&d&&d.scroll},U)):a.push(b.fullPath,U)),c.value=b,Ht(b,R,E,f),Dt()}let jt;function Ae(){jt||(jt=a.listen((b,R,E)=>{if(!Ke.listening)return;const I=y(b),U=N(I);if(U){q(gt(U,{replace:!0}),I).catch(ga);return}u=I;const Z=c.value;pr&&Cb(Gf(Z.fullPath,E.delta),Bo()),_t(I,Z).catch(f=>qe(f,12)?f:qe(f,2)?(q(f.to,I).then(d=>{qe(d,20)&&!E.delta&&E.type===Ia.pop&&a.go(-1,!1)}).catch(ga),Promise.reject()):(E.delta&&a.go(-E.delta,!1),et(f,I,Z))).then(f=>{f=f||Zt(I,Z,!1),f&&(E.delta&&!qe(f,8)?a.go(-E.delta,!1):E.type===Ia.pop&&qe(f,20)&&a.go(-1,!1)),Wt(I,Z,f)}).catch(ga)}))}let xt=ea(),tt=ea(),W;function et(b,R,E){Dt(b);const I=tt.list();return I.length?I.forEach(U=>U(b,R,E)):console.error(b),Promise.reject(b)}function Jt(){return W&&c.value!==vn?Promise.resolve():new Promise((b,R)=>{xt.add([b,R])})}function Dt(b){return W||(W=!b,Ae(),xt.list().forEach(([R,E])=>b?E(b):R()),xt.reset()),b}function Ht(b,R,E,I){const{scrollBehavior:U}=t;if(!pr||!U)return Promise.resolve();const Z=!E&&Sb(Gf(b.fullPath,0))||(I||!E)&&history.state&&history.state.scroll||null;return Xd().then(()=>U(b,R,Z)).then(f=>f&&kb(f)).catch(f=>et(f,b,R))}const wt=b=>a.go(b);let fe;const ue=new Set,Ke={currentRoute:c,listening:!0,addRoute:g,removeRoute:S,hasRoute:T,getRoutes:z,resolve:y,options:t,push:j,replace:$,go:wt,back:()=>wt(-1),forward:()=>wt(1),beforeEach:i.add,beforeResolve:o.add,afterEach:s.add,onError:tt.add,isReady:Jt,install(b){const R=this;b.component("RouterLink",ly),b.component("RouterView",I2),b.config.globalProperties.$router=R,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>ar(c)}),pr&&!fe&&c.value===vn&&(fe=!0,j(a.location).catch(U=>{}));const E={};for(const U in vn)Object.defineProperty(E,U,{get:()=>c.value[U],enumerable:!0});b.provide(zl,R),b.provide(T2,Bd(E)),b.provide(dc,c);const I=b.unmount;ue.add(b),b.unmount=function(){ue.delete(b),ue.size<1&&(u=vn,jt&&jt(),jt=null,c.value=vn,fe=!1,W=!1),I()}}};function st(b){return b.reduce((R,E)=>R.then(()=>ut(E)),Promise.resolve())}return Ke}function py(t,e){const n=[],r=[],a=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const s=e.matched[o];s&&(t.matched.find(u=>$r(u,s))?r.push(s):n.push(s));const c=t.matched[o];c&&(e.matched.find(u=>$r(u,c))||a.push(c))}return[n,r,a]}const Bn=(t,e)=>{const n=t.__vccOpts||t;for(const[r,a]of e)n[r]=a;return n},Rl=t=>(kl("data-v-2c780179"),t=t(),Cl(),t),hy={class:"greetings"},gy=Rl(()=>Q("span",{class:"title"},"PhD Research Scientist",-1)),vy=Rl(()=>Q("br",null,null,-1)),by=Rl(()=>Q("span",{class:"subtitle"},[pt("Department of Linguistics,"),Q("br"),pt("The Ohio State University")],-1)),yy={__name:"HelloWorld",props:{msg:{type:String,required:!0}},setup(t){return(e,n)=>(Ye(),un("div",hy,[Q("h1",null,n5(t.msg),1),gy,vy,by]))}},wy=Bn(yy,[["__scopeId","data-v-2c780179"]]),Ay=t=>(kl("data-v-06192204"),t=t(),Cl(),t),_y=Ay(()=>Q("img",{alt:"Colors",class:"logo",src:db},null,-1)),xy={class:"wrapper"},ky={__name:"App",setup(t){return(e,n)=>(Ye(),un(ge,null,[Q("header",null,[_y,Q("div",xy,[zt(wy,{msg:"Sara Court"})])]),zt(ar(I2))],64))}},Cy=Bn(ky,[["__scopeId","data-v-06192204"]]),Sy="modulepreload",Ey=function(t){return"/"+t},cu={},gi=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){const a=document.getElementsByTagName("link");r=Promise.all(e.map(i=>{if(i=Ey(i),i in cu)return;cu[i]=!0;const o=i.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(n)for(let u=a.length-1;u>=0;u--){const l=a[u];if(l.href===i&&(!o||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":Sy,o||(c.as="script",c.crossOrigin=""),c.href=i,document.head.appendChild(c),o)return new Promise((u,l)=>{c.addEventListener("load",u),c.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${i}`)))})}))}return r.then(()=>t()).catch(a=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a})},My="data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8BMzMzRzMzM1czMzNVMzMzVTMzM1UzMzNVMzMzVTMzM1H///8B////Af///wH///8B////Af///wH///8BMzMzSQwMjGcAAKn5AACp/wAAqf8AAKn/AACp/wAAqf0HB5hrMzMzUf///wH///8B////Af///wH///8BMzMzSQsLkF8AAKr5AACq/wAAqv8AAKr/AACq/wAAqv8AAKr/AACq/QkJll8zMzNP////Af///wH///8B////ATMzM00AAKv5AACr/wAAq/8AAKvFAACrqwAAq6sAAKvDAACr/wAAq/8AAKv5MzMzTf///wH///8B////Af///wEzMzNLAACt/wAArf8AAK3dAACtCf///wH///8BAACtCQAArd8AAK3/AACt/zMzM0v///8B////Af///wH///8BMzMzSwAArv8AAK7/AACuif///wH///8B////Af///wEAAK6JAACu/wAArv8zMzNL////Af///wH///8B////ATMzM0sAALD/AACw/wAAsIf///8B////Af///wH///8BAACwhwAAsP8AALD/MzMzS////wH///8B////Af///wEzMzNLAACy/wAAsf8AALGH////Af///wH///8B////AQAAsYcAALL/AACy/zMzM0v///8B////Af///wH///8BMzMzSwAAs/8AALP/AACzh////wH///8B////Af///wEAALOHAACz/wAAs/8zMzNL////Af///wH///8B////ATMzM0sAALX/AAC1/wAAtYf///8B////Af///wH///8BAAC1hwAAtf8AALX/MzMzS////wH///8B////Af///wEzMzNLAAC2/wAAtv8AALaJ////Af///wH///8B////AQAAtosAALb/AAC2/zMzM0v///8B////Af///wH///8BMzMzSwAAuP8AALj/AAC44QAAuAn///8B////AQAAuAkAALjjAAC4/wAAuP8zMzNL////Af///wH///8B////ATMzM00AALnxAAC5/wAAuf8AALm5AAC5mQAAuZkAALm3AAC5/wAAuf8AALnzMzMzTf///wH///8B////Af///wEzMzNHDw+RSQAAuukAALr/AAC6/wAAuv8AALr/AAC6/wAAuv8AALrpDQ2YRTMzM0n///8B////Af///wH///8B////ATMzM0cVFYM9AAC73wAAu/8AALv/AAC7/wAAu/8AALvfDg6XMTMzM1H///8B////Af///wH///8B////Af///wH///8BMzMzRzMzM1czMzNVMzMzVTMzM1UzMzNVMzMzVTMzM1f///8B////Af///wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==",Py="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%3e%3cpath%20fill='%230A66C2'%20d='M12.225%2012.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926%200-1.068.724-1.068%201.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95%201.684-.925%201.802%200%202.135%201.185%202.135%202.728l-.001%203.14zM4.67%205.715a1.037%201.037%200%2001-1.032-1.031c0-.566.466-1.032%201.032-1.032.566%200%201.031.466%201.032%201.032%200%20.566-.466%201.032-1.032%201.032zm.889%206.51h-1.78V6.498h1.78v5.727zM13.11%202H2.885A.88.88%200%20002%202.866v10.268a.88.88%200%2000.885.866h10.226a.882.882%200%2000.889-.866V2.865a.88.88%200%2000-.889-.864z'/%3e%3c/svg%3e",Oy="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.35003%2016.88C9.35003%2016.95%209.28003%2017%209.18003%2017C9.08003%2017%209.00003%2017%209.00003%2016.88C9.00003%2016.76%209.08003%2016.76%209.17003%2016.76C9.26003%2016.76%209.35003%2016.81%209.35003%2016.88ZM8.35003%2016.73C8.35003%2016.8%208.35003%2016.88%208.49003%2016.9C8.52584%2016.9172%208.56701%2016.9195%208.6045%2016.9064C8.642%2016.8933%208.67275%2016.8658%208.69003%2016.83C8.69003%2016.76%208.69003%2016.69%208.55003%2016.66C8.41003%2016.63%208.37003%2016.66%208.35003%2016.73ZM9.77003%2016.68C9.68003%2016.68%209.62003%2016.76%209.63003%2016.84C9.64003%2016.92%209.72003%2016.95%209.82003%2016.93C9.92003%2016.91%209.97003%2016.84%209.96003%2016.77C9.95003%2016.7%209.87003%2016.67%209.77003%2016.68ZM11.9%204.00002C10.8454%203.99009%209.79962%204.19333%208.82547%204.59754C7.85132%205.00175%206.96887%205.5986%206.23107%206.35227C5.49328%207.10594%204.91535%208.0009%204.53197%208.98343C4.14859%209.96597%203.96765%2011.0158%204.00003%2012.07C3.97211%2013.7969%204.48426%2015.4894%205.46493%2016.9111C6.4456%2018.3328%207.84582%2019.4127%209.47003%2020C9.88003%2020.07%2010.03%2019.81%2010.03%2019.6C10.03%2019.39%2010.03%2018.26%2010.03%2017.6C10.03%2017.6%207.77003%2018.1%207.29003%2016.6C7.29003%2016.6%206.93003%2015.6%206.40003%2015.39C6.40003%2015.39%205.66003%2014.87%206.45003%2014.88C6.70877%2014.9149%206.95573%2015.01%207.17108%2015.1576C7.38643%2015.3052%207.56417%2015.5013%207.69003%2015.73C7.79466%2015.9351%207.9401%2016.1167%208.11742%2016.2635C8.29473%2016.4104%208.50019%2016.5195%208.72118%2016.5841C8.94218%2016.6487%209.17404%2016.6675%209.40255%2016.6393C9.63106%2016.6111%209.85139%2016.5364%2010.05%2016.42C10.0879%2016.0025%2010.2679%2015.6107%2010.56%2015.31C8.76003%2015.1%206.94003%2014.84%206.94003%2011.65C6.92091%2011.2896%206.97881%2010.9293%207.10985%2010.5931C7.2409%2010.2569%207.44209%209.95241%207.70003%209.70002C7.45667%208.96799%207.48507%208.17282%207.78003%207.46002C8.46003%207.24002%2010.01%208.35002%2010.01%208.35002C11.3342%207.97655%2012.7359%207.97655%2014.06%208.35002C14.06%208.35002%2015.61%207.24002%2016.29%207.46002C16.5914%208.17142%2016.6198%208.96894%2016.37%209.70002C16.6371%209.94893%2016.8489%2010.2511%2016.9919%2010.587C17.1348%2010.9229%2017.2057%2011.285%2017.2%2011.65C17.2%2014.85%2015.3%2015.1%2013.5%2015.31C13.6809%2015.5129%2013.8186%2015.7506%2013.9046%2016.0085C13.9905%2016.2664%2014.023%2016.5391%2014%2016.81C14%2017.93%2014%2019.31%2014%2019.58C13.9994%2019.6475%2014.015%2019.7142%2014.0456%2019.7744C14.0763%2019.8346%2014.1209%2019.8866%2014.1759%2019.9258C14.2308%2019.9651%2014.2945%2019.9905%2014.3613%2019.9999C14.4282%2020.0094%2014.4964%2020.0025%2014.56%2019.98C16.1813%2019.3978%2017.5786%2018.321%2018.5547%2016.9017C19.5309%2015.4824%2020.0364%2013.7922%2020%2012.07C20.0094%2011.0051%2019.8061%209.94902%2019.402%208.96371C18.9979%207.9784%2018.4011%207.08369%2017.6467%206.33205C16.8923%205.58041%2015.9953%204.98696%2015.0085%204.58651C14.0217%204.18606%2012.9649%203.98667%2011.9%204.00002ZM7.14003%2015.41C7.14003%2015.41%207.14003%2015.52%207.14003%2015.58C7.15118%2015.5912%207.16442%2015.6001%207.17901%2015.6061C7.1936%2015.6122%207.20923%2015.6153%207.22503%2015.6153C7.24082%2015.6153%207.25646%2015.6122%207.27105%2015.6061C7.28563%2015.6001%207.29888%2015.5912%207.31003%2015.58C7.31003%2015.58%207.31003%2015.47%207.31003%2015.4C7.31003%2015.33%207.18003%2015.37%207.14003%2015.41ZM6.79003%2015.14C6.79003%2015.14%206.79003%2015.24%206.86003%2015.27C6.86846%2015.2805%206.87913%2015.2889%206.89124%2015.2947C6.90335%2015.3004%206.91661%2015.3035%206.93003%2015.3035C6.94345%2015.3035%206.9567%2015.3004%206.96881%2015.2947C6.98093%2015.2889%206.99159%2015.2805%207.00003%2015.27C7.00003%2015.27%207.00003%2015.17%206.93003%2015.14C6.86003%2015.11%206.81003%2015.11%206.79003%2015.14ZM7.79003%2016.32C7.79003%2016.32%207.79003%2016.46%207.79003%2016.53C7.79003%2016.6%207.96003%2016.61%208.00003%2016.53C8.04003%2016.45%208.00003%2016.39%208.00003%2016.32C8.00003%2016.25%207.87003%2016.27%207.83003%2016.32H7.79003ZM7.42003%2015.83C7.42003%2015.83%207.42003%2015.95%207.42003%2016.03C7.42003%2016.11%207.56003%2016.14%207.61003%2016.11C7.63535%2016.0809%207.6493%2016.0436%207.6493%2016.005C7.6493%2015.9664%207.63535%2015.9291%207.61003%2015.9C7.56003%2015.82%207.48003%2015.79%207.42003%2015.83Z'%20fill='%23000000'/%3e%3c/svg%3e",zy={},Ry={class:"item"},Ty={class:"details"};function Iy(t,e){return Ye(),un("div",Ry,[Q("i",null,[ms(t.$slots,"icon",{},void 0,!0)]),Q("div",Ty,[Q("h3",null,[ms(t.$slots,"heading",{},void 0,!0)]),ms(t.$slots,"default",{},void 0,!0)])])}const vi=Bn(zy,[["render",Iy],["__scopeId","data-v-f4a791c4"]]),Ly={},Ny={width:"30",height:"30",fill:"#000000",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},jy=Q("path",{id:"assets_1_",d:`M31,0.64H10C9.801,0.64,9.64,0.801,9.64,1v2.64H1C0.801,3.64,0.64,3.801,0.64,4v27
	c0,0.199,0.161,0.36,0.36,0.36h21c0.199,0,0.36-0.161,0.36-0.36v-2.64H31c0.199,0,0.36-0.161,0.36-0.36V1
	C31.36,0.801,31.199,0.64,31,0.64z M21.64,30.64H1.36V4.36h14.28V10c0,0.199,0.161,0.36,0.36,0.36h5.64V30.64z M16.36,4.869
	l4.771,4.771H16.36V4.869z M30.64,27.64h-8.28V10c0-0.096-0.038-0.187-0.105-0.254l-6-6C16.187,3.678,16.096,3.64,16,3.64h-5.64
	V1.36h20.28C30.64,1.36,30.64,27.64,30.64,27.64z M19.36,16c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36
	S3.801,15.64,4,15.64h15C19.199,15.64,19.36,15.801,19.36,16z M19.36,19c0,0.199-0.161,0.36-0.36,0.36H4
	c-0.199,0-0.36-0.161-0.36-0.36S3.801,18.64,4,18.64h15C19.199,18.64,19.36,18.801,19.36,19z M19.36,22
	c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,21.64,4,21.64h15C19.199,21.64,19.36,21.801,19.36,22z
	 M19.36,25c0,0.199-0.161,0.36-0.36,0.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,24.64,4,24.64h15
	C19.199,24.64,19.36,24.801,19.36,25z`},null,-1),Fy=Q("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),Hy=[jy,Fy];function $y(t,e){return Ye(),un("svg",Ny,Hy)}const By=Bn(Ly,[["render",$y]]),Dy={},Vy={fill:"#000000",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 32 32","xml:space":"preserve"},Uy=Q("path",{id:"machine--learning--01_1_",d:`M12,1.64c-0.002,0-0.004,0-0.006,0c-1.473,0-2.691,0.759-3.239,2h-0.48
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
	S23.353,8.14,23,8.14z M26.36,15c0-0.353,0.287-0.64,0.64-0.64s0.64,0.287,0.64,0.64s-0.287,0.64-0.64,0.64S26.36,15.353,26.36,15z`},null,-1),Wy=Q("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),Yy=[Uy,Wy];function Ky(t,e){return Ye(),un("svg",Vy,Yy)}const Gy=Bn(Dy,[["render",Ky]]),qy={},Xy={height:"32",width:"32",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},Qy=Q("path",{id:"sunny_1_",d:`M16,29.36c-0.199,0-0.36-0.161-0.36-0.36v-3c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v3
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
	v3C16.36,6.199,16.199,6.36,16,6.36z`},null,-1),Zy=Q("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),Jy=[Qy,Zy];function t9(t,e){return Ye(),un("svg",Xy,Jy)}const e9=Bn(qy,[["render",t9]]),n9={},r9={height:"32",width:"32",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 32 32","xml:space":"preserve"},a9=Q("path",{id:"cloud-pak--for-data_1_",d:`M9.5,10c0,0.276-0.224,0.5-0.5,0.5S8.5,10.276,8.5,10S8.724,9.5,9,9.5S9.5,9.724,9.5,10z
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
	S24.64,14.353,24.64,14z`},null,-1),i9=Q("rect",{id:"_Transparent_Rectangle",style:{fill:"none"},width:"32",height:"32"},null,-1),o9=[a9,i9];function s9(t,e){return Ye(),un("svg",r9,o9)}const c9=Bn(n9,[["render",s9]]),bt=t=>(kl("data-v-7029a483"),t=t(),Cl(),t),l9=bt(()=>Q("div",{class:"tagline"},"Computational Linguist • Machine Learning Engineer • Data Analyst • Community Builder",-1)),f9=bt(()=>Q("a",{href:"https://linguistics.osu.edu/people/court.22",target:"_blank",rel:"noopener"},"PhD Candidate",-1)),u9=bt(()=>Q("a",{href:"https://linguistics.osu.edu/",target:"_blank",rel:"noopener"},"Linguistics Department",-1)),d9=bt(()=>Q("a",{href:"https://linguistics.osu.edu/",target:"_blank",rel:"noopener"},"The Ohio State University.",-1)),m9=bt(()=>Q("a",{href:"https://linguistics.osu.edu/people/elsner.14",target:"_blank",rel:"noopener"},[Q("br"),pt("Micha Elsner")],-1)),p9=bt(()=>Q("a",{href:"https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf",target:"_blank",rel:"noopener"},"Weaver",-1)),h9=bt(()=>Q("a",{href:"https://create.nyu.edu/cogscidiy/",target:"_blank",rel:"noopener"},"fostering",-1)),g9=bt(()=>Q("a",{href:"https://docs.google.com/presentation/d/1Y0awbZV4GOCnW-fH4Ls7q_gpGkb5QUaKW40CBcKTTE8/edit?slide=id.p#slide=id.p",target:"_blank",rel:"noopener"},"inclusive AI",-1)),v9=bt(()=>Q("a",{href:"https://docs.google.com/presentation/d/1IZ889fnGPOsdOHee9eArs8hfRm19TX5HDsNPGn7Tebc/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310",target:"_blank",rel:"noopener"},"development",-1)),b9=bt(()=>Q("a",{href:"https://aclanthology.org/2020.coling-main.258/",target:"_blank",rel:"noopener"},"computational morphologist,",-1)),y9=bt(()=>Q("a",{href:"https://aclanthology.org/2022.sigmorphon-1.22/",target:"_blank",rel:"noopener"},"models",-1)),w9=bt(()=>Q("a",{href:"https://aclanthology.org/2023.scil-1.4.pdf",target:"_blank",rel:"noopener"},"languages in contact",-1)),A9=bt(()=>Q("a",{href:"https://docs.google.com/presentation/d/1iHJTTw4V7vCU4mJeAJWkUTKetmbyZOQHkHvWieAblMA/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310",target:"_blank",rel:"noopener"},"low-resource domains",-1)),_9=bt(()=>Q("a",{href:"https://aclanthology.org/2024.wmt-1.125/",target:"_blank",rel:"noopener"},"responsible machine translation",-1)),x9=bt(()=>Q("a",{href:"https://aclanthology.org/2022.computel-1.20/",target:"_blank",rel:"noopener"},"collaborative data annotation.",-1)),k9=bt(()=>Q("br",null,null,-1)),C9=bt(()=>Q("a",{href:"https://scholar.google.com/citations?user=zi74VNEAAAAJ&hl",target:"_blank",rel:"noopener"},"Google Scholar",-1)),S9=bt(()=>Q("a",{href:"https://www.linkedin.com/in/sarakc/",target:"_blank",rel:"noopener"},"LinkedIn",-1)),E9=bt(()=>Q("br",null,null,-1)),M9=bt(()=>Q("a",{href:"/cv.pdf"},"resume | C.V.",-1)),P9=bt(()=>Q("img",{alt:"osu",class:"icon",src:My},null,-1)),O9=bt(()=>Q("a",{href:"https://linguistics.osu.edu/people/court.22",target:"_blank",rel:"noopener"},"Sara Court",-1)),z9=bt(()=>Q("br",null,null,-1)),R9=bt(()=>Q("img",{alt:"linkedin",class:"icon",src:Py},null,-1)),T9=bt(()=>Q("a",{href:"https://www.linkedin.com/in/sarakc/",target:"_blank",rel:"noopener"},"LinkedIn",-1)),I9=bt(()=>Q("img",{alt:"github",class:"icon",src:Oy},null,-1)),L9=bt(()=>Q("a",{href:"https://github.com/sarakc",target:"_blank",rel:"noopener"},"GitHub",-1)),N9=bt(()=>Q("br",null,null,-1)),j9=bt(()=>Q("a",{href:"mailto:court.22@osu.edu"},"court DOT 22 AT osu DOT edu",-1)),F9={__name:"TheWelcome",setup(t){return(e,n)=>(Ye(),un(ge,null,[zt(vi,null,{icon:pe(()=>[zt(e9)]),heading:pe(()=>[pt("About")]),default:pe(()=>[l9,pt(" I'm currently a "),f9,pt("in the "),u9,pt("at"),d9,m9,pt("is my advisor. I'm a"),p9,pt("to my core and committed to"),h9,g9,v9,pt(". ")]),_:1}),zt(vi,null,{icon:pe(()=>[zt(Gy)]),heading:pe(()=>[pt("Research")]),default:pe(()=>[pt(" I'm a"),b9,pt("among other things. I build and analyze"),y9,pt("for typologically diverse"),w9,pt("and other "),A9,pt("with applications in"),_9,pt("and tools for"),x9,k9]),_:1}),zt(vi,null,{icon:pe(()=>[zt(By)]),heading:pe(()=>[pt("Resume")]),default:pe(()=>[pt(" Check out my"),C9,pt("page and"),S9,pt("profile to learn more about the work that I do. "),E9,pt("Feel free to reach out via email to request an up-to-date "),M9,pt("in .pdf format. ")]),_:1}),zt(vi,null,{icon:pe(()=>[zt(c9)]),heading:pe(()=>[pt("Contact")]),default:pe(()=>[P9,pt(),O9,z9,R9,pt(),T9,pt(),I9,pt(),L9,N9,pt(" ✉️ "),j9]),_:1})],64))}},H9=Bn(F9,[["__scopeId","data-v-7029a483"]]),$9={__name:"HomeView",setup(t){return(e,n)=>(Ye(),un("main",null,[zt(H9)]))}},B9=my({history:Ob("/"),routes:[{path:"/",name:"home",component:$9},{path:"/research",name:"research",component:()=>gi(()=>En(()=>import("./ResearchView-bisgx8PE-pyKMsMMH.js"),__vite__mapDeps([])),Zn([0,1]))},{path:"/CV",name:"CV",component:()=>gi(()=>En(()=>import("./CVView-rHSyiM0--NE0xCfeD.js"),__vite__mapDeps([])),Zn([2,1]))},{path:"/contact",name:"contact",component:()=>gi(()=>En(()=>import("./ContactView-YDNlNp8A-QraVs03X.js"),__vite__mapDeps([])),Zn([3,1]))},{path:"/projects",name:"projects",component:()=>gi(()=>En(()=>import("./ProjectsView-RQp3tl4r-Q1lVaV53.js"),__vite__mapDeps([])),Zn([4,1]))}]});function lu(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function V(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?lu(Object(n),!0).forEach(function(r){Bt(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):lu(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function oo(t){"@babel/helpers - typeof";return oo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},oo(t)}function D9(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function fu(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function V9(t,e,n){return e&&fu(t.prototype,e),n&&fu(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function Bt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Tl(t,e){return W9(t)||K9(t,e)||L2(t,e)||q9()}function Wa(t){return U9(t)||Y9(t)||L2(t)||G9()}function U9(t){if(Array.isArray(t))return mc(t)}function W9(t){if(Array.isArray(t))return t}function Y9(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function K9(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,o,s;try{for(n=n.call(t);!(a=(o=n.next()).done)&&(r.push(o.value),!(e&&r.length===e));a=!0);}catch(c){i=!0,s=c}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw s}}return r}}function L2(t,e){if(t){if(typeof t=="string")return mc(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return mc(t,e)}}function mc(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function G9(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function q9(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var uu=function(){},Il={},N2={},j2=null,F2={mark:uu,measure:uu};try{typeof window<"u"&&(Il=window),typeof document<"u"&&(N2=document),typeof MutationObserver<"u"&&(j2=MutationObserver),typeof performance<"u"&&(F2=performance)}catch{}var X9=Il.navigator||{},du=X9.userAgent,mu=du===void 0?"":du,jn=Il,Et=N2,pu=j2,bi=F2;jn.document;var dn=!!Et.documentElement&&!!Et.head&&typeof Et.addEventListener=="function"&&typeof Et.createElement=="function",H2=~mu.indexOf("MSIE")||~mu.indexOf("Trident/"),yi,wi,Ai,_i,xi,rn="___FONT_AWESOME___",pc=16,$2="fa",B2="svg-inline--fa",sr="data-fa-i2svg",hc="data-fa-pseudo-element",Q9="data-fa-pseudo-element-pending",Ll="data-prefix",Nl="data-icon",hu="fontawesome-i2svg",Z9="async",J9=["HTML","HEAD","STYLE","SCRIPT"],D2=function(){try{return!0}catch{return!1}}(),Ct="classic",Nt="sharp",jl=[Ct,Nt];function Ya(t){return new Proxy(t,{get:function(e,n){return n in e?e[n]:e[Ct]}})}var La=Ya((yi={},Bt(yi,Ct,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),Bt(yi,Nt,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),yi)),Na=Ya((wi={},Bt(wi,Ct,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),Bt(wi,Nt,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),wi)),ja=Ya((Ai={},Bt(Ai,Ct,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),Bt(Ai,Nt,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),Ai)),t8=Ya((_i={},Bt(_i,Ct,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),Bt(_i,Nt,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),_i)),e8=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,V2="fa-layers-text",n8=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,r8=Ya((xi={},Bt(xi,Ct,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),Bt(xi,Nt,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),xi)),U2=[1,2,3,4,5,6,7,8,9,10],a8=U2.concat([11,12,13,14,15,16,17,18,19,20]),i8=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Xn={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Fa=new Set;Object.keys(Na[Ct]).map(Fa.add.bind(Fa));Object.keys(Na[Nt]).map(Fa.add.bind(Fa));var o8=[].concat(jl,Wa(Fa),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Xn.GROUP,Xn.SWAP_OPACITY,Xn.PRIMARY,Xn.SECONDARY]).concat(U2.map(function(t){return"".concat(t,"x")})).concat(a8.map(function(t){return"w-".concat(t)})),ba=jn.FontAwesomeConfig||{};function s8(t){var e=Et.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function c8(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(Et&&typeof Et.querySelector=="function"){var l8=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];l8.forEach(function(t){var e=Tl(t,2),n=e[0],r=e[1],a=c8(s8(n));a!=null&&(ba[r]=a)})}var W2={styleDefault:"solid",familyDefault:"classic",cssPrefix:$2,replacementClass:B2,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ba.familyPrefix&&(ba.cssPrefix=ba.familyPrefix);var Dr=V(V({},W2),ba);Dr.autoReplaceSvg||(Dr.observeMutations=!1);var K={};Object.keys(W2).forEach(function(t){Object.defineProperty(K,t,{enumerable:!0,set:function(e){Dr[t]=e,ya.forEach(function(n){return n(K)})},get:function(){return Dr[t]}})});Object.defineProperty(K,"familyPrefix",{enumerable:!0,set:function(t){Dr.cssPrefix=t,ya.forEach(function(e){return e(K)})},get:function(){return Dr.cssPrefix}});jn.FontAwesomeConfig=K;var ya=[];function f8(t){return ya.push(t),function(){ya.splice(ya.indexOf(t),1)}}var bn=pc,De={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function u8(t){if(!(!t||!dn)){var e=Et.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=Et.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return Et.head.insertBefore(e,r),t}}var d8="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Ha(){for(var t=12,e="";t-- >0;)e+=d8[Math.random()*62|0];return e}function Gr(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Fl(t){return t.classList?Gr(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Y2(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function m8(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(Y2(t[n]),'" ')},"").trim()}function Do(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function Hl(t){return t.size!==De.size||t.x!==De.x||t.y!==De.y||t.rotate!==De.rotate||t.flipX||t.flipY}function p8(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),c={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:c,path:u}}function h8(t){var e=t.transform,n=t.width,r=n===void 0?pc:n,a=t.height,i=a===void 0?pc:a,o=t.startCentered,s=o===void 0?!1:o,c="";return s&&H2?c+="translate(".concat(e.x/bn-r/2,"em, ").concat(e.y/bn-i/2,"em) "):s?c+="translate(calc(-50% + ".concat(e.x/bn,"em), calc(-50% + ").concat(e.y/bn,"em)) "):c+="translate(".concat(e.x/bn,"em, ").concat(e.y/bn,"em) "),c+="scale(".concat(e.size/bn*(e.flipX?-1:1),", ").concat(e.size/bn*(e.flipY?-1:1),") "),c+="rotate(".concat(e.rotate,"deg) "),c}var g8=`:root, :host {
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
}`;function K2(){var t=$2,e=B2,n=K.cssPrefix,r=K.replacementClass,a=g8;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(r))}return a}var gu=!1;function _s(){K.autoAddCss&&!gu&&(u8(K2()),gu=!0)}var v8={mixout:function(){return{dom:{css:K2,insertCss:_s}}},hooks:function(){return{beforeDOMElementCreation:function(){_s()},beforeI2svg:function(){_s()}}}},an=jn||{};an[rn]||(an[rn]={});an[rn].styles||(an[rn].styles={});an[rn].hooks||(an[rn].hooks={});an[rn].shims||(an[rn].shims=[]);var Oe=an[rn],G2=[],b8=function t(){Et.removeEventListener("DOMContentLoaded",t),so=1,G2.map(function(e){return e()})},so=!1;dn&&(so=(Et.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(Et.readyState),so||Et.addEventListener("DOMContentLoaded",b8));function y8(t){dn&&(so?setTimeout(t,0):G2.push(t))}function Ka(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?Y2(t):"<".concat(e," ").concat(m8(r),">").concat(i.map(Ka).join(""),"</").concat(e,">")}function vu(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var w8=function(t,e){return function(n,r,a,i){return t.call(e,n,r,a,i)}},xs=function(t,e,n,r){var a=Object.keys(t),i=a.length,o=r!==void 0?w8(e,r):e,s,c,u;for(n===void 0?(s=1,u=t[a[0]]):(s=0,u=n);s<i;s++)c=a[s],u=o(u,t[c],c,t);return u};function A8(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function q2(t){var e=A8(t);return e.length===1?e[0].toString(16):null}function _8(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function bu(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function gc(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=bu(e);typeof Oe.hooks.addPack=="function"&&!a?Oe.hooks.addPack(t,bu(e)):Oe.styles[t]=V(V({},Oe.styles[t]||{}),i),t==="fas"&&gc("fa",e)}var ki,Ci,Si,yr=Oe.styles,x8=Oe.shims,k8=(ki={},Bt(ki,Ct,Object.values(ja[Ct])),Bt(ki,Nt,Object.values(ja[Nt])),ki),$l=null,X2={},Q2={},Z2={},J2={},tm={},C8=(Ci={},Bt(Ci,Ct,Object.keys(La[Ct])),Bt(Ci,Nt,Object.keys(La[Nt])),Ci);function S8(t){return~o8.indexOf(t)}function E8(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!S8(a)?a:null}var em=function(){var t=function(r){return xs(yr,function(a,i,o){return a[o]=xs(i,r,{}),a},{})};X2=t(function(r,a,i){if(a[3]&&(r[a[3]]=i),a[2]){var o=a[2].filter(function(s){return typeof s=="number"});o.forEach(function(s){r[s.toString(16)]=i})}return r}),Q2=t(function(r,a,i){if(r[i]=i,a[2]){var o=a[2].filter(function(s){return typeof s=="string"});o.forEach(function(s){r[s]=i})}return r}),tm=t(function(r,a,i){var o=a[2];return r[i]=i,o.forEach(function(s){r[s]=i}),r});var e="far"in yr||K.autoFetchSvg,n=xs(x8,function(r,a){var i=a[0],o=a[1],s=a[2];return o==="far"&&!e&&(o="fas"),typeof i=="string"&&(r.names[i]={prefix:o,iconName:s}),typeof i=="number"&&(r.unicodes[i.toString(16)]={prefix:o,iconName:s}),r},{names:{},unicodes:{}});Z2=n.names,J2=n.unicodes,$l=Vo(K.styleDefault,{family:K.familyDefault})};f8(function(t){$l=Vo(t.styleDefault,{family:K.familyDefault})});em();function Bl(t,e){return(X2[t]||{})[e]}function M8(t,e){return(Q2[t]||{})[e]}function Qn(t,e){return(tm[t]||{})[e]}function nm(t){return Z2[t]||{prefix:null,iconName:null}}function P8(t){var e=J2[t],n=Bl("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Fn(){return $l}var Dl=function(){return{prefix:null,iconName:null,rest:[]}};function Vo(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,r=n===void 0?Ct:n,a=La[r][t],i=Na[r][t]||Na[r][a],o=t in Oe.styles?t:null;return i||o||null}var yu=(Si={},Bt(Si,Ct,Object.keys(ja[Ct])),Bt(Si,Nt,Object.keys(ja[Nt])),Si);function Uo(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(e={},Bt(e,Ct,"".concat(K.cssPrefix,"-").concat(Ct)),Bt(e,Nt,"".concat(K.cssPrefix,"-").concat(Nt)),e),o=null,s=Ct;(t.includes(i[Ct])||t.some(function(u){return yu[Ct].includes(u)}))&&(s=Ct),(t.includes(i[Nt])||t.some(function(u){return yu[Nt].includes(u)}))&&(s=Nt);var c=t.reduce(function(u,l){var m=E8(K.cssPrefix,l);if(yr[l]?(l=k8[s].includes(l)?t8[s][l]:l,o=l,u.prefix=l):C8[s].indexOf(l)>-1?(o=l,u.prefix=Vo(l,{family:s})):m?u.iconName=m:l!==K.replacementClass&&l!==i[Ct]&&l!==i[Nt]&&u.rest.push(l),!a&&u.prefix&&u.iconName){var p=o==="fa"?nm(u.iconName):{},g=Qn(u.prefix,u.iconName);p.prefix&&(o=null),u.iconName=p.iconName||g||u.iconName,u.prefix=p.prefix||u.prefix,u.prefix==="far"&&!yr.far&&yr.fas&&!K.autoFetchSvg&&(u.prefix="fas")}return u},Dl());return(t.includes("fa-brands")||t.includes("fab"))&&(c.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(c.prefix="fad"),!c.prefix&&s===Nt&&(yr.fass||K.autoFetchSvg)&&(c.prefix="fass",c.iconName=Qn(c.prefix,c.iconName)||c.iconName),(c.prefix==="fa"||o==="fa")&&(c.prefix=Fn()||"fas"),c}var O8=function(){function t(){D9(this,t),this.definitions={}}return V9(t,[{key:"add",value:function(){for(var e=this,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];var i=r.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(o){e.definitions[o]=V(V({},e.definitions[o]||{}),i[o]),gc(o,i[o]);var s=ja[Ct][o];s&&gc(s,i[o]),em()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(e,n){var r=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(r).map(function(a){var i=r[a],o=i.prefix,s=i.iconName,c=i.icon,u=c[2];e[o]||(e[o]={}),u.length>0&&u.forEach(function(l){typeof l=="string"&&(e[o][l]=c)}),e[o][s]=c}),e}}]),t}(),wu=[],wr={},Or={},z8=Object.keys(Or);function R8(t,e){var n=e.mixoutsTo;return wu=t,wr={},Object.keys(Or).forEach(function(r){z8.indexOf(r)===-1&&delete Or[r]}),wu.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(o){typeof a[o]=="function"&&(n[o]=a[o]),oo(a[o])==="object"&&Object.keys(a[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){wr[o]||(wr[o]=[]),wr[o].push(i[o])})}r.provides&&r.provides(Or)}),n}function vc(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=wr[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(r))}),e}function cr(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=wr[t]||[];a.forEach(function(i){i.apply(null,n)})}function on(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Or[t]?Or[t].apply(null,e):void 0}function bc(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||Fn();if(e)return e=Qn(n,e)||e,vu(rm.definitions,n,e)||vu(Oe.styles,n,e)}var rm=new O8,T8=function(){K.autoReplaceSvg=!1,K.observeMutations=!1,cr("noAuto")},I8={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return dn?(cr("beforeI2svg",t),on("pseudoElements2svg",t),on("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=t.autoReplaceSvgRoot;K.autoReplaceSvg===!1&&(K.autoReplaceSvg=!0),K.observeMutations=!0,y8(function(){N8({autoReplaceSvgRoot:e}),cr("watch",t)})}},L8={icon:function(t){if(t===null)return null;if(oo(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Qn(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=Vo(t[0]);return{prefix:n,iconName:Qn(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(K.cssPrefix,"-"))>-1||t.match(e8))){var r=Uo(t.split(" "),{skipLookups:!0});return{prefix:r.prefix||Fn(),iconName:Qn(r.prefix,r.iconName)||r.iconName}}if(typeof t=="string"){var a=Fn();return{prefix:a,iconName:Qn(a,t)||t}}}},be={noAuto:T8,config:K,dom:I8,parse:L8,library:rm,findIconDefinition:bc,toHtml:Ka},N8=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=t.autoReplaceSvgRoot,n=e===void 0?Et:e;(Object.keys(Oe.styles).length>0||K.autoFetchSvg)&&dn&&K.autoReplaceSvg&&be.dom.i2svg({node:n})};function Wo(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(n){return Ka(n)})}}),Object.defineProperty(t,"node",{get:function(){if(dn){var n=Et.createElement("div");return n.innerHTML=t.html,n.children}}}),t}function j8(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,o=t.transform;if(Hl(o)&&n.found&&!r.found){var s=n.width,c=n.height,u={x:s/c/2,y:.5};a.style=Do(V(V({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function F8(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(K.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:V(V({},a),{},{id:o}),children:r}]}]}function Vl(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,c=t.title,u=t.maskId,l=t.titleId,m=t.extra,p=t.watchable,g=p===void 0?!1:p,S=r.found?r:n,z=S.width,T=S.height,y=a==="fak",A=[K.replacementClass,i?"".concat(K.cssPrefix,"-").concat(i):""].filter(function(ut){return m.classes.indexOf(ut)===-1}).filter(function(ut){return ut!==""||!!ut}).concat(m.classes).join(" "),O={children:[],attributes:V(V({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:A,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(z," ").concat(T)})},j=y&&!~m.classes.indexOf("fa-fw")?{width:"".concat(z/T*16*.0625,"em")}:{};g&&(O.attributes[sr]=""),c&&(O.children.push({tag:"title",attributes:{id:O.attributes["aria-labelledby"]||"title-".concat(l||Ha())},children:[c]}),delete O.attributes.title);var $=V(V({},O),{},{prefix:a,iconName:i,main:n,mask:r,maskId:u,transform:o,symbol:s,styles:V(V({},j),m.styles)}),N=r.found&&n.found?on("generateAbstractMask",$)||{children:[],attributes:{}}:on("generateAbstractIcon",$)||{children:[],attributes:{}},q=N.children,ft=N.attributes;return $.children=q,$.attributes=ft,s?F8($):j8($)}function Au(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,o=t.extra,s=t.watchable,c=s===void 0?!1:s,u=V(V(V({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});c&&(u[sr]="");var l=V({},o.styles);Hl(a)&&(l.transform=h8({transform:a,startCentered:!0,width:n,height:r}),l["-webkit-transform"]=l.transform);var m=Do(l);m.length>0&&(u.style=m);var p=[];return p.push({tag:"span",attributes:u,children:[e]}),i&&p.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),p}function H8(t){var e=t.content,n=t.title,r=t.extra,a=V(V(V({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=Do(r.styles);i.length>0&&(a.style=i);var o=[];return o.push({tag:"span",attributes:a,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var ks=Oe.styles;function yc(t){var e=t[0],n=t[1],r=t.slice(4),a=Tl(r,1),i=a[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(K.cssPrefix,"-").concat(Xn.GROUP)},children:[{tag:"path",attributes:{class:"".concat(K.cssPrefix,"-").concat(Xn.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(K.cssPrefix,"-").concat(Xn.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var $8={found:!1,width:512,height:512};function B8(t,e){!D2&&!K.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function wc(t,e){var n=e;return e==="fa"&&K.styleDefault!==null&&(e=Fn()),new Promise(function(r,a){if(on("missingIconAbstract"),n==="fa"){var i=nm(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&ks[e]&&ks[e][t]){var o=ks[e][t];return r(yc(o))}B8(t,e),r(V(V({},$8),{},{icon:K.showMissingIcons&&t?on("missingIconAbstract")||{}:{}}))})}var _u=function(){},Ac=K.measurePerformance&&bi&&bi.mark&&bi.measure?bi:{mark:_u,measure:_u},ia='FA "6.5.1"',D8=function(t){return Ac.mark("".concat(ia," ").concat(t," begins")),function(){return am(t)}},am=function(t){Ac.mark("".concat(ia," ").concat(t," ends")),Ac.measure("".concat(ia," ").concat(t),"".concat(ia," ").concat(t," begins"),"".concat(ia," ").concat(t," ends"))},Ul={begin:D8,end:am},Hi=function(){};function xu(t){var e=t.getAttribute?t.getAttribute(sr):null;return typeof e=="string"}function V8(t){var e=t.getAttribute?t.getAttribute(Ll):null,n=t.getAttribute?t.getAttribute(Nl):null;return e&&n}function U8(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(K.replacementClass)}function W8(){if(K.autoReplaceSvg===!0)return $i.replace;var t=$i[K.autoReplaceSvg];return t||$i.replace}function Y8(t){return Et.createElementNS("http://www.w3.org/2000/svg",t)}function K8(t){return Et.createElement(t)}function im(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?Y8:K8:n;if(typeof t=="string")return Et.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){a.appendChild(im(o,{ceFn:r}))}),a}function G8(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var $i={replace:function(t){var e=t[0];if(e.parentNode)if(t[1].forEach(function(r){e.parentNode.insertBefore(im(r),e)}),e.getAttribute(sr)===null&&K.keepOriginalSource){var n=Et.createComment(G8(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){var e=t[0],n=t[1];if(~Fl(e).indexOf(K.replacementClass))return $i.replace(t);var r=new RegExp("".concat(K.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){var a=n[0].attributes.class.split(" ").reduce(function(o,s){return s===K.replacementClass||s.match(r)?o.toSvg.push(s):o.toNode.push(s),o},{toNode:[],toSvg:[]});n[0].attributes.class=a.toSvg.join(" "),a.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",a.toNode.join(" "))}var i=n.map(function(o){return Ka(o)}).join(`
`);e.setAttribute(sr,""),e.innerHTML=i}};function ku(t){t()}function om(t,e){var n=typeof e=="function"?e:Hi;if(t.length===0)n();else{var r=ku;K.mutateApproach===Z9&&(r=jn.requestAnimationFrame||ku),r(function(){var a=W8(),i=Ul.begin("mutate");t.map(a),i(),n()})}}var Wl=!1;function sm(){Wl=!0}function _c(){Wl=!1}var co=null;function Cu(t){if(pu&&K.observeMutations){var e=t.treeCallback,n=e===void 0?Hi:e,r=t.nodeCallback,a=r===void 0?Hi:r,i=t.pseudoElementsCallback,o=i===void 0?Hi:i,s=t.observeMutationsRoot,c=s===void 0?Et:s;co=new pu(function(u){if(!Wl){var l=Fn();Gr(u).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!xu(m.addedNodes[0])&&(K.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&K.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&xu(m.target)&&~i8.indexOf(m.attributeName))if(m.attributeName==="class"&&V8(m.target)){var p=Uo(Fl(m.target)),g=p.prefix,S=p.iconName;m.target.setAttribute(Ll,g||l),S&&m.target.setAttribute(Nl,S)}else U8(m.target)&&a(m.target)})}}),dn&&co.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function q8(){co&&co.disconnect()}function X8(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),n}function Q8(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=Uo(Fl(t));return a.prefix||(a.prefix=Fn()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=M8(a.prefix,t.innerText)||Bl(a.prefix,q2(t.innerText))),!a.iconName&&K.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function Z8(t){var e=Gr(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return K.autoA11y&&(n?e["aria-labelledby"]="".concat(K.replacementClass,"-title-").concat(r||Ha()):(e["aria-hidden"]="true",e.focusable="false")),e}function J8(){return{iconName:null,title:null,titleId:null,prefix:null,transform:De,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Su(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Q8(t),r=n.iconName,a=n.prefix,i=n.rest,o=Z8(t),s=vc("parseNodeAttributes",{},t),c=e.styleParser?X8(t):[];return V({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:De,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:c,attributes:o}},s)}var t7=Oe.styles;function cm(t){var e=K.autoReplaceSvg==="nest"?Su(t,{styleParser:!1}):Su(t);return~e.extra.classes.indexOf(V2)?on("generateLayersText",t,e):on("generateSvgReplacementMutation",t,e)}var Hn=new Set;jl.map(function(t){Hn.add("fa-".concat(t))});Object.keys(La[Ct]).map(Hn.add.bind(Hn));Object.keys(La[Nt]).map(Hn.add.bind(Hn));Hn=Wa(Hn);function Eu(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!dn)return Promise.resolve();var n=Et.documentElement.classList,r=function(l){return n.add("".concat(hu,"-").concat(l))},a=function(l){return n.remove("".concat(hu,"-").concat(l))},i=K.autoFetchSvg?Hn:jl.map(function(l){return"fa-".concat(l)}).concat(Object.keys(t7));i.includes("fa")||i.push("fa");var o=[".".concat(V2,":not([").concat(sr,"])")].concat(i.map(function(l){return".".concat(l,":not([").concat(sr,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Gr(t.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),a("complete");else return Promise.resolve();var c=Ul.begin("onTree"),u=s.reduce(function(l,m){try{var p=cm(m);p&&l.push(p)}catch(g){D2||g.name==="MissingIcon"&&console.error(g)}return l},[]);return new Promise(function(l,m){Promise.all(u).then(function(p){om(p,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),c(),l()})}).catch(function(p){c(),m(p)})})}function e7(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;cm(t).then(function(n){n&&om([n],e)})}function n7(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:bc(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:bc(a||{})),t(r,V(V({},n),{},{mask:a}))}}var r7=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.transform,r=n===void 0?De:n,a=e.symbol,i=a===void 0?!1:a,o=e.mask,s=o===void 0?null:o,c=e.maskId,u=c===void 0?null:c,l=e.title,m=l===void 0?null:l,p=e.titleId,g=p===void 0?null:p,S=e.classes,z=S===void 0?[]:S,T=e.attributes,y=T===void 0?{}:T,A=e.styles,O=A===void 0?{}:A;if(t){var j=t.prefix,$=t.iconName,N=t.icon;return Wo(V({type:"icon"},t),function(){return cr("beforeDOMElementCreation",{iconDefinition:t,params:e}),K.autoA11y&&(m?y["aria-labelledby"]="".concat(K.replacementClass,"-title-").concat(g||Ha()):(y["aria-hidden"]="true",y.focusable="false")),Vl({icons:{main:yc(N),mask:s?yc(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:j,iconName:$,transform:V(V({},De),r),symbol:i,title:m,maskId:u,titleId:g,extra:{attributes:y,styles:O,classes:z}})})}},a7={mixout:function(){return{icon:n7(r7)}},hooks:function(){return{mutationObserverCallbacks:function(t){return t.treeCallback=Eu,t.nodeCallback=e7,t}}},provides:function(t){t.i2svg=function(e){var n=e.node,r=n===void 0?Et:n,a=e.callback,i=a===void 0?function(){}:a;return Eu(r,i)},t.generateSvgReplacementMutation=function(e,n){var r=n.iconName,a=n.title,i=n.titleId,o=n.prefix,s=n.transform,c=n.symbol,u=n.mask,l=n.maskId,m=n.extra;return new Promise(function(p,g){Promise.all([wc(r,o),u.iconName?wc(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(S){var z=Tl(S,2),T=z[0],y=z[1];p([e,Vl({icons:{main:T,mask:y},prefix:o,iconName:r,transform:s,symbol:c,maskId:l,title:a,titleId:i,extra:m,watchable:!0})])}).catch(g)})},t.generateAbstractIcon=function(e){var n=e.children,r=e.attributes,a=e.main,i=e.transform,o=e.styles,s=Do(o);s.length>0&&(r.style=s);var c;return Hl(i)&&(c=on("generateAbstractTransformGrouping",{main:a,transform:i,containerWidth:a.width,iconWidth:a.width})),n.push(c||a.icon),{children:n,attributes:r}}}},i7={mixout:function(){return{layer:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.classes,r=n===void 0?[]:n;return Wo({type:"layer"},function(){cr("beforeDOMElementCreation",{assembler:t,params:e});var a=[];return t(function(i){Array.isArray(i)?i.map(function(o){a=a.concat(o.abstract)}):a=a.concat(i.abstract)}),[{tag:"span",attributes:{class:["".concat(K.cssPrefix,"-layers")].concat(Wa(r)).join(" ")},children:a}]})}}}},o7={mixout:function(){return{counter:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.title,r=n===void 0?null:n,a=e.classes,i=a===void 0?[]:a,o=e.attributes,s=o===void 0?{}:o,c=e.styles,u=c===void 0?{}:c;return Wo({type:"counter",content:t},function(){return cr("beforeDOMElementCreation",{content:t,params:e}),H8({content:t.toString(),title:r,extra:{attributes:s,styles:u,classes:["".concat(K.cssPrefix,"-layers-counter")].concat(Wa(i))}})})}}}},s7={mixout:function(){return{text:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.transform,r=n===void 0?De:n,a=e.title,i=a===void 0?null:a,o=e.classes,s=o===void 0?[]:o,c=e.attributes,u=c===void 0?{}:c,l=e.styles,m=l===void 0?{}:l;return Wo({type:"text",content:t},function(){return cr("beforeDOMElementCreation",{content:t,params:e}),Au({content:t,transform:V(V({},De),r),title:i,extra:{attributes:u,styles:m,classes:["".concat(K.cssPrefix,"-layers-text")].concat(Wa(s))}})})}}},provides:function(t){t.generateLayersText=function(e,n){var r=n.title,a=n.transform,i=n.extra,o=null,s=null;if(H2){var c=parseInt(getComputedStyle(e).fontSize,10),u=e.getBoundingClientRect();o=u.width/c,s=u.height/c}return K.autoA11y&&!r&&(i.attributes["aria-hidden"]="true"),Promise.resolve([e,Au({content:e.innerHTML,width:o,height:s,transform:a,title:r,extra:i,watchable:!0})])}}},c7=new RegExp('"',"ug"),Mu=[1105920,1112319];function l7(t){var e=t.replace(c7,""),n=_8(e,0),r=n>=Mu[0]&&n<=Mu[1],a=e.length===2?e[0]===e[1]:!1;return{value:q2(a?e[0]:e),isSecondary:r||a}}function Pu(t,e){var n="".concat(Q9).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=Gr(t.children),o=i.filter(function(q){return q.getAttribute(hc)===e})[0],s=jn.getComputedStyle(t,e),c=s.getPropertyValue("font-family").match(n8),u=s.getPropertyValue("font-weight"),l=s.getPropertyValue("content");if(o&&!c)return t.removeChild(o),r();if(c&&l!=="none"&&l!==""){var m=s.getPropertyValue("content"),p=~["Sharp"].indexOf(c[2])?Nt:Ct,g=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(c[2])?Na[p][c[2].toLowerCase()]:r8[p][u],S=l7(m),z=S.value,T=S.isSecondary,y=c[0].startsWith("FontAwesome"),A=Bl(g,z),O=A;if(y){var j=P8(z);j.iconName&&j.prefix&&(A=j.iconName,g=j.prefix)}if(A&&!T&&(!o||o.getAttribute(Ll)!==g||o.getAttribute(Nl)!==O)){t.setAttribute(n,O),o&&t.removeChild(o);var $=J8(),N=$.extra;N.attributes[hc]=e,wc(A,g).then(function(q){var ft=Vl(V(V({},$),{},{icons:{main:q,mask:Dl()},prefix:g,iconName:O,extra:N,watchable:!0})),ut=Et.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(ut,t.firstChild):t.appendChild(ut),ut.outerHTML=ft.map(function(_t){return Ka(_t)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function f7(t){return Promise.all([Pu(t,"::before"),Pu(t,"::after")])}function u7(t){return t.parentNode!==document.head&&!~J9.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(hc)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ou(t){if(dn)return new Promise(function(e,n){var r=Gr(t.querySelectorAll("*")).filter(u7).map(f7),a=Ul.begin("searchPseudoElements");sm(),Promise.all(r).then(function(){a(),_c(),e()}).catch(function(){a(),_c(),n()})})}var d7={hooks:function(){return{mutationObserverCallbacks:function(t){return t.pseudoElementsCallback=Ou,t}}},provides:function(t){t.pseudoElements2svg=function(e){var n=e.node,r=n===void 0?Et:n;K.searchPseudoElements&&Ou(r)}}},zu=!1,m7={mixout:function(){return{dom:{unwatch:function(){sm(),zu=!0}}}},hooks:function(){return{bootstrap:function(){Cu(vc("mutationObserverCallbacks",{}))},noAuto:function(){q8()},watch:function(t){var e=t.observeMutationsRoot;zu?_c():Cu(vc("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}},Ru=function(t){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(n,r){var a=r.toLowerCase().split("-"),i=a[0],o=a.slice(1).join("-");if(i&&o==="h")return n.flipX=!0,n;if(i&&o==="v")return n.flipY=!0,n;if(o=parseFloat(o),isNaN(o))return n;switch(i){case"grow":n.size=n.size+o;break;case"shrink":n.size=n.size-o;break;case"left":n.x=n.x-o;break;case"right":n.x=n.x+o;break;case"up":n.y=n.y-o;break;case"down":n.y=n.y+o;break;case"rotate":n.rotate=n.rotate+o;break}return n},e)},p7={mixout:function(){return{parse:{transform:function(t){return Ru(t)}}}},hooks:function(){return{parseNodeAttributes:function(t,e){var n=e.getAttribute("data-fa-transform");return n&&(t.transform=Ru(n)),t}}},provides:function(t){t.generateAbstractTransformGrouping=function(e){var n=e.main,r=e.transform,a=e.containerWidth,i=e.iconWidth,o={transform:"translate(".concat(a/2," 256)")},s="translate(".concat(r.x*32,", ").concat(r.y*32,") "),c="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),u="rotate(".concat(r.rotate," 0 0)"),l={transform:"".concat(s," ").concat(c," ").concat(u)},m={transform:"translate(".concat(i/2*-1," -256)")},p={outer:o,inner:l,path:m};return{tag:"g",attributes:V({},p.outer),children:[{tag:"g",attributes:V({},p.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:V(V({},n.icon.attributes),p.path)}]}]}}}},Cs={x:0,y:0,width:"100%",height:"100%"};function Tu(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function h7(t){return t.tag==="g"?t.children:[t]}var g7={hooks:function(){return{parseNodeAttributes:function(t,e){var n=e.getAttribute("data-fa-mask"),r=n?Uo(n.split(" ").map(function(a){return a.trim()})):Dl();return r.prefix||(r.prefix=Fn()),t.mask=r,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides:function(t){t.generateAbstractMask=function(e){var n=e.children,r=e.attributes,a=e.main,i=e.mask,o=e.maskId,s=e.transform,c=a.width,u=a.icon,l=i.width,m=i.icon,p=p8({transform:s,containerWidth:l,iconWidth:c}),g={tag:"rect",attributes:V(V({},Cs),{},{fill:"white"})},S=u.children?{children:u.children.map(Tu)}:{},z={tag:"g",attributes:V({},p.inner),children:[Tu(V({tag:u.tag,attributes:V(V({},u.attributes),p.path)},S))]},T={tag:"g",attributes:V({},p.outer),children:[z]},y="mask-".concat(o||Ha()),A="clip-".concat(o||Ha()),O={tag:"mask",attributes:V(V({},Cs),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,T]},j={tag:"defs",children:[{tag:"clipPath",attributes:{id:A},children:h7(m)},O]};return n.push(j,{tag:"rect",attributes:V({fill:"currentColor","clip-path":"url(#".concat(A,")"),mask:"url(#".concat(y,")")},Cs)}),{children:n,attributes:r}}}},v7={provides:function(t){var e=!1;jn.matchMedia&&(e=jn.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var n=[],r={fill:"currentColor"},a={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:V(V({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=V(V({},a),{},{attributeName:"opacity"}),o={tag:"circle",attributes:V(V({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||o.children.push({tag:"animate",attributes:V(V({},a),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:V(V({},i),{},{values:"1;0;1;1;0;1;"})}),n.push(o),n.push({tag:"path",attributes:V(V({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:V(V({},i),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:V(V({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:V(V({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},b7={hooks:function(){return{parseNodeAttributes:function(t,e){var n=e.getAttribute("data-fa-symbol"),r=n===null?!1:n===""?!0:n;return t.symbol=r,t}}}},y7=[v8,a7,i7,o7,s7,d7,m7,p7,g7,v7,b7];R8(y7,{mixoutsTo:be});be.noAuto;be.config;var w7=be.library;be.dom;be.parse;be.findIconDefinition;be.toHtml;be.icon;be.layer;be.text;be.counter;var A7=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},_7={exports:{}};(function(t){(function(e){var n=function(y,A,O){if(!u(A)||m(A)||p(A)||g(A)||c(A))return A;var j,$=0,N=0;if(l(A))for(j=[],N=A.length;$<N;$++)j.push(n(y,A[$],O));else{j={};for(var q in A)Object.prototype.hasOwnProperty.call(A,q)&&(j[y(q,O)]=n(y,A[q],O))}return j},r=function(y,A){A=A||{};var O=A.separator||"_",j=A.split||/(?=[A-Z])/;return y.split(j).join(O)},a=function(y){return S(y)?y:(y=y.replace(/[\-_\s]+(.)?/g,function(A,O){return O?O.toUpperCase():""}),y.substr(0,1).toLowerCase()+y.substr(1))},i=function(y){var A=a(y);return A.substr(0,1).toUpperCase()+A.substr(1)},o=function(y,A){return r(y,A).toLowerCase()},s=Object.prototype.toString,c=function(y){return typeof y=="function"},u=function(y){return y===Object(y)},l=function(y){return s.call(y)=="[object Array]"},m=function(y){return s.call(y)=="[object Date]"},p=function(y){return s.call(y)=="[object RegExp]"},g=function(y){return s.call(y)=="[object Boolean]"},S=function(y){return y=y-0,y===y},z=function(y,A){var O=A&&"process"in A?A.process:A;return typeof O!="function"?y:function(j,$){return O(j,y,$)}},T={camelize:a,decamelize:o,pascalize:i,depascalize:o,camelizeKeys:function(y,A){return n(z(a,A),y)},decamelizeKeys:function(y,A){return n(z(o,A),y,A)},pascalizeKeys:function(y,A){return n(z(i,A),y)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};t.exports?t.exports=T:e.humps=T})(A7)})(_7);var x7=!1;try{x7=!0}catch{}var k7={prefix:"fas",iconName:"user-secret",icon:[448,512,[128373],"f21b","M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"]};w7.add(k7);const Yl=ob(Cy);Yl.use(ub());Yl.use(B9);Yl.mount("#app");function Zn(t){return Zn.viteFileDeps||(Zn.viteFileDeps=["assets/ResearchView-bisgx8PE.js","assets/ResearchView-ug8e6cRs.css","assets/CVView-rHSyiM0-.js","assets/ContactView-YDNlNp8A.js","assets/ProjectsView-RQp3tl4r.js"]),t.map(e=>Zn.viteFileDeps[e])}export{Q as D,Ye as G,pt as Q,Bn as _,S7 as a,$n as b,cn as c,yt as d,X as e,C7 as f,Pt as g,zt as l,We as o,un as r};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ResearchView-0zgBdhd-.js","assets/ResearchView-ug8e6cRs.css","assets/CVView-HvmpH_8D.js","assets/ContactView-DxPycDIP.js","assets/ProjectsView-f_6bfWkJ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
