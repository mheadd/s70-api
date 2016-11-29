const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const config = require('./config').config;

// Set up MySQL Connection.
let connection = mysql.createConnection(config.mysql);
connection.connect();

// Set up Express app.
let port = config.port  ;
let app = express();
app.use(cors());
app.listen(port);

// Get limit and offset params for pagination.
app.use(function(req, res, next) {
  req.query_limit = req.query.limit || 25;
  req.query_offset = req.query.offset || 0;
  next();
});

// Default route.
app.get('/', function(req, res, next) {
  req.query_string = config.queries.default
    .replace('%offset%', req.query_offset)
    .replace('%limit%', req.query_limit);
  next();
});

// Get contractors by state.
app.get('/state/:state', function(req, res, next) {
  req.query_string = config.queries.state
    .replace('%offset%', req.query_offset)
    .replace('%limit%', req.query_limit)
    .replace('%state%', req.params.state.toUpperCase());
  next();
});

// Get contractors by city.
app.get('/city/:city', function(req, res, next) {
  req.query_string = config.queries.city
    .replace('%offset%', req.query_offset)
    .replace('%limit%', req.query_limit)
    .replace('%city%', decodeURIComponent(req.params.city.toUpperCase()));
  next();
});

// Render the result for the client.
app.use(function(req, res) {
  connection.query(req.query_string, function(error, rows, fields) {
    if(error) {
      res.json({ result: "error", details: error });
    }
    else {
      res.json({ result: "success", data: rows });
    }
  });
});

module.exports = app;
