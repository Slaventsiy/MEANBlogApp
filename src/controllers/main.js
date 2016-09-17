import Blog from '../models/Blog';
import User from '../models/User';

let mainController;
mainController = {

    getIndex: (req, res) => {
        res.render('index'); // Compiles the file named "index" in the views directory
    },

    getTemplate: (req, res) => {
        res.render('templates/' + req.params.template); // Allows us to access Angular templates
    },

    getAllBlogs: (req, res) => {
        Blog.find().populate('_creator').exec((err, blogs) => {
            if (err) {
                return res.send(err);
            }
            res.json(blogs);
        });
    },

    getUser: (req, res) => {
        User.findOne({_id: req.params._id}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    },

    postNewBlog: (req, res) => {
        Blog.create({
            title: req.body.title,
            text: req.body.text,
            topic: req.body.topic,
            public: req.body.public,
            _creator: req.body._creator
        }, (err, blog) => {
            if (err) {
                return res.send(err);
            }
            mainController.getAllBlogs(req, res);
        });
    },

    deleteBlog: (req, res) => {
        Blog.remove({
            _id: req.params._id
        }, (err, results) => {
            if (err) {
                return res.send(err);
            }
            mainController.getAllBlogs(req, res);
        });
    },

    updateBlog: (req, res) => {
        Blog.update({_id: req.params._id}, req.body, {}, (err, results) => {
            if (err) {
                return res.send(err);
            }
            mainController.getAllBlogs(req, res);
        });
    },

    login: (req, res) => {
        // Dirty trick to achieve findOrCreate-like operation
        User.findAndModify({'name': req.body.name}, {}, {$setOnInsert: {'name': req.body.name}}, {
            new: true,
            upsert: true
        }, (err, user) => {
            if (err) {
                return res.send(err);
            }
            res.json(user);
        })
    },

    countPosts: (req, res) => {
        Blog.count({'_creator': req.params._id}, (err, count) => {
            if (err) {
                return res.send(err);
            }
            res.json(count);
        });
    },

    getTopicsWithCount: (req, res) => {
        Blog.aggregate([{
            $group: {
                _id: '$topic',
                count: {$sum: 1}
            }
        }], (err, result) => {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    }
};

export default mainController;