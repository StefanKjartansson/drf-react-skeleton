import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import {FRONTEND_DIR, PROJECT, DIST_PATH} from './config';

module.exports = {
  entry: `${FRONTEND_DIR}/app.js`,
  output: {
    path: path.join(__dirname, DIST_PATH),
    publicPath: DIST_PATH,
    filename: `${PROJECT}.js`
  },
  module: {
    loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {stage: 0},
    }
    ]
  },
  plugins: [
    new CompressionPlugin({
        asset: "{file}.gz",
        algorithm: "gzip",
        regExp: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ],
  node: {
   "child_process": "empty"
 }
};
