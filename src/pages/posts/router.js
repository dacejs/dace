import asyncComponent from '../../components/AsyncComponent';

export default {
  path: '/posts',
  component: asyncComponent(() => import(/* webpackChunkName: "posts" */'.'))
};
