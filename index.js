// index.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var booksSearch = require('google-books-search');

var options = {
	key: "AIzaSyBVGJBQhRpHp2yO15Jwju73agPBJnuU9kE",
	field: 'title',
	offset: 0,
	limit: 10,
	type: 'books',
	order: 'relevance',
	lang: 'en'
};
var query = "programing";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/v1)
router.get('/', function(req, res) {
	//console.log(req)
	//console.log(res)
	booksSearch.search(query, options, function(error, results) {
		console.log(error);
		console.log(results);
//		res.json({ message: 'hooray! welcome to our api!' });
		res.json(results);

	});

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);