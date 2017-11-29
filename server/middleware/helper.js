import sequelize from 'sequelize';
import { Books, Users, Votes, BorrowedBooks } from '../models';


const { Op } = sequelize.Op;

export default class Helpers {
  /**
       * Helper class to authenticate Users
       * @method userExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static userExists(req, res, next) {
    const id = parseInt(req.params.userId, 10);
    Users.findOne({ where: { id } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: "Sorry you're not an authorized user",
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to validate users input
       * @method isValidInputs
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static isValidInputs(req, res, next) {
    const {
      firstName, lastName, email, username, password, confirmPassword, role,
    } = req.body;
    if (username === '' || typeof username !== 'string' || !username) {
      return res.status(400).send({
        message: 'Please enter your username.',
      });
    }
    if (firstName === '' || typeof firstName !== 'string' || !firstName) {
      return res.status(400).send({
        message: 'Please enter your firstname.',
      });
    }
    if (lastName === '' || typeof lastName !== 'string' || !lastName) {
      return res.status(400).send({
        message: 'Please enter your lastname.',
      });
    }
    if (email === '' || typeof email !== 'string' || !email) {
      return res.status(400).send({
        message: 'Please enter your Email Address.',
      });
    }
    if (password === ' ' || !password) {
      return res.status(400).send({
        message: 'please enter a password.',
      });
    }
    if (password.length < 5) {
      return res.status(400).send({
        message: 'length must be at least 5 characters for security ',
      });
    }
    if (confirmPassword === ' ' || !confirmPassword) {
      return res.status(400).send({
        message: 'please re-confirm your password ',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({
        message: 'password does not match, please check again',
      });
    }
    if (role === ' ' || !role) {
      return res.status(400).send({
        message: 'please input a role',
      });
    }
    return next();
  }

  /**
       *  method to validate Login details
       * @method isValidUserLogin
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static isValidUserLogin(req, res, next) {
    const { username, email } = req.body;
    Users.findOne({ where: { username, email } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Sorry wrong username/email',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to check for valid inputs of  a book
       * @method bookExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static isValidBookInputs(req, res, next) {
    const {
      userId, bookName, description, author, quantity, publishYear,
    } = req.body;
    if (userId === '' || typeof userId !== 'number' || !userId) {
      return res.status(400).send({
        message: 'Please enter your userId.',
      });
    }
    if (bookName === '' || typeof bookName !== 'string' || !bookName) {
      return res.status(400).send({
        message: 'Please enter your book name.',
      });
    }
    if (description === '' || typeof description !== 'string' || !description) {
      return res.status(400).send({
        message: 'Please enter your book description.',
      });
    }
    if (author === '' || typeof bookName !== 'string' || !bookName) {
      return res.status(400).send({
        message: 'Please enter your book name.',
      });
    }
    return next();
  }

  /**
       *  method to check the existence of  a book
       * @method bookExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static bookExists(req, res, next) {
    const id = parseInt(req.params.bookId, 10);
    Books.findOne({ where: { id } })
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            message: 'Sorry! Book not found',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to check if Admin Exists
       * @method adminUserExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static adminUserExists(req, res, next) {
    const id = parseInt(req.body.id, 10);
    Users.findOne({ where: { id, role: 1 } })
      .then((admin) => {
        if (!admin) {
          return res.status(401).send({
            message: "Sorry you're not an authorized Amin, contact your DBMA",
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }


  /**
       *  method to check if Admin Exists
       * @method userAlreadyExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static UserAlreadyExists(req, res, next) {
    const email = parseInt(req.body.email, 10);
    Users.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          return res.status(401).send({
            message: 'Sorry user already exist',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to check for book quantiy
       * @method validBookQuantityExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static validBookQuantityExists(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    Books.findOne({ where: { id: bookId, quantity: { [Op.gt]: 1 } } })
      .then((book) => {
        if (!book) {
          return res.status(401).send({
            message: 'Sorry, we are out of stock for this book',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }


  /**
       *  method to check if pending record Exists
       * @method pendingRecordExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static PendingRecordExist(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    BorrowedBooks.findOne({ where: { bookId, userId, returnStatus: 'Not Returned' } })
      .then((report) => {
        if (report) {
          return res.status(401).send({
            message: 'Sorry, you must first return borrowed books before making another request',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to authenticate a return request
       * @method returnRequest
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static ReturnRequest(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    BorrowedBooks.findOne({ where: { bookId, userId, returnStatus: 'Not Returned' } })
      .then((report) => {
        if (!report) {
          return res.status(401).send({
            message: 'Sorry, you have no pending book to return',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to check the existence of a pending borrow request
       * @method PendingBorrowRequestExist
       * @param {object} req
       * @param {object} res
       * @return {json}
       */


  static PendingBorrowRequestExist(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    BorrowedBooks.findOne({ where: { bookId, userId, borrowApproval: 'Pending' } })
      .then((report) => {
        if (!report) {
          return res.status(401).send({
            message: 'No pending request recorded',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  /**
       *  method to check the existence of a pending return request
       * @method PendingReturnRequestExist
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static PendingReturnRequestExist(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    BorrowedBooks.findOne({
      where: {
        bookId,
        userId,
        borrowApproval: 'Approved',
        returnStatus: 'returned but not approved',
      },
    })
      .then((report) => {
        if (!report) {
          return res.status(401).send({
            message: 'No pending request recorded',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static userUpvoteExist(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    return Votes
      .findOne({ where: { bookId, userId, upVotes: 1 } })
      .then((report) => {
        if (report) {
          return res.status(401).send({
            message: 'you have already upVoted this book before',
          });
        }
        return next();
      });
  }

  static usersDownvoteExist(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);


    return Votes
      .findOne({ where: { bookId, userId, downVotes: 1 } })
      .then((report) => {
        if (report) {
          return res.status(401).send({
            message: 'you have already downVoted this book before',
          });
        }
        return next();
      });
  }
}
