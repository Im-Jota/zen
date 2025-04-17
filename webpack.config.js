const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

function mergeManifest(mainFile, browserFile) {
  const main = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  const browser = JSON.parse(fs.readFileSync(browserFile, 'utf8'));
  return JSON.stringify(merge(main, browser))
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',  // Usando el nuevo módulo de recursos de Webpack 5
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,  // 8 KB, el límite para convertir a base64
          },
        },
      },
    ]
  },
  plugins: [
    new Dotenv({
      path: '.env',
      safe: true,
    }),
    new CopyWebpackPlugin({
    patterns: [
        {
          from: path.join(__dirname, 'manifest', 'main.json'),
          to: path.join(__dirname, 'dist', 'manifest.json'),
          force: true,
          transform(content, path) {
            return Buffer.from(
              mergeManifest(
                './manifest/main.json',
                `./manifest/${process.env.BROWSER == 'firefox' ? 'firefox' : 'chrome'}.json`
              )
            )
          }
        },
        {
          from: path.join(__dirname, 'public', 'icons'),
          to: path.join(__dirname, 'dist')
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: './public/icons/128.png'
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,  // Tamaño mínimo para dividir los chunks
      maxSize: 200000, // Limita el tamaño máximo del chunk
    },
  },
}
