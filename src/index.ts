#! /usr/bin/env node

import { Argv } from 'yargs';

// tslint:disable-next-line
require('yargs')
  .usage('Usage: mongocsv')
  .demandCommand(1)
  .command(
    ['export', 'e'],
    'exports collections to csv files',
    (yargs: Argv) => yargs,
    (args: any) => {
      console.log('exporting...');
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
