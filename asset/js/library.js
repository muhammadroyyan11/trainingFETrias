sap.ui.define([
    'asset/js/anime.min',
    'asset/js/jquery-mobile-custom',
    'asset/js/jquery-ui',
    'asset/js/route'
], function(){
    const SAPUI = {
        AllThis: this,
        /*
         * untuk desain default disetiap halaman
         *
         * */
        XShell: function (title, isShowSubHeader, pageConten, mtrHeader, isShowFooter, thisView, isShowHeader) {
            var oThis = this
            // SAPUI.SwicthOffApp()
            // Global.onCheckAuth(window.location.pathname)
            // window.addEventListener('focus', function () {
            //     var token = Global.tokenParser();
            //     if (token !== null) {
            //         setTimeout(function () {
            //             Global.onFocusInsSession(token.tcode);
            //         }, 1000);
            //     }
            //     // console.log('focused');
            // });
            // window.addEventListener('blur', function () {
            //     // console.log('not focused');
            // });
            // get IP client
            Global.GetClientIP();
            if (isShowHeader == undefined) {
                isShowHeader = false
            }
            var tabindex = window.newtab;
            var token_now = window.token_now;
    
            if (tabindex !== undefined) {
                console.log('newTab value receive', tabindex);
                window.sessionStorage.tab = tabindex;
            }
    
            if (token_now !== undefined) {
                console.log('new token receive', token_now);
                window.sessionStorage.token_now = token_now;
            }
            // console.log(isShowHeader)
            // send notif ke user
            // Global.SMSNotif();
            // Global.CekKickUser();
            // untuk cek url agar bisa lakukan cek session
            var halaman = "" + location.href.split("/").slice(-1);
            // console.log("halaman: " + halaman);
    
            //ceksession hanya dilakukan jika masuk ke halaman dashboard
            if (halaman == "Dashboard.html") {} else {
                // Global.CekKickSession()
            }
            if (localStorage.getItem("userNameLS") === null) {
                // UserLS = () => "No User"
            }
    
    
            // header top bar
            usr = new sap.ui.unified.ShellHeadUserItem({
                image: "sap-icon://person-placeholder",
                username: UserLS(),
                showPopupIndicator: true,
                press: function () {
                    if (tp3.isOpen()) {
                        tp3.close();
                    } else {
                        tp3.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
                    }
                },
    
            })
            ////////////////////////////////////////////////////////////////
    
    
    
            ////////////////////////UserInformation/////////////////////////////////////////////////
            var dialogUserInfo = SAPUI.Dialog("", "User Info", "200px", "200px", true),
                panel = SAPUI.Panel("", "", "", true, true),
                User = SAPUI.TextView("", "User", "User", 'auto', true),
                User1 = SAPUI.TextView("", U5312UX5, "User", 'auto', true),
                Database = SAPUI.TextView("", "Database", "Database", 'auto', true),
                Database1 = SAPUI.TextView("", Server1, "User", 'auto', true),
                WebServices = SAPUI.TextView("", "Web Service", "User", 'auto', true),
                WebServices1 = SAPUI.TextView("", Server1, "User", 'auto', true),
                TCode = SAPUI.TextView("", "Transaction", "User", 'auto', true),
                TCode1 = SAPUI.TextView("", X_VarianUX5, "User", 'auto', true),
                oLayoutUserInfo = SAPUI.Matrix("", "auto", true, [], 2)
    
            oLayoutUserInfo.createRow(User, User1)
            oLayoutUserInfo.createRow(Database, Database1)
            oLayoutUserInfo.createRow(WebServices, WebServices1)
            oLayoutUserInfo.createRow(TCode, TCode1)
    
            panel.addContent(oLayoutUserInfo)
    
            dialogUserInfo.addContent(oLayoutUserInfo)
    
            var UserInfo = SAPUI.Button("", "User Info", "User Info", "sap-icon://hint", true, "Emph")
            UserInfo.attachPress(function () {
                dialogUserInfo.open();
            })
    
            var oLayoutHeader = SAPUI.Matrix("", "auto", true, [], 2),
    
                btnChangePasswd = SAPUI.Button("", "Change Password", "", "sap-icon://key", true, "Emph")
    
            oLayoutHeader.createRow(btnChangePasswd)
            // oLayoutHeader.createRow(UserInfo)
    
            if (userTypeUX5 == 'OPERATOR') {
                UserInfo.setVisible(false)
            } else if (userTypeUX5 == 'ADMIN') {
                UserInfo.setVisible(false)
            }
    
            ///////////////////////////////////////////////////////
    
            var tp3 = new sap.ui.ux3.ToolPopup({
                icon: "sap-icon://log",
                inverted: false,
                content: [oLayoutHeader],
                autoClose: true,
                opener: usr,
            });
    
            btnChangePasswd.attachPress(oThis.ChangePassword);
    
            if (LANGUANGE == 'en') {
                btnChangePasswd.setText("Change Password")
            } else {
                btnChangePasswd.setText("Ubah Kata Sandi")
            }
    
    
            var baseTitle = title.getId().split("_");
            titleCut = baseTitle[(baseTitle.length - 1)];
    
            //--------------------------Footer Error Message------------------------
            labelZero = new sap.ui.commons.Label({});
            labelIcon = new sap.ui.commons.Label({
                id: "lblIcon" + titleCut
            });
    
            labelIcon.addStyleClass("footerbar1");
            labelMsg = new sap.ui.commons.TextView({
                id: "lblmsg" + titleCut,
                text: "",
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Default,
                design: sap.ui.commons.TextViewDesign.Bold
            });
    
            // Dialog error message
            DlgErroMsg = SAPUI.Dialog("", "Detail Informasi", "50%", "50%", true);
    
            TxvTtlDiagnosi = new sap.ui.commons.TextView({
                text: 'Diagnosis',
                tooltip: 'Diagnosis',
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Critical,
                design: sap.ui.commons.TextViewDesign.Bold
            }).addStyleClass("customsize");
    
            iconDiagnos = SAPUI.Icon("sap-icon://show-edit", "1.5rem", "#1a237e");
            iconProcedure = SAPUI.Icon("sap-icon://activities", "1.5rem", "#1a237e");
            TxvCntDiagnosi = SAPUI.TextView("", "tes", "", "auto", true);
    
            TxvCntDiagnosi.setDesign(sap.ui.commons.TextViewDesign.H4);
    
            TxvtlProcedure = new sap.ui.commons.TextView({
                text: 'Procedure',
                tooltip: 'Procedure',
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Positive,
                design: sap.ui.commons.TextViewDesign.Bold
            }).addStyleClass("customsize");
    
            TxvCntProcedure = SAPUI.TextView("", "tes", "", "auto", true);
            TxvCntProcedure.setDesign(sap.ui.commons.TextViewDesign.H4);
    
            mtrxCntDlg = SAPUI.Matrix("", "auto", false, ['auto', 'auto'], 2);
    
            mtrxCntDlg.createRow(iconDiagnos, TxvTtlDiagnosi);
            mtrxCntDlg.createRow("", TxvCntDiagnosi);
            mtrxCntDlg.createRow("");
            mtrxCntDlg.createRow(iconProcedure, TxvtlProcedure);
            mtrxCntDlg.createRow("", TxvCntProcedure);
    
            DlgErroMsg.addContent(mtrxCntDlg);
    
            labelMsg.attachBrowserEvent('click', function () {
                DlgErroMsg.open()
            })
    
            //footer error message
            var footer = new sap.m.Toolbar({
                content: [
                    labelZero,
                    labelIcon,
                    labelMsg
                ],
                height: "7%"
            }).addStyleClass("Footer")
            //------------------------------------------------------------------------
    
            //-------------------------Sub Header Bar Page------------------------------------
            var searchBar = SAPUI.AutoComplete("", "Enter a TCode", 10, "15%", true, true);
    
            searchBar.setPlaceholder("Cari Tcode...");
            searchBar.attachBrowserEvent('keypress', function (e) {
                var valser = searchBar
                if (e.which == 13) {
                    SAPUI.SearchTcode(valser)
                }
            });
    
            searchBar.setDisplaySecondaryValues(true);
            searchBar.addStyleClass("searchBar")
            Global.AutoCompleteList(searchBar, "SearchTcode", U5312UX5)
    
    
            //button cari
            var btnCari = SAPUI.Button("", "", "Cari Tcode", "sap-icon://accept", false, "Accept")
            btnCari.addStyleClass("roundedbuttonsearch")
            btnCari.attachPress(function () {
                var valser = searchBar
                SAPUI.SearchTcode(valser)
            });
    
            //button back
            var btnBack = SAPUI.Button("", "", "Back", "sap-icon://nav-back", false, "Accept")
            btnBack.attachPress(function () {
                Global.UniversalBack()
            })
            btnBack.addStyleClass("roundedbuttonback")
    
            //button back to dashboard
            var btnDashboard = SAPUI.Button("", "", "Kembali Ke Dashboard", "sap-icon://sys-cancel-2", false, "Accept")
            btnDashboard.attachPress(function () {
                Global.DeleteSession();
                sessionStorage.removeItem("tcodeVariantux5");
                sap.m.URLHelper.redirect("Dashboard.html");
            })
            btnDashboard.addStyleClass("roundedbuttoncancel")
    
            // title.addStyleClass("bgSubheaderText")
    
            //export
            var lblExport = SAPUI.Label("", "Export To", "", "auto")
            lblExport.addStyleClass("customfontcolor")
            var cmbExport = SAPUI.ComboBox("", "33%")
    
            var oItemBlank = new sap.ui.core.ListItem();
            oItemBlank.setText("");
            cmbExport.addItem(oItemBlank);
    
            var oItemCSV = new sap.ui.core.ListItem();
            oItemCSV.setText("CSV");
    
            var oItemXLSX = new sap.ui.core.ListItem();
            oItemXLSX.setText("XLSX");
    
            var oItemXLS = new sap.ui.core.ListItem();
            oItemXLS.setText("XLS");
    
            var oItemPDF = new sap.ui.core.ListItem();
            oItemPDF.setText("PDF");
    
            if (thisView != undefined) {
                if (typeof thisView.getController().ontoExportCSV === "function") {
                    cmbExport.addItem(oItemCSV);
                }
    
                if (typeof thisView.getController().fnJSONToXLSXConvertor === "function") {
                    cmbExport.addItem(oItemXLSX);
                }
    
                if (typeof thisView.getController().fnJSONToXLSConvertor === "function") {
                    cmbExport.addItem(oItemXLS);
                }
    
                if (typeof thisView.getController().onToPDF === "function") {
                    cmbExport.addItem(oItemPDF);
                }
            }
    
            cmbExport.attachChange(function () {
                var tipe = cmbExport.getValue()
                if (tipe == "CSV") {
                    thisView.getController().onToExport("csv");
                    // thisView.getController().ontoExportCSV();
                    cmbExport.setSelectedKey("")
                } else if (tipe == "XLSX") {
                    thisView.getController().onToExport("xlsx");
                    cmbExport.setSelectedKey("")
                } else if (tipe == "XLS") {
                    thisView.getController().onToExport("xls");
                    cmbExport.setSelectedKey("")
                } else if (tipe == "PDF") {
                    thisView.getController().onToExport("pdf");
                    cmbExport.setSelectedKey("")
                }
            });
    
            var exportTo = []
            if (thisView != undefined) {
                // if (typeof thisView.getController === "function") {
                searchBar.setWidth("50%")
                exportTo = [lblExport, cmbExport]
                // }
            }
    
            var BtnHeader = [],
                oCustomHeader = new sap.m.Bar({
                    design: sap.m.BarDesign.Footer,
                    contentLeft: [title],
                    contentMiddle: [],
                    contentRight: [exportTo]
                }).addStyleClass("bgSubheader");
            //-------------------------Sub Header Bar Page-----------------------------------
    
            var title1 = SAPUI.Title("", "TRST ERP HR 2.0")
    
            //------------------------Header Bar Menu Dinamis Page---------------------------
    
            var oSubHeader = new sap.m.Bar({
                contentLeft: [mtrHeader]
            }).addStyleClass("sapUiSizeCompact");
            //------------------------Header Bar Menu Dinamis Page---------------------------
            var title1 = SAPUI.Title("", "TRST ERP HR 2.0")
            var idUniqueShell = "myShellAll" + this.getRouteName()
    
            return new sap.ui.unified.Shell({
                id: idUniqueShell,
                icon: "asset/image/trias1.png",
                headItems: [ //redirect to home dashboard
                    new sap.ui.unified.ShellHeadItem({
                        tooltip: "Menu",
                        icon: "sap-icon://menu",
                        visible: true,
                        press: function () {
                            var oShell = this.getParent().getParent();
                            var bState = oShell.getShowPane();
                            oShell.setShowPane(!bState);
                            if (bState) { // tutup
                                // alert("yes")
                                $('#' + idUniqueShell + '-container-pane').css('width', '0px');
                                $('#' + idUniqueShell + '-container-canvas').css('left', '0px');
                            } else { // buka
                                // alert("no")
                                $('#' + idUniqueShell + '-container-pane').css('width', '400px');
                                $('#' + idUniqueShell + '-container-canvas').css('left', '400px');
                            }
                        }
                    }),
                    new sap.ui.unified.ShellHeadItem({
                        tooltip: "Home",
                        icon: "sap-icon://home",
                        visible: "false",
                        press: function () {
                            sap.m.URLHelper.redirect("Dashboard.html");
                            //delete all session storage
                            sessionStorage.clear();
                        }
                    }),
    
                    new sap.ui.unified.ShellHeadItem({
                        tooltip: "Back",
                        icon: "sap-icon://sys-back",
                        visible: "false",
                        press: function () {
                            Global.UniversalBack()
                        }
                    }),
                ],
    
                headEndItems: [
                    //close active session jika pada browser utama akan melakukan logout
                    new sap.ui.unified.ShellHeadItem({
                        icon: "sap-icon://system-exit",
                        tooltip: "Close Session",
                        press: function () {
                            oThis.CloseSession()
                            // sap.ui.commons.MessageBox.confirm(Global.tabCount() == 1 ?
                            //     "Do you want to log off ?" : "Do you want to close this tab?",
                            //     oThis.CloseSession, "Confirmation");
                        }
                    }).setVisible(true),
                    //create session window
                    new sap.ui.unified.ShellHeadItem({
                        icon: "sap-icon://create-session",
                        tooltip: "Create Session",
                        press: function () {
                            oThis.CreateSession();
    
                        }
                    }),
                    //logout
                    new sap.ui.unified.ShellHeadItem({
                        icon: "sap-icon://log",
                        tooltip: "Logout",
                        press: function () {
                            Global.Logout();
                        }
                    }),
    
                    // //change language
                    // new sap.ui.unified.ShellHeadItem({
                    //     icon: iconLanguage,
                    //     tooltip: "Language",
                    //     press: function () {
                    //         if (LANGUANGE == 'en') {
                    //             window.localStorage.setItem("languageux5", "ind");
                    //             window.localStorage.setItem("iconLang", "asset/icon/EN.png");
                    //         } else {
                    //             window.localStorage.setItem("languageux5", "en");
                    //             window.localStorage.setItem("iconLang", "asset/icon/ID.png");
                    //         }
    
                    //         location.reload();
                    //     }
                    // })
                ],
                search: title1,
                user: usr,
                content: new sap.m.Page({
                    customHeader: oSubHeader,
                    showHeader: isShowHeader,
                    showSubHeader: isShowSubHeader,
                    //                showFooter			: isShowFooter,
                    showFooter: false,
                    content: pageConten,
                    footer: [footer],
                    subHeader: oCustomHeader,
                    enableScrolling: true,
                    floatingFooter: true
                }),
                paneContent: [
                    this.GetSidebar()
                ]
            }).addStyleClass("customheadersheel");
        },

        XShellNew: function (title, isShowSubHeader, pageConten, mtrHeader, isShowFooter, thisView, isShowHeader) {
            var oThis = this
    
            // Global.onCheckAuth(window.location.pathname)
    
            if (isShowHeader == undefined) {
                isShowHeader = false
            }
            var tabindex = window.newtab;
            var token_now = window.token_now;
    
            if (tabindex !== undefined) {
                console.log('newTab value receive', tabindex);
                window.sessionStorage.tab = tabindex;
            }
    
            if (token_now !== undefined) {
                console.log('new token receive', token_now);
                window.sessionStorage.token_now = token_now;
            }
    
            // untuk cek url agar bisa lakukan cek session
            var halaman = "" + location.href.split("/").slice(-1);
    
            //ceksession hanya dilakukan jika masuk ke halaman dashboard
            if (halaman == "Dashboard.html") {} else {
                // Global.CekKickSession()
            }
            if (localStorage.getItem("userNamePP") === null) {
                U5312PP = "No User"
            }
    
            var baseTitle = title.getId().split("_");
            titleCut = baseTitle[(baseTitle.length - 1)];
    
            labelIcon = new sap.ui.commons.Label({
                id: "lblIcon" + titleCut
            });
    
            labelIcon.addStyleClass("footerbar1");
    
            labelMsg = new sap.ui.commons.TextView({
                id: "lblmsg" + titleCut,
                text: "",
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Default,
                design: sap.ui.commons.TextViewDesign.Bold
            });
    
            var mtrTabel = SAPUI.Matrix("", "100%", false, ["0%", "2%", "4%", "2%", "79%", "2%", "1%", "1%", "10%"], 10);
    
            // var oThis = this;
            // oThis.intVar = setInterval(function () {
            //     oThis.DialogMaintenance();    
            // }, 5000)
                    
            // header top bar
            var usr = new sap.ui.commons.Button({
                icon: "sap-icon://person-placeholder",
                text: U5312PP,
                press: function () {
                    if (tp3.isOpen()) {
                        tp3.close();
                    } else {
                        tp3.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
                    }
                },
            }).addStyleClass("navbar-item")
    
            var notif = new sap.ui.commons.Button({
                icon: "sap-icon://bell",
                press: function () {
                    if (tpNotify.isOpen()) {
                        tpNotify.close();
                    } else {
                        tpNotify.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
                    }
                },
            }).addStyleClass("navbar-item")
            .setTooltip("Notification")
    
            var ver1 = new sap.ui.layout.VerticalLayout("", {})
            var label = SAPUI.Label("", "99").addStyleClass("notif-lbl hidden")
            ver1.addContent(label);
            ver1.addContent(notif);
    
            oLayoutHeader = SAPUI.Matrix("", "auto", true, [], 3)
            oLayoutHeader2 = SAPUI.Matrix("", "auto", true, [], 3).addStyleClass("top-border")
            oLayoutHeader3 = SAPUI.Matrix("", "auto", false, [], 1)
    
            /*Layout 1  - Password, Logout*/
            btnChangePasswd = SAPUI.Button("", "Change Password", "", "sap-icon://key", true, "Emph").addStyleClass("btn-hover")
            btnLogOut = SAPUI.Button("", "Logout", "", "sap-icon://log", true, "Emph").addStyleClass("btn-hover")
    
            btnChangeLang = new sap.ui.commons.Button().addStyleClass("buttonLang")
    
            // oLayoutHeader.createRow(btnChangePasswd)
            oLayoutHeader.createRow(btnLogOut)
    
            /*Layout 2 - Language*/
    
            oSwitch = new sap.m.Switch({
                type: "Default",
                customTextOff: "ID",
                customTextOn: "EN",
            })
    
            if (window.localStorage.getItem("languagePP") == "en") {
                oSwitch.setState(false)
                oLayoutHeader2.createRow("Change language to:", oSwitch, "")
                oSwitch.attachChange(function () {
                    window.localStorage.setItem("languagePP", "in");
                    window.localStorage.setItem("iconLang", "asset/icon/EN.png");
    
                    location.reload();
                })
    
            } else if (window.localStorage.getItem("languagePP") == "in") {
                oSwitch.setState(true)
                oLayoutHeader2.createRow("Ubah bahasa ke:", oSwitch, "")
                oSwitch.attachChange(function () {
                    window.localStorage.setItem("languagePP", "en");
                    window.localStorage.setItem("iconLang", "asset/icon/ID.png");
    
                    location.reload();
                })
            }
    
            // console.log(oSwitch)
    
            appVersionText = new sap.m.Text({
                text: "PP Version: 2.1.0-beta",
            }).addStyleClass("versionText")
    
            oLayoutHeader3.createRow(appVersionText)
            ///////////////////////////////////////////////////////
            var tp3 = new sap.ui.ux3.ToolPopup({
                icon: "sap-icon://log",
                inverted: false,
                // content: [oLayoutHeader, oLayoutHeader2],
                content: [oLayoutHeader],
                autoClose: true,
                opener: usr,
            });
    
            btnChangePasswd.attachPress(oThis.ChangePassword);
            btnLogOut.attachPress(function () {
                Global.ConfirmExec(exec, "Konfirmasi", "Apakah Anda ingin keluar dari Energy-Consumption?")
    
                function exec(rValue) {
                    if (rValue) {
                        Global.Logout()
                    } else {
                        return false
                    }
                }
            });
    
            if (languagePP == 'en') {
                btnChangePasswd.setText("Change Password")
            } else {
                btnChangePasswd.setText("Ubah Kata Sandi")
            }
    
            //untuk notifikasi
            var buttonRead = new sap.m.Button({
                text: "Read",
                tooltip: "Read",
            }).attachPress(function(e){
                var path = e.getSource().getBindingContext().getPath()
                    var obj = this.getModel().getProperty(path);
                    oThis.onActionNotif(obj,"read",label,tpNotify)
            });
    
            var buttonDisplayAll = new sap.m.Button({
                text: "Show All Notification",
                tooltip: "Show All Notification",
            }).attachPress(function(e){
                    oThis.showAllNotif(label,tpNotify)
            }).addStyleClass("btn-Block");
    
            var notifTemp = new sap.m.NotificationListItem({
                title: "{title}",
                description: "{description}",
                priority: "{prior}",
                datetime:"{createdOn}",
                showCloseButton: false,
                press: function(e){
                    var path = e.getSource().getBindingContext().getPath()
                    var obj = this.getModel().getProperty(path);
                    oThis.onActionNotif(obj,"detail",label,tpNotify)
                },
            })
            // notifTemp.addButton(buttonRead)
    
            var tpNotify = new sap.ui.ux3.ToolPopup({
                maxHeight:"300px",
                // icon: "sap-icon://log",
                inverted: true,
                content: new sap.m.List({
                    items: {
                        path: "/",
                        templateShareable: false,
                        template: notifTemp
                    },
                }),
                autoClose: true,
                opener: notif,
            }).addStyleClass("notifPopUp")
            tpNotify.addButton(buttonDisplayAll)
    
            // oThis.GetNotifModel(label,tpNotify,window.localStorage.getItem("userGroupPP"))
            // setInterval(function(){
            //     oThis.GetNotifModel(label,tpNotify,window.localStorage.getItem("userGroupPP"))  
            // },300000)
            // //notif icon dinonaktifkan sementara karna masih belum dibutuhkan
    
            //-------------------------Sub Header Bar Page------------------------------------
    
            //export
            var lblExport = SAPUI.Label("", "Export To", "", "auto")
            lblExport.addStyleClass("customfontcolor")
            var cmbExport = SAPUI.ComboBox("", "33%")
    
            var oItemBlank = new sap.ui.core.ListItem();
            oItemBlank.setText("");
            cmbExport.addItem(oItemBlank);
    
            var oItemCSV = new sap.ui.core.ListItem();
            oItemCSV.setText("CSV");
    
            var oItemXLSX = new sap.ui.core.ListItem();
            oItemXLSX.setText("XLSX");
    
            var oItemXLS = new sap.ui.core.ListItem();
            oItemXLS.setText("XLS");
    
            var oItemPDF = new sap.ui.core.ListItem();
            oItemPDF.setText("PDF");
    
            if (thisView != undefined) {
                if (typeof thisView.getController().ontoExportCSV === "function") {
                    cmbExport.addItem(oItemCSV);
                }
    
                if (typeof thisView.getController().fnJSONToXLSXConvertor === "function") {
                    cmbExport.addItem(oItemXLSX);
                }
    
                if (typeof thisView.getController().fnJSONToXLSConvertor === "function") {
                    cmbExport.addItem(oItemXLS);
                }
    
                if (typeof thisView.getController().onToPDF === "function") {
                    cmbExport.addItem(oItemPDF);
                }
            }
    
            cmbExport.attachChange(function () {
                var tipe = cmbExport.getValue()
                if (tipe == "CSV") {
                    thisView.getController().onToExport("csv");
                    // thisView.getController().ontoExportCSV();
                    cmbExport.setSelectedKey("")
                } else if (tipe == "XLSX") {
                    thisView.getController().onToExport("xlsx");
                    cmbExport.setSelectedKey("")
                } else if (tipe == "XLS") {
                    thisView.getController().onToExport("xls");
                    cmbExport.setSelectedKey("")
                } else if (tipe == "PDF") {
                    thisView.getController().onToExport("pdf");
                    cmbExport.setSelectedKey("")
                }
            });
    
            var exportTo = []
            if (thisView != undefined) {
                exportTo = [lblExport, cmbExport]
            }
    
            var BtnHeader = [],
                oCustomHeader = new sap.m.Bar({
                    design: sap.m.BarDesign.Footer,
                    contentLeft: [title],
                    contentMiddle: [],
                    contentRight: [exportTo]
                }).addStyleClass("bgSubheader");
            //-------------------------Sub Header Bar Page-----------------------------------
    
            //------------------------Header Bar Menu Dinamis Page---------------------------
    
            var oSubHeader = new sap.m.Bar({
                contentLeft: [mtrHeader]
            }).addStyleClass("sapUiSizeCompact");
            //------------------------Header Bar Menu Dinamis Page---------------------------
            var title1 = SAPUI.Title("", "Energy-Consumption")
            var idUniqueShell = "myShellAll" + this.getRouteName()
    
            var sideMenu = new sap.ui.commons.Button({
                tooltip: "Menu",
                icon: "sap-icon://menu2",
                press: function () {
                    var oShell = this.getParent().getParent().getParent().getParent().getParent();
                    var bState = oShell.getShowPane();
                    oShell.setShowPane(!bState);
                    if (bState) { // tutup
                        $('#' + idUniqueShell + '-container-pane').css('width', '0px');
                        $('#' + idUniqueShell + '-container-canvas').css('left', '0px');
                    } else { // buka
                        $('#' + idUniqueShell + '-container-pane').css('width', '300px');
                        $('#' + idUniqueShell + '-container-canvas').css('left', '300px');
                    }
                }
            }).addStyleClass("navbar-item")
    
            var asdashome = SAPUI.Image("asset/image/Logo.png", "20px", "20px", false, "")
                .addStyleClass("logo")
                .attachPress(function () {
                    sap.m.URLHelper.redirect("TRX01.html");
                    sessionStorage.clear();
                })
                .setTooltip("Home")
    
            //button back
            var navBack = new sap.ui.commons.Button({
                tooltip: "Back",
                icon: "sap-icon://nav-back",
                press: function () {
                    Global.UniversalBack()
                }
            }).addStyleClass("navbar-item")
    
            var clsSession = new sap.ui.commons.Button({
                icon: "sap-icon://decline",
                tooltip: "Close Session",
                press: function () {
                    oThis.CloseSession()
                }
            }).addStyleClass("navbar-item")
    
            var crtSession = new sap.ui.commons.Button({
                icon: "sap-icon://create-session",
                tooltip: "Create Session",
                press: function () {
                    oThis.CreateSession();
                }
            }).addStyleClass("navbar-item")
    
            halaman != "Dashboard.html" ?
                mtrTabel.createRow(asdashome, '', '', '', title1, '', '', '', usr) :
                mtrTabel.createRow(asdashome, '', '', '', title1, '', '', '', usr)
    
            return new sap.ui.unified.Shell({
                id: idUniqueShell,
                search: mtrTabel,
                content: new sap.m.Page({
                    showHeader: isShowHeader,
                    showSubHeader: isShowSubHeader,
                    showFooter: false,
                    content: pageConten,
                    subHeader: oCustomHeader,
                    enableScrolling: true,
                    floatingFooter: true
                }),
                paneContent: [
                    // this.GetSidebar()
                ]
            }).addStyleClass("customheadersheel");
        },
        /*
         * untuk desain default dihalaman dashboard
         *
         * */
        XShellDashboard: function (title, isShowSubHeader, pageConten, mtrHeader, isShowFooter, toolbar, isShowHeader) {
            var oThis = this
            // Global.onCheckAuth(window.location.pathname)
            // window.addEventListener('focus', function () {
            //     var token = Global.tokenParser();
            //     if (token !== null) {
            //         setTimeout(function () {
            //             Global.onFocusInsSession(token.tcode);
            //         }, 1000);
            //     }
            //     // console.log('focused');
            // });
            // window.addEventListener('blur', function () {
            //     // console.log('not focused');
            // });
            // get IP client
            Global.GetClientIP();
            if (isShowHeader == undefined) {
                isShowHeader = false
            }
            var tabindex = window.newtab;
            var token_now = window.token_now;
    
            if (tabindex !== undefined) {
                console.log('newTab value receive', tabindex);
                window.sessionStorage.tab = tabindex;
            }
    
            if (token_now !== undefined) {
                console.log('new token receive', token_now);
                window.sessionStorage.token_now = token_now;
            }
            console.log(isShowHeader)
            // send notif ke user
            // Global.SMSNotif();
            // Global.CekKickUser();
            // untuk cek url agar bisa lakukan cek session
            var halaman = "" + location.href.split("/").slice(-1);
            console.log("halaman: " + halaman);
    
            //ceksession hanya dilakukan jika masuk ke halaman dashboard
            if (halaman == "Dashboard.html") {} else {
                // Global.CekKickSession()
            }
            if (localStorage.getItem("userNameLS") === null) {
                // UserLS = () => "No User"
            }
    
    
            // header top bar
            usr = new sap.ui.unified.ShellHeadUserItem({
                image: "sap-icon://person-placeholder",
                username: UserLS(),
                showPopupIndicator: true,
                press: function () {
                    if (tp3.isOpen()) {
                        tp3.close();
                    } else {
                        tp3.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
                    }
                },
    
            })
            ////////////////////////////////////////////////////////////////
    
    
    
            ////////////////////////UserInformation/////////////////////////////////////////////////
            var dialogUserInfo = SAPUI.Dialog("", "User Info", "200px", "200px", true),
                panel = SAPUI.Panel("", "", "", true, true),
                User = SAPUI.TextView("", "User", "User", 'auto', true),
                User1 = SAPUI.TextView("", U5312UX5, "User", 'auto', true),
                Database = SAPUI.TextView("", "Database", "Database", 'auto', true),
                Database1 = SAPUI.TextView("", Server1, "User", 'auto', true),
                WebServices = SAPUI.TextView("", "Web Service", "User", 'auto', true),
                WebServices1 = SAPUI.TextView("", Server1, "User", 'auto', true),
                TCode = SAPUI.TextView("", "Transaction", "User", 'auto', true),
                TCode1 = SAPUI.TextView("", X_VarianUX5, "User", 'auto', true),
                oLayoutUserInfo = SAPUI.Matrix("", "auto", true, [], 2)
    
            oLayoutUserInfo.createRow(User, User1)
            oLayoutUserInfo.createRow(Database, Database1)
            oLayoutUserInfo.createRow(WebServices, WebServices1)
            oLayoutUserInfo.createRow(TCode, TCode1)
    
            panel.addContent(oLayoutUserInfo)
    
            dialogUserInfo.addContent(oLayoutUserInfo)
    
            var UserInfo = SAPUI.Button("", "User Info", "User Info", "sap-icon://hint", true, "Emph")
            UserInfo.attachPress(function () {
                dialogUserInfo.open();
            })
    
            var oLayoutHeader = SAPUI.Matrix("", "auto", true, [], 2),
    
                btnChangePasswd = SAPUI.Button("", "Change Password", "", "sap-icon://key", true, "Emph")
    
            oLayoutHeader.createRow(btnChangePasswd)
            // oLayoutHeader.createRow(UserInfo)
    
            if (userTypeUX5 == 'OPERATOR') {
                UserInfo.setVisible(false)
            } else if (userTypeUX5 == 'ADMIN') {
                UserInfo.setVisible(false)
            }
    
            ///////////////////////////////////////////////////////
    
            var tp3 = new sap.ui.ux3.ToolPopup({
                icon: "sap-icon://log",
                inverted: false,
                content: [oLayoutHeader],
                autoClose: true,
                opener: usr,
            });
    
            btnChangePasswd.attachPress(oThis.ChangePassword);
    
            if (LANGUANGE == 'en') {
                btnChangePasswd.setText("Change Password")
            } else {
                btnChangePasswd.setText("Ubah Kata Sandi")
            }
    
    
            var baseTitle = title.getId().split("_");
            titleCut = baseTitle[(baseTitle.length - 1)];
    
            //--------------------------Footer Error Message------------------------
            labelZero = new sap.ui.commons.Label({});
            labelIcon = new sap.ui.commons.Label({
                id: "lblIcon" + titleCut
            });
    
            labelIcon.addStyleClass("footerbar1");
            labelMsg = new sap.ui.commons.TextView({
                id: "lblmsg" + titleCut,
                text: "",
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Default,
                design: sap.ui.commons.TextViewDesign.Bold
            });
    
            // Dialog error message
            DlgErroMsg = SAPUI.Dialog("", "Detail Informasi", "50%", "50%", true);
    
            TxvTtlDiagnosi = new sap.ui.commons.TextView({
                text: 'Diagnosis',
                tooltip: 'Diagnosis',
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Critical,
                design: sap.ui.commons.TextViewDesign.Bold
            }).addStyleClass("customsize");
    
            iconDiagnos = SAPUI.Icon("sap-icon://show-edit", "1.5rem", "#1a237e");
            iconProcedure = SAPUI.Icon("sap-icon://activities", "1.5rem", "#1a237e");
            TxvCntDiagnosi = SAPUI.TextView("", "tes", "", "auto", true);
    
            TxvCntDiagnosi.setDesign(sap.ui.commons.TextViewDesign.H4);
    
            TxvtlProcedure = new sap.ui.commons.TextView({
                text: 'Procedure',
                tooltip: 'Procedure',
                wrapping: true,
                width: 'auto',
                textAlign: 'Left',
                semanticColor: sap.ui.commons.TextViewColor.Positive,
                design: sap.ui.commons.TextViewDesign.Bold
            }).addStyleClass("customsize");
    
            TxvCntProcedure = SAPUI.TextView("", "tes", "", "auto", true);
            TxvCntProcedure.setDesign(sap.ui.commons.TextViewDesign.H4);
    
            mtrxCntDlg = SAPUI.Matrix("", "auto", false, ['auto', 'auto'], 2);
    
            mtrxCntDlg.createRow(iconDiagnos, TxvTtlDiagnosi);
            mtrxCntDlg.createRow("", TxvCntDiagnosi);
            mtrxCntDlg.createRow("");
            mtrxCntDlg.createRow(iconProcedure, TxvtlProcedure);
            mtrxCntDlg.createRow("", TxvCntProcedure);
    
            DlgErroMsg.addContent(mtrxCntDlg);
    
            labelMsg.attachBrowserEvent('click', function () {
                DlgErroMsg.open()
            })
    
            //footer error message
            var footer = new sap.m.Toolbar({
                content: [
                    labelZero,
                    labelIcon,
                    labelMsg
                ],
                height: "7%"
            }).addStyleClass("Footer")
            //------------------------------------------------------------------------
    
            //-------------------------Sub Header Bar Page------------------------------------
            var searchBar = SAPUI.AutoComplete("", "Enter a TCode", 10, "15%", true, true);
    
            searchBar.setPlaceholder("Cari Tcode...");
            searchBar.attachBrowserEvent('keypress', function (e) {
                var valser = searchBar
                if (e.which == 13) {
                    SAPUI.SearchTcode(valser)
                }
            });
    
            searchBar.setDisplaySecondaryValues(true);
            searchBar.addStyleClass("searchBar")
            Global.AutoCompleteList(searchBar, "SearchTcode", U5312UX5)
    
    
            //button cari
            var btnCari = SAPUI.Button("", "", "Cari Tcode", "sap-icon://accept", false, "Accept")
            btnCari.addStyleClass("roundedbuttonsearch")
            btnCari.attachPress(function () {
                var valser = searchBar
                SAPUI.SearchTcode(valser)
            });
    
            //button back
            var btnBack = SAPUI.Button("", "", "Back", "sap-icon://nav-back", false, "Accept")
            btnBack.attachPress(function () {
                Global.UniversalBack()
                // if (parseInt(titleCut) > 1){
                // 	titleCut = (parseInt(titleCut) - 1).toString()
                // }
                // function GoBackWithRefresh(event) {
                //    if ('referrer' in document) {
                //        window.location = document.referrer;
                //        /* OR */
                //        //location.replace(document.referrer);
                //    } else {
                //        window.history.back();
                //    }
                // }
                // GoBackWithRefresh()
            })
            btnBack.addStyleClass("roundedbuttonback")
    
            //button back to dashboard
            var btnDashboard = SAPUI.Button("", "", "Kembali Ke Dashboard", "sap-icon://sys-cancel-2", false, "Accept")
            btnDashboard.attachPress(function () {
                Global.DeleteSession();
                sessionStorage.removeItem("tcodeVariantux5");
                sap.m.URLHelper.redirect("Dashboard.html");
            })
            btnDashboard.addStyleClass("roundedbuttoncancel")
    
            title.addStyleClass("bgSubheaderText")
    
            var BtnHeader = [title],
                oCustomHeader = new sap.m.Bar({
                    design: sap.m.BarDesign.Footer,
                    contentLeft: [btnBack],
                    contentMiddle: [],
                    contentRight: []
                }).addStyleClass("bgSubheader");
            //-------------------------Sub Header Bar Page-----------------------------------
    
    
    
            //------------------------Header Bar Menu Dinamis Page---------------------------
    
            var oSubHeader = new sap.m.Bar({
                contentLeft: [mtrHeader]
            }).addStyleClass("sapUiSizeCompact");
            //------------------------Header Bar Menu Dinamis Page---------------------------
            var title1 = SAPUI.Title("", "ERP HR 2.0")
    
            //==========GET TILE DATA================
    
            //==========================
    
            return new sap.ui.unified.Shell({
                id: "myShell1",
                icon: "asset/image/trias1.png",
                headItems: [ //redirect to home dashboard
                    new sap.ui.unified.ShellHeadItem({
    
                        tooltip: "Menu",
                        icon: "sap-icon://menu",
                        visible: true,
                        press: function () {
                            var oShell = this.getParent().getParent();
                            var bState = oShell.getShowPane();
                            oShell.setShowPane(!bState);
                            if (bState) { // tutup
                                // alert("yes")
                                $('#myShell1-container-pane').css('width', '0px');
                                $('#myShell1-container-canvas').css('left', '0px');
                            } else { // buka
                                // alert("no")
                                $('#myShell1-container-pane').css('width', '400px');
                                $('#myShell1-container-canvas').css('left', '400px');
                            }
                            // $('#myShell1-container-pane').css('width', '300px')
                            // oItem.setShowMarker(!bState);
                            // oItem.setSelected(!bState);
                        }
                    }),
                    new sap.ui.unified.ShellHeadItem({
                        tooltip: "Home",
                        icon: "sap-icon://home",
                        visible: "false",
                        press: function () {
                            sap.m.URLHelper.redirect("Dashboard.html");
                            //delete all session storage
                            sessionStorage.clear();
                        }
                    }),
                ],
    
                headEndItems: [
                    //close active session jika pada browser utama akan melakukan logout
                    new sap.ui.unified.ShellHeadItem({
                        icon: "sap-icon://system-exit",
                        tooltip: "Close Session",
                        press: function () {
                            oThis.CloseSession()
                            // sap.ui.commons.MessageBox.confirm(Global.tabCount() == 1 ?
                            //     "Do you want to log off ?" : "Do you want to close this tab?",
                            //     oThis.CloseSession, "Confirmation");
                        }
                    }).setVisible(true),
                    //create session window
                    new sap.ui.unified.ShellHeadItem({
                        icon: "sap-icon://create-session",
                        tooltip: "Create Session",
                        press: function () {
                            oThis.CreateSession();
    
                        }
                    }),
                    //logout
                    new sap.ui.unified.ShellHeadItem({
                        icon: "sap-icon://log",
                        tooltip: "Logout",
                        press: function () {
                            Global.Logout();
                        }
                    }),
                    // //change language
                    // new sap.ui.unified.ShellHeadItem({
                    //     icon: iconLanguage,
                    //     tooltip: "Language",
                    //     press: function () {
                    //         if (LANGUANGE == 'en') {
                    //             window.localStorage.setItem("languageux5", "ind");
                    //             window.localStorage.setItem("iconLang", "asset/icon/EN.png");
                    //         } else {
                    //             window.localStorage.setItem("languageux5", "en");
                    //             window.localStorage.setItem("iconLang", "asset/icon/ID.png");
                    //         }
    
                    //         location.reload();
                    //     }
                    // })
                ],
                search: title1,
                user: usr,
                content: new sap.m.Page({
                    customHeader: oSubHeader,
                    showHeader: isShowHeader,
                    showSubHeader: isShowSubHeader,
                    //                showFooter			: isShowFooter,
                    showFooter: false,
                    content: pageConten,
                    footer: [footer],
                    subHeader: oCustomHeader,
                    enableScrolling: true,
                    floatingFooter: true
                }),
                paneContent: [
                    // this.GetSidebar()
                ]
            })
    
            //function untuk konfirmasi keluar browser
    
        },
    
        /**
         * ! Experimental version
         * * Using the latest openui version
         * * with addition in data-sap-ui-libs => sap.f, sap.tnt
         * * Adding styling (f.shellbar.css)
         * ?
         * @param {string} shell.title *
         * @param {sap.control object} shell.content
         * @param {boolean} isDashboard
         * TODO : Refactor this method
         */
        FShell: function (shell, isDashboard = false) {
            var oThis = this
            var {
                title,
                content,
                toolbar,
                id,
                useExport,
                showToolbar = true
            } = shell
    
            var elId
            if (title) {
                document.title = "ERP HR 2.0 - " + title
            }
    
            if (id == undefined || id == null) {
                elId = ''
            } else {
                elId = id
            }
    
            // SECTION Global Function
            // Global.onCheckAuth(window.location.pathname)
            // Global.GetClientIP();
            // !SECTION
    
            if (!UserLS()) {
                SAPUI.Route("Login")
                SAPUI.MessageBoxError("Silahkan login terlebih dulu", function () {
                    window.location.reload()
                })
                throw 'Illegal activity : not authorized user open authorrized page'
            }
    
            // function isUserActive() {
            //     // console.log("Active");
            //     if (window.localStorage.getItem("LockingUser") === null) {
            //         console.log("Not Active");
            //         window.localStorage.clear();
            //         window.sessionStorage.clear();
            //         SAPUI.Route("Login")
            //     } else {
            //         var datax = [];
            //         datax.push({
            //             ObjectLocking: 'User',
            //             Value: JSON.parse(window.localStorage.getItem("LockingUser")).User
            //         });
    
            //         if (!Global.CheckUserActive(JSON.parse(window.localStorage.getItem("LockingUser")).User, "index_01", datax)) {
            //             window.localStorage.clear();
            //             window.sessionStorage.clear();
            //             SAPUI.Route("Login")
            //         }
            //     }
            // }
            // setInterval(isUserActive, (100 * 1000)); //Setiap 2 detik
    
            // SECTION Title
            if (showToolbar) {
                var tempTitleBar = SAPUI.GetCore(elId + 'titleBar')
                if (tempTitleBar) {
                    tempTitleBar.destroy()
                }
                var titleBar = new sap.m.Bar(elId + 'titleBar', {
                    design: sap.m.BarDesign.SubHeader
                }).addStyleClass("Shellbar-TitleBar")
            }
    
            if (toolbar != undefined) {
    
                titleBar.addContentLeft(toolbar)
            }
    
            //export
            if (useExport != undefined) {
                var btnExportExcel = SAPUI.ButtonToolbar('btnExportExcel', 'Export Excel', 'Export Excel', 'sap-icon://excel-attachment', sap.m.ButtonType.Transparent)
                var btnExport = SAPUI.ButtonToolbar('btnExport', 'Export to', 'Export to', '', sap.m.ButtonType.Transparent)
                var btnExportPdf = SAPUI.ButtonToolbar('btnExportPdf', 'Export Pdf', 'Export Pdf', 'sap-icon://pdf-attachment', sap.m.ButtonType.Transparent)
    
                var mtrDash = SAPUI.Matrix("mtrDash", "auto", false, [], 2);
                mtrDash.createRow(btnExportExcel, btnExportPdf)
    
                if ((Global.getCurrentRoute() == "REWSSHIFT_02") ||
                    (Global.getCurrentRoute() == "REWSSHIFT_USER_02")
                ) {
                    titleBar.addContentRight(btnExport)
                } else if ((Global.getCurrentRoute() == "REPOVE_02") ||
                    (Global.getCurrentRoute() == "REPOVEO_02")) {
                    titleBar.addContentRight(mtrDash)
                } else {
                    titleBar.addContentRight(btnExportExcel)
                }
    
                btnExportExcel.attachPress(function () {
                    var view = SAPUI.GetCore(elId.replace("--", ""))
                    var controller = view.getController()
                    controller.onToExport("xlsx");
                });
    
                btnExport.attachPress(function () {
                    var view = SAPUI.GetCore(elId.replace("--", ""))
                    var controller = view.getController()
                    controller.confirmExport();
                });
    
                btnExportPdf.attachPress(function () {
                    var view = SAPUI.GetCore(elId.replace("--", ""))
                    var controller = view.getController()
                    controller.onToExport("pdf");
                });
            }
            // !SECTION
    
            // SECTION Theme Popover
            var tempthemePopover = SAPUI.GetCore(elId + 'themePopover')
            if (tempthemePopover) {
                tempthemePopover.destroy()
            }
            var themePopover = new sap.m.Popover(elId + 'themePopover', {
                placement: sap.m.PlacementType.Left,
                content: [
                    new sap.m.Button({
                        // icon: "sap-icon://log",
                        text: 'High Contrast Theme',
                        type: sap.m.ButtonType.Transparent,
                        press: evt => {
                            sap.ui.getCore().applyTheme("sap_belize_hcb");
                        }
                    }),
                    new sap.m.Button({
                        // icon: "sap-icon://log",
                        text: 'Fiori Theme',
                        type: sap.m.ButtonType.Transparent,
                        press: evt => {
                            sap.ui.getCore().applyTheme("sap_fiori_3");
                        }
                    }),
                    new sap.m.Button({
                        // icon: "sap-icon://log",
                        text: 'Default Theme',
                        type: sap.m.ButtonType.Transparent,
                        press: evt => {
                            sap.ui.getCore().applyTheme("sap_belize");
                        }
                    })
                ]
            })
            // !SECTION
    
            // SECTION Popover (After Click Profile)
            var tempPopover = SAPUI.GetCore(elId + 'popover')
            if (tempPopover) {
                tempPopover.destroy()
            }
            var popover = new sap.m.Popover(elId + 'popover', {
                title: UserLS(),
                titleAlignment: sap.m.TitleAlignment.Center,
                showHeader: false,
                showArrow: true,
                placement: sap.m.PlacementType.Bottom,
                afterClose: evt => {
                    // fixHeightClose()
                },
                content: [
                    new sap.m.Text({
                        text: "Welcome",
                        textAlign: sap.ui.core.TextAlign.Center
                    }).addStyleClass("margin-bottom10 font-SizeS"),
                    new sap.m.Image({
                        src: "asset/icon/12.png",
                        height: '60px',
                        width: '60px',
                    }).addStyleClass("margin-bottom10 center-itemPopOver"),
                    new sap.m.Text({
                        text: UserLS(),
                        textAlign: sap.ui.core.TextAlign.Center
                    }).addStyleClass("colorGrey font-SizeS"),
                    new sap.m.Text({
                        text: window.localStorage.getItem("Name"),
                        textAlign: sap.ui.core.TextAlign.Center
                    }).addStyleClass("margin-bottom10 font-transformUpper"),
                    new sap.m.ToolbarSpacer({
                        width: "200px",
                    }).addStyleClass("borderBottomPopOver"),
                    new sap.m.Link({
                        text: "Change Password",
                        textAlign: sap.ui.core.TextAlign.Center,
                        tooltip: "Change your password",
                        press: evt => {
                            oThis.ChangePassword()
                        }
                    }).addStyleClass("margin-top10 font-SizeM"),
                    new sap.m.Link({
                        text: "Log Out",
                        textAlign: sap.ui.core.TextAlign.Center,
                        tooltip: "Log Out from ERP HR",
                        press: evt => {
                            Global.Logout()
                        }
                    }).addStyleClass("margin-bottom30 colorRed font-SizeM"),
                    new sap.m.Text({
                        text: "ERP HR | version 2.0",
                        textAlign: sap.ui.core.TextAlign.Center,
                    }).addStyleClass("colorGrey font-SizeS"),
                ]
            }).addStyleClass('sapMOTAPopover padding10')
            // !SECTION
    
            // SECTION Popover Notification
            var tempPopoverNotification = SAPUI.GetCore(elId + 'popoverNotification')
            if (tempPopoverNotification) {
                tempPopoverNotification.destroy()
            }
            var popoverNotification = new sap.m.Popover(elId + 'popoverNotification', {
                    title: UserLS(),
                    titleAlignment: sap.m.TitleAlignment.Center,
                    showHeader: false,
                    showArrow: false,
                    // customHeader: oThis.Title('', UserLS()),
                    placement: sap.m.PlacementType.Bottom,
                    verticalScrolling: true,
                    afterClose: evt => {
                        // fixHeightClose()
                    },
                    content: new sap.m.List({
                        items: {
                            path: "/",
                            templateShareable: false,
                            template: new sap.m.NotificationListGroup({
                                title: "{title}",
                                showEmptyGroup: true,
                                showCloseButton: false,
                                items: {
                                    path: "ListItems",
                                    templateShareable: false,
                                    template: new sap.m.NotificationListItem({
                                        title: "{title}",
                                        description: "{description}",
                                        authorInitials: "{authorInitials}",
                                        authorAvatarColor: "{authorAvatarColor}",
                                        priority: sap.ui.core.Priority.High,
                                        showCloseButton: false,
                                        press: evt => {
                                            alert("Pindah Halaman")
                                        },
                                        buttons: {
                                            path: "buttons",
                                            templateShareable: false,
                                            template: new sap.m.Button('', {
                                                enabled: "{enabled}",
                                                text: "{text}",
                                                press: evt => {
                                                    var bindValue = evt
                                                        .getSource()
                                                        .getBindingContext()
    
                                                    confirm(bindValue.getProperty("text") + "?")
                                                }
                                            }),
                                        }
                                    }),
                                },
                            }),
                        }
                    })
                })
                .setModel(oThis.GetNotifModel())
                .addStyleClass('Shellbar-Notif-Popover')
            // !SECTION
    
            // SECTION Profile (Avatar)
            // var tempProfile = SAPUI.GetCore(elId + 'profile')
            // if(tempProfile){
            //     tempProfile.destroy()
            // }
            // var profile = 
            // !SECTION
    
            if (title == undefined || title == null) {
                title = ''
            }
    
            // SECTION ShellBar & Searchbar
            var tempShellbar = SAPUI.GetCore(elId + 'shellbar')
            if (tempShellbar) {
                tempShellbar.destroy()
            }
    
            const menuModels = oThis.GetMenuModel()
    
            var searchbar = new sap.f.SearchManager()
    
            function onMenuButtonPressed() {
                var bExpanded = sidebar.getExpanded()
                var element = $("div.sapTntToolPageContentWrapper > div.sapTntToolPageMain")
                var mainSidebar = $(".Sidebar-Main")
    
                if (bExpanded) {
                    element
                        .css("padding-left", "3rem")
                } else {
                    element
                        .css("padding-left", "48rem")
                }
    
                sidebar.setExpanded(!bExpanded)
                page.setSideExpanded(!page.getSideExpanded())
    
                if (!bExpanded) {
                    $(".sapTntToolPageContentWrapper").prepend("<div class='bgshadow' style=\"width:100%;height:32px;background-color:white;position:absolute;\"></div>");
                    $(".sapTntToolPageMain").css("padding-left", '25rem');
                    // $( ".sapTntToolPageMain" ).css("transition", "width 0s");
                    if (mainSidebar) {
                        // $(function(){
                            sap.ui.require([
                                'asset/js/jquery-ui'
                            ], function(){
                                mainSidebar.resizable({
                                    maxWidth: 500,
                                    minWidth: 100
                                });
                                mainSidebar.on("resize", function (event, ui) {
                                    sidebar.getItem().setWidth(ui.size.width + "px");
                                    $(".sapTntToolPageMain").css("padding-left", ui.size.width);
                                    if (ui.size.width < 100) {
                                        sidebar.setExpanded(false)
                                        page.setSideExpanded(false)
                                    }
                                });
                            })
                        // })
                    }
                } else {
                    $(".bgshadow").remove();
                    // $(".sapTntToolPageMain").css("padding-left", '0rem');
                    $(".sapTntToolPageMain").css("padding-left", '3rem');
                    if (mainSidebar) {
                        mainSidebar.resizable('destroy');
                    }
                }
            }
    
            function onNavButtonPressed() {
                var getController = SAPUI.GetCore("id" + Global.getCurrentRoute()).getController()
                var endOfRoute = Global.getCurrentRoute().substring(Global.getCurrentRoute().length - 2, Global.getCurrentRoute().length);
    
                if (getController.mode) {
                    if (getController.mode == 'display') {
                        Global.Back()
                    } else {
                        if (getController.onCancel) {
                            getController.onCancel()
                        } else if ((Global.getCurrentRoute() == "PA30_AB") ||
                            (Global.getCurrentRoute() == "PA30_OA") ||
                            (Global.getCurrentRoute() == "PA30_PD") ||
                            (Global.getCurrentRoute() == "PA30_AdB") ||
                            (Global.getCurrentRoute() == "PA30_FMB") ||
                            (Global.getCurrentRoute() == "PA30_EP") ||
                            (Global.getCurrentRoute() == "PA30_EI") ||
                            (Global.getCurrentRoute() == "PA30_JN") ||
                            (Global.getCurrentRoute() == "PA30_NPWP") ||
                            (Global.getCurrentRoute() == "PA30_BPJS") ||
                            (Global.getCurrentRoute() == "PA30_BD") ||
                            (Global.getCurrentRoute() == "PA30_IN")
                        ) {
                            window.sessionStorage.removeItem("PA30_trxMode")
                            window.sessionStorage.setItem("PA30_trxMode", "")
                            // this.reRenderButton()
                            SAPUI.Route("PA30_01")
                        } else {
                            Global.Back()
                        }
                    }
                } else if ((Global.getCurrentRoute() == "PA30_01") ||
                    (Global.getCurrentRoute() == "SPRO_01") ||
                    (Global.getCurrentRoute() == "SP123_01") ||
                    (Global.getCurrentRoute() == "PTK_01")) {
                    window.sessionStorage.removeItem("PA30_trxMode")
                    window.sessionStorage.removeItem("PA30_infotype")
                    window.sessionStorage.removeItem("PA30_Status")
                    window.sessionStorage.removeItem("PA30_ChData")
                    SAPUI.Route("Dashboard")
                } else if (endOfRoute == '01') { // jika dari halaman pertama, route ke dashboard
                    SAPUI.Route("Dashboard")
                } else {
                    Global.Back()
                }
            }
    
            let shellbar = new sap.f.ShellBar(elId + 'shellbar', {
                // Bug After Login
                title: "ERP HR 2.0",
                secondTitle: title,
                homeIcon: "asset/image/loginnew/Logo.png",
                showMenuButton: true,
                showNavButton: !isDashboard,
                // End
                showNotifications: false, //Disabled until feature fully developed
                profile: new sap.f.Avatar({
                    initials: oThis.getInitialName()
                }),
                searchManager: searchbar,
                additionalContent: [
                    new sap.m.Button('', {
                        icon: "sap-icon://create-session",
                        tooltip: "Create New Session",
                        press: _ => {
                            oThis.CreateSession()
                        }
                    }),
                ],
                navButtonPressed: evt => {
                    var getController = SAPUI.GetCore("id" + Global.getCurrentRoute()).getController()
                    var endOfRoute = Global.getCurrentRoute().substring(Global.getCurrentRoute().length - 2, Global.getCurrentRoute().length);
    
                    if (getController.mode) {
                        if (getController.mode == 'display') {
                            Global.Back()
                        } else {
                            if (getController.onCancel) {
                                getController.onCancel()
                            } else if ((Global.getCurrentRoute() == "PA30_AB") ||
                                (Global.getCurrentRoute() == "PA30_OA") ||
                                (Global.getCurrentRoute() == "PA30_PD") ||
                                (Global.getCurrentRoute() == "PA30_AdB") ||
                                (Global.getCurrentRoute() == "PA30_FMB") ||
                                (Global.getCurrentRoute() == "PA30_EP") ||
                                (Global.getCurrentRoute() == "PA30_EI") ||
                                (Global.getCurrentRoute() == "PA30_JN") ||
                                (Global.getCurrentRoute() == "PA30_NPWP") ||
                                (Global.getCurrentRoute() == "PA30_BPJS") ||
                                (Global.getCurrentRoute() == "PA30_BD") ||
                                (Global.getCurrentRoute() == "PA30_IDC") ||
                                (Global.getCurrentRoute() == "PA30_IN")
                            ) {
                                window.sessionStorage.removeItem("PA30_trxMode")
                                window.sessionStorage.setItem("PA30_trxMode", "")
                                // this.reRenderButton()
                                SAPUI.Route("PA30_01")
                            } else {
                                Global.Back()
                            }
                        }
                    } else if ((Global.getCurrentRoute() == "PA30_01") ||
                        (Global.getCurrentRoute() == "SPRO_01") ||
                        (Global.getCurrentRoute() == "SP123_01") ||
                        (Global.getCurrentRoute() == "PTK_01")) {
                        window.sessionStorage.removeItem("PA30_trxMode")
                        window.sessionStorage.removeItem("PA30_infotype")
                        window.sessionStorage.removeItem("PA30_Status")
                        window.sessionStorage.removeItem("PA30_ChData")
                        SAPUI.Route("Dashboard")
                    } else if (endOfRoute == '01') { // jika dari halaman pertama, route ke dashboard
                        SAPUI.Route("Dashboard")
                    } else {
                        Global.Back()
                    }
                },
                menuButtonPressed: evt => {
                    onMenuButtonPressed()
                },
                avatarPressed: evt => {
                    if (popover.isOpen()) {
                        popover.close()
    
                    } else {
                        // fixHeightOpen()
                        popover.openBy(shellbar.getProfile())
                    }
                },
                notificationsPressed: evt => {
                    if (popoverNotification.isOpen()) {
                        popoverNotification.close()
                    } else {
                        // fixHeightOpen()
                        popoverNotification.openBy(shellbar._oNotifications)
                    }
                },
                homeIconPressed: evt => {
                    SAPUI.Route('Dashboard');
                    // sessionStorage.clear();
                },
            }).addStyleClass("Shellbar-Main")
    
            if (NEWLOGIN) {
                searchbar = new sap.m.SearchField()
                shellbar = new sap.tnt.ToolHeader(elId + 'shellbar2', {
                    content: SAPUI.Matrix("mtxShellbar2", "100%", false, ["50%", "20%", "30%"], 3)
                        .createRow(
                            SAPUI.Matrix("mtxShellbar2-Left", "", false, ["5%", "5%", "5%", "5%", "80%"], 5)
                            .createRow(
                                SAPUI.Button("", "", "", "sap-icon://nav-back", false, "Transparent")
                                .setVisible(!isDashboard)
                                .attachPress(function () {
                                    onNavButtonPressed()
                                }),
                                SAPUI.Button("", "", "", "sap-icon://menu2", false, "Transparent")
                                .attachPress(function () {
                                    onMenuButtonPressed()
                                }),
                                SAPUI.Button("", "", "", "asset/image/logo.png", false, "Transparent")
                                .attachPress(function () {
                                    SAPUI.Route('Dashboard');
                                }),
                                SAPUI.Title("", "ERP HR 2.0").addStyleClass("Title-Shellbar"),
                                SAPUI.Text("", title).addStyleClass("TcodeTitle-Shellbar")
                            ),
                            SAPUI.Matrix("mtxShellbar2-Center", ""),
                            SAPUI.Matrix("mtxShellbar2-Right", "", false, ["90%", "5%", "5%"], 3)
                            .createRow(
                                searchbar,
                                SAPUI.Button("", "", "", "sap-icon://create-session", false, "Transparent")
                                .attachPress(function () {
                                    oThis.CreateSession()
                                }),
                                SAPUI.Button("", "", "", "sap-icon://customer", false, "Transparent")
                                .attachPress(function (oEvent) {
                                    if (popover.isOpen()) {
                                        popover.close()
                                    } else {
                                        popover.openBy(oEvent.getSource())
                                    }
                                })
                            )
                        )
                }).addStyleClass("Shellbar-Main")
    
                SAPUI.GetCore("mtxShellbar2").getRows()[0].getCells()[0].getContent()[0].getRows()[0].getCells()[3].setVAlign(sap.ui.commons.layout.VAlign.Bottom)
                if (isDashboard) {
                    SAPUI.GetCore("mtxShellbar2-Left").setWidths(["0%", "5%", "5%", "5%", "80%"])
                }
            }
    
            searchbar.setPlaceholder("Search...")
            searchbar.setEnableSuggestions(true)
            searchbar.attachSearch(function (oEvent) {
                let getDesc = oEvent.getParameter("query")
                const dataSuggest = deepCopy(oThis.GetMenuModel()["suggestions"].oData)
                try {
                    let tcode = dataSuggest.find(({
                        Description
                    }) => Description === getDesc).pressGnt
                    tcode != "" || tcode ? SAPUI.RouteTcode(tcode) : SAPUI.MessageBoxWarning("please complete the input or choose one of list from suggestion")
                } catch (error) {
                    SAPUI.MessageBoxWarning("please complete the input or choose one of list from suggestion")
                }
            })
            searchbar.attachSuggest(function (oEvent) {
                var sValue = oEvent.getParameter("suggestValue"),
                    aFilters = [];
    
                if (sValue) {
                    aFilters = [
                        new sap.ui.model.Filter([
                            new sap.ui.model.Filter("Description", function (sText) {
                                return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                            }),
                        ])
                    ];
                }
    
                this.getBinding("suggestionItems").filter(aFilters);
                this.suggest();
            })
            searchbar.bindAggregation("suggestionItems", {
                sorter: "{pressGnt}",
                path: "/",
                templateShareable: false,
                template: new sap.m.SuggestionItem({
                    text: "{Description}",
                    // description: "{Description}",
                    key: "{pressGnt}",
                    icon: "{icon}",
                })
            })
            searchbar.setModel(menuModels["suggestions"])
    
            // !SECTION
    
            // SECTION Custom Header
            var tempCHeader = SAPUI.GetCore(elId + 'cHeader')
            if (tempCHeader) {
                tempCHeader.destroy()
            }
            var menuButton = new sap.m.Button(elId + 'menuButton', {
                icon: "sap-icon://menu2"
            })
            var profileBtn = new sap.m.Button(elId + 'profileBtn', {
                icon: "sap-icon://customer"
            }).attachPress(function (oEvent) {
                if (popover.isOpen()) {
                    popover.close()
    
                } else {
                    // fixHeightOpen()
                    popover.openBy(oEvent.getSource())
                }
            })
            var cHeader = new sap.tnt.ToolHeader(elId + 'cHeader', {
                content: [
                    menuButton,
                    new sap.m.ToolbarSpacer({
                        width: "94%"
                    }),
                    profileBtn
                ]
            }).addStyleClass("cHeader-Main")
            // !SECTION
    
            // SECTION Sidebar
            var tempSidebar = SAPUI.GetCore(elId + "sidebar")
            if (tempSidebar) {
                tempSidebar.destroy()
            }
    
            var sidebar = new sap.tnt.SideNavigation(elId + "sidebar", {
                    item: new sap.tnt.NavigationList({
                        items: {
                            templateShareable: false,
                            template: new sap.tnt.NavigationListItem({
                                text: '{Description}',
                                icon: '{icon}',
                                enabled: true,
                                expanded: false,
                                select: evt => {
                                    const isExpanded = evt.getSource().getExpanded()
    
                                    //close another menu
                                    const item = evt.getSource().getParent().getItems()
                                    const expanded = evt.getSource();
    
                                    for (var i = 0; i < item.length; i++) {
                                        if (item[i] == expanded) {
                                            item[i].setExpanded(true)
                                        } else {
                                            item[i].setExpanded(false)
                                        }
                                    }
                                    evt.getSource().setExpanded(!isExpanded)
                                },
                                items: {
                                    templateShareable: false,
                                    template: new sap.tnt.NavigationListItem({
                                        text: '{Description}',
                                        icon: '{icon}',
                                        enabled: true,
                                        select: evt => {
                                            let route = evt.getSource()
                                                .getBindingContext()
                                                .getProperty("pressGnt")
    
                                            SAPUI.RouteTcode(route)
                                        }
                                    }),
                                    path: 'content'
                                }
                            }),
                            path: '/'
                        }
                    }).addStyleClass("Sidebar-Content"),
                })
                .setModel(menuModels["sidebar"])
                .addStyleClass("Sidebar-Main")
            // !SECTION
    
            // SECTION Return the page
            var tempPage = SAPUI.GetCore(elId + 'page')
            if (tempPage) {
                tempPage.destroy()
            }
            var page = new sap.tnt.ToolPage(elId + 'page', {
                sideExpanded: false,
                header: shellbar,
                // header: cHeader,
                sideContent: sidebar,
                mainContents: [
                    titleBar,
                    new sap.m.ScrollContainer({
                        vertical: true,
                        height: "100%",
                        content: content
                    })
                ],
            })
            // !SECTION
    
            // SECTION Some Tweak and Styling
            // *NOTE To fix freeze sidebar menu : event = open
            function fixHeightOpen() {
                var element = $("footer>ul>li")
                const height = 12
                const bottom = '623px'
                let bottomEdit = bottom
                if (bottomEdit.includes("px")) {
                    bottomEdit = (Number(bottomEdit.replace("px", "")) - height).toString() + "px"
                    element.css("bottom", bottomEdit)
                }
            }
            // *NOTE To fix freeze sidebar menu : event = open
            function fixHeightClose() {
                var element = $("footer>ul>li")
                const bottom = '623px'
                element.css("bottom", bottom)
            }
            if (!NEWLOGIN) {
                if (shellbar._oSecondTitle) {
                    shellbar._oSecondTitle.addStyleClass("Second-Title")
                }
    
                if (shellbar.getAdditionalContent()) {
                    shellbar.getAdditionalContent().forEach(content => {
                        content.addStyleClass("Shellbar-AdditionalContent")
                    })
                }
    
                shellbar._oOverflowToolbar.addStyleClass("Shellbar-Overflow")
            }
            page.getMainContents()[0].getParent().addStyleClass("Main-Content-ToolPage")
    
            // *NOTE Adding tweak to remove small padding 
            // *when remove mini sidebar, save this snip for later
            // page.onAfterRendering = function(){
            //     $( ".sapTntToolPageMain" ).css("padding-left", '0rem');
            // }
            // !SECTION
    
            // *NOTE just return required 
            // *object from shellbar for flexibility
            return {
                titleBar,
                page
            }
        },
        PAShell: function (shell) {
            var oThis = this
    
    
            var {
                content,
                id,
                dateStart = false,
                dateChange = false
            } = shell
    
            var elId
    
            if (id == undefined || id == null) {
                elId = ''
            } else {
                elId = id
            }
    
            var view = SAPUI.GetCore(elId.replace("--", ""))
            var controller = view.getController()
    
            var res = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
    
            //Search and Header Section
            //------------------------------------------
    
            var btnSave = SAPUI.ButtonToolbar(elId + "btnSave", "", "Save", "sap-icon://save")
            var btnNew = SAPUI.ButtonToolbar(elId + "btnNew", "", "New", "sap-icon://add-document")
            var btnDisp = SAPUI.ButtonToolbar(elId + "btnDisp", "", "Display", "sap-icon://display")
            var btnOverview = SAPUI.ButtonToolbar(elId + "btnOverview", "", "Overview", "sap-icon://manager-insight")
            var btnWorkSchedule = SAPUI.ButtonToolbar(elId + "btnWorkSchedule", "", "Work Schedule", "sap-icon://work-history")
            // var btnAdd = SAPUI.ButtonToolbar(elId + "btnAdd", "", "Add", "sap-icon://add")
            var btnChg = SAPUI.ButtonToolbar(elId + "btnChg", "", "Change", "sap-icon://edit")
            var btnDel = SAPUI.ButtonToolbar(elId + "btnDel", "", "Delete", "sap-icon://delete")
            var btnDispO = SAPUI.ButtonToolbar(elId + "btnDispO", "", "Display", "sap-icon://display", "Emphasized")
            var btnChgO = SAPUI.ButtonToolbar(elId + "btnChgO", "", "Change", "sap-icon://edit", "Emphasized")
    
            var mtxBtn = SAPUI.Matrix(elId + "mtxBtn", "1%", false, [], 7)
    
            mtxBtn.createRow(btnSave, btnNew, btnDisp, btnChg, btnOverview, btnWorkSchedule);
    
            SAPUI.reRenderButton(elId)
    
            var pnlSearch = SAPUI.Panel(elId + "pnlSearch", "", "100%", false, false)
                .setLayoutData(new sap.ui.layout.SplitterLayoutData({
                    size: "20%"
                }))
    
            var txtSearch = new sap.m.SearchField(elId + "txtSearch")
            var tblSearch = SAPUI.Table(elId + "tblSearch", "auto", 10, sap.ui.table.SelectionMode.None, "", true)
    
            tblSearch.addColumn(SAPUI.Column("NIK", "TextField", "NIK"))
            tblSearch.addColumn(SAPUI.Column("Nama", "TextField", "Nama"))
    
            pnlSearch.addContent(txtSearch)
            pnlSearch.addContent(tblSearch)
    
            var pnlBody = SAPUI.Panel(elId + "pnlBody", "", "100%", false, false)
                .setLayoutData(new sap.ui.layout.SplitterLayoutData({
                    size: "100%"
                }))
    
            var mtx1 = SAPUI.Matrix(elId + "mtx1", "60%", true, ["17%", "30%"], 2)
    
            var lblPersonnelNo = SAPUI.Label(elId + "lblPersonnelNo", "Personnel Number", "Bold")
            // var vhfPersonnelNo = SAPUI.TextField(elId + "vhfPersonnelNo", "", "30%", 10, true, true).setType("Number")
            var vhfPersonnelNo = SAPUI.ValueHelpField(elId + "vhfPersonnelNo", "", "Personel Number", '', 'auto').setType("Number");
            mtx1.createRow(lblPersonnelNo, vhfPersonnelNo)
    
            var lblName = SAPUI.Label(elId + "lblName", "Name", "Bold")
            var txfName = SAPUI.TextField(elId + "txfName", "", "100%", 100, true, true).setEditable(false)
            mtx1.createRow(lblName, txfName)
    
            var mtx2 = SAPUI.Matrix(elId + "mtx2", "100%", true, ["15%", "20%", "15%", "20%"], 4)
            var lblEEg = SAPUI.Label(elId + "lblEEg", "Employee Status", "Bold")
            var txfEEg = SAPUI.TextField(elId + "txfEEg", "", "auto", 40, true, true).setEditable(false)
            var lblEEgDesc = SAPUI.Label(elId + "lblEEgDesc")
    
            var lblEESg = SAPUI.Label(elId + "lblEESg", "Employee Assignment", "Bold")
            var txfEESg = SAPUI.TextField(elId + "txfEESg", "", "auto", 40, true, true).setEditable(false)
            var lblEESgDesc = SAPUI.Label(elId + "lblEESgDesc", "EE Subgroup Desc")
            mtx2.createRow(lblEEg, txfEEg, lblEESg, txfEESg)
    
            var lblPersArea = SAPUI.Label(elId + "lblPersArea", "Personnel Area", "Bold")
            var txfPersArea = SAPUI.TextField(elId + "txfPersArea", "", "auto", 10, true, true).setEditable(false)
            var lblPersAreaDesc = SAPUI.Label(elId + "lblPersAreaDesc", "Pers. Area Desc")
            mtx2.createRow(lblPersArea, txfPersArea)
    
            var mtx3 = SAPUI.Matrix(elId + "mtx3", "100%", true, ["15%", "20%", "15%", "20%"], 4)
            var lblDateSt = SAPUI.Label(elId + "lblDateSt", "Start Date", "Bold").setVisible(false).setRequired(true)
            var txfDateSt = SAPUI.DatePicker(elId + "txfDateSt", "", true, true).setValue(new Date().toISOString().split("T")[0]).setVisible(false);
            var lblDateTo = SAPUI.Label(elId + "lblDateTo", "End Date", "Bold").setVisible(false).setRequired(true)
            var txfDateTo = SAPUI.DatePicker(elId + "txfDateTo", "", true, true).setValue("9998-12-31").setVisible(false);
            var lblChgdDate = SAPUI.Label(elId + "lblChgdDate", "Changed on", "Bold").setVisible(false)
            var txfChgDate = SAPUI.DatePicker(elId + "txfChgDate", "", true, true).setVisible(false).setEditable(false);
            var lblChgdBy = SAPUI.Label(elId + "lblChgdBy", "Changed by", "Bold").setVisible(false)
            var txfChgBy = SAPUI.TextField(elId + "txfChgBy", "", "auto", 50, true, true).setVisible(false).setEditable(false)
            mtx3.createRow(lblDateSt, txfDateSt, lblDateTo, txfDateTo)
            mtx3.createRow(lblChgdDate, txfChgDate, lblChgdBy, txfChgBy)
    
            if (dateStart) {
                lblDateSt.setVisible(true)
                txfDateSt.setVisible(true)
                lblDateTo.setVisible(true)
                txfDateTo.setVisible(true)
            }
            if (dateChange) {
                lblChgdDate.setVisible(true)
                txfChgDate.setVisible(true)
                lblChgdBy.setVisible(true)
                txfChgBy.setVisible(true)
            }
    
            var mtx4 = SAPUI.Matrix(elId + "mtx4", "auto").addStyleClass("alert alert-warning").setVisible(false)
            var lblWarning = SAPUI.Label(elId + "lblWarning", "Warning! ", "Bold").addStyleClass("paddingLeft paddingTop")
            var lblActive = SAPUI.Label(elId + "lblActive", "", ).addStyleClass("paddingRight paddingTop")
    
            mtx4.createRow(lblWarning, lblActive)
    
            var mtxInput = SAPUI.Matrix(elId + "mtxInput", "100%", true, ["100%"], 1)
            mtxInput.createRow(mtx1)
            mtxInput.createRow(mtx2)
            mtxInput.createRow(mtx3)
            mtxInput.createRow(mtx4)
    
            // var imgProfil = SAPUI.Image("", "", "120px", "160px")
            // var btnLampiran = SAPUI.Button(elId + "btnLampiran", "Lampiran", "Lampiran").setWidth("120px")
            // var btnSKCK = SAPUI.Button(elId + "btnSKCK", "SKCK", "SKCK").setWidth("120px")
            // var btnIdCard = SAPUI.Button(elId + "btnIdCard", "Id Card", "Id Card").setWidth("120px")
    
            // var mtxImg = SAPUI.Matrix(elId + "mtxImg", "100%", true, ["100%"], 1)
            // mtxImg.createRow(imgProfil)
            // mtxImg.createRow(btnLampiran)
            // mtxImg.createRow(btnSKCK)
            // mtxImg.createRow(btnIdCard)
    
            var lblGrade = SAPUI.Label(elId + "lblGrade", "Grade", "Bold")
            var txfGrade = SAPUI.TextField(elId + "txfGrade", "", "auto", 50, true, true).setEditable(false)
            var lblDept = SAPUI.Label(elId + "lblDept", "Department", "Bold")
            var txfDept = SAPUI.TextField(elId + "txfDept", "", "auto", 50, true, true).setEditable(false)
            var lblPos = SAPUI.Label(elId + "lblPos", "Position", "Bold")
            var txfPos = SAPUI.TextField(elId + "txfPos", "", "auto", 50, true, true).setEditable(false)
    
            var mtxGrade = SAPUI.Matrix(elId + "mtxGrade", "100%", true, ["13%", "30%"], 2)
                .createRow(
                    lblGrade, txfGrade
                )
    
                .createRow(
                    lblDept, txfDept
                )
    
                .createRow(
                    lblPos, txfPos
                )
    
    
            var mtxParent = SAPUI.Matrix(elId + "mtxParent", "100%", true, ["60%", "40%"], 2).addStyleClass("borderBottom")
            mtxParent.createRow(mtxInput, mtxGrade)
    
            pnlBody.addContent(mtxParent)
            pnlBody.addContent(content)
    
            var splitter = new sap.ui.layout.Splitter(elId + "splitter")
    
            // splitter.addContentArea(pnlSearch)
            splitter.addContentArea(pnlBody)
    
            //------------------------------------------
            var shell = SAPUI.FShell({
                title: "Maintain HR Master Data",
                content: [splitter], //Your main panel here
                toolbar: mtxBtn
            })
    
            //------Event Section--------
    
            vhfPersonnelNo.attachValueHelpRequest(function (oEvent) {
                Global.F4Filter(vhfPersonnelNo, "", lblPersonnelNo.getText(), "PERSNO", "", "", "", "")
            });
    
            vhfPersonnelNo.attachChange(function (e) {
                if (typeof controller.onCheckData == 'function') {
                    controller.onCheckData()
                } else {
                    throw "Please define onCheckData function"
                }
            })
    
            var index
            var tblIndex
            var abbr
            var SPDsp
    
            btnNew.attachPress(function (oEvent) {
                var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
    
                var itbPrimary = SAPUI.GetCore(elId + "itbPrimary")
                var activeTab = itbPrimary.getSelectedKey().split('--')[1]
    
                if (checkActive(activeTab)) {
                    var context = oThis.tblIndex.getContextByIndex(oThis.index)
                    oThis.abbr = controller.getAbbr(context.getObject())
                    // Reset State
                    // SAPUI.GetCore(elId + "mtxMain").destroyRows()
                    if (((activeTab == "itfCEmpInfo") && (oThis.index != 0)) || (activeTab != "itfCEmpInfo")) {
                        if (vhfPersonnelNo.getValue() == "") {
                            SAPUI.MessageBoxError("Personnel Number tidak ditemukan. Mohon untuk membuat Personnel Number baru melalui menu Action.")
                        } else {
                            if (oThis.abbr == 'OAB') {
                                SAPUI.MessageBoxError("Please create Organizational Assignment by create Action")
                            } else if (typeof controller.hooksModeNew == 'function') {
                                // set mode New
                                window.sessionStorage.setItem("PA30_trxMode", "PA30_new")
                                controller.hooksModeNew(oThis.abbr)
                            } else {
                                throw "Please define hookdModeNew function"
                            }
                        }
                    } else {
                        if (typeof controller.hooksModeNew == 'function') {
                            // set mode New
                            window.sessionStorage.setItem("PA30_trxMode", "PA30_new")
                            controller.hooksModeNew(oThis.abbr)
                        } else {
                            throw "Please define hookdModeNew function"
                        }
                    }
                } else {
                    SAPUI.MessageBoxError("Select infotype!")
                }
            })
    
            btnChgO.attachPress(function (oEvent) {
                if (typeof controller.hooksModeChange == 'function') {
                    var dlgDspAll = SAPUI.GetCore(elId + 'dlgDspAll')
    
                    window.sessionStorage.removeItem("PA30_trxMode")
                    window.sessionStorage.setItem("PA30_trxMode", "PA30_change")
                    // var index = SAPUI.GetCore(elId + "tblOverview").getSelectedIndex()
    
                    var tblOverview = SAPUI.GetCore(elId + "tblOverview")
                    var index = tblOverview.getSelectedIndex()
                    var idxs = tblOverview.getSelectedIndices();
    
                    var arrIndexTemp = tblOverview.getBinding("rows").aIndices;
                    var index = arrIndexTemp[tblOverview.getSelectedIndex()]
    
                    if (idxs.length != 1) {
                        SAPUI.MessageBoxError("Choose 1 data!")
                    } else {
                        var valid = cekStatusOvertime()
                        if (valid) {
                            dlgDspAll.close()
                            controller.hooksModeChange(oThis.abbr, oThis.listResult[1][index])
                        }
    
                        function cekStatusOvertime() { // khusus TM
                            // PENGECEKAN khusus TM - Overtime
                            if (oThis.abbr == 'OT') {
                                if (oThis.listResult[1][index].Status != "Op") {
                                    SAPUI.MessageBoxError("Oops sorry, approved/rejected/canceled data can't be change")
                                    return false
                                }
                            }
                            return true
                        }
                    }
    
                } else {
                    throw "Please define hooksModeChange function"
                }
            })
            btnChg.attachPress(function (oEvent) {
                window.sessionStorage.removeItem("PA30_trxMode")
                window.sessionStorage.setItem("PA30_trxMode", "PA30_change")
                SAPUI.reRenderButton(elId)
                controller.onLoadData(JSON.parse(window.sessionStorage.getItem("PA30_ListDsp")))
            })
            btnDel.attachPress(function (oEvent) {
                var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
    
                var itbPrimary = SAPUI.GetCore(elId + "itbPrimary")
                var activeTab = itbPrimary.getSelectedKey().split('--')[1]
    
                if (checkPersNo()) {
                    if (checkActive(activeTab)) {
                        var context = oThis.tblIndex.getContextByIndex(oThis.index)
    
                        // Reset State
                        // SAPUI.GetCore(elId + "mtxMain").destroyRows()
    
                        if (typeof controller.hooksModeDelete == 'function') {
                            controller.hooksModeDelete(context.getObject())
                        } else {
                            throw "Please define hooksModeDelete function"
                        }
                    } else {
                        SAPUI.MessageBoxError("Select infotype!")
                    }
                }
            })
            btnOverview.attachPress(function (oEvent) {
                var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
    
                lblDateSt.setVisible(false)
                txfDateSt.setVisible(false)
                lblDateTo.setVisible(false)
                txfDateTo.setVisible(false)
    
                var itbPrimary = SAPUI.GetCore(elId + "itbPrimary")
                var activeTab = itbPrimary.getSelectedKey().split('--')[1]
                if (checkPersNo()) {
                    if (checkActive(activeTab)) {
                        var context = oThis.tblIndex.getContextByIndex(oThis.index)
    
                        oThis.abbr = controller.getAbbr(context.getObject())
    
                        oThis.SPDsp = controller.getSPDspAll(oThis.abbr)
    
                        var objParamDisplayAll,
                            WS_url = WS_PA30 + 'WS_PA30'
    
                        if ((oThis.abbr == 'LT') || (oThis.abbr == 'LQT') ||
                            (oThis.abbr == 'OT') || (oThis.abbr == 'PWTC')
                        ) {
    
                            lblDateSt.setVisible(true)
                            txfDateSt.setVisible(true)
                            lblDateTo.setVisible(true)
                            txfDateTo.setVisible(true)
    
                            WS_url = WS_TM + 'WS_TM_PA30'
    
                            // var date = new Date()
                            // var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                            // console.log(today)
    
                            var date = new Date()
                            var monthFixed = date.getMonth() + 1,
                                dayFixed = date.getDate(),
                                today = ''
    
                            if (monthFixed < 10) {
                                monthFixed = '0' + monthFixed
                            }
                            if (dayFixed < 10) {
                                dayFixed = '0' + dayFixed
                            }
    
                            today = date.getFullYear() + '-' + monthFixed + '-' + dayFixed
    
                            if (oThis.abbr == 'PWTC') {
                                objParamDisplayAll = {
                                    Persno: res_PA30[0][0]["PersonnelNumber"],
                                    // StartDate: today, //'2019-01-12', //'2019-07-09', should be today
                                    // EndDate: today //'2021-01-12' //'2019-07-09', should be today
                                }
                            } else {
                                objParamDisplayAll = {
                                    Persno: res_PA30[0][0]["PersonnelNumber"],
                                    StartDate: today, //'2019-01-12', //'2019-07-09', should be today
                                    EndDate: today //'2021-01-12' //'2019-07-09', should be today
                                }
                            }
    
                            oThis.listResult = promiseApi({
                                url: WS_url,
                                method: oThis.SPDsp,
                                body: objParamDisplayAll
                            })
    
                            console.log(oThis.listResult)
                        } else {
                            objParamDisplayAll = {
                                Persno: res_PA30[0][0]["PersonnelNumber"],
                            }
    
                            oThis.listResult = promiseApi({
                                url: WS_url,
                                method: oThis.SPDsp,
                                body: objParamDisplayAll
                            })
    
                            console.log(oThis.listResult)
                        }
    
                        var mtxBtnO = SAPUI.GetCore(elId + 'mtxBtnO')
    
                        if (oThis.listResult[1].length > 0) {
                            mtxBtnO.setVisible(true)
                        } else {
                            mtxBtnO.setVisible(false)
                        }
    
                        openDspInfotypeDlg(oThis.listResult)
                    } else {
                        SAPUI.MessageBoxError("Select infotype!")
                    }
                }
            })
    
            btnSave.attachPress(function (oEvent) {
    
                var WS_url = ''
                var WS_sp = ''
                var mode = window.sessionStorage.getItem("PA30_trxMode")
    
                var validateData = controller.validateData()
                console.log(validateData)
    
                var validatedElements = validateData.elements
    
                for (let i = 0; i < validatedElements.length; i++) {
                    if (validatedElements[i].valid) {
                        validatedElements[i].el.setValueState(sap.ui.core.ValueState.None)
                        validatedElements[i].el.setValueStateText('')
                    } else {
                        validatedElements[i].el.setValueState(sap.ui.core.ValueState.Error)
                        validatedElements[i].el.setValueStateText('')
                    }
                }
    
                if (validateData.valid) {
                    //mengecek apakah transaksi personnel number baru atau bukan
    
                    if (SAPUI.GetCore(elId + 'txfAT')) {
                        var valtxfAT = SAPUI.GetCore(elId + 'txfAT').getValue()
    
                        window.sessionStorage.setItem("PA30_Hire", valtxfAT == '01' ? 'true' : 'false')
                        window.sessionStorage.setItem("PA30_Error", 'false')
                    }
    
                    switch (SAPUI.getRouteName()) {
                        case 'PA30_AB':
                            oThis.abbr = 'AB'
                            break;
                        case 'PA30_OA':
                            oThis.abbr = 'OAB'
                            break;
                        case 'PA30_PD':
                            oThis.abbr = 'PDB'
                            break;
                        case 'PA30_AdB':
                            oThis.abbr = 'AdB'
                            break;
                        case 'PA30_FMB':
                            oThis.abbr = 'FMB'
                            break;
                        case 'PA30_EP':
                            oThis.abbr = 'EP'
                            break;
                        case 'PA30_EI':
                            oThis.abbr = 'EI'
                            break;
                        case 'PA30_JN':
                            oThis.abbr = 'JN'
                            break;
                        case 'PA30_NPWP':
                            oThis.abbr = 'NPWP'
                            break;
                        case 'PA30_BPJS':
                            oThis.abbr = 'BPJS'
                            break;
                        case 'PA30_BD':
                            oThis.abbr = 'BDB'
                            break;
                        case 'PA30_IN':
                            oThis.abbr = 'IN'
                            break;
                        default:
                            break;
                    }
    
                    if (txfDateTo.getValue() < txfDateSt.getValue()) {
                        window.alert("End Date is bigger than Start Date");
                        throw "Input tanggal salah";
                    }
    
                    if (
                        oThis.abbr == 'AB' || oThis.abbr == 'PDB' ||
                        oThis.abbr == 'OAB' || oThis.abbr == 'FMB' ||
                        oThis.abbr == 'AdB' || oThis.abbr == 'IDC' ||
                        oThis.abbr == 'JN' || oThis.abbr == 'EP' ||
                        oThis.abbr == 'SP' || oThis.abbr == 'NPWP' ||
                        oThis.abbr == 'BPJS' || oThis.abbr == 'BDB' ||
                        oThis.abbr == 'EI' || oThis.abbr == 'IN'
                    ) {
                        WS_url = WS_WM + 'WS_PA30'
                    } else if (
                        oThis.abbr == 'OAC' || oThis.abbr == 'PDC' ||
                        oThis.abbr == 'IDC' || oThis.abbr == 'PWTC'
                    ) {
                        WS_url = WS_TM + "WS_TM_PA30"
                    }
                    //tambahkan untuk modul lainnya
    
                    switch (oThis.abbr) {
                        case 'AB':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeAction'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateAction'
                            }
                            break;
                        case 'PDB':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangePersonalData'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreatePersonalData'
                            }
                            break;
                        case 'AdB':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeAddress'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateAddress'
                            }
                            break;
                        case 'OAB':
                            // if (mode == 'PA30_change') {
                            WS_sp = 'ChangeOrgAssignment'
                            // } else if (mode == 'PA30_new') {
                            //     WS_sp = 'CreateOrgAssignment'
                            // }
                            break;
                        case 'FMB':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeFamily'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateFamily'
                            }
                            break;
                        case 'EP':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeEducation'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateEducation'
                            }
                            break;
                        case 'EI':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeEducation'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateEducation'
                            }
                            break;
                        case 'JN':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeJamsostek'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateJamsostek'
                            }
                            break;
                        case 'NPWP':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeNPWP'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateNPWP'
                            }
                            break;
                        case 'BPJS':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeBPJS'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateBPJS'
                            }
                            break;
                        case 'BDB':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeBank'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateBank'
                            }
                            break;
                        case 'IN':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeInsurance'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateInsurance'
                            }
                            break;
                        case 'IDC':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChangeInterData'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'CreateInterData'
                            }
                            break;
                        case 'PWTC':
                            if (mode == 'PA30_change') {
                                WS_sp = 'ChgPersonnelWorkSchedule'
                            } else if (mode == 'PA30_new') {
                                WS_sp = 'VldPersonnelWorkSchedule'
                            }
                            break;
                        default:
                            break;
                    }
    
                    if (typeof controller.onCustomSave == 'function') {
                        controller.onCustomSave().then(res => {
                            if (res) {
                                dspAfterSave(res, WS_url)
                            }
                        })
                    } else {
                        param = controller.getParam(oThis.abbr)
                        res = promiseApi({
                            url: WS_url,
                            method: WS_sp,
                            body: param
                        })
    
                        console.log(res)
    
                        var prevHistory = JSON.parse(window.sessionStorage["sess-history"])
    
                        //Saat Create Infotype Action
    
                        if ((oThis.abbr == 'AB') && (valtxfAT) && res[0][0].ViewType != 'E' && mode == 'PA30_new') {
                            window.sessionStorage.setItem("PA30_Error", 'false')
    
                            var Persnum
    
                            if (res.length > 1) {
                                Persnum = res[1][0].PersonnelNumber
                            } else {
                                Persnum = param.PersonnelNumber
                            }
    
                            res_ChData = promiseApi({
                                url: WS_PA30 + "WS_PA30",
                                method: "CheckPersno",
                                body: {
                                    Persno: Persnum
                                }
                            })
    
                            console.log(res_ChData)
    
                            //Agar start Date disetiap Infotype mempuanyai tanggal yang sama dengan Infotype Action
                            if (!res_ChData[0][0].StartDate) {
                                res_ChData[0][0]["StartDate"] = txfDateSt.getValue()
                            }
    
                            window.sessionStorage.removeItem("PA30_ChData")
                            window.sessionStorage.setItem("PA30_ChData", "")
                            window.sessionStorage.setItem("PA30_ChData", JSON.stringify(res_ChData))
    
                            window.sessionStorage.setItem("PA30_PersNo", Persnum)
    
                            //Validasi ada position atau tidak
                            if (SAPUI.GetCore(elId + 'vhfPosDesc').getValue() == '') {
                                result = ({
                                    Desc: "Personnel Number " + Persnum + " has been created",
                                    idMessage: "I00030",
                                    ViewType: "I"
                                })
    
                                console.log(result)
    
                                window.sessionStorage.removeItem("PA30_trxMode")
                                window.sessionStorage.setItem("PA30_trxMode", "PA30_new")
    
                                SAPUI.DialogErrMessage(result, "PA30_PD")
    
                            } else {
                                // paramOA = controller.getParamOA(oThis.abbr)
                                // res_OA = promiseApi({
                                //     url: WS_url,
                                //     method: 'CreateOrgAssignment',
                                //     body: paramOA
                                // })
    
                                // console.log(res_OA)
    
                                // if (res_OA.length > 0) {
                                //     if (res_OA[0][0].ViewType == 'E') {
                                //         SAPUI.DialogErrMessage(res_OA[0][0])
                                //     } else if ((res_OA[0][0].ViewType == 'I')) {
                                        var result
    
                                        if (valtxfAT == 'ZCG' || valtxfAT == '02' || valtxfAT == 'ID' || valtxfAT == 'K4' || valtxfAT == 'TD') {
                                            result = ({
                                                Desc: "Personnel Number " + Persnum + " data has been updated",
                                                idMessage: "I00030",
                                                ViewType: "I"
                                            })
                                        } else if (valtxfAT == '10') {
                                            result = res[0][0]
    
                                            // if (result.ViewType == 'E'){
                                            //     SAPUI.DialogErrMessage(res[0][0])
                                            //     dspAfterSave(res, WS_url)
                                            //     throw "done"
                                            // }
                                        } else {
                                            result = ({
                                                Desc: "Personnel Number " + Persnum + " has been created",
                                                idMessage: "I00030",
                                                ViewType: "I"
                                            })
                                        }
    
                                        console.log(result)
    
                                        window.sessionStorage.removeItem("PA30_trxMode")
                                        window.sessionStorage.setItem("PA30_trxMode", "PA30_new")
    
                                        var objParamChange = {
                                            Persno: Persnum,
                                            StartDate: '',
                                            EndDate: '',
                                        }
    
                                        res_Dsp = promiseApi({
                                            url: WS_url,
                                            method: 'DisplayOrgAssignment',
                                            body: objParamChange
                                        })
    
                                        console.log(res_Dsp)
    
                                        // window.sessionStorage.removeItem("PA30_trxMode")
                                        // window.sessionStorage.setItem("PA30_trxMode", "PA30_change")
    
                                        window.sessionStorage.removeItem("PA30_ListDsp")
                                        window.sessionStorage.setItem("PA30_ListDsp", JSON.stringify(res_Dsp[0][0]))
    
                                        SAPUI.DialogErrMessage(result, "PA30_OA")
                                    // }
                                // } else {
                                //     result = ({
                                //         Desc: "Error by system, the page will be redirected to PA30 home screen",
                                //         idMessage: "E00030",
                                //         ViewType: "E"
                                //     })
    
                                //     window.sessionStorage.removeItem("PA30_trxMode")
                                //     SAPUI.reRenderButton(elId)
                                //     SAPUI.DialogErrMessage(result, "PA30_01", "", "", true)
                                // }
                            }
    
                        } else if (window.sessionStorage.getItem("PA30_PersNo") && (res[0][0].ViewType == 'I') && mode == 'PA30_new' && window.sessionStorage.getItem("PA30_Hire") == 'true') {
                            window.sessionStorage.setItem("PA30_Error", 'false')
    
                            window.sessionStorage.removeItem("PA30_trxMode")
                            window.sessionStorage.setItem("PA30_trxMode", "PA30_new")
    
                            var result = ({
                                Desc: "Data of personnel number " + JSON.parse(window.sessionStorage.getItem("PA30_PersNo")) + " has been saved",
                                idMessage: "I00030",
                                ViewType: "I",
                            })
    
                            switch (oThis.abbr) {
                                case 'OAB':
                                    SAPUI.DialogErrMessage(result, "PA30_PD")
                                    break;
                                case 'PDB':
                                    res_ChData = promiseApi({
                                        url: WS_PA30 + "WS_PA30",
                                        method: "CheckPersno",
                                        body: {
                                            Persno: JSON.parse(window.sessionStorage.getItem("PA30_PersNo"))
                                        }
                                    })
    
                                    //Agar start Date disetiap Infotype mempuanyai tanggal yang sama dengan Infotype Action
                                    if (!res_ChData[0][0].StartDate) {
                                        res_ChData[0][0]["StartDate"] = txfDateSt.getValue()
                                    }
    
                                    console.log(res_ChData)
                                    window.sessionStorage.removeItem("PA30_ChData")
                                    window.sessionStorage.setItem("PA30_ChData", "")
                                    window.sessionStorage.setItem("PA30_ChData", JSON.stringify(res_ChData))
    
                                    SAPUI.DialogErrMessage(result, "PA30_AdB")
                                    break;
                                case 'AdB':
                                    SAPUI.DialogErrMessage(result, "PA30_FMB")
                                    break;
                                case 'FMB':
                                    SAPUI.DialogErrMessage(result, "PA30_EP")
                                    break;
                                case 'EP':
                                    var dlgEduFormal = new sap.m.Dialog({
                                        id: elId + "dlgEduFormal",
                                        // title: 'Hire Applicant'
                                    })
                                    dlgEduFormal.setContentWidth("20%")
                            
                                    var mtxPnl = SAPUI.Matrix(elId + "mtxPnl", "100%", false, ['5%', '100%'], 2)
                            
                                    var lblPnl = SAPUI.Label(elId + "lblPnl", "Do you want to fill Education Informal data ?")
                            
                                    mtxPnl.createRow("", lblPnl)
                            
                                    var btnEduFormal = SAPUI.ButtonToolbar(elId + "btnEduFormal", "Yes", "Fill Education Informal Data", "", "Emphasized")
                                    var btnEduSkip = SAPUI.ButtonToolbar(elId + "btnEduSkip", "Maybe Later", "Fill Education Informal Data Later", "")
                            
                                    dlgEduFormal.addButton(btnEduFormal)
                                    dlgEduFormal.addButton(btnEduSkip)
                            
                                    dlgEduFormal.addContent(mtxPnl)
    
                                    dlgEduFormal.open()
    
                                    btnEduFormal.attachPress(function() {
                                        dlgEduFormal.close()
                                        SAPUI.DialogErrMessage(result, "PA30_EI")
                                    })
    
                                    btnEduSkip.attachPress(function() {
                                        dlgEduFormal.close()
                                        SAPUI.DialogErrMessage(result, "PA30_JN")
                                    })
    
                                    break;
                                case 'EI':
                                    SAPUI.DialogErrMessage(result, "PA30_JN")
                                    break;
                                case 'JN':
                                    SAPUI.DialogErrMessage(result, "PA30_NPWP")
                                    break;
                                case 'NPWP':
                                    SAPUI.DialogErrMessage(result, "PA30_BPJS")
                                    break;
                                case 'BPJS':
                                    SAPUI.DialogErrMessage(result, "PA30_BD")
                                    break;
                                    break;
                                case 'BDB':
                                    SAPUI.DialogErrMessage(result, "PA30_IN")
                                    break;
                                case 'IN':
                                    window.sessionStorage.removeItem("PA30_trxMode")
                                    SAPUI.reRenderButton(elId)
                                    SAPUI.DialogErrMessage(result, "PA30_01")
                                    break;
                                default:
                                    break;
                            }
                        } else if (window.sessionStorage.getItem("PA30_Hire") == 'false' && window.sessionStorage.getItem("tcode_now") == "PA30_OA" && res[0][0].ViewType == 'I') {
                            window.sessionStorage.removeItem("PA30_trxMode")
                            window.sessionStorage.setItem("PA30_trxMode", "")
                            SAPUI.reRenderButton(elId)
                            SAPUI.DialogErrMessage(res[0][0], "PA30_01")
                        } else {
                            SAPUI.DialogErrMessage(res[0][0])
                            dspAfterSave(res, WS_url)
                        }
                    }
                }
    
                function dspAfterSave(res, WS_url) {
                    if (res[0][0].ViewType == 'I') {
                        window.sessionStorage.setItem("PA30_Error", 'false')
    
                        var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
                        var res_Dsp = ''
                        if (window.sessionStorage.getItem("PA30_ListDsp")) {
                            res_Dsp = JSON.parse(window.sessionStorage.getItem("PA30_ListDsp"))
                        } else {
                            res_Dsp = param
                        }
                        var constroller_PA30_01 = sap.ui.controller("hrdweb.PA30.PA30_01")
    
                        oThis.SPDsp = constroller_PA30_01.getSPDsp(oThis.abbr)
    
                        var objParamDisplay = {
                            Persno: res_PA30[0][0]["PersonnelNumber"],
                            StartDate: res_Dsp["StartDate"].split("T")[0],
                            EndDate: res_Dsp["EndDate"].split("T")[0],
                        }
    
                        res = promiseApi({
                            url: WS_url,
                            method: oThis.SPDsp,
                            body: objParamDisplay
                        })
    
                        console.log(res)
                        // set mode Display
                        window.sessionStorage.removeItem("PA30_trxMode")
                        window.sessionStorage.setItem("PA30_trxMode", "PA30_display")
    
                        window.sessionStorage.removeItem("PA30_ListDsp")
                        window.sessionStorage.setItem("PA30_ListDsp", JSON.stringify(res[0][0]))
    
                        SAPUI.reRenderButton(elId)
    
                        controller.onLoadData(res[0][0])
                    } else {
                        window.sessionStorage.setItem("PA30_Error", 'true')
                    }
                }
            })
    
            btnDisp.attachPress(function (oEvent) {
                var WS_url = ''
                var WS_sp = ''
                var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
    
                var itbPrimary = SAPUI.GetCore(elId + "itbPrimary")
                if (itbPrimary) {
                    var activeTab = itbPrimary.getSelectedKey().split('--')[1]
    
                    if (checkActive(activeTab)) {
                        var context = oThis.tblIndex.getContextByIndex(oThis.index)
                        oThis.abbr = controller.getAbbr(context.getObject())
    
                        // set WS_Url
                        if (
                            oThis.abbr == 'AB' || oThis.abbr == 'PDB' ||
                            oThis.abbr == 'OAB' || oThis.abbr == 'FMB' ||
                            oThis.abbr == 'AdB' || oThis.abbr == 'IDC' ||
                            oThis.abbr == 'JN' || oThis.abbr == 'EP' ||
                            oThis.abbr == 'SP' || oThis.abbr == 'NPWP' ||
                            oThis.abbr == 'BPJS' || oThis.abbr == 'BDB' ||
                            oThis.abbr == 'EI' || oThis.abbr == 'IN'
                        ) {
                            WS_url = WS_WM + 'WS_PA30'
                        } else if (
                            // TIME DATA
                            // 'Leaves': 'LT',
                            // 'Attendances': 'AT',
                            // 'Overtime': 'OT',
                            // 'Leaves Quota': 'LQT',
    
                            oThis.abbr == 'OAC' || oThis.abbr == 'PDC' ||
                            oThis.abbr == 'IDC' || oThis.abbr == 'PWTC' ||
                            // time data
                            oThis.abbr == 'LT' || oThis.abbr == 'AT' ||
                            oThis.abbr == 'OT' || oThis.abbr == 'LQT'
                        ) {
                            WS_url = WS_TM + "WS_TM_PA30"
                        }
                        //tambahkan untuk modeul lainnya
    
                        if (vhfPersonnelNo.getValue() == "") {
                            SAPUI.MessageBoxError("Personnel Number tidak ditemukan. Mohon untuk membuat Personnel Number baru melalui menu Action.")
                        } else {
                            if (typeof controller.hooksModeDisplay == 'function') {
                                oThis.abbr = controller.getAbbr(context.getObject())
                                oThis.SPDsp = controller.getSPDsp(oThis.abbr)
    
                                var objParamDisplay
                                objParamDisplay = {
                                    Persno: res_PA30[0][0]["PersonnelNumber"],
                                    StartDate: '',
                                    EndDate: '',
                                }
    
                                res = promiseApi({
                                    url: WS_url,
                                    method: oThis.SPDsp,
                                    body: objParamDisplay
                                })
    
                                if (res[0][0]) {
                                    if (res[0][0].Column1 == "No Data") {
                                        SAPUI.MessageBoxError("Data Kosong")
                                    } else if (res[0].length > 0) {
                                        // set mode Display
                                        window.sessionStorage.setItem("PA30_trxMode", "PA30_display")
                                        controller.hooksModeDisplay(oThis.abbr, res[0][0])
                                    } else {
                                        SAPUI.MessageBoxError("Data Kosong")
                                    }
                                }else{
                                    SAPUI.MessageBoxError("Data Kosong")
                                }
                            } else {
                                throw "Please define hooksModeDisplay function"
                            }
                        }
                    }
                } else {
                    window.sessionStorage.setItem("PA30_trxMode", "PA30_display")
                    SAPUI.reRenderButton(elId)
                    controller.onLoadData(JSON.parse(window.sessionStorage.getItem("PA30_ListDsp")))
                }
            })
    
            btnDispO.attachPress(function (oEvent) {
                if (typeof controller.hooksModeDisplay == 'function') {
                    var dlgDspAll = SAPUI.GetCore(elId + 'dlgDspAll')
    
                    window.sessionStorage.setItem("PA30_trxMode", "PA30_display")
                    var tblOverview = SAPUI.GetCore(elId + "tblOverview")
                    // var index = tblOverview.getSelectedIndex()
                    var idxs = tblOverview.getSelectedIndices();
    
                    var arrIndexTemp = tblOverview.getBinding("rows").aIndices;
                    var index = arrIndexTemp[tblOverview.getSelectedIndex()]
    
                    if (idxs.length != 1) {
                        SAPUI.MessageBoxError("Choose 1 data!")
                    } else {
                        dlgDspAll.close()
                        controller.hooksModeDisplay(oThis.abbr, oThis.listResult[1][index])
                    }
    
                } else {
                    throw "Please define hooksModeDisplay function"
                }
            })
    
            btnWorkSchedule.attachPress(function (oEvent) {
                if (typeof controller.onPressWorkSchedule == 'function') {
                    controller.onPressWorkSchedule()
                } else {
                    throw "Please define onPressWorkSchedule function"
                }
            })
    
            txfDateSt.attachChange(function (oEvent) {
                onChangeDateLeave()
            });
    
            txfDateTo.attachChange(function (oEvent) {
                onChangeDateLeave();
            });
    
            function onChangeDateLeave() {
                // var oThis = this
                var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
                var tblOverview = SAPUI.GetCore(elId + "tblOverview")
                var tableModel = new sap.ui.model.json.JSONModel();
    
                if ((txfDateSt.getValue() != '') && (txfDateTo.getValue() != '')) {
                    oThis.SPDsp = controller.getSPDspAll(oThis.abbr) //=> KHUSUS LEAVE (LT)
    
                    var objParamDisplay = {
                        Persno: res_PA30[0][0]["PersonnelNumber"],
                        StartDate: txfDateSt.getValue(),
                        EndDate: txfDateTo.getValue()
                    }
    
                    oThis.listResult.length = 0
    
                    oThis.listResult = promiseApi({
                        url: WS_TM + 'WS_TM_PA30',
                        method: oThis.SPDsp,
                        body: objParamDisplay,
                        // sync    : false
                    })
    
                    console.log(oThis.listResult)
                    var mtxBtnO = SAPUI.GetCore(elId + 'mtxBtnO')
    
                    if (oThis.listResult.length > 0) {
                        if (oThis.listResult[1].length > 0) {
    
                            oThis.listResult[1].forEach((row) => {
                                row["StartDate"] = row["StartDate"] != null ? row["StartDate"].split("T")[0] : row["StartDate"]
                                row["EndDate"] = row["EndDate"] != null ? row["EndDate"].split("T")[0] : row["EndDate"]
                            });
    
                            switch (oThis.abbr) {
                                case 'LT':
                                    oThis.listResult[1].forEach((row) => {
                                        // row["StartDate"]   = row["StartDate"] != null ? row["StartDate"].split("T")[0] : row["StartDate"]
                                        // row["EndDate"]     = row["EndDate"] != null ? row["EndDate"].split("T")[0] : row["EndDate"]
                                        row["ChangedOn"] = row["ChangedOn"] != null ? row["ChangedOn"].split("T")[0] : row["ChangedOn"]
                                        row["RequestDate"] = row["RequestDate"] != null ? row["RequestDate"].split("T")[0] : row["RequestDate"]
                                    });
                                    break;
                                case 'OT':
                                    oThis.listResult[1].forEach((row) => {
                                        row["ChangedOn"] = row["ChangedOn"] != null ? row["ChangedOn"].split("T")[0] : row["ChangedOn"]
                                        // row["EndDate"]     = row["EndDate"] != null ? row["EndDate"].split("T")[0] : row["EndDate"]
                                        // row["StartDate"]   = row["StartDate"] != null ? row["StartDate"].split("T")[0] : row["StartDate"]
                                        row["StartTime"] = splitDateTime(row["StartTime"])
                                        row["EndTime"] = splitDateTime(row["EndTime"])
                                        row["StartOfBreak1"] = splitDateTime(row["StartOfBreak1"])
                                        row["StartOfBreak2"] = splitDateTime(row["StartOfBreak2"])
                                        row["StartOfBreak3"] = splitDateTime(row["StartOfBreak3"])
                                        row["StartOfBreak4"] = splitDateTime(row["StartOfBreak4"])
                                        row["EndOfBreak1"] = splitDateTime(row["EndOfBreak1"])
                                        row["EndOfBreak2"] = splitDateTime(row["EndOfBreak2"])
                                        row["EndOfBreak3"] = splitDateTime(row["EndOfBreak3"])
                                        row["EndOfBreak4"] = splitDateTime(row["EndOfBreak4"])
                                    });
                                    break;
                                default:
                                    break;
                            }
    
                            mtxBtnO.setVisible(true)
                        } else {
                            mtxBtnO.setVisible(false)
                        }
                        tableModel.setData({
                            result: oThis.listResult[1]
                        });
                        tblOverview.setModel(tableModel)
                        tblOverview.bindRows("/result");
                    }
                }
            }
    
            function openDspInfotypeDlg(res) {
                var tbl
                var columnsDsp = []
                var datePickerCol = []
    
                var mtxPnl = SAPUI.GetCore(elId + 'mtxPnl')
    
                if (res[0].length > 0) {
                    SAPUI.GetCore(elId + "lblEEgDesc").setText(res[0][0]["NameOfEmployeeGrp"])
                }
                var btnApp = SAPUI.GetCore(elId + 'btnApp')
                var btnRej = SAPUI.GetCore(elId + 'btnRej')
    
                var mxtM1 = SAPUI.GetCore(elId + 'mtxM1')
    
                mtxPnl.getRows()[0].removeCell(3)
                var mtxAdd = new sap.ui.commons.layout.MatrixLayoutCell()
    
                var itbPrimary = SAPUI.GetCore(elId + "itbPrimary")
                var activeTab = itbPrimary.getSelectedKey().split('--')[1]
    
                if (activeTab == 'itfWorkTimes') {
                    SAPUI.GetCore(elId + 'lblDateSt').setVisible(true)
                    SAPUI.GetCore(elId + 'txfDateSt').setVisible(true)
                    SAPUI.GetCore(elId + 'lblDateTo').setVisible(true)
                    SAPUI.GetCore(elId + 'txfDateTo').setVisible(true)
                }
    
                switch (oThis.abbr) {
                    case 'LT': //ganti ke 'LT'
                        //Mengisi kuota cuti untuk infotype Leaves
    
                        var txfCTL = SAPUI.GetCore(elId + 'txfCTL')
                        var txfCTI = SAPUI.GetCore(elId + 'txfCTI')
                        var txfDg = SAPUI.GetCore(elId + 'txfDg')
                        var txfSisa = SAPUI.GetCore(elId + 'txfSisa')
    
                        btnApp.setVisible(true)
                        btnRej.setVisible(true)
    
                        // Masukan kembalian dari SP DisplayAll Leaves
                        // txfCTL.setValue(res[0][0].ZLastRemain)
                        // txfCTI.setValue(res[0][0].ZRemainLeave)
                        // txfDg.setValue(res[0][0].QuotaDeduction)
                        // txfSisa.setValue(res[0][0].QuotaNumber)
                        txfCTL.setValue(res[0][0].ZLastRemain)
                        txfCTI.setValue(res[0][0].QuotaNumber)
                        txfDg.setValue(res[0][0].QuotaDeduction)
                        txfSisa.setValue(res[0][0].ZRemainLeave)
    
                        var mtxLT = SAPUI.GetCore(elId + 'mtxLT')
                        mtxAdd.addContent(mtxLT)
    
                        break;
                    case 'OT':
                        res[1].forEach(row => {
                            row["StartTime"] = splitDateTime(row["StartTime"])
                            row["EndTime"] = splitDateTime(row["EndTime"])
                            row["StartOfBreak1"] = splitDateTime(row["StartOfBreak1"])
                            row["StartOfBreak2"] = splitDateTime(row["StartOfBreak2"])
                            row["StartOfBreak3"] = splitDateTime(row["StartOfBreak3"])
                            row["StartOfBreak4"] = splitDateTime(row["StartOfBreak4"])
                            row["EndOfBreak1"] = splitDateTime(row["EndOfBreak1"])
                            row["EndOfBreak2"] = splitDateTime(row["EndOfBreak2"])
                            row["EndOfBreak3"] = splitDateTime(row["EndOfBreak3"])
                            row["EndOfBreak4"] = splitDateTime(row["EndOfBreak4"])
                        })
                        btnApp.setVisible(true)
                        btnRej.setVisible(true)
    
                        break;
                    case 'LQT':
                        SAPUI.GetCore(elId + 'btnChgO').setVisible(false)
                        SAPUI.GetCore(elId + 'btnDispO').setVisible(false)
                        break;
                    case 'PWTC':
                        SAPUI.GetCore(elId + 'btnChgO').setVisible(false)
                        // SAPUI.GetCore(elId + 'btnDispO').setVisible(false)
                        // SAPUI.GetCore(elId + 'mtxBtnO').setVisible(false)
                        break;
                    default:
                        var btnApp = SAPUI.GetCore(elId + 'btnApp').setVisible(false)
                        var btnRej = SAPUI.GetCore(elId + 'btnRej').setVisible(false)
                        break;
                }
    
                // event btn approve
                btnApp.attachPress(function (oEvent) {
                    var tblOverview = SAPUI.GetCore(elId + "tblOverview")
                    // var index = tblOverview.getSelectedIndex()
                    var idxs = tblOverview.getSelectedIndices();
    
                    var arrIndexTemp = tblOverview.getBinding("rows").aIndices;
                    var index = arrIndexTemp[tblOverview.getSelectedIndex()]
    
                    if (idxs.length != 1) {
                        SAPUI.MessageBoxError("Choose 1 data!")
                    } else {
                        // dlgDspAll.close()
                        doLeaveActions(oThis.abbr, 'approve', oThis.listResult[1][index]);
                        // controller.hooksModeDisplay(oThis.abbr, oThis.listResult[1][index])
                    }
                })
    
                // event btn cancel
                btnRej.attachPress(function (oEvent) {
                    var tblOverview = SAPUI.GetCore(elId + "tblOverview")
                    var idxs = tblOverview.getSelectedIndices();
    
                    var arrIndexTemp = tblOverview.getBinding("rows").aIndices;
                    var index = arrIndexTemp[tblOverview.getSelectedIndex()]
    
                    if (idxs.length != 1) {
                        SAPUI.MessageBoxError("Choose 1 data!")
                    } else {
                        doLeaveActions(oThis.abbr, 'cancel', oThis.listResult[1][index]);
                    }
                })
    
                mtxPnl.getRows()[0].addCell(mtxAdd)
    
                //Mengisi table displayAll untuk masing-masing infotype
                for (var i = 0; i < res[2].length; i++) {
                    switch (res[2][i]["Type"]) {
                        case "DatePicker":
                            datePickerCol.push(res[2][i]["Bind"])
                            break;
                        default:
                            break;
                    }
                }
    
                res[1].forEach(res => {
                    for (let a = 0; a < datePickerCol.length; a++) {
                        const el = datePickerCol[a];
                        res[el] = res[el] != null ? res[el] != '' ? res[el].split("T")[0] : res[el] : res[el]
                    }
                })
    
                res[2].forEach(el => {
                    columnsDsp.push({
                        Label: el["Label"],
                        Width: el["Width"],
                        Bind: el["Bind"],
                        Editable: "FALSE",
                        Type: el["Type"],
                        Length: el["Length"],
                    })
                });
    
                tbl = SAPUI.TableGenerator({
                    tblid: elId + "tblOverview",
                    columns: columnsDsp,
                    tblprop: {
                        selectionMode: "Single",
                        enableCellFilter: true,
                        visibleRowCount: 5
                    }
                });
    
                SAPUI.GetCore(elId + 'pnlBody').removeAllContent()
                SAPUI.GetCore(elId + 'pnlBody').addContent(tbl)
    
                this.resultModel = new sap.ui.model.json.JSONModel()
                this.resultModel.setData({
                    "result": res[1]
                })
    
                tbl.setModel(this.resultModel)
                tbl.bindRows("/result")
    
                //Memberikan title sesuai masing-masing infotype
                var title = "List of " + controller.getTitle(oThis.abbr)
    
                var dlgDspAll = SAPUI.GetCore(elId + 'dlgDspAll')
                dlgDspAll.setTitle(title)
    
                dlgDspAll.open()
    
                function doLeaveActions(infoType, action, params) {
                    var method = ''
                    if (infoType == 'LT') {
                        if (action == 'approve') {
                            method = 'ApvAbsences'
                        } else if (action == 'cancel') {
                            method = 'CnlAbsences'
                        }
                    } else if (infoType == 'OT') {
                        if (action == 'approve') {
                            method = 'ApvOvertime'
                        } else if (action == 'cancel') {
                            method = 'CnlOvertime'
                        }
                    }
    
                    SAPUI.MessageBoxConfirm("Apakah anda yakin ?", function (oAction) {
                        if (oAction === 'YES') {
                            doPromise(infoType, method, params)
                        }
                    })
    
                    function doPromise(infoType, method, params) {
                        var oThis = this
                        var userApp = window.localStorage.getItem("User")
    
                        var urlService = '',
                            param = ''
                        if (infoType == 'LT') {
                            urlService = WS_TM + "WS_APVA"
                            param = {
                                LeaveNum: params.LeaveNum,
                                Username: userApp
                            }
                        } else if (infoType == 'OT') {
                            urlService = WS_TM + "WS_APVO"
                            var param = {
                                OvertimeNum: params.OvertimeNum,
                                Username: userApp
                            }
                        }
                        console.log(param)
    
                        var result = promiseApi({
                            url: urlService,
                            method: method,
                            body: param,
                            sync: false
                        }).then(res => {
                            console.log(res)
                            if ((res.length > 0) && (res[0].length > 0)) {
                                SAPUI.DialogErrMessage(res[0][0])
                                reBindTable(infoType);
                            }
                        })
                    }
    
                    function reBindTable(infoType) {
                        var res_PA30 = JSON.parse(window.sessionStorage.getItem("PA30_ChData"))
    
                        var tblOverview = SAPUI.GetCore(elId + 'tblOverview')
                        var resultModel = new sap.ui.model.json.JSONModel()
    
                        // var date = new Date()
                        // var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                        // console.log(today)
    
                        var date = new Date()
                        var monthFixed = date.getMonth() + 1,
                            dayFixed = date.getDate(),
                            today = ''
    
                        if (monthFixed < 10) {
                            monthFixed = '0' + monthFixed
                        }
                        if (dayFixed < 10) {
                            dayFixed = '0' + dayFixed
                        }
    
                        today = date.getFullYear() + '-' + monthFixed + '-' + dayFixed
    
                        var method = ''
                        if (infoType == 'LT') {
                            method = 'DspAllOfAbsences'
                        } else if (infoType == 'OT') {
                            method = 'DspAllOfOvertime'
                        }
    
                        // param startDate endDate
                        var stDate = '',
                            edDate = ''
                        if (txfDateSt.getValue() != '') {
                            stDate = txfDateSt.getValue()
                        } else {
                            stDate = today
                        }
    
                        if (txfDateTo.getValue() != '') {
                            edDate = txfDateTo.getValue()
                        } else {
                            edDate = today
                        }
    
                        var objParamDisplayAll = {
                            Persno: res_PA30[0][0]["PersonnelNumber"],
                            StartDate: stDate, //'2019-07-09', // change to today
                            EndDate: edDate //'2019-07-09', // change to today
                        }
    
                        var resReBind = promiseApi({
                            url: WS_TM + 'WS_TM_PA30',
                            method: method,
                            body: objParamDisplayAll,
                            sync: false
                        }).then(resReBind => {
                            console.log(resReBind)
                            var mtxBtnO = SAPUI.GetCore(elId + 'mtxBtnO')
    
                            if (resReBind.length > 0) {
                                if (resReBind[1].length > 0) {
                                    if (infoType == 'LT') {
                                        resReBind[1].forEach((row) => {
                                            row["ChangedOn"] = row["ChangedOn"] != null ? row["ChangedOn"].split("T")[0] : row["ChangedOn"]
                                            row["EndDate"] = row["EndDate"] != null ? row["EndDate"].split("T")[0] : row["EndDate"]
                                            row["RequestDate"] = row["RequestDate"] != null ? row["RequestDate"].split("T")[0] : row["RequestDate"]
                                            row["StartDate"] = row["StartDate"] != null ? row["StartDate"].split("T")[0] : row["StartDate"]
                                        })
                                    } else if (infoType == 'OT') {
                                        resReBind[1].forEach((row) => {
                                            row["ChangedOn"] = row["ChangedOn"] != null ? row["ChangedOn"].split("T")[0] : row["ChangedOn"]
                                            row["StartDate"] = row["StartDate"] != null ? row["StartDate"].split("T")[0] : row["StartDate"]
                                            row["EndDate"] = row["EndDate"] != null ? row["EndDate"].split("T")[0] : row["EndDate"]
    
                                            row["StartTime"] = splitDateTime(row["StartTime"])
                                            row["EndTime"] = splitDateTime(row["EndTime"])
                                            row["StartOfBreak1"] = splitDateTime(row["StartOfBreak1"])
                                            row["StartOfBreak2"] = splitDateTime(row["StartOfBreak2"])
                                            row["StartOfBreak3"] = splitDateTime(row["StartOfBreak3"])
                                            row["StartOfBreak4"] = splitDateTime(row["StartOfBreak4"])
                                            row["EndOfBreak1"] = splitDateTime(row["EndOfBreak1"])
                                            row["EndOfBreak2"] = splitDateTime(row["EndOfBreak2"])
                                            row["EndOfBreak3"] = splitDateTime(row["EndOfBreak3"])
                                            row["EndOfBreak4"] = splitDateTime(row["EndOfBreak4"])
                                        });
                                    }
                                    mtxBtnO.setVisible(true)
                                } else {
                                    mtxBtnO.setVisible(false)
                                }
    
                                resultModel.setData({
                                    "result": resReBind[1]
                                })
    
                                tblOverview.setModel(resultModel)
                                tblOverview.bindRows("/result")
    
                            } else {
                                SAPUI.MessageBoxError("Error from Backend")
                            }
                        })
                    }
                }
            }
    
            function splitDateTime(dateTime) {
                if ((dateTime != null) && (dateTime != '')) {
                    var element = dateTime.split("T")
                    var splitDate = element[0].split("-")
    
                    var value = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0] +
                        " " + element[1]
                    return value
                } else {
                    return dateTime
                }
            }
    
            function checkActive(activeTab) {
                var checkActive_result = true
    
                var tblCEmpInfo = SAPUI.GetCore(elId + "tblCEmpInfo")
                var tblEmpConData = SAPUI.GetCore(elId + "tblEmpConData")
                var tblGrossNetPY = SAPUI.GetCore(elId + "tblGrossNetPY")
                var tblNetPY = SAPUI.GetCore(elId + "tblNetPY")
                var tblPYSuppl = SAPUI.GetCore(elId + "tblPYSuppl")
                var tblPlanData = SAPUI.GetCore(elId + "tblPlanData")
                var tblWorkTimes = SAPUI.GetCore(elId + "tblWorkTimes")
    
                var inCEmpInfo = tblCEmpInfo.getSelectedIndices()
                var inEmpConData = tblEmpConData.getSelectedIndices()
                var inGrossNetPY = tblGrossNetPY.getSelectedIndices()
                var inNetPY = tblNetPY.getSelectedIndices()
                var inPYSuppl = tblPYSuppl.getSelectedIndices()
                var inPlanData = tblPlanData.getSelectedIndices()
                var inWorkTimes = tblWorkTimes.getSelectedIndices()
    
                switch (activeTab) {
                    case 'itfCEmpInfo':
                        if (inCEmpInfo.length > 0) {
                            oThis.index = inCEmpInfo[0];
                            oThis.tblIndex = tblCEmpInfo
                        } else {
                            checkActive_result = false
                        }
                        break;
                    case 'itfEmpConData':
                        if (inEmpConData.length > 0) {
                            oThis.index = inEmpConData[0];
                            oThis.tblIndex = tblEmpConData
                        } else {
                            checkActive_result = false
                        }
                        break;
                    case 'itfGrossNetPY':
                        if (inGrossNetPY.length > 0) {
                            oThis.index = inGrossNetPY[0];
                            oThis.tblIndex = tblGrossNetPY
                        } else {
                            checkActive_result = false
                        }
                        break;
                    case 'itfNetPY':
                        if (inNetPY.length > 0) {
                            oThis.index = inNetPY[0];
                            oThis.tblIndex = tblNetPY
                        } else {
                            checkActive_result = false
                        }
                        break;
                    case 'itfPYSuppl':
                        if (inPYSuppl.length > 0) {
                            oThis.index = inPYSuppl[0];
                            oThis.tblIndex = tblPYSuppl
                        } else {
                            checkActive_result = false
                        }
                        break;
                    case 'itfPlanData':
                        if (inPlanData.length > 0) {
                            oThis.index = inPlanData[0];
                            oThis.tblIndex = tblPlanData
                        } else {
                            checkActive_result = false
                        }
                        break;
                    case 'itfWorkTimes':
                        if (inWorkTimes.length > 0) {
                            oThis.index = inWorkTimes[0];
                            oThis.tblIndex = tblWorkTimes
                        } else {
                            checkActive_result = false
                        }
                        break;
                    default:
                        SAPUI.MessageBoxWarning("Choose the other to Create/Change/Delete")
                        break;
                }
    
                return checkActive_result
            }
    
            function checkPersNo() {
                var res = true
                var vhfPersonnelNo = SAPUI.GetCore(elId + "vhfPersonnelNo")
                if (vhfPersonnelNo.getValue() == "") {
                    res = false
                    SAPUI.MessageBoxError("Fill Personnel Number!")
                }
                return res
            }
    
            if (res != null) {
                vhfPersonnelNo.setEditable(false).setValue(res[0][0]["PersonnelNumber"])
                txfName.setEditable(false).setValue(res[0][0]["FullName"]).setTooltip(res[0][0]["FullName"])
                txfEESg.setEditable(false).setValue(res[0][0]["NameOfEmpAssignment"])
                txfEEg.setEditable(false).setValue(res[0][0]["NameOfEmpStatus"])
                txfPersArea.setEditable(false).setValue(res[0][0]["PersonnelAreaText"])
                txfPos.setEditable(false).setValue(res[0][0]["NameOfPosition"])
                txfGrade.setEditable(false).setValue(res[0][0]["Grade"])
                txfDept.setEditable(false).setValue(res[0][0]["Department"])
    
                console.log(SAPUI.getRouteName())
                if (SAPUI.getRouteName() == "PA30_01") {
                    vhfPersonnelNo.setEditable(true)
                } else {
                    vhfPersonnelNo.setEditable(false)
                }
            }
    
            return shell
        },
    
        reRenderButton: function (elId) {
            var cekMode = function (params) {
                return window.sessionStorage.getItem("PA30_trxMode")
            }
    
            btnSave = SAPUI.GetCore(elId + 'btnSave')
            btnDisp = SAPUI.GetCore(elId + 'btnDisp')
            btnChg = SAPUI.GetCore(elId + 'btnChg')
            btnChgO = SAPUI.GetCore(elId + 'btnChgO')
            btnOverview = SAPUI.GetCore(elId + 'btnOverview')
            btnWorkSchedule = SAPUI.GetCore(elId + 'btnWorkSchedule')
            btnNew = SAPUI.GetCore(elId + 'btnNew')
    
            if ((cekMode() == null) || (cekMode() == "")) {
                btnSave.setVisible(false)
                btnDisp.setVisible(true)
                btnChg.setVisible(false)
                btnOverview.setVisible(true)
                btnWorkSchedule.setVisible(false)
    
                if (window.sessionStorage.getItem("PA30_Status") == 'Not Active') {
                    btnNew.setVisible(false)
                } else {
                    btnNew.setVisible(true)
                }
            } else if ((cekMode() == "PA30_new")) {
                btnSave.setVisible(true)
                btnNew.setVisible(false)
                btnDisp.setVisible(false)
                btnChg.setVisible(false)
                btnOverview.setVisible(false)
                btnWorkSchedule.setVisible(false)
            } else if (cekMode() == "PA30_change") {
                btnSave.setVisible(true)
                btnNew.setVisible(false)
                btnDisp.setVisible(true)
                btnChg.setVisible(false)
                btnOverview.setVisible(false)
                btnWorkSchedule.setVisible(false)
            } else if (cekMode() == "PA30_display") {
                btnSave.setVisible(false)
                btnNew.setVisible(false)
                btnDisp.setVisible(false)
                btnChg.setVisible(true)
                btnOverview.setVisible(false)
                btnWorkSchedule.setVisible(false)
    
                if (window.sessionStorage.getItem("PA30_Status") == 'Not Active') {
                    btnChgO.setVisible(false)
                } else {
                    btnChgO.setVisible(true)
                }
            } else {
                btnSave.setVisible(false)
                btnNew.setVisible(true)
                btnDisp.setVisible(true)
                btnChg.setVisible(false)
                btnOverview.setVisible(true)
                btnWorkSchedule.setVisible(false)
            }
        },
        /**
         * @param  {} param
         * @param.tblid
         * @param.tblprop
         * @param.columns
         * @param.F4BindList
         * @param  {} fnChangeCallback
         * Factory Pattern
         */
        TableGenerator: function (param, fnChangeCallback) {
            const {
                tblid,
                tblprop,
                columns,
                F4BindList
            } = param
    
            // Default table properties
            prop = {
                // autoResizable : true
            }
    
            if (tblprop != undefined) {
                for (key in tblprop) {
                    prop[key] = tblprop[key]
                }
            }
    
            var table = new sap.ui.table.Table(tblid, prop)
    
            for (let i = 0; i < columns.length; i++) {
                var template
                switch (columns[i]["Type"]) {
                    case 'Number':
                        template = new sap.m.Input({
                            value: `{${columns[i]["Bind"]}}`,
                            editable: columns[i]["Editable"] === 'TRUE',
                            maxLength: Number(columns[i]["Length"]),
                            liveChange: function (oEvent) {
                                var value = oEvent.getSource().getValue();
                                var bNotnumber = isNaN(value);
                                if (bNotnumber == false) {
                                    // sNumber = value;
                                } else {
                                    oEvent.getSource().setValue("")
                                }
                            },
                            change: function (evt) {
                                console.log(evt)
                                if (typeof fnChangeCallback === 'function') {
                                    fnChangeCallback(evt)
                                }
                            },
                        })
                        break
                    case 'TextField':
                        if (columns[i]["Editable"] === 'FALSE') {
                            template = new sap.m.Text({
                                text: `{${columns[i]["Bind"]}}`,
                                // maxLength: columns[i]["Length"],
                                // change: function (evt) {
                                //     if (typeof fnChangeCallback === 'function') {
                                //         fnChangeCallback(evt)
                                //     }
                                // },
                            })
                        } else {
                            template = new sap.m.Input({
                                value: `{${columns[i]["Bind"]}}`,
                                editable: columns[i]["Editable"] === 'TRUE',
                                maxLength: Number(columns[i]["Length"]),
                                change: function (evt) {
                                    if (typeof fnChangeCallback === 'function') {
                                        fnChangeCallback(evt)
                                    }
                                },
                            })
                        }
                        // template.attachBrowserEvent("keypress",function(e){
                        // var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];
                        //             if (!($.inArray(e.which, key_codes) >= 0)) {
                        //             e.preventDefault();
                        //             }     
                        // });
                        break
                    case 'ValueHelpField':
                        template = new sap.m.Input({
                            value: `{${columns[i]["Bind"]}}`,
                            editable: columns[i]["Editable"] === 'TRUE',
                            maxLength: Number(columns[i]["Length"]),
                            showValueHelp: true,
                            change: function (evt) {
                                Global.F4Validation({
                                    element: this,
                                    bind: columns[i]["Bind"],
                                    changeBindLists: F4BindList
                                })
                                if (typeof fnChangeCallback === 'function') {
                                    fnChangeCallback(evt)
                                }
                            },
                            valueHelpRequest: (function (evt) {
                                if (typeof fnChangeCallback === 'function') {
                                    fnChangeCallback(evt)
                                }
                                var idx = this.getParent().getIndex()
                                var tbl = this.getParent().getParent()
                                var model = tbl.getModel()
                                var dataModel = model.getData()
                                var keyRes = Object.keys(dataModel)[0]
                                var arrData = model.getData()[keyRes]
    
                                var bind = columns[i]["Bind"]
                                var sendCode = ''
                                var filterBind = ''
                                var filterValue = ''
    
                                var objF4 = false
    
                                if (F4BindList) {
                                    objF4 = F4BindList.find(el => {
                                        return el["key"] == bind
                                    })
                                }
    
                                if (objF4) {
                                    filterBind = objF4["filter"]
                                    if (objF4.hasOwnProperty("overrideCode")) {
                                        sendCode = objF4["overrideCode"]
                                    } else {
                                        sendCode = objF4["key"]
                                    }
    
                                    if (filterBind != '') {
                                        if (arrData[idx][filterBind] == '') {
                                            SAPUI.MessageBoxAlert('Harap isi ' + filterBind)
                                        } else {
                                            filterValue = "-" + arrData[idx][filterBind]
                                        }
                                    }
                                }
    
                                Global.F4Filter(this, "", sendCode, sendCode + filterValue, "", "", "", "")
                            })
                        })
                        break
                    case 'TimePicker':
                        template = new sap.m.TimePicker({
                            support2400: true,
                            valueFormat: 'HH:mm:ss',
                            displayFormat: "HH:mm:ss",
                            value: `{${columns[i]["Bind"]}}`,
                            editable: columns[i]["Editable"] === 'TRUE',
                        })
                        break
                    case 'CheckBox':
                        template = new sap.ui.commons.CheckBox("", {
                            checked: `{${columns[i]["Bind"]}}`,
                            editable: columns[i]["Editable"] === 'TRUE',
                        })
                        break
                    case 'TimePicker':
                        template = new sap.m.TimePicker({
                            value: `{${columns[i]["Bind"]}}`,
                            valueFormat: "HH:mm",
                            displayFormat: "HH:mm",
                            width: "85px",
                            editable: columns[i]["Editable"] === 'TRUE'
                        })
                        break
                        // -- add datepicker
                    case 'DatePicker':
                        template = new sap.m.DatePicker({
                            value: `{${columns[i]["Bind"]}}`,
                            // id: pID,
                            width: '100%',
                            editable: columns[i]["Editable"] === 'TRUE',
                            displayFormat: "dd.MM.yyyy"
                        }).setValueFormat("yyyy-MM-dd")
                        break
                    default:
                        template = new sap.m.Input({
                            value: `{${columns[i]["Bind"]}}`,
                            editable: columns[i]["Editable"] === 'TRUE',
                            maxLength: columns[i]["Length"],
                            change: function (evt) {
                                if (typeof fnChangeCallback === 'function') {
                                    fnChangeCallback(evt)
                                }
                            }
                        })
                        break
                }
                table.addColumn(new sap.ui.table.Column({
                    label: new sap.ui.commons.Label({
                            text: columns[i]["Label"],
                            textAlign: "Center"
                        })
                        .setTooltip(columns[i]["Label"]),
                    template,
                    width: columns[i]["Width"],
                    autoResizable: false,
                    // hAlign: 'Center',
                    filterProperty: columns[i]["Bind"],
                    sortProperty: columns[i]["Bind"],
                }))
            }
            return table
        },
    
        getInitialName: function () {
            let initial = '_'
            switch (userTypeLS()) {
                case 'ADMIN':
                    initial = 'A'
                    break
                case 'USER':
                    initial = 'U'
                    break
                case 'BEACUKAI':
                    initial = 'BC'
                    break
                case 'SUPERADMIN':
                    initial = 'SA'
                    break
            }
            return initial
        },
    
        // Insert Executed Report Log
        insExcRptLog: function (route) {
            var trxTcodes = this.getTcodeDiv()["transaction"]
            var rptTcodes = this.getTcodeDiv()["report"]
            var tcode = route.split("_")
    
            if (rptTcodes.includes(tcode[0]) || trxTcodes.includes(tcode[0])) {
                if (tcode[1] == '02') {
                    Global.InsLogActivity(tcode[0], `Transaction ${tcode[0]} Executed`)
                }
            }
        },
    
        // Return tcode per-division
        getTcodeDiv: function () {
            var result = {
                report: [],
                transaction: []
            }
            var dataTree = JSON.parse(window.localStorage.getItem("dataTile")).Tiles
    
            dataTree[0]["ContentPanel"].forEach(row => {
                result["report"].push(row["pressGnt"])
            })
    
            dataTree[1]["ContentPanelRptAd"].forEach(row => {
                result["report"].push(row["pressGnt"])
            })
    
            dataTree[2]["ContentTrx"].forEach(row => {
                result["transaction"].push(row["pressGnt"])
            })
            return result
        },
    
        getRouteName: function () {
            var hash = window.location.hash
            var href = window.location.href
            var name = ""
    
            if (hash == "#/" || hash == "") {
                let splitHref = href.split("/")
                let route = splitHref[splitHref.length - 1]
                name = route.replace("#", "")
                name = name.replace(".html", "")
            } else {
                let splitHref = href.split("/")
                let route = splitHref[splitHref.length - 1]
                name = route
            }
    
            return name
        },
    
        getRouteName2: function () {
            var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
            var name = oRouter._oRouter._prevMatchedRequest
            return name
        },
    
        CloseSession: function () {
            sap.ui.commons.MessageBox.confirm(Global.tabCount() == 1 ?
                "Do you want to log off ?" : "Do you want to close this tab?",
                function (bResult) {
                    if (bResult) {
                        if (Global.tabCount() == 1) {
                            Global.DeleteSession(false, true);
                        } else {
                            Global.tabCounter(false);
                            // Global.DeleteSession(false);
                            window.open('', '_self').close()
                        }
                        return false;
                    }
                }, "Confirmation");
    
        },
        // Create New Session
        CreateSession: function () {
            var url = window.localStorage.getItem("DashURL")
            // var getTypeSession = windowSessionUX5
            // var now = Global.getNow();
    
            Global.tabCounter();
            var win = window.open(url, '_blank');
            win.sessionStorage.clear()
            win.focus();
            // win.newtab = parseInt(window.localStorage.tab) + 1;
            // window.localStorage.setItem('tab', win.newtab);
        },
        // Dummy Notifications Model
        GetNotifModel: function () {
            var dataNotif = [{
                    "title": "Requests waiting for approval overtime",
                    "creationDate": "2020/04/03",
                    "ListItems": [{
                        "title": "Rezida Rismawati N. R.",
                        "description": "Pengajuan SPL No: HRD/SPLKR/2/2020/2866",
                        "authorInitials": "R",
                        "authorAvatarColor": "Accent2",
                        "buttons": [{
                                "text": "Approve",
                                "enabled": true
                            },
                            {
                                "text": "Release",
                                "enabled": false
                            },
                            {
                                "text": "Cancel",
                                "enabled": true
                            }
                        ]
                    }]
                },
                {
                    "title": "Requests waiting for approval leave",
                    "creationDate": "2020/04/03",
                    "ListItems": [{
                        "title": "Rezida Rismawati N. R.",
                        "description": "On 02 April 2020 - 02 April 2020 (1 day)",
                        "authorInitials": "R",
                        "authorAvatarColor": "Accent2",
                        "buttons": [{
                                "text": "Approve",
                                "enabled": true
                            },
                            {
                                "text": "Reject",
                                "enabled": true
                            }
                        ]
                    }]
                }
            ]
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(dataNotif);
            return oModel
        },
        GetMenuModel: function () {
            // Dummy vers
            // var sidebarData = fetchJSON('asset/js/menu.json')
            // var sidebar = new sap.ui.model.json.JSONModel();
            // sidebar.setData(sidebarData);
    
            // var tilesRaw = []
            // for (let i = 0; i < sidebarData.length; i++) {
            //     const el = sidebarData[i];
            //     var tile = {}
    
            //     tile["Header-Data"] = el["Description"]
            //     tile["Content-Data"] = el["content"]
    
            //     tilesRaw.push(tile)
            // }
            // var tilesData = {
            //     "Tiles": tilesRaw
            // }
            // var tiles = new sap.ui.model.json.JSONModel();
            // tiles.setData(tilesData);
    
            var unparsedSidebarData = window.localStorage.getItem("menus")
            var sidebarData = ''
    
            if (unparsedSidebarData) {
                sidebarData = JSON.parse(unparsedSidebarData)
            } else {
                sidebarData = promiseApi({
                    url: WS_SY + 'WS_UC',
                    method: "DspMenu",
                    body: {
                        User: UserLS(),
                        Platform: PLATFORM,
                        IsSPRO: 0
                    }
                })
    
                window.localStorage.setItem("menus", JSON.stringify(sidebarData))
            }
    
            var newSidebarData = []
    
            var parentData = sidebarData[0]
            var childData = sidebarData[1]
            var searchSuggestionItem = deepCopy(childData)
    
            if (sidebarData) {
                parentData.sort((a, b) => {
                    a["OrderNo"] < b["OrderNo"]
                })
    
                parentData.forEach(elParent => {
                    var content = childData.filter(elChild => {
                        return elChild["idPanel"] == elParent["OrderNo"]
                    })
    
                    var newParent = elParent
                    newParent.content = content
    
                    newSidebarData.push(newParent)
                })
            }
    
            var sidebar = new sap.ui.model.json.JSONModel();
            sidebar.setData(newSidebarData);
    
            var tilesRaw = []
            for (let i = 0; i < newSidebarData.length; i++) {
                const el = newSidebarData[i];
                var tile = {}
    
                tile["Header-Data"] = el["Description"]
                tile["Content-Data"] = el["content"]
    
                tilesRaw.push(tile)
            }
            var tilesData = {
                "Tiles": tilesRaw
            }
            var tiles = new sap.ui.model.json.JSONModel();
            tiles.setData(tilesData);
    
            var suggestions = new sap.ui.model.json.JSONModel()
    
            searchSuggestionItem.forEach((el, idx) => {
                el["IDTcode"] = idx.toString().padStart(2, '0')
            })
    
            suggestions.setData(searchSuggestionItem)
    
            return {
                sidebar,
                tiles,
                suggestions
            }
        },
    
        GetSPROModel: function () {
            // var sproData = fetchJSON('asset/js/spro.json')
    
            var unparsedSproData = window.localStorage.getItem("spro-menus")
            var sproData = ''
    
            if (unparsedSproData) {
                sproData = JSON.parse(unparsedSproData)
            } else {
                sproData = promiseApi({
                    url: WS_SY + 'WS_UC',
                    method: "DspMenu",
                    body: {
                        User: UserLS(),
                        Platform: PLATFORM,
                        IsSPRO: 1
                    }
                })
    
                window.localStorage.setItem("spro-menus", JSON.stringify(sproData))
            }
    
            var newSproData = []
    
            var parentData = sproData[0]
            var childData = sproData[1]
    
            childData.forEach(el => {
                el["pressGnt"] = el["pressGnt"].replace("SPRO_", "")
                el["ExtendedName"] = el["ExtendedName"].replace("SPRO_", "")
                el["headerGnt"] = el["headerGnt"].replace("SPRO_", "")
    
                switch (el["modulDesc"]) {
                    case 'Organizational Management':
                        el["cuttedSubHeaderGnt"] = 'SPRO_OM'
                        break
                    case 'Workforce Management':
                        el["cuttedSubHeaderGnt"] = 'SPRO_WM'
                        break
                    case 'Time Management':
                        el["cuttedSubHeaderGnt"] = 'SPRO_TM'
                        break
                    case 'Performance Management':
                        el["cuttedSubHeaderGnt"] = 'SPRO_PM'
                        break
                }
            })
    
            if (sproData) {
                parentData.sort((a, b) => {
                    a["OrderNo"] < b["OrderNo"]
                })
    
                parentData.forEach(elParent => {
                    var content = childData.filter(elChild => {
                        return elChild["idPanel"] == elParent["OrderNo"]
                    })
    
                    var newParent = elParent
                    newParent.content = content
    
                    newSproData.push(newParent)
                })
            }
    
            // var spro = new sap.ui.model.json.JSONModel();
            // spro.setData(newSidebarData);
    
            var sproRaw = []
            for (let i = 0; i < newSproData.length; i++) {
                const el = newSproData[i];
                var spro = {}
    
                spro["Header-Data"] = el["Description"]
                spro["Content-Data"] = el["content"]
    
                sproRaw.push(spro)
            }
            var finalSproData = {
                "SPRO": sproRaw
            }
            var spro = new sap.ui.model.json.JSONModel();
            spro.setData(finalSproData);
    
            return spro
        },
    
        PrintLabel: function () {
            var doc = jsPDF('L', 'mm', 'a5').setFillColor(48, 240, 0)
            let width = doc.internal.pageSize.width
            let height = doc.internal.pageSize.height
    
            doc.ellipse(width / 2, height / 2, 70, 70, 'DF')
            doc.setProperties({
                title: 'Label KITE',
                subject: 'Print Label For KITE',
                author: 'IT-INV',
                keywords: 'generated, javascript, web 2.0, ajax',
                creator: 'TRST'
            });
            // doc.autoPrint()
    
            var string = doc.output('datauristring');
    
            //--------untuk preview dari jspdfnya sendiri----------------//
            var dlgAdd = SAPUI.Dialog("", "Print", "100%", "100%", true)
            var iframe = "<iframe width='100%' height='99%' src='" + string + "'></iframe>"
    
            var html = new sap.ui.core.HTML({
                preferDOM: true,
                content: iframe
            });
            dlgAdd.addContent(html);
            dlgAdd.open()
        },
        // Get Tile
        // GetTile: async function () {
        //     this.UserLS() = window.localStorage.getItem("userNameLS")
        //     this.languageLS() = window.localStorage.getItem("userTypeLS()")
        //     this.userTypeLS() = Number(window.localStorage.getItem("userTypeLS()"))
        //     var wsUrl = WS_SY + "WS_UC_Misc";
    
        //     var reqTrx = {
        //         url: wsUrl,
        //         method: "DspTileDashboard",
        //         body: { // param utk Tile Dashboard row 5 - transaction
        //             UserIn: this.UserLS(),
        //             LangIn: this.languageLS(),
        //             TypeIn: 2
        //         }
        //     }
    
        //     // var reqSumTgl = {
        //     // 	url: wsUrl,
        //     // 	method: "DspTileDashboardSummary",
        //     // 	body: {                  // param utk Tile Dashboard row 2
        //     // 		mode: 1
        //     // 	}
        //     // }
    
        //     // var reqSum = {
        //     // 	url: wsUrl,
        //     // 	method: "DspTileDashboardSummary",
        //     // 	body: {	                 // param utk Tile Dashboard row 1
        //     // 		mode: 2
        //     // 	}
        //     // }
    
        //     var reqRptAd = {
        //         url: wsUrl,
        //         method: "DspTileDashboard",
        //         body: { // param utk Tile Dashboard row 4 - report Additional
        //             UserIn: this.UserLS(),
        //             LangIn: this.languageLS(),
        //             TypeIn: 5
        //         }
        //     }
    
        //     var reqDev = {
        //         url: wsUrl,
        //         method: "DspTileDashboard",
        //         body: { // param utk Tile Dashboard row 3 - report
        //             UserIn: this.UserLS(),
        //             LangIn: this.languageLS(),
        //             TypeIn: 1
        //         }
        //     }
    
        //     var [
        //         dataTrx,
        //         // dataSumTgl,
        //         // dataSum,
        //         dataRptAd,
        //         data
        //     ] = await Promise.all([
        //         fetchApi(reqTrx),
        //         // fetchApi(reqSumTgl),
        //         // fetchApi(reqSum),
        //         fetchApi(reqRptAd),
        //         fetchApi(reqDev)
        //     ])
    
        //     // var dataTrx    = await fetchApi(reqTrx)
        //     // var dataSumTgl = await fetchApi(reqSumTgl)
        //     // var dataSum    = await fetchApi(reqSum)
        //     // var dataRptAd  = await fetchApi(reqRptAd)
        //     // var data       = await fetchApi(reqDev)
    
        //     data[0].forEach(row => {
        //         row["cuttedSubHeaderGnt"] = Global.left(row["subHeaderGnt"])
        //     })
    
        //     // var headDash = "Dashboard";
        //     var headReport = "Report";
        //     var headReportAd = "Report Additional";
        //     var headTrx = "Transaction";
    
        //     // if (dataSum[0] == "") {
        //     //     headDash = ""
        //     // } else
    
        //     data[0].length == 0 ? headReport = "" : headReport
        //     dataRptAd[0].length == 0 ? headReportAd = "" : headReport
        //     dataTrx[0].length == 0 ? headTrx = "" : headReport
    
        //     console.log(userTypeLS());
        //     if (userTypeLS() == 'BEACUKAI') {
        //         // mengolah data nya
        //         var dataTile = {
        //             Tiles: [{
        //                 HeaderPanel: headReport,
        //                 ContentPanel: data[0]
        //             }]
        //         }
        //     } else {
        //         // mengolah data nya
        //         var dataTile = {
        //             Tiles: [
        //                 // {
        //                 //     HeaderSummary: headDash,
        //                 //     ContentSummary: dataSum[0]
        //                 // },
        //                 // {
        //                 //     HeaderSummaryTgl: "",
        //                 //     ContentSummaryTgl: dataSumTgl[0]
        //                 // },
        //                 {
        //                     HeaderPanel: headReport,
        //                     ContentPanel: data[0]
        //                 },
        //                 {
        //                     HeaderPanelRptAd: headReportAd,
        //                     ContentPanelRptAd: dataRptAd[0]
        //                 },
        //                 {
        //                     HeaderTrx: headTrx,
        //                     ContentTrx: dataTrx[0]
        //                 }
        //             ]
        //         }
        //     }
        //     // return dataTile
        //     var oModel = new sap.ui.model.json.JSONModel();
        //     oModel.setData(dataTile, true);
        //     window.localStorage.setItem("dataTile", JSON.stringify(oModel.getData()));
        // },
        // Change Password
        ChangePassword: function (param = {}) {
            const {
                initialPass,
                username
            } = param
            var dlgChangePasswd = SAPUI.Dialog("", "Change Password", "31%", "", true, true)
    
            var mtrDialog = SAPUI.Matrix("", "", false, [], 4);
    
            var lblDlgUser = SAPUI.Label("", "User", "Bold", "150px");
            var lblDlgDot1 = SAPUI.Label("", ":");
            var txtDlgUser = SAPUI.Text("", UserLS()) /*, "User", 'auto', true);*/
            // txtDlgUser.setEnabled(false)
    
            var lblDlgOldPassword = SAPUI.Label("", "Old Password", "Bold", "150px");
            var lblDlgDot2 = SAPUI.Label("", ":");
            // var txfDlgOldPassword = SAPUI.TextFieldNoUpper("", "", "230px")
            var txfDlgOldPassword = SAPUI.PasswordField("", "230px")
            if (initialPass) {
                txfDlgOldPassword.setValue(initialPass)
                txfDlgOldPassword.setEditable(false)
            }
    
            var lblDlgNewPassword = SAPUI.Label("", "New Password", "Bold", "150px");
            var lblDlgDot3 = SAPUI.Label("", ":");
            // var txfDlgNewPassword = SAPUI.TextFieldNoUpper("", "", "230px")
            var txfDlgNewPassword = SAPUI.PasswordField("", "230px")
    
            var lblDlgConfNewPassword = SAPUI.Label("", "Confirm New Password", "Bold", "150px");
            var lblDlgDot4 = SAPUI.Label("", ":");
            // var txfDlgConfNewPassword = SAPUI.TextFieldNoUpper("", "", "230px")
            var txfDlgConfNewPassword = SAPUI.PasswordField("", "230px")
    
            var btnDlgUpdate = SAPUI.Button("", "Update", "", "", false, "Emph")
            var btnDlgCancel = SAPUI.Button("", "Cancel", "", "", false, "Transparent")
    
            mtrDialog.createRow(lblDlgUser, /*lblDlgDot1,*/ txtDlgUser)
            mtrDialog.createRow(lblDlgOldPassword, /*lblDlgDot2,*/ txfDlgOldPassword /*,lblDlgValue*/ )
            mtrDialog.createRow(lblDlgNewPassword, /*lblDlgDot3,*/ txfDlgNewPassword /*,lblDlgValue*/ )
            mtrDialog.createRow(lblDlgConfNewPassword, /*lblDlgDot4,*/ txfDlgConfNewPassword)
    
            dlgChangePasswd.addContent(SAPUI.Panel().addContent(mtrDialog))
            dlgChangePasswd.addButton(btnDlgUpdate)
            dlgChangePasswd.addButton(btnDlgCancel)
    
            dlgChangePasswd.open()
            btnDlgUpdate.attachPress(async function () {
    
                var oldValPasswd = txfDlgOldPassword.getValue();
                var newValPasswd = txfDlgNewPassword.getValue();
                var newConfValPasswd = txfDlgConfNewPassword.getValue();
    
                if (isNotEmpty(oldValPasswd) && isNotEmpty(newValPasswd)) {
                    if (validPass(newValPasswd)) {
                        if (newValPasswd == newConfValPasswd) {
                            var wsUrl = WS_SY + "WS_UC_Auth";
    
                            var req = {
                                url: wsUrl,
                                body: {
                                    Username: UserLS(),
                                    OldPassword: oldValPasswd,
                                    NewPassword: newValPasswd
                                },
                                method: "ChangePassword"
                            }
    
                            var res = await fetchApi(req)
    
                            switch (res[0][0].Return) {
                                case 1:
                                    dlgChangePasswd.close()
                                    SAPUI.MessageBox("Change Password Success", "Berhasil Ganti Password", "SUCCESS", "")
                                    if (initialPass) {
                                        window.localStorage.removeItem("IsFirstLogon")
                                    }
                                    break;
                                case 2:
                                    SAPUI.MessageBox("Old password wrong", "Password Lama Salah", "WARNING", "");
                                    break;
                                case 3:
                                    SAPUI.MessageBox("User doesnt Exist", "Pengguna Tidak Ada", "WARNING", "");
                                    break;
                                default:
                                    SAPUI.MessageBox("Process Failed", "Proses Gagal", "WARNING", "");
                                    console.log(res[0])
                                    break;
                            }
                        } else {
                            SAPUI.MessageBox("Confirm New Password didn't match", "Confirm New Password tidak sesuai", "WARNING", "")
                        }
                    }
                } else {
                    SAPUI.MessageBox("Fill in all Required Field", "Isi Semua Field yang Dibutuhkan", "WARNING", "")
                }
    
                function isNotEmpty(pComponen) {
                    return pComponen !== ""
                }
    
                function validPass(pComponen) {
                    var passInput = pComponen
    
                    var numbers = /[0-9]/g;
                    var upperCaseLetters = /[A-Z]/g;
    
                    var score = 20
    
                    if (passInput != "") {
                        console.log(passInput)
                        if (passInput.length >= 8) {
                            console.log(score)
                            if (passInput.match(upperCaseLetters)) {
                                score = score + 40
                                console.log(score)
                            }
    
                            if (passInput.match(numbers)) {
                                score = score + 40
                                console.log(score)
                            }
    
                            if (score == 60) {
                                return true
                            } else if (score == 100) {
                                return true
                            }
                        }
    
                        if (score == 20) {
                            SAPUI.MessageBox("The Password Is Must More Than 8 Letter Use Uppercase or Numbers",
                                "Password harus berisi 8 huruf gunakan huruf besar atau angka", "WARNING", "")
                            txfDlgNewPassword.setValue("")
                            txfDlgConfNewPassword.setValue("")
                            score = 0
                        }
                        return false
                    }
                    return false
                }
    
                function openMsgBox() {
                    function fnCallbackMessageBox(sResult) {
                        dlgChangePasswd.close()
                    }
    
                    jQuery.sap.require("sap.ui.commons.MessageBox");
    
                    // open a fully configured message box
                    sap.ui.commons.MessageBox.show("Success",
                        sap.ui.commons.MessageBox.Icon.SUCCESS,
                        "", [sap.ui.commons.MessageBox.Action.OK],
                        fnCallbackMessageBox,
                        sap.ui.commons.MessageBox.Action.OK);
                }
    
            })
            btnDlgCancel.attachPress(async function () {
                if (initialPass) {
                    var confirm = await SAPUI.MessageBoxConfirm("Anda yakin tidak mengganti password anda?", "", undefined, "NO", "promise")
                    if (confirm) {
                        Global.Logout()
                        dlgChangePasswd.close()
                    }
                } else {
                    dlgChangePasswd.close()
                }
            })
        },
        //search tcode
        SearchTcode: function (searchBar) {
            var loading = SAPUI.BusyDialog();
            var listSession = [];
            window.sessionStorage.setItem("tcodeVariantux5", searchBar.getValue());
            ///  get tcode variant
            var wsUrlTcode = WS_SY + "WS_UC_Authorization";
            var tcodeInduk = "";
    
            var objTcode = {
                user: U5312UX5,
                lang: LANGUANGE,
                varianUser: searchBar.getValue(),
                mode: "GetTcodeInduk"
            };
            var objTcodeAuthor = {
                user: U5312UX5,
                lang: LANGUANGE,
                varianUser: searchBar.getValue(),
                mode: "Authorization"
            };
            var paramTcode = Global.dynamicParam("DspTcodeInduk", objTcode);
            var paramAuthor = Global.dynamicParam("DspTcodeInduk", objTcodeAuthor);
            loading.open()
            $.ajax({
                url: wsUrlTcode,
                type: "POST",
                dataType: 'json',
                data: paramAuthor,
                success: function (result) {
                    loading.close();
                    console.log(result)
                    Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                    authTcode = Finalresult.Result
                    console.log(authTcode)
                    if (authTcode == 1) {
                        Global.DeleteSession(false);
                        getTcodeInduk()
                    } else {
                        SAPUI.MessageBox("You dont have Autorized!", "Anda tidak memiliki ijin masuk tcode ini", "ERROR", "Status")
                        searchBar.setValue("")
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                }
            })
    
            function getTcodeInduk() {
                //cek tcode autorization
                var authTcode = "";
                $.ajax({
                    url: wsUrlTcode,
                    type: "POST",
                    dataType: 'json',
                    data: paramTcode,
                    success: function (result) {
                        console.log(result)
                        Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                        tcodeInduk = Finalresult.Result;
                        Global.InsertSessionUser(searchBar.getValue(), tcodeInduk);
                        //					goToTcode(searchTcode,tcodeInduk);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                    }
                });
            }
    
            function goToTcode(tcodeInduk) {
    
                var wsUrl = WS_SY + "WS_UC_UserActivity";
    
                var objParamUCSession = {
                    username: U5312UX5,
                    ip: ClientIP,
                    server: "PRD",
                    transaction: searchBar.getValue()
                };
    
                var dynamicParamDev = Global.dynamicParam("InsertSession", objParamUCSession);
                console.log(dynamicParamDev)
    
                $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: 'json',
                    data: dynamicParamDev,
                    success: function (result) {
                        var resultParse = Global.dynamicDeserialize(result);
                        console.log(resultParse)
                        if (resultParse[0].Return == '1') {
                            console.log(tcodeInduk)
                            sap.m.URLHelper.redirect(tcodeInduk + ".html");
                        } else {
                            console.log("kesalahan insert session")
    
                        }
    
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                    }
                });
            }
        },
        Title: function (pID, pTitle) {
            return new sap.m.Title({
                id: pID,
                text: pTitle,
                width: "100%",
                textAlign: "Center",
    
            })
        },
        UTitle: function (pID, pTitle) {
            return new sap.ui.core.Title({
                id: pID,
                text: pTitle
            })
        },
        Icon: function (pSrc, pSize, pColor) {
            return new sap.ui.core.Icon({
                src: pSrc,
                size: pSize,
                color: pColor
            })
        },
    
        Icon2: function (pID, pSrc, pSize, pColor) {
            return new sap.ui.core.Icon({
                id: pID,
                src: pSrc,
                size: pSize,
                color: pColor
            })
        },
    
        Menu: function (pID, pAriaDescription, pTooltip) {
            return new sap.ui.commons.Menu({
                id: pID,
                ariaDescription: pAriaDescription,
                tooltip: pTooltip
            })
        },
        ButtonUnpack: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Unpack HU",
                tooltip: "",
                icon: "sap-icon://decline",
                lite: false,
                style: "Reject"
            });
        },
        MenuBar: function (pID, pWidth, pDesign) {
            var ppDesign;
    
            switch (pDesign) {
                case "Header":
                    ppDesign = sap.ui.commons.MenuBarDesign.Header;
                    break;
                case "Standard":
                    ppDesign = sap.ui.commons.MenuBarDesign.Standard;
                    break;
                default:
                    ppDesign = sap.ui.commons.MenuBarDesign.Standard;
            }
    
            return new sap.ui.commons.MenuBar({
                id: pID,
                width: pWidth,
                design: ppDesign
            })
        },
        MenuButton: function (pID, pText, pIcon, pTooltip) {
            return new sap.ui.commons.MenuButton({
                id: pID,
                text: pText,
                icon: pIcon,
                tooltip: pTooltip
            })
        },
        MenuItem: function (pID, pText, pIcon, pTooltip) {
            return new sap.ui.commons.MenuItem({
                id: pID,
                text: pText,
                icon: pIcon,
                tooltip: pTooltip
            })
        },
        ProgressIndicator: function (pID, pWidth, pPercentValue, pTooltip, pShowValue, pBarColor) {
            var ppBarColor;
    
            switch (pBarColor) {
                case "Critical":
                    ppBarColor = sap.ui.core.BarColor.CRITICAL;
                    break;
                case "Negative":
                    ppBarColor = sap.ui.core.BarColor.NEGATIVE;
                    break;
                case "Neutral":
                    ppBarColor = sap.ui.core.BarColor.NEUTRAL;
                    break;
                case "Positive":
                    ppBarColor = sap.ui.core.BarColor.POSITIVE;
                    break;
                default:
                    ppDesign = sap.ui.core.BarColor.NEUTRAL;
            }
    
            return new sap.ui.commons.ProgressIndicator({
                id: pID,
                width: pWidth,
                percentValue: pPercentValue,
                tooltip: pTooltip,
                showValue: pShowValue,
                barColor: ppBarColor
            })
        },
        SegmentedButton: function () {
            return new sap.ui.commons.SegmentedButton({
                id: pID
            })
        },
        SplitButton: function (pID, pLite, pStyle, pStyled, pIconFirst, pText, pIcon) {
            var ppStyle;
    
            switch (pStyle) {
                case "Accept":
                    ppStyle = sap.ui.commons.ButtonStyle.Accept;
                    break;
                case "Default":
                    ppStyle = sap.ui.commons.ButtonStyle.Default;
                    break;
                case "Emph":
                    ppStyle = sap.ui.commons.ButtonStyle.Emph;
                    break;
                case "Reject":
                    ppStyle = sap.ui.commons.ButtonStyle.Reject;
                    break;
                default:
                    ppStyle = sap.ui.core.BarColor.Default;
            }
    
            return new sap.suite.ui.commons.SplitButton({
                id: pID,
                lite: pLite,
                style: ppStyle,
                styled: pStyled,
                iconFirst: pIconFirst,
                text: pText,
                icon: pIcon
            })
        },
        SwicthOffApp: async function () {
            var path = window.location.pathname
            var wsUrl = WS_SY + "WS_UC_Misc";
    
            var req = {
                url: wsUrl,
                method: "DspGetMaintenance",
                body: {}
            }
    
            var resultParse = await fetchApix(req);
            console.log("Maintenance " + path + ": ", resultParse)
            var version = resultParse[0][0].Version
    
            if (version == 2) {
                sap.m.MessageToast.show("Maintenance Notice:\nWebsite will be under maintenance in a few minutes.", {
                    duration: 5000, // default
                    width: "20em", // default
                    my: "end top", // default
                    at: "end top", // default
                    of: window, // default
                    offset: "0 0", // default
                    collision: "fit fit", // default
                    onClose: null, // default
                    autoClose: true, // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000, // default
                    closeOnBrowserNavigation: true // default
                });
            } else if (version == 0) {
                if (path.includes("index.html")) {
                    sap.m.URLHelper.redirect("Maintenance.html");
                } else if (path.includes("Maintenance.html")) {
                    setInterval(intervalCheck, 30000)
                    async function intervalCheck() {
                        var resultParse = await fetchApix(req);
                        var version = resultParse[0][0].Version
                        console.log("state: " + version)
    
                        if (version == 1) {
                            sap.m.URLHelper.redirect("index.html");
                        }
                    }
                } else {
                    sap.m.MessageToast.show("Maintenance Notice:\nWebsite is under maintenance", {
                        duration: 5000, // default
                        width: "20em", // default
                        my: "end top", // default
                        at: "end top", // default
                        of: window, // default
                        offset: "0 0", // default
                        collision: "fit fit", // default
                        onClose: null, // default
                        autoClose: true, // default
                        animationTimingFunction: "ease", // default
                        animationDuration: 1000, // default
                        closeOnBrowserNavigation: true // default
                    });
                    // alert("Website is unsder maintenance")
                    Global.Logout();
                }
            } else {
                if (path.includes("Maintenance.html")) {
                    sap.m.URLHelper.redirect("index.html");
                }
            }
    
            async function fetchApix(req) {
                const {
                    url,
                    body,
                    method
                } = req
    
                var readySend = sanitize( // Sanitize User Inputs
                    dynamicParam( // Parsing to Acceptable Format for WS
                        method,
                        typeof body == 'string' ? // Check if body require to Parse (Must Object)
                        JSON.parse(body) : body
                    )
                )
    
                return fetch(url, {
                        method: 'post', // All http method always post
                        body: readySend
                    })
                    .then(res => {
                        if (res.ok) return res.json()
                        else // if not ok then throw error
                            var error = {
                                message: res.statusText,
                                name: res.status,
                            }
                        throw error
                    })
                    .then(res => {
                        // Deserialize result to Acceptable format for frontend
                        return dynamicDeserialize(res)
                    })
                    .catch(e => {
                        // SAPUI.MessageBoxAlert(`Hubungi IT, Terjadi error ${e.name}: "${e.message}"`)
                        console.log('Fetch Api Error', e)
                    })
            }
    
            function dynamicDeserialize(ajaxResult) {
                var tempResult,
                    retVal = new Array();
    
                for (var key in ajaxResult) {
                    tempResult = (ajaxResult[key] != "") ? JSON.parse(ajaxResult[key]) : new Object();
                }
    
                if ("exceptionErrorStatus" in tempResult) {
                    alert("Web Service error: " + tempResult.message);
                    return retVal;
                }
    
                for (var tempKey in tempResult) {
                    retVal.push(tempResult[tempKey]);
                }
    
                return retVal;
            }
    
            function dynamicParam(strMethod, objParam, objParamTable) {
                if (objParamTable == undefined) {
                    return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + '}';
                } else {
                    return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + ', "ParamTable": ' + JSON.stringify(objParamTable) + '}';
                }
            }
        },
        CheckAppStatus: function () {
            // myTimer();
            // myTimerCrtd();
            var wsUrl = urlWebservice + "CheckAppStatus";
            var myVar, reDire;
            /*$.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: '',
                success: function (result) {
    
                    console.log("result>> : "+result);
                    var status = result.CheckAppStatusResult[0].Status;
                    //alert(status);
                    console.log("Status>> : "+status);
                    if(status === "Active"){
                        myVar = setInterval(myTimer, 50000);
                        xStatus = result
                        //alert(status)
                    }else{
                        xStatus = result.CheckAppStatusResult[0].Status
                        var x = result.CheckAppStatusResult[0].JamOff
                        //alert(x);
                        //openDialog();
                        //clearInterval(myVar);
                        sap.m.URLHelper.redirect("Maintenance.html");
                    }
    
                     console.log("ZStatus : "+xStatus);
                }
            });*/
    
            myVar = setInterval(myTimer, 50000);
    
            var oDialog = new sap.ui.commons.Dialog({
                title: "Warning...!!!",
                width: "100px",
                height: "200px",
                resizable: true
            });
    
            // function openDialog() {
            //     var oDialog1 = new sap.ui.commons.Dialog();
            //     oDialog1.setTitle("Notice...!!!");
            //     var oText = new sap.ui.commons.TextView({text: "Aplikasi Admin Entry Akan Dilakukan Maintenance, Silahkan selesaikan pekerjaan Anda yang belum selesai. Satu menit dari sekarang aplikasi tidak bisa di akses"});
            //     oDialog1.addContent(oText);
            //     oDialog1.addButton(
            //         new sap.ui.commons.Button({
            //             text: "OK",
            //             press:function(){
            //             //alert("Close");
            //                 oDialog1.close();
            //             }
            //         })
            //     );
            //     oDialog1.open();
            // };
    
            function openDialog() {
                var msgHeader = [];
                msgItem = new Object();
                msgItem["idMessage"] = "99";
                msgItem["Value"] = "";
                msgItem["idLang"] = "en";
                msgHeader.push(msgItem);
    
                var objectJSON = JSON.stringify(msgHeader)
    
                var wsUrl = urlWebservice + "ZUX_Message_v2";
    
                var dialog = SAPUI.Dialog("", "Notice...!!!", "", "", true)
                var mtrx = SAPUI.Matrix("", "", false, ["auto"], 2);
                var label = SAPUI.Label("", "", "", "300px")
                var labelTimer = SAPUI.Label("", "", "", "300px")
                mtrx.createRow(label, labelTimer);
                dialog.addContent(mtrx);
    
                dialog.addButton(
                    new sap.ui.commons.Button({
                        text: "OK",
                        press: function () {
                            dialog.close();
                        }
                    })
                );
    
                dialog.open();
    
                /// Get Message Maintenance
                $.ajax({
                    url: wsUrl,
                    type: 'post',
                    dataType: 'json',
                    data: objectJSON,
                    success: function (result) {
                        console.log(JSON.stringify(result))
                        var countId = result.ZUX_Message_v2Result.length
                        if (countId > 0) {
    
                            label.setText(result.ZUX_Message_v2Result[0].Desc)
    
                            /// Get Timer
                            $.ajax({
                                url: urlWebservice + "CheckAppStatus",
                                type: "POST",
                                dataType: 'json',
                                data: '',
                                success: function (result) {
                                    var jamOn = result.CheckAppStatusResult[0].JamOn;
    
                                    var timer = Global.CountDown(jamOn, labelTimer, "webrun:C:\\FireFox\\restartFirefox.bat")
                                }
                            });
                        } else {
                            alert("failed")
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('Error');
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            };
    
            function reDirect() {
                //alert("Tes");
                $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: 'json',
                    data: '',
                    success: function (result) {
                        //console.log("result>> : "+result);
                        var status = result.CheckAppStatusResult[0].Status;
                        console.log("Status>> : " + status);
                        if (status === "Active") {
                            clearInterval(reDire);
    
                            //alert(status)
                        } else {
                            //alert("Not Active")
                            sap.m.URLHelper.redirect("webrun:C:\\FireFox\\restartFirefox.bat");
                            //sap.m.URLHelper.redirect("Maintenance.html");
                        }
                    }
                });
                //sap.m.URLHelper.redirect("index.html");
            }
    
            function myTimer() {
                $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: 'json',
                    data: '',
                    success: function (result) {
                        //console.log("result>> : "+result);
                        var status = result.CheckAppStatusResult[0].Status;
    
                        console.log("Status>> : " + status);
                        if (status === "Active") {
                            //SAPUI.GetClientIP();
                            //alert(status)
                        } else {
                            //alert(status)
                            //console.log("Status>> : "+status);
                            window.localStorage.setItem("AppStatus", status);
                            openDialog();
                            clearInterval(myVar);
                            //reDire = setInterval(reDirect, 50000);
                            //alert(AppStatus);
    
                            //sap.m.URLHelper.redirect("index.html");
                        }
                    }
                });
            }
        },
        //check koneksi sql
        CheckConSQL: function () {
    
            var wsUrl = urlWebservice + "CheckConSQL";
            var myVar, reDire;
    
            function myTimer() {
                $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: 'json',
                    data: '',
                    success: function (result) {
                        if (result.CheckConSQLResult == "0") {
                            sap.m.URLHelper.redirect("SQLError.html");
                        }
                    }
                })
            }
    
            myVar = setInterval(myTimer, 50000);
    
            function myTimer() {
                $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: 'json',
                    data: '',
                    success: function (result) {
                        if (result.CheckConSQLResult == "0") {
                            sap.m.URLHelper.redirect("SQLError.html");
                        }
                    }
                })
            }
        },
        //get IP User
    
        //multilanguage
        MultiLanguage: function (LANGUANGE, formName) {
            var wsUrl = WS_SY + "WS_UC_Misc";
            var objParam = {
                language: LANGUANGE,
                formName: formName
            }
    
            pGetLang = Global.dynamicParam("GetLanguage", objParam)
    
            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: pGetLang,
                success: function (result) {
                    var data = Global.dynamicDeserialize(result)
    
                    for (var i = 0; i < data.length; i++) {
    
                        switch (data[i].controlType) {
                            case "Label":
                                SAPUI.GetCore(data[i].controlName).setText(data[i].language)
                                break;
                            case "CheckBox":
                                SAPUI.GetCore(data[i].controlName).setText(data[i].language)
                                break;
                            case "Title":
                                SAPUI.GetCore(data[i].controlName).setText(data[i].language)
                                break;
    
                            case "Panel":
                                var title = SAPUI.UTitle("", data[i].LANGUANGE)
                                SAPUI.GetCore(data[i].controlName).setTitle(title)
                                break;
                            case "Column":
                                var label = new sap.ui.commons.Label({
                                    text: data[i].LANGUANGE,
                                    textAlign: "Center"
                                })
                                SAPUI.GetCore(data[i].controlName).setLabel(label)
                                break;
                            case "Title":
                                if (X_VarianUX5 === '' || X_VarianUX5 === null) {
                                    SAPUI.GetCore(data[i].controlName).setText(data[i].LANGUANGE)
                                } else {
                                    SAPUI.GetCore(data[i].controlName).setText(data[i].LANGUANGE + " (" + X_VarianUX5 + ")")
                                }
    
                                break;
                            default:
                                SAPUI.GetCore(data[i].controlName).setText(data[i].LANGUANGE)
                                break;
                        }
                    }
                }
            });
        },
        //insert tcode
        tcodeActivity: function (Tcode) {
            var wsUrl = urlWebservice + "InsertActivity";
            var param = '{"username":"' + U5312UX5 +
                '", "tcode":"' + Tcode +
                '", "server":"' + Server1 +
                '", "IP":"' + ClientIP +
                '"}';
            console.log(param)
            $.ajax({
                url: wsUrl,
                type: 'post',
                dataType: 'json',
                data: param,
                success: function (result) {
                    console.log(result)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error');
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        //komponen dialog error message
        DialogErrMessage: function (result, navToPages, param, fnCallback, forceRoute) {
            var arrMsg = [],
                arrDiagnosis = [],
                arrProcedure = [],
                // dlgErrorMessage = SAPUI.Dialog("", "", "30%", "", true)/*.setShowCloseButton(false)*/.addStyleClass("noBorder"),
                dlgErrorMessage = new sap.ui.commons.Dialog({
                    width: "30%",
                    modal: true,
                    showCloseButton: false,
                    resizable: false
                }).addStyleClass("noBorder")
            CC = "itux@trst.co.id"
            // department = getDepartment()
            dlgErrorMessage.attachClosed(function () {
                if (result != undefined && result.ViewType == 'I' && isNotEmpty(navToPages)) {
                    SAPUI.Route(navToPages, param)
                }
    
                if (forceRoute) {
                    SAPUI.Route(navToPages, param)
                }
    
                if (typeof fnCallback === 'function') {
                    fnCallback(result)
                }
                // callbackNavToPage(navToPages)
            })
    
            var button = new sap.ui.commons.Button({
                text: "Okay, got it",
                press: function () {
                    dlgErrorMessage.close();
    
                }
            })
    
            // var button = SAPUI.Button("","Okay, got it")
            // .attachPress(function(){
            //     dlgErrorMessage.close()
            // })
    
            dlgErrorMessage.addButton(button)
    
            var pnlMessage = SAPUI.Panel("", "", "auto", false, false)
            pnlMessage.setExpandable(true)
            pnlMessage.setExpanded(true)
            pnlMessage.setHeaderToolbar(new sap.m.Toolbar({
                design: sap.m.ToolbarDesign.Transparent,
                content: [
                    /* new sap.ui.core.Icon({
                                    //					src : iconSrc,
                                    //					color: "#1a237e",
                                    size: "1.5rem",
    
                                }).addStyleClass("sizeIcon"), */
                    new sap.m.Title({
                        text: "Message"
                    }).addStyleClass("colorTitlePanel")
                ],
                active: true,
                press: function () {
                    if (pnlMessage.getExpanded()) {
                        pnlMessage.setExpanded(false)
    
                    } else {
                        pnlMessage.setExpanded(true)
                        pnlDiagnosa.setExpanded(false)
                        pnlProc.setExpanded(false)
                    }
    
                }
            }))
    
            var pnlDiagnosa = SAPUI.Panel("", "", "auto", false, false)
            pnlDiagnosa.setExpandable(true)
            pnlDiagnosa.setExpanded(false)
            pnlDiagnosa.setHeaderToolbar(new sap.m.Toolbar({
                design: sap.m.ToolbarDesign.Transparent,
                content: [
                    /* new sap.ui.core.Icon({
                                    src: "sap-icon://message-error",
                                    color: "#1a237e",
                                    size: "1.5rem",
    
                                }).addStyleClass("sizeIcon"), */
                    new sap.m.Title({
                        text: "Diagnosa"
                    }).addStyleClass("colorTitlePanel")
                ],
                active: true,
                press: function () {
                    if (pnlDiagnosa.getExpanded()) {
                        pnlDiagnosa.setExpanded(false)
    
                    } else {
                        pnlDiagnosa.setExpanded(true)
                        pnlMessage.setExpanded(false)
                        pnlProc.setExpanded(false)
                    }
    
                }
            }))
    
            var pnlProc = SAPUI.Panel("", "", "auto", false, false)
            pnlProc.setExpandable(true)
            pnlProc.setExpanded(false)
            pnlProc.setHeaderToolbar(new sap.m.Toolbar({
                design: sap.m.ToolbarDesign.Transparent,
                content: [
                    /* new sap.ui.core.Icon({
                                    src: "sap-icon://message-error",
                                    color: "#1a237e",
                                    size: "1.5rem",
    
                                }).addStyleClass("sizeIcon"), */
                    new sap.m.Title({
                        text: "Procedure"
                    }).addStyleClass("colorTitlePanel")
                ],
                active: true,
                press: function () {
                    if (pnlProc.getExpanded()) {
                        pnlProc.setExpanded(false)
    
                    } else {
                        pnlProc.setExpanded(true)
                        pnlDiagnosa.setExpanded(false)
                        pnlMessage.setExpanded(false)
                    }
    
                }
            }))
    
            if (result.length > 1) {
    
                separateResultToModel(result)
                ErrMsgMultiple()
                dlgErrorMessage.addContent(pnlMessage)
                dlgErrorMessage.addContent(pnlDiagnosa)
                dlgErrorMessage.addContent(pnlProc)
    
    
            } else {
                console.log(result.ViewType)
    
                ErrMsgSingle()
    
                if (result.ViewType != "I") {
                    var title = new sap.m.Image({
                        src: "asset/image/Dlg_error.png"
                    }).addStyleClass("dialogImage")
    
                    // dlgErrorMessage.setTitle("Error")
                    dlgErrorMessage.addContent(title)
    
                    if (result.hasOwnProperty('Desc') && result.Desc != null) {
                        dlgErrorMessage.addContent(pnlMessage)
                    }
                    if (result.hasOwnProperty('Diagnosis') && result.Diagnosis != null) {
                        dlgErrorMessage.addContent(pnlDiagnosa)
                    }
                    if (result.hasOwnProperty('Procedure') && result.Procedure != null) {
                        dlgErrorMessage.addContent(pnlProc)
                    }
    
                    button.addStyleClass("btnError")
                } else {
    
                    console.log("masuk success")
                    var title = new sap.m.Image({
                        src: "asset/image/Dlg_success.png"
                    }).addStyleClass("dialogImage")
    
                    // dlgErrorMessage.setTitle("Information")
                    dlgErrorMessage.addContent(title)
                    if (result.hasOwnProperty('Desc')) {
                        dlgErrorMessage.addContent(pnlMessage)
                    }
    
                    button.addStyleClass("btnSuccess")
                }
    
            }
    
            function callbackNavToPage(navToPages) {
                if ((navToPages == "") || (navToPages == undefined)) {} else {
                    var isExisthtml = navToPages.includes(".html")
                    if (isExisthtml) {
                        sap.m.URLHelper.redirect(navToPages);
                    } else {
                        var isPreviousPage = navToPages.includes("previousPage-")
                        if (isPreviousPage) {
                            var numBack = (navToPages.split('-').pop()) * (-1)
                            window.history.go(numBack);
                        } else {
                            if (navToPages == "previousPage") {
                                window.history.back();
                            } else if (navToPages == "refreshPage") {
                                window.location.reload();
                            } else {
                                SAPUI.Route(navToPages)
                            }
                        }
                    }
                }
            }
    
            dlgErrorMessage.open()
    
            function separateResultToModel(result) {
                for (i = 0; i < result.length; i++) {
                    arrMsg.push({
                        /* Icon: result[i].Icon,
                        No: result[i].No, */
                        Description: result[i].Description,
                    })
                    arrDiagnosis.push({
                        /* No: result[i].No, */
                        Diagnosis: result[i].Diagnosis,
                    })
                    arrProcedure.push({
                        /* No: result[i].No, */
                        Procedure: result[i].Procedure,
                    })
                }
            }
    
            function getDepartment() {
    
                var wsUrl = WS_SY + "WS_UC_Misc",
                    Modul = "ITHelpdesk";
                pDepartment = {
    
                        Department: Modul
    
                    },
                    pJSON = Global.dynamicParam("Support", pDepartment)
    
    
                var getDepartment = $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: "json",
                    data: pJSON,
                    async: false,
                    success: function (result) {
    
                    }
                }).responseJSON.WS_UC_MiscResult
                var result = JSON.parse(getDepartment);
                return result[0]
            }
    
    
            function setJumlahColumnmatrixLayout(column) {
                var jmlhColumn
                var content
    
                if (column == "") {
                    jmlhColumn = 0
                } else {
                    jmlhColumn = column
                }
    
                return new sap.ui.commons.layout.MatrixLayout({
                    layoutFixed: false,
                    width: '100%',
                    columns: jmlhColumn
                })
            }
    
            function ErrMsgSingle() {
                var tvErrMsg = SAPUI.TextView("", "", "", "auto", true).setText(result.Desc),
                    tvDiagnosis = SAPUI.TextView("", "", "", "auto", true).setText(result.Diagnosis),
                    tvProcedure = SAPUI.TextView("", "", "", "auto", true).setText(result.Procedure),
    
                    mError, mDiagnosis, mProcedure
    
                mError = setJumlahColumnmatrixLayout().createRow(tvErrMsg)
                mDiagnosis = setJumlahColumnmatrixLayout().createRow(tvDiagnosis)
                mProcedure = setJumlahColumnmatrixLayout().createRow(tvProcedure)
    
                pnlMessage.addContent(mError)
                pnlDiagnosa.addContent(mDiagnosis)
                pnlProc.addContent(mProcedure)
    
            }
    
            function ErrMsgMultiple() {
                var modelMsg = new sap.ui.model.json.JSONModel(),
                    modelDgns = new sap.ui.model.json.JSONModel(),
                    modelProc = new sap.ui.model.json.JSONModel(),
                    dlgProcedure = SAPUI.Dialog("", "Detail", "30%", "50%", true)
    
                var tblMsgList = SAPUI.Table("", "100%", 0, "Single", "Paginator", false),
                    clMark = SAPUI.Column("Mark", "IconImageByData", "Icon", "22%", "Center", "Center", "", "", {
                        colTarget: "Icon",
                        data: [{
                                "error": "error"
                            }, //Path Icon: WebContent/asset/icon
                            {
                                "informasi": "informasi"
                            },
                            {
                                "informasi2": "informasi2"
                            },
                            {
                                "warning": "warning"
                            },
                        ]
                    });
                clmnItem1 = SAPUI.Column("Item", "TextView", "No", "21%", "Center", "Center"),
                    clmnPesan = SAPUI.Column("Pesan", "TextView", "Desc", "100%", "Center", "Center")
                tblMsgList.addColumn(clMark)
                tblMsgList.addColumn(clmnItem1)
                tblMsgList.addColumn(clmnPesan)
    
                var tblDgnsList = SAPUI.Table("", "100%", 0, "Single", "Paginator", false),
                    clmnItem2 = SAPUI.Column("Item", "TextView", "No", "21%", "Center", "Center", ""),
                    clmnPesan = SAPUI.Column("Diagnosis", "TextView", "Diagnosis", "100%", "Center", "Center", "")
                tblDgnsList.addColumn(clmnItem2)
                tblDgnsList.addColumn(clmnPesan)
    
                var tblProcList = SAPUI.Table("", "auto", 0, "Single", "Paginator", false),
                    clmnItem3 = SAPUI.Column("Item", "TextView", "No", "21%", "Center", "Center", ""),
                    clmnProcedure = SAPUI.Column("Procedure", "TextView", "Procedure", "100%", "Center", "Center", "")
    
                tblProcList.addColumn(clmnItem3)
                tblProcList.addColumn(clmnProcedure)
    
                tblMsgList.setModel(modelMsg)
                tblDgnsList.setModel(modelDgns)
                tblProcList.setModel(modelProc)
    
                modelMsg.setData({
                    Message: arrMsg
                })
                modelDgns.setData({
                    Diagnosa: arrDiagnosis
                })
                modelProc.setData({
                    Procedure: arrProcedure
                })
    
    
                tblMsgList.bindRows("/Message")
                tblDgnsList.bindRows("/Diagnosa")
                tblProcList.bindRows("/Procedure")
                tblMsgList.setVisibleRowCount(tblMsgList.getModel().getData().Message.length)
                tblDgnsList.setVisibleRowCount(tblDgnsList.getModel().getData().Diagnosa.length)
                tblProcList.setVisibleRowCount(tblProcList.getModel().getData().Procedure.length)
                pnlMessage.addContent(tblMsgList)
                pnlDiagnosa.addContent(tblDgnsList)
                pnlProc.addContent(tblProcList)
    
                tblProcList.attachRowSelectionChange(function () {
                    var idx = this.getSelectedIndex()
    
                    if (this.isIndexSelected(idx)) {
                        var cxt = this.getContextByIndex(idx);
                        var path = cxt.sPath;
                        var obj = this.getModel().getProperty(path);
    
                        alert(obj.Procedure)
                    }
    
                })
    
            }
            return dlgErrorMessage
        },
        /* 3 juli 2018
         * error message FINAL untuk yang menggunakan id message
         * pIdError (string) -> id error message di table ZUX_message
         * pAdditionalValue (string) -> additional value yang digunakan untuk mengganti karakter & di desc error message
         * */
        ErrorMessageView: function (pIdError, pAdditionalValue, navToPages, param, fnCallback, forceRoute = false) {
            var wsUrl = WS_SY + "WS_UC_ErrorMessageView"
            var languageUX = "EN"
            var modul = "MM"
            var CC = "itux@trst.co.id"
    
            console.log(pIdError)
            if (pIdError == "") {
                //alert("ID kosong")
                SAPUI.MessageDialog({
                    Type: "E",
                    Message: "ID kosong.",
                })
            }
    
            console.log(pAdditionalValue)
            if (pAdditionalValue != undefined || pAdditionalValue != "") {
                /* if(pAdditionalValue.length > 1){ 
                    pAdditionalValue = pAdditionalValue.join("+")
                }else{
                    pAdditionalValue = pAdditionalValue+"+"
                } */
                pAdditionalValue = pAdditionalValue + "+"
            } else {
                pAdditionalValue = ""
            }
            console.log(pAdditionalValue)
    
            var errMsg = {
                IdMessage: pIdError,
                IdLang: languageUX,
                Value: pAdditionalValue,
                Department: modul
            }
            console.log(errMsg)
    
            var res = promiseApi({
                url: wsUrl,
                body: errMsg,
                method: 'ErrorMessageView'
            })
            // .then(res => {
            res[0].forEach(function (item) {
    
                for (var key in item) {
    
                    if (key == "Desc" || key == "Diagnosis" || key == "Procedure") {
    
                        item[key] = stringNewLine(item[key])
    
                        if (item[key] == "") {
                            item[key] = "-";
                        }
                    }
                }
    
            })
            console.log(res[0])
            SAPUI.DialogErrMessage(res[0][0], navToPages, param, fnCallback, forceRoute)
            // })
    
            //replace string &br dijadikan new line ("\n")
            function stringNewLine(result) {
                var finalResult = ""
                if (result == null) result = "";
    
                var isExistBr = result.includes("&br")
    
    
                if (isExistBr == true) {
                    var splitResult = result.split("&br")
                    for (var i = 0; i < splitResult.length; i++) {
                        finalResult = finalResult + splitResult[i] + "\n"
                    }
                    // var result1 = splitResult[0]
                    // var result2 = splitResult[1]
                    // finalResult = result1 +"\n"+result2
                } else {
                    finalResult = result
                }
                return finalResult
            }
        },
        /**
         * function untuk menghandle error message dari SP
         * result -> JSON deserilize result
         * navToPages -> parameter untuk mengisi ke halaman mana ketika tombol OK ditekan
         */
        ErrorMessageDB: function (result, navToPages) {
            console.log("ENTER ErrorMessageDB", result)
    
            if (result[0].length == 0) {
                SAPUI.ErrorMessageView("P0838", [])
            } else {
    
                //get nama kolom ke 0
                //check obj Name untuk menentukan apakah masuk error message apa tidak
                var checkObjName = Object.keys(result[0][0])[0],
    
                    filteredErrMsg = [],
                    filteredList = []
                arrreplace = [],
                    finalReplace = [],
                    language = "EN"
    
                //cek jika kolom ke 0 adalah idMessage
                if (checkObjName == "idMessage") {
    
                    //cek & filter error message sesuai dengan bahasa yang dipilih
                    for (i = 0; i < result[0].length; i++) {
                        //get value from key idLang [1]
                        var checkObjValue = Object.values(result[0][i])[1]
    
                        if (checkObjValue == language) {
                            filteredErrMsg.push(result[0][i])
                        }
                    }
                    //push hasil error message ke array agar bisa di foreach
                    filteredErrMsg.forEach(function (item) {
    
                        for (var key in item) {
                            if (key == "Desc" || key == "Procedure" || key == "Diagnosis") {
    
                                item[key] == null ? "" : stringNewLine(item[key])
    
                            }
    
    
                        }
    
                    })
                    SAPUI.DialogErrMessage(filteredErrMsg[0], navToPages)
    
                    return false
    
    
                } else {
    
                    return true
                }
            }
    
    
    
    
            function stringNewLine(result) {
    
                var finalResult = ""
    
                var isExistBr = result.includes("&br")
    
                if (isExistBr == true) {
    
                    var splitResult = result.split("&br")
    
                    var result1 = splitResult[0],
    
                        result2 = splitResult[1]
    
                    finalResult = result1 + "\n" + result2
                } else {
    
                    finalResult = result
                }
    
                return finalResult
    
    
            }
    
    
        },
        //screen varian
        ScreenVarian: function (tcode, screen) {
            if (tcode != null) {
                console.log(tcode, screen)
                // set screen varian
                // var tcode = tcodeSessionUX5;
    
                var wsUrl = WS_SY + "WS_UC_Misc";
    
                var objParamUCVariant = {
                    Tcode: tcode,
                    ScreenNumber: screen
                };
    
                var dynamicParamDev = Global.dynamicParam("DspScreenVariant", objParamUCVariant);
                console.log(dynamicParamDev)
    
                $.ajax({
                    url: wsUrl,
                    type: "POST",
                    dataType: 'json',
                    data: dynamicParamDev,
                    success: function (result) {
                        var resultParse = Global.dynamicDeserialize(result);
                        console.log(resultParse[0])
    
                        for (i = 0; i < resultParse[0].length; i++) {
                            idComponen = SAPUI.GetCore(resultParse[0][i].IDComponent);
    
                            //  					console.log(resultParse[i])
    
                            switch (resultParse[0][i].ComponentType) {
                                case "RadioButton":
                                    idComponen.setSelectedIndex(parseInt(resultParse[0][i].Value));
                                    break;
                                case "CheckBox":
                                    idComponen.setChecked(resultParse[0][i].Value == "true");
                                    break;
                                case "Label":
                                    idComponen.setText(resultParse[0][i].Value);
                                    break;
                                case "Button":
                                    idComponen.setText(resultParse[0][i].Value);
                                    break;
                                case "TextField":
                                    idComponen.setValue(resultParse[0][i].Value);
                                    break;
                                case "ValueHelpField":
                                    idComponen.setValue(resultParse[0][i].Value);
                                    break;
                                default:
    
                            }
    
                            //  					var Editable
    
                            if (resultParse[0][i].ComponentType == "Label") {
                                idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                            } else if (resultParse[0][i].ComponentType == "Button") {
                                idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                                idComponen.setEnabled((resultParse[0][i].Enable).toLowerCase() == 'true');
                            } else if (resultParse[0][i].ComponentType == "Panel") {
                                idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                            } else if (resultParse[0][i].ComponentType == "Column") {
                                var idComponen2 = idComponen.getTemplate();
                                idComponen2.setEnabled((resultParse[0][i].Enable).toLowerCase() == 'true');
                                idComponen2.setEditable((resultParse[0][i].Editable).toLowerCase() == 'true');
                                idComponen.setTemplate(idComponen2);
                            } else {
                                //  						console.log(resultParse[0][i].Editable.toLowerCase())
                                //  						console.log((resultParse[0][i].Editable).toLowerCase()=='true')
                                idComponen.setEditable((resultParse[0][i].Editable).toLowerCase() == 'true');
                                idComponen.setEnabled((resultParse[0][i].Enable).toLowerCase() == 'true');
                                idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                            }
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        loading.close()
                        SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                    }
                });
            }
        },
        //        var wsUrl = urlWebservice + "GetVarianTCode";
        //        var idComponen;
        //        $.ajax({
        //            type: "POST",
        //            url: wsUrl,
        //            contentType: "text/plain, charset=utf-8",
        //            dataType: "json",
        //            crossDomain: true,
        //            data:  '{tcode:"'+tcode+'", screen:"'+screen+'"}',
        //            success: function (result) {
        //            	console.log(result)
        //                for (i = 0 ; i < result.GetVarianTCodeResult.length ; i++) {
        //                    idComponen = SAPUI.GetCore(result.GetVarianTCodeResult[i].idcomp);
        //
        //                    console.log(result.GetVarianTCodeResult[i])
        //
        //                    switch(result.GetVarianTCodeResult[i].componentType) {
        //                    case "RadioButton":
        //                        idComponen.setSelectedIndex(parseInt(result.GetVarianTCodeResult[i].value));
        //                        break;
        //                    case "CheckBox":
        //                        idComponen.setChecked(result.GetVarianTCodeResult[i].value == "true");
        //                        break;
        //                    case "Label":
        //                        idComponen.setText(result.GetVarianTCodeResult[i].value);
        //                        break;
        //                    case "Button":
        //                        idComponen.setText(result.GetVarianTCodeResult[i].value);
        //                        break;
        //                    case "TextField":
        //                        idComponen.setValue(result.GetVarianTCodeResult[i].value);
        //                        break;
        //                    case "ValueHelpField":
        //                        idComponen.setValue(result.GetVarianTCodeResult[i].value);
        //                        break;
        //                    default:
        //
        //                    }
        //
        //                    if(result.GetVarianTCodeResult[i].componentType == "Label") {
        //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
        //                    } else if (result.GetVarianTCodeResult[i].componentType == "Button") {
        //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
        //                        idComponen.setEnabled(result.GetVarianTCodeResult[i].enable);
        //                    } else if (result.GetVarianTCodeResult[i].componentType == "Panel") {
        //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
        //                    }
        //                    else {
        //                    	idComponen.setEditable(result.GetVarianTCodeResult[i].editable);
        //                        idComponen.setEnabled(result.GetVarianTCodeResult[i].enable);
        //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
        //                    }
        //                }
        //            },
        //            error: function(jqXHR, textStatus, errorThrown) {
        //                console.log('Error');
        //                console.log(jqXHR);
        //                console.log(textStatus);
        //                console.log(errorThrown);
        //            }
        //        })
        //    },
        //komponen Toolbar
        Toolbar: function (pID, pWidth, pDesign, pStandalone) {
            var ppDesign;
    
            switch (pDesign) {
                case "Flat":
                    ppDesign = sap.ui.commons.ToolbarDesign.Flat;
                    break;
                case "Standard":
                    ppDesign = sap.ui.commons.ToolbarDesign.Standard;
                    break;
                case "Transparent":
                    ppDesign = sap.ui.commons.ToolbarDesign.Transparent;
                    break;
                default:
                    ppDesign = sap.ui.commons.ToolbarDesign.Transparent;
            }
    
            return new sap.ui.commons.Toolbar({
                id: pID,
                width: pWidth,
                design: ppDesign,
                standalone: pStandalone
            })
        },
        //messagebox success
        MessageBoxSuccess: function (pMessage) {
            var messageBox = sap.ui.requireSync("sap/m/MessageBox");
            messageBox.success(pMessage)
        },
        //messagebox alert
        MessageBoxAlert: function (pMessage) {
            var messageBox = sap.ui.requireSync("sap/m/MessageBox");
            messageBox.alert(pMessage)
        },
        MessageBoxError: function (pMessage, onCloseCallback = null) {
            var messageBox = sap.ui.requireSync("sap/m/MessageBox");
            return messageBox.error(pMessage, {
                onClose: onCloseCallback
            })
        },
        MessageBoxWarning: function (pMessage) {
            var messageBox = sap.ui.requireSync("sap/m/MessageBox");
            messageBox.warning(pMessage)
        },
        //messagebox confirm
        MessageBoxConfirm: function (pMessage, fnCallbackConfirm, pHeader = "Confirm", emphasizedButton = "YES", returnMode = 'legacy') {
            if (returnMode === 'legacy') {
                var messageBoxLegacy = sap.ui.requireSync("sap/m/MessageBox");
                messageBoxLegacy.confirm(pMessage, {
                    title: pHeader, // default
                    onClose: null,
                    styleClass: "sapUiSizeCompact",
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit,
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    // emphasizedAction: sap.m.MessageBox.Action.YES,
                    emphasizedAction: emphasizedButton,
                    // onClose: fnCallbackConfirm
                    onClose: function (oAction) {
                        if (typeof fnCallbackConfirm == 'function') {
                            fnCallbackConfirm(oAction)
                        }
                    }
                });
            } else if (returnMode == 'promise') {
                return new Promise((resolve, reject) => {
                    var messageBoxLegacy = sap.ui.requireSync("sap/m/MessageBox");
                    messageBoxLegacy.confirm(pMessage, {
                        title: pHeader, // default
                        onClose: null,
                        styleClass: "sapUiSizeCompact",
                        initialFocus: null,
                        textDirection: sap.ui.core.TextDirection.Inherit,
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        // emphasizedAction: sap.m.MessageBox.Action.YES,
                        emphasizedAction: emphasizedButton,
                        // onClose: fnCallbackConfirm
                        onClose: function (oAction) {
                            resolve(oAction === "YES")
                        }
                    });
                })
            }
        },
        //messagebox Show
        MessageBoxShow: function (pMessage, pHeader, fnCallbackConfirm, pIcon) {
            var ppIcon;
    
            switch (pStyle) {
                case "Error":
                    ppIcon = sap.ui.commons.MessageBox.Icon.ERROR;
                    break;
                case "Information":
                    ppIcon = sap.ui.commons.MessageBox.Icon.INFORMATION;
                    break;
                case "None":
                    ppIcon = sap.ui.commons.MessageBox.Icon.NONE;
                    break;
                case "Question":
                    ppIcon = sap.ui.commons.MessageBox.Icon.QUESTION;
                    break;
                case "Succes":
                    ppIcon = sap.ui.commons.MessageBox.Icon.SUCCESS;
                    break;
                case "Warning":
                    ppIcon = sap.ui.commons.MessageBox.Icon.WARNING;
                    break;
                case "Critical":
                    ppIcon = sap.ui.commons.MessageBox.Icon.CRITICAL;
                    break;
                default:
                    ppIcon = sap.ui.commons.MessageBox.Icon.QUESTION;
            }
    
            var messageBox = sap.ui.require("sap.ui.commons.MessageBox");
            messageBox.show(
                pMessage,
                ppIcon,
                pHeader, [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                fnCallbackMessageBox,
                sap.ui.commons.MessageBox.Action.YES
            );
            // function openMessageBox() {
            //     jQuery.sap.require("sap.m.MessageBox");
            //          sap.m.MessageBox.show(
            //           "Please Confirm to Submit", {
            //              icon: sap.m.MessageBox.Icon.INFORMATION,
            //              title: "Dear User",
            //            actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            //            onClose: function(oAction){
            //            if(oAction === sap.m.MessageBox.Action.YES){
            //            alert("YES");
            //            }
    
            //            },
            //            }
            //          );
            //     }
    
            //     // to call the above function, we create a simple button
            //     new sap.m.Button({text:"Show MessageBox", press : openMessageBox}).placeAt("content");
        },
        //message box
        MessageBox: function (pMessageEn, pMessageIn, pStyle, pHeader) {
            if (LANGUANGE == "en")
                sap.ui.commons.MessageBox.show(pMessageEn, pStyle, pHeader);
            else
                sap.ui.commons.MessageBox.show(pMessageIn, pStyle, pHeader);
        },
        //tab strip
        TabStrip: function (pID, pHeight, pWidth, pSelectedIndex) {
            return new sap.ui.commons.TabStrip({
                id: pID,
                height: pHeight,
                width: pWidth,
                selectedIndex: pSelectedIndex
            })
        },
        Tab: function (pID, pText) {
            return new sap.ui.commons.Tab({
                id: pID,
                text: pText
            })
        },
        Image: function (pID, pSrc, pWdth, pHeight, pDecorative, pAlt) {
            return new sap.ui.commons.Image({
                id: pID,
                src: pSrc,
                width: pWdth,
                height: pHeight,
                decorative: pDecorative,
                alt: pAlt,
            })
        },
        Link: function (pID, pText, pTooltip, pHref) {
            return new sap.ui.commons.Link({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                href: pHref
            })
        },
        MLink: function (pID, pText, pTooltip, pHref) {
            return new sap.m.Link({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                href: pHref
            })
        },
        CheckBox: function (pID, pText, pTooltip, pChecked) {
            return new sap.ui.commons.CheckBox({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                checked: pChecked
            });
        },
        PasswordField: function (pID, pWidth) {
            return new sap.ui.commons.PasswordField({
                id: pID,
                width: pWidth
            });
        },
        RadioButton: function (pID, pText, pTooltip, pGroupName) {
            return new sap.ui.commons.RadioButton({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                groupName: pGroupName
            })
        },
        MRadioButton: function (pID, pText, pTooltip, pGroupName) {
            return new sap.m.RadioButton({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                groupName: pGroupName
            })
        },
        RadioButtonGroup: function (pID, pWidth, pColumns, pSelectedIndex) {
            return new sap.ui.commons.RadioButtonGroup({
                id: pID,
                width: pWidth,
                columns: pColumns,
                selectedIndex: pSelectedIndex
            })
        },
        MRadioButtonGroup: function (pID, pWidth, pColumns, pSelectedIndex) {
            return new sap.m.RadioButtonGroup({
                id: pID,
                width: pWidth,
                columns: pColumns,
                selectedIndex: pSelectedIndex
            })
        },
        ItemRDB: function (pID, pText, pTooltip, pKey) {
            return new sap.ui.core.Item({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                key: pKey
            });
        },
        Item: function (pText, pTooltip, pKey) {
            return new sap.ui.core.Item({
                text: pText,
                tooltip: pTooltip,
                key: pKey
            });
        },
        TextArea: function (pID, pValue, pTooltip, pCols, pRows) {
            return new sap.m.TextArea({
                id: pID,
                value: pValue,
                tooltip: pTooltip,
                cols: pCols,
                rows: pRows
            });
        },
        ComboBox: function (pID, pWidth, pPlaceholder) {
            return new sap.m.ComboBox({
                id: pID,
                width: pWidth,
                placeholder: pPlaceholder,
                //displaySecondaryValues: true
            }).addStyleClass("sapUiSizeCompact")
        },
        HorizontalDivider: function () {
            return new sap.ui.commons.HorizontalDivider({
                type: "Page"
            });
        },
        Dialog: function (pID, pTitle, pWidth, pHeight, pModal, escapeHandler = false) {
            return new sap.m.Dialog({
                id: pID,
                title: pTitle,
                contentWidth: pWidth,
                contentHeight: pHeight,
                draggable: true,
                escapeHandler: function () {
                    if (escapeHandler) {
                        return !escapeHandler
                    }
                }
            })
            // return new sap.ui.commons.Dialog({
            //     id: pID,
            //     title: pTitle,
            //     width: pWidth,
            //     height: pHeight,
            //     modal: pModal,
            //     resizable: false
            // });
        },
        /**
         * Crete onExec funvtion in your controller to catch callback
         * @param  {} fnCallback : function => will retur rValue (boolean)
         * @param  {} title : string
         * @param  {} msg : string
         */
        ConfirmExec: function (fnCallback, title = "Execution Confirmation", msg = "Apakah anda yakin ?") {
            return sap.ui.commons.MessageBox.confirm(msg, fnCallback, title)
            // return dialog
        },
        Panel: function (pID, pTitle, pWidth, pExpandable, pExpanded) {
            pWidth = (pWidth != "", "100%", pWidth);
    
            return new sap.m.Panel({
                id: pID,
                width: pWidth,
                expandable: pExpandable,
                expanded: pExpanded,
                expandAnimation: true,
                busyIndicatorDelay: 0,
                backgroundDesign: sap.m.BackgroundDesign.Translucent,
                headerText: pTitle
    
            })
            // .addStyleClass("sapMPanelIsi");
        },
        PanelM: function (pID, pHeaderText, pWidth, pHeight, pExpandable, pbackgroundDesign) {
            var ppBackgroundDesign;
    
            switch (pbackgroundDesign) {
                case "Solid":
                    ppBackgroundDesign = sap.m.BackgroundDesign.Solid;
                    break;
                case "Translucent":
                    ppBackgroundDesign = sap.m.BackgroundDesign.Translucent;
                    break;
                case "Transparent":
                    ppBackgroundDesign = sap.m.BackgroundDesign.Transparent;
                    break;
                default:
                    ppBackgroundDesign = sap.m.BackgroundDesign.Translucent;
            }
    
            return new sap.m.Panel({
                id: pID,
                width: pWidth,
                height: "100%",
                expandable: pExpandable,
                backgroundDesign: ppBackgroundDesign,
                headerText: pHeaderText
            });
        },
        Matrix: function (pID, pWidth, pLayoutFixed, pWidths, pColumns) {
            return new sap.ui.commons.layout.MatrixLayout({
                id: pID,
                width: pWidth,
                layoutFixed: pLayoutFixed,
                widths: pWidths,
                columns: pColumns
            })
        },
        MatrixLayoutRow: function () {
            return new sap.ui.commons.layout.MatrixLayoutRow();
        },
        MatrixLayoutCell: function () {
            return new sap.ui.commons.layout.MatrixLayoutCell();
        },
        Label: function (pID, pText, pDesign, pWidth) {
            var ppDesign;
            //ppDesign = (pDesign == "", ppDesign=sap.ui.commons.LabelDesign.Standard, sap.ui.commons.LabelDesign.Bold);
            switch (pDesign) {
                case "Bold":
                    ppDesign = sap.ui.commons.LabelDesign.Bold;
                    break;
                default:
                    ppDesign = sap.ui.commons.LabelDesign.Standard;
            }
    
            return new sap.ui.commons.Label({
                id: pID,
                text: pText,
                design: ppDesign,
                width: pWidth,
                tooltip: pText
            })
        },
        LabelToolbar: function (pID, pText, pDesign, pWidth) {
            var ppDesign;
            //ppDesign = (pDesign == "", ppDesign=sap.ui.commons.LabelDesign.Standard, sap.ui.commons.LabelDesign.Bold);
            switch (pDesign) {
                case "Bold":
                    ppDesign = sap.ui.commons.LabelDesign.Bold;
                    break;
                default:
                    ppDesign = sap.ui.commons.LabelDesign.Standard;
            }
    
            return new sap.ui.commons.Label({
                id: pID,
                text: pText,
                design: ppDesign,
                width: pWidth,
                tooltip: pText
            }).addStyleClass("zstyle-label-toolbar")
        },
        Button: function (pID, pText, pTooltip, pIcon, pLite, pStyle) {
            var ppStyle;
    
            switch (pStyle) {
                case "Accept":
                    ppStyle = sap.m.ButtonType.Accept;
                    break;
                case "Default":
                    ppStyle = sap.m.ButtonType.Default;
                    break;
                case "Emph":
                    ppStyle = sap.m.ButtonType.Emphasized;
                    break;
                case "Reject":
                    ppStyle = sap.m.ButtonType.Reject;
                    break;
                case "Transparent":
                    ppStyle = sap.m.ButtonType.Transparent;
                    break;
                default:
                    ppStyle = sap.m.ButtonType.Default;
            }
    
            return new sap.m.Button({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                icon: pIcon,
                type: ppStyle
                // lite: pLite,
            });
        },
        ButtonNew: function (id) {
            return SAPUI.Button(id, "", "New", "sap-icon://add-document", false, sap.m.ButtonType.Transparent)
        },
        ButtonEdit: function (id) {
            return SAPUI.Button(id, "", "Edit", "sap-icon://edit", false, sap.m.ButtonType.Transparent)
        },
        ButtonDisplay: function (id) {
            return SAPUI.Button(id, "", "Display", "sap-icon://display", false, sap.m.ButtonType.Transparent)
        },
        ButtonDelete: function (id) {
            return SAPUI.Button(id, "", "Delete", "sap-icon://delete", false, sap.m.ButtonType.Transparent)
        },
        ButtonToolbar: function (pID, pText, pTooltip, pIcon, pType) {
            return new sap.m.Button({
                id: pID,
                text: pText,
                tooltip: pTooltip,
                icon: pIcon,
                type: pType,
            });
        },
        ToolbarM: function (pID) {
            return new sap.m.Toolbar({
                id: pID,
                enabled: true,
                content: [
                    new sap.m.ToolbarSpacer()
                ]
            });
        },
        ButtonSave: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "",
                tooltip: "",
                icon: "sap-icon://save",
                lite: false,
                style: "Accept",
                // press:function(){
                //     Global.LogTime(Global.getQueryVariable("NumberRange"))
                // }
            }).addStyleClass("roundedbuttoncari")
        },
        ButtonExecute: function (pID, text = "Execute", type = "Default") {
            return SAPUI.Button(pID, text, text, "sap-icon://begin", false, type)
        },
        ButtonPreparation: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Preparation",
                tooltip: "Preparation",
                icon: "sap-icon://arrow-down",
                lite: false,
                style: "Accept"
            });
        },
        ButtonErrorLog: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Show Error Log",
                tooltip: "Show Error Log",
                icon: "sap-icon://accept",
                lite: false,
                style: "Accept"
            });
        },
        ButtonPreparationCancel: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Preparing Cancellation",
                tooltip: "Preparing Cancellation",
                icon: "sap-icon://arrow-down",
                lite: false,
                style: "Accept"
            });
        },
        ButtonPrint: function (pID, pText) {
            return new sap.ui.commons.Button({
                id: pID,
                text: pText,
                tooltip: "",
                icon: "sap-icon://print",
                lite: false,
                style: "Accept"
            });
        },
        ButtonToggle: function (pID, pText) {
            return new sap.m.ToggleButton({
                id: pID,
                text: pText,
                tooltip: pText,
                icon: "sap-icon://multi-select",
                //          lite: false,
                //          type: "Accept"
            })
        },
        ButtonStop: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Stop",
                tooltip: "",
                icon: "sap-icon://stop",
                lite: false,
                style: "Accept"
            });
        },
        ButtonMaterial: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Material",
                tooltip: "",
                icon: "sap-icon://org-chart",
                lite: false,
                style: "Accept"
            });
        },
        ButtonRelease: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Release",
                tooltip: "",
                icon: "sap-icon://flag",
                lite: false,
                style: "Accept"
            });
        },
        ButtonHeader: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Header",
                tooltip: "",
                icon: "sap-icon://header",
                lite: false,
                style: "Accept"
            });
        },
        ButtonDetermineCost: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Determine Cost",
                tooltip: "",
                icon: "sap-icon://simulate",
                lite: false,
                style: "Accept"
            });
        },
        ButtonCancelJR: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Cancel JR",
                tooltip: "",
                icon: "sap-icon://cancel",
                lite: false,
                style: "Accept"
            });
        },
        ButtonChangeWinder: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Change Winder",
                tooltip: "",
                icon: "sap-icon://request",
                lite: false,
                style: "Accept"
            });
        },
        ButtonOK: function (pID) {
            return SAPUI.Button(pID, "OK", "OK", "sap-icon://accept", false, sap.m.ButtonType.Accept)
    
            // return new sap.ui.commons.Button({
            //     id: pID,
            //     text: "OK",
            //     tooltip: "",
            //     icon: "sap-icon://accept",
            //     lite: false,
            //     style: "Accept"
            // });
        },
        ButtonCancel: function (pID) {
            // return SAPUI.Button(pID, "Batal", "Batal", "sap-icon://decline", false, sap.m.ButtonType.Reject)
            return SAPUI.Button("", "Cancel", "", "", false, "")
            // return new sap.ui.commons.Button({
            //     id: pID,
            //     text: "Batal",
            //     tooltip: "",
            //     icon: "sap-icon://decline",
            //     lite: false,
            //     style: "Reject"
            // });
        },
        ButtonLock: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "",
                tooltip: "",
                icon: "sap-icon://locked",
                lite: false,
                style: "Default"
            });
        },
        ButtonCheck: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "",
                tooltip: "Check",
                icon: "sap-icon://synchronize",
                lite: false,
                style: "Accept"
            });
        },
        ButtonDone: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Done",
                tooltip: "",
                icon: "",
                lite: false,
                style: "Accept",
                press: function () {
                    Global.LogTime(Global.getQueryVariable("NumberRange"))
                }
            });
        },
        ButtonClose: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Close",
                tooltip: "",
                icon: "",
                lite: false,
                style: "Reject",
    
            });
        },
        ButtonUpload: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Upload",
                tooltip: "",
                icon: "",
                lite: false,
                style: "Accept"
            });
        },
        ButtonDownload: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Download",
                tooltip: "",
                icon: "",
                lite: false,
                style: "Accept"
            });
        },
        //button donwload data export to csv
        ButtonDownloadCsv: function (pID, pTable) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Export",
                tooltip: "",
                icon: "sap-icon://download",
                lite: false,
                style: "Accept",
                press: function () {
                    var table = sap.ui.getCore().byId(pTable);
                    var data = sap.ui.getCore().getModel("tabelModel").getData();
                    var getCountData = table.getBinding("rows").getLength();
                    var wsUrl = urlWebservice + "LogDownload";
                    $.ajax({
                        url: wsUrl,
                        type: 'post',
                        dataType: 'json',
                        data: "{'User':'" + U5312UX5 + "', 'Tvarian':'" + X_VarianUX5 + "', 'Data':'" + getCountData + "', 'server':'" + Server1 + "' ,'IP2':'" + ClientIP + "'}",
                        success: function (result) {
                            console.log(result)
    
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Error');
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                    console.log("button download" + getCountData)
                }
            });
        },
        //button cancel order dengna memanggil fungsi GLobal.cancel
        ButtonCancelAdmin: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "",
                tooltip: "Cancel",
                icon: "sap-icon://cancel",
                lite: false,
                style: "Reject",
                press: function () {
                    Global.CancelAdmin(Global.getQueryVariable("NumberRange"))
                }
    
            });
        },
        //button pending order dengna memanggil fungsi GLobal.pending
        ButtonPendingAdmin: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "",
                tooltip: "Pending",
                icon: "sap-icon://pending",
                lite: false,
                style: "Accept",
                press: function () {
                    Global.PendingAdmin(Global.getQueryVariable("NumberRange"))
                }
            });
        },
        ButtonSortandFilter: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "Sort and Filter",
                tooltip: "Sort and Filter",
                icon: "sap-icon://filter",
                lite: false,
                style: "Default"
            });
        },
        TextView: function (pID, pText, pToolTip, pWidth, pWrapping) {
            return new sap.ui.commons.TextView({
                id: pID,
                text: pText,
                tooltip: pToolTip,
                width: pWidth,
                wrapping: pWrapping,
            });
        },
        ValueHelpField: function (pID, pValue, pTooltip, pIconURL, pWidth, pMaxLength) {
            // new sap.ui.commons.ValueHelpField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                tooltip: pTooltip,
                maxLength: pMaxLength,
                //            iconURL: pIconURL,
                width: pWidth,
                showValueHelp: true,
                change: function () {
                    Global.Uppercase(this)
                },
            }).addStyleClass("sapUiSizeCompact")
        },
    
        ValueHelpFieldNoUpper: function (pID, pValue, pTooltip, pIconURL, pWidth, pMaxLength) {
            // new sap.ui.commons.ValueHelpField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                tooltip: pTooltip,
                maxLength: pMaxLength,
                //            iconURL: pIconURL,
                width: pWidth,
                showValueHelp: true
            }).addStyleClass("sapUiSizeCompact")
        },
    
        ValueHelpFieldNum: function (pID, pValue, pTooltip, pIconURL, pWidth) {
            // new sap.ui.commons.ValueHelpField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                tooltip: pTooltip,
                //            iconURL: pIconURL,
                width: pWidth,
                showValueHelp: true,
                change: function () {
                    Global.Uppercase(this)
                },
            }).attachBrowserEvent('keypress', e => {
                e = (e) ? e : window.event;
                let charCode = (e.which) ? e.which : e.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
            }).addStyleClass("sapUiSizeCompact")
        },
        ValueHelpField2: function (pID, pValue, pTooltip, pIconURL, pWidth) {
            return new sap.m.Input({
                id: pID,
                value: pValue,
                tooltip: pTooltip,
                //            iconURL: pIconURL,
                width: pWidth,
                showValueHelp: true,
                change: function () {
                    Global.Lowercase(this)
                },
            }).addStyleClass("sapUiSizeCompact")
        },
        //komponen untuk get time yang dimasukkan ke dalam komponen textfield
        TextTime: function (pID, pWidth, pEnabled, pEditable) {
            var time = Global.GetTime();
    
            return new sap.m.Input({
                id: pID,
                value: time,
                width: pWidth,
                enabled: pEnabled,
                editable: pEditable
            }).addStyleClass("sapUiSizeCompact")
        },
        TimePicker: function (pID, pWidth, pEnabled, pEditable) {
            // var time = Global.GetDateTimeServer("Time");
            var convertedValue = new Date(new Date().toDateString() + ' ').toTimeString().split(' ')[0]
            if (pEnabled === true) {
                pEnabled = true
            } else {
                pEnabled = false
            }
    
            if (pEditable === true) {
                pEditable = true
            } else {
                pEditable = false
            }
            //        console.log(convertedValue)
            return new sap.m.TimePicker({
                    id: pID,
                    // value: "23:00:00",
                    valueFormat: "HH:mm:ss",
                    displayFormat: "HH:mm:ss"
                }).setWidth(pWidth)
                .setEnabled(pEnabled)
                .setEditable(pEditable)
                .addStyleClass("sapUiSizeCompact")
        },
        TextField: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
            // new sap.ui.commons.TextField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                width: pWidth,
                maxLength: pMaxLength,
                enabled: pEnabled,
                editable: pEditable,
                change: function (e) {
                    var usrval = this.getValue().toUpperCase();
                    this.setValue(usrval)
                }
            }).addStyleClass("sapUiSizeCompact")
        },
        TextFieldNumber: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
            // new sap.ui.commons.TextField
            return new sap.m.Input({
                    id: pID,
                    value: pValue,
                    width: pWidth,
                    maxLength: pMaxLength,
                    enabled: pEnabled,
                    editable: pEditable
                })
                .attachBrowserEvent('keypress', e => {
                    e = (e) ? e : window.event;
                    let charCode = (e.which) ? e.which : e.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
                })
                .addStyleClass("sapUiSizeCompact")
        },
        TextFieldNoUpper: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
            // new sap.ui.commons.TextField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                width: pWidth,
                maxLength: pMaxLength,
                enabled: pEnabled,
                editable: pEditable
            }).addStyleClass("sapUiSizeCompact")
        },
        /**
         * Auto Formatted to comma thousand
         * */
        TextFieldComma: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
            // new sap.ui.commons.TextField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                width: pWidth,
                maxLength: pMaxLength,
                enabled: pEnabled,
                editable: pEditable,
                change: function () {
                    var usrval = formatNumber(this.getValue());
                    this.setValue(usrval)
                }
            }).addStyleClass("sapUiSizeCompact")
    
            function formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            }
        },
        TextField2: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
    
            return new sap.m.Input({
                id: pID,
                value: pValue,
                width: pWidth,
                maxLength: pMaxLength,
                enabled: pEnabled,
                editable: pEditable,
                change: function () {
                    var usrval = this.getValue().toCamelCase();
                    this.setValue(usrval)
                }
            });
        },
        getCurrentDate: function (sql = false) {
            var currDate = new Date
    
            const ye = new Intl.DateTimeFormat('en', {
                year: 'numeric'
            }).format(currDate);
            const mo = new Intl.DateTimeFormat('en', {
                month: '2-digit'
            }).format(currDate);
            const da = new Intl.DateTimeFormat('en', {
                day: '2-digit'
            }).format(currDate);
    
            if (sql) {
                return {
                    obj: currDate,
                    formatted: ye + "-" + mo + "-" + da
                }
            } else {
                return {
                    obj: currDate,
                    formatted: da + "." + mo + "." + ye
                }
            }
    
    
        },
        DatePicker: function (pID, pWidth = "auto", pEnabled = true, pEditable = true) {
            var date = Global.GetDate();
            var oModelDate = new sap.ui.model.json.JSONModel();
            oModelDate.setData({
                // dateValue: new Date()
            });
    
            sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");
    
    
            return new sap.m.DatePicker({
                    id: pID,
                    width: pWidth,
                    change: function () {
                        let isValid = this.isValidValue()
                        this.setValueState(isValid ? "Success" : "Error")
                        if (!isValid) {
                            SAPUI.MessageBoxError("Mohon masukkan tanggal yang benar")
                            this.setValue("")
                        }
                    },
                    // value: {
                    //     path: pID + "oModelDate>/dateValue",
                    //     type: new sap.ui.model.type.Date({ pattern: "dd.MM.yyyy", strictParsing: true })
                    // },
                    displayFormat: "dd.MM.yyyy"
                }).setValueFormat("yyyy-MM-dd")
                .addStyleClass("sapUiSizeCompact")
                .setEnabled(pEnabled)
                .setEditable(pEditable)
        },
        ValidateDatePicker: function (start, end) {
            let startVald = start.isValidValue()
            let endVald = end.isValidValue()
    
            let startVal = start.getDateValue()
            let endVal = end.getDateValue()
    
            start.setValueState(startVal ? "Success" : "Error")
            end.setValueState(endVal ? "Success" : "Error")
    
            if (startVal && endVal) {
                start.setValueState(startVald ? "Success" : "Error")
                end.setValueState(endVald ? "Success" : "Error")
            }
    
            let rangeVald = startVal < endVal
    
            if (!rangeVald) {
                start.setValueState("Error")
                end.setValueState("Error")
    
                SAPUI.MessageBoxError("End Date tidak boleh lebih kecil dari Start Date")
            }
            return startVald && endVald && startVal && endVal && rangeVald
        },
        //ambil tanggal bulan sekarang dan bulan kemarin
        DatePicker2: function (pID, pWidth) {
    
            var oModelDate2 = new sap.ui.model.json.JSONModel();
            oModelDate2.setData({
                myDate: new Date()
            });
            sap.ui.getCore().setModel(oModelDate2, pID + "oModelDate2");
    
            var year = new Date().getFullYear();
            var month = new Date().getMonth(); //month Index from 0, August 7
            var totalDayOfTwoMonthAgo = new Date(year, month - 1, 0).getDate(); //juni -1
            var totalDayOfThisMonth = new Date(year, month + 1, 0).getDate();
    
            var oneMonthAgo = new Date();
            oneMonthAgo.setDate(totalDayOfTwoMonthAgo);
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2)
    
            var oneMonth = new Date();
            oneMonth.setDate(totalDayOfThisMonth);
            oneMonth.setMonth(oneMonth.getMonth())
    
            var dateNow = new Date()
            dateNow.getDate()
    
            return new sap.m.DatePicker({
                id: pID,
                width: pWidth,
                value: {
                    path: pID + "oModelDate2>/myDate",
                    type: new sap.ui.model.type.Date({
                        pattern: "dd.MM.yyyy",
                        strictParsing: true
                    }, {
                        minimum: oneMonthAgo,
                        maximum: oneMonth
                    })
                },
                displayFormat: "dd.MM.yyyy"
            }).setValueFormat("yyyyMMdd");
        },
        //datepicker untuk ambil tanggal max 1 bulan dari tanggal skrg
        DatePicker3: function (pID, pWidth, pEnabled, pEditable) {
            if (pEnabled === true) {
                pEnabled = true
            } else {
                pEnabled = false
            }
            if (pEditable === true) {
                pEditable = true
            } else {
                pEditable = false
            }
    
            var date = Global.GetDate();
    
            var oModelDate = new sap.ui.model.json.JSONModel();
            oModelDate.setData({
                dateValue: new Date()
            });
    
            var oneMonthAgo = new Date();
            var date = new Date()
            var date2 = date.getDate();
            oneMonthAgo.setDate(oneMonthAgo.getDate() - date2)
    
            sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");
    
            return new sap.m.DatePicker({
                    id: pID,
                    width: pWidth,
                    value: {
                        path: pID + "oModelDate>/dateValue",
                        type: new sap.ui.model.type.Date({
                            pattern: "dd.MM.yyyy",
                            strictParsing: true
                        }, {
                            minimum: oneMonthAgo
                        })
                    },
                    minDate: oneMonthAgo,
                    displayFormat: "dd.MM.yyyy"
                }).setValueFormat("yyyyMMdd")
                .addStyleClass("sapUiSizeCompact")
                .setEnabled(pEnabled)
                .setEditable(pEditable)
        },
        //datepicker untuk nilai default kosong
        DatePicker4: function (pID, pWidth, pEnabled, pEditable) {
            var date = Global.GetDate();
            var oModelDate = new sap.ui.model.json.JSONModel();
            oModelDate.setData({
                dateValue: null
            });
            if (pEnabled === true) {
                pEnabled = true
            } else {
                pEnabled = false
            }
            if (pEditable === true) {
                pEditable = true
            } else {
                pEditable = false
            }
    
            sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");
    
            return new sap.m.DatePicker({
                    id: pID,
                    width: pWidth,
                    value: {
                        path: pID + "oModelDate>/dateValue",
                        type: new sap.ui.model.type.Date({
                            // pattern: "dd.MM.yyyy",
                            strictParsing: true
                        })
                    },
                    displayFormat: "dd.MM.yyyy",
                    valueFormat: "yyyy-MM-dd"
                })
                .addStyleClass("sapUiSizeCompact")
                .setEnabled(pEnabled)
                .setEditable(pEditable)
        },
        //datepicker tidak boleh ambil bulan mundur dari bulan sekarang
        DatePicker5: function (pID, pWidth) {
    
            var oModelDate2 = new sap.ui.model.json.JSONModel();
            oModelDate2.setData({
                myDate: new Date()
            });
            sap.ui.getCore().setModel(oModelDate2, pID + "oModelDate2");
    
            var year = new Date().getFullYear();
            var month = new Date().getMonth(); //month Index from 0, August 7
            var totalDayOfTwoMonthAgo = new Date(year, month - 1, 0).getDate(); //juni -1
            var totalDayOfThisMonth = new Date(year, month + 1, 0).getDate();
    
            var oneMonthAgo = new Date();
            oneMonthAgo.setDate(totalDayOfTwoMonthAgo);
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    
            var oneMonth = new Date();
            oneMonth.setDate(totalDayOfThisMonth);
            oneMonth.setMonth(oneMonth.getMonth())
    
            var dateNow = new Date()
            dateNow.getDate()
    
            return new sap.m.DatePicker({
                id: pID,
                width: pWidth,
                value: {
                    path: pID + "oModelDate2>/myDate",
                    type: new sap.ui.model.type.Date({
                            pattern: "dd.MM.yyyy",
                            strictParsing: true
                        }
                        // {
                        //     minDate : oneMonthAgo,
                        //     maxDate : oneMonth
                        // }
                    )
                },
                minDate: oneMonthAgo,
                maxDate: oneMonth,
                displayFormat: "dd.MM.yyyy"
            }).setValueFormat("yyyyMMdd")
        },
        //datepicker tidak boleh ambil bulan mundur dari bulan sekarang
        DatePicker6: function (oDate) {
            var oYearFrom = "";
            var oMonthFrom = "";
            var oDateFrom = "";
    
            for (i = 0; i < oDate.length; i++) {
                if (i < 4) {
                    oYearFrom = oYearFrom.concat(oDate[i])
                } else if (i >= 4 && i <= 5) {
                    oMonthFrom = oMonthFrom.concat(oDate[i])
                } else if (i >= 6 && i <= 7) {
                    oDateFrom = oDateFrom.concat(oDate[i])
                }
            }
            var DateFrom = oDateFrom + "." + oMonthFrom + "." + oYearFrom
    
            return DateFrom
        },
        //datepicker untuk nilai default kosong untuk IT Inv
        DatePickerInv: function (pID, pWidth, pEnabled, pEditable) {
            var date = Global.GetDate();
            var oModelDate = new sap.ui.model.json.JSONModel();
            oModelDate.setData({
                dateValue: null
            });
            if (pEnabled === true) {
                pEnabled = true
            } else {
                pEnabled = false
            }
            if (pEditable === true) {
                pEditable = true
            } else {
                pEditable = false
            }
    
            sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");
    
            return new sap.m.DatePicker({
                    id: pID,
                    width: pWidth,
                    value: {
                        path: pID + "oModelDate>/dateValue",
                        type: new sap.ui.model.type.Date({
                            pattern: "dd.MM.yyyy",
                            strictParsing: true
                        })
                    },
                    displayFormat: "dd.MM.yyyy",
                    valueFormat: "dd.MM.yyyy"
                })
                .addStyleClass("sapUiSizeCompact")
                .setEnabled(pEnabled)
                .setEditable(pEditable)
        },
        TextFieldPassword: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
    
            return new sap.ui.commons.PasswordField({
                id: pID,
                value: pValue,
                width: pWidth,
                maxLength: pMaxLength,
                enabled: pEnabled,
                editable: pEditable,
            });
        },
        //komponen file uploader
        FileUploader: function (pID, pIcon, pButtonOnly, pIconOnly, pWidth) {
            return new sap.ui.commons.FileUploader({
                id: pID,
                icon: pIcon,
                buttonOnly: pButtonOnly,
                iconOnly: pIconOnly,
                width: pWidth,
                mimeType: [
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel"
                ],
    
            });
        },
    
        FileUploaderImages: function (pID, pIcon, pButtonOnly, pIconOnly, pWidth, pName, pMultipleSelect, pUploadOnChange) {
            return new sap.ui.unified.FileUploader({
                id: pID,
                icon: pIcon,
                buttonOnly: pButtonOnly,
                iconOnly: pIconOnly,
                width: pWidth,
                name: pName,
                multiple: pMultipleSelect,
                uploadOnChange: pUploadOnChange,
                //mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
        },
        // sap.m.Table implementation 
        MTable: function (pID, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData, pOrderColumn = true) {
            return new sap.m.Table(pID, {
                headerDesign: sap.m.ListHeaderDesign.Standard,
                mode: sap.m.ListMode.None,
                includeItemInSelection: true,
                growing: true,
                sticky: ["ColumnHeaders"],
                growingThreshold: 500,
                width: pWidth
            });
        },
        //komponen table
        Table: function (pID, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData, pOrderColumn = true) {
            var ppSelectionMode, ppNavigationMode;
    
            switch (pSelectionMode) {
                case "Multi":
                    ppSelectionMode = sap.ui.table.SelectionMode.Multi;
                    break;
                case "MultiToggle":
                    ppSelectionMode = sap.ui.table.SelectionMode.MultiToggle;
                    break;
                case "None":
                    ppSelectionMode = sap.ui.table.SelectionMode.None;
                    break;
                case "Single":
                    ppSelectionMode = sap.ui.table.SelectionMode.Single;
                    break;
                default:
                    ppSelectionMode = sap.ui.table.SelectionMode.Single;
            }
            switch (pNavigationMode) {
                case "Paginator":
                    ppNavigationMode = sap.ui.table.NavigationMode.Paginator;
                    break;
                case "Scrollbar":
                    ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
                    break;
                default:
                    ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
            }
    
            return new sap.ui.table.Table({
                id: pID,
                width: pWidth,
                //            columnHeaderVisible:false,
                //            fixedRowCount:1,
                //            fixedColumnCount:0,
                //            alternateRowColors:true,
                //            enableColumnFreeze:true,
                visibleRowCount: pVisibleRowCount,
                // visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                // firstVisibleRow: 3,
                selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                selectionMode: ppSelectionMode,
                // navigationMode: sap.ui.table.NavigationMode.Paginator,
                showNoData: pShowNoData,
                enableColumnReordering: pOrderColumn
            });
        },
        //untuk komponen toolbar space
        ToolbarSpacer: function () {
            return new sap.m.ToolbarSpacer();
        },
        //untuk get ID komponen
        GetCore: function (pId) {
            return sap.ui.getCore().byId(pId);
        },
        //09-01-2018
        //Fungsi untuk mendapatkan komponen (valueHelpField, Date, TextField, dll) yang di dalam tabel.
        GetComponentInTable: function (idTable, indexRow, indexCol) {
            var oTable = SAPUI.GetCore(idTable);
            var idComponent = oTable.getRows()[indexRow].getCells()[indexCol].getId();
            var component = SAPUI.GetCore(idComponent);
    
            return component;
        },
        // Implementasi sap.m.Column
        MColumnHeader: function (pLabelText, pTemplate, pBind, pWidth, phAlign, pMergeDuplicates, pID) {
            return new sap.m.Column(pID, {
                header: pTemplate instanceof sap.ui.core.Control ? pTemplate : new sap.m.Label({
                    text: pLabelText,
                    tooltip: pLabelText,
                    textAlign: "Center"
                }),
                mergeDuplicates: pMergeDuplicates,
                width: pWidth,
                hAlign: phAlign
            })
        },
        // Implementasi ColumnListItem
        ColumnListItem: function (pID) {
            return new sap.m.ColumnListItem(pID, {
                type: "Active"
            })
        },
        /** fungsi komponen kolom
         * @pLabelText untuk mengisi title kolom
         * @pTemplate template komponen yang akan digunakan textfield, valuehelp, textview
         * @pWidth untuk mengisi width kolom
         * @phAlign untuk mengisi alignment title kolom
         * @pTextAlign untuk mengisi alignment content / isi kolom
         * @pID untuk mengisi id komponen kolom
         * @pMaxLength untuk mengisi max length dari komponen misal textfield
         * @pComponen untuk mengisi komponen IconByData
         * @Field untuk mengisi parameter SP valuhelp Field
         * @OnProses untuk mengisi parameter SP OnProses
         * @value untuk mengisi parameter SP value , isi inputan "" -> jika tidak ada filter,"param"-> jika ada satu filter , ["",""] -> jika filter lebih dari 2
         * @table untuk mengambil id table yang akan digunakan untuk komponen valuehelpfield
         * @Mode untuk parameter jika komponen valuehelp menggunkan library berbeda
         *
         */
    
        Column: function (pLabelText, pTemplate, pBind, pWidth, phAlign, pTextAlign, pID, pMaxLength, pComponen, Field, OnProses, pValue, pTable, pKeyBindKolom, arrKolom) {
            var ppTemplate;
            var ppTextAlign;
    
    
            switch (pTextAlign) {
                case "Left":
                    ppTextAlign = sap.ui.core.TextAlign.Left;
                    break;
                case "Right":
                    ppTextAlign = sap.ui.core.TextAlign.Right;
                    break;
                case "Center":
                    ppTextAlign = sap.ui.core.TextAlign.Center;
                    break;
                default:
                    ppTextAlign = sap.ui.core.TextAlign.Right;
            }
    
            //console.log("template " + pTemplate)
    
            switch (pTemplate) {
                case "IconImageByData":
                    //=====================================================================================
                    //Path Icon : WebContent/asset/icon
    
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.Label();
                    } else {
    
                        var ico = new Array();
    
                        function createIcon(nIdx) {
                            var oKey = Object.keys(pComponen.data[nIdx]); // get object variable name
                            var iconName = pComponen.data[nIdx][oKey]; // get object value
    
                            var tmpIco = new sap.ui.commons.Label("", {
                                icon: ("asset/icon/" + iconName + ".png"),
                                visible: {
                                    path: pComponen.colTarget,
                                    formatter: function (val) {
                                        return val == oKey;
                                    }
                                }
                            });
                            return tmpIco;
                        }
    
                        for (var i = 0; i < pComponen.data.length; i++) {
    
                            ico[i] = createIcon(i);
                        }
    
    
                        ppTemplate = new sap.ui.layout.HorizontalLayout("", {
                            content: ico
                        });
                    }
                    break;
                case "IconByData":
                    //=====================================================================================
                    //Path Icon : WebContent/asset/icon
    
                    if (pBind == "") {
                        ppTemplate = new sap.ui.core.Icon();
                    } else {
    
                        var ico = new Array();
    
                        function createIcon(nIdx) {
                            var oKey = Object.keys(pComponen.data[nIdx]); // get object variable name
                            var iconName = pComponen.data[nIdx][oKey]; // get object value
    
                            var tmpIco = new sap.ui.core.Icon("", {
                                src: ("sap-icon://" + iconName),
                                visible: {
                                    path: pComponen.colTarget,
                                    formatter: function (val) {
                                        return val == oKey;
                                    }
                                }
                            });
                            return tmpIco;
                        }
    
                        for (var i = 0; i < pComponen.data.length; i++) {
    
                            ico[i] = createIcon(i);
                        }
    
                        ppTemplate = new sap.ui.layout.HorizontalLayout("", {
                            content: ico
                        });
                    }
                    break;
                case "Icon":
                    //=====================================================================================
    
                    if (pBind == "") {
                        ppTemplate = new sap.ui.core.Icon();
    
                    } else {
    
                        var ico = new Array();
    
                        function createIcon(nIdx) {
                            var tmpIco = new sap.ui.core.Icon("", {
                                src: ("sap-icon://" + pComponen[nIdx]),
                                visible: {
                                    path: pBind,
                                    formatter: function (val) {
                                        return val == nIdx + 1;
                                    }
                                }
                            });
                            return tmpIco;
                        }
    
                        for (var i = 0; i < pComponen.length; i++) {
                            ico[i] = createIcon(i);
                        }
    
                        ppTemplate = new sap.ui.layout.HorizontalLayout("", {
                            content: ico
                        });
                    }
    
                    break;
                case "IconImage":
                    //=====================================================================================
                    //Path : WebContent/asset/icon
    
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.Label();
                    } else {
    
                        var ico = new Array();
    
                        function createIcon(nIdx) {
                            var tmpIco = new sap.ui.commons.Label("", {
                                icon: ("asset/icon/" + pComponen[nIdx] + ".png"),
                                visible: {
                                    path: pBind,
                                    formatter: function (val) {
                                        return val == nIdx + 1;
                                    }
                                }
                            });
                            return tmpIco;
                        }
    
                        for (var i = 0; i < pComponen.length; i++) {
                            ico[i] = createIcon(i);
                        }
    
                        ppTemplate = new sap.ui.layout.HorizontalLayout("", {
                            content: ico
                        });
                    }
                    break;
                case "TextView":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.TextView();
                    } else {
                        ppTemplate = new sap.ui.commons.TextView().setTextAlign(ppTextAlign).setWrapping(true).bindProperty("text", pBind);
                    }
                    break;
                case "TextViewMerge":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.TextView();
                    } else {
                        ppTemplate = new sap.ui.commons.TextView('', {}).setTextAlign(ppTextAlign).setWrapping(true).bindProperty("text", pBind)
                    }
                    break;
                case "RadioButtonGroup":
                    if (pBind == "") {
                        ppTemplate = pComponen;
                    } else {
                        ppTemplate = pComponen.bindProperty("selectedIndex", pBind);
                    }
                    break;
                case "RadioButton":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.RadioButton();
                    } else {
                        ppTemplate = new sap.ui.commons.RadioButton().bindProperty("selected", pBind);
                    }
                    break;
                case "ValueHelpField":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            showValueHelp: true
                        }).addStyleClass("sapUiSizeCompact")
                    } else {
                        var idF4;
    
                        var oDialog = SAPUI.Dialog("", "Select Data", "400px", "auto", true);
                        var oTable = SAPUI.Table("", "100%", 10, "Single", "Scroll")
    
                        var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph")
                        var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")
    
    
                        var oModel = new sap.ui.model.json.JSONModel([]);
                        var pValFilter
                        if (pValue == "" || pValue == undefined || pValue.length == 0) {
                            pValFilter = ""
                        } else {
                            pValFilter = pValue
                        }
                        console.log(pValFilter, pValFilter.length)
    
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            showValueHelp: true,
                            valueHelpRequest: function (oEvent) {
                                //ambil id cell table yang di klik
                                idF4 = oEvent.getParameter("id")
                                var valFilter
    
    
                                var idxSelectedRow = this.getBindingContext().getPath().split("/")[2];
                                var idxModel = this.getBindingContext().getPath().split("/")[1];
                                /*cara untuk ambil row data dari cell yang diklik di table*/
                                /*cara1
                                var tes=oEvent.getSource().getBindingContext().getPath()
                                 //cara 2
                                var currentRowContext = oEvent.getSource().getBindingContext().getObject();
                                console.log(tes)*/
    
                                if (isArray(pValFilter)) {
                                    var combineValFilter = []
    
                                    var model = this.getModel()
                                    //get row data from selected cell table
                                    var path = oEvent.getSource().getBindingContext().getPath();
                                    var obj = model.getProperty(path);
    
                                    for (var i = 0; i < pValFilter.length; i++) {
                                        combineValFilter.push(obj[pValFilter[i]])
                                    }
                                    valFilter = combineValFilter
                                } else {
                                    valFilter = pValFilter
                                }
                                if (pTable == undefined) {
                                    console.log("bukan kolom")
                                    Global.F4Filter("", "", pLabelText, Field, OnProses, valFilter, idF4)
                                } else {
                                    console.log(" kolom")
                                    Global.F4FilterKolom(pLabelText, Field, OnProses, valFilter, idF4, pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel)
                                    //
                                }
                                console.log(pKeyBindKolom)
    
    
                                //                        	Global.F4FilterToBindColumn("","",pLabelText,Field,OnProses,pValFilter,idF4,table)
    
    
                                //
    
                            },
                            change: function (e) {
                                Global.Uppercase(this)
                                var idxSelectedRow = this.getBindingContext().getPath().split("/")[2];
                                var idxModel = this.getBindingContext().getPath().split("/")[1];
                                Global.F4FilterGetTextRowTbl(this, "", this, Field, "", "", "", "", "", pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel)
                            },
                        }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact");
    
                        //cek if value == array
                        function isArray(arr) {
                            return arr instanceof Array;
                        }
    
                    }
                    break;
                case "ValueHelpField2":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            showValueHelp: true,
                        }).addStyleClass("sapUiSizeCompact")
                    } else {
                        ppTemplate = new sap.m.Input({
                            showValueHelp: true,
                            valueHelpRequest: async function (oEvent) {
                                let view = SAPUI.GetCore("id" + Global.getCurrentRoute())
                                let controller = view.getController()
    
                                if (typeof controller.attachVH2 == 'function') {
                                    await controller.attachVH2(oEvent, pLabelText)
                                }
                            }
                        }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
                    break;
                case "ValueHelpField3":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            showValueHelp: true
                        }).bindProperty("editable", "vhfEditable").addStyleClass("sapUiSizeCompact")
                    } else {
                        var idF4;
    
                        var oDialog = SAPUI.Dialog("", "Select Data", "400px", "auto", true);
                        var oTable = SAPUI.Table("", "100%", 10, "Single", "Scroll")
    
                        var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph")
                        var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")
    
    
                        var oModel = new sap.ui.model.json.JSONModel([]);
                        var pValFilter
                        if (pValue == "" || pValue == undefined || pValue.length == 0) {
                            pValFilter = ""
                        } else {
                            pValFilter = pValue
                        }
                        // console.log(pValFilter, pValFilter.length)
    
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            showValueHelp: true,
                            valueHelpRequest: function (oEvent) {
                                //ambil id cell table yang di klik
                                idF4 = oEvent.getParameter("id")
                                var valFilter
    
    
                                var idxSelectedRow = this.getBindingContext().getPath().split("/")[2];
                                var idxModel = this.getBindingContext().getPath().split("/")[1];
                                /*cara untuk ambil row data dari cell yang diklik di table*/
                                /*cara1
                                var tes=oEvent.getSource().getBindingContext().getPath()
                                 //cara 2
                                var currentRowContext = oEvent.getSource().getBindingContext().getObject();
                                console.log(tes)*/
    
                                if (isArray(pValFilter)) {
                                    var combineValFilter = []
    
                                    var model = this.getModel()
                                    //get row data from selected cell table
                                    var path = oEvent.getSource().getBindingContext().getPath();
                                    var obj = model.getProperty(path);
    
                                    for (var i = 0; i < pValFilter.length; i++) {
                                        combineValFilter.push(obj[pValFilter[i]])
                                    }
                                    valFilter = combineValFilter
                                } else {
                                    valFilter = pValFilter
                                }
                                if (pTable == undefined) {
                                    console.log("bukan kolom")
                                    Global.F4Filter("", "", pLabelText, Field, OnProses, valFilter, idF4)
                                } else {
                                    console.log(" kolom")
                                    Global.F4FilterKolom(pLabelText, Field, OnProses, valFilter, idF4, pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel)
                                    //
                                }
                                console.log(pKeyBindKolom)
    
    
                                //                        	Global.F4FilterToBindColumn("","",pLabelText,Field,OnProses,pValFilter,idF4,table)
    
    
                                //
    
                            },
                            change: function (e) {
                                Global.Uppercase(this)
                                // var idxSelectedRow = this.getBindingContext().getPath().split("/")[2];
                                // var idxModel = this.getBindingContext().getPath().split("/")[1];
                                // Global.F4FilterGetTextRowTbl(this, "", this, Field, "", "", "", "", "", pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel)
                            },
                        }).bindProperty("value", pBind).bindProperty("editable", "vhfEditable").addStyleClass("sapUiSizeCompact");
    
                        //cek if value == array
                        function isArray(arr) {
                            return arr instanceof Array;
                        }
    
                    }
                    break;
                case "CheckBox":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.CheckBox("", {});
                    } else {
                        ppTemplate = new sap.ui.commons.CheckBox("", {
                            visible: "{" + pBind + "Visible}",
                        })
                    }
    
                    break;
                case "CheckBox2": // Addition in ZPP060F
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.CheckBox("", {});
                    } else {
                        ppTemplate = new sap.ui.commons.CheckBox("", {})
                            .bindProperty("checked", pBind)
                            // .bindProperty("enabled", "FlagEnable")
                            .bindProperty("editable", "FlagEnable")
                    }
                    break;
                    // Checkbox menggunakan expression binding jika value "X"
                case "CheckBoxX":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.CheckBox("", {});
                    } else {
                        ppTemplate = new sap.ui.commons.CheckBox("", {
                                checked: {
                                    path: pBind + "Checked",
    
                                },
                            })
                            .attachChange(function (oEvent) {
                                var index = oEvent.getSource().getParent().getIndex()
                                var tbl = oEvent.getSource().getParent().getParent()
    
                                var context = tbl.getContextByIndex(index)
                                var object = context.getObject()
                                object[pBind] = oEvent.getSource().getChecked() ? "X" : ""
    
                                tbl.getModel().refresh()
                            })
                    }
    
                    break;
                case "ComboBox":
                    if (pBind == "") {
                        ppTemplate = new sap.m.ComboBox().addStyleClass("sapUiSizeCompact");
                    } else {
                        ppTemplate = new sap.m.ComboBox().addStyleClass("sapUiSizeCompact").bindProperty("value", pBind);
                    }
    
                    break;
                case "TextField":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            change: function () {
                                Global.Uppercase(this)
                            },
                        }).addStyleClass("sapUiSizeCompact");
                    } else {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            change: function () {
                                Global.Uppercase(this)
                            },
                            visible: {
                                path: pBind,
                                formatter: function (val) {
                                    return val !== false || typeof val === 'string';
                                }
                            }
                        }).bindProperty("value", pBind).bindProperty("editable", "txfEditable").addStyleClass("sapUiSizeCompact")
                    }
    
                    break;
                case "TextNumeric":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                                maxLength: pMaxLength,
                                change: function () {
                                    Global.Numeric(this)
                                }
                            })
                            .bindProperty("editable", "txnEditable")
                            .attachBrowserEvent('keypress', e => {
                                e = (e) ? e : window.event;
                                let charCode = (e.which) ? e.which : e.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
                            })
                            .addStyleClass("sapUiSizeCompact")
                    } else {
                        ppTemplate = new sap.m.Input({
                                maxLength: pMaxLength,
                                change: function () {
                                    Global.Numeric(this)
                                }
                            })
                            .bindProperty("editable", "txnEditable")
                            .attachBrowserEvent('keypress', e => {
                                e = (e) ? e : window.event;
                                let charCode = (e.which) ? e.which : e.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
                            })
                            .bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
    
                    break;
                case "TextArea":
                    if (pBind == "") {
                        ppTemplate = new sap.m.TextArea({
    
    
                        }).addStyleClass("sapUiSizeCompact")
                    } else {
                        ppTemplate = new sap.m.TextArea({
    
                        }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
    
                    break;
                case "TextFieldComma":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            change: function () {
                                this.setValue(formatNumber(this.getValue()))
                            }
                        }).addStyleClass("sapUiSizeCompact")
                    } else {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            change: function () {
                                this.setValue(formatNumber(this.getValue()))
                            }
                        }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
    
                    function formatNumber(num) {
                        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    }
    
    
                    break;
                case "TextFieldNoUpper":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                        }).addStyleClass("sapUiSizeCompact")
                    } else {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                        }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
    
                    break;
                case "TextFieldFloat":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                                maxLength: pMaxLength,
                                change: function () {
                                    var getValue = ""
                                    var data = this.getValue()
                                    if (data != "") {
                                        getValue = data.split(".")
                                        if (data.includes(".")) {
    
                                            if (getValue.length > parseInt(pMaxLength) - 1) {
                                                SAPUI.MessageBoxWarning("Input is more than the limit " + pMaxLength - 1)
                                                getValue = ""
                                            } else {
                                                getValue = data
                                            }
                                        } else {
                                            if (getValue.length <= parseInt(pMaxLength) - 1) {
                                                getValue = data
                                            } else {
                                                SAPUI.MessageBoxWarning("Input is more than the limit " + pMaxLength - 1)
                                                getValue = ""
                                            }
                                        }
                                    } else {
                                        getValue = ""
                                    }
    
                                    var usrval = formatNumber(getValue);
                                    this.setValue(usrval)
                                }
                            })
                            .bindProperty("editable", "txnEditable")
                            .attachBrowserEvent('keypress', e => {
                                e = (e) ? e : window.event;
                                let charCode = (e.which) ? e.which : e.keyCode;
                                if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                    e.preventDefault();
                                    sap.m.MessageToast.show("Only Number Character Allowed", {
                                        duration: 1000, // default
                                        width: "20em", // defaul
                                        height: "30em",
                                    });
                                } else {
                                    return true
                                }
                            })
                            .addStyleClass("sapUiSizeCompact")
                    } else {
                        ppTemplate = new sap.m.Input({
                                maxLength: pMaxLength,
                                change: function () {
                                    var getValue = ""
                                    var data = this.getValue()
                                    if (data != "") {
                                        getValue = data.split(".")
                                        if (data.includes(".")) {
                                            if (getValue.length > parseInt(pMaxLength) - 1) {
                                                SAPUI.MessageBoxWarning("Input is more than the limit " + pMaxLength - 1)
                                                getValue = ""
                                            } else {
                                                getValue = data
                                            }
                                        } else {
                                            if (getValue.length <= parseInt(pMaxLength) - 1) {
                                                getValue = data
                                            } else {
                                                SAPUI.MessageBoxWarning("Input is more than the limit " + pMaxLength - 1)
                                                getValue = ""
                                            }
                                        }
                                    } else {
                                        getValue = ""
                                    }
    
                                    var usrval = formatNumber(getValue);
                                    this.setValue(usrval)
                                }
                            })
                            .bindProperty("editable", "txnEditable")
                            .attachBrowserEvent('keypress', e => {
                                e = (e) ? e : window.event;
                                let charCode = (e.which) ? e.which : e.keyCode;
    
                                if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                    e.preventDefault();
                                    sap.m.MessageToast.show("Only Number Character Allowed", {
                                        duration: 1000, // default
                                        width: "20em", // defaul
                                        height: "30em",
                                    });
                                } else {
                                    return true
                                }
                            })
                            .bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
    
                    function formatNumber(num) {
                        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                    }
                    break;
                case "CantEmpty":
                    if (pBind == "") {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            change: function () {
                                Global.Empty(this)
                            }
                        }).addStyleClass("sapUiSizeCompact");
                    } else {
                        ppTemplate = new sap.m.Input({
                            maxLength: pMaxLength,
                            change: function () {
                                Global.Empty(this)
                            }
                        }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                    }
    
                    break;
                case "Label":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.Label({})
                            .addStyleClass("sapUiSizeCompact");
                    } else {
                        ppTemplate = new sap.ui.commons.Label({})
                            .bindProperty("tooltip", pBind)
                            .bindProperty("text", pBind)
                            .addStyleClass("sapUiSizeCompact")
                    }
    
                    break;
                case "DatePicker":
                    // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd.MM.yyyy" });
                    var oModelDate = new sap.ui.model.json.JSONModel();
                    oModelDate.setData({
                        // dateValue: new Date()
                    });
                    if (pBind == "") {
                        var oDatePicker1 = new sap.m.DatePicker({
                            // value: {
                            //     path: pID + "oModelDate>/dateValue",
                            //     type: new sap.ui.model.type.Date({
                            //         pattern: "dd.MM.yyyy",
                            //         strictParsing: true
                            //     })
                            // },
                            displayFormat: "dd.MM.yyyy",
                            valueFormat: "yyyy-MM-dd"
                        }).addStyleClass("sapUiSizeCompact")
                        // oDatePicker1.attachChange(
                        //         function(oEvent){
                        //             var start_date = this.getDateValue()
                        //             var date = new Date(start_date);
                        //             var dateStr = format(date);
                        //             this.setValue(dateStr)
                        //         }
                        // );
                        ppTemplate = oDatePicker1
                    } else {
                        var oDatePicker1 = new sap.m.DatePicker({
                            // value: {
                            //     path: pID + "oModelDate>/dateValue",
                            //     type: new sap.ui.model.type.Date({
                            //         pattern: "dd-MM-yyyy",
                            //         // strictParsing: true
                            //     })
                            // },
                            displayFormat: "dd.MM.yyyy",
                            valueFormat: "yyyy-MM-dd"
                        }).addStyleClass("sapUiSizeCompact").bindProperty("value", pBind)
                        // var oDatePicker1 = new sap.m.DatePicker({displayFormat:"dd.MM.yyyy"}).addStyleClass("sapUiSizeCompact")
                        // oDatePicker1.attachChange(
                        //         function(oEvent){
                        //             var start_date = this.getDateValue()
                        //             var date = new Date(start_date);
                        //             var dateStr = format(date);
                        //             this.setValue(dateStr)
                        //         }
                        // ).bindProperty("value", pBind)
                        ppTemplate = oDatePicker1;
                    }
                    break;
                case "DatePickerInv":
                    // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd.MM.yyyy" });
                    var oModelDate = new sap.ui.model.json.JSONModel();
                    oModelDate.setData({
                        dateValue: new Date()
                    });
                    if (pBind == "") {
                        var oDatePicker1 = new sap.m.DatePicker({
                            value: {
                                path: pID + "oModelDate>/dateValue",
                                type: new sap.ui.model.type.Date({
                                    pattern: "dd-MM-yyyy",
                                    strictParsing: true
                                })
                            },
                            displayFormat: "dd-MM-yyyy",
                            valueFormat: "dd-MM-yyyy"
                        }).addStyleClass("sapUiSizeCompact")
                        // oDatePicker1.attachChange(
                        //         function(oEvent){
                        //             var start_date = this.getDateValue()
                        //             var date = new Date(start_date);
                        //             var dateStr = format(date);
                        //             this.setValue(dateStr)
                        //         }
                        // );
                        ppTemplate = oDatePicker1
                    } else {
                        var oDatePicker1 = new sap.m.DatePicker({
                            value: {
                                path: pID + "oModelDate>/dateValue",
                                type: new sap.ui.model.type.Date({
                                    pattern: "dd-MM-yyyy",
                                    strictParsing: true
                                })
                            },
                            displayFormat: "dd-MM-yyyy",
                            valueFormat: "dd-MM-yyyy"
                        }).addStyleClass("sapUiSizeCompact").bindProperty("value", pBind)
                        // var oDatePicker1 = new sap.m.DatePicker({displayFormat:"dd.MM.yyyy"}).addStyleClass("sapUiSizeCompact")
                        // oDatePicker1.attachChange(
                        //         function(oEvent){
                        //             var start_date = this.getDateValue()
                        //             var date = new Date(start_date);
                        //             var dateStr = format(date);
                        //             this.setValue(dateStr)
                        //         }
                        // ).bindProperty("value", pBind)
                        ppTemplate = oDatePicker1;
                    }
                    break;
                case "Src":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.Image();
                    } else {
                        ppTemplate = new sap.ui.commons.Image({
                            width: 'auto',
                            height: '120px',
                            decorative: true,
                            alt: ''
                        }).bindProperty("src", pBind);
                    }
    
                    break;
                case "RadioButton":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.RadioButtonGroup({
                            selectedIndex: 0
                        });
                    } else {
                        ppTemplate = new sap.ui.commons.RadioButtonGroup().bindProperty("selectedIndex", pBind);
                    }
    
                    break;
                case "AutoComplete":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.AutoComplete({
                            maxPopupItems: 5
                        });
                    } else {
                        var oModel2 = new sap.ui.model.json.JSONModel();
    
                        ppTemplate = new sap.ui.commons.AutoComplete({
                            maxPopupItems: 5,
                            enabled: true,
                            editable: true,
                        }).bindProperty("value", pBind);
    
                        if (pComponen != "") {
                            // var filter2 = pComponen.getValue()
                            Global.AutoCompleteList(ppTemplate, filter, pComponen)
                        } else {
                            Global.AutoCompleteList(ppTemplate, filter, "")
                        }
                    }
                    break;
                case "Link":
                    if (pBind == "") {
                        ppTemplate = new sap.ui.commons.Link({});
                    } else {
                        ppTemplate = new sap.ui.commons.Link().bindProperty("text", pBind);
                    }
    
                    break;
                case "Button":
                    ppTemplate = new sap.m.Button({
                        // id: pID,
                        text: pBind,
                        tooltip: "",
                        icon: "",
                        // lite: pLite,
                        // style: sap.ui.commons.ButtonStyle.Emph
                    });
                    break;
                case "ButtonDetail":
                    ppTemplate = new sap.m.Button({
                        // id: pID,
                        text: "",
                        tooltip: "Detail view",
                        icon: "sap-icon://detail-view",
                        // lite: pLite,
                        type: sap.m.ButtonType.Transparent
                    });
                    break;
                case "ButtoDownload":
                    ppTemplate = new sap.ui.commons.Button({
                        // id: pID,
                        // text: pBind,
                        tooltip: "Download",
                        icon: "sap-icon://download",
                        // lite: pLite,
                        style: sap.ui.commons.ButtonStyle.Emph
                    });
                    break;
                case "ButtonDelete":
                    ppTemplate = new sap.ui.commons.Button({
                        // id: pID,
                        text: pBind,
                        tooltip: "",
                        icon: "sap-icon://delete",
                        // lite: pLite,
                        style: sap.ui.commons.ButtonStyle.Reject
                    });
                    break;
                case "FileUploader":
                    ppTemplate = new sap.ui.unified.FileUploader({
                        //id: pID,
                        icon: '',
                        buttonOnly: true,
                        iconOnly: false,
                        width: 'auto',
                        maximumFileSize: 50,
                        //mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });
                    break
                default:
                    ppTemplate = new sap.ui.commons.TextView();
            }
    
            return new sap.ui.table.Column({
                id: pID,
                label: new sap.ui.commons.Label({
                        text: pLabelText,
                        textAlign: "Center"
                    })
                    .setTooltip(pLabelText),
                template: ppTemplate,
                width: pWidth,
                hAlign: phAlign,
                sortProperty: pBind,
                filterProperty: pBind,
    
            });
        },
        //fungsi untuk komponen valuestate
        ValueState: function (pID, pState) {
            var ppState
    
            switch (pState) {
                case "E":
                    ppState = sap.ui.core.ValueState.Error;
                    break;
                case "N":
                    ppState = sap.ui.core.ValueState.None;
                    break;
                case "S":
                    ppState = sap.ui.core.ValueState.Success;
                    break;
                case "W":
                    ppState = sap.ui.core.ValueState.Warning;
                    break;
                default:
                    ppState = sap.ui.core.ValueState.None;
            }
    
            SAPUI.GetCore(pID).setValueState(ppState)
        },
        //notification bar footer
        BarNotifocation: function (pTitle, pLevel, pMessage) {
            return new sap.ui.ux3.NotificationBar('idnotif', {
                visibleStatus: "None",
                resizeEnabled: false,
                messageNotifier: new sap.ui.ux3.Notifier({
                    title: pTitle,
                    messages: new sap.ui.core.Message({
                        text: pMessage,
                        level: pLevel,
                    })
                })
            });
        },
        //fungsi loading
        Busy: function (pId) {
            return new sap.m.BusyDialog({
                title: "Please wait loading data..",
                showCancelButton: true,
            });
        },
        BusyIndicator: function (pId) {
            return new sap.m.BusyIndicator({
                text: "tes"
            })
        },
        BusyDialog: function () {
    
            // var timerVar = setInterval(countTimer, 1000);
            var totalSeconds = 0;
    
            var mtrTabel = SAPUI.Matrix("", "100%", false, [], 1);
            var gambar = SAPUI.Image("", "asset/image/HR_02.gif", "25%", "auto", false, "").addStyleClass("image-loading")
            var txtViewContent = new sap.ui.commons.TextView({
                wrapping: false,
                // width : "700px",
                design: sap.ui.commons.TextViewDesign.H3,
                textAlign: "Center"
            });
    
            var txttimer = SAPUI.TextView("", "", "Jam", "auto", false)
            var txtwaitText = SAPUI.TextView("", "", "", "auto", false)
            txttimer.addStyleClass("timer")
            txtwaitText.addStyleClass("animate-flicker2")
            txtwaitText.setVisible(false)
            tstart()
    
            txtViewContent.setText("Please wait")
            // gambar.addStyleClass("ld ld-slide-ltr")
            mtrTabel.addStyleClass("mtrcentered")
    
            txtViewContent.addStyleClass("animetes")
    
            txtViewContent.onAfterRendering = function () {
                var textWrapper = document.querySelector('.animetes');
                textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
                anim()
            }
    
            function anim() {
                anime.timeline({
                        loop: true
                    })
                    .add({
                        targets: '.animetes .letter',
                        translateX: [40, 0],
                        translateZ: 0,
                        opacity: [0, 1],
                        easing: "easeOutExpo",
                        duration: 1200,
                        delay: function (el, i) {
                            return 500 + 30 * i;
                        }
                    }).add({
                        targets: '.animetes .letter',
                        translateX: [0, -30],
                        opacity: [1, 0],
                        easing: "easeInExpo",
                        duration: 1100,
                        delay: function (el, i) {
                            return 100 + 30 * i;
                        }
                    });
            }
    
            mtrTabel.createRow(gambar)
            mtrTabel.createRow(txtViewContent)
            mtrTabel.createRow(txtwaitText)
            // mtrTabel.createRow(txttimer)
    
            return new sap.m.Dialog({
                content: [mtrTabel],
                type: sap.m.DialogType.Standard,
                showHeader: false,
                //            escapeHandler:function(e){
                //            	e.preventDefault();
                //            },
            }).addStyleClass("bgkolor")
    
    
    
            function countTimer() {
                totalSeconds++;
                var hour = pad(parseInt(totalSeconds / 3600))
                var minute = pad(parseInt(totalSeconds / 60));
                var seconds = pad(totalSeconds % 60);
    
                var timerValue = minute + ":" + seconds
    
                var text1 = "Sedang di proses"
                var text2 = "Pemrosesan akan sedikit lama"
                var text3 = "Sedang di proses"
                txttimer.setText(timerValue)
                if (minute == 1) {
                    txtwaitText.setVisible(true)
                    txtwaitText.setText(text1)
                    txtwaitText.addStyleClass("wait-text-loading1")
                } else if (minute == 3) {
                    txtwaitText.setText(text2)
                    txtwaitText.addStyleClass("wait-text-loading2")
                }
    
            }
    
            function tstart() {
                timerVar = setInterval(countTimer, 1000);
            }
    
            function tpuse() {
                clearInterval(timerVar);
            }
    
            function treset() {
                totalSeconds = -1;
                countTimer();
            }
    
            function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
    
    
        },
        //fungsi icon tab bar
        IconTabBar: function () {
            var myVar
            var iconTabBar = new sap.m.IconTabBar({
                expandable: false,
                expanded: false,
                // select :  function(){alert(this.getSelectedKey())},
                items: {
                    path: 'id>/GetAdminActiveResult',
                    template: new sap.m.IconTabFilter({
                        icon: "sap-icon://employee",
                        iconColor: "{id>Status}",
                        text: '{id>User}',
                        tooltip: 'Transaction Code :' + " " + '{id>TransactionCode}' + "\nOrder : " + '{id>Order}' + "\nBatch : " + '{id>Batch}' + "\nStatus : " + '{id>PasswordHashValue}' + "\nExtension : " + '{id>Extension}',
                        count: '{id>NumberRange}',
    
                    })
                }
            });
    
            var wsUrlIcon = urlWebservice + "GetAdminActive";
    
            $.ajax({
                url: urlWebservice + "GetAdminActive",
                // url: "http://192.168.1.74:8080/IUXTool/Service1.svc/GetAdminActive",
                // url:wsUrlIcon,
                type: "POST",
                dataType: 'json',
                data: "{'User':'" + U5312UX5 + "'}",
                success: function (result) {
                    //  alert(result.GetAdminActiveResult.length);
    
                    var model = new sap.ui.model.json.JSONModel({})
                    model.setData(result);
                    iconTabBar.setModel(model, 'id');
                }
            });
    
            myVar = setInterval(myTimer, 10000);
    
            function myTimer() {
                $.ajax({
                    url: urlWebservice + "GetAdminActive",
                    // url: "http://192.168.1.74:8080/IUXTool/Service1.svc/GetAdminActive",
                    // url:wsUrlIcon,
                    type: "POST",
                    dataType: 'json',
                    data: "{'User':'" + U5312UX5 + "'}",
                    success: function (result) {
                        // alert(result.GetAdminActiveResult.length);
    
                        var model = new sap.ui.model.json.JSONModel({})
                        model.setData(result);
                        iconTabBar.setModel(model, 'id');
                    }
                });
            }
    
            return iconTabBar
        },
        //undefined admin jr
        SetIcon: function (object, icon) {
    
            var wsUrl = urlWebservice + "GetIcon";
    
            $.ajax({
                url: wsUrl,
                type: 'post',
                dataType: 'json',
                data: "{'Name':'" + icon + "'}",
                success: function (result) {
                    object.setIcon(result.GetIconResult[0].Path)
    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error');
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            })
        },
        //komponen autocomplete
        AutoComplete: function (pID, pToolTip, pMaxPopUpItems, pWidth, pEnabled, pEditable) {
            return new sap.ui.commons.AutoComplete({
                id: pID,
                tooltip: pToolTip,
                maxPopupItems: pMaxPopUpItems,
                width: pWidth,
                enabled: pEnabled,
                editable: pEditable,
                change: function () {
                    var usrval = this.getValue().toUpperCase();
                    this.setValue(usrval)
                }
            });
        },
        //button back
        ButtonBack: function (pID) {
            return new sap.ui.commons.Button({
                id: pID,
                text: "",
                tooltip: "",
                icon: "sap-icon://sys-back",
                lite: false,
                style: "Accept",
                press: function () {
                    window.history.back();
                }
            });
        },
        //id button, id table data select row ex."idXSTR_QC33_04_01--table"
        ButtonAllRow: function (pID, pTable) {
    
            return new sap.ui.commons.Button({
                id: pID,
                text: "Select All Row",
                tooltip: "",
                icon: "sap-icon://activities",
                lite: false,
                style: "Accept",
                press: function () {
                    var table = sap.ui.getCore().byId(pTable);
                    table.selectAll()
                }
            });
        },
        //id button, id table data select row ex."idXSTR_QC33_04_01--table"
        ButtonNoneRow: function (pID, pTable) {
    
            return new sap.ui.commons.Button({
                id: pID,
                text: "DeSelect All Row",
                tooltip: "",
                icon: "sap-icon://multiselect-none",
                lite: false,
                style: "Accept",
                press: function () {
                    var table = sap.ui.getCore().byId(pTable);
                    table.clearSelection()
                }
            });
        },
        //id button,id table data yang akan didownload
        ButtonDownloadData: function (pID, pTable) {
    
            return new sap.ui.commons.Button({
                id: pID,
                text: "Export",
                tooltip: "",
                icon: "sap-icon://download",
                lite: false,
                style: "Accept",
                press: function () {
                    var table = sap.ui.getCore().byId(pTable);
                    var data = sap.ui.getCore().getModel("tabelModel").getData();
                    var getCountData = table.getBinding("rows").getLength();
                    var wsUrl = urlWebservice + "LogDownload";
                    $.ajax({
                        url: wsUrl,
                        type: 'post',
                        dataType: 'json',
                        data: "{'User':'" + U5312UX5 + "', 'Tvarian':'" + X_Varian + "', 'Data':'" + getCountData + "', 'Ip':'" + ClientIP + "'}",
                        success: function (result) {
                            console.log(result)
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Error');
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                    console.log("button download" + getCountData)
                }
            });
        },
        //fungsi ambil waktu server
        TextTimeServer: function (pID) {
    
            var oModel = new sap.ui.model.json.JSONModel();
            var wsUrl = urlWebservice + "GetNistTime";
            //var wsUrl = "http://localhost:10344/Service1.svc/GetNistTime";
            $.ajax({
                type: "POST",
                url: wsUrl,
                contentType: "text/plain, charset=utf-8",
                dataType: "json",
                data: "{'dateTime' : '" + pID + "'}",
                crossDomain: true,
                success: function (result) {
                    pID.setValue(result.GetNistTimeResult)
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    console.log("Error");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrow);
                }
            })
        },
        //komponen tree table
        TreeTable: function (pID, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData) {
            var ppSelectionMode, ppNavigationMode;
            switch (pSelectionMode) {
                case "Multi":
                    ppSelectionMode = sap.ui.table.SelectionMode.Multi;
                    break;
                case "MultiToggle":
                    ppSelectionMode = sap.ui.table.SelectionMode.MultiToggle;
                    break;
                case "None":
                    ppSelectionMode = sap.ui.table.SelectionMode.None;
                    break;
                case "Single":
                    ppSelectionMode = sap.ui.table.SelectionMode.Single;
                    break;
                default:
                    ppSelectionMode = sap.ui.table.SelectionMode.Single;
            }
    
            switch (pNavigationMode) {
                case "Paginator":
                    ppNavigationMode = sap.ui.table.NavigationMode.Paginator;
                    break;
                case "Scrollbar":
                    ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
                    break;
                default:
                    ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
            }
    
            return new sap.ui.table.TreeTable({
                selectionMode: sap.ui.table.SelectionMode.Single,
                enableColumnReordering: true,
                expandFirstLevel: false,
                id: pID,
                width: pWidth,
                visibleRowCount: pVisibleRowCount,
                selectionMode: ppSelectionMode,
                showNoData: pShowNoData,
                // toggleOpenState: function (oEvent) {
                //     var iRowIndex = oEvent.getParameter("rowIndex");
                //     var oRowContext = oEvent.getParameter("rowContext");
                //     var bExpanded = oEvent.getParameter("expanded");
                // }
            })
        },
        //komponen kolom tree tabel
        ColumnTreeTable: function (pLabelText, pTemplate, pWidth, phAlign, pTextAlign, pID) {
            return new sap.ui.table.Column({
                id: pID,
                label: new sap.ui.commons.Label({
                    text: pLabelText,
                    textAlign: pTextAlign
                }),
                template: pTemplate,
                width: pWidth,
                hAlign: phAlign,
            });
        },
    
        /*	function to formatted textfield From & textfield TO
         * @pComp1 textfield From
         * @pcomp2 textfield To
         *
         * */
        ParamFormatTo: function (pComp1, pComp2) {
            var result = pComp1;
            if (pComp2 != "") {
                result += "|" + pComp2;
            }
            return result;
    
        },
        /*
         * function to formatted value to parameter IN and TO
         * IN (SAPUI.ParamFormatIn("IN",['1','2','3','4','5']))  -> ["1,2,3,4,5"]
         * TO (SAPUI.ParamFormatIn("TO",['1','2'])) -> ["1|2"]
         *  */
        ParamFormatVH: function (pMode, pValue) {
            var result = pValue;
            var arrlength = pValue.length
            var joined
            var combine = []
            if (arrlength < 1) {
                result = 0
            } else {
                if (pMode == 'TO') {
                    if (arrlength == 2) {
                        joined = pValue.join("|");
                        combine.push(joined)
                        result = combine
                    } else {
                        console.log("parameter to lebih dari 2")
                    }
                } else if (pMode == 'IN') {
                    joined = pValue.join(",")
                    combine.push(joined)
                    result = combine
                }
            }
            return result;
    
        },
        /*function to formatted filter ValueHelpfield
         * SAPUI.ParamFilterVH([tes,tes2])
         * */
        ParamFilterVH: function (pValue) {
            var result = pValue;
            var arrlength = pValue.length
            var joined
            var combine
            if (arrlength < 1) {
                result
            } else {
                joined = pValue.join("-")
                combine = joined
                result = combine
            }
            return result
        },
        /*function to join parameter valuehelp more than one
         * @pArray parameter that cointain value inside array
         * */
        ParamInValuehelp: function (pArray) {
            var pArrayLength = pArray.length;
            var result = []
            for (var i = 0; i < pArrayLength; i++) {
                if (pArray[i] == pArray[pArrayLength - 1]) {
                    result.push(pArray[i])
                } else {
                    result.push(pArray[i] + "-")
                }
            }
            return result.join('')
    
            /*
             * 	var parray=["JROPP04","SRAAI",JRAABI]
                var tes=SAPUI.ParamInValuehelp(parray)
                console.log(tes)
            */
    
    
        },
        /*function to formatted value checkbox
         * @cbComp component Checkbox
         *
         * */
        ParamFormatCheckbox: function (cbComp) {
            var result = "";
            if (cbComp.getChecked()) {
                result = "X"
            }
            return result;
    
        },
        Route: function (View, param, anyParam = {}) {
            const {
                forceRoute
            } = anyParam
    
            if (forceRoute) {
                FORCEROUTE = true
            }
    
            var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
            // this.insExcRptLog(View)
            oRouter.navTo(View, param);
        },
        RouteTcode: function (View) {
            var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
            oRouter.navTo(View + "_01");
        },
        // 14.08.2017
        // these codes will provide a dynamic changeable columns
        // example of use:
        // var oTable = SAPUI.TableLayout(this.createId("oTable"), "GANTI TRUNK", "auto", 15, "Single", "Scrollbar", false);
        // TableLayout: function(pID, pScreen, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData){
        TableLayout: function (pLink, pResult, pTable, pObjWidth) {
    
            var pScreen = "" + pLink.split("/").slice(-1),
                oModel = new sap.ui.model.json.JSONModel(),
                oData = new sap.ui.model.json.JSONModel(),
                oDataRow = new sap.ui.model.json.JSONModel();
            oModelKosong = new sap.ui.model.json.JSONModel();
    
            oModel.setSizeLimit(999999);
            oData.setSizeLimit(999999);
            oDataRow.setSizeLimit(999999)
    
            if (!window.localStorage.getItem("saveLayout" + pScreen)) {
    
                $.ajax({
                    type: "POST",
                    url: WS_SY + "getDefaultColumn",
                    dataType: "json",
                    data: "{'screen':'" + pScreen + "'}",
                    crossDomain: true,
                    success: function (result) {
                        var resultSet = result["getDefaultColumnResult"],
                            tempArr = [];
    
                        resultSet.forEach(function (item) {
                            tempArr.push({
                                id: item.id,
                                key: item.columnName,
                                description: item.displayedColumnName,
                                template: item.bindingType
                            })
                        });
    
                        oModel.setData({
                            columns: tempArr
                        });
                        console.log(tempArr)
                        bindColumns(oModel);
                        //
    
                        // baris kode untuk binding data ke tabel
                        oDataRow.setData({
                            dataRows: pResult
                        });
                        sap.ui.getCore().setModel(oDataRow);
    
                        pTable.bindRows("/dataRows");
    
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        console.log("Error");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrow);
                    }
                });
    
            } else {
                var layout = window.localStorage.getItem("saveLayout" + pScreen);
    
    
                if (pResult == "") {
                    oDataRow.setData({
                        dataRows: ""
                    });
                    oModel.setData(JSON.parse(layout));
                    bindColumns(oModel);
                } else {
                    oModel.setData(JSON.parse(layout));
                    bindColumns(oModel);
    
                    // baris kode untuk binding data ke tabel
                    oDataRow.setData({
                        dataRows: pResult
                    });
                    bindColumns(oModel);
                }
    
                sap.ui.getCore().setModel(oDataRow);
    
                pTable.bindRows("/dataRows")
            }
    
            function bindColumns(pModel) {
                pTable.setModel(pModel, "tableModel");
    
                pTable.bindColumns("tableModel>/columns", function (sId, oContext) {
                    var oColumnObj = oContext.getObject();
    
                    return new sap.ui.table.Column({
                        // id			: oColumnObj.id,
                        label: oColumnObj.description,
                        template: new sap.ui.commons.TextView().bindProperty("text", oColumnObj.key),
                        sortProperty: oColumnObj.key,
                        filterProperty: oColumnObj.key,
                        autoResizable: true,
                        width: (pObjWidth != null && (oColumnObj.key in pObjWidth)) ? pObjWidth[oColumnObj.key] : "100%"
                    });
                });
    
                window.localStorage.setItem("saveLayout" + pScreen, JSON.stringify(pTable.getModel("tableModel").getData()));
            }
    
            return pTable;
        },
        // 10.08.2017
        // this button will display a dialog which contains some choices of columns and
        // some functional buttons which could be used to rearrange the columns,
        // applying the changes, etc...
        // example of use:
        // var btnName = SAPUI.ButtonChangeLayout("button1", "GANTI TRUNK", oTable, "Change layout", "", "", false, "Accept");
        ButtonChangeLayout: function (pID, pLink, pTable, pText, pTooltip, pIcon, pLite, pStyle) {
            var oButton = SAPUI.Button(pID, pText, pTooltip, pIcon, pLite, pStyle),
                pBindPath = "tableModel>/columns",
                pScreen = "" + pLink.split("/").slice(-1);
    
            function attachPressOButton() {
                var oDialog = SAPUI.Dialog("", "Choose columns fo the table", "40%", "auto", true),
                    pathProperty = pBindPath.split(">");
    
                var pArgs = {
                    targetModel: pTable.getModel(pathProperty[0]),
                    targetProperty: pathProperty[1],
                    keyField: "key",
                    descrField: "description",
                    initialHeight: 350,
                    idDialog: oDialog.getId()
                }
    
                initPointAndShootModel(pArgs);
    
                var leftPane = getLeftPane(pArgs.initialHeight),
                    rightPane = getRightPane(pArgs.initialHeight);
    
                var oLayout = new sap.ui.commons.layout.MatrixLayout({
                    columns: 4,
                    height: "100%",
                    width: "100%",
                    widths: ["auto", "80px", "auto", "40px"],
                    rows: new sap.ui.commons.layout.MatrixLayoutRow({
                        height: "100%",
                        cells: [
                            leftPane.oCell,
                            getSelectButtonsPane(pArgs),
                            rightPane.oCell,
                            getOrderButtonsPane(rightPane.id)
                        ]
                    })
                });
    
                setButtonState();
    
                oDialog.addContent(oLayout);
                oDialog.open();
            }
    
            function getLeftPane(pHeight) {
                var oCell = SAPUI.MatrixLayoutCell(),
                    obj = {},
                    listBox = getListBox("left", "key", "description", "pointAndShootModel>/left/data", pHeight);
    
                oCell.addContent(listBox);
    
                obj.id = listBox.getId();
                obj.oCell = oCell;
    
                return obj;
            }
    
            function getRightPane(pHeight) {
                var oCell = SAPUI.MatrixLayoutCell(),
                    obj = {},
                    listBox = getListBox("right", "key", "description", "pointAndShootModel>/right/data", pHeight);
    
                oCell.addContent(listBox);
    
                obj.id = listBox.getId();
                obj.oCell = oCell;
    
                return obj;
            }
    
            function getListBox(pPosition, pKeyField, pDescriptionField, pBindpath, pHeight) {
                var oItemTemplate = new sap.ui.core.ListItem({
                    text: "{pointAndShootModel>" + pDescriptionField + "}",
                    key: "{pointAndShootModel>" + pKeyField + "}"
                });
    
                var oListBox = new sap.ui.commons.ListBox({
                    width: "100%",
                    height: pHeight - 65 + "px",
                    allowMultiSelect: true,
                    select: function (oEvent) {
                        sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pPosition + "/selectedKeys", oEvent.getSource().getSelectedKeys());
                        setButtonState();
                    }
                });
    
                oListBox.bindAggregation("items", pBindpath, oItemTemplate);
    
                return oListBox;
            }
    
            function getSelectButtonsPane(pArgs) {
                var oModel = sap.ui.getCore().getModel("pointAndShootModel");
                var oCell = SAPUI.MatrixLayoutCell("Middle", "Center");
    
                var mtrButton = new sap.ui.commons.layout.MatrixLayout({
                    width: "100%",
                    layoutFixed: false,
                    widths: ["auto", "auto", "auto"],
                    columns: 3
                });
    
                ///////
                var buttonToRight = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "Move to right",
                    icon: "sap-icon://media-play",
                    lite: false,
                    style: sap.ui.commons.ButtonStyle.Accept
                });
    
                buttonToRight.getEnabled("{pointAndShootModel>/uiSettings/btnAddEnabled}");
                buttonToRight.attachPress(function () {
                    swapItems("left", "right");
                    setButtonState();
                });
    
                var buttonAllToRight = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "Move all to right",
                    icon: "sap-icon://media-forward",
                    lite: false
                });
    
                buttonAllToRight.getEnabled("{pointAndShootModel>/uiSettings/btnAddAllEnabled}");
                buttonAllToRight.attachPress(function () {
                    swapAllItems("left", "right");
                    setButtonState();
                });
    
                ///////
                var buttonToLeft = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "Move to left",
                    icon: "sap-icon://media-reverse",
                    lite: false,
                    style: sap.ui.commons.ButtonStyle.Accept
                });
    
                buttonToLeft.getEnabled("{pointAndShootModel>/uiSettings/btnRemoveEnabled}");
                buttonToLeft.attachPress(function () {
                    swapItems("right", "left");
                    setButtonState();
                });
    
                var buttonAllToLeft = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "Move all to left",
                    icon: "sap-icon://media-rewind",
                    lite: false
                });
    
                buttonAllToLeft.getEnabled("{pointAndShootModel>/uiSettings/btnRemoveAllEnabled}");
                buttonAllToLeft.attachPress(function () {
                    swapAllItems("right", "left");
                    setButtonState();
                });
    
                ///////
                var buttonApply = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "Apply",
                    icon: "sap-icon://accept",
                    lite: false,
                    style: sap.ui.commons.ButtonStyle.Accept
                });
    
                buttonApply.attachPress(function () {
                    applySelection(pArgs);
                    sap.ui.getCore().getElementById(pArgs.idDialog).close();
                });
    
                mtrButton.createRow(buttonToRight, "", buttonAllToRight);
                mtrButton.createRow(buttonToLeft, "", buttonAllToLeft);
                mtrButton.createRow(buttonApply, "", "");
    
                oCell.addContent(mtrButton);
    
                return oCell;
            }
    
            function applySelection(pArgs) {
                var aItems = sap.ui.getCore().getModel("pointAndShootModel").getProperty("/left/data");
                pArgs.targetModel.setProperty(pArgs.targetProperty, aItems);
    
                var obj = {
                    columns: aItems
                };
    
                window.localStorage.setItem("saveLayout" + pScreen, JSON.stringify(obj));
            }
    
            function swapAllItems(pFrom, pTo) {
                var oModel = sap.ui.getCore().getModel("pointAndShootModel");
                var aAllItems = oModel.getProperty("/" + pFrom + "/data");
                var aKeys = [];
    
                aAllItems.forEach(function (obj) {
                    aKeys.push(obj.key);
                });
    
                oModel.setProperty("/" + pFrom + "/selectedKeys", aKeys);
    
                swapItems(pFrom, pTo);
            }
    
            function getOrderButtonsPane(idRight) {
                var oCell = SAPUI.MatrixLayoutCell("Middle", "Center");
                var mtrButton = new sap.ui.commons.layout.MatrixLayout({
                    width: "100%",
                    layoutFixed: false,
                    widths: ["100%"],
                    columns: 1
                });
    
                var buttonUp = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "",
                    icon: "sap-icon://slim-arrow-up",
                    lite: false,
                    style: sap.ui.commons.ButtonStyle.Accept
                });
    
                buttonUp.getEnabled("{pointAndShootModel>/uiSettings/btnUpEnabled}");
                buttonUp.attachPress(function () {
                    performMoveItems(-1, idRight);
                });
    
                var buttonDown = new sap.ui.commons.Button({
                    text: "",
                    tooltip: "",
                    icon: "sap-icon://slim-arrow-down",
                    lite: false,
                    style: sap.ui.commons.ButtonStyle.Accept
                });
    
                buttonDown.getEnabled("{pointAndShootModel>/uiSettings/btnDownEnabled}");
                buttonDown.attachPress(function () {
                    performMoveItems(1, idRight);
                });
    
                mtrButton.createRow(buttonUp);
                mtrButton.createRow(buttonDown);
    
                oCell.addContent(mtrButton);
    
                return oCell;
            }
    
            function performMoveItems(pDirection, idRight) {
                var aItems = sap.ui.getCore().getModel("pointAndShootModel").getProperty("/right/data");
                var oListbox = sap.ui.getCore().getElementById(idRight);
    
                var aSelectedIndices = oListbox.getSelectedIndices();
                var aNewSelectedIndices = pDirection == -1 ? moveItemsUp(aItems, aSelectedIndices) : moveItemsDown(aItems, aSelectedIndices);
    
                oListbox.fireSelect(aNewSelectedIndices);
                oListbox.setSelectedIndices(aNewSelectedIndices);
    
                setButtonState();
            }
    
            function moveItemsUp(pItems, pIndices) {
                var aNewIndices = [];
    
                for (var i = 0; i < pIndices.length; i++) {
    
                    var newIndex = pIndices[i] - 1,
                        element = pItems[pIndices[i]];
    
                    pItems.splice(pIndices[i], 1);
                    pItems.splice(newIndex, 0, element);
    
                    aNewIndices.push(newIndex);
                }
    
                return aNewIndices;
            }
    
            function moveItemsDown(pItems, pIndices) {
                var aNewIndices = [];
    
                for (var i = pIndices.length - 1; i >= 0; i--) {
                    var newIndex = pIndices[i] + 1,
                        element = pItems[pIndices[i]];
    
                    pItems.splice(pIndices[i], 1);
                    pItems.splice(newIndex, 0, element);
    
                    aNewIndices.push(newIndex);
                }
    
                return aNewIndices;
            }
    
            function initPointAndShootModel(pArgs) {
    
                $.ajax({
                    type: "POST",
                    url: WS_SY + "getAvailableColumn",
                    dataType: "json",
                    data: "{'screen':'" + pScreen + "'}",
                    crossDomain: true,
                    success: function (result) {
                        var aRightData = [],
                            aAlreadySelectedKeys = getTargetKeys(pArgs),
                            oModel = new sap.ui.model.json.JSONModel();
    
                        oModel.setSizeLimit(1000);
    
                        result["getAvailableColumnResult"].forEach(function (item) {
                            aRightData.push({
                                id: item.id,
                                key: item.columnName,
                                description: item.displayedColumnName,
                                template: item.bindingType
                            })
                        });
    
                        oModel.setData({
                            left: {
                                data: [],
                                selectedKeys: []
                            },
                            right: {
                                data: aRightData,
                                selectedKeys: aAlreadySelectedKeys
                            },
                            uiSettings: {
                                btnAddEnabled: false,
                                btnAddAllEnabled: false,
                                btnRemoveEnabled: false,
                                btnRemoveAllEnabled: false,
                                btnUpEnabled: false,
                                btnDownEnabled: false
                            }
                        });
    
                        sap.ui.getCore().setModel(oModel, "pointAndShootModel");
    
                        swapItems("right", "left");
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        console.log("Error");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrow);
                    }
                });
    
            }
    
            function getTargetKeys(pArgs) {
                var aTargetData = pArgs.targetModel.getProperty(pArgs.targetProperty),
                    aTargetKeys = [];
    
                for (var i in aTargetData) {
                    aTargetKeys.push(aTargetData[i][pArgs.keyField]);
                }
    
                return aTargetKeys;
            }
    
            function swapItems(pFrom, pTo) {
                var oModel = sap.ui.getCore().getModel("pointAndShootModel"),
                    oSelectedKeys = oModel.getProperty("/" + pFrom + "/selectedKeys"),
                    oItemsFrom = oModel.getProperty("/" + pFrom + "/data"),
                    oItemsTo = oModel.getProperty("/" + pTo + "/data");
    
                var aItemsToBeMoved = [];
                oSelectedKeys.forEach(function (key) {
                    var selectedObject = $.grep(oItemsFrom, function (obj) {
                        return obj.key === key;
                    })[0];
                    aItemsToBeMoved.push(selectedObject);
                });
    
                aItemsToBeMoved.forEach(function (item) {
                    var index = oItemsFrom.indexOf(item);
                    oItemsFrom.splice(index, 1);
                });
    
                oItemsTo.push.apply(oItemsTo, aItemsToBeMoved);
    
                sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pFrom + "/data", oItemsFrom);
                sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pTo + "/data", oItemsTo);
                sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pFrom + "/selectedKeys", []);
            }
    
            function setButtonState() {
                var oModel = sap.ui.getCore().getModel("pointAndShootModel");
    
                if (typeof oModel !== "undefined") {
                    oModel.setProperty("/uiSettings/btnAddEnabled", oModel.getProperty("/left/selectedKeys").length > 0);
                    oModel.setProperty("/uiSettings/btnRemoveEnabled", oModel.getProperty("/right/selectedKeys").length > 0);
                    oModel.setProperty("/uiSettings/btnAddAllEnabled", oModel.getProperty("/left/data").length > 0);
                    oModel.setProperty("/uiSettings/btnRemoveAllEnabled", oModel.getProperty("/right/data").length > 0);
    
                    if (oModel.getProperty("/right/selectedKeys").length > 0) {
                        var aRightData = oModel.getProperty("/right/data"),
                            aRightKeys = [];
    
                        for (var i in aRightData) {
                            aRightKeys.push(aRightData[i].key);
                        }
    
                        var iRightDataLength = oModel.getProperty("/right/data").length;
                        oModel.setProperty("/uiSettings/btnUpEnabled", aRightKeys.indexOf(oModel.getProperty("/right/selectedKeys")[0]) > 0);
                        oModel.setProperty("/uiSettings/btnDownEnabled", aRightKeys.indexOf(oModel.getProperty("/right/selectedKeys")[oModel.getProperty("/right/selectedKeys").length - 1]) < iRightDataLength - 1);
                    } else {
                        oModel.setProperty("/uiSettings/btnUpEnabled", false);
                        oModel.setProperty("/uiSettings/btnDownEnabled", false);
                    }
                }
            }
    
            oButton.attachPress(attachPressOButton);
    
            return oButton;
        },
        // 29.08.2017
        // this button will display a dialog which contains some choices of columns and
        // some functional buttons which could be used to rearrange the columns,
        // applying the changes, etc...
        // example of use:
        // var btnName = SAPUI.ButtonSaveLayout("button1", "GANTI TRUNK", "Change layout", "", "", false, "Accept");
        ButtonSaveLayout: function (pID, pLink, pText, pTooltip, pIcon, pLite, pStyle) {
            var oButton = SAPUI.Button(pID, pText, pTooltip, pIcon, pLite, pStyle),
                pScreen = "" + pLink.split("/").slice(-1),
                dialogSave = SAPUI.Dialog("", "Save Layout", "30%", "auto", true),
                matrixSaveLayout = SAPUI.Matrix("", "100%", false, ["40%", "60%"], 2),
                namaLayout = SAPUI.Label("", "Nama Layout", "Bold", "100%"),
                txfNamaLayout = SAPUI.TextField("", "", "100%", 100, true, true);
    
            matrixSaveLayout.createRow(namaLayout, txfNamaLayout);
    
            var namaDescription = SAPUI.Label("", "Nama Desciption", "Bold", "100%"),
                txfNamaDescription = SAPUI.TextField("", "", "100%", 100, true, true);
    
            matrixSaveLayout.createRow(namaDescription, txfNamaDescription);
    
            var oButtonSaveLayout = SAPUI.Button("", "Save Layout", "", "", false, "Accept");
            oButtonSaveLayout.attachPress(function () {
                saveLayout(txfNamaLayout, txfNamaDescription)
            });
    
            function saveLayout(name, desc) {
    
                var layoutName = name.getValue(),
                    layoutDesc = desc.getValue(),
                    pCol = "",
                    col = JSON.parse(window.localStorage.getItem("saveLayout" + pScreen)).columns;
    
                col.forEach(function (item) {
                    pCol += item.id + ",";
                });
    
                pCol = pCol.slice(0, -1);
    
                var param = '{"user":"' + U5312UX5 + '",' +
                    '"screen":"' + pScreen + '",' +
                    '"layoutName":"' + layoutName + '",' +
                    '"layoutDescrip":"' + layoutDesc + '",' +
                    '"savedColumn":"' + pCol + '"}';
    
                $.ajax({
                    url: WS_SY + "saveLayout",
                    type: "POST",
                    dataType: "json",
                    data: param,
                    success: function (result) {
                        //console.log(result);
                        (result.saveLayoutResult == "1") ?
                        SAPUI.MessageBoxSuccess("Layout berhasil disimpan."): SAPUI.MessageBoxError(result.saveLayoutResult);
    
                        dialogSave.close();
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
    
                        console.log("Error");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrow);
                    }
                });
            }
    
            dialogSave.addContent(matrixSaveLayout);
            dialogSave.addButton(oButtonSaveLayout);
    
            oButton.attachPress(function () {
                dialogSave.open();
            });
    
            return oButton;
        },
        // 30.08.2017
        // this button will display a dialog which contains some choices of available layout options
        // that might be implemented on the used screen
        // example of use:
        // var btnName = SAPUI.ButtonSelectLayout("button1", "GANTI TRUNK", "oTable", "Change layout", "", "", false, "Accept");
        ButtonSelectLayout: function (pID, pLink, pTable, pText, pTooltip, pIcon, pLite, pStyle) {
            var oButton = SAPUI.Button(pID, pText, pTooltip, pIcon, pLite, pStyle),
                pScreen = "" + pLink.split("/").slice(-1);
    
            oButton.attachPress(function () {
                openTheDialog();
            });
    
            function openTheDialog() {
                var dialogSelectLayout = SAPUI.Dialog("", "Select Layout", "75%", "auto"),
                    tblSelectLayout = SAPUI.Table("", "100%", 7, "Single", "Scrollbar", true);
    
                tblSelectLayout.addColumn(SAPUI.Column("Layout Name", "TextView", "layoutName", "auto", "Begin", "Begin"));
                tblSelectLayout.addColumn(SAPUI.Column("Description", "TextView", "layoutDescrip", "auto", "Begin", "Begin"));
                tblSelectLayout.addColumn(SAPUI.Column("Column", "TextView", "savedColumn", "50%", "Begin", "Begin"));
    
                var btnApplyLayout = SAPUI.Button("", "Apply", "", "", false, "Accept");
                btnApplyLayout.attachPress(function () {
                    applyLayout(dialogSelectLayout, tblSelectLayout);
                });
    
                dialogSelectLayout.addContent(tblSelectLayout);
                dialogSelectLayout.addButton(btnApplyLayout);
    
                var oModel = new sap.ui.model.json.JSONModel(),
                    param = "{'user':'" + U5312UX5 + "', 'screen':'" + pScreen + "'}";
    
                $.ajax({
                    type: "POST",
                    url: WS_SY + "getSavedLayout",
                    dataType: "json",
                    data: param,
                    success: function (result) {
    
                        oModel.setData(result);
                        tblSelectLayout.setModel(oModel);
                        tblSelectLayout.bindRows("/getSavedLayoutResult");
    
                        dialogSelectLayout.open();
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        console.log("Error");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrow);
                    }
                });
            }
    
            function applyLayout(pDialog, pTableLayout) {
    
                var idx = pTableLayout.getSelectedIndex()
    
                if (pTableLayout.isIndexSelected(idx)) {
                    var cxt = pTableLayout.getContextByIndex(idx),
                        path = cxt.sPath,
                        obj = pTableLayout.getModel().getProperty(path),
                        param = "{'id':'" + obj.id + "'}";
    
                    $.ajax({
                        type: "POST",
                        url: WS_SY + "getSavedLayoutById",
                        dataType: "json",
                        data: param,
                        success: function (result) {
                            var tempArr = [];
    
                            result["getSavedLayoutByIdResult"].forEach(function (item) {
                                tempArr.push({
                                    id: item.id,
                                    key: item.columnName,
                                    description: item.displayedColumnName,
                                    template: item.bindingType
                                })
                            });
    
                            pTable.getModel("tableModel").setProperty("/columns", tempArr);
    
                            var obj = {
                                columns: tempArr
                            };
                            window.localStorage.setItem("saveLayout" + pScreen, JSON.stringify(obj));
    
                            pDialog.close();
                        },
                        error: function (jqXHR, textStatus, errorThrow) {
                            console.log("Error");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrow);
                        }
                    });
                }
    
            }
    
            return oButton;
        },
    
    
        // error handling untuk ajax yang error
        ajaxErrorHandling: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(errorThrown)
            console.log(textStatus)
            var message, text
            if (jqXHR.status == 0) {
                message = "Jaringan Error"
                text = " silahkan hubungi IT"
            } else if (textStatus == "parsererror") {
                message = "Terjadi kesalahan input data silahkan masukkan kembali"
                text = ""
            }
    
            this.MessageBoxAlert("Ajax error:\n" + message + "\n" + text);
        },
    
        //cek authorisasi tcode //masih salah
        onAuthorizationTcode: function () {
            var halaman = "" + location.href.split("/").slice(-1);
            var tCodeRaw = halaman.split(".")
            var tCode = tCodeRaw[0]
            console.log("tcode: " + tCode);
            var listSession = [];
            window.sessionStorage.setItem("tcodeVariantux5", tCode);
    
            var wsUrlTcode = WS_SY + "WS_UC_Authorization";
            try {
                var objTcodeAuthor = {
                    user: U5312UX5,
                    lang: LANGUANGE,
                    varianUser: tCode,
                    mode: "Authorization"
                };
    
                var objTcode = {
                    user: U5312UX5,
                    lang: LANGUANGE,
                    varianUser: tCode,
                    mode: "GetTcodeInduk"
                };
    
            } catch (error) {
                SAPUI.MessageBox("There is invalid parameter: " + error, "Ada value parameter yang tidak terisi: " + error, "ERROR", "Status")
            }
    
            var paramAuthor = Global.dynamicParam("DspTcodeInduk", objTcodeAuthor);
            var paramTcode = Global.dynamicParam("DspTcodeInduk", objTcode);
    
            var tcodeInduk = "";
            $.ajax({
                url: wsUrlTcode,
                type: "POST",
                dataType: 'json',
                data: paramAuthor,
                success: function (result) {
                    console.log(result)
                    try {
                        Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                        authTcode = Finalresult.Result
                        console.log(authTcode)
    
                        if (authTcode == 1) {
                            getTcodeInduk()
                        } else {
                            alert("You dont have Autorized!", "Anda tidak memiliki ijin masuk tcode ini")
                            if (U5312UX5 == "" || U5312UX5 == null || U5312UX5 == "No User") {
                                sap.m.URLHelper.redirect("index.html");
                            } else {
                                sap.m.URLHelper.redirect("Dashboard.html");
                            }
                        }
                    } catch (error) {
                        alert("ada kesalahan hubungi IT: " + error)
                    }
    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                }
            })
    
            function getTcodeInduk() {
                //cek tcode autorization
                var authTcode = "";
                $.ajax({
                    url: wsUrlTcode,
                    type: "POST",
                    dataType: 'json',
                    data: paramTcode,
                    success: function (result) {
    
                        console.log(result)
                        Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                        tcodeInduk = Finalresult.Result;
                        Global.InsertSessionUser(tCode, tcodeInduk)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                    }
                });
            }
        },
    
        ConvTglYyyymmdd: function (pTanggal) {
            var hariVisit = pTanggal.substring(0, 2)
            var bulanVisit = pTanggal.substring(3, 5)
            var tahunVisit = pTanggal.substring(6)
    
            var tanggal = tahunVisit + bulanVisit + hariVisit
            return tanggal
        },
    
        addColumnSorterAndFilter: function (oColumn, oType = 'tanggal') {
            var oTable = oColumn.getParent();
            var oCustomMenu = new sap.ui.commons.Menu();
    
            // ConvTglYyyymmdd
            // console.log(oType)
    
            function convertDate(inputFormat) {
                function pad(s) {
                    return (s < 10) ? '0' + s : s;
                }
                var d = new Date(inputFormat);
                return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
            }
    
            function comparatorASC(value1, value2) {
                if (oType == "tanggal") {
                    value1 = SAPUI.ConvTglYyyymmdd(value1)
                    value2 = SAPUI.ConvTglYyyymmdd(value2)
                }
    
                if (oType == "tanggalPIB") {
                    if (value1 == null || value1 == undefined || value1 == '') {
                        value1 = ''
                    } else {
                        value1 = convertDate(new Date(value1))
                        value1 = SAPUI.ConvTglYyyymmdd(value1)
                    }
                    if (value2 == null || value2 == undefined || value2 == '') {
                        value2 = ''
                    } else {
                        value2 = convertDate(new Date(value2))
                        value2 = SAPUI.ConvTglYyyymmdd(value2)
                    }
                }
    
                if (value1 == null || value1 == undefined || value1 == '') {
                    value1 = "99999999999999999999999999999999999999999999999999998"
                }
                if (value2 == null || value2 == undefined || value2 == '') {
                    value2 = "99999999999999999999999999999999999999999999999999998"
                }
    
                value1 = value1.toString().split(',').join("").split('.').join("")
                value2 = value2.toString().split(',').join("").split('.').join("")
    
                if (value1.toUpperCase().includes("ROWS") == true || value1.toUpperCase().includes("TOTAL") == true) {
                    value1 = "99999999999999999999999999999999999999999999999999999"
                }
                if (value2.toUpperCase().includes("ROWS") == true || value2.toUpperCase().includes("TOTAL") == true) {
                    value2 = "99999999999999999999999999999999999999999999999999999"
                }
    
                if (oType == "string") {
    
                    if (value1 == "99999999999999999999999999999999999999999999999999998") {
                        value1 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZY"
                    }
                    if (value2 == "99999999999999999999999999999999999999999999999999998") {
                        value2 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZY"
                    }
    
                    if (value1 == "99999999999999999999999999999999999999999999999999999") {
                        value1 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
                    }
                    if (value2 == "99999999999999999999999999999999999999999999999999999") {
                        value2 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
                    }
                    if (value1.toUpperCase() < value2.toUpperCase()) return -1
                    if (value1.toUpperCase() == value2.toUpperCase()) return 0
                    if (value1.toUpperCase() > value2.toUpperCase()) return 1
                } else {
                    if (parseInt(value1) < parseInt(value2)) return -1;
                    if (parseInt(value1) == parseInt(value2)) return 0;
                    if (parseInt(value1) > parseInt(value2)) return 1;
                }
            };
    
            function comparatorDESC(value1, value2) {
    
                if (oType == "tanggal") {
                    value1 = SAPUI.ConvTglYyyymmdd(value1)
                    value2 = SAPUI.ConvTglYyyymmdd(value2)
                }
    
                if (oType == "tanggalPIB") {
                    if (value1 == null || value1 == undefined || value1 == '') {
                        value1 = ''
                    } else {
                        value1 = convertDate(new Date(value1))
                        value1 = SAPUI.ConvTglYyyymmdd(value1)
                    }
                    if (value2 == null || value2 == undefined || value2 == '') {
                        value2 = ''
                    } else {
                        value2 = convertDate(new Date(value2))
                        value2 = SAPUI.ConvTglYyyymmdd(value2)
                    }
                }
    
                if (value1 == null || value1 == undefined || value1 == '') {
                    value1 = "-99999999999999999999999999999999999999999999999999998"
                }
                if (value2 == null || value2 == undefined || value2 == '') {
                    value2 = "-99999999999999999999999999999999999999999999999999998"
                }
    
                value1 = value1.toString().split(',').join("").split('.').join("")
                value2 = value2.toString().split(',').join("").split('.').join("")
    
                if (value1.toUpperCase().includes("ROWS") == true || value1.toUpperCase().includes("TOTAL") == true) {
                    value1 = "-99999999999999999999999999999999999999999999999999999"
                }
                if (value2.toUpperCase().includes("ROWS") == true || value2.toUpperCase().includes("TOTAL") == true) {
                    value2 = "-99999999999999999999999999999999999999999999999999999"
                }
    
                if (oType == "string") {
    
                    if (value1 == "-99999999999999999999999999999999999999999999999999999") {
                        value1 = "111111111111111111111111111111111111111111111111111111"
                    }
                    if (value2 == "-99999999999999999999999999999999999999999999999999999") {
                        value2 = "111111111111111111111111111111111111111111111111111111"
                    }
                    if (value1 == "-99999999999999999999999999999999999999999999999999998") {
                        value1 = "222222222222222222222222222222222222222222222222222222"
                    }
                    if (value2 == "-99999999999999999999999999999999999999999999999999998") {
                        value2 = "222222222222222222222222222222222222222222222222222222"
                    }
    
                    if (value1.toUpperCase() < value2.toUpperCase()) return -1
                    if (value1.toUpperCase() == value2.toUpperCase()) return 0
                    if (value1.toUpperCase() > value2.toUpperCase()) return 1
    
                } else {
                    if (parseInt(value1) < parseInt(value2)) return -1;
                    if (parseInt(value1) == parseInt(value2)) return 0;
                    if (parseInt(value1) > parseInt(value2)) return 1;
                }
            };
    
            oCustomMenu.addItem(new sap.ui.commons.MenuItem({
                text: 'Sort Ascending',
                icon: "sap-icon://sort-ascending",
                select: function () {
                    var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);
                    oSorter.fnCompare = comparatorASC;
                    oTable.getBinding("rows").sort(oSorter);
    
                    for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
                    oColumn.setSorted(true);
                    oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);
                }
            }));
            oCustomMenu.addItem(new sap.ui.commons.MenuItem({
                text: 'Sort Descending',
                icon: "sap-icon://sort-descending",
                select: function (oControlEvent) {
                    var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);
                    oSorter.fnCompare = comparatorDESC;
                    oTable.getBinding("rows").sort(oSorter);
    
                    for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
    
                    oColumn.setSorted(true);
                    oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);
                }
            }));
    
            // oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({
            //     text: 'Filter',
            //     icon: 'sap-icon://filter',
            //     select: function (oControlEvent) {
            //         var filterValue = oControlEvent.getParameters().item.getValue();
            //         var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;
            //         var filters = [];
            //         if (filterValue.trim() != '') {
            //             var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterValue);
            //             filters = [oFilter1];
            //         }
            //         oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);
            //     }
            // }));
    
            oColumn.setMenu(oCustomMenu);
            return oColumn;
        },
    
        addColumnSorterAndFilterQty: function (oColumn) {
            var oTable = oColumn.getParent();
            var oCustomMenu = new sap.ui.commons.Menu();
    
            function removeCommas(str) {
                if (typeof str == 'string') {
                    return Number(str.replace(/,/g, ''))
                } else {
                    return str
                }
            }
    
            function comparator(value1, value2) {
                value1 = removeCommas(value1)
                value2 = removeCommas(value2)
    
                if (parseFloat(value1) < parseFloat(value2)) return -1;
                if (parseFloat(value1) == parseFloat(value2)) return 0;
                if (parseFloat(value1) > parseFloat(value2)) return 1;
            };
    
            oCustomMenu.addItem(new sap.ui.commons.MenuItem({
                text: 'Sort Ascending',
                icon: "sap-icon://sort-ascending",
                select: function () {
                    var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);
                    oSorter.fnCompare = comparator;
                    oTable.getBinding("rows").sort(oSorter);
    
                    for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
                    oColumn.setSorted(true);
                    oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);
                }
            }));
            oCustomMenu.addItem(new sap.ui.commons.MenuItem({
                text: 'Sort Descending',
                icon: "sap-icon://sort-descending",
                select: function (oControlEvent) {
                    var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);
                    oSorter.fnCompare = comparator;
                    oTable.getBinding("rows").sort(oSorter);
    
                    for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
    
                    oColumn.setSorted(true);
                    oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);
                }
            }));
    
            // oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({
            //     text: 'Filter',
            //     icon: 'sap-icon://filter',
            //     select: function (oControlEvent) {
            //         var filterValue = oControlEvent.getParameters().item.getValue();
            //         var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;
            //         var filters = [];
            //         if (filterValue.trim() != '') {
            //             var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterValue);
            //             filters = [oFilter1];
            //         }
            //         oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);
            //     }
            // }));
    
            oColumn.setMenu(oCustomMenu);
            return oColumn;
        },
    
        onResetTable: function (pTable) {
            var oResetModel = new sap.ui.model.json.JSONModel()
            pTable.setModel(oResetModel)
        },
    
        ReplaceNullInArrObject: function (pObject) {
            for (var g = 0; g < pObject.length; g++) {
                Object.keys(pObject[g]).forEach(function (key) {
                    if (pObject[g][key] === null) {
                        pObject[g][key] = "";
                    }
                })
            }
        },
    
        MultipleMessages: function (result, navToPages) {
            var modelMsg = new sap.ui.model.json.JSONModel()
            var dlgMultipleMsg = SAPUI.Dialog("", "Messages", "60%", "", true)
    
            var tblDocLines = SAPUI.Table("", "auto", 5, "None", "Paginator", false)
            var clMsgType = SAPUI.Column("Type", "IconImageByData", "ViewType", "16%", "Center", "Center", "", "", {
                colTarget: "ViewType",
                data: [{
                        "I": "icon-stat-4"
                    },
                    {
                        "E": "icon-stat-2"
                    },
                ]
            });
            var clmnItemsDL = SAPUI.Column("Items", "TextView", "Item", "13%", "Begin", "Center")
            var clmnMesgTxtDL = SAPUI.Column("Message Text", "TextView", "Desc", "auto", "Begin", "Left")
    
            tblDocLines.addColumn(clMsgType);
            // tblDocLines.addColumn(clmnItemsDL);
            tblDocLines.addColumn(clmnMesgTxtDL);
    
            dlgMultipleMsg.addContent(tblDocLines)
    
            dlgMultipleMsg.addButton(new sap.m.Button({
                text: "Accept",
                //             style: "Accept",
                icon: "sap-icon://accept",
                press: function () {
                    callbackOK(navToPages)
    
                }
            }))
    
            tblDocLines.setModel(modelMsg)
            modelMsg.setData({
                Message: result
            })
            tblDocLines.bindRows("/Message")
    
            function callbackOK(navToPages) {
                console.log(navToPages)
                if ((navToPages == "") || (navToPages == undefined)) {
                    dlgMultipleMsg.close();
                } else {
                    var isExisthtml = navToPages.includes(".html")
                    console.log(isExisthtml)
                    if (isExisthtml) {
                        sap.m.URLHelper.redirect(navToPages);
                        dlgMultipleMsg.close();
                    } else {
                        SAPUI.Route(navToPages)
                        dlgMultipleMsg.close();
                    }
    
                }
            }
    
            dlgMultipleMsg.open()
            // dlgMultipleMsg.setShowCloseButton(false)
        },
    
        //untuk parameter arrsort isinya array object yg berupa:
        //text = text untuk di dialognya
        //key = bindingan kolomnya
        //operator = operator untuk filter, saat ini ada beberapa kondisi yaitu:
        //jika kolom angka pake EQ
        //kalau string pakai Contains
        //kalau date pakai Date
        //kalau quantity pakai Qty (khusus yg pakai globalnumberwithcommas)
        sortMTable: function (oTable, arrSort, afterOK) {
            var filterTable = oTable.getBinding("items").aFilters
            var valFilter = []
            filterTable.forEach(function (oItem) {
                valFilter.push({
                    path: oItem.sPath,
                    value: oItem.oValue1
                })
            })
    
            var arrSortItem = []
            var bolSelected = true
            arrSort.forEach(function (oItem) {
                arrSortItem.push(
                    new sap.m.ViewSettingsItem("", {
                        text: oItem.text,
                        key: oItem.key + "___" + oItem.operator,
                        selected: bolSelected
                    })
                )
                bolSelected = false
            })
    
            var custControl
            var arrFilterItem = []
            arrSort.forEach(function (oItem) {
                if (oItem.operator == "Date") {
                    custControl = new sap.m.DatePicker({
                            // id: pID,
                            // width: pWidth,
                            // value: "",
                            displayFormat: "dd.MM.yyyy",
                            // valueFormat: "dd.MM.yyyy"
                            valueFormat: "yyyy-MM-dd"
                        })
                        .addStyleClass("sapUiSizeCompact")
                        .setEnabled(true)
                        .setEditable(true)
                } else {
                    custControl = new sap.m.Input("", {
    
                    })
                }
    
                arrFilterItem.push(
                    new sap.m.ViewSettingsCustomItem("", {
                        text: oItem.text,
                        key: oItem.key + "___" + oItem.operator,
                        customControl: custControl
                    })
                )
            })
    
            var dlgSort = new sap.m.ViewSettingsDialog("", {
                title: "Sort & Filter",
                sortItems: arrSortItem,
                filterItems: arrFilterItem,
                confirm: function (oEvent) {
                    handleSortDialogConfirm(oEvent)
                    handleFilterDialogConfirm(this.getFilterItems())
                },
                resetFilters: function () {
                    handleFilterDialogConfirm(this.getFilterItems(), "reset")
                    this.destroy()
                }
            }).addStyleClass("sortDialog")
    
            var dlgFilItems = dlgSort.getFilterItems()
            // dlgFilItems[1]._control.attachChange(function(){
            //     console.log("a")
            // })
            dlgFilItems.forEach(function (oItemFil) {
                oItemFil._control.attachChange(function () {
                    if (this.getValue() != "") {
                        dlgSort._filterList.getItems().forEach(function (oFilter) {
                            if (oItemFil.mProperties.text == oFilter.getTitle()) {
                                if (!oFilter.getTitle().includes('*')) {
                                    oFilter.setTitle(oFilter.getTitle() + '*')
                                    oItemFil.mProperties.text = oItemFil.mProperties.text + "*"
                                }
                            }
                        })
                    } else {
                        dlgSort._filterList.getItems().forEach(function (oFilter) {
                            if (oItemFil.mProperties.text == oFilter.getTitle()) {
                                if (oFilter.getTitle().includes('*')) {
                                    oFilter.setTitle(oFilter.getTitle().slice(0, -1))
                                    oItemFil.mProperties.text = oItemFil.mProperties.text.slice(0, -1)
                                }
                            }
                        })
                    }
                })
    
                filterTable.forEach(function (oItem) {
                    var aSplit = oItemFil.mProperties.key.split("___")
                    if (oItem.sPath == aSplit[0]) {
                        oItem.oValue1 = oItem.oValue1 == null ? "" : oItem.oValue1
                        if (aSplit[1] == "Date") {
                            if (oItem.oValue1 != "") {
                                oItemFil._control.setDateValue(oItem.oValue1)
                            } else {
                                oItemFil._control.setValue(oItem.oValue1)
                            }
                        } else {
                            oItemFil._control.setValue(oItem.oValue1)
                        }
                        if (oItem.oValue1 != "") {
                            oItemFil.mProperties.text = oItemFil.mProperties.text + "*"
                        }
                    }
                })
            })
    
            dlgSort.open()
            console.log(dlgSort)
            dlgSort._dialog.getBeginButton().setType("Emphasized")
            dlgSort._dialog.getEndButton().setType("Ghost")
            dlgSort._resetButton.setType("Transparent")
            dlgSort._resetButton.setText("Reset Filter")
            dlgSort._resetButton.setIcon("")
            dlgSort._page2.getCustomHeader().destroyContentRight()
            dlgSort._page2.getCustomHeader().getContentLeft()[0].setType("Transparent")
            dlgSort._page2.getCustomHeader().getContentLeft()[0].addStyleClass("filterButtonDetail")
    
            function handleSortDialogConfirm(oEvent) {
                var mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];
    
                function removeCommas(str) {
                    if (typeof str == 'string') {
                        return Number(str.replace(/,/g, ''))
                    } else {
                        return str
                    }
                }
    
                function comparator(value1, value2) {
                    value1 = removeCommas(value1)
                    value2 = removeCommas(value2)
    
                    if (parseFloat(value1) < parseFloat(value2)) return -1;
                    if (parseFloat(value1) == parseFloat(value2)) return 0;
                    if (parseFloat(value1) > parseFloat(value2)) return 1;
                };
    
                var aSplit = mParams.sortItem.getKey().split("___"),
                    sPath = aSplit[0]
                bDescending = mParams.sortDescending;
                var oSorter = new sap.ui.model.Sorter(sPath, bDescending)
                if (aSplit[1] == "Qty") {
                    oSorter.fnCompare = comparator;
                }
                aSorters.push(oSorter);
    
                // apply the selected sort and group settings
                oBinding.sort(aSorters);
            }
    
            function handleFilterDialogConfirm(filterItems, filterType = "") {
                var oBinding = oTable.getBinding("items"),
                    aFilters = [];
    
                filterItems.forEach(function (oItem) {
                    if (filterType == "") {
                        var aSplit = oItem.mProperties.key.split("___"),
                            sPath = aSplit[0],
                            sOperator = aSplit[1],
                            sValue1
                        if (sOperator == "Date") {
                            sValue1 = oItem._control.getDateValue()
                            sOperator = "EQ"
                        } else if (sOperator == "Qty") {
                            sValue1 = oItem._control.getValue()
                            sOperator = "EQ"
                        } else {
                            sValue1 = oItem._control.getValue()
                        }
                        sValue1 = sValue1 == null ? "" : sValue1
                        sValue2 = ""
    
                        if (sValue1 != "") {
                            var oFilter = new sap.ui.model.Filter(sPath, sOperator, sValue1, sValue2);
                            aFilters.push(oFilter)
                            oItem._control.setValue(sValue1)
                        }
                    }
                });
    
                oBinding.filter(aFilters);
    
                if (typeof afterOK == "function") {
                    afterOK()
                }
            }
        },
    
        Export: function (pType, pData, pFileName, pFileHeader, arrColName, arrColSize, arrRowSize, arrMerge, isBCReport = null) {
            var loading
            sap.ui.getCore().attachInit(function () {
                loading = SAPUI.BusyDialog();
                loading.open()
            });
            var dateRegx = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}/
            if (isBCReport != null) {
                const company = "PT Trias Sentosa, Tbk."
                const {
                    type,
                    finalData,
                    title,
                    colNameXlsx = finalData[1],
                    fnameXLS = title,
                    colSize,
                    rowSize,
                    merge,
                    hasilPdf,
                    columnPdf,
                    periode,
                    headerCSV,
                    dataCSV
    
                } = isBCReport
    
                var Workbook = function Workbook() {
                    if (!(this instanceof Workbook)) return new Workbook();
                    this.SheetNames = [];
                    this.Sheets = {};
                }
                var wb = Workbook();
                wb.SheetNames.push(fnameXLS);
    
                var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
                    var headerStyle = {
                        alignment: {
                            wrapText: true,
                            vertical: "center",
                            horizontal: "center"
                        },
                        font: {
                            sz: "8.5",
                            name: "Tahoma"
                        },
                        fill: {
                            patternType: 'solid',
                            fgColor: {
                                theme: 8,
                                tint: 0.3999755851924192,
                                rgb: 'DCDCDC'
                            },
                            bgColor: {
                                indexed: 64
                            }
                        },
                        border: {
                            top: {
                                style: "thin",
                                color: {
                                    rgb: 'A9A9A9'
                                }
                            },
                            bottom: {
                                style: "thin",
                                color: {
                                    rgb: 'A9A9A9'
                                }
                            },
                            left: {
                                style: "thin",
                                color: {
                                    rgb: 'A9A9A9'
                                }
                            },
                            right: {
                                style: "thin",
                                color: {
                                    rgb: 'A9A9A9'
                                }
                            }
                        }
                    }
                    var ws = {};
                    var range = {
                        s: {
                            c: 10000000,
                            r: 10000000
                        },
                        e: {
                            c: 0,
                            r: 0
                        }
                    };
                    for (var R = 0; R != data.length; ++R) {
                        for (var C = 0; C != data[R].length; ++C) {
                            if (range.s.r > R) range.s.r = R;
                            if (range.s.c > C) range.s.c = C;
                            if (range.e.r < R) range.e.r = R;
                            if (range.e.c < C) range.e.c = C;
                            var cell = {
                                v: data[R][C]
                            };
                            if (cell.v == null) continue;
                            var cell_ref = XLSX.utils.encode_cell({
                                c: C,
                                r: R
                            });
    
                            if (typeof cell.v === 'number') {
                                cell.t = 'n';
                                cell.z = "#,##0.00"
                                cell.s = {
                                    font: {
                                        sz: "8.5",
                                        name: "Tahoma"
                                    },
                                    border: {
                                        top: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        bottom: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        left: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        right: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        }
                                    }
                                }
                                //                    	cell.s = {alignment:{ wrapText: true }}
                            } else if (typeof cell.v === 'boolean') {
                                cell.t = 'b';
                            }
                            // else if(cell.v instanceof Date) {
                            // else if(new Date(cell.v) !== "Invalid Date" && !isNaN(new Date(cell.v)) ) {
                            else if (dateRegx.test(cell.v)) {
                                cell.t = 'n';
                                cell.z = XLSX.SSF._table[14];
                                var splitDate = cell.v.split("-")
                                cell.v = datenum(`${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`);
                                cell.s = {
                                    font: {
                                        sz: "8.5",
                                        name: "Tahoma"
                                    },
                                    border: {
                                        top: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        bottom: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        left: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        right: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        }
                                    }
                                }
                            } else if (cell.v == finalData[0][0]) {
                                cell.t = 's';
                                cell.s = {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center"
                                    },
                                    font: {
                                        bold: true,
                                        sz: "12",
                                        name: "Times New Roman"
                                    }
                                }
                            } else if (finalData[finalData.length - 1].includes(cell.v) || cell.v == " " || cell.v.includes("Rows")) {
                                cell.t = 's';
                                cell.s = headerStyle
                            } else {
                                cell.t = 's';
                                cell.s = {
                                    font: {
                                        sz: "8.5",
                                        name: "Tahoma"
                                    },
                                    border: {
                                        top: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        bottom: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        left: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        },
                                        right: {
                                            style: "thin",
                                            color: {
                                                rgb: 'A9A9A9'
                                            }
                                        }
                                    }
                                }
                            }
    
                            if (typeof colNameXlsx[0] == 'object') {
                                if (colNameXlsx[0].includes(cell.v)) {
                                    cell.t = 's';
                                    cell.s = headerStyle
                                } else if (colNameXlsx[1].includes(cell.v)) {
                                    cell.t = 's';
                                    cell.s = headerStyle
                                }
                            } else {
                                if (finalData[1].includes(cell.v)) {
                                    cell.t = 's';
                                    cell.s = headerStyle
                                }
                            }
                            ws[cell_ref] = cell;
                        }
                    }
                    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                    return ws;
                }
    
                switch (type.toUpperCase()) {
                    case 'XLS':
                        finalData.unshift([title + " " + company + " " + periode])
                        break;
                    case 'XLSX':
                        finalData.unshift([title + "\r\n" + company + "\r\n" + periode])
                        break;
                }
    
                var ws = sheet_from_array_of_arrays(finalData);
    
                // Setting up Excel column width
                ws['!cols'] = colSize;
                ws['!rows'] = rowSize;
                ws['!merges'] = merge;
    
                console.log(ws)
    
                wb.Sheets[fnameXLS] = ws; // wb.Sheets[title] -> To set sheet name
    
                switch (type.toUpperCase()) {
                    case 'XLSX':
                        $.getScript("asset/js/ExportFiles/xlsx.js", function () {
                            var wbout = XLSX.write(wb, {
                                bookType: 'xlsx',
                                bookSST: true,
                                type: 'binary',
                                showGridLines: false,
                                cellDates: false
                            });
                            var s2ab = function s2ab(s) {
                                var buf = new ArrayBuffer(s.length);
                                var view = new Uint8Array(buf);
                                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                                return buf;
                            };
                            saveAs(new Blob([s2ab(wbout)], {
                                type: "application/octet-stream"
                            }), title + " " + company + " " + periode + ".xlsx");
                            loading.close()
                        });
                        break;
                    case 'XLS':
                        $.getScript("asset/js/ExportFiles/bits/xlsx.js", function () {
                            var wbout = XLSX.write(wb, {
                                bookType: 'xlml',
                                bookSST: true,
                                type: 'binary',
                                showGridLines: false
                            });
                            var s2ab = function s2ab(s) {
                                var buf = new ArrayBuffer(s.length);
                                var view = new Uint8Array(buf);
                                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                                return buf;
                            };
                            saveAs(new Blob([s2ab(wbout)], {
                                type: "application/octet-stream"
                            }), title + " " + company + " " + periode + ".xls");
                            loading.close()
                        });
                        break;
                    case 'CSV':
                        var itemFormatted = typeof dataCSV != 'object' ? JSON.parse(dataCSV) : dataCSV;
                        var CSV = '';
                        CSV += title + '';
    
                        // Header
                        for (let i = 0; i < headerCSV.length; i++) {
                            if (i == headerCSV.length - 1) {
                                CSV += headerCSV[i]
                            } else {
                                CSV += headerCSV[i] + ','
                            }
    
                        }
                        CSV += '\r\n'
    
                        // Data
                        for (var i = 0; i < itemFormatted.length; i++) {
                            var line = "";
                            const keys = Object.keys(itemFormatted[i])
                            for (let j = 0; j < keys.length; j++) {
                                if (j == 0) {
                                    line += '"' + itemFormatted[i][keys[j]] + '","'
                                } else if (j == keys.length - 1) {
                                    line += itemFormatted[i][keys[j]] + '"'
                                } else {
                                    line += itemFormatted[i][keys[j]] + '","'
                                }
                            }
                            CSV += line + '\r\n';
                        }
    
    
                        if (CSV == '') {
                            alert("Invalid data");
                            return;
                        }
    
                        // Generate a file name
                        var filename = title + ".csv";
                        // console.log(CSV)
    
                        // Initialize file format you want csv or xls
                        // var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                        // var link =document.createElement("a");
                        // link.href= uri;
                        // link.style= "visibility:hidden";
                        // link.download= fileName + ".csv";
                        // document.body.appendChild(link);
                        // link.click();
                        // document.body.removeChild(link);
    
                        var blob = new Blob([CSV], {
                            type: 'text/csv'
                        });
                        // var filename =  $scope.getFileNameFromHttpResponse(result);
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveBlob(blob, filename);
                        } else {
                            var elem = window.document.createElement('a');
                            elem.href = window.URL.createObjectURL(blob);
                            elem.download = filename;
                            document.body.appendChild(elem);
                            elem.click();
                            document.body.removeChild(elem);
                        }
                        loading.close()
                        break;
                    case 'PDF':
                        var hasil = hasilPdf
                        var pdfsize = 'b2';
                        var doc = new jsPDF('l', 'pt', pdfsize);
                        var data = hasil
    
                        var columns = columnPdf
    
                        doc.setFontSize(15);
                        doc.setFont('Times New Roman');
                        doc.setTextColor(40);
                        doc.setFontStyle('bold');
    
                        doc.text(title, 40, 100);
                        doc.text(company, 40, 118);
                        doc.text(periode, 40, 136);
    
                        doc.autoTable(columns, data, {
                            startY: 150,
                            theme: 'plain',
                            tableWidth: 'auto',
                            styles: {
                                font: 'Tahoma',
                                lineColor: [128, 128, 128],
                                lineWidth: 0.75,
                                overflow: 'linebreak',
                                columnWidth: 'auto'
                            },
                            headerStyles: {
                                font: 'Tahoma',
                                fillColor: [211, 211, 211],
                                lineColor: [128, 128, 128],
                                lineWidth: 0.75,
                                fontStyle: 'normal',
                                halign: 'center'
                            },
                            columnStyles: {
                                text: {
                                    columnWidth: 'auto'
                                }
                            },
                            drawCell: function (cell, data) {
                                var rows = data.table.rows;
                                if (data.row.index == rows.length - 1) {
                                    doc.printingHeaderRow = true;
                                    doc.setFillColor(211, 211, 211)
                                }
                            }
                        });
                        doc.save(`${title} ${company} ${periode}.pdf`);
                        loading.close()
                        break;
                    default:
                        break;
    
                }
                // Global.InsLogActivity(SAPUI.getRouteName().split("_")[0], `Export To ${type.toUpperCase()} ${title} Periode ${periode}`)
            } else {
                var arrKeys = Object.keys(pData[0]);
                if (pType == "xlsx") {
                    var aData = typeof pData != 'object' ? JSON.parse(pData) : pData;
                    if (aData.length) {
                        var aFinalXlsxData
    
                        // Array variable to store header data in XLSX file
                        aXlsxTitleData = [];
                        aFinalXlsxData = [];
    
                        aXlsxTitleData.push(pFileHeader);
                        aFinalXlsxData.push(aXlsxTitleData);
    
                        if (typeof arrColName[0] === "string") {
                            aFinalXlsxData.push(arrColName);
                        } else {
                            for (var i = 0; i < arrColName.length; i++) {
                                aFinalXlsxData.push(arrColName[i]);
                            }
                        }
    
                        // Below loop to extract data
                        for (var i = 0; i < aData.length; i++) {
                            // Array variable to store content data in XLSX file
                            var aXlsxContentData = [];
                            for (var iIndex in aData[i]) {
                                aXlsxContentData.push(aData[i][iIndex]);
                            }
                            aFinalXlsxData.push(aXlsxContentData);
                        }
    
                        var Workbook = function Workbook() {
                            if (!(this instanceof Workbook)) return new Workbook();
                            this.SheetNames = [];
                            this.Sheets = {};
                        }
                        var wb = Workbook();
                        wb.SheetNames.push(pFileName);
                        const Qty = ["Quantity", "Qty", "quantity", "qty"]
    
                        var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
                            var ws = {};
                            var range = {
                                s: {
                                    c: 10000000,
                                    r: 10000000
                                },
                                e: {
                                    c: 0,
                                    r: 0
                                }
                            };
                            for (var R = 0; R != data.length; ++R) {
                                for (var C = 0; C != data[R].length; ++C) {
                                    if (range.s.r > R) range.s.r = R;
                                    if (range.s.c > C) range.s.c = C;
                                    if (range.e.r < R) range.e.r = R;
                                    if (range.e.c < C) range.e.c = C;
                                    var cell = {
                                        v: data[R][C]
                                    };
                                    if (cell.v == null) continue;
                                    var cell_ref = XLSX.utils.encode_cell({
                                        c: C,
                                        r: R
                                    });
    
                                    if (typeof arrColName[0] === "string") {
                                        if (typeof cell.v === 'number') {
                                            var isQty = false
                                            for (let i = 0; i < Qty.length; i++) {
                                                if (arrColName[C].includes(Qty[i])) {
                                                    isQty = true
                                                    break
                                                }
                                            }
                                            if (isQty) {
                                                cell.z = "#,##0.0000"
                                            } else {
                                                cell.z = "#,##0.00"
                                            }
                                            cell.t = 'n';
                                            cell.s = {
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (typeof cell.v === 'boolean') {
                                            cell.t = 'b';
                                        } else if (dateRegx.test(cell.v)) {
                                            cell.t = 'n';
                                            cell.z = XLSX.SSF._table[14];
                                            var splitDate = cell.v.split("-")
                                            cell.v = datenum(`${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`);
                                            cell.s = {
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (cell.v == aXlsxTitleData[0]) {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                },
                                                font: {
                                                    bold: true,
                                                    sz: "12",
                                                    name: "Times New Roman"
                                                }
                                            }
                                        } else if (arrColName.includes(cell.v)) {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center",
                                                    horizontal: "center"
                                                },
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                fill: {
                                                    patternType: 'solid',
                                                    fgColor: {
                                                        theme: 8,
                                                        tint: 0.3999755851924192,
                                                        rgb: 'DCDCDC'
                                                    },
                                                    bgColor: {
                                                        indexed: 64
                                                    }
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (cell.v.includes("Rows") || cell.v.includes("Total") || cell.v.includes("Dokumen Pabean") || cell.v.includes("Bukti Penerimaan Barang") || cell.v == " ") {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center",
                                                    horizontal: "center"
                                                },
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                fill: {
                                                    patternType: 'solid',
                                                    fgColor: {
                                                        theme: 8,
                                                        tint: 0.3999755851924192,
                                                        rgb: 'DCDCDC'
                                                    },
                                                    bgColor: {
                                                        indexed: 64
                                                    }
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            //A9A9A9 maybe you can diff the result with space instead before binding the data
                                            cell.t = 's';
                                            cell.s = {
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (typeof cell.v === 'number') {
                                            cell.t = 'n';
                                            cell.s = {
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (typeof cell.v === 'boolean') {
                                            cell.t = 'b';
                                        } else if (cell.v instanceof Date) {
                                            cell.t = 'n';
                                            cell.z = XLSX.SSF._table[14];
                                            cell.v = datenum(cell.v);
                                        } else if (cell.v == aXlsxTitleData[0]) {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center"
                                                },
                                                font: {
                                                    bold: true,
                                                    sz: "12",
                                                    name: "Times New Roman"
                                                }
                                            }
                                        } else if (arrColName[0].includes(cell.v)) {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center",
                                                    horizontal: "center"
                                                },
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                fill: {
                                                    patternType: 'solid',
                                                    fgColor: {
                                                        theme: 8,
                                                        tint: 0.3999755851924192,
                                                        rgb: 'DCDCDC'
                                                    },
                                                    bgColor: {
                                                        indexed: 64
                                                    }
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (arrColName[1].includes(cell.v)) {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center",
                                                    horizontal: "center"
                                                },
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                fill: {
                                                    patternType: 'solid',
                                                    fgColor: {
                                                        theme: 8,
                                                        tint: 0.3999755851924192,
                                                        rgb: 'DCDCDC'
                                                    },
                                                    bgColor: {
                                                        indexed: 64
                                                    }
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (cell.v.includes("Rows") || cell.v.includes("Total") || cell.v.includes("Dokumen Pabean") || cell.v.includes("Bukti Penerimaan Barang") || cell.v == " ") {
                                            cell.t = 's';
                                            cell.s = {
                                                alignment: {
                                                    wrapText: true,
                                                    vertical: "center",
                                                    horizontal: "center"
                                                },
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                fill: {
                                                    patternType: 'solid',
                                                    fgColor: {
                                                        theme: 8,
                                                        tint: 0.3999755851924192,
                                                        rgb: 'DCDCDC'
                                                    },
                                                    bgColor: {
                                                        indexed: 64
                                                    }
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            //A9A9A9 maybe you can diff the result with space instead before binding the data
                                            cell.t = 's';
                                            cell.s = {
                                                font: {
                                                    sz: "8.5",
                                                    name: "Tahoma"
                                                },
                                                border: {
                                                    top: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    bottom: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    left: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    },
                                                    right: {
                                                        style: "thin",
                                                        color: {
                                                            rgb: 'A9A9A9'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
    
    
    
                                    ws[cell_ref] = cell;
                                }
                            }
                            if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                            return ws;
                        }
    
                        var ws = sheet_from_array_of_arrays(aFinalXlsxData);
    
                        // Setting up Excel column width
                        var cols = []
                        for (var i = 0; i < arrColSize.length; i++) {
                            cols.push({
                                wch: arrColSize[i]
                            })
                        }
                        ws['!cols'] = cols
    
                        var rows = []
                        for (var i = 0; i < arrRowSize.length; i++) {
                            rows.push({
                                hpt: arrRowSize[i]
                            })
                        }
                        ws['!rows'] = rows
    
                        ws['!merges'] = arrMerge
    
                        console.log(ws)
                        wb.Sheets[pFileName] = ws; // wb.Sheets[ReportTitle] -> To set sheet name
    
                        // $.getScript("asset/js/ExportFiles/xlsx.js", function () {
                            var wbout = XLSX.write(wb, {
                                bookType: 'xlsx',
                                bookSST: true,
                                type: 'binary',
                                showGridLines: false
                            });
                            var s2ab = function s2ab(s) {
                                var buf = new ArrayBuffer(s.length);
                                var view = new Uint8Array(buf);
                                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                                return buf;
                            };
    
                            saveAs(new Blob([s2ab(wbout)], {
                                type: "application/octet-stream"
                            }), pFileName + ".xlsx");
                            loading.close()
                        // });
    
                    } else {
                        alert("Tidak ada data")
                    }
                } else if (pType == "pdf") {
                    var hasil = pData
                    var pdfsize = 'b2';
                    var doc = new jsPDF('l', 'pt', pdfsize);
                    var data = hasil
    
                    var columns = []
                    for (var i = 0; i < arrColName.length; i++) {
                        columns.push({
                            title: arrColName[i],
                            dataKey: arrKeys[i]
                        })
                    }
    
                    doc.setFontSize(15);
                    doc.setFont('Times New Roman');
                    doc.setTextColor(40);
                    doc.setFontStyle('bold');
    
                    doc.text(pFileHeader, 40, 100);
                    if (!pFileHeader.includes("PT Trias Sentosa, Tbk.")) {
                        doc.text("PT Trias Sentosa, Tbk.", 40, 118);
                    }
    
                    doc.autoTable(columns, data, {
                        startY: 175,
                        theme: 'plain',
                        tableWidth: 'auto',
                        styles: {
                            font: 'Tahoma',
                            lineColor: [128, 128, 128],
                            lineWidth: 0.75,
                            overflow: 'linebreak',
                            columnWidth: 'auto'
                        },
                        headerStyles: {
                            font: 'Tahoma',
                            fillColor: [211, 211, 211],
                            lineColor: [128, 128, 128],
                            lineWidth: 0.75,
                            fontStyle: 'normal',
                            halign: 'center'
                        },
    
                        columnStyles: {
                            text: {
                                columnWidth: 'auto'
                            }
                        },
                        drawCell: function (cell, data) {
                            if (typeof cell.raw == 'number') {
                                cell.text = [Global.numberWithCommas(cell.raw)]
                            }
                            var rows = data.table.rows;
                            if (data.row.index == rows.length - 1) {
                                doc.printingHeaderRow = true;
                                doc.setFillColor(211, 211, 211)
                            }
                        }
                    });
                    doc.save(pFileName + ".pdf");
                    loading.close()
                }
                // Global.InsLogActivity(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0], "Export To " + pType.toUpperCase() + " " + pFileName)
            }
        },
    
        truncateComma: function (value, behindComma = 2) {
            if (value.includes(".")) {
                var value1 = value.split(".");
                var value2 = value1[1].substr(0, behindComma);
                var value3 = value1[0] + "." + value2
                return value3
            }
            // console.log(value3)
            return value
        },
    
        UpdRptTotalFilter: function (param) {
            const {
                table,
                keys,
                sumTable,
                oriArray,
                truncateComma = 2
            } = param
    
            var result = {}
    
            if (table instanceof sap.ui.table.Table) {
                if (oriArray != undefined) {
                    var arrModel = oriArray
                } else {
                    var model = table.getModel().getData()
                    var modelIndex = Object.keys(model)[0]
                    var arrModel = model[modelIndex]
                }
                var filtered = table.getBinding("rows").aIndices
    
                var sumModel = sumTable.getModel().getData()
                var sumModelIndex = Object.keys(sumModel)[0]
                var arrTblTotal = sumModel[sumModelIndex]
    
                if (filtered.length === 0) {
                    for (let j = 0; j < keys.length; j++) {
                        arrTblTotal[0][keys[j]] = "Total :  0"
                    }
                } else {
                    for (let i = 0; i < filtered.length; i++) {
                        for (let j = 0; j < keys.length; j++) {
                            if (result[keys[j]] == undefined) {
                                result[keys[j]] = Global.removeCommas(arrModel[filtered[i]][keys[j]])
                            } else {
                                result[keys[j]] = result[keys[j]] + Global.removeCommas(arrModel[filtered[i]][keys[j]])
                            }
    
                            if (i == filtered.length - 1) {
                                const Qty = ["Quantity", "Qty", "quantity", "qty"]
                                var isQty = false
                                for (let i = 0; i < Qty.length; i++) {
                                    if (keys[j].includes(Qty[i])) {
                                        isQty = true
                                        break
                                    }
                                }
                                if (isQty) {
                                    arrTblTotal[0][keys[j]] = "Total : " + Global.numberWithCommas(Number(result[keys[j]].toFixed(4)).toString())
                                } else {
                                    arrTblTotal[0][keys[j]] = "Total : " + Global.numberWithCommas(Number(result[keys[j]].toFixed(truncateComma)))
                                    // arrTblTotal[0][keys[j]] = "Total : " + Global.numberWithCommas(Number(result[keys[j]]))
                                    // arrTblTotal[0][keys[j]] = "Total : " + truncateComma(Global.numberWithCommas(Number(result[keys[j]])))
                                }
                            }
                        }
                    }
                }
                sumTable.getModel().refresh()
            } else {
                throw "input param is not sap.ui.table.Table instance"
            }
        },
    
        Carousel: function (pID, pWdth, pHeight, pPage) {
            return new sap.m.Carousel({
                id: pID,
                width: pWdth,
                height: pHeight,
                pages: pPage,
            });
        },
    
        Wizard: function (pID, pWdth, pHeigh) {
            return new sap.m.Wizard({
                id: pID,
                width: pWdth,
                height: pHeigh,
            });
        },
    
        WizardStep: function (pID, pTitle, pvalidated) {
            return new sap.m.WizardStep({
                id: pID,
                title: pTitle,
                validated: pvalidated,
            });
        },
    
        SimpleForm: function (pID, pTitle, pEditable) {
            return new sap.ui.layout.form.SimpleForm({
                id: pID,
                title: pTitle,
                editable: pEditable,
            })
        },
    
        Text: function (pID, pText, pWrap) {
            return new sap.m.Text({
                id: pID,
                text: pText,
                wrapping: pWrap
            })
        },
    
        FileUploaderType: function (pID, pTooltip, pStyle, pPlaceholder, pFiletype, pMultiple) {
            return new sap.ui.unified.FileUploader({
                id: pID,
                tooltip: pTooltip,
                style: pStyle,
                placeholder: pPlaceholder,
                fileType: pFiletype,
                multiple: pMultiple,
            })
        },
    
        Line: function (pID, pHeight) {
            return new sap.ui.commons.HorizontalDivider({
                id: pID,
                height: sap.ui.commons.HorizontalDividerHeight.Small
            })
            // .addStyleClass("lineStyle")
        },
    
        TabStrip: function (pID, pHeight, pWidth, pSelectedIndex) {
            return new sap.m.TabContainer({
                id: pID
            })
            // return new sap.ui.commons.TabStrip({
            //     id: pID,
            //     height: pHeight,
            //     width: pWidth,
            //     selectedIndex: pSelectedIndex
            // })
        },

        TabContainerR: function(pID){
            return new sap.m.TabContainer({
                id: pID,
                height: "auto",
                width: "100%",
                selectedIndex: 0,
            })
        },
        TabContainerRitem: function(pID, pName){
            return new sap.m.TabContainerItem({
                id: pID,
                name: pName
            })
        },
    
        Tab: function (pID, pText) {
            return new sap.ui.commons.Tab({
                id: pID,
                text: pText,
                verticalScrolling: sap.ui.core.Scrolling.Auto
            })
        },
    
        HorizontalLayout: function (pID) {
            return new sap.ui.layout.HorizontalLayout({
                id: pID
            })
        },
    
        IconTabBar: function (pID) {
            return new sap.m.IconTabBar({
                id: pID
            })
        },
    
        IconTabFilter: function (pID, pText, pIcon) {
            return new sap.m.IconTabFilter({
                id: pID,
                text: pText,
                icon: pIcon
            })
        },
    
        ScrollContainer: function (pID, pHeight, pWdth, pHorizontal, pVertical) {
            return new sap.m.ScrollContainer({
                id: pID,
                height: pHeight,
                width: pWdth,
                horizontal: pHorizontal,
                vertical: pVertical
            })
        },
    
        TitleLine: function (pTitle) {
            var lineforTitle = new sap.ui.commons.layout.MatrixLayout({
                    width: '100%',
                    layoutFixed: true,
                    widths: 'auto',
                    columns: 1
                })
                .addStyleClass("lineforTitle")
    
            lineforTitle.createRow(new sap.m.Title({
                text: pTitle,
                width: "100%",
                textAlign: 'Left'
            }))
            lineforTitle.createRow(new sap.ui.commons.HorizontalDivider({
                height: sap.ui.commons.HorizontalDividerHeight.Small
            }))
    
            return lineforTitle
        },
    
        NavigationList: function (pID, pWdth) {
            return new sap.tnt.NavigationList({
                id: pID,
                width: pWdth
            })
        },
    
        NavigationListItem: function (pID, pText, pIcon) {
            return new sap.tnt.NavigationListItem({
                id: pID,
                text: pText,
                icon: pIcon
            })
        },
    
        Tree: function (pID, pTitle, pIcon) {
            return new sap.m.Tree({
                id: pID,
                mode: sap.m.ListMode.SingleSelectMaster,
                items: {
                    templateShareable: false,
                    template: new sap.m.StandardTreeItem({
                        title: "{" + pTitle + "}",
                        icon: "{" + pIcon + "}"
                    }),
                    path: '/'
                }
            })
        },
    
        ErrorLabel: function (pID, pLabel, pWdth) {
            return new sap.ui.commons.Label({
                id: pID,
                text: pLabel,
                width: pWdth
            }).addStyleClass("ErrorLabelStyle")
        },
    
        TextField3: function (pID, pValue, pWidth, pType) {
            // new sap.ui.commons.TextField
            return new sap.m.Input({
                id: pID,
                value: pValue,
                width: pWidth,
                type: pType,
                change: function (e) {
                    var usrval = this.getValue().toUpperCase();
                    this.setValue(usrval)
                }
            }).addStyleClass("sapUiSizeCompact")
        },
    
        GetRomanText: function (num) {
            var lookup = {
                M: 1000,
                CM: 900,
                D: 500,
                CD: 400,
                C: 100,
                XC: 90,
                L: 50,
                XL: 40,
                X: 10,
                IX: 9,
                V: 5,
                IV: 4,
                I: 1
            }
            var roman = ''
            var i
    
            for (i in lookup) {
                while (num >= lookup[i]) {
                    roman += i;
                    num -= lookup[i];
                }
            }
            return roman;
        },
    
        ComparatorDialog: function (param = {}) {
            const {
                callback,
                lastValue = "Greater than or Equal to",
                title = 'Select Comparator'
            } = param
            return new Promise((resolve, reject) => {
                var dialog = SAPUI.Dialog("", title, "200px", "50%")
                var table = SAPUI.Table("", "100%", 7).setSelectedIndex(0)
                    .addColumn(SAPUI.Column("Selection", "TextView", "Selection", "50px", "Left", "Left"))
                    .addColumn(SAPUI.Column("Description", "TextView", "Description", "150px", "Left", "Left"))
    
                var arrData = [{
                        Selection: '=',
                        Description: 'Single Value'
                    },
                    {
                        Selection: '≥',
                        Description: 'Greater than or Equal to'
                    },
                    {
                        Selection: '>',
                        Description: 'Greater than'
                    },
                    {
                        Selection: '≤',
                        Description: 'Less than or Equal to'
                    },
                    {
                        Selection: '<',
                        Description: 'Less than'
                    },
                    {
                        Selection: '[ ]',
                        Description: 'Range'
                    }
                ]
    
                if (lastValue) {
                    arrData.forEach((el, index) => {
                        if (el["Description"] == lastValue) {
                            table.setSelectedIndex(index)
                        }
                    })
                }
    
                var model = new sap.ui.model.json.JSONModel()
                model.setData(arrData)
    
                table.setModel(model)
                table.bindRows("/")
    
                dialog.addContent(
                    SAPUI.Panel()
                    .addContent(table)
                )
    
                dialog.addButton(
                    SAPUI.Button("", "Select", "Select", "", false, "Emph")
                    .attachPress(function (oEvent) {
                        if (table.getSelectedIndex() > -1) {
                            dialog.close()
                            dialog.attachAfterClose(function (oEvent) {
                                if (typeof callback == 'function') {
                                    callback(oEvent, table, dialog)
                                }
                                resolve(table.getContextByIndex(table.getSelectedIndex()).getObject())
                            })
                        }
                    })
                )
    
                dialog.addButton(
                    SAPUI.ButtonCancel().attachPress(function (oEvent) {
                        dialog.close()
                        dialog.attachAfterClose(function () {
                            resolve(false)
                        })
                    })
                )
    
                dialog.open()
            })
        },
    
        onCekValidValueHelp: function (codeVhf, pBindVhf, pBindVhfDesc = '', vhfElement, vhfDesc = '') {
            var oThis = this
            // console.log(vhfElement.getValue())
    
            var wsUrl = WS_SY + "WS_UC";
            var param = {
                Code: codeVhf
            };
    
            promiseApi({
                url: wsUrl,
                body: param,
                method: 'DisplayValueHelp',
                sync: false,
            }).then(res => {
                console.log(res)
    
                var valid = false
                res[0].forEach(element => {
                    if (element[pBindVhf] == vhfElement.getValue()) {
                        if (vhfDesc != '') {
                            vhfDesc.setText(element[pBindVhfDesc])
                        }
                        valid = true
                    }
                });
    
                if (!valid) {
                    vhfElement.setValue('')
                    if (vhfDesc != '') {
                        vhfDesc.setText('')
                    }
                    SAPUI.MessageBoxError('Enter valid value!')
                }
            })
        },
    
        //03.02.2021
        //a function that can return integer to certain digit
        // example: 315 become '00000315' (8 digits)
        digitString: function (value, digitNumber) {
            var valueSt = value.toString()
            if (valueSt.length <= digitNumber) {
                var digit = digitNumber - valueSt.length
                var a = ''
    
                for (i = 0; i < digit; i++) {
                    a += '0'
                }
    
                return a + valueSt
            } else {
                throw "digitNumber are smaller than value char"
            }
        },
    }
    return SAPUI
})
