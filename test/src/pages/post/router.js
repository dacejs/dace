import { asyncComponent } from 'dace';

export default {
  path: '/post/:id',
  exact: true,
  component: asyncComponent(() => import(/* webpackChunkName: "post" */'.'))
};
