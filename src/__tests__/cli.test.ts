import coffee from 'coffee';
import path from 'path';

const options = {
  env: {
    TS_NODE_PROJECT: path.resolve(__dirname, '../../tsconfig.json'),
  },
  execArgv: ['--require', require.resolve('ts-node/register/type-check')],
  cwd: path.resolve(__dirname, '../../'),
};

const cmd = (command: string[]) => coffee.fork('src/index.ts', command, options);

test('write config', async () => {
  await cmd(['config', '--write=true'])
    .expect('stdout', /\n(wrote the config file|config file already exists, skipped writing)/)
    .end();
});

test('output config', async () => {
  await cmd(['config'])
    .expect('stdout', /version: '1.0.0'/)
    .end();
});

test('can get current working directory', async () => {
  await cmd(['pwd'])
    .expect('stdout', new RegExp(path.resolve(__dirname, '..') + '\n' + path.resolve(__dirname, '../..') + '\n'))
    .end();
});

test('can run', async () => {
  await cmd(['connect'])
    .expect('stdout', /^config file loaded\nconnecting.../)
    .expect('stderr', '')
    .expect('code', 0)
    .end();
});
