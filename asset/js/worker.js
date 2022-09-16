console.log("Worker loaded & actived 😄")
const PORT = 5001;
const DEV_WSOCKET  = 'ws://localhost:' + PORT;
const PRD_WSOCKET  = 'ws://192.168.1.235:' + PORT;
const WSOCKET = DEV_WSOCKET;

// NOTE : If using web push method
// self.addEventListener('push', e => {
//     const data = e.data.text()
//     console.log('Push received..')
   
//     self.registration.showNotification('Testing Notif', {
//         body: data
//     })

// })

// try{
//     var sock = new WebSocket(WSOCKET)

//     sock.onopen = function(event){
//         console.log("Koneksi terhubung...")
//     }

//     sock.onerror = function(event){
        
//     }

//     sock.onmessage = function(event){
//         var notification = new Notification("Notification testing", {
//             body: event.data
//         });
//     }

//     sock.onclose = function(event){
//         console.log("Koneksi terputus...")
//     }

//     self.addEventListener('message', function(event) {
//         var data = event.data;
//         switch (data.command) {
//             case "registerUser":
//                 if(sock.readyState){
//                     sock.send(JSON.stringify(data))
//                 }
//                 break;
        
//             default:
//                 break;
//         }
//     });
// }catch(err){
//     console.log(err)
// }