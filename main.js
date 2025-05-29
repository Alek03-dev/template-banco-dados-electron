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

async function conectarBancoDados(){
  var conexao = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passaword: 'root',
    database: 'electron_db'
  })

  return conexao
}

ipcMain.handle('criar-usuario', async function(event, campoNome, campEmail){
  var conexao = await conectarBancoDados()

  var criarUsuarioSQL = 'INSERT INTO usuarios(nome, email) VALUES(? , ?)'

  var resultado = await conexao.execute(criarUsuarioSQL, [campoNome, campEmail] )

  console.log('resultado', resultado)
})

app.whenReady().then(() => {
  createWindow()
})