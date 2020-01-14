#! /usr/bin/env node

import fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import rimraf from 'rimraf';
import shelljs from 'shelljs';
import { Argv } from 'yargs';

// tslint:disable-next-line
require('yargs')
  .usage('Usage: k8ss switch --cluster=your-cluster --namespace=your-namespace')
  .demandCommand(1)
  .demandOption('namespace')
  .command(
    ['switch', 's'],
    'switch clusters and namespace',
    (yargs: Argv) => {
      yargs
        .option('cluster', {
          default: '',
          describe: 'cluster name to switch',
        })
        .option('namespace', {
          default: 'dev',
          describe: 'namespace to switch',
        });
    },
    (args: any) => {
      console.log(`switching to --cluster=${args.cluster} --namespace=${args.namespace}...`);
      const { cluster, namespace } = args;

      if (cluster) {
        const source = path.resolve(os.homedir(), 'k8s-config');
        const sourceConfig = path.resolve(source, cluster, 'config');
        console.log('will copy ', sourceConfig);

        if (!fs.existsSync(sourceConfig)) {
          console.error('没有找到目标文件：', sourceConfig);
          process.exit(1);
        }

        const kubeFolder = path.resolve(os.homedir(), '.kube');
        const kubeBackupFolder = path.resolve(os.homedir(), '.kube.bak');

        if (fs.existsSync(kubeFolder)) {
          if (fs.existsSync(kubeBackupFolder)) {
            rimraf.sync(kubeBackupFolder);
            console.log('deleted ', kubeBackupFolder);
          }

          fs.renameSync(kubeFolder, kubeBackupFolder);
          console.log('backed up ~/.kube to ~/.kube.bak');
        }

        fs.mkdirSync(kubeFolder, { recursive: true });
        console.log('created ', kubeFolder);

        const targetConfig = path.resolve(kubeFolder, 'config');
        fs.copyFileSync(sourceConfig, targetConfig);
        console.log('copied from ', sourceConfig, ' to ', targetConfig);
      }

      console.log('will switching context...', namespace);
      const currentContext = shelljs.exec('kubectl config current-context');

      console.log('current context = ', currentContext);
      const output = shelljs.exec(
        'kubectl config set-context ' + currentContext.stdout.replace('\n', '') + ' --namespace=' + namespace,
      );
      console.log('switched result: ');
      console.log(output.stdout);

      if (output.stderr) {
        console.error(output.stderr);
        process.exit(1);
      }
    },
  ).argv;
