import Mongoose from 'mongoose';
import LoadClass from 'mongoose-class-wrapper';

var configSchema = Mongoose.Schema({
	teamId: String,
	teamDomain: String,
	inboundWebhook: String,
	outboundToken: String,
	//apiToken: String,
	created: {type: Date, default: Date.now}
});

class ConfigModel {

	static update(data){
		
		/*
			We have to remove the newly assigned _id as mongo wont update
			when a model has a differnet _id
		*/
		
		data = data.toObject();
		delete data['_id'];
		
		return this.findOneAndUpdate(
			{ 'teamId': data.teamId },
			data,
			{upsert:true}
		);
	}
}

configSchema.plugin(LoadClass, ConfigModel);

export default Mongoose.model('Config', configSchema);