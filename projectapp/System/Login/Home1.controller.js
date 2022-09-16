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
        onSubmit: function() {var nama =  SAPUI.GetCore(this.createId("tfFirst")).getValue()
            var tengah =  SAPUI.GetCore(this.createId("tfMiddle")).getValue()
            var belakang =  SAPUI.GetCore(this.createId("tfLast")).getValue()
            var kota =  SAPUI.GetCore(this.createId("tfCity")).getValue()
            var tanggal =  SAPUI.GetCore(this.createId("tfDate")).getValue()
            var tahun =  SAPUI.GetCore(this.createId("tfDate")).getDateValue().getFullYear()
            var asal =  SAPUI.GetCore(this.createId("tfAsal")).getValue()
            var option =  SAPUI.GetCore(this.createId("option")).getSelectedItem().getText()
            var saudara = SAPUI.GetCore(this.createId("rdYes"))
            var sibling = "0"

            if (saudara.getSelected()) {
                var many = SAPUI.GetCore(this.createId("tfJml")).getValue()
                sibling = many
            } else {
                sibling = "0"
            }

            var getUmur = new Date().getFullYear() - tahun

            var labelRlt = SAPUI.GetCore(this.createId('labelRlt'))
            var lblNama = SAPUI.GetCore(this.createId('lblNama'))
            var lblLahir = SAPUI.GetCore(this.createId('lblLahir'))
            var lblSibling = SAPUI.GetCore(this.createId('lblSibling'))
            var lblTbl = SAPUI.GetCore(this.createId('lblTbl'))
            var lblStatus = SAPUI.GetCore(this.createId('lblStatus'))
          
            labelRlt.setText("Halo semuanya, Apakabar")
            lblNama.setText("Perkenalkan namaku " +nama+ " " +tengah+" " +belakang+ "")
            lblLahir.setText("Aku lahir di Kota " +kota+ ", Tanggal " +tanggal+". Yaaa kira-kira umurku saat ini " +getUmur+ "")
            lblTbl.setText("Izinkan aku untuk menceritakan riwayat pendidikanku disini.")
            if (sibling > 0) {
                lblSibling.setText("Aku dibesarkan bersama dengan ke-" + sibling + " dirumahku, yaitu di kota " + asal + "" )
            } else {
                lblSibling.setText("Aku merupakan anak pertama dan terakhir dari orang tuaku.")
            }

            lblStatus.setText("Untuk statusku saat ini yaiu " + option)
        }
    })    
})