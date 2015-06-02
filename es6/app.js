import { install as sourceMapSupportInstall } from 'source-map-support';

import Config from '../es5/config.js'; 

import ConfigModel from '../es5/config.model.js';
 
import MongooseService from '../es5/mongoose.service.js';
import KarmaService from '../es5/karma.service.js'; 
import ConfigService from '../es5/config.service.js'; 
import SlackService from '../es5/slack.service.js'; 
import ExpressService from '../es5/express.service.js'; 

import KarmaRoute from '../es5/karma.route.js'; 

sourceMapSupportInstall();

let config = new Config();

let mongooseService = new MongooseService(config);
mongooseService.init();

let expressService = new ExpressService(config);
let configService = new ConfigService();
let slackService = new SlackService();
let karmaService = new KarmaService();
let karmaRoute = new KarmaRoute(expressService, configService, slackService, karmaService);

expressService.run();