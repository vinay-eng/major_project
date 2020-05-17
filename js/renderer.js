// modules included
const electron = require('electron');
const serialport = require('serialport');
const dotenv = require('../config.env');
const { shell } = electron;

// dotenv.config({path:"../config.env"})

// to read data from port
const Readline = serialport.parsers.Readline;
const parser = new Readline();
const {ipcRenderer} = electron;

// mainWindow id's
const frequency = document.getElementById('frequency');
const force = document.getElementById('force');
const port_name = document.getElementById('port');
const node = document.getElementById('node');
const chromium = document.getElementById('chromium');
const serialport1 = document.getElementById('serialport1');

const mainFunction = async ()=>{
  // await ipcRenderer.on('item:add',(e,item)=>{
  //   let USB_PORT = item
  //   console.log(USB_PORT)
  // })
  port_name.innerText = await USB_PORT;

  const mySerialport = await new serialport(USB_PORT,{
    baudRate:9600
  });

  // setting an event open
  await mySerialport.on('open',()=>{
    console.log('started');
    console.log(USB_PORT)
  });

  // setting event data to read data
  await mySerialport.on('data',(dataSerial)=>{
    frequency.innerText = dataSerial.toString();

  })
  await setInterval(run_graph(),1000)
};

function Frequency(){
  return frequency.innerText;
}
function Force() {
  return force.innerText;
}
function run_graph(){
  Plotly.newPlot('myDiv',[{
    y:[Frequency()],
    mode:'lines',
    line:{color:'#80CAF6'}
  }])
  Plotly.newPlot('myDiv1',[{
    y:[Force()],
    mode:'lines',
    line:{color:'#80CAF6'}
  }])
}
mainFunction()
