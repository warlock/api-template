const users = require('./routes/users');
const articles = require('./routes/articles');

module.exports = (app, db, http, conf) => {

  if (conf.public.enable) {
    app.use('/', http.static(conf.public.folder));
  }
  app.use('/articles', articles(db));
  app.use('/users', users(db));
  
};