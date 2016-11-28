const supertest = require('supertest');
const assert = require('assert')
const app = require('../index');

exports.default_route_should_respond_with_json = function(done) {
  supertest(app)
  .get('/')
  .expect(200)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(typeof(res.body) === 'object');
    return done();
  });
};
