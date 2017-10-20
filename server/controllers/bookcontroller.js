import books from '../models/booksDb';

/**
  * @class Books
  */
  export default class Books {
    /**
   *
   * @param {object} req 
   * @param {object} res
   * @return {object} json object
   */
   

   getBooks(req, res) {
       res.status(200).send(books.booksDb);
      }
  }