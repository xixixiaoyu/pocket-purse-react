import type { FC } from 'react';
import { Navigate, useLocation, useRouteError } from 'react-router-dom';
import { useToastStore } from '../stores';
import { ErrorNoData, ErrorUnauthorized } from '../vars/errors';

export const ErrorUnAuthorized: FC = () => {
  const error = useRouteError();
  const { pathname, search } = useLocation();
  const { openToast } = useToastStore();

  if (error instanceof ErrorUnauthorized) {
    openToast({
      text: '请先登录',
      type: 'error',
      duration: 1000,
    });
    const redirect = encodeURIComponent(`${pathname}${search}`);
    return <Navigate to={`/sign_in?redirect=${redirect}`} replace={true} />;
  }
  return null;
};

export const ErrorItemsEmpty: FC = () => {
  const error = useRouteError();
  if (error instanceof ErrorNoData) {
    return <Navigate to='/home' />;
  }
  return null;
};
