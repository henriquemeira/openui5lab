sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("co.h2a.sigpro.ui.controller.Contato", {

		onInit: function () {
			this._oListaContatosModel = new JSONModel("model/contatos.json");
			this.getView().setModel(this._oListaContatosModel, "listaContatos");
			console.log("################# lista contatos ");
			console.log(this._oListaContatosModel);
			console.log("################# / lista contatos ");
		},

    });
    
});