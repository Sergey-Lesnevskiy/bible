const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    rxjs: require.resolve('rxjs/dist/esm2015/index.js'),
  };

  return config;
};
