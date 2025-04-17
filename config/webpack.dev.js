const { merge } = require('webpack-merge');
const config = require('../webpack.config.js');

const devWebpack = {
  devServer: {
    port: 3000,
    static: "../dist",
  },
  mode: 'development'
}

module.exports = merge(config, devWebpack);
