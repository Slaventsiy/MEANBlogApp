import {Inject} from 'angular2/core'; // Allows us to inject a dependency into a module that's not a component
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map'; // Allows us to map the HTTP response from raw to JSON format

class BlogService {

    constructor(http) {
        this.http = http; // http is an instance of the main Http class
    }

    getAllBlogs() {
        return this.http.get('/blogs')
            .map(res => {
                return JSON.parse(res._body);
            });
    }

    findUser(id) {
        return this.http.get('/users/' + id)
            .map(res => {
                return JSON.parse(res._body);
            });
    }

    postNewBlog(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/blogs', JSON.stringify(data), {
            headers: headers
        }).map(res => {
            return JSON.parse(res._body);
        });
    }

    deleteBlog(id) {
        return this.http.delete('/blogs/' + id)
            .map(res => {
                return JSON.parse(res._body);
            });
    }

    updateBlog(id, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/blogs/' + id, JSON.stringify(data), {
            headers: headers
        }).map(res => {
            return JSON.parse(res._body);
        });
    }

    login(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/login', JSON.stringify(data), {
            headers: headers
        }).map(res => {
            return JSON.parse(res._body);
        });
    }

    countPosts(id) {
        return this.http.get('/blogs/count/' + id)
            .map(res => {
                return JSON.parse(res._body);
            });
    }

    getTopics() {
        return this.http.get('/blogs/topics')
            .map(res => {
                return JSON.parse(res._body);
            });
    }
}

BlogService.parameters = [new Inject(Http)];

export {BlogService}