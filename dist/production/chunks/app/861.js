(self.webpackChunkmyapp=self.webpackChunkmyapp||[]).push([[861],{110:(e,r,t)=>{"use strict";t.d(r,{Z:()=>s});var o=t(643),a=t(249);class n extends a.Z{static getConfig(){return{className:"Neo.draggable.DragProxyComponent",ntype:"dragproxy",autoMount:!0,autoRender:!0,cls:["neo-dragproxy"],moveInMainThread:!0}}constructor(e){super(e);let r=this;r.on("mounted",r.onMounted,r)}onMounted(e){this.moveInMainThread&&Neo.main.addon.DragDrop.setDragProxyElement({appName:this.appName,id:e})}}Neo.applyClassConfig(n);var d=t(926),l=(t(389),t(939));class s extends o.Z{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.draggable.DragZone",ntype:"dragzone",addDragProxyCls:!0,alwaysFireDragMove:!1,appName_:null,bodyCursorStyle:null,boundaryContainerId:null,data:null,dragElement:null,dragElementRect:null,dragProxy:null,dragProxyConfig_:null,dragProxyCls:"neo-dragproxy",dropZoneIdentifier:null,moveHorizontal:!0,moveInMainThread:!0,moveVertical:!0,offsetX:0,offsetY:0,owner:null,proxyParentId_:"document.body",scrollContainerId:null,scrollFactorLeft:1,scrollFactorTop:1,useProxyWrapper:!0}}constructor(e){super(e),Neo.main.addon.DragDrop||console.error("You can not use Neo.draggable.DragZone without adding Neo.main.addon.DragDrop to the main thread addons",this.id)}afterSetAppName(e,r){e&&Neo.currentWorker.insertThemeFiles(e,this.__proto__)}beforeGetDragProxyConfig(e){return Neo.clone(e,!0,!0)}createDragProxy(e){let r=this,t=Neo.getComponent(r.getDragElementRoot().id)||r.owner,o=r.dragElementRect,a=r.dragProxyConfig&&r.dragProxyConfig.vdom,s=l.Z.clone(a||r.dragElement);const i={module:n,appName:r.appName,moveInMainThread:r.moveInMainThread,parentId:r.proxyParentId,style:{height:`${e.height}px`,left:`${r.moveHorizontal?e.x:o.x}px`,top:`${r.moveVertical?e.y:o.y}px`,width:`${e.width}px`},...r.dragProxyConfig||{},vdom:r.useProxyWrapper?{cn:[s]}:s};i.cls=i.cls||[],t&&i.cls.push(t.getTheme()),s.cls&&!r.useProxyWrapper&&i.cls.push(...s.cls),r.addDragProxyCls&&i.cls&&d.Z.add(i.cls,r.dragProxyCls),r.dragProxy=Neo.create(i)}destroyDragProxy(){let e=this,r=e.dragProxy.id;setTimeout((()=>{Neo.currentWorker.promiseMessage("main",{action:"updateDom",appName:e.appName,deltas:[{action:"removeNode",id:r}]})}),e.moveInMainThread?0:30),e.dragProxy.destroy()}dragEnd(e){let r=this,t=r.owner,o=t.cls;d.Z.remove(o,"neo-is-dragging"),t.cls=o,r.dragProxy&&(r.destroyDragProxy(),r.dragProxy=null),Object.assign(r,{dragElementRect:null,offsetX:0,offsetY:0,scrollContainerId:null}),r.fire("dragEnd",e),r.resetData()}dragMove(e){let r,t=this;!t.moveInMainThread&&t.dragProxy&&(r=t.dragProxy.style,t.moveHorizontal&&(r.left=e.clientX-t.offsetX+"px"),t.moveVertical&&(r.top=e.clientY-t.offsetY+"px"),t.dragProxy.style=r),t.fire("dragMove",e)}dragStart(e){let r,t,o=this,a=o.owner,n=a.cls,l=o.getDragElementRect(e);o.setData(),Neo.main.addon.DragDrop.setConfigs({appName:o.appName,...o.getMainThreadConfigs()}),d.Z.add(n,"neo-is-dragging"),a.cls=n,r=e.clientX-l.left,t=e.clientY-l.top,Object.assign(o,{dragElementRect:l,offsetX:r,offsetY:t}),o.createDragProxy(l),o.fire("dragStart",{clientX:e.clientX,clientY:e.clientY,dragElementRect:l,eventData:e,id:o.id,offsetX:r,offsetY:t})}getDragElementRect(e){let r=this.getDragElementRoot().id;for(let t of e.path)if(t.id===r)return t.rect;for(let t of e.targetPath)if(t.id===r)return t.rect;return null}getDragElementRoot(){return this.dragElement}getMainThreadConfigs(){let e=this;return{alwaysFireDragMove:e.alwaysFireDragMove,bodyCursorStyle:e.bodyCursorStyle,boundaryContainerId:e.boundaryContainerId,dragElementRootId:e.getDragElementRoot().id,dragProxyCls:e.dragProxyCls,dragZoneId:e.id,dropZoneIdentifier:e.dropZoneIdentifier,moveHorizontal:e.moveHorizontal,moveVertical:e.moveVertical,scrollContainerId:e.scrollContainerId,scrollFactorLeft:e.scrollFactorLeft,scrollFactorTop:e.scrollFactorTop}}onDrop(e){this.fire("drop",e)}onDropEnter(e){this.fire("drop:enter",e)}onDropLeave(e){this.fire("drop:leave",e)}resetData(){setTimeout((()=>{this.data=null}),30)}setData(e={}){let r=this;r.data={dragElement:r.getDragElementRoot(),dragZoneId:r.id,...e}}}Neo.applyClassConfig(s)},804:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>d});var o=t(110),a=t(926),n=t(939);class d extends o.Z{static getConfig(){return{className:"Neo.draggable.list.DragZone",ntype:"list-dragzone",dragProxyConfig:{cls:["neo-list"]}}}constructor(e){super(e);let r=this,t=r.owner,o=t.domListeners,a={delegate:".neo-draggable",scope:r},n=t.store;o.push({"drag:end":r.onDragEnd,...a},{"drag:start":r.onDragStart,...a}),t.domListeners=o,n.on({load:r.onStoreLoad,scope:r}),n.getCount()>0&&r.onStoreLoad()}adjustListItemCls(e){let r,t=this,o=t.owner,n=o.store,d=o.vdom;n.items.forEach(((o,n)=>{r=t.getItemVdom(o,n),r&&(r.cls=r.cls||[],a.Z[e?"add":"remove"](r.cls,"neo-draggable"))})),o.vdom=d}getItemVdom(e,r){return this.owner.vdom.cn[r]}onDragEnd(e){if(this.owner.draggable){let e=this,r=e.dragProxy,t=r.cls||{},o=e.dragElementRect,n=r.wrapperStyle||{};a.Z.add(t,"neo-animate"),r.cls=t,setTimeout((()=>{n.left=`${o.left}px`,n.top=`${o.top}px`,r.wrapperStyle=n,setTimeout((()=>{e.dragEnd()}),300)}),30)}}onDragStart(e){let r=this;r.owner.draggable&&(r.dragElement=n.Z.findVdomChild(r.owner.vdom,e.path[0].id).vdom,r.dragStart(e))}onStoreLoad(){this.adjustListItemCls(!0)}setData(e={}){let r=this.owner,t=r.getItemRecordId(this.getDragElementRoot().id);e.record=r.store.get(t),super.setData(e)}}Neo.applyClassConfig(d)}}]);