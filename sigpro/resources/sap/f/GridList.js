/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ListBase","sap/ui/base/ManagedObjectObserver","sap/ui/layout/cssgrid/GridLayoutDelegate","sap/ui/layout/cssgrid/GridItemLayoutData","./GridListRenderer"],function(e,t,i,o,r){"use strict";var a=e.extend("sap.f.GridList",{metadata:{library:"sap.f",interfaces:["sap.ui.layout.cssgrid.IGridConfigurable"],aggregations:{customLayout:{type:"sap.ui.layout.cssgrid.GridLayoutBase",multiple:false}}}});a.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oItemDelegate={onAfterRendering:this._onAfterItemRendering};this._addGridLayoutDelegate();this._oGridObserver=new t(a.prototype._onGridChange.bind(this));this._oGridObserver.observe(this,{aggregations:["items"]})};a.prototype.exit=function(){this._removeGridLayoutDelegate();if(this._oGridObserver){this._oGridObserver.disconnect();this._oGridObserver=null}e.prototype.exit.apply(this,arguments)};a.prototype.getGridDomRefs=function(){return[this.getItemsContainerDomRef()]};a.prototype.getGridLayoutConfiguration=a.prototype.getCustomLayout;a.prototype._addGridLayoutDelegate=function(){if(!this.oGridLayoutDelegate){this.oGridLayoutDelegate=new i;this.addEventDelegate(this.oGridLayoutDelegate,this)}};a.prototype._removeGridLayoutDelegate=function(){if(this.oGridLayoutDelegate){this.removeEventDelegate(this.oGridLayoutDelegate);this.oGridLayoutDelegate.destroy();this.oGridLayoutDelegate=null}};a.prototype._onGridChange=function(e){if(e.name!=="items"||!e.child){return}if(e.mutation==="insert"){e.child.addEventDelegate(this._oItemDelegate,e.child)}else if(e.mutation==="remove"){e.child.removeEventDelegate(this._oItemDelegate,e.child)}};a.prototype._onAfterItemRendering=function(){o._setItemStyles(this)};a.prototype.onLayoutDataChange=function(e){o._setItemStyles(e.srcControl)};return a});