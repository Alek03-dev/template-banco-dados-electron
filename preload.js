console.log('PRELOAD CARREGOU COM SUCESSO')

const {contextBridge, ipcRenderer} = require('electron')

function cadastrarUsuario(nome, email) {
    ipcRenderer.invoke('cadastrar-meu-usuario', nome, email)
}

contextBridge.exposeInMainWorld('api', {
    cadastrarUsuario
})
