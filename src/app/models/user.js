/* 
 * This is the model representation of the Users table. It represents a single
 * user.
 */

var Bookshelf = require('bookshelf').DB;

/* So this model is a little more complicated. Recall from our DB schema that
 * we've got a join/bridge table for followers.
 *
 * The problem is, Bookshelf wants us to tell it what the end model will be.
 * Both sides of the join table point to User models (albeit different users).
 * But we can't import the User model into the User model, that would be circular.
 * Nor can we use a this/self reference in the User model because it would still
 * be undefined.
 *
 * The solution is to create a temporary bridge model called FollowerUser that
 * contains just a tableName attribute and nothing else. This is, in reality,
 * just a second copy of the User model with a different name and extra
 * relations. Check out /app/models/user-follow.js to see the implementation.
 *
 */

var FollowerUser = require("./user-follow").model;


/* The tweets() attribute is the other side of the one-to-many relationship
 * between users and tweets. It will return all the tweet a user has posted.
 *
 * The followers() and following() attributes use the belongsToMany() method.
 * The first argument is the model type that will be on the other side of the 
 * bridge table (see above for my explanation about why we couln't just use User).
 * The second argument is the name of the join table, followed by the key presenting
 * the current user and the key representing the other user.
 */

exports.model = Bookshelf.Model.extend({
	tableName: "Users",
	tweets: function() {
		var Tweet = require("./tweet").model;
		return this.hasMany(Tweet, "user_id");
	},
	followers: function() {
		return this.belongsToMany(FollowerUser, "Followers", "followee", "follower");
		
	},
	following: function() {
		return this.belongsToMany(FollowerUser, "Followers", "follower", "followee");
	}
});