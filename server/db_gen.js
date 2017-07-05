const conf = require('../conf')
const knex = require('knex')(conf.database[conf.mode])
const schema = require('../schema')
module.exports = () => {
  Object.keys(schema).forEach( model => {
    knex.schema.createTableIfNotExists(model, table => {
      table.increments('id').primary()
      table.timestamps()
      Object.keys(schema[model]).forEach(value => {
        table[schema[model][value]](value)
      })
    }).then(() => {
      console.log(`Database -> ENTITY: ${model}`)
    })
    .catch(err => {
      console.error(`Database -> ERROR: ${err}`)
    })
  })
  return knex
}