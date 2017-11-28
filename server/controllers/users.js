import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users, BorrowedBooks } from '../models';

require('dotenv').config();
/**
 * @class UserController
 */
export default class UserController {
  /**
   * Create account for a user
   * @method createUser
   * @param {object} req
   * @param {object} res
   * @return {json}
   */
  static createUser(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const {
      firstName, lastName, email, username, password, role,
    } = req.body;

    Users
      .create({
        firstName,
        lastName,
        email,
        username,
        password: bcrypt.hashSync(password, salt),
        confirmPassword: bcrypt.hashSync(password, salt),
        role,
      })
      .then(user => res.status(201).send(user))
      .catch(error => (error));
  }

  /**
       *  method to authenticate a registered user
       * @method login
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static login(req, res) {
    Users
      .findOne({
        where: {
          username: req.body.username,
        },
      }).then((users) => {
        bcrypt.compare(req.body.password, users.password, (err, response) => {
          if (response) {
            const token = jwt.sign({
              id: users.id,
              username: users.username,
            }, process.env.JWT_SECRET, { expiresIn: 86400 });
            return res.status(200).send({
              message: 'success',
              token,
            });
          }
          return res.status(400).send({ message: 'incorrect login details' });
        });
      })
      .catch(error => res.status(400).send(error));
  }

  /**
       *  method to borrow a book
       * @method borrowBook
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static borrowBook(req, res) {
    return BorrowedBooks
      .create({

        bookId: req.params.bookId,
        userId: req.params.userId,
        borrowedDate: req.body.borrowedDate,
        returnDate: req.body.returnDate,
        borrowApproval: 'Pending',
        returnApproval: 'Pending',
        returnStatus: 'Not Returned',
        dateReturned: req.body.returnDate,


      })
      .then(status => res.status(201).send(status))
      .catch(error => res.status(400).send(error));
  }
  /**
       *  method to return a borrowed book
       * @method returnBook
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static returnBook(req, res) {
    return BorrowedBooks
      .update({
        bookId: req.params.bookId,
        userId: req.params.userId,
        borrowedDate: req.body.borrowedDate,
        returnDate: req.body.returnDate,
        borrowApproval: 'Approved',
        returnApproval: 'Pending',
        returnStatus: 'returned but not approved',
        dateReturned: req.body.returnDate,


      })
      .then(status => res.status(201).send(status))
      .catch(error => res.status(400).send(error));
  }


  static signout(req, res) {
    return res.status(200).send({
      message: 'successfully signed off',
    });
  }
}

