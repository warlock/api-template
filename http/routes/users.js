const http = require('express').Router();

module.exports = db => {
  
  http.get('/', (req, res) => {
    res.json({ users : "hello" });
  });

  http.get('/bye', (req, res) => {
    res.json({ users : "bye" });
  });

  return http;
};