const express = require('express');

let port = 3000;

let app = express();

app.get('/', function(req, res) {
  res.status(400).end();
});

app.listen(port);
module.exports = app;
