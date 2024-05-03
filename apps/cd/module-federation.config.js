module.exports = {
  name: 'cd',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
