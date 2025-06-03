/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=h.fromAttribute(s,t.type)??this._$Ej?.get(e)??null,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t$2.trustedTypes,s$1=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$4="?"+h,n$2=`<${o$4}>`,r$2=document,l=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),b=y(2),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$4)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.3.0");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$3=s.litElementPolyfillSupport;o$3?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$2,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

function hasAction(config){return config!==undefined&&config.action!=="none";}

const DEFAULT_MIN=0;const DEFAULT_MAX=100;const MAX_ANGLE$1=270;const NUMBER_ENTITY_DOMAINS=["sensor","number","counter","input_number"];

const rgbToHex=rgb=>{if(!rgb)return "";return "#".concat(rgb.map(x=>x.toString(16).padStart(2,"0")).join(""));};const hexToRgb=hex=>{if(!hex.startsWith("#"))return hex;hex=hex.replace("#","");return [parseInt(hex.substring(0,2),16),parseInt(hex.substring(2,4),16),parseInt(hex.substring(4,6),16)];};

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant = x => () => x;

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o$1=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=o=>o??E;

const rotateVector=([[a,b],[c,d]],[x,y])=>[a*x+b*y,c*x+d*y];const createRotateMatrix=x=>[[Math.cos(x),-Math.sin(x)],[Math.sin(x),Math.cos(x)]];const addVector=([a1,a2],[b1,b2])=>[a1+b1,a2+b2];const toRadian=angle=>angle/180*Math.PI;const clamp=(value,min,max)=>Math.min(Math.max(value,min),max);const svgArc=options=>{const{x,y,r,start,end,rotate=0}=options;const cx=x;const cy=y;const rx=r;const ry=r;const t1=toRadian(start);const t2=toRadian(end);const delta=(t2-t1)%(2*Math.PI);const phi=toRadian(rotate);const rotMatrix=createRotateMatrix(phi);const[sX,sY]=addVector(rotateVector(rotMatrix,[rx*Math.cos(t1),ry*Math.sin(t1)]),[cx,cy]);const[eX,eY]=addVector(rotateVector(rotMatrix,[rx*Math.cos(t1+delta),ry*Math.sin(t1+delta)]),[cx,cy]);const fA=delta>Math.PI?1:0;const fS=delta>0?1:0;return ["M",sX,sY,"A",rx,ry,phi/(2*Math.PI)*360,fA,fS,eX,eY].join(" ");};const strokeDashArc=(from,to,min,max,radius)=>{const start=valueToPercentage(from,min,max);const end=valueToPercentage(to,min,max);const track=radius*2*Math.PI*MAX_ANGLE$1/360;const arc=Math.max((end-start)*track,0);const arcOffset=start*track-0.5;const strokeDasharray=`${arc} ${track-arc}`;const strokeDashOffset=`-${arcOffset}`;return [strokeDasharray,strokeDashOffset];};const getAngle=(value,min,max)=>{return valueToPercentage(isNaN(value)?min:value,min,max)*MAX_ANGLE$1;};const valueToPercentage=(value,min,max)=>{return (clamp(value,min,max)-min)/(max-min);};const currentDashArc=(value,min,max,radius,startFromZero)=>{if(startFromZero){return strokeDashArc(value>0?0:value,value>0?value:0,min,max,radius);}else {return strokeDashArc(min,value,min,max,radius);}};function renderPath(pathClass,d,strokeDash=undefined,style=undefined){return b`
    <path
      class="${pathClass}"
      d=${d}
      stroke-dasharray=${o(strokeDash?strokeDash[0]:undefined)}
      stroke-dashoffset=${o(strokeDash?strokeDash[1]:undefined)}
      style=${o(style)}
    />`;}function renderColorSegments(segments,min,max,radius,smooth_segments){if(smooth_segments){return renderSegmentsGradient(segments,min,max);}else {return renderSegments(segments,min,max,radius);}}function renderSegmentsGradient(segments,min,max){if(segments){let sortedSegments=[...segments].sort((a,b)=>Number(a.from)-Number(b.from));let gradient="";sortedSegments.map((segment,index)=>{const angle=getAngle(Number(segment.from),min,max)+45;const color=typeof segment.color==="object"?rgbToHex(segment.color):segment.color;gradient+=`${color} ${angle}deg${index!=sortedSegments.length-1?",":""}`;});return [b`
      <foreignObject x="-50" y="-50" width="100%" height="100%" transform="rotate(45)">
        <div style="width: 100px; height: 100px; background-image: conic-gradient(${gradient})">
        </div>
      </foreignObject>
    `];}return [];}function renderSegments(segments,min,max,radius){if(segments){let sortedSegments=[...segments].sort((a,b)=>Number(a.from)-Number(b.from));return [...sortedSegments].map((segment,index)=>{let roundEnd;const startAngle=index===0?0:getAngle(Number(segment.from),min,max);const angle=index===sortedSegments.length-1?MAX_ANGLE$1:getAngle(Number(sortedSegments[index+1].from),min,max);const color=typeof segment.color==="object"?rgbToHex(segment.color):segment.color;const segmentPath=svgArc({x:0,y:0,start:startAngle,end:angle,r:radius});if(index===0||index===sortedSegments.length-1){const endPath=svgArc({x:0,y:0,start:index===0?0:MAX_ANGLE$1,end:index===0?0:MAX_ANGLE$1,r:radius});roundEnd=renderPath("segment",endPath,undefined,o$1({"stroke":color,"stroke-linecap":"round"}));}return b`${roundEnd}
        ${renderPath("segment",segmentPath,undefined,o$1({"stroke":color}))}
      `;});}return [];}function computeSegments(numberState,segments,smooth_segments,element){if(segments){let sortedSegments=[...segments].sort((a,b)=>Number(a.from)-Number(b.from));for(let i=0;i<sortedSegments.length;i++){let segment=sortedSegments[i];if(segment&&(numberState>=Number(segment.from)||i===0)&&(i+1==(sortedSegments===null||sortedSegments===void 0?void 0:sortedSegments.length)||numberState<Number(sortedSegments[i+1].from))){if(smooth_segments){let color=typeof segment.color==="object"?rgbToHex(segment.color):segment.color;if(color.includes("var(--")&&element){color=getComputedStyle(element).getPropertyValue(color.replace(/(var\()|(\))/g,"").trim());}const nextSegment=sortedSegments[i+1]?sortedSegments[i+1]:segment;let nextColor=typeof nextSegment.color==="object"?rgbToHex(nextSegment.color):nextSegment.color;if(nextColor.includes("var(--")&&element){nextColor=getComputedStyle(element).getPropertyValue(nextColor.replace(/(var\()|(\))/g,"").trim());}return interpolateRgb(color,nextColor)(valueToPercentage(numberState,Number(segment.from),Number(nextSegment.from)));}else {const color=typeof segment.color==="object"?rgbToHex(segment.color):segment.color;return color;}}}}return undefined;}

function registerCustomCard(params){const windowWithCards=window;windowWithCards.customCards=windowWithCards.customCards||[];windowWithCards.customCards.push(Object.assign(Object.assign({},params),{preview:true,documentationURL:`https://github.com/selvalt7/modern-circular-gauge`}));}

const fireEvent=(node,type,detail,options)=>{options=options||{};detail=detail===null||detail===undefined?{}:detail;const event=new Event(type,{bubbles:options.bubbles===undefined?true:options.bubbles,cancelable:Boolean(options.cancelable),composed:options.composed===undefined?true:options.composed});event.detail=detail;node.dispatchEvent(event);return event;};

const handleAction=async(node,_hass,config,action)=>{fireEvent(node,"hass-action",{config,action});};

var NumberFormat;(function(NumberFormat){NumberFormat["language"]="language";NumberFormat["system"]="system";NumberFormat["comma_decimal"]="comma_decimal";NumberFormat["decimal_comma"]="decimal_comma";NumberFormat["space_comma"]="space_comma";NumberFormat["none"]="none";})(NumberFormat||(NumberFormat={}));var TimeFormat;(function(TimeFormat){TimeFormat["language"]="language";TimeFormat["system"]="system";TimeFormat["am_pm"]="12";TimeFormat["twenty_four"]="24";})(TimeFormat||(TimeFormat={}));var TimeZone;(function(TimeZone){TimeZone["local"]="local";TimeZone["server"]="server";})(TimeZone||(TimeZone={}));var DateFormat;(function(DateFormat){DateFormat["language"]="language";DateFormat["system"]="system";DateFormat["DMY"]="DMY";DateFormat["MDY"]="MDY";DateFormat["YMD"]="YMD";})(DateFormat||(DateFormat={}));var FirstWeekday;(function(FirstWeekday){FirstWeekday["language"]="language";FirstWeekday["monday"]="monday";FirstWeekday["tuesday"]="tuesday";FirstWeekday["wednesday"]="wednesday";FirstWeekday["thursday"]="thursday";FirstWeekday["friday"]="friday";FirstWeekday["saturday"]="saturday";FirstWeekday["sunday"]="sunday";})(FirstWeekday||(FirstWeekday={}));

const numberFormatToLocale=localeOptions=>{switch(localeOptions.number_format){case NumberFormat.comma_decimal:return ["en-US","en"];case NumberFormat.decimal_comma:return ["de","es","it"];case NumberFormat.space_comma:return ["fr","sv","cs"];case NumberFormat.system:return undefined;default:return localeOptions.language;}};const round=(value,precision=2)=>Math.round(value*10**precision)/10**precision;const formatNumber=(num,localeOptions,options)=>{const locale=localeOptions?numberFormatToLocale(localeOptions):undefined;Number.isNaN=Number.isNaN||function isNaN(input){return typeof input==="number"&&isNaN(input);};if((localeOptions===null||localeOptions===void 0?void 0:localeOptions.number_format)!==NumberFormat.none&&!Number.isNaN(Number(num))){return new Intl.NumberFormat(locale,getDefaultFormatOptions(num,options)).format(Number(num));}if(!Number.isNaN(Number(num))&&num!==""&&(localeOptions===null||localeOptions===void 0?void 0:localeOptions.number_format)===NumberFormat.none){return new Intl.NumberFormat("en-US",getDefaultFormatOptions(num,Object.assign(Object.assign({},options),{useGrouping:false}))).format(Number(num));}if(typeof num==="string"){return num;}return `${round(num,options===null||options===void 0?void 0:options.maximumFractionDigits).toString()}${(options===null||options===void 0?void 0:options.style)==="currency"?` ${options.currency}`:""}`;};const getNumberFormatOptions=(entityState,entity)=>{var _a;const precision=entity===null||entity===void 0?void 0:entity.display_precision;if(precision!=null){return {maximumFractionDigits:precision,minimumFractionDigits:precision};}if(Number.isInteger(Number((_a=entityState===null||entityState===void 0?void 0:entityState.attributes)===null||_a===void 0?void 0:_a.step))&&Number.isInteger(Number(entityState===null||entityState===void 0?void 0:entityState.state))){return {maximumFractionDigits:0};}return undefined;};const getDefaultFormatOptions=(num,options)=>{const defaultOptions=Object.assign({maximumFractionDigits:2},options);if(typeof num!=="string"){return defaultOptions;}if(!options||options.minimumFractionDigits===undefined&&options.maximumFractionDigits===undefined){const digits=num.indexOf(".")>-1?num.split(".")[1].length:0;defaultOptions.minimumFractionDigits=digits;defaultOptions.maximumFractionDigits=digits;}return defaultOptions;};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return T}});

const getActionHandler=()=>{const body=document.body;if(body.querySelector("action-handler")){return body.querySelector("action-handler");}const actionhandler=document.createElement("action-handler");body.appendChild(actionhandler);return actionhandler;};const actionHandlerBind=(element,options)=>{const actionhandler=getActionHandler();if(!actionhandler){return;}actionhandler.bind(element,options);};const actionHandler=e$1(class extends i$1{update(part,[options]){actionHandlerBind(part.element,options);return T;}render(_options){}});

const subscribeRenderTemplate=(conn,onChange,params)=>conn.subscribeMessage(msg=>onChange(msg),Object.assign({type:"render_template"},params));

const isTemplateRegex=/{%|{{/;const isTemplate=value=>isTemplateRegex.test(value);

// Material Design Icons v7.4.47
var mdiAlertCircle = "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
var mdiHelp = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z";
var mdiNumeric2BoxOutline = "M15,15H11V13H13A2,2 0 0,0 15,11V9C15,7.89 14.1,7 13,7H9V9H13V11H11A2,2 0 0,0 9,13V17H15M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z";
var mdiNumeric3BoxOutline = "M15,15V13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 15,10.5V9C15,7.89 14.1,7 13,7H9V9H13V11H11V13H13V15H9V17H13A2,2 0 0,0 15,15M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z";
var mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
var mdiSegment = "M21,8H3V6H21M9,13H21V11H9M9,18H21V16H9";

const ROTATE_ANGLE$1=360-MAX_ANGLE$1/2-90;const RADIUS$1=47;const INNER_RADIUS=42;const TERTIARY_RADIUS=37;const path$1=svgArc({x:0,y:0,start:0,end:MAX_ANGLE$1,r:RADIUS$1});const innerPath=svgArc({x:0,y:0,start:0,end:MAX_ANGLE$1,r:INNER_RADIUS});const TERTIARY_PATH=svgArc({x:0,y:0,start:0,end:MAX_ANGLE$1,r:TERTIARY_RADIUS});registerCustomCard({type:"modern-circular-gauge",name:"Modern Cicular Gauge",description:"Modern circular gauge"});let ModernCircularGauge=class ModernCircularGauge extends i$2{constructor(){super(...arguments);this._hasSecondary=false;this._templateResults={};this._unsubRenderTemplates=new Map();}static async getConfigElement(){await Promise.resolve().then(function () { return mcgEditor; });return document.createElement("modern-circular-gauge-editor");}static async getStubConfig(hass){const entities=Object.keys(hass.states);const numbers=entities.filter(e=>NUMBER_ENTITY_DOMAINS.includes(e.split(".")[0]));return {type:"custom:modern-circular-gauge",entity:numbers[0]};}setConfig(config){if(!config.entity){throw new Error("Entity must be specified");}let secondary=config.secondary;if(secondary===undefined&&config.secondary_entity!==undefined){secondary=config.secondary_entity;}if(typeof secondary==="object"){const template=secondary.template||"";if(template.length>0){secondary=template;}let secondaryGaugeForegroundStyle=secondary.gauge_foreground_style;if(!secondaryGaugeForegroundStyle){if(secondary.gauge_width!==undefined){secondaryGaugeForegroundStyle={width:secondary.gauge_width};secondary=Object.assign(Object.assign({},secondary),{gauge_foreground_style:secondaryGaugeForegroundStyle});}}}let gaugeForegroundStyle=config.gauge_foreground_style;if(!gaugeForegroundStyle){if(config.gauge_width!==undefined){gaugeForegroundStyle={width:config.gauge_width};config=Object.assign(Object.assign({},config),{gauge_foreground_style:gaugeForegroundStyle});}}this._config=Object.assign(Object.assign({min:DEFAULT_MIN,max:DEFAULT_MAX,show_header:true,show_state:true},config),{secondary:secondary,secondary_entity:undefined});}connectedCallback(){super.connectedCallback();this._tryConnect();}disconnectedCallback(){super.disconnectedCallback();this._tryDisconnect();}updated(changedProps){super.updated(changedProps);if(!this._config||!this.hass){return;}this._tryConnect();}_hasCardAction(){var _a,_b,_c,_d;return !((_a=this._config)===null||_a===void 0?void 0:_a.tap_action)||hasAction((_b=this._config)===null||_b===void 0?void 0:_b.tap_action)||hasAction((_c=this._config)===null||_c===void 0?void 0:_c.hold_action)||hasAction((_d=this._config)===null||_d===void 0?void 0:_d.double_tap_action);}render(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_20,_21,_22,_23,_24,_25,_26,_27,_28,_29,_30,_31,_32,_33,_34,_35,_36,_37,_38,_39,_40,_41,_42,_43,_44,_45,_46,_47,_48,_49,_50,_51;if(!this.hass||!this._config){return x``;}const stateObj=this.hass.states[this._config.entity];const templatedState=(_b=(_a=this._templateResults)===null||_a===void 0?void 0:_a.entity)===null||_b===void 0?void 0:_b.result;if(!stateObj&&templatedState===undefined){if(isTemplate(this._config.entity)){return this._renderWarning();}else {return this._renderWarning(this._config.entity,"",undefined,mdiHelp);}}const numberState=Number(templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state);const icon=(_e=(_d=(_c=this._templateResults)===null||_c===void 0?void 0:_c.icon)===null||_d===void 0?void 0:_d.result)!==null&&_e!==void 0?_e:this._config.icon;if((stateObj===null||stateObj===void 0?void 0:stateObj.state)==="unavailable"){return this._renderWarning((_k=(_j=(_h=(_g=(_f=this._templateResults)===null||_f===void 0?void 0:_f.name)===null||_g===void 0?void 0:_g.result)!==null&&_h!==void 0?_h:isTemplate(String(this._config.name))?"":this._config.name)!==null&&_j!==void 0?_j:stateObj.attributes.friendly_name)!==null&&_k!==void 0?_k:'',this.hass.localize("state.default.unavailable"),stateObj,icon);}if(isNaN(numberState)){return this._renderWarning((_q=(_p=(_o=(_m=(_l=this._templateResults)===null||_l===void 0?void 0:_l.name)===null||_m===void 0?void 0:_m.result)!==null&&_o!==void 0?_o:isTemplate(String(this._config.name))?"":this._config.name)!==null&&_p!==void 0?_p:stateObj.attributes.friendly_name)!==null&&_q!==void 0?_q:'',"NaN",stateObj,icon);}const attributes=(_r=stateObj===null||stateObj===void 0?void 0:stateObj.attributes)!==null&&_r!==void 0?_r:undefined;const unit=(_s=this._config.unit)!==null&&_s!==void 0?_s:stateObj===null||stateObj===void 0?void 0:stateObj.attributes.unit_of_measurement;const min=Number((_v=(_u=(_t=this._templateResults)===null||_t===void 0?void 0:_t.min)===null||_u===void 0?void 0:_u.result)!==null&&_v!==void 0?_v:this._config.min)||DEFAULT_MIN;const max=Number((_y=(_x=(_w=this._templateResults)===null||_w===void 0?void 0:_w.max)===null||_x===void 0?void 0:_x.result)!==null&&_y!==void 0?_y:this._config.max)||DEFAULT_MAX;const current=this._config.needle?undefined:currentDashArc(numberState,min,max,RADIUS$1,this._config.start_from_zero);const needle=this._config.needle?strokeDashArc(numberState,numberState,min,max,RADIUS$1):undefined;const state=templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state;const stateOverride=(_1=(_0=(_z=this._templateResults)===null||_z===void 0?void 0:_z.stateText)===null||_0===void 0?void 0:_0.result)!==null&&_1!==void 0?_1:isTemplate(String(this._config.state_text))?"":this._config.state_text;const entityState=(_2=stateOverride!==null&&stateOverride!==void 0?stateOverride:formatNumber(state,this.hass.locale,getNumberFormatOptions({state,attributes},this.hass.entities[stateObj===null||stateObj===void 0?void 0:stateObj.entity_id])))!==null&&_2!==void 0?_2:templatedState;const iconCenter=!((_3=this._config.show_state)!==null&&_3!==void 0?_3:false)&&((_4=this._config.show_icon)!==null&&_4!==void 0?_4:true);const segments=(_7=(_6=(_5=this._templateResults)===null||_5===void 0?void 0:_5.segments)===null||_6===void 0?void 0:_6.result)!==null&&_7!==void 0?_7:this._config.segments;const gaugeBackgroundColor=(_8=this._config.gauge_background_style)===null||_8===void 0?void 0:_8.color;const gaugeForegroundColor=(_9=this._config.gauge_foreground_style)===null||_9===void 0?void 0:_9.color;return x`
    <ha-card
      class="${e({"flex-column-reverse":this._config.header_position=="top","action":this._hasCardAction(),"icon-center":iconCenter})}"
      @action=${this._handleAction}
      .actionHandler=${actionHandler({hasHold:hasAction(this._config.hold_action),hasDoubleClick:hasAction(this._config.double_tap_action)})}
      tabindex=${o(!this._config.tap_action||hasAction(this._config.tap_action)?"0":undefined)}
    >
      ${this._config.show_header?x`
      <div class="header" style=${o$1({"--gauge-header-font-size":this._config.header_font_size?`${this._config.header_font_size}px`:undefined,"transform":this._config.header_offset?`translate(0, ${this._config.header_offset}px)`:undefined})}>
        <p class="name">
          ${(_14=(_13=(_12=(_11=(_10=this._templateResults)===null||_10===void 0?void 0:_10.name)===null||_11===void 0?void 0:_11.result)!==null&&_12!==void 0?_12:isTemplate(String(this._config.name))?"":this._config.name)!==null&&_13!==void 0?_13:stateObj.attributes.friendly_name)!==null&&_14!==void 0?_14:''}
        </p>
      </div>
      `:E}
      <div class="container"
        style=${o$1({"--gauge-color":gaugeForegroundColor&&gaugeForegroundColor!="adaptive"?gaugeForegroundColor:computeSegments(numberState,segments,this._config.smooth_segments,this)})}
      >
        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid"
          overflow="visible"
          style=${o$1({"--gauge-stroke-width":((_15=this._config.gauge_foreground_style)===null||_15===void 0?void 0:_15.width)?`${(_16=this._config.gauge_foreground_style)===null||_16===void 0?void 0:_16.width}px`:undefined,"--inner-gauge-stroke-width":typeof this._config.secondary=="object"?((_18=(_17=this._config.secondary)===null||_17===void 0?void 0:_17.gauge_foreground_style)===null||_18===void 0?void 0:_18.width)?`${(_20=(_19=this._config.secondary)===null||_19===void 0?void 0:_19.gauge_foreground_style)===null||_20===void 0?void 0:_20.width}px`:undefined:undefined})}
          class=${e({"dual-gauge":typeof this._config.secondary!="string"&&((_21=this._config.secondary)===null||_21===void 0?void 0:_21.show_gauge)=="inner"})}
        >
          <g transform="rotate(${ROTATE_ANGLE$1})">
            <defs>
              <mask id="gradient-path">
                ${renderPath("arc",path$1,undefined,o$1({"stroke":"white","stroke-width":((_22=this._config.gauge_background_style)===null||_22===void 0?void 0:_22.width)?`${(_23=this._config.gauge_background_style)===null||_23===void 0?void 0:_23.width}px`:undefined}))}
              </mask>
              <mask id="gradient-current-path">
                ${current?renderPath("arc current",path$1,current,o$1({"stroke":"white","visibility":numberState<=min&&min>=0?"hidden":"visible"})):E}
              </mask>
              <mask id="gradient-inner-path">
                ${renderPath("arc",innerPath,undefined,o$1({"stroke":"white","stroke-width":typeof this._config.secondary=="object"?((_25=(_24=this._config.secondary)===null||_24===void 0?void 0:_24.gauge_background_style)===null||_25===void 0?void 0:_25.width)?`${(_27=(_26=this._config.secondary)===null||_26===void 0?void 0:_26.gauge_background_style)===null||_27===void 0?void 0:_27.width}px`:'var(--inner-gauge-stroke-width)':'var(--inner-gauge-stroke-width)'}))}
              </mask>
              <mask id="gradient-tertiary-path">
                ${renderPath("arc",TERTIARY_PATH,undefined,o$1({"stroke":"white","stroke-width":typeof this._config.tertiary=="object"?((_29=(_28=this._config.tertiary)===null||_28===void 0?void 0:_28.gauge_background_style)===null||_29===void 0?void 0:_29.width)?`${(_31=(_30=this._config.tertiary)===null||_30===void 0?void 0:_30.gauge_background_style)===null||_31===void 0?void 0:_31.width}px`:'var(--inner-gauge-stroke-width)':'var(--inner-gauge-stroke-width)'}))}
              </mask>
            </defs>
            <g class="background" style=${o$1({"opacity":(_32=this._config.gauge_background_style)===null||_32===void 0?void 0:_32.opacity,"--gauge-stroke-width":((_33=this._config.gauge_background_style)===null||_33===void 0?void 0:_33.width)?`${(_34=this._config.gauge_background_style)===null||_34===void 0?void 0:_34.width}px`:undefined})}>
              ${renderPath("arc clear",path$1,undefined,o$1({"stroke":gaugeBackgroundColor&&gaugeBackgroundColor!="adaptive"?gaugeBackgroundColor:undefined}))}
              ${this._config.segments&&(needle||((_35=this._config.gauge_background_style)===null||_35===void 0?void 0:_35.color)=="adaptive")?b`
              <g class="segments" mask=${o(this._config.smooth_segments?"url(#gradient-path)":undefined)}>
                ${renderColorSegments(segments,min,max,RADIUS$1,(_36=this._config)===null||_36===void 0?void 0:_36.smooth_segments)}
              </g>`:E}
            </g>
            ${current?gaugeForegroundColor=="adaptive"?b`
              <g class="foreground-segments" mask="url(#gradient-current-path)" style=${o$1({"opacity":(_37=this._config.gauge_foreground_style)===null||_37===void 0?void 0:_37.opacity})}>
                ${renderColorSegments(segments,min,max,RADIUS$1,(_38=this._config)===null||_38===void 0?void 0:_38.smooth_segments)}
              </g>
              `:renderPath("arc current",path$1,current,o$1({"visibility":numberState<=min&&min>=0?"hidden":"visible","opacity":(_39=this._config.gauge_foreground_style)===null||_39===void 0?void 0:_39.opacity})):E}
            ${typeof this._config.secondary!="string"?((_40=this._config.secondary)===null||_40===void 0?void 0:_40.show_gauge)=="outter"?this._renderOutterSecondary():((_41=this._config.secondary)===null||_41===void 0?void 0:_41.show_gauge)=="inner"?this._renderInnerGauge():E:E}
            ${typeof this._config.tertiary!="string"?((_42=this._config.tertiary)===null||_42===void 0?void 0:_42.show_gauge)=="inner"||((_43=this._config.tertiary)===null||_43===void 0?void 0:_43.show_gauge)=="outter"?this._renderTertiaryRing():E:E}
            ${needle?b`
              ${renderPath("needle-border",path$1,needle)}
              ${renderPath("needle",path$1,needle)}
              `:E}
          </g>
        </svg>
        <svg class="state" overflow="visible" viewBox="-50 -50 100 100">
          ${this._config.show_state?b`
          <text
            x="0" y="0" 
            class="value ${e({"dual-state":typeof this._config.secondary!="string"&&((_44=this._config.secondary)===null||_44===void 0?void 0:_44.state_size)=="big","adaptive":!!this._config.adaptive_state_color})}" 
            style=${o$1({"font-size":this._calcStateSize(entityState)})}
            dy=${typeof this._config.secondary!="string"&&((_45=this._config.secondary)===null||_45===void 0?void 0:_45.state_size)=="big"?-14:0}
          >
            ${this._getSegmentLabel(numberState,segments)?this._getSegmentLabel(numberState,segments):b`
              ${entityState}
              ${((_46=this._config.show_unit)!==null&&_46!==void 0?_46:true)?b`<tspan class="unit" dx="-4" dy="-6">${unit}</tspan>`:E}
            `}
          </text>
          ${typeof this._config.secondary!="string"&&((_47=this._config.secondary)===null||_47===void 0?void 0:_47.state_size)=="big"?b`
          <text
            class="state-label"
            dy="1"
          >
            ${this._config.label}
          </text>`:E}
          `:E}
          ${this._renderSecondary()}
          ${this._renderTertiary()}
        </svg>
        ${((_48=this._config.show_icon)!==null&&_48!==void 0?_48:true)?x`
        <div class="icon-container">
          <div class="icon-wrapper">
            <ha-state-icon
              class=${e({"adaptive":!!this._config.adaptive_icon_color,"big":!this._hasSecondary})}
              .hass=${this.hass}
              .stateObj=${stateObj}
              .icon=${(_51=(_50=(_49=this._templateResults)===null||_49===void 0?void 0:_49.icon)===null||_50===void 0?void 0:_50.result)!==null&&_51!==void 0?_51:this._config.icon}
            ></ha-state-icon>
          </div>
        </div>
        `:E}
      </div> 
    </ha-card>
    `;}_renderWarning(headerText,stateText,stateObj,icon){var _a,_b,_c,_d,_e,_f,_g;const iconCenter=(stateText===null||stateText===void 0?void 0:stateText.length)==0;return x`
      <ha-card
      class="${e({"flex-column-reverse":((_a=this._config)===null||_a===void 0?void 0:_a.header_position)=="bottom","action":this._hasCardAction()&&stateObj!==undefined})}"
      @action=${o(stateObj?this._handleAction:undefined)}
      .actionHandler=${actionHandler({hasHold:hasAction((_b=this._config)===null||_b===void 0?void 0:_b.hold_action),hasDoubleClick:hasAction((_c=this._config)===null||_c===void 0?void 0:_c.double_tap_action)})}
      tabindex=${o(!((_d=this._config)===null||_d===void 0?void 0:_d.tap_action)||hasAction((_e=this._config)===null||_e===void 0?void 0:_e.tap_action)?"0":undefined)}
      >
      <div class="header" style=${o$1({"--gauge-header-font-size":((_f=this._config)===null||_f===void 0?void 0:_f.header_font_size)?`${this._config.header_font_size}px`:undefined,"transform":((_g=this._config)===null||_g===void 0?void 0:_g.header_offset)?`translate(0, ${this._config.header_offset}px)`:undefined})}>
        <p class="name">
          ${headerText}
        </p>
      </div>
      <div class=${e({"icon-center":iconCenter,"container":true})}>
        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid"
          overflow="visible"
        >
          <g transform="rotate(${ROTATE_ANGLE$1})">
            ${renderPath("arc clear",path$1)}
          </g>
        </svg>
        <svg class="state" overflow="visible" viewBox="-50 ${iconCenter?-55:-50} 100 100">
          <text
            x="0" y="0" 
            class="value" 
            style=${o$1({"font-size":this._calcStateSize(stateText!==null&&stateText!==void 0?stateText:"")})}
          >
            ${stateText}
          </text>
        </svg>
        <div class="icon-container">
          <div class="icon-wrapper">
            ${stateObj?x`
              <ha-state-icon
                class="big warning-icon"
                .hass=${this.hass}
                .stateObj=${stateObj}
                .icon=${icon}
              ></ha-state-icon>
              `:x`<ha-svg-icon class="warning-icon" .path=${icon}></ha-svg-icon>`}
          </div>
        </div>
      </ha-card>
      `;}_calcStateSize(state,initialStateSize){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p;let initialSize=(_b=initialStateSize!==null&&initialStateSize!==void 0?initialStateSize:(_a=this._config)===null||_a===void 0?void 0:_a.state_font_size)!==null&&_b!==void 0?_b:24;if(typeof((_c=this._config)===null||_c===void 0?void 0:_c.secondary)!="string"){initialSize-=((_e=(_d=this._config)===null||_d===void 0?void 0:_d.secondary)===null||_e===void 0?void 0:_e.show_gauge)=="inner"?2:0;initialSize-=((_g=(_f=this._config)===null||_f===void 0?void 0:_f.secondary)===null||_g===void 0?void 0:_g.state_size)=="big"?3:0;}if(typeof((_h=this._config)===null||_h===void 0?void 0:_h.tertiary)!="string"){initialSize-=((_k=(_j=this._config)===null||_j===void 0?void 0:_j.tertiary)===null||_k===void 0?void 0:_k.show_gauge)=="inner"?2:0;}if(state.length>=((_m=(_l=this._config)===null||_l===void 0?void 0:_l.state_scaling_limit)!==null&&_m!==void 0?_m:7)){return `${initialSize-(state.length-4)*((_p=(_o=this._config)===null||_o===void 0?void 0:_o.state_scaling_multiplier)!==null&&_p!==void 0?_p:1)}px`;}return `${initialSize}px`;}_renderGaugeRing(gaugeName,state,min,max,d,radius,needle,segments,foregroundStyle,backgroundStyle){var _a,_b,_c,_d,_e;const numberState=Number(state);if(state==="unavailable"){return b`
      <g class="${gaugeName}">
        ${renderPath("arc clear",d)}
      </g>
      `;}if(isNaN(numberState)){return b``;}const current=needle?undefined:currentDashArc(numberState,min,max,radius,(_a=this._config)===null||_a===void 0?void 0:_a.start_from_zero);const needleArc=needle?strokeDashArc(numberState,numberState,min,max,radius):undefined;return b`
    <g class="${gaugeName}"
      style=${o$1({"--gauge-color":(foregroundStyle===null||foregroundStyle===void 0?void 0:foregroundStyle.color)&&foregroundStyle.color!="adaptive"?foregroundStyle.color:computeSegments(numberState,segments,(_b=this._config)===null||_b===void 0?void 0:_b.smooth_segments,this)})}
    >
      <mask id="gradient-current-${gaugeName}-path">
        ${current?renderPath("arc current",d,current,o$1({"stroke":"white","visibility":numberState<=min&&min>=0?"hidden":"visible"})):E}
      </mask>
      <g class="background" style=${o$1({"opacity":backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.opacity,"--gauge-stroke-width":(backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.width)?`${backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.width}px`:undefined})}
      >
        ${renderPath("arc clear",d,undefined,o$1({"stroke":(backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.color)&&(backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.color)!="adaptive"?backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.color:undefined}))}
        ${segments&&(needleArc||(backgroundStyle===null||backgroundStyle===void 0?void 0:backgroundStyle.color)=="adaptive")?b`
        <g class="segments" mask=${o(((_c=this._config)===null||_c===void 0?void 0:_c.smooth_segments)?`url(#gradient-${gaugeName}-path)`:undefined)}>
          ${renderColorSegments(segments,min,max,radius,(_d=this._config)===null||_d===void 0?void 0:_d.smooth_segments)}
        </g>`:E}
      </g>
      ${current?(foregroundStyle===null||foregroundStyle===void 0?void 0:foregroundStyle.color)=="adaptive"&&segments?b`
        <g class="foreground-segments" mask="url(#gradient-current-${gaugeName}-path)" style=${o$1({"opacity":foregroundStyle===null||foregroundStyle===void 0?void 0:foregroundStyle.opacity})}>
          ${renderColorSegments(segments,min,max,radius,(_e=this._config)===null||_e===void 0?void 0:_e.smooth_segments)}
        </g>
      `:renderPath("arc current",d,current,o$1({"visibility":numberState<=min&&min>=0?"hidden":"visible","opacity":foregroundStyle===null||foregroundStyle===void 0?void 0:foregroundStyle.opacity})):E}
      ${needleArc?b`
        ${renderPath("needle-border",d,needleArc)}
        ${renderPath("needle",d,needleArc)}
        `:E}
    </g>
    `;}_renderTertiaryRing(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_0,_1,_2,_3;const tertiaryObj=(_a=this._config)===null||_a===void 0?void 0:_a.tertiary;const stateObj=this.hass.states[tertiaryObj.entity||""];const templatedState=(_c=(_b=this._templateResults)===null||_b===void 0?void 0:_b.tertiaryEntity)===null||_c===void 0?void 0:_c.result;if(!tertiaryObj){return b``;}if(tertiaryObj.show_gauge=="inner"){if(!stateObj&&templatedState===undefined){return b`
        <g class="tertiary">
          ${renderPath("arc clear",TERTIARY_PATH)}
        </g>
        `;}const min=Number((_f=(_e=(_d=this._templateResults)===null||_d===void 0?void 0:_d.tertiaryMin)===null||_e===void 0?void 0:_e.result)!==null&&_f!==void 0?_f:tertiaryObj.min)||DEFAULT_MIN;const max=Number((_j=(_h=(_g=this._templateResults)===null||_g===void 0?void 0:_g.tertiaryMax)===null||_h===void 0?void 0:_h.result)!==null&&_j!==void 0?_j:tertiaryObj.max)||DEFAULT_MAX;const segments=(_l=(_k=this._templateResults)===null||_k===void 0?void 0:_k.tertiarySegments)!==null&&_l!==void 0?_l:tertiaryObj.segments;return this._renderGaugeRing("tertiary",templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state,min,max,TERTIARY_PATH,TERTIARY_RADIUS,tertiaryObj.needle,segments,tertiaryObj.gauge_foreground_style,tertiaryObj.gauge_background_style);}else {if(!stateObj&&templatedState===undefined){return b``;}const numberState=Number(templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state);if((stateObj===null||stateObj===void 0?void 0:stateObj.state)==="unavailable"&&templatedState){return b``;}if(isNaN(numberState)){return b``;}const min=Number((_p=(_o=(_m=this._templateResults)===null||_m===void 0?void 0:_m.min)===null||_o===void 0?void 0:_o.result)!==null&&_p!==void 0?_p:(_q=this._config)===null||_q===void 0?void 0:_q.min)||DEFAULT_MIN;const max=Number((_t=(_s=(_r=this._templateResults)===null||_r===void 0?void 0:_r.max)===null||_s===void 0?void 0:_s.result)!==null&&_t!==void 0?_t:(_u=this._config)===null||_u===void 0?void 0:_u.max)||DEFAULT_MAX;const current=strokeDashArc(numberState,numberState,min,max,RADIUS$1);return b`
      ${!((_v=tertiaryObj.gauge_foreground_style)===null||_v===void 0?void 0:_v.color)?renderPath("dot border tertiary",path$1,current,o$1({"opacity":(_x=(_w=tertiaryObj.gauge_foreground_style)===null||_w===void 0?void 0:_w.opacity)!==null&&_x!==void 0?_x:1,"stroke":(_y=tertiaryObj.gauge_foreground_style)===null||_y===void 0?void 0:_y.color,"stroke-width":(_z=tertiaryObj.gauge_foreground_style)===null||_z===void 0?void 0:_z.width})):E}
      ${renderPath("dot",path$1,current,o$1({"opacity":(_1=(_0=tertiaryObj.gauge_foreground_style)===null||_0===void 0?void 0:_0.opacity)!==null&&_1!==void 0?_1:1,"stroke":(_2=tertiaryObj.gauge_foreground_style)===null||_2===void 0?void 0:_2.color,"stroke-width":(_3=tertiaryObj.gauge_foreground_style)===null||_3===void 0?void 0:_3.width}))}
      `;}}_renderInnerGauge(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l;const secondaryObj=(_a=this._config)===null||_a===void 0?void 0:_a.secondary;const stateObj=this.hass.states[secondaryObj.entity||""];const templatedState=(_c=(_b=this._templateResults)===null||_b===void 0?void 0:_b.secondaryEntity)===null||_c===void 0?void 0:_c.result;if((!stateObj||!secondaryObj)&&templatedState===undefined){return b`
      <g class="inner">
        ${renderPath("arc clear",innerPath)}
      </g>
      `;}const min=Number((_f=(_e=(_d=this._templateResults)===null||_d===void 0?void 0:_d.secondaryMin)===null||_e===void 0?void 0:_e.result)!==null&&_f!==void 0?_f:secondaryObj.min)||DEFAULT_MIN;const max=Number((_j=(_h=(_g=this._templateResults)===null||_g===void 0?void 0:_g.secondaryMax)===null||_h===void 0?void 0:_h.result)!==null&&_j!==void 0?_j:secondaryObj.max)||DEFAULT_MAX;const segments=(_l=(_k=this._templateResults)===null||_k===void 0?void 0:_k.secondarySegments)!==null&&_l!==void 0?_l:secondaryObj.segments;return this._renderGaugeRing("inner",templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state,min,max,innerPath,INNER_RADIUS,secondaryObj.needle,segments,secondaryObj.gauge_foreground_style,secondaryObj.gauge_background_style);}_renderOutterSecondary(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p,_q,_r,_s,_t,_u;const secondaryObj=(_a=this._config)===null||_a===void 0?void 0:_a.secondary;const stateObj=this.hass.states[secondaryObj.entity||""];const templatedState=(_c=(_b=this._templateResults)===null||_b===void 0?void 0:_b.secondaryEntity)===null||_c===void 0?void 0:_c.result;if(!stateObj&&templatedState===undefined){return b``;}const numberState=Number(templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state);if((stateObj===null||stateObj===void 0?void 0:stateObj.state)==="unavailable"&&templatedState){return b``;}if(isNaN(numberState)){return b``;}const min=Number((_f=(_e=(_d=this._templateResults)===null||_d===void 0?void 0:_d.min)===null||_e===void 0?void 0:_e.result)!==null&&_f!==void 0?_f:(_g=this._config)===null||_g===void 0?void 0:_g.min)||DEFAULT_MIN;const max=Number((_k=(_j=(_h=this._templateResults)===null||_h===void 0?void 0:_h.max)===null||_j===void 0?void 0:_j.result)!==null&&_k!==void 0?_k:(_l=this._config)===null||_l===void 0?void 0:_l.max)||DEFAULT_MAX;const current=strokeDashArc(numberState,numberState,min,max,RADIUS$1);return b`
    ${!((_m=secondaryObj.gauge_foreground_style)===null||_m===void 0?void 0:_m.color)?renderPath("dot border secondary",path$1,current,o$1({"opacity":(_p=(_o=secondaryObj.gauge_foreground_style)===null||_o===void 0?void 0:_o.opacity)!==null&&_p!==void 0?_p:1,"stroke-width":(_q=secondaryObj.gauge_foreground_style)===null||_q===void 0?void 0:_q.width})):E}
    ${renderPath("dot",path$1,current,o$1({"opacity":(_s=(_r=secondaryObj.gauge_foreground_style)===null||_r===void 0?void 0:_r.opacity)!==null&&_s!==void 0?_s:1,"stroke":(_t=secondaryObj.gauge_foreground_style)===null||_t===void 0?void 0:_t.color,"stroke-width":(_u=secondaryObj.gauge_foreground_style)===null||_u===void 0?void 0:_u.width}))}
    `;}_renderTertiary(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_0,_1,_2,_3,_4,_5,_6;const tertiary=(_a=this._config)===null||_a===void 0?void 0:_a.tertiary;if(!tertiary){return b``;}const iconCenter=!((_c=(_b=this._config)===null||_b===void 0?void 0:_b.show_state)!==null&&_c!==void 0?_c:false)&&((_e=(_d=this._config)===null||_d===void 0?void 0:_d.show_icon)!==null&&_e!==void 0?_e:true);if(typeof tertiary==="string"){return b`
      <text
        x="0" y="0"
        class="tertiary-state"
        dy=${iconCenter?-19:-16}
      >
        ${(_h=(_g=(_f=this._templateResults)===null||_f===void 0?void 0:_f.tertiary)===null||_g===void 0?void 0:_g.result)!==null&&_h!==void 0?_h:(_j=this._config)===null||_j===void 0?void 0:_j.tertiary}
      </text>
      `;}const bigState=typeof((_k=this._config)===null||_k===void 0?void 0:_k.secondary)=="object"?((_m=(_l=this._config)===null||_l===void 0?void 0:_l.secondary)===null||_m===void 0?void 0:_m.state_size)=="big":false;if(!((_o=tertiary.show_state)!==null&&_o!==void 0?_o:true)||bigState){return b``;}const stateObj=this.hass.states[tertiary.entity||""];const templatedState=(_q=(_p=this._templateResults)===null||_p===void 0?void 0:_p.tertiaryEntity)===null||_q===void 0?void 0:_q.result;if(!stateObj&&templatedState===undefined){return b``;}const attributes=(_r=stateObj===null||stateObj===void 0?void 0:stateObj.attributes)!==null&&_r!==void 0?_r:undefined;const unit=(_s=tertiary.unit)!==null&&_s!==void 0?_s:attributes===null||attributes===void 0?void 0:attributes.unit_of_measurement;const state=templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state;const stateOverride=(_v=(_u=(_t=this._templateResults)===null||_t===void 0?void 0:_t.tertiaryStateText)===null||_u===void 0?void 0:_u.result)!==null&&_v!==void 0?_v:isTemplate(String(tertiary.state_text))?"":tertiary.state_text;const entityState=(_w=stateOverride!==null&&stateOverride!==void 0?stateOverride:formatNumber(state,this.hass.locale,getNumberFormatOptions({state,attributes},this.hass.entities[stateObj===null||stateObj===void 0?void 0:stateObj.entity_id])))!==null&&_w!==void 0?_w:templatedState;let adaptiveColor;if(tertiary.adaptive_state_color){if(tertiary.show_gauge=="outter"){adaptiveColor=computeSegments(Number(state),(_z=(_y=(_x=this._templateResults)===null||_x===void 0?void 0:_x.segments)===null||_y===void 0?void 0:_y.result)!==null&&_z!==void 0?_z:(_0=this._config)===null||_0===void 0?void 0:_0.segments,(_1=this._config)===null||_1===void 0?void 0:_1.smooth_segments,this);}else if(tertiary.show_gauge=="inner"){adaptiveColor=computeSegments(Number(state),tertiary.segments,(_2=this._config)===null||_2===void 0?void 0:_2.smooth_segments,this);}if(((_3=tertiary.gauge_foreground_style)===null||_3===void 0?void 0:_3.color)&&((_4=tertiary.gauge_foreground_style)===null||_4===void 0?void 0:_4.color)!="adaptive"){adaptiveColor=(_5=tertiary.gauge_foreground_style)===null||_5===void 0?void 0:_5.color;}}return b`
    <text
      @action=${this._handleTertiaryAction}
      .actionHandler=${actionHandler({hasHold:hasAction(tertiary.hold_action),hasDoubleClick:hasAction(tertiary.double_tap_action)})}
      class="tertiary-state ${e({"adaptive":!!tertiary.adaptive_state_color})}"
      style=${o$1({"fill":adaptiveColor!==null&&adaptiveColor!==void 0?adaptiveColor:undefined,"font-size":tertiary.state_font_size?`${tertiary.state_font_size}px`:undefined})}
      dy=${iconCenter?-19:-16}
    >
      ${entityState}
      ${((_6=tertiary.show_unit)!==null&&_6!==void 0?_6:true)?b`
      <tspan
        dx=0
        dy=0
      >
        ${unit}
      </tspan>
      `:E}
    </text>
    `;}_renderSecondary(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_0,_1,_2,_3;const secondary=(_a=this._config)===null||_a===void 0?void 0:_a.secondary;if(!secondary){return b``;}const iconCenter=!((_c=(_b=this._config)===null||_b===void 0?void 0:_b.show_state)!==null&&_c!==void 0?_c:false)&&((_e=(_d=this._config)===null||_d===void 0?void 0:_d.show_icon)!==null&&_e!==void 0?_e:true);if(typeof secondary==="string"){this._hasSecondary=true;return b`
      <text
        x="0" y="0"
        class="secondary"
        dy=${iconCenter?25:20}
      >
        ${(_h=(_g=(_f=this._templateResults)===null||_f===void 0?void 0:_f.secondary)===null||_g===void 0?void 0:_g.result)!==null&&_h!==void 0?_h:(_j=this._config)===null||_j===void 0?void 0:_j.secondary}
      </text>`;}if(!((_k=secondary.show_state)!==null&&_k!==void 0?_k:true)){return b``;}const stateObj=this.hass.states[secondary.entity||""];const templatedState=(_m=(_l=this._templateResults)===null||_l===void 0?void 0:_l.secondaryEntity)===null||_m===void 0?void 0:_m.result;if(!stateObj&&templatedState===undefined){return b``;}this._hasSecondary=true;const attributes=(_o=stateObj===null||stateObj===void 0?void 0:stateObj.attributes)!==null&&_o!==void 0?_o:undefined;const unit=(_p=secondary.unit)!==null&&_p!==void 0?_p:attributes===null||attributes===void 0?void 0:attributes.unit_of_measurement;const state=templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state;const stateOverride=(_s=(_r=(_q=this._templateResults)===null||_q===void 0?void 0:_q.secondaryStateText)===null||_r===void 0?void 0:_r.result)!==null&&_s!==void 0?_s:isTemplate(String(secondary.state_text))?"":secondary.state_text;const entityState=(_t=stateOverride!==null&&stateOverride!==void 0?stateOverride:formatNumber(state,this.hass.locale,getNumberFormatOptions({state,attributes},this.hass.entities[stateObj===null||stateObj===void 0?void 0:stateObj.entity_id])))!==null&&_t!==void 0?_t:templatedState;let secondaryColor;if(secondary.adaptive_state_color){if(secondary.show_gauge=="outter"){secondaryColor=computeSegments(Number(state),(_w=(_v=(_u=this._templateResults)===null||_u===void 0?void 0:_u.segments)===null||_v===void 0?void 0:_v.result)!==null&&_w!==void 0?_w:(_x=this._config)===null||_x===void 0?void 0:_x.segments,(_y=this._config)===null||_y===void 0?void 0:_y.smooth_segments,this);}else if(secondary.show_gauge=="inner"){secondaryColor=computeSegments(Number(state),secondary.segments,(_z=this._config)===null||_z===void 0?void 0:_z.smooth_segments,this);}if(((_0=secondary.gauge_foreground_style)===null||_0===void 0?void 0:_0.color)&&((_1=secondary.gauge_foreground_style)===null||_1===void 0?void 0:_1.color)!="adaptive"){secondaryColor=(_2=secondary.gauge_foreground_style)===null||_2===void 0?void 0:_2.color;}}return b`
    <text
      @action=${this._handleSecondaryAction}
      .actionHandler=${actionHandler({hasHold:hasAction(secondary.hold_action),hasDoubleClick:hasAction(secondary.double_tap_action)})}
      class="secondary ${e({"dual-state":secondary.state_size=="big","adaptive":!!secondary.adaptive_state_color})}"
      style=${o$1({"font-size":secondary.state_size=="big"?this._calcStateSize(entityState,secondary.state_font_size):secondary.state_font_size?`${secondary.state_font_size}px`:undefined,"fill":secondaryColor!==null&&secondaryColor!==void 0?secondaryColor:undefined})}
      dy=${secondary.state_size=="big"?14:iconCenter?25:20}
    >
      ${entityState}
      ${((_3=secondary.show_unit)!==null&&_3!==void 0?_3:true)?b`
      <tspan
        class=${e({"unit":secondary.state_size=="big"})}
        dx=${secondary.state_size=="big"?-4:0}
        dy=${secondary.state_size=="big"?-6:0}
      >
        ${unit}
      </tspan>
      `:E}
    </text>
    ${secondary.state_size=="big"?b`
    <text
      class="state-label"
      dy="29"
    >
      ${secondary.label}
    </text>`:E}
    `;}_getSegmentLabel(numberState,segments){if(segments){let sortedSegments=[...segments].sort((a,b)=>Number(a.from)-Number(b.from));for(let i=sortedSegments.length-1;i>=0;i--){let segment=sortedSegments[i];if(numberState>=Number(segment.from)||i===0){return segment.label||"";}}}return "";}async _tryConnect(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o;const templates={entity:(_a=this._config)===null||_a===void 0?void 0:_a.entity,name:(_b=this._config)===null||_b===void 0?void 0:_b.name,icon:(_c=this._config)===null||_c===void 0?void 0:_c.icon,min:(_d=this._config)===null||_d===void 0?void 0:_d.min,max:(_e=this._config)===null||_e===void 0?void 0:_e.max,segments:(_f=this._config)===null||_f===void 0?void 0:_f.segments,stateText:(_g=this._config)===null||_g===void 0?void 0:_g.state_text,secondary:(_h=this._config)===null||_h===void 0?void 0:_h.secondary,tertiary:(_j=this._config)===null||_j===void 0?void 0:_j.tertiary};Object.entries(templates).forEach(([key,value])=>{if(typeof value=="string"){this._tryConnectKey(key,value);}else if(key=="segments"){const segmentsStringified=JSON.stringify(value);this._tryConnectKey(key,segmentsStringified);}});if(typeof((_k=this._config)===null||_k===void 0?void 0:_k.secondary)!="string"){const secondary=(_l=this._config)===null||_l===void 0?void 0:_l.secondary;const secondaryTemplates={secondaryMin:secondary===null||secondary===void 0?void 0:secondary.min,secondaryMax:secondary===null||secondary===void 0?void 0:secondary.max,secondaryEntity:secondary===null||secondary===void 0?void 0:secondary.entity,secondaryStateText:secondary===null||secondary===void 0?void 0:secondary.state_text,secondarySegments:secondary===null||secondary===void 0?void 0:secondary.segments};Object.entries(secondaryTemplates).forEach(([key,value])=>{if(typeof value=="string"){this._tryConnectKey(key,value);}else if(key=="secondarySegments"){const segmentsStringified=JSON.stringify(value);this._tryConnectKey(key,segmentsStringified);}});}if(typeof((_m=this._config)===null||_m===void 0?void 0:_m.tertiary)!="string"){const tertiary=(_o=this._config)===null||_o===void 0?void 0:_o.tertiary;const tertiaryTemplates={tertiaryMin:tertiary===null||tertiary===void 0?void 0:tertiary.min,tertiaryMax:tertiary===null||tertiary===void 0?void 0:tertiary.max,tertiaryEntity:tertiary===null||tertiary===void 0?void 0:tertiary.entity,tertiaryStateText:tertiary===null||tertiary===void 0?void 0:tertiary.state_text,tertiarySegments:tertiary===null||tertiary===void 0?void 0:tertiary.segments};Object.entries(tertiaryTemplates).forEach(([key,value])=>{if(typeof value=="string"){this._tryConnectKey(key,value);}else if(key=="tertiarySegments"){const segmentsStringified=JSON.stringify(value);this._tryConnectKey(key,segmentsStringified);}});}}async _tryConnectKey(key,templateValue){var _a,_b,_c;if(((_a=this._unsubRenderTemplates)===null||_a===void 0?void 0:_a.get(key))!==undefined||!this.hass||!this._config||!isTemplate(templateValue)){return;}try{const sub=subscribeRenderTemplate(this.hass.connection,result=>{if("error"in result){return;}this._templateResults=Object.assign(Object.assign({},this._templateResults),{[key]:result});},{template:templateValue||"",variables:{config:this._config,user:this.hass.user.name},strict:true});(_b=this._unsubRenderTemplates)===null||_b===void 0?void 0:_b.set(key,sub);await sub;}catch(e){const result={result:templateValue||"",listeners:{all:false,domains:[],entities:[],time:false}};this._templateResults=Object.assign(Object.assign({},this._templateResults),{[key]:result});(_c=this._unsubRenderTemplates)===null||_c===void 0?void 0:_c.delete(key);}}async _tryDisconnect(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o;const templates={entity:(_a=this._config)===null||_a===void 0?void 0:_a.entity,name:(_b=this._config)===null||_b===void 0?void 0:_b.name,icon:(_c=this._config)===null||_c===void 0?void 0:_c.icon,min:(_d=this._config)===null||_d===void 0?void 0:_d.min,max:(_e=this._config)===null||_e===void 0?void 0:_e.max,segments:(_f=this._config)===null||_f===void 0?void 0:_f.segments,stateText:(_g=this._config)===null||_g===void 0?void 0:_g.state_text,secondary:(_h=this._config)===null||_h===void 0?void 0:_h.secondary,tertiary:(_j=this._config)===null||_j===void 0?void 0:_j.tertiary};Object.entries(templates).forEach(([key,_])=>{this._tryDisconnectKey(key);});if(typeof((_k=this._config)===null||_k===void 0?void 0:_k.secondary)!="string"){const secondary=(_l=this._config)===null||_l===void 0?void 0:_l.secondary;const secondaryTemplates={secondaryMin:secondary===null||secondary===void 0?void 0:secondary.min,secondaryMax:secondary===null||secondary===void 0?void 0:secondary.max,secondaryEntity:secondary===null||secondary===void 0?void 0:secondary.entity,secondaryStateText:secondary===null||secondary===void 0?void 0:secondary.state_text,secondarySegments:secondary===null||secondary===void 0?void 0:secondary.segments};Object.entries(secondaryTemplates).forEach(([key,_])=>{this._tryDisconnectKey(key);});}if(typeof((_m=this._config)===null||_m===void 0?void 0:_m.tertiary)!="string"){const tertiary=(_o=this._config)===null||_o===void 0?void 0:_o.tertiary;const tertiaryTemplates={tertiaryMin:tertiary===null||tertiary===void 0?void 0:tertiary.min,tertiaryMax:tertiary===null||tertiary===void 0?void 0:tertiary.max,tertiaryEntity:tertiary===null||tertiary===void 0?void 0:tertiary.entity,tertiaryStateText:tertiary===null||tertiary===void 0?void 0:tertiary.state_text,tertiarySegments:tertiary===null||tertiary===void 0?void 0:tertiary.segments};Object.entries(tertiaryTemplates).forEach(([key,_])=>{this._tryDisconnectKey(key);});}}async _tryDisconnectKey(key){var _a,_b;const unsubRenderTemplate=(_a=this._unsubRenderTemplates)===null||_a===void 0?void 0:_a.get(key);if(!unsubRenderTemplate){return;}try{const unsub=await unsubRenderTemplate;unsub();(_b=this._unsubRenderTemplates)===null||_b===void 0?void 0:_b.delete(key);}catch(e){if(e.code==="not_found"||e.code==="template_error");else {throw e;}}}_handleAction(ev){var _a;ev.stopPropagation();const targetEntity=(_a=this._config)===null||_a===void 0?void 0:_a.entity;const config=Object.assign(Object.assign({},this._config),{entity:isTemplate(targetEntity!==null&&targetEntity!==void 0?targetEntity:"")?"":targetEntity});handleAction(this,this.hass,config,ev.detail.action);}_handleSecondaryAction(ev){var _a,_b,_c,_d,_e;ev.stopPropagation();if(typeof((_a=this._config)===null||_a===void 0?void 0:_a.secondary)!="string"){const entity=typeof((_b=this._config)===null||_b===void 0?void 0:_b.secondary)!="string"?(_d=(_c=this._config)===null||_c===void 0?void 0:_c.secondary)===null||_d===void 0?void 0:_d.entity:"";const config=Object.assign(Object.assign({},(_e=this._config)===null||_e===void 0?void 0:_e.secondary),{entity:isTemplate(entity!==null&&entity!==void 0?entity:"")?"":entity});handleAction(this,this.hass,config,ev.detail.action);}}_handleTertiaryAction(ev){var _a,_b,_c,_d,_e;ev.stopPropagation();if(typeof((_a=this._config)===null||_a===void 0?void 0:_a.tertiary)!="string"){const entity=typeof((_b=this._config)===null||_b===void 0?void 0:_b.tertiary)!="string"?(_d=(_c=this._config)===null||_c===void 0?void 0:_c.tertiary)===null||_d===void 0?void 0:_d.entity:"";const config=Object.assign(Object.assign({},(_e=this._config)===null||_e===void 0?void 0:_e.tertiary),{entity:isTemplate(entity!==null&&entity!==void 0?entity:"")?"":entity});handleAction(this,this.hass,config,ev.detail.action);}}getGridOptions(){return {columns:6,rows:4,min_rows:3,min_columns:4};}getLayoutOptions(){return {grid_columns:2,grid_rows:3,grid_min_rows:3,grid_min_columns:2};}getCardSize(){return 4;}static get styles(){return i$5`
    :host {
      --gauge-primary-color: var(--light-blue-color);
      --gauge-secondary-color: var(--orange-color);
      --gauge-tertiary-color: var(--light-green-color);

      --gauge-color: var(--gauge-primary-color);
      --gauge-stroke-width: 6px;
      --inner-gauge-stroke-width: 4px;
      --gauge-header-font-size: 14px;
    }

    ha-card {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 10px;
      flex-direction: column-reverse;
      align-items: center;
    }

    ha-card.action {
      cursor: pointer
    }

    .flex-column-reverse {
      flex-direction: column;
    }
    
    .header {
      position: absolute;
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .flex-column-reverse .header {
      position: relative;
    }
    
    .state {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-anchor: middle;
      z-index: 2;
    }

    .container {
      position: relative;
      container-type: inline-size;
      container-name: container;
      width: 100%;
      height: 100%;
    }

    .flex-column-reverse .container {
      margin-bottom: 0px;
    }

    .secondary, .tertiary-state {
      font-size: 10px;
      fill: var(--secondary-text-color);
      --gauge-color: var(--gauge-secondary-color);
    }

    .tertiary-state {
      --gauge-color: var(--gauge-tertiary-color);
    }

    .state-label {
      font-size: 0.49em;
      fill: var(--secondary-text-color);
    }

    .value, .secondary.dual-state {
      font-size: 21px;
      fill: var(--primary-text-color);
      dominant-baseline: middle;
    }

    .secondary.dual-state {
      fill: var(--secondary-text-color);
    }

    .secondary.dual-state .unit {
      opacity: 1;
    }

    .icon-container {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .icon-wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: auto;
      max-height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
    }

    .icon-center .icon-wrapper {
      justify-content: center;
      align-items: center;
    }

    .icon-wrapper:before {
      display: block;
      content: "";
      padding-top: 100%;
    }

    ha-state-icon, .warning-icon {
      position: absolute;
      bottom: 14%;
      left: 50%;
      transform: translate(-50%, 0);
      --mdc-icon-size: auto;
      color: var(--primary-color);
      height: 12%;
      width: 12%;
      --ha-icon-display: flex;
    }

    .icon-center ha-state-icon, .icon-center ha-state-icon.big, .icon-center .warning-icon {
      position: static;
      transform: unset;
      height: 30%;
      width: 30%;
    }

    ha-state-icon.big, .warning-icon {
      height: 18%;
      width: 18%;
    }

    .warning-icon {
      color: var(--state-unavailable-color);
    }

    .adaptive {
      color: var(--gauge-color);
    }

    .value.adaptive, .secondary.adaptive, .tertiary-state.adaptive {
      fill: var(--gauge-color);
    }

    ha-icon {
      display: flex;
      justify-content: center;
    }

    .name {
      width: 100%;
      font-size: var(--gauge-header-font-size);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      line-height: 20px;
      letter-spacing: .1px;
      color: var(--primary-text-color);
    }

    .unit {
      font-size: .33em;
      opacity: 0.6;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    g {
      fill: none;
    }
    .arc {
      fill: none;
      stroke-linecap: round;
      stroke-width: var(--gauge-stroke-width);
    }

    .arc.clear {
      stroke: var(--primary-background-color);
    }

    .arc.current {
      stroke: var(--gauge-color);
      transition: all 1s ease 0s;
    }

    .segment {
      fill: none;
      stroke-width: var(--gauge-stroke-width);
      filter: brightness(100%);
    }

    .segments {
      opacity: 0.35;
    }

    .needle {
      fill: none;
      stroke-linecap: round;
      stroke-width: var(--gauge-stroke-width);
      stroke: var(--gauge-color);
      transition: all 1s ease 0s;
    }

    .needle-border {
      fill: none;
      stroke-linecap: round;
      stroke-width: calc(var(--gauge-stroke-width) + 2px);
      stroke: var(--card-background-color);
      transition: all 1s ease 0s, stroke 0.3s ease-out;
    }

    .inner {
      --gauge-color: var(--gauge-secondary-color);
      --gauge-stroke-width: var(--inner-gauge-stroke-width);
    }

    .tertiary {
      --gauge-color: var(--gauge-tertiary-color);
    }

    .dual-gauge {
      --gauge-stroke-width: 4px;
    }

    .dot {
      fill: none;
      stroke-linecap: round;
      stroke-width: calc(var(--gauge-stroke-width) / 2);
      stroke: var(--primary-text-color);
      transition: all 1s ease 0s;
    }

    .dot.border {
      stroke: var(--gauge-color);
      stroke-width: var(--gauge-stroke-width);
    }
    `;}};__decorate([n$1({attribute:false})],ModernCircularGauge.prototype,"hass",void 0);__decorate([r()],ModernCircularGauge.prototype,"_config",void 0);__decorate([r()],ModernCircularGauge.prototype,"_hasSecondary",void 0);__decorate([r()],ModernCircularGauge.prototype,"_templateResults",void 0);__decorate([r()],ModernCircularGauge.prototype,"_unsubRenderTemplates",void 0);ModernCircularGauge=__decorate([t$1("modern-circular-gauge")],ModernCircularGauge);

function registerCustomBadge(params){const windowWithCards=window;windowWithCards.customBadges=windowWithCards.customBadges||[];windowWithCards.customBadges.push(Object.assign(Object.assign({},params),{preview:true,documentationURL:`https://github.com/selvalt7/modern-circular-gauge`}));}

const MAX_ANGLE=270;const ROTATE_ANGLE=360-MAX_ANGLE/2-90;const RADIUS=42;registerCustomBadge({type:"modern-circular-gauge-badge",name:"Modern Circular Gauge Badge",description:"Modern circular gauge badge"});const path=svgArc({x:0,y:0,start:0,end:MAX_ANGLE,r:RADIUS});let ModernCircularGaugeBadge=class ModernCircularGaugeBadge extends i$2{constructor(){super(...arguments);this._templateResults={};this._unsubRenderTemplates=new Map();}static async getStubConfig(hass){const entities=Object.keys(hass.states);const numbers=entities.filter(e=>NUMBER_ENTITY_DOMAINS.includes(e.split(".")[0]));return {type:"custom:modern-circular-gauge-badge",entity:numbers[0]};}static async getConfigElement(){await Promise.resolve().then(function () { return gaugeBadgeEditor; });return document.createElement("modern-circular-gauge-badge-editor");}setConfig(config){if(!config.entity){throw new Error("Entity must be specified");}this._config=Object.assign({min:DEFAULT_MIN,max:DEFAULT_MAX,show_state:true},config);}connectedCallback(){super.connectedCallback();this._tryConnect();}disconnectedCallback(){super.disconnectedCallback();this._tryDisconnect();}updated(changedProps){super.updated(changedProps);if(!this._config||!this.hass){return;}this._tryConnect();}async _tryConnect(){var _a,_b,_c,_d,_e,_f,_g;const templates={entity:(_a=this._config)===null||_a===void 0?void 0:_a.entity,name:(_b=this._config)===null||_b===void 0?void 0:_b.name,icon:(_c=this._config)===null||_c===void 0?void 0:_c.icon,min:(_d=this._config)===null||_d===void 0?void 0:_d.min,max:(_e=this._config)===null||_e===void 0?void 0:_e.max,segments:(_f=this._config)===null||_f===void 0?void 0:_f.segments,stateText:(_g=this._config)===null||_g===void 0?void 0:_g.state_text};Object.entries(templates).forEach(([key,value])=>{if(typeof value=="string"){this._tryConnectKey(key,value);}else if(key=="segments"){const segmentsStringified=JSON.stringify(value);this._tryConnectKey(key,segmentsStringified);}});}async _tryConnectKey(key,templateValue){var _a,_b,_c;if(((_a=this._unsubRenderTemplates)===null||_a===void 0?void 0:_a.get(key))!==undefined||!this.hass||!this._config||!isTemplate(templateValue)){return;}try{const sub=subscribeRenderTemplate(this.hass.connection,result=>{if("error"in result){return;}this._templateResults=Object.assign(Object.assign({},this._templateResults),{[key]:result});},{template:templateValue||"",variables:{config:this._config,user:this.hass.user.name},strict:true});(_b=this._unsubRenderTemplates)===null||_b===void 0?void 0:_b.set(key,sub);await sub;}catch(e){const result={result:templateValue||"",listeners:{all:false,domains:[],entities:[],time:false}};this._templateResults=Object.assign(Object.assign({},this._templateResults),{[key]:result});(_c=this._unsubRenderTemplates)===null||_c===void 0?void 0:_c.delete(key);}}async _tryDisconnect(){var _a,_b,_c,_d,_e,_f,_g;const templates={entity:(_a=this._config)===null||_a===void 0?void 0:_a.entity,name:(_b=this._config)===null||_b===void 0?void 0:_b.name,icon:(_c=this._config)===null||_c===void 0?void 0:_c.icon,min:(_d=this._config)===null||_d===void 0?void 0:_d.min,max:(_e=this._config)===null||_e===void 0?void 0:_e.max,segments:(_f=this._config)===null||_f===void 0?void 0:_f.segments,stateText:(_g=this._config)===null||_g===void 0?void 0:_g.state_text};Object.entries(templates).forEach(([key,_])=>{this._tryDisconnectKey(key);});}async _tryDisconnectKey(key){var _a,_b;const unsubRenderTemplate=(_a=this._unsubRenderTemplates)===null||_a===void 0?void 0:_a.get(key);if(!unsubRenderTemplate){return;}try{const unsub=await unsubRenderTemplate;unsub();(_b=this._unsubRenderTemplates)===null||_b===void 0?void 0:_b.delete(key);}catch(e){if(e.code==="not_found"||e.code==="template_error");else {throw e;}}}get hasAction(){var _a,_b,_c,_d;return !((_a=this._config)===null||_a===void 0?void 0:_a.tap_action)||hasAction((_b=this._config)===null||_b===void 0?void 0:_b.tap_action)||hasAction((_c=this._config)===null||_c===void 0?void 0:_c.hold_action)||hasAction((_d=this._config)===null||_d===void 0?void 0:_d.double_tap_action);}render(){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10;if(!this.hass||!this._config){return x``;}const stateObj=this.hass.states[this._config.entity];const templatedState=(_b=(_a=this._templateResults)===null||_a===void 0?void 0:_a.entity)===null||_b===void 0?void 0:_b.result;if(!stateObj&&templatedState===undefined){if(isTemplate(this._config.entity)){return x`
        <ha-badge
          .type=${this.hasAction?"button":"badge"}
          @action=${this._handleAction}
          .actionHandler=${actionHandler({hasHold:hasAction(this._config.hold_action),hasDoubleClick:hasAction(this._config.double_tap_action)})}
          .iconOnly=${!this._config.show_name}
        >
          <div class=${e({"container":true,"icon-only":!this._config.show_name})} slot="icon">
            <svg class="gauge" viewBox="-50 -50 100 100">
              <g transform="rotate(${ROTATE_ANGLE})">
                ${renderPath("arc clear",path)}
              </g>
            </svg>
          </div>
        </ha-badge>
        `;}else {return x`
        <ha-badge .label=${this._config.entity} class="error">
          <ha-svg-icon
            slot="icon"
            .hass=${this.hass}
            .path=${mdiAlertCircle}
          ></ha-svg-icon>
          ${this.hass.localize("ui.badge.entity.not_found")}
        </ha-badge>
        `;}}const min=(_f=Number((_e=(_d=(_c=this._templateResults)===null||_c===void 0?void 0:_c.min)===null||_d===void 0?void 0:_d.result)!==null&&_e!==void 0?_e:this._config.min))!==null&&_f!==void 0?_f:DEFAULT_MIN;const max=(_k=Number((_j=(_h=(_g=this._templateResults)===null||_g===void 0?void 0:_g.max)===null||_h===void 0?void 0:_h.result)!==null&&_j!==void 0?_j:this._config.max))!==null&&_k!==void 0?_k:DEFAULT_MAX;const attributes=(_l=stateObj===null||stateObj===void 0?void 0:stateObj.attributes)!==null&&_l!==void 0?_l:undefined;const numberState=Number(templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state);const current=this._config.needle?undefined:currentDashArc(numberState,min,max,RADIUS,this._config.start_from_zero);const state=templatedState!==null&&templatedState!==void 0?templatedState:stateObj.state;const stateOverride=(_p=(_o=(_m=this._templateResults)===null||_m===void 0?void 0:_m.stateText)===null||_o===void 0?void 0:_o.result)!==null&&_p!==void 0?_p:isTemplate(String(this._config.state_text))?"":this._config.state_text;const unit=((_q=this._config.show_unit)!==null&&_q!==void 0?_q:true)?((_r=this._config.unit)!==null&&_r!==void 0?_r:stateObj===null||stateObj===void 0?void 0:stateObj.attributes.unit_of_measurement)||"":"";const entityState=(_s=stateOverride!==null&&stateOverride!==void 0?stateOverride:formatNumber(state,this.hass.locale,getNumberFormatOptions({state,attributes},this.hass.entities[stateObj===null||stateObj===void 0?void 0:stateObj.entity_id])))!==null&&_s!==void 0?_s:templatedState;const name=(_x=(_w=(_v=(_u=(_t=this._templateResults)===null||_t===void 0?void 0:_t.name)===null||_u===void 0?void 0:_u.result)!==null&&_v!==void 0?_v:isTemplate(String(this._config.name))?"":this._config.name)!==null&&_w!==void 0?_w:stateObj===null||stateObj===void 0?void 0:stateObj.attributes.friendly_name)!==null&&_x!==void 0?_x:"";const label=this._config.show_name&&this._config.show_icon&&this._config.show_state?name:undefined;const content=this._config.show_icon&&this._config.show_state?`${entityState} ${unit}`:this._config.show_name?name:undefined;const segments=(_0=(_z=(_y=this._templateResults)===null||_y===void 0?void 0:_y.segments)===null||_z===void 0?void 0:_z.result)!==null&&_0!==void 0?_0:this._config.segments;const gaugeBackgroundStyle=this._config.gauge_background_style;const gaugeForegroundStyle=this._config.gauge_foreground_style;return x`
    <ha-badge
      .type=${this.hasAction?"button":"badge"}
      @action=${this._handleAction}
      .actionHandler=${actionHandler({hasHold:hasAction(this._config.hold_action),hasDoubleClick:hasAction(this._config.double_tap_action)})}
      .iconOnly=${content===undefined}
      style=${o$1({"--gauge-color":(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.color)&&(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.color)!="adaptive"?gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.color:computeSegments(numberState,segments,this._config.smooth_segments,this),"--gauge-stroke-width":(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.width)?`${gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.width}px`:undefined})}
      .label=${label}
    >
      <div class=${e({"container":true,"icon-only":content===undefined})} slot="icon">
        <svg class="gauge" viewBox="-50 -50 100 100">
          <g transform="rotate(${ROTATE_ANGLE})">
            <defs>
            ${this._config.needle?b`
              <mask id="needle-mask">
                ${renderPath("arc",path,undefined,o$1({"stroke":"white","stroke-width":(gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.width)?`${gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.width}px`:undefined}))}
                <circle cx="42" cy="0" r=${(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.width)?(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.width)-2:12} fill="black" transform="rotate(${getAngle(numberState,min,max)})"/>
              </mask>
              `:E}
              <mask id="gradient-path">
                ${renderPath("arc",path,undefined,o$1({"stroke":"white","stroke-width":(gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.width)?`${gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.width}px`:undefined}))}
              </mask>
              <mask id="gradient-current-path">
                ${current?renderPath("arc current",path,current,o$1({"stroke":"white","visibility":numberState<=min&&min>=0?"hidden":"visible"})):E}
              </mask>
            </defs>
            <g mask="url(#needle-mask)">
              <g class="background" style=${o$1({"opacity":(_1=this._config.gauge_background_style)===null||_1===void 0?void 0:_1.opacity,"--gauge-stroke-width":((_2=this._config.gauge_background_style)===null||_2===void 0?void 0:_2.width)?`${(_3=this._config.gauge_background_style)===null||_3===void 0?void 0:_3.width}px`:undefined})}>
                ${renderPath("arc clear",path,undefined,o$1({"stroke":(gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.color)&&(gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.color)!="adaptive"?gaugeBackgroundStyle===null||gaugeBackgroundStyle===void 0?void 0:gaugeBackgroundStyle.color:undefined}))}
                ${this._config.segments&&(this._config.needle||((_4=this._config.gauge_background_style)===null||_4===void 0?void 0:_4.color)=="adaptive")?b`
                <g class="segments" mask=${o(this._config.smooth_segments?"url(#gradient-path)":undefined)}>
                  ${renderColorSegments(segments,min,max,RADIUS,(_5=this._config)===null||_5===void 0?void 0:_5.smooth_segments)}
                </g>`:E}
              </g>
            </g>
          ${this._config.needle?b`
            <circle class="needle" cx="42" cy="0" r=${(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.width)?(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.width)/2:7} transform="rotate(${getAngle(numberState,min,max)})"/>
          `:E}
          ${current?(gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.color)=="adaptive"?b`
            <g class="foreground-segments" mask="url(#gradient-current-path)" style=${o$1({"opacity":gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.opacity})}>
              ${renderColorSegments(segments,min,max,RADIUS,(_6=this._config)===null||_6===void 0?void 0:_6.smooth_segments)}
            </g>
            `:renderPath("arc current",path,current,o$1({"visibility":numberState<=min&&min>=0?"hidden":"visible","opacity":gaugeForegroundStyle===null||gaugeForegroundStyle===void 0?void 0:gaugeForegroundStyle.opacity})):E}
          </g>
        </svg>
        ${this._config.show_icon?x`
          <ha-state-icon
            .hass=${this.hass}
            .stateObj=${stateObj}
            .icon=${(_9=(_8=(_7=this._templateResults)===null||_7===void 0?void 0:_7.icon)===null||_8===void 0?void 0:_8.result)!==null&&_9!==void 0?_9:this._config.icon}
          ></ha-state-icon>`:E}
        ${this._config.show_state&&!this._config.show_icon?x`
          <svg class="state" viewBox="-50 -50 100 100">
            <text x="0" y="0" class="value" style=${o$1({"font-size":this._calcStateSize(entityState)})}>
              ${entityState}
              ${((_10=this._config.show_unit)!==null&&_10!==void 0?_10:true)?b`
              <tspan class="unit" dx="-4" dy="-6">${unit}</tspan>
              `:E}
            </text>
          </svg>
          `:E}
      </div>
      ${content}
    </ha-badge>
    `;}_calcStateSize(state){const initialSize=25;if(state.length>=4){return `${initialSize-(state.length-3)}px`;}return `${initialSize}px`;}_handleAction(ev){var _a,_b,_c;const config=Object.assign(Object.assign({},this._config),{entity:isTemplate((_b=(_a=this._config)===null||_a===void 0?void 0:_a.entity)!==null&&_b!==void 0?_b:"")?"":(_c=this._config)===null||_c===void 0?void 0:_c.entity});handleAction(this,this.hass,config,ev.detail.action);}static get styles(){return i$5`
    :host {
      --gauge-color: var(--primary-color);
      --gauge-stroke-width: 14px;
    }

    .badge::slotted([slot=icon]) {
      margin-left: 0;
      margin-right: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }

    .state {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-anchor: middle;
    }

    .value {
      font-size: 21px;
      fill: var(--primary-text-color);
      dominant-baseline: middle;
    }

    .unit {
      font-size: .43em;
      opacity: 0.6;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      container-type: normal;
      container-name: container;
      width: calc(var(--ha-badge-size, 36px) - 2px);
      height: calc(var(--ha-badge-size, 36px) - 2px);
      margin-left: -12px;
      margin-inline-start: -12px;
      pointer-events: none;
    }

    .container.icon-only {
      margin-left: 0;
      margin-inline-start: 0;
    }

    .gauge {
      position: absolute;
    }

    .segment {
      fill: none;
      stroke-width: var(--gauge-stroke-width);
      filter: brightness(100%);
    }

    .segments {
      opacity: 0.35;
    }

    ha-badge {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      --badge-color: var(--gauge-color);
    }

    ha-badge.error {
      --badge-color: var(--red-color);
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    g {
      fill: none;
    }
    .arc {
      fill: none;
      stroke-linecap: round;
      stroke-width: var(--gauge-stroke-width);
    }

    .arc.clear {
      stroke: var(--primary-background-color);
    }

    .arc.current {
      stroke: var(--gauge-color);
      transition: all 1s ease 0s;
    }

    .needle {
      fill: var(--gauge-color);
      stroke: var(--gauge-color);
      transition: all 1s ease 0s;
    }

    circle {
      transition: all 1s ease 0s;
    }
    `;}};__decorate([n$1({attribute:false})],ModernCircularGaugeBadge.prototype,"hass",void 0);__decorate([r()],ModernCircularGaugeBadge.prototype,"_config",void 0);__decorate([r()],ModernCircularGaugeBadge.prototype,"_templateResults",void 0);__decorate([r()],ModernCircularGaugeBadge.prototype,"_unsubRenderTemplates",void 0);ModernCircularGaugeBadge=__decorate([t$1("modern-circular-gauge-badge")],ModernCircularGaugeBadge);

const getSecondaryGaugeSchema=showGaugeOptions=>{return [{name:"show_gauge",label:"Gauge visibility",selector:{select:{options:[{value:"none",label:"None"},{value:"inner",label:"Inner gauge"},{value:"outter",label:"Outter gauge"}],mode:"dropdown"}}},{name:"",type:"grid",disabled:!showGaugeOptions,schema:[{name:"min",default:DEFAULT_MIN,label:"generic.minimum",selector:{number:{step:0.1}}},{name:"max",default:DEFAULT_MAX,label:"generic.maximum",selector:{number:{step:0.1}}},{name:"needle",label:"gauge.needle_gauge",selector:{boolean:{}}}]},{name:"segments",type:"mcg-list",title:"Color segments",iconPath:mdiSegment,disabled:!showGaugeOptions,schema:[{name:"",type:"grid",column_min_width:"100px",schema:[{name:"from",label:"From",required:true,selector:{number:{step:0.1}}},{name:"color",label:"heading.entity_config.color",required:true,selector:{color_rgb:{}}}]}]}];};function getSecondarySchema(showGaugeOptions){return {name:"secondary",type:"expandable",label:"Secondary info",iconPath:mdiNumeric2BoxOutline,schema:[{name:"entity",selector:{entity:{domain:NUMBER_ENTITY_DOMAINS}}},{name:"",type:"grid",schema:[{name:"unit",selector:{text:{}}},{name:"state_size",label:"State size",selector:{select:{options:[{value:"small",label:"Small"},{value:"big",label:"Big"}],mode:"dropdown"}}},{name:"show_state",label:"Show state",default:true,selector:{boolean:{}}},{name:"show_unit",label:"Show unit",default:true,selector:{boolean:{}}},{name:"adaptive_state_color",label:"Adaptive state color",default:false,selector:{boolean:{}}}]},...getSecondaryGaugeSchema(showGaugeOptions),{name:"tap_action",selector:{ui_action:{}}}]};}function getTertiarySchema(showGaugeOptions){return {name:"tertiary",type:"expandable",label:"Tertiary info",iconPath:mdiNumeric3BoxOutline,schema:[{name:"entity",selector:{entity:{domain:NUMBER_ENTITY_DOMAINS}}},{name:"unit",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"show_state",label:"Show state",default:true,selector:{boolean:{}}},{name:"show_unit",label:"Show unit",default:true,selector:{boolean:{}}},{name:"adaptive_state_color",label:"Adaptive state color",default:false,selector:{boolean:{}}}]},...getSecondaryGaugeSchema(showGaugeOptions),{name:"tap_action",selector:{ui_action:{}}}]};}

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

let MCG_List=class MCG_List extends i$2{constructor(){super(...arguments);this.disabled=false;this._computeLabel=(schema,data,options)=>{if(!this.computeLabel)return this._computeLabel;return this.computeLabel(schema,data,Object.assign(Object.assign({},options),{path:[...((options===null||options===void 0?void 0:options.path)||[]),this.schema.name]}));};}render(){var _a,_b;return x`
    <ha-expansion-panel outlined .expanded=${Boolean(this.schema.expanded)}>
      <div
        slot="header"
        role="heading"
      >
        <ha-svg-icon .path=${this.schema.iconPath}></ha-svg-icon>
        ${this.schema.title}
      </div>
      <div class="content">
        ${this.data?this.data.map((row,index)=>x`
          <div class="entry">
            <ha-form
              .hass=${this.hass}
              .data=${row}
              .schema=${this.schema.schema}
              .index=${index}
              .disabled=${this.disabled}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._valueChanged}
            ></ha-form>
            <ha-icon-button
              .label=${this.hass.localize("ui.common.remove")}
              .path=${mdiClose}
              .index=${index}
              @click=${this._removeRow}
            >
          </div>
        `):E}
        <ha-button .disabled=${this.disabled} @click=${this._addRow}>
          ${(_b=(_a=this.hass)===null||_a===void 0?void 0:_a.localize("ui.common.add"))!==null&&_b!==void 0?_b:"Add"}
          <ha-svg-icon slot="icon" .path=${mdiPlus}></ha-svg-icon>
        </ha-button>
      </div>
    </ha-expansion-panel>
    `;}_valueChanged(ev){ev.stopPropagation();const data=[...this.data];data[ev.target.index]=ev.detail.value;fireEvent(this,"value-changed",{value:data});}_addRow(){if(this.data===undefined){fireEvent(this,"value-changed",{value:[{}]});return;}const data=[...this.data,{}];fireEvent(this,"value-changed",{value:data});}_removeRow(ev){const data=[...this.data];data.splice(ev.target.index,1);fireEvent(this,"value-changed",{value:data});}static get styles(){return i$5`
      .content {
        display: flex;
        justify-items: center;
        flex-direction: column;
        padding: 12px;
      }
      
      .entry {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-top: 12px;
        margin-bottom: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .entry:first-child {
        border-top: none;
      }

      .entry ha-form {
        flex: 1;
      }

      ha-button ha-svg-icon {
        color: inherit;
      }

      ha-svg-icon, ha-icon-button {
        color: var(--secondary-text-color);
      }
    `;}};__decorate([n$1({attribute:false})],MCG_List.prototype,"hass",void 0);__decorate([n$1({attribute:false})],MCG_List.prototype,"data",void 0);__decorate([n$1({attribute:false})],MCG_List.prototype,"schema",void 0);__decorate([n$1({attribute:false})],MCG_List.prototype,"computeLabel",void 0);__decorate([n$1({type:Boolean})],MCG_List.prototype,"disabled",void 0);MCG_List=__decorate([t$1("ha-form-mcg-list")],MCG_List);

let ModernCircularGaugeEditor=class ModernCircularGaugeEditor extends i$2{constructor(){super(...arguments);this._schema=memoizeOne((showInnerGaugeOptions,showTertiaryGaugeOptions)=>[{name:"entity",required:true,selector:{entity:{domain:NUMBER_ENTITY_DOMAINS}}},{name:"name",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"unit",selector:{text:{}}},{name:"min",default:DEFAULT_MIN,label:"generic.minimum",selector:{number:{step:0.1}}},{name:"max",default:DEFAULT_MAX,label:"generic.maximum",selector:{number:{step:0.1}}}]},getSecondarySchema(showInnerGaugeOptions),getTertiarySchema(showTertiaryGaugeOptions),{name:"header_position",label:"Header position",selector:{select:{options:[{label:"Top",value:"top"},{label:"Bottom",value:"bottom"}]}}},{name:"",type:"grid",schema:[{name:"needle",label:"gauge.needle_gauge",selector:{boolean:{}}},{name:"smooth_segments",label:"Smooth color segments",selector:{boolean:{}}},{name:"show_header",label:"Show header",default:true,selector:{boolean:{}}},{name:"show_state",label:"Show state",default:true,selector:{boolean:{}}},{name:"show_unit",label:"Show unit",default:true,selector:{boolean:{}}},{name:"show_icon",label:"Show icon",default:true,selector:{boolean:{}}},{name:"adaptive_icon_color",label:"Adaptive icon color",default:false,selector:{boolean:{}}},{name:"adaptive_state_color",label:"Adaptive state color",default:false,selector:{boolean:{}}}]},{name:"segments",type:"mcg-list",title:"Color segments",iconPath:mdiSegment,schema:[{name:"",type:"grid",column_min_width:"100px",schema:[{name:"from",label:"From",required:true,selector:{number:{step:0.1}}},{name:"color",label:"heading.entity_config.color",required:true,selector:{color_rgb:{}}}]},{name:"label",label:"Label",selector:{text:{}}}]},{name:"tap_action",selector:{ui_action:{}}}]);this._computeLabel=schema=>{var _a,_b;let label=(_a=this.hass)===null||_a===void 0?void 0:_a.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);if(label)return label;label=(_b=this.hass)===null||_b===void 0?void 0:_b.localize(`ui.panel.lovelace.editor.card.${schema.label}`);if(label)return label;return schema.label;};}setConfig(config){let secondary=config.secondary;if(secondary===undefined&&config.secondary_entity!==undefined){secondary=config.secondary_entity;}if(typeof secondary==="object"){const template=secondary.template||"";if(template.length>0){secondary=template;}}this._config=Object.assign(Object.assign({},config),{secondary:secondary,secondary_entity:undefined});}render(){var _a,_b;if(!this.hass||!this._config){return E;}const schema=this._schema(typeof this._config.secondary!="string"&&((_a=this._config.secondary)===null||_a===void 0?void 0:_a.show_gauge)=="inner",typeof this._config.tertiary!="string"&&((_b=this._config.tertiary)===null||_b===void 0?void 0:_b.show_gauge)=="inner");const DATA=Object.assign({},this._config);return x`
    <ha-form
        .hass=${this.hass}
        .data=${DATA}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
    ></ha-form>
    `;}_valueChanged(ev){var _a;let config=ev.detail.value;if(!config){return;}let newSecondary={};if(typeof((_a=this._config)===null||_a===void 0?void 0:_a.secondary)==="string"){newSecondary=Object.assign(Object.assign({},newSecondary),{entity:this._config.secondary});}if(typeof config.secondary==="object"){Object.entries(config.secondary).forEach(([key,value])=>{if(isNaN(Number(key))){newSecondary=Object.assign(Object.assign({},newSecondary),{[key]:value});}});}config.secondary=newSecondary;fireEvent(this,"config-changed",{config});}static get styles(){return i$5`
    `;}};__decorate([n$1({attribute:false})],ModernCircularGaugeEditor.prototype,"hass",void 0);__decorate([r()],ModernCircularGaugeEditor.prototype,"_config",void 0);ModernCircularGaugeEditor=__decorate([t$1("modern-circular-gauge-editor")],ModernCircularGaugeEditor);

var mcgEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ModernCircularGaugeEditor () { return ModernCircularGaugeEditor; }
});

const FORM=[{name:"entity",required:true,selector:{entity:{domain:NUMBER_ENTITY_DOMAINS}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"unit",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"needle",label:"gauge.needle_gauge",selector:{boolean:{}}},{name:"min",default:DEFAULT_MIN,label:"generic.minimum",selector:{number:{step:0.1}}},{name:"max",default:DEFAULT_MAX,label:"generic.maximum",selector:{number:{step:0.1}}},{name:"show_name",label:"Show name",default:false,selector:{boolean:{}}},{name:"show_state",label:"Show state",default:true,selector:{boolean:{}}},{name:"show_unit",label:"Show unit",default:true,selector:{boolean:{}}},{name:"show_icon",label:"Show icon",default:false,selector:{boolean:{}}},{name:"smooth_segments",label:"Smooth color segments",selector:{boolean:{}}}]},{name:"segments",type:"mcg-list",title:"Color segments",iconPath:mdiSegment,schema:[{name:"",type:"grid",column_min_width:"100px",schema:[{name:"from",label:"From",required:true,selector:{number:{step:0.1}}},{name:"color",label:"heading.entity_config.color",required:true,selector:{color_rgb:{}}}]}]},{name:"tap_action",selector:{ui_action:{}}}];let ModernCircularGaugeBadgeEditor=class ModernCircularGaugeBadgeEditor extends i$2{constructor(){super(...arguments);this._computeLabel=schema=>{var _a,_b;let label=(_a=this.hass)===null||_a===void 0?void 0:_a.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);if(label)return label;label=(_b=this.hass)===null||_b===void 0?void 0:_b.localize(`ui.panel.lovelace.editor.card.${schema.label}`);if(label)return label;return schema.label;};}setConfig(config){this._config=config;}render(){var _a;if(!this.hass||!this._config){return E;}const DATA=Object.assign(Object.assign({},this._config),{segments:(_a=this._config.segments)===null||_a===void 0?void 0:_a.map(value=>{let color=value.color;if(typeof value.color==="string"){color=hexToRgb(value.color);}return Object.assign(Object.assign({},value),{color});})});return x`
    <ha-form
      .hass=${this.hass}
      .data=${DATA}
      .schema=${FORM}
      .computeLabel=${this._computeLabel}
      @value-changed=${this._valueChanged}
    ></ha-form>
    `;}_valueChanged(ev){let config=ev.detail.value;if(!config){return;}fireEvent(this,"config-changed",{config});}static get styles(){return i$5`
    `;}};__decorate([n$1({attribute:false})],ModernCircularGaugeBadgeEditor.prototype,"hass",void 0);__decorate([r()],ModernCircularGaugeBadgeEditor.prototype,"_config",void 0);ModernCircularGaugeBadgeEditor=__decorate([t$1("modern-circular-gauge-badge-editor")],ModernCircularGaugeBadgeEditor);

var gaugeBadgeEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ModernCircularGaugeBadgeEditor () { return ModernCircularGaugeBadgeEditor; }
});
