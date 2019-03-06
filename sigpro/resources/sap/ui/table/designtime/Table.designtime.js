/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/table/TableUtils"],function(e){"use strict";return{domRef:function(e){if(e.getVisibleRowCountMode()===sap.ui.table.VisibleRowCountMode.Auto){return e.$("sapUiTableCnt").get(0)}return e.getDomRef()},aggregations:{columns:{domRef:".sapUiTableCHA"},rows:{ignore:function(t){return e.isNoDataVisible(t)}},hScroll:{ignore:false,domRef:function(e){return e.$("hsb").get(0)}},vScroll:{ignore:false,domRef:function(e){return e.$("vsb").get(0)}}}}},false);