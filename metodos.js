'use strict'

let db = require('./db')

let metodos = {
  criarUsuario: {
    descricao: 'Cria um novo usuário',
    parametros: ['usuario:objeto do usuario'],
    retorno: ['usuario'],
    exec(usuarioObj) {
      return new Promise((resolve) => {
        if (typeof(usuarioObj) !== 'object') {
          throw new Error('Um objeto é experado!')
        }
        let _usuarioObj = JSON.parse(JSON.stringify(usuarioObj))
        _usuarioObj.id = (Math.random() * 10000000) | 0
        resolve(db.usuarios.salvar(_usuarioObj))
      })
    }
  },
  buscarUsuario: {
    descricao: 'Buscar usuario pelo id',
    parametros: ['id:id do usuario que deseja procurar'],
    retorno: ['usuario'],
    exec(usuarioObj) {
      return new Promise((resolve) => {
        if (typeof(usuarioObj) !== 'object') {
          throw new Error('Um objeto é experado!')
        }
        resolve(db.usuarios.buscar(usuarioObj.id) || {})
      })
    }
  },
  buscarTodosUsuarios: {
    liberado: false,
    descricao: 'Busca lista de usuarios',
    parametros: [],
    retorno: ['listausuarios'],
    exec() {
      return new Promise((resolve) => {
        resolve(db.usuarios.buscarTodos() || {})
      })
    }
  }
}

module.exports = metodos