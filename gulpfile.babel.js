import WebpackDevServer from 'webpack-dev-server';
import connect from 'gulp-connect';
import del from 'del';
import eslint from 'gulp-eslint';
import glp from 'gulp-load-plugins'
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import {exec} from 'child_process';
import {FRONTEND_DIR, PROJECT, DIST_PATH} from './config';

const plugins = glp();


gulp.task('clean', (cb) => {
  del(`${DIST_PATH}/*`, cb);
});

// The development server (the recommended option for development)
gulp.task('watch', ['webpack-dev-server']);

// Production build
gulp.task('build', ['clean', 'webpack:build', 'css-build']);

gulp.task('webpack:build', (callback) => {
  // modify some webpack config options
  let myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
let myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// compile SCSS to CSS
gulp.task('css-build', () => {
    gulp.src('scss/*.scss')
        .pipe(plugins.sass({
          errLogToConsole : true,
          sourceComments  : 'normal'
        }))
        .on('error', plugins.notify.onError())
        .pipe(plugins.autoprefixer('last 3 versions', '> 2%', 'ff > 23', 'ie > 9')) // vendorize properties for supported browsers
        .pipe(plugins.csso())                                                   // compress
        .pipe(gulp.dest(DIST_PATH))                                // move to target folder
});

// create a single instance of the compiler to allow caching
let devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', (callback) => {
  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  // modify some webpack config options
  let myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, '0.0.0.0', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://0.0.0.0:8080/webpack-dev-server/index.html');
  });
});

gulp.task('lint', () => {
  return gulp.src([`${FRONTEND_DIR}/**/*.js`])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task('compile-test', (callback) => {
  webpack({
    entry: {
      all: `${FRONTEND_DIR}/tests/all.spec.js`,
      runner: `${FRONTEND_DIR}/tests/consoleRunner.spec.js`,
    },
    output: {
      path: path.join(__dirname, 'integration-tests/spec'),
      filename: '[name].spec.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  }, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
    }));
    callback();
  });
});

gulp.task('test-server', () => {
  connect.server();
});
