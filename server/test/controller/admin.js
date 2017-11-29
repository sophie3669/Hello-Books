import chaiHttp from 'chai-http';
import chai from 'chai';
import { it, describe } from 'mocha';
import fakeData from '../fake/fake';

import app from '../../app';


chai.use(chaiHttp);

describe('Admin Controller ', () => {
  /* db
        .users
        .destroy({
          cascade: true,
          truncate: true
        }); */

  it('should not create a book with no userId', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send(fakeData.noUserId)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('Please enter your userId.');
        done();
      });
  });
});
