/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
require('express-async-errors');
const winston = require('winston');
const express = require('express');
const app = express();
const config = require('./startup/config');
const startUpRoutes = require('./startup/routes');
const startUpDB = require('./startup/db');
const PORT = process.env.PORT || 3000;
winston.add(winston.transports.File, { filename: 'myLogs.log' });
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

config();
startUpRoutes(app);
startUpDB();

app.listen(PORT, () => {
	winston.info(`Listen on port ${PORT}`);
});

