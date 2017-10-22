//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let Book = require('../app/models/adminDb');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Admin', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Book.remove({}, (err) => { 
    //        done();         
    //     });     
    // });
    it('should add book', (done) => {
    chai.request(server)
        .post('/api/v1/books')
        .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eql(0);
            done();
        });
    });

});