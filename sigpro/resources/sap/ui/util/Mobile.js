/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,n){"use strict";var o={};if(e.os.windows_phone){var i;i=document.createElement("meta");i.setAttribute("name","msapplication-tap-highlight");i.setAttribute("content","no");document.head.appendChild(i);i=document.createElement("style");i.appendChild(document.createTextNode("@-ms-viewport{width:device-width;}"));document.head.appendChild(i)}var a=false;o.init=function(t){var i=n("head");if(!a){a=true;t=n.extend({},{viewport:true,statusBar:"default",hideBrowser:true,preventScroll:true,preventPhoneNumberDetection:true,useFullScreenHeight:true,homeIconPrecomposed:false,mobileWebAppCapable:"default"},t);if(e.os.ios&&t.preventPhoneNumberDetection){i.append(n('<meta name="format-detection" content="telephone=no">'))}else if(e.browser.msie){i.append(n('<meta http-equiv="cleartype" content="on">'));i.append(n('<meta name="msapplication-tap-highlight" content="no">'))}var s=e.os.ios&&e.os.version>=7&&e.os.version<8&&e.browser.name==="sf";if(t.viewport){var l;if(s&&e.system.phone){l="minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"}else if(s&&e.system.tablet){l="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}else if(e.os.ios&&e.system.phone&&Math.max(window.screen.height,window.screen.width)===568){l="user-scalable=0, initial-scale=1.0"}else if(e.os.android&&e.os.version<3){l="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}else{l="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}i.append(n('<meta name="viewport" content="'+l+'">'))}if(t.mobileWebAppCapable==="default"){if(e.os.ios){i.append(n('<meta name="apple-mobile-web-app-capable" content="yes">'))}}if(e.os.ios){i.append(n('<meta name="apple-mobile-web-app-status-bar-style" content="'+t.statusBar+'">'))}if(t.useFullScreenHeight){n(function(){document.documentElement.style.height="100%"})}if(t.preventScroll&&e.os.ios){n(function(){document.documentElement.style.position="fixed";document.documentElement.style.overflow="hidden";document.documentElement.style.height="100%";document.documentElement.style.width="100%"})}}if(t&&t.homeIcon){var p;if(typeof t.homeIcon==="string"){p={phone:t.homeIcon}}else{p=n.extend({},t.homeIcon)}p.precomposed=t.homeIconPrecomposed||p.precomposed;p.favicon=t.homeIcon.icon||p.favicon;p.icon=undefined;o.setIcons(p)}if(t&&t.mobileWebAppCapable!=="default"){o.setWebAppCapable(t.mobileWebAppCapable)}};o.setIcons=function(e){if(!e||typeof e!=="object"){t.warning("Call to sap/ui/util/Mobile.setIcons() has been ignored because there were no icons given or the argument was not an object.");return}var o=n("head"),i=e.precomposed?"-precomposed":"",a=function(t){return e[t]||e["tablet@2"]||e["phone@2"]||e["phone"]||e["tablet"]},s={phone:"",tablet:"76x76","phone@2":"120x120","tablet@2":"152x152"};if(e["favicon"]){var l=o.find("[rel^=shortcut]");l.each(function(){if(this.rel==="shortcut icon"){n(this).remove()}});o.append(n('<link rel="shortcut icon" href="'+e["favicon"]+'" />'))}if(a("phone")){o.find("[rel=apple-touch-icon]").remove();o.find("[rel=apple-touch-icon-precomposed]").remove()}for(var p in s){e[p]=e[p]||a(p);if(e[p]){var c=s[p];o.append(n('<link rel="apple-touch-icon'+i+'" '+(c?'sizes="'+c+'"':"")+' href="'+e[p]+'" />'))}}};o.setWebAppCapable=function(t){if(!e.system.tablet&&!e.system.phone){return}var o=n("head"),i=["","apple"],a="mobile-web-app-capable",s=t?"yes":"no",l,p,c;for(l=0;l<i.length;l++){p=i[l]?i[l]+"-"+a:a;c=o.children('meta[name="'+p+'"]');if(c.length){c.attr("content",s)}else{o.append(n('<meta name="'+p+'" content="'+s+'">'))}}};return o});