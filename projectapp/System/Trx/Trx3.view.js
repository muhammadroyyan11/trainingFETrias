sap.ui.jsview("projectapp.System.Trx.Trx3", {
    getControllerName: function () {
        return "projectapp.System.Trx.Trx3";
    },

    createContent: function (oController) {
        

        var panel = SAPUI.Panel(this.createId("pnl"), "", "100%", false, false).addStyleClass("panel");
    
        var labelPersID = SAPUI.Label(this.createId("labelPersID"), "Personnel ID").addStyleClass("label");
        var PersID = SAPUI.Label(this.createId("PersID"), "").addStyleClass("label");
        var labelFullName = SAPUI.Label(this.createId("labelFullName"), "Full Name").addStyleClass("label");
        var FullName = SAPUI.Label(this.createId("FullName"), "").addStyleClass("label");
        var labelNickName = SAPUI.Label(this.createId("labelNickName"), "Nick Name").addStyleClass("label");
        var NickName = SAPUI.Label(this.createId("NickName"), "").addStyleClass("label");
        var labelAge = SAPUI.Label(this.createId("labelAge"), "Age").addStyleClass("label");
        var Age = SAPUI.Label(this.createId("Age"), "").addStyleClass("label");
        var labelDateBorn = SAPUI.Label(this.createId("labelDateBorn"), "Date Born").addStyleClass("label");
        var DateBorn = SAPUI.Label(this.createId("DateBorn"), "").addStyleClass("label");
        var labelAddress = SAPUI.Label(this.createId("labelAddress"), "Address").addStyleClass("label");
        var Address = SAPUI.Label(this.createId("Address"), "").addStyleClass("label");
        var labelOriginCity = SAPUI.Label(this.createId("labelOriginCity"), "Origin City").addStyleClass("label");
        var OriginCity = SAPUI.Label(this.createId("OriginCity"), "").addStyleClass("label");
        var labelReligion = SAPUI.Label(this.createId("labelReligion"), "Religion").addStyleClass("label");
        var Religion = SAPUI.Label(this.createId("Religion"), "").addStyleClass("label");
        var labelGender = SAPUI.Label(this.createId("labelGender"), "Gender").addStyleClass("label");
        var Gender = SAPUI.Label(this.createId("Gender"), "").addStyleClass("label");
        var labelEmail= SAPUI.Label(this.createId("labelEmail"), "Email").addStyleClass("label");
        var Email = SAPUI.Label(this.createId("Email"), "").addStyleClass("label");
        
        
        var mtr = SAPUI.Matrix("", "", true, [], 2)
        mtr.createRow(labelPersID, PersID)
        mtr.createRow(labelFullName, FullName)
        mtr.createRow(labelNickName, NickName)
        mtr.createRow(labelAge, Age)
        mtr.createRow(labelDateBorn, DateBorn)
        mtr.createRow(labelAddress, Address)
        mtr.createRow(labelOriginCity, OriginCity)
        mtr.createRow(labelReligion, Religion)
        mtr.createRow(labelGender, Gender)
        mtr.createRow(labelEmail, Email)
      
        panel.addContent(mtr)

       
        return panel
    }
});