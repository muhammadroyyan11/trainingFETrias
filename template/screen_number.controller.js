sap.ui.define([
	'sap/ui/core/mvc/Controller',
], function(Controller) {
	'use strict';
	return Controller.extend("project.type.tcode.screen_number", {
		title: "Your title here",
		route: "screen_number",
		onInit: function() {
			this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter")
			oRouter.getRoute(this.route).attachPatternMatched(this.routeMatched, this)
		},
	
		routeMatched: function() {
	
		}
	});
});