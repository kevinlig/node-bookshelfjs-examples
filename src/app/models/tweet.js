/* 
 * This is the model representation of the Tweets table. It represents a single
 * tweet.
 */

// Import the initialized Bookshelf
var Bookshelf = require('bookshelf').DB;

/*
 * This is a convention I made up, putting .model at the end of models and
 * .collection at the end of collections. Do what you will.
 */
// Import the User model from /app/models/user.js
var User = require("./user").model;

/* We needed to put the Bookshelf model behind an exports.model to prevent
 * "not a function" errors.
 */

/* We create a users() method in the model to refer to the related User table.
 * The first argument is the User model we imported at the top, the second is
 * is the foreign key in the Tweets table.
 *
 * Let's go to the Users model next.
 */

exports.model = Bookshelf.Model.extend({
	tableName: "Tweets",
	users: function() {
		return this.belongsTo(User, "user_id");
	}
});