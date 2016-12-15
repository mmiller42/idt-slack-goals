#!/usr/bin/env node

const commander = require('commander');

const packageJson = require('../../package.json');
const complete = require('./complete');
const done = require('./done');
const goal = require('./goal');
const slack = require('./slack');
const list = require('./list');

process.on('unhandledRejection', err => { throw err; });

commander.version(packageJson.version);

complete(commander);
done(commander);
goal(commander);
slack(commander);
list(commander);

commander.parse(process.argv);
