sap.ui.define([
    'sap/ui/core/mvc/Controller',
], function (Controller) {
    'use strict'
    return Controller.extend("projectapp.System.Login.Home2", {
        onInit: function () {
            this.router = sap.ui.core.routing.Router.getRouter("appRouter");
            this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
            this.router.getRoute("Home2").attachPatternMatched(function (oEvent) {
                
            })
            this.onDataDisplayList()
            this.getData()

            var items = JSON.parse(localStorage.getItem('myItems'));
            var FirstName = items.NamaDepan;
            var MidName = items.NamaMid;
            var LastName = items.NamaLast;
            var Deskripsi = items.Desc;
            var Birthplace = items.KotaLahir;
            var Deskripsi = items.Desc;
            var TglLahir = items.TglLahir;
            var Birthdate = items.Year;
            var Marital = items.Marital;
            var Sibling = items.Sibling;

            var labelName = SAPUI.GetCore(this.createId("label1"))
            var labelSibling = SAPUI.GetCore(this.createId("label2"))
            var labelDeskripsi = SAPUI.GetCore(this.createId("labelText"))

            var today = new Date();
            var age = today.getFullYear() - Birthdate
            labelName.setText("Halo semuanya, apa kabar?\nPerkenalkan namaku " + FirstName + " " + MidName + " " + LastName + "\nAku lahir di " + Birthplace + " tanggal " + TglLahir + ". Yaaa kira-kira umurku saat ini " + age + " tahun.\n")

            if (Sibling != "0") {
                labelSibling.setText("Aku memiliki " + Sibling + " Saudara\nUntuk statusku saat ini yaitu " + Marital + "\nIzinkan aku untuk menceritakan riwayat pendidikanku disini.")
                
            } else {
                labelSibling.setText("Aku merupakan anak pertama dan terakhir dari orang tuaku.\nUntuk statusku saat ini yaitu " + Marital + "\nIzinkan aku untuk menceritakan riwayat pendidikanku disini.")
            }
            
            labelDeskripsi.setText(Deskripsi)

            // localStorage.removeItem( 'myItems' );
        },

        onDataDisplayList: function () {
            var sekolah = [
                {
                    "Jp": "SD",
                    "school": "SDN 1 SBY",
                    "in": "2004",
                    "out": "2010",
                },
                {
                    "Jp": "SMP",
                    "school": "SMPN 1 SBY",
                    "in": "2010",
                    "out": "2013",
                },
                {
                    "Jp": "SMA",
                    "school": "SMAN 1 SBY",
                    "in": "2013",
                    "out": "2016",
                },
                {
                    "Jp": "Perguruan Tinggi",
                    "school": "UNIVERSITAS BRAWIJAYA",
                    "in": "2016",
                    "out": "2020",
                }
            ]
            // var jenjang = { jp: sekolah }
            var table3 = SAPUI.GetCore(this.createId("table3"))
            var oModelExcel = new sap.ui.model.json.JSONModel();
            oModelExcel.setData(sekolah);
            table3.setModel(oModelExcel);
            table3.bindRows("/");
            // table3.bindRows("/jp");
        },


        getData: async function (obj) {
            
            var pData = {}
            var reqObj = {
                url: WS_RPT + "WS_Report2",
                body: pData,
                method: "CategoryFilter"
            }
            
            try {
                var data = await fetchApi(reqObj)
                // var labelName = SAPUI.GetCore(this.createId("label1"))
                // labelName.setText(data[0][0].Company)

                var Data = { data1: data[0] };
                var table2 = SAPUI.GetCore(this.createId("table2"))
                var oModelExcel = new sap.ui.model.json.JSONModel();
                oModelExcel.setData(Data);
                table2.setModel(oModelExcel);
                table2.bindRows("/data1");
                
            } catch (error) {
            }
        },

        getDataDetail: async function (obj) {
            
            var tf1 = SAPUI.GetCore(this.createId("From")).getValue()
            var tf2 = SAPUI.GetCore(this.createId("To")).getValue()

            var pData = {
                "DateFrom": tf1,
                "DateTo": tf2
            }
            var reqObj = {
                url: WS_RPT + "WS_Report1",
                body: pData,
                method: "DisplayCompleted"
            }
            
            try {
                var data = await fetchApi(reqObj)
                // var labelName = SAPUI.GetCore(this.createId("label1"))
                // labelName.setText(data[0][0].Company)

                var noorder = { data1: data[0] };
                var table1 = SAPUI.GetCore(this.createId("table1"))
                var oModelExcel = new sap.ui.model.json.JSONModel();
                oModelExcel.setData(noorder);
                table1.setModel(oModelExcel);
                table1.bindRows("/data1");
                
            } catch (error) {
            }
        },

        exportPDF: async function (obj) {
            alert('export')

            var content = new sap.ui.core.HTML("", {
                content: `<html lang="en">
                <body>
                <div class="container containerhome">
                    <div class="form-body" style="background-color: #FFF">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 d-none d-sm-block" style="padding: 0px !important;">
                                <div class="text1" style="margin-top:20%">
                                    <p style="font-size:24px;" id="print">Welcome to</p>
                                    <h1 style="color:#2D9CDB; font-size:50px; font-weight: 700;">Frontend</h1>
                                    <p style="font-size:36px;">Sylabus</p>
                                </div>
                                <div class="button1">
                                    <button id="btnStart" type="submit" class="btnStart">Let's Rock n Roll</button>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="imghome"">
                                    <img src="asset/image/img1.png">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </body>
                </html>
                `
            })

            var doc = new jsPDF('l', 'pt')
            var HtmlElement = $("#print").html()
            doc.fromHTML(HtmlElement, 10, 10, {
                'width':200
            })
            doc.save("tes.pdf")

            // const invoice = $("#print").html()
            // var opt = {
            //     margin: 1,
            //     filename: 'myfile.pdf',
            //     image: { type: 'jpeg', quality: 0.98 },
            //     html2canvas: { scale: 2 },
            //     jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            // };
            // html2pdf().from(invoice).set(opt).save();  
}
    })
})