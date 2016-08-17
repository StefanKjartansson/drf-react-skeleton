import merge from 'webpack-merge';
import {loadAndExtractCSS} from './lib';
import {FRONTEND_DIR, PROJECT, DIST_PATH} from '../config';

console.log(FRONTEND_DIR, PROJECT, DIST_PATH);

export default merge(
    {},
    {
      entry: [
        'babel-polyfill',
        `${FRONTEND_DIR}/app.js`,
      ],
      output: {
        path: DIST_PATH,
        filename: `${PROJECT}.js`,
      },
      module: {
        loaders: [
					{test: /\.css$/, loader: "style-loader!css-loader"},
          {
            test:     /\.json$/,
            include:  FRONTEND_DIR,
            loaders:  ['json'],
          },
          {
            test:     /\.js?$/,
            include:  FRONTEND_DIR,
            loaders:  ['babel'],
          },
        ],
      },
      node: {
        'child_process': 'empty',
      },
      resolve:{
        modulesDirectories: [
          FRONTEND_DIR,
          'node_modules',
        ],
      },
    },
    loadAndExtractCSS()
);
