sap.ui.jsview("projectapp.System.Trx.Trx1", {
    getControllerName: function () {
        return "projectapp.System.Trx.Trx1";
    },

    createContent: function (oController) {
        

        var panel = SAPUI.Panel(this.createId("pnl"), "", "100%", false, false).addStyleClass("panel");

        var btnPlus = SAPUI.Button((this.createId("btnPlus")), "+", "tambah", "", false, "Success" ).addStyleClass("margin-right10")
        var btnMin = SAPUI.Button((this.createId("btnMin")), "-", "hapus", "", false, "Success" ).addStyleClass("margin-right10")
        var btnExecute = SAPUI.Button((this.createId("btnExecute")), "Execute", "Execute", "", false, "Success" ).addStyleClass("buttonexecute")


        var layoutButton = new sap.ui.layout.HorizontalLayout({
            allowWrapping : true,
        })

        layoutButton.addContent(btnPlus)
        layoutButton.addContent(btnMin)
        layoutButton.addContent(btnExecute)

        var mtrButton = SAPUI.Matrix("", "", true, [], 2).addStyleClass("mtr2");
        mtrButton.createRow(layoutButton)

        var table1 = SAPUI.Table(this.createId("table1"), "auto", 10, "MultiToggle", "paginator", true, true)
        var column2 = SAPUI.Column("Full Name","TextField","FullName","8%","Left","Left");
        var column3 = SAPUI.Column("Nick Name","TextField","NickName","8%","Left","Left");
        var column4 = SAPUI.Column("Age","TextNumeric","Age","8%","Left","Left");
        var column5 = SAPUI.Column("Date Born","DatePicker","DateBorn","8%","Left","Left");
        var column6 = SAPUI.Column("Address","TextField","Address","8%","Left","Left");
        var column7 = SAPUI.Column("Origin City","TextField","OriginCity","8%","Left","Left");
        var column8 = SAPUI.Column("Phone","TextNumeric","PhoneNo","8%","Left","Left");
        // ppTemplateReligion = new sap.m.ComboBox({
        //     id: this.createId("ComboBox1"),
        //     width: "100%",
        //     placeholder: "Religion",
        //     //displaySecondaryValues: true
        // })
        var column9 = SAPUI.Column("Religion","ComboBox","Religion","8%","Left","Left");
        var column10 = SAPUI.Column("Gender","ComboBox","Gender","8%","Left","Left");
        var column11 = SAPUI.Column("Email","TextField","Email","8%","Left","Left");
        table1.addColumn(column2)
        table1.addColumn(column3)
        table1.addColumn(column4)
        table1.addColumn(column5)
        table1.addColumn(column6)
        table1.addColumn(column7)
        table1.addColumn(column8)
        table1.addColumn(column9)
        table1.addColumn(column10)
        table1.addColumn(column11)

        panel.addContent(mtrButton)
        panel.addContent(table1)

        var dialogSubmit = SAPUI.Dialog(this.createId("dialogChange"), "Apakah Anda yakin data telah benar?", "30%", "20%", false)
        
        var btnDialog = SAPUI.Button((this.createId("btnDialog")), "Ya, Simpan Data", "go", "", false, "default").addStyleClass("buttonDialog").addStyleClass("button1")
        var btnDialog2 = SAPUI.Button((this.createId("btnDialog2")), "Tidak, Periksa Kembali", "back", "", false, "default").addStyleClass("buttonDialog2")

        dialogSubmit.addContent(btnDialog)
        dialogSubmit.addContent(btnDialog2)
      
        btnExecute.attachPress(
            function()
            {
                dialogSubmit.open();
                
            }
        )
        btnDialog.attachPress(
            function()
            {
                oController.onSubmit();
                dialogSubmit.close();
                // SAPUI.Route("Trx2");
            }
        )

        btnDialog2.attachPress(
            function()
            {
                dialogSubmit.close();
            }
        )
        btnPlus.attachPress(
            function()
            {
                oController.AddRowTable()
            }
        )
        btnMin.attachPress(
            function()
            {
                oController.DeleteRowTable()
            }
        )
     

       
        return panel
    }
});