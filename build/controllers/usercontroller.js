'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _booksDb = require('../models/booksDb');

var _booksDb2 = _interopRequireDefault(_booksDb);

var _userDb = require('../models/userDb');

var _userDb2 = _interopRequireDefault(_userDb);

var _brwdBooksDb = require('../models/brwdBooksDb');

var _brwdBooksDb2 = _interopRequireDefault(_brwdBooksDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class UserPriviledge
  */
var UserPriviledge = function () {
    function UserPriviledge() {
        _classCallCheck(this, UserPriviledge);
    }

    _createClass(UserPriviledge, [{
        key: 'borrowBook',

        /**
        *
        * @param {object} req 
        * @param {object} res
        * @return {object} json object
        */

        value: function borrowBook(req, res) {
            var foundBookId = false;
            var foundUserId = false;
            var _req$body = req.body,
                dateBorrowed = _req$body.dateBorrowed,
                dateToReturn = _req$body.dateToReturn;

            var bookId = parseInt(req.params.bookId, 10);
            var userId = parseInt(req.params.userId, 10);
            var found = false;
            var bookQty = 0;
            var bookShelf = 0;
            if (_userDb2.default.userDb.filter(function (item) {
                return item.id === parseInt(userId, 10);
            }).length === 1) {
                if (_booksDb2.default.booksDb.filter(function (item) {
                    return item.bookId === parseInt(bookId, 10);
                }).length === 1) {
                    for (var i = 0; i < _brwdBooksDb2.default.brwdBooksDb.length; i++) {
                        if (_brwdBooksDb2.default.brwdBooksDb[i].bookId === bookId && _brwdBooksDb2.default.brwdBooksDb[i].userId === userId) {
                            if (!(_brwdBooksDb2.default.brwdBooksDb[i].returnStatus === 'Approved')) {
                                found = true;
                                break;
                            }
                        }
                    }
                    for (var _i = 0; _i < _booksDb2.default.booksDb.length; _i++) {
                        if (_booksDb2.default.booksDb[_i].bookId === bookId) {
                            bookQty = _booksDb2.default.booksDb[_i].quantity;
                            bookShelf = _i;
                            break;
                        }
                    }
                    if (found === false) {
                        if (bookQty >= 1) {
                            var newbrwId = _brwdBooksDb2.default.brwdBooksDb.length + 1;
                            var newBrwdBook = _brwdBooksDb2.default.brwdBooksDb.push({
                                brwId: newbrwId,
                                bookId: bookId,
                                userId: userId,
                                dateBorrowed: dateBorrowed,
                                dateToReturn: dateToReturn,
                                brwApproval: "ApprovaL Request made, waiting for Admin Approval",
                                rtnApproval: "yet to be returned",
                                returnStatus: "yet to be returned"

                            });
                            // books.booksDb[bookShelf].quantity -= 1;
                            res.status(200).send({
                                newBrwdBook: _brwdBooksDb2.default.brwdBooksDb,
                                message: 'Success'
                            });
                        } else {
                            res.status(401).send({
                                message: 'Sorry we ran out of stock for this book!'
                            });
                        }
                    } else {
                        res.status(401).send({
                            message: 'Sorry you must first return borrowed book before making another request'
                        });
                    }
                } else {
                    res.status(404).send({
                        message: ' No book of such exists!'
                    });
                }
            } else {
                res.status(403).send({
                    message: 'you are not authorised to borrow a book, kindly register to gain priviledge!'
                });
            }
        }
    }, {
        key: 'returnBook',
        value: function returnBook(req, res) {
            var found = false;
            var bookId = parseInt(req.params.bookId, 10);
            var userId = parseInt(req.params.userId, 10);
            var borrowId = 0;
            var returnStatus = '';
            for (var i = 0; i < _brwdBooksDb2.default.brwdBooksDb.length; i++) {
                if (_brwdBooksDb2.default.brwdBooksDb[i].bookId === bookId && _brwdBooksDb2.default.brwdBooksDb[i].userId === userId) {
                    found = true;
                    borrowId = i;
                    returnStatus = _brwdBooksDb2.default.brwdBooksDb[i].returnStatus;
                    break;
                }
            }

            if (found === true) {
                if (returnStatus !== 'Approved') {
                    console.log(returnStatus);
                    _brwdBooksDb2.default.brwdBooksDb.rtnApproval = "Approval request made, waiting for administrator approval";
                    _brwdBooksDb2.default.brwdBooksDb.returnStatus = "pending";
                    res.status(201).send({
                        returnApproval: _brwdBooksDb2.default.brwdBooksDb.rtnApproval,
                        returnStatus: _brwdBooksDb2.default.brwdBooksDb.returnStatus
                    });
                } else {
                    res.status(409).send({
                        message: 'Sorry! this book seems to have been returned'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'Sorry We can\'t find your record'
                });
            }
        }
    }]);

    return UserPriviledge;
}();

exports.default = UserPriviledge;
//# sourceMappingURL=usercontroller.js.map