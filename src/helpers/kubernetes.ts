export const getKubernetesCpCommands = (collections: string[], pod = 'pod') =>
  collections.map(file => `kubectl cp ${pod}:${process.cwd()}/${file}.csv ${file}.csv`).join('&&');
