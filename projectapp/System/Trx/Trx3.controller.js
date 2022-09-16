sap.ui.define([
	'sap/ui/core/mvc/Controller',
], function(Controller) {
    'use strict'
    return Controller.extend("projectapp.System.Trx.Trx3", {
        onInit: function () {
            this.router = sap.ui.core.routing.Router.getRouter("appRouter");
            this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
            this.router.getRoute("Trx3").attachPatternMatched(function (oEvent) {
                
            })
            this.biodata = JSON.parse(localStorage.getItem('myItemsTrx3'));

            var PersID = SAPUI.GetCore(this.createId("PersID"))
            var FullName = SAPUI.GetCore(this.createId("FullName"))
            var NickName = SAPUI.GetCore(this.createId("NickName"))
            var Age = SAPUI.GetCore(this.createId("Age"))
            var DateBorn = SAPUI.GetCore(this.createId("DateBorn"))
            var Address = SAPUI.GetCore(this.createId("Address"))
            var OriginCity = SAPUI.GetCore(this.createId("OriginCity"))
            var Religion = SAPUI.GetCore(this.createId("Religion"))
            var Gender = SAPUI.GetCore(this.createId("Gender"))
            var Email = SAPUI.GetCore(this.createId("Email"))
            PersID.setText(this.biodata.IDPerson)
            FullName.setText(this.biodata.FullName)
            NickName.setText(this.biodata.NickName)
            Age.setText(this.biodata.Age)
            DateBorn.setText(this.biodata.DateBorn)
            Address.setText(this.biodata.Address)
            OriginCity.setText(this.biodata.OriginCity)
            Religion.setText(this.biodata.Religion)
            Gender.setText(this.biodata.Gender)
            Email.setText(this.biodata.Email)

            
        }

        
    })    
})