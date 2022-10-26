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

# Summary

- [Description](#description)
- [API Reference](#api-reference)
  - [Create an account](#sign-up)
  - [Access account](#sign-in)
  - [Category routes](#category-routes)
    - [Get all categories](#get-categories)
  - [Collection routes](#collection-routes)
    - [Get collection by category](#get-collections-category)
  - [Status routes](#status-routes)
    - [Get status](#get-status)
  - [User collection routes](#user-collection-routes)
    - [Register a work in the user's collection](#post-user-collection)
    - [Get all user collections](#get-user-collection)
    - [Update the last chapter/episode of one of the works in the user's collection](#update-last-seen)
    - [Update the status of one of the works in the user's collection](#update-status)
    - [Delete a work from your collection](#delete-user-collection)
  - [Ranking routes](#ranking-routes)
    - [Position a work in your ranking](#post-ranking)
    - [Remove a work from the ranking](#delete-ranking)
    - [Update ranking position by another work](#update-ranking)
    - [Get the top 10 user ranking](#get-ranking)
    - [get all unranked user collections](#get-ranking-user-collection)
  - [Share routes](#share-routes)
    - [Create a share link](#post-share)
    - [Get the link owner's collection and ranking](#get-share)

<div id='description'/>

# Description

GeekBook is a management of manga, anime, series and novels.

</br>

## Features

- Create an account and access it
- Register a work and change its last seen chapter/episode
- Create a top 10 ranking of your registered works
- Share your collection and ranking via a link

</br>

<div id='api-reference'/>

## API Reference

### Authentication routes

<div id='sign-up'/>

#### Create an account

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

### Access an account

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

<div id='category-routes'/>

### Category routes

<div id='get-categories'/>

#### Get all categories

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

<div id='collection-routes'/>

### Collection routes

<div id='get-collections-category'/>

#### Get all collections by category

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

<div id='status-routes'/>

### Status routes

<div id='get-status'/>

#### Get all status

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

<div id='user-collection-routes'/>

### User collection routes

<div id='post-user-collection'/>

#### Register a work in the user's collection

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

<div id='get-user-collection'/>

#### Get all user collections

```http
GET /user-collections
```

<h3>Request:</h3>

<h4>Query</h4>
If the statusId is passed, the returned list will be filtered by the statusId

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

<div id='update-last-seen'/>

#### Update the last chapter/episode of one of the works in the user's collection

```http
PATCH /user-collections/last-seen
```

<h3>Request:</h3>

<h4>Body</h4>

| Params         | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `collectionId` | `number` | **Required**, **greater than 0** |
| `lastSeen`     | `number` | **greater than -1**              |
| `increment`    | `number` | **valid(-1, 1)**                 |

must send the lastSeen or the increment

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
| `404`       | _collectionId not found_  |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

#

<div id='update-status'/>

#### Update the status of one of the works in the user's collection

```http
PATCH /user-collections/status
```

<h3>Request:</h3>

<h4>Body</h4>

| Params     | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `id`       | `number` | **Required**, **greater than 0** |
| `statusId` | `number` | **Required**, **greater than 0** |

id: user-collection id

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                      |
| :---------- | :------------------------- |
| `400`       | _Request in wrong format_  |
| `401`       | _Invalid token_            |
| `404`       | _id or statusId not found_ |
| `426`       | _Outdated token_           |
| `498`       | _Expired token_            |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

#

<div id='delete-user-collection'/>

#### Delete a work from your collection

```http
DELETE /user-collections/:id
```

<h3>Request:</h3>

<h4>Params</h4>

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **Required**, **greater than 0** |

id: user-collection id

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
| `404`       | _id not found_            |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

#

<div id='ranking-routes'/>

### Ranking routes

<div id='post-ranking'/>

#### Position a work in your ranking

```http
POST /rankings
```

<h3>Request:</h3>

<h4>Body</h4>

| Params             | Type     | Description                           |
| :----------------- | :------- | :------------------------------------ |
| `userCollectionId` | `number` | **Required**, **greater than 0**      |
| `position`         | `number` | **Required**, **min(1)**, **max(10)** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                        |
| :---------- | :--------------------------- |
| `400`       | _Request in wrong format_    |
| `401`       | _Invalid token_              |
| `404`       | _userCollectionId not found_ |
| `409`       | _The work is already ranked_ |
| `426`       | _Outdated token_             |
| `498`       | _Expired token_              |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

#

<div id='delete-ranking'/>

#### Remove a work from the ranking

```http
DELETE /rankings/:id
```

<h3>Request:</h3>

<h4>Params</h4>

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **Required**, **greater than 0** |

id: ranking id

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
| `404`       | _id not found_            |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

#

<div id='update-ranking'/>

#### Update ranking position by another work

```http
PATCH /rankings
```

<h3>Request:</h3>

<h4>Body</h4>

| Params             | Type     | Description                      |
| :----------------- | :------- | :------------------------------- |
| `id`               | `number` | **Required**, **greater than 0** |
| `userCollectionId` | `number` | **Required**, **greater than 0** |

id: ranking id

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                                |
| :---------- | :--------------------------------------------------- |
| `400`       | _Request in wrong format_                            |
| `401`       | _Invalid token_                                      |
| `404`       | _id or userCollectionId not found_                   |
| `409`       | _try to update the ranking by an already ranked one_ |
| `426`       | _Outdated token_                                     |
| `498`       | _Expired token_                                      |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

#

<div id='get-ranking'/>

#### Get the top 10 user ranking

```http
GET /rankings
```

<h3>Request:</h3>

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
    "rankingId": null,
    "position": 1,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": 54,
    "position": 2,
    "userCollectionId": 67,
    "name": "One Punch-Man",
    "poster": "https://img-host.filestatic3.xyz/mangas_files/one-punch-man/image_one-punch-man_full.webp",
    "synopsis": "A história segue o dia-a-dia de um herói normal que está infeliz por ser forte o bastante para derrotar todos os seus oponentes com apenas um soco, já que isso não lhe traz mais a sensação de adrenalina ao enfrentar um inimigo poderoso.",
    "category": "Mangá",
    "status": "Ativo",
    "lastSeen": 120
  },
  {
    "rankingId": 52,
    "position": 3,
    "userCollectionId": 62,
    "name": "One Piece",
    "poster": "https://img-host.filestatic3.xyz/mangas_files/one-piece-br/image_one-piece-br_full.webp",
    "synopsis": "One Piece começa quando Gol D. Roger, o Rei Dos Piratas que possuiu tudo nesse mundo, antes de ser executado, diz que escondeu o seu tesouro em algum lugar da Grand Line, um oceano extremamente perigoso. Desde então muitos piratas se aventuram pela Grand Line para tentar encontrar o tesouro chamado One Piece. Um deles é Monkey D. Luffy, o garoto que, acidentalmente, comeu uma das Akuma No Mi, a Gomu Gomu No Mi (Fruta da Borracha), e agora ele pode esticar seu corpo como se fosse uma borracha. A jornada dele começa atrás de companheiros e um barco, que ele vai conseguindo pouco a pouco, pois tem um objetivo: Se tornar o Rei Dos Piratas.",
    "category": "Mangá",
    "status": "Ativo",
    "lastSeen": 1070
  },
  {
    "rankingId": null,
    "position": 4,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": null,
    "position": 5,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": null,
    "position": 6,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": null,
    "position": 7,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": null,
    "position": 8,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": null,
    "position": 9,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  },
  {
    "rankingId": null,
    "position": 10,
    "userCollectionId": null,
    "name": null,
    "poster": null,
    "synopsis": null,
    "category": null,
    "status": null,
    "lastSeen": null
  }
]
```

#

<div id='get-ranking-user-collection'/>

#### get all unranked user collections

```http
GET /rankings/user-collections
```

<h3>Request:</h3>

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
    "userCollectionId": 66,
    "name": "O Senhor dos Anéis: Os Anéis de Poder 1ª Temporada",
    "poster": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ9a7cngBSAOKyqTdaBgbdSrYWceR4w9CqJJOojtaH532M-_8uF",
    "synopsis": "Antes da jornada de Frodo pela Terra-Média, a Segunda Era foi palco de diversas lendas heróicas. O drama épico que se passa milhares de anos antes de A Sociedade do Anel, tem foco em um momento da história em que grandes poderes foram forjados, reinos ascenderam e também ruíram, ao mesmo tempo em que heróis foram testados e tiveram a esperança quase aniquilada pelo grande vilão do universo de Senhor dos Anéis. A série começa em um momento de paz, quando o elenco de novos e antigos personagens precisam enfrentar o ressurgimento do mal, vindo das profundezas mais escuras das Montanhas Sombrias. Os reinos e personagens irão esculpir legados que viverão por muito tempo depois que eles se forem.",
    "category": "Série",
    "status": "Completo",
    "lastSeen": 8
  }
]
```

#

<div id='share-routes'/>

### Share routes

<div id='post-share'/>

#### Create a share link

```http
POST /shares
```

<h3>Request:</h3>

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

<h3>Success case (status code <span style="color:green">201:</span>) and an object as a return. example:</h3>

```json
{
  "id": 1,
  "userId": 1,
  "shortUrl": "iMIDBSB9m"
}
```

#

<div id='get-share'/>

#### Get the link owner's collection and ranking

```http
GET /share/:shortUrl
```

<h3>Request:</h3>

<h4>Params:</h4>
Send the token (Bearer token)

| Params     | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `shortUrl` | `string` | **required**, **trim**, **length(9)** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `404`       | _link not found_          |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>) and an object as a return. example:</h3>

```json
{
  "userCollections": [
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
  ],
  "ranking": [
    {
      "rankingId": null,
      "position": 1,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": 54,
      "position": 2,
      "userCollectionId": 67,
      "name": "One Punch-Man",
      "poster": "https://img-host.filestatic3.xyz/mangas_files/one-punch-man/image_one-punch-man_full.webp",
      "synopsis": "A história segue o dia-a-dia de um herói normal que está infeliz por ser forte o bastante para derrotar todos os seus oponentes com apenas um soco, já que isso não lhe traz mais a sensação de adrenalina ao enfrentar um inimigo poderoso.",
      "category": "Mangá",
      "status": "Ativo",
      "lastSeen": 120
    },
    {
      "rankingId": 52,
      "position": 3,
      "userCollectionId": 62,
      "name": "One Piece",
      "poster": "https://img-host.filestatic3.xyz/mangas_files/one-piece-br/image_one-piece-br_full.webp",
      "synopsis": "One Piece começa quando Gol D. Roger, o Rei Dos Piratas que possuiu tudo nesse mundo, antes de ser executado, diz que escondeu o seu tesouro em algum lugar da Grand Line, um oceano extremamente perigoso. Desde então muitos piratas se aventuram pela Grand Line para tentar encontrar o tesouro chamado One Piece. Um deles é Monkey D. Luffy, o garoto que, acidentalmente, comeu uma das Akuma No Mi, a Gomu Gomu No Mi (Fruta da Borracha), e agora ele pode esticar seu corpo como se fosse uma borracha. A jornada dele começa atrás de companheiros e um barco, que ele vai conseguindo pouco a pouco, pois tem um objetivo: Se tornar o Rei Dos Piratas.",
      "category": "Mangá",
      "status": "Ativo",
      "lastSeen": 1070
    },
    {
      "rankingId": null,
      "position": 4,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": null,
      "position": 5,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": null,
      "position": 6,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": null,
      "position": 7,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": null,
      "position": 8,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": null,
      "position": 9,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    },
    {
      "rankingId": null,
      "position": 10,
      "userCollectionId": null,
      "name": null,
      "poster": null,
      "synopsis": null,
      "category": null,
      "status": null,
      "lastSeen": null
    }
  ],
  "nickname": "pacheco",
  "avatar": "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/08/confira-o-elenco-da-serie-live-action-de-avatar-a-lenda-de-aang.jpg"
}
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
