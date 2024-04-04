# TORO API
[![Toro API](https://github.com/alexandrejuk/toro-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/alexandrejuk/toro-api/actions/workflows/deploy.yml)

Este é um projeto contém duas funções Lambda na AWS. Uma função fornece os cinco melhores ações da bolsa de valores e a outra realiza transferências de dinheiro entre contas bancárias.É importante ressaltar que este é apenas um ambiente de teste e não tem nenhum impacto no mundo real. Nenhuma transferência de dinheiro será efetuada durante a execução deste projeto.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado na sua máquina
- Conta na AWS com as credenciais configuradas localmente

### Instalação e deploy

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

### Execução

Para executar as funções Lambda localmente, você pode usar o framework Serverless.

1. Execute a função que fornece os cinco melhores ações:

```
sls invoke local -f trends
```

2. Execute a função que realiza transferências de dinheiro:

```
sls invoke local -f spbevents
```

3. Execute a função que realiza compra de ações:

```
sls invoke local -f order
```

### Testes

Para executar os testes  unitários e de integração, você deve usar o comando npm test:

```
npm test
```

## Endpoints

O projeto possui três endpoints:

1. **GET /trends**: Retorna os cinco melhores ações da bolsa de valores. Para o endpoint **POST /trends**, o curl específico seria:

```bash
curl -X GET https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/trends
```

2. **POST /spb/events**: Realiza transferências de dinheiro entre contas bancárias. Para o endpoint **POST /spb/events**, o curl com o payload específico seria:

```bash
curl -X POST https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/spb/events -d '{"event": "TRANSFER", "target": {"bank": "352", "branch": "0001", "account": "300123"}, "origin": {"bank": "033", "branch": "03312", "cpf": "12345678901"}, "amount": 1000}'
```

3. **POST /orders**: Realiza compra de ações. Para o endpoint **POST /orders**, o curl com o payload específico seria:

```bash
curl -X POST https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/orders -d '{"symbol": "TORO4", "amount": 3, "customerId": "<customerId>"}'
```

## Autor
[Alexandre Soares](https://github.com/alexandrejuk)
