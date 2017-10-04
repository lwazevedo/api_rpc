'use strict'

let http = require('http')
let url = require('url')
let metodos = require('./metodos')
let tipos = require('./tipos')

let server = http.createServer(requestListener)
const PORT = process.env.PORT || 9090

let rotas = {
  '/rpc': function(corpo) {
    return new Promise((resolve, reject) => {
      if (!corpo) {
        throw new('Houve um erro no request do rpc.')
      }
      let _json = JSON.parse(corpo)
      let keys = Object.keys(_json)
      let promiseArr = []

      for (let key of keys) {
        if (metodos[key] && typeof(metodos[key].exec) === 'function') {
          let execPromise = metodos[key].exec.call(null, _json[key])
          if (!(execPromise instanceof Promise)) {
            throw new Error(`Não existe retorno de promessa para ${key}`)
          }
          promiseArr.push(execPromise)
        } else {
          let execPromise = Promise.resolve({
            error: 'Metodo não definido'
          })
          promiseArr.push(execPromise)
        }
      }

      Promise.all(promiseArr)
        .then(iter => {
          console.log(iter)
          let response = {}
          iter.forEach((val, index) => {
            response[keys[index]] = val
          })
          resolve(response)
        }).catch(err => {
          reject(err)
        })

    })
  },
  '/describe': function() {
    return new Promise(resolve => {
      let tipo = {}
      let metodo = {}
      console.log('aqui...')
      tipo = tipos
      for (let m in metodos) {
        let _m = JSON.parse(JSON.stringify(metodos[m]))
        metodo[m] = _m
      }
      resolve({
        tipos: tipo,
        metodos: metodo
      })
    })
  }
}

function requestListener(request, response) {
  let reqUrl = `http://${request.headers.host}${request.url}`
  let parseUrl = url.parse(reqUrl, true)
  let pathname = parseUrl.pathname

  response.setHeader('Content-Type', 'application/json')
  let buf = null

  request.on('data', data => {
    buf = buf === null ? data : (buf + data)
  })
  request.on('end', () => {
    let body = buf !== null ? buf.toString() : null
    if (rotas[pathname]) {
      let compute = rotas[pathname].call(null, body)
      if (!(compute instanceof Promise)) {
        response.statusCode = 500
        response.end('Oops! erro no servidor.')
        console.warn('O retorno não foi uma promessa.')
      } else {
        compute.then(res => {
          response.end(JSON.stringify(res))
        }).catch(err => {
          console.error(err)
          response.statusCode = 500
          response.end('Oops! erro no servidor')
        })
      }
    } else {
      response.statusCode = 400
      response.end(`Oops! ${pathname} não encontrado.`)
    }
  })
}

server.listen(PORT)
console.log(`Executando na porta: ${PORT}`)