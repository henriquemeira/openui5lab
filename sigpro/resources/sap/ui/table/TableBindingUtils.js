/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{TableUtils:null,metadataLoaded:function(a){var t=a.getBinding("rows");var e=t?t.getModel():null;var d=null;var n=null;var i=new Promise(function(a,t){d=a;n=t});if(!e){n();return i}if(e.metadataLoaded){e.metadataLoaded().then(function(){d()})}else if(e.attachMetadataLoaded){if(e.oMetadata&&e.oMetadata.isLoaded()){d()}else{e.attachMetadataLoaded(function(){d()})}}return i}}},true);