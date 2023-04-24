import { redirect } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { WelcomeLayout } from '../layouts';
import { WELCOME_PAGE_NUMS } from '../vars/welcome';
import { Welcome } from '../views/welcome/Welcome';

export const welcomeRoutes: RouteObject = {
  path: '/welcome',
  element: <WelcomeLayout />,
  loader: ({ request }) => {
    const num = request.url.match(/\/welcome\/(\d+)/)?.[1];
    if (!num || !WELCOME_PAGE_NUMS.includes(num as Welcome.pageNum)) {
      return redirect('/welcome/1');
    }
    return null;
  },
  children: [
    {
      path: ':num',
      element: <Welcome />,
    },
  ],
};
