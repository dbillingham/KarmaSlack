import KarmaModel from '../es5/karma.model.js'; 

export default class KarmaService {
	
	constructor() {
		
	}
	
	//Add Karma record
	
	add(teamId, userName, fromUserName){		

		return new Promise((res,rej) =>{
			
			KarmaModel.create({
				"teamId": teamId,
				"userName": userName,
				"fromUserName": fromUserName
			})
			.then(() => {		
				return this.userCount(teamId, userName, "increased")
						.then((data) => res(data));
			});
		});
	}
	
	//Remove Karma record
	
	remove(teamId, userName, fromUserName){
		
		return new Promise((res,rej) =>{
			
			if(userName === fromUserName){		
				return fromSelf()
						.then((data)=> res(data));
			}
			
			return KarmaModel.deleteLatestPoint(teamId, userName, fromUserName)	
			.then((entity) => {
				if(!entity){
					return whenNoRecordFound(userName)
							.then((data)=> res(data));
				}		
				return this.userCount(teamId, userName, "decreased")
						.then((data) => res(data));
			});
		});
		
		function whenNoRecordFound (userName){
	  
			return Promise.resolve(`${userName} needs some positive karma from you first.`);
		};
		
		function fromSelf (){
		  
			return Promise.resolve(`Don't be so hard on yourself.`);
		};
	}
	
	//Get Karma count for user
	
	userCount(teamId, userName, incDec){
  
		return new Promise((res,rej) =>{
			KarmaModel.getUserPoints(teamId, userName)
			.then((collection) => {
				var responseText = `<@${userName}> has a karma of ${collection.length}.`; 		 
		
				if(incDec){
					responseText = `<@${userName}>s karma has ${incDec} to ${collection.length}.`;
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