/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","../base/ManagedObject","./Element","./DeclarativeSupport","./XMLTemplateProcessor","sap/base/Log","sap/base/util/LoaderExtensions","sap/base/util/merge"],function(e,t,n,i,r,o,a,s){"use strict";var f={},p={};var g=t.extend("sap.ui.core.Fragment",{metadata:{properties:{type:"string"},specialSettings:{fragmentName:"string",fragmentContent:"any",containingView:{type:"sap.ui.core.mvc.View",visibility:"hidden"},oController:{type:"sap.ui.core.mvc.Controller",visibility:"hidden"},sId:{type:"sap.ui.core.ID",visibility:"hidden"},processingMode:{type:"string",visibility:"hidden"}}},constructor:function(e,n){t.apply(this,arguments);if(this._aContent&&this._aContent.length==1){return this._aContent[0]}else{return this._aContent}}});g.registerType=function(e,t){if(!typeof e==="string"){o.error("Ignoring non-string Fragment type: "+e);return}if(p[e]){o.warning("sap.ui.core.Fragment.registerType(): Fragment type '"+e+"' is already defined. Overriding this type now!")}p[e]=t};g.prototype._initCompositeSupport=function(e){if(!e){throw new Error("Settings must be set")}if(!(e.fragmentName||e.fragmentContent)){throw new Error("Please provide a fragment name")}if(e.oController){this.oController=e.oController}this._sExplicitId=e.sId||e.id;this._sFragmentName=e.fragmentName;var t=p[e.type];if(t){t.init.apply(this,[e])}else{throw new Error("No type for the fragment has been specified: "+e.type)}};g.prototype.getFragmentName=function(){return this._sFragmentName};g.prototype.getController=function(){return this.oController};g.byId=function(e,t){if(!(typeof e==="string"&&typeof t==="string")){o.error("sap.ui.core.Fragment.byId: two strings must be given as parameters, but are: "+e+" and "+t);return undefined}return sap.ui.getCore().byId(e+"--"+t)};g.createId=function(e,t){if(!(typeof e==="string"&&typeof t==="string")){o.error("sap.ui.core.Fragment.createId: two strings must be given as parameters, but are: "+e+" and "+t);return undefined}return e+"--"+t};g.prototype.createId=function(e){var t=this._sExplicitId?this._sExplicitId+"--"+e:e;if(this._oContainingView&&this._oContainingView!=this){t=this._oContainingView.createId(t)}return t};g.prototype.isSubView=function(){return true};sap.ui.fragment=function(e,t,n){var i;if(typeof t==="string"){i=t.toLowerCase()}else if(typeof t==="object"&&typeof t.fragmentName==="string"){i=t.fragmentName.toLowerCase()}else{i=""}o.info("Do not use deprecated factory function 'sap.ui."+i+"fragment'. Require 'sap/ui/core/Fragment' and use 'load()' instead","sap.ui."+i+"fragment",null,function(){return{type:"sap.ui."+i+"fragment",name:i?e+".fragment."+i:e}});return m(e,t,n)};function m(e,t,n){var i={};if(typeof e==="string"){i.fragmentName=e;i.oController=n;i.type=t}else if(typeof e==="object"){i=e;if(t){i.oController=t}}else{o.error("sap.ui.fragment() must be called with Fragment name or config object as first parameter, but is: "+e)}return new g(i)}g.load=function(e){var t=Object.assign({},e);t.type=t.type||"XML";t.fragmentName=t.name;t.fragmentContent=t.definition;t.oController=t.controller;delete t.name;delete t.definition;delete t.controller;return Promise.resolve(m(t))};sap.ui.xmlfragment=function(e,t,n){if(typeof e==="string"){if(typeof t==="string"){return sap.ui.fragment({fragmentName:t,sId:e,type:"XML"},n)}else{return sap.ui.fragment(e,"XML",t)}}else{e.type="XML";return sap.ui.fragment(e,t)}};sap.ui.jsfragment=function(e,t){if(typeof e==="string"&&typeof t==="object"){if(t.createContent){f[e]=t;sap.ui.loader._.declareModule(e.replace(/\./g,"/")+".fragment.js")}else{return sap.ui.fragment(e,"JS",t)}}else if(typeof e==="string"&&t===undefined){return sap.ui.fragment(e,"JS")}else{if(typeof e==="object"){e.type="JS";return sap.ui.fragment(e,t)}else if(arguments&&arguments.length>=3){return sap.ui.fragment({id:e,fragmentName:t,type:"JS"},arguments[2])}else{o.error("sap.ui.jsfragment() was called with wrong parameter set: "+e+" + "+t)}}};sap.ui.htmlfragment=function(e,t,n){if(typeof e==="string"){if(typeof t==="string"){return sap.ui.fragment({fragmentName:t,sId:e,type:"HTML"},n)}else{return sap.ui.fragment(e,"HTML",t)}}else{e.type="HTML";return sap.ui.fragment(e,t)}};g.registerType("XML",{init:function(i){if(i.fragmentContent){if(typeof i.fragmentContent==="string"){this._xContent=e.parseXML(i.fragmentContent).documentElement}else{this._xContent=i.fragmentContent}}else{this._xContent=r.loadTemplate(i.fragmentName,"fragment")}this._oContainingView=this._sExplicitId?this:i.containingView||this;if(this._oContainingView===this){this._oContainingView.oController=i.containingView&&i.containingView.oController||i.oController}var o=this;o._sProcessingMode=i.processingMode;t.runWithPreprocessors(function(){o._aContent=r.parseTemplate(o._xContent,o);if(o._aContent&&o._aContent.length&&i.objectBindings){o._aContent.forEach(function(e,t){if(e instanceof n){for(var r in i.objectBindings){e.bindObject(i.objectBindings[r])}}})}},{settings:o._oContainingView._fnSettingsPreprocessor})}});g.registerType("JS",{init:function(e){if(!f[e.fragmentName]){sap.ui.requireSync(e.fragmentName.replace(/\./g,"/")+".fragment")}s(this,f[e.fragmentName]);this._oContainingView=e.containingView||this;var n=this;t.runWithPreprocessors(function(){var t=n.createContent(e.oController||n._oContainingView.oController);n._aContent=[];n._aContent=n._aContent.concat(t)},{settings:n._oContainingView._fnSettingsPreprocessor})}});(function(){var n={};var r=function(e){var t=sap.ui.require.toUrl(e.replace(/\./g,"/"))+".fragment.html";var i=n[t];var r;if(!i){r=e.replace(/\./g,"/")+".fragment.html";i=a.loadResource(r);n[t]=i}return i};g.registerType("HTML",{init:function(n){this._aContent=[];this.getContent=function(){return this._aContent};this.addContent=function(e){this._aContent.push(e)};this._oContainingView=n.containingView||this;this._sProcessingMode=n.processingMode;var o=n.fragmentContent||r(n.fragmentName);this._oTemplate=document.createElement("div");if(typeof o==="string"){this._oTemplate.innerHTML=o}else{var a=o;var s=document.createDocumentFragment();for(var f=0;f<a.length;f++){s.appendChild(a.item(f))}this._oTemplate.appendChild(s)}var p=this._oTemplate.getElementsByTagName("template")[0];var g=this.getMetadata().getAllProperties();if(p){var m=this;e.each(p.attributes,function(e,t){var r=i.convertAttributeToSettingName(t.name,m.getId());var o=t.value;var a=g[r];if(!n[r]){if(a){n[r]=i.convertValueToType(i.getPropertyDataType(a),o)}else if(sap.ui.core.mvc.HTMLView._mAllowedSettings[r]){n[r]=o}}});this._oTemplate=p}if(this._oTemplate.content){var s=this._oTemplate.content;this._oTemplate=document.createElement("div");this._oTemplate.appendChild(s)}var m=this;t.runWithPreprocessors(function(){i.compile(m._oTemplate,m);var e=m.getContent();if(e&&e.length===1){m._aContent=[e[0]]}},{settings:m._oContainingView._fnSettingsPreprocessor})}})})();return g});