import App from './layout/App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import PostsListPage from './pages/PostsListPage';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage
      },
      {
        path: '/posts',
        component: PostsListPage
      },
      {
        path: '/users',
        component: UsersListPage
      },
      {
        component: NotFoundPage
      }
    ]
  }
];
