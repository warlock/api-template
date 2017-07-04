const conf = require('../conf')
const knex = require('knex')(conf.database[conf.mode])
const schema = require('./schema')
module.exports = () => {
  Object.keys(schema).forEach( model => {
    knex.schema.createTable(model, table => {
      table.increments('uid').primary()
      table.timestamps()
      Object.keys(schema[model]).forEach(value => {
        table[schema[model][value]](value)
      })
    })
  }).then(() => {
    console.log("Tablas creadas")
  })
  .catch(err => {
    console.log(err)
  })
}