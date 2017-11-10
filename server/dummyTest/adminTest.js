process.env.NODE_ENV = 'test';

let admin = require('../dummyModels/adminDb');
let Book = require('../dummyModels/booksDb');

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
/*
  * Test the /PUT/:id route
  */
  describe('/api/v1/books/:bookId', () => {
    it('it should UPDATE a book given the id', (done) => {
        let book = {
            bookName: "The Lord of the Rings",
            description: "descibes the ays of the lords",
            author: "J.R.R. Tolkien",
            quantity:12,
            publishYear: 1954
           
        }
      //((err, book) => {
              chai.request(server)
              .put('/api/v1/books/' + book.id)
              .send(book)
              .end((err, res) => {
                  res.should.have.status(403);
                  res.body.should.be.a('object');
                 // res.body.should.have.property('quantity').eql('12');
                  //res.body.book.should.have.property('year').eql(1954);
                done();
              });
        });
    });
//});