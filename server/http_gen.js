module.exports = serv => {
  return {
    gen : (model, callback) => {
      serv.http.route(`/${model}`)
        .post((req, res) => {
          console.log(`${model} POST!`)
          serv.db(model).insert(req.body)
          .then(docs => {
            res.json({ res : true, total : docs })
          })
          .catch(err => {
            res.json({ query : 'post', model : model, err : JSON.stringify(err) })
          })
        })
        .get((req, res) => {
          console.log(`${model} GET ALL!`)
          serv.db.select().from(model)
          .then(docs => {
            res.json(docs)
          })
          .catch(err => {
            res.json({ query : 'get', model : model, err : JSON.stringify(err) })
          })
        })

      serv.http.route(`/${model}/:id`)
        .get((req, res) => {
          console.log(`${model} GET: ${req.params.id}`)
          serv.db.select().from(model).where({ id : req.params.id })
          .then(docs => {
            res.json(docs)
          })
          .catch(err => {
            res.json({ query : 'getById', model : model, err : JSON.stringify(err) })
          })
        })
        .put((req, res) => {
          console.log(`${model} PUT: ${req.params.id}`)
          serv.db(model).where({ id : req.params.id }).update(req.body)
          .then(docs => {
            res.json({ res : true, total : docs })
          })
          .catch(err => {
            res.json({ query : 'updateById', model : model, err : JSON.stringify(err) })
          })
        })
        .delete((req, res) => {
          console.log(`${model} DELETE: ${req.params.id}`)
          serv.db(model).where({ id : req.params.id }).delete()
          .then(docs => {
            res.json({ res : true, total : docs })
          })
          .catch(err => {
            res.json({ query : 'deleteById', model : model, err : JSON.stringify(err) })
          })
        })

      if (Object.prototype.toString.call(callback) == '[object Function]') callback(serv.http, serv.db)
    }
  }
}
