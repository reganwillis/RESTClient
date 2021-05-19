// Regan Willis 2021
// REST Client

// TODO: resources - albums, photos, todos, users


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