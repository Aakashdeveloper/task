

var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);
let auth;
describe('# UI Test Sequence', () => {
  beforeEach(async () => {
    chai
      .request('http://localhost:5100')
      .post('/api/authenticate')
      .set('content-type', 'application/json')
      .send(JSON.stringify({ username: 'test', password: 'test' }))
      .then(function (res) {
        auth = res.body.token;
      })
      .catch(function (err) {
        throw err;
      });
  })
  it('should return auth token', function (done) {
    // auth = async () => {
    chai
      .request('http://localhost:5100')
      .post('/api/authenticate')
      .set('content-type', 'application/json')
      .send(JSON.stringify({ username: 'test', password: 'test' }))
      .then(function (res) {
        expect(res).to.have.status(200);
        done();
      })
      .catch(function (err) {
        throw err;
      });
  }
  );



  it('should return auth token (Negative scenario)', function (done) {
    chai
      .request('http://localhost:5100')
      .post('/api/authenticate')
      .set('content-type', 'application/json')
      .send(JSON.stringify({ username: 'test', password: 'test' }))
      .then(function (res) {
        expect(res).not.to.status(400);
        done();
      })
      .catch(function (err) {
        throw err;
      });
  }
  );



  it('should initialise generator function', function (done) {
    chai
      .request('http://localhost:5100')
      .post('/api/generator/factorialSeq')
      .set("Authorization", `Bearer ${auth}`)
      // .set('content-type', 'application/json')
      .then(function (res) {
        expect(res).to.have.status(201);
        done();
      })
      .catch(function (err) {
        throw err;
      });
  }
  );




  it('should return Factorial Seq next value', function (done) {
    chai
      .request('http://localhost:5100')
      .post('/api/generator/factorialSeq')
      .set("Authorization", `Bearer ${auth}`)
      .then(function (res) {
        chai
          .request('http://localhost:5100')
          .get('/api/generator/next')
          .set("Authorization", `Bearer ${auth}`)
          .then(function (res) {
            expect(res).not.to.status(200);
            done();
          })
          .catch(function (err) {
            throw err;
          });

      })
      .catch(function (err) {
        throw err;
      });
  });
});
