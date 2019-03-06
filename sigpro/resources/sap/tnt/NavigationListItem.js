sap.ui.define(["./library","sap/ui/core/Item","sap/ui/core/Icon","./NavigationList","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/events/KeyCodes"],function(t,e,i,a,s,r,n){"use strict";var o=e.extend("sap.tnt.NavigationListItem",{metadata:{library:"sap.tnt",properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},expanded:{type:"boolean",group:"Misc",defaultValue:true},hasExpander:{type:"boolean",group:"Misc",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"},_expandIconControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});o.expandIcon="sap-icon://navigation-right-arrow";o.collapseIcon="sap-icon://navigation-down-arrow";o.prototype._getUniqueKey=function(){var t=this.getKey();if(t){return t}return this.getId()};o.prototype._getExpandIconControl=function(){var t=this.getAggregation("_expandIconControl");if(!t){var e=this.getExpanded();t=new i({src:e?o.collapseIcon:o.expandIcon,visible:this.getItems().length>0&&this.getHasExpander(),useIconTooltip:false,tooltip:this._getExpandIconTooltip(!e)}).addStyleClass("sapTntNavLIExpandIcon");this.setAggregation("_expandIconControl",t,true)}return t};o.prototype._getExpandIconTooltip=function(t){if(!this.getEnabled()){return""}var e=t?"Icon.expand":"Icon.collapse";return this.getNavigationList()._resourceBundle.getText(e)};o.prototype.getLevel=function(){var t=0;var e=this.getParent();if(e.getMetadata().getName()=="sap.tnt.NavigationListItem"){return e.getLevel()+1}return t};o.prototype.getNavigationList=function(){var t=this.getParent();while(t&&t.getMetadata().getName()!="sap.tnt.NavigationList"){t=t.getParent()}return t};o.prototype.createPopupList=function(){var t=[],e=this.getNavigationList(),i=e.getSelectedItem(),s,r,n,p=this.getItems();for(var d=0;d<p.length;d++){r=p[d];if(r.getVisible()){n=new o({key:r.getId(),text:r.getText(),textDirection:r.getTextDirection(),enabled:r.getEnabled()});t.push(n);if(i==r){s=n}}}var l=new o({expanded:true,hasExpander:false,key:this.getId(),text:this.getText(),enabled:this.getEnabled(),textDirection:this.getTextDirection(),items:t});var g=new a({itemSelect:this.onPopupItemSelect.bind(this),items:[l]}).addStyleClass("sapTntNavLIPopup");if(i==this){s=l;g.isGroupSelected=true}g.setSelectedItem(s);return g};o.prototype.onPopupItemSelect=function(t){var e=t.getParameter("item");e=sap.ui.getCore().byId(e.getKey());e._selectItem(t)};o.prototype._selectItem=function(t){var e={item:this};this.fireSelect(e);var i=this.getNavigationList();i._selectItem(e)};o.prototype.onkeydown=function(t){if(t.isMarked("subItem")){return}t.setMarked("subItem");if(this.getLevel()>0){return}var e=sap.ui.getCore().getConfiguration().getRTL();if(t.shiftKey&&t.which==189||t.which==n.NUMPAD_MINUS||t.which==n.ARROW_RIGHT&&e||t.which==n.ARROW_LEFT&&!e){if(this.collapse()){t.preventDefault();t.target=null}}else if(t.which==n.NUMPAD_PLUS||t.shiftKey&&t.which==n.PLUS||t.which==n.ARROW_LEFT&&e||t.which==n.ARROW_RIGHT&&!e){if(this.expand()){t.preventDefault();t.target=null}}};o.prototype.expand=function(t){if(this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return}this.setProperty("expanded",true,true);this.$().find(".sapTntNavLIGroup").attr("aria-expanded",true);var e=this._getExpandIconControl();e.setSrc(o.collapseIcon);e.setTooltip(this._getExpandIconTooltip(false));var i=this.$().find(".sapTntNavLIGroupItems");i.stop(true,true).slideDown(t||"fast",function(){i.toggleClass("sapTntNavLIHiddenGroupItems")});this.getNavigationList()._updateNavItems();return true};o.prototype.collapse=function(t){if(!this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return}this.setProperty("expanded",false,true);this.$().find(".sapTntNavLIGroup").attr("aria-expanded",false);var e=this._getExpandIconControl();e.setSrc(o.expandIcon);e.setTooltip(this._getExpandIconTooltip(true));var i=this.$().find(".sapTntNavLIGroupItems");i.stop(true,true).slideUp(t||"fast",function(){i.toggleClass("sapTntNavLIHiddenGroupItems")});this.getNavigationList()._updateNavItems();return true};o.prototype.ontap=function(t){if(t.isMarked("subItem")||!this.getEnabled()){return}t.setMarked("subItem");t.preventDefault();var e=this.getNavigationList();var i=sap.ui.getCore().byId(t.target.id);var a=this.getLevel();if(a==1){var s=this.getParent();if(this.getEnabled()&&s.getEnabled()){this._selectItem(t)}return}if(e.getExpanded()||this.getItems().length==0){if(!i||i.getMetadata().getName()!="sap.ui.core.Icon"||!i.$().hasClass("sapTntNavLIExpandIcon")){this._selectItem(t);return}if(this.getExpanded()){this.collapse()}else{this.expand()}}else{var r=this.createPopupList();e._openPopover(this,r)}};o.prototype.onsapenter=o.prototype.ontap;o.prototype.onsapspace=o.prototype.ontap;o.prototype.render=function(t,e,i,a){if(!this.getVisible()){return}if(this.getLevel()===0){this.renderFirstLevelNavItem(t,e,i,a)}else{this.renderSecondLevelNavItem(t,e,i,a)}};o.prototype.renderGroupItem=function(t,e,i,a){var s=e.getExpanded(),r=this.getExpanded(),n=this.getText(),p,d={level:"1",posinset:i+1,setsize:this._getVisibleItems(e).length};if(s&&this.getItems().length!==0){d.expanded=r}t.write("<div");t.addClass("sapTntNavLIItem");t.addClass("sapTntNavLIGroup");if(!this.getEnabled()){t.addClass("sapTntNavLIItemDisabled")}else{t.write(' tabindex="-1"')}if(!s){p=this.getTooltip_AsString()||n;if(p){t.writeAttributeEscaped("title",p)}d.label=n;d.role="button";d.haspopup=true}else{d.role="treeitem"}t.writeAccessibilityState(d);if(e.getExpanded()){p=this.getTooltip_AsString()||n;if(p){t.writeAttributeEscaped("title",p)}t.writeAttributeEscaped("aria-label",n)}t.writeClasses();t.write(">");this._renderIcon(t);if(e.getExpanded()){var l=this._getExpandIconControl();l.setVisible(this.getItems().length>0&&this.getHasExpander());l.setSrc(this.getExpanded()?o.collapseIcon:o.expandIcon);l.setTooltip(this._getExpandIconTooltip(!this.getExpanded()));this._renderText(t);t.renderControl(l)}t.write("</div>")};o.prototype.renderFirstLevelNavItem=function(t,e,i,a){var s,r=this._getVisibleItems(this),n=r.length,o=this.getExpanded(),p=e.getExpanded();t.write('<li aria-hidden="true" ');t.writeElementData(this);if(this.getEnabled()&&!p){t.write(' tabindex="-1"')}t.write(">");this.renderGroupItem(t,e,i);if(p){t.write('<ul aria-hidden="true" ');t.writeAttribute("role","group");t.addClass("sapTntNavLIGroupItems");if(!o){t.addClass("sapTntNavLIHiddenGroupItems")}t.writeClasses();t.write(">");for(var d=0;d<n;d++){s=r[d];s.render(t,e,d,n)}t.write("</ul>")}t.write("</li>")};o.prototype.renderSecondLevelNavItem=function(t,e,i,a){var s=this.getParent();t.write("<li");t.writeElementData(this);t.addClass("sapTntNavLIItem");t.addClass("sapTntNavLIGroupItem");if(!this.getEnabled()||!s.getEnabled()){t.addClass("sapTntNavLIItemDisabled")}else{t.write(' tabindex="-1"')}var r=this.getText();var n=this.getTooltip_AsString()||r;if(n){t.writeAttributeEscaped("title",n)}t.writeAccessibilityState({role:"treeitem",level:"2",posinset:i+1,setsize:a});t.writeClasses();t.write(">");this._renderText(t);t.write("</li>")};o.prototype._renderIcon=function(t){var e=this.getIcon(),i=r.getIconInfo(e);if(e){t.write("<span");t.addClass("sapUiIcon");t.addClass("sapTntNavLIGroupIcon");t.writeAttribute("aria-hidden",true);if(i&&!i.suppressMirroring){t.addClass("sapUiIconMirrorInRTL")}if(i){t.writeAttribute("data-sap-ui-icon-content",i.content);t.addStyle("font-family","'"+i.fontFamily+"'")}t.writeClasses();t.writeStyles();t.write("></span>")}else{t.write('<span class="sapUiIcon sapTntNavLIGroupIcon" aria-hidden="true"></span>')}};o.prototype._renderText=function(t){t.write("<span");t.addClass("sapMText");t.addClass("sapTntNavLIText");t.addClass("sapMTextNoWrap");t.writeClasses();var e=this.getTextDirection();if(e!==sap.ui.core.TextDirection.Inherit){t.writeAttribute("dir",e.toLowerCase())}var i=s.getTextAlign(sap.ui.core.TextAlign.Begin,e);if(i){t.addStyle("text-align",i);t.writeStyles()}t.write(">");t.writeEscaped(this.getText());t.write("</span>")};o.prototype._unselect=function(){var t=this.$(),e=this.getNavigationList();if(!e){return}t.removeClass("sapTntNavLIItemSelected");if(e.getExpanded()){if(this.getLevel()==0){t=t.find(".sapTntNavLIGroup")}t.removeAttr("aria-selected")}else{t.removeAttr("aria-pressed")}};o.prototype._select=function(){var t=this.$(),e=this.getNavigationList();if(!e){return}t.addClass("sapTntNavLIItemSelected");if(e.getExpanded()){if(this.getLevel()==0){t=t.find(".sapTntNavLIGroup")}t.attr("aria-selected",true)}else{t.attr("aria-pressed",true);e._closePopover()}};o.prototype._getDomRefs=function(){var t=[];if(!this.getEnabled()){return t}var e=this.$();t.push(e.find(".sapTntNavLIGroup")[0]);if(this.getExpanded()){var i=e.find(".sapTntNavLIGroupItem");for(var a=0;a<i.length;a++){t.push(i[a])}}return t};o.prototype._getVisibleItems=function(t){var e=[];var i=t.getItems();var a;for(var s=0;s<i.length;s++){a=i[s];if(a.getVisible()){e.push(a)}}return e};return o},true);
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */