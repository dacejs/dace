import React from 'react';
// import Loadable from 'react-loadable';

/* eslint-disable */

export default [
  {
    component: require('/Users/zhi.zhong/workspace/github/dacejs/dace/dist/core/components/App'),
    routes: [
      {
        path: '/(list|test)/',
        exact: true,
        component: require('/Users/zhi.zhong/workspace/github/dacejs/dace/test/workspace/src/pages/list/index.jsx')
        // component: Loadable({
        //   loader: () => import('/Users/zhi.zhong/workspace/github/dacejs/dace/examples/basic/src/pages/index'),
        //   loading: () => <div>loading...</div>
        // })
      },
      {
        path: '/detail',
        exact: true,
        component: require('/Users/zhi.zhong/workspace/github/dacejs/dace/test/workspace/src/pages/detail.jsx')
        // component: Loadable({
        //   loader: () => import('/Users/zhi.zhong/workspace/github/dacejs/dace/examples/basic/src/pages/users'),
        //   loading: () => <div>loading...</div>
        // })
      }
    ]
  }
];
