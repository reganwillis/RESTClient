# RESTClient

This project demonstrates communication with RESTful APIs using the four main HTTP methods: GET, POST, PUT and DELETE. View the live project [here](https://s3.us-east-2.amazonaws.com/reganwillis-softwaredeveloper.com/RESTClient.html).

The [RESTClient.js](https://github.com/reganwillis/RESTClient/blob/main/RESTClient.js) code has been used in production to handle sensitive data in conjunction with a CRUD application. It has been edited to work with a [test server](http://jsonplaceholder.typicode.com/). This server is for testing only, so it simulates POST, PUT and DELETE but these methods will not actually change the data on the server.

[RESTClient.js](https://github.com/reganwillis/RESTClient/blob/main/RESTClient.js) is the module that sends asynchronous HTTP requests using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). [rest_index.js](https://github.com/reganwillis/RESTClient/blob/main/rest_index.js) demonstrates importing the module, making requests, and displaying responses via HTML.