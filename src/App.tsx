import React from 'react';
import type { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toast } from './components';
import { router } from './routes/router';

export const App: FC = () => {
  return (
    <div h='100%'>
      <Toast />
      <RouterProvider router={router} />
    </div>
  );
};
