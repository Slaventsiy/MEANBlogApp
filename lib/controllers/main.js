'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Blog = require('../models/Blog');

var _Blog2 = _interopRequireDefault(_Blog);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainController = void 0;
mainController = {

    getIndex: function getIndex(req, res) {
        res.render('index'); // Compiles the file named "index" in the views directory
    },

    getTemplate: function getTemplate(req, res) {
        res.render('templates/' + req.params.template); // Allows us to access Angular templates
    },

    getAllBlogs: function getAllBlogs(req, res) {
        _Blog2.default.find().populate('_creator').exec(function (err, blogs) {
            if (err) {
                return res.send(err);
            }
            res.json(blogs);
        });
    },

    getUser: function getUser(req, res) {
        _User2.default.findOne({ _id: req.params._id }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    },

    postNewBlog: function postNewBlog(req, res) {
        _Blog2.default.create({
            title: req.body.title,
            text: req.body.text,
            topic: req.body.topic,
            public: req.body.public,
            _creator: req.body._creator
        }, function (err, blog) {
            if (err) {
                return res.send(err);
            }
            mainController.getAllBlogs(req, res);
        });
    },

    deleteBlog: function deleteBlog(req, res) {
        _Blog2.default.remove({
            _id: req.params._id
        }, function (err, results) {
            if (err) {
                return res.send(err);
            }
            mainController.getAllBlogs(req, res);
        });
    },

    updateBlog: function updateBlog(req, res) {
        _Blog2.default.update({ _id: req.params._id }, req.body, {}, function (err, results) {
            if (err) {
                return res.send(err);
            }
            mainController.getAllBlogs(req, res);
        });
    },

    login: function login(req, res) {
        // Dirty trick to achieve findOrCreate-like operation
        _User2.default.findAndModify({ 'name': req.body.name }, {}, { $setOnInsert: { 'name': req.body.name } }, {
            new: true,
            upsert: true
        }, function (err, user) {
            if (err) {
                return res.send(err);
            }
            res.json(user);
        });
    },

    countPosts: function countPosts(req, res) {
        _Blog2.default.count({ '_creator': req.params._id }, function (err, count) {
            if (err) {
                return res.send(err);
            }
            res.json(count);
        });
    },

    getTopicsWithCount: function getTopicsWithCount(req, res) {
        _Blog2.default.aggregate([{
            $group: {
                _id: '$topic',
                count: { $sum: 1 }
            }
        }], function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    }
};

exports.default = mainController;