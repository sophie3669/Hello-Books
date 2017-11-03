'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _booksDb = require('../models/booksDb');

var _booksDb2 = _interopRequireDefault(_booksDb);

var _userDb = require('../models/userDb');

var _userDb2 = _interopRequireDefault(_userDb);

var _reviewDb = require('../models/reviewDb');

var _reviewDb2 = _interopRequireDefault(_reviewDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class Books
  */
var Books = function () {
  function Books() {
    _classCallCheck(this, Books);
  }

  _createClass(Books, [{
    key: 'getBooks',

    /**
    *
    * @param {object} req 
    * @param {object} res
    * @return {object} json object
    */

    value: function getBooks(req, res) {
      res.status(200).send(_booksDb2.default.booksDb);
    }
  }, {
    key: 'reviewBook',
    value: function reviewBook(req, res) {
      var foundBookId = false;
      var foundUserId = false;
      var review = req.body.review;

      var bookId = req.params.bookId;
      var userId = req.params.userId;
      if (_userDb2.default.userDb.filter(function (item) {
        return item.id === parseInt(userId, 10);
      }).length === 1) {
        if (_booksDb2.default.booksDb.filter(function (item) {
          return item.bookId === parseInt(bookId, 10);
        }).length === 1) {

          if (typeof review === 'string') {
            var newReviewId = _reviewDb2.default.reviewDb.length + 1;
            var newReview = _reviewDb2.default.reviewDb.push({
              reviewId: newReviewId,
              bookId: bookId,
              userId: userId,
              review: review
            });
            foundBookId = true;
            foundUserId = true;

            res.status(201).send({
              message: 'book review was successful',
              review: _reviewDb2.default.reviewDb

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
          message: 'you are not authorised to review a book, kindly register to gain priviledge!'
        });
      }
    }
  }, {
    key: 'makeFavorites',
    value: function makeFavorites(req, res) {
      var bookId = req.params.bookId;
      var userId = req.params.userId;

      if (db.adminDb.filter(function (item) {
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
  }]);

  return Books;
}();

exports.default = Books;
//# sourceMappingURL=bookcontroller.js.map