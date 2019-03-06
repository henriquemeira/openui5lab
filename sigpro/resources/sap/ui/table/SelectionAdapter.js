/*
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","./library"],function(e,t){"use strict";var n=t.SelectionMode;var o=e.extend("sap.ui.table.SelectionAdapter",{metadata:{properties:{selectionMode:{type:"sap.ui.table.SelectionMode",defaultValue:n.MultiToggle}},events:{selectionChange:{parameters:{indices:{type:"int[]"},selectAll:{type:"boolean"}}}}}});o.prototype.init=function(){this._bSuspended=false};o.prototype.exit=function(){this._oBinding=null};o.prototype.addSelectionInterval=function(e,t){};o.prototype.clearSelection=function(){};o.prototype.getSelectedIndex=function(){return-1};o.prototype.getSelectedIndices=function(){return[]};o.prototype.getSelectableCount=function(){return 0};o.prototype.getSelectedCount=function(){return 0};o.prototype.isIndexSelectable=function(e){return false};o.prototype.isIndexSelected=function(e){return false};o.prototype.removeSelectionInterval=function(e,t){};o.prototype.selectAll=function(){};o.prototype.setSelectedIndex=function(e){};o.prototype.setSelectionInterval=function(e,t){};o.prototype.fireSelectionChange=function(e){if(!this._isSuspended()){this.fireEvent("selectionChange",e)}};o.prototype._getBinding=function(){return this._oBinding};o.prototype._setBinding=function(e){this._oBinding=e};o.prototype._suspend=function(){this._bSuspended=true};o.prototype._resume=function(){this._bSuspended=false};o.prototype._isSuspended=function(){return this._bSuspended};return o});