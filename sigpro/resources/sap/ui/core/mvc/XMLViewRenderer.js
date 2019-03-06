/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewRenderer","../RenderManager","sap/ui/thirdparty/jquery"],function(e,t,r){"use strict";var i=t.RenderPrefixes.Dummy,d=t.RenderPrefixes.Invisible,n=t.RenderPrefixes.Temporary;var s={};s.render=function(s,a){var o=a.getDomRef();if(o&&!t.isPreservedContent(o)){t.preserveContent(o,true)}var f=a._$oldContent=t.findPreservedContent(a.getId());if(f.length===0){var l=a.isSubView();if(!l){s.write("<div");s.writeControlData(a);s.addClass("sapUiView");s.addClass("sapUiXMLView");e.addDisplayClass(s,a);if(!a.oAsyncState||!a.oAsyncState.suppressPreserve){s.writeAttribute("data-sap-ui-preserve",a.getId())}if(a.getWidth()){s.addStyle("width",a.getWidth())}if(a.getHeight()){s.addStyle("height",a.getHeight())}s.writeStyles();s.writeClasses();s.write(">")}if(a._aParsedContent){for(var v=0;v<a._aParsedContent.length;v++){var g=a._aParsedContent[v];if(g&&typeof g==="string"){s.write(g)}else{s.renderControl(g);if(!g.bOutput){s.write('<div id="'+i+g.getId()+'" class="sapUiHidden"></div>')}}}}if(!l){s.write("</div>")}}else{s.renderControl(a.oAfterRenderingNotifier);s.write('<div id="'+n+a.getId()+'" class="sapUiHidden">');for(var v=0;v<a._aParsedContent.length;v++){var g=a._aParsedContent[v];if(typeof g!=="string"){s.renderControl(g);var p=g.getId(),u=r(document.getElementById(p));if(u.length==0){u=r(document.getElementById(d+p))}if(!t.isPreservedContent(u[0])){u.replaceWith('<div id="'+i+p+'" class="sapUiHidden"></div>')}}}s.write("</div>")}};return s},true);