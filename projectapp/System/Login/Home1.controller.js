sap.ui.define([
	'sap/ui/core/mvc/Controller',
], function(Controller) {
    'use strict'
    return Controller.extend("projectapp.System.Login.Home1", {
        onInit: function () {
            this.router = sap.ui.core.routing.Router.getRouter("appRouter");
            this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
            var labelJml = SAPUI.GetCore(this.createId("labelJml"))
            var labelCount = SAPUI.GetCore(this.createId("labelCount"))
            var tfJml = SAPUI.GetCore(this.createId("tfJml"))

            this.onComboBox()

            labelJml.setVisible(false)
            labelCount.setVisible(false)
            tfJml.setVisible(false)
        },
        onShow: function () {
            var show1 = SAPUI.GetCore(this.createId("labelJml"))
            var show2 = SAPUI.GetCore(this.createId("labelCount"))
            var show3 = SAPUI.GetCore(this.createId("tfJml"))
            show1.setVisible(true)
            show2.setVisible(true)
            show3.setVisible(true)
        },
        onVisible: function () {
            var labelJml = SAPUI.GetCore(this.createId("labelJml"))
            var labelCount = SAPUI.GetCore(this.createId("labelCount"))
            var tfJml = SAPUI.GetCore(this.createId("tfJml")) 
            
            labelJml.setVisible(false)
            labelCount.setVisible(false)
            tfJml.setVisible(false)
        },
        onComboBox: function(){
            var Status = [
                {
                    "Status": "Kawin"
                },
                {
                    "Status": "Belum Kawin"
                }
            ]

            var opt1 = SAPUI.GetCore(this.createId("option"))
            var marriage = { status: Status}
            var model = new sap.ui.model.json.JSONModel();
            var oItemTemplate1 = new sap.ui.core.ListItem();

            model.setData(marriage)
            opt1.setModel(model)

            oItemTemplate1.bindProperty("text", "Status");
            opt1.bindItems("/status", oItemTemplate1);
        },
        onSubmit: function() {
            console.log('success')
        }
    })    
})