sap.ui.define([
	'sap/ui/core/mvc/Controller',
], function(Controller) {
    'use strict'
    return Controller.extend("projectapp.System.Trx.Trx1", {
        onInit: function () {
            this.router = sap.ui.core.routing.Router.getRouter("appRouter");
            this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
            this.router.getRoute("Trx1").attachPatternMatched(function (oEvent) {
                
            })
            this.biodata = []
            var religion = ["islam", "kristen", "konghucu", "buddha", "hindu"]
        },


        AddRowTable: async function() {
            var table1 = SAPUI.GetCore(this.createId("table1"))
            var oModelExcel = new sap.ui.model.json.JSONModel();

            this.biodata.push({
                FullName:'',
                NickName:'',
                Age:'',
                DateBorn:'',
                Address:'',
                OriginCity:'',
                PhoneNo:'',
                Religion:'',
                Gender:'',
                Email:''
            })
                
            oModelExcel.setData(
                { data: this.biodata 
            });
            table1.setModel(oModelExcel);
            table1.bindRows("/data");
            console.log(this.biodata)

        },

        DeleteRowTable: async function() {
            var table1 = SAPUI.GetCore(this.createId("table1"))
            var oModelExcel = new sap.ui.model.json.JSONModel();
            var selected = table1.getSelectedIndices();

            if (selected.length!=0){
                for (var i = selected.length -1; i >= 0; --i) {
                    this.biodata.splice(selected[i], 1);
                }
            } else {
                this.biodata.pop()

            }

            table1.clearSelection();
            oModelExcel.setData(
                { data: this.biodata 
            });
            table1.setModel(oModelExcel);
            table1.bindRows("/data");
            console.log(this.biodata)

			
        },

        onSubmit: function () {
            for(let i=0 ; i<this.biodata.length; i++ ){
                var year = this.biodata[i].DateBorn.substring(0, 4);
                console.log(year)
                var PersId = this.biodata[i].NickName +  this.biodata[i].Age+year
                this.biodata[i].IDPerson=PersId
            }
            localStorage.setItem('myItemsTrx2', JSON.stringify(this.biodata));
            SAPUI.Route("Trx2");

        }
    
        
        
    })    
})