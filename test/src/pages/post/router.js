import { asyncComponent } from 'unjs';

export default {
  path: '/posts/:id',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "post" */'.'))
};
