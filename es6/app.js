import { install as sourceMapSupportInstall } from 'source-map-support';

import Config from './core/config.js'; 

import ConfigModel from './config/config.model.js';
 
import MongooseService from './core/mongoose.service.js';
import KarmaService from './karma/karma.service.js'; 
import ConfigService from './config/config.service.js'; 
import SlackService from './core/slack.service.js'; 
import ExpressService from './core/express.service.js'; 

import KarmaRoute from './karma/karma.route.js'; 

sourceMapSupportInstall();

let config = new Config();

let mongooseService = new MongooseService(config);
mongooseService.init();

let expressService = new ExpressService(config);
let configService = new ConfigService();
let slackService = new SlackService(configService, config);
let karmaService = new KarmaService();
let karmaRoute = new KarmaRoute(expressService, configService, slackService, karmaService);

expressService.run();