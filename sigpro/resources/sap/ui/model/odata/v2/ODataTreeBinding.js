/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/TreeBinding","sap/ui/model/odata/CountMode","sap/ui/model/ChangeReason","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/odata/ODataUtils","sap/ui/model/TreeBindingUtils","sap/ui/model/odata/OperationMode","sap/ui/model/SorterProcessor","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/Context","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(e,t,i,s,r,o,a,n,h,l,d,f,u,p,c){"use strict";var g=e.extend("sap.ui.model.odata.v2.ODataTreeBinding",{constructor:function(i,r,o,a,h,l){e.apply(this,arguments);this.mParameters=this.mParameters||h||{};this.sGroupId;this.sRefreshGroupId;this.oFinalLengths={};this.oLengths={};this.oKeys={};this.bNeedsUpdate=false;this._bRootMissing=false;this.aSorters=l||[];this.sFilterParams="";if(a instanceof s){a=[a]}this.aApplicationFilters=a;this.oModel.checkFilterOperation(this.aApplicationFilters);this.mRequestHandles={};this.oRootContext=null;this.iNumberOfExpandedLevels=h&&h.numberOfExpandedLevels||0;this.iRootLevel=h&&h.rootLevel||0;this.sCountMode=h&&h.countMode||this.oModel.sDefaultCountMode;if(this.sCountMode==t.None){u.fatal("To use an ODataTreeBinding at least one CountMode must be supported by the service!")}if(h){this.sGroupId=h.groupId||h.batchGroupId}this.bInitial=true;this._mLoadedSections={};this._iPageSize=0;this.sOperationMode=h&&h.operationMode||this.oModel.sDefaultOperationMode;if(this.sOperationMode===n.Default){this.sOperationMode=n.Server}this.bClientOperation=false;switch(this.sOperationMode){case n.Server:this.bClientOperation=false;break;case n.Client:this.bClientOperation=true;break;case n.Auto:this.bClientOperation=false;break}this.iThreshold=h&&h.threshold||0;this.bThresholdRejected=false;this.iTotalCollectionCount=null;this.bUseServersideApplicationFilters=h&&h.useServersideApplicationFilters||false;this.oAllKeys=null;this.oAllLengths=null;this.oAllFinalLengths=null}});g.DRILLSTATES={Collapsed:"collapsed",Expanded:"expanded",Leaf:"leaf"};g.prototype._getNodeFilterParams=function(e){var t=e.isRoot?this.oTreeProperties["hierarchy-node-for"]:this.oTreeProperties["hierarchy-parent-node-for"];var i=this._getEntityType();return o._createFilterParams(new s(t,"EQ",e.id),this.oModel.oMetadata,i)};g.prototype._getLevelFilterParams=function(e,t){var i=this._getEntityType();return o._createFilterParams(new s(this.oTreeProperties["hierarchy-level-for"],e,t),this.oModel.oMetadata,i)};g.prototype._loadSingleRootNodeByNavigationProperties=function(e,t){var i=this,s;if(this.mRequestHandles[t]){this.mRequestHandles[t].abort()}s=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;var r=this.oModel.resolve(this.getPath(),this.getContext());if(r){this.mRequestHandles[t]=this.oModel.read(r,{groupId:s,success:function(s){var r=i._getNavPath(i.getPath());if(s){var o=s;var a=i.oModel._getKey(o);var n=i.oModel.getContext("/"+a);i.oRootContext=n;i._processODataObject(n.getObject(),e,r)}else{i._bRootMissing=true}i.bNeedsUpdate=true;delete i.mRequestHandles[t];i.oModel.callAfterUpdate(function(){i.fireDataReceived({data:s})})},error:function(e){if(e&&e.statusCode!=0&&e.statusText!="abort"){i.bNeedsUpdate=true;i._bRootMissing=true;delete i.mRequestHandles[t];i.fireDataReceived()}}})}};g.prototype.getRootContexts=function(e,t,i){var s=null,r={numberOfExpandedLevels:this.iNumberOfExpandedLevels},o=[];if(this.isInitial()){return o}e=e||0;t=t||this.oModel.sizeLimit;i=i||0;var a=""+s+"-"+e+"-"+this._iPageSize+"-"+i;if(this.bHasTreeAnnotations){this.bDisplayRootNode=true;o=this._getContextsForNodeId(null,e,t,i)}else{s=this.oModel.resolve(this.getPath(),this.getContext());var n=this.oModel.isList(this.sPath,this.getContext());if(n){this.bDisplayRootNode=true}if(this.bDisplayRootNode&&!n){if(this.oRootContext){return[this.oRootContext]}else if(this._bRootMissing){return[]}else{this._loadSingleRootNodeByNavigationProperties(s,a)}}else{r.navPath=this._getNavPath(this.getPath());if(!this.bDisplayRootNode){s+="/"+r.navPath}o=this._getContextsForNodeId(s,e,t,i,r)}}return o};g.prototype.getNodeContexts=function(e,t,i,s){var r,o={};if(this.isInitial()){return[]}if(this.bHasTreeAnnotations){r=this.oModel.getKey(e);o.level=parseInt(e.getProperty(this.oTreeProperties["hierarchy-level-for"]))+1}else{var a=this._getNavPath(e.getPath());if(!a){return[]}r=this.oModel.resolve(a,e);o.navPath=this.oNavigationPaths[a]}return this._getContextsForNodeId(r,t,i,s,o)};g.prototype.hasChildren=function(e){if(this.bHasTreeAnnotations){if(!e){return false}var t=e.getProperty(this.oTreeProperties["hierarchy-drill-state-for"]);var i=this.oModel.getKey(e);var s=this.oLengths[i];if(s===0&&this.oFinalLengths[i]){return false}if(t==="expanded"||t==="collapsed"){return true}else if(t==="leaf"){return false}else{u.warning("The entity '"+e.getPath()+"' has not specified Drilldown State property value.");if(t===undefined||t===""){return true}return false}}else{if(!e){return this.oLengths[this.getPath()]>0}var s=this.oLengths[e.getPath()+"/"+this._getNavPath(e.getPath())];return s!==0}};g.prototype.getChildCount=function(e){if(this.bHasTreeAnnotations){var t;if(!e){t=null}else{t=this.oModel.getKey(e)}return this.oLengths[t]}else{if(!e){if(!this.bDisplayRootNode){return this.oLengths[this.getPath()+"/"+this._getNavPath(this.getPath())]}else{return this.oLengths[this.getPath()]}}return this.oLengths[e.getPath()+"/"+this._getNavPath(e.getPath())]}};g.prototype._getContextsForNodeId=function(e,t,i,s,r){var o=[],h;if(this.sOperationMode==n.Auto){if(this.iTotalCollectionCount==null){if(!this.bCollectionCountRequested){this._getCountForCollection();this.bCollectionCountRequested=true}return[]}}t=t||0;i=i||this.oModel.iSizeLimit;s=s||0;if(this.sOperationMode==n.Auto){if(this.iThreshold>=0){s=Math.max(this.iThreshold,s)}}if(!this._mLoadedSections[e]){this._mLoadedSections[e]=[]}if(this.oFinalLengths[e]&&this.oLengths[e]<t+i){i=Math.max(this.oLengths[e]-t,0)}var l=this;var d=function(t){for(var i=0;i<l._mLoadedSections[e].length;i++){var s=l._mLoadedSections[e][i];if(t>=s.startIndex&&t<s.startIndex+s.length){return true}}};var f=[];var u=Math.max(t-s-this._iPageSize,0);if(this.oKeys[e]){var p=t+i+s;if(this.oLengths[e]){p=Math.min(p,this.oLengths[e])}for(u;u<p;u++){h=this.oKeys[e][u];if(!h){if(!this.bClientOperation&&!d(u)){f=a.mergeSections(f,{startIndex:u,length:1})}}if(u>=t&&u<t+i){if(h){o.push(this.oModel.getContext("/"+h))}else{o.push(undefined)}}}var c=Math.max(t-s-this._iPageSize,0);var v=t+i+s;var y=f[0]&&f[0].startIndex===c&&f[0].startIndex+f[0].length===v;if(f.length>0&&!y){u=Math.max(f[0].startIndex-s-this._iPageSize,0);var m=f[0].startIndex;for(u;u<m;u++){var h=this.oKeys[e][u];if(!h){if(!d(u)){f=a.mergeSections(f,{startIndex:u,length:1})}}}u=f[f.length-1].startIndex+f[f.length-1].length;var P=u+s+this._iPageSize;if(this.oLengths[e]){P=Math.min(P,this.oLengths[e])}for(u;u<P;u++){var h=this.oKeys[e][u];if(!h){if(!d(u)){f=a.mergeSections(f,{startIndex:u,length:1})}}}}}else{if(!d(t)){var C=t-u;f=a.mergeSections(f,{startIndex:u,length:i+C+s})}}if(this.oModel.getServiceMetadata()){if(f.length>0){var _=[];var b="";if(this.bHasTreeAnnotations){if(this.sOperationMode=="Server"||this.bUseServersideApplicationFilters){b=this.getFilterParams()}if(e){b=b?"%20and%20"+b:"";var R=this.oModel.getContext("/"+e);var T=R.getProperty(this.oTreeProperties["hierarchy-node-for"]);var M=this._getNodeFilterParams({id:T});_.push("$filter="+M+b)}else if(e==null){var x="";if(!this.bClientOperation||this.iRootLevel>0){var L=this.bClientOperation?"GE":"EQ";x=this._getLevelFilterParams(L,this.iRootLevel)}if(x||b){if(b&&x){b="%20and%20"+b}_.push("$filter="+x+b)}}}else{b=this.getFilterParams();if(b){_.push("$filter="+b)}}if(this.sCustomParams){_.push(this.sCustomParams)}if(!this.bClientOperation){for(u=0;u<f.length;u++){var F=f[u];this._mLoadedSections[e]=a.mergeSections(this._mLoadedSections[e],{startIndex:F.startIndex,length:F.length});this._loadSubNodes(e,F.startIndex,F.length,0,_,r,F)}}else{if(!this.oAllKeys&&!this.mRequestHandles[g.REQUEST_KEY_CLIENT]){this._loadCompleteTreeWithAnnotations(_)}}}}return o};g.prototype._getCountForCollection=function(){if(!this.bHasTreeAnnotations||this.sOperationMode!=n.Auto){u.error("The Count for the collection can only be retrieved with Hierarchy Annotations and in OperationMode.Auto.");return}var e=[];function s(e){var t=e.__count?parseInt(e.__count):parseInt(e);this.iTotalCollectionCount=t;if(this.sOperationMode==n.Auto){if(this.iTotalCollectionCount<=this.iThreshold){this.bClientOperation=true;this.bThresholdRejected=false}else{this.bClientOperation=false;this.bThresholdRejected=true}this._fireChange({reason:i.Change})}}function r(e){if(e&&e.statusCode===0&&e.statusText==="abort"){return}var t="Request for $count failed: "+e.message;if(e.response){t+=", "+e.response.statusCode+", "+e.response.statusText+", "+e.response.body}u.warning(t)}var o=this.oModel.resolve(this.getPath(),this.getContext());var a="";if(this.iRootLevel>0){a=this._getLevelFilterParams("GE",this.getRootLevel())}var h="";if(this.bUseServersideApplicationFilters){var h=this.getFilterParams()}if(a||h){if(h&&a){h="%20and%20"+h}e.push("$filter="+a+h)}var l="";if(this.sCountMode==t.Request||this.sCountMode==t.Both){l="/$count"}else if(this.sCountMode==t.Inline||this.sCountMode==t.InlineRepeat){e.push("$top=0");e.push("$inlinecount=allpages")}if(o){this.oModel.read(o+l,{urlParameters:e,success:s.bind(this),error:r.bind(this),groupId:this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId})}};g.prototype._getCountForNodeId=function(e,t,i,s,r){var o=this,a;var n=[];function h(t){o.oFinalLengths[e]=true;o.oLengths[e]=parseInt(t)}function l(e){if(e&&e.statusCode===0&&e.statusText==="abort"){return}var t="Request for $count failed: "+e.message;if(e.response){t+=", "+e.response.statusCode+", "+e.response.statusText+", "+e.response.body}u.warning(t)}var d;var f=this.getFilterParams()||"";var p="";if(this.bHasTreeAnnotations){var c=this.oModel.getContext("/"+e);var g=c.getProperty(this.oTreeProperties["hierarchy-node-for"]);d=this.oModel.resolve(this.getPath(),this.getContext());if(e!=null){p=this._getNodeFilterParams({id:g})}else{p=this._getLevelFilterParams("EQ",this.getRootLevel())}}else{d=e}if(p||f){var v="";if(p&&f){v="%20and%20"}f="$filter="+f+v+p;n.push(f)}if(d){a=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.oModel.read(d+"/$count",{urlParameters:n,success:h,error:l,sorters:this.aSorters,groupId:a})}};g.prototype._getParentMap=function(e){var t={};for(var i=0;i<e.length;i++){var s=e[i][this.oTreeProperties["hierarchy-node-for"]];if(t[s]){u.warning("ODataTreeBinding: Duplicate key: "+s+"!")}t[s]=this.oModel._getKey(e[i])}return t};g.prototype._createKeyMap=function(e,t){if(e&&e.length>0){var i=this._getParentMap(e),s={};for(var r=t?1:0;r<e.length;r++){var o=e[r][this.oTreeProperties["hierarchy-parent-node-for"]],a=i[o];if(parseInt(e[r][this.oTreeProperties["hierarchy-level-for"]])===this.iRootLevel){a="null"}if(!s[a]){s[a]=[]}s[a].push(this.oModel._getKey(e[r]))}return s}};g.prototype._importCompleteKeysHierarchy=function(e){var t,i;for(i in e){t=e[i].length||0;this.oKeys[i]=e[i];this.oLengths[i]=t;this.oFinalLengths[i]=true;this._mLoadedSections[i]=[{startIndex:0,length:t}]}};g.prototype._updateNodeKey=function(e,t){var i=this.oModel.getKey(e.context),s,r;if(parseInt(e.context.getProperty(this.oTreeProperties["hierarchy-level-for"]))===this.iRootLevel){s="null"}else{s=this.oModel.getKey(e.parent.context)}r=this.oKeys[s].indexOf(i);if(r!==-1){this.oKeys[s][r]=t}else{this.oKeys[s].push(t)}};g.prototype._loadSubTree=function(e,t){return new Promise(function(i,s){var r,o,a;if(!this.bHasTreeAnnotations){s(new Error("_loadSubTree: doesn't support hierarchies without tree annotations"));return}r="loadSubTree-"+t.join("-");if(this.mRequestHandles[r]){this.mRequestHandles[r].abort()}var n=function(t){if(t.results.length>0){var s=this.oModel.getKey(t.results[0]);this._updateNodeKey(e,s);var o=this._createKeyMap(t.results);this._importCompleteKeysHierarchy(o)}delete this.mRequestHandles[r];this.bNeedsUpdate=true;this.oModel.callAfterUpdate(function(){this.fireDataReceived({data:t})}.bind(this));i(t)}.bind(this);var h=function(e){this.fireDataReceived();if(e&&e.statusCode===0&&e.statusText==="abort"){return}delete this.mRequestHandles[r];s()}.bind(this);this.fireDataRequested();a=this.oModel.resolve(this.getPath(),this.getContext());if(a){o=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[r]=this.oModel.read(a,{urlParameters:t,success:n,error:h,sorters:this.aSorters,groupId:o})}}.bind(this))};g.prototype._loadSubNodes=function(e,i,s,r,o,n,h){var l=this,d,f=false;if((i||s)&&!this.bClientOperation){o.push("$skip="+i+"&$top="+(s+r))}if(!this.oFinalLengths[e]||this.sCountMode==t.InlineRepeat){if(this.sCountMode==t.Inline||this.sCountMode==t.InlineRepeat||this.sCountMode==t.Both){o.push("$inlinecount=allpages");f=true}else if(this.sCountMode==t.Request){l._getCountForNodeId(e)}}var u=""+e+"-"+i+"-"+this._iPageSize+"-"+r;function p(t){if(t){l.oKeys[e]=l.oKeys[e]||[];if(f&&t.__count>=0){l.oLengths[e]=parseInt(t.__count);l.oFinalLengths[e]=true}}if(Array.isArray(t.results)&&t.results.length>0){if(l.bHasTreeAnnotations){var s={};for(var r=0;r<t.results.length;r++){var o=t.results[r];if(r==0){s[e]=i}else if(s[e]==undefined){s[e]=0}l.oKeys[e][s[e]]=l.oModel._getKey(o);s[e]++}}else{for(var r=0;r<t.results.length;r++){var o=t.results[r];var a=l.oModel._getKey(o);l._processODataObject(o,"/"+a,n.navPath);l.oKeys[e][r+i]=a}}}else if(t&&!Array.isArray(t.results)){l.oKeys[null]=l.oModel._getKey(t);if(!l.bHasTreeAnnotations){l._processODataObject(t,e,n.navPath)}}delete l.mRequestHandles[u];l.bNeedsUpdate=true;l.oModel.callAfterUpdate(function(){l.fireDataReceived({data:t})})}function c(t){l.fireDataReceived();if(t&&t.statusCode===0&&t.statusText==="abort"){return}delete l.mRequestHandles[u];if(h){var i=[];for(var s=0;s<l._mLoadedSections[e].length;s++){var r=l._mLoadedSections[e][s];if(h.startIndex>=r.startIndex&&h.startIndex+h.length<=r.startIndex+r.length){if(h.startIndex!==r.startIndex&&h.length!==r.length){i=a.mergeSections(i,{startIndex:r.startIndex,length:h.startIndex-r.startIndex});i=a.mergeSections(i,{startIndex:h.startIndex+h.length,length:r.startIndex+r.length-(h.startIndex+h.length)})}}else{i.push(r)}}l._mLoadedSections[e]=i}}if(e!==undefined){this.fireDataRequested();var g;if(this.bHasTreeAnnotations){g=this.oModel.resolve(this.getPath(),this.getContext())}else{g=e}if(this.mRequestHandles[u]){this.mRequestHandles[u].abort()}if(g){d=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[u]=this.oModel.read(g,{urlParameters:o,success:p,error:c,sorters:this.aSorters,groupId:d})}}};g.REQUEST_KEY_CLIENT="_OPERATIONMODE_CLIENT_TREE_LOADING";g.prototype._loadCompleteTreeWithAnnotations=function(e){var t=this;var s=g.REQUEST_KEY_CLIENT;var r=function(e){if(e.results&&e.results.length>0){var i={};var r;for(var o=0;o<e.results.length;o++){r=e.results[o];var a=r[t.oTreeProperties["hierarchy-node-for"]];if(i[a]){u.warning("ODataTreeBinding - Duplicate data entry for key: "+a+"!")}i[a]=t.oModel._getKey(r)}for(var n=0;n<e.results.length;n++){r=e.results[n];var h=r[t.oTreeProperties["hierarchy-parent-node-for"]];var l=i[h];if(parseInt(r[t.oTreeProperties["hierarchy-level-for"]])===t.iRootLevel){l="null"}t.oKeys[l]=t.oKeys[l]||[];var d=t.oModel._getKey(r);t.oKeys[l].push(d);t.oLengths[l]=t.oLengths[l]||0;t.oLengths[l]++;t.oFinalLengths[l]=true;t._mLoadedSections[l]=t._mLoadedSections[l]||[];t._mLoadedSections[l][0]=t._mLoadedSections[l][0]||{startIndex:0,length:0};t._mLoadedSections[l][0].length++}}else{t.oKeys["null"]=[];t.oLengths["null"]=0;t.oFinalLengths["null"]=true}t.oAllKeys=c.extend(true,{},t.oKeys);t.oAllLengths=c.extend(true,{},t.oLengths);t.oAllFinalLengths=c.extend(true,{},t.oFinalLengths);delete t.mRequestHandles[s];t.bNeedsUpdate=true;if(t.aApplicationFilters&&t.aApplicationFilters.length>0||t.aFilters&&t.aFilters.length>0){t._applyFilter()}if(t.aSorters&&t.aSorters.length>0){t._applySort()}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:e})})};var o=function(e){delete t.mRequestHandles[s];var r=e.statusCode==0;if(!r){t.oKeys={};t.oLengths={};t.oFinalLengths={};t.oAllKeys={};t.oAllLengths={};t.oAllFinalLengths={};t._fireChange({reason:i.Change})}t.fireDataReceived()};this.fireDataRequested();if(this.mRequestHandles[s]){this.mRequestHandles[s].abort()}var a=this.oModel.resolve(this.getPath(),this.getContext());if(a){this.mRequestHandles[s]=this.oModel.read(a,{urlParameters:e,success:r,error:o,sorters:this.aSorters,groupId:this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId})}};g.prototype.resetData=function(e){var t,i=false;if(typeof e==="boolean"){i=e}else{t=e}if(t){var s=t.getPath();delete this.oKeys[s];delete this.oLengths[s];delete this.oFinalLengths[s];delete this._mLoadedSections[s]}else{this.oKeys={};this.bClientOperation=false;switch(this.sOperationMode){case n.Server:this.bClientOperation=false;break;case n.Client:this.bClientOperation=true;break;case n.Auto:this.bClientOperation=false;break}this.bThresholdRejected=false;this.iTotalCollectionCount=null;this.bCollectionCountRequested=false;this.oAllKeys=null;this.oAllLengths=null;this.oAllFinalLengths=null;this.oLengths={};this.oFinalLengths={};this.oRootContext=null;this._bRootMissing=false;if(!i){this._abortPendingRequest()}this._mLoadedSections={};this._iPageSize=0;this.sFilterParams=""}};g.prototype.refresh=function(e,t){if(typeof e==="string"){t=e}this.sRefreshGroupId=t;this._refresh(e);this.sRefreshGroupId=undefined};g.prototype._refresh=function(e,t,s){var r=false;if(!e){if(s){var o=this.oModel.resolve(this.sPath,this.oContext);if(o){if(o.indexOf("?")!==-1){o=o.split("?")[0]}var a=this.oModel.oMetadata._getEntityTypeByPath(o);if(a&&a.entityType in s){r=true}}}if(t&&!r){c.each(this.oKeys,function(e,i){c.each(i,function(e,i){if(i in t){r=true;return false}});if(r){return false}})}if(!t&&!s){r=true}}if(e||r){this.resetData();this.bNeedsUpdate=false;this.bRefresh=true;this._fireRefresh({reason:i.Refresh})}};g.prototype.filter=function(e,t,r){var o=false;t=t||d.Control;this.oModel.checkFilterOperation(e);if(t==d.Control&&(!this.bClientOperation||this.sOperationMode==n.Server)){u.warning("Filtering with ControlFilters is ONLY possible if the ODataTreeBinding is running in OperationMode.Client or "+"OperationMode.Auto, in case the given threshold is lower than the total number of tree nodes.");return}if(!e){e=[]}if(e instanceof s){e=[e]}if(t===d.Control){this.aFilters=e}else{this.aApplicationFilters=e}if(!this.bInitial){if(this.bClientOperation&&(t===d.Control||t===d.Application&&!this.bUseServersideApplicationFilters)){if(this.oAllKeys){this.oKeys=c.extend(true,{},this.oAllKeys);this.oLengths=c.extend(true,{},this.oAllLengths);this.oFinalLengths=c.extend(true,{},this.oAllFinalLengths);this._applyFilter();this._applySort();this._fireChange({reason:i.Filter})}else{this.sChangeReason=i.Filter}}else{this.resetData();this.sChangeReason=i.Filter;this._fireRefresh({reason:this.sChangeReason})}o=true}if(r){return o}else{return this}};g.prototype._applyFilter=function(){var e=this;var t;if(this.bUseServersideApplicationFilters){t=l.groupFilters(this.aFilters)}else{t=l.combineFilters(this.aFilters,this.aApplicationFilters)}var i=function(i){var s=l.apply([i],t,function(t,i){var s=e.oModel.getContext("/"+t);return e.oModel.getProperty(i,s)});return s.length>0};var s={};this._filterRecursive({id:"null"},s,i);this.oKeys=s;if(!this.oKeys["null"]){u.warning("Clientside filter did not match on any node!")}else{this.oLengths["null"]=this.oKeys["null"].length;this.oFinalLengths["null"]=true}};g.prototype._filterRecursive=function(e,t,i){var s=this.oKeys[e.id];if(s){e.children=e.children||[];for(var r=0;r<s.length;r++){var o=this._filterRecursive({id:s[r]},t,i);if(o.isFiltered){t[e.id]=t[e.id]||[];t[e.id].push(o.id);e.children.push(o)}}if(e.children.length>0){e.isFiltered=true}else{e.isFiltered=i(e.id)}if(e.isFiltered){this.oLengths[e.id]=e.children.length;this.oFinalLengths[e.id]=true}return e}else{e.isFiltered=i(e.id);return e}};g.prototype.sort=function(e,t){var s=false;if(e instanceof r){e=[e]}this.aSorters=e||[];if(!this.bInitial){this._abortPendingRequest();if(this.bClientOperation){this.addSortComparators(e,this.oEntityType);if(this.oAllKeys){this._applySort();this._fireChange({reason:i.Sort})}else{this.sChangeReason=i.Sort}}else{this.resetData(undefined,{reason:i.Sort});this.sChangeReason=i.Sort;this._fireRefresh({reason:this.sChangeReason})}s=true}if(t){return s}else{return this}};g.prototype.addSortComparators=function(e,t){var i,s;if(!t){u.warning("Cannot determine sort comparators, as entitytype of the collection is unkown!");return}c.each(e,function(e,r){if(!r.fnCompare){i=this.oModel.oMetadata._getPropertyMetadata(t,r.sPath);s=i&&i.type;p(i,"PropertyType for property "+r.sPath+" of EntityType "+t.name+" not found!");r.fnCompare=o.getComparator(s)}}.bind(this))};g.prototype._applySort=function(){var e=this,t;var i=function(i,s){t=e.oModel.getContext("/"+i);return e.oModel.getProperty(s,t)};for(var s in this.oKeys){h.apply(this.oKeys[s],this.aSorters,i)}};g.prototype.checkUpdate=function(e,t){var s=this.sChangeReason?this.sChangeReason:i.Change;var r=false;if(!e){if(this.bNeedsUpdate||!t){r=true}else{c.each(this.oKeys,function(e,i){c.each(i,function(e,i){if(i in t){r=true;return false}});if(r){return false}})}}if(e||r){this.bNeedsUpdate=false;this._fireChange({reason:s})}this.sChangeReason=undefined};g.prototype._getNavPath=function(e){var t=this.oModel.resolve(e,this.getContext());if(!t){return}var i=t.split("/"),s=i[i.length-1],r;var o=s.split("(")[0];if(o&&this.oNavigationPaths[o]){r=this.oNavigationPaths[o]}return r};g.prototype._processODataObject=function(e,t,i){var s=[],r=this;if(i&&i.indexOf("/")>-1){s=i.split("/");i=s[0];s.splice(0,1)}var o=this.oModel._getObject(t);if(Array.isArray(o)){this.oKeys[t]=o;this.oLengths[t]=o.length;this.oFinalLengths[t]=true}else if(o){this.oLengths[t]=1;this.oFinalLengths[t]=true}if(i&&e[i]){if(Array.isArray(o)){o.forEach(function(e){var t=r.getModel().getData("/"+e);r._processODataObject(t,"/"+e+"/"+i,s.join("/"))})}else if(typeof o==="object"){r._processODataObject(e,t+"/"+i,s.join("/"))}}};g.prototype._hasTreeAnnotations=function(){var e=this.oModel,t=e.oMetadata,i=e.resolve(this.getPath(),this.getContext()),s,r=t.mNamespaces["sap"],o=this;this.oTreeProperties={"hierarchy-level-for":false,"hierarchy-parent-node-for":false,"hierarchy-node-for":false,"hierarchy-drill-state-for":false};var a=function(){var e=0;var t=0;c.each(o.oTreeProperties,function(i,s){t++;if(s){e+=1}});if(e===t){return true}else if(e>0&&e<t){u.warning("Incomplete hierarchy tree annotations. Please check your service metadata definition!")}return false};if(this.mParameters&&this.mParameters.treeAnnotationProperties){this.oTreeProperties["hierarchy-level-for"]=this.mParameters.treeAnnotationProperties.hierarchyLevelFor;this.oTreeProperties["hierarchy-parent-node-for"]=this.mParameters.treeAnnotationProperties.hierarchyParentNodeFor;this.oTreeProperties["hierarchy-node-for"]=this.mParameters.treeAnnotationProperties.hierarchyNodeFor;this.oTreeProperties["hierarchy-drill-state-for"]=this.mParameters.treeAnnotationProperties.hierarchyDrillStateFor;return a()}if(i.indexOf("?")!==-1){i=i.split("?")[0]}s=t._getEntityTypeByPath(i);if(!s){u.fatal("EntityType for path "+i+" could not be found.");return false}c.each(s.property,function(e,t){if(!t.extensions){return true}c.each(t.extensions,function(e,i){var s=i.name;if(i.namespace===r&&s in o.oTreeProperties&&!o.oTreeProperties[s]){o.oTreeProperties[s]=t.name}})});return a()};g.prototype.initialize=function(){if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()&&this.bInitial){var e=this.isRelative();if(!e||e&&this.oContext){this._initialize()}this._fireRefresh({reason:i.Refresh})}return this};g.prototype._initialize=function(){this.bInitial=false;this.bHasTreeAnnotations=this._hasTreeAnnotations();this.oEntityType=this._getEntityType();this._processSelectParameters();this._applyAdapter();return this};g.prototype.setContext=function(e){if(f.hasChanged(this.oContext,e)){this.oContext=e;if(!this.isRelative()){return}var t=this.oModel.resolve(this.sPath,this.oContext);if(t){this.resetData();this._initialize();this._fireChange({reason:i.Context})}else{if(!c.isEmptyObject(this.oAllKeys)||!c.isEmptyObject(this.oKeys)||!c.isEmptyObject(this._aNodes)){this.resetData();this._fireChange({reason:i.Context})}}}};g.prototype.applyAdapterInterface=function(){this.getContexts=this.getContexts||function(){return[]};this.getNodes=this.getNodes||function(){return[]};this.getLength=this.getLength||function(){return 0};this.isLengthFinal=this.isLengthFinal||function(){return false};this.getContextByIndex=this.getContextByIndex||function(){return};this.attachSelectionChanged=this.attachSelectionChanged||function(e,t,i){this.attachEvent("selectionChanged",e,t,i);return this};this.detachSelectionChanged=this.detachSelectionChanged||function(e,t){this.detachEvent("selectionChanged",e,t);return this};this.fireSelectionChanged=this.fireSelectionChanged||function(e){this.fireEvent("selectionChanged",e);return this};return this};g.prototype._applyAdapter=function(){var e="hierarchy-node-descendant-count-for";var t="hierarchy-sibling-rank-for";var i="hierarchy-preorder-rank-for";if(this.bHasTreeAnnotations){var s=this.oModel.resolve(this.getPath(),this.getContext());if(s.indexOf("?")!==-1){s=s.split("?")[0]}var r=this.oModel.oMetadata._getEntityTypeByPath(s);var o=this;c.each(r.property,function(s,r){if(!r.extensions){return true}c.each(r.extensions,function(s,a){var n=a.name;if(a.namespace===o.oModel.oMetadata.mNamespaces["sap"]&&(n==e||n==t||n==i)){o.oTreeProperties[n]=r.name}})});this.oTreeProperties[e]=this.oTreeProperties[e]||this.mParameters.treeAnnotationProperties&&this.mParameters.treeAnnotationProperties.hierarchyNodeDescendantCountFor;if(this.oTreeProperties[e]&&this.sOperationMode==n.Server){var a,h,l;this.oTreeProperties[t]=this.oTreeProperties[t]||this.mParameters.treeAnnotationProperties&&this.mParameters.treeAnnotationProperties.hierarchySiblingRankFor;this.oTreeProperties[i]=this.oTreeProperties[i]||this.mParameters.treeAnnotationProperties&&this.mParameters.treeAnnotationProperties.hierarchyPreorderRankFor;if(this.mParameters.restoreTreeStateAfterChange){if(this.oTreeProperties[t]&&this.oTreeProperties[i]){this._bRestoreTreeStateAfterChange=true;this._aTreeKeyProperties=[];for(a=r.key.propertyRef.length-1;a>=0;a--){this._aTreeKeyProperties.push(r.key.propertyRef[a].name)}}else{u.warning('Tree state restoration not possible: Missing annotation "hierarchy-sibling-rank-for" and/or "hierarchy-preorder-rank-for"');this._bRestoreTreeStateAfterChange=false}}else{this._bRestoreTreeStateAfterChange=false}if(this.mParameters&&this.mParameters.select){if(this.mParameters.select.indexOf(this.oTreeProperties[e])===-1){this.mParameters.select+=","+this.oTreeProperties[e]}if(this._bRestoreTreeStateAfterChange){for(h=this._aTreeKeyProperties.length-1;h>=0;h--){l=this._aTreeKeyProperties[h];if(this.mParameters.select.indexOf(l)===-1){this.mParameters.select+=","+l}}}this.sCustomParams=this.oModel.createCustomParams(this.mParameters)}var d=sap.ui.requireSync("sap/ui/model/odata/ODataTreeBindingFlat");d.apply(this)}else{var f=sap.ui.requireSync("sap/ui/model/odata/ODataTreeBindingAdapter");f.apply(this)}}else if(this.oNavigationPaths){var f=sap.ui.requireSync("sap/ui/model/odata/ODataTreeBindingAdapter");f.apply(this)}else{u.error("Neither hierarchy annotations, nor navigation properties are specified to build the tree.",this)}};g.prototype._processSelectParameters=function(){if(this.mParameters){this.oNavigationPaths=this.mParameters.navigation;if(this.mParameters.select){var e=this.mParameters.select.split(",");var t=[];if(this.oNavigationPaths){c.each(this.oNavigationPaths,function(e,i){if(t.indexOf(i)==-1){t.push(i)}})}c.each(t,function(t,i){if(e.indexOf(i)==-1){e.push(i)}});if(this.bHasTreeAnnotations){c.each(this.oTreeProperties,function(t,i){if(i){if(e.indexOf(i)==-1){e.push(i)}}})}this.mParameters.select=e.join(",")}this.sCustomParams=this.oModel.createCustomParams(this.mParameters)}if(!this.bHasTreeAnnotations&&!this.oNavigationPaths){u.error("Neither navigation paths parameters, nor (complete/valid) tree hierarchy annotations where provided to the TreeBinding.");this.oNavigationPaths={}}};g.prototype.getTreeAnnotation=function(e){return this.bHasTreeAnnotations?this.oTreeProperties[e]:undefined};g.prototype.getDownloadUrl=function(e){var t=[],i;if(e){t.push("$format="+encodeURIComponent(e))}if(this.aSorters&&this.aSorters.length>0){t.push(o.createSortParams(this.aSorters))}if(this.getFilterParams()){t.push("$filter="+this.getFilterParams())}if(this.sCustomParams){t.push(this.sCustomParams)}i=this.oModel.resolve(this.sPath,this.oContext);if(i){return this.oModel._createRequestUrl(i,null,t)}};g.prototype.setNumberOfExpandedLevels=function(e){e=e||0;if(e<0){u.warning("ODataTreeBinding: numberOfExpandedLevels was set to 0. Negative values are prohibited.");e=0}this.iNumberOfExpandedLevels=e;this._fireChange()};g.prototype.getNumberOfExpandedLevels=function(){return this.iNumberOfExpandedLevels};g.prototype.setRootLevel=function(e){e=parseInt(e||0);if(e<0){u.warning("ODataTreeBinding: rootLevels was set to 0. Negative values are prohibited.");e=0}this.iRootLevel=e;this.refresh()};g.prototype.getRootLevel=function(){return parseInt(this.iRootLevel)};g.prototype._getEntityType=function(){var e=this.oModel.resolve(this.sPath,this.oContext);if(e){var t=this.oModel.oMetadata._getEntityTypeByPath(e);p(t,"EntityType for path "+e+" could not be found!");return t}return undefined};g.prototype.getFilterParams=function(){var e;if(this.aApplicationFilters){this.aApplicationFilters=Array.isArray(this.aApplicationFilters)?this.aApplicationFilters:[this.aApplicationFilters];if(this.aApplicationFilters.length>0&&!this.sFilterParams){e=l.groupFilters(this.aApplicationFilters);this.sFilterParams=o._createFilterParams(e,this.oModel.oMetadata,this.oEntityType);this.sFilterParams=this.sFilterParams?"("+this.sFilterParams+")":""}}else{this.sFilterParams=""}return this.sFilterParams};g.prototype._abortPendingRequest=function(){c.each(this.mRequestHandles,function(e,t){if(t){t.abort()}});this.mRequestHandles={}};return g});