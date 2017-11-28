import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';
import fakeData from '../fake/fake';

chai.should();
chai.use(chaiHttp);

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
        res.body.should.have.property('message').equal('Please enter your username.');
        done();
      });
  });

  it('should not let user sign up with no firstname', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noFirstNameUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('Please enter your firstname.');
        done();
      });
  });


  it('should not let user sign up with no lastname', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noLastNameUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('Please enter your lastname.');
        done();
      });
  });

  it('should not let user sign up with no email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noEmailUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('Please enter your Email Address.');
        done();
      });
  });
  it('should not let user sign up with no password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noPasswordUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('please enter a password.');
        done();
      });
  });

  it('should not let user sign up with no confirm password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noConfirmPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('please re-confirm your password ');
        done();
      });
  });

  it('should not let user sign up with less password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.lessPass)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('length must be at least 5 characters for security ');
        done();
      });
  });

  it('should not let user sign up with password mismatch', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.passMismatchUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('password does not match, please check again');
        done();
      });
  });

  it('should successfully create a new user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.newUsers)
      .end((err, res) => {
        
        done();
      });
  });
});
