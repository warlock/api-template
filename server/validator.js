const schema = require('../schema')
const sb = require('spellbook')

const check = (val, type) => {
  if (sb.empty(sb.get(sb, `is${sb.capitalize(type)}`))) return val
  else return sb.get(sb, `is${sb.capitalize(type)}`)(val)
}

const res = type => {
  switch (type) {
  case 'string':
    return 'Default string'
  case 'integer':
    return 1
  case 'number':
    return 123
  case 'function':
    return () => {}
  case 'object':
    return { object : 'object' }
  default:
    return 'Unknown type'
  }
}

module.exports = (model, data) => {
  if (Object.keys(schema[model]).length > 0) {
    let obj = {}
    Object.keys(schema[model]).forEach((key) => {
      if (check(data[key], schema[model][key])) obj[key] = data[key]
      else obj[key] = res(schema[model][key])
    })
    return obj
  } else return data
}
