const { merge } = require('webpack-merge');
const config = require('../webpack.config.js');

const prodWebpack = {
  mode: 'production'
}

module.exports = merge(config, prodWebpack);
