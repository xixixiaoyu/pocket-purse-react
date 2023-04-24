import { Outlet } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import {
  ErrorItemsEmpty,
  ErrorUnAuthorized,
} from '../components/ErrorNavigate';
import { Items } from '../views/Items/Items';
import { NewItem } from '../views/newItem/NewItem';
import { Statistics } from '../views/statistics/Statistics';
import { EditTag } from '../views/tags/EditTag';
import { isEmptyData, isUnaAuthorizedLoader } from './loaders';

export const authorizationRoutes: RouteObject = {
  path: '/',
  element: <Outlet />,
  loader: isUnaAuthorizedLoader,
  errorElement: <ErrorUnAuthorized />,
  children: [
    {
      path: '/items',
      element: <Items />,
      loader: isEmptyData,
      errorElement: <ErrorItemsEmpty />,
    },
    {
      path: '/items/new',
      element: <NewItem />,
    },
    {
      path: '/statistics',
      element: <Statistics />,
    },
    {
      path: '/export',
      element: <div>export</div>,
    },
    {
      path: '/tags',
      element: <div>tags</div>,
    },
    {
      path: '/tags/new',
      element: <EditTag type='new' title='新建标签' />,
    },
    {
      path: '/tags/edit/:id',
      element: <EditTag type='edit' title='标签详情' />,
    },
    {
      path: '/reminder',
      element: <div>reminder</div>,
    },
  ],
};
