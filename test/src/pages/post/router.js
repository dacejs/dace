import { asyncComponent } from 'unjs';

export default {
  path: '/post/:id',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "post" */'.'))
};
