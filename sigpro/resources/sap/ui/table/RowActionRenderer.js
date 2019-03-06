/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/table/Row"],function(e){"use strict";var i={};i.render=function(i,t){i.write("<div");i.writeControlData(t);i.addClass("sapUiTableAction");if(!(t.getParent()instanceof e)){i.addStyle("display","none")}if(!t.getVisible()){i.addClass("sapUiTableActionHidden")}i.writeClasses();i.writeStyles();var r=t.getTooltip_AsString();if(r){i.writeAttributeEscaped("title",r)}i.write(">");var a=t.getAggregation("_icons");i.write("<div>");i.renderControl(a[0]);i.write("</div>");i.write("<div>");i.renderControl(a[1]);i.write("</div>");i.write("</div>")};return i},true);