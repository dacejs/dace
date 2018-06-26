import asyncComponent from 'unjs/lib/components/AsyncComponent';

export default {
  path: '/',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "home" */'.'))
};
