sap.ui.define(function(){
	const Global = {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		encode: function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
	
			input = Global._utf8_encode(input);
	
			while (i < input.length) {
	
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
	
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
	
				output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	
			}
	
			return output;
		},
		decode: function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
	
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
			while (i < input.length) {
	
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
	
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
	
				output = output + String.fromCharCode(chr1);
	
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
	
			}
	
			output = Global._utf8_decode(output);
	
			return output;
		},
		_utf8_encode: function (string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
	
			for (var n = 0; n < string.length; n++) {
	
				var c = string.charCodeAt(n);
	
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
	
			return utftext;
		},
		_utf8_decode: function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
	
			while (i < utftext.length) {
	
				c = utftext.charCodeAt(i);
	
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
	
			return string;
		},
		/**
		 * @param  {} param
		 * Validasi F4 Khusus Table
		 */
		F4Validation: async function (param) {
			const {
				element,
				changeBindLists,
				bind
			} = param
	
			var idx = element.getParent().getIndex()
			var value = element.getValue()
			var tbl = element.getParent().getParent()
			var model = tbl.getModel()
			var dataModel = model.getData()
			var keyRes = Object.keys(dataModel)[0]
			var arrData = keyRes == 0 ? model.getData() : model.getData()[keyRes]
	
			var descBind = ''
			var filterBind = ''
			var filterValue = ''
			var sendCode = ''
	
			var objF4 = false
	
			if (value != '') {
				if (changeBindLists) {
					objF4 = changeBindLists.find(el => {
						return el["key"] == bind
					})
				}
	
				if (objF4) {
					descBind = objF4["desc"]
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
	
				var res = await fetchApi({
					url: WS_SY + "WS_UC",
					method: "DisplayValueHelp",
					body: {
						Code: sendCode + filterValue
					}
				})
	
				var realRes = res[0]
				console.log(realRes)
				console.log(sendCode)
	
				var newParam = []
	
				if (realRes) {
					newParam = realRes.filter(el => {
						var newSendCode = ''
						if (el.hasOwnProperty(sendCode)) {
							newSendCode = sendCode
						} else {
							var objKeys = Object.keys(el)
							newSendCode = objKeys[0]
						}
						return el[newSendCode] == value
					})
				}
	
				// Jika menggunakan overrideCode tidak ditemukan 
				// maka akan mencari menggunakan bind
				if (newParam.length == 0) {
					if (realRes) {
						newParam = realRes.filter(el => {
							return el[bind] == value
						})
					}
				}
	
				if (newParam.length > 0) {
					var prop = Object.keys(newParam[0])[1]
					arrData[idx][descBind] = newParam[0][prop]
					element.setValueState(sap.ui.core.ValueState.None)
				} else {
					element.setValueState(sap.ui.core.ValueState.Error)
					arrData[idx][bind] = ''
					arrData[idx][descBind] = ''
					SAPUI.MessageBoxAlert(sendCode + ' tidak valid')
				}
	
				model.refresh()
			}
	
		},
		GetF4Desc: function (param) {
			const {
				element,
				bind
			} = param
			var value = element.getValue()
			var desc = ''
			var res = promiseApi({
				url: WS_SY + "WS_UC",
				method: "DisplayValueHelp",
				body: {
					Code: bind
				}
			})
			var realRes = res[0]
			var newParam = realRes.filter(el => {
				return el[bind] == value
			})
	
			if (newParam.length > 0) {
				var prop = Object.keys(newParam[0])[1]
				element.setValueState(sap.ui.core.ValueState.None)
				desc = newParam[0][prop]
			} else {
				element.setValueState(sap.ui.core.ValueState.Error)
			}
	
			return desc
		},
		addHistory: function (view) {
			if (view) {
				var tempSessHistory = Global.getHistory()
				tempSessHistory.push(view)
				window.sessionStorage.setItem('sess-history', JSON.stringify(tempSessHistory))
				return true
			}
			return false
		},
		getHistory: function () {
			var tempSessHistory = window.sessionStorage.getItem('sess-history')
			if (tempSessHistory) {
				return JSON.parse(tempSessHistory)
			} else {
				return []
			}
		},
		getPreviousRoute() {
			var tempSessHistory = Global.getHistory()
			if (tempSessHistory.length > 0) {
				return tempSessHistory[tempSessHistory.length - 2]
			}
			return false
		},
		getCurrentRoute() {
			var tempSessHistory = Global.getHistory()
			if (tempSessHistory.length > 0) {
				return tempSessHistory[tempSessHistory.length - 1]
			}
			return false
		},
		createId(name) {
			return "id" + this.getCurrentRoute() + "--" + name
		},
		/**
		 * dialog f4
		 *  @param {} comp1 komponen yg akan di set valuenya setelah memilih data
		 *	@param {} comp2 komponen yg akan di setValuenya setelah memilih data
		 *	@param {} pTitleDlg komponen disebelah valuhelpfield yg akan digunakan untuk title dialog valuehelp
		 *	@param {} filter nama filter yg disediakan di SP valuhelp
		 *	@param {} filter2 nama halaman tcode valuehelp
		 *	@param {} value value untuk filter data valuehelp yang akan di pakai 
		 *	@param {} colfield param component untuk mengambil id column valuehelpfield dari table
		 *	@param {} comp3 komponen yg akan di set valuenya setelah memilih data (untuk case yang ada multiple select)
		 *	@param {} comp4 mengambil value kolom 3 dari valuehelp field
		 *	@param {} table untuk mengambil id table untuk bisa diambil modelnya & di insertkan data dari valuhelp ke kolom table
		 */
		//blm dites
		F4Filter: function (comp1, comp2, pTitleDlg, filter, filter2, value, colField, comp3, comp4, table, additionalParams = {}, selectButton = false) {
			return new Promise((resolve, reject) => {
				const {
					hideCol = -1, selectedCol = 0, descCol = 1, customURL = WS_SY + "WS_UC", customObj = {
						Code: filter
					}, customMethod = "DisplayValueHelp", customColLabel = {}
				} = additionalParams
				// Deklarasi objek untuk value help dialog
				// 1. Dialog
				let oDialog = SAPUI.GetCore("F4FilterDialog");
				if (oDialog) {
					oDialog.destroy()
				}
				oDialog = SAPUI.Dialog("F4FilterDialog", "Select", "auto", "auto", true);
				// 2. Textview
				var DspEntries = SAPUI.TextView("", "", "", "100%", true)
				DspEntries.setDesign(sap.ui.commons.TextViewDesign.Bold)
				// 3. Table
				var oTable = SAPUI.Table("", "auto", 10, "Single", "Scroll")
				// 4. Busy Dialog
				var loading = SAPUI.BusyDialog();
				// 5. Button
				var btnCancel = SAPUI.Button("", "Close", "", "", false, "")
				var btnSelect = SAPUI.Button("", "Select", "", "", false, "Emph")
	
				var retValue = ''
				// Pengaturan event untuk setiap objek
				// 1. Table
				if (selectButton) {
					btnSelect.attachPress(function () {
						selectRow()
					})
				} else {
					oTable.attachRowSelectionChange(function (oEvent) {
						selectRow()
					})
				}
	
				// 2. Button
				btnCancel.attachPress(function (oEvent) {
					oDialog.close();
				})
	
				function selectRow() {
					var idx = oTable.getSelectedIndex()
	
					if (oTable.isIndexSelected(idx)) {
						var cxt = oTable.getContextByIndex(idx);
						var path = cxt.sPath;
						var obj = oTable.getModel().getProperty(path);
	
						var selectedItem = obj[Object.keys(obj)[selectedCol]]
						var selectedItem2 = obj[Object.keys(obj)[descCol]]
						var selectedItem3 = obj[Object.keys(obj)[2]]
						//					var arr=Object.keys(obj)
						//					var getDatatabel=table.getModel().getData().modelData
						//					console.log(getDatatabel)
						//					var indexof=arr.indexOf("Material") //diganti variable
						//					var tesValues=Object.values(obj)[indexof]
						//					var object2
						//					var object1=[]
						//					console.log(idx)
						//					for(i=0;i<getDatatabel.length;i++){
						// 
						//						object1.push(Object.assign({Material2:tesValues},getDatatabel[i]))
						//						
						//					}
						//					
						//					console.log(object1)
						//					
						//					console.log(getDatatabel)
	
	
	
						//					kurang ambil kolom valuehelp ke kolom table 
						//					jika ada keterangan dari yg di select comp2.setValue(selecteditem2)
	
						//					var data=table.getModel().getData()
						function updateValueOnElement(comp, selectedItem) {
							if (comp.getMetadata().getName() == "sap.m.Input") {
								comp.setValue(selectedItem);
								comp.fireChange()
								comp.setValueState(sap.ui.core.ValueState.None)
							} else {
								comp.setText(selectedItem);
							}
						}
						
						if(comp1 != "" && comp2 != ""){
							updateValueOnElement(comp2, selectedItem2)
							updateValueOnElement(comp1, selectedItem)
						}
	
						if (comp1 != "") {
							updateValueOnElement(comp1, selectedItem)
						}
						if (comp2 != "") {
							updateValueOnElement(comp2, selectedItem2)
						}
						if (comp3 != "") {
							if (comp3.getMetadata().getName() == "sap.m.Input") {
								var dummy = comp3.getValue()
								var dummyArr = dummy.split(",")
								var dummyRes = ''
	
								for (var i = 0; i < dummyArr.length; i++) {
									if (i == 0 && i == (dummyArr.length - 1)) {
										dummyRes = selectedItem
									} else if (i == 0) {
										dummyRes = selectedItem + ","
									} else if (i == (dummyArr.length - 1)) {
										dummyRes = dummyRes + dummyArr[i]
									} else {
										dummyRes = dummyRes + dummyArr[i] + ","
									}
								}
								comp3.setValue(dummyRes);
								comp3.setValueState(sap.ui.core.ValueState.None)
							} else {
								var dummy = comp3.getText()
								var dummyArr = dummy.split(",")
								var dummyRes = ''
	
								for (var i = 0; i < dummyArr.length; i++) {
									if (i == 0 && i == (dummyArr.length - 1)) {
										dummyRes = selectedItem
									} else if (i == 0) {
										dummyRes = selectedItem + ","
									} else if (i == (dummyArr.length - 1)) {
										dummyRes = dummyRes + dummyArr[i]
									} else {
										dummyRes = dummyRes + dummyArr[i] + ","
									}
								}
								comp3.setText(dummyRes);
							}
						}
						if (comp4 != "") {
							if (comp4.getMetadata().getName() == "sap.m.Input") {
								comp4.setValue(selectedItem3);
								comp4.setValueState(sap.ui.core.ValueState.None)
							} else {
								comp4.setText(selectedItem3);
							}
						}
						if (colField) {
							var colContent = SAPUI.GetCore(colField)
							colContent.setValue(selectedItem);
							colContent.setValueState(sap.ui.core.ValueState.None)
						}
	
						// FireChange
						// if (comp1 != "") {
						// 	if (comp1.getMetadata().getName() == "sap.m.Input") {
						// 		comp1.fireChange()
						// 	}
						// }
						// if (comp2 != "") {
						// 	if (comp2.getMetadata().getName() == "sap.m.Input") {
						// 		comp2.fireChange()	
						// 	}
						// }
	
						resolve({
							selectedItem,
							selectedItem2,
							selectedItem3,
							oDialog,
							obj
						})
						oDialog.close();
					} else {
						// Jika value sudah ada
						if (value) {
							var selectedObj = oTable.getModel().getData()["WS_SP_DspValueHelpResult"].find(el => {
								return el[Object.keys(el)[selectedCol]] == value
							})
	
							var selectedItem = selectedObj ? selectedObj[Object.keys(selectedObj)[selectedCol]] : ""
							var selectedItem2 = selectedObj ? selectedObj[Object.keys(selectedObj)[descCol]] : ""
							var selectedItem3 = selectedObj ? selectedObj[Object.keys(selectedObj)[2]] : ""
	
							if (comp1 != "") {
								if (comp1.getMetadata().getName() == "sap.m.Input") {
									comp1.setValue(selectedItem);
									comp1.fireChange()
									comp1.setValueState(sap.ui.core.ValueState.None)
								} else {
									comp1.setText(selectedItem);
								}
							}
							if (comp2 != "") {
								if (comp2.getMetadata().getName() == "sap.m.Input") {
									comp2.setValue(selectedItem2);
									comp2.fireChange()
									comp2.setValueState(sap.ui.core.ValueState.None)
								} else {
									comp2.setText(selectedItem2);
								}
							}
	
							resolve({
								selectedItem,
								selectedItem2,
								selectedItem3,
								oDialog,
								obj: selectedObj
							})
						}
					}
				}
	
				// Susun template value help dialog sementara
				// 1. Atur Header
				strTitleDialog = "Select " + pTitleDlg
				oDialog.setTitle(strTitleDialog)
				// 2. Atur footer untuk table dalam dialog
				oTable.setFooter(DspEntries)
				// 3. Tambahkan button di dialog
				if (selectButton) {
					oDialog.addButton(btnSelect)
				}
				oDialog.addButton(btnCancel)
	
				// Eksekusi ambil data value help dan ditampilkan dalam dialog
				if (comp3 == undefined) {
					comp3 = ""
				}
	
				if (comp4 == undefined) {
					comp4 = ""
				}
	
				if (value == undefined) {
					value = ""
				}
	
				if (table == undefined) {
					table = ""
				}
	
				var wsUrl = customURL;
				var param = customObj
	
				var pAjax = Global.dynamicParam(customMethod, param)
	
				loading.open()
	
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: pAjax,
					success: function (result) {
						var oModel = new sap.ui.model.json.JSONModel([]);
						var deserilizeResult = Global.dynamicDeserialize(result)
	
						if (deserilizeResult.length) {
							tableContent = deserilizeResult[0]
							ResultLength = tableContent.length
							index = 0
							counter = 0;
	
							if (ResultLength > 0) {
								var tempResultObj = tableContent;
								tableContent.forEach(function (item) {
									if (index == 0) {
										// if(customColLabel.length){
										const keys = Object.keys(item)
										keys.forEach((el, idx) => {
											var colTemplate = SAPUI.Column(customColLabel[idx] || el, "TextView", el, "auto", "Left", "Left");
											oTable.addColumn(colTemplate);
	
										})
										// }else{
										// 	for (var key in item) {
										// 		var colTemplate = SAPUI.Column(key, "TextView", key, "auto", "Left", "Left");
										// 		oTable.addColumn(colTemplate);
	
										// 	}
										// }
										index++
									}
								})
	
								oTable.setModel(oModel);
	
								oModel.setData({
									WS_SP_DspValueHelpResult: tableContent
								});
								oTable.bindRows("/WS_SP_DspValueHelpResult");
								var strDspEntries = "" + ResultLength
								if (ResultLength > 1) {
									strDspEntries = strDspEntries + " Entries Found"
								} else {
									strDspEntries = strDspEntries + " Entry Found"
								}
								DspEntries.setText(strDspEntries)
	
								oDialog.addContent(oTable)
	
								if (hideCol > -1) {
									oTable.getColumns()[hideCol].setVisible(false)
								}
	
								if (value) {
									selectRow()
								} else {
									loading.close()
									// if (oDialog) {
										oDialog.open();
									// }
									oModel.refresh();
								}
	
	
							} else {
								oTable.setModel(oModel);
								oDialog.addContent(oTable);
								oDialog.open();
								oModel.refresh();
							}
						}
						loading.close()
					},
					error: function (jqXHR, textStatus, errorThrown) {
						loading.close()
						SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
					}
				})
			})
		},
		/*f4 khusus kalau ngetik sendiri
		 * belum di tes
		 */
		F4FilterGetText: function (comp1, comp2, inputText, filter, filter2, value, colField, comp3, comp4) {
			if (comp3 == undefined) {
				comp3 = ""
			}
	
			if (comp4 == undefined) {
				comp4 = ""
			}
	
			if (value == undefined) {
				value = ""
			}
	
			var wsUrl = WS_User + "WS_UC_Misc";
			var param = {
				Field: filter,
				OnProses: filter2,
				Values: value
			}
	
			var pAjax = Global.dynamicParam("DspValueHelp", param)
	
			var loadingValue
	
			sap.ui.getCore().attachInit(function () {
				loadingValue = SAPUI.BusyDialog();
				loadingValue.open()
			});
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: pAjax,
				success: function (result) {
					loadingValue.close()
					var deserilizeResult = Global.dynamicDeserialize(result)
	
					var check = 0;
	
					if (deserilizeResult[0].length > 0) {
						for (var i = 0; i < deserilizeResult[0].length; i++) {
							if (deserilizeResult[0][i].id == inputText) {
								if (comp2 != "") {
									comp2.setText(deserilizeResult[0][i].Desc)
								}
								check++
							}
						}
	
						if (check == 0) {
							loadingValue.close();
							SAPUI.ErrorMessageView("UX014", "")
							comp1.setValue("")
							if (comp2 != "") {
								comp2.setText("")
							}
						} else {
							console.log("ada")
						}
	
					} else {
						comp2.setText("")
						console.log("tidak ada hasil")
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					loadingValue.close()
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
				}
			})
		},
		/*dialog f4
		@comp1 komponen yg akan di set valuenya setelah memilih data
		@comp2 komponen yg akan di setValuenya setelah memilih data
		@pTitleDlg komponen disebelah valuhelpfield yg akan digunakan untuk title dialog valuehelp
		@filter nama filter yg disediakan di SP valuhelp
		@filter2 nama halaman tcode valuehelp
		@value value untuk filter data valuehelp yang akan di pakai 
		@colfield param component untuk mengambil id column valuehelpfield dari table
		@comp3 komponen yg akan di set valuenya setelah memilih data (untuk case yang ada multiple select)
		@comp4 mengambil value kolom 3 dari valuehelp field
		@table untuk mengambil id table untuk bisa diambil modelnya & di insertkan data dari valuhelp ke kolom table (table Utama)
		@idxMain menyimpan nilai index dari row tabel yang di select
		@ColFilterVH kolom table VH yang akan dijadikan filter 
		
		@comp1 komponen yg akan di set valuenya setelah memilih data
		@comp2 komponen yg akan di setValuenya setelah memilih data
		@pTitleDlg komponen disebelah valuhelpfield yg akan digunakan untuk title dialog valuehelp
		@filter nama filter yg disediakan di SP valuhelp
		@filter2 nama halaman tcode valuehelp
		@value value untuk filter data valuehelp yang akan di pakai 
		@colfield param component untuk mengambil id column valuehelpfield dari table
		@comp3 komponen yg akan di set valuenya setelah memilih data (untuk case yang ada multiple select)
		@comp4 mengambil value kolom 3 dari valuehelp field
		@table untuk mengambil id table untuk bisa diambil modelnya & di insertkan data dari valuhelp ke kolom table
		*/
	
		F4FilterKolom: function (pTitleDlg, filter, filter2, value, colField, tableMain, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel) {
			// Deklarasi objek untuk value help dialog
			// 1. Dialog
			var oDialog = SAPUI.Dialog("", "Select", "50%", "auto", true);
			// 2. Textview
			var DspEntries = SAPUI.TextView("", "", "", "100%", true)
			DspEntries.setDesign(sap.ui.commons.TextViewDesign.Bold)
			// 3. Table
			var oTable = SAPUI.Table("", "auto", 10, "Single", "Scroll")
			// 4. Busy Dialog
			var loading = SAPUI.BusyDialog();
			// 5. Button
			var btnCancel = SAPUI.Button("", "Close", "", "", false, "Emph")
	
			// Pengaturan event untuk setiap objek
			// 1. Table
			oTable.attachRowSelectionChange(function (oEvent) {
				var idx = this.getSelectedIndex()
				if (this.isIndexSelected(idx)) {
					cxt = this.getContextByIndex(idx)
					path = cxt.sPath
					//console.log(pKeyBindKolom.length)
					obj = this.getModel().getProperty(path)
					//					var Model=oEvent.getSource().getBindingContext().getPath().split("/")[1]
					//					kurang disini
					//modelnya belum
	
					data = tableMain.getModel().getData()[idxModel]
					//console.log(data.length)
					var selectedItem = obj[Object.keys(obj)[0]]
					for (j = 0; j < pKeyBindKolom.length; j++) {
						for (i = 0; i < data.length; i++) {
							if (i == idxSelectedRow) {
								data[i][arrKolom[j]] = obj[pKeyBindKolom[j]]
							}
						}
					}
					tableMain.getModel().refresh()
					oDialog.close();
				}
				if (colField != "") {
					var colContent = SAPUI.GetCore(colField)
					colContent.setValue(selectedItem);
					colContent.setValueState(sap.ui.core.ValueState.None)
				}
			})
			// 2. Button
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
	
			// Function tambahan
			// 1. Cek if value == array
			function isArray(arr) {
				return arr instanceof Array;
			}
			// 2. Cek parameter array
			function CekParamArray(value) {
				var pValueSP
				//console.log(isArray(value))
				if (isArray(value)) {
					var joined
					if (value.length > 0) {
						joined = value.join("_")
						pValueSP = joined
					} else {
						pValueSP = value
					}
				} else {
					pValueSP = value
				}
				return pValueSP
			}
	
			// Susun template value help dialog sementara
			// 1. Atur footer untuk table dalam dialog
			oTable.setFooter(DspEntries)
			// 2. Tambahkan button di dialog
			oDialog.addButton(btnCancel)
	
			// Eksekusi ambil data value help dan ditampilkan dalam dialog
			var finalValFilter
	
			if (value == undefined) {
				finalValFilter = ""
			} else {
				finalValFilter = CekParamArray(value)
			}
	
			if (tableMain == undefined) {
				tableMain = ""
			}
	
			var wsUrl = WS_SY + "WS_UC";
			var param = {
				Code: filter,
			}
	
			var pAjax = Global.dynamicParam("DisplayValueHelp", param)
	
			loading.open()
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: pAjax,
				success: function (result) {
					var oModel = new sap.ui.model.json.JSONModel([]);
					var deserilizeResult = Global.dynamicDeserialize(result)
	
					if (deserilizeResult.length) {
						tableContent = deserilizeResult[0]
						ResultLength = tableContent.length
						index = 0
						counter = 0;
	
						if (ResultLength > 0) {
							var tempResultObj = tableContent;
							tableContent.forEach(function (item) {
								if (index == 0) {
									for (var key in item) {
										var colTemplate = SAPUI.Column(key, "TextView", key, "auto", "Left", "Left");
										oTable.addColumn(colTemplate);
									}
									index++
								}
							})
	
							oTable.setModel(oModel);
	
							oModel.setData({
								WS_SP_DspValueHelpResult: tableContent
							});
							oTable.bindRows("/WS_SP_DspValueHelpResult");
							var strDspEntries = "" + ResultLength
							if (ResultLength > 1) {
								strDspEntries = strDspEntries + " Entries Found"
							} else {
								strDspEntries = strDspEntries + " Entry Found"
							}
							strTitleDialog = "Select " + pTitleDlg
							oDialog.setTitle(strTitleDialog)
							DspEntries.setText(strDspEntries)
	
							oDialog.addContent(oTable)
	
							oDialog.open();
							oModel.refresh();
	
						} else {
							oTable.setModel(oModel);
							oDialog.addContent(oTable);
							oDialog.open();
							oModel.refresh();
						}
					}
					loading.close()
				},
				error: function (jqXHR, textStatus, errorThrown) {
					loading.close()
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
				}
			})
	
			promiseApi({
				url: wsUrl,
				body: param,
				method: 'DisplayValueHelp'
			}).then(res => {
				var oModel = new sap.ui.model.json.JSONModel([]);
				var deserilizeResult = Global.dynamicDeserialize(result)
	
				if (deserilizeResult.length) {
					tableContent = deserilizeResult[0]
					ResultLength = tableContent.length
					index = 0
					counter = 0;
	
					if (ResultLength > 0) {
						var tempResultObj = tableContent;
						tableContent.forEach(function (item) {
							if (index == 0) {
								for (var key in item) {
									var colTemplate = SAPUI.Column(key, "TextView", key, "auto", "Left", "Left");
									oTable.addColumn(colTemplate);
								}
								index++
							}
						})
	
						oTable.setModel(oModel);
	
						oModel.setData({
							WS_SP_DspValueHelpResult: tableContent
						});
						oTable.bindRows("/WS_SP_DspValueHelpResult");
						var strDspEntries = "" + ResultLength
						if (ResultLength > 1) {
							strDspEntries = strDspEntries + " Entries Found"
						} else {
							strDspEntries = strDspEntries + " Entry Found"
						}
						strTitleDialog = "Select " + pTitleDlg
						oDialog.setTitle(strTitleDialog)
						DspEntries.setText(strDspEntries)
	
						oDialog.addContent(oTable)
	
						oDialog.open();
						oModel.refresh();
	
					} else {
						oTable.setModel(oModel);
						oDialog.addContent(oTable);
						oDialog.open();
						oModel.refresh();
					}
				}
				loading.close()
			})
		},
		F4FilterGetTextRowTbl: function (comp1, comp2, inputText, filter, filter2, value, colField, comp3, comp4, pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel) {
			// Deklarasi objek untuk value help dialog
			// 1. Dialog
			var oDialog = SAPUI.Dialog("", "Select", "50%", "auto", true);
			// 2. Textview
			var DspEntries = SAPUI.TextView("", "", "", "100%", true)
			DspEntries.setDesign(sap.ui.commons.TextViewDesign.Bold)
			// 3. Table
	
			// 4. Busy Dialog
			var loading = SAPUI.BusyDialog();
			// 5. Button
			var btnCancel = SAPUI.Button("", "Close", "", "sap-icon://sys-cancel", false, "Reject")
	
			// Pengaturan event untuk setiap objek
			// 1. Button
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
	
			// Eksekusi cek inputan terhadap value help
			if (comp3 == undefined) {
				comp3 = ""
			}
	
			if (comp4 == undefined) {
				comp4 = ""
			}
	
			if (value == undefined) {
				value = ""
			}
	
			var wsUrl = WS_SY + "WS_UC";
			var param = {
				Code: filter,
			}
	
			var pAjax = Global.dynamicParam("DisplayValueHelp", param)
	
			loading.open()
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: pAjax,
				success: function (result) {
					loading.close()
					var deserilizeResult = Global.dynamicDeserialize(result)
	
					var check = 0;
	
					var dataTable = pTable.getModel().getData()[idxModel]
	
					if (deserilizeResult[0].length > 0) {
						for (var i = 0; i < deserilizeResult[0].length; i++) {
							var obj = deserilizeResult[0][i]
							var dataKey = obj[Object.keys(obj)[0]]
	
							if (dataKey == inputText.getValue()) {
								check++
								break
							}
						}
	
						if (check == 0) {
							if (comp1.getValue() != '') {
								/* SAPUI.MessageDialog({
									Type: "E",
									Message: "Data entered is not valid",
									Diagnosis: "Data not found",
									Procedure: "1) Please re-check your data &br2) Please choose one of provided data from the list"
								}) */
								comp1.setValueState(sap.ui.core.ValueState.Error)
								comp1.setValueStateText("Fill this correctly");
								SAPUI.ErrorMessageView("E00023", "");
							}
							comp1.setValue("")
							for (j = 0; j < pKeyBindKolom.length; j++) {
								for (i = 0; i < dataTable.length; i++) {
									if (i == idxSelectedRow) {
										dataTable[i][arrKolom[j]] = ""
									}
								}
							}
						} else {
							for (j = 0; j < pKeyBindKolom.length; j++) {
								for (i = 0; i < dataTable.length; i++) {
									if (i == idxSelectedRow) {
										dataTable[i][arrKolom[j]] = obj[pKeyBindKolom[j]]
										comp1.setValueState(sap.ui.core.ValueState.None)
									}
								}
							}
						}
						pTable.getModel().refresh()
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					loadingValue.close()
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
				}
			})
		},
		F4FilterGetText: function (pInput, pFilter) {
			var valueInput = pInput.getValue()
			var wsUrl = WS_SY + "WS_UC";
			var param = {
				Code: pFilter,
			}
	
			var res = promiseApi({
				url: wsUrl,
				body: param,
				method: 'DisplayValueHelp'
			})
			// .then(res => {
			// 	console.log(res) 
	
			var stopProcess = false
			for (let i = 0; i < res[0].length; i++) {
				console.log(res[0].length)
				if (!stopProcess) {
					if (res[0][i].Tcode != valueInput) {
						stopProcess = true
						pInput.setValue(null)
						pInput.setValueState(sap.ui.core.ValueState.Error)
						pInput.setValueStateText("Fill this correctly");
						SAPUI.ErrorMessageView("E00023", "");
						break
					} else {
						pInput.setValueState(sap.ui.core.ValueState.None)
					}
				}
			}
			// })
	
			console.log(valueInput)
		},
		//clear value inside valuehelp kolom
		ClearF4: function (oEvent, pColumn, pTable, pColOtherBinding) {
	
			var Model = oEvent.getSource().getBindingContext().getPath().split("/")[1]
			var idx = oEvent.getSource().getBindingContext().getPath().split("/")[2]
			var dataModel = pTable.getModel()
			var dataTabel = dataModel.getData()[Model]
	
			var values1 = Object.values(dataTabel)
	
	
			for (i = 0; i < dataTabel.length; i++) {
				if (i == idx) {
					for (j = 0; j < pColOtherBinding.length; j++) {
						values1[i][pColOtherBinding[j]] = ""
					}
	
				}
	
			}
	
			dataModel.refresh()
	
		},
		//dialog f4 useractive
		F4FilterUserActive: function (comp1, comp2, filter, filter2) {
			var oDialog = SAPUI.Dialog("", "Select", "500px", "auto", true);
			var oTable = SAPUI.Table("", "100%", 10, "Single", "Paginator")
			var colId = SAPUI.Column(filter, "TextView", "id", "100%", "Left");
			var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Left");
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph")
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")
	
			oTable.addColumn(colId)
			oTable.addColumn(colDesc)
			oDialog.addContent(oTable)
			oDialog.addButton(btnOK)
			oDialog.addButton(btnCancel)
	
			var oModel = new sap.ui.model.json.JSONModel([]);
	
			oTable.setModel(oModel);
			oTable.bindRows("/F4_03Result");
			var wsUrl = urlWebservice + "F4_03";
			var param = '{"filter": "' + filter + '", "filter2":"' + filter2 + '"}'
			oDialog.open();
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					oModel.setData(result);
					oModel.refresh();
				}
			});
	
			oModel.refresh();
	
			oTable.attachRowSelectionChange(function (oEvent) {
				var idx = this.getSelectedIndex()
	
				if (this.isIndexSelected(idx)) {
					var cxt = this.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = this.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.id);
							comp1.fireChange();
						} else {
							comp1.setText(obj.id);
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
							comp2.fireChange();
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndex()
	
				if (oTable.isIndexSelected(idx)) {
					var cxt = oTable.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.id);
						} else {
							comp1.setText(obj.id);
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		F4FilterToBindColumn: function (comp1, comp2, pTitleDlg, filter, filter2, value, colField, comp3, comp4, table) {
	
			if (comp3 == undefined) {
				comp3 = ""
			}
	
			if (comp4 == undefined) {
				comp4 = ""
			}
	
			if (value == undefined) {
				value = ""
			}
	
			if (table == undefined) {
				table = ""
			}
	
			var wsUrl = WS_User + "WS_UC_Misc";
			var param = {
				Field: filter,
				OnProses: filter2,
				Values: value
			}
	
			var pAjax = Global.dynamicParam("DspValueHelp", param)
	
	
			var oDialog = SAPUI.Dialog("", "Select", "auto", "auto", true);
			var oTable = SAPUI.Table("", "auto", 10, "Single", "Scroll")
	
			var DspEntries = SAPUI.TextView("", "", "", "100%", true)
			DspEntries.setDesign(sap.ui.commons.TextViewDesign.Bold)
			var strDspEntries
			oTable.setFooter(DspEntries)
	
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph")
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")
			var oModel = new sap.ui.model.json.JSONModel([]);
			oTable.setBusy(true)
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: pAjax,
				success: function (result) {
					var deserilizeResult = Global.dynamicDeserialize(result)
					var tableContent = deserilizeResult[0]
					var ResultLength = tableContent.length
	
	
					var index = 0;
					var counter = 0;
	
					if (ResultLength > 0) {
	
						var tempResultObj = tableContent;
						tableContent.forEach(function (item) {
							if (index == 0) {
								for (var key in item) {
									var colTemplate = SAPUI.Column(key, "TextView", key, "auto", "Left", "Left");
									oTable.addColumn(colTemplate);
								}
								index++
							}
	
	
						})
	
						oTable.setModel(oModel);
	
						oModel.setData({
							WS_SP_DspValueHelpResult: tableContent
						});
						oTable.bindRows("/WS_SP_DspValueHelpResult");
						strDspEntries = ResultLength + " Entries Found"
						strTitleDialog = "Select " + pTitleDlg + " (" + ResultLength + ") Entries Found"
						oDialog.setTitle(strTitleDialog)
						DspEntries.setText(strDspEntries)
	
						oDialog.addContent(oTable)
	
						oDialog.open();
						oModel.refresh();
	
					} else {
						oTable.setModel(oModel);
						oDialog.addContent(oTable);
						oDialog.open();
						oModel.refresh();
					}
					oTable.setBusy(false)
				},
				error: function (jqXHR, textStatus, errorThrown) {
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
				}
			})
	
	
			oTable.attachRowSelectionChange(function (oEvent) {
				var idx = this.getSelectedIndex()
	
				if (this.isIndexSelected(idx)) {
					var cxt = this.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = this.getModel().getProperty(path);
	
					console.log(table)
	
	
					var selectedItem = obj[Object.keys(obj)[0]]
					var selectedItem2 = obj[Object.keys(obj)[1]]
					var selectedItem3 = obj[Object.keys(obj)[2]]
	
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(selectedItem);
						} else {
							comp1.setText(selectedItem);
						}
	
					}
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(selectedItem2);
						} else {
							comp2.setText(selectedItem2);
						}
					}
					if (comp4 != "") {
						if (comp4.getMetadata().getName() == "sap.m.Input") {
							comp4.setValue(selectedItem3);
						} else {
							comp4.setText(selectedItem3);
						}
					}
					if (comp3 != "") {
						if (comp3.getMetadata().getName() == "sap.m.Input") {
							var dummy = comp3.getValue()
							var dummyArr = dummy.split(",")
							var dummyRes = ''
	
							for (var i = 0; i < dummyArr.length; i++) {
								if (i == 0 && i == (dummyArr.length - 1)) {
									dummyRes = selectedItem
								} else if (i == 0) {
									dummyRes = selectedItem + ","
								} else if (i == (dummyArr.length - 1)) {
									dummyRes = dummyRes + dummyArr[i]
								} else {
									dummyRes = dummyRes + dummyArr[i] + ","
								}
							}
	
							comp3.setValue(dummyRes);
						} else {
							var dummy = comp3.getText()
							var dummyArr = dummy.split(",")
							var dummyRes = ''
	
							for (var i = 0; i < dummyArr.length; i++) {
								if (i == 0 && i == (dummyArr.length - 1)) {
									dummyRes = selectedItem
								} else if (i == 0) {
									dummyRes = selectedItem + ","
								} else if (i == (dummyArr.length - 1)) {
									dummyRes = dummyRes + dummyArr[i]
								} else {
									dummyRes = dummyRes + dummyArr[i] + ","
								}
							}
	
							comp3.setText(dummyRes);
						}
					}
	
					if (colField != "") {
						var colContent = SAPUI.GetCore(colField)
						colContent.setValue(selectedItem);
					}
	
					oDialog.close();
				}
			})
	
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndex()
	
				if (oTable.isIndexSelected(idx)) {
					var cxt = oTable.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.Id);
						} else {
							comp1.setText(obj.Id);
						}
	
					}
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.Desc1);
						} else {
							comp2.setText(obj.Desc1);
						}
					}
					if (comp3 != "") {
						if (comp3.getMetadata().getName() == "sap.m.Input") {
							var dummy = comp3.getValue()
							var dummyArr = dummy.split(",")
							var dummyRes = ''
	
							for (var i = 0; i < dummyArr.length; i++) {
								if (i == 0 && i == (dummyArr.length - 1)) {
									dummyRes = selectedItem
								} else if (i == 0) {
									dummyRes = selectedItem + ","
								} else if (i == (dummyArr.length - 1)) {
									dummyRes = dummyRes + dummyArr[i]
								} else {
									dummyRes = dummyRes + dummyArr[i] + ","
								}
							}
	
							comp3.setValue(dummyRes);
						} else {
							var dummy = comp3.getText()
							var dummyArr = dummy.split(",")
							var dummyRes = ''
	
							for (var i = 0; i < dummyArr.length; i++) {
								if (i == 0 && i == (dummyArr.length - 1)) {
									dummyRes = selectedItem
								} else if (i == 0) {
									dummyRes = selectedItem + ","
								} else if (i == (dummyArr.length - 1)) {
									dummyRes = dummyRes + dummyArr[i]
								} else {
									dummyRes = dummyRes + dummyArr[i] + ","
								}
							}
	
							comp3.setText(dummyRes);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		F4Filter2: function (comp1, comp2, filter, filter2) {
			var oDialog = SAPUI.Dialog("", "Select", "500px", "auto", true);
			var oTable = SAPUI.Table("", "100%", 10, "Single", "Paginator");
			var colId = SAPUI.Column(filter, "TextView", "id", "100%", "Left");
			var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Left");
			var colDesc1 = SAPUI.Column("Description", "TextView", "desc1", "100%", "Left");
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph");
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject");
	
			oTable.addColumn(colId)
			oTable.addColumn(colDesc1)
			oDialog.addContent(oTable)
			oDialog.addButton(btnOK)
			oDialog.addButton(btnCancel)
	
			var oModel = new sap.ui.model.json.JSONModel([]);
	
			oTable.setModel(oModel);
			oTable.bindRows("/F4_04Result");
			var wsUrl = urlWebservice + "F4_04";
			var param = '{"filter": "' + filter + '", "filter2":"' + filter2 + '"}'
			oDialog.open();
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					oModel.setData(result);
					oModel.refresh();
				}
			});
	
			oModel.refresh();
			oTable.attachRowSelectionChange(function (oEvent) {
				var idx = this.getSelectedIndex()
	
				if (this.isIndexSelected(idx)) {
					var cxt = this.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = this.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.id);
						} else {
							comp1.setText(obj.id);
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndex()
	
				if (oTable.isIndexSelected(idx)) {
					var cxt = oTable.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.id);
						} else {
							comp1.setText(obj.id);
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		F4FilterWithKey: function (comp1, comp2, pTitleDlg, filter, filter2, value, colField, comp3, comp4, table) {
			return new Promise((resolve, reject) => {
				// Deklarasi objek untuk value help dialog
				// 1. Dialog
				var oDialog = SAPUI.Dialog("", "Select", "50%", "auto", true);
				// 2. Textview
				var DspEntries = SAPUI.TextView("", "", "", "100%", true)
				DspEntries.setDesign(sap.ui.commons.TextViewDesign.Bold)
				// 3. Table
				var oTable = SAPUI.Table("", "auto", 10, "Single", "Scroll")
				// 4. Busy Dialog
				var loading = SAPUI.BusyDialog();
				// 5. Button
				var btnCancel = SAPUI.Button("", "Cancel", "", "", false, "Emph")
	
				var retValue = ''
				// Pengaturan event untuk setiap objek
				// 1. Table
				oTable.attachRowSelectionChange(function (oEvent) {
					var idx = this.getSelectedIndex()
	
					if (this.isIndexSelected(idx)) {
						var cxt = this.getContextByIndex(idx);
						var path = cxt.sPath;
						var obj = this.getModel().getProperty(path);
	
						var selectedItem = obj[Object.keys(obj)[0]]
						var selectedItem2 = obj[Object.keys(obj)[1]]
						var selectedItem3 = obj[Object.keys(obj)[2]]
						//					var arr=Object.keys(obj)
						//					var getDatatabel=table.getModel().getData().modelData
						//					console.log(getDatatabel)
						//					var indexof=arr.indexOf("Material") //diganti variable
						//					var tesValues=Object.values(obj)[indexof]
						//					var object2
						//					var object1=[]
						//					console.log(idx)
						//					for(i=0;i<getDatatabel.length;i++){
						// 
						//						object1.push(Object.assign({Material2:tesValues},getDatatabel[i]))
						//						
						//					}
						//					
						//					console.log(object1)
						//					
						//					console.log(getDatatabel)
	
	
	
						//					kurang ambil kolom valuehelp ke kolom table 
						//					jika ada keterangan dari yg di select comp2.setValue(selecteditem2)
	
						//					var data=table.getModel().getData()
	
						if (comp1 != "") {
							if (comp1.getMetadata().getName() == "sap.m.Input") {
								comp1.setValue(selectedItem);
								comp1.fireChange()
								comp1.setValueState(sap.ui.core.ValueState.None)
							} else {
								comp1.setText(selectedItem);
							}
						}
						if (comp2 != "") {
							comp2.setTooltip(selectedItem)
							if (comp2.getMetadata().getName() == "sap.m.Input") {
								comp2.setValue(selectedItem2);
								comp2.setValueState(sap.ui.core.ValueState.None)
							} else {
								comp2.setText(selectedItem2);
							}
						}
						if (comp3 != "") {
							if (comp3.getMetadata().getName() == "sap.m.Input") {
								var dummy = comp3.getValue()
								var dummyArr = dummy.split(",")
								var dummyRes = ''
	
								for (var i = 0; i < dummyArr.length; i++) {
									if (i == 0 && i == (dummyArr.length - 1)) {
										dummyRes = selectedItem
									} else if (i == 0) {
										dummyRes = selectedItem + ","
									} else if (i == (dummyArr.length - 1)) {
										dummyRes = dummyRes + dummyArr[i]
									} else {
										dummyRes = dummyRes + dummyArr[i] + ","
									}
								}
								comp3.setValue(dummyRes);
								comp3.setValueState(sap.ui.core.ValueState.None)
							} else {
								var dummy = comp3.getText()
								var dummyArr = dummy.split(",")
								var dummyRes = ''
	
								for (var i = 0; i < dummyArr.length; i++) {
									if (i == 0 && i == (dummyArr.length - 1)) {
										dummyRes = selectedItem
									} else if (i == 0) {
										dummyRes = selectedItem + ","
									} else if (i == (dummyArr.length - 1)) {
										dummyRes = dummyRes + dummyArr[i]
									} else {
										dummyRes = dummyRes + dummyArr[i] + ","
									}
								}
								comp3.setText(dummyRes);
							}
						}
						if (comp4 != "") {
							if (comp4.getMetadata().getName() == "sap.m.Input") {
								comp4.setValue(selectedItem3);
								comp4.setValueState(sap.ui.core.ValueState.None)
							} else {
								comp4.setText(selectedItem3);
							}
						}
						if (colField) {
							var colContent = SAPUI.GetCore(colField)
							colContent.setValue(selectedItem);
							colContent.setValueState(sap.ui.core.ValueState.None)
						}
						resolve({
							selectedItem,
							selectedItem2,
							selectedItem3
						})
						oDialog.close();
					}
				})
				// 2. Button
				btnCancel.attachPress(function (oEvent) {
					oDialog.close();
				})
	
				// Susun template value help dialog sementara
				// 1. Atur Header
				strTitleDialog = "Select " + pTitleDlg
				oDialog.setTitle(strTitleDialog)
				// 2. Atur footer untuk table dalam dialog
				oTable.setFooter(DspEntries)
				// 3. Tambahkan button di dialog
				oDialog.addButton(btnCancel)
	
				// Eksekusi ambil data value help dan ditampilkan dalam dialog
				if (comp3 == undefined) {
					comp3 = ""
				}
	
				if (comp4 == undefined) {
					comp4 = ""
				}
	
				if (value == undefined) {
					value = ""
				}
	
				if (table == undefined) {
					table = ""
				}
	
				var wsUrl = WS_SY + "WS_UC";
				var param = {
					Code: filter,
				}
	
				var pAjax = Global.dynamicParam("DisplayValueHelp", param)
	
				loading.open()
	
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: pAjax,
					success: function (result) {
						var oModel = new sap.ui.model.json.JSONModel([]);
						var deserilizeResult = Global.dynamicDeserialize(result)
	
						if (deserilizeResult.length) {
							tableContent = deserilizeResult[0]
							ResultLength = tableContent.length
							index = 0
							counter = 0;
	
							if (ResultLength > 0) {
								var tempResultObj = tableContent;
								tableContent.forEach(function (item) {
									if (index == 0) {
										for (var key in item) {
											var colTemplate = SAPUI.Column(key, "TextView", key, "auto", "Left", "Left");
											oTable.addColumn(colTemplate);
										}
										index++
									}
								})
	
								oTable.setModel(oModel);
	
								oModel.setData({
									WS_SP_DspValueHelpResult: tableContent
								});
								oTable.bindRows("/WS_SP_DspValueHelpResult");
								var strDspEntries = "" + ResultLength
								if (ResultLength > 1) {
									strDspEntries = strDspEntries + " Entries Found"
								} else {
									strDspEntries = strDspEntries + " Entry Found"
								}
								DspEntries.setText(strDspEntries)
	
								oDialog.addContent(oTable)
	
								oDialog.open();
								oModel.refresh();
	
							} else {
								oTable.setModel(oModel);
								oDialog.addContent(oTable);
								oDialog.open();
								oModel.refresh();
							}
						}
						loading.close()
					},
					error: function (jqXHR, textStatus, errorThrown) {
						loading.close()
						SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
					}
				})
			})
		},
		F4FilterMaterialMix: function (comp1, comp2, filter, filter2, del1, del2) {
			var oDialog = SAPUI.Dialog("", "Select", "500px", "auto", true);
			var oTable = SAPUI.Table("", "100%", 10, "Single", "Paginator");
			var colId = SAPUI.Column(filter, "TextView", "id", "100%", "Left");
			var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Left");
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph");
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject");
	
			oTable.addColumn(colId)
			oTable.addColumn(colDesc)
			oDialog.addContent(oTable)
			oDialog.addButton(btnOK)
			oDialog.addButton(btnCancel)
	
			var oModel = new sap.ui.model.json.JSONModel([]);
	
			oTable.setModel(oModel);
			oTable.bindRows("/F4_03Result");
			var wsUrl = urlWebservice + "F4_03";
			var param = '{"filter": "' + filter + '", "filter2":"' + filter2 + '"}';
			oDialog.open();
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					oModel.setData(result);
					oModel.refresh();
				}
			});
			oModel.refresh();
	
			oTable.attachRowSelectionChange(function (oEvent) {
				var idx = this.getSelectedIndex()
	
				if (this.isIndexSelected(idx)) {
					var cxt = this.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = this.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.id);
							del1.setValue("")
							del2.setValue("")
						} else {
							comp1.setText(obj.id);
							del1.setText("")
							del2.setText("")
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndex()
	
				if (oTable.isIndexSelected(idx)) {
					var cxt = oTable.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(obj.id);
							del1.setValue("")
							del2.setValue("")
						} else {
							comp1.setText(obj.id);
							del1.setValue("")
							del2.setValue("")
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					oDialog.close();
				}
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		F4FilterMulti: function (comp1, comp2, filter, filter2) {
			var oDialog = SAPUI.Dialog("", "Select", "400px", "auto", true);
			var oTable = SAPUI.Table("", "100%", 10, "MultiToggle", "Paginator");
			var colId = SAPUI.Column(filter, "TextView", "id", "100%", "Left");
			var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Left");
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph");
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject");
	
			oTable.addColumn(colId)
			oTable.addColumn(colDesc)
			oDialog.addContent(oTable)
			oDialog.addButton(btnOK)
			oDialog.addButton(btnCancel)
	
			var oModel = new sap.ui.model.json.JSONModel([]);
	
			oTable.setModel(oModel);
			oTable.bindRows("/F4_03Result");
			var wsUrl = urlWebservice + "F4_03";
			var param = '{"filter": "' + filter + '", "filter2":"' + filter2 + '"}';
			oDialog.open();
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					oModel.setData(result);
					oModel.refresh();
	
				}
			});
	
			oModel.refresh();
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndices().length;
				var tempContext = oTable.getSelectedIndices()
				var valueHelp = "";
	
				for (i = 0; i < idx; i++) {
	
					var cxt = oTable.getContextByIndex(tempContext[i]);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
	
					valueHelp += "," + obj.id
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(valueHelp);
						} else {
							comp1.setText(valueHelp);
						}
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					console.log(valueHelp)
					console.log(obj.desc)
				}
	
				valueHelp = valueHelp.substr(1);
				console.log(valueHelp)
				oDialog.close();
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		//undefined admin JR
		F4FilterMultiStatus: function (comp1, comp2, filter, filter2, lbl, tbl, tglAwal, tglAkhir) {
			var oDialog = SAPUI.Dialog("", "Select", "400px", "auto", true);
			var oTable = SAPUI.Table("", "100%", 10, "MultiToggle", "Paginator");
			var colId = SAPUI.Column(filter, "TextView", "id", "100%", "Left");
			var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Left");
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph");
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject");
	
			oTable.addColumn(colId)
			oTable.addColumn(colDesc)
			oDialog.addContent(oTable)
			oDialog.addButton(btnOK)
			oDialog.addButton(btnCancel)
	
			var oModel = new sap.ui.model.json.JSONModel([]);
	
			oTable.setModel(oModel);
			oTable.bindRows("/F4_03Result");
			var wsUrl = urlWebservice + "F4_03";
			var param = '{"filter": "' + filter + '", "filter2":"' + filter2 + '"}';
			oDialog.open();
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					oModel.setData(result);
					oModel.refresh();
				}
			});
	
			oModel.refresh();
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndices().length;
				var tempContext = oTable.getSelectedIndices()
				var valueHelp = "";
	
				for (i = 0; i < idx; i++) {
	
					var cxt = oTable.getContextByIndex(tempContext[i]);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
	
					valueHelp += "," + obj.id
	
					if (comp1 != "") {
						if (comp1.getMetadata().getName() == "sap.m.Input") {
							comp1.setValue(valueHelp);
						} else {
							comp1.setText(valueHelp);
						}
	
					}
	
					if (comp2 != "") {
						if (comp2.getMetadata().getName() == "sap.m.Input") {
							comp2.setValue(obj.desc);
						} else {
							comp2.setText(obj.desc);
						}
					}
	
					console.log(valueHelp)
					console.log(obj.desc)
				}
	
				valueHelp = valueHelp.substr(1);
				console.log(valueHelp)
				oDialog.close();
	
				//var lblStatusID = SAPUI.GetCore(this.createId("lblStatusID"))
				var oModel = new sap.ui.model.json.JSONModel([]);
				//var tblDashboard = SAPUI.GetCore(this.createId("tblDashboard"))
	
				var valueHelp = lbl.getText()
	
				if (valueHelp.charAt(0) == ',') {
					valueHelp = valueHelp.substr(1);
				}
	
				var dateStr = tglAwal.getValue();
				var dateEnd = tglAkhir.getValue();
	
				var wsUrl = urlWebservice + "AdminDashboard";
				var param = '{"Status1": "' + valueHelp + '","NIK":"' + U5312UX5 + '","StartDate":"' + dateStr + '","EndDate":"' + dateEnd + '"}'
	
				tbl.setModel(oModel);
				tbl.bindRows("/AdminDashboardResult");
	
				myTimer();
	
				var myVar = setInterval(myTimer, 30000);
	
				function myTimer() {
	
					$.ajax({
						url: wsUrl,
						type: "POST",
						dataType: 'json',
						data: param,
						success: function (result) {
							oModel.setData(result);
							oModel.refresh();
							console.log(result)
						}
					});
				}
	
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		//		//ambil data menu dinamis
		//jgn diganti
		getDataMenuDynamic: function (pTcode, pIdMenuBar, pClass) {
			var map = new Object(); // or var map = {};         
			if (window.localStorage.getItem("Menu-" + pTcode) == null) {
				var oModel = new sap.ui.model.json.JSONModel();
				var wsUrl = urlWebservice + "GetMenu/" + pTcode;
				$.ajax({
					type: "GET",
					url: wsUrl,
					contentType: "text/plain, charset=utf-8",
					dataType: "json",
					crossDomain: true,
					success: function (result) {
						map[pTcode] = result.GetMenuResult[0];
						//window.localStorage.getItem("language");
						window.localStorage.setItem("Menu-" + pTcode, JSON.stringify(map));
						Global.MenuDynamic(result.GetMenuResult[0], pClass);
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log('Error');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
			} else {
				var getData = window.localStorage.getItem("Menu-" + pTcode);
				var tmpData = JSON.parse(getData);
				var data = tmpData[pTcode];
				Global.MenuDynamic(data, pClass);
			}
		},
		//		//komponen menu dinamis
		//jgn diganti
		MenuDynamic: function (pData, pClass) {
			var menuBar = sap.ui.getCore().byId("id_menubar");
			menuBar.destroyItems();
			var data = pData;
	
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
	
			for (i = 0; i < data.DataMN_LVL1.length; i++) {
				menuBar.addItem(new sap.ui.unified.MenuItem("menuItemLevel1" + i, {
					text: data.DataMN_LVL1[i].textLvl1
				}))
				if (data.DataMN_LVL1[i].DataMN_LVL2.length != 0 && data.DataMN_LVL1[i].DataMN_LVL2[0].textLvl2 != "") {
					sap.ui.getCore().byId("menuItemLevel1" + i).setSubmenu(new sap.ui.commons.Menu("menuLevel2" + i, {}));
					var a = 0;
					var aa = 0;
					var bb = 0;
					var cc = 0;
					var dd = 0;
					var bTmp = data.DataMN_LVL1[0].DataMN_LVL2[0].DataMN_LVL3[0].textLvl3;
					var cTmp = data.DataMN_LVL1[0].DataMN_LVL2[0].DataMN_LVL3[0].DataMN_LVL4[0].textLvl4;
					var dTmp = data.DataMN_LVL1[0].DataMN_LVL2[0].DataMN_LVL3[0].DataMN_LVL4[0].DataMN_LVL5[0].textLvl5;
					for (j = 0; j < data.DataMN_LVL1[i].DataMN_LVL2.length; j++) {
						if ((j == 0) || (data.DataMN_LVL1[i].DataMN_LVL2[j].textLvl2 != data.DataMN_LVL1[i].DataMN_LVL2[(j - 1)].textLvl2)) {
							sap.ui.getCore().byId("menuLevel2" + i).addItem(new sap.ui.unified.MenuItem("menuItemLevel2" + i + a, {
								text: data.DataMN_LVL1[i].DataMN_LVL2[j].textLvl2,
								enabled: data.DataMN_LVL1[i].DataMN_LVL2[j].enableLv2,
								visible: data.DataMN_LVL1[i].DataMN_LVL2[j].visibleLv2,
								tooltip: data.DataMN_LVL1[i].DataMN_LVL2[j].linkLvl2
							}).attachSelect(function (oEvent) {
								pClass[oEvent.getParameter("item").getTooltip()]()
							}))
							if (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3.length != 0 && data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[0].textLvl3 != "") {
								sap.ui.getCore().byId("menuItemLevel2" + i + a).setSubmenu(new sap.ui.commons.Menu("menuLevel3" + i + aa, {}));
								aa++;
							}
							a++;
						}
						for (k = 0; k < data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3.length; k++) {
							if (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].textLvl3 != "") {
								if ((j == 0) || (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].textLvl3 != bTmp)) {
									sap.ui.getCore().byId("menuLevel3" + i + (aa - 1)).addItem(new sap.ui.unified.MenuItem("menuItemLevel3" + i + (aa - 1) + bb, {
										text: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].textLvl3,
										enabled: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].enableLv3,
										visible: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].visibleLv3,
										tooltip: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].linkLvl3
									}).attachSelect(function (oEvent) {
										pClass[oEvent.getParameter("item").getTooltip()]()
									}))
									if (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4.length != 0 && data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[0].textLvl4) {
										sap.ui.getCore().byId("menuItemLevel3" + i + (aa - 1) + bb).setSubmenu(new sap.ui.commons.Menu("menuLevel4" + i + (aa - 1) + bb, {}));
									}
									bTmp = data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].textLvl3;
									bb++;
								}
							}
							for (l = 0; l < data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4.length; l++) {
								if (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].textLvl4 != "") {
									if ((j == 0) || (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].textLvl4 != cTmp)) {
										sap.ui.getCore().byId("menuLevel4" + i + (aa - 1) + (bb - 1)).addItem(new sap.ui.unified.MenuItem("menuItemLevel4" + i + (aa - 1) + (bb - 1) + cc, {
											text: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].textLvl4,
											enabled: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].enableLv4,
											visible: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].visibleLv4,
											tooltip: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].linkLvl4
										}).attachSelect(function (oEvent) {
											pClass[oEvent.getParameter("item").getTooltip()]()
										}))
										if (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5.length != 0 && data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[0].textLvl5) {
											sap.ui.getCore().byId("menuItemLevel4" + i + (aa - 1) + (bb - 1) + cc).setSubmenu(new sap.ui.commons.Menu("menuLevel5" + i + (aa - 1) + (bb - 1) + cc, {}));
										}
										cTmp = data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].textLvl4;
										cc++;
									}
								}
								for (m = 0; m < data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5.length; m++) {
									if (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].textLvl5 != "") {
										if ((j == 0) || (data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].textLvl5 != dTmp)) {
											sap.ui.getCore().byId("menuLevel5" + i + (aa - 1) + (bb - 1) + (cc - 1)).addItem(new sap.ui.unified.MenuItem("menuItemLevel5" + i + (aa - 1) + (bb - 1) + (cc - 1) + dd, {
												text: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].textLvl5,
												enabled: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].enableLv5,
												visible: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].visibleLv5,
												tooltip: data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].linkLvl5
											}).attachSelect(function (oEvent) {
												pClass[oEvent.getParameter("item").getTooltip()]()
											}))
											dTmp = data.DataMN_LVL1[i].DataMN_LVL2[j].DataMN_LVL3[k].DataMN_LVL4[l].DataMN_LVL5[m].textLvl5;
											dd++;
										}
									}
								}
							}
						}
					}
				}
			}
		},
		//fungsi dialogF4 untuk multiselect
		DialogF4: function (pUserName, pKey, pFieldName, pIDValueHelpField) {
			var oDialog = SAPUI.Dialog("", "Select " + pFieldName, "400px", "auto", true);
			var oTable = SAPUI.Table("", "100%", 10, "Single", "Paginator")
			var colKey = SAPUI.Column(pFieldName, "TextView", "key", "100%", "Right");
			var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Right");
			var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Accept")
			var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")
	
			oTable.addColumn(colKey)
			oTable.addColumn(colDesc)
			oDialog.addContent(oTable)
			oDialog.addButton(btnOK)
			oDialog.addButton(btnCancel)
	
			var oModel = new sap.ui.model.json.JSONModel([]);
	
			//var oModel = new sap.ui.model.json.JSONModel([]);
			//sap.ui.getCore().setModel(oModel, "globalModel");  
	
			oTable.setModel(oModel);
			oTable.bindRows("/GetAUTH_F4Result");
			var wsUrl = urlWebservice + "GetAUTH_F4";
			var param = '{"userName": "' + pUserName + '", "fieldName": "' + pKey + '"}'
			oDialog.open();
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					oModel.setData(result);
					oModel.refresh();
	
				}
			});
	
			oModel.refresh();
			btnOK.attachPress(function (oEvent) {
				var idx = oTable.getSelectedIndex()
	
				if (oTable.isIndexSelected(idx)) {
					var cxt = oTable.getContextByIndex(idx);
					var path = cxt.sPath;
					var obj = oTable.getModel().getProperty(path);
					var vhf = SAPUI.GetCore(pIDValueHelpField)
	
					SAPUI.ValueState(pIDValueHelpField, "N")
					vhf.setValue(obj.key);
					vhf.fireChange();
					oDialog.close();
				}
			})
	
			btnCancel.attachPress(function (oEvent) {
				oDialog.close();
			})
		},
		//fungsi dialog untuk multiselect
		DialogMultiSelect: function (model, pUserName, pKey, pFieldName) {
			var oDialogMS = SAPUI.Dialog("", "Select Plant", "400px", "auto", true);
			var oTableMS = SAPUI.Table("", "100%", 10, "Single", "Paginator")
			var colKeyMS = SAPUI.Column("Value", "TextView", "value", "100%", "Right");
			var btnOKMS = SAPUI.Button("", "", "OK", "sap-icon://accept", false, "")
			var btnAddMS = SAPUI.Button("", "", "Add", "sap-icon://sys-add", false, "")
			var btnRemoveMS = SAPUI.Button("", "", "Remove", "sap-icon://sys-minus", false, "")
			var btnRemoveAllMS = SAPUI.Button("", "", "Remove All", "sap-icon://delete", false, "")
			var btnUpfile = SAPUI.FileUploader("", "sap-icon://upload", true, true)
			var btnPaste = SAPUI.Button("", "", "Paste", "sap-icon://notes", false, "")
			var btnCancelMS = SAPUI.Button("", "", "Cancel", "sap-icon://sys-cancel", false, "")
	
			oTableMS.addColumn(colKeyMS)
			oDialogMS.addContent(oTableMS)
			oDialogMS.addButton(btnOKMS)
			oDialogMS.addButton(btnAddMS)
			oDialogMS.addButton(btnRemoveMS)
			oDialogMS.addButton(btnRemoveAllMS)
			oDialogMS.addButton(btnUpfile)
			//oDialogMS.addButton(btnPaste)
			oDialogMS.addButton(btnCancelMS)
			//-----------------------------------------------------------------------------------------
			var oDialogF4 = SAPUI.Dialog("", "Select " + pFieldName, "400px", "auto", true);
			var oTableF4 = SAPUI.Table("", "100%", 10, "Single", "Paginator")
			var colKeyF4 = SAPUI.Column(pFieldName, "TextView", "key", "100%", "Right");
			var colDescF4 = SAPUI.Column("Description", "TextView", "desc", "100%", "Right");
			var btnOKF4 = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "")
			var btnCancelF4 = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "")
	
			oTableF4.addColumn(colKeyF4)
			oTableF4.addColumn(colDescF4)
			oDialogF4.addContent(oTableF4)
			oDialogF4.addButton(btnOKF4)
			oDialogF4.addButton(btnCancelF4)
			//-----------------------------------------------------------------------------------------
			var oModel = sap.ui.getCore().getModel(model);
			var oModelMS = new sap.ui.model.json.JSONModel();;
			var oModelF4 = new sap.ui.model.json.JSONModel();
			var oDataModel = oModel.getData();
	
			console.log(oDataModel)
			console.log(oDataModel.length)
	
			var aDataCopy = JSON.parse(JSON.stringify(oDataModel));
			console.log(aDataCopy)
			//oModelMS.loadData(aDataCopy);
			//oModel.loadData("JSON/menuJS.json");
	
			oModelMS.setData(aDataCopy)
	
			oTableMS.setModel(oModelMS);
			oTableMS.bindRows("/");
	
			oTableF4.setModel(oModelF4);
			oTableF4.bindRows("/GetAUTH_F4Result");
	
			oDialogMS.open()
	
			btnOKF4.attachPress(function (oEvent) {
				var oData, oData2, rowCount, oCell, rows;
	
				oData = oModelMS.getData();
				oData2 = oModelF4.getData();
				rowCount = oData2.length;
				rows = oTableF4.getRows();
				var idx = oTableF4.getSelectedIndex()
				oCell = rows[idx].getCells()[0].getText();
				oData.push({
					value: oCell
				});
				oModelMS.refresh();
				oDialogF4.close();
			})
	
			btnCancelF4.attachPress(function (oEvent) {
				oDialogF4.close();
			})
	
			btnOKMS.attachPress(function (oEvent) {
				oDialogMS.close();
				var data = oModelMS.getData()
				oModel.setData(data);
	
			})
	
			btnAddMS.attachPress(function (oEvent) {
				var wsUrl = urlWebservice + "GetAUTH_F4";
				var param = '{"userName": "' + pUserName + '", "fieldName": "' + pKey + '"}'
	
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: param,
					success: function (result) {
						oModelF4.setData(result);
						oModelF4.refresh();
						oDialogF4.open()
					}
				});
	
			})
	
			btnRemoveMS.attachPress(function (oEvent) {
				var oData, idx;
	
				oData = oModelMS.getData();
				idx = oTableMS.getSelectedIndex()
				//now remove it from the model
				oData.splice(idx, 1);
				oModelMS.refresh();
			})
	
			btnRemoveAllMS.attachPress(function (oEvent) {
				var oData = oModelMS.getData();
				oData.splice(0, oData.length);
				oModelMS.refresh();
			});
	
			btnUpfile.attachChange(function (e) {
				var file = e.getParameter("files") && e.getParameter("files")[0];
				if (file) {
					var reader = new FileReader();
					var that = this;
					reader.onload = function (evn) {
						var strCSV = evn.target.result
	
						var lines = strCSV.split("\n");
	
						var oData = oModelMS.getData();
	
						for (var i = 0; i < lines.length; i++) {
							oData.push({
								value: lines[i]
							});
						}
	
						oModelMS.refresh();
					};
					reader.readAsText(file);
				}
			});
	
			btnCancelMS.attachPress(function (oEvent) {
				oDialogMS.close();
			})
		},
		//fungsi f4 multi select single value kolom
		PressMultiSelect: function (model, pfield, pIDValueHelpField) {
	
			var oModel = sap.ui.getCore().getModel(model);
			var oDataModel = oModel.getData();
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + pfield + "", "400px", "auto", true);
			var table = SAPUI.Table("", "100%", 11, "Single", "Scrollbar", false);
			var col = SAPUI.Column("Single Value", "TextField", "dBind", "100%", "Begin", "Begin", "")
			table.addColumn(col)
			var btnAccept = SAPUI.Button("", "", "", "sap-icon://accept", false, "Accept");
			var btnAddRow = SAPUI.Button("", "", "", "sap-icon://sys-add", false, "Accept")
			var btnDelete = SAPUI.Button("", "", "", "sap-icon://delete", false, "Accept")
			oDialog.addContent(table)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDelete)
			oDialog.addButton(btnAccept)
	
			var dBind;
			var Data = [];
			var countRows = table.getVisibleRowCount()
	
			if (oDataModel == "") {
				for (x = 1; x <= countRows; x++) {
					var items = {};
					items.dBind = "";
					Data.push(items);
				}
	
				oModel.setData(Data)
				table.setModel(oModel)
				table.bindRows("/")
			} else {
				table.setModel(oModel)
				table.bindRows("/")
			}
	
			oDialog.open();
	
			btnAddRow.attachPress(function (oEvent) {
					var addtable = table
					var Data = oModel.getData()
					var counter = Data.length
					var items = {};
					items.dBind = ""
					Data.push(items)
					oModel.refresh();
				}),
	
				btnAccept.attachPress(function (oEvent) {
					var tableAccept = table;
					var pTemp = [];
					var Data = oModel.getData()
					var counter = Data.length
					var dialog = oDialog
	
					for (i = 0; i < counter; i++) {
						var cxt = tableAccept.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tableAccept.getModel().getProperty(path);
						var bindData = obj.dBind
						if (bindData.trim() != '')
							pTemp.push(bindData.trim().replace("*", "%"));
					}
					dialog.close()
					var vhf = SAPUI.GetCore(pIDValueHelpField);
	
					if (pTemp[0] != undefined) {
						vhf.setValue(pTemp[0].replace("%", "*"))
						vhf.setName(pTemp)
					} else {
						vhf.setValue("")
						vhf.setName("")
					}
				}),
	
				btnDelete.attachPress(function (oEvent) {
					var oData = oModel.getData();
					var counter = oData.length
	
					oData.splice(0, oData.length);
					for (x = 1; x <= counter; x++) {
						var items = {};
						items.dBind = "";
						oData.push(items);
					}
	
					oModel.refresh();
					oModel.refresh();
					var vhf = SAPUI.GetCore(pIDValueHelpField);
					vhf.setValue("")
					vhf.setName("")
				});
		},
		//fungsi F4 untuk multi select
		PressMultiSelectF4: function (model, pfield, pIDValueHelpField, pFilter) {
	
			//Component Valuehelpfield
			var tempSloc = SAPUI.ValueHelpField("", "", "", "", "350px")
			tempSloc.setValue("2813")
	
	
			var oModel = sap.ui.getCore().getModel(model);
			var oDataModel = oModel.getData();
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + pfield + "", "400px", "auto", true);
			var table = SAPUI.Table("", "100%", 11, "Single", "Scrollbar", false);
			table.addColumn(SAPUI.Column("", "ValueHelpField", "pBind", "100%", "Begin", "Begin", "", 50, pFilter, tempSloc))
			var btnAccept = SAPUI.Button("", "", "", "sap-icon://accept", false, "Accept");
			var btnAddRow = SAPUI.Button("", "", "", "sap-icon://sys-add", false, "Accept")
			var btnDelete = SAPUI.Button("", "", "", "sap-icon://delete", false, "Accept")
			oDialog.addContent(table)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDelete)
			oDialog.addButton(btnAccept)
	
			var dBind;
			var Data = [];
			var countRows = table.getVisibleRowCount()
	
			if (oDataModel == "") {
				for (x = 1; x <= countRows; x++) {
					var items = {};
					items.dBind = "";
					Data.push(items);
				}
				oModel.setData(Data)
				table.setModel(oModel)
				table.bindRows("/")
			} else {
				table.setModel(oModel)
				table.bindRows("/")
			}
	
			oDialog.open();
	
			btnAddRow.attachPress(function (oEvent) {
					var addtable = table
					var Data = oModel.getData()
					var counter = Data.length
					var items = {};
					items.dBind = ""
					Data.push(items)
					oModel.refresh();
				}),
	
				btnAccept.attachPress(function (oEvent) {
					var tableAccept = table;
					var pTemp = [];
					var Data = oModel.getData()
					var counter = Data.length
					var dialog = oDialog
	
	
					for (i = 0; i < counter; i++) {
						var cxt = tableAccept.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tableAccept.getModel().getProperty(path);
						if (obj.pBind != undefined) {
							if (obj.pBind.trim() != '')
								pTemp.push(obj.pBind.trim().replace("*", "%"));
						}
					}
					dialog.close()
					var vhf = SAPUI.GetCore(pIDValueHelpField);
					if (pTemp[0] != undefined) {
						vhf.setValue(pTemp[0].replace("%", "*"))
						vhf.setName(pTemp)
					} else {
						vhf.setValue("")
						vhf.setName("")
					}
				}),
	
				btnDelete.attachPress(function (oEvent) {
					var oData = oModel.getData();
					var counter = oData.length
	
					oData.splice(0, oData.length);
					for (x = 1; x <= 10; x++) {
						var items = {};
						items.dBind = "";
						oData.push(items);
					}
					oModel.refresh();
					oModel.refresh();
					var vhf = SAPUI.GetCore(pIDValueHelpField);
					vhf.setValue("")
					vhf.setName("")
				});
		},
		//fungsi get time client
		GetTime: function () {
	
			var now = new Date();
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();
	
	
			if (hour.toString().length == 1) {
				var hour = '0' + hour;
			}
			if (minute.toString().length == 1) {
				var minute = '0' + minute;
			}
			if (second.toString().length == 1) {
				var second = '0' + second;
			}
	
			return hour + ':' + minute + ':' + second;
		},
		//done
		GetDateTimeServer: function (param) {
	
	
			var wsUrl = WS_User + "WS_UC_Misc";
			var paramDate = {
				param: param
			}
			var pAjax = Global.dynamicParam("DspDateTime", paramDate)
	
			var result1 = ""
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: pAjax,
				async: false,
				success: function (result) {
					var resultData = Global.dynamicDeserialize(result)
					result1 = resultData[0].Time
				},
	
			})
			return result1
	
	
		},
		GetDate: function (param = "") {
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			// var hour    = now.getHours();
			// var minute  = now.getMinutes();
			// var second  = now.getSeconds(); 
	
			if (month.toString().length == 1) {
				var month = '0' + month;
			}
			if (day.toString().length == 1) {
				var day = '0' + day;
			}
	
			// if(hour.toString().length == 1) {
			//     var hour = '0'+hour;
			// }
			// if(minute.toString().length == 1) {
			//     var minute = '0'+minute;
			// }
			// if(second.toString().length == 1) {
			//     var second = '0'+second;
			// }   
			// var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second; 
	
			switch (param) {
				case "year":
					return year;
				case "month":
					return month;
				case "day":
					return day;
				default:
					return year + '-' + month + '-' + day;
			}
		},
		//fungsi cek inputan numerik
		Numeric: function (comp) {
			var myInteger = (/^-?\d*(\.\d+)?$/);
			var tfValue = comp.getValue();
			if (!tfValue.match(myInteger)) {
				//comp.setValue("");
	
				SAPUI.ErrorMessageView("E0094", "");
	
				comp.setValueState(sap.ui.core.ValueState.Error)
				return false;
			} else {
				//				SAPUI.ErrorMessageView("","");
				comp.setValueState(sap.ui.core.ValueState.None)
				return true;
			}
		},
		//function check inputan numeric and comma only
		NumericOnlyWithComma: function (pComp) {
			var myInteger = (/^[0-9,.]*$/)
			var tfValue = pComp.getValue()
			var isValid = /^[0-9,.]*$/.test(pComp.getValue().trim())
	
			if (!isValid) {
	
				SAPUI.ErrorMessageView("P0002", "");
	
				pComp.setValueState(sap.ui.core.ValueState.Error)
				return false;
			} else {
				pComp.setValueState(sap.ui.core.ValueState.None)
				return true
			}
	
		},
		//undefined
		Uppercase: function (comp) {
			var usrval = comp.getValue().toUpperCase();
			//alert(usrval)
			comp.setValue(usrval)
		},
		//undefined
		Empty: function (comp) {
			//var myInteger = (/^-?\d*(\.\d+)?$/);
			var tfValue = comp.getValue();
			if (tfValue == "") {
				//comp.setValue("");
				SAPUI.MessageBox("Fill in Material", "Isi Material", "WARNING", "")
	
				comp.setValueState(sap.ui.core.ValueState.Error)
			} else {
				comp.setValueState(sap.ui.core.ValueState.None)
			}
		},
		//cancel order transaksi adminJR 
		//		jgn diganti
		CancelAdmin: function (pNumberrange) {
	
			SAPUI.MessageBoxConfirm("Apakah Anda Yakin Akan Melakukan Cancel", "Message", fnCallbackConfirm)
	
			function fnCallbackConfirm(cbResult) {
				if (cbResult == true) {
					var wsUrl = urlWebservice + "CANCEL";
					var url = urlWebservice + "AUTOUNLOCK";
					var param = "{'NumberRange':'" + pNumberrange + "','User':'" + U5312UX5 + "'}"
	
					$.ajax({
						url: wsUrl,
						type: "POST",
						dataType: 'json',
						data: param,
						success: function (result) {
							console.log(result)
							if (result.CANCELResult == "1") {
								$.ajax({
									url: url,
									type: 'post',
									dataType: 'json',
									data: "{'NumberRange':'" + pNumberrange + "','User':'" + U5312UX5 + "'}",
									success: function (result) {
										console.log(result)
										sap.m.URLHelper.redirect("AdminDashboard.html")
									}
								});
							} else {
								SAPUI.MessageBox("Eror Cancel", "Gagal Batal", "ERROR", "")
							}
						}
					});
				}
	
			}
		},
		//logtime transaksi AdminJR
		LogTime: function (pNumberrange) {
	
			var wsUrl = urlWebservice + "LOGTIME";
	
			var param = "{'NumberRange':'" + pNumberrange + "','Tcode':'" + X_VarianUX5 + "','StartDate':'" + startedDate + "'}"
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: param,
				success: function (result) {
					console.log(result)
					if (result.LOGTIMEResult == "1") {
	
					} else {
						SAPUI.MessageBox("Error insert log time", "Gagal insert log time", "ERROR", "")
					}
				}
			});
		},
		//pending order AdminJR
		PendingAdmin: function (pNumberrange) {
	
			SAPUI.MessageBoxConfirm("Apakah Anda Yakin Akan Melakukan Pending", "Message", fnCallbackConfirm)
	
			function fnCallbackConfirm(cbResult) {
				if (cbResult == true) {
					var wsUrl = urlWebservice + "PENDING";
					var url = urlWebservice + "AUTOUNLOCK";
					var param = "{'NumberRange':'" + pNumberrange + "','User':'" + U5312UX5 + "'}"
	
					$.ajax({
						url: wsUrl,
						type: "POST",
						dataType: 'json',
						data: param,
						success: function (result) {
							console.log(result)
							if (result.PENDINGResult == "1") {
								$.ajax({
									url: url,
									type: 'post',
									dataType: 'json',
									data: "{'NumberRange':'" + pNumberrange + "','User':'" + U5312UX5 + "'}",
									success: function (result) {
										console.log(result)
										sap.m.URLHelper.redirect("AdminDashboard.html")
									}
								});
							} else {
								SAPUI.MessageBox("Error Pending", "Gagal Pending", "ERROR", "")
							}
						}
					});
				}
			}
		},
		//undefined adminJR
		getQueryVariable: function (variable) {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == variable) {
					return pair[1];
				}
			}
		},
		//undefined adminJR
		uniqueCharacter: function (pData) {
			if (pData.trim() != '') {
				pData.split(',').filter(function (item, i, allItems) {
					return i == allItems.indexOf(item);
				}).join(',');
			} else return '';
		},
		//format tanggal harus _._.___  jika salah akan ambil tanggal skrg
		cekDatePicker: function (pID, oEvent) {
			console.log(pID)
			var oModelDate1 = new sap.ui.model.json.JSONModel();
			oModelDate1.setData({
				dateValue: new Date()
			});
			var datePicker = pID
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd.MM.yyyy"
			});
			var date = new Date();
			var dateStr = dateFormat.format(date);
			var oElement = oEvent.getParameter("element");
	
			sap.ui.getCore().setModel(oModelDate1, pID + "oModelDate1");
	
			var value1 = {
				path: pID + "oModelDate1>/dateValue",
				type: new sap.ui.model.type.Date({
					pattern: "dd.MM.yyyy",
					strictParsing: true
				}),
	
			}
	
			if (oEvent.getParameter("valid") == false) {
	
				// SAPUI.MessageBox("Your entry in field Date Picker is not a valid entry", "Masukan di field Tanggal tidak valid", "ERROR", "")
	
				SAPUI.ErrorMessageView("Q0002", "");
				oEvent.oSource.setValueStateText("Format Tanggal Salah")
	
				datePicker.setValue(dateStr)
	
			} else {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
			}
		},
		//cek inputan date hanya boleh tanggal bulan ini dan bulan kemarin
		cekDatePicker2: function (pID) {
			//			var tanggal = SAPUI.GetCore(pID)
			pID.attachValidationError(
				function (oEvent) {
					var oElement = oEvent.getParameter("element");
					oElement.setValueState("Error");
					// SAPUI.MessageBox("Posting only possible in this Month and Last Month in company code 9999", "Posting hanya diperbolehkan bulan ini dan bulan kemarin di kode perusahaan 9999", "ERROR", "")
	
					SAPUI.ErrorMessageView("158", "");
					// tanggal.setValue(tanggal.getValue)
				}
			);
			pID.attachValidationSuccess(
				function (oEvent) {
					var oElement = oEvent.getParameter("element");
					oElement.setValueState("Success");
				}
			);
		},
		//untuk cek inputan format datepicker jika salah tidak ambil tanggal sekarang
		cekDatePicker3: function (pID) {
			//this createId disini gk bisa karena dia gk mendeteksi id view karena global variable bukan view
			//			var datePicker = SAPUI.GetCore(pID)
			// var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
			// 	pattern: "dd.MM.yyyy"
			// });
			// var date = new Date();
			// var dateStr = dateFormat.format(date);
			// var regExMatchFormat = /^\d{2}.\d{2}.\d{4}$/;
			// var regExMatchFormat = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./.]([0]?[1-9]|[1][0-2])[./.]([0-9]{4}|[0-9]{2})$/
			// var regExMatchFormat = /^(\d{1,2})([\-\/])(\d{1,2})\2(\d{4}|\d{2})$/
			var regExMatchFormat = /^(\d{1,4})([\-\/])(\d{1,2})\2(\d{4}|\d{2})$/
	
			if (!pID.getValue().match(regExMatchFormat)) {
				// pID.setValueState("Error")
				pID.setValueState(sap.ui.core.ValueState.Error)
				SAPUI.MessageBoxError("Check your date format!")
				pID.setValue("2020-01-01")
				return false;
			} else if (!pID._bValid) {
				pID.setValueState(sap.ui.core.ValueState.Error)
				SAPUI.MessageBoxError("Check your date format!")
				pID.setValue("2020-01-01")
				return false;
			} else {
				pID.setValueState(sap.ui.core.ValueState.None);
				return true;
			}
		},
		//cek jika datepicker3 tidak terpenuhi
		cekDatePicker4: function (pID) {
			var tanggal = pID
			tanggal.attachValidationError(
				function (oEvent) {
					var oElement = oEvent.getParameter("element");
	
					oElement.setValueState("Error");
					// SAPUI.MessageBox("Posting only possible in this Month and Last Month in company code 9999", "Posting hanya diperbolehkan bulan ini dan bulan kemarin di kode perusahaan 9999", "ERROR", "")
	
					SAPUI.ErrorMessageView("P0102", "")
					// tanggal.setValue(tanggal.getValue)
				}
			);
			tanggal.attachValidationSuccess(
				function (oEvent) {
					var oElement = oEvent.getParameter("element");
					oElement.setValueState("Success");
				}
			);
		},
		//check period to lower than from [sudah tercover isParameterToValid]
		cekDatePicker5: function (pIDFrom, pIDTo, oEvent) {
	
			var datePicker1 = SAPUI.GetCore(pIDFrom).getValue()
			var datePicker2 = SAPUI.GetCore(pIDTo).getValue()
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd.MM.yyyy"
			});
	
			var toSplitDP1 = datePicker1.split('.')
			var toSplitDP2 = datePicker2.split('.')
	
			var date1 = new Date(toSplitDP1[2], toSplitDP1[1] - 1, toSplitDP1[0])
			var date2 = new Date(toSplitDP2[2], toSplitDP2[1] - 1, toSplitDP2[0])
	
			if (date2 < date1) {
	
				SAPUI.ErrorMessageView("P0003", "");
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error)
				return false;
			} else {
				//				SAPUI.ErrorMessageView("","");
				oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
				return true;
			}
		},
		cekDatePicker6: function (pValue) {
			var regExMatchFormat = /^(\d{1,2})([\-\/])(\d{1,2})\2(\d{4}|\d{2})$/
	
			if (!pValue.trim().match(regExMatchFormat)) {
				SAPUI.ErrorMessageView("E0005", "")
				return false;
			} else {
				return true;
			}
		},
		cekDate1Month: function (pID) {
			console.log("check date 1month")
			var datePicker1 = pID.getValue()
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd.MM.yyyy"
			});
	
			var toSplitDP1 = datePicker1.split('.')
	
			var date1 = new Date(toSplitDP1[2], toSplitDP1[1] - 1, toSplitDP1[0])
			var getMonth = new Date().getMonth()
			var getYear = new Date().getFullYear()
			var monthDP = toSplitDP1[1]
			var yearDP = toSplitDP1[2]
	
			var monthNow = getMonth + 1
			console.log(monthNow)
			console.log(getYear < toSplitDP1[2])
	
			console.log(toSplitDP1[1])
			console.log(toSplitDP1[1] - 1 < monthNow)
			if (toSplitDP1[1] < monthNow && yearDP < getYear) {
				console.log("masuk")
	
				SAPUI.ErrorMessageView("158", "");
				pID.setValueState("Error")
				return false;
			} else {
				//				 SAPUI.ErrorMessageView("","");
				pID.setValueState("Success")
				return true;
			}
		},
		//menyimpan cookie user
		SetCookie: function (pName, pValue, pDays) {
			//var valueCookie = pValue.getValue()          
			var d = new Date();
			d.setTime(d.getTime() + (pDays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = pName + "=" + pValue + ";" + expires + ";path=/";
		},
		//fungsi mengambil cookie yang tersimpan
		GetCookie: function (pName) {
			var name = pName + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		//fungsi delete cookies
		DelCookie: function (pName) {
			var d = new Date();
			d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = pName + "=" + "" + ";" + expires + ";path=/";
		},
		//fungsi autocomplete search tcode
		AutoCompleteList: function (comp1, filter, filter2) {
	
			var autoComplete = comp1
			var oModel = new sap.ui.model.json.JSONModel();
	
			var SearchTcode = window.localStorage.getItem("autoTcode")
	
			if (SearchTcode == 'kosong') {
	
			} else if (SearchTcode != null) {
				oModel.setData(SearchTcode);
				var aDataparse = JSON.parse(SearchTcode)
	
				for (var i = 0; i < aDataparse.length; i++) {
					autoComplete.addItem(new sap.ui.core.ListItem({
						text: aDataparse[i].list,
						additionalText: aDataparse[i].desc
					}));
				}
	
				autoComplete.setModel(oModel);
				autoComplete.setFilterFunction(function (sValue, oItem) {
					return oItem.getText().match(new RegExp(sValue, "i")) || oItem.getAdditionalText().match(new RegExp(sValue, "i"));
	
				});
			} else {
				// console.log("Your username dont have authorization access tcode")
	
			}
	
	
	
		},
		//fungsi check lock transaksi
		//lock transaction dinamis, tinggal custom item sg mau di lock (batch,HU,matdoc,dll)
		CheckLockOPT: function (pWebServiceCheck, pWebServiceInsert, pData, pPageRedirect) {
			//Author: Fahmy Ainun Nazilla\\
			var wsUrlx = urlWebservice + pWebServiceCheck;
	
			$.ajax({
				url: wsUrlx,
				type: 'post',
				dataType: 'json',
				data: pData,
				success: function (result) {
					console.log(result)
					var x = result[pWebServiceCheck + "Result"];
	
					if (x == U5312UX5) {
						var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
						//oRouter.navTo("JR026_02");
						oRouter.navTo(pPageRedirect);
					} else if (x == "0") {
	
						var wsUrly = urlWebservice + pWebServiceInsert;
	
						$.ajax({
							url: wsUrly,
							type: 'post',
							dataType: 'json',
							data: pData,
							success: function (result) {
								console.log(result)
								var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
	
								oRouter.navTo(pPageRedirect);
							},
							error: function (jqXHR, textStatus, errorThrown) {
								console.log('Error');
								console.log(jqXHR);
								console.log(textStatus);
								console.log(errorThrown);
							}
						});
	
					} else {
						// var pMsgBox = SAPUI.MessageBox("Order is active", "Order sedang aktif", "WARNING", "")
	
						SAPUI.ErrorMessageView("159", "");
						// pMsgBox;
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('Error');
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		},
		//fungsi delete lock transaksi
		DeleteLockOPT: function (pWebService, pData) {
			//Author: Fahmy Ainun Nazilla\\
			var wsUrly = urlWebservice + pWebService;
			$.ajax({
				url: wsUrly,
				type: 'post',
				dataType: 'json',
				data: pData,
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
		//fungsi count down timer
		CountDown: function (pSeconds, pLabel, pPageRedirect) {
			//Author: Fahmy Ainun Nazilla\\
			var s = pSeconds;
			var myVar = setInterval(function () {
				timer()
			}, 1000);
	
			function timer() {
				s = s - 1;
				var h = Math.floor(s / (60 * 60));
				var sisa = Math.floor(s - (h * 60 * 60));
				var m = Math.floor(sisa / 60);
				var sisa = Math.floor(sisa - (m * 60));
				h = checkTime(h);
				m = checkTime(m);
				sisa = checkTime(sisa);
	
				pLabel.setText(h + "jam   " + m + "menit   " + sisa + "detik   ");
	
				if (sisa < 1) {
					clearInterval(myVar);
					sap.m.URLHelper.redirect(pPageRedirect);
				}
			}
	
			function checkTime(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			}
		},
		//upload file txt & insert data ke table 
		UploadTXT: function (pFileUpload, pHeader, pTable, pTableType, pWebService) {
			//Author: Fahmy Ainun Nazilla\\
			var oFileUploader = sap.ui.getCore().byId(pFileUpload);
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			console.log(file);
	
			if (file && window.FileReader) {
				var reader = new FileReader();
				var that = this;
				reader.readAsText(file);
				reader.onload = function (evn) {
					//get contain of textfile
					var strTxt = evn.target.result
					//call method TXT2JSON and convert strTXT to JSON
					var param = TXT2JSON(strTxt);
					var json = JSON.stringify(param);
					var str = json.replace(/},/g, "},\r\n");
	
					console.log(str);
	
					function TXT2JSON(txt) {
						var header = pHeader;
						var array = TXTToArray(txt);
						var objArray = [];
						//with header in txt
						// for (var i = 1; i < array.length - 1; i++) {
						// objArray[i - 1] = {};
						// for (var k = 0; k < array[0].length && k < array[i].length; k++)
						// {
						// var key = header[k];
						// objArray[i - 1][key] = array[i][k] 
						// }
						// }
	
						//without header in txt
						for (var i = 0; i < array.length - 1; i++) {
							objArray[i] = {};
							for (var k = 0; k < array[0].length && k < array[i].length; k++) {
								var key = header[k];
								objArray[i][key] = array[i][k]
							}
							//objArray[i - 1]["table"] = pTable
							//objArray[i - 1]["tableType"] = pTableType
						}
						return objArray;
					}
	
					function TXTToArray(strData, strDelimiter) {
						strDelimiter = (strDelimiter || "\t");
						var objPattern = new RegExp((
							"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
							"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
							"([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
						var arrData = [
							[]
						];
						var arrMatches = null;
						while (arrMatches = objPattern.exec(strData)) {
							var strMatchedDelimiter = arrMatches[1];
							if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
								arrData.push([]);
							}
							if (arrMatches[2]) {
								var strMatchedValue = arrMatches[2].replace(
									new RegExp("\"\"", "g"), "\"");
							} else {
								var strMatchedValue = arrMatches[3];
							}
							arrData[arrData.length - 1].push(strMatchedValue);
						}
						return (arrData);
					}
	
					$.ajax({
						url: urlWebservice + pWebService,
						type: 'post',
						dataType: 'json',
						data: str,
						success: function (data) {
							var result = data[pWebService + "Result"];
							var msgHeader = [];
	
							if (result == "0") {
	
								SAPUI.ErrorMessageView("160", "");
							} else if (result == "1") {
	
								SAPUI.ErrorMessageView("161", "");
							} else if (result == "2") {
	
								SAPUI.ErrorMessageView("163", "");
							} else if (result == "3") {
	
								SAPUI.ErrorMessageView("164", "");
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
			}
		},
		//fungsi tombol back
		UniversalBack: function () {
	
			var halaman = "" + location.href.split("/").slice(-1)
	
			console.log("halaman: " + halaman)
	
			var dashboard = halaman.includes("html");
	
			if (dashboard == true) {
				// Global.DeleteSession();
				if (halaman == "DETAILSTATUS.html") {
					window.history.back()
					window.sessionStorage.removeItem("paramOrder")
				} else {
					sap.m.URLHelper.redirect("Dashboard.html");
				}
	
			} else {
				if (halaman == "ZPA33_02") {
					sap.m.URLHelper.redirect("ZPA33.html");
				} else {
					window.history.back()
					window.sessionStorage.removeItem("paramOrder")
				}
	
			}
	
			//untuk beberapa fungsi di halaman tertentu :
			// if (halaman == "halamanmu contoh:"ZPP041_02""){
			// jalankan fungsinya
			// }
		},
		Back: function () {
			window.history.back()
		},
		//fungsi tombol save
		TombolSave: function () {
	
			// var halaman = ""+location.href.split("/").slice(-1)
	
			// console.log("halaman: "+halaman)
	
			// var dashboard = halaman.includes("html");
	
			// if (dashboard == true){
			//     Global.DeleteSession();
			//     sap.m.URLHelper.redirect("Dashboard.html");
			// } else{
			//     window.history.back()
			// }
	
			//untuk beberapa fungsi di halaman tertentu :
			// if (halaman == "halamanmu contoh:"ZPP041_02""){
			// jalankan fungsinya
			// }
		},
		//cek session user yang telah dihapus admin
		CekKickSession: function () {
			var myVar, reDire;
			//set timer untuk memanggil WS get session
			myVar = setInterval(myTimer, 10000);
	
			function openDialog() {
				var oDialog1 = new sap.ui.commons.Dialog({
					title: "Notice...!!!",
					width: "200px",
					height: "150px",
					resizable: true,
					modal: true,
					showCloseButton: false,
				});
				var oText = new sap.ui.commons.TextView({
					text: "Session Telah Di Keluarkan Oleh Administrator Sistem"
				});
				oDialog1.addContent(oText);
	
				oDialog1.open();
			};
	
			function reDirect() {
				var wsUrl = urlWebservice + "GetSession";
				var paramKick = '{"username": "' + U5312UX5 + '","IP": "' + ClientIP + '","server": "PRD","tcode": "' + X_VarianUX5 + '"}'
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: paramKick,
					success: function (result) {
						var status = result.GetSessionResult;
						console.log("StatusKickSession1>> : " + status);
						if (status === "1") {
							// clearInterval(reDire);
						} else {
							sessionStorage.removeItem("tcodeVariantux5");
							window.open('', '_self').close()
						}
					}
				});
			}
	
			//cek status user per detik
			function myTimer() {
				var wsUrl = urlWebservice + "GetSession";
				var paramKick = '{"username": "' + U5312UX5 + '","IP": "' + ClientIP + '","server": "PRD","tcode": "' + X_VarianUX5 + '"}'
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: paramKick,
					success: function (result) {
						var status = result.GetSessionResult;
						console.log("StatusKickSession2>> : " + status);
						if (status === "1") {
	
						} else {
							window.localStorage.setItem("AppStatus", status);
							openDialog();
							clearInterval(myVar);
							reDire = setInterval(reDirect, 10000);
						}
					}
				});
			}
		},
		CopyTable: function (pModelData) {
	
			var oldModelData = pModelData
			var exmodel = new sap.ui.model.json.JSONModel()
	
			var initkeys = Object.keys(oldModelData);
			if (initkeys.length > 1) {
				exmodel.setData({
					kepala: oldModelData
				})
			} else {
				exmodel.setData(oldModelData)
			}
	
			var modelKeys;
			var myObject;
			var pModelData = exmodel.getData()
			var keys = Object.keys(pModelData);
	
			for (var k = 0; k < pModelData[keys].length; k++) {
				myObject = JSON.parse(JSON.stringify(pModelData[keys][k]))
				modelKeys = Object.keys(myObject);
			}
	
			var myArray = [];
	
			Array.prototype.myJoin = function (seperator, start, end) {
				if (!start) start = 0;
				if (!end) end = this.length - 1;
				end++;
				return this.slice(start, end).join(seperator);
			};
	
			var arr = ["a", "b", "c", "d"];
	
			function iter() {
				for (var i = 0; i < pModelData[keys].length; ++i) {
					var json = pModelData[keys][i];
					for (var prop in json) {
						myArray.push(json[prop])
					}
				}
			}
	
			iter()
			// alert(modelKeys)
			for (var i = modelKeys.length; i < modelKeys.length * pModelData[keys].length; i += modelKeys.length - 1) {
				myArray.splice(i - 1, 2, myArray.myJoin("\n", i - 1, i));
			}
	
			console.log(myArray)
			var hhhj = myArray.join("  ")
			var textArea = document.createElement("textarea");
	
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			textArea.style.padding = 0;
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';
			textArea.style.background = 'transparent';
			textArea.value = hhhj;
			document.body.appendChild(textArea);
			textArea.select();
	
			function copyTextToClipboard(ptext) {
				try {
					var successful = document.execCommand('copy');
					var msg = successful ? 'successful' : 'unsuccessful';
					alert('Copying text command was ' + msg);
				} catch (err) {
					alert('Oops, unable to copy');
				}
			}
	
			copyTextToClipboard(textArea);
		},
		//cek user yang telah dikick
		CekKickUser: function () {
			var wsUrl = WS_User + "WS_UC_Authorization";
	
			var myVar, reDire;
	
			myVar = setInterval(myTimer, 5000);
	
			function openDialog() {
				var oDialog1 = new sap.ui.commons.Dialog({
					title: "Notice...!!!",
					width: "200px",
					height: "150px",
					resizable: true,
	
					modal: true,
					showCloseButton: false,
	
				});
				var oText = new sap.ui.commons.TextView({
					text: "User Telah Di Keluarkan Oleh Administrator Sistem "
				});
				oDialog1.addContent(oText);
	
				oDialog1.open();
			};
			//redirect ketika user tidak ada di table useractive
			function reDirect() {
				var objKick = {
					userName: U5312UX5,
					filter: "CekKick",
					Ip: ClientIP
				}
				var pKickUser = Global.dynamicParam("KickUser", objKick)
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: pKickUser,
					success: function (result) {
						var resultData = Global.dynamicDeserialize(result)
	
						//						console.log("StatusKick1>> : "+resultData);    
						//						console.log(ClientIP)
						if (resultData[0].Result == "1") {
							clearInterval(reDire);
	
						} else {
							U5312UX5 = "";
							X_VarianUX5 = "";
							window.localStorage.clear();
							window.sessionStorage.clear();
							sap.m.URLHelper.redirect("index.html");
							Global.GetClientIP();
							window.open('', '_self').close()
						}
					}
				});
			}
	
			//cek status user per 50 detik
			function myTimer() {
				var objKick = {
					userName: U5312UX5,
					filter: "CekKick",
					Ip: ClientIP
				}
				var pKickUser = Global.dynamicParam("KickUser", objKick)
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: pKickUser,
					success: function (result) {
						var resultData = Global.dynamicDeserialize(result)
						//						console.log("StatusKick2>> : "+resultData);    
						if (resultData[0].Result == "1") {
							console.log("ada")
						} else {
							console.log("TIDAK ADAada")
							//							window.localStorage.setItem("AppStatus", status);
							openDialog();
							clearInterval(myVar);
							reDire = setInterval(reDirect, 5000);
	
						}
					}
				});
			}
		},
		//logut user client
		Logout: async function () {
			var today = Global.getNow().today;
			var time = Global.getNow().time;
	
			var ipnhostname = await Global.GetIPHostNameFromWS()
			var hostname = ipnhostname["hostname"]
			var ip = ipnhostname["ip"]
	
			var paramUser = {
				UsernameIn: window.localStorage.getItem("User"),
				IPHostnameIn: ip,
				HostnameIn: hostname,
				PlatformIn: PLATFORM,
				TokenIn: ''
			}
			var reqObj = {
				url: WS_SY + "WS_UC_Auth",
				body: paramUser,
				method: "Logout"
			}
	
			try {
				var data = promiseApi(reqObj)
				onSuccess(data);
			} catch (error) {
				console.log(error)
			}
	
			function onSuccess(result) {
				console.log(result);
	
				// Global.ResetLockingTCode(JSON.parse(window.localStorage.getItem("LockingUser")).User); //Reset Locking Data
				// Global.DeleteLockingUser(); //Delete Locking User		
				window.localStorage.clear();
				window.sessionStorage.clear();
				SAPUI.Route("Login")
			}
		},
		//hapus session yang dibuka user
		DeleteSession: function () {
			var oThis = this;
			var wsUrl = WS_User + "WS_UC_UserActivity";
			var today = this.getNow().today;
			var time = this.getNow().time;
	
			var getHostname = window.location.hostname
			var increment = window.sessionStorage.tab == undefined ? 1 : window.sessionStorage.tab;
			// X_VarianUX5 = X_VarianUX5 === null || X_VarianUX5 === undefined ? 'Dashboard' : X_VarianUX5;
			var tokenIn = U5312UX5 + "-OUT-" + X_VarianUX5 + "-" + today + "-" + time + "-" + increment;
			var timeIn = window.sessionStorage.token_now.split("-")[4];
	
			var paramExec = {
				EnteredOnIn: today,
				EnteredAtIn: time,
				UserIn: U5312UX5,
				IPHostnameIn: ClientIP,
				HostnameIn: getHostname,
				TransactionIn: X_VarianUX5,
				MessageIn: "Keluar Transaction " + X_VarianUX5 + " - " + timeIn,
				TokenIn: tokenIn
			};
	
			var paramDelSession = Global.dynamicParam("DeleteSession", paramExec);
			console.log(paramDelSession)
	
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: paramDelSession,
				success: function (result) {
					var data = result.DeleteSessionResult
					console.log(result)
					window.sessionStorage.token_old = window.sessionStorage.token_now
					// sessionStorage.removeItem("tcodeVariantux5");
					if (toDashboard) {
						oThis.InsLogActivity('Dashboard');
						oThis.onFocusInsSession('Dashboard');
						sap.m.URLHelper.redirect("Dashboard.html");
					}
					if (logout) {
						Global.Logout();
					}
				}
			});
		},
		//ambil client IP
		GetClientIP: function () {
			function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
				//compatibility for firefox and chrome
				var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
				var pc = new myPeerConnection({
						iceServers: []
					}),
					noop = function () {},
					localIPs = {},
					ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
					key;
	
				function iterateIP(ip) {
					if (!localIPs[ip]) onNewIP(ip);
					localIPs[ip] = true;
				}
	
				//create a bogus data channel
				pc.createDataChannel("");
	
				// create offer and set local description
				pc.createOffer().then(function (sdp) {
					sdp.sdp.split('\n').forEach(function (line) {
						if (line.indexOf('candidate') < 0) return;
						line.match(ipRegex).forEach(iterateIP);
					});
	
					pc.setLocalDescription(sdp, noop, noop);
				})
	
				//listen for candidate events
				pc.onicecandidate = function (ice) {
					if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
					ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
				};
			}
	
			// Usage
	
			getUserIP(function (ip) {
				window.localStorage.setItem("ActivityIP", ip);
			});
		},
		GetIPHostNameFromWS: async function () {
			try {
				var ip = window.localStorage.getItem("prvt-ip")
				var hostname = window.localStorage.getItem("prvt-hostname")
	
				if ((!ip) || (!hostname)) {
					var res = await fetchApi({
						url: SERVICE1 + 'GetIP',
						dynamicParam: false
					})
					ip = res["GetIPResult"]
	
					var res2 = await fetchApi({
						url: SERVICE1 + 'GetHostName',
						body: {
							ip
						},
						dynamicParam: false
					})
	
					hostname = res2["GetHostNameResult"]
	
					window.localStorage.setItem("prvt-ip", ip)
					window.localStorage.setItem("prvt-hostname", hostname)
				}
	
				return {
					ip,
					hostname
				}
			} catch (err) {
				var ip = '::1'
				var hostname = 'unknown'
				window.localStorage.setItem("prvt-ip", ip)
				window.localStorage.setItem("prvt-hostname", hostname)
				return {
					ip,
					hostname
				}
			}
		},
		//kirim notif ke user operator
		SMSNotif: function () {
			var lblIdMsg = new sap.ui.commons.Label({
				width: "auto",
				textAlign: "Center"
			})
			var lblFrom = new sap.ui.commons.Label({
				text: "From:",
				width: "auto",
				textAlign: "Center"
			})
	
			var lblFromAdmin = new sap.ui.commons.Label({
				text: "From:",
				width: "auto",
				textAlign: "Center"
			})
			var txtNotif = new sap.ui.commons.TextArea({
				cols: 80,
				rows: 5
			});
			txtNotif.setEditable(false)
			var btnOK = SAPUI.ButtonOK();
	
			var mtrNotif1 = SAPUI.Matrix("", "auto", false, ["auto"], 2)
			mtrNotif1.createRow(lblFrom, lblFromAdmin);
	
			var mtrNotif2 = SAPUI.Matrix("", "100%", false, ["auto"], 2)
			mtrNotif2.createRow(txtNotif);
	
			var dialogShowNotif = SAPUI.Dialog("", "Notification", "475px", "auto", true);
			dialogShowNotif.setShowCloseButton(false)
			dialogShowNotif.addContent(mtrNotif1)
			dialogShowNotif.addContent(mtrNotif2)
			dialogShowNotif.addButton(btnOK)
	
			onShowDialog();
	
			function onShowDialog() {
				myVar = setInterval(myTimer, 60000);
	
				function myTimer() {
					var wsUrl = urlWebservice + "ShowNotif";
					// var dialogShowNotif = SAPUI.GetCore("dialogShowNotif");
	
					$.ajax({
						url: wsUrl,
						type: 'post',
						dataType: 'json',
						data: "{'to':'" + U5312UX5 + "'," +
							"'status':'Delivered'}",
						success: function (result) {
							// console.log(result) 
							// var lblIdMsg = SAPUI.GetCore("lblIdMsg");
							// var lblFromAdmin = SAPUI.GetCore("lblFromAdmin");
							// var txtNotif = SAPUI.GetCore("txtNotif");
							// var lblIdMsg = sap.ui.getCore().byId("lblIdMsg") 
							lblIdMsg.setText(result.ShowNotifResult[0].id)
							lblFromAdmin.setText(result.ShowNotifResult[0].from1)
							txtNotif.setValue(result.ShowNotifResult[0].msg)
	
							dialogShowNotif.open();
							clearInterval(myVar);
	
						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log('Error');
							console.log(jqXHR);
							console.log(textStatus);
							console.log(errorThrown);
						},
					})
				}
			}
			btnOK.attachPress(function (oEvent) {
				// var dialogShowNotif = SAPUI.GetCore("dialogShowNotif");
	
				var loading = SAPUI.BusyDialog();
	
				// var lblFromAdmin = SAPUI.GetCore(this.createId("lblFromAdmin")).getText();
				// var lblIdMsg = SAPUI.GetCore("lblIdMsg").getText();
				var wsUrl = urlWebservice + "UpdateNotif";
				$.ajax({
					url: wsUrl,
					type: 'post',
					dataType: 'json',
					data: "{'id':'" + lblIdMsg.getText() + "'," +
						"'status':'Read'}",
					success: function (result) {
						if (result.UpdateNotifResult == 1) {
							console.log(result)
							loading.close();
						} else {
							loading.close();
							SAPUI.MessageBox("Failed, Check Your Entry", "Gagal, Periksa Inputan", "ERROR", "")
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log('Error');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
	
				dialogShowNotif.close();
				onShowDialog();
			})
		},
		//fngsi untuk keyboard global
		keyboard: function (keyID, keyID2, viewID, fungsiID) {
	
			var asCode1, asCode2;
			asCode1 = "";
			asCode2 = "";
	
			document.onkeydown = function (e) {
				e = e || window.event; //Get event
				if (e.ctrlKey) {
					var c = e.which || e.keyCode; //Get key code
					switch (c) {
						case 83: //Block Ctrl+S
						case 87: //Block Ctrl+W --Not work in Chrome
						case 78: //Block Ctrl+N --Not work in Chrome
							e.preventDefault();
							e.stopPropagation();
							break;
					}
				}
			};
	
			var wsUrlkey = urlWebservice + "KEYBOARD";
			var paramkey = '{"keyID":"' + keyID + '"}';
			var paramkey2 = '{"keyID":"' + keyID2 + '"}';
	
			if (keyID2 == "") {
				$.ajax({
					url: wsUrlkey,
					type: 'post',
					dataType: 'json',
					data: paramkey,
					success: function (data) {
						console.log(data)
	
						asCode1 = data.KeyboardResult[0].asCode
						$(document).keydown(function (evt) {
							if (evt.keyCode == asCode1) {
								evt.preventDefault();
								var oController = SAPUI.GetCore(viewID).getController();
								oController[fungsiID]()
							}
						});
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log('Error');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				})
			} else {
				$.ajax({
					url: wsUrlkey,
					type: 'post',
					dataType: 'json',
					data: paramkey2,
					success: function (result) {
						console.log(result)
	
						asCode2 = result.KEYBOARDResult[0].asCode2
						// alert(asCode2)
						if (keyID == "CTRL" && keyID2 != "") {
							$(document).keydown(function (evt) {
								if (evt.ctrlKey && (evt.keyCode == asCode2)) {
									evt.preventDefault();
									var oController = SAPUI.GetCore(viewID).getController();
									oController[fungsiID]()
								}
							});
						}
	
						///tambah buat alt///
						else if (keyID == "ALT" && keyID2 != "") {
							$(document).keydown(function (evt) {
								if (evt.altKey && (evt.keyCode == asCode2)) {
									evt.preventDefault();
									var oController = SAPUI.GetCore(viewID).getController();
									oController[fungsiID]()
								}
							});
						}
	
						///tambah buat shift///
						else if (keyID == "SHIFT" && keyID2 != "") {
							$(document).keydown(function (evt) {
								if (evt.shiftKey && (evt.keyCode == asCode2)) {
									evt.preventDefault();
									var oController = SAPUI.GetCore(viewID).getController();
									oController[fungsiID]()
								}
							});
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log('Error');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
	
				})
			}
		},
		//redirect dnamis
		Redirect: function (redtype) {
	
			var wsUrlkey = urlWebservice + "Redirect";
			var paramkey = '{"redType":"' + redtype + '"}';
	
			$.ajax({
				url: wsUrlkey,
				type: 'post',
				dataType: 'json',
				data: paramkey,
				success: function (data) {
					console.log(data)
	
					toPage = data.RedirectResult[0].redPage
	
					sap.m.URLHelper.redirect(toPage);
	
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('Error');
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
	
			})
		},
		//fungsi untuk keyboard global
		// KeyboardGlobal: function() {
	
		// 	var wsUrlkey = urlWebservice+ "GlobalKeyboard";
		// 	var paramHelp = '{"funct":"Help"}';
		// 	var paramBack = '{"funct":"Back"}';
		// 	var paramCancel = '{"funct":"Cancel"}';
		// 	var paramSave = '{"funct":"Save"}';
	
		// 	//----------Help
		// 	$.ajax({
		// 		url: wsUrlkey,
		// 		type: 'post',
		// 		dataType: 'json',
		// 		data: paramHelp,
		// 		success: function (data) { 
	
		// 			var asCode2Help = data.GlobalKeyboardResult[0].asCode2
		// 			if (data.GlobalKeyboardResult[0].asCode == "CTRL") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.ctrlKey && (evt.keyCode==asCode2Help)) {
		// 						evt.preventDefault();
		// 						fnHelp()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "ALT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.altKey && (evt.keyCode==asCode2Help)){
		// 						evt.preventDefault();
		// 						fnHelp()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "SHIFT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.shiftKey && (evt.keyCode==asCode2Help)) {
		// 						evt.preventDefault();
		// 						fnHelp()
		// 					}
		// 				});
	
		// 			} else {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.keyCode==asCode2Help){ 
		// 						evt.preventDefault();
		// 						fnHelp()
		// 					}
		// 				});
		// 			}
		// 			function fnHelp() {
		// 				alert("Help")
		// 			}
		// 		},
		// 		error: function(jqXHR, textStatus, errorThrown) {
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
	
		// 	})
	
		// 	$.ajax({
		// 		url: wsUrlkey,
		// 		type: 'post',
		// 		dataType: 'json',
		// 		data: paramBack,
		// 		success: function (data) { 
	
		// 			var asCode2Back = data.GlobalKeyboardResult[0].asCode2
		// 			if (data.GlobalKeyboardResult[0].asCode == "CTRL") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.ctrlKey && (evt.keyCode==asCode2Back)) {
		// 						evt.preventDefault();
		// 						fnBack()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "ALT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.altKey && (evt.keyCode==asCode2Back)) {
		// 						evt.preventDefault();
		// 						fnBack()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "SHIFT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.shiftKey && (evt.keyCode==asCode2Back)) {
		// 						evt.preventDefault();
		// 						fnBack()
		// 					}
		// 				});
	
		// 			} else {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.keyCode==asCode2Back) {
		// 						evt.preventDefault();
		// 						fnBack()
		// 					}
		// 				});
		// 			}
		// 			function fnBack() {
		// 				alert("Back")
		// 			}
		// 		},
		// 		error: function(jqXHR, textStatus, errorThrown) {
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	})
	
		// 	$.ajax({
		// 		url: wsUrlkey,
		// 		type: 'post',
		// 		dataType: 'json',
		// 		data: paramCancel,
		// 		success: function (data) { 
		// 			var asCode2Cancel = data.GlobalKeyboardResult[0].asCode2
		// 			if (data.GlobalKeyboardResult[0].asCode == "CTRL") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.ctrlKey && (evt.keyCode==asCode2Cancel)) {
		// 						evt.preventDefault();
		// 						fnCancel()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "ALT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.altKey && (evt.keyCode==asCode2Cancel)) {
		// 						evt.preventDefault();
		// 						fnCancel()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "SHIFT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.shiftKey && (evt.keyCode==asCode2Cancel)) {
		// 						evt.preventDefault();
		// 						fnCancel()
		// 					}
		// 				});
	
		// 			} else {
		// 				$(document).keydown(function(evt){
		// 					if (evt.keyCode==asCode2Cancel) { 
		// 						evt.preventDefault();
		// 						fnCancel()
		// 					}
		// 				});
		// 			}
		// 			function fnCancel() {
		// 				alert("Cancel")
		// 			}
	
		// 		},
		// 		error: function(jqXHR, textStatus, errorThrown) {
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	})
		// },
		// //fungsi untuk keyboard global
		// KeyboardGlobalEdit: function(pPath) {
	
		// 	var wsUrlkey = urlWebservice+ "GlobalKeyboard";
		// 	var paramEdit = '{"funct":"Edit"}';
	
		// 	//----Edit
		// 	$.ajax({
		// 		url: wsUrlkey,
		// 		type: 'post',
		// 		dataType: 'json',
		// 		data: paramEdit,
		// 		success: function (data) {
		// 			console.log(data)
		// 			var asCode2Cancel = data.GlobalKeyboardResult[0].asCode2
		// 			if (data.GlobalKeyboardResult[0].asCode == "CTRL") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.ctrlKey && (evt.keyCode==asCode2Cancel)) {
		// 						evt.preventDefault();
		// 						fnEdit()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "ALT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.altKey && (evt.keyCode==asCode2Cancel)) {
		// 						evt.preventDefault();
		// 						fnEdit()
		// 					}
		// 				});
	
		// 			} else if (data.GlobalKeyboardResult[0].asCode == "SHIFT") {
	
		// 				$(document).keydown(function(evt){
		// 					if (evt.shiftKey && (evt.keyCode==asCode2Cancel)) {
		// 						evt.preventDefault();
		// 						fnEdit()
		// 					}
		// 				});
	
		// 			} else {
		// 				$(document).keydown(function(evt) {
		// 					if (evt.keyCode==asCode2Cancel) {
		// 						evt.preventDefault();
		// 						fnEdit()
		// 					}
		// 				});
		// 			}
		// 			function fnEdit() {
		// 				// alert("Edit")
	
		// 				var pView = pPath + ".view.js"
		// 				var pController = pPath + ".controller.js"
		// 				sap.m.URLHelper.redirect("EditSourceCode.html?view="+pView+"&controller="+pController+"&url="+serverhref);
		// 			}
		// 		},
		// 		error: function(jqXHR, textStatus, errorThrown) {
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	})
		// },
		//kirim pesan maintenance ke user
		MessageMaintenance: function () {
			myVar = setInterval(myTimer, 30000);
	
			function myTimer() {
				var dialog = SAPUI.Dialog("", "Peringatan Maintenance...!!!", "", "", true)
				var label = SAPUI.Label("", "", "", "")
				dialog.addContent(label)
				dialog.addButton(
					new sap.ui.commons.Button({
						text: "OK",
						press: function () {
							var oModel = new sap.ui.model.json.JSONModel();
							var wsUrl = urlWebservice + "MessMTUpdateStatus";
							$.ajax({
								type: "POST",
								url: wsUrl,
								contentType: "text/plain, charset=utf-8",
								dataType: "json",
								data: "{'status' : 'Non Active'}",
								crossDomain: true,
								success: function (result) {
									if (result.MessMTUpdateStatusResult == 1) {
										console.log(result);
										dialog.close();
									}
								},
								error: function (jqXHR, textStatus, errorThrow) {
									console.log("Error");
									console.log(jqXHR);
									console.log(textStatus);
									console.log(errorThrow);
								}
							})
						}
					})
				);
				var oModel = new sap.ui.model.json.JSONModel();
				var wsUrl = urlWebservice + "MessMTOperatorPesan";
				//var wsUrl = "http://localhost:10344/Service1.svc/MessMTOperatorPesan";
				$.ajax({
					type: "POST",
					url: wsUrl,
					contentType: "text/plain, charset=utf-8",
					dataType: "json",
					data: "{'status' : 'Active'}",
					crossDomain: true,
					success: function (result) {
						label.setText(result.MessMTOperatorPesanResult[0].Pesan);
						dialog.open();
	
					},
					error: function (jqXHR, textStatus, errorThrow) {
						console.log("Error");
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrow);
					}
				})
			}
		},
		//fungsi cek token user setiap transaksi
		cekToken: function () {
			var wsUrly = urlWebservice + "CheckToken";
			$.ajax({
				url: wsUrly,
				type: 'post',
				dataType: 'json',
				data: "{'username':'" + U5312UX5 + "','token':'" + t0123nUX5 + "'}",
				success: function (result) {
					console.log(result)
					// alert(t0123n)
					if (result.CheckTokenResult != 1) {
						var wsUrloff = urlWebservice + "LogOff";
						var param = '{"afkType": "NULL", "username":"' + U5312UX5 + '", "alasan":"OFFLINE","server":"' + Server1 + '", "IP":"' + ClientIP + '"}'
						U5312UX5 = "";
						X_VarianUX5 = "";
	
						$.ajax({
							url: wsUrloff,
							type: "POST",
							dataType: 'json',
							data: param,
							success: function (result) {
	
								Server1 = "none";
								window.localStorage.clear();
								window.sessionStorage.clear();
								SAPUI.Redirect("Kick")
								// window.location.replace("user_usage.html");
								// SAPUI.GetClientIP()
							}
						})
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('Error');
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		},
		PasteTable: function (idTable, pTrueModel) {
			var pTable = idTable
			var exmodel = new sap.ui.model.json.JSONModel()
			var oModel = new sap.ui.model.json.JSONModel()
			var oldModelData = pTrueModel.getData()
			var modelcoba = sap.ui.getCore().getModel("tableModel")
			var oDialogPaste = SAPUI.Dialog("", "Paste Mode", "auto", "auto", true);
			var areaPaste = SAPUI.TextArea("", "", "", 90, 20)
			var btnAcceptPaste = SAPUI.Button("", "", "", "sap-icon://accept", false, "Accept");
			var btnReloadPaste = SAPUI.Button("", "", "", "", false, "Accept");
			$('textarea').prop('selectionEnd', 13);
			oDialogPaste.addContent(areaPaste)
			oDialogPaste.addButton(btnAcceptPaste)
	
			oDialogPaste.open();
	
			var pArrayBind;
			var myObject;
			var arrMyObject = [];
			var initkeys = Object.keys(oldModelData);
			if (initkeys.length > 1) {
				exmodel.setData({
					kepala: oldModelData
				})
			} else {
				exmodel.setData(oldModelData)
			}
			var oModelData = exmodel.getData()
			var keys = Object.keys(oModelData);
			var dataBind = {}
			var modelBind = "";
			var kepara = JSON.stringify(keys).replace(/\u005B/g, "").replace(/\u005D/g, "").replace(/\u0022/g, "")
			if (JSON.stringify(oModelData[keys]) == undefined) {
				for (var k = 0; k < oModelData.length; k++) {
					myObject = JSON.parse(JSON.stringify(oModelData[keys][k]))
					pArrayBind = Object.keys(myObject);
					modelBind = "/";
				}
			} else {
				for (var k = 0; k < oModelData[keys].length; k++) {
					myObject = JSON.parse(JSON.stringify(oModelData[keys][k]))
					pArrayBind = Object.keys(myObject);
	
					modelBind = "/" + kepara;
				}
			}
	
			btnAcceptPaste.attachPress(function (oEvent) {
				var textarea = areaPaste.getValue();
				var linebreak = textarea.split('\n');
				var colbreak = textarea.split('\t');
	
				var multiSplit = function (str, delimeters) {
					var result = [str];
					if (typeof (delimeters) == 'string')
						delimeters = [delimeters];
					while (delimeters.length > 0) {
						for (var i = 0; i < result.length; i++) {
							var tempSplit = result[i].split(delimeters[0]);
							result = result.slice(0, i).concat(tempSplit).concat(result.slice(i + 1));
						}
						delimeters.shift();
					}
					return result;
				}
	
				var txtVal = multiSplit(textarea, ['\n', '\t'])
				var baristok = multiSplit(textarea, ['\n'])
				var kolomtok = multiSplit(baristok[0], ['\t'])
				var txtColSum = kolomtok.length
				var realColSum = pTable.getColumns().length
	
				if (txtColSum < realColSum) {
					areaPaste.setValue("")
					alert("kolom terlalu sedikit")
				} else if (txtColSum > realColSum) {
					areaPaste.setValue("")
					alert("kolom terlalu banyak")
				} else {
	
					Object.size = function (obj) {
						var size = 0,
							key;
						for (key in obj) {
							if (obj.hasOwnProperty(key)) size++;
						}
						return key.length;
					};
	
					var arrLength = linebreak.length;
					var tablelength = oModelData[kepara].length
					var objLength = pArrayBind.length
					var test;
					var bolFinder;
					var objAsli;
	
					var length
					if (arrLength > tablelength) {
						if (linebreak[arrLength - 1] == "") {
							length = arrLength - 1
						} else {
							length = arrLength
						}
					} else {
						length = tablelength
					}
	
					var data = [];
					var jsonVariable = {};
					for (var i = 0; i < length; i++) {
						jsonVariable = {};
						for (var j = 0; j < objLength; j++) {
							objAsli = pArrayBind[j]
	
							if (i < tablelength) {
								if (JSON.stringify(oModelData[keys][i][objAsli]).toUpperCase() == "TRUE") {
									jsonVariable[pArrayBind[j]] = true;
								} else if (JSON.stringify(oModelData[keys][i][objAsli]).toUpperCase() == "FALSE") {
									jsonVariable[pArrayBind[j]] = false;
								} else {
									jsonVariable[pArrayBind[j]] = JSON.stringify(oModelData[keys][i][objAsli]).replace(/\u0022/g, "")
								}
							}
	
							if (pArrayBind[j] != undefined) {
								if (txtVal[i * objLength + j] != "") {
									if (txtVal[i * objLength + j] != undefined) {
										if (txtVal[i * objLength + j].toUpperCase() == "TRUE") {
											jsonVariable[pArrayBind[j]] = true;
										} else if (txtVal[i * objLength + j].toUpperCase() == "FALSE") {
											jsonVariable[pArrayBind[j]] = false;
										} else {
											jsonVariable[pArrayBind[j]] = txtVal[i * objLength + j]
										}
									} else {}
								} else {
									if (arrLength < tablelength) {}
								}
							}
						}
						data.push(jsonVariable);
					}
					if (areaPaste.getValue().trim() != "") {
						if (JSON.stringify(oModelData[keys]) == undefined) {
							oModel.setData(data)
							pTable.setModel(oModel)
							pTable.bindRows("/")
						} else {
							dataBind[kepara] = data
							oModel.setData(dataBind)
							pTable.setModel(oModel)
							pTable.bindRows(modelBind)
						}
	
					}
					oDialogPaste.close();
				}
			})
		},
		//multiselect value
		MultiSelectValue1: function (pId, judul, vhfLow, vhfHigh, pResult) {
	
			var judul = judul.split("+")
			console.log(judul)
			console.log("ini" + judul[2])
	
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul[0], "400px", "500px", true);
			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0);
			var tblTabSelSingle = SAPUI.Table("", "auto", 15, "Single", "Paginator", true);
			var tblTabSelRange = SAPUI.Table("", "auto", 10, "Single", "Paginator", true);
			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
			var tblTabExcludeRange = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
	
			oDialog.setShowCloseButton(false)
	
			// colom table Select Single
			var colSingleVal1 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue1", "auto", "Begin", "Begin", "", 25, "", judul[0], judul[1], judul[2]);
			//kolom range value
			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom single value exclude
			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom range value exclude
			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
	
			// declare button
			var btnOK = SAPUI.ButtonOK("");
			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
			var btnCancel = SAPUI.ButtonCancel("")
			var btnDeleteAll = SAPUI.Button("", "", "Delete All", "sap-icon://delete", false, "Reject")
			var btnDeleteRow = SAPUI.Button("", "", "Delete Row", "sap-icon://less", false, "Reject")
			var btnAddRow = SAPUI.Button("", "", "Add Row", "sap-icon://add", false, "Accept")
	
			tblTabSelSingle.addColumn(colSingleVal1)
	
			tblTabSelRange.addColumn(colLowLimit1)
			tblTabSelRange.addColumn(colUpperLimit1)
	
			tblTabExcludeSingle.addColumn(colSingleVal2)
	
			tblTabExcludeRange.addColumn(colLowLimit2)
			tblTabExcludeRange.addColumn(colUpperLimit2)
	
			var vhfLowVal = vhfLow.getValue();
			var vhfHighVal = vhfHigh.getValue();
			var aDataTabSelSingle = []
			var aDataTabSelRange = []
			var aDataTabExcludeSingle = []
			var aDataTabExcludeRange = []
			var tempsingle = colSingleVal1.getTemplate()
	
			var pRes = pResult.getValue().split(",");
			var pResLenght = pRes.length;
	
			//			for (var i = 0; i < pResLenght; i++) {
			//				tblTabSelSingle.setSelectedIndex(0); 
			//				aDataTabSelSingle.push({singleValue1: pRes[i]})
			//				oTabStrip.setSelectedIndex(0)
			//
			//			}
	
			//jika komponen 1 textfield tidak kosong
			//			if((vhfLowVal != "") && (vhfHighVal == "")){
			//				console.log("vhfLow : kosong")
			//fill tabstrip single value
	
			for (var i = 0; i < 10; i++) {
				if (i == 0) {
					tblTabSelSingle.setSelectedIndex(0);
					//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else if (i < pResLenght) {
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
			}
			//				for(i=0;i<10;i++){
			//					if(i==0){
			//						tblTabSelSingle.setSelectedIndex(0); 
			//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
			//					}else{
			//						aDataTabSelSingle.push({singleValue1: ""})
			//					}
			//
			//				} 
			//fil tabstrip valuerange
			for (i = 0; i < 10; i++) {
				if (i == 0) {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				} else {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				}
	
			}
			oTabStrip.setSelectedIndex(0)
	
			//			}
			//jika kedua komponen textfield tidak kosong
			if ((vhfLowVal != "") && (vhfHighVal != "")) {
				//fill tabstrip single value
				for (i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
				//fil tabstrip valuerange
				for (i = 0; i < 10; i++) {
					if (i == 0) {
						aDataTabSelRange.push({
							lowerLimit1: vhfLowVal,
							upperLimit1: vhfHighVal
						})
					} else {
						aDataTabSelRange.push({
							lowerLimit1: "",
							upperLimit1: ""
						})
					}
	
				}
				oTabStrip.setSelectedIndex(1)
	
	
			}
			//exclude single
			for (i = 0; i < 10; i++) {
				aDataTabExcludeSingle.push({
					singleValue2: ""
				})
			}
			//exclude range
			for (i = 0; i < 10; i++) {
				aDataTabExcludeRange.push({
					lowerLimit2: "",
					upperLimit2: ""
				})
			}
	
	
			// data table tblTabSelSingle
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				modelData1: aDataTabSelSingle
			});
			tblTabSelSingle.setModel(oModel1);
			tblTabSelSingle.bindRows("/modelData1");
	
			btnUpload.attachPress(function (oEvent) {
				Global.PasteTable(tblTabSelSingle, oModel1)
			})
	
			// data table tblTabSelRange
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData({
				modelData2: aDataTabSelRange
			});
			tblTabSelRange.setModel(oModel2);
			tblTabSelRange.bindRows("/modelData2");
	
			// data table tblTabExcludeSingle
			var oModel3 = new sap.ui.model.json.JSONModel();
			oModel3.setData({
				modelData3: aDataTabExcludeSingle
			});
			tblTabExcludeSingle.setModel(oModel3);
			tblTabExcludeSingle.bindRows("/modelData3");
	
			// data table tblTabExcludeRange
			var oModel4 = new sap.ui.model.json.JSONModel();
			oModel4.setData({
				modelData4: aDataTabExcludeRange
			});
			tblTabExcludeRange.setModel(oModel4);
			tblTabExcludeRange.bindRows("/modelData4");
	
	
			oTabStrip.createTab("Select Single Values", tblTabSelSingle)
			//sementara tidak dipakai hanya dipakai yang singgle value
			//			oTabStrip.createTab("Select Ranges", tblTabSelRange)
			//			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
			//			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
	
			oDialog.addContent(oTabStrip);
			oDialog.addButton(btnOK)
			oDialog.addButton(btnUpload)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDeleteRow)
			oDialog.addButton(btnDeleteAll)
			oDialog.addButton(btnCancel)
	
			oDialog.open();
	
			btnDeleteRow.attachPress(function (oEvent) {
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
				var oModel = new sap.ui.model.json.JSONModel();
				var selectedIndex = tblTabSelSingle.getSelectedIndices();
				var counter = 0;
				var listId = [];
				var paramDeletedId = new Object();
				var data = '';
	
				selectedIndex.forEach(function (item) {
					(currentData[(item - counter)].hasOwnProperty('singleValue1')) ? listId.push({
						id: currentData[(item - counter)].singleValue1
					}): "";
					currentData.splice(item - counter, 1);
					counter++;
				});
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnDeleteAll.attachPress(function (oEvent) {
				aDataTabSelSingle = []
				for (var i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
	
				oModel1.setData({
					modelData1: aDataTabSelSingle
				});
				tblTabSelSingle.setModel(oModel1);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnAddRow.attachPress(function (oEvent) {
				var oModel = new sap.ui.model.json.JSONModel();
				var idx = tblTabSelSingle.getSelectedIndex();
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
	
				var insertedData = {
					singleValue1: ""
				};
	
				// Jika tidak ada row yang dicentang maka data akan ditambahkan pada row terakhir
				(tblTabSelSingle.isIndexSelected(idx)) ? currentData.splice(idx + 1, 0, insertedData): currentData.splice(currentData.length, 0, insertedData);
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnOK.attachPress(function (oEvent) {
				//model table single val
				var model = tblTabSelSingle.getModel()
				var DataModel = model.getData()
				var dataModelLength = DataModel.modelData1.length
	
				//model table range value
				var model = tblTabSelRange.getModel()
				var DataModel = model.getData()
				var dataModelLength2 = DataModel.modelData2.length
	
				pResult.setValue("");
	
				var pTemp = [];
				var pTempModel = [];
				var dBind;
				var pTempSelRange = [];
				var check = 0;
				var item = {}
				// var checkkosong=0;
				// console.log(dataModelLength) 
				// console.log(DataModel)
				// console.log(oTabStrip.getSelectedIndex())
				if (oTabStrip.getSelectedIndex() == 0) {
					//get data input table
					for (i = 0; i < dataModelLength; i++) {
						var cxt = tblTabSelSingle.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tblTabSelSingle.getModel().getProperty(path);
						var getValue = obj.singleValue1.trim()
						console.log("1 " + getValue)
						if (getValue != "") {
	
							pTemp.push(obj.singleValue1)
							// item.dBind=obj.singleValue1; 
							// pTempModel.push(item)
						} else {
							// checkkosong++
						}
					}
					// tblTabSelSingle.setModel(model)
	
					// if(checkkosong >=1){
					// console.log("ada yang kosng")
					// }
	
	
					console.log(pTemp)
					//check duplikat data
					var sorted_pTemp = pTemp.slice().sort();
					for (var i = 0; i < pTemp.length - 1; i++) {
						if (sorted_pTemp[i + 1] == sorted_pTemp[i]) {
							check++;
						}
	
					}
					//cek duplikat data
					if (check == 0) {
						vhfLow.setValue(pTemp[0])
						pResult.setValue(pTemp)
						console.log(pResult.getValue())
						if (pTemp.length == 0) {
							pId.setPressed(false)
						} else {
							pId.setPressed(true)
						}
	
						oDialog.close();
					} else {
						SAPUI.MessageBoxAlert("duplicate data")
	
					}
	
	
				}
	
				// else if(oTabStrip.getSelectedIndex()== 1){
				//     for (i = 0; i < dataModelLength; i++) {
				//         var cxt = tblTabSelRange.getContextByIndex(i);
				//         var path = cxt.sPath;
				//         var obj = tblTabSelRange.getModel().getProperty(path);
				//         var getValue1=obj.lowerLimit1.trim()
				//         var getValue2=obj.upperLimit1.trim()
	
	
				//         console.log(getValue1)
				//         console.log(getValue2)
				//         if(getValue1!="" && getValue2!==""){ 
	
				//             pTempSelRange.push(obj.lowerLimit1)
				//             pTempSelRange.push(obj.upperLimit1)
	
				//         }
				//     ////                      checkkosong++
				//     //                        } 
				//     }
	
				//     console.log(pTempSelRange)
				// } 
			})
	
			btnCancel.attachPress(function (oEvent) {
				pResult.setValue(pResult.getValue());
				oDialog.close();
			})
	
	
		},
		//multiselect value
		MultiSelectValue2: function (pId, judul, vhfLow, vhfHigh, pResult) {
	
			var judul = judul.split("+")
			console.log(judul)
	
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul[0], "400px", "500px", true);
			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0);
			var tblTabSelSingle = SAPUI.Table("", "auto", 15, "Single", "Paginator", true);
			var tblTabSelRange = SAPUI.Table("", "auto", 10, "Single", "Paginator", true);
			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
			var tblTabExcludeRange = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
	
			oDialog.setShowCloseButton(false)
	
			// colom table Select Single
			var colSingleVal1 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue1", "auto", "Begin", "Begin", "", 25, "", judul[0], judul[1], "");
			//kolom range value
			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom single value exclude
			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom range value exclude
			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
	
			// declare button
			var btnOK = SAPUI.ButtonOK("");
			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
			var btnCancel = SAPUI.ButtonCancel("")
			var btnDeleteAll = SAPUI.Button("", "", "Delete All", "sap-icon://delete", false, "Reject")
			var btnDeleteRow = SAPUI.Button("", "", "Delete Row", "sap-icon://less", false, "Reject")
			var btnAddRow = SAPUI.Button("", "", "Add Row", "sap-icon://add", false, "Accept")
	
			tblTabSelSingle.addColumn(colSingleVal1)
	
			tblTabSelRange.addColumn(colLowLimit1)
			tblTabSelRange.addColumn(colUpperLimit1)
	
			tblTabExcludeSingle.addColumn(colSingleVal2)
	
			tblTabExcludeRange.addColumn(colLowLimit2)
			tblTabExcludeRange.addColumn(colUpperLimit2)
	
			var vhfLowVal = vhfLow.getValue();
			var vhfHighVal = vhfHigh.getValue();
			var aDataTabSelSingle = []
			var aDataTabSelRange = []
			var aDataTabExcludeSingle = []
			var aDataTabExcludeRange = []
			var tempsingle = colSingleVal1.getTemplate()
	
			var pRes = pResult.getValue().split(",");
			var pResLenght = pRes.length;
	
			//			for (var i = 0; i < pResLenght; i++) {
			//				tblTabSelSingle.setSelectedIndex(0); 
			//				aDataTabSelSingle.push({singleValue1: pRes[i]})
			//				oTabStrip.setSelectedIndex(0)
			//
			//			}
	
			//jika komponen 1 textfield tidak kosong
			//			if((vhfLowVal != "") && (vhfHighVal == "")){
			//				console.log("vhfLow : kosong")
			//fill tabstrip single value
	
			for (var i = 0; i < 10; i++) {
				if (i == 0) {
					tblTabSelSingle.setSelectedIndex(0);
					aDataTabSelSingle.push({
						singleValue1: vhfLowVal
					})
				} else if (i < pResLenght) {
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
			}
			//				for(i=0;i<10;i++){
			//					if(i==0){
			//						tblTabSelSingle.setSelectedIndex(0); 
			//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
			//					}else{
			//						aDataTabSelSingle.push({singleValue1: ""})
			//					}
			//
			//				} 
			//fil tabstrip valuerange
			for (i = 0; i < 10; i++) {
				if (i == 0) {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				} else {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				}
	
			}
			oTabStrip.setSelectedIndex(0)
	
			//			}
			//jika kedua komponen textfield tidak kosong
			if ((vhfLowVal != "") && (vhfHighVal != "")) {
				//fill tabstrip single value
				for (i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
				//fil tabstrip valuerange
				for (i = 0; i < 10; i++) {
					if (i == 0) {
						aDataTabSelRange.push({
							lowerLimit1: vhfLowVal,
							upperLimit1: vhfHighVal
						})
					} else {
						aDataTabSelRange.push({
							lowerLimit1: "",
							upperLimit1: ""
						})
					}
	
				}
				oTabStrip.setSelectedIndex(1)
	
	
			}
			//exclude single
			for (i = 0; i < 10; i++) {
				aDataTabExcludeSingle.push({
					singleValue2: ""
				})
			}
			//exclude range
			for (i = 0; i < 10; i++) {
				aDataTabExcludeRange.push({
					lowerLimit2: "",
					upperLimit2: ""
				})
			}
	
	
			// data table tblTabSelSingle
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				modelData1: aDataTabSelSingle
			});
			tblTabSelSingle.setModel(oModel1);
			tblTabSelSingle.bindRows("/modelData1");
	
			btnUpload.attachPress(function (oEvent) {
				Global.PasteTable(tblTabSelSingle, oModel1)
			})
	
			// data table tblTabSelRange
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData({
				modelData2: aDataTabSelRange
			});
			tblTabSelRange.setModel(oModel2);
			tblTabSelRange.bindRows("/modelData2");
	
			// data table tblTabExcludeSingle
			var oModel3 = new sap.ui.model.json.JSONModel();
			oModel3.setData({
				modelData3: aDataTabExcludeSingle
			});
			tblTabExcludeSingle.setModel(oModel3);
			tblTabExcludeSingle.bindRows("/modelData3");
	
			// data table tblTabExcludeRange
			var oModel4 = new sap.ui.model.json.JSONModel();
			oModel4.setData({
				modelData4: aDataTabExcludeRange
			});
			tblTabExcludeRange.setModel(oModel4);
			tblTabExcludeRange.bindRows("/modelData4");
	
	
			oTabStrip.createTab("Select Single Values", tblTabSelSingle)
			//sementara tidak dipakai hanya dipakai yang singgle value
			//			oTabStrip.createTab("Select Ranges", tblTabSelRange)
			//			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
			//			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
	
			oDialog.addContent(oTabStrip);
			oDialog.addButton(btnOK)
			oDialog.addButton(btnUpload)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDeleteRow)
			oDialog.addButton(btnDeleteAll)
			oDialog.addButton(btnCancel)
	
			oDialog.open();
	
			btnDeleteRow.attachPress(function (oEvent) {
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
				var oModel = new sap.ui.model.json.JSONModel();
				var selectedIndex = tblTabSelSingle.getSelectedIndices();
				var counter = 0;
				var listId = [];
				var paramDeletedId = new Object();
				var data = '';
	
				selectedIndex.forEach(function (item) {
					(currentData[(item - counter)].hasOwnProperty('singleValue1')) ? listId.push({
						id: currentData[(item - counter)].singleValue1
					}): "";
					currentData.splice(item - counter, 1);
					counter++;
				});
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnDeleteAll.attachPress(function (oEvent) {
				aDataTabSelSingle = []
				for (var i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
	
				oModel1.setData({
					modelData1: aDataTabSelSingle
				});
				tblTabSelSingle.setModel(oModel1);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnAddRow.attachPress(function (oEvent) {
				var oModel = new sap.ui.model.json.JSONModel();
				var idx = tblTabSelSingle.getSelectedIndex();
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
	
				var insertedData = {
					singleValue1: ""
				};
	
				// Jika tidak ada row yang dicentang maka data akan ditambahkan pada row terakhir
				(tblTabSelSingle.isIndexSelected(idx)) ? currentData.splice(idx + 1, 0, insertedData): currentData.splice(currentData.length, 0, insertedData);
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnOK.attachPress(function (oEvent) {
				//model table single val
				var model = tblTabSelSingle.getModel()
				var DataModel = model.getData()
				var dataModelLength = DataModel.modelData1.length
	
				//model table range value
				var model = tblTabSelRange.getModel()
				var DataModel = model.getData()
				var dataModelLength2 = DataModel.modelData2.length
	
				pResult.setValue("");
	
				var pTemp = [];
				var pTempModel = [];
				var dBind;
				var pTempSelRange = [];
				var check = 0;
				var item = {}
				// var checkkosong=0;
				// console.log(dataModelLength) 
				// console.log(DataModel)
				// console.log(oTabStrip.getSelectedIndex())
				if (oTabStrip.getSelectedIndex() == 0) {
					//get data input table
					for (i = 0; i < dataModelLength; i++) {
						var cxt = tblTabSelSingle.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tblTabSelSingle.getModel().getProperty(path);
						var getValue = obj.singleValue1.trim()
						console.log("1 " + getValue)
						if (getValue != "") {
	
							pTemp.push(obj.singleValue1)
							// item.dBind=obj.singleValue1; 
							// pTempModel.push(item)
						} else {
							// checkkosong++
						}
					}
					// tblTabSelSingle.setModel(model)
	
					// if(checkkosong >=1){
					// console.log("ada yang kosng")
					// }
	
	
					console.log(pTemp)
					//check duplikat data
					var sorted_pTemp = pTemp.slice().sort();
					for (var i = 0; i < pTemp.length - 1; i++) {
						if (sorted_pTemp[i + 1] == sorted_pTemp[i]) {
							check++;
						}
	
					}
					//cek duplikat data
					if (check == 0) {
						vhfLow.setValue(pTemp[0])
						pResult.setValue(pTemp)
						console.log(pResult.getValue())
						if (pTemp.length == 0) {
							pId.setPressed(false)
						} else {
							pId.setPressed(true)
						}
	
						oDialog.close();
					} else {
						SAPUI.MessageBoxAlert("duplicate data")
	
					}
	
	
				}
	
				// else if(oTabStrip.getSelectedIndex()== 1){
				//     for (i = 0; i < dataModelLength; i++) {
				//         var cxt = tblTabSelRange.getContextByIndex(i);
				//         var path = cxt.sPath;
				//         var obj = tblTabSelRange.getModel().getProperty(path);
				//         var getValue1=obj.lowerLimit1.trim()
				//         var getValue2=obj.upperLimit1.trim()
	
	
				//         console.log(getValue1)
				//         console.log(getValue2)
				//         if(getValue1!="" && getValue2!==""){ 
	
				//             pTempSelRange.push(obj.lowerLimit1)
				//             pTempSelRange.push(obj.upperLimit1)
	
				//         }
				//     ////                      checkkosong++
				//     //                        } 
				//     }
	
				//     console.log(pTempSelRange)
				// } 
			})
	
			btnCancel.attachPress(function (oEvent) {
				pResult.setValue(pResult.getValue());
				oDialog.close();
			})
	
	
		},
		//multiselect value
		MultiSelectValue: function (pId, judul, vhfLow, vhfHigh, pResult) {
	
			//untuk menyesuaikan baris di multiselect jika ada variant
			// console.log(pResult)
			var judul = judul.split("+")
			// console.log(judul)
			if (pResult.getValue() == "") {
				var total = 10
			} else {
				var total = pResult.getValue().split(",").length
			}
			// console.log(total)
	
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul[1], "400px", "500px", true);
			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0);
			var tblTabSelSingle = SAPUI.Table("", "auto", 15, "Single", "Paginator", true);
			var tblTabSelRange = SAPUI.Table("", "auto", total, "Single", "Paginator", true);
			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
			var tblTabExcludeRange = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
	
			// 		oDialog.setShowCloseButton(false)
	
			// colom table Select Single
			var colSingleVal1 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue1", "auto", "Begin", "Begin", "", 25, "", judul[0], judul[1], judul[2]);
			//kolom range value
			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom single value exclude
			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom range value exclude
			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
	
			// declare button
			var btnOK = SAPUI.ButtonOK("");
			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
			var btnCancel = SAPUI.ButtonCancel("")
			var btnDeleteAll = SAPUI.Button("", "", "Delete All", "sap-icon://delete", false, "Reject")
			var btnDeleteRow = SAPUI.Button("", "", "Delete Row", "sap-icon://less", false, "Reject")
			var btnAddRow = SAPUI.Button("", "", "Add Row", "sap-icon://add", false, "Accept")
	
			tblTabSelSingle.addColumn(colSingleVal1)
	
			tblTabSelRange.addColumn(colLowLimit1)
			tblTabSelRange.addColumn(colUpperLimit1)
	
			tblTabExcludeSingle.addColumn(colSingleVal2)
	
			tblTabExcludeRange.addColumn(colLowLimit2)
			tblTabExcludeRange.addColumn(colUpperLimit2)
	
			var vhfLowVal = vhfLow.getValue();
			var vhfHighVal = vhfHigh.getValue();
			var aDataTabSelSingle = []
			var aDataTabSelRange = []
			var aDataTabExcludeSingle = []
			var aDataTabExcludeRange = []
			var tempsingle = colSingleVal1.getTemplate()
	
			var pRes = pResult.getValue().split(",");
			var pResLenght = pRes.length;
	
			//			for (var i = 0; i < pResLenght; i++) {
			//				tblTabSelSingle.setSelectedIndex(0); 
			//				aDataTabSelSingle.push({singleValue1: pRes[i]})
			//				oTabStrip.setSelectedIndex(0)
			//
			//			}
	
			//jika komponen 1 textfield tidak kosong
			//			if((vhfLowVal != "") && (vhfHighVal == "")){
			//				console.log("vhfLow : kosong")
			//fill tabstrip single value
	
			for (var i = 0; i < total; i++) {
				if (i == 0) {
					tblTabSelSingle.setSelectedIndex(0);
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else if (i < pResLenght) {
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
			}
			//				for(i=0;i<10;i++){
			//					if(i==0){
			//						tblTabSelSingle.setSelectedIndex(0); 
			//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
			//					}else{
			//						aDataTabSelSingle.push({singleValue1: ""})
			//					}
			//
			//				} 
			//fil tabstrip valuerange
			for (i = 0; i < total; i++) {
				if (i == 0) {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				} else {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				}
	
			}
			// 		oTabStrip.setSelectedIndex(0)
	
			//			}
			//jika kedua komponen textfield tidak kosong
			if ((vhfLowVal != "") && (vhfHighVal != "")) {
				//fill tabstrip single value
				for (i = 0; i < total; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
				//fil tabstrip valuerange
				for (i = 0; i < total; i++) {
					if (i == 0) {
						aDataTabSelRange.push({
							lowerLimit1: vhfLowVal,
							upperLimit1: vhfHighVal
						})
					} else {
						aDataTabSelRange.push({
							lowerLimit1: "",
							upperLimit1: ""
						})
					}
	
				}
				// oTabStrip.setSelectedIndex(1)
	
	
			}
			//exclude single
			for (i = 0; i < total; i++) {
				aDataTabExcludeSingle.push({
					singleValue2: ""
				})
			}
			//exclude range
			for (i = 0; i < total; i++) {
				aDataTabExcludeRange.push({
					lowerLimit2: "",
					upperLimit2: ""
				})
			}
	
	
			// data table tblTabSelSingle
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				modelData1: aDataTabSelSingle
			});
			tblTabSelSingle.setModel(oModel1);
			tblTabSelSingle.bindRows("/modelData1");
	
			btnUpload.attachPress(function (oEvent) {
				Global.PasteTable(tblTabSelSingle, oModel1)
			})
	
			// data table tblTabSelRange
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData({
				modelData2: aDataTabSelRange
			});
			tblTabSelRange.setModel(oModel2);
			tblTabSelRange.bindRows("/modelData2");
	
			// data table tblTabExcludeSingle
			var oModel3 = new sap.ui.model.json.JSONModel();
			oModel3.setData({
				modelData3: aDataTabExcludeSingle
			});
			tblTabExcludeSingle.setModel(oModel3);
			tblTabExcludeSingle.bindRows("/modelData3");
	
			// data table tblTabExcludeRange
			var oModel4 = new sap.ui.model.json.JSONModel();
			oModel4.setData({
				modelData4: aDataTabExcludeRange
			});
			tblTabExcludeRange.setModel(oModel4);
			tblTabExcludeRange.bindRows("/modelData4");
	
	
			// 		oTabStrip.createTab("Select Single Values", tblTabSelSingle)
			oTabStrip.addItem(new sap.m.TabContainerItem({
				name: "Select Single Values",
				content: tblTabSelSingle
			}))
			//sementara tidak dipakai hanya dipakai yang singgle value
			//			oTabStrip.createTab("Select Ranges", tblTabSelRange)
			//			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
			//			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
	
			oDialog.addContent(oTabStrip);
			oDialog.addButton(btnOK)
			oDialog.addButton(btnUpload)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDeleteRow)
			oDialog.addButton(btnDeleteAll)
			oDialog.addButton(btnCancel)
	
			oDialog.open();
	
			btnDeleteRow.attachPress(function (oEvent) {
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
				var oModel = new sap.ui.model.json.JSONModel();
				var selectedIndex = tblTabSelSingle.getSelectedIndices();
				var counter = 0;
				var listId = [];
				var paramDeletedId = new Object();
				var data = '';
	
				selectedIndex.forEach(function (item) {
					(currentData[(item - counter)].hasOwnProperty('singleValue1')) ? listId.push({
						id: currentData[(item - counter)].singleValue1
					}): "";
					currentData.splice(item - counter, 1);
					counter++;
				});
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnDeleteAll.attachPress(function (oEvent) {
				aDataTabSelSingle = []
				for (var i = 0; i < total; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
	
				oModel1.setData({
					modelData1: aDataTabSelSingle
				});
				tblTabSelSingle.setModel(oModel1);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnAddRow.attachPress(function (oEvent) {
				var oModel = new sap.ui.model.json.JSONModel();
				var idx = tblTabSelSingle.getSelectedIndex();
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
	
				var insertedData = {
					singleValue1: ""
				};
	
				// Jika tidak ada row yang dicentang maka data akan ditambahkan pada row terakhir
				(tblTabSelSingle.isIndexSelected(idx)) ? currentData.splice(idx + 1, 0, insertedData): currentData.splice(currentData.length, 0, insertedData);
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnOK.attachPress(function (oEvent) {
				//model table single val
				var model = tblTabSelSingle.getModel()
				var DataModel = model.getData()
				var dataModelLength = DataModel.modelData1.length
	
				//model table range value
				var model = tblTabSelRange.getModel()
				var DataModel = model.getData()
				var dataModelLength2 = DataModel.modelData2.length
	
				pResult.setValue("");
	
				var pTemp = [];
				var pTempModel = [];
				var dBind;
				var pTempSelRange = [];
				var check = 0;
				var item = {}
				// var checkkosong=0;
				// console.log(dataModelLength) 
				// console.log(DataModel)
				// console.log(oTabStrip.getSelectedIndex())
				// 			if (oTabStrip.getSelectedIndex() == 0) {
				if (oTabStrip.indexOfItem(SAPUI.GetCore(oTabStrip.getSelectedItem())) == 0) {
					//get data input table
					for (i = 0; i < dataModelLength; i++) {
						var cxt = tblTabSelSingle.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tblTabSelSingle.getModel().getProperty(path);
						var getValue = obj.singleValue1.trim()
						console.log("1 " + getValue)
						if (getValue != "") {
	
							pTemp.push(obj.singleValue1)
							// item.dBind=obj.singleValue1; 
							// pTempModel.push(item)
						} else {
							// checkkosong++
						}
					}
					// tblTabSelSingle.setModel(model)
	
					// if(checkkosong >=1){
					// console.log("ada yang kosng")
					// }
	
	
					console.log(pTemp)
					//check duplikat data
					var sorted_pTemp = pTemp.slice().sort();
					for (var i = 0; i < pTemp.length - 1; i++) {
						if (sorted_pTemp[i + 1] == sorted_pTemp[i]) {
							check++;
						}
	
					}
					//cek duplikat data
					if (check == 0) {
						vhfLow.setValue(pTemp[0])
						pResult.setValue(pTemp)
						console.log(pResult.getValue())
						if (pTemp.length == 0) {
							pId.setPressed(false)
						} else {
							pId.setPressed(true)
						}
	
						oDialog.close();
					} else {
						SAPUI.MessageBoxAlert("duplicate data")
	
					}
	
	
				}
	
				// else if(oTabStrip.getSelectedIndex()== 1){
				//     for (i = 0; i < dataModelLength; i++) {
				//         var cxt = tblTabSelRange.getContextByIndex(i);
				//         var path = cxt.sPath;
				//         var obj = tblTabSelRange.getModel().getProperty(path);
				//         var getValue1=obj.lowerLimit1.trim()
				//         var getValue2=obj.upperLimit1.trim()
	
	
				//         console.log(getValue1)
				//         console.log(getValue2)
				//         if(getValue1!="" && getValue2!==""){ 
	
				//             pTempSelRange.push(obj.lowerLimit1)
				//             pTempSelRange.push(obj.upperLimit1)
	
				//         }
				//     ////                      checkkosong++
				//     //                        } 
				//     }
	
				//     console.log(pTempSelRange)
				// } 
			})
	
			btnCancel.attachPress(function (oEvent) {
				pResult.setValue(pResult.getValue());
				oDialog.close();
			})
	
	
		},
		MultiSelectValue1: function (pId, judul, vhfLow, pResult) {
	
			var judul = judul.split("+")
			console.log(judul)
	
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul[0], "400px", "500px", true);
			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0);
			var tblTabSelSingle = SAPUI.Table("", "auto", 15, "Single", "Paginator", true);
			var tblTabSelRange = SAPUI.Table("", "auto", 10, "Single", "Paginator", true);
			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
			var tblTabExcludeRange = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
	
			oDialog.setShowCloseButton(false)
	
			// colom table Select Single
			var colSingleVal1 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue1", "auto", "Begin", "Begin", "", 25, "", judul[0], judul[1], "");
			//kolom range value
			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom single value exclude
			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom range value exclude
			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
	
			// declare button
			var btnOK = SAPUI.ButtonOK("");
			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
			var btnCancel = SAPUI.ButtonCancel("")
			var btnDeleteAll = SAPUI.Button("", "", "Delete All", "sap-icon://delete", false, "Reject")
			var btnDeleteRow = SAPUI.Button("", "", "Delete Row", "sap-icon://less", false, "Reject")
			var btnAddRow = SAPUI.Button("", "", "Add Row", "sap-icon://add", false, "Accept")
	
			tblTabSelSingle.addColumn(colSingleVal1)
	
			tblTabSelRange.addColumn(colLowLimit1)
			tblTabSelRange.addColumn(colUpperLimit1)
	
			tblTabExcludeSingle.addColumn(colSingleVal2)
	
			tblTabExcludeRange.addColumn(colLowLimit2)
			tblTabExcludeRange.addColumn(colUpperLimit2)
	
			var vhfLowVal = vhfLow.getValue();
			var aDataTabSelSingle = []
			var aDataTabSelRange = []
			var aDataTabExcludeSingle = []
			var aDataTabExcludeRange = []
			var tempsingle = colSingleVal1.getTemplate()
	
			var pRes = pResult.getValue().split(",");
			var pResLenght = pRes.length;
	
			//			for (var i = 0; i < pResLenght; i++) {
			//				tblTabSelSingle.setSelectedIndex(0); 
			//				aDataTabSelSingle.push({singleValue1: pRes[i]})
			//				oTabStrip.setSelectedIndex(0)
			//
			//			}
	
			//jika komponen 1 textfield tidak kosong
			//			if((vhfLowVal != "") && (vhfHighVal == "")){
			//				console.log("vhfLow : kosong")
			//fill tabstrip single value
	
			for (var i = 0; i < 10; i++) {
				if (i == 0) {
					tblTabSelSingle.setSelectedIndex(0);
					aDataTabSelSingle.push({
						singleValue1: vhfLowVal
					})
				} else if (i < pResLenght) {
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
			}
			//				for(i=0;i<10;i++){
			//					if(i==0){
			//						tblTabSelSingle.setSelectedIndex(0); 
			//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
			//					}else{
			//						aDataTabSelSingle.push({singleValue1: ""})
			//					}
			//
			//				} 
			//fil tabstrip valuerange
			for (i = 0; i < 10; i++) {
				if (i == 0) {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				} else {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				}
	
			}
			oTabStrip.setSelectedIndex(0)
	
			//			}
			//jika kedua komponen textfield tidak kosong
	
			//exclude single
			for (i = 0; i < 10; i++) {
				aDataTabExcludeSingle.push({
					singleValue2: ""
				})
			}
			//exclude range
			for (i = 0; i < 10; i++) {
				aDataTabExcludeRange.push({
					lowerLimit2: "",
					upperLimit2: ""
				})
			}
	
	
			// data table tblTabSelSingle
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				modelData1: aDataTabSelSingle
			});
			tblTabSelSingle.setModel(oModel1);
			tblTabSelSingle.bindRows("/modelData1");
	
			btnUpload.attachPress(function (oEvent) {
				Global.PasteTable(tblTabSelSingle, oModel1)
			})
	
			// data table tblTabSelRange
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData({
				modelData2: aDataTabSelRange
			});
			tblTabSelRange.setModel(oModel2);
			tblTabSelRange.bindRows("/modelData2");
	
			// data table tblTabExcludeSingle
			var oModel3 = new sap.ui.model.json.JSONModel();
			oModel3.setData({
				modelData3: aDataTabExcludeSingle
			});
			tblTabExcludeSingle.setModel(oModel3);
			tblTabExcludeSingle.bindRows("/modelData3");
	
			// data table tblTabExcludeRange
			var oModel4 = new sap.ui.model.json.JSONModel();
			oModel4.setData({
				modelData4: aDataTabExcludeRange
			});
			tblTabExcludeRange.setModel(oModel4);
			tblTabExcludeRange.bindRows("/modelData4");
	
	
			oTabStrip.createTab("Select Single Values", tblTabSelSingle)
			//sementara tidak dipakai hanya dipakai yang singgle value
			//			oTabStrip.createTab("Select Ranges", tblTabSelRange)
			//			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
			//			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
	
			oDialog.addContent(oTabStrip);
			oDialog.addButton(btnOK)
			oDialog.addButton(btnUpload)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDeleteRow)
			oDialog.addButton(btnDeleteAll)
			oDialog.addButton(btnCancel)
	
			oDialog.open();
	
			btnDeleteRow.attachPress(function (oEvent) {
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
				var oModel = new sap.ui.model.json.JSONModel();
				var selectedIndex = tblTabSelSingle.getSelectedIndices();
				var counter = 0;
				var listId = [];
				var paramDeletedId = new Object();
				var data = '';
	
				selectedIndex.forEach(function (item) {
					(currentData[(item - counter)].hasOwnProperty('singleValue1')) ? listId.push({
						id: currentData[(item - counter)].singleValue1
					}): "";
					currentData.splice(item - counter, 1);
					counter++;
				});
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnDeleteAll.attachPress(function (oEvent) {
				aDataTabSelSingle = []
				for (var i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
	
				oModel1.setData({
					modelData1: aDataTabSelSingle
				});
				tblTabSelSingle.setModel(oModel1);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnAddRow.attachPress(function (oEvent) {
				var oModel = new sap.ui.model.json.JSONModel();
				var idx = tblTabSelSingle.getSelectedIndex();
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
	
				var insertedData = {
					singleValue1: ""
				};
	
				// Jika tidak ada row yang dicentang maka data akan ditambahkan pada row terakhir
				(tblTabSelSingle.isIndexSelected(idx)) ? currentData.splice(idx + 1, 0, insertedData): currentData.splice(currentData.length, 0, insertedData);
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnOK.attachPress(function (oEvent) {
				//model table single val
				var model = tblTabSelSingle.getModel()
				var DataModel = model.getData()
				var dataModelLength = DataModel.modelData1.length
	
				//model table range value
				var model = tblTabSelRange.getModel()
				var DataModel = model.getData()
				var dataModelLength2 = DataModel.modelData2.length
	
				pResult.setValue("");
	
				var pTemp = [];
				var pTempModel = [];
				var dBind;
				var pTempSelRange = [];
				var check = 0;
				var item = {}
				// var checkkosong=0;
				// console.log(dataModelLength) 
				// console.log(DataModel)
				// console.log(oTabStrip.getSelectedIndex())
				if (oTabStrip.getSelectedIndex() == 0) {
					//get data input table
					for (i = 0; i < dataModelLength; i++) {
						var cxt = tblTabSelSingle.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tblTabSelSingle.getModel().getProperty(path);
						var getValue = obj.singleValue1.trim()
						console.log("1 " + getValue)
						if (getValue != "") {
	
							pTemp.push(obj.singleValue1)
							// item.dBind=obj.singleValue1; 
							// pTempModel.push(item)
						} else {
							// checkkosong++
						}
					}
					// tblTabSelSingle.setModel(model)
	
					// if(checkkosong >=1){
					// console.log("ada yang kosng")
					// }
	
	
					console.log(pTemp)
					//check duplikat data
					var sorted_pTemp = pTemp.slice().sort();
					for (var i = 0; i < pTemp.length - 1; i++) {
						if (sorted_pTemp[i + 1] == sorted_pTemp[i]) {
							check++;
						}
	
					}
					//cek duplikat data
					if (check == 0) {
						vhfLow.setValue(pTemp[0])
						pResult.setValue(pTemp)
						console.log(pResult.getValue())
						if (pTemp.length == 0) {
							pId.setPressed(false)
						} else {
							pId.setPressed(true)
						}
	
						oDialog.close();
					} else {
						SAPUI.MessageBoxAlert("duplicate data")
	
					}
	
	
				}
	
				// else if(oTabStrip.getSelectedIndex()== 1){
				//     for (i = 0; i < dataModelLength; i++) {
				//         var cxt = tblTabSelRange.getContextByIndex(i);
				//         var path = cxt.sPath;
				//         var obj = tblTabSelRange.getModel().getProperty(path);
				//         var getValue1=obj.lowerLimit1.trim()
				//         var getValue2=obj.upperLimit1.trim()
	
	
				//         console.log(getValue1)
				//         console.log(getValue2)
				//         if(getValue1!="" && getValue2!==""){ 
	
				//             pTempSelRange.push(obj.lowerLimit1)
				//             pTempSelRange.push(obj.upperLimit1)
	
				//         }
				//     ////                      checkkosong++
				//     //                        } 
				//     }
	
				//     console.log(pTempSelRange)
				// } 
			})
	
			btnCancel.attachPress(function (oEvent) {
				pResult.setValue(pResult.getValue());
				oDialog.close();
			})
	
	
		},
		MultiSelectText1: function (pId, judul, txfLow, pResult) {
	
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul, "400px", "500px", true);
			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0);
			var tblTabSelSingle = SAPUI.Table("", "auto", 15, "Single", "Paginator", true);
			var tblTabSelRange = SAPUI.Table("", "auto", 10, "Single", "Paginator", true);
			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
			var tblTabExcludeRange = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
	
			oDialog.setShowCloseButton(false)
	
			// colom table Select Single
			var colSingleVal1 = SAPUI.Column("Single Values", "TextField", "singleValue1", "auto", "Begin", "Begin", "", 25, "");
			//kolom range value
			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom single value exclude
			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom range value exclude
			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
	
			// declare button
			var btnOK = SAPUI.ButtonOK("");
			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
			var btnDeleteAll = SAPUI.Button("", "", "Delete All", "sap-icon://delete", false, "Reject")
			var btnDeleteRow = SAPUI.Button("", "", "Delete Row", "sap-icon://less", false, "Reject")
			var btnAddRow = SAPUI.Button("", "", "Add Row", "sap-icon://add", false, "Accept")
	
			var btnCancel = SAPUI.ButtonCancel("")
	
			tblTabSelSingle.addColumn(colSingleVal1)
	
			tblTabSelRange.addColumn(colLowLimit1)
			tblTabSelRange.addColumn(colUpperLimit1)
	
			tblTabExcludeSingle.addColumn(colSingleVal2)
	
			tblTabExcludeRange.addColumn(colLowLimit2)
			tblTabExcludeRange.addColumn(colUpperLimit2)
	
			var txfLowVal = txfLow.getValue();
			var aDataTabSelSingle = []
			var aDataTabSelRange = []
			var aDataTabExcludeSingle = []
			var aDataTabExcludeRange = []
			var tempsingle = colSingleVal1.getTemplate()
	
			var pRes = pResult.getValue().split(",");
			var pResLenght = pRes.length;
	
			//			for (var i = 0; i < pResLenght; i++) {
			//				tblTabSelSingle.setSelectedIndex(0); 
			//				aDataTabSelSingle.push({singleValue1: pRes[i]})
			//				oTabStrip.setSelectedIndex(0)
			//
			//			}
	
			//jika komponen 1 textfield tidak kosong
			//			if((vhfLowVal != "") && (vhfHighVal == "")){
			//				console.log("vhfLow : kosong")
			//fill tabstrip single value
	
			for (var i = 0; i < 10; i++) {
				if (i == 0) {
					tblTabSelSingle.setSelectedIndex(0);
					aDataTabSelSingle.push({
						singleValue1: txfLowVal
					})
				} else if (i < pResLenght) {
					aDataTabSelSingle.push({
						singleValue1: pRes[i]
					})
				} else {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
			}
			//				for(i=0;i<10;i++){
			//					if(i==0){
			//						tblTabSelSingle.setSelectedIndex(0); 
			//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
			//					}else{
			//						aDataTabSelSingle.push({singleValue1: ""})
			//					}
			//
			//				} 
			//fil tabstrip valuerange
			for (i = 0; i < 10; i++) {
				if (i == 0) {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				} else {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				}
	
			}
			oTabStrip.setSelectedIndex(0)
	
			//			}
	
			//exclude single
			for (i = 0; i < 10; i++) {
				aDataTabExcludeSingle.push({
					singleValue2: ""
				})
			}
			//exclude range
			for (i = 0; i < 10; i++) {
				aDataTabExcludeRange.push({
					lowerLimit2: "",
					upperLimit2: ""
				})
			}
	
	
			// data table tblTabSelSingle
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				modelData1: aDataTabSelSingle
			});
			tblTabSelSingle.setModel(oModel1);
			tblTabSelSingle.bindRows("/modelData1");
	
			btnUpload.attachPress(function (oEvent) {
				Global.PasteTable(tblTabSelSingle, oModel1)
			})
	
			// data table tblTabSelRange
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData({
				modelData2: aDataTabSelRange
			});
			tblTabSelRange.setModel(oModel2);
			tblTabSelRange.bindRows("/modelData2");
	
			// data table tblTabExcludeSingle
			var oModel3 = new sap.ui.model.json.JSONModel();
			oModel3.setData({
				modelData3: aDataTabExcludeSingle
			});
			tblTabExcludeSingle.setModel(oModel3);
			tblTabExcludeSingle.bindRows("/modelData3");
	
			// data table tblTabExcludeRange
			var oModel4 = new sap.ui.model.json.JSONModel();
			oModel4.setData({
				modelData4: aDataTabExcludeRange
			});
			tblTabExcludeRange.setModel(oModel4);
			tblTabExcludeRange.bindRows("/modelData4");
	
	
			oTabStrip.createTab("Select Single Values", tblTabSelSingle)
			//sementara tidak dipakai hanya dipakai yang singgle value
			//			oTabStrip.createTab("Select Ranges", tblTabSelRange)
			//			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
			//			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
	
			oDialog.addContent(oTabStrip);
			oDialog.addButton(btnOK)
			oDialog.addButton(btnUpload)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDeleteRow)
			oDialog.addButton(btnDeleteAll)
			oDialog.addButton(btnCancel)
	
			oDialog.open();
	
			btnOK.attachPress(function (oEvent) {
				//model table single val
				var model = tblTabSelSingle.getModel()
				var DataModel = model.getData()
				var dataModelLength = DataModel.modelData1.length
	
				//model table range value
				var model = tblTabSelRange.getModel()
				var DataModel = model.getData()
				var dataModelLength2 = DataModel.modelData2.length
	
				pResult.setValue("");
	
				var pTemp = [];
				var pTempModel = [];
				var dBind;
				var pTempSelRange = [];
				var check = 0;
				var item = {}
				// var checkkosong=0;
				// console.log(dataModelLength) 
				// console.log(DataModel)
				// console.log(oTabStrip.getSelectedIndex())
				if (oTabStrip.getSelectedIndex() == 0) {
					//get data input table
					for (i = 0; i < dataModelLength; i++) {
						var cxt = tblTabSelSingle.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tblTabSelSingle.getModel().getProperty(path);
						var getValue = obj.singleValue1.trim()
						console.log("1 " + getValue)
						if (getValue != "") {
	
							pTemp.push(obj.singleValue1)
							// item.dBind=obj.singleValue1; 
							// pTempModel.push(item)
						} else {
							// checkkosong++
						}
					}
					// tblTabSelSingle.setModel(model)
	
					// if(checkkosong >=1){
					// console.log("ada yang kosng")
					// }
	
	
					console.log(pTemp)
					//check duplikat data
					var sorted_pTemp = pTemp.slice().sort();
					for (var i = 0; i < pTemp.length - 1; i++) {
						if (sorted_pTemp[i + 1] == sorted_pTemp[i]) {
							check++;
						}
	
					}
					//cek duplikat data
					if (check == 0) {
						txfLow.setValue(pTemp[0])
						pResult.setValue(pTemp)
						console.log(pResult.getValue())
						if (pTemp.length == 0) {
							pId.setPressed(false)
						} else {
							pId.setPressed(true)
						}
	
						oDialog.close();
					} else {
						SAPUI.MessageBoxAlert("duplicate data")
	
					}
	
	
				}
	
				// else if(oTabStrip.getSelectedIndex()== 1){
				//     for (i = 0; i < dataModelLength; i++) {
				//         var cxt = tblTabSelRange.getContextByIndex(i);
				//         var path = cxt.sPath;
				//         var obj = tblTabSelRange.getModel().getProperty(path);
				//         var getValue1=obj.lowerLimit1.trim()
				//         var getValue2=obj.upperLimit1.trim()
	
	
				//         console.log(getValue1)
				//         console.log(getValue2)
				//         if(getValue1!="" && getValue2!==""){ 
	
				//             pTempSelRange.push(obj.lowerLimit1)
				//             pTempSelRange.push(obj.upperLimit1)
	
				//         }
				//     ////                      checkkosong++
				//     //                        } 
				//     }
	
				//     console.log(pTempSelRange)
				// } 
			})
	
			btnDeleteRow.attachPress(function (oEvent) {
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
				var oModel = new sap.ui.model.json.JSONModel();
				var selectedIndex = tblTabSelSingle.getSelectedIndices();
				var counter = 0;
				var listId = [];
				var paramDeletedId = new Object();
				var data = '';
	
				selectedIndex.forEach(function (item) {
					(currentData[(item - counter)].hasOwnProperty('singleValue1')) ? listId.push({
						id: currentData[(item - counter)].singleValue1
					}): "";
					currentData.splice(item - counter, 1);
					counter++;
				});
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnDeleteAll.attachPress(function (oEvent) {
				aDataTabSelSingle = []
				for (var i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
	
				oModel1.setData({
					modelData1: aDataTabSelSingle
				});
				tblTabSelSingle.setModel(oModel1);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnAddRow.attachPress(function (oEvent) {
				var oModel = new sap.ui.model.json.JSONModel();
				var idx = tblTabSelSingle.getSelectedIndex();
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
	
				var insertedData = {
					singleValue1: ""
				};
	
				// Jika tidak ada row yang dicentang maka data akan ditambahkan pada row terakhir
				(tblTabSelSingle.isIndexSelected(idx)) ? currentData.splice(idx + 1, 0, insertedData): currentData.splice(currentData.length, 0, insertedData);
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnCancel.attachPress(function (oEvent) {
				pResult.setValue(pResult.getValue());
				oDialog.close();
			})
	
	
		},
		MultiSelectDate1: function (pId, judul, dpLow, pResult) {
	
			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul, "400px", "500px", true);
			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0);
			var tblTabSelSingle = SAPUI.Table("", "auto", 15, "Single", "Paginator", true);
			var tblTabSelRange = SAPUI.Table("", "auto", 10, "Single", "Paginator", true);
			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
			var tblTabExcludeRange = SAPUI.Table("", "auto", 5, "Multi", "Paginator", true);
	
			oDialog.setShowCloseButton(false)
	
			// colom table Select Single
			var colSingleVal1 = SAPUI.Column("Single Values", "DatePickerInv", "singleValue1", "auto", "Begin", "Begin", "", 25, "");
			//kolom range value
			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom single value exclude
			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
			//kolom range value exclude
			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
	
			// declare button
			var btnOK = SAPUI.ButtonOK("");
			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
			var btnCancel = SAPUI.ButtonCancel("")
			var btnDeleteAll = SAPUI.Button("", "", "Delete All", "sap-icon://delete", false, "Reject")
			var btnDeleteRow = SAPUI.Button("", "", "Delete Row", "sap-icon://less", false, "Reject")
			var btnAddRow = SAPUI.Button("", "", "Add Row", "sap-icon://add", false, "Accept")
	
	
			tblTabSelSingle.addColumn(colSingleVal1)
	
			tblTabSelRange.addColumn(colLowLimit1)
			tblTabSelRange.addColumn(colUpperLimit1)
	
			tblTabExcludeSingle.addColumn(colSingleVal2)
	
			tblTabExcludeRange.addColumn(colLowLimit2)
			tblTabExcludeRange.addColumn(colUpperLimit2)
	
			var dpLowVal = dpLow.getValue();
			var aDataTabSelSingle = []
			var aDataTabSelRange = []
			var aDataTabExcludeSingle = []
			var aDataTabExcludeRange = []
			var tempsingle = colSingleVal1.getTemplate()
	
			var pRes = pResult.getValue().split(",");
			var pResLenght = pRes.length;
	
			//			for (var i = 0; i < pResLenght; i++) {
			//			tblTabSelSingle.setSelectedIndex(0); 
			//			aDataTabSelSingle.push({singleValue1: pRes[i]})
			//			oTabStrip.setSelectedIndex(0)
	
			//			}
	
			//jika komponen 1 textfield tidak kosong
			//			if((vhfLowVal != "") && (vhfHighVal == "")){
			//			console.log("vhfLow : kosong")
			//fill tabstrip single value
	
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd-MM-yyyy"
			});
	
			for (var i = 0; i < 10; i++) {
				if (i == 0) {
					tblTabSelSingle.setSelectedIndex(0);
					aDataTabSelSingle.push({
						singleValue1: dpLowVal
					})
				} else if (i < pResLenght) {
					var start_date = pRes[i]
					var date = new Date(start_date);
					var dateStr = dateFormat.format(date);
					aDataTabSelSingle.push({
						singleValue1: dateStr
					})
				} else {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
			}
			//			for(i=0;i<10;i++){
			//			if(i==0){
			//			tblTabSelSingle.setSelectedIndex(0); 
			//			aDataTabSelSingle.push({singleValue1: vhfLowVal})
			//			}else{
			//			aDataTabSelSingle.push({singleValue1: ""})
			//			}
	
			//			} 
			//fil tabstrip valuerange
			for (i = 0; i < 10; i++) {
				if (i == 0) {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				} else {
					aDataTabSelRange.push({
						lowerLimit1: "",
						upperLimit1: ""
					})
				}
	
			}
			oTabStrip.setSelectedIndex(0)
	
			//			}
	
			//exclude single
			for (i = 0; i < 10; i++) {
				aDataTabExcludeSingle.push({
					singleValue2: ""
				})
			}
			//exclude range
			for (i = 0; i < 10; i++) {
				aDataTabExcludeRange.push({
					lowerLimit2: "",
					upperLimit2: ""
				})
			}
	
	
			// data table tblTabSelSingle
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData({
				modelData1: aDataTabSelSingle
			});
			tblTabSelSingle.setModel(oModel1);
			tblTabSelSingle.bindRows("/modelData1");
	
			btnUpload.attachPress(function (oEvent) {
				Global.PasteTable(tblTabSelSingle, oModel1)
			})
	
			// data table tblTabSelRange
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData({
				modelData2: aDataTabSelRange
			});
			tblTabSelRange.setModel(oModel2);
			tblTabSelRange.bindRows("/modelData2");
	
			// data table tblTabExcludeSingle
			var oModel3 = new sap.ui.model.json.JSONModel();
			oModel3.setData({
				modelData3: aDataTabExcludeSingle
			});
			tblTabExcludeSingle.setModel(oModel3);
			tblTabExcludeSingle.bindRows("/modelData3");
	
			// data table tblTabExcludeRange
			var oModel4 = new sap.ui.model.json.JSONModel();
			oModel4.setData({
				modelData4: aDataTabExcludeRange
			});
			tblTabExcludeRange.setModel(oModel4);
			tblTabExcludeRange.bindRows("/modelData4");
	
	
			oTabStrip.createTab("Select Single Values", tblTabSelSingle)
			//sementara tidak dipakai hanya dipakai yang singgle value
			//			oTabStrip.createTab("Select Ranges", tblTabSelRange)
			//			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
			//			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
	
			oDialog.addContent(oTabStrip);
			oDialog.addButton(btnOK)
			oDialog.addButton(btnUpload)
			oDialog.addButton(btnAddRow)
			oDialog.addButton(btnDeleteRow)
			oDialog.addButton(btnDeleteAll)
			oDialog.addButton(btnCancel)
	
			oDialog.open();
	
			btnDeleteRow.attachPress(function (oEvent) {
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
				var oModel = new sap.ui.model.json.JSONModel();
				var selectedIndex = tblTabSelSingle.getSelectedIndices();
				var counter = 0;
				var listId = [];
				var paramDeletedId = new Object();
				var data = '';
	
				selectedIndex.forEach(function (item) {
					(currentData[(item - counter)].hasOwnProperty('singleValue1')) ? listId.push({
						id: currentData[(item - counter)].singleValue1
					}): "";
					currentData.splice(item - counter, 1);
					counter++;
				});
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnDeleteAll.attachPress(function (oEvent) {
				aDataTabSelSingle = []
				for (var i = 0; i < 10; i++) {
					aDataTabSelSingle.push({
						singleValue1: ""
					})
				}
	
				oModel1.setData({
					modelData1: aDataTabSelSingle
				});
				tblTabSelSingle.setModel(oModel1);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnAddRow.attachPress(function (oEvent) {
				var oModel = new sap.ui.model.json.JSONModel();
				var idx = tblTabSelSingle.getSelectedIndex();
				var currentData = JSON.parse(tblTabSelSingle.getModel().getJSON())["modelData1"];
	
				var insertedData = {
					singleValue1: ""
				};
	
				// Jika tidak ada row yang dicentang maka data akan ditambahkan pada row terakhir
				(tblTabSelSingle.isIndexSelected(idx)) ? currentData.splice(idx + 1, 0, insertedData): currentData.splice(currentData.length, 0, insertedData);
	
				oModel.setData({
					modelData1: currentData
				});
				tblTabSelSingle.setModel(oModel);
				tblTabSelSingle.bindRows("/modelData1");
			})
	
			btnOK.attachPress(function (oEvent) {
				//model table single val
				var model = tblTabSelSingle.getModel()
				var DataModel = model.getData()
				var dataModelLength = DataModel.modelData1.length
	
				//model table range value
				var model = tblTabSelRange.getModel()
				var DataModel = model.getData()
				var dataModelLength2 = DataModel.modelData2.length
	
				pResult.setValue("");
	
				var pTemp = [];
				var pTempModel = [];
				var dBind;
				var pTempSelRange = [];
				var check = 0;
				var item = {}
				// var checkkosong=0;
				// console.log(dataModelLength) 
				// console.log(DataModel)
				// console.log(oTabStrip.getSelectedIndex())
				if (oTabStrip.getSelectedIndex() == 0) {
					//get data input table
					for (i = 0; i < dataModelLength; i++) {
						var cxt = tblTabSelSingle.getContextByIndex(i);
						var path = cxt.sPath;
						var obj = tblTabSelSingle.getModel().getProperty(path);
						var getValue = obj.singleValue1.trim()
						console.log("1 " + getValue)
						if (getValue != "") {
	
							pTemp.push(obj.singleValue1)
							// item.dBind=obj.singleValue1; 
							// pTempModel.push(item)
						} else {
							// checkkosong++
						}
					}
					// tblTabSelSingle.setModel(model)
	
					// if(checkkosong >=1){
					// console.log("ada yang kosng")
					// }
	
	
					console.log(pTemp)
					//check duplikat data
					var sorted_pTemp = pTemp.slice().sort();
					for (var i = 0; i < pTemp.length - 1; i++) {
						if (sorted_pTemp[i + 1] == sorted_pTemp[i]) {
							check++;
						}
					}
					//cek duplikat data
					if (check == 0) {
						dpLow.setValue(pTemp[0])
						Global.ChangeFormatDate(dpLow)
	
						//						var pTempArr = pTemp.split(",");
						var dumm = ''
						var conv
	
						for (var i = 0; i < pTemp.length; i++) {
							pResult.setValue(pTemp[i])
							conv = Global.ChangeFormatDate(pResult)
							console.log(conv)
	
							if (i == 0 && i == (pTemp.length - 1)) {
								dumm = conv
							} else if (i == 0) {
								dumm = conv + ","
							} else if (i == (pTemp.length - 1)) {
								dumm = dumm + conv
							} else {
								dumm = dumm + conv + ","
							}
						}
	
						pResult.setValue(dumm)
						console.log(pResult.getValue())
						if (pTemp.length == 0) {
							pId.setPressed(false)
						} else {
							pId.setPressed(true)
						}
	
						oDialog.close();
					} else {
						SAPUI.MessageBoxAlert("duplicate data")
	
					}
				}
	
				// else if(oTabStrip.getSelectedIndex()== 1){
				//     for (i = 0; i < dataModelLength; i++) {
				//         var cxt = tblTabSelRange.getContextByIndex(i);
				//         var path = cxt.sPath;
				//         var obj = tblTabSelRange.getModel().getProperty(path);
				//         var getValue1=obj.lowerLimit1.trim()
				//         var getValue2=obj.upperLimit1.trim()
	
	
				//         console.log(getValue1)
				//         console.log(getValue2)
				//         if(getValue1!="" && getValue2!==""){ 
	
				//             pTempSelRange.push(obj.lowerLimit1)
				//             pTempSelRange.push(obj.upperLimit1)
	
				//         }
				//     ////                      checkkosong++
				//     //                        } 
				//     }
	
				//     console.log(pTempSelRange)
				// } 
			})
	
			btnCancel.attachPress(function (oEvent) {
				pResult.setValue(pResult.getValue());
				oDialog.close();
			})
		},
		//multiselect 1 value 
		//		MultiSelectValue1: function(pId,judul, vhfLow,pResult) {
		//
		//			var oDialog = SAPUI.Dialog("", "Multiple Selection for " + judul, "600px", "500px", true);
		//			var oTabStrip = SAPUI.TabStrip("", "100%", "auto", 0); 
		//			var tblTabSelSingle = SAPUI.Table("", "auto", 15,  "Single", "Paginator", true);
		//			var tblTabSelRange = SAPUI.Table("", "auto", 10,  "Single", "Paginator", true);
		//			var tblTabExcludeSingle = SAPUI.Table("", "auto", 5,  "Multi", "Paginator", true);
		//			var tblTabExcludeRange = SAPUI.Table("", "auto", 5,  "Multi", "Paginator", true);           
		//
		//			// colom table Select Single
		//			var colSingleVal1 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue1", "auto", "Begin", "Begin", "", 25, "", "");
		//			//kolom range value
		//			var colLowLimit1 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit1", "auto", "Begin", "Begin", "", 25, "", "");
		//			var colUpperLimit1 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit1", "auto", "Begin", "Begin", "", 25, "", "");
		//			//kolom single value exclude
		//			var colSingleVal2 = SAPUI.Column("Single Values", "ValueHelpField", "singleValue2", "auto", "Begin", "Begin", "", 25, "", "");
		//			//kolom range value exclude
		//			var colLowLimit2 = SAPUI.Column("Lower Limit", "ValueHelpField", "lowerLimit2", "auto", "Begin", "Begin", "", 25, "", "");
		//			var colUpperLimit2 = SAPUI.Column("Upper Limit", "ValueHelpField", "upperLimit2", "auto", "Begin", "Begin", "", 25, "", "");
		//
		//			// declare button
		//			var btnOK = SAPUI.ButtonOK("");
		//			var btnUpload = SAPUI.Button("", "", "Upload from clipboard", "sap-icon://copy")
		//
		//			var btnCancel = SAPUI.ButtonCancel("")
		//
		//			tblTabSelSingle.addColumn(colSingleVal1) 
		//			
		//			tblTabSelRange.addColumn(colLowLimit1)
		//			tblTabSelRange.addColumn(colUpperLimit1)
		//
		//			tblTabExcludeSingle.addColumn(colSingleVal2)
		//
		//			tblTabExcludeRange.addColumn(colLowLimit2)
		//			tblTabExcludeRange.addColumn(colUpperLimit2)            
		//
		//			var vhfLowVal = vhfLow.getValue();
		//			var aDataTabSelSingle =[]
		//			var aDataTabSelRange =[]
		//			var aDataTabExcludeSingle=[]
		//			var aDataTabExcludeRange=[]
		//			var tempsingle = colSingleVal1.getTemplate()
		//
		//			//jika komponen 1 textfield tidak kosong
		//			if(vhfLowVal == ""){
		//				vhfLowVal=""
		//				console.log("vhfLow : kosong")
		//				//fill tabstrip single value
		//				for(i=0;i<10;i++){
		//					if(i==0){
		//						tblTabSelSingle.setSelectedIndex(0); 
		//						aDataTabSelSingle.push({singleValue1: vhfLowVal})
		//					}else{
		//						aDataTabSelSingle.push({singleValue1: ""})
		//					}
		//
		//				} 
		//				//fil tabstrip valuerange
		//				for(i=0;i<10;i++){
		//					if(i==0){
		//						aDataTabSelRange.push({lowerLimit1: "", upperLimit1: ""})
		//					}else{
		//						aDataTabSelRange.push({lowerLimit1: "", upperLimit1: ""})
		//					}
		//
		//				} 
		//				oTabStrip.setSelectedIndex(0)
		//
		//			}
		//			//exclude single
		//			for(i=0;i<10;i++){
		//				aDataTabExcludeSingle.push({singleValue2: ""})
		//			} 
		//
		//
		//			// data table tblTabSelSingle
		//			var oModel1 = new sap.ui.model.json.JSONModel();
		//			oModel1.setData({modelData1: aDataTabSelSingle});
		//			tblTabSelSingle.setModel(oModel1);
		//			tblTabSelSingle.bindRows("/modelData1");
		//
		//			btnUpload.attachPress(function(oEvent){
		//				Global.PasteTable(tblTabSelSingle,oModel1)
		//			})
		//
		//			// data table tblTabSelRange
		//			var oModel2 = new sap.ui.model.json.JSONModel();
		//			oModel2.setData({modelData2: aDataTabSelRange});
		//			tblTabSelRange.setModel(oModel2);
		//			tblTabSelRange.bindRows("/modelData2");
		//
		//			// data table tblTabExcludeSingle
		//			var oModel3 = new sap.ui.model.json.JSONModel();
		//			oModel3.setData({modelData3: aDataTabExcludeSingle});
		//			tblTabExcludeSingle.setModel(oModel3);
		//			tblTabExcludeSingle.bindRows("/modelData3");
		//
		//			// data table tblTabExcludeRange
		//			var oModel4 = new sap.ui.model.json.JSONModel();
		//			oModel4.setData({modelData4: aDataTabExcludeRange});
		//			tblTabExcludeRange.setModel(oModel4);
		//			tblTabExcludeRange.bindRows("/modelData4");
		//
		//
		//			oTabStrip.createTab("Select Single Values", tblTabSelSingle)
		//			//sementara tidak dipakai hanya dipakai yang singgle value
		////			oTabStrip.createTab("Select Ranges", tblTabSelRange)
		////			oTabStrip.createTab("Exclude Single Values", tblTabExcludeSingle)
		////			oTabStrip.createTab("Exclude Ranges", tblTabExcludeRange)
		//
		//			oDialog.addContent(oTabStrip);
		//			oDialog.addButton(btnOK)
		//			oDialog.addButton(btnUpload)
		//			oDialog.addButton(btnCancel)
		//
		//			oDialog.open(); 
		//
		//			btnOK.attachPress(function(oEvent){
		//				//model table single val
		//				var model=tblTabSelSingle.getModel()
		//				var DataModel=model.getData()
		//				var dataModelLength=DataModel.modelData1.length 
		//
		//				//model table range value
		//				var model=tblTabSelRange.getModel()
		//				var DataModel=model.getData()
		//				var dataModelLength2=DataModel.modelData2.length 
		//
		//				var pTemp = []; 
		//				var pTempModel = [];
		//				var dBind;
		//				var pTempSelRange=[];
		//				var check=0;
		//				var item={}
		//				// var checkkosong=0;
		//				// console.log(dataModelLength) 
		//				// console.log(DataModel)
		//				// console.log(oTabStrip.getSelectedIndex())
		//				if(oTabStrip.getSelectedIndex()== 0){
		//					//get data input table
		//					for (i = 0; i < dataModelLength; i++) {
		//						var cxt = tblTabSelSingle.getContextByIndex(i);
		//						var path = cxt.sPath;
		//						var obj = tblTabSelSingle.getModel().getProperty(path);
		//						var getValue=obj.singleValue1.trim()
		//						console.log(getValue)
		//						if(getValue!=""){
		//
		//							pTemp.push(obj.singleValue1)
		//							// item.dBind=obj.singleValue1;
		//							// pTempModel.push(item)
		//						}else{
		//							// checkkosong++
		//						} 
		//					}
		//					// tblTabSelSingle.setModel(model)
		//
		//					// if(checkkosong >=1){
		//					// console.log("ada yang kosng")
		//					// }
		//
		//
		//					console.log(pTemp)
		//					//check duplikat data
		//					var sorted_pTemp=pTemp.slice().sort();
		//					for(var i=0;i<pTemp.length-1;i++){
		//						if(sorted_pTemp[i+1]== sorted_pTemp[i]){
		//							check++;
		//						}
		//
		//					}
		//					//cek duplikat data
		//					if(check ==0){ 
		//						vhfLow.setValue(pTemp[0])
		//						pResult.setValue(pTemp)
		//						console.log(pResult.getValue())
		//						if(pTemp.length == 0){
		//							pId.setPressed(false)   
		//						}else{
		//							pId.setPressed(true)
		//						}
		//
		//						oDialog.close();
		//					}else{
		//						SAPUI.MessageBoxAlert("duplicate data")
		//
		//					} 
		//
		//
		//				}
		//				// else if(oTabStrip.getSelectedIndex()== 1){
		//				//     for (i = 0; i < dataModelLength; i++) {
		//				//         var cxt = tblTabSelRange.getContextByIndex(i);
		//				//         var path = cxt.sPath;
		//				//         var obj = tblTabSelRange.getModel().getProperty(path);
		//				//         var getValue1=obj.lowerLimit1.trim()
		//				//         var getValue2=obj.upperLimit1.trim()
		//
		//
		//				//         console.log(getValue1)
		//				//         console.log(getValue2)
		//				//         if(getValue1!="" && getValue2!==""){ 
		//
		//				//             pTempSelRange.push(obj.lowerLimit1)
		//				//             pTempSelRange.push(obj.upperLimit1)
		//
		//				//         }
		//				//     ////                      checkkosong++
		//				//     //                        } 
		//				//     }
		//
		//				//     console.log(pTempSelRange)
		//				// } 
		//			})
		//
		//			btnCancel.attachPress(function(oEvent){ 
		//				oDialog.close();
		//			})
		//		},
	
		//Error Message yang ditampilkan untuk dihalaman selanjutnya 
		GetMessage: function (msgHeader) {
			var wsUrl = urlWebservice + "ZUX_Message_v2";
			var objectJSON = JSON.stringify(msgHeader)
			var oModelMsg = new sap.ui.model.json.JSONModel([]);
	
			function getErrorMsg() {
				return $.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: objectJSON,
					async: false,
					success: function (result) {
						console.log(result)
						oModelMsg.setData(result)
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log('Error');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				}).responseText;
			}
			console.log(getErrorMsg())
	
			var obj = JSON.parse(getErrorMsg());
			var msg = obj.ZUX_Message_v2Result[0].Desc
	
			return msg;
		},
		/**
		 * Change format date to dd-MM-yyyy (Frontend Display)
		 * @param {Date} date
		 */
		// FmtDateUI: function (date) {
		// 	if (date instanceof Date) {
		// 		let resDate
		// 		//offset in milliseconds
		// 		var tzoffset = (new Date()).getTimezoneOffset() * 60000;
		// 		// Substract date with TimeZone offset -> Remove Timestamp -> Split to Rearrange
		// 		var date = (new Date(date - tzoffset)).toISOString().split("T")[0].split("-");
		// 		resDate = [date[2], date[1], date[0]].join("-") // Join with " - "
		// 		return resDate
		// 	} else {
		// 		return date
		// 	}
		// },
		//change format date to yyyy-mm-dd
		ChangeFormatDate: function (pCompDatepicker) {
			var getDpValue = pCompDatepicker.getValue()
			var rearrange = ""
			if (getDpValue == "") {
				rearrage = ""
			} else {
				var splitValue = getDpValue.split('.')
				console.log(splitValue)
				rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('-')
			}
			return rearrange
		},
		// ChangeFormatDateOracle: function (pCompDatepicker) {
		// 	var getDpValue = pCompDatepicker.getValue()
		// 	var rearrange = ""
		// 	if (getDpValue == "") {
		// 		rearrage = ""
		// 	} else {
		// 		var splitValue = getDpValue.split('.')
		// 		rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('')
		// 	}
	
		// 	return rearrange
		// },
		//only value
		ChangeFormatDateValue: function (pCompDatepicker) {
			var getDpValue = pCompDatepicker
			var rearrange = ""
			if (getDpValue == "") {
				rearrage = ""
			} else {
				var splitValue = getDpValue.split('.')
				rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('-')
			}
			console.log(rearrange)
			return rearrange
		},
		OutputDateFormatter: function (value, removeT = false) {
			if (value) {
				if (value.includes("T")) {
					var removeTimestamp = value.split("T")[0]
					var date = removeTimestamp.split("-")
					if (removeT) {
						return removeTimestamp
					} else {
						return date[2] + "." + date[1] + "." + date[0]
					}
				} else {
					if (value.includes("-")) {
						var date = value.split("-")
						return date[2] + "." + date[1] + "." + date[0]
					} else if (value.includes(".")) {
						var date = value.split(".")
						return date[2] + "-" + date[1] + "-" + date[0]
					}
				}
			} else {
				return ""
			}
		},
		//only value
		// ChangeFormatDateValueINV: function (pCompDatepicker) {
		// 	var getDpValue = pCompDatepicker
		// 	var rearrange = ""
		// 	if (getDpValue == "") {
		// 		rearrage = ""
		// 	} else {
		// 		var splitValue = getDpValue.split('-')
		// 		rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('-')
		// 	}
		// 	console.log(rearrange)
		// 	return rearrange
		// },
		ChangeFormatDateValueDotSeparator: function (pCompDatepicker) {
			var getDpValue = pCompDatepicker
			var rearrange = ""
			if (getDpValue == "") {
				rearrage = ""
			} else {
				var splitValue = getDpValue.split('-')
				rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('.')
			}
			console.log(rearrange)
			return rearrange
		},
		// ChangeFormatDateTable: function (pCompDatepicker) {
		// 	var getDpValue = pCompDatepicker
		// 	var rearrange = ""
		// 	if (getDpValue == "") {
		// 		rearrage = ""
		// 	} else {
		// 		var splitValue = getDpValue.split('-')
		// 		rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('-')
		// 	}
		// 	console.log(rearrange)
		// 	return rearrange
		// },
	
		//change format date to yyyy-mm-dd from variable
		ChangeFormatDateFromVar: function (pCompDatepicker) {
			var getDpValue = pCompDatepicker
			var rearrange = ""
			if (getDpValue == "") {
				rearrage = ""
			} else {
				var splitValue = getDpValue.split('.')
				console.log(splitValue)
				rearrange = [splitValue[2], splitValue[1], splitValue[0]].join('-')
			}
			return rearrange
		},
		// ===== fungsi display error message ===== //
		displayErrorMessage: function (idError, additionalValue) {
			var msgHeader = [];
			var msgItem = new Object();
	
			msgItem["idMessage"] = idError;
			msgItem["Value"] = additionalValue;
			msgItem["idLang"] = languageUX5;
			msgHeader.push(msgItem);
			SAPUI.ErrorMessageView(msgHeader);
		},
		//cek field from is greater than lower
		//@mode 'Date' utk tangggal
		//@mode 'Time' utk jam
		//@mode "" utk alphabet & alphanumeric
		//@pComponen1 component From
		//@pComponen2 component To
		isParameterToValid: function (mode, pComponen1, pComponen2) {
			var array = new Array()
			var pComp1 = pComponen1.getValue().trim()
			var pComp2 = pComponen2.getValue().trim()
	
			pComponen1.setValueState(sap.ui.core.ValueState.None);
			pComponen2.setValueState(sap.ui.core.ValueState.None);
	
			// labelMsg.setText("");
			// labelIcon.setIcon("");
	
			function convTglToInt(pComponen) {
				var hariVisit = pComponen.substring(0, 2);
				var bulanVisit = pComponen.substring(3, 5);
				var tahunVisit = pComponen.substring(6);
				var tanggal = tahunVisit + bulanVisit + hariVisit;
				// Hasilnya : YyyyMmDd
				return tanggal;
			}
	
			function convTimeToInt(pComponen) {
				var jam = pComponen.substring(0, 2)
				var menit = pComponen.substring(3, 5)
				var detik = pComponen.substring(6)
				var waktu = jam + menit + detik
	
				return waktu
			}
	
			if (mode == "Time") {
				pComp1 = Global.convertedTimePicker(pComp1)
				pComp2 = Global.convertedTimePicker(pComp2)
	
				pComp1 = convTimeToInt(pComp1)
				pComp2 = convTimeToInt(pComp2)
			} else if (mode == "Date") {
				console.log(pComp1)
				console.log(pComp2)
				pComp1 = convTglToInt(pComp1)
				pComp2 = convTglToInt(pComp2)
				console.log(pComp1)
				console.log(pComp2)
			}
	
			if (pComp1 != "" && pComp2 != "") {
				array.push(pComp1)
				array.push(pComp2)
	
				if (!(isNaN(pComp1)) && !(isNaN(pComp2))) { //jika kedua input berupa number
					array.sort(function (a, b) {
						return a - b
					})
				} else {
					array.sort()
				}
	
				if (array.indexOf(pComp1) > array.indexOf(pComp2)) {
					// SAPUI.ErrorMessageView("E0007", "")
					SAPUI.MessageBoxWarning("Check your Input!")
					pComponen1.setValueState(sap.ui.core.ValueState.Error)
					pComponen2.setValueState(sap.ui.core.ValueState.Error)
					return false
				}
			}
	
			return true
		},
		convertedTimePicker: function (pComponen) {
			return new Date(new Date().toDateString() + ' ' + pComponen).toTimeString().split(' ')[0]
		},
		//cek validasi decimal 11,232,345.000
		isDecimal: function (pComponent) {
			var expression = /(?=.)^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]+)?$/;
			var input = pComponent.getValue().trim();
	
			labelMsg.setText("");
			labelIcon.setIcon("");
			pComponent.setValueState(sap.ui.core.ValueState.None);
			if (!(input.match(expression))) {
				SAPUI.ErrorMessageView("GL00001", "_,___,__~.__");
	
				pComponent.setValueState(sap.ui.core.ValueState.Error);
				return false;
			}
			return true;
		},
		//Error message for validation database
		/*To Formating parameter send to WS
		 * @strMethod nama method yang ada di WS
		 * @dynamicParam digunakan untuk menyimpan parameter yang dibutuhkan SP & diconvert ke JSON string
		 * */
		dynamicParam: function (strMethod, objParam, objParamTable) {
			//			console.log(objParamTable)
			if (objParamTable == undefined) {
				return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + '}';
			} else {
				return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + ', "ParamTable": ' + JSON.stringify(objParamTable) + '}';
			}
		},
		/*
		 * function untuk report get data from oracle
		 * */
		dynamicParamOracle: function (strMethod, objParam, objParam2, objParamTable) {
			console.log(objParamTable)
			if (objParamTable == undefined) {
				return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + ', "dynamicParam2": ' + JSON.stringify(objParam2) + '}';
			} else {
				return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + ', "dynamicParam2": ' + JSON.stringify(objParam2) + ', "ParamTable": ' + JSON.stringify(objParamTable) + '}';
			}
		},
		/*To deserialize result from ajax 
		 * @ajaxResult parameter yang berisi hasil dari ajax
		 * */
		dynamicDeserialize: function (ajaxResult) {
			var tempResult,
				retVal = new Array();
	
			// perbaikan kode jika result dari ajax cuma string kosong ("") maka tidak akan terjadi error
			// biasanya return string kosong ("") terjadi jika koneksi putus dan/atau
			// di error handling WS tidak dikasih pengondisian (di catch nya)
			for (var key in ajaxResult) {
				tempResult = (ajaxResult[key] != "") ? JSON.parse(ajaxResult[key]) : new Object();
			}
	
			// kalo WSnya error (masuk catch)
			// munculin Alert
			if ("exceptionErrorStatus" in tempResult) {
				SAPUI.MessageBoxAlert("Web Service error: " + tempResult.message);
				return retVal;
			}
	
			for (var tempKey in tempResult) {
				retVal.push(tempResult[tempKey]);
			}
	
			return retVal;
		},
		// error handle untuk WS dengan result string
		errorHandlingWS: function (ajaxResult) {
			var tempResult;
	
			for (key in ajaxResult) {
				tempResult = (ajaxResult[key] != "") ? JSON.parse(ajaxResult[key]) : new Object();
			}
	
			if ("exceptionErrorStatus" in tempResult) {
				SAPUI.MessageBoxAlert("Web Service error: " + tempResult.message);
				return false;
			}
	
			return true;
		},
		F4FilterValidation: function (filter, filter2, comp1, compDependency, errCode, errCodeValue) {
	
			SAPUI.ErrorMessageView("", "");
	
	
			var compDependencyVal = (compDependency == "") ? "" : compDependency.getValue();
	
			var value = comp1.getValue().split(",");
			var wsUrl = WS_User + "WS_UC_Misc";
			var param = {
				Field: filter,
				OnProses: filter2,
				Values: compDependencyVal
			}
	
			var pAjax = Global.dynamicParam("DspValueHelp", param)
	
			if (value != "") {
				$.ajax({
					url: wsUrl,
					type: "POST",
					dataType: 'json',
					data: pAjax,
					success: function (result) {
	
						var deserilizeResult = Global.dynamicDeserialize(result),
							tableContent = (deserilizeResult.length) ? deserilizeResult[0] : [],
							ResultLength = tableContent.length,
							valid = 0,
							BreakException = {}
	
						if (ResultLength > 0) {
							try {
								for (var i = 0; i < value.length; i++) {
									valid = 0;
	
									tableContent.forEach(function (item) {
										if (item[Object.keys(item)[0]] == value[i].trim()) {
											valid = 1
										}
									});
	
									if (valid == 0) throw BreakException;
								}
	
							} catch (e) {
								if (e !== BreakException) throw e
							}
						}
	
						if (valid == 0) {
							SAPUI.ErrorMessageView(errCode, errCodeValue);
							comp1.setValueState(sap.ui.core.ValueState.Error)
						} else {
							comp1.setValueState(sap.ui.core.ValueState.Success)
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
					}
				})
			} else {
				comp1.setValueState()
			}
		},
		// ChangeDatetoSQLformat: function (stringDate) {
		// 	if (stringDate != "") {
		// 		var date = stringDate.split(".");
		// 		return date[2] + "-" + date[1] + "-" + date[0];
		// 	}
		// 	return ' '
		// },
		// ChangeDateStringFormat: function (stringDate) {
		// 	var date = stringDate.split(".");
		// 	return date[2] + "" + date[1] + "" + date[0];
		// },
		LockData: function (Tcode, Param, Value, Flag) {
			var wsUrl = WS_User + "WS_UC_UserActivity";
			var valFlag
			if (Flag == "Open") {
				valFlag = "X"
			} else if (Flag == "Lock") {
				valFlag = ""
			} else if (Flag == "Cek") {
				valFlag = "Cek"
			}
	
	
			var param = {
				Flag: valFlag,
				Username: U5312UX5,
				IP: ClientIP,
				TCode: Tcode,
				Parameter: Param,
				Value: Value
	
			}
			console.log(param)
			var paramAjax = Global.dynamicParam("LockData", param)
	
			$.ajax({
				url: wsUrl,
				type: 'post',
				dataType: 'json',
				data: paramAjax,
				async: false,
				success: function (data) {
					console.log(data)
				},
				error: function (jqXHR, textStatus, errorThrown) {
					loading.close()
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
	
				}
	
			})
	
		},
		timeConverter: function (time) {
			var PM = time.match('PM') ? true : false
	
			time = time.split(':')
			var min = time[1]
	
			if (PM) {
				var hour = 12 + parseInt(time[0], 10)
				var sec = time[2].replace('PM', '')
				if (hour == 24) {
					hour = 12
				}
			} else {
				var hour = ("0" + time[0]).slice(-2)
				var sec = time[2].replace('AM', '')
			}
	
			var time = hour + ':' + min + ':' + sec
			console.log(time)
			return time.trim()
	
		},
		/*
		 * fungsi untuk mengambil id dan value dari 1 halaman sapui5
		 * Global.getAllID()
		 * $(document).keydown($.proxy(function(evt) { if(evt.keyCode==113){ Global.getAllID2(); }}));
	
		 * */
		getAllID: function () {
			//Get Actived ID
			var IDsA = [];
			var ScreenId;
			$("#appId").find("div").each(function () {
				if ($(this).attr("class") == "sapMNavItem sapUiJSView sapUiSizeCompact sapUiView") {
					IDsA.push($(this).attr("id"));
				}
			});
			ScreenId = IDsA[0];
			console.log(ScreenId)
			//Get Actived ID			
	
			console.log("------ID Label,Radio,CheckBox------");
	
			//Get Label ID
			var IDsL = [];
			var nameL = [];
			$("#" + ScreenId).find("label").each(function () {
				var getParentID = $(this).parent().attr('class');
				if (getParentID != "sapUiTableColCell") {
					IDsL.push($(this).attr("id"));
					nameL.push($(this).text());
				}
			});
			console.log(IDsL.join("\n"))
			console.log(nameL.join("\n"))
			//Get Label ID
	
			console.log("------ID Kolom Tabel------");
			IDsK = [];
			nameK = [];
			//Get Column ID
			$("#" + ScreenId).find("td").each(function () {
				if ($(this).attr("class") == "sapUiTableCol") {
					IDsK.push($(this).attr("id"));
					nameK.push($(this).text());
				}
			});
			console.log(IDsK.join("\n"))
			console.log(nameK.join("\n"))
			//Get Column ID
	
			//---------------------------------------------------------
	
			var IDsAD = [];
			var ScreenIdDialog;
			$("#sap-ui-static").find("div").each(function () {
				if ($(this).attr("class") == "sapUiDlgCont") {
					IDsAD.push($(this).attr("id"));
				}
			});
			ScreenIdDialog = IDsAD[0];
			console.log(ScreenIdDialog)
			//Get Actived ID			
	
			console.log("------Dialog------");
	
			//Get Label ID
			var IDsDL = [];
			var nameDL = [];
			$("#" + ScreenIdDialog).find("label").each(function () {
				IDsDL.push($(this).attr("id"));
				nameDL.push($(this).text());
			});
			console.log(IDsDL.join("\n"))
			console.log(nameDL.join("\n"))
		},
		InsertSessionUser: function (searchTcode, tcodeInduk) {
			var oThis = this;
			var loading = SAPUI.BusyDialog();
			var wsUrl = WS_User + "WS_UC_UserActivity";
	
			var today = this.getNow().today;
			var time = this.getNow().time;
	
			var getHostname = window.location.hostname;
			var session = this.tokenParser().session;
	
			var tbl_SYS_UserSession = [];
	
			tbl_SYS_UserSession.push({
				User: U5312UX5,
				IPHostname: ClientIP,
				Hostname: getHostname,
				Transaction: searchTcode,
				EnteredOn: today,
				EnteredAt: time,
				Session: session
			});
	
			var paramExec = {
				Tbl_SessionActive: JSON.stringify({
					ZUXType_SYS_UserSession: tbl_SYS_UserSession
				}),
				Flag: " "
			};
	
			var dynamicParamDev = Global.dynamicParam("InsertSession", paramExec);
			console.log("ISI DARI PARAMEXEC", dynamicParamDev)
			loading.open()
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: dynamicParamDev,
				success: function (result) {
					loading.close()
					var resultParse = Global.dynamicDeserialize(result);
					console.log(resultParse)
					if (resultParse[0][0].Return == '1') {
						oThis.InsLogActivity(searchTcode);
						console.log(tcodeInduk)
						sap.m.URLHelper.redirect(tcodeInduk + ".html");
					} else {
						console.log("kesalahan insert session")
	
					}
	
				},
				error: function (jqXHR, textStatus, errorThrown) {
					loading.close()
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
				}
			});
	
		},
		InsLogActivity: async function (searchTcode, msg = "") {
			if (searchTcode == "") {
				searchTcode = Global.getCurrentRoute()
			}
			var today = this.GetDate()
			var time = this.getNow().time
			var username = window.localStorage.getItem('User');
	
			// var increment = window.sessionStorage.tab == undefined ? 1 : window.sessionStorage.tab;
			// var tokenIn = username + "-NT-" + searchTcode + "-" + today + "-" + time + "-" + increment
	
			if (msg == "") {
				msg = searchTcode + " Started"
			}
	
			var ipnhostname = await Global.GetIPHostNameFromWS()
			var hostname = ipnhostname["hostname"]
			var ip = ipnhostname["ip"]
	
			var paramUser = {
				EnteredOnIn: today,
				EnteredAtIn: time,
				UserIn: username,
				IPHostnameIn: ip,
				HostnameIn: hostname,
				TransactionIn: searchTcode,
				PlatformIn: PLATFORM,
				TokenIn: "",
				MessageIn: msg
			}
	
			try {
				var result = await fetchApi({
					// var result = promiseApi({
					url: WS_SY + "WS_UC",
					body: paramUser,
					method: 'InsLogActivity'
				})
	
				window.sessionStorage.setItem("tcode_now", searchTcode);
				// window.sessionStorage.setItem("token_now", tokenIn);
				// 			console.log(result);
			} catch (error) {
				console.log(error)
			}
		},
		GetAuthTcode: function (tcode) {
			if (tcode == 'Login' || tcode == 'Dashboard' || tcode == "404" || tcode == "503" || tcode == 'Trx') {
				return true
			}
			const menus = JSON.parse(window.localStorage.getItem("menus"))
			let allowed = false
			if (menus) {
				const userMenu = menus[1]
				const findTcode = userMenu.find(el => tcode.includes(el["pressGnt"]))
				if (findTcode) {
					allowed = true
				}
			}
			return allowed
		},
	
		ConvertPipeline: function (string = "") {
			if (string) {
				if (string.includes("|")) {
					return string.replace(/\|/g, "\n")
				} else if (string.includes("\n")) {
					return string.replace(/\n/g, "|")
				} else {
					return string
				}
			}
			return ""
		},
	
		removeComma: function (string) {
	
			return string.replace(/,/g, "");
		},
		isFilled: function (boom) {
			return boom != null && typeof boom != 'undefined'
		},
		removeCommas: function (str) {
			var result = 0
			if (this.isFilled(str)) {
				str = str.toString()
				var tempResult = Number(str.replace(/,/g, ''))
				if (!isNaN(tempResult)) {
					result = tempResult
				}
			}
			return result
		},
		onCheckAuth: function (viewName) {
			if (viewName.toString().includes("Maintenance")) {
	
			} else {
				if (viewName.toString().includes("Dashboard")) {
					if (UserLS() == null || JSON.parse(window.localStorage.getItem("dataTile")) == null) {
						alert("you have been logged out")
						Global.Logout();
					}
				} else {
					if (UserLS() == null || JSON.parse(window.localStorage.getItem("dataTile")) == null) {
						alert("you have been logged out")
						Global.Logout();
					} else {
						var dataTile = JSON.parse(window.localStorage.getItem("dataTile")).Tiles;
						var pass = 0
						//using window.location.path or window.location.href to get the view name
						for (var i = 0; i < dataTile.length; i++) {
							var secondKey = Object.keys(dataTile[i])[1]
							for (var j = 0; j < dataTile[i][secondKey].length; j++) {
								var tcode = dataTile[i][secondKey][j].pressGnt
								if (viewName.split('/').splice(-1, 1).toString().split('.')[0] == tcode) {
									pass = 1
									break;
								}
							}
						}
	
						if (pass == 0) {
							alert("you dont have access")
							sap.m.URLHelper.redirect("index.html");
						} else {
							if (window.location.hash == "") {
								// alert("insert!")
							}
						}
					}
				}
			}
		},
		IsUserActive: function () {
			try {
				var wsUrl = WS_User + "WS_UC_UserActivity"
				var paramUser = {
					filter: ""
				};
				var param = Global.dynamicParam("DspListUserActive", paramUser);
	
				var dlgConfirm = SAPUI.Dialog("", "Warning!", "25%", "25%", true);
				var mtrConfirm = SAPUI.Matrix("", "auto", false, [], 2);
	
				var lblConfirm01 = SAPUI.Label("", "", "", "");
				var btnAccept = SAPUI.Button("", "", "", "sap-icon://accept", false, "Accept");
	
				mtrConfirm.createRow(lblConfirm01);
				dlgConfirm.addContent(mtrConfirm)
				dlgConfirm.addButton(btnAccept);
	
				btnAccept.attachPress(function () {
					Global.Logout();
				})
	
				$.ajax({
					url: wsUrl,
					type: "post",
					dataType: "json",
					data: param,
					success: function (result) {
						var resultData = Global.dynamicDeserialize(result);
						var flag = 1;
	
						for (i = 0; i < resultData.length; i++) {
							if (resultData[i].Username == U5312UX5) {
								if (resultData[i].IP == ClientIP) {
									break;
								} else {
									flag = 0;
									var data = {
										userName: resultData[i].Username,
										IP: resultData[i].IP,
										date: resultData[i].EnteredOn,
										time: resultData[i].EntereAt
									}
									break;
								}
							}
						}
	
						if (flag == 0) {
							lblConfirm01.setText("Anda telah dikick oleh IP " + data.IP);
							dlgConfirm.open();
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						loading.close()
						SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
					}
				});
	
			} catch (err) {
				SAPUI.MessageBox(err, "Error", "INFORMATION", "");
			}
		},
		getNow: function () {
			var now = new Date();
			var dd = now.getDate();
			var mm = now.getMonth() + 1; //January is 0!
			var yyyy = now.getFullYear();
			var today = yyyy + "." + mm + "." + dd;
			var time = now.toString().split(" ")[4];
			return {
				today: today,
				time: time
			};
		},
		onFocusInsSession: function (searchTcode) {
			var oThis = this;
			var wsUrl = WS_User + "WS_UC_UserActivity";
			var today = this.getNow().today;
			var time = this.getNow().time;
			var getHostname = window.location.hostname;
			var tbl_SYS_UserSession = [];
			var session = this.tokenParser().session;
			tbl_SYS_UserSession.push({
				User: U5312UX5,
				IPHostname: ClientIP,
				Hostname: getHostname,
				Transaction: searchTcode,
				EnteredOn: today,
				EnteredAt: time,
				Session: session
			});
	
			var paramExec = {
				Tbl_SessionActive: JSON.stringify({
					ZUXType_SYS_UserSession: tbl_SYS_UserSession
				}),
				Flag: " "
			};
	
			var dynamicParamDev = Global.dynamicParam("InsertSession", paramExec);
			console.log("ISI DARI PARAMEXEC", dynamicParamDev)
			$.ajax({
				url: wsUrl,
				type: "POST",
				dataType: 'json',
				data: dynamicParamDev,
				success: function (result) {
					var resultParse = Global.dynamicDeserialize(result);
					console.log(resultParse)
					if (resultParse[0][0].Return == '1') {
						console.log("Insert Session berhasil");
					} else {
						console.log("kesalahan insert session");
					}
	
				},
				error: function (jqXHR, textStatus, errorThrown) {
					SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
				}
			});
		},
		tokenParser: function () {
			var tokenNow = window.sessionStorage.getItem('token_now')
			if (tokenNow === undefined || tokenNow === null || tokenNow === '') {
				return null;
			} else {
				var token = tokenNow.split("-");
				return {
					username: token[0],
					status: token[1],
					tcode: token[2],
					date: token[3],
					time: token[4],
					session: token[5]
				};
			}
		},
		tabCount: function () {
			return parseInt(window.localStorage.getItem('tab_count'));
		},
		// to know last instance to add just leave it blank param, and give it false if delete
		tabCounter: function (isOpen = true) {
			var count = parseInt(window.localStorage.getItem('tab_count'));
			if (isOpen) {
				window.localStorage.setItem('tab_count', count + 1);
			} else {
				window.localStorage.setItem('tab_count', count - 1);
			}
		},
		left: function (str) {
			const length = 37
			if (typeof str == 'string' && str.length > length) {
				return str.substr(0, length) + "..."
			} else {
				return str
			}
		},
		numberWithCommas: function (inputText) {
			inputText = inputText == null ? "" : inputText
			var str = inputText.toString().split('.');
			var commaPattern = /(\d+)(\d{3})(\.\d*)*$/;
			var callback = function (match, p1, p2, p3) {
				return p1.replace(commaPattern, callback) + ',' + p2 + (p3 || '');
			};
			str[0] = str[0].toString().replace(commaPattern, callback);
			return str.join('.');
		},
		//format date MM-dd-yyyy
		// dateWithFormat: function (inputDate) {
		// 	if (inputDate != null && inputDate != "") {
		// 		inputDate = inputDate.split("T")
		// 		inputDate[0] = inputDate[0].split("-")
		// 		return inputDate[0][2] + "-" + inputDate[0][1] + "-" + inputDate[0][0]
		// 	} else {
		// 		return ""
		// 	}
		// },
	
		// //format date dd-MM-yyyy
		// dateWithFormatInput: function (inputDate) {
		// 	if (inputDate != null) {
		// 		inputDate = inputDate.split("T")
		// 		inputDate[0] = inputDate[0].split("-")
		// 		return inputDate[0][1] + "-" + inputDate[0][0] + "-" + inputDate[0][2]
		// 	} else {
		// 		return ""
		// 	}
		// },
	
		// dateWithFormatToCSV: function (inputDate) {
		// 	splittedDate = inputDate.split("-")
		// 	return splittedDate[1] + "-" + splittedDate[0] + "-" + splittedDate[2]
		// },
		consoleParam: function (pRequest) {
			var body = sanitize( // Sanitize User Inputs
				Global.dynamicParam( // Parsing to Acceptable Format for WS
					pRequest.method,
					typeof pRequest.body == 'string' ? // Check if body require to Parse (Must Object)
					JSON.parse(pRequest.body) : pRequest.body
				)
			)
			return console.log('%c Dynamic Param LOG 😃', 'color:green', body)
		},
		openIDB: function (dname, sname) {
			return new Promise(function (resolve) {
				var r = window.indexedDB.open(dname)
				r.onsuccess = function () {
					var idb = r.result
					let tactn = idb.transaction(sname, "readwrite")
					var store = tactn.objectStore(sname)
	
					resolve(idb)
				}
				r.onerror = function (e) {
					console.log("Enable to access IndexedDB, " + e.target.errorCode)
				}
			})
		},
		importIDB: function (dname, sname, arr) {
			var loading
			sap.ui.getCore().attachInit(function () {
				loading = SAPUI.BusyDialog();
				loading.open()
			});
			return new Promise(function (resolve) {
				var r = window.indexedDB.open(dname)
				r.onupgradeneeded = function () {
					var idb = r.result
					var store = idb.createObjectStore(sname, {
						autoIncrement: true
					})
				}
				r.onsuccess = function () {
					var idb = r.result
					let tactn = idb.transaction(sname, "readwrite")
					var store = tactn.objectStore(sname)
					for (var obj of arr) {
						store.put(obj)
					}
					// if(loading){
					// 	debugger
					// 	loading.close()
					// }
					loading.close()
					resolve(idb)
				}
				r.onerror = function (e) {
					console.log("Enable to access IndexedDB, " + e.target.errorCode)
					loading.close()
				}
			})
		},
		getObjectStore: function (db, store_name, mode) {
			var tx = db.transaction(store_name, mode);
			return tx.objectStore(store_name);
		},
		readAll: function (db, store_name) {
			//Create an array
			var peopleArray = new Array();
			//Get the ObjectStore
			objectStore = Global.getObjectStore(db, store_name, 'readwrite')
	
			//Open the Cursor on the ObjectStore
			objectStore.openCursor().onsuccess = function (event) {
				var cursor = event.target.result;
				console.log(cursor)
				//If there is a next item, add it to the array
				if (cursor) {
					peopleArray.push(cursor.value);
					cursor.continue();
				}
				//else get an alert informing you that it is done
				else {
					console.log("All done:");
				}
			};
			return peopleArray
		},
		clearObjectStore: function (db, store_name) {
			//Get the ObjectStore
			var store = Global.getObjectStore(db, store_name, 'readwrite')
			//Clear the ObjectStore
			var req = store.clear();
			//Success Handler
			req.onsuccess = function (event) {
				console.log("clear successful")
			};
			//Error Handler
			req.onerror = function (event) {
				console.log("clear failed")
			};
		},
		deleteIndexedDB: function (databaseName) {
			var req = window.indexedDB.deleteDatabase(databaseName);
	
			req.onsuccess = function () {
				console.log("Deleted database successfully");
			};
			req.onerror = function () {
				console.log("Couldn't delete database");
			};
			req.onblocked = function () {
				console.log("Couldn't delete database due to the operation being blocked");
			};
		},
		insertIDB: async function (obj) {
			const {
				databaseName,
				data
			} = obj
			const objectStore = databaseName + '_store'
	
			await this.dropIDB(databaseName)
	
			// let db = await idb.openDB(databaseName, 1, 
			// 	upgrade => upgrade.createObjectStore(objectStore, { autoIncrement: true }))
	
			// let tx = db.transaction(objectStore, 'readwrite')
			// let store = tx.objectStore(objectStore)
	
			// for (var row of data) {
			// 	await store.put(row)
			// }
			// await tx.complete
	
			// db.close()
			return new Promise(function (resolve) {
				var r = window.indexedDB.open(databaseName)
				r.onupgradeneeded = function () {
					var idb = r.result
					var store = idb.createObjectStore(objectStore, {
						autoIncrement: true
					})
				}
				r.onsuccess = function () {
					var idb = r.result
					let tactn = idb.transaction(objectStore, "readwrite")
					var store = tactn.objectStore(objectStore)
					for (var row of data) {
						store.put(row)
					}
					resolve(idb)
				}
				r.onerror = function (e) {
					alert("Enable to access IndexedDB, " + e.target.errorCode)
				}
			})
		},
		getIDB: async function (databaseName) {
			const objectStore = databaseName + '_store'
			let db = await idb.openDB(databaseName, 1)
			let tx = db.transaction(objectStore, 'readonly')
			let store = tx.objectStore(objectStore)
	
			// add, clear, count, delete, get, getAll, getAllKeys, getKey, put
			let allSavedItems = await store.getAll()
	
			// console.log(allSavedItems)
	
			db.close()
	
			return allSavedItems
		},
		appendIDB: async function (obj) {
			const {
				databaseName,
				data
			} = obj
			const objectStore = databaseName + '_store'
			let db = await idb.open(databaseName, 1,
				upgradeDB => upgradeDB.createObjectStore(objectStore, {
					autoIncrement: true
				}))
	
			let tx = db.transaction(objectStore, 'readwrite')
			let store = tx.objectStore(objectStore)
	
			for (var row of data) {
				await store.put(row)
			}
	
			await tx.complete
			db.close()
		},
		dropIDB: async function (databaseName) {
			idb.deleteDB(databaseName)
		},
		dynamicParamImages: function (strMethod, objParam, objImages) {
			return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + ', "Images": ' + JSON.stringify(objImages) + '}';
		},
		//-------------------------- LOCKING AREA ---------------------------------
		// LockingTCodeSeperate: function (pTCodes) {
	
		// 	var pTcode = pTCodes.toString();
		// 	var splTCodes = pTCodes.toString().split("_");
		// 	if (splTCodes.length <= 1) {
		// 		var tmpTCodes = pTCodes.toString().split(".");
		// 		pTcode = tmpTCodes[0] + "_01";
		// 	}
	
		// 	return pTcode;
		// },
		// LockingCheck: function () {
		// 	var sesLocking = JSON.parse(window.sessionStorage.getItem("LockingTCode"));
		// 	if (sesLocking) {
		// 		var recentPage = this.LockingTCodeSeperate(location.href.split("/").slice(-1));
		// 		var sesPage = this.LockingTCodeSeperate(sesLocking.Page);
		// 		if (sesPage == recentPage) {
		// 			Global.DeleteLockingTCode(); //locking
		// 		}
		// 	}
		// },
		// LockingTCode: function (pParam, pJenis, pOriginTcode) {
		// 	var pUser = window.localStorage.getItem("User")
		// 	var TCodes = "";
		// 	if (pOriginTcode) {
		// 		TCodes = pOriginTcode;
		// 	} else {
		// 		TCodes = "" + location.href.split("/").slice(-1);
		// 	}
		// 	var splitTcode = this.LockingTCodeSeperate(TCodes);
		// 	console.log(splitTcode)
	
		// 	var oThis = this;
		// 	var wsUrl = WS_SY + "WS_SP_LockingData";
		// 	console.log(wsUrl);
	
		// 	//pUser NULL ketika Login
		// 	if (pUser === null) {
		// 		pUser = ""; //ini Username (case login saja)
		// 	}
	
		// 	var aData = { "User": pUser, "Tcode": splitTcode, "Tbl_DataLock": JSON.stringify({ LockingType: pParam }) };
	
		// 	var dynamicParamDev = Global.dynamicParam("DspLockingObject", aData);
		// 	console.log(dynamicParamDev);
	
		// 	var tmpHasil = false;
		// 	$.ajax({
		// 		url: wsUrl,
		// 		type: 'post',
		// 		async: false,
		// 		dataType: 'json',
		// 		data: dynamicParamDev,
		// 		success: function (result) {
		// 			var result1 = Global.dynamicDeserialize(result);
		// 			console.log(result1);
		// 			SAPUI.ErrorMessageDB(result1);
		// 			if (result1[0].length > 0) {
		// 				if (pJenis == "Create") {
		// 					if (result1[0][0].Column1 == 1) {
		// 						if (splitTcode == 'index_01') {
		// 							tmpHasil = oThis.CreateLockingUser(pUser, splitTcode, pParam, TCodes);
		// 						} else {
		// 							tmpHasil = oThis.CreateLockingTCode(pUser, splitTcode, pParam, TCodes);
		// 						}
		// 					}
		// 				}
		// 				else {
		// 					if (result1[0][0].Column1 == 1) {
		// 						tmpHasil = true;
		// 					}
		// 				}
		// 			}
		// 			else {
		// 				tmpHasil = false;
		// 			}
		// 		},
		// 		error: function (jqXHR, textStatus, errorThrown) {
		// 			tmpHasil = false;
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	});
		// 	return tmpHasil;
		// },
		// CreateLockingTCode: function (pUser, pTcode, pParam, pPage) {
		// 	var wsUrl = WS_SY + "WS_SP_LockingData";
	
		// 	var aData = { "User": pUser, "Tcode": pTcode, "Tbl_DataLock": JSON.stringify({ LockingType: pParam }) };
	
		// 	var bData = { "User": pUser, "Tcode": pTcode, "Tbl_DataLock": JSON.stringify({ LockingType: pParam }), "Page": pPage };
	
		// 	var dynamicParamDev = Global.dynamicParam("CrtLockingObject", aData);
		// 	console.log(dynamicParamDev);
	
		// 	var tmpHasil;
		// 	$.ajax({
		// 		url: wsUrl,
		// 		type: 'post',
		// 		async: false,
		// 		dataType: 'json',
		// 		data: dynamicParamDev,
		// 		success: function (result) {
		// 			var result1 = Global.dynamicDeserialize(result);
		// 			console.log(result1);
		// 			tmpHasil = true;
		// 			window.sessionStorage.setItem("LockingTCode", JSON.stringify(bData));
		// 		},
		// 		error: function (jqXHR, textStatus, errorThrown) {
		// 			tmpHasil = false;
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	});
		// 	return tmpHasil;
		// },
		// CreateLockingUser: function (pUser, pTcode, pParam, pPage) {
		// 	var wsUrl = WS_SY + "WS_SP_LockingData";
	
		// 	var aData = { "User": pUser, "Tcode": pTcode, "Tbl_DataLock": JSON.stringify({ LockingType: pParam }) };
	
		// 	var bData = { "User": pUser, "Tcode": pTcode, "Tbl_DataLock": JSON.stringify({ LockingType: pParam }), "Page": pPage };
	
		// 	var dynamicParamDev = Global.dynamicParam("CrtLockingObject", aData);
		// 	console.log(dynamicParamDev);
	
		// 	var tmpHasil;
		// 	$.ajax({
		// 		url: wsUrl,
		// 		type: 'post',
		// 		async: false,
		// 		dataType: 'json',
		// 		data: dynamicParamDev,
		// 		success: function (result) {
		// 			var result1 = Global.dynamicDeserialize(result);
		// 			console.log(result1);
		// 			tmpHasil = true;
		// 			window.localStorage.setItem("LockingUser", JSON.stringify(bData));
		// 		},
		// 		error: function (jqXHR, textStatus, errorThrown) {
		// 			tmpHasil = false;
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	});
		// 	return tmpHasil;
		// },
		// DeleteLockingTCode: function () {
		// 	var sesLocking = JSON.parse(window.sessionStorage.getItem("LockingTCode"));
		// 	if (sesLocking) {
		// 		var wsUrl = WS_SY + "WS_SP_LockingData";
	
		// 		var aData = { "User": sesLocking.User, "Tcode": sesLocking.Tcode, "Tbl_DataLock": sesLocking.Tbl_DataLock };
	
		// 		var dynamicParamDev = Global.dynamicParam("DelLockingObject", aData);
		// 		console.log(dynamicParamDev);
	
		// 		var tmpHasil;
		// 		$.ajax({
		// 			url: wsUrl,
		// 			type: 'post',
		// 			dataType: 'json',
		// 			async: false,
		// 			data: dynamicParamDev,
		// 			success: function (result) {
		// 				var result1 = Global.dynamicDeserialize(result);
		// 				console.log(result1);
		// 				tmpHasil = true;
		// 				sessionStorage.removeItem('LockingTCode');
		// 			},
		// 			error: function (jqXHR, textStatus, errorThrown) {
		// 				tmpHasil = false;
		// 				console.log('Error');
		// 				console.log(jqXHR);
		// 				console.log(textStatus);
		// 				console.log(errorThrown);
		// 			}
		// 		});
	
		// 		return tmpHasil;
		// 	}
		// },
		// DeleteLockingUser: function () {
		// 	var sesLocking = JSON.parse(window.localStorage.getItem("LockingUser"));
		// 	if (sesLocking) {
		// 		console.log("Lewat");
		// 		var wsUrl = WS_SY + "WS_SP_LockingData";
	
		// 		var aData = { "User": sesLocking.User, "Tcode": sesLocking.Tcode, "Tbl_DataLock": sesLocking.Tbl_DataLock };
	
		// 		var dynamicParamDev = Global.dynamicParam("DelLockingObject", aData);
		// 		console.log(dynamicParamDev);
	
		// 		var tmpHasil;
		// 		$.ajax({
		// 			url: wsUrl,
		// 			type: 'post',
		// 			dataType: 'json',
		// 			async: false,
		// 			data: dynamicParamDev,
		// 			success: function (result) {
		// 				var result1 = Global.dynamicDeserialize(result);
		// 				console.log(result1);
		// 				tmpHasil = true;
		// 				localStorage.removeItem('LockingUser');
		// 			},
		// 			error: function (jqXHR, textStatus, errorThrown) {
		// 				tmpHasil = false;
		// 				console.log('Error');
		// 				console.log(jqXHR);
		// 				console.log(textStatus);
		// 				console.log(errorThrown);
		// 			}
		// 		});
	
		// 		return tmpHasil;
		// 	}
		// },
		// ResetLockingTCode: function (pUser) {
		// 	var wsUrl = WS_SY + "WS_SP_LockingData";
	
		// 	var aData = { "User": pUser };
	
		// 	var dynamicParamDev = Global.dynamicParam("ResLockingObject", aData);
		// 	console.log(dynamicParamDev);
	
		// 	var tmpHasil;
		// 	$.ajax({
		// 		url: wsUrl,
		// 		type: 'post',
		// 		async: false,
		// 		dataType: 'json',
		// 		data: dynamicParamDev,
		// 		success: function (result) {
		// 			var result1 = Global.dynamicDeserialize(result);
		// 			console.log(result1);
		// 			tmpHasil = true;
		// 		},
		// 		error: function (jqXHR, textStatus, errorThrown) {
		// 			tmpHasil = false;
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	});
		// 	return tmpHasil;
		// },
		// CheckUserActive: function (pUser, splitTcode, pParam) {
		// 	var wsUrl = WS_SY + "WS_SP_LockingData";
	
		// 	var aData = { "User": pUser, "Tcode": splitTcode, "Tbl_DataLock": JSON.stringify({ LockingType: pParam }) };
	
		// 	var dynamicParamDev = Global.dynamicParam("DspLockingObject", aData);
	
		// 	var tmpHasil;
		// 	$.ajax({
		// 		url: wsUrl,
		// 		type: 'post',
		// 		async: false,
		// 		dataType: 'json',
		// 		data: dynamicParamDev,
		// 		success: function (result) {
		// 			var result1 = Global.dynamicDeserialize(result);
		// 			if (result1[0][0].Column1 == 1) {
		// 				tmpHasil = false; //Bebas Lock
		// 			} else {
		// 				tmpHasil = true;
		// 			}
		// 		},
		// 		error: function (jqXHR, textStatus, errorThrown) {
		// 			tmpHasil = true;
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	});
		// 	return tmpHasil;
		// },
		// ChangeLockingTcode: function (pUser, pTcode, pData) {
		// 	var wsUrl = WS_SY + "WS_SP_LockingData";
		// 	var aData = { "User": pUser, "Tcode": pTcode, "Tbl_DataLock": pData };
		// 	var dynamicParam = Global.dynamicParam("ChgLockingObject", aData);
	
		// 	$.ajax({
		// 		url: wsUrl,
		// 		type: 'post',
		// 		async: false,
		// 		dataType: 'json',
		// 		data: dynamicParam,
		// 		success: function (result) {
		// 			// console.log("Updated")	LOCKING	
		// 		},
		// 		error: function (jqXHR, textStatus, errorThrown) {
		// 			console.log('Error');
		// 			console.log(jqXHR);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);
		// 		}
		// 	});
	
		// },
		//-------------------------- END LOCKING AREA ---------------------------------
		Unflatten: function (param) {
			const {
				arr,
				primaryId,
				parentId,
				childrenProp = 'children',
				allowDuplicate = true
			} = param
	
			var tree = [],
				sortArr = [],
				mappedArr = {},
				arrElem,
				mappedElem;
	
			// First map the nodes of the array to an object -> create a hash table.
			for (var i = 0; i < arr.length; i++) {
				arrElem = arr[i];
				if (mappedArr[arrElem[primaryId]]) {
					if (allowDuplicate) {
						// Jika array
						if (mappedArr[arrElem[primaryId]].length) {
							arrElem[childrenProp] = []
							mappedArr[arrElem[primaryId]].push(arrElem)
						}
						// jika bukan
						else {
							const tempData = deepCopy(mappedArr[arrElem[primaryId]])
							arrElem[childrenProp] = []
							mappedArr[arrElem[primaryId]] = [tempData, arrElem]
							sortArr.push(mappedArr[arrElem[primaryId]])
						}
					}
				} else {
					mappedArr[arrElem[primaryId]] = arrElem;
					mappedArr[arrElem[primaryId]][childrenProp] = [];
					sortArr.push(mappedArr[arrElem[primaryId]])
				}
			}
	
			for (let i = 0; i < sortArr.length; i++) {
				const el = sortArr[i];
	
				// Jika Array
				if (el.length) {
					for (let j = 0; j < el.length; j++) {
						const elInside = el[j]
						const idInside = elInside[primaryId]
	
						if (mappedArr.hasOwnProperty(idInside)) {
							mappedElem = mappedArr[idInside][j];
							if (mappedArr[mappedElem[parentId]]) {
								mappedArr[mappedElem[parentId]][childrenProp].push(mappedElem);
							} else {
								tree.push(mappedElem)
							}
						}
					}
				} else {
					const id = el[primaryId]
	
					if (mappedArr.hasOwnProperty(id)) {
						mappedElem = mappedArr[id];
						if (mappedArr[mappedElem[parentId]]) {
							mappedArr[mappedElem[parentId]][childrenProp].push(mappedElem);
						} else {
							tree.push(mappedElem)
						}
					}
				}
	
			}
			// NOTE: Backup Code
			// for (var id in mappedArr) {
			// 	if (mappedArr.hasOwnProperty(id)) {
			// 		mappedElem = mappedArr[id];
			// NOTE : Backup Code 
			// if (mappedElem[parentId] == "" || mappedElem[parentId] == null) {
			// 	tree.push(mappedElem);
			// }
			// else {
			// 	mappedArr[mappedElem[parentId]][childrenProp].push(mappedElem);
			// }
			// 		if (mappedArr[mappedElem[parentId]]) {
			// 			mappedArr[mappedElem[parentId]][childrenProp].push(mappedElem);
			// 		} else {
			// 			tree.push(mappedElem)
			// 		}
			// 	}
			// }
	
			return tree;
		},
		Flattened: function (pArray) {
			var arrResult = []
			for (let index = 0; index < pArray.length; index++) {
				arrResult.push(flatArray(pArray[index]))
			}
	
			function flatArray(input) {
				var result = [];
	
				(function (obj) {
					var arr = [],
						newObj = {};
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							if (key !== "children") {
								newObj[key] = obj[key];
							} else {
								arr = obj[key];
							}
						}
					}
					result.push(newObj);
					if (arr.length) {
						for (let index = 0; index < arr.length; index++) {
							arguments.callee(arr[index]);
						}
					}
				})(input);
				return result;
			};
	
			return [].concat.apply([], arrResult)
		},
	
		GetRealIndex: function (table, oEvent = false) {
			var tempIndex = oEvent ? Global.GetRelativeIndexbyEvent(oEvent) : table.getSelectedIndex()
			return table.getBinding("rows").aIndices[tempIndex]
		},
	
		GetRelativeIndexbyEvent: function (oEvent) {
			return oEvent.getSource().getParent().getIndex()
		},
	
		GetDistinct: function (arr, prop) {
			return [...new Set(arr.map(item => item[prop]))]
		},
	
		TimeDiff: function (start, end) {
			start = start.split(":");
			end = end.split(":");
			var startDate = new Date(0, 0, 0, start[0], start[1], 0);
			var endDate = new Date(0, 0, 0, end[0], end[1], 0);
			var diff = Math.abs(endDate.getTime() - startDate.getTime());
			var hours = Math.floor(diff / 1000 / 60 / 60);
			diff -= hours * 1000 * 60 * 60;
			var minutes = Math.floor(diff / 1000 / 60);
	
			return {
				hour: (hours < 9 ? "0" : "") + hours,
				minute: (minutes < 9 ? "0" : "") + minutes
			}
		},
	
		SendNotification: async function (
			to = "fA-dr6T_Riq8wV1E5olRWH:APA91bHtS-6HWcJPfj8QTW3KvqXr8RDg2eYUpV0GZiBpebvI9U8O7c5n-E942zRs1GQBjQuXTPX0XcZKFWI9Akj8hJ1aTkCUAD-j_0KZMa3QLKez5S1YUQlbBw-E_vajX69Y2l32hlvf",
			title = "TitlePercobaan",
			body = "BodyPercobaan"
		) {
			let param = {
				"to": to,
				"notification": {
					"title": title,
					"body": body,
					"android_channel_id": "triashrmobile"
				},
				"priority": "high",
				"data": {
					"click_action": "FLUTTER_NOTIFICATION_CLICK",
					"title": title,
					"body": body
				}
			}
	
			let resultNotification = await fetchApi({
				url: SERVICE2 + "WS_Notification",
				method: "Firebase",
				body: param,
				verbose: true
			})
	
			let resultNotificationUnparsed = resultNotification[Object.keys(resultNotification)[0]]
	
			if (resultNotificationUnparsed) {
				let resultNotificationParsed = JSON.parse(resultNotificationUnparsed)
				if (resultNotificationParsed.hasOwnProperty("success")) {
					if (resultNotificationParsed["success"] == 1) {
						return true
					}
				}
			}
			SAPUI.MessageBoxError("Terjadi error, ketika mengirim notifikasi")
			return false
		},
	
		RemoveDuplicates: function (duplicates, attribute) {
			return duplicates.filter((obj, pos, arr) => {
				return arr.map(mapObj => mapObj[attribute]).indexOf(obj[attribute]) === pos /*&& pos == ""*/ ;
			});
		},
	
		MergeByProp: function (target, source, props, deletedData) {
			source.forEach(sourceElement => {
				let targetElement = target.find(targetElement => {
				  let match = true
				  props.forEach(prop => {
						if (sourceElement[prop] === targetElement[prop]) {
							match = match && true
						} else {
							match = match && false
						}
					})
					return match
				})
				if(targetElement){
					Object.assign(targetElement, sourceElement)
				}else{
					target.push(sourceElement)
				}
			})
	
			if(deletedData){
				deletedData.forEach(el => {
					target.forEach((targ, idx) => {
						if(el["Value"] == targ["Value"]){
							target.splice(idx, 1)
						}
					})
				})
			}
		},
	
		ValidateObject: async function (objectName, objectType = 'abbr') {
			let res = await fetchApi({
				url: WS_OM + "WS_PPOCE",
				method: "CheckOrgUnit",
				body: {
					ObjectAbbreviation: objectName
				}
			})
	
			if (res[0][0]["Column1"]) {
				if (res[0][0]["Column1"] == '1') {
					return true
				}
			}
			if (res[0][0]["ViewType"]) {
				SAPUI.DialogErrMessage(res[0][0])
				// if (res[0][0]["ViewType"] == 'E') {
					return false
				// }
			}
		},
	
		IsFirstLogon: function () {
			const IsFirstLogon = window.localStorage.getItem("IsFirstLogon")
			if(IsFirstLogon){
				SAPUI.ChangePassword({
					initialPass: JSON.parse(IsFirstLogon)["initialpass"]
				})
			}
		}
	}

	return Global
})