export default class Config {
	
	constructor() {
		this._env = process.env.NODE_ENV || 'development';
		this._port = process.env.PORT || 80;
		this._mongodbName = process.env.MONGODB_NAME || 'karmatest';
		this._mongodbUsername = process.env.MONGODB_USERNAME || 'trunk';
		this._mongodbPassword = process.env.MONGODB_PASSWORD || 'trunk';
	}
	
	get db(){		
		return this.productionEnv ?
			`mongodb://${this._mongodbUsername}:${this._mongodbPassword}@ds063889.mongolab.com:63889/${this._mongodbName}`:
			'mongodb://localhost/karma';
	}
	
	get port(){
		return this.productionEnv ? this._port : '3000';
	}	
	
	get productionEnv(){
		return (this._env === 'production');
	}
}