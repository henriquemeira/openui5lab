/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Table","./TableExtension","./TableUtils","./library","sap/base/Log"],function(e,t,r,o,l){"use strict";var n={setRowSelection:function(e,t){var o=this.getTable();var l=o.getRows()[e];if(l&&t!=null){r.toggleRowSelection(o,l.getIndex(),t)}},setRowHover:function(e,t){var r=this.getTable();var o=r.getRows()[e];if(o&&t!=null){o._setHovered(t)}},addVerticalScrollingListener:function(e){var t=this.getTable();var r=t._getScrollExtension();var o=r.constructor.ScrollDirection;if(e){r.registerForMouseWheel(e.wheelAreas,{scrollDirection:o.VERTICAL});r.registerForTouch(e.touchAreas,{scrollDirection:o.VERTICAL})}},placeVerticalScrollbarAt:function(e){var t=this.getTable();var r=t._getScrollExtension();if(!e){throw new Error("The HTMLElement in which the vertical scrollbar should be placed must be specified.")}if(!r.isVerticalScrollbarExternal()){var l=sap.ui.getCore().createRenderManager();t.getRenderer().renderVSbExternal(l,t);l.flush(e);var n=e.querySelector("#"+t.getId()+"-"+o.SharedDomRef.VerticalScrollBar);r.markVerticalScrollbarAsExternal(n);t.invalidate()}else{e.appendChild(r.getVerticalScrollbar());r.restoreVerticalScrollPosition()}},renderHorizontalScrollbar:function(e,t,r){var o=this.getTable();if(t==null){throw new Error("The id must be specified.")}o.getRenderer().renderHSbExternal(e,o,t,r)}};var i={onAfterRendering:function(e){var t=this._getScrollExtension();var r=e&&e.isMarked("renderRows");var o=this.getDomRef("tableCCnt");if(t.isVerticalScrollbarExternal()&&!r){t.updateVerticalScrollbarHeight();t.updateVerticalScrollHeight()}if(!r){o.addEventListener("scroll",function(e){this._getSyncExtension().syncInnerVerticalScrollPosition(e.target.scrollTop)}.bind(this))}}};var a=t.extend("sap.ui.table.TableSyncExtension",{_init:function(e,t,r){this._delegate=i;this._oPublicInterface={syncRowSelection:n.setRowSelection.bind(this),syncRowHover:n.setRowHover.bind(this),registerVerticalScrolling:n.addVerticalScrollingListener.bind(this),placeVerticalScrollbarAt:n.placeVerticalScrollbarAt.bind(this),renderHorizontalScrollbar:n.renderHorizontalScrollbar.bind(this)};e.addEventDelegate(this._delegate,e);return"SyncExtension"},destroy:function(){var e=this.getTable();if(e){e.removeEventDelegate(this._delegate)}this._delegate=null;this._oPublicInterface=null;t.prototype.destroy.apply(this,arguments)}});a.prototype.syncRowCount=function(e){this.callInterfaceHook("rowCount",arguments)};a.prototype.syncRowSelection=function(e,t){this.callInterfaceHook("rowSelection",arguments)};a.prototype.syncRowHover=function(e,t){this.callInterfaceHook("rowHover",arguments)};a.prototype.syncRowHeights=function(e){return this.callInterfaceHook("rowHeights",arguments)};a.prototype.syncInnerVerticalScrollPosition=function(e){this.callInterfaceHook("innerVerticalScrollPosition",arguments)};a.prototype.syncLayout=function(e){this.callInterfaceHook("layout",arguments)};a.prototype.callInterfaceHook=function(e,t){var o={};o[e]=Array.prototype.slice.call(t);l.debug("sap.ui.table.TableSyncExtension","Sync "+e+"("+o[e]+")",this.getTable());return r.dynamicCall(this._oPublicInterface,o)};a.prototype.getInterface=function(){return this._oPublicInterface};return a});