import validate from 'webpack-validator';
import merge from 'webpack-merge';
import common from './common';
import {postCSS, minifyJS, setFreeVariable} from './lib';

export default validate(
  merge(
    {},
    common,
    postCSS(),
    minifyJS(),
    setFreeVariable('process.env.NODE_ENV', 'production')
  )
);
