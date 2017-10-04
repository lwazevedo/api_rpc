'use strict'

let usuarios = {}
let tarefas = {}

let db = {
  usuarios: proc(usuarios),
  tarefas: proc(tarefas)
}

function copia(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function proc(container) {
  return {
    salvar(obj) {
      let _obj = copia(obj)
      if (!_obj.id) _obj.id = (Math.random() * 10000000) | 0
      container[_obj.id.toString()] = _obj
      return copia(_obj)
    },
    buscar(id) {
      return copia(container[id.toString()])
    },
    buscarTodos() {
      let _grupo = []
      for (let item in container) {
        _grupo.push(copia(container[item]))
      }
      return _grupo
    },
    remover(id) {
      delete container[id]
    }
  }
}

module.exports = db