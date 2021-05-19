
// Regan Willis 2021

// import module
import * as RESTClient from './RESTClient.js'

let host = 'https://jsonplaceholder.typicode.com';

RESTClient.Posts.get(host, 3).then(json => parse_posts(json));
RESTClient.Posts.post(host, "add title", "add body").then(json => parse_posts(json));
RESTClient.Posts.put(host, 1, null, "update body").then(json => parse_posts(json));
RESTClient.Posts.delete(host, 2).then(response => handle_deletes(response));

function parse_posts(json) {

    if (Array.isArray(json)) {

        for (let elem of json) {
            parse_post(elem);
        }
    } else {
        parse_post(json);
    }
}

function parse_post(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let body = JSON.parse(str).body;

    console.log(id);
    console.log(title);
    console.log(body);
}

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