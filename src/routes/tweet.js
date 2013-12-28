
/*
 * GET tweets listing.
 */

/* This is where we execute the routes we declared in app.js
 * We start by bringing in our Tweets collection and our individual Tweet model
 */

var Tweets = require('../app/collections/tweets').collection;
var Tweet = require('../app/models/tweet').model;

/* In list(), we just want to show all tweets along with the user who posted the
 * tweet. We pass the {withRelated: ['users']} argument in fetch().
 * Note that 'users' corresponds to the users() function we wrote in the Tweet
 * model.
 */

exports.list = function(req, res){
	new Tweets().fetch({
		withRelated: ['users']
	}).then(function(collection) {
		res.send(collection.toJSON());
	});
};

/* In create(), we are making a new tweet.
 *
 * I'm making some assumptions here (in testing, I manually wrote my POSTed 
 * JSON), but we'll expect a POST with application/json as its Content-Type and 
 * the JSON will match the Tweet model's attributes (i.e., we're expecting a 
 * POST from Backbone).
 */

exports.create = function(req, res) {
	var newTweet = req.body;
	new Tweet({
		content: newTweet.content,
		user_id: newTweet.user_id
	}).save().then(function(postedModel) {
		res.json(200,postedModel);	
	});
};

/* In show(), we are displaying a single tweet.
 *
 * We pass the query paramers (in this case, the id value), into the Tweet() 
 * object.
 *
 * Per Bookshelf's documentation, if no rows are found, an undefined object is 
 * returned. So we check the result as part of our error handling.
 */

exports.show = function(req,res) {
	var tweetId = req.params.id;

	new Tweet({
		id: tweetId
	}).fetch({
		withRelated: ['users']
	}).then(function(resultingTweet) {
		if (resultingTweet == undefined) {
			// no such result
			res.json(404,{error: "Tweet not found."});
		}
		else {
			res.json(200, resultingTweet);
		}
	});
};

/* In update(), we are updating a single tweet's contents.
 *
 * Like with show(), we pass the query paramers into the Tweet() object.
 *
 * Note our parameters in save(). The first parameter is an object of key-values
 * that we want to update in the DB. For simplicity, we're just going to pass 
 * our whole object in. Ideally, we'd ditch the id first so the DB's id value 
 * never changes.
 *
 * The second parameter in save() is {patch: true}, which just tells Bookshelf 
 * to update only those fields we passed in the first argument.
 *
 * We haven't done much error handling so far (except for show()). then() is 
 * part of Javascript Promises ("thenables"). It actually includes 3 callback 
 * functions (we've only used one to date). The first returns a model or 
 * collection in the event of a successful operation.
 *
 * The second callback occurs when an error has been thrown. We've added a 404 
 * error here in this case (I'm assumming) it means the tweet doesn't exist at 
 * the ID, although we could perform additional checks to see if it's a 
 * validation issue.
 * 
 * Also, although we don't use it here, the error callback also passes back
 * an object with more error details in it.
 * 
 * The third callback (not implemented here) occurs when there is progress to 
 * report.
 *
 * In case you were wondering, this is also how you'd handle errors with the 
 * create() method we did earlier. 
 */

exports.update = function(req, res) {
	var tweetId = req.params.id;

	var updatedTweet = req.body;

	new Tweet({
		id: tweetId
	}).save(updatedTweet, {patch: true}).then(function(updatedModel) {
		res.json(200, updatedModel);
	}, function() {
		res.json(404, {error: "No such tweet."});
	});
};