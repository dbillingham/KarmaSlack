export default class KarmaRoute{
	
	constructor(expressService) {
		
		this._app = expressService.app;		
		
		this._app.post('/karma2',  (req, res) => {
			
		});		
	}
	
	run(){

	}
	
	get app(){
		
	}
};