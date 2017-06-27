const conf = require('../conf')
const knex = require('knex')(conf)
module.exports = knex
