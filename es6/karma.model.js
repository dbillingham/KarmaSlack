import Mongoose from 'mongoose';
import LoadClass from 'mongoose-class-wrapper';

var karmaSchema = Mongoose.Schema({
	teamId: String,
	userName: String,	
	fromUserName: String,
	created: {type: Date, default: Date.now}
});

class KarmaModel {

	static getUserPoints(teamId, userName){
		return this.find({ teamId, userName });
	}
	
	static getTeamPoints(teamId){
		
		return new Promise((res,rej) =>{
			
			this.aggregate([
			    {
					$match: {teamId}
				},{
				    $group : {
						_id: '$userName',
						count: { $sum: 1 }
				    }
				}
			], function(err, collection){
				res(collection);
			});
				
			
		});
	}
	
	static deleteLatestPoint(teamId, userName, fromUserName){
		return this.findOneAndRemove({ teamId, userName, fromUserName }, 
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