sap.ui.jsview("projectapp.System.Trx.Trx2", {
    getControllerName: function () {
        return "projectapp.System.Trx.Trx2";
    },

    createContent: function (oController) {
        

        var panel = SAPUI.Panel(this.createId("pnl"), "", "100%", false, false).addStyleClass("panel");

        var Tab = new sap.m.IconTabBar ({
            id: this.createId("tab"),
            expandable: false
        })
        var Tab1 = new sap.m.IconTabFilter({
            id: this.createId("tab1"),
            count: "Basic Info"
        })
        var Tab2 = new sap.m.IconTabFilter({
            id: this.createId("tab2"),
            count: "Additional Info"
        })
        Tab.addItem(Tab1)
        Tab.addItem(Tab2)

        var btnExecute = SAPUI.Button((this.createId("btnExecute")), "Execute", "Execute", "", false, "Default" ).addStyleClass("buttonexecute")
        var mtrButton = SAPUI.Matrix("", "", true, [], 3)
        mtrButton.createRow(btnExecute)
        
        var table1 = SAPUI.Table(this.createId("table1"), "auto", 10, "Single", "paginator", true, true)
        var column1 = SAPUI.Column("Personnel ID","TextView","IDPerson","8%","Left","Left");
        var column2 = SAPUI.Column("Nick Name","TextView","NickName","8%","Left","Left");
        table1.addColumn(column1)
        table1.addColumn(column2)
        
        var table2 = SAPUI.Table(this.createId("table2"), "auto", 10, "None", "paginator", true, true)
        var column3 = SAPUI.Column("Personel ID","TextView","IDPerson","8%","Left","Left");
        var column4 = SAPUI.Column("Full Name","TextView","FullName","8%","Left","Left");
        var column5 = SAPUI.Column("Nick Name","TextView","NickName","8%","Left","Left");
        var column6 = SAPUI.Column("Age","TextView","Age","8%","Left","Left");
        var column7 = SAPUI.Column("Date Born","TextView","DateBorn","8%","Left","Left");
        var column8 = SAPUI.Column("Address","TextView","Address","8%","Left","Left");
        var column9 = SAPUI.Column("Origin City","TextView","OriginCity","8%","Left","Left");
        var column10 = SAPUI.Column("Phone","TextView","PhoneNo","8%","Left","Left");
        var column11 = SAPUI.Column("Religion","TextView","Religion","8%","Left","Left");
        var column12 = SAPUI.Column("Gender","TextView","Gender","8%","Left","Left");
        var column13 = SAPUI.Column("Email","TextView","Email","8%","Left","Left");
        table2.addColumn(column3)
        table2.addColumn(column4)
        table2.addColumn(column5)
        table2.addColumn(column6)
        table2.addColumn(column7)
        table2.addColumn(column8)
        table2.addColumn(column9)
        table2.addColumn(column10)
        table2.addColumn(column11)
        table2.addColumn(column12)
        table2.addColumn(column13)

        Tab1.addContent(mtrButton)
        Tab1.addContent(table1)
        Tab2.addContent(table2)
        panel.addContent(Tab)

        btnExecute.attachPress(
            function()
            {
                oController.DisplayDataSelected()                
            }
        )
       
        return panel

        
    }
});