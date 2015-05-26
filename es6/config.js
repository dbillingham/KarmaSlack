export default class Config {
	constructor() {
		this._env = process.env.NODE_ENV || 'development';
	}
	
	get db(){		
		return (this._env === 'development') ? 
			'mongodb://localhost/karma' :
			'mongodb://trunk:trunk@ds063889.mongolab.com:63889/karma';
	}
	
	get port(){	
		
		if(process.env.PORT){
			return process.env.PORT;
		}
			
		return (this._env === 'development') ? '3000' : 80;
	}	
}