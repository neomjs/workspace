self.webpackChunk([6,7],{19:function(e,t,o){"use strict";o.d(t,"a",(function(){return l}));var r=o(0),a=o(18);class n extends a.a{static getConfig(){return{className:"Neo.draggable.DragProxyComponent",ntype:"dragproxy",autoMount:!0,autoRender:!0,cls:["neo-dragproxy"],moveInMainThread:!0}}constructor(e){super(e);this.on("mounted",this.onMounted,this)}onMounted(e){this.moveInMainThread&&Neo.main.addon.DragDrop.setDragProxyElement({id:e})}}Neo.applyClassConfig(n);var s=o(3),i=o(8);class l extends r.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.draggable.DragZone",ntype:"dragzone",addDragProxyCls:!0,alwaysFireDragMove:!1,appName:null,boundaryContainerId:null,data:null,dragElement:null,dragElementRect:null,dragProxy:null,dragProxyConfig_:null,dragProxyCls:"neo-dragproxy",dropZoneIdentifier:null,moveHorizontal:!0,moveInMainThread:!0,moveVertical:!0,offsetX:0,offsetY:0,owner:null,proxyParentId_:"document.body",scrollContainerId:null,scrollFactorLeft:1,scrollFactorTop:1,useProxyWrapper:!0}}constructor(e){super(e),Neo.main.addon.DragDrop||console.error("You can not use Neo.draggable.DragZone without adding Neo.main.addon.DragDrop to the main thread addons",this.id)}beforeGetDragProxyConfig(e){return Neo.clone(e,!0,!0)}createDragProxy(e){let t=this,o=Neo.getComponent(t.getDragElementRoot().id)||t.owner,r=i.a.clone(t.dragElement);const a={module:n,appName:t.appName,moveInMainThread:t.moveInMainThread,parentId:t.proxyParentId,vdom:t.useProxyWrapper?{cn:[r]}:r,style:{height:e.height+"px",left:(t.moveHorizontal?e.left:0)+"px",top:(t.moveVertical?e.top:0)+"px",width:e.width+"px"},...t.dragProxyConfig||{}};a.cls=a.cls||[],o&&a.cls.push(o.getTheme()),t.useProxyWrapper||a.cls.push(...r.cls),t.addDragProxyCls&&a.cls&&s.a.add(a.cls,t.dragProxyCls),t.dragProxy=Neo.create(a)}destroyDragProxy(){let e=this.dragProxy.id;setTimeout(()=>{Neo.currentWorker.promiseMessage("main",{action:"updateDom",deltas:[{action:"removeNode",id:e}]})},this.moveInMainThread?0:30),this.dragProxy.destroy()}dragEnd(){let e=this,t=e.owner,o=t.cls;s.a.remove(o,"neo-is-dragging"),t.cls=o,e.dragProxy&&(e.destroyDragProxy(),e.dragProxy=null),Object.assign(e,{dragElementRect:null,offsetX:0,offsetY:0,scrollContainerId:null}),e.resetData()}dragMove(e){let t,o=this;!o.moveInMainThread&&o.dragProxy&&(t=o.dragProxy.style,o.moveHorizontal&&(t.left=e.clientX-o.offsetX+"px"),o.moveVertical&&(t.top=e.clientY-o.offsetY+"px"),o.dragProxy.style=t)}dragStart(e){let t=this,o=t.owner,r=o.cls;t.setData(),s.a.add(r,"neo-is-dragging"),o.cls=r,Neo.main.addon.DragDrop.setConfigs(t.getMainThreadConfigs()),Neo.main.DomAccess.getBoundingClientRect({id:t.getDragElementRoot().id}).then(o=>{Object.assign(t,{dragElementRect:o,offsetX:e.clientX-o.left,offsetY:e.clientY-o.top}),t.createDragProxy(o)})}getDragElementRoot(){return this.dragElement}getMainThreadConfigs(){let e=this;return{alwaysFireDragMove:e.alwaysFireDragMove,boundaryContainerId:e.boundaryContainerId,dragProxyCls:e.dragProxyCls,dragZoneId:e.id,dropZoneIdentifier:e.dropZoneIdentifier,scrollContainerId:e.scrollContainerId,scrollFactorLeft:e.scrollFactorLeft,scrollFactorTop:e.scrollFactorTop}}onDrop(e){this.fire("drop",e)}onDropEnter(e){this.fire("drop:enter",e)}onDropLeave(e){this.fire("drop:leave",e)}resetData(){setTimeout(()=>{this.data=null},30)}setData(e={}){this.data={dragElement:this.getDragElementRoot(),dragZoneId:this.id,...e}}}Neo.applyClassConfig(l)},28:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return i}));var r=o(19),a=o(3),n=o(8);class s extends r.a{static getConfig(){return{className:"Neo.draggable.toolbar.DragZone",ntype:"toolbar-dragzone"}}constructor(e){super(e);let t=this,o=t.owner,r=o.domListeners,a={delegate:".neo-draggable",scope:t};r.push({"drag:end":t.onDragEnd,...a},{"drag:move":t.onDragMove,...a},{"drag:start":t.onDragStart,...a}),o.domListeners=r,o.on("insert",t.onItemInsert,t),t.adjustToolbarItemCls(!0)}adjustToolbarItemCls(e){let t=this.owner,o=t.vdom;o.cn.forEach(t=>{t.cls=t.cls||[],a.a[e?"add":"remove"](t.cls,"neo-draggable")}),t.vdom=o}onDragEnd(e){if(this.owner.draggable){let e=this,t=e.dragProxy,o=t.cls||{},r=e.dragElementRect,n=t.wrapperStyle||{};a.a.add(o,"neo-animate"),t.cls=o,setTimeout(()=>{n.left=r.left+"px",n.top=r.top+"px",t.wrapperStyle=n,setTimeout(()=>{e.dragEnd()},300)},30)}}onDragStart(e){let t=this;t.owner.draggable&&(t.dragElement=n.a.findVdomChild(t.owner.vdom,e.path[0].id).vdom,t.dragStart(e))}onItemInsert(e){let t=e.item,o=t.cls||[];a.a.add(o,"neo-draggable"),t.cls=o}}Neo.applyClassConfig(s);class i extends s{static getConfig(){return{className:"Neo.draggable.toolbar.SortZone",ntype:"toolbar-sortzone",alwaysFireDragMove:!0,currentIndex:-1,indexMap:null,itemRects:null,itemStyles:null,ownerRect:null,ownerStyle:null,reversedLayoutDirection:!1,sortDirection:"horizontal",startIndex:-1}}moveTo(e,t){this.owner.moveTo(e,t)}onDragEnd(e){let t,o=this,r=o.owner,a=o.itemStyles,n=r.style||{};r.sortable&&(n.height=o.ownerStyle.height||null,n.width=o.ownerStyle.width||null,r.style=n,r.items.forEach((e,r)=>{t=e.style||{},Object.assign(t,{height:a[r].height||null,left:null,position:null,top:null,width:a[r].width||null}),r===o.startIndex&&(t.visibility=null),e.style=t}),o.startIndex!==o.currentIndex&&o.moveTo(o.startIndex,o.currentIndex),Object.assign(o,{currentIndex:-1,indexMap:null,itemRects:null,itemStyles:null,ownerRect:null,startIndex:-1}),o.dragEnd(e))}onDragMove(e){if(this.itemRects){let t,o,r=this,a=.55,n=r.currentIndex,s=r.itemRects,i=s.length-1,l=r.reversedLayoutDirection;"horizontal"===r.sortDirection?(t=e.clientX-r.offsetX-s[n].left,o="width"):(t=e.clientY-r.offsetY-s[n].top,o="height"),n>0&&(!l&&t<0||l&&t>0)?Math.abs(t)>s[n-1][o]*a&&(r.currentIndex--,r.switchItems(n,r.currentIndex)):n<i&&(!l&&t>0||l&&t<0)&&Math.abs(t)>s[n+1][o]*a&&(r.currentIndex++,r.switchItems(n,r.currentIndex))}}onDragStart(e){let t,o,r,a,s=this,i=Neo.getComponent(e.path[0].id),l=s.owner,d=s.itemStyles=[],g=l.layout,c=l.style||{};l.sortable&&(t=l.indexOf(i.id),o={},Object.assign(s,{currentIndex:t,dragElement:n.a.findVdomChild(l.vdom,i.id).vdom,dragProxyConfig:{...s.dragProxyConfig||{},cls:[...l.cls]},indexMap:o,ownerStyle:{height:c.height,width:c.width},reversedLayoutDirection:"column-reverse"===g.direction||"row-reverse"===g.direction,sortDirection:"layout-vbox"===l.layout.ntype?"vertical":"horizontal",startIndex:t}),s.dragStart(e),l.items.forEach((e,t)=>{o[t]=t,d.push({height:e.style&&e.style.height,width:e.style&&e.style.width})}),Neo.main.DomAccess.getBoundingClientRect({id:[l.id].concat(l.items.map(e=>e.id))}).then(e=>{s.ownerRect=e[0],c.height=e[0].height+"px",c.width=e[0].width+"px",l.style=c,e.shift(),s.itemRects=e,l.items.forEach((t,o)=>{r=t.style||{},a=e[o],t.style=Object.assign(r,{height:a.height+"px",left:a.left+"px",position:"absolute",top:a.top+"px",width:a.width+"px"})}),setTimeout(()=>{r=i.style||{},r.visibility="hidden",i.style=r},30)}))}switchItems(e,t){let o,r=this,a=r.reversedLayoutDirection;(!a&&t<e||a&&e<t)&&(o=e,e=t,t=o);let n=r.itemRects,s=r.indexMap,i=n[e],l=n[t],d={...i},g={...l};"horizontal"===r.sortDirection?(i.width=g.width,l.left=d.left+g.width,l.width=d.width):(i.height=g.height,l.height=d.height,l.top=d.top+g.height),o=s[e],s[e]=s[t],s[t]=o,r.updateItem(e,i),r.updateItem(t,l)}updateItem(e,t){let o=this.owner.items[this.indexMap[e]],r=o.style;r.left=t.left+"px",r.top=t.top+"px",o.style=r}}Neo.applyClassConfig(i)},40:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return n}));var r=o(28),a=o(3);class n extends r.default{static getConfig(){return{className:"Neo.draggable.tab.header.toolbar.SortZone",ntype:"tab-header-toolbar-sortzone",dragProxyConfig:{cls:["neo-tab-header-toolbar","neo-toolbar"]}}}moveTo(e,t){this.owner.up().moveTo(e,t)}onDragEnd(e){super.onDragEnd(e),setTimeout(()=>{let e=this.owner,t=e.cls||[];a.a.remove(t,"neo-no-animation"),e.cls=t},300)}onDragStart(e){let t=this.owner,o=t.cls||[];a.a.add(o,"neo-no-animation"),t.cls=o,super.onDragStart(e)}}Neo.applyClassConfig(n)}});