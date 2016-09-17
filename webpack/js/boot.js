import {bootstrap} from 'angular2/platform/browser'; // Angular magic to bootstrap the app in a browser

import {BlogComponent} from './BlogComponent';

let boot = document.addEventListener('DOMContentLoaded', () => {
    bootstrap(BlogComponent);
});

module.exports = boot;