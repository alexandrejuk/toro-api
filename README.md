## TORO API

[![Toro API](https://github.com/alexandrejuk/toro-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/alexandrejuk/toro-api/actions/workflows/deploy.yml)

Este projeto contém duas funções Lambda na AWS. Uma função fornece as cinco melhores ações da bolsa de valores e a outra realiza transferências de dinheiro entre contas bancárias. É importante ressaltar que este é apenas um ambiente de teste e não tem nenhum impacto no mundo real. Nenhuma transferência de dinheiro será efetuada durante a execução deste projeto.

### Como Executar o Projeto

#### Pré-requisitos

- Node.js instalado na sua máquina
- Conta na AWS com as credenciais configuradas localmente

#### Instalação e Deploy

1. Clone o repositório para sua máquina local:

```
git clone git@github.com:alexandrejuk/toro-api.git
```

2. Navegue até o diretório do projeto:

```
cd toro-api
```

3. Instale as dependências do projeto:

```
npm install
```

4. Deploy do projeto:

```
serverless deploy
```

#### Execução

Para executar as funções Lambda localmente, você pode usar o framework Serverless. Você deve exportar a variável de ambiente do banco de dados e importar os dados do banco.

Exportando variável de ambiente:

```
export MONGODB_URI=mongodb://localhost:27020/toro
```

Importando a coleção de customers:

```
mongoimport --host localhost --db toro --collection customers --file ./backup_database/customers.json
```

Importando a coleção de stocks:

```
mongoimport --host localhost --db toro --collection stocks --file ./backup_database/stocks.json
```
```

#### Testes

Para executar os testes unitários e de integração, você deve usar o comando `npm test`:

```
npm test
```

### Endpoints

O projeto possui três endpoints:

1. **GET /trends**: Retorna as cinco melhores ações da bolsa de valores. Para o endpoint **POST /trends**, o curl específico seria:

```bash
curl -X GET https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/trends
```

2. **POST /spb/events**: Realiza transferências de dinheiro entre contas bancárias. Para o endpoint **POST /spb/events**, o curl com o payload específico seria:

```bash
  curl -X POST https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/spb/events -d '{"event": "TRANSFER", "target": {"bank": "352", "branch": "0001", "account": "300123"}, "origin": {"bank": "033", "branch": "03312", "cpf": "98765432101"}, "amount": 1000}'
```

3. **POST /orders**: Realiza compra de ações. Para o endpoint **POST /orders**, o curl com o payload específico seria:

```bash
  curl -X POST https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/orders -d '{"symbol": "TORO4", "amount": 3, "customerId": "<customerId>"}'
```

### Autor

[Alexandre Soares](https://github.com/alexandrejuk)
