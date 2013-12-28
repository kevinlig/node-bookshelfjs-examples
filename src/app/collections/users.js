/* 
 * This represents a collection of all users in the Users table. We only really
 * use this for our list method.
 */

var Bookshelf = require('bookshelf').DB;

var User = require("../models/user").model;

exports.collection = Bookshelf.Collection.extend({
	model: User
});