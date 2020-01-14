#! /usr/bin/env node

import { Db, MongoClient } from 'mongodb';
import { Argv } from 'yargs';

import * as fs from 'fs';
import * as path from 'path';
import config from './config.json';

let client: MongoClient | null = null;
let db: Db | null = null;

const connect = async () => {
  console.log('connecting...');
  client = new MongoClient(config.mongo.uri, { useUnifiedTopology: true });
  console.log('client = ', client);
  await client.connect();
  console.log('connected.');
  db = client.db();
  console.log('db = ', db);
  const collections = await db.collections();
  console.log('collections = ', collections);
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
    (yargs: Argv) =>
      yargs.options('write', {
        default: 'config.json',
        describe: 'write a placeholder config file to' + ' current directory',
      }),
    (args: any) => {
      console.log(config);

      if (args.write === 'true') {
        fs.writeFileSync('./config.json', fs.readFileSync(path.join(__dirname, './example.json')));
        console.log('wrote the config file');
      }
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
