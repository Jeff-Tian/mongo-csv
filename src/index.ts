#! /usr/bin/env node

import { Argv } from 'yargs';
import { Db, MongoClient } from 'mongodb';

const config = require('./config.json');
let client: MongoClient | null = null;
let db: Db | null = null;

// tslint:disable-next-line
require('yargs')
  .usage('Usage: mongocsv')
  .demandCommand(1)
  .command(
    ['connect'],
    'connect to mongodb',
    (yargs: Argv) => yargs,
    (args: any) => {
      (async () => {
        console.log('connecting...');
        client = new MongoClient(config.mongo.uri, { useUnifiedTopology: true });
        console.log('client = ', client);
        await client.connect();
        console.log('connected.');
        await client.close();
      })().then(() => {
        console.log('done with connect command');
      });
    },
  )
  .command(['ls'], 'list databases', (yargs: Argv) => yargs, (args: any) => {})
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
