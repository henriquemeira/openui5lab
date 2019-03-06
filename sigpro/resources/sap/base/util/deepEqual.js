/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var r=function(t,n,f,u,a){if(typeof f=="boolean"){u=f;f=undefined}if(!a){a=0}if(!f){f=10}if(a>f){e.warning("deepEqual comparison exceeded maximum recursion depth of "+f+". Treating values as unequal");return false}if(t===n){return true}var i=typeof t==="number"&&typeof n==="number"&&isNaN(t)&&isNaN(n);if(i){return true}if(Array.isArray(t)&&Array.isArray(n)){if(!u&&t.length!==n.length){return false}if(t.length>n.length){return false}for(var s=0;s<t.length;s++){if(!r(t[s],n[s],f,u,a+1)){return false}}return true}if(typeof t=="object"&&typeof n=="object"){if(!t||!n){return false}if(t.constructor!==n.constructor){return false}if(!u&&Object.keys(t).length!==Object.keys(n).length){return false}if(t instanceof Node){return t.isEqualNode(n)}if(t instanceof Date){return t.valueOf()===n.valueOf()}for(var s in t){if(!r(t[s],n[s],f,u,a+1)){return false}}return true}return false};return r});