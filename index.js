const express = require('express'),
  bodyParser = require('body-parser'),
  conf = require('./conf'),
  cors = require('cors'),
  io = require('socket.io')({ transports: ['websocket'] }),
  app = express(),
  http_gen = require('./server/http_gen'),
  socket_gen = require('./server/socket_gen'),
  db_gen = require('./server/db_gen'),
  db = db_gen(),
  http_req = require('./scaffold/http'),
  socket_req = require('./scaffold/socket')

app.use(cors())
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status : true,  info : 'https://www.npmjs.com/package/rxapi' })
})

app.listen(conf.http_port, () => {
  console.log(`HTTP: ${conf.http_port} SOCKETS: ${conf.sockets_port}`)
  http_req(http_gen({ http : app, db : db }))
})

io.attach(conf.sockets_port)

io.on('connection', socket => {
  socket_req(socket_gen({ socket : socket, db : db }))
})
