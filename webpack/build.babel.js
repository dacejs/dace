import merge from 'webpack-merge';
import base from './base';

export default merge(base, {
  // mode: 'production'
  mode: 'development'
});
