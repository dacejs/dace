import asyncComponent from '../../components/AsyncComponent';

export default {
  path: '/',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "home" */'.'))
};
