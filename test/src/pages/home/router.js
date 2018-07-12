import { asyncComponent } from 'dace';

export default {
  path: '/',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "home" */'.'))
};
