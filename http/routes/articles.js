const http = require('express').Router();

module.exports = db => {
  
  http.get('/', (req, res) => {
    res.json({ articles : "hello" });
  });

  http.get('/bye', (req, res) => {
    res.json({ articles : "bye" });
  });

  return http;
};