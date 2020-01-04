!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=32)}([function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(9);const i=Symbol("afterSetQueue"),o=Symbol("isInstance");class s{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.Base",ntype:"base",mixins:null}}constructor(e){e=e||{};let t=this;Object.defineProperties(t,{[i]:{configurable:!0,enumerable:!1,value:[],writable:!0},[o]:{enumerable:!1,value:!0}}),t.createId(e.id||t.id),delete e.id,t.constructor.config&&delete t.constructor.config.id,(t.getStaticConfig("observable")||t.mixins&&Neo.ns("Neo.core.Observable",t.mixins))&&t.initObservable(e),t.initConfig(e),t.controller&&t.controller.parseConfig(),Object.defineProperty(t,"configsApplied",{enumerable:!1,value:!0}),t.processAfterSetQueue(),t.remote&&setTimeout(t.initRemote.bind(t),1)}onConstructed(){}init(){}addToAfterSetQueue(e,t,r){let n=this;!n.configsApplied&&n[i]&&n[i].push({fn:e,key:t,oldValue:r})}beforeSetEnumValue(e,t,r,n=r+"s"){const i=this.getStaticConfig(n);return i.includes(e)?e:(Neo.logError("Supported values for "+r+" are:",i.join(", "),this),t)}createId(e){let t=this;e||(e=n.a.getId(t.ntype)),t.id=e,!0===s.instanceManagerAvailable?Neo.manager.Instance.register(t):(Neo.idMap||(Neo.idMap={}),Neo.idMap[t.id]=t)}destroy(){let e=this;!0===s.instanceManagerAvailable&&Neo.manager.Instance.unregister(e),Object.entries(e).forEach(t=>{e[t]=null,delete e[t]})}getStaticConfig(e){let t=this.constructor.staticConfig;return e?t[e]:t}initConfig(e,t){Object.assign(this,this.mergeConfig(e,t))}initRemote(){let e,t=this.remote,r=this.className;if(!this.singleton)throw new Error("Remote method access only functional for Singleton classes "+r);!Neo.config.unitTestMode&&Neo.isObject(t)&&Object.entries(t).forEach(([t,n])=>{Neo.workerId!==t&&(e="main"===Neo.workerId?Neo.worker.Manager:Neo.currentWorker,e.sendMessage(t,{action:"registerRemote",methods:n,className:r}))})}mergeConfig(e,t){let r=this,n=r.constructor;if(!n.config)throw new Error("Neo.applyClassConfig has not been run on "+r.className);return t||(r.originalConfig=Neo.clone(e,!0,!0)),{...n.config,...e}}processAfterSetQueue(){let e=this;e[i]&&e.configsApplied&&(e[i].forEach(t=>{e[t.fn](e[t.key],t.oldValue)}),delete e[i])}setStaticConfig(e,t){let r=this.constructor.staticConfig;return!!r.hasOwnProperty(e)&&(r[e]=t,!0)}get[Symbol.toStringTag](){return this.className+" (id:"+this.id+")"}static[Symbol.hasInstance](e){return!!e&&(!0===e[o]&&super[Symbol.hasInstance](e))}}Neo.applyClassConfig(s),s.instanceManagerAvailable=!1},function(e,t,r){"use strict";var n=r(0);class i extends n.a{static getConfig(){return{className:"Neo.util.Array"}}static add(e,t){Array.isArray(t)||(t=[t]),t.forEach(t=>{e.includes(t)||e.push(t)})}static difference(e=[],t=[]){return e.filter(e=>!t.includes(e))}static hasItem(e,t){return e.includes(t)}static intersection(e=[],t=[]){return e.filter(e=>t.includes(e))}static isEqual(e=[],t=[]){let r,n,i,o=0,s=e.length,a=t.length;for(;o<s;o++)if(i=e[o],Neo.isObject(i)){for(r=!1,n=0;n<a;n++)if(Neo.isObject(t[n])&&Neo.util.Object.isEqual(i,t[n])){r=!0;break}if(!r)return!1}else if(!t.includes(i))return!1;return e.length===t.length}static move(e,t,r){return t===r?e:(t>=e.length&&(t=e.length-1),e.splice(r,0,e.splice(t,1)[0]),e)}static remove(e,t){let r;Array.isArray(t)||(t=[t]),t.forEach(t=>{r=e.indexOf(t),r>-1&&e.splice(r,1)})}static toggle(e,t){this.hasItem(e,t)?this.remove(e,t):this.add(e,t)}static union(e,t){let r,n=[],i=e.concat(t),o=i.length,s={};for(;o--;)r=i[o],s[r]||(n.unshift(r),s[r]=!0);return n}static unshift(e,t){Array.isArray(t)||(t=[t]),t.forEach(t=>{e.includes(t)||e.unshift(t)})}}Neo.applyClassConfig(i),t.a=i},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));let n=self.Neo||{};n=self.Neo=Object.assign({ntypeMap:{},insideWorker:"undefined"!=typeof DedicatedWorkerGlobalScope||"undefined"!=typeof WorkerGlobalScope,applyClassConfig:function(e){let t,r=null,i=null,c={},d=e.prototype||e,u=[],f={};for(;d.__proto__;){if(t=d.constructor,t.hasOwnProperty("classConfigApplied")){r=n.clone(t.config,!0),i=n.clone(t.staticConfig,!0);break}u.unshift(d),d=d.__proto__}c=r||c,f=i||f,u.forEach(r=>{t=r.constructor;let i,d=t.getConfig&&t.getConfig()||{},u=t.getStaticConfig&&t.getStaticConfig()||{};d&&Object.entries(d).forEach(([e,t])=>{"_"===e.slice(-1)?(delete d[e],e=e.slice(0,-1),d[e]=t,function(e,t){if(l(e,t))throw"Config "+t+"_ ("+e.className+") already has a set method, use beforeGet, beforeSet & afterSet instead";Object.defineProperty(e,t,{get:function(){let e=this,r="beforeGet"+n.capitalize(t),i=e["_"+t];return Array.isArray(i)?"items"!==t&&(i=[...i]):i instanceof Date&&(i=new Date(i.valueOf())),e[r]&&"function"==typeof e[r]&&(i=e[r](i)),i},set:function(e){let r=this,i="_"+t,o=n.capitalize(t),s="beforeSet"+o,a="afterSet"+o,l=r[i];r[s]&&"function"==typeof r[s]&&(e=r[s](e,l)),r[i]=e,(n.isObject(e)||Array.isArray(e)||e!==l)&&r[a]&&"function"==typeof r[a]&&(r.configsApplied?r[a](e,l):r.addToAfterSetQueue(a,i,l))}})}(r,e)):l(r,e)||Object.defineProperty(r,e,{enumerable:!0,value:t,writable:!0})}),Object.assign(t,u),d.hasOwnProperty("ntype")&&(n.ntypeMap[d.ntype]=d.className),i=c.hasOwnProperty("mixins")&&c.mixins||[],u&&u.observable&&i.push("Neo.core.Observable"),d.hasOwnProperty("mixins")&&Array.isArray(d.mixins)&&d.mixins.length>0&&i.push(...d.mixins),i.length&&function(e,t){Array.isArray(t)||(t=[t]);let r,i,l,c=0,d=t.length,u={};for(;c<d;c++){if(r=t[c],r.isClass)l=r.prototype,i=n.ns(l.className);else{if(!o(r))throw new Error("Attempting to mixin an undefined class: "+r+", "+e.prototype.className);i=n.ns(r),l=i.prototype}l.className.split(".").reduce(s(i),u),Object.getOwnPropertyNames(l).forEach(a(e.prototype,l))}e.prototype.mixins=u}(t,i),delete d.mixins,delete c.mixins,Object.assign(c,d),Object.assign(f,u),Object.assign(t,{classConfigApplied:!0,config:n.clone(c,!0),isClass:!0,staticConfig:n.clone(f,!0)}),delete t.getConfig,delete t.getStaticConfig,c.singleton||this.applyToGlobalNs(e)})},applyToGlobalNs:function(e){let t,r,i,o,s="function"==typeof e?e.prototype:e;!0===s.constructor.registerToGlobalNs&&(t=s.isClass?s.config.className:s.className,r=t.split("."),i=r.pop(),o=n.ns(r,!0),o[i]=e)},applyFromNs:function(e,t,r,n){let i;return e&&r&&"object"==typeof r&&Object.entries(r).forEach(([r,o])=>{i=t[o],e[r]=n?i.bind(t):i}),e},assignDefaults:function(e,t){return e&&t&&"object"==typeof t&&Object.entries(t).forEach(([t,r])=>{e.hasOwnProperty(t)||(e[t]=r)}),e},clone:function(e,t,r){let i;return Array.isArray(e)?e.map(e=>n.clone(e,t,r)):null!==e&&"object"==typeof e?e.constructor.isClass&&e instanceof n.core.Base?r?e:this.cloneNeoInstance(e):e.constructor.isClass?e:(i={},Object.entries(e).forEach(([e,o])=>{t&&(o=n.clone(o,t,r)),i[e]=o}),i):e},cloneNeoInstance:function(e){let t={...e.originalConfig};return delete t._id,delete t.id,n.create(e.className,t)},create:function(e,t){let r,i;if("function"==typeof e&&void 0!==e.constructor)r=e;else{if("object"==typeof e){if(!(t=e).className&&!t.module)return console.error("Class created with object configuration missing className or module property",t),null;e=t.className?t.className:t.module.prototype.className}if(!o(e))throw new Error("Class "+e+" does not exist");r=n.ns(e)}return i=new r(t),i.onConstructed(),i.init(),i},emptyFn:function(){},ns:function(e,t,r){return(e=Array.isArray(e)?e:e.split(".")).reduce((e,r)=>{if(t&&!e[r]&&(e[r]={}),e)return e[r]},r||self)},ntype:function(e,t){if("object"==typeof e){if(!(t=e).ntype)throw new Error("Class defined with object configuration missing ntype property. "+t.ntype);e=t.ntype}let r=n.ntypeMap[e];if(!r)throw new Error("ntype "+e+" does not exist");return n.create(r,t)},onStart:n.emptyFn},n);const i=["_name","classConfigApplied","className","constructor","isClass","mixin","ntype","observable","registerToGlobalNs"];function o(e){try{return!!e.split(".").reduce((e,t)=>e[t],self)}catch(e){return!1}}function s(e){return(t,r,n,i)=>t[r]=n!==i.length-1?t[r]||{}:e}function a(e,t){return function(r){if(!~i.indexOf(r)){if(e[r]&&e[r]._from){if(t.className===e[r]._from)return void console.warn("Mixin set multiple times or already defined on a Base Class",e.className,t.className,r);throw new Error(e.className+": Multiple mixins defining same property ("+t.className+", "+e[r]._from+") => "+r)}e[r]=t[r],Object.getOwnPropertyDescriptor(e,r)._from=t.className,"function"==typeof e[r]&&(e[r]._name=r)}}}function l(e,t){let r;for(;e.__proto__;){if(r=Object.getOwnPropertyDescriptor(e,t),"object"==typeof r&&"function"==typeof r.set)return!0;e=e.__proto__}return!1}n.config=n.config||{},n.assignDefaults(n.config,{applyBodyCls:!0,appPath:null,basePath:"./",cssPath:null,environment:"production",isExperimental:!1,isInsideSiesta:!1,locale:"default",resourcesPath:n.config.basePath+"resources/",themes:["neo-theme-light","neo-theme-dark"],unitTestMode:!1,useCss4:!0,useFontAwesome:!0,useGoogleAnalytics:!1,workerBasePath:n.config.basePath+"src/worker/"})},function(e,t,r){"use strict";var n=r(0);class i extends n.a{static getStaticConfig(){return{decamelRegEx:/([a-z])([A-Z])/g}}static getConfig(){return{className:"Neo.core.Util",ntype:"core-util"}}static createStyles(e){let t="";return Object.entries(e).forEach(([e,r])=>{null!=r&&(t+=i.decamel(e)+":"+r+";")}),t}static capitalize(e){return i.isString(e)&&e[0].toUpperCase()+e.slice(1)}static decamel(e){return e.replace(i.decamelRegEx,"$1-$2").toLowerCase()}static createStyleObject(e){if(!e)return null;let t;return e.split(/;(?=[^\)]*(?:\(|$))/g).reduce((e,r)=>(t=r.split(/:(.+)/).map((function(e){let t=parseFloat(e);return e==t?t:e.trim()})),""!==t[0]&&(t[0]=t[0].replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),e[t[0]]=t[1]),e),{})}static isArray(e){return Array.isArray(e)}static isBoolean(e){return"boolean"==typeof e}static isDefined(e){return void 0!==e}static isEmpty(e){return Array.isArray(e)?0===e.length:i.isObject(e)?0===Object.keys(e).length:!!i.isString(e)&&""===e}static isNumber(e){return"number"==typeof e&&isFinite(e)}static isObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}static isString(e){return"string"==typeof e}static toArray(e,t,r){let n;return e&&(n=e.length)?"string"==typeof e?e.split(""):Array.prototype.slice.call(e,t||0,r||n):[]}}Neo.applyClassConfig(i),Neo.applyFromNs(Neo,i,{createStyleObject:"createStyleObject",createStyles:"createStyles",capitalize:"capitalize",decamel:"decamel",isArray:"isArray",isBoolean:"isBoolean",isDefined:"isDefined",isEmpty:"isEmpty",isNumber:"isNumber",isObject:"isObject",isString:"isString",toArray:"toArray"},!0),t.a=i},function(e,t,r){"use strict";var n=r(0);class i extends n.a{static getConfig(){return{className:"Neo.core.Logger",ntype:"logger",enableLogs:!0,level:"log",singleton:!0}}constructor(e){super(e),Neo.applyFromNs(Neo,this,{error:"error",info:"info",log:"log",logError:"logError",warn:"warn"},!0)}error(e){throw new Error(e)}log(...e){this.level="log",this.write(...e)}info(...e){this.level="info",this.write(...e)}logError(...e){this.level="error",this.write(...e)}warn(...e){this.level="warn",this.write(...e)}write(...e){!0===this.enableLogs&&console[this.level](...e)}}Neo.applyClassConfig(i);let o=Neo.create(i);Neo.applyToGlobalNs(o),t.a=o},function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(0);class i extends n.a{static getConfig(){return{className:"Neo.core.Observable",ntype:"mixin-observable",mixin:!0}}initObservable(e){let t,r=this,n=r.__proto__;for(e.listeners&&(r.listeners=e.listeners,delete e.listeners),t=r.listeners,r.listeners={},t&&r.addListener(t);n&&n.constructor.isClass;)n.constructor.staticConfig.observable&&!n.constructor.listeners&&Object.assign(n.constructor,{addListener:r.addListener,fire:r.fire,listeners:{},on:r.on,removeListener:r.removeListener,un:r.un}),n=n.__proto__}addListener(e,t,r,n,i,o){let s,a,l,c=this;if("object"==typeof e)e.hasOwnProperty("scope")&&(r=e.scope,delete e.scope),Object.entries(e).forEach(([e,t])=>{c.addListener(e,t,r)});else if("object"==typeof t)r=r||t.scope,s=t.fn,o=o||t.order,n=n||t.eventId;else if("function"==typeof t)s=t;else{if("string"!=typeof t)throw new Error("Invalid addListener call: "+e);s=t}return l={fn:s,scope:r,data:i,id:n||Neo.getId("event")},(a=c.listeners&&c.listeners[e])?(a.forEach(t=>{if(t.id===n||t.fn===s&&t.scope===r)throw new Error("Duplicate event handler attached: "+e)}),"number"==typeof o?a.splice(o,0,l):"before"===o?a.unshift(l):a.push(l)):c.listeners[e]=[l],l.id}fire(e){let t,r,n,i,o=this,s=[].slice.call(arguments,1),a=o.listeners;if(a&&a[e])for(r=[...a[e]],i=r.length,n=0;n<i;n++)t=r[n],t.fn.apply(t.scope||o,t.data?s.concat(t.data):s)}removeListener(e,t){if(Neo.isString(t)){let r=this.listeners[e],n=!1;r.forEach((e,r)=>{if(e.id===t)return n=r}),!1!==n&&r.splice(n,1)}}on(...e){return this.addListener(...e)}un(...e){this.removeListener(...e)}}Neo.applyClassConfig(i)},,,function(e,t,r){"use strict";var n=r(0);class i extends n.a{static getConfig(){return{className:"Neo.util.VNode"}}static findChildVnode(e,t,r,n){r=r||0,t="string"!=typeof t?t:{id:t};let o,s,a,l=null,c=!0,d=[],u=!0,f=0,p=e.childNodes&&e.childNodes.length;if(o=Object.entries(t),s=o.length,o.forEach(([t,r])=>{if(e.hasOwnProperty(t))switch(t){case"attributes":Neo.isObject(r)&&Neo.isObject(e[t])&&(Object.entries(r).forEach(([r,n])=>{e[t].hasOwnProperty(r)&&e[t][r]===n||(c=!1)}),c&&d.push(!0));break;case"className":if("string"==typeof r&&Neo.isArray(e[t]))e[t].includes(r)&&d.push(!0);else if("string"==typeof r&&"string"==typeof e[t])e[t]===r&&d.push(!0);else if(Neo.isArray(r)&&Neo.isArray(e[t]))throw new Error("findChildVnode: cls matching not supported for target & source types of Arrays");break;case"style":Neo.isObject(r)&&Neo.isObject(e[t])&&(Object.entries(r).forEach(([r,n])=>{e[t].hasOwnProperty(r)&&e[t][r]===n||(u=!1)}),u&&d.push(!0));break;default:e[t]===r&&d.push(!0)}}),d.length===s)return{index:r,parentNode:n,vnode:e};if(e.childNodes)for(;f<p;f++)if(a=i.findChildVnode(e.childNodes[f],t,f,e),a){l={index:a.index,parentNode:a.parentNode,vnode:a.vnode};break}return l}static findChildVnodeById(e,t){let r,n=e.childNodes||[],o=0,s=n.length;if(e.id===t)return e;for(;o<s;o++){if(r=n[o],r.id===t)return r;if(r=i.findChildVnodeById(r,t),r)return r}return null}static getChildIds(e,t=[]){return(e&&e.childNodes||[]).forEach(e=>{e.id&&t.push(e.id),t=i.getChildIds(e,t)}),t}static replaceChildVnode(e,t,r){let n,o=e.childNodes||[],s=0,a=o.length;if(e.id===t)throw new Error("replaceChildVnode: target id matches the root vnode id: "+t);for(;s<a;s++){if(n=o[s],n.id===t)return o[s]=r,!0;if(i.replaceChildVnode(n,t,r))return!0}return!1}}Neo.applyClassConfig(i),t.a=i},function(e,t,r){"use strict";class n{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.IdGenerator",ntype:"id-generator",base:"neo-",singleton:!0}}constructor(e){this.idCounter={},Neo.getId=this.getId.bind(this)}onConstructed(){}init(){}getId(e){e=e||"neo";let t=this.idCounter,r=t[e]||0;return t[e]=++r,this.base+("neo"===e?"":e+"-")+r}}Neo.applyClassConfig(n);let i=Neo.create(n);Neo.applyToGlobalNs(i),t.a=i},,,,function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(9);class i{constructor(e){e.destination=e.destination||"main",e.id=e.id||n.a.getId(Neo.workerId),e.origin=e.origin||Neo.workerId,Object.assign(this,e)}}Neo.ns("Neo.worker",!0).Message=i},function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(0);class i extends n.a{static getConfig(){return{className:"Neo.worker.mixins.RemoteMethodAccess",ntype:"mixin-remote-method-access",mixin:!0}}generateRemote(e,t){let r=this,n=e.origin;return function(i,o){let s={action:"remoteMethod",data:i,destination:n,remoteClassName:e.className,remoteMethod:t};return r.promiseMessage(n,s,o)}}onRegisterRemote(e){if(e.destination===Neo.workerId){let t=this,r=e.className,n=e.methods,i=Neo.ns(r,!0);n.forEach((function(n){if(i[n])throw new Error("Duplicate remote method definition "+r+"."+n);i[n]=t.generateRemote(e,n)})),"main"!==Neo.workerId&&t.fire("remoteregistered",e)}}onRemoteMethod(e){let t,r,n=this,i=Neo.ns(e.remoteClassName);if(!i)throw new Error('Invalid remote namespace "'+e.remoteClassName+'"');if(r=i[e.remoteMethod],!r)throw new Error('Invalid remote method name "'+e.remoteMethod+'"');t=Array.isArray(e.data)?r.call(i,...e.data):r.call(i,e.data),t instanceof Promise?t.then((function(t){n.resolve(e,t)})).catch((function(t){n.reject(e,t)})):n.resolve(e,t)}reject(e,t){this.sendMessage(e.origin,{action:"reply",data:t,reject:!0,replyId:e.id})}resolve(e,t){this.sendMessage(e.origin,{action:"reply",data:t,replyId:e.id})}}Neo.applyClassConfig(i)},,,,function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(0),i=r(5),o=r(13),s=r(14);class a extends n.a{static getConfig(){return{className:"Neo.worker.Worker",ntype:"worker",mixins:[i.a,s.a],workerId:null}}constructor(e){super(e=e||{});let t=this;t.promises={},self.addEventListener("message",t.onMessage.bind(t),!1),Neo.workerId=t.workerId,Neo.currentWorker=t}onMessage(e){let t,r=this,n=e.data,i=n.action,o=n.replyId;if(!i)throw new Error("Message action is missing: "+n.id);if("reply"!==i)try{this["on"+Neo.capitalize(i)](n)}catch(t){console.log("error",n,t,e),this.reject(n.id,{error:t.message})}else(t="reply"===i&&r.promises[o])&&(n.reject?t.reject(n.data):t.resolve(n.data),delete r.promises[o])}onPing(e){this.resolve(e,{originMsg:e})}onRegisterNeoConfig(e){Neo.config=Neo.config||{},Object.assign(Neo.config,e.data)}promiseMessage(e,t,r){let n=this;return new Promise((function(i,o){let s=n.sendMessage(e,t,r).id;n.promises[s]={resolve:i,reject:o}}))}sendMessage(e,t,r){t.destination=e;let n=new o.a(t);return self.postMessage(n,r),n}}Neo.applyClassConfig(a)},,function(e,t,r){"use strict";var n=r(0);r.d(t,"a",(function(){return n.a}));r(4),r(5),r(3)},function(e,t,r){"use strict";var n=r(0);class i extends n.a{static getConfig(){return{className:"Neo.util.Style"}}static compareStyles(e,t){let r={};return Neo.isString(e)&&(e=Neo.core.Util.createStyleObject(e)),Neo.isString(t)&&(t=Neo.core.Util.createStyleObject(t)),e||t?t?e?(Object.keys(e).forEach((function(n){t.hasOwnProperty(n)&&t[n]===e[n]||(r[n]=e[n])})),Object.keys(t).forEach((function(t){e.hasOwnProperty(t)||(r[t]=null)})),Object.keys(r).length>0?r:null):void Object.keys(t).forEach((function(e){r[e]=null})):Neo.clone(e):null}}Neo.applyClassConfig(i),t.a=i},,,,,,,,,,,function(e,t,r){"use strict";r.r(t);var n=r(2),i=r(18),o=(r(20),r(0));class s{constructor(e){Object.assign(this,{attributes:e.attributes||[],childNodes:e.childNodes||[],className:e.className||[],id:e.id||Neo.getId("vnode"),innerHTML:e.innerHTML,nodeName:e.nodeName,style:e.style,vtype:e.vtype||"vnode"})}}Neo.ns("Neo.vdom",!0).VNode=s;var a=r(8);class l extends o.a{static getConfig(){return{className:"Neo.vdom.Helper",ntype:"vdom-helper",remote:{app:["create","update"]},returnChildNodeOuterHtml:!1,singleton:!0,voidAttributes:["checked","required"],voidElements:["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]}}create(e){let t,r=!0===e.autoMount,n=e.parentId,i=e.parentIndex;return delete e.autoMount,delete e.parentId,delete e.parentIndex,t=this.parseHelper(e),t.outerHTML=this.createStringFromVnode(t),r&&(t.autoMount=!0,t.parentId=n,t.parentIndex=i),t}update(e){let t=this.parseHelper(e.vdom);return{deltas:this.createDeltas({newVnode:t,oldVnode:e.vnode}),updateVdom:!0,vnode:t}}createStringFromVnode(e){let t=this;switch(e.vtype){case"root":return t.createStringFromVnode(e.childNodes[0]);case"text":return void 0===e.innerHTML?"":String(e.innerHTML);case"vnode":return t.createOpenTag(e)+t.createTagContent(e)+t.createCloseTag(e);default:return""}}createOpenTag(e){let t,r="<"+e.nodeName,n=e.attributes,i=e.className;return e.style&&(t=Neo.createStyles(e.style),""!==t&&(r+=' style="'+t+'"')),i&&(Neo.isArray(i)&&(i=i.join(" ")),""!==i&&(r+=' class="'+i+'"')),e.id&&(r+=' id="'+e.id+'"'),Object.entries(n).forEach(([e,t])=>{this.voidAttributes.includes(e)?"true"===t&&(r+=" "+e):"removeDom"!==e&&(r+=" "+e+'="'+t+'"')}),r+">"}createTagContent(e){if(e.innerHTML)return e.innerHTML;let t,r,n="",i=e.childNodes?e.childNodes.length:0,o=0;for(;o<i;o++)t=e.childNodes[o],r=this.createStringFromVnode(t),t.innerHTML!==r&&this.returnChildNodeOuterHtml&&(t.outerHTML=r),n+=r;return n}createCloseTag(e){return this.voidElements.indexOf(e.nodeName)>-1?"":"</"+e.nodeName+">"}parseHelper(e){if(!0===e.removeDom)return null;if("text"===e.vtype)return e.id||(e.id=Neo.getId("vtext")),e.innerHTML=`\x3c!-- ${e.id} --\x3e${e.html||""}\x3c!-- /neo-vtext --\x3e`,delete e.html,e;let t,r=this,n={attributes:{},childNodes:[],style:{}};return e.tag||(e.tag="div"),Object.entries(e).forEach(([e,i])=>{let o,s,a;if(null!=i&&"flag"!==e)switch(e){case"tag":case"nodeName":n.nodeName=i;break;case"html":case"innerHTML":n.innerHTML=i.toString();break;case"children":case"childNodes":case"cn":Neo.isArray(i)||(i=[i]),s=[],i.forEach(e=>{!0!==e.removeDom&&(delete e.removeDom,t=r.parseHelper(e),t&&s.push(t))}),n.childNodes=s;break;case"cls":i&&!Array.isArray(i)?n.className=[i]:Neo.isArray(i)&&i.length<1||(n.className=i);break;case"height":case"maxHeight":case"maxWidth":case"minHeight":case"minWidth":case"width":o=i!=parseInt(i),n.style[e]=i+(o?"":"px");break;case"id":n.id=i;break;case"style":a=n.style,Neo.isString(i)?n.style=Object.assign(a,Neo.core.Util.createStyleObject(i)):n.style=Object.assign(a,i);break;default:n.attributes[e]=i+""}}),new s(n)}createDeltas(e){let t,r,n,i,o,s,l,c,d,u,f,p,h,g,m,y=this,N=e.deltas||[],b=e.index,v=e.newVnode,C=e.newVnodeRoot||v,w=e.oldVnode,O=e.oldVnodeRoot||w,j=e.parentId;if(v&&!w)N.push({action:"insertNode",id:v.id,index:b,outerHTML:y.createStringFromVnode(v),parentId:j});else if(!v&&w)N.push({action:"removeNode",id:w.id});else{if(v&&w&&v.id!==w.id){if(c=y.findVnode(C,w.id,v),d=y.findVnode(O,v.id,w),!c&&!d)return N.push({action:"removeNode",id:w.id}),N.push({action:"insertNode",id:v.id,index:b,outerHTML:y.createStringFromVnode(v),parentId:j}),{indexDelta:0};if(!c&&d){if(v.id===d.vnode.id){if(o=0,a.a.findChildVnodeById(w,v.id))N.push({action:"replaceChild",fromId:w.id,parentId:j,toId:v.id});else{let e=a.a.findChildVnode(O,d.vnode.id),t=a.a.findChildVnode(O,w.id);if(o=1,e.parentNode.id===t.parentNode.id){let r=a.a.findChildVnode(C,v.id),n=b+1;for(i=b+1,g=t.parentNode.childNodes,l=e.index;i<l;i++)a.a.findChildVnode(r.parentNode,g[i].id)||n++;e.parentNode.childNodes.splice(e.index,1),e.index!==n&&N.push({action:"moveNode",id:d.vnode.id,index:b,parentId:j}),o=0}N.push({action:"removeNode",id:w.id})}return y.createDeltas({deltas:N,newVnode:v,newVnodeRoot:C,oldVnode:d.vnode,oldVnodeRoot:O,parentId:j}),{indexDelta:o}}return N.push({action:"removeNode",id:w.id}),{indexDelta:1}}if(!d)return m=c&&a.a.findChildVnodeById(v,w.id),m&&N.push({action:"removeNode",id:c.vnode.id}),N.push({action:"insertNode",id:v.id,index:b,outerHTML:y.createStringFromVnode(v),parentId:j}),{indexDelta:m?0:-1};if(c){o=0;let e=a.a.findChildVnode(C,v.id);return e.parentNode.id===c.parentNode.id&&e.index>c.index&&(o=e.index-c.index),N.push({action:"moveNode",id:c.vnode.id,index:c.index,parentId:c.parentNode.id}),y.createDeltas({deltas:N,newVnode:c.vnode,newVnodeRoot:C,oldVnode:w,oldVnodeRoot:O,parentId:c.parentNode.id}),{indexDelta:0}}}v&&w&&v.id===w.id&&("text"===v.vtype&&v.innerHTML!==w.innerHTML?N.push({action:"updateVtext",id:v.id,parentId:a.a.findChildVnode(C,v.id).parentNode.id,value:v.innerHTML}):(s=Object.keys(v),Object.keys(w).forEach(e=>{v.hasOwnProperty(e)?"attributes"===e&&Object.keys(w[e]).forEach(t=>{v[e].hasOwnProperty(t)||(v[e][t]=null)}):s.push(e)}),s.forEach(e=>{switch(r={},n=v[e],e){case"attributes":t={},Object.entries(n).forEach(([e,r])=>{w.attributes.hasOwnProperty(e)&&w.attributes[e]===r||""!==r&&Neo.isEmpty(r)||(t[e]=r)}),Object.keys(t).length>0&&(r.attributes=t,Object.entries(t).forEach(([e,t])=>{null===t&&delete v.attributes[e]}));break;case"childNodes":for(i=0,o=0,l=Math.max(n.length,w.childNodes.length);i<l;i++)h=y.createDeltas({deltas:N,index:i,newVnode:n[i],newVnodeRoot:C,oldVnode:w.childNodes[i+o],oldVnodeRoot:O,parentId:v.id}),h&&h.indexDelta&&(o+=h.indexDelta);break;case"nodeName":case"innerHTML":n!==w[e]&&(r[e]=n);break;case"style":u=Neo.util.Style.compareStyles(n,w.style),u&&(r.style=u);break;case"className":w.className?(f=Neo.util.Array.difference(n,w.className),p=Neo.util.Array.difference(w.className,n)):(f=n,p=[]),(f.length>0||p.length>0)&&(r.cls={add:f,remove:p})}Object.keys(r).length>0&&(r.id=v.id,N.push(r))})))}return N}findVnode(e,t,r,n){n||(n=0);let i,o,s,a,l=null;if(e.id===t)l={index:n,parentNode:r,vnode:e};else if("text"!==e.vtype)for(i=e.childNodes,s=0,a=i&&i.length||0;s<a;s++)if(o=this.findVnode(i[s],t,e,s),o&&o.vnode.id===t){l=o;break}return l&&"root"===l.parentId&&(l.index=null),l}}Neo.applyClassConfig(l);let c=Neo.create(l);Neo.applyToGlobalNs(c);r(1),r(21);class d extends i.a{static getConfig(){return{className:"Neo.worker.VDom",ntype:"vdom-worker",singleton:!0,workerId:"vdom"}}}n.a.applyClassConfig(d);let u=n.a.create(d);n.a.applyToGlobalNs(u);t.default=u}]);