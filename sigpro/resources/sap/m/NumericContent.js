/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/Image","./NumericContentRenderer","sap/ui/events/KeyCodes","sap/base/util/deepEqual"],function(t,e,o,i,n,a,r){"use strict";var s=e.extend("sap.m.NumericContent",{metadata:{library:"sap.m",properties:{animateTextChange:{type:"boolean",group:"Behavior",defaultValue:true},formatterValue:{type:"boolean",group:"Data",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconDescription:{type:"string",group:"Accessibility",defaultValue:null},indicator:{type:"sap.m.DeviationIndicator",group:"Appearance",defaultValue:"None"},nullifyValue:{type:"boolean",group:"Behavior",defaultValue:true},scale:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto"},truncateValueTo:{type:"int",group:"Appearance",defaultValue:4},value:{type:"string",group:"Data",defaultValue:null},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},withMargin:{type:"boolean",group:"Appearance",defaultValue:true},state:{type:"sap.m.LoadState",group:"Behavior",defaultValue:"Loaded"}},events:{press:{}}}});s.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setTooltip("{AltText}")};s.prototype.onBeforeRendering=function(){this.$().unbind("mouseenter");this.$().unbind("mouseleave")};s.prototype.onAfterRendering=function(){this.$().bind("mouseenter",this._addTooltip.bind(this));this.$().bind("mouseleave",this._removeTooltip.bind(this));if(t.LoadState.Loaded==this.getState()||this.getAnimateTextChange()){jQuery(document.getElementById(this.getId())).animate({opacity:"1"},1e3)}};s.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString())};s.prototype._removeTooltip=function(){this.$().attr("title",null)};s.prototype.exit=function(){if(this._oIcon){this._oIcon.destroy()}};s.prototype.getAltText=function(){var e=this.getValue();var o=this.getScale();var i;var n=this._rb.getText(("SEMANTIC_COLOR_"+this.getValueColor()).toUpperCase());var a="";if(this.getNullifyValue()){i="0"}else{i=""}if(this.getIconDescription()){a=a.concat(this.getIconDescription());a=a.concat("\n")}if(e){a=a.concat(e+o)}else{a=a.concat(i)}a=a.concat("\n");if(this.getIndicator()&&this.getIndicator()!==t.DeviationIndicator.None){a=a.concat(this._rb.getText(("NUMERICCONTENT_DEVIATION_"+this.getIndicator()).toUpperCase()));a=a.concat("\n")}a=a.concat(n);return a};s.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var e=this.getAltText();if(typeof t==="string"||t instanceof String){e=t.split("{AltText}").join(e).split("((AltText))").join(e);return e}if(t){return t}else{return""}};s.prototype.setIcon=function(t){var e=!r(this.getIcon(),t);if(e){if(this._oIcon){this._oIcon.destroy();this._oIcon=undefined}if(t){this._oIcon=o.createControlByURI({id:this.getId()+"-icon-image",src:t},i)}}this._setPointerOnIcon();return this.setProperty("icon",t)};s.prototype._setPointerOnIcon=function(){if(this._oIcon&&this.hasListeners("press")){this._oIcon.addStyleClass("sapMPointer")}else if(this._oIcon&&this._oIcon.hasStyleClass("sapMPointer")){this._oIcon.removeStyleClass("sapMPointer")}};s.prototype.ontap=function(t){this.$().focus();this.firePress();t.preventDefault()};s.prototype.onkeyup=function(t){if(t.which===a.ENTER||t.which===a.SPACE){this.firePress();t.preventDefault()}};s.prototype.onkeydown=function(t){if(t.which===a.SPACE){t.preventDefault()}};s.prototype.attachEvent=function(t,o,i,n){e.prototype.attachEvent.call(this,t,o,i,n);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnIcon()}return this};s.prototype.detachEvent=function(t,o,i){e.prototype.detachEvent.call(this,t,o,i);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnIcon()}return this};s.prototype._parseFormattedValue=function(t){var e=t.replace(String.fromCharCode(8206),"").replace(String.fromCharCode(8207),"");return{scale:e.replace(/[+-., \d]*(.*)$/g,"$1").trim().replace(/\.$/,""),value:e.replace(/([+-., \d]*).*$/g,"$1").trim()}};return s});