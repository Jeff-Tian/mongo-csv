#! /usr/bin/env node

import { Db, MongoClient } from 'mongodb';
import { Argv } from 'yargs';

import config from './config.json';

let client: MongoClient | null = null;
const db: Db | null = null;

const connect = async () => {
  console.log('connecting...');
  client = new MongoClient(config.mongo.uri, { useUnifiedTopology: true });
  console.log('client = ', client);
  await client.connect();
  console.log('connected.');
};

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
        await connect();
        if (client && client.isConnected) {
          await client.close();
        }
      })().then(() => {
        console.log('done with connect command');
      });
    },
  )
  .command(
    ['export'],
    'exports',
    (yargs: Argv) => yargs,
    (args: any) => {
      (async () => {
        await connect();
      })().then(() => {
        console.log('done with export command');
      });
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
