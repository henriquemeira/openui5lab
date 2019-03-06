/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/IconPool","sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/library"],function(e,t,i,a,r,s){"use strict";var d=s.TextDirection;var n=s.ValueState;var l=i.SelectType;var u={};u.CSS_CLASS="sapMSlt";u.render=function(e,i){var r=i.getTooltip_AsString(),s=i.getType(),d=i.getAutoAdjustWidth(),o=i.getEnabled(),c=i.getWidth(),S=c.indexOf("%")>-1,g=d||c==="auto"||S,w=u.CSS_CLASS;e.write("<div");this.addClass(e,i);e.addClass(w);e.addClass(w+i.getType());if(!o){e.addClass(w+"Disabled")}if(g&&s===l.Default){e.addClass(w+"MinWidth")}if(d){e.addClass(w+"AutoAdjustedWidth")}else{e.addStyle("width",c)}if(i.getIcon()){e.addClass(w+"WithIcon")}if(o&&a.system.desktop){e.addClass(w+"Hoverable")}e.addClass(w+"WithArrow");if(i.getValueState()!==n.None){this.addValueStateClasses(e,i)}e.addStyle("max-width",i.getMaxWidth());e.writeControlData(i);e.writeStyles();e.writeClasses();this.writeAccessibilityState(e,i);if(r){e.writeAttributeEscaped("title",r)}else if(s===l.IconOnly){var I=t.getIconInfo(i.getIcon());if(I){e.writeAttributeEscaped("title",I.text)}}if(o){e.writeAttribute("tabindex","0")}e.write(">");this.renderHiddenInput(e,i);this.renderLabel(e,i);switch(s){case l.Default:this.renderArrow(e,i);break;case l.IconOnly:this.renderIcon(e,i);break}var b=i.getList();if(i._isShadowListRequired()&&b){this.renderShadowList(e,b)}if(i.getName()){this.renderInput(e,i)}e.write("</div>")};u.renderHiddenInput=function(e,t){e.write("<input");e.writeAttribute("id",t.getId()+"-hiddenInput");e.writeAttribute("aria-multiline","false");e.writeAttribute("aria-readonly","true");e.writeAttribute("tabindex","-1");e.addClass("sapUiPseudoInvisibleText");e.writeClasses();e.write(" />")};u.renderLabel=function(t,i){var a=i.getSelectedItem(),r=i.getTextDirection(),s=e.getTextAlign(i.getTextAlign(),r),o=u.CSS_CLASS;t.write("<label");t.writeAttribute("id",i.getId()+"-label");t.writeAttribute("for",i.getId());t.writeAttribute("aria-live","polite");t.addClass(o+"Label");if(i.getValueState()!==n.None){t.addClass(o+"LabelState");t.addClass(o+"Label"+i.getValueState())}if(i.getType()===l.IconOnly){t.addClass("sapUiPseudoInvisibleText")}if(r!==d.Inherit){t.writeAttribute("dir",r.toLowerCase())}if(s){t.addStyle("text-align",s)}t.writeStyles();t.writeClasses();t.write(">");if(i.getType()!==l.IconOnly){t.renderControl(i._getValueIcon());t.write("<span");t.addClass("sapMSelectListItemText");t.writeAttribute("id",i.getId()+"-labelText");t.writeClasses();t.write(">");a&&a.getParent()?t.writeEscaped(a.getText()):"";t.write("</span>")}t.write("</label>")};u.renderArrow=function(e,t){var i=u.CSS_CLASS;e.write("<span");e.addClass(i+"Arrow");if(t.getValueState()!==n.None){e.addClass(i+"ArrowState")}e.writeAttribute("id",t.getId()+"-arrow");e.writeClasses();e.write("></span>")};u.renderIcon=function(e,t){e.writeIcon(t.getIcon(),u.CSS_CLASS+"Icon",{id:t.getId()+"-icon",title:null})};u.renderInput=function(e,t){e.write("<input hidden");e.writeAttribute("id",t.getId()+"-input");e.addClass(u.CSS_CLASS+"Input");e.writeAttribute("aria-hidden","true");e.writeAttribute("tabindex","-1");if(!t.getEnabled()){e.write("disabled")}e.writeClasses();e.writeAttributeEscaped("name",t.getName());e.writeAttributeEscaped("value",t.getSelectedKey());e.write("/>")};u.renderShadowList=function(e,t){var i=t.getRenderer();i.writeOpenListTag(e,t,{elementData:false});this.renderShadowItems(e,t);i.writeCloseListTag(e,t)};u.renderShadowItems=function(e,t){var i=t.getRenderer(),a=t.getItems().length,r=t.getSelectedItem();for(var s=0,d=t.getItems();s<d.length;s++){i.renderItem(e,t,d[s],{selected:r===d[s],setsize:a,posinset:s+1,elementData:false})}};u.addClass=function(e,t){};u.addValueStateClasses=function(e,t){e.addClass(u.CSS_CLASS+"State");e.addClass(u.CSS_CLASS+t.getValueState())};u.getAriaRole=function(e){switch(e.getType()){case l.Default:return"combobox";case l.IconOnly:return"button"}};u._getValueStateString=function(e){var t="sap.ui.core";switch(e.getValueState()){case n.Success:return r.getStaticId(t,"VALUE_STATE_SUCCESS");case n.Warning:return r.getStaticId(t,"VALUE_STATE_WARNING");case n.Error:return r.getStaticId(t,"VALUE_STATE_ERROR");case n.Information:return r.getStaticId(t,"VALUE_STATE_INFORMATION")}return""};u.writeAccessibilityState=function(e,i){var a=this._getValueStateString(i),r=i.getSelectedItem();if(a){a=" "+a}var s;if(r&&!r.getText()&&r.getIcon&&r.getIcon()){var d=t.getIconInfo(r.getIcon());if(d){s=d.text||d.name}}e.writeAccessibilityState(i,{role:this.getAriaRole(i),disabled:!i.getEnabled(),expanded:i.isOpen(),invalid:i.getValueState()===n.Error?true:undefined,labelledby:{value:s?i._getValueIcon().getId():i.getId()+"-label"+a,append:true},haspopup:i.getType()===l.IconOnly?true:undefined})};return u},true);