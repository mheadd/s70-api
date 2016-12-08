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
if(!module.parent){
    app.listen(3000);
}

// Get limit and offset params for pagination.
app.use(function(req, res, next) {
  req.query_limit = req.query.limit || 25;
  req.query_offset = req.query.offset || 0;
  req.response_type = req.query.format || 'JSON';
  next();
});

// Default route.
app.get('/', function(req, res, next) {
  req.query_string = config.tools.buildQuery(config.queries.default, req.query_limit, req.query_offset);
  next();
});

// Get contractors by state.
app.get('/state/:state', function(req, res, next) {
  req.query_string = config.tools.buildQuery(config.queries.state, req.query_limit, req.query_offset, 'state', req.params.state);
  next();
});

// Get contractors by city.
app.get('/city/:city', function(req, res, next) {
  req.query_string = config.tools.buildQuery(config.queries.city, req.query_limit, req.query_offset, 'city', req.params.city);
  next();
});

// Get contractos by category.
app.get('/category/:category', function(req, res, next) {
  req.query_string = config.tools.buildQuery(config.queries.category, req.query_limit, req.query_offset, 'category', req.params.category);
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
      if(req.response_type.toUpperCase() == 'CSV') {
        res.csv(rows);
      }
      else {
        res.set('Access-Control-Allow-Origin', '*');
        res.json({ result: "success", count: rows.length , data: rows });
      }
    }
  });
});

module.exports = app;
