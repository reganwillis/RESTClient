
// Regan Willis 2021

// import module
import * as RESTClient from './RESTClient.js'

let host = 'https://jsonplaceholder.typicode.com';

// interact with posts
RESTClient.Posts.get(host, 1).then(json => handle_get_response(json, 'posts'));
RESTClient.Posts.post(host, "add title", "add body").then(json => display_post(json));
RESTClient.Posts.put(host, 2, null, "update body").then(json => display_post(json));
RESTClient.Posts.delete(host, 3).then(response => handle_deletes(response));
RESTClient.Posts.delete(host, 4).then(response => handle_deletes(response));

// interact with comments
RESTClient.Comments.get(host, 1).then(json => handle_get_response(json, 'comments'));
RESTClient.Comments.post(host, "add name", "add email", "add body").then(json => display_comment(json));
RESTClient.Comments.put(host, 2, "update name").then(json => display_comment(json));
RESTClient.Comments.delete(host, 3).then(json => handle_deletes(json));

// interact with albums
RESTClient.Albums.get(host, 1).then(json => handle_get_response(json, 'albums'));
RESTClient.Albums.post(host, "add title").then(json => display_album(json));
RESTClient.Albums.put(host, 2, "update title").then(json => display_album(json));
RESTClient.Albums.delete(host, 3).then(json => handle_deletes(json));

// interact with photos
RESTClient.Photos.get(host, 1).then(json => handle_get_response(json, 'photos'));
RESTClient.Photos.post(host, "add title", "https://s3.us-east-2.amazonaws.com/reganwillis-softwaredeveloper.com/images/coffeeshop.jpg").then(json => display_photo(json));
RESTClient.Photos.put(host, 2, null, "https://s3.us-east-2.amazonaws.com/reganwillis-softwaredeveloper.com/images/books.jpg").then(json => display_photo(json));
RESTClient.Photos.delete(host, 3).then(json => handle_deletes(json));

// interact with todos
RESTClient.Todos.get(host, 1).then(json => handle_get_response(json, 'todos'));
RESTClient.Todos.post(host, "add title", false).then(json => display_todo(json));
RESTClient.Todos.put(host, 2, null, true).then(json => display_todo(json));
RESTClient.Todos.delete(host, 3).then(json => handle_deletes(json));

// interact with users
RESTClient.Users.get(host, 1).then(json => handle_get_response(json, 'users'));
RESTClient.Users.post(host, "add name", "add username", "add email", RESTClient.Users.build_address("add street", "add suite", "add city", "add zipcode", RESTClient.Users.build_geo("add lat", "add lng")), "add phone", "add website", RESTClient.Users.build_company("add company name", "add catch phrase", "add bs")).then(json => display_user(json));
RESTClient.Users.put(host, 2, "update name", null, null, RESTClient.Users.build_address(null, "update suite"), "update phone").then(json => display_user(json));
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
        display_post(json);
    else if (type == 'comments')
        display_comment(json);
    else if (type == 'albums')
        display_album(json);
    else if (type == 'photos')
        display_photo(json);
    else if (type == 'todos')
        display_todo(json);
    else if (type == 'users')
        display_user(json);
}

// create and return a div inside given existing container
function create_div(container_name) {
    let container = document.getElementById(container_name);

    let div = document.createElement('div');
    container.appendChild(div);

    return div
}

// add h2 to given div in proper format
function add_header_element(parent, content, id) {
    let elem = document.createElement('h2');
    elem.textContent = content + " " + id;
    parent.appendChild(elem);
}

// add p to given div in proper format
function add_info_element(parent, info, content) {

    // if undefined nothing has changed so it does not
    // need to be displayed
    if (content != undefined) {
        let elem = document.createElement('p');
        elem.textContent = info + ": " + content;
        parent.appendChild(elem);
    }
}

// parse individual post and print
function display_post(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let body = JSON.parse(str).body;

    // each post has its own div in the post container
    let parent = create_div('display-posts');

    // post heading (id)
    add_header_element(parent, "Post ", id);

    // display post elements
    add_info_element(parent, "Title", title);
    add_info_element(parent, "Body", body);
}

// parse individual comment and print
function display_comment(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let name = JSON.parse(str).name;
    let email = JSON.parse(str).email;
    let body = JSON.parse(str).body;

    // each comment has its own div in the comment container
    let parent = create_div('display-comments');

    // post heading (id)
    add_header_element(parent, "Comment", id);

    // display comment elements
    add_info_element(parent, "Name", name);
    add_info_element(parent, "Email", email);
    add_info_element(parent, "Body", body);
}

// parse individual album and print
function display_album(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;

    // each album has its own div in the albums container
    let parent = create_div('display-albums');

    // album heading (id)
    add_header_element(parent, "Album", id);

    // display album elements
    add_info_element(parent, "Title", title);
}

// parse individual photo and print
function display_photo(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let photo_url = JSON.parse(str).url;
    let thumbnail_url = JSON.parse(str).thumbnailUrl;

    // each photo has its own div in the photos container
    let parent = create_div('display-photos');

    // photo heading (id)
    add_header_element(parent, "Photo", id);

    // display photo elements
    add_info_element(parent, "Title", title);
    add_info_element(parent, "Thumbnail URL", thumbnail_url);

    // display photo
    if (photo_url != undefined) {
        let photo_element = document.createElement('img');
        photo_element.src = photo_url;
        parent.appendChild(photo_element);
    }
}

// parse individual todo and print
function display_todo(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let title = JSON.parse(str).title;
    let completed = JSON.parse(str).completed;

    // each todo has its own div in the todos container
    let parent = create_div('display-todos');

    // todo heading (id)
    add_header_element(parent, "TODO", id);

    // display todo elements
    add_info_element(parent, "Title", title);

    if (completed == true) {
        add_info_element(parent, "Status", "completed");
    } else {
        add_info_element(parent, "Status", "not completed");
    }
}

// parse individual user and print
function display_user(json) {
    let str = JSON.stringify(json);
    let id = JSON.parse(str).id;
    let name = JSON.parse(str).name;
    let username = JSON.parse(str).username;
    let email = JSON.parse(str).email;

    // each user has its own div in the users container
    let parent = create_div('display-users');

    // user heading (id)
    add_header_element(parent, "User", id);

    // display user elements
    add_info_element(parent, "Name", name);
    add_info_element(parent, "Username", username);
    add_info_element(parent, "Email", email);

    let phone = JSON.parse(str).phone;
    let website = JSON.parse(str).website;

    add_info_element(parent, "Phone", phone);
    add_info_element(parent, "Website", website);

    let address = JSON.parse(str).address;

    if (address != undefined) {
        let address_str = JSON.stringify(address);
        let street = JSON.parse(address_str).street;
        let suite = JSON.parse(address_str).suite;
        let city = JSON.parse(address_str).city;
        let zipcode = JSON.parse(address_str).zipcode;

        // user address heading
        let address_elem = document.createElement('h4');
        address_elem.textContent = "Address";
        parent.appendChild(address_elem);

        // address line 1
        let address_line_1 = document.createElement('div');
        parent.appendChild(address_line_1);
        address_line_1.className = "line";
        add_info_element(address_line_1, "Street", street);
        add_info_element(address_line_1, "Suite", suite);

        // address line 2
        let address_line_2 = document.createElement('div');
        parent.appendChild(address_line_2);
        address_line_2.className = "line";
        add_info_element(address_line_2, "City", city);
        add_info_element(address_line_2, "Zipcode", zipcode);

        let geo = JSON.parse(address_str).geo;

        if (geo != undefined) {
            let geo_str = JSON.stringify(geo);
            let lat = JSON.parse(geo_str).lat;
            let lng = JSON.parse(geo_str).lng;

            add_info_element(parent, "Latitude and Longitude", "(" + lat + ", " + lng + ")");
        }
    }

    let company = JSON.parse(str).company;

    if (company != undefined) {
        let company_str = JSON.stringify(company);
        let company_name = JSON.parse(company_str).name;
        let catch_phrase = JSON.parse(company_str).catchPhrase;
        let bs = JSON.parse(company_str).bs;

        // user company heading
        let company_elem = document.createElement('h4');
        company_elem.textContent = "Company";
        parent.appendChild(company_elem);

        add_info_element(parent, "Name", company_name);
        add_info_element(parent, "Slogan", catch_phrase);
        add_info_element(parent, "Business", bs);
    }
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
        message = 'successfully deleted';
        //message = "ID #" + id + " has been successfully deleted from " + resource + ".";
    } else {
        message = 'not successfully deleted (error)';
        //message = "Error: ID #" + id + " was not deleted from " + resource + ".";
    }

    let container_name = null;

    if (resource == 'posts') {
        container_name = 'display-posts';
        resource = "Post";
    } else if (resource == 'comments') {
        container_name = 'display-comments';
        resource = "Comment";
    } else if (resource == 'albums') {
        container_name = 'display-albums';
        resource = "Album";
    } else if (resource == 'photos') {
        container_name = 'display-photos';
        resource = "Photo";
    } else if (resource == 'todos') {
        container_name = 'display-todos';
        resource = "TODO";
    } else if (resource == 'users') {
        container_name = 'display-users';
        resource = "User";
    }

    // each delete message has its own div
    let parent = create_div(container_name);

    // heading (id)
    add_header_element(parent, resource, id);

    // display delete message
    add_info_element(parent, resource + " #" + id, message);
}