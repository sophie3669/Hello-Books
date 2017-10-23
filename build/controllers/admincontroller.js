'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adminDb = require('../models/adminDb');

var _adminDb2 = _interopRequireDefault(_adminDb);

var _booksDb = require('../models/booksDb');

var _booksDb2 = _interopRequireDefault(_booksDb);

var _userDb = require('../models/userDb');

var _userDb2 = _interopRequireDefault(_userDb);

var _brwdBooksDb = require('../models/brwdBooksDb');

var _brwdBooksDb2 = _interopRequireDefault(_brwdBooksDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class Admin
  */
var Admin = function () {
  function Admin() {
    _classCallCheck(this, Admin);
  }

  _createClass(Admin, [{
    key: 'addBook',

    /**
    *
    * @param {object} req 
    * @param {object} res
    * @return {object} json object
    */

    value: function addBook(req, res) {
      var _req$body = req.body,
          id = _req$body.id,
          bookName = _req$body.bookName,
          description = _req$body.description,
          author = _req$body.author,
          quantity = _req$body.quantity,
          publishYear = _req$body.publishYear;

      if (_adminDb2.default.adminDb.filter(function (item) {
        return item.id === parseInt(id, 10);
      }).length === 1) {
        if (bookName && description && author && quantity && publishYear) {
          if (typeof bookName === 'string' && typeof description === 'string' && typeof author === 'string' && typeof quantity === 'string' && typeof publishYear === 'string') {
            var newId = _booksDb2.default.booksDb.length + 1;
            var newBook = _booksDb2.default.booksDb.push({
              bookId: newId,
              bookName: bookName,
              description: description,
              author: author,
              quantity: quantity,
              publishYear: publishYear
            });
            if (newBook) {
              res.status(201).send({
                message: 'book added by Admin user was successfully'

              });
            } else {
              res.status(500).send({
                message: 'failed to create new, try again'
              });
            }
          } else {
            res.status(400).send({
              message: ' data must be in strings!'
            });
          }
        } else {
          res.status(400).send({
            message: 'Incomplete book data!'

          });
        }
      } else {
        res.status(400).send({
          message: 'you are not authorised to add a book, kindly contact your system administrator!'
        });
      };
    }
  }, {
    key: 'modifyBook',
    value: function modifyBook(req, res) {
      var foundId = false;
      var _req$body2 = req.body,
          id = _req$body2.id,
          bookName = _req$body2.bookName,
          description = _req$body2.description,
          author = _req$body2.author,
          quantity = _req$body2.quantity,
          publishYear = _req$body2.publishYear;

      var bookId = req.params.bookId;
      if (_adminDb2.default.adminDb.filter(function (item) {
        return item.id === parseInt(id, 10);
      }).length === 1) {
        if (_booksDb2.default.booksDb.filter(function (item) {
          return item.bookId === parseInt(bookId, 10);
        }).length === 1) {
          if (typeof bookName === 'string' && typeof description === 'string' && typeof author === 'string' && typeof quantity === 'string' && typeof publishYear === 'string') {
            _booksDb2.default.booksDb.bookName = bookName || _booksDb2.default.booksDb.bookName;
            _booksDb2.default.booksDb.description = description || _booksDb2.default.booksdb.description;
            _booksDb2.default.booksDb.author = author || _booksDb2.default.booksDb.author;
            _booksDb2.default.booksDb.quantity = quantity || _booksDb2.default.booksDb.quantity;
            _booksDb2.default.booksDb.publishYear = publishYear || _booksDb2.default.booksDb.publishYear;
            foundId = true;
            res.status(201).send({
              message: 'book modified by Admin user was successfully',

              books: _booksDb2.default.booksDb

            });
          } else {
            res.status(400).send({
              message: 'kindly ensure all inputs are strings'
            });
          }
        } else {
          res.status(400).send({
            message: ' No book of such exists!'
          });
        }
      } else {
        res.status(403).send({
          message: 'you are not authorised to  a modify any book, kindly contact your system administrator!'
        });
      }
    }
  }, {
    key: 'acceptBrwdBooks',
    value: function acceptBrwdBooks(req, res) {
      var foundBookId = false;
      var foundUserId = false;
      var _req$body3 = req.body,
          adminId = _req$body3.adminId,
          dateBorrowed = _req$body3.dateBorrowed,
          dateToReturn = _req$body3.dateToReturn;

      var bookId = req.params.bookId;
      var userId = req.params.userId;
      if (Admin.adminDb.filter(function (item) {
        return item.adminId === parseInt(adminId, 10);
      }).length === 1) {
        if (_userDb2.default.userDb.filter(function (item) {
          return item.userId === parseInt(userId, 10);
        }).length === 1) {
          if (_booksDb2.default.booksDb.filter(function (item) {
            return item.bookId === parseInt(bookId, 10);
          }).length === 1) {
            if (_brwdBooksDb2.default.brwdBooksDb.filter(function (item) {
              return item.userId === parseInt(userId, 10);
            }).length === 1) {
              if (_booksDb2.default.booksDb.quantity >= 1) {
                if (typeof dateBorrowed === 'string' && typeof dateToReturn === 'string') {
                  var newbrwId = _brwdBooksDb2.default.brwdBooksDb.length + 1;
                  var newBrwdBook = _brwdBooksDb2.default.brwdBooksDb.push({
                    brwId: newbrwId,
                    bookId: bookId,
                    userId: userId,
                    dateBorrowed: dateBorrowed,
                    dateToReturn: dateToReturn,
                    brwApproval: "Approved",
                    rtnApproval: "yet to be returned"

                  });
                  foundBookId = true;
                  foundUserId = true;
                  res.status(201).send({
                    message: 'book accepted to be borrowed',
                    brwdBooks: _brwdBooksDb2.default.brwdBooksDb

                  });
                } else {
                  res.status(400).send({
                    message: 'kindly ensure all inputs are strings'
                  });
                }
              } else {
                res.status(401).send({
                  message: 'book not available to be borrowed, please make another request'
                });
              }
            } else {
              res.status(401).send({
                message: 'Sorry you must first return borrowed book before making another request'
              });
            }
          } else {
            res.status(400).send({
              message: ' No book of such exists!'
            });
          }
        } else {
          res.status(403).send({
            message: 'you are not authorised to borrow a book, kindly register to gain priviledge!'
          });
        }
      } else {
        res.status(403).send({
          message: 'Only System Administrator can Approve requests'
        });
      }
    }
  }, {
    key: 'acceptRtndBook',
    value: function acceptRtndBook(req, res) {
      var foundBookId = false;
      var foundUserId = false;
      var _req$body4 = req.body,
          adminId = _req$body4.adminId,
          dateReturned = _req$body4.dateReturned;

      var bookId = req.params.bookId;
      var userId = req.params.userId;

      if (_adminDb2.default.adminDb.filter(function (item) {
        return item.adminId === parseInt(adminId, 10);
      }).length === 1) {
        if (_brwdBooksDb2.default.brwdBooksDb.filter(function (item) {
          return item.bookId === parseInt(bookId, 10);
        }).length === 1) {
          if (_brwdBooksDb2.default.brwdBooksDb.filter(function (item) {
            return item.userId === parseInt(userId, 10);
          }).length === 1) {
            if (typeof dateBorrowed === 'string') {
              _brwdBooksDb2.default.brwdBooksDb.dateReturned = dateReturned;
              _brwdBooksDb2.default.brwdBooksDb.rtnApproval = "Approved";
              _brwdBooksDb2.default.brwdBooksDb.returnStatus = "returned";

              foundBookId = true;
              foundUserId = true;
              res.status(201).send({
                message: 'book accepted to be borrowed',
                brwdBooks: _brwdBooksDb2.default.brwdBooksDb

              });
            } else {
              res.status(400).send({
                message: 'kindly ensure date has a string value'
              });
            }
          } else {
            res.status(401).send({
              message: 'Sorry you might have mada a mistake, this book does not belong here'
            });
          }
        } else {
          res.status(400).send({
            message: ' No book of such exists!'
          });
        }
      } else {
        res.status(400).send({
          message: ' You do not have the right to Approve, contact our system admin!'
        });
      }
    }
  }]);

  return Admin;
}();

exports.default = Admin;
//# sourceMappingURL=admincontroller.js.map