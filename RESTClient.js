// Regan Willis 2021
// REST Client


/**
  * GET
  * @function
  * @param {string} url - URL of the server
  * @return {JSON} Response from server
  */
async function get_data(url) {

  let response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  let data = await response.json();

  return data;
}


/**
 * POST and PUT
 * @function
 * @param {string} url - URL of the server
 * @param {string} method - Method of uploading, can be POST or PUT
 * @param {JSON} payload - Information to send to the server
 * @return {JSON} Response from server
 */
async function send_data(url, method, payload) {

  let response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    method: method,
    body: JSON.stringify(payload)
  });
  let data = await response.json();

  return data;
}


/**
 * DELETE
 * @function
 * @param {string} url - URL of the server
 * @return {JSON} URL and status code from server response
 */
async function delete_data(url) {

  let response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    method: 'DELETE',
  });

  let data = {
    'url': response.url,
    'status': response.status,
  }

  return data;
}


/**
 * Accesses the server posts
 * @class
 */
export class Posts {

  /**
   * Gets post information
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {?string} id - id of a specific post
   * @return {JSON} Specified post or list of posts
   */
  static get(host, id=null) {
    let url = `${host}/posts`;

    if (id != null) {
      url += `/${id}`;
    }

    return get_data(url);
  }

  /**
   * Posts a post
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} title - title of post
   * @param {string} body - body of post
   * @return {JSON} Response from server
   */
  static post(host, title, body) {
    let url = `${host}/posts`;

    let payload = {
      'title': title,
      'body': body,
    }

    return send_data(url, 'POST', payload);
  }

  /**
   * Updates a post
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific post
   * @param {?string} title - updated title of post
   * @param {?string} body - updated body of post
   * @return {JSON} Response from server
   */
  static put(host, id, title=null, body=null) {
    let url = `${host}/posts/${id}`;
    let payload = {};

    if (title != null)
      payload['title'] = title;

    if (body != null)
      payload['body'] = body;

    return send_data(url, 'PUT', payload);
  }

  /**
   * Deletes posts
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific post
   * @return {JSON} Response from server
   */
  static delete(host, id) {
    let url = `${host}/posts/${id}`;

    return delete_data(url);
  }
}


/**
 * Accesses the server comments
 * @class
 */
 export class Comments {

  /**
   * Gets comment information
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {?string} id - id of a specific comment
   * @return {JSON} Specified comment or list of comments
   */
  static get(host, id=null) {
    let url = `${host}/comments`;

    if (id != null) {
      url += `/${id}`;
    }

    return get_data(url);
  }

  /**
   * Posts a comment
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} name - name attached to comment
   * @param {string} email - email attached to comment
   * @param {string} body - body of comment
   * @return {JSON} Response from server
   */
  static post(host, name, email, body) {
    let url = `${host}/comments`;

    let payload = {
      'name': name,
      'email': email,
      'body': body,
    }

    return send_data(url, 'POST', payload);
  }

  /**
   * Updates a comment
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific comment
   * @param {?string} name - updated name attached to comment
   * @param {?string} email - updated email attached to comment
   * @param {?string} body - updated body of comment
   * @return {JSON} Response from server
   */
  static put(host, id, name=null, email=null, body=null) {
    let url = `${host}/comments/${id}`;
    let payload = {};

    if (name != null)
      payload['name'] = name;

    if (email != null)
      payload['email'] = email;

    if (body != null)
      payload['body'] = body;

    return send_data(url, 'PUT', payload);
  }

  /**
   * Deletes comments
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific comment
   * @return {JSON} Response from server
   */
  static delete(host, id) {
    let url = `${host}/comments/${id}`;

    return delete_data(url);
  }
}


/**
 * Accesses the server albums
 * @class
 */
 export class Albums {

  /**
   * Gets album information
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {?string} id - id of a specific album
   * @return {JSON} Specified album or list of albums
   */
  static get(host, id=null) {
    let url = `${host}/albums`;

    if (id != null) {
      url += `/${id}`;
    }

    return get_data(url);
  }

  /**
   * Posts an album
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} title - title of album
   * @return {JSON} Response from server
   */
  static post(host, title) {
    let url = `${host}/albums`;

    let payload = {
      'title': title,
    }

    return send_data(url, 'POST', payload);
  }

  /**
   * Updates an album
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific album
   * @param {?string} title - updated title of album
   * @return {JSON} Response from server
   */
  static put(host, id, title=null) {
    let url = `${host}/albums/${id}`;
    let payload = {};

    if (title != null)
      payload['title'] = title;

    return send_data(url, 'PUT', payload);
  }

  /**
   * Deletes albums
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific album
   * @return {JSON} Response from server
   */
  static delete(host, id) {
    let url = `${host}/albums/${id}`;

    return delete_data(url);
  }
}


/**
 * Accesses the server photos
 * @class
 */
 export class Photos {

  /**
   * Gets photo information
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {?string} id - id of a specific photo
   * @return {JSON} Specified photos or list of photos
   */
  static get(host, id=null) {
    let url = `${host}/photos`;

    if (id != null) {
      url += `/${id}`;
    }

    return get_data(url);
  }

  /**
   * Posts a photo
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} title - title of photo
   * @param {string} photo_url - url of photo
   * @param {string} thumbnail_url - thumnail url of photo
   * @return {JSON} Response from server
   */
  static post(host, title, photo_url, thumbnail_url) {
    let url = `${host}/photos`;

    let payload = {
      'title': title,
      'url': photo_url,
      'thumbnailUrl': thumbnail_url,
    }

    return send_data(url, 'POST', payload);
  }

  /**
   * Updates a photo
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific photo
   * @param {?string} title - updated title of photo
   * @param {?string} photo_url - updated url of photo
   * @param {?string} thumbnail_url - updated thumbnail url of photo
   * @return {JSON} Response from server
   */
  static put(host, id, title=null, photo_url=null, thumbnail_url=null) {
    let url = `${host}/photos/${id}`;
    let payload = {};

    if (title != null)
      payload['title'] = title;

    if (photo_url != null)
      payload['url'] = photo_url;

    if (thumbnail_url != null)
      payload['thumbnailUrl'] = thumbnail_url;

    return send_data(url, 'PUT', payload);
  }

  /**
   * Deletes photos
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific photo
   * @return {JSON} Response from server
   */
  static delete(host, id) {
    let url = `${host}/photos/${id}`;

    return delete_data(url);
  }
}

/**
 * Accesses the server todos
 * @class
 */
 export class Todos {

  /**
   * Gets todo information
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {?string} id - id of a specific todo
   * @return {JSON} Specified todo or list of todos
   */
  static get(host, id=null) {
    let url = `${host}/todos`;

    if (id != null) {
      url += `/${id}`;
    }

    return get_data(url);
  }

  /**
   * Posts a todo
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} title - title of todo
   * @param {boolean} completed - if todo is completed or not
   * @return {JSON} Response from server
   */
  static post(host, title, completed) {
    let url = `${host}/todos`;

    let payload = {
      'title': title,
      'completed': completed,
    }

    return send_data(url, 'POST', payload);
  }

  /**
   * Updates a todo
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific todo
   * @param {?string} title - updated title of todo
   * @param {?boolean} completed - updated completed status of todo
   * @return {JSON} Response from server
   */
  static put(host, id, title=null, completed=null) {
    let url = `${host}/todos/${id}`;
    let payload = {};

    if (title != null)
      payload['title'] = title;

    if (completed != null)
      payload['completed'] = completed;

    return send_data(url, 'PUT', payload);
  }

  /**
   * Deletes todos
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific todo
   * @return {JSON} Response from server
   */
  static delete(host, id) {
    let url = `${host}/todos/${id}`;

    return delete_data(url);
  }
}

/**
 * Accesses the server users
 * @class
 */
 export class Users {

  /**
   * Gets user information
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {?string} id - id of a specific user
   * @return {JSON} Specified user or list of users
   */
  static get(host, id=null) {
    let url = `${host}/users`;

    if (id != null) {
      url += `/${id}`;
    }

    return get_data(url);
  }

  /**
   * Posts a user
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} name - name of user
   * @param {string} username - username of user
   * @param {string} email - email of user
   * @param {JSON} address - address of user
   * @param {string} phone - phone number of user
   * @param {website} website - website of user
   * @param {JSON} company - company of user
   * @return {JSON} Response from server
   */
  static post(host, name, username, email, address, phone, website, company) {
    let url = `${host}/users`;

    let payload = {
      'name': name,
      'username': username,
      'email': email,
      'address': address,
      'phone': phone,
      'website': website,
      'company': company,
    }

    return send_data(url, 'POST', payload);
  }

  /**
   * Updates a user
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific user
   * @param {string} name - updated name of user
   * @param {string} username - updated username of user
   * @param {string} email - updated email of user
   * @param {JSON} address - updated address of user
   * @param {string} phone - updated phone number of user
   * @param {website} website - updated website of user
   * @param {JSON} company - updated company of user
   * @return {JSON} Response from server
   */
  static put(host, id, name=null, username=null, email=null, address=null, phone=null, website=null, company=null) {
    let url = `${host}/users/${id}`;
    let payload = {};

    if (name != null)
      payload['name'] = name;

    if (username != null)
      payload['username'] = username;

    if (email != null)
      payload['email'] = email;

    if (address != null)
      payload['address'] = address;

    if (phone != null)
      payload['phone'] = phone;

    if (website != null)
      payload['website'] = website;

    if (company != null)
      payload['company'] = company;

    return send_data(url, 'PUT', payload);
  }

  /**
   * Deletes users
   * @method
   * @param {string} host - URL where the server is hosted
   * @param {string} id - id of a specific user
   * @return {JSON} Response from server
   */
  static delete(host, id) {
    let url = `${host}/users/${id}`;

    return delete_data(url);
  }

  /**
   * Build json geo for address
   * @param {?string} lat - latitude of address
   * @param {?string} lng - longitude of address
   * @return {?JSON} address geo in proper format
   */
  static build_geo(lat=null, lng=null) {
    let geo = {};

    if (lat !=null)
      geo['lat'] = lat;

    if (lng != null)
      geo['lng'] = lng;

    return geo;
  }

  /**
   * Build json address
   * @param {?string} street - street of address
   * @param {?string} suite - suite of address
   * @param {?string} city - city of address
   * @param {?string} zipcode - zipcode of address
   * @param {?string} geo - geo of address
   * @return {?JSON} user address in proper format
   */
  static build_address(street=null, suite=null, city=null, zipcode=null, geo=null) {
    let address = {};

    if (street != null)
      address['street'] = street;
  
    if (suite != null)
      address['suite'] = suite;
  
    if (city != null)
      address['city'] = city;
  
    if (zipcode != null)
      address['zipcode'] = zipcode;
  
    if (geo != null)
      address['geo'] = geo;

    return address;
  }

  /**
   * Build json company
   * @param {?string} name - name of company
   * @param {?string} catch_phrase - slogan of company
   * @param {?string} bs - business of company
   * @return {?JSON} user company in proper format
   */
  static build_company(name=null, catch_phrase=null, bs=null) {
    let company = {};
      
    if (name != null)
      company['name'] = name;
  
    if (catch_phrase != null)
      company['catchPhrase'] = catch_phrase;
  
    if (bs != null)
      company['bs'] = bs;

    return company;
  }
}
