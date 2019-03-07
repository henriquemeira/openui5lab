/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/unified/Menu","sap/ui/unified/MenuItem","sap/ui/core/Popup","sap/ui/thirdparty/jquery"],function(e,n,l,t,o){"use strict";t.setInitialZIndex(10);var i={TableUtils:null,openContextMenu:function(n,l,t,u,r){if(!n||!l){return}if(u==null){u=true}var a=o(l);var C=i.TableUtils.getCell(n,a);if(!C){return}var s=i.TableUtils.getCellInfo(C);var f=s.columnIndex;var v=s.rowIndex;var c;if(s.isOfType(i.TableUtils.CELLTYPE.COLUMNHEADER)){var d=C.find(".sapUiTableColDropDown").length>0;if(e.system.desktop||d){i.removeColumnHeaderCellMenu(n,f);c=true;if(u){c=n.fireColumnSelect({column:n.getColumns()[f]})}if(c){i.openColumnContextMenu(n,f,t,C)}}else{i.applyColumnHeaderCellMenu(n,f,C)}}else if(s.isOfType(i.TableUtils.CELLTYPE.ANYCONTENTCELL)){c=true;if(u){var g=i.TableUtils.getRowColCell(n,v,f,f>=0);var p=g.row;var x;var m=n.getBindingInfo("rows");if(m){x=p.getBindingContext(m.model)}var M=n.getContextMenu();if(M){M.setBindingContext(x)}if(f>=0){c=n.fireCellContextmenu({rowIndex:p.getIndex(),columnIndex:f,columnId:g.column.getId(),cellControl:g.cell,rowBindingContext:x,cellDomRef:C[0]})}if(c){c=n.fireBeforeOpenContextMenu({rowIndex:p.getIndex(),columnIndex:g.column?f:null,contextMenu:M})}}if(c){i.openDataCellContextMenu(n,s,t,r)}}},openColumnContextMenu:function(e,n,l,t){if(!e||n==null||n<0){return}if(l==null){l=false}var o=e.getColumns();if(n>=o.length){return}var u=o[n];if(!u.getVisible()){return}for(var r=0;r<o.length;r++){if(o[r]!==u){i.closeColumnContextMenu(e,r)}}i.closeDataCellContextMenu(e);var a=t&&t.attr("colspan");if(a&&a!=="1"){return}u._openMenu(t&&t[0]||u.getDomRef(),l)},closeColumnContextMenu:function(e,n){if(!e||n==null||n<0){return}var l=e.getColumns();if(n>=l.length){return}var t=l[n];t._closeMenu()},openDataCellContextMenu:function(e,o,u,r){if(!e||!o||!o.cell||o.rowIndex>=i.TableUtils.getNonEmptyVisibleRowCount(e)){return}var a=o.columnIndex;var C=o.rowIndex;if(u==null){u=false}var s=e.getColumns();if(a>=s.length){return}var f=s[a];if(f&&!f.getVisible()){return}var v=e.getRows()[C];if(i.hasContextMenu(e)){var c=v.$();var d=c.hasClass("sapUiAnalyticalTableSum");var g=c.hasClass("sapUiTableGroupHeader");if(!d&&!g){e.getContextMenu().openAsContextMenu(r,o.cell)}}else if(e.getEnableCellFilter()&&f&&f.isFilterableByMenu()){if(!e._oCellContextMenu){e._oCellContextMenu=new n(e.getId()+"-cellcontextmenu");var p=new l({text:i.TableUtils.getResourceText("TBL_FILTER")});p._onSelect=function(e,n){var l=this.getContextByIndex(n);var t=e.getFilterProperty();var o=l.getProperty(t);if(this.getEnableCustomFilter()){this.fireCustomFilter({column:e,value:o})}else{this.filter(e,o)}};p.attachSelect(p._onSelect.bind(e,f,v.getIndex()));e._oCellContextMenu.addItem(p);e.addDependent(e._oCellContextMenu)}else{var x=e._oCellContextMenu.getItems()[0];x.mEventRegistry.select[0].fFunction=x._onSelect.bind(e,f,v.getIndex())}var m=v.getCells()[a];var M=i.TableUtils.getParentCell(e,m.getDomRef());if(M&&!i.TableUtils.Grouping.isInGroupingRow(M)){m=M[0];var b=e._oCellContextMenu.bOpen&&e._oCellContextMenu.oOpenerRef!==m;if(b){i.closeDataCellContextMenu(e)}for(var T=0;T<s.length;T++){i.closeColumnContextMenu(e,T)}e._oCellContextMenu.open(u,m,t.Dock.BeginTop,t.Dock.BeginBottom,m,"none none")}}},closeDataCellContextMenu:function(e){if(!e){return}var n=e._oCellContextMenu;var l=n!=null&&n.bOpen;if(l){n.close()}},cleanupDataCellContextMenu:function(e){if(!e||!e._oCellContextMenu){return}e._oCellContextMenu.destroy();e._oCellContextMenu=null},applyColumnHeaderCellMenu:function(e,n,l){if(!e||n==null||n<0){return}var t=e.getColumns();if(n>=t.length){return}var u=l&&l.attr("colspan");if(u&&u!=="1"){return}var r=t[n];if(r.getVisible()&&(r.getResizable()||r._menuHasItems())){var a=l||r.$();var C=a.find(".sapUiTableColCell");var s=a.find(".sapUiTableColCellMenu").length>0;if(!s){i.removeColumnHeaderCellMenu(e);C.hide();var f="";if(r._menuHasItems()){f="<div class='sapUiTableColDropDown'></div>"}var v="";if(r.getResizable()){v="<div class='sapUiTableColResizer''></div>"}var c=o("<div class='sapUiTableColCellMenu'>"+f+v+"</div>");a.append(c);a.on("focusout",function(e,n){i.removeColumnHeaderCellMenu(e);this.off("focusout")}.bind(a,e,n))}}},removeColumnHeaderCellMenu:function(e){var n=e&&e.$().find(".sapUiTableCHT .sapUiTableColCellMenu");if(n.length){n.parent().find(".sapUiTableColCell").show();n.remove()}},hasContextMenu:function(e){return e&&e.getContextMenu()}};return i},true);