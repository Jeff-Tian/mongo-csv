export const getKubernetesCpCommands = (collections: string[], namespace = 'namespace', pod = 'pod') =>
  collections.map(file => `kubectl cp ${namespace}/${pod}:${process.cwd()}/${file}.csv ${file}.csv`).join('&&');
