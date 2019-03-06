/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ColumnMenu","sap/ui/unified/MenuRenderer","./library","sap/ui/thirdparty/jquery"],function(e,t,o,u){"use strict";var n=o.GroupEventType;var r=e.extend("sap.ui.table.AnalyticalColumnMenu",{metadata:{library:"sap.ui.table"},renderer:"sap.ui.unified.MenuRenderer"});r.prototype._addMenuItems=function(){e.prototype._addMenuItems.apply(this);if(this._oColumn){this._addSumMenuItem()}};r.prototype._addGroupMenuItem=function(){var e=this._oColumn,t=this._oTable;if(e.isGroupable()){this._oGroupIcon=this._createMenuItem("group","TBL_GROUP",e.getGrouped()?"accept":null,function(o){var u=o.getSource();var r=e.getGrouped();var i=r?n.group:n.ungroup;e.setGrouped(!r);t.fireGroup({column:e,groupedColumns:t._aGroupedColumns,type:i});u.setIcon(!r?"sap-icon://accept":null)});this.addItem(this._oGroupIcon)}};r.prototype._addSumMenuItem=function(){var e=this._oColumn,t=this._oTable,o=t.getBinding("rows"),n=o&&o.getAnalyticalQueryResult();if(t&&n&&n.findMeasureByPropertyName(e.getLeadingProperty())){this._oSumItem=this._createMenuItem("total","TBL_TOTAL",e.getSummed()?"accept":null,u.proxy(function(t){var o=t.getSource(),u=e.getSummed();e.setSummed(!u);o.setIcon(!u?"sap-icon://accept":null)},this));this.addItem(this._oSumItem)}};r.prototype.open=function(){e.prototype.open.apply(this,arguments);var t=this._oColumn;this._oSumItem&&this._oSumItem.setIcon(t.getSummed()?"sap-icon://accept":null);this._oGroupIcon&&this._oGroupIcon.setIcon(t.getGrouped()?"sap-icon://accept":null)};return r});