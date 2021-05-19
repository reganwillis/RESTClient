
// Regan Willis 2021

// import module
import * as RESTClient from './RESTClient.js'

let host = 'https://jsonplaceholder.typicode.com';

// interact with posts
RESTClient.Posts.get(host, 1).then(json => handle_get_response(json, 'posts'));
RESTClient.Posts.post(host, "add title", "add body").then(json => parse_post(json));
RESTClient.Posts.put(host, 2, null, "update body").then(json => parse_post(json));
RESTClient.Posts.delete(host, 3).then(response => handle_deletes(response));

// interact with comments
RESTClient.Comments.get(host, 1).then(json => handle_get_response(json, 'comments'));
RESTClient.Comments.post(host, "add name", "add email", "add body").then(json => parse_comment(json));
RESTClient.Comments.put(host, 2, "update name").then(json => parse_comment(json));
RESTClient.Comments.delete(host, 3).then(json => handle_deletes(json));

// interact with albums
RESTClient.Albums.get(host, 1).then(json => handle_get_response(json, 'albums'));
RESTClient.Albums.post(host, "add title").then(json => parse_album(json));
RESTClient.Albums.put(host, 2, "update title").then(json => parse_album(json));
RESTClient.Albums.delete(host, 3).then(json => handle_deletes(json));

// interact with photos
RESTClient.Photos.get(host, 1).then(json => handle_get_response(json, 'photos'));
RESTClient.Photos.post(host, "add title", "add photo url", "add thumbnail url").then(json => parse_photo(json));
RESTClient.Photos.put(host, 2, null, "update photo url").then(json => parse_photo(json));
RESTClient.Photos.delete(host, 3).then(json => handle_deletes(json));

// interact with todos
RESTClient.Todos.get(host, 1).then(json => handle_get_response(json, 'todos'));
RESTClient.Todos.post(host, "add title", false).then(json => parse_todo(json));
RESTClient.Todos.put(host, 2, null, true).then(json => parse_todo(json));
RESTClient.Todos.delete(host, 3).then(json => handle_deletes(json));

// handle json response as array or individual element
function handle_get_response(json, type) {

    if (Array.isArray(json)) {

        for (let elem of json) {
            match_type(elem, type);
        }
    } else {
        match_type(json, type);
    }
}

// send data to correct parsing function based on type
function match_type(json, type) {
    if (type == 'posts')
        parse_post(json);
    else if (type == 'comments')
        parse_comment(json);
    else if (type == 'albums')
        parse_album(json);
    else if (type == 'photos')
        parse_photo(json);
    else if (type == 'todos')
        parse_todo(json);
}

// parse individual post and print
function parse_post(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let body = JSON.parse(str).body;

    console.log(id);
    console.log(title);
    console.log(body);
}

// parse individual comment and print
function parse_comment(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let name = JSON.parse(str).name;
    let email = JSON.parse(str).email;
    let body = JSON.parse(str).body;

    console.log(id);
    console.log(name);
    console.log(email);
    console.log(body);
}

// parse individual album and print
function parse_album(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;

    console.log(id);
    console.log(title);
}

// parse individual photo and print
function parse_photo(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let photo_url = JSON.parse(str).url;
    let thumbnail_url = JSON.parse(str).thumbnailUrl;

    console.log(id);
    console.log(title);
    console.log(photo_url);
    console.log(thumbnail_url);
}

// parse individual todo and print
function parse_todo(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let completed = JSON.parse(str).completed;

    console.log(id);
    console.log(title);
    console.log(completed);
}

// print appropriate delete response
function handle_deletes(response) {
    let message = "";
    let str = JSON.stringify(response);

    let url = JSON.parse(str).url;
    let arr = url.split('/');
    let resource = arr[3];
    let id = arr[4]

    let status = JSON.parse(str).status;

    if (status == 200) {
        message = "ID #" + id + " has been successfully deleted from " + resource + ".";
    } else {
        message = "Error: ID #" + id + " was not deleted from " + resource + ".";
    }

    console.log(message);
}