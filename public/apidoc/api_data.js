define({ "api": [
  {
    "type": "delete",
    "url": "/categoria/:id",
    "title": "Exclui uma categoria",
    "version": "1.0.0",
    "group": "Categoria",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da categoria [Obrigatório]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200\n{\n    sucesso: true,\n    mensagem: 'Categoria removida com sucesso'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/categoria.js",
    "groupTitle": "Categoria",
    "name": "DeleteCategoriaId"
  },
  {
    "type": "get",
    "url": "/categoria",
    "title": "Lista de Categorias",
    "version": "1.0.0",
    "group": "Categoria",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number[1..25]",
            "optional": false,
            "field": "limit",
            "description": "<p>Número máximo de registros para retorno</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Início da leitura dos registros</p>"
          },
          {
            "group": "Query Params",
            "type": "String[60]",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome completo/parcial para filtro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo ",
          "content": "http://api.gerdata.com/categoria?limit=25&offset=0&nome=Alimentação",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total de itens cadastrados</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Máximo de itens retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Início do cursor para buscar paginadas</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Lista de objetos da Categoria</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.codigo",
            "description": "<p>Código da Categoria</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nome",
            "description": "<p>Nome da Categoria</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "data.tipo",
            "description": "<p>Tipo da Categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    total: 2, \n    limit: 25,\n    offset: 0,\n    data: [{\n        codigo: 1,\n        nome: 'Alimentação',\n        tipo': 0\n    },\n    {\n        codigo: 2,\n        nome: 'Salário',\n        tipo: 1\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/categoria.js",
    "groupTitle": "Categoria",
    "name": "GetCategoria"
  },
  {
    "type": "get",
    "url": "/categoria/:id",
    "title": "Obter categoria",
    "version": "1.0.0",
    "group": "Categoria",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da categoria [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo ",
          "content": "http://api.gerdata.com/categoria/2",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da Categoria</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: 1,\n    nome: 'Transporte',\n    tipo: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Categoria não existe",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/categoria.js",
    "groupTitle": "Categoria",
    "name": "GetCategoriaId"
  },
  {
    "type": "post",
    "url": "/categoria",
    "title": "Cadastro de Categorias",
    "version": "1.0.0",
    "group": "Categoria",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da categoria [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da Categoria [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{ \n    nome: 'Transporte',\n    tipo: 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da categoria</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: 1,\n    nome: 'Transporte',\n    tipo: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Pré-requisitos não preenchidos",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'nome',\n            mensagens: [\n                'O campo \"Nome\" deve ser informado',\n                'O campo \"Nome\" deve conter no mínimo 2 caracteres'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/categoria.js",
    "groupTitle": "Categoria",
    "name": "PostCategoria"
  },
  {
    "type": "put",
    "url": "/categoria/:id",
    "title": "Atualiza uma Categoria",
    "version": "1.0.0",
    "group": "Categoria",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da categoria [Obrigatório]</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da categoria [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da categoria [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Url ",
          "content": "http://api.gerdata.com/categoria/2",
          "type": "text"
        },
        {
          "title": "Corpo da Requisição",
          "content": "{\n    nome: 'Transporte Escolar',\n    tipo: 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200\n{\n    sucesso: true,\n    mensagem: 'Categoria atualizada com sucesso'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Pré-requisitos não preenchidos",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'nome',\n            mensagens: [\n                'O campo \"Nome\" deve ser informado',\n                'O campo \"Nome\" deve conter no mínimo 2 caracteres'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/categoria.js",
    "groupTitle": "Categoria",
    "name": "PutCategoriaId"
  },
  {
    "type": "delete",
    "url": "/conta/:id",
    "title": "Exclui uma conta",
    "version": "1.0.0",
    "group": "Conta",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf'\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da conta [Obrigatório]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200\n{\n    sucesso: true,\n    mensagem: 'Conta removida com sucesso'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/conta.js",
    "groupTitle": "Conta",
    "name": "DeleteContaId"
  },
  {
    "type": "get",
    "url": "/conta",
    "title": "Lista de Contas",
    "version": "1.0.0",
    "group": "Conta",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf'\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number[1..25]",
            "optional": false,
            "field": "limit",
            "description": "<p>Número máximo de registros para retorno</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Início da leitura dos registros</p>"
          },
          {
            "group": "Query Params",
            "type": "String[60]",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome completo/parcial para filtro</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "defaultValue": "0",
            "description": "<p>Situação da conta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo ",
          "content": "http://api.gerdata.com/conta?limit=25&offset=0&nome=Alimentação&situacao=0",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total de itens cadastrados</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Máximo de itens retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Início do cursor para buscar paginadas</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Lista de objetos da Conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.codigo",
            "description": "<p>Código da Conta</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nome",
            "description": "<p>Nome da Conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Conta Corrente\"",
              "\"1 - Conta Poupança\"",
              "\"2 - Cartão de Crédito\""
            ],
            "optional": false,
            "field": "data.tipo",
            "description": "<p>Tipo da Conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "data.situacao",
            "description": "<p>Situação da conta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    total: 2, \n    limit: 25,\n    offset: 0,\n    data: [{\n        codigo: 1,\n        nome: 'Banco do Brasil',\n        tipo: 0,\n        situacao: 0\n    },\n    {\n        codigo: 2,\n        nome: 'Nubank',\n        tipo: 2,\n        situacao: 0\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/conta.js",
    "groupTitle": "Conta",
    "name": "GetConta"
  },
  {
    "type": "get",
    "url": "/conta/:id",
    "title": "Obter conta",
    "version": "1.0.0",
    "group": "Conta",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf'\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da conta [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo ",
          "content": "http://api.gerdata.com/conta/2",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Conta Corrente\"",
              "\"1 - Conta Poupança\"",
              "\"2 - Cartão de Crédito\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "description": "<p>Situação da conta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: 2,\n    nome: 'Nubank',\n    tipo: 2,\n    situacao: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Conta não existe",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/conta.js",
    "groupTitle": "Conta",
    "name": "GetContaId"
  },
  {
    "type": "post",
    "url": "/conta",
    "title": "Cadastro de Contas",
    "version": "1.0.0",
    "group": "Conta",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf'\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da conta [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Conta Corrente\"",
              "\"1 - Conta Poupança\"",
              "\"2 - Cartão de Crédito\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da Conta [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{ \n    nome: 'Banco do Brasil',\n    tipo: 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Conta Corrente\"",
              "\"1 - Conta Poupança\"",
              "\"2 - Cartão de Crédito\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da conta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "description": "<p>Situação da conta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: 1,\n    nome: 'Banco do Brasil',\n    tipo: 0,\n    situacao: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Pré-requisitos não preenchidos",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'nome',\n            mensagens: [\n                'O campo \"Nome\" deve ser informado'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/conta.js",
    "groupTitle": "Conta",
    "name": "PostConta"
  },
  {
    "type": "put",
    "url": "/conta/:id",
    "title": "Atualiza uma Conta",
    "version": "1.0.0",
    "group": "Conta",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf'\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da conta [Obrigatório]</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da conta [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Conta Corrente\"",
              "\"1 - Conta Poupança\"",
              "\"2 - Cartão de Crédito\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo da Conta [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "defaultValue": "0",
            "description": "<p>Situação da conta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Url ",
          "content": "http://api.gerdata.com/conta/2",
          "type": "text"
        },
        {
          "title": "Corpo da Requisição",
          "content": "{\n    nome: 'Nubank 2',\n    tipo: 2,\n    situacao: 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200\n{\n    sucesso: true,\n    mensagem: 'Conta atualizada com sucesso'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Pré-requisitos não preenchidos",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'nome',\n            mensagens: [\n                'O campo \"Nome\" deve ser informado'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/conta.js",
    "groupTitle": "Conta",
    "name": "PutContaId"
  },
  {
    "type": "post",
    "url": "/token",
    "title": "Token autenticado",
    "version": "1.0.0",
    "group": "Credencial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>Senha de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{\n    email: 'thiago@gerdata.com.br',\n    senha: '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataCadastro",
            "description": "<p>Data do cadastro do usuário (ISO 8601)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "description": "<p>Situação do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: '1',\n    nome: 'Thiago G. Gonzaga',\n    email: 'thiago@gerdata.com.br',\n    dataCadastro: \"2017-09-13T23:42:35.000Z\",\n    situacao: 0,\n    token: 'xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de autenticação",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/token.js",
    "groupTitle": "Credencial",
    "name": "PostToken"
  },
  {
    "type": "delete",
    "url": "/lancamento/:id",
    "title": "Exclui um lançamento",
    "version": "1.0.0",
    "group": "Lancamento",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da lançamento [Obrigatório]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200\n{\n    sucesso: true,\n    mensagem: 'Lançamento removido com sucesso'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lancamento.js",
    "groupTitle": "Lancamento",
    "name": "DeleteLancamentoId"
  },
  {
    "type": "get",
    "url": "/lancamento",
    "title": "Lista de Lançamentos",
    "version": "1.0.0",
    "group": "Lancamento",
    "description": "<p>Obtém uma lista de lançamentos do colaborador identificado pelo token.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number[1..25]",
            "optional": false,
            "field": "limit",
            "description": "<p>Número máximo de registros para retorno</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Início da leitura dos registros</p>"
          },
          {
            "group": "Query Params",
            "type": "String[60]",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição para filtro</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "cod_conta",
            "description": "<p>Código da conta relacionada ao lançamento</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "cod_categoria",
            "description": "<p>Código da categoria relacionada ao lançamento</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "defaultValue": "Todos",
            "description": "<p>Tipo de lançamento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo ",
          "content": "http://api.gerdata.com/lancamento?limit=25&offset=0&descricao=Combustível&tipo=0",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total de itens cadastrados</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Máximo de itens retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Início do cursor para buscar paginadas</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Lista de objetos de Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.codigo",
            "description": "<p>Código da Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.descricao",
            "description": "<p>Descrição do Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "data.tipo",
            "description": "<p>Tipo do Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.valor",
            "description": "<p>Valor do Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.data_emissao",
            "description": "<p>Data de emissão do documento referente ao lançamento (ISO 8601)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.data_vencimento",
            "description": "<p>Data de vencimento do Lançamento (ISO 8601)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.conta",
            "description": "<p>Conta vinculada ao lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.conta.codigo",
            "description": "<p>Código da conta onde o lançamento está vinculado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.conta.nome",
            "description": "<p>Nome da conta onde o lançamento está vinculado</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.categoria",
            "description": "<p>Categoria vinculada ao lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.categoria.codigo",
            "description": "<p>Código da categoria vinculada ao Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.categoria.nome",
            "description": "<p>Nome da categoria vinculada ao Lançamento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    total: 2, \n    limit: 25,\n    offset: 0,\n    data: [{\n        codigo: 1,\n        descricao: 'Combustível',\n        valor: 120,15,\n        data_emissao: '2017-09-02',\n        data_vencimento: '2017-09-10',\n        tipo: 0,\n        conta: {\n            codigo: 1,\n            nome: 'Conta Corrente'\n        },\n        categoria: {\n            codigo: 1,\n            nome: 'Automóvel'\n        }\n    },\n    {\n        codigo: 2,\n        descricao: 'Salário',\n        valor: 2300,\n        data_emissao: '2017-09-02',\n        data_vencimento: '2017-09-10',\n        tipo: 1,\n        conta: {\n            codigo: 1,\n            nome: 'Conta Corrente'\n        },\n        'categoria: {\n            codigo: 5,\n            nome: 'Salário'\n        }\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lancamento.js",
    "groupTitle": "Lancamento",
    "name": "GetLancamento"
  },
  {
    "type": "get",
    "url": "/lancamento/:id",
    "title": "Obter lançamento",
    "version": "1.0.0",
    "group": "Lancamento",
    "description": "<p>Obtém os dados de um lançamento utilizando o código de registro</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Código da lançamento [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo ",
          "content": "http://api.gerdata.com/lancamento/2",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código da Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo do Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "valor",
            "description": "<p>Valor do Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data_emissao",
            "description": "<p>Data de emissão do documento referente ao lançamento (ISO 8601)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data_vencimento",
            "description": "<p>Data de vencimento do Lançamento (ISO 8601)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "conta",
            "description": "<p>Conta vinculada ao lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "conta.codigo",
            "description": "<p>Código da conta onde o lançamento está vinculado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "conta.nome",
            "description": "<p>Nome da conta onde o lançamento está vinculado</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categoria",
            "description": "<p>Categoria vinculada ao lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoria.codigo",
            "description": "<p>Código da categoria vinculada ao Lançamento</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categoria.nome",
            "description": "<p>Nome da categoria vinculada ao Lançamento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    {\n        codigo: 1,\n        descricao: 'Combustível',\n        valor: 120,15,\n        data_emissao: '2017-09-02',\n        data_vencimento: '2017-09-10',\n        tipo: 0,\n        conta: {\n            codigo: 1,\n            nome: 'Conta Corrente'\n        },\n        categoria: {\n            codigo: 1,\n            nome: 'Automóvel'\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Lançamento não existe",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lancamento.js",
    "groupTitle": "Lancamento",
    "name": "GetLancamentoId"
  },
  {
    "type": "post",
    "url": "/lancamento",
    "title": "Cadastro de Lançamentos",
    "version": "1.0.0",
    "group": "Lancamento",
    "description": "<p>Inserir novos lançamentos para o usuário autenticado pelo token.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "defaultValue": "0",
            "description": "<p>Tipo do Lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "valor",
            "description": "<p>Valor do lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "data_emissao",
            "description": "<p>Data de emissão do documento utilizando o formato ISO 8601 (Javascript)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "data_vencimento",
            "description": "<p>Data de vencimento do documento no formato ISO 8601 [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cod_conta",
            "description": "<p>Código da conta para adição do lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cod_categoria",
            "description": "<p>Código da categoria relacionada ao lançamento [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{ \n    descricao: 'Restaurante',\n    tipo: 0,\n    valor: 13.50,\n    data_emissao: '2017-05-26',\n    data_vencimento: '2017-06-10',\n    cod_conta: 1,\n    cod_categoria: 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    sucesso: true,\n    codigo: 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Pré-requisitos não preenchidos",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'descricao',\n            mensagens: [\n                'O campo \"descricao\" deve ser informado'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Categoria Inválida",
          "content": "HTTP/1.1 412\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'cod_categoria',\n            mensagens: [\n                'Categoria não encontrada para vínculo com o lançamento.'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Conta Inválida",
          "content": "HTTP/1.1 412\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'cod_conta',\n            mensagens: [\n                'Conta não encontrada para inclusão do lançamento.'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lancamento.js",
    "groupTitle": "Lancamento",
    "name": "PostLancamento"
  },
  {
    "type": "put",
    "url": "/lancamento/:id",
    "title": "Atualiza um Lançamento",
    "version": "1.0.0",
    "group": "Lancamento",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"0 - Despesa\"",
              "\"1 - Receita\""
            ],
            "optional": false,
            "field": "tipo",
            "defaultValue": "0",
            "description": "<p>Tipo do Lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "valor",
            "description": "<p>Valor do lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "data_emissao",
            "description": "<p>Data de emissão do documento utilizando o formato ISO 8601 (Javascript)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "data_vencimento",
            "description": "<p>Data de vencimento do documento no formato ISO 8601 [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cod_conta",
            "description": "<p>Código da conta para adição do lançamento [Obrigatório]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cod_categoria",
            "description": "<p>Código da categoria relacionada ao lançamento [Obrigatório]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Url ",
          "content": "http://api.gerdata.com/lancamento/2",
          "type": "text"
        },
        {
          "title": "Exemplo",
          "content": "{ \n    descricao: 'Restaurante - Almoço',\n    tipo: 0,\n    valor: 13.50,\n    data_emissao: '2017-05-26',\n    data_vencimento: '2017-06-10',\n    cod_conta: 1,\n    cod_categoria: 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200\n{\n    sucesso: true,\n    mensagem: 'Lançamento atualizado com sucesso'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Pré-requisitos não preenchidos",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'descricao',\n            mensagens: [\n                'O campo \"descricao\" deve ser informado'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Categoria Inválida",
          "content": "HTTP/1.1 412\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'cod_categoria',\n            mensagens: [\n                'Categoria não encontrada para vínculo com o lançamento.'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Conta Inválida",
          "content": "HTTP/1.1 412\n{\n    sucesso: false,\n    erros: [\n        {\n            campo: 'cod_conta',\n            mensagens: [\n                'Conta não encontrada para inclusão do lançamento.'\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lancamento.js",
    "groupTitle": "Lancamento",
    "name": "PutLancamentoId"
  },
  {
    "type": "get",
    "url": "/",
    "title": "API Status",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Mensagem de status da API</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "versao",
            "description": "<p>Versão da API</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n  {\n      status: 'Finance API',\n      versao: '1.0'\n  }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "sampleRequest": [
      {
        "url": "http://api.gerdata.com"
      }
    ],
    "filename": "routes/index.js",
    "groupTitle": "Status",
    "name": "Get"
  },
  {
    "type": "get",
    "url": "/usuario",
    "title": "Exibe usuário autenticado",
    "version": "1.0.0",
    "group": "Usuario",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \n    Authorization: 'JWT xyz.abc.123.hgf' \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataCadastro",
            "description": "<p>Data do cadastro do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "description": "<p>Situação do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: 1,\n    nome: 'Thiago G. Gonzaga',\n    email: 'thiago@gerdata.com.br',\n    dataCadastro: \"2017-09-13T23:42:35.000Z\",\n    situacao: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de consulta",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "Usuário não autenticado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/usuario.js",
    "groupTitle": "Usuario",
    "name": "GetUsuario"
  },
  {
    "type": "post",
    "url": "/usuario",
    "title": "Cadastra novo usuário",
    "version": "1.0.0",
    "group": "Usuario",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do Usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de acesso</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>Senha para acesso a api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo",
          "content": "{\n    nome: 'Thiago G. Gonzaga',\n    email: 'thiago@gerdata.com.br',\n    senha: '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código de registro</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataCadastro",
            "description": "<p>Data do cadastro do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "allowedValues": [
              "\"0 - Ativo\"",
              "\"1 - Inativo\""
            ],
            "optional": false,
            "field": "situacao",
            "description": "<p>Situação do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    codigo: 1,\n    nome: 'Thiago G. Gonzaga',\n    email: 'thiago@gerdata.com.br',\n    dataCadastro: \"2017-09-13T23:42:35.000Z\",\n    situacao: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro no cadastro",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        },
        {
          "title": "E-mail existente",
          "content": "HTTP/1.1 412 \n{\n    sucesso: false,\n    mensagem: 'E-mail já está sendo utilizado.'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/usuario.js",
    "groupTitle": "Usuario",
    "name": "PostUsuario"
  }
] });
