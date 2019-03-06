sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/MessageToast',
	'co/h2a/sigpro/ui/controller/BaseController'
], function (jQuery, Fragment, Controller, JSONModel, Popover, Button, MessageToast, BaseController) {
	"use strict";

	var CController = BaseController.extend("co.h2a.sigpro.ui.controller.ToolPage", {


		onInit : function() {

			this.onPressFaturamento.bind(this);

			this.model.setData(this.data);
			this.getView().setModel(this.model);
			this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);


			// Define modelo Contatos
			this._oContactModel = new JSONModel("model/contatos.json");
			this.getView().setModel(this._oContactModel, "contactModel");


			// Define modelo CEP
			this._oCepModel = new JSONModel("https://viacep.com.br/ws/01001000/json/");
			this.getView().setModel(this._oCepModel, "cepModel");
			this._oCepViewModel = new JSONModel({
				searchTerm: "",
				busy: false
			});
			this.getView().setModel(this._oCepViewModel, "cepViewModel");
			

			// Define modelo Faturamento
			this._oFaturamentoModel = new JSONModel("model/faturamento.json");
			this.getView().setModel(this._oFaturamentoModel, "faturamentoModel");

		},

		model : new JSONModel(),

		data : {
			navigation: [{
				title: 'Operação',
				icon: 'sap-icon://bbyd-active-sales',
				key: 'pageOperacao'
			
			}, {
				title: 'Faturamento',
				icon: 'sap-icon://sales-document',
				key: 'pageFaturamento'
			}, {
				title: 'Contatos',
				icon: 'sap-icon://contacts',
				key: 'pageContatos'
			}, {
				title: 'CEP',
				icon: 'sap-icon://letter',
				key: 'pageCep'
			}
			],
			fixedNavigation_SUSPENSO: [{
				title: 'Fixed Item 1',
				icon: 'sap-icon://employee'
			}, {
				title: 'Fixed Item 2',
				icon: 'sap-icon://building'
			}, {
				title: 'Fixed Item 3',
				icon: 'sap-icon://card'
			}],
			headerItems: [
			{
				text: "File"
			}, {
				text: "Edit"
			}, {
				text: "View"
			}, {
				text: "Settings"
			}, {
				text: "Help"
			}]
		},

		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},

		handleUserNamePress: function (event) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Feedback',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		},

		onSideNavButtonPress : function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip : function(bLarge) {
			var toggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
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

		},
		
		onPressFaturamento : function(oEvent) {
			
			var oRow = oEvent.getParameter("row");
			var oItem = oEvent.getParameter("item");
			var oModel = this.getView().getModel("faturamentoModel");
			var sCliente = oModel.getProperty("cliente", oRow.getBindingContext("faturamentoModel"));
			var sServico = oModel.getProperty("servico", oRow.getBindingContext("faturamentoModel"));
			var sContrato = oModel.getProperty("contrato", oRow.getBindingContext("faturamentoModel"));
			MessageToast.show("Ação: " + (oItem.getText() || oItem.getType()) + 
				"\nCliente: " + sCliente + 
				"\nServiço: " + sServico + 
				"\nContrato: " + sContrato);

			// The source is the list item that got pressed
			//this._showObject(oEvent.getSource());
			//this.getRouter().navTo("object", {
			//	objectId: sCliente
			//});

			this._onItemFaturamentoSelect(oEvent);
		},


		_onItemFaturamentoSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			//sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + "pageObject");
			this._onGoToProductTable(oEvent);
		}


	});


	return CController;

});
