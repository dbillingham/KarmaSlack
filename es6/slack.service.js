import Slack from 'slack-node';

export default class SlackService {
	
	constructor(configService) {
		
		this._configService = configService;
	}
	
	//Parse json data
	
	parseJson(str){	
			
		return new Promise((res,rej) =>{
			console.log(str);
			try{
				str = str.replace(/\\"/g, '');
				res(JSON.parse(str));
			}catch(e){
				rej();
			}
		});
	}
	
	//Authenticate request
	
	authenticate(teamId, token){

		return new Promise((res,rej)=>{
	
			this._configService.getConfig(teamId)
				.then((data) => {
	
					if(!data){
						rej("No config found.");
					}
	
					if(token !== data.outboundToken){
						rej("Invalid token. " + token + ' | ' + data.outboundToken);
					}
					
					res();				
				}).catch((err)=>{
	
					rej(err);
				});
		});
	}
	
	//Send slack response
	
	sendResponse(slackData, message, res){
	  
	  	if(!message){
			message = "Invalid Command. For help see; karma: ?";
		}
		
		//res.send(message);
		//return;
		
		let slackRes = new Slack();
		
		this._configService.getConfig(slackData.teamId).then((data)=>{
			
			//data.inboundWebhook = "https://hooks.slack.com/services/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";
			
			if(data.inboundWebhook){
				
				slackRes.setWebhook(data.inboundWebhook);
			
				slackRes.webhook({
					
				  channel: "#" + slackData.channelName,
				  username: "karmabot",
				  text: message
				}, (err, response) => {
					
				  console.log(response);
				});
			}
		});
	}
}