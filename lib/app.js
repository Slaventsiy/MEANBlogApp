'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _main = require('./controllers/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Configure database
 */

_mongoose2.default.connect('mongodb://localhost:27017/blogDB');
_mongoose2.default.connection.on('error', function () {
  console.log('MongoDB connection error');
  process.exit(1);
});

/**
 * Configure app
 */
var app = (0, _express2.default)();
app.set('port', process.env.PORT || 3000);
app.set('views', _path2.default.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
app.use(_bodyParser2.default.json()); // Parse JSON data and put it into an object which we can access

/**
 * Configure routes
 */
app.get('/', _main2.default.getIndex);
app.get('/templates/:template', _main2.default.getTemplate);
app.get('/blogs', _main2.default.getAllBlogs);
app.get('/users/:_id', _main2.default.getUser);
app.post('/blogs', _main2.default.postNewBlog);
app.delete('/blogs/:_id', _main2.default.deleteBlog);
app.put('/blogs/:_id', _main2.default.updateBlog);
app.post('/login', _main2.default.login);
app.get('/blogs/count/:_id', _main2.default.countPosts);
app.get('/blogs/topics', _main2.default.getTopicsWithCount);

/**
 * Start app
 */
app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port') + '!');
});