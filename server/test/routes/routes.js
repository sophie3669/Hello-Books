import chai from 'chai';
import { it, describe } from 'mocha';

import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);

describe('Hello Books', () => {
  it('should get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });

  it('should get 404 page', (done) => {
    chai.request(app)
      .get('/error')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(404);
        done();
      });
  });
});

