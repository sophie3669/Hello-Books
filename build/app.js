'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _admin = require('./routes/admin');

var _admin2 = _interopRequireDefault(_admin);

var _books = require('./routes/books');

var _books2 = _interopRequireDefault(_books);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/', _admin2.default);
app.use('/', _books2.default);
app.use('/', _user2.default);

app.get('/', function (req, res) {
  res.status(200).send({
    message: 'Welcome to Hello books!'

  });
});

app.use(function (req, res, next) {
  var err = res.status(404).send({
    Error: '404: Sorry Page Not Found'
  });
  next(err);
});

app.listen(3000, function () {
  console.log("Listening to port 3000");
});
//# sourceMappingURL=app.js.map