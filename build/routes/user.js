'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();
var user = new _userController2.default();

userRouter.post('/api/v1/users/:userId/borrow/:bookId', user.borrowBook);
userRouter.post('/api/v1/users/:userId/return/:bookId', user.returnBook);

exports.default = userRouter;
//# sourceMappingURL=user.js.map