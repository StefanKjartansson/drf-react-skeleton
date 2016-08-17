import dev from './webpack/dev';
import production from './webpack/production';

module.exports = dev;
if (process.env === 'production') {
  module.exports = production;
}
