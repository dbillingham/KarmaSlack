import Express from 'express';
import BodyParser from 'body-parser';

export default class ExpressService{
	
	constructor(config) {
		
		this._config = config;
		this._app = Express();
		this._app.use(BodyParser.urlencoded({ extended: true }));
	}
	
	run(){
		this._app.listen(this._config.port, 
			() => console.log(`Running on port ${this._config.port}`));
	}
	
	get app(){
		return this._app;
	}
};