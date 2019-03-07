/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/fl/changeHandler/ChangeHandlerMediator","sap/ui/fl/changeHandler/Base"],function(e,t,n){"use strict";var r={};var a="sap.ui.core.Title";var o="sap.m.Toolbar";var i="sap.m.Label";var l="sap.ui.comp.smartfield.SmartLabel";r.applyChange=function(r,c,d){var g=r.getDefinition();var v=r.getDependentControl("targetContainerHeader",d);var f=t.getChangeHandlerSettings({scenario:"addODataFieldWithLabel",oDataServiceVersion:g.content&&g.content.oDataServiceVersion});var s=f&&f.content&&f.content.createFunction;var p=function(e){var t=e.content;var n=false;if(t){n=e.content.newFieldSelector&&e.content.newFieldIndex!==undefined&&e.content.bindingPath&&e.content.oDataServiceVersion&&s}return t&&n};var u=d.modifier,h=d.appComponent;if(p(g)){var b=g.content;var C=b.newFieldSelector;var S=b.bindingPath;var w=b.newFieldIndex;var m=u.getAggregation(c,"content");var I=m.slice();var D=m.indexOf(v);var y=0;var x=0;var A;if(m.length===1||m.length===D+1){y=m.length}else{var F=0;for(F=D+1;F<m.length;F++){var H=u.getControlType(m[F]);if(H===i||H===l){if(x==w){y=F;break}x++}if(H===a||H===o){y=F;break}if(F===m.length-1){y=m.length}}}var P={appComponent:h,view:d.view,fieldSelector:C,bindingPath:S};if(u.bySelector(C,h)){return n.markAsNotApplicable("Control to be created already exists:"+C)}A=s(u,P);var V={};if(A.label&&A.control){V.label=u.getSelector(A.label,h)}V.control=u.getSelector(A.control,h);r.setRevertData(V);I.splice(y,0,A.label,A.control);u.removeAllAggregation(c,"content");for(var T=0;T<I.length;++T){u.insertAggregation(c,"content",I[T],T,d.view)}return true}else{e.log.error("Change does not contain sufficient information to be applied or ChangeHandlerMediator could not be retrieved: ["+g.layer+"]"+g.namespace+"/"+g.fileName+"."+g.fileType)}};r.completeChangeContent=function(e,t,n){var r=n.appComponent;var a=n.view;var o=e.getDefinition();if(!o.content){o.content={}}if(t.parentId){var i=n.modifier.bySelector(t.parentId,r,a);var l=i.getTitle()||i.getToolbar();if(l){e.addDependentControl(l.getId(),"targetContainerHeader",n)}}else{throw new Error("oSpecificChangeInfo.parentId attribute required")}if(t.bindingPath){o.content.bindingPath=t.bindingPath}else{throw new Error("oSpecificChangeInfo.bindingPath attribute required")}if(t.newControlId){o.content.newFieldSelector=n.modifier.getSelector(t.newControlId,r)}else{throw new Error("oSpecificChangeInfo.newControlId attribute required")}if(t.index===undefined){throw new Error("oSpecificChangeInfo.targetIndex attribute required")}else{o.content.newFieldIndex=t.index}if(t.oDataServiceVersion===undefined){throw new Error("oSpecificChangeInfo.oDataServiceVersion attribute required")}else{o.content.oDataServiceVersion=t.oDataServiceVersion}};r.revertChange=function(e,t,n){var r=n.appComponent;var a=n.view;var o=n.modifier;var i=e.getRevertData();var l=o.bySelector(i.control,r,a);if(i.label){var c=o.bySelector(i.label,r,a);o.removeAggregation(t,"content",c);o.destroy(c)}o.removeAggregation(t,"content",l);o.destroy(l);e.resetRevertData();return true};return r},true);