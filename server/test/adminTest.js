process.env.NODE_ENV = 'test';

let admin = require('../models/adminDb');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js').default;

let should = chai.should();

chai.use(chaiHttp);

describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
      let book = {
          bookName: "The Lord of the Rings",
          description: "descibes the ays of the lords",
          author: "J.R.R. Tolkien",
          quantity:12,
          publishYear: 1954
         
      }
      chai.request(server)
          .post('/addBooks')
          .send(book)
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
             // res.body.should.have.property('errors');
             // res.body.errors.should.have.property('pages');
             // res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});