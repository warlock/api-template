const users = require('./routes/users');
const articles = require('./routes/articles');

module.exports = (app, db, http) => {
  app.use('/articles', articles(db));
  app.use('/users', users(db));
};