var FORCEROUTE = false
const NEWLOGIN = false
// Browser Check
const browserCheck = {
	fetch: 'fetch' in window,
	WebSocket: 'WebSocket' in window,
	Promise: 'Promise' in window,
	indexedDB: 'indexedDB' in window,
	serviceWorker: 'serviceWorker' in navigator,
	version: window.navigator.appVersion
}
console.log('%cBrowser Technology 💎', 'color:green', browserCheck)
// End of Browser Check

// Global Variable
const UserLS = function () {
	return window.localStorage.getItem("User"); //user name
}
const userTypeLS = function () {
	return window.localStorage.getItem("UserType"); //user type
}
const languageLS = function () {
	return window.localStorage.getItem("languageLS"); //language
}
const BASE_URL = function () {
	let hostname = window.location.hostname
    let protocol = window.location.protocol

	return protocol + "//" + hostname
}
const COMPANY = "PT Trias Sentosa, Tbk.";
const PLATFORM = "WEB"
const LANGUANGE = "en"
// End of Global Variable

// Basic Function 
const loadScript = function(url, callback) {
	// Adding the script tag to the head as suggested before
	var body = document.body;
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	body.appendChild(script);
}
const isNotEmpty = function (boom) {
	return Array.isArray(boom) ? boom.length > 0 : boom != null && boom != 'undefined' && boom
};
const sanitize = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerText;
};
const deepCopy = function (obj) {
	if (typeof obj == 'object') {
		return JSON.parse(JSON.stringify(obj))
	} else {
		return obj
	}
}
//custom styles, like css
var style = document.createElement("style");
document.head.appendChild(style);
style.type = "text/css";
style.innerHTML = "";
var oDUmmy = new sap.ui.core.Control();
sap.ui.core.Control.prototype.changeColor = function (oColor) {
	style.innerHTML = style.innerHTML + '.' + oColor + '{background-color:' + oColor + ' !important;}';
	this.addStyleClass(oColor);
}
sap.ui.core.Control.prototype.addCustomStyle = function (oClassName, oStyle) {
	style.innerHTML = style.innerHTML + '.' + oClassName + '{' + oStyle + ' !important;}';
	this.addStyleClass(oClassName);
}
//End of cutom style

// End of Basic Function

// Connection API
/**
 * *Latest function
 * @param url string
 * @param body object || string
 * @param method string 
 * *Return
 * @param res Promise (await variable)
 */
const fetchApi = async function (req) {
	var loading = SAPUI.BusyDialog();
	const {
		url,
		body,
		method,
		dynamicParam = true,
		showLoading = true,
		verbose = false
	} = req

	sap.ui.getCore().attachInit(function () {
		if (showLoading) {
			loading.open()
		}
	})

	var readySend = dynamicParam ? sanitize( //* Sanitize User Inputs
		Global.dynamicParam( //* Parsing to Acceptable Format for WS
			method,
			typeof body == 'string' ? //* Check if body require to Parse (Must Object)
				JSON.parse(body) : body
		)
	) : JSON.stringify(body)

	return fetch(url, {
		method: 'post', // All http method always post
		body: readySend
	})
		.then(res => {
			//* Parsing to json if response ok
			if (res.ok) return res.json()
			else //* if not ok then throw error
				var error = {
					message: res.statusText,
					name: res.status,
				}
			throw error
		})
		.then(res => {
			loading.close()
			//* Deserialize result to Acceptable format for frontend
			return verbose ? res : dynamicParam ? Global.dynamicDeserialize(res) : res
		})
		.catch(err => {
			// SAPUI.MessageBoxAlert(`Hubungi IT, Terjadi error ${err.name}: "${err.message}"`)
			loading.close()
			console.log('Fetch Api Error', err)
			return err
		})
}
/**
 * *Legacy function
 * @param url string
 * @param body object || string
 * @param method string 
 * *Return
 * @param res Promise
 */
// Legacy function - turn async off
const promiseApi = function (req) {
	var loading = SAPUI.BusyDialog();
	var result = ''
	const {
		url,
		body,
		method,
		sync = true,
		showLoading = true,
		dynamicParam = true,
		fetch = false
	} = req

	var readySend = dynamicParam ? sanitize( //* Sanitize User Inputs
		Global.dynamicParam( //* Parsing to Acceptable Format for WS
			method,
			//* Check if body require to Parse (Must Object)
			typeof body == 'string' ?
				body == '' ? '' : JSON.parse(body) : body
		)
	) : JSON.stringify(body)

	sap.ui.getCore().attachInit(function () {
		if (showLoading) {
			loading.open()
		}
	})

	if (sync) {
		// setTimeout(function(){
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: readySend,
			async: false,
			success: function (data, jqXHR, textStatus) {
				result = dynamicParam ? Global.dynamicDeserialize(data) : data
				if (Object.keys(result).length <= 0) {
					console.log("Error backend")
					// SAPUI.MessageBoxError("Terjadi error, data anda tidak tersimpan, harap hubungi IT")
				}
				// if(showLoading){
				loading.close()
				// }
			},
			error: function (jqXHR, textStatus, errorThrown) {
				var error = {}
				error.jqXHR = jqXHR
				error.textStatus = textStatus
				error.errorThrown = errorThrown
				// if(showLoading){
				loading.close()
				// }
			}
		})
		// }, 0)

		return result
	} else if (fetch) {
		return new Promise(async (resolve, reject) => {
			var resultFetch = await fetchApi({
				url,
				body,
				method,
				dynamicParam
			})
			resolve(resultFetch)
		})
	} else {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
				type: 'post',
				dataType: 'json',
				data: readySend,
				success: function (data, jqXHR, textStatus) {
					if (showLoading) {
						loading.close()
					}
					resolve(Global.dynamicDeserialize(data))
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var error = {}
					error.jqXHR = jqXHR
					error.textStatus = textStatus
					error.errorThrown = errorThrown
					if (showLoading) {
						loading.close()
					}
					reject(error)
				}
			})
		})
	}
}
const fetchJSON = function (url) {
	var result = ''
	var jsonUrl = BASE_URL() + url

	$.ajax({
		url: jsonUrl,
		dataType: 'json',
		async: false,
		success: function (data, jqXHR, textStatus) {
			result = data
		},
		error: function (jqXHR, textStatus, errorThrown) {
			var error = {}
			error.jqXHR = jqXHR
			error.textStatus = textStatus
			error.errorThrown = errorThrown
		}
	})

	return result
}
// End of Connection API


// Browser check Features and Request Permission
// Let's check if the browser supports notifications
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
	console.log("Safari does not support Notification & Worker")
} else {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	} else {
		Notification.requestPermission().then(function (permission) {
			// If the user accepts, let's create a notification
			if (permission === "granted") {
				// var notification = new Notification("Hi there!");
			}
		});
	}
	const GlobalWorker = new Worker('asset/js/worker.js')

	function SendUsernameToWorker() {
		if (UserLS()) {
			if (GlobalWorker) {
				// console.log("Sending message to service worker");
				GlobalWorker.postMessage({
					"command": "registerUser",
					"value": UserLS()
				});
			} else {
				console.error("No active ServiceWorker");
			}
		} else {
			console.error('Need to login')
			// throw 'Need to login'
		}
	}
	SendUsernameToWorker()
}
// End of Browser check Features and Request Permission 

// Date Enum
const datenum = function (v, date1904) {
	if (date1904) v += 1462;
	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
	var epoch = Date.parse(v) - tzoffset;
	// var localISOTime = (new Date(epoch - tzoffset)).toISOString().slice(0, -1);
	return (epoch + 2209161600000) / (24 * 60 * 60 * 1000);
}

const enumMonth = function (month, longName = false) {
	const MONTH = {
		1: "Jan",
		2: "Feb",
		3: "Mar",
		4: "Apr",
		5: "Mei",
		6: "Jun",
		7: "Jul",
		8: "Aug",
		9: "Sep",
		10: "Okt",
		11: "Nov",
		12: "Des"
	}

	const LONGMONTH = {
		1: "Januari",
		2: "Februari",
		3: "Maret",
		4: "April",
		5: "Mei",
		6: "Juni",
		7: "Juli",
		8: "Agustus",
		9: "September",
		10: "Oktober",
		11: "November",
		12: "Desember"
	}

	var res = MONTH[month]

	if (longName) {
		res = LONGMONTH[month]
	}

	if (res) {
		return res
	} else {
		return ""
	}
}

const getWeekDay = function (variant = 'default') {
	switch (variant) {
		case 'variant1':
			return [{
				id: 0,
				desc: "Sunday"
			},
			{
				id: 1,
				desc: "Monday"
			},
			{
				id: 2,
				desc: "Tuesday"
			},
			{
				id: 3,
				desc: "Wednesday"
			},
			{
				id: 4,
				desc: "Thursday"
			},
			{
				id: 5,
				desc: "Friday"
			},
			{
				id: 6,
				desc: "Saturday"
			},
			]
		default:
			return [{
				id: 1,
				desc: "Monday"
			},
			{
				id: 2,
				desc: "Tuesday"
			},
			{
				id: 3,
				desc: "Wednesday"
			},
			{
				id: 4,
				desc: "Thursday"
			},
			{
				id: 5,
				desc: "Friday"
			},
			{
				id: 6,
				desc: "Saturday"
			},
			{
				id: 7,
				desc: "Sunday"
			},
			]
	}
}
// End of Date Enum

// Initialize some icon globally
var IconPool = sap.ui.requireSync("sap/ui/core/IconPool");
var b = [];
var c = {};
//Fiori Theme font family and URI
var t = {
	fontFamily: "SAP-icons-TNT",
	fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
};
//Registering to the icon pool
IconPool.registerFont(t);
b.push(IconPool.fontLoaded("SAP-icons-TNT"));
c["SAP-icons-TNT"] = t;
//SAP Business Suite Theme font family and URI
// var B = {
// 	fontFamily: "BusinessSuiteInAppSymbols",
// 	fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/")
// };
//Registering to the icon pool
// IconPool.registerFont(B);
// b.push(IconPool.fontLoaded("BusinessSuiteInAppSymbols"));
// c["BusinessSuiteInAppSymbols"] = B;

loadScript("asset/js/ConfigWeb.js")
const Global = sap.ui.requireSync("asset/js/GlobalVariable")
const SAPUI = sap.ui.requireSync("asset/js/library");