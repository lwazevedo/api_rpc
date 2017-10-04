# api_rpc
Api baseada em rpc

# start api_rpc
node server.js

# Exemplos:
## Url http://localhost:{PORT}/rpc

### Post criar usuario
```
{
    "criarUsuario": {
        "name":"teste",
        "age":31
    }
}
```
### retorno
```
{
    "criarUsuario": {
        "name": "teste",
        "age": 31,
        "id": 3556690
    }
}

```
### Post buscar usuario
```
{
    "buscarUsuario": {
        "id": 3556690
    }
}
```
### retorno
```
{
    "buscarUsuario": {
        "name": "teste",
        "age": 31,
        "id": 3556690
    }
}
```
### Post buscar lista de usuarios
```
{
    "buscarTodosUsuarios": {}
}
```
### retorno
```
{
    "buscarTodosUsuarios": [
        {
            "name": "teste",
            "age": 31,
            "id": 3556690
        }
    ]
}
```
## Url http://localhost:{PORT}/describe
## Post describre
### retorno
```
{
    "tipos": {
        "usuario": {
            "descricao": "Detalhes do usuário",
            "propriedades": {
                "nome": [
                    "string",
                    "required"
                ],
                "idade": [
                    "number"
                ],
                "email": [
                    "string",
                    "required"
                ],
                "senha": [
                    "string",
                    "required"
                ]
            }
        },
        "tarefa": {
            "descricao": "Tarefa do usuário",
            "propriedades": {
                "usuarioid": [
                    "number",
                    "required"
                ],
                "conteudo": [
                    "string",
                    "required"
                ],
                "expirar": [
                    "date",
                    "required"
                ]
            }
        }
    },
    "metodos": {
        "criarUsuario": {
            "descricao": "Cria um novo usuário",
            "parametros": [
                "usuario:objeto do usuario"
            ],
            "retorno": [
                "usuario"
            ]
        },
        "buscarUsuario": {
            "descricao": "Buscar usuario pelo id",
            "parametros": [
                "id:id do usuario que deseja procurar"
            ],
            "retorno": [
                "usuario"
            ]
        },
        "buscarTodosUsuarios": {
            "liberado": false,
            "descricao": "Busca lista de usuarios",
            "parametros": [],
            "retorno": [
                "listausuarios"
            ]
        }
    }
}
```
