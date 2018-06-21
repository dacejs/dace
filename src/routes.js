import App from './components/App';
import NotFoundPage from './pages/notFound';
import home from './pages/home/router';
import users from './pages/users/router';
import posts from './pages/posts/router';

export default [
  {
    component: App,
    routes: [
      home,
      users,
      posts,
      {
        component: NotFoundPage
      }
    ]
  }
];
