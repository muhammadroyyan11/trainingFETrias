sap.ui.jsview("projectapp.System.Login.Home1", {
    getControllerName: function () {
        return "projectapp.System.Login.Home1";
    },

    createContent: function (oController) {
        
        var scroll = new sap.m.ScrollContainer({
            height : "100%",
            width : "100%" ,
            vertical :true
        });

        var newHr = new sap.ui.layout.HorizontalLayout("hr",{})

        var hrLayout = SAPUI.HorizontalLayout(this.createId("hrl"));

        var panel = SAPUI.Panel(this.createId("pnl"), "", "100%", false, false).addStyleClass("panel");

        var labelName1 = SAPUI.Label(this.createId("labelFirst"), "Nama Depan").addStyleClass("label");
        var labelName1eng = SAPUI.Label(this.createId("labelFirstEng"), "First Name").addStyleClass("labeleng");
        var tfName1 = SAPUI.TextField(this.createId("tfFirst"), "", "70%", 20, true, true).addStyleClass("tf");

        var labelMid = SAPUI.Label(this.createId("labelMiddle"), "Nama Tengah").addStyleClass("label");
        var labelMideng = SAPUI.Label(this.createId("labelMiddleEng"), "Middle Name").addStyleClass("labeleng");
        var tfMid = SAPUI.TextField(this.createId("tfMiddle"), "", "70%", 20, true, true).addStyleClass("tf");

        var labelLast = SAPUI.Label(this.createId("labelLast"), "Nama Belakang").addStyleClass("label");
        var labelLasteng = SAPUI.Label(this.createId("labelLastEng"), "Last Name").addStyleClass("labeleng");
        var tfLast = SAPUI.TextField(this.createId("tfLast"), "", "70%", 20, true, true).addStyleClass("tf");

        var labelKota = SAPUI.Label(this.createId("labelMiddle"), "Kota Lahir").addStyleClass("label");
        var labelCity = SAPUI.Label(this.createId("labelCity"), "Birthplace").addStyleClass("labeleng");
        var tfCity = SAPUI.TextField(this.createId("tfCity"), "", "70%", 20, true, true).addStyleClass("tf");
        
        var labelTanggal = SAPUI.Label(this.createId("labelTanggal"), "Tanggal Lahir").addStyleClass("label");
        var labelDate = SAPUI.Label(this.createId("labelDate"), "Birthdate").addStyleClass("labeleng");
        var tfDate = SAPUI.DatePicker(this.createId("tfDate"), "70%", ).addStyleClass("tf");
        
        var labelAsal = SAPUI.Label(this.createId("labelAsal"), "Kota Asal").addStyleClass("label");
        var labelFrom = SAPUI.Label(this.createId("labelFrom"), "City").addStyleClass("labeleng");
        var tfAsal = SAPUI.TextField(this.createId("tfAsal"), "", "70%", 20, true, true).addStyleClass("tf");

        var labelRadio = SAPUI.Label(this.createId("labelRadio"), "Punya Saudara?").addStyleClass("label");
        var labelRadioEng = SAPUI.Label(this.createId("labelRadioEng"), "Have Siblings?").addStyleClass("labeleng");
        var radioYes = SAPUI.RadioButton(this.createId("rdYes"), "Yes", "Yes", "have")
        var radioNo = SAPUI.RadioButton(this.createId("rdNo"), "No", "No", "have")

        var labelJml = SAPUI.Label(this.createId("labelJml"), "Jumlah Saudara").addStyleClass("label");
        var labelCount = SAPUI.Label(this.createId("labelCount"), "Number of siblings").addStyleClass("labeleng");
        var tfJml = SAPUI.TextField(this.createId("tfJml"), "", "70%", 20, true, true).addStyleClass("tf");

        var labelKawin = SAPUI.Label(this.createId("labelKawin"), "Jumlah Saudara").addStyleClass("label");
        var labelMarriage = SAPUI.Label(this.createId("labelMarriage"), "Number of siblings").addStyleClass("labeleng");
        var option = SAPUI.ComboBox(this.createId("option"), "", "Pilih Status")

        var labelArea = SAPUI.Label(this.createId("labelArea"), "Ceritakan Tentang Skripsimu").addStyleClass("label");
        var TextArea = SAPUI.TextArea(this.createId("TxtArea", "Ceritakan Tentang Skripsimu", 3, 2))
        // var optionTwo = SAP.ComboBox(this.createId("optTwo"), "", "Belum Kawin")
        var buttonSubmit = SAPUI.Button(this.createId("buttonSbt"), "Generate My Bio");

        var mtr1 = SAPUI.Matrix("", "100%", true, [], 3).addStyleClass("mtr1");
        mtr1.createRow(labelName1, labelMid, labelLast);
        mtr1.createRow(labelName1eng, labelMideng, labelLasteng);
        mtr1.createRow(tfName1, tfMid, tfLast);

        mtr1.createRow(labelKota, labelTanggal);
        mtr1.createRow(labelCity, labelDate);
        mtr1.createRow(tfCity, tfDate);

        mtr1.createRow(labelAsal);
        mtr1.createRow(labelFrom);
        mtr1.createRow(tfAsal);

        mtr1.createRow(labelRadio, labelJml);
        mtr1.createRow(labelRadioEng, labelCount);
        var mtrRadio = SAPUI.Matrix("", "50%", true, [], 2).addStyleClass('mtr2');
        mtrRadio.createRow(radioYes, radioNo);
        mtr1.createRow(mtrRadio, tfJml);

        mtr1.createRow(labelKawin)
        mtr1.createRow(labelMarriage)
        mtr1.createRow(option)

        mtr1.createRow(labelArea)
        TextArea.setWidth("100%")
        TextArea.setHeight("150px")
        mtr1.createRow(TextArea)
        mtr1.createRow(buttonSubmit)

        var TabContainer = SAPUI.TabContainerR(this.createId("container"), "100px", "100px", 0)
        var tab1 = SAPUI.TabContainerRitem(this.createId("tab1"), "Fill Data")
        var tab2 = SAPUI.TabContainerRitem(this.createId("tab2"), "Story")

         //home 2 (Result)
        var mtrResult = SAPUI.Matrix("", "100%", true, [], 0).addStyleClass("mtr1")
        var labelRlt = SAPUI.Label(this.createId("labelRlt"), "Harap untuk mengisi form !").addStyleClass("result")
        var lblNama = SAPUI.Label(this.createId("lblNama"), "")
        var lblLahir = SAPUI.Label(this.createId("lblLahir"), "")
        var lblSibling = SAPUI.Label(this.createId("lblSibling"), "")
        var lblTbl = SAPUI.Label(this.createId("lblTbl"), "")
        var lblStatus = SAPUI.Label(this.createId("lblStatus"), "")

        mtrResult.createRow(labelRlt)
        mtrResult.createRow(lblNama)
        mtrResult.createRow(lblLahir)
        mtrResult.createRow(lblSibling)
        mtrResult.createRow(lblStatus)
        mtrResult.createRow("")
        mtrResult.createRow(lblTbl)
         //END home 2 (Result)
        
        tab1.addContent(mtr1)
        tab2.addContent(mtrResult)
        TabContainer.addItem(tab1)
        TabContainer.addItem(tab2)

        var dialog = SAPUI.Dialog(this.createId("dialog"), "Create story from your data ?")
        var btnDialog = SAPUI.Button((this.createId("btnDialog")), "I am ready, let's go", "go", "", false, "default").addStyleClass("buttonDialog").addStyleClass("button1")
        var btnDialogTwo = SAPUI.Button((this.createId("btnDialogTwo")), "Not yet, i'll be back", "back", "", false, "default").addStyleClass("buttonDialog2")

        dialog.addContent(btnDialog)
        dialog.addContent(btnDialogTwo)
        
        // EVENT 
        buttonSubmit.attachPress(
            function(event) {
                // oController.onSubmit()
                dialog.open()
                console.log(new Date().getFullYear())
            }
        )
        btnDialog.attachPress(
            function(){
                oController.onSubmit()
                dialog.close()
                TabContainer.setSelectedItem(tab2)
            }
        )
        btnDialogTwo.attachPress(
            function() {
                dialog.close()
            }
        )

        radioYes.attachSelect(
            function () {
                console.log('success')
                oController.onShow()
            }
        )

        radioNo.attachSelect(
            function () {
                console.log('Success')
                oController.onVisible()
            }
        )

        // newHr.addContent(mtr1)

        // panel.addContent(TabContainer);
        // panel.addContent(newHr);
      
        scroll.addContent(TabContainer)

        return scroll
    }
});