
sap.ui.jsview("projectapp.System.Login.Home2", {
    getControllerName: function () {
        return "projectapp.System.Login.Home2";
    },

    createContent: function (oController) {
        var labelName1 = SAPUI.Label(this.createId("labelFirst"), "Nama Depan").addStyleClass("label");

        return labelName1
        }
        
    });