'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _adminController = require('../controllers/adminController');

var _adminController2 = _interopRequireDefault(_adminController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var sysAdmin = new _adminController2.default();

router.post('/api/v1/books', sysAdmin.addBook);
router.put('/api/v1/books/:bookId', sysAdmin.modifyBook);
router.put('/api/v1/users/:userId/borrow/:bookId', sysAdmin.acceptBrwdBooks);
router.put('/api/v1/users/:userId/return/bookId', sysAdmin.acceptRtndBook);

exports.default = router;
//# sourceMappingURL=admin.js.map