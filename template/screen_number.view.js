sap.ui.jsview("project.type.tcode.screen_number", {
	getControllerName : function() {
		return "project.type.tcode.screen_number";
	},
	createContent : function(oController) {	
		var pnlBody = SAPUI.Panel(this.createId("pnlBody"), "", "100%", false, false)
		
		var shell = SAPUI.FShell({
			title: oController.title,
			content: pnlBody
		})
 		return shell.page
	}
});