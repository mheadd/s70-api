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
app.use((req, res, next) => {
  req.query_limit = parseInt(req.query.limit) || 25;
  req.query_offset = parseInt(req.query.offset) || 0;
  req.response_type = req.query.format || 'JSON';
  next();
});

// Default route.
app.get('/', (req, res, next) => {
  req.query_string = config.queries.all;
  next();
});

// Get contractors by state.
app.get('/state/:state', (req, res, next) => {
  req.query_string = config.queries.state;
  req.search_string = req.params.state;
  next();
});

// Get contractors by city.
app.get('/city/:city', (req, res, next) => {
  req.query_string = config.queries.city;
  req.search_string = req.params.city;
  next();
});

// Get contractors by category.
app.get('/category/:category', (req, res, next) => {
  req.query_string = config.queries.category;
  req.search_string = req.params.category;
  next();
});

// Download all data.
app.get('/download', (req, res, next) => {
  req.query_string = config.queries.download;
  req.response_type = 'CSV';
  next();
});

// Render the result for the client.
app.use((req, res, next) => {

  // Assemble replacment vaues for SQL query templates.
  let replaceValues = [req.query_offset, req.query_limit];
  if(req.search_string) {
    replaceValues.unshift(req.search_string.toUpperCase());
  }

  // Execute query and render response.
  connection.query(req.query_string, replaceValues, (error, rows, fields) => {
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
app.use((err, req, res, next) => {
  res.status(500).send('An error occured');
});

module.exports = app;
