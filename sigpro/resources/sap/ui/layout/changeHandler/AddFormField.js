/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/fl/changeHandler/Base","sap/ui/fl/changeHandler/ChangeHandlerMediator","sap/ui/thirdparty/jquery"],function(e,n,t,r){"use strict";var i={};i.applyChange=function(i,o,a){var d=i.getDefinition();var l=a.view;var c=d.content.newFieldIndex;var f=a.modifier;var p=i.getDependentControl("parentFormContainer",a);var g,v;var s=a.appComponent;var u=t.getChangeHandlerSettings({scenario:"addODataFieldWithLabel",oDataServiceVersion:d.content&&d.content.oDataServiceVersion});var h=u&&u.content&&u.content.createFunction;var C=function(e){var n=e.content;var t=false;if(n){t=e.content.newFieldSelector&&e.content.newFieldIndex!==undefined&&e.content.bindingPath&&e.content.oDataServiceVersion&&h}return n&&t};if(C(d)){var w=d.content;var m=w.newFieldSelector;var S=r.extend({},w.newFieldSelector);S.id=S.id+"-field";var b=w.bindingPath;i.setRevertData({newFieldSelector:m});var D={appComponent:a.appComponent,view:a.view,fieldSelector:S,bindingPath:b};if(f.bySelector(m,s)){return n.markAsNotApplicable("Control to be created already exists:"+m)}g=h(f,D);v=f.createControl("sap.ui.layout.form.FormElement",s,l,m);f.insertAggregation(v,"label",g.label,0,l);f.insertAggregation(v,"fields",g.control,0,l);f.insertAggregation(p,"formElements",v,c,l);return true}else{e.log.error("Change does not contain sufficient information to be applied or ChangeHandlerMediator could not be retrieved: ["+d.layer+"]"+d.namespace+"/"+d.fileName+"."+d.fileType)}};i.completeChangeContent=function(e,n,t){var r=t.appComponent;var i=e.getDefinition();if(!i.content){i.content={}}if(n.parentId){e.addDependentControl(n.parentId,"parentFormContainer",t)}else{throw new Error("oSpecificChangeInfo.parentId attribute required")}if(n.bindingPath){i.content.bindingPath=n.bindingPath}else{throw new Error("oSpecificChangeInfo.bindingPath attribute required")}if(n.newControlId){i.content.newFieldSelector=t.modifier.getSelector(n.newControlId,r)}else{throw new Error("oSpecificChangeInfo.newControlId attribute required")}if(n.index===undefined){throw new Error("oSpecificChangeInfo.targetIndex attribute required")}else{i.content.newFieldIndex=n.index}if(n.oDataServiceVersion===undefined){throw new Error("oSpecificChangeInfo.oDataServiceVersion attribute required")}else{i.content.oDataServiceVersion=n.oDataServiceVersion}};i.revertChange=function(e,n,t){var r=t.appComponent;var i=t.view;var o=t.modifier;var a=e.getRevertData().newFieldSelector;var d=o.bySelector(a,r,i);o.removeAggregation(n,"formElements",d);o.destroy(d);e.resetRevertData();return true};return i},true);