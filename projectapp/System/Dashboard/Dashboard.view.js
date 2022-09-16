sap.ui.jsview("projectapp.System.Dashboard.Dashboard", {

	getControllerName: function () {
		return "projectapp.System.Dashboard.Dashboard";
	},

	createContent: function (oController) {
		
		// SECTION DynamicTile REPORT ------------------------------------------------------------------------------------------------------
		var myTile = new sap.m.GenericTile({
			// header			: "{Tiles>headerGnt}",
			// header			: SAPUI.Image("", "sap-icon://accelerated", "60px", "60px", false, ""),
			subheader		: "{Tiles>subHeaderGnt}",
			size			: "{Tiles>sizeGnt}",
			frameType		: "{Tiles>frameTypeGnt}",
			headerImage		: "{Tiles>iconGnt}",
			state			: "{Tiles>stateGnt}",
			imageDescription: "{Tiles>pressGnt}",
			failedText		: "{Tiles>tile}",
			// tooltip			: "{Tiles>headerGnt}",
			// icon: new sap.m.ImageContent({
			// 	src	: "asset/icon/reporte.png",
			// 	}
			// ),
			// tileContent: new sap.m.TileContent({
			// 	content: SAPUI.Image("", "{Tiles>iconGnt}", "60px", "60px", false, "")
			// 	// content: SAPUI.TextField()
			// }),
			press: function () {
				var tcode = this.getImageDescription();
				oController.onPressTile(tcode);
			}
		}).addStyleClass('tileStyle')

		var pnlTileReport = new sap.m.Panel(this.createId("pnlTileReport"), {
			headerText: "{Tiles>Header-Data}",
			backgroundDesign: "Transparent",
			content: {
				path: "Tiles>Content-Data",
				template: myTile,
				templateShareable: true
			}
		})

		var pnlContainerTile = new sap.m.Panel({
			backgroundDesign: "Transparent"
		})

		pnlContainerTile.bindAggregation("content", "Tiles>/Tiles", pnlTileReport);
		// !SECTION
		
		var shell = SAPUI.FShell({
			title: "Dashboard", 
			content: [pnlContainerTile],
			showToolbar: false,
			id: this.createId()
		}, true)

		return shell.page;
	}

});