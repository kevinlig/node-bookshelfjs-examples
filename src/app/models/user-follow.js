/* 
 * This is also a model representing a single user. However it does not have any
 * other relation data. It is only used to represent a followed or following
 * user.
 */

var Bookshelf = require('bookshelf').DB;

exports.model = Bookshelf.Model.extend({
	tableName: "Users"
});