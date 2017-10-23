'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _books = require('./books');

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    router: _admin2.default,
    bookRouter: _books2.default
};
//# sourceMappingURL=index.js.map