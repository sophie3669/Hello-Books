import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import fakeData from '../fake/fake';
//import {Users} from '../models/users';
import { Users } from '../../models/users';

describe('Users Controller', () => {
    /* db
      .users
      .destroy({
        cascade: true, 
        truncate: true
      }); */
    
    it('should not let user sign up with no username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.noUsernameUsers)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('username').equal('Please Enter Username');
          done();
        });
    });

});