sap.ui.define([
    'co/h2a/sigpro/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'
  ], function(BaseController, JSONModel, MessageToast) {
    'use strict';

    return BaseController.extend('co.h2a.sigpro.ui.controller.Cep', {

      onInit: function() {

			// Define modelo CEP
			this._oCepModel = new JSONModel("https://viacep.com.br/ws/01001000/json/");
			this.getView().setModel(this._oCepModel, "cepModel");
			this._oCepViewModel = new JSONModel({
				searchTerm: "",
				busy: false
			});
			this.getView().setModel(this._oCepViewModel, "cepViewModel");
      },

      onCepSearch: function (oEvent) {

      			var sCep = this.getView().getModel("cepViewModel").getProperty("/searchTerm");

      			var sUrl = `https://viacep.com.br/ws/${sCep}/json/`; // ES6

      			this.getView().getModel("cepViewModel").setProperty("/busy", true);

      			function onRequestCompleted(oEvt) {
      				this.getView().getModel("cepViewModel").setProperty("/busy", false);
      				if(!oEvt.getParameters().success || this._oCepModel.getProperty("/erro")){
      					this._oCepModel.setProperty("/", {});
      					MessageToast.show("CEP não encontrado ou inválido");
      				}
      			}
      			this._oCepModel.attachRequestCompleted(onRequestCompleted, this)
      			this._oCepModel.loadData(sUrl);

      }


   });
  });