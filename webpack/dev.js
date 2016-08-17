import merge from 'webpack-merge';
import common from './common';
import {postCSS, setFreeVariable} from './lib';


export default merge(
    {},
    common,
    {
      debug:    true,
      devtool:  'eval',
    },
    postCSS(false),
    setFreeVariable('process.env.NODE_ENV', 'development')
);
