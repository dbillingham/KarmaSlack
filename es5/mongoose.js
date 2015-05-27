var mongoose = require('mongoose'),
	Contact = require('./contact.model.js');
	
module.exports = function(config){
	
	mongoose.connect(config.db);
	
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback(){
		console.log('db opened');
	});
	
	//Contact.find({}).remove().exec();
	
	Contact.find({}).exec(function(err, collection){
		if(Contact.length === 0){
	        Contact.create({
	          "name":"Joe Bloggs",
	          "ext":"0001",
	          "mobile":"07538743168"
	        });								
		}
	});
};
