'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blogSchema = new _mongoose2.default.Schema({
    title: String,
    topic: String,
    text: String,
    public: Boolean,
    _creator: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' }
});

exports.default = _mongoose2.default.model('Blog', blogSchema);