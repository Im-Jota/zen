const webpack = require('webpack');
const path = require('path')
const webpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const config = require('../webpack.config.js');

const port = 3000;

config.entry = [
  'webpack/hot/dev-server',
  `webpack-dev-server/client?hot=true&hostname=localhost&port=${port}`,
].concat(config.entry);

const compiler = webpack(config);

const server = new webpackDevServer(
  {
    hot: true,
    liveReload: false,
    client: {
      webSocketTransport: 'sockjs',
    },
    webSocketServer: 'sockjs',
    host: 'localhost',
    port: port,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    devMiddleware: {
      publicPath: `http://localhost:${port}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  }, compiler);

(async () => {
  await server.start();
})();
