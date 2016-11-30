const express = require('express');
const mysql = require('mysql');
const csv = require('express-csv');
const config = require('./config').config;

// Set up MySQL Connection.
let connection = mysql.createConnection(config.mysql);
connection.connect();

// Set up Express app.
let port = config.port  ;
let app = express();
app.listen(port);

// Get limit and offset params for pagination.
app.use(function(req, res, next) {
  req.query_limit = req.query.limit || 25;
  req.query_offset = req.query.offset || 0;
  // Set default response format.
  req.response_type = 'JSON';
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

app.get('/download', function(req, res, next) {
  req.query_string = config.queries.download;
  req.response_type = 'CSV';
  next();
});

// Render the result for the client.
app.use(function(req, res) {
  connection.query(req.query_string, function(error, rows, fields) {
    if(error) {
      res.json({ result: "error", details: error });
    }
    else {
      if(req.response_type == 'CSV') {
        res.csv(rows);
      }
      else {
        res.set('Access-Control-Allow-Origin', '*');
        res.json({ result: "success", data: rows });
      }
    }
  });
});

module.exports = app;
