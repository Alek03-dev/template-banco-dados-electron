const { app, BrowserWindow, ipcMain } = require('electron')
const mysql = require('mysql2/promise') //promise

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js', // Nosso arquivo de preload
      contextIsolation: true, // Habillita o isolamento do contexto
    }
  })

  win.loadFile('pages/index.html')
}

ipcMain.handle('cadastrar-meu-usuario', function(evento, nome, email){
  console.log("Nome: ", nome)
  console.log("E-mail: ", email)

  console.log("SE é LOKO! CADASTROU O USUÀRIO COM SUCESSO!")
})

app.whenReady().then(() => {
  createWindow()
})