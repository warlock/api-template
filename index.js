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

if (conf.cors) app.use(cors())
if (conf.public.enable) app.use('/', express.static(conf.public.folder))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get(conf.http_api_route, (req, res) => {
  if (conf.mode === 'development') res.json({ status : 'development', system: "RxApi", Documentation : 'https://warlock.gitbooks.io/rxapi/content/', URL : 'https://www.npmjs.com/package/rxapi' })
  else res.send("")
})

app.listen(conf.http_port, () => {
  console.log(`HTTP PORT: ${conf.http_port}`)
  http_req(http_gen({ http : app, db : db }))
})

io.attach(conf.sockets_port)

io.on('connection', socket => {
  console.log(`PORT SOCKETS: ${conf.sockets_port}`)
  socket_req(socket_gen({ socket : socket, db : db }))
})
