/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ClientModel","sap/ui/model/Context","./JSONListBinding","./JSONPropertyBinding","./JSONTreeBinding","sap/base/Log","sap/ui/thirdparty/jquery","sap/base/util/isPlainObject"],function(e,t,r,i,s,a,o,n){"use strict";var c=e.extend("sap.ui.model.json.JSONModel",{constructor:function(t,r){this.pSequentialImportCompleted=Promise.resolve();e.apply(this,arguments);this.bObserve=r;if(t&&typeof t=="object"){this.setData(t)}},metadata:{publicMethods:["setJSON","getJSON"]}});c.prototype.setData=function(e,t){if(t){this.oData=o.extend(true,Array.isArray(this.oData)?[]:{},this.oData,e)}else{this.oData=e}if(this.bObserve){this.observeData()}this.checkUpdate()};c.prototype.observeData=function(){var e=this;function t(e){return function(){return e}}function r(t,r){return function(i){s(i,t,r);e.checkUpdate()}}function i(e,i,s){if(typeof s=="function"){e[i]=s}else{Object.defineProperty(e,i,{get:t(s),set:r(e,i)})}}function s(e,t,r){if(Array.isArray(e)){for(var a=0;a<e.length;a++){s(e[a],e,a)}}else if(n(e)){for(var a in e){s(e[a],e,a)}}if(t){i(t,r,e)}}s(this.oData)};c.prototype.setJSON=function(e,t){var r;try{r=o.parseJSON(e);this.setData(r,t)}catch(e){a.fatal("The following problem occurred: JSON parse Error: "+e);this.fireParseError({url:"",errorCode:-1,reason:"",srcText:e,line:-1,linepos:-1,filepos:-1})}};c.prototype.getJSON=function(){return JSON.stringify(this.oData)};c.prototype.loadData=function(e,t,r,i,s,o,n){var c;r=r!==false;i=i||"GET";o=o===undefined?this.bCache:o;this.fireRequestSent({url:e,type:i,async:r,headers:n,info:"cache="+o+";bMerge="+s,infoObject:{cache:o,merge:s}});var u=function(t){if(!t){a.fatal("The following problem occurred: No data was retrieved by service: "+e)}this.setData(t,s);this.fireRequestCompleted({url:e,type:i,async:r,headers:n,info:"cache="+o+";bMerge="+s,infoObject:{cache:o,merge:s},success:true})}.bind(this);var f=function(t,c){var u=c||t.textStatus;var t=r?t.request:t;var f=t.status;var p=t.statusText;var h=t.responseText;var l={message:u,statusCode:f,statusText:p,responseText:h};a.fatal("The following problem occurred: "+u,h+","+f+","+p);this.fireRequestCompleted({url:e,type:i,async:r,headers:n,info:"cache="+o+";bMerge="+s,infoObject:{cache:o,merge:s},success:false,errorobject:l});this.fireRequestFailed(l)}.bind(this);var p=function(s,a){this._ajax({url:e,async:r,dataType:"json",cache:o,data:t,headers:n,type:i,success:s,error:a})}.bind(this);if(r){c=new Promise(function(e,t){var r=function(e,r,i){t({request:e,textStatus:r,error:i})};p(e,r)});this.pSequentialImportCompleted=this.pSequentialImportCompleted.then(function(){return c.then(u,f).catch(function(e){a.error("Loading of data failed: "+e.stack)})})}else{p(u,f)}};c.prototype.bindProperty=function(e,t,r){var s=new i(this,e,t,r);return s};c.prototype.bindList=function(e,t,i,s,a){var o=new r(this,e,t,i,s,a);return o};c.prototype.bindTree=function(e,t,r,i,a){var o=new s(this,e,t,r,i,a);return o};c.prototype.setProperty=function(e,t,r,i){var s=this.resolve(e,r),a,o,n;if(!s){return false}if(s=="/"){this.setData(t);return true}a=s.lastIndexOf("/");o=s.substring(0,a||1);n=s.substr(a+1);var c=this._getObject(o);if(c){c[n]=t;this.checkUpdate(false,i);return true}return false};c.prototype.getProperty=function(e,t){return this._getObject(e,t)};c.prototype._getObject=function(e,r){var i=this.isLegacySyntax()?this.oData:null;if(r instanceof t){i=this._getObject(r.getPath())}else if(r){i=r}if(!e){return i}var s=e.split("/"),a=0;if(!s[0]){i=this.oData;a++}while(i&&s[a]){i=i[s[a]];a++}return i};c.prototype.isList=function(e,t){var r=this.resolve(e,t);return Array.isArray(this._getObject(r))};c.prototype._setMetaModel=function(e){this._oMetaModel=e};c.prototype.getMetaModel=function(){return this._oMetaModel};return c});