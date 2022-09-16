/**
 * *Config Connection To Web Service
 */
// console.log = function(){}
const Server1        = "DEV";

// Server WS 2 - Notification gateway
const LOCALURL      = 'http://localhost:51136/';

// NOTE : Toggle to switch the server main url
const ROOTURL        = LOCALURL;
const MAINSERVICES   = ROOTURL  + 'MainServices/';

// NOTE : Webservice Endpoint per-modul
const WS_RPT          = MAINSERVICES + 'RPT/Report.svc/';
