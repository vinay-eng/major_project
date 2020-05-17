const electron = require('electron')
const {ipcRenderer} = electron

const form = document.querySelector('form');

form.addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();
  const port = document.querySelector('#addPort').value;
  ipcRenderer.send('item:add',port);
}
