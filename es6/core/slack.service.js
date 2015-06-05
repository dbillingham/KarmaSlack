import Slack from 'slack-node';

export default class SlackService {
	
	constructor(configService, config) {
		
		this._configService = configService;
		this._config = config;
	}
	
	//Parse json data
	
	parseJson(str){	
			
		return new Promise((res,rej) =>{

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
	
					if(token !== data.outgoingToken){
						rej("Invalid token.");
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
			message = `Invalid Command. For help see; ${slackData.triggerWord}: ?`;
		}
		
		if(this._config.productionEnv){
			
			let slackRes = new Slack();
			
			this._configService.getConfig(slackData.teamId).then((data)=>{
				
				//data.incomingWebhookUrl = "https://hooks.slack.com/services/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";
				
				if(data.incomingWebhookUrl){
					
					slackRes.setWebhook(data.incomingWebhookUrl);
				
					slackRes.webhook({
						
					  channel: "#" + slackData.channelName,
					  username: "karmabot",
					  text: message
					}, (err, response) => {
						
					  console.log(response);
					});
				}
			});
		} else {
			res.send(message.toString());
			return;
		}
	}
}