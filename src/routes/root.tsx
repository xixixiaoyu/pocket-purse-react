import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ErrorPage } from '../components';

const Root = lazy(() => import('../views/Root'));

export const root: RouteObject = {
  path: '/',
  element: <Root />,
  errorElement: <ErrorPage />,
};
