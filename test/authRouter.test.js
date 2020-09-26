const request = require('supertest');
const sinon = require('sinon');
const app = require('./../app');
const axios = require('axios');
const { assert } = require('chai');

describe('Auth Router()', () => {
  let axiosPostStub;
  let axiosGetStub;

  beforeEach(() => {
    axiosPostStub = sinon
      .stub(axios, 'post')
      .resolves({ data: { access_token: 2468 } });

    axiosGetStub = sinon.stub(axios, 'get').resolves({
      data: { name: 'sukhdev', bio: 'hello', avatar_url: 'url' },
    });
  });

  afterEach(done => {
    axiosPostStub.restore();
    axiosGetStub.restore();
    sinon.restore();
    done();
  });

  describe('GET /api/auth/login', () => {
    it('should redirect to the github authorization server', done => {
      request(app)
        .get('/api/auth/login')
        .expect(302)
        .expect('Location', /\/github.com\/login\/oauth\//)
        .expect('Location', /1234/)
        .end(() => {
          app.locals.redisClient.end(true);
          done();
        });
    });
  });

  describe('GET /api/auth/callback', () => {
    it('should should redirect to the app after saving user details', done => {
      request(app)
        .get('/api/auth/callback?code=1234')
        .expect(() => {
          assert.ok(axiosPostStub.calledOnce);
          assert.ok(axiosGetStub.calledOnce);
        })
        .expect(302)
        .expect('Location', /localhost:3000/)
        .end(() => {
          app.locals.redisClient.end(true);
          done();
        });
    });
  });
});
