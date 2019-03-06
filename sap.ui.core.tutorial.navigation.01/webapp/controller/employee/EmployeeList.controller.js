sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeList", {
        onListItemPressed : function(oEvent){

			console.log("-------------------------------------------")
			console.log("oEvent.getSource(): " + oEvent.getSource());
			console.log(oEvent.getSource());
			console.log("-------------------------------------------")
			console.log("oEvent.getSource().getBindingContext(): " + oEvent.getSource().getBindingContext());
			console.log(oEvent.getSource().getBindingContext());
			console.log("-------------------------------------------");
			
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});
		}
	});
});