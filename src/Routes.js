import App from './layout/App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

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
        path: '/admins',
        component: AdminsListPage
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
