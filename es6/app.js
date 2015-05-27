import { install } from 'source-map-support';
import Express from 'express';
import BodyParser from 'body-parser';
import Slack from 'slack-node';
import Config from '../es5/config.js'; 
//import { mongoose } from 'mongoose';

install();

var app = Express();

var config = new Config();

app.use(BodyParser.urlencoded({ extended: true }));

app.post('/test',  (req, res) => {
	
	var channelName = req.body.channel_name;
	
	var slackRes = new Slack();
	slackRes.setWebhook("https://hooks.slack.com/services/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");
	
	slackRes.webhook({
	  channel: "#" + channelName,
	  username: "webhookbot",
	  text: "This is posted to #general and comes from a bot named webhookbot. "
	}, (err, response) => {
	  console.log(response);
	});
});

app.listen(config.port, 
	() => console.log(`Running on port ${config.port}`));
