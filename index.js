const express = require('express'),
  bodyParser = require('body-parser'),
  conf = require('./conf'),
  cors = require('cors'),
  io = require('socket.io')({ transports: ['websocket'] }),
  app = express(),
  knexfile = require('./knexfile'),
  knex = require('knex')(knexfile[conf.mode]),
  gen_router = require('./http/router'),
  ws = require('./sockets/events.js');

if (conf.sockets) io.attach(conf.sockets_port);
if (conf.cors) app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
gen_router(app, knex, express, conf);

app.listen(conf.http_port, () => {
  console.log(`HTTP PORT: ${conf.http_port}`);
});

io.on('connection', socket => {
  console.log(`PORT SOCKETS: ${conf.sockets_port}`);
  ws(socket, knex);
});