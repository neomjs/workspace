(self.webpackChunkmyapp=self.webpackChunkmyapp||[]).push([[734],{706:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});var n=s(643);class o extends n.Z{static getConfig(){return{className:"Neo.main.addon.Stylesheet",remote:{app:["createStyleSheet","insertCssRules","swapStyleSheet"]},singleton:!0}}constructor(e){super(e),Neo.config.useFontAwesome&&this.createStyleSheet(null,null,Neo.config.basePath+"node_modules/@fortawesome/fontawesome-free/css/all.min.css"),Neo.config.themes.length>0&&""!==Neo.config.themes[0]&&this.insertTheme()}createStyleSheet(e,t,s){if(!e&&!s)throw new Error("createStyleSheet: you need to either pass a name or a href");const n=document.createElement("link"),o=Neo.config.environment,l=o.startsWith("dist/")?o:"dist/"+o,r=s||(Neo.config.cssPath?Neo.config.cssPath+e:Neo.config.basePath+l+"/"+e);Object.assign(n,{href:r,rel:"stylesheet",type:"text/css"}),t&&(n.id=t),document.head.appendChild(n)}hasStyleSheet(e){let t,s=0,n=document.styleSheets.length;for(;s<n;s++)if(t=document.styleSheets[s],t.href&&t.href.includes(e))return!0;return!1}insertCssRules(e){let t,s=document.getElementById("neoDynamicStyleSheet"),n=0,o=e.rules.length;for(s||(s=document.createElement("style"),s.id="neoDynamicStyleSheet",document.head.appendChild(s)),t=s.sheet;n<o;n++)t.insertRule(e.rules[n],t.cssRules.length)}insertTheme(){let e=this,t=Neo.config.themes;Array.isArray(t)||(t=[t]),t[0]&&document.body.classList.add(t[0]),Neo.config.useCssVars?(e.removeStyleSheets({included:["neo-theme-","-no-css-vars.css"]}),t.length>0&&!e.hasStyleSheet("neo-structure.css")&&e.createStyleSheet("neo-structure.css"),t.forEach((t=>{e.hasStyleSheet(t+".css")||e.createStyleSheet(t+".css")}))):(e.removeStyleSheets({included:["neo-structure.css"]}),e.removeStyleSheets({included:["neo-theme-"],excluded:["-no-css-vars.css"]}),t.length>0&&!e.hasStyleSheet(t[0]+"-no-css-vars.css")&&e.createStyleSheet(t[0]+"-no-css-vars.css","neo-theme"))}removeStyleSheets(e){let t,s,n=0,o=document.styleSheets.length,l=e.included||[],r=e.included||[];for(;n<o;n++)t=document.styleSheets[n],s=!0,t.href&&(r.forEach((e=>{t.href.includes(e)&&(s=!1)})),s&&(l.forEach((e=>{t.href.includes(e)||(s=!1)})),s&&(console.log("removeSheet",t.href),t.ownerNode.parentNode.removeChild(t.ownerNode))))}swapStyleSheet(e){document.getElementById(e.id).setAttribute("href",e.href)}}Neo.applyClassConfig(o);let l=Neo.create(o);Neo.applyToGlobalNs(l);const r=l}}]);