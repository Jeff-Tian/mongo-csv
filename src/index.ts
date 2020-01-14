#! /usr/bin/env node

import { Argv } from 'yargs';
import { MongoClient } from 'mongodb';

const config = require('./config.json');

// tslint:disable-next-line
require('yargs')
  .usage('Usage: mongocsv')
  .demandCommand(1)
  .command(
    ['export', 'e'],
    'exports collections to csv files',
    (yargs: Argv) => yargs,
    (args: any) => {
      console.log('connecting...');
      const client = new MongoClient(config.mongo.uri);
      console.log('client = ', client);
    },
  )
  .command(
    ['config'],
    'output the current config',
    (yargs: Argv) => yargs,
    (args: any) => {
      console.log(config);
    },
  )
  .command(
    ['pwd'],
    'get the working directory of this tool',
    (yargs: Argv) => yargs,
    (args: any) => {
      console.log(__dirname);
    },
  ).argv;
