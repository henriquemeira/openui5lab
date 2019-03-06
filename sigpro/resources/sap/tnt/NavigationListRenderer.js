/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";var t={};t.render=function(e,t){var r,i,a=t.getItems(),s=t.getExpanded(),n=[];e.write("<ul");e.writeControlData(t);var d=t.getWidth();if(d&&s){e.addStyle("width",d)}e.writeStyles();e.addClass("sapTntNavLI");if(!s){e.addClass("sapTntNavLICollapsed")}e.writeClasses();r=s?"tree":"toolbar";e.writeAttribute("role",r);e.write(">");a.forEach(function(e){if(e.getVisible()){n.push(e)}});n.forEach(function(r,a){r.render(e,t,a,i)});e.write("</ul>")};return t},true);