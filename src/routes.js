import App from './components/App';
import asyncComponent from './components/AsyncComponent';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncComponent(() => import(/* webpackChunkName: "home" */'./pages/HomePage'))
      },
      {
        path: '/users',
        component: asyncComponent(() => import(/* webpackChunkName: "users" */'./pages/UsersListPage'))
      },
      {
        path: '/posts',
        component: asyncComponent(() => import(/* webpackChunkName: "posts" */'./pages/PostsListPage'))
      },
      {
        component: NotFoundPage
      }
    ]
  }
];
