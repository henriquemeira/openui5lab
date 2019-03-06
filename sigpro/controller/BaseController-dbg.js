sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/library",
	'sap/ui/core/routing/History',
], function (Controller, UIComponent, mobileLibrary, History) {
	"use strict";

	// shortcut for sap.m.URLHelper
	var URLHelper = mobileLibrary.URLHelper;

	return Controller.extend("co.h2a.sigpro.ui.controller.BaseController", {
		
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
			// The history contains a previous entry
			history.go(-1);
			} else {
			// Otherwise we go backwards with a forward history
			this.getRouter().navTo('home', {}, true);
			}
		},


		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onShareEmailPress : function () {
			var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
			URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
		
		saveLog : function(sType, sText) {
			//TODO
			// do something, i.e. send usage statistics to backend
			// in order to improve our app and the user experience (Build-Measure-Learn cycle)
			//console.dir(jQuery(window.location).attr('href'));
			//console.dir(jQuery(window.location).attr('hash'));
			sType = sType.toUpperCase();
			//var sUser = '';
			var sURL = jQuery(window.location).attr('href').toString();
			var sLogMessage = sType + ': ' + sText + '. User accessed route ' + sURL + ', timestamp = ' + jQuery.now();
			switch (sType) {
			  case 'E':
				jQuery.sap.log.error(sLogMessage);
				break;
			  case 'I':
				jQuery.sap.log.info(sLogMessage);
				break;
			  case 'S':
				jQuery.sap.log.info(sLogMessage);
				break;
			  case 'W':
				jQuery.sap.log.warning(sLogMessage);
				break;
			  default:
				jQuery.sap.log.info(sLogMessage);
				break;
			}
		  },

		  checkSession : function() {
			if (!this.getUserLogged()) {
			  var that = this;
			  MessageBox.error(this.getResourceBundle().getText('Error.userNotConnected'), {
				onClose: function(sAction) {
				  that.getRouter().navTo('index');
				}
			  });
			}
		  }

	
	});

});