import { asyncComponent } from 'unjs';

export default {
  path: '/',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "home" */'.'))
};
