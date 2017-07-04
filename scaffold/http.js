module.exports = api => {
  api.gen('users', (http, db) => {
    http.get('/users/start/', (req, res) => {
      console.log('Starting user')
      db('users').insert({
        username: "username",
        surname: "surname",
        password: "password"
      })
      .then(res => {
        res.json(res)
      })
      .catch(err => {
        res.json(err)
      })
    })
  })

  api.gen('articles',  (http, db) => {
  })
}
