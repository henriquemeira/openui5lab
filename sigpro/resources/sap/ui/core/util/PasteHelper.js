/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r={};r.getPastedDataAs2DArray=function(r){var a=r.clipboardData;if(!a){a=window.clipboardData}var e=/sapui5Placeholder4MultiLine/g;var t=e.source;var i=/""/g;var n,f,l,s=[];if(a){n=a.getData("Text");var u=[];var c=false;var v=n.indexOf('"'),h=-1;var d,p;while(v>-1){p=n.charAt(v-1);if(v===0||p==="\n"||p==="\t"||p==="\r"){h=n.indexOf('"',v+1);if(h>-1){d=n.charAt(h+1);while(h>-1&&d==='"'){h=n.indexOf('"',h+2);d=n.charAt(h+1)}if(d==="\n"||d==="\t"||d===""||d==="\r"){var g=n.substring(v+1,h);n=n.replace('"'+g+'"',t);g=g.replace(i,'"');u.push(g);v=n.indexOf('"',v+t.length+1);c=true}}}if(!c){v=n.indexOf('"',v+1)}c=false}f=n.split(/\r\n|\r|\n/);var o=0;var x=function(){return u[o++]};for(var A=0;A<f.length;A++){l=f[A];if(u.length>0){l=l.replace(e,x)}if(l.length||A<f.length-1){s.push(l.split("\t"))}}}return s};return r});