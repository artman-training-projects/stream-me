module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exlude: /node_modules/,
      use: [options.defaultLoaders.babel, {loader: 'graphql-let/loader'}],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exlude: /node_modules/,
      use: [options.defaultLoaders.babel, {loader: 'graphql-let/loader'}],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    });

    return config;
  },
};