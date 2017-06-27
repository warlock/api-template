const conf = require('../conf')
const knex = require('knex')(conf.database[conf.mode])
module.exports = knex
