import ConfigModel from './config.model.js'; 

export default class ConfigService {
	
	register(config){

		return new Promise((res,rej) =>{
			
			ConfigModel.update(config)
			.then(() => {
				
				res(`Karma config for ${config.teamDomain} updated.`);
			}).catch((e)=>{

				rej(`Error inserting/updating Karma config for ${config.teamDomain}.`);
			});
		});
	}
	
	getConfig(teamId){
		return ConfigModel.findOne({ teamId });
	}	
}