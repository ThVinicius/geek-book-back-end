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

- [Descrição](#description)
- [Documentação da API](#api-reference)
  - [Rotas de autenticação](#authentication-routes)
    - [Criar uma conta](#sign-up)
    - [Acessar uma conta](#sign-in)
    - [Login com o github](#signin-github)
    - [Cadastro com o github](#signup-github)
  - [Rotas da categoria](#category-routes)
    - [Buscar todas as categorias](#get-categories)
  - [Rotas da coleção](#collection-routes)
    - [Buscar as coleções por categoria](#get-collections-category)
  - [Rotas do status](#status-routes)
    - [Buscar todos os status](#get-status)
  - [Rotas da coleção do usuário](#user-collection-routes)
    - [Registrar uma obra na coleção do usuário](#post-user-collection)
    - [Buscar todas as coleções do usuário](#get-user-collection)
    - [Atualizar o ultimo capitulo/episodio da obra na coleção do usuário](#update-last-seen)
    - [Atualizar o status da obra na coleção do usuário](#update-status)
    - [Atualizar a visualização da obra na coleção do usuário](#update-public)
    - [Deletar uma obra da coleção do usuário](#delete-user-collection)
  - [Rotas do ranking](#ranking-routes)
    - [Posicionar uma obra no ranking](#post-ranking)
    - [Remover uma obra do ranking](#delete-ranking)
    - [Substituir uma obra por outra na mesma posição do ranking](#update-ranking)
    - [Buscar o top 10 da coleção do usuário](#get-ranking)
    - [Buscar todas as obras não rankeados do usuário](#get-ranking-user-collection)
  - [Rotas de compartilhamento](#share-routes)
    - [Criar um link de compartilhamento](#post-share)
    - [Buscar a coleção do usuário e o ranking do dono daquele link](#get-share)
- [Variávies de ambiente](#environment-variables)
- [Rodar localmente](#run-local)

<div id='description'/>

# Descrição

GeekBook é um gerenciador de manga, anime, séries e novels.

</br>

## Funções

- Crie uma conta e acesse-a
- Registre uma obra e altere seu último capítulo/episódio visto
- Crie um ranking top 10 de suas obras cadastradas
- Compartilhe sua coleção e classificação por meio de um link

</br>

<div id='api-reference'/>

## Documentação da API

<div id='authentication-routes'/>

### Rotas de autenticação

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

| Status code | Cause                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Requisição no formato incorreto_          |
| `409`       | _Conflito de email ou nickname existentes_ |

<h3>Em caso de sucesso: (status code <span style="color:green">201</span>)</h3>

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

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Email ou senha incorretos_       |

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>) e um objeto com retorno. exemplo:</h3>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1OTcxMTg1LCJleHAiOjE2Njg1NjMxODV9.2_7HCz4GjAE5RzmTQhFVhSAjqLBRkX51pRJ-3BCarRQ",
  "nickname": "pacheco",
  "avatar": "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/08/confira-o-elenco-da-serie-live-action-de-avatar-a-lenda-de-aang.jpg"
}
```

#

<div id='signin-github'/>

#### Login com github

```http
POST /signin/github
```

<h3>Request:</h3>
Enviar o código de acesso, que o github disponibiliza ao fazer a permissão de acesso, pelo body

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `code` | `string` | **Required** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Código inválido ou incorreto_    |
| `409`       | _Conflito com o nickname_         |

Em caso de conflito é também mandado um token com as informações do usuário para poder terminar seu cadastro na rota de [cadastro com o github](#signup-github)

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>) e um objeto com retorno. exemplo:</h3>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1OTcxMTg1LCJleHAiOjE2Njg1NjMxODV9.2_7HCz4GjAE5RzmTQhFVhSAjqLBRkX51pRJ-3BCarRQ",
  "nickname": "pacheco",
  "avatar": "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/08/confira-o-elenco-da-serie-live-action-de-avatar-a-lenda-de-aang.jpg"
}
```

<div id='signup-github'/>

#### Cadastro com o github

Caso o login com o github de errado é necessário fazer o cadastro do nickname

Caso de erro do login:

- username do github já esta em uso.
  - nesse caso é solicitado ao usuário cadastrado um nickname único

```http
POST /signup/oauth
```

<h3>Request (body):</h3>

| Params     | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `nickname` | `string` | **Required**, **trim**, **max(16)** |

<h4>Headers:</h4>
Enviar o token fornecido na rota de login com o github (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `409`       | _Conflito com o nickname_         |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

Em caso de conflito é também mandado um token com as informações do usuário.

<h3>Response:</h3>

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>) e um objeto com retorno. exemplo:</h3>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1OTcxMTg1LCJleHAiOjE2Njg1NjMxODV9.2_7HCz4GjAE5RzmTQhFVhSAjqLBRkX51pRJ-3BCarRQ",
  "nickname": "pacheco",
  "avatar": "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/08/confira-o-elenco-da-serie-live-action-de-avatar-a-lenda-de-aang.jpg"
}
```

<div id='category-routes'/>

### Rotas da categoria

<div id='get-categories'/>

#### Buscar todas as categorias

```http
GET /categories
```

<h3>Response:</h3>

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>) e um array com retorno. exemplo:</h3>

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

### Rotas da coleção

<div id='get-collections-category'/>

#### Buscar as coleções por categoria

```http
GET /collections/:categoryId
```

<h3>Request:</h3>

<h4>Params:</h4>
Enviar por params

| Params       | Type     | Description                      |
| :----------- | :------- | :------------------------------- |
| `categoryId` | `number` | **required**, **greater than 0** |

<h3>Response:</h3>

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>) e um array com retorno. exemplo:</h3>

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

### Rotas do status

<div id='get-status'/>

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

<div id='user-collection-routes'/>

### Rotas da coleção do usuário

<div id='post-user-collection'/>

#### Registrar uma obra na coleção do usuário

```http
POST /user-collections
```

<h3>Request:</h3>

<h4>Body</h4>

| Params        | Type      | Description                            |
| :------------ | :-------- | :------------------------------------- |
| `categoryId`  | `number`  | **Required**, **greater than 0**       |
| `name`        | `string`  | **Required**, **trim**                 |
| `synopsis`    | `string`  | **Required**, **allow(null)**          |
| `poster`      | `string`  | **Required**, **uri**, **allow(null)** |
| `lastSeen`    | `number`  | **Required**, **greater than -1**      |
| `statusId`    | `number`  | **Required**, **greater than 0**       |
| `publicValue` | `boolean` | **Required**                           |

<h4>Headers:</h4>
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                   |
| :---------- | :-------------------------------------- |
| `400`       | _Requisição no formato incorreto_       |
| `401`       | _Token inválido_                        |
| `404`       | _categoryId ou statusId não encontrado_ |
| `426`       | _Token desatualizado_                   |
| `498`       | _Token expirado_                        |

<h3>Em caso de sucesso: (status code <span style="color:green">201:</span>)</h3>

#

<div id='get-user-collection'/>

#### Buscar todas as coleções do usuário

```http
GET /user-collections
```

<h3>Request:</h3>

<h4>Query</h4>

Se o `statusId` for passado, a lista retornada será filtrada pelo statusId

Ex: `/user-collections?statusId=1`

| Params     | Type     | Description        |
| :--------- | :------- | :----------------- |
| `statusId` | `number` | **greater than 0** |

<h4>Headers:</h4>
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>) e um array como retorno. example:</h3>

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

#### Atualizar o ultimo capitulo/episodio da obra na coleção do usuário

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

Deve se enviar o `lastSeen` ou o `increment`. Não é possivel mandar os dois juntos

<h4>Headers:</h4>
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `404`       | _collectionId não encontrado_     |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>)</h3>

#

<div id='update-status'/>

#### Atualizar o status da obra na coleção do usuário

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
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `404`       | _id ou statusId não encontrado_   |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>)</h3>

#

<div id='update-public'/>

#### Atualizar a visualização da obra na coleção do usuário

```http
PATCH /user-collections/public
```

<h3>Request:</h3>

<h4>Body</h4>

| Params        | Type      | Description                      |
| :------------ | :-------- | :------------------------------- |
| `id`          | `number`  | **Required**, **greater than 0** |
| `publicValue` | `boolean` | **Required**                     |

id: user-collection id

<h4>Headers:</h4>
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `404`       | _id não encontrado_               |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>)</h3>

#

<div id='delete-user-collection'/>

#### Deletar uma obra da coleção do usuário

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
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `404`       | _id não encontrado_               |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>)</h3>

#

<div id='ranking-routes'/>

### Rotas do ranking

<div id='post-ranking'/>

#### Posicionar uma obra no ranking

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

<h3>Em caso de sucesso (status code <span style="color:green">201:</span>)</h3>

#

<div id='delete-ranking'/>

#### Remover uma obra do ranking

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
Enviar o token (Bearer token)

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

<h3>Em caso de sucesso: (status code <span style="color:green">201:</span>)</h3>

#

<div id='update-ranking'/>

#### Substituir uma obra por outra na mesma posição do ranking

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

| Status code | Cause                                                     |
| :---------- | :-------------------------------------------------------- |
| `400`       | _Requisição no formato incorreto_                         |
| `401`       | _Token inválido_                                          |
| `404`       | _id ou userCollectionId não encontrado_                   |
| `409`       | _tentar atualizar o ranking por uma obra já classificada_ |
| `426`       | _Token desatualizado_                                     |
| `498`       | _Token expirado_                                          |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>)</h3>

#

<div id='get-ranking'/>

#### Buscar o top 10 da coleção do usuário

```http
GET /rankings
```

<h3>Request:</h3>

<h4>Headers:</h4>
Enviar o token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>) e um array como retorno. example:</h3>

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

#### Buscar todas as obras não rankeados do usuário

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

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso: (status code <span style="color:green">200:</span>) e um array como retorno. example:</h3>

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

### Rotas de compartilhamento

<div id='post-share'/>

#### Criar um link de compartilhamento

```http
POST /shares
```

<h3>Request:</h3>

<h4>Headers:</h4>
Enviar o token (Bearer token)

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

<h3>Em caso de sucesso: (status code <span style="color:green">201:</span>) e um objeto como retorno. example:</h3>

```json
{
  "id": 1,
  "userId": 1,
  "shortUrl": "iMIDBSB9m"
}
```

#

<div id='get-share'/>

#### Buscar a coleção do usuário e o ranking do dono daquele link

```http
GET /share/:shortUrl
```

<h3>Request:</h3>

<h4>Params:</h4>
Enviar o token (Bearer token)

| Params     | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `shortUrl` | `string` | **required**, **trim**, **length(9)** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |
| `404`       | _link não encontrado_             |
| `426`       | _Token desatualizado_             |
| `498`       | _Token expirado_                  |

<h3>Em caso de sucesso (status code <span style="color:green">200:</span>) e um objeto como retorno. example:</h3>

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

<div id='environment-variables'/>

## Variáveis de ambiente

Para executar este projeto, você precisará adicionar as seguintes variáveis ​​de ambiente ao seu arquivo `.env`

`DATABASE_URL`

- Ex: postgres://UserName:Password@Hostname:5432/DatabaseName

`PORT`

- número da porta (recomendado 5000)

`JWT_SECRET`

- qualquer string

`JWT_SECRET_OAUTH`

- qualquer string

`CLIENT_ID`

- número do client_id do github oauth

`CLIENT_SECRET=`

- string secreto do github oauth

`REDIRECT_URL`

- Deve terminar com `/oauth/github/`
  - Ex: localhost:5000/oauth/github/

[Github OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

</br>

<div id='run-local'/>

## Rodar localmente

Versão do NodeJS
16.15.0

Clone o projeto

```bash
  git clone https://github.com/ThVinicius/geekBook_backEnd.git
```

Vá para o diretório do projeto

```bash
  cd geekBook_backEnd
```

Instale as dependências

```bash
  npm install
```

Crie o banco de dados

```bash
  npx prisma migrate dev
```

Crie as sementes

```bash
  npm run seed
```

Inicie o servidor

```bash
  npm run dev
```

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>
