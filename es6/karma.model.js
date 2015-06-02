import Mongoose from 'mongoose';
import LoadClass from 'mongoose-class-wrapper';

var karmaSchema = Mongoose.Schema({
	teamId: String,
	userId: String,	
	fromUserId: String,
	created: {type: Date, default: Date.now}
});

class KarmaModel {

	static getUserPoints(teamId, userId){
		return this.find({ teamId, userId });
	}
	
	static getTeamPoints(teamId){
		
		return new Promise((res,rej) =>{
			
			this.aggregate([
			    {
					$match: {teamId}
				},{
				    $group : {
						_id: 'userId',
						count: { $sum: 1 }
				    }
				}
			], function(err, collection){
				res(collection);
			});
				
			
		});
	}
	
	static deleteLatestPoint(teamId, userId, fromUserId){
		return this.findOneAndRemove({ teamId, userId, fromUserId }, 
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