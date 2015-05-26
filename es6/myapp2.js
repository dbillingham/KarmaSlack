import { install } from 'source-map-support';
import express from 'express';
//import { bodyParser } from 'body-parser';
//import { mongoose } from 'mongoose';
//import { Slack } from 'slack-node';
import Config from '../es5/config.js'; 

install();

var app = express();

var config = new Config();

console.log([1,2,3].map(x => x * x));

app.listen('3000', 
	() => console.log(`Running on port ${config.port}`));
