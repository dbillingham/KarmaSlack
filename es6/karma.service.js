import KarmaModel from '../es5/karma.model.js'; 

export default class KarmaService {
	
	constructor() {
		
	}
	
	//Add Karma record
	
	add(teamId, userId, fromUserId){		

		return new Promise((res,rej) =>{
			
			KarmaModel.create({
				"teamId": teamId,
				"userId": userId,
				"fromUserId": fromUserId
			})
			.then(() => {		
				return this.userCount(teamId, userId, "increased")
						.then((data) => res(data));
			});
		});
	}
	
	//Remove Karma record
	
	remove(teamId, userId, fromUserId){
		
		return new Promise((res,rej) =>{
			
			if(userId === fromUserId){		
				return fromSelf()
						.then((data)=> res(data));
			}
			
			return KarmaModel.deleteLatestPoint(teamId, userId, fromUserId)	
			.then((entity) => {
				if(!entity){
					return whenNoRecordFound(userId)
							.then((data)=> res(data));
				}		
				return this.userCount(teamId, userId, "decreased")
						.then((data) => res(data));
			});
		});
		
		function whenNoRecordFound (userId){
	  
			return Promise.resolve(`${userId} needs some positive karma from you first.`);
		};
		
		function fromSelf (){
		  
			return Promise.resolve(`Don't be so hard on yourself.`);
		};
	}
	
	//Get Karma count for user
	
	userCount(teamId, userId, incDec){
  
		return new Promise((res,rej) =>{
			KarmaModel.getUserPoints(teamId, userId)
			.then((collection) => {
				var responseText = `<@${userId}> has a karma of ${collection.length}.`; 		 
		
				if(incDec){
					responseText = `<@${userId}>s karma has ${incDec} to ${collection.length}.`;
				}
				
				res(responseText);
			});
		});
	}
	
	//Get Karma count for team

	teamCount(teamId){
		
		return new Promise((res,rej) =>{
			KarmaModel.getTeamPoints(teamId)
			.then((collection) => {
				
				var responseText = 'Karma Totals: \n';
				
				for (let user = 0, len = collection.length; user < len; user++) {
					let element = collection[user];
					responseText += ` ${element._id} has a karma of ${element.count}. \n`;
				}
				res(responseText);
			});
		});
	}
}