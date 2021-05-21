
// Regan Willis 2021

// TODO: style
// TODO: handle undefined prints
// TODO: style user output
// TODO: handle repeated deletes from single resource response
// TODO: condense repetitive code

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
RESTClient.Photos.post(host, "add title", "https://s3.us-east-2.amazonaws.com/reganwillis-softwaredeveloper.com/images/coffeeshop.jpg").then(json => parse_photo(json));
RESTClient.Photos.put(host, 2, null, "https://s3.us-east-2.amazonaws.com/reganwillis-softwaredeveloper.com/images/books.jpg").then(json => parse_photo(json));
RESTClient.Photos.delete(host, 3).then(json => handle_deletes(json));

// interact with todos
RESTClient.Todos.get(host, 1).then(json => handle_get_response(json, 'todos'));
RESTClient.Todos.post(host, "add title", false).then(json => parse_todo(json));
RESTClient.Todos.put(host, 2, null, true).then(json => parse_todo(json));
RESTClient.Todos.delete(host, 3).then(json => handle_deletes(json));

// interact with users
RESTClient.Users.get(host).then(json => handle_get_response(json, 'users'));
RESTClient.Users.post(host, "add name", "add username", "add email", RESTClient.Users.build_address("add street", "add suite", "add city", "add zipcode", RESTClient.Users.build_geo("add lat", "add lng")), "add phone", "add website", RESTClient.Users.build_company("add company name", "add catch phrase", "add bs")).then(json => parse_user(json));
RESTClient.Users.put(host, 2, "update name", null, null, RESTClient.Users.build_address(null, "update suite"), "update phone").then(json => parse_user(json));
RESTClient.Users.delete(host, 3).then(json => handle_deletes(json));

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
    else if (type == 'users')
        parse_user(json);
}

// parse individual post and print
function parse_post(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let body = JSON.parse(str).body;

    // container to hold all posts
    let container = document.getElementById('display-posts');

    // each post has its own div
    let post = document.createElement('div');
    container.appendChild(post);

    // post heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "Post " + id;
    post.appendChild(id_element);

    // display post title
    let title_element = document.createElement('p');
    title_element.textContent = "Title: " + title;
    post.appendChild(title_element);

    // display post body
    let body_element = document.createElement('p');
    body_element.textContent = "Body:\n" + body;
    post.appendChild(body_element);
}

// parse individual comment and print
function parse_comment(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let name = JSON.parse(str).name;
    let email = JSON.parse(str).email;
    let body = JSON.parse(str).body;

    // container to hold all comments
    let container = document.getElementById('display-comments');

    // each comment has its own div
    let comment = document.createElement('div');
    container.appendChild(comment);

    // post heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "Comment " + id;
    comment.appendChild(id_element);

    // display comment name
    let name_element = document.createElement('p');
    name_element.textContent = "Name: " + name;
    comment.appendChild(name_element);

    // display comment email
    let email_element = document.createElement('p');
    email_element.textContent = "Email: " + email;
    comment.appendChild(email_element);

    // display comment body
    let body_element = document.createElement('p');
    body_element.textContent = "Body:\n" + body;
    comment.appendChild(body);
}

// parse individual album and print
function parse_album(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;

    // container to hold all albums
    let container = document.getElementById('display-albums');

    // each album has its own div
    let album = document.createElement('div');
    container.appendChild(album);

    // album heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "Album " + id;
    album.appendChild(id_element);

    // display album title
    let title_element = document.createElement('p');
    title_element.textContent = "Title: " + title;
    album.appendChild(title_element);
}

// parse individual photo and print
function parse_photo(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let photo_url = JSON.parse(str).url;
    let thumbnail_url = JSON.parse(str).thumbnailUrl;
    
    // container to hold all photos
    let container = document.getElementById('display-photos');

    // each photo has its own div
    let photo = document.createElement('div');
    container.appendChild(photo);

    // photo heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "Photo " + id;
    photo.appendChild(id_element);

    // display photo title
    let title_element = document.createElement('p');
    title_element.textContent = "Title: " + title;
    photo.appendChild(title_element);

    // display photo
    if (photo_url != undefined) {
        let photo_element = document.createElement('img');
        photo_element.src = photo_url;
        photo.appendChild(photo_element);
    }
}

// parse individual todo and print
function parse_todo(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let completed = JSON.parse(str).completed;

    // container to hold all todos
    let container = document.getElementById('display-todos');

    // each todo has its own div
    let todo = document.createElement('div');
    container.appendChild(todo);

    // todo heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "TODO " + id;
    todo.appendChild(id_element);

    // display todo title
    let title_element = document.createElement('p');
    title_element.textContent = "Title: " + title;
    todo.appendChild(title_element);

    // display todo completed status
    let completed_element = document.createElement('p');

    if (completed == true) {
        completed_element.textContent = "Status: completed";
    } else {
        completed_element.textContent = "Status: not completed";
    }
    todo.appendChild(completed_element);
}

// parse individual user and print
function parse_user(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let name = JSON.parse(str).name;
    let username = JSON.parse(str).username;
    let email = JSON.parse(str).email;

    let address = JSON.parse(str).address;
    let street, suite, city, zipcode, lat, lng = undefined;

    if (address != undefined) {
        let address_str = JSON.stringify(address);
        street = JSON.parse(address_str).street;
        suite = JSON.parse(address_str).suite;
        city = JSON.parse(address_str).city;
        zipcode = JSON.parse(address_str).zipcode;

        let geo = JSON.parse(address_str).geo;

        if (geo != undefined) {
            let geo_str = JSON.stringify(geo);
            lat = JSON.parse(geo_str).lat;
            lng = JSON.parse(geo_str).lng;
        }
    }

    let phone = JSON.parse(str).phone;
    let website = JSON.parse(str).website;

    let company = JSON.parse(str).company;
    let company_name, catch_phrase, bs = undefined;

    if (company != undefined) {
        let company_str = JSON.stringify(company);
        company_name = JSON.parse(company_str).name;
        catch_phrase = JSON.parse(company_str).catchPhrase;
        bs = JSON.parse(company_str).bs;
    }

    // container to hold all users
    let container = document.getElementById('display-users');

    // each user has its own div
    let user = document.createElement('div');
    container.appendChild(user);

    // user heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "User " + id;
    user.appendChild(id_element);

    // display user name
    let name_element = document.createElement('p');
    name_element.textContent = "Name: " + name;
    user.appendChild(name_element);

    // display user username
    let username_element = document.createElement('p');
    username_element.textContent = "Username: " + username;
    user.appendChild(username_element);

    // display user email
    let email_element = document.createElement('p');
    email_element.textContent = "Email: " + email;
    user.appendChild(email_element);

    // display user street
    let street_element = document.createElement('p');
    street_element.textContent = "Street: " + street;
    user.appendChild(street_element);

    // display user suite
    let suite_element = document.createElement('p');
    suite_element.textContent = "Suite: " + suite;
    user.appendChild(suite_element);

    // display user city
    let city_element = document.createElement('p');
    city_element.textContent = "City: " + city;
    user.appendChild(city_element);

    // display user zipcode
    let zipcode_element = document.createElement('p');
    zipcode_element.textContent = "Zipcode: " + zipcode;
    user.appendChild(zipcode_element);

    // display user lat
    let lat_element = document.createElement('p');
    lat_element.textContent = "Lat: " + lat;
    user.appendChild(lat_element);

    // display user lng
    let lng_element = document.createElement('p');
    lng_element.textContent = "Lng: " + lng;
    user.appendChild(lng_element);

    // display user phone
    let phone_element = document.createElement('p');
    phone_element.textContent = "Phone: " + phone;
    user.appendChild(phone_element);

    // display user website
    let website_element = document.createElement('p');
    website_element.textContent = "Website: " + website;
    user.appendChild(website_element);

    // display user company name
    let company_name_element = document.createElement('p');
    company_name_element.textContent = "Company Name: " + company_name;
    user.appendChild(company_name_element);

    // display user company catch phrase
    let catch_phrase_element = document.createElement('p');
    catch_phrase_element.textContent = "Catch Phrase: " + catch_phrase;
    user.appendChild(catch_phrase_element);

    // display user company business
    let company_business_element = document.createElement('p');
    company_business_element.textContent = "Business: " + bs;
    user.appendChild(company_business_element);
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
    let container = null;

    if (resource == 'posts')
        container = document.getElementById('display-posts');
    else if (resource == 'comments')
        container = document.getElementById('display-comments');
    else if (resource == 'albums')
        container = document.getElementById('display-albums');
    else if (resource == 'photos')
        container = document.getElementById('display-photos');
    else if (resource == 'todos')
        container = document.getElementById('display-todos');
    else if (resource == 'users')
        container = document.getElementById('display-users');

    // each delete message has its own div
    let delete_div = document.createElement('div');
    container.appendChild(delete_div);

    // heading (id)
    let id_element = document.createElement('h2');
    id_element.textContent = "Deleted " + resource;
    delete_div.appendChild(id_element);

    // display album title
    let message_element = document.createElement('p');
    message_element.textContent = message;
    delete_div.appendChild(message_element);
}