import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import cssnano from 'cssnano';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import {FRONTEND_DIR, PROJECT, DIST_PATH, SCSS_PATH} from '../config';


const cssnanoConfig = {
  autoprefixer: {
    browsers: browserslist(),
  },
  discardComments: {
    removeAll: true,
  },
  options: {
    safe: true,
    sourcemap: false,
  },
};

export function loadAndExtractCSS() {
  return {
    module: {
      loaders: [
        // extract CSS during build
        {
          test:   /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?errLogToConsole=true'),
        },
      ],
    },
    plugins: [
      // output extracted CSS to a file
      new ExtractTextPlugin(`${PROJECT}.css`), // '[name].[chunkhash].css'
    ],
  };
};

export function postCSS(compressed=true) {
  if (compressed === false) {
    return {
      postcss: function () {
        return [
          autoprefixer(cssnanoConfig.autoprefixer),
        ];
      },
    };
  }

  return {
    postcss: function () {
      return [
        autoprefixer(cssnanoConfig.autoprefixer),
        cssnano(cssnanoConfig),
      ];
    },
  };
};

export function setFreeVariable(key, value) {
  var env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ]
  };
};

export function minifyJS(drop_console=true) {
  return {
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          booleans:     true,
          conditionals: true,
          dead_code:    true,
          drop_console,
          if_return:    true,
          join_vars:    true,
          screw_ie8:    true, // don't support IE 6-8
          sequences:    true,
          unused:       true,
        },
        mangle: {
          screw_ie8:    true,
        }
      }),
    ]
  };
};
