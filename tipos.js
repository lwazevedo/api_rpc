'use strict'

let tipos = {
  usuario: {
    descricao: 'Detalhes do usuário',
    propriedades: {
      nome: ['string', 'required'],
      idade: ['number'],
      email: ['string', 'required'],
      senha: ['string', 'required']
    }
  },
  tarefa: {
    descricao: 'Tarefa do usuário',
    propriedades: {
      usuarioid: ['number', 'required'],
      conteudo: ['string', 'required'],
      expirar: ['date', 'required']
    }
  }
}

module.exports = tipos