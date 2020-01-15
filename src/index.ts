#! /usr/bin/env node

import { Db, MongoClient } from 'mongodb';
import { Argv } from 'yargs';

import fs from 'fs';
import os from 'os';
import path from 'path';
import { exportCollection } from './exportCollection';
import { getKubernetesCpCommands } from './helpers/kubernetes';

let config: any = null;
const configFilePath = path.join(process.cwd(), 'config.json');

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

async function close() {
  if (client && client.isConnected) {
    await client.close();
  }
}

const run = () =>
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
          await close();
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
        })()
          .then(() => {
            console.log('will export these collections: ', config.mongo.collections);
            return Promise.all(config.mongo.collections.map(exportCollection(db!)));
          })
          .then(close)
          .then(() => {
            console.log('done with export command');
            console.log(
              `If you had run this command inside a kubernetes pod, now you can run the following command to copy these csv files into your local machine.\n${getKubernetesCpCommands(
                config.mongo.collections,
                'prod-g3',
                os.hostname(),
              )}/`,
            );
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

        if (args.write === 'true' && !fs.existsSync('./config.json')) {
          fs.writeFileSync('./config.json', fs.readFileSync(path.join(__dirname, './example.json')));
          console.log('wrote the config file');
        } else {
          console.log('config file already exists, skipped writing');
        }
      },
    )
    .command(
      ['pwd'],
      'get the working directory of this tool',
      (yargs: Argv) => yargs,
      (args: any) => {
        console.log(__dirname);
        console.log(process.cwd());
      },
    ).argv;

if (fs.existsSync(configFilePath)) {
  (async () => {
    config = await import(configFilePath);
  })().then(() => {
    console.log('config file loaded');

    run();
  });
} else {
  console.error('no config file located, please run `mongo-csv config --write=true` to generate one');

  // To make the example.json be copied to lib folder
  import('./example.json');
  run();
}
