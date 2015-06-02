export default class KarmaRoute{
	
	constructor(expressService, configService, slackService) {
		
		this._app = expressService.app;
		this._configService = configService;
		this._slackService = slackService;
		this._init();
	}
	
	_init(){
		
		this._app.post('/karma',  (req, res) => {
			
			/*
			REQUEST
				token=XXXXXXXXXXXXXXXXXX
				team_id=T0001
				team_domain=example
				channel_id=C2147483705
				channel_name=test
				timestamp=1355517523.000005
				user_id=U2147483697
				user_name=Steve
				text=karma: <!everyone> ++
				trigger_word=karma:
			*/
			
			//Needs to be a class
			let slackData = {
				token: req.body.token,
				teamId: req.body.team_id,
				teamDomain: req.body.team_domain,
				channelId: req.body.channel_id,
				channelName: req.body.channel_name,
				timestamp: req.body.timestamp,
				userId: req.body.user_id,
				userName: req.body.user_name,
				originalText: req.body.text,
				text: req.body.text.replace(req.body.trigger_word + ':', '').trim(),
				triggerWord: req.body.trigger_word
			};
			
			let helpPattern = /(\?)/,
				initPattern = /((init \{)([\s\S]*)(\}))/,
				userIdPattern = /<@(.*?)>/,
				userIdSinglePattern = /^<@(.*?)>$/,
				teamIdPattern = /<!everyone>/,
				posPattern = /((<@)(.*)(> )(\+\+))/,
				negPattern = /((<@)(.*)(> )(\-\-))/;
			
			//Help
		
			if(helpPattern.test(slackData.text)){
				this._helpCommand(slackData, res);
			}
			
			//Init
	
			if(initPattern.test(slackData.text)){				
				this._initCommand(slackData, res);
			}
			
		});	
	}
	
	_helpCommand(slackData, res){
		let slackResponse = "How to use karma:";
			slackResponse += "\n Positive karma = karma: @user ++";
			slackResponse += "\n Negative karma = karma: @user --";
			slackResponse += "\n User karma = karma: @user";
			slackResponse += "\n Team karma = karma: @everyone";
			slackResponse += "\n Setup karma = karma: init {";
			slackResponse += "\n  \"inboundWebhook\": \"https://hooks.slack.com/services/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\",";
			slackResponse += "\n  \"outboundToken\": \"25LnEy4vXHEi88Plrpvg6htP";
			slackResponse += "\n }";
		this._slackService.sendResponse(slackData, slackResponse, res);
	}
	
	_initCommand(slackData, res){
		let configJsonString = slackData.text.replace("init", '').trim();
		
		this._slackService.parseJson(configJsonString)
			.then((data)=>{

				//Remove the '<>' from the inbound webhook that slack seems to add around urls.
				data.inboundWebhook = data.inboundWebhook.replace(/<|>/g,'');

				let configModel = new ConfigModel({
					teamId: slackData.teamId,
					teamDomain: slackData.teamDomain,
					//apiToken: data.apiToken || ''
					inboundWebhook: data.inboundWebhook || '',
					outboundToken: data.outboundToken || ''					
				});

				configService.register(configModel)
					.then((data) => {

						this._slackService.sendResponse(slackData, data, res);
					})
					.catch((data) => {

						this._slackService.sendResponse(slackData, data, res);
					});
					
			}).catch(()=>{
				this._slackService.sendResponse(slackData, "Invalid init JSON. For help see; karma: ?", res);
			});
	}
	

};