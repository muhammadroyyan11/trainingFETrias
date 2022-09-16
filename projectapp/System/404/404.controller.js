sap.ui.controller("projectapp.System.Maintenance.404", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf it_admin_entry.UX_MAIN.404
     */

    onInit: function () {
        this.router = sap.ui.core.routing.Router.getRouter("appRouter");
        this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
        this.router.getRoute("404").attachPatternMatched(function (oEvent) {
            sessionStorage.removeItem("dataCreateUser");
            sessionStorage.removeItem("dataChangeUser");
            sessionStorage.removeItem("dataDisplayUser");
            // Global.LockingCheck(); 
        });
    },
    onAfterRendering: function () {
        
    },

    onbtnBack: function(){
        // Global.Back()
        SAPUI.Route("Dashboard")
    }
 
});