module.exports = {
	development: {
		db: 'mongodb://localhost/karma',
		port: process.env.PORT || '3000'
	},
	production: {
		db: 'mongodb://trunk:trunk@ds063889.mongolab.com:63889/karma',
		port: process.env.PORT || 80
	}
};

