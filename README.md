# projeto autoral-GeekBook

<p align="center">
  <img  src="./readMeAssets/book-removebg-preview.png">
</p>
<h1 align="center">
  GeekBook
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Sumário

- [Description](#description)
- [API Reference](#api-reference)
  - [Criar conta](#sign-up)
  - [Acessar conta](#sign-in)

<div id='description'/>

# Description

GeekBook é um gerenciamento de mangás, animes, séries e novels.

</br>

## Features

- Criar uma conta e acessá-la
- Cadastrar uma obra e mudar qual foi seu último capítulo/episódio visto
- Criar um top 10 ranking das suas obras cadastradas
- Compartilhar sua coleção e ranking atraves de um link

</br>

<div id='api-reference'/>

## API Reference

### Authentication routes

<div id='sign-up'/>

#### Criar uma conta

```http
POST /signup
```

<h3>Request:</h3>

| Params            | Type     | Description                                   |
| :---------------- | :------- | :-------------------------------------------- |
| `email`           | `string` | **Required**, **email format**                |
| `nickname`        | `string` | **Required**, **trim**, **max caractere(16)** |
| `avatar`          | `string` | **Required**, **uri**, **allow(null)**        |
| `password`        | `string` | **Required**, **min(3)**                      |
| `confirmPassword` | `string` | **Required**, **same as password**            |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                                |
| :---------- | :--------------------------------------------------- |
| `400`       | _Request in wrong format_                            |
| `409`       | _try to register with an existing email or nickname_ |

<h3>Success case (status code <span style="color:green">201</span>)</h3>

#

<div id='sign-in'/>

### Acessar uma conta

```http
POST /signin
```

<h3>Request:</h3>

| Params     | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**, **email format** |
| `password` | `string` | **Required**, **min(3)**       |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                       |
| :---------- | :------------------------------------------ |
| `400`       | _Email and/or password in incorrect format_ |
| `401`       | _Incorrect email and/or password_           |

<h3>Success case (status code <span style="color:green">200:</span>) and an object as a return. example:</h3>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1OTcxMTg1LCJleHAiOjE2Njg1NjMxODV9.2_7HCz4GjAE5RzmTQhFVhSAjqLBRkX51pRJ-3BCarRQ",
  "nickname": "pacheco",
  "avatar": "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/08/confira-o-elenco-da-serie-live-action-de-avatar-a-lenda-de-aang.jpg"
}
```

#

### rotas da categoria

#### Buscar todas as categorias

```http
GET /categories
```

<h3>Response:</h3>

<h3>Success case (status code <span style="color:green">200:</span>) and an array as a return. example:</h3>

```json
[
  {
    "id": 1,
    "name": "Mangá"
  },
  {
    "id": 2,
    "name": "Anime"
  },
  {
    "id": 5,
    "name": "Novel"
  },
  {
    "id": 6,
    "name": "Série"
  }
]
```

#

### rotas da coleção

#### Buscar todas as coleções por categoria

```http
GET /collections/:categoryId
```

<h3>Request:</h3>

<h4>Params:</h4>
send by params

| Params       | Type     | Description                      |
| :----------- | :------- | :------------------------------- |
| `categoryId` | `number` | **required**, **greater than 0** |

<h3>Response:</h3>

<h3>Success case (status code <span style="color:green">200:</span>) and an array as a return. example:</h3>

```json
[
  {
    "id": 15,
    "name": "One Piece",
    "categoryId": 1,
    "poster": "https://img-host.filestatic3.xyz/mangas_files/one-piece-br/image_one-piece-br_full.webp",
    "synopsis": "One Piece começa quando Gol D. Roger, o Rei Dos Piratas que possuiu tudo nesse mundo, antes de ser executado, diz que escondeu o seu tesouro em algum lugar da Grand Line, um oceano extremamente perigoso. Desde então muitos piratas se aventuram pela Grand Line para tentar encontrar o tesouro chamado One Piece. Um deles é Monkey D. Luffy, o garoto que, acidentalmente, comeu uma das Akuma No Mi, a Gomu Gomu No Mi (Fruta da Borracha), e agora ele pode esticar seu corpo como se fosse uma borracha. A jornada dele começa atrás de companheiros e um barco, que ele vai conseguindo pouco a pouco, pois tem um objetivo: Se tornar o Rei Dos Piratas.",
    "createdAt": "2022-09-30T23:39:26.746Z"
  },
  {
    "id": 16,
    "name": "One Punch-Man",
    "categoryId": 1,
    "poster": "https://img-host.filestatic3.xyz/mangas_files/one-punch-man/image_one-punch-man_full.webp",
    "synopsis": "A história segue o dia-a-dia de um herói normal que está infeliz por ser forte o bastante para derrotar todos os seus oponentes com apenas um soco, já que isso não lhe traz mais a sensação de adrenalina ao enfrentar um inimigo poderoso.",
    "createdAt": "2022-10-05T13:22:03.721Z"
  }
]
```

#

### rotas do status

#### Buscar todos os status

```http
GET /status
```

<h3>Request:</h3>

<h3>Success case (status code <span style="color:green">200:</span>) and an array as a return. example:</h3>

```json
[
  {
    "id": 1,
    "name": "Ativo"
  },
  {
    "id": 2,
    "name": "Completo"
  }
]
```

#

### rotas da coleção do usuário

#### Cadastrar uma obra na coleção do usuário

```http
POST /user-collections
```

<h3>Request:</h3>

<h4>Body</h4>

| Params       | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `categoryId` | `number` | **Required**, **greater than 0**       |
| `name`       | `string` | **Required**, **trim**                 |
| `synopsis`   | `string` | **Required**, **allow(null)**          |
| `poster`     | `string` | **Required**, **uri**, **allow(null)** |
| `lastSeen`   | `number` | **Required**, **greater than -1**      |
| `statusId`   | `number` | **Required**, **greater than 0**       |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                              |
| :---------- | :--------------------------------- |
| `400`       | _Request in wrong format_          |
| `401`       | _Invalid token_                    |
| `404`       | _categoryId or statusId not found_ |
| `426`       | _Outdated token_                   |
| `498`       | _Expired token_                    |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

#

#### Buscar todas as coleções do usuário

```http
GET /user-collections
```

<h3>Request:</h3>

<h4>Query</h4>
Caso seja passado o statusId, a lista retornada será filtrada pelo statusId

Ex: `/user-collections?statusId=1`

| Params     | Type     | Description        |
| :--------- | :------- | :----------------- |
| `statusId` | `number` | **greater than 0** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>) and an array as a return. example:</h3>

```json
[
  {
    "id": 62,
    "lastSeen": 1070,
    "status": {
      "id": 1,
      "name": "Ativo"
    },
    "collection": {
      "id": 15,
      "name": "One Piece",
      "poster": "https://img-host.filestatic3.xyz/mangas_files/one-piece-br/image_one-piece-br_full.webp",
      "synopsis": "One Piece começa quando Gol D. Roger, o Rei Dos Piratas que possuiu tudo nesse mundo, antes de ser executado, diz que escondeu o seu tesouro em algum lugar da Grand Line, um oceano extremamente perigoso. Desde então muitos piratas se aventuram pela Grand Line para tentar encontrar o tesouro chamado One Piece. Um deles é Monkey D. Luffy, o garoto que, acidentalmente, comeu uma das Akuma No Mi, a Gomu Gomu No Mi (Fruta da Borracha), e agora ele pode esticar seu corpo como se fosse uma borracha. A jornada dele começa atrás de companheiros e um barco, que ele vai conseguindo pouco a pouco, pois tem um objetivo: Se tornar o Rei Dos Piratas.",
      "category": {
        "id": 1,
        "name": "Mangá",
        "createdAt": "2022-09-30T22:29:07.695Z"
      }
    }
  },
  {
    "id": 66,
    "lastSeen": 8,
    "status": {
      "id": 2,
      "name": "Completo"
    },
    "collection": {
      "id": 17,
      "name": "O Senhor dos Anéis: Os Anéis de Poder 1ª Temporada",
      "poster": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ9a7cngBSAOKyqTdaBgbdSrYWceR4w9CqJJOojtaH532M-_8uF",
      "synopsis": "Antes da jornada de Frodo pela Terra-Média, a Segunda Era foi palco de diversas lendas heróicas. O drama épico que se passa milhares de anos antes de A Sociedade do Anel, tem foco em um momento da história em que grandes poderes foram forjados, reinos ascenderam e também ruíram, ao mesmo tempo em que heróis foram testados e tiveram a esperança quase aniquilada pelo grande vilão do universo de Senhor dos Anéis. A série começa em um momento de paz, quando o elenco de novos e antigos personagens precisam enfrentar o ressurgimento do mal, vindo das profundezas mais escuras das Montanhas Sombrias. Os reinos e personagens irão esculpir legados que viverão por muito tempo depois que eles se forem.",
      "category": {
        "id": 6,
        "name": "Série",
        "createdAt": "2022-09-30T22:29:07.695Z"
      }
    }
  },
  {
    "id": 67,
    "lastSeen": 120,
    "status": {
      "id": 1,
      "name": "Ativo"
    },
    "collection": {
      "id": 16,
      "name": "One Punch-Man",
      "poster": "https://img-host.filestatic3.xyz/mangas_files/one-punch-man/image_one-punch-man_full.webp",
      "synopsis": "A história segue o dia-a-dia de um herói normal que está infeliz por ser forte o bastante para derrotar todos os seus oponentes com apenas um soco, já que isso não lhe traz mais a sensação de adrenalina ao enfrentar um inimigo poderoso.",
      "category": {
        "id": 1,
        "name": "Mangá",
        "createdAt": "2022-09-30T22:29:07.695Z"
      }
    }
  }
]
```

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`JWT_SECRET = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/ThVinicius/geekBook_backEnd.git
```

Go to the project directory

```bash
  cd geekBook_backEnd
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma migrate dev
```

Create seed

```bash
  npm run seed
```

Start the server

```bash
  npm run dev
```

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

- Vinicius Pacheco is a student at Driven Education and is putting effort into it to switch careers. Nowadays he works with Engineering,
  looking forward to become a Dev.
  <br/>

#
