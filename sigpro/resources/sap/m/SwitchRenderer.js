/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library"],function(e,t){"use strict";var i=t.SwitchType;var r={};r.CSS_CLASS="sapMSwt";r.render=function(t,i){var s=i.getState(),a=s?i._sOn:i._sOff,d=i.getTooltip_AsString(),l=i.getEnabled(),n=i.getName(),w=sap.ui.getCore().getConfiguration().getAccessibility(),b=r.CSS_CLASS;t.write("<div");t.addClass(b+"Cont");if(!l){t.addClass(b+"ContDisabled")}t.writeClasses();t.writeStyles();t.writeControlData(i);if(l){t.writeAttribute("tabindex","0")}if(d){t.writeAttributeEscaped("title",d)}if(w){this.writeAccessibilityState(t,i)}t.write("><div");t.writeAttribute("id",i.getId()+"-switch");t.writeAttribute("aria-hidden","true");t.addClass(b);t.addClass(s?b+"On":b+"Off");t.addClass(b+i.getType());if(e.system.desktop&&l){t.addClass(b+"Hoverable")}if(!l){t.addClass(b+"Disabled")}t.writeClasses();t.write("><div");t.addClass(b+"Inner");t.writeAttribute("id",i.getId()+"-inner");t.writeClasses();t.write(">");this.renderText(t,i);this.renderHandle(t,i,a);t.write("</div>");t.write("</div>");if(n){this.renderCheckbox(t,i,a)}if(w){this.renderInvisibleElement(t,i,{id:i.getInvisibleElementId(),text:i.getInvisibleElementText(s)})}t.write("</div>")};r.renderText=function(e,t){var s=r.CSS_CLASS,a=t.getType()===i.Default;e.write("<div");e.addClass(s+"Text");e.addClass(s+"TextOn");e.writeAttribute("id",t.getId()+"-texton");e.writeClasses();e.write(">");e.write("<span");e.addClass(s+"Label");e.addClass(s+"LabelOn");e.writeClasses();e.write(">");if(a){e.writeEscaped(t._sOn)}e.write("</span>");e.write("</div>");e.write("<div");e.addClass(s+"Text");e.addClass(s+"TextOff");e.writeAttribute("id",t.getId()+"-textoff");e.writeClasses();e.write(">");e.write("<span");e.addClass(s+"Label");e.addClass(s+"LabelOff");e.writeClasses();e.write(">");if(a){e.writeEscaped(t._sOff)}e.write("</span>");e.write("</div>")};r.renderHandle=function(e,t,i){var s=r.CSS_CLASS;e.write("<div");e.writeAttribute("id",t.getId()+"-handle");e.writeAttributeEscaped("data-sap-ui-swt",i);e.addClass(s+"Handle");e.writeClasses();e.write("></div>")};r.renderCheckbox=function(e,t,i){e.write('<input type="checkbox"');e.writeAttribute("id",t.getId()+"-input");e.writeAttributeEscaped("name",t.getName());e.writeAttributeEscaped("value",i);if(t.getState()){e.writeAttribute("checked","checked")}if(!t.getEnabled()){e.writeAttribute("disabled","disabled")}e.write(">")};r.writeAccessibilityState=function(e,t){var i=t.getAriaLabelledBy(),r;if(i){i={value:t.getInvisibleElementId(),append:true}}r={role:"checkbox",checked:t.getState(),labelledby:i};e.writeAccessibilityState(t,r)};r.renderInvisibleElement=function(e,t,i){e.write("<span");e.writeAttribute("id",i.id);e.writeAttribute("aria-hidden","true");e.addClass("sapUiInvisibleText");e.writeClasses();e.write(">");e.writeEscaped(i.text);e.write("</span>")};return r},true);