import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../views/home/Home';
import { SignIn } from '../views/sign_in/SignIn';
import { authorizationRoutes } from './authorizationRoutes';
import { root } from './root';
import { welcomeRoutes } from './welcomeRoutes';

export const router = createBrowserRouter([
  root,
  welcomeRoutes,
  {
    path: '/sign_in',
    element: <SignIn />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  // 需要登录才能访问的页面
  authorizationRoutes,
]);
