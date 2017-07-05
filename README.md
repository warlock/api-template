# RxApi - FAST HTTP & WEBSOCKETS API GENERATOR
>
>https://warlock.gitbooks.io/rxapi/content/
>
>https://www.npmjs.com/package/rxapi
>

### Install from npm
```sh
sudo npm i rxapi -g
rxapi new project
```

### Git Install
```sh
git clone https://github.com/warlock/api-template.git
cd api-template
npm i
```


### Generate models schema in 'schema.js'
```js
module.exports = {
  users: {
    username : "string",
    surname : "string",
    password : "string"
  },
  articles: {
    title : "string",
    creation : "date",
    tags : "string",
    content : "text",
    author : "string"
  }
}

```

### Generate HTTP RESTFULL scaffold in 'scaffold/http.js':
```js
module.exports = api => {

  api.gen('articles')

}
```

### Generate SOCKET.IO scaffold in 'scaffold/socket.js':
```js
module.exports = api => {

  api.gen('articles' (socket, db) => {
    console.log('SOCKET Articles listening...')
  })

}
```

### Run
```sh
npm start
```

### HTTP API RESTFULL Routes
Articles demo:

| HTTP Route             | Verb     | Description                    |
| ---------------------- |:--------:| ------------------------------:|
| /articles              |  GET     | Get all articles               |
| /articles              |  POST    | Create a article               |
| /articles/:article_id  |  GET     | Get a single article           |
| /articles/:article_id  |  PUT     | Update a article with new info |
| /articles/:article_id  |  DELETE  | Delete article                 |


### SOCKET.IO SCAFFOLD
Articles demo:

| Emit and events   | Description                    |
| ----------------- | ------------------------------:|
| articlesGetAll    | Get all articles               |
| articlesAdd       | Create a article               |
| articlesGet       | Get a single article           |
| articlesUpdate    | Update a article with new info |
| articlesDelete    | Delete article                 |

### Add fast features in HTTP with callback:
```js
api.gen('users', (http, db) => {
  console.log("HTTP USERS API LISTENING")

  http.get('/users/start/', (req, res) => {
    db('users').insert({
      username: "username",
      surname: "surname",
      password: "password"
    })
    .then(res => {
      res.json(res)
    })
    .catch(err => {
      res.json(err)
    })
  })

})
```

### Add fast features in SOCKET with callback:
```js
api.gen('articles', (socket, db) => {
  socket.on('helloArticles', data => {
    socket.emit('responseArticles', "hello!")
  })
})
```


### Dependencies thanks
- Express.js [http://expressjs.com/](http://expressjs.com)
- Socket.io [http://socket.io](http://socket.io)
- Body-parser [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)
- Knex [http://knexjs.org](http://knexjs.org)
- NeDB [https://github.com/louischatriot/nedb](https://github.com/louischatriot/nedb)
- Spellbook [http://www.spellbook.io](http://www.spellbook.io)
- Nexo [https://github.com/warlock/nexo](https://github.com/warlock/nexo)


### License

The MIT License (MIT) Copyright (c) 2015 Josep Subils Rigau (josep@spellbook.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
