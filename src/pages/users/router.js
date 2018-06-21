import asyncComponent from '../../components/AsyncComponent';

export default {
  path: '/users',
  component: asyncComponent(() => import(/* webpackChunkName: "users" */'.'))
};
