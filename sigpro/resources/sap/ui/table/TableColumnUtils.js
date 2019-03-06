/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","./library","sap/base/Log"],function(e,n,t){"use strict";var r={TableUtils:null,initColumnUtils:function(e){if(!e._oColumnInfo){r.updateColumnInfo(e,r.collectColumnInfo(e))}},invalidateColumnUtils:function(e){e._oColumnInfo=null},updateColumnInfo:function(e,n){e._oColumnInfo=n},collectColumnInfo:function(e){return{columnCount:e.getColumns().length,visibleColumnCount:r.TableUtils.getVisibleColumnCount(e),columnMap:r._getColumnMap(e)}},_getColumnMap:function(e){var n;var t;var l={};var a={};var u=e.getColumns();var o=r.TableUtils.getHeaderRowCount(e);var i={};for(var f=0;f<u.length;f++){t=u[f];l={};l.id=t.getId();l.column=t;l.levelInfo=[];l.parents=[];for(var s=0;s<o;s++){l.levelInfo[s]={};l.levelInfo[s].spannedColumns=[];var d=r.getHeaderSpan(t,s);for(n=1;n<d;n++){var m=u[f+n];if(m){var v=m.getId();l.levelInfo[s].spannedColumns.push(u[f+n]);if(!i[v]){i[v]=[]}i[v].push({column:t,level:s})}}}a[l.id]=l}var g=Object.keys(i);for(n=0;n<g.length;n++){var C=g[n];a[C].parents=i[C]}return a},_getColumnMapItem:function(e,n){r.initColumnUtils(e);var l=e._oColumnInfo.columnMap[n];if(!l){t.error("Column with ID '"+n+"' not found",e)}else{return l}},getParentSpannedColumns:function(e,n,t){var l=r._getColumnMapItem(e,n);if(!l){return undefined}var a=[];for(var u=0;u<l.parents.length;u++){var o=l.parents[u];if(t===undefined||o.level===t){a.push(o)}}return a},getChildrenSpannedColumns:function(e,n,t){var l=r._getColumnMapItem(e,n);if(!l){return undefined}var a=[];var u;if(t===undefined){u=l.levelInfo.length}else{u=t+1}for(var o=t||0;o<u;o++){var i=l.levelInfo[o];for(var f=0;f<i.spannedColumns.length;f++){a.push({column:i.spannedColumns[f],level:o})}}return a},getHeaderSpan:function(e,n){var t=e.getHeaderSpan();var r;if(!t){return 1}if(!Array.isArray(t)){t=(t+"").split(",")}function l(e){var n=parseInt(e);return isNaN(n)?1:n}if(isNaN(n)){r=Math.max.apply(null,t.map(l))}else{r=l(t[n])}return Math.max(r,1)},getMaxHeaderSpan:function(e){return r.getHeaderSpan(e)},hasHeaderSpan:function(e){return r.getHeaderSpan(e)>1},getColumnBoundaries:function(e,n){var t=r._getColumnMapItem(e,n);if(!t){return undefined}var l={};if(n){l[n]=t.column}var a=function(n,t){var l;var u;var o=[];t=t||[];for(u=0;u<t.length;u++){l=n[t[u]];o=o.concat(r.getParentSpannedColumns(e,l.getId()));o=o.concat(r.getChildrenSpannedColumns(e,l.getId()))}t=[];for(u=0;u<o.length;u++){l=o[u].column;var i=l.getId();if(!n[i]){t.push(i);n[i]=l}}if(t.length>0){return a(n,t)}else{return n}};l=a(l,[n]);var u=e.indexOfColumn(t.column);var o={startColumn:t.column,startIndex:u,endColumn:t.column,endIndex:-1};var i=e.getColumns();var f=Object.getOwnPropertyNames(l);for(var s=0;s<f.length;s++){var d=l[f[s]];u=e.indexOfColumn(d);var m=r.getMaxHeaderSpan(d);if(u<o.startIndex){o.startIndex=u;o.startColumn=d}var v=u+m-1;if(v>o.endIndex){o.endIndex=v;o.endColumn=i[v]}}return o},isColumnMovable:function(e){var n=e.getParent();if(!n||!n.getEnableColumnReordering()){return false}var t=n.indexOfColumn(e);if(t<n.getComputedFixedColumnCount()||t<n._iFirstReorderableIndex){return false}if(r.hasHeaderSpan(e)||r.getParentSpannedColumns(n,e.getId()).length!=0){return false}return true},_normalizeColumnMoveTargetIndex:function(e,n){var t=e.getParent(),r=t.indexOfColumn(e),l=t.getColumns();if(n>r){n--}if(n<0){n=0}else if(n>l.length){n=l.length}return n},isColumnMovableTo:function(e,n){var t=e.getParent();if(!t||n===undefined||!r.isColumnMovable(e)){return false}n=r._normalizeColumnMoveTargetIndex(e,n);if(n<t.getComputedFixedColumnCount()||n<t._iFirstReorderableIndex){return false}var l=t.indexOfColumn(e),a=t.getColumns();if(n>l){var u=a[n>=a.length?a.length-1:n];var o=r.getColumnBoundaries(t,u.getId());if(r.hasHeaderSpan(u)||o.endIndex>n){return false}}else{var i=a[n];if(r.getParentSpannedColumns(t,i.getId()).length!=0){return false}}return true},moveColumnTo:function(e,n){if(!r.isColumnMovableTo(e,n)){return false}var t=e.getParent(),l=t.indexOfColumn(e);if(n===l){return false}n=r._normalizeColumnMoveTargetIndex(e,n);var a=t.fireColumnMove({column:e,newPos:n});if(!a){return false}t._bReorderInProcess=true;t.removeColumn(e,true);t.insertColumn(e,n);t._bReorderInProcess=false;return true},getMinColumnWidth:function(){if(this._iColMinWidth){return this._iColMinWidth}this._iColMinWidth=48;if(!e.system.desktop){this._iColMinWidth=88}return this._iColMinWidth},resizeColumn:function(e,n,t,l,a){if(!e||n==null||n<0||t==null||t<=0){return false}if(a==null||a<=0){a=1}if(l==null){l=true}var u=e.getColumns();if(n>=u.length||!u[n].getVisible()){return false}var o=[];for(var i=n;i<u.length;i++){var f=u[i];if(f.getVisible()){o.push(f);if(o.length===a){break}}}var s=[];for(var i=0;i<o.length;i++){var d=o[i];if(d.getResizable()){s.push(d)}}if(s.length===0){return false}var m=0;for(var i=0;i<o.length;i++){var d=o[i];m+=r.getColumnWidth(e,d.getIndex())}var v=t-m;var g=Math.round(v/s.length);var C=false;var h=e.getDomRef();if(!r.TableUtils.isFixedColumn(e,n)){e._getVisibleColumns().forEach(function(e){var n=e.getWidth(),t;if(h&&s.indexOf(e)<0&&r.TableUtils.isVariableWidth(n)){t=h.querySelector('th[data-sap-ui-colid="'+e.getId()+'"]');if(t){e._minWidth=Math.max(t.offsetWidth,r.getMinColumnWidth())}}})}for(var i=0;i<s.length;i++){var p=s[i];var c=r.getColumnWidth(e,p.getIndex());var I=c+g;var x=r.getMinColumnWidth();if(I<x){I=x}var M=I-c;if(Math.abs(M)<Math.abs(g)){var b=s.length-(i+1);v-=M;g=Math.round(v/b)}if(M!==0){var _=true;var S=I+"px";if(l){_=e.fireColumnResize({column:p,width:S})}if(_){p.setWidth(S);C=true}}}return C},getColumnWidth:function(e,n){if(!e||n==null||n<0){return null}var t=e.getColumns();if(n>=t.length){return null}var r=t[n];var l=r.getWidth();if(l===""||l==="auto"||l.match(/%$/)){if(r.getVisible()){var a=r.getDomRef();return a?a.offsetWidth:0}else{return 0}}else{return e._CSSSizeToPixel(l)}},getFixedColumnCount:function(e,n){var t=e.getComputedFixedColumnCount();if(!n){return t}if(t<=0||e._bIgnoreFixedColumnCount){return 0}var r=e.getColumns();var l=0;t=Math.min(t,r.length);for(var a=0;a<t;a++){if(r[a].shouldRender()){l++}}return l}};return r},true);