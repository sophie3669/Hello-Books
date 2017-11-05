//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Book = require('../models/booksDb');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js').default;

let should = chai.should();

chai.use(chaiHttp);
//Our parent block
//describe('Books', () => {
   // beforeEach((done) => { //Before each test we empty the database
        //Book.({}, (err) => { 
          // done();         
       // });     
   // });
/*
  * Test the /GET route
  */
  describe('/getBooks', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/V1/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
              done();
            });
      });
  });

//});