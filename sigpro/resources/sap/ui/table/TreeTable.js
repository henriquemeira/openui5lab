/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Table","./TableRenderer","sap/ui/model/ClientTreeBindingAdapter","sap/ui/model/TreeBindingCompatibilityAdapter","./library","sap/ui/core/Element","./TableUtils","./BindingSelectionAdapter","sap/base/Log","sap/base/assert"],function(e,t,i,o,r,n,s,a,p,l){"use strict";var u=e.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false,deprecated:true},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},rootLevel:{type:"int",group:"Data",defaultValue:0}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}},renderer:"sap.ui.table.TableRenderer"});u.prototype.init=function(){e.prototype.init.apply(this,arguments);s.Grouping.setTreeMode(this);this._initSelectionAdapter()};u.prototype._initSelectionAdapter=function(){this._oSelectionAdapter=new a;this._oSelectionAdapter.attachEvent("selectionChange",this._onSelectionChanged,this)};u.prototype.bindRows=function(t){t=e._getSanitizedBindingInfo(arguments);if(t){if(!t.parameters){t.parameters={}}t.parameters.rootLevel=this.getRootLevel();t.parameters.collapseRecursive=this.getCollapseRecursive();t.parameters.numberOfExpandedLevels=t.parameters.numberOfExpandedLevels||(this.getExpandFirstLevel()?1:0)}return e.prototype.bindRows.call(this,t)};u.prototype._bindAggregation=function(t,i){e.prototype._bindAggregation.call(this,t,i);var o=this.getBinding("rows");if(t==="rows"&&o){o.attachEvents({selectionChanged:this._onSelectionChanged.bind(this)})}};u.prototype.setFixedRowCount=function(e){p.warning('TreeTable: the property "fixedRowCount" is not supported and will be ignored!');return this};u.prototype.isTreeBinding=function(e){e=e||"rows";if(e==="rows"){return true}return n.prototype.isTreeBinding.apply(this,arguments)};u.prototype.getBinding=function(e){e=e||"rows";var t=n.prototype.getBinding.call(this,e);if(t&&e==="rows"&&!t.getLength){if(t.isA("sap.ui.model.odata.ODataTreeBinding")){o(t,this)}else if(t.isA("sap.ui.model.odata.v2.ODataTreeBinding")){t.applyAdapterInterface()}else if(t.isA("sap.ui.model.ClientTreeBinding")){i.apply(t)}else{p.error("Binding not supported by sap.ui.table.TreeTable")}}return t};u.prototype._getContexts=function(e,t,i){var o=this.getBinding("rows");if(o){return o.getNodes(e,t,i)}else{return[]}};u.prototype._onGroupHeaderChanged=function(e,t){this.fireToggleOpenState({rowIndex:e,rowContext:this.getContextByIndex(e),expanded:t})};u.prototype.expand=function(e){s.Grouping.toggleGroupHeader(this,e,true);return this};u.prototype.collapse=function(e){s.Grouping.toggleGroupHeader(this,e,false);return this};u.prototype.collapseAll=function(){var e=this.getBinding("rows");if(e){e.collapseToLevel(0);this.setFirstVisibleRow(0)}return this};u.prototype.expandToLevel=function(e){var t=this.getBinding("rows");l(t&&t.expandToLevel,"TreeTable.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(t&&t.expandToLevel){t.expandToLevel(e)}return this};u.prototype.isExpanded=function(e){var t=this.getBinding("rows");if(t){return t.isExpanded(e)}return false};u.prototype.getContextByIndex=function(e){var t=this.getBinding("rows");if(t){return t.getContextByIndex(e)}};u.prototype.setRootLevel=function(e){this.setFirstVisibleRow(0);var t=this.getBinding("rows");if(t){l(t.setRootLevel,"rootLevel is not supported by the used binding");if(t.setRootLevel){t.setRootLevel(e)}}this.setProperty("rootLevel",e,true);return this};u.prototype.setCollapseRecursive=function(e){var t=this.getBinding("rows");if(t){l(t.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(t.setCollapseRecursive){t.setCollapseRecursive(e)}}this.setProperty("collapseRecursive",!!e,true);return this};u.prototype.setUseGroupMode=function(e){this.setProperty("useGroupMode",!!e);if(!!e){s.Grouping.setGroupMode(this)}else{s.Grouping.setTreeMode(this)}return this};u.prototype.setEnableGrouping=function(){p.warning("The property enableGrouping is not supported by the sap.ui.table.TreeTable control");return this};u.prototype.setGroupBy=function(){p.warning("The groupBy association is not supported by the sap.ui.table.TreeTable control");return this};u.prototype.setUseFlatMode=function(e){e=!!e;if(e!=this._bFlatMode){this._bFlatMode=e;if(this.getDomRef()&&s.Grouping.isTreeMode(this)){this.invalidate()}}return this};return u});