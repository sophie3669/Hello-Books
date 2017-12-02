import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users, BorrowedBooks, ReadingList, Books } from '../models';

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
        active: false,
      })
      .then((users) => {
        const token = jwt.sign({
          id: users.id,
          username: users.username,
          role: users.role,
        }, process.env.JWT_SECRET, { expiresIn: 86400 });
        return res.status(200).send({
          users,
          message: 'success',
          token,

        });
      });
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
          email: req.body.email,
        },
      }).then((users) => {
        bcrypt.compare(req.body.password, users.password, (err, response) => {
          if (response) {
            users.update({ active: true });
            const token = jwt.sign({
              id: users.id,
              username: users.username,
              role: users.role,
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

  static createReadingList(req, res) {
    return ReadingList
      .create({

        bookId: req.params.bookId,
        userId: req.params.userId,
        target: req.body.target,

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


  static searchByAuthor(req, res) {
    const { authorName } = req.body;


    return Books
      .findAll({ where: { author: authorName } })
      .then((result) => {
        if (result.length < 1) {
          return res.status(404).json({
            status: 'Unsuccessful',
            message: 'Record Not Found',
          });
        }
        return res.status(200).send(result);
      });
  }


  static signout(req, res) {
    const { email } = req.body;
    Users.findOne({ where: { email } })
      .then((user) => {
        user.update({ active: false })
          .then(() =>
            res.status(200)
              .json({
                message: `You have successfully logged out ${user.username}`,
              }));
      });
  }
}

