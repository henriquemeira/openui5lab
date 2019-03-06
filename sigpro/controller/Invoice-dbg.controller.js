sap.ui.define([
    'co/h2a/sigpro/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel'
  ], function(BaseController, JSONModel) {
    'use strict';
  
    return BaseController.extend('co.h2a.sigpro.ui.controller.Invoice', {
  
      onInit: function() {
      /*
        var oOwnerComponent = this.getOwnerComponent();

        this.oRouter = oOwnerComponent.getRouter();
        this.oModel = oOwnerComponent.getModel();

        this.oRouter.getRoute("invoiceList").attachPatternMatched(this._onProductMatched, this);
        this.oRouter.getRoute("invoice").attachPatternMatched(this._onProductMatched, this);

        // Define modelo Faturamento
        this._oFaturamentoModel = new sap.ui.model.json.JSONModel("model/faturamento.json");
        this.getView().setModel(this._oFaturamentoModel, "faturamentoModel");
       */

        // Define modelo Faturamento
        this.getView().setModel(new JSONModel("model/faturamento.json"));

        this.getRouter().getRoute("invoice").attachMatched(this._onRouteMatched, this);

      },

      _onRouteMatched : function (oEvent) {
       			var oArgs, oView;
       			oArgs = oEvent.getParameter("arguments");
       			oView = this.getView();

       			oView.bindElement({
       				path : "/" + oArgs.invoiceId,
       				events : {
       					change: this._onBindingChange.bind(this),
       					dataRequested: function (oEvent) {
       						oView.setBusy(true);
       					},
       					dataReceived: function (oEvent) {
       						oView.setBusy(false);
       					}
       				}
       			});

      },

      _onBindingChange : function (oEvent) {
       			// No data for the binding
       			if (!this.getView().getBindingContext()) {
       				this.getRouter().getTargets().display("notFound");
       			}
      },

      _onProductMatched: function (oEvent) {
        this._invoiceId = oEvent.getParameter("arguments").invoiceId || this._invoiceId || "0";
        this.getView().bindElement({
          path: "/invoice/" + this._invoiceId,
          model: "invoiceModel"
        });
      },

      onSave: function() {
        alert("Salvar");
        this.onNavBack();
      }
  
    });
  });