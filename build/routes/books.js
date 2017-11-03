'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bookController = require('../controllers/bookController');

var _bookController2 = _interopRequireDefault(_bookController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookRouter = _express2.default.Router();
var allBook = new _bookController2.default();

bookRouter.get('/api/V1/books', allBook.getBooks);
bookRouter.post('/api/users/:userId/review/:bookId', allBook.reviewBook);

exports.default = bookRouter;
//# sourceMappingURL=books.js.map