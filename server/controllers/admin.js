import { Books, BorrowedBooks } from '../models';


export default class adminController {
  /**
    *  method to add a book
    * @method addBook
    * @param {object} req
    * @param {object} res
    * @return {json}
  */

  static addBook(req, res) {
    Books
      .create({
        userId: req.body.id,
        bookName: req.body.bookName,
        description: req.body.description,
        author: req.body.author,
        quantity: req.body.quantity,
        publishYear: req.body.publishYear,
        upVotes: 0,
        downVotes: 0,

      })
      .then(book => res.status(201).send(book))
      .catch(error => res.status(400).send(error));
  }

  /**
       *  method to modify/update a book
       * @method modifyBook
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static modifyBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);

    return Books
      .findById(bookId)

      .then((books) => {
        if (!books) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return books
          .update({
            bookId: Books.bookId,
            bookName: req.body.bookName || Books.bookName,
            description: req.body.description || Books.description,
            author: req.body.author || Books.author,
            quantity: req.body.quantity || Books.quantity,
            publishYear: req.body.publishYear || Books.publishYear,
            upVotes: books.upVotes,
            downVotes: books.downVotes,
          })
          .then(() => res.status(200).send(books)) // Send back the updated book.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
       *  method to accept a borrowed book
       * @method accceptBorrowedBooks
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static acceptBorrowedBooks(req, res) {
    return BorrowedBooks
      .update({
        bookId: req.params.bookId,
        userId: req.params.userId,
        borrowedDate: req.body.borrowedDate,
        returnDate: req.body.returnDate,
        borrowApproval: 'Approved',
        returnApproval: 'Pending',
        returnStatus: 'Not Returned',
        dateReturned: req.body.returnDate,


      })
      .then(() => res.status(200).send(Books)) // Send back the updated borrowed book.
      .catch(error => res.status(400).send(error));
  }

  /**
       *  method to accept a returned book
       * @method acceptReturnedBooks
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static acceptReturnedBooks(req, res) {
    return BorrowedBooks
      .update({
        bookId: req.params.bookId,
        userId: req.params.userId,
        borrowedDate: req.body.borrowedDate,
        returnDate: req.body.returnDate,
        borrowApproval: 'Approved',
        returnApproval: 'Approved',
        returnStatus: 'Returned',
        dateReturned: req.body.returnDate,


      })
      .then(() => res.status(200).send(BorrowedBooks)) // Send back the updated borrowed book.
      .catch(error => res.status(400).send(error));
  }
}

