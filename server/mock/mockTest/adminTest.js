process.env.NODE_ENV = 'test';

let admin = require('../dummyModels/adminDb');
let Book = require('../dummyModels/booksDb');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js').default;

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
/*
  * Test the /PUT/:id route
  */
  describe('PUT: /api/v1/books/:bookId', () => {
    it('it should UPDATE a book', (done) => {
        let book = {
            id: 1,
            bookName: "The Lord of the Rings",
            description: "descibes the ays of the lords",
            author: "J.R.R. Tolkien",
            quantity:12,
            publishYear: 1954
           
        }
      //((err, book) => {
              chai.request(server)
              .put(`/api/v1/books/${1}`)
              .send(book)
              .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                 res.body.should.have.property('message').eql('book modified by Admin user was successfully');
                  //res.body.book.should.have.property('year').eql(1954);
                done();
              });
        });
    });
//});