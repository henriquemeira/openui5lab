/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Table","sap/ui/core/Control","sap/ui/model/json/JSONModel","sap/f/cards/Data"],function(t,e,n,i){"use strict";var a=e.extend("sap.f.cards.TableContent",{metadata:{properties:{configuration:{type:"object"}},defaultAggregation:"columns",aggregations:{_content:{multiple:false,visibility:"hidden"}}},renderer:function(t,e){t.write("<div");t.writeElementData(e);t.write(">");t.renderControl(e.getAggregation("_content"));t.write("</div>")}});a.prototype._getTable=function(){if(this._bIsBeingDestroyed){return null}var e=this.getAggregation("_content");if(!e){e=new t({id:this.getId()+"-Table"});this.setAggregation("_content",e)}return e};a.prototype.setConfiguration=function(t){this.setProperty("configuration",t);if(!t){return}if(t.data){this._setData(t.data)}if(t.columns){this._setColumns(t.columns)}};a.prototype._setColumns=function(t){var e=[];t.forEach(function(t){this._getTable().addColumn(new sap.m.Column({header:new sap.m.Text({text:t.label})}));e.push(new sap.m.Text({text:t.value}))}.bind(this));this._getTable().bindItems({path:this._getTable().getBindingContext().getPath(),template:new sap.m.ColumnListItem({cells:e})})};a.prototype.applySettings=function(t,n){var i=t.data;if(i){this._setData(i);delete t.data}e.prototype.applySettings.apply(this,[t,n]);t.data=i;return this};a.prototype.init=function(){var t=new n;this.setModel(t)};a.prototype.destroy=function(){this.setModel(null);return e.prototype.destroy.apply(this,arguments)};a.prototype._setData=function(t){this._getTable().bindElement({path:t.path||"/"});var e=t.request;if(t.json&&!e){this.getModel().setData(t.json)}if(e){i.fetch(e).then(function(t){this.getModel().setData(t)}.bind(this)).catch(function(t){})}return this};return a});