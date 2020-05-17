// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const SerialPort = require('serialport');


window.addEventListener('DOMContentLoaded', () => {
    for (const versionType of['chrome', 'electron', 'node']) {
        document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    }

    document.getElementById('serialport-version').innerText = require('serialport/package').version

})

// // To read the port name
// // Promise approach
// SerialPort.list().then(ports => {
//   ports.forEach(function(port) {
//     if(port.manufacturer !== undefined){
//       console.log(port.path);
//       document.getElementById('port').innerText = port.path;
//     }
//
//   });
// });
