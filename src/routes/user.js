
/*
 * GET users listing.
 */

/* This is where we execute the routes we declared in app.js
 * We start by bringing in our Users collection.
 */

var Users = require('../app/collections/users').collection;

/* Check out /routes/tweet.js first for a simpler implementation.
 * We pass an array of 3 sets of related models we want information about
 * to the {withRelated:} argument so we can see what each user has tweeted,
 * plus who each user follows and who each user follows.
 */

exports.list = function(req, res){
	new Users().fetch({
		withRelated: ['tweets', 'followers', 'following']
	}).then(function(collection) {
		res.send(collection.toJSON());
	});

  
};