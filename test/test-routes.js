const supertest = require('supertest');
const assert = require('assert');
const app = require('../index');

exports.default_route_should_respond_with_json = function(done) {
  supertest(app)
  .get('/')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(typeof(res.body) === 'object');
    assert.ok(Object.keys(res.body).length > 0);
    return done();
  });
};

exports.default_route_should_use_pagination_params = function(done) {
  supertest(app)
  .get('/?limit=4&offset=1')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body.data.length === 4);
    return done();
  });
};

exports.state_search_route_should_respond_with_json = function(done) {
  supertest(app)
  .get('/state/ny')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(typeof(res.body) === 'object');
    assert.ok(Object.keys(res.body).length > 0);
    return done();
  });
};

exports.state_search_route_should_use_pagination_params = function(done) {
  supertest(app)
  .get('/state/ca/?limit=10&offset=4')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body.data.length === 10);
    return done();
  });
};

exports.city_search_route_should_respond_with_json = function(done) {
  supertest(app)
  .get('/city/New York')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(typeof(res.body) === 'object');
    assert.ok(Object.keys(res.body).length > 0);
    return done();
  });
};

exports.city_search_route_should_use_pagination_params = function(done) {
  supertest(app)
  .get('/city/Philadelphia/?limit=3&offset=1')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body.data.length === 3);
    return done();
  });
};

exports.catogory_search_route_should_respond_with_json = function(done) {
  supertest(app)
  .get('/category/132%2051')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(typeof(res.body) === 'object');
    assert.ok(Object.keys(res.body).length > 0);
    return done();
  });
};

exports.catogory_search_route_should_use_pagination_params = function(done) {
  supertest(app)
  .get('/category/132%2051?limit=20&offset=7')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body.data.length === 20);
    return done();
  });
};

exports.download_route_should_respond_with_csv_file = function(done) {
  supertest(app)
  .get('/download')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.headers['content-type'] == 'text/csv; charset=utf-8');
    assert.ok(res.headers['content-length'] > 0);
    return done();
  });
};
