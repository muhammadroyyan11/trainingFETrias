sap.ui.define([
	'sap/ui/core/mvc/Controller',
], function(Controller) {
    'use strict'
    return Controller.extend("projectapp.System.Trx.Trx2", {
        onInit: function () {
            this.router = sap.ui.core.routing.Router.getRouter("appRouter");
            this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
            this.router.getRoute("Trx2").attachPatternMatched(function (oEvent) {
                
            })
            this.biodata = JSON.parse(localStorage.getItem('myItemsTrx2'));
            this.DisplayDataBasic()
            this.DisplayDataAdditional()
        },


        DisplayDataBasic: async function() {
            var table1 = SAPUI.GetCore(this.createId("table1"))
            var oModelExcel = new sap.ui.model.json.JSONModel();
            oModelExcel.setData(
                { data: this.biodata 
            });
            table1.setModel(oModelExcel);
            table1.bindRows("/data");
        },

        DisplayDataSelected: async function() {
            var table1 = SAPUI.GetCore(this.createId("table1"))
            var selected = table1.getSelectedIndices();
            localStorage.setItem('myItemsTrx3', JSON.stringify(this.biodata[selected]));
            SAPUI.Route("Trx3");
        },



        DisplayDataAdditional: async function() {
            var table2 = SAPUI.GetCore(this.createId("table2"))
            var oModelExcel = new sap.ui.model.json.JSONModel();
            oModelExcel.setData(
                { data: this.biodata 
            });
            table2.setModel(oModelExcel);
            table2.bindRows("/data");
        },


        
    })    
})