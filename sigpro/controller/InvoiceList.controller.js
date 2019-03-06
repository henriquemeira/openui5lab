sap.ui.define(["sap/m/MessageBox","sap/ui/core/ValueState","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/unified/DateRange","co/h2a/sigpro/ui/controller/BaseController","sap/ui/model/json/JSONModel","co/h2a/sigpro/ui/model/formatter"],function(e,t,i,a,n,o,r,s){"use strict";return o.extend("co.h2a.sigpro.ui.controller.InvoiceList",{formatter:s,onInit:function(){try{this.getView().addEventDelegate({onAfterShow:function(){}},this)}catch(t){this.saveLog("E",t.message);e.error(t.message)}this.getView().setModel(new r("model/faturamento.json"))},onAfterRendering:function(){if(this.getView().getViewName()==="com.mlauffer.gotmoneyappui5.view.TransactionList"){var e=new n({startDate:new Date});this.getView().byId("transactionTable").getBinding("items").filter([]);this.getView().byId("calendar").addSelectedDate(e);this._setFilterByYearMonth(new Date)}},onItemPress:function(e){var t=e.getSource();var i=t.getBindingContext();this.getRouter().navTo("invoice",{invoiceId:i.getProperty("id")})},onAddNew:function(){this.vibrate();this.getRouter().navTo("transactionNew")},onSelectDate:function(e){this.vibrate();this._setFilterByYearMonth(e.getSource().getSelectedDates()[0].getStartDate())},_onRouteOverdue:function(){this._filterOverdue()},onUpdateStarted:function(e){e.getSource().setBusy(true)},onUpdateFinished:function(e){this._setTableTitle(e.getParameter("total")||0);this._calculateTotal();e.getSource().setBusy(false)},_setTableTitle:function(e){this.getView().byId("countTitle").setText(this.getResourceBundle().getText("Transaction.count",[e]))},_calculateTotal:function(){var e=0;var i=0;this.getView().byId("transactionTable").getItems().forEach(function(t){var a=t.getBindingContext();var n=parseFloat(a.getProperty("amount"));if(a.getProperty("type")==="D"){e+=n}else{i+=n}});var a=parseFloat(i-e).toFixed(2);var n=a<0?t.Error:t.Success;this.getView().byId("totalAmount").setText("$ "+a);this.getView().byId("totalAmount").setState(n)},_filterOverdue:function(){var e=[];var t=this.getView().byId("transactionTable");t.setBusy(true);e.push(new i("duedate",a.LT,(new Date).toJSON()));e.push(new i("idstatus",a.EQ,0));t.getBinding("items").filter(e);t.setBusy(false)},_setFilterByYearMonth:function(e){var t=[];var n=this.getView().byId("transactionTable");n.setBusy(true);e=new Date(e.getFullYear(),e.getMonth(),1);var o=new Date(e.getFullYear(),e.getMonth()+1,0);t.push(new i("duedate",a.BT,e.toJSON(),o.toJSON()));n.getBinding("items").filter(t);n.setBusy(false)}})});