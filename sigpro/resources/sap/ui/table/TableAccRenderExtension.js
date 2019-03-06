/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TableExtension","./TableUtils","./library"],function(e,t,r){"use strict";var i=r.SelectionMode;var a=function(e,t,r,i,a){a=a||[];a.push("sapUiInvisibleText");e.write("<span");e.writeAttribute("id",t+"-"+r);e.writeAttribute("class",a.join(" "));e.writeAttribute("aria-hidden","true");e.write(">");if(i){e.writeEscaped(i)}e.write("</span>")};var o=e.extend("sap.ui.table.TableAccRenderExtension",{_init:function(e,t,r){return"AccRenderExtension"},writeHiddenAccTexts:function(e,r){if(!r._getAccExtension().getAccMode()){return}var o=r.getId();e.write("<div class='sapUiTableHiddenTexts' style='display:none;' aria-hidden='true'>");var c=r.getTitle()&&r.getTitle().getText&&r.getTitle().getText()!=""?r.getTitle().getText():"";a(e,o,"ariadesc",c);a(e,o,"ariacount");a(e,o,"toggleedit",t.getResourceText("TBL_TOGGLE_EDIT_KEY"));a(e,o,"ariaselectall",t.getResourceText("TBL_SELECT_ALL"));a(e,o,"ariarowheaderlabel",t.getResourceText("TBL_ROW_HEADER_LABEL"));a(e,o,"ariarowgrouplabel",t.getResourceText("TBL_ROW_GROUP_LABEL"));a(e,o,"ariagrandtotallabel",t.getResourceText("TBL_GRAND_TOTAL_ROW"));a(e,o,"ariagrouptotallabel",t.getResourceText("TBL_GROUP_TOTAL_ROW"));a(e,o,"ariacolrowheaderlabel",t.getResourceText("TBL_ROW_COL_HEADER_LABEL"));a(e,o,"rownumberofrows");a(e,o,"colnumberofcols");a(e,o,"cellacc");a(e,o,"ariarowselected",t.getResourceText("TBL_ROW_DESC_SELECTED"));a(e,o,"ariacolmenu",t.getResourceText("TBL_COL_DESC_MENU"));a(e,o,"ariacolspan");a(e,o,"ariacolfiltered",t.getResourceText("TBL_COL_DESC_FILTERED"));a(e,o,"ariacolsortedasc",t.getResourceText("TBL_COL_DESC_SORTED_ASC"));a(e,o,"ariacolsorteddes",t.getResourceText("TBL_COL_DESC_SORTED_DES"));a(e,o,"ariainvalid",t.getResourceText("TBL_TABLE_INVALID"));a(e,o,"ariashowcolmenu",t.getResourceText("TBL_COL_VISBILITY_MENUITEM_SHOW"));a(e,o,"ariahidecolmenu",t.getResourceText("TBL_COL_VISBILITY_MENUITEM_HIDE"));a(e,o,"rowexpandtext",t.getResourceText("TBL_ROW_EXPAND_KEY"));a(e,o,"rowcollapsetext",t.getResourceText("TBL_ROW_COLLAPSE_KEY"));var T=r.getSelectionMode();if(T!==i.None){a(e,o,"ariaselection",t.getResourceText(T==i.MultiToggle?"TBL_TABLE_SELECTION_MULTI":"TBL_TABLE_SELECTION_SINGLE"))}if(r.getComputedFixedColumnCount()>0){a(e,o,"ariafixedcolumn",t.getResourceText("TBL_FIXED_COLUMN"))}e.write("</div>")},writeAriaAttributesFor:function(e,t,r,i){var a=t._getAccExtension();if(!a.getAccMode()){return}var o=a.getAriaAttributesFor(r,i);var c,T;for(T in o){c=o[T];if(Array.isArray(c)){c=c.join(" ")}if(c){e.writeAttributeEscaped(T,c)}}},writeAccRowSelectorText:function(e,t,r,i){if(!t._getAccExtension().getAccMode()){return}var o=t.isIndexSelected(i);var c=t._getAccExtension().getAriaTextsForSelectionMode(true);var T=c.keyboard[o?"rowDeselect":"rowSelect"];a(e,r.getId(),"rowselecttext",r._bHidden?"":T,["sapUiTableAriaRowSel"])},writeAccRowHighlightText:function(e,t,r,i){if(!t._getAccExtension().getAccMode()){return}var o=r.getAggregation("_settings");var c=o._getHighlightText();a(e,r.getId(),"highlighttext",c)}});return o});