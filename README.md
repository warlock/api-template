# RxApi - FAST HTTP & WEBSOCKETS API GENERATOR
>
>https://warlock.gitbooks.io/rxapi/content
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
### Basic configuration:
```js
module.exports = {
  http_port: 3000,
  sockets_port: 3001,
  mode: 'development', // knex database configuration
  //http_api_route: '/api',
  public : {
    enable : true,
    folder : 'public'
  },
  cors : true,
  sockets : true
};
```

### Database configuration and "knex" migrations:
Document database configuration "./knexfile.js":
```js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
```

### HTTP Router:
Router configuration file in "./http/router.js":
```js
const users = require('./routes/users');
const articles = require('./routes/articles');

module.exports = (app, db, http) => {

  app.use('/articles', articles(db));
  app.use('/users', users(db));

};
```

### HTTP Routes configuration:
Files in "./http/routes/users.js"
```js
const http = require('express').Router();

module.exports = db => {

  http.get('/firstUser', (req, res) => {
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
  });

  http.get('/bye', (req, res) => {
    res.json({ response : "bye" });
  });

  return http;
};
```

### Web sockets events configuration:
Files in "./sockets/events.js"
```js
module.exports = (socket, db) => {

  socket.on('hello', data => {
    console.log(`Hello ${data.name}`);
  });

};
```

## Middleware or helpers in folder "./helpers"

### Run server:
```sh
npm start
```

### Knex basics:
```sh
sudo npm i knex -g

knex init # Create a empty knexfile.js
knex migrate:latest # Run the last migration
knex migrate:make users # Create a new migration

```

### Dependencies thanks
- Express.js [http://expressjs.com/](http://expressjs.com)
- Socket.io [http://socket.io](http://socket.io)
- Knex [http://knexjs.org](http://knexjs.org)
- Body-parser [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)

### License

The MIT License (MIT) Copyright (c) 2015 Josep Subils Rigau (josep@spellbook.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
