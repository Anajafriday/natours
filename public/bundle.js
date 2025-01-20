const ht=e=>{var t=L.map("map",{zoomControl:!1});L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(t);const n=new L.icon({iconUrl:"/img/pin.png",iconSize:[32,40],popupAnchor:[0,-10]}),r=[];e.forEach(o=>{r.push([o.coordinates[1],o.coordinates[0]]),L.marker([o.coordinates[1],o.coordinates[0]],{icon:n}).addTo(t).bindPopup(`<p>Day ${o.day}: ${o.description}</p>`,{autoClose:!1,closeOnClick:!1})});const s=L.latLngBounds(r).pad(.5);t.fitBounds(s),t.scrollWheelZoom.disable()},Ee=()=>{const e=document.querySelector(".alert");e&&e.parentElement.removeChild(e)},N=(e,t)=>{Ee();const n=`<div class="alert alert--${e}">${t}</div>`;document.body.insertAdjacentHTML("afterbegin",n),window.setTimeout(Ee,5e3)};function ze(e,t){return function(){return e.apply(t,arguments)}}const{toString:mt}=Object.prototype,{getPrototypeOf:he}=Object,G=(e=>t=>{const n=mt.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),x=e=>(e=e.toLowerCase(),t=>G(t)===e),X=e=>t=>typeof t===e,{isArray:j}=Array,M=X("undefined");function yt(e){return e!==null&&!M(e)&&e.constructor!==null&&!M(e.constructor)&&C(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const $e=x("ArrayBuffer");function wt(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&$e(e.buffer),t}const bt=X("string"),C=X("function"),Je=X("number"),Z=e=>e!==null&&typeof e=="object",gt=e=>e===!0||e===!1,J=e=>{if(G(e)!=="object")return!1;const t=he(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Et=x("Date"),St=x("File"),Rt=x("Blob"),Tt=x("FileList"),Ot=e=>Z(e)&&C(e.pipe),At=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||C(e.append)&&((t=G(e))==="formdata"||t==="object"&&C(e.toString)&&e.toString()==="[object FormData]"))},Ct=x("URLSearchParams"),[xt,Pt,Lt,Nt]=["ReadableStream","Request","Response","Headers"].map(x),_t=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function H(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),j(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let c;for(r=0;r<i;r++)c=o[r],t.call(null,e[c],c,e)}}function Ve(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const D=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,We=e=>!M(e)&&e!==D;function ae(){const{caseless:e}=We(this)&&this||{},t={},n=(r,s)=>{const o=e&&Ve(t,s)||s;J(t[o])&&J(r)?t[o]=ae(t[o],r):J(r)?t[o]=ae({},r):j(r)?t[o]=r.slice():t[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&H(arguments[r],n);return t}const Ft=(e,t,n,{allOwnKeys:r}={})=>(H(t,(s,o)=>{n&&C(s)?e[o]=ze(s,n):e[o]=s},{allOwnKeys:r}),e),Bt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Dt=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Ut=(e,t,n,r)=>{let s,o,i;const c={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!r||r(i,e,t))&&!c[i]&&(t[i]=e[i],c[i]=!0);e=n!==!1&&he(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kt=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},jt=e=>{if(!e)return null;if(j(e))return e;let t=e.length;if(!Je(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},qt=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&he(Uint8Array)),It=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=r.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},Mt=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Ht=x("HTMLFormElement"),vt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),Se=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),zt=x("RegExp"),Ke=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};H(n,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(r[o]=i||s)}),Object.defineProperties(e,r)},$t=e=>{Ke(e,(t,n)=>{if(C(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(C(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Jt=(e,t)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return j(e)?r(e):r(String(e).split(t)),n},Vt=()=>{},Wt=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t,ne="abcdefghijklmnopqrstuvwxyz",Re="0123456789",Ge={DIGIT:Re,ALPHA:ne,ALPHA_DIGIT:ne+ne.toUpperCase()+Re},Kt=(e=16,t=Ge.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function Gt(e){return!!(e&&C(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Xt=e=>{const t=new Array(10),n=(r,s)=>{if(Z(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[s]=r;const o=j(r)?[]:{};return H(r,(i,c)=>{const f=n(i,s+1);!M(f)&&(o[c]=f)}),t[s]=void 0,o}}return r};return n(e,0)},Zt=x("AsyncFunction"),Qt=e=>e&&(Z(e)||C(e))&&C(e.then)&&C(e.catch),Xe=((e,t)=>e?setImmediate:t?((n,r)=>(D.addEventListener("message",({source:s,data:o})=>{s===D&&o===n&&r.length&&r.shift()()},!1),s=>{r.push(s),D.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",C(D.postMessage)),Yt=typeof queueMicrotask<"u"?queueMicrotask.bind(D):typeof process<"u"&&process.nextTick||Xe,a={isArray:j,isArrayBuffer:$e,isBuffer:yt,isFormData:At,isArrayBufferView:wt,isString:bt,isNumber:Je,isBoolean:gt,isObject:Z,isPlainObject:J,isReadableStream:xt,isRequest:Pt,isResponse:Lt,isHeaders:Nt,isUndefined:M,isDate:Et,isFile:St,isBlob:Rt,isRegExp:zt,isFunction:C,isStream:Ot,isURLSearchParams:Ct,isTypedArray:qt,isFileList:Tt,forEach:H,merge:ae,extend:Ft,trim:_t,stripBOM:Bt,inherits:Dt,toFlatObject:Ut,kindOf:G,kindOfTest:x,endsWith:kt,toArray:jt,forEachEntry:It,matchAll:Mt,isHTMLForm:Ht,hasOwnProperty:Se,hasOwnProp:Se,reduceDescriptors:Ke,freezeMethods:$t,toObjectSet:Jt,toCamelCase:vt,noop:Vt,toFiniteNumber:Wt,findKey:Ve,global:D,isContextDefined:We,ALPHABET:Ge,generateString:Kt,isSpecCompliantForm:Gt,toJSONObject:Xt,isAsyncFn:Zt,isThenable:Qt,setImmediate:Xe,asap:Yt};function m(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}a.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.status}}});const Ze=m.prototype,Qe={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Qe[e]={value:e}});Object.defineProperties(m,Qe);Object.defineProperty(Ze,"isAxiosError",{value:!0});m.from=(e,t,n,r,s,o)=>{const i=Object.create(Ze);return a.toFlatObject(e,i,function(f){return f!==Error.prototype},c=>c!=="isAxiosError"),m.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};const en=null;function ce(e){return a.isPlainObject(e)||a.isArray(e)}function Ye(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function Te(e,t,n){return e?e.concat(t).map(function(s,o){return s=Ye(s),!n&&o?"["+s+"]":s}).join(n?".":""):t}function tn(e){return a.isArray(e)&&!e.some(ce)}const nn=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function Q(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,h){return!a.isUndefined(h[y])});const r=n.metaTokens,s=n.visitor||l,o=n.dots,i=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function u(p){if(p===null)return"";if(a.isDate(p))return p.toISOString();if(!f&&a.isBlob(p))throw new m("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(p)||a.isTypedArray(p)?f&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function l(p,y,h){let g=p;if(p&&!h&&typeof p=="object"){if(a.endsWith(y,"{}"))y=r?y:y.slice(0,-2),p=JSON.stringify(p);else if(a.isArray(p)&&tn(p)||(a.isFileList(p)||a.endsWith(y,"[]"))&&(g=a.toArray(p)))return y=Ye(y),g.forEach(function(R,P){!(a.isUndefined(R)||R===null)&&t.append(i===!0?Te([y],P,o):i===null?y:y+"[]",u(R))}),!1}return ce(p)?!0:(t.append(Te(h,y,o),u(p)),!1)}const d=[],b=Object.assign(nn,{defaultVisitor:l,convertValue:u,isVisitable:ce});function E(p,y){if(!a.isUndefined(p)){if(d.indexOf(p)!==-1)throw Error("Circular reference detected in "+y.join("."));d.push(p),a.forEach(p,function(g,S){(!(a.isUndefined(g)||g===null)&&s.call(t,g,a.isString(S)?S.trim():S,y,b))===!0&&E(g,y?y.concat(S):[S])}),d.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return E(e),t}function Oe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function me(e,t){this._pairs=[],e&&Q(e,this,t)}const et=me.prototype;et.append=function(t,n){this._pairs.push([t,n])};et.toString=function(t){const n=t?function(r){return t.call(this,r,Oe)}:Oe;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function rn(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function tt(e,t,n){if(!t)return e;const r=n&&n.encode||rn,s=n&&n.serialize;let o;if(s?o=s(t,n):o=a.isURLSearchParams(t)?t.toString():new me(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class Ae{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}const nt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},sn=typeof URLSearchParams<"u"?URLSearchParams:me,on=typeof FormData<"u"?FormData:null,an=typeof Blob<"u"?Blob:null,cn={isBrowser:!0,classes:{URLSearchParams:sn,FormData:on,Blob:an},protocols:["http","https","file","blob","url","data"]},ye=typeof window<"u"&&typeof document<"u",ue=typeof navigator=="object"&&navigator||void 0,un=ye&&(!ue||["ReactNative","NativeScript","NS"].indexOf(ue.product)<0),ln=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",fn=ye&&window.location.href||"http://localhost",dn=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ye,hasStandardBrowserEnv:un,hasStandardBrowserWebWorkerEnv:ln,navigator:ue,origin:fn},Symbol.toStringTag,{value:"Module"})),O={...dn,...cn};function pn(e,t){return Q(e,new O.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return O.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function hn(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function mn(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}function rt(e){function t(n,r,s,o){let i=n[o++];if(i==="__proto__")return!0;const c=Number.isFinite(+i),f=o>=n.length;return i=!i&&a.isArray(s)?s.length:i,f?(a.hasOwnProp(s,i)?s[i]=[s[i],r]:s[i]=r,!c):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],o)&&a.isArray(s[i])&&(s[i]=mn(s[i])),!c)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,s)=>{t(hn(r),s,n,0)}),n}return null}function yn(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(0,JSON.stringify)(e)}const v={transitional:nt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s?JSON.stringify(rt(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t)||a.isReadableStream(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return pn(t,this.formSerializer).toString();if((c=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return Q(c?{"files[]":t}:t,f&&new f,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),yn(t)):t}],transformResponse:[function(t){const n=this.transitional||v.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(a.isResponse(t)||a.isReadableStream(t))return t;if(t&&a.isString(t)&&(r&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(c){if(i)throw c.name==="SyntaxError"?m.from(c,m.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{v.headers[e]={}});const wn=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),bn=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&wn[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Ce=Symbol("internals");function I(e){return e&&String(e).trim().toLowerCase()}function V(e){return e===!1||e==null?e:a.isArray(e)?e.map(V):String(e)}function gn(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const En=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function re(e,t,n,r,s){if(a.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function Sn(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Rn(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,o,i){return this[r].call(this,t,s,o,i)},configurable:!0})})}class A{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function o(c,f,u){const l=I(f);if(!l)throw new Error("header name must be a non-empty string");const d=a.findKey(s,l);(!d||s[d]===void 0||u===!0||u===void 0&&s[d]!==!1)&&(s[d||f]=V(c))}const i=(c,f)=>a.forEach(c,(u,l)=>o(u,l,f));if(a.isPlainObject(t)||t instanceof this.constructor)i(t,n);else if(a.isString(t)&&(t=t.trim())&&!En(t))i(bn(t),n);else if(a.isHeaders(t))for(const[c,f]of t.entries())o(f,c,r);else t!=null&&o(n,t,r);return this}get(t,n){if(t=I(t),t){const r=a.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return gn(s);if(a.isFunction(n))return n.call(this,s,r);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=I(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||re(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function o(i){if(i=I(i),i){const c=a.findKey(r,i);c&&(!n||re(r,r[c],c,n))&&(delete r[c],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!t||re(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const n=this,r={};return a.forEach(this,(s,o)=>{const i=a.findKey(r,o);if(i){n[i]=V(s),delete n[o];return}const c=t?Sn(o):String(o).trim();c!==o&&delete n[o],n[c]=V(s),r[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Ce]=this[Ce]={accessors:{}}).accessors,s=this.prototype;function o(i){const c=I(i);r[c]||(Rn(s,i),r[c]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}}A.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(A.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});a.freezeMethods(A);function se(e,t){const n=this||v,r=t||n,s=A.from(r.headers);let o=r.data;return a.forEach(e,function(c){o=c.call(n,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function st(e){return!!(e&&e.__CANCEL__)}function q(e,t,n){m.call(this,e??"canceled",m.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(q,m,{__CANCEL__:!0});function ot(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Tn(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function On(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(f){const u=Date.now(),l=r[o];i||(i=u),n[s]=f,r[s]=u;let d=o,b=0;for(;d!==s;)b+=n[d++],d=d%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),u-i<t)return;const E=l&&u-l;return E?Math.round(b*1e3/E):void 0}}function An(e,t){let n=0,r=1e3/t,s,o;const i=(u,l=Date.now())=>{n=l,s=null,o&&(clearTimeout(o),o=null),e.apply(null,u)};return[(...u)=>{const l=Date.now(),d=l-n;d>=r?i(u,l):(s=u,o||(o=setTimeout(()=>{o=null,i(s)},r-d)))},()=>s&&i(s)]}const W=(e,t,n=3)=>{let r=0;const s=On(50,250);return An(o=>{const i=o.loaded,c=o.lengthComputable?o.total:void 0,f=i-r,u=s(f),l=i<=c;r=i;const d={loaded:i,total:c,progress:c?i/c:void 0,bytes:f,rate:u||void 0,estimated:u&&c&&l?(c-i)/u:void 0,event:o,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(d)},n)},xe=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Pe=e=>(...t)=>a.asap(()=>e(...t)),Cn=O.hasStandardBrowserEnv?function(){const t=O.navigator&&/(msie|trident)/i.test(O.navigator.userAgent),n=document.createElement("a");let r;function s(o){let i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(i){const c=a.isString(i)?s(i):i;return c.protocol===r.protocol&&c.host===r.host}}():function(){return function(){return!0}}(),xn=O.hasStandardBrowserEnv?{write(e,t,n,r,s,o){const i=[e+"="+encodeURIComponent(t)];a.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),a.isString(r)&&i.push("path="+r),a.isString(s)&&i.push("domain="+s),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Pn(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Ln(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function it(e,t){return e&&!Pn(t)?Ln(e,t):t}const Le=e=>e instanceof A?{...e}:e;function k(e,t){t=t||{};const n={};function r(u,l,d){return a.isPlainObject(u)&&a.isPlainObject(l)?a.merge.call({caseless:d},u,l):a.isPlainObject(l)?a.merge({},l):a.isArray(l)?l.slice():l}function s(u,l,d){if(a.isUndefined(l)){if(!a.isUndefined(u))return r(void 0,u,d)}else return r(u,l,d)}function o(u,l){if(!a.isUndefined(l))return r(void 0,l)}function i(u,l){if(a.isUndefined(l)){if(!a.isUndefined(u))return r(void 0,u)}else return r(void 0,l)}function c(u,l,d){if(d in t)return r(u,l);if(d in e)return r(void 0,u)}const f={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c,headers:(u,l)=>s(Le(u),Le(l),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(l){const d=f[l]||s,b=d(e[l],t[l],l);a.isUndefined(b)&&d!==c||(n[l]=b)}),n}const at=e=>{const t=k({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:o,headers:i,auth:c}=t;t.headers=i=A.from(i),t.url=tt(it(t.baseURL,t.url),e.params,e.paramsSerializer),c&&i.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):"")));let f;if(a.isFormData(n)){if(O.hasStandardBrowserEnv||O.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if((f=i.getContentType())!==!1){const[u,...l]=f?f.split(";").map(d=>d.trim()).filter(Boolean):[];i.setContentType([u||"multipart/form-data",...l].join("; "))}}if(O.hasStandardBrowserEnv&&(r&&a.isFunction(r)&&(r=r(t)),r||r!==!1&&Cn(t.url))){const u=s&&o&&xn.read(o);u&&i.set(s,u)}return t},Nn=typeof XMLHttpRequest<"u",_n=Nn&&function(e){return new Promise(function(n,r){const s=at(e);let o=s.data;const i=A.from(s.headers).normalize();let{responseType:c,onUploadProgress:f,onDownloadProgress:u}=s,l,d,b,E,p;function y(){E&&E(),p&&p(),s.cancelToken&&s.cancelToken.unsubscribe(l),s.signal&&s.signal.removeEventListener("abort",l)}let h=new XMLHttpRequest;h.open(s.method.toUpperCase(),s.url,!0),h.timeout=s.timeout;function g(){if(!h)return;const R=A.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),T={data:!c||c==="text"||c==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:R,config:e,request:h};ot(function(B){n(B),y()},function(B){r(B),y()},T),h=null}"onloadend"in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0)||setTimeout(g)},h.onabort=function(){h&&(r(new m("Request aborted",m.ECONNABORTED,e,h)),h=null)},h.onerror=function(){r(new m("Network Error",m.ERR_NETWORK,e,h)),h=null},h.ontimeout=function(){let P=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const T=s.transitional||nt;s.timeoutErrorMessage&&(P=s.timeoutErrorMessage),r(new m(P,T.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,h)),h=null},o===void 0&&i.setContentType(null),"setRequestHeader"in h&&a.forEach(i.toJSON(),function(P,T){h.setRequestHeader(T,P)}),a.isUndefined(s.withCredentials)||(h.withCredentials=!!s.withCredentials),c&&c!=="json"&&(h.responseType=s.responseType),u&&([b,p]=W(u,!0),h.addEventListener("progress",b)),f&&h.upload&&([d,E]=W(f),h.upload.addEventListener("progress",d),h.upload.addEventListener("loadend",E)),(s.cancelToken||s.signal)&&(l=R=>{h&&(r(!R||R.type?new q(null,e,h):R),h.abort(),h=null)},s.cancelToken&&s.cancelToken.subscribe(l),s.signal&&(s.signal.aborted?l():s.signal.addEventListener("abort",l)));const S=Tn(s.url);if(S&&O.protocols.indexOf(S)===-1){r(new m("Unsupported protocol "+S+":",m.ERR_BAD_REQUEST,e));return}h.send(o||null)})},Fn=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const o=function(u){if(!s){s=!0,c();const l=u instanceof Error?u:this.reason;r.abort(l instanceof m?l:new q(l instanceof Error?l.message:l))}};let i=t&&setTimeout(()=>{i=null,o(new m(`timeout ${t} of ms exceeded`,m.ETIMEDOUT))},t);const c=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(o):u.removeEventListener("abort",o)}),e=null)};e.forEach(u=>u.addEventListener("abort",o));const{signal:f}=r;return f.unsubscribe=()=>a.asap(c),f}},Bn=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},Dn=async function*(e,t){for await(const n of Un(e))yield*Bn(n,t)},Un=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Ne=(e,t,n,r)=>{const s=Dn(e,t);let o=0,i,c=f=>{i||(i=!0,r&&r(f))};return new ReadableStream({async pull(f){try{const{done:u,value:l}=await s.next();if(u){c(),f.close();return}let d=l.byteLength;if(n){let b=o+=d;n(b)}f.enqueue(new Uint8Array(l))}catch(u){throw c(u),u}},cancel(f){return c(f),s.return()}},{highWaterMark:2})},Y=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",ct=Y&&typeof ReadableStream=="function",kn=Y&&(typeof TextEncoder=="function"?(e=>t=>e.encode(t))(new TextEncoder):async e=>new Uint8Array(await new Response(e).arrayBuffer())),ut=(e,...t)=>{try{return!!e(...t)}catch{return!1}},jn=ct&&ut(()=>{let e=!1;const t=new Request(O.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t}),_e=64*1024,le=ct&&ut(()=>a.isReadableStream(new Response("").body)),K={stream:le&&(e=>e.body)};Y&&(e=>{["text","arrayBuffer","blob","formData","stream"].forEach(t=>{!K[t]&&(K[t]=a.isFunction(e[t])?n=>n[t]():(n,r)=>{throw new m(`Response type '${t}' is not supported`,m.ERR_NOT_SUPPORT,r)})})})(new Response);const qn=async e=>{if(e==null)return 0;if(a.isBlob(e))return e.size;if(a.isSpecCompliantForm(e))return(await new Request(O.origin,{method:"POST",body:e}).arrayBuffer()).byteLength;if(a.isArrayBufferView(e)||a.isArrayBuffer(e))return e.byteLength;if(a.isURLSearchParams(e)&&(e=e+""),a.isString(e))return(await kn(e)).byteLength},In=async(e,t)=>{const n=a.toFiniteNumber(e.getContentLength());return n??qn(t)},Mn=Y&&(async e=>{let{url:t,method:n,data:r,signal:s,cancelToken:o,timeout:i,onDownloadProgress:c,onUploadProgress:f,responseType:u,headers:l,withCredentials:d="same-origin",fetchOptions:b}=at(e);u=u?(u+"").toLowerCase():"text";let E=Fn([s,o&&o.toAbortSignal()],i),p;const y=E&&E.unsubscribe&&(()=>{E.unsubscribe()});let h;try{if(f&&jn&&n!=="get"&&n!=="head"&&(h=await In(l,r))!==0){let T=new Request(t,{method:"POST",body:r,duplex:"half"}),_;if(a.isFormData(r)&&(_=T.headers.get("content-type"))&&l.setContentType(_),T.body){const[B,$]=xe(h,W(Pe(f)));r=Ne(T.body,_e,B,$)}}a.isString(d)||(d=d?"include":"omit");const g="credentials"in Request.prototype;p=new Request(t,{...b,signal:E,method:n.toUpperCase(),headers:l.normalize().toJSON(),body:r,duplex:"half",credentials:g?d:void 0});let S=await fetch(p);const R=le&&(u==="stream"||u==="response");if(le&&(c||R&&y)){const T={};["status","statusText","headers"].forEach(ge=>{T[ge]=S[ge]});const _=a.toFiniteNumber(S.headers.get("content-length")),[B,$]=c&&xe(_,W(Pe(c),!0))||[];S=new Response(Ne(S.body,_e,B,()=>{$&&$(),y&&y()}),T)}u=u||"text";let P=await K[a.findKey(K,u)||"text"](S,e);return!R&&y&&y(),await new Promise((T,_)=>{ot(T,_,{data:P,headers:A.from(S.headers),status:S.status,statusText:S.statusText,config:e,request:p})})}catch(g){throw y&&y(),g&&g.name==="TypeError"&&/fetch/i.test(g.message)?Object.assign(new m("Network Error",m.ERR_NETWORK,e,p),{cause:g.cause||g}):m.from(g,g&&g.code,e,p)}}),fe={http:en,xhr:_n,fetch:Mn};a.forEach(fe,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Fe=e=>`- ${e}`,Hn=e=>a.isFunction(e)||e===null||e===!1,lt={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;const s={};for(let o=0;o<t;o++){n=e[o];let i;if(r=n,!Hn(n)&&(r=fe[(i=String(n)).toLowerCase()],r===void 0))throw new m(`Unknown adapter '${i}'`);if(r)break;s[i||"#"+o]=r}if(!r){const o=Object.entries(s).map(([c,f])=>`adapter ${c} `+(f===!1?"is not supported by the environment":"is not available in the build"));let i=t?o.length>1?`since :
`+o.map(Fe).join(`
`):" "+Fe(o[0]):"as no adapter specified";throw new m("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r},adapters:fe};function oe(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new q(null,e)}function Be(e){return oe(e),e.headers=A.from(e.headers),e.data=se.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),lt.getAdapter(e.adapter||v.adapter)(e).then(function(r){return oe(e),r.data=se.call(e,e.transformResponse,r),r.headers=A.from(r.headers),r},function(r){return st(r)||(oe(e),r&&r.response&&(r.response.data=se.call(e,e.transformResponse,r.response),r.response.headers=A.from(r.response.headers))),Promise.reject(r)})}const ft="1.7.7",we={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{we[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const De={};we.transitional=function(t,n,r){function s(o,i){return"[Axios v"+ft+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,c)=>{if(t===!1)throw new m(s(i," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!De[i]&&(De[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,c):!0}};function vn(e,t,n){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const c=e[o],f=c===void 0||i(c,o,e);if(f!==!0)throw new m("option "+o+" must be "+f,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+o,m.ERR_BAD_OPTION)}}const de={assertOptions:vn,validators:we},F=de.validators;class U{constructor(t){this.defaults=t,this.interceptors={request:new Ae,response:new Ae}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s;Error.captureStackTrace?Error.captureStackTrace(s={}):s=new Error;const o=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=k(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&de.assertOptions(r,{silentJSONParsing:F.transitional(F.boolean),forcedJSONParsing:F.transitional(F.boolean),clarifyTimeoutError:F.transitional(F.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:de.assertOptions(s,{encode:F.function,serialize:F.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[n.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=A.concat(i,o);const c=[];let f=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(n)===!1||(f=f&&y.synchronous,c.unshift(y.fulfilled,y.rejected))});const u=[];this.interceptors.response.forEach(function(y){u.push(y.fulfilled,y.rejected)});let l,d=0,b;if(!f){const p=[Be.bind(this),void 0];for(p.unshift.apply(p,c),p.push.apply(p,u),b=p.length,l=Promise.resolve(n);d<b;)l=l.then(p[d++],p[d++]);return l}b=c.length;let E=n;for(d=0;d<b;){const p=c[d++],y=c[d++];try{E=p(E)}catch(h){y.call(this,h);break}}try{l=Be.call(this,E)}catch(p){return Promise.reject(p)}for(d=0,b=u.length;d<b;)l=l.then(u[d++],u[d++]);return l}getUri(t){t=k(this.defaults,t);const n=it(t.baseURL,t.url);return tt(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){U.prototype[t]=function(n,r){return this.request(k(r||{},{method:t,url:n,data:(r||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,c){return this.request(k(c||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}U.prototype[t]=n(),U.prototype[t+"Form"]=n(!0)});class be{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(c=>{r.subscribe(c),o=c}).then(s);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,c){r.reason||(r.reason=new q(o,i,c),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new be(function(s){t=s}),cancel:t}}}function zn(e){return function(n){return e.apply(null,n)}}function $n(e){return a.isObject(e)&&e.isAxiosError===!0}const pe={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(pe).forEach(([e,t])=>{pe[t]=e});function dt(e){const t=new U(e),n=ze(U.prototype.request,t);return a.extend(n,U.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return dt(k(e,s))},n}const w=dt(v);w.Axios=U;w.CanceledError=q;w.CancelToken=be;w.isCancel=st;w.VERSION=ft;w.toFormData=Q;w.AxiosError=m;w.Cancel=w.CanceledError;w.all=function(t){return Promise.all(t)};w.spread=zn;w.isAxiosError=$n;w.mergeConfig=k;w.AxiosHeaders=A;w.formToJSON=e=>rt(a.isHTMLForm(e)?new FormData(e):e);w.getAdapter=lt.getAdapter;w.HttpStatusCode=pe;w.default=w;const ee=()=>{const e=document.querySelector(".spinner--container");e&&e.parentElement.removeChild(e)},te=()=>{document.body.insertAdjacentHTML("afterbegin",'<div class="spinner--container"><div class="spinner-6"></div></div>')},z="/api/v1/",Jn=async({email:e,password:t})=>{var n;try{te(),(await w.post(`${z}users/login`,{email:e,password:t})).data.status==="success"&&(N("success","Login successfully"),window.setTimeout(()=>{location.assign("/")},500))}catch(r){N("error",(n=r.response)==null?void 0:n.data.message)}finally{ee()}},Vn=async()=>{try{const e=await w.get(`${z}users/logout`);(e==null?void 0:e.data.status)==="success"&&(N("success","Logout successfully"),location.reload(!0))}catch(e){console.log(e),N("error","error logging out.")}},pt=async(e,t)=>{var r;const n=t==="password"?"updatePassword":"updateMe";try{te();const s=await w.patch(`${z}users/${n}`,e);s.data.status==="success"&&N("success",t==="data"?s.data.message:"password updated successfully")}catch(s){N("error",(r=s.response)==null?void 0:r.data.message)}finally{ee()}},Wn=async e=>{var t;try{te();const n=await w.get(`${z}bookings/check-out/${e}`);n.data.status==="success"&&window.setTimeout(()=>{window.open(`${n.data.session.url}`,"_blank")},500)}catch(n){N("error",(t=n.response)==null?void 0:t.data.message)}finally{ee()}},Kn=async({email:e,password:t,passwordConfirm:n,name:r})=>{var s;try{te();const o=await w.post(`${z}users/signup`,{email:e,password:t,passwordConfirm:n,name:r});o.data.status==="success"&&(N("success",o.data.message),window.setTimeout(()=>{location.assign("/login")},1e3))}catch(o){N("error",(s=o.response)==null?void 0:s.data.message)}finally{ee()}},Ue=document.querySelector(".form-login"),ke=document.querySelector(".form-signup"),je=document.querySelector(".form-user-data"),qe=document.getElementById("map"),Ie=document.querySelector(".nav__el--logout"),Me=document.querySelector(".form--password-setting"),He=document.getElementById("book-tour");if(qe){const e=JSON.parse(qe.dataset.locations);ht(e)}Ie&&Ie.addEventListener("click",Vn);ke&&ke.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.target),n=t.get("email"),r=t.get("password"),s=t.get("fullname"),o=t.get("passwordConfirm");Kn({email:n,password:r,name:s,passwordConfirm:o})});Ue&&Ue.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.target),n=t.get("email"),r=t.get("password");Jn({email:n,password:r})});je&&je.addEventListener("submit",e=>{e.preventDefault();const t=new FormData;if(t.append("name",document.getElementById("name").value),t.append("email",document.getElementById("email").value),t.append("photo",document.getElementById("photo").files[0]),document.getElementById("photo").files[0]){const n=URL.createObjectURL(document.getElementById("photo").files[0]),r=document.querySelector(".form__user-photo");r.src=n,r.style.objectFit="cover",r.style.objectPosition="Center"}pt(t,"data")});Me&&Me.addEventListener("submit",async e=>{e.preventDefault();const t=e.target,n=new FormData(t),r=n.get("currentPassword"),s=n.get("password"),o=n.get("passwordConfirm");await pt({currentPassword:r,password:s,passwordConfirm:o},"password"),t.reset()});const ve=document.getElementById("photo"),ie=document.querySelector(".file-label");ve&&ie&&ve.addEventListener("change",()=>{ie.style.color="rgba(40, 180, 135, 0.85)",ie.style.fontWeight="bold"});He&&He.addEventListener("click",e=>{const{tourId:t}=e.target.dataset;Wn(t)});
