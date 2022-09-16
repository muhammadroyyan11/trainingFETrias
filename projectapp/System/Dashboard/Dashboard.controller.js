sap.ui.controller("projectapp.System.Dashboard.Dashboard", {
	onInit: function () {
		sessionStorage.removeItem("LockingTCode");
		window.localStorage.setItem("DashURL", window.location.href)
		this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
		sap.ui.getCore().setModel(SAPUI.GetMenuModel()["tiles"], "Tiles");

		var firstTime = JSON.parse(window.sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer"))
		var history = JSON.parse(window.sessionStorage.getItem("sess-history"))
		
		window.sessionStorage.clear()

		window.sessionStorage.setItem("IsThisFirstTime_Log_From_LiveServer", firstTime)
		window.sessionStorage.setItem("sess", history)
	},

	onPressTile: function (tcode) {
		SAPUI.RouteTcode(tcode)
	},

	numberWithCommas: function (parseVariable) {
		return parseVariable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	numberWithCommas: function (parseVariable) {
		return parseVariable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
});