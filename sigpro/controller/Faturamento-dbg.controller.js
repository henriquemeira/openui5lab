sap.ui.define([
	'sap/ui/model/json/JSONModel',
	'co/h2a/sigpro/ui/controller/BaseController'
], function (JSONModel, BaseController) {
	"use strict";

	var CController = BaseController.extend("co.h2a.sigpro.ui.controller.Faturamento", {


		onInit : function() {
            // Define modelo Faturamento
			this._oFaturamentoModel = new JSONModel("model/faturamento.json");
			this.getView().setModel(this._oFaturamentoModel, "faturamentoModel");
        },

	});


	return CController;

});
