import Mongoose from 'mongoose';
import KarmaModel from '../es5/karma.model.js'; 

export default class KarmaMongoose{
	
	constructor(config) {
		
		this._config = config;
	}
	
	init(){
		
		Mongoose.connect(this._config.db);
		
		var db = Mongoose.connection;
		
		db.on('error', console.error.bind(console, 'connection error...'));
		
		db.once('open', function callback(){
			console.log('db opened');
		});
	}
};