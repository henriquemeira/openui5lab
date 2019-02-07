sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.worklist.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkWorklistPressed : function () {
			this.getRouter().navTo("worklist");
		},

		onLinkToolpagePressed : function () {
			this.getRouter().navTo("toolpage");
		}

	});

});