import sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

import { Books, Users, Votes, BorrowedBooks, ReadingList } from '../models';

// const { Op } = sequelize.Op;
const { gt } = sequelize.Op;

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
    const { email } = req.body;
    Users.findOne({ where: { email } })
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
      bookName, description, author, quantity, publishYear,
    } = req.body;
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
    if (quantity === '' || typeof quantity !== 'string' || !quantity) {
      return res.status(400).send({
        message: 'Please enter your book quantity.',
      });
    }

    if (publishYear === '' || typeof publishYear !== 'string' || !publishYear) {
      return res.status(400).send({
        message: 'Please enter your book published year.',
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

  static bookInList(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);
    ReadingList.findOne({ where: { bookId, userId } })
      .then((found) => {
        if (found) {
          return res.status(401).send({
            message: 'Sorry you have this book in your record already',
          });
        }
        return next();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
  static isValidreadlistInputs(req, res, next) {
    const { target } = req.body;
    if (target === '' || typeof target !== 'string' || !target) {
      return res.status(400).send({
        message: 'Please enter your book list target ',
      });
    }

    return next();
  }

  /**
       *  method to check if Admin Exists
       * @method userAlreadyExists
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static UserAlreadyExists(req, res, next) {
    const { email } = req.body;
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


  static emptyReturn(req, res, next) {
    if (!(Books.length > 1)) {
      return res.status(401).send({
        message: 'Sorry no books is available',
      });
    }
    return next();
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
    Books.findOne({
      where: {
        id: bookId,
        quantity: { [gt]: 1 },
      },
    })
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
      .findOne({
        where: {
          bookId, userId, upVotes: 1, downVotes: 0,
        },
      })
      .then((report) => {
        if (report) {
          return res.status(401).send({
            message: 'you have already upVoted this book before,you cannot vote more than once',
          });
        }
        return next();
      });
  }

  static usersDownvoteExist(req, res, next) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);


    return Votes
      .findOne({
        where: {
          bookId, userId, upVotes: 0, downVote: 1,
        },
      })
      .then((report) => {
        if (report) {
          return res.status(401).send({
            message: 'you cannot downvote this book more than once',
          });
        }
        return next();
      });
  }


  static authAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // This verifies the secret and checks the expressions
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          auth_success: false,
          err,
          message: 'Failed to authenticate token.',
        });
      }
      if (decoded.role !== 1) {
        return res.status(400).json({
          message: 'you are an unauthorised user',
        });
      }
      return next();
    });
  }

  static authUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // This verifies the secret and checks the expressions
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          auth_success: false,
          err,
          message: 'Failed to authenticate token.',
        });
      }
      if (decoded.role !== 2) {
        return res.status(400).json({
          message: 'you are an unauthorised user, books can only be borrowed by all registered users except admin',
        });
      }
      return next();
    });
  }
  static isActivetrue(req, res, next) {
    const { email } = req.body;

    return Users
      .findOne({ where: { email, active: false } })
      .then((report) => {
        if (!report) {
          return res.status(401).send({
            message: 'you are already active',
          });
        }
        return next();
      });
  }

  static isActivefalse(req, res, next) {
    const { email } = req.body;

    return Users
      .findOne({ where: { email, active: true } })
      .then((report) => {
        if (!report) {
          return res.status(401).send({
            message: 'sorry your session is expired',
          });
        }
        return next();
      });
  }
}
