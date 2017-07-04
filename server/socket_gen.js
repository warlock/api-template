module.exports = serv => {
  return {
    gen : (model, callback) => {
      serv.socket.on(`${model}GetAll`, (data) => {
        serv.db.select().from(model)
        .then(docs => {
          res.json(docs)
        })
        .catch(err => {
          console.log(`SOCKET getArticles ERROR: ${err}`)
          res.json({ query : 'get', model : model, err : JSON.stringify(err) })
        })
      })

      serv.socket.on(`${model}Add`, (data) => {
        serv.db(model).insert(req.body)
        .then(docs => {
          res.json({ res : true, total : docs })
        })
        .catch(err => {
          console.log(`SOCKET ${model}Add ERROR: ${err}`)
          res.json({ query : 'post', model : model, err : JSON.stringify(err) })
        })
      })

      serv.socket.on(`${model}Get`, (data) => {
        serv.db.select().from(model).where({ id : req.params.id })
        .then(docs => {
          res.json(docs)
        })
        .catch(err => {
          console.log(`SOCKET ${model}Get ERROR: ${err}`)
          res.json({ query : 'getById', model : model, err : JSON.stringify(err) })
        })
      })

      serv.socket.on(`${model}Update`, (data) => {
        serv.db(model).where({ id : req.params.id }).update(req.body)
        .then(docs => {
          res.json({ res : true, total : docs })
        })
        .catch(err => {
          console.log(`SOCKET ${model}Update ERROR: ${err}`)
          res.json({ query : 'updateById', model : model, err : JSON.stringify(err) })
        })
      })

      serv.socket.on(`${model}Delete`, (data) => {
        serv.db(model).where({ id : req.params.id }).delete()
        .then(docs => {
          res.json({ res : true, total : docs })
        })
        .catch(err => {
          console.log(`SOCKET ${model}Delete ERROR: ${err}`)
          res.json({ query : 'deleteById', model : model, err : JSON.stringify(err) })
        })
      })

      if (Object.prototype.toString.call(callback) == '[object Function]') callback(serv.socket, serv.db)
    }
  }
}
