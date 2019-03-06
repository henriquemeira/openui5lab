/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Element","sap/ui/core/Control","sap/m/Popover","sap/ui/core/delegate/ItemNavigation","sap/ui/core/InvisibleText","./NavigationListRenderer","sap/base/Log"],function(e,t,i,o,s,a,r,n,p){"use strict";var l=o.extend("sap.tnt.NavigationList",{metadata:{library:"sap.tnt",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension"},expanded:{type:"boolean",group:"Misc",defaultValue:true},selectedKey:{type:"string",group:"Data"}},defaultAggregation:"items",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},selectedItem:{type:"sap.tnt.NavigationListItem",multiple:false}},events:{itemSelect:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});l.prototype.init=function(){this._itemNavigation=new a;this._itemNavigation.setCycling(false);this.addEventDelegate(this._itemNavigation);this._itemNavigation.setPageSize(10);this._itemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");if(sap.ui.getCore().getConfiguration().getAccessibility()&&!l._sAriaPopupLabelId){l._sAriaPopupLabelId=new r({text:""}).toStatic().getId()}};l.prototype.onBeforeRendering=function(){var e=this.getSelectedKey();this.setSelectedKey(e)};l.prototype.onAfterRendering=function(){this._itemNavigation.setRootDomRef(this.getDomRef());this._itemNavigation.setItemDomRefs(this._getDomRefs());if(this._selectedItem){this._selectedItem._select()}};l.prototype._updateNavItems=function(){this._itemNavigation.setItemDomRefs(this._getDomRefs())};l.prototype._getDomRefs=function(){var t=[];var i=this.getItems();for(var o=0;o<i.length;o++){e.merge(t,i[o]._getDomRefs())}return t};l.prototype._adaptPopoverPositionParams=function(){if(this.getShowArrow()){this._marginLeft=10;this._marginRight=10;this._marginBottom=10;this._arrowOffset=18;this._offsets=["0 -18","18 0","0 18","-18 0"];this._myPositions=["center bottom","begin top","center top","end top"];this._atPositions=["center top","end top","center bottom","begin top"]}else{this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"];this._myPositions=["begin bottom","begin top","begin top","end top"];this._atPositions=["begin top","end top","begin bottom","begin top"]}};l.prototype.exit=function(){if(this._itemNavigation){this._itemNavigation.destroy()}};l.prototype._selectItem=function(e){this.fireItemSelect(e);var t=e.item;this.setSelectedItem(t,true)};l.prototype._findItemByKey=function(e){var t=this.getItems(),i,o,s,a,r;for(a=0;a<t.length;a++){i=t[a];if(i._getUniqueKey()===e){return i}o=i.getItems();for(r=0;r<o.length;r++){s=o[r];if(s._getUniqueKey()===e){return s}}}return null};l.prototype.setSelectedKey=function(e){var t=this._findItemByKey(e);this.setSelectedItem(t,true);this.setProperty("selectedKey",e,true);return this};l.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");if(!e){return null}return sap.ui.getCore().byId(e)};l.prototype.setSelectedItem=function(e){var t,o,s;if(this._selectedItem){this._selectedItem._unselect()}if(!e){this._selectedItem=null}s=e instanceof i&&e.isA("sap.tnt.NavigationListItem");if(typeof e!=="string"&&!s){p.warning("Type of selectedItem association should be string or instance of sap.tnt.NavigationListItem. New value was not set.");this.setAssociation("selectedItem",null,true);return this}this.setAssociation("selectedItem",e,true);if(typeof e==="string"){t=sap.ui.getCore().byId(e)}else{t=e}o=t?t._getUniqueKey():"";this.setProperty("selectedKey",o,true);if(t){t._select();this._selectedItem=t;return this}p.warning("Type of selectedItem association should be a valid NavigationListItem object or ID. New value was not set.");return this};l.prototype._openPopover=function(e,t){var i=this;var o=t.getSelectedItem();if(o&&t.isGroupSelected){o=null}var a=this._popover=new s({showHeader:false,horizontalScrolling:false,verticalScrolling:true,initialFocus:o,afterClose:function(){if(i._popover){i._popover.destroy();i._popover=null}},content:t,ariaLabelledBy:[l._sAriaPopupLabelId]}).addStyleClass("sapContrast sapContrastPlus");a._adaptPositionParams=this._adaptPopoverPositionParams;a.openBy(e)};l.prototype._closePopover=function(){if(this._popover){this._popover.close()}};return l},true);