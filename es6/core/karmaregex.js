class KarmaRegex {
	
	get helpPattern() {
		return /(\?)/;
	}
	
	get initPattern() {
		return /((init \{)([\s\S]*)(\}))/;
	}
	
	get userIdPattern() {
		return /<@(.*?)>/;
	}
	
	get userIdSinglePattern() {
		return /^<@(.*?)>$/;
	}
	
	get teamIdPattern() {
		return /<!everyone>/;
	}
	
	get posPattern() {
		return /((<@)(.*)(> ?)(\+\+))/;
	}
	
	get negPattern() {
		return /((<@)(.*)(> ?)(\-\-))/;
	}
}

export default new KarmaRegex;
