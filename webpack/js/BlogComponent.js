import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http'; // We're using http in BlogService, but we can only specify providers in the component

import {BlogService} from './BlogService';

class BlogComponent {
    constructor(blogService) {
        this.user = {
            _id: '',
            name: ''
        };
        this.blogs = [];
        this.topics = [];
        this.blogData = {
            title: '',
            topic: '',
            text: '',
            _creator: '',
            public: false
        };
        this.postCount = 0;
        this.blogService = blogService;
        this.blogService.getAllBlogs()
            .subscribe(res => { // Rxjs, we subscribe to the response
                this.blogs = res;
            });
        this.getTopics();
    }

    findUser(id) {
        return this.blogService.findUser(id)
            .subscribe(res => {
                console.log(res);
                return res.name;
            });
    }

    createBlog() {
        this.blogData._creator = this.user._id || 'anonymous';
        console.log(this.blogData._creator);
        this.blogService.postNewBlog(this.blogData)
            .subscribe(res => {
                console.log(res);
                this.blogs = res;
                this.blogData.text = '';
                this.blogData.topic = '';
                this.blogData.title = '';
                this.blogData.public = false;
                this.getPostCount();
                this.getTopics();
            });
    }

    deleteBlog(id) {
        this.blogService.deleteBlog(id)
            .subscribe(res => {
                this.blogs = res;
                this.getPostCount();
                this.getTopics();
            });
    }

    updateBlog(id, blogText) {
        const blogObj = {
            text: blogText
        };
        this.blogService.updateBlog(id, blogObj)
            .subscribe(res => {
                this.blogs = res;
            });
    }

    login(username) {
        this.user.name = username;
        this.blogService.login(this.user)
            .subscribe(res => {
                this.user = res.value;
                this.getPostCount();
            });
    }

    getPostCount() {
        this.blogService.countPosts(this.user._id)
            .subscribe(res => {
                this.postCount = res;
            })
    }

    getTopics() {
        this.blogService.getTopics()
            .subscribe(res => {
                this.topics = res;
            });
    }
}

BlogComponent.annotations = [
    new Component({
        selector: 'blog-app',
        providers: [BlogService, HTTP_PROVIDERS],
        templateUrl: 'templates/BlogComponent',
        styles: [`
            .sidenav {
                background-color: #f1f1f1;
                height: 100%;
            }
            .row.content {
                height: 1500px;
            }
            textarea {
                resize: none;
            }
        `]
    })
];

BlogComponent.parameters = [[BlogService]];

export {BlogComponent};