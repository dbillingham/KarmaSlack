var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: String,
	//username: String,
	ext: String,
	mobile: String
});

schema.statics.nameContains = function(name, cb){
	return this.find({name: new RegExp(name, 'i')}, cb);	
};

module.exports = mongoose.model('Contact', schema);