import Mongoose from 'mongoose';
import LoadClass from 'mongoose-class-wrapper';

var karmaSchema = Mongoose.Schema({
	teamId: String,
	userName: String,	
	fromUserName: String,
	created: {type: Date, default: Date.now}
});

class KarmaModel {

	static points(teamId, userName){
		return this.find({ teamId, userName });
	}
	
	static deleteLatestPoint(teamId, userName){
		return this.findOneAndRemove({ teamId, userName }, 
		{sort: {created: 'asc'}});
	}
}
/*
schema.statics.nameContains = function(name, cb){
	return this.find({name: new RegExp(name, 'i')}, cb);	
};
*/

karmaSchema.plugin(LoadClass, KarmaModel);

export default Mongoose.model('Karma', karmaSchema);