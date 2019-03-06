sap.ui.define([
	"co/h2a/sigpro/ui/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("co.h2a.sigpro.ui.controller.App", {

		onInit : function () {
			this.aSearchFilters = [];
			this.aTabFilters = [];
			
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

				/*
			oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
			*/
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			// disable busy indication when the metadata is loaded and in case of errors
			//this.getOwnerComponent().getModel().metadataLoaded().then(fnSetAppNotBusy);
			//this.getOwnerComponent().getModel().attachMetadataFailed(fnSetAppNotBusy);
			
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			
		},

		onPressMenu: function() {
			this._toogleShellOverlay();
		},

		_toogleShellOverlay: function() {

            /*
			var menuItem = this.getView().byId('menuNavigationListId');
			var bState = menuItem.visible;
			menuItem.setVisible(!bState);

            // Altera valor da propriedade
			menuItem.visible = !bState;
            */

			/*
			var oItem = this.getView().byId('btMenu');
			var oShell = this.getView().byId('appUShell');
			var bState = oShell.getShowPane();
			oShell.setShowPane(!bState);
			oItem.setShowMarker(!bState);
			oItem.setSelected(!bState);
			*/
		},

		onProfile: function(oEvent) {
			this._toogleShellOverlay();
			this.getRouter().navTo('toolpage');
		},

		onHome: function(oEvent) {
			this._toogleShellOverlay();
			this.getRouter().navTo('home');
		},

		onSelectInvoiceList: function(oEvent) {
			try {
				this._toogleShellOverlay();
			} catch(oEx) {
				
			}
			this.getRouter().navTo('invoiceList');
		}

	});

});