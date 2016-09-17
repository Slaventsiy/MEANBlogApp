import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';

import mainController from './controllers/main';

/**
 * Configure database
 */

mongoose.connect('mongodb://localhost:27017/blogDB');
mongoose.connection.on('error', function() {
    console.log('MongoDB connection error');
    process.exit(1);
});

/**
 * Configure app
 */
let app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json()); // Parse JSON data and put it into an object which we can access

/**
 * Configure routes
 */
app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/blogs', mainController.getAllBlogs);
app.get('/users/:_id', mainController.getUser);
app.post('/blogs', mainController.postNewBlog);
app.delete('/blogs/:_id', mainController.deleteBlog);
app.put('/blogs/:_id', mainController.updateBlog);
app.post('/login', mainController.login);
app.get('/blogs/count/:_id', mainController.countPosts);
app.get('/blogs/topics', mainController.getTopicsWithCount);

/**
 * Start app
 */
app.listen(app.get('port'), function() {
    console.log(`App listening on port ${app.get('port')}!`);
});