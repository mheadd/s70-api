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
app.get('/', function all(req, res, next) {
  req.query_type = arguments.callee.name;
  next();
});

// Get contractors by state.
app.get('/state/:state', function state(req, res, next) {
  req.query_type = arguments.callee.name;
  req.search_string = req.params.state;
  next();
});

// Get contractors by city.
app.get('/city/:city', function city(req, res, next) {
  req.query_type = arguments.callee.name;
  req.search_string = req.params.city;
  next();
});

// Get contractors by category.
app.get('/category/:category', function category(req, res, next) {
  req.query_type = arguments.callee.name;
  req.search_string = req.params.category;
  next();
});

// Download all data.
app.get('/download', function download(req, res, next) {
  req.query_type = arguments.callee.name;
  req.response_type = 'CSV';
  next();
});

// Render the result for the client.
app.use(function(req, res, next) {

  // Assemble query string.
  let query_string = config.tools.buildQuery(config.queries[req.query_type], req.query_limit, req.query_offset, req.query_type, req.search_string);

  // Execute query and render response.
  connection.query(query_string, function(error, rows, fields) {
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

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(500).send('An error occured');
});

module.exports = app;
