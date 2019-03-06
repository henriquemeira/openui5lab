/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PropertyBinding","./ChangeReason","sap/base/assert","sap/base/Log"],function(t,n,e,a){"use strict";var i=t.extend("sap.ui.model.StaticBinding",{constructor:function(n){t.apply(this,[null,""]);this.vValue=n},metadata:{publicMethods:["attachChange","detachChange"]}});i.prototype.getPath=function(){e(null,"Static Binding has no path!");return null};i.prototype.getModel=function(){e(null,"Static Binding has no model!");return null};i.prototype.getContext=function(){e(null,"Static Binding has no context!");return null};i.prototype.getValue=function(){return this.vValue};i.prototype.setValue=function(t){if(t!==this.vValue){this.vValue=t;this._fireChange({reason:n.Change})}};i.prototype.attachChange=function(t,n){this.attachEvent("change",t,n)};i.prototype.detachChange=function(t,n){this.detachEvent("change",t,n)};return i});