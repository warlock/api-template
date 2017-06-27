module.exports = {
  http_port: 3000,
  sockets_port: 3001,
  database: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    },
    pool: { min: 0, max: 7 }
  }
}