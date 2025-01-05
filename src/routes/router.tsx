/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { rootPaths, privateRoutes } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import Signin from 'pages/authentication/Signin';
import Signup from 'pages/authentication/Signup';

const App = lazy(() => import('App'));
interface ElementItem {
  path: string;
  name: string;
  element: React.ReactNode;
  children?: ElementItem[];
}
const itemRoute = (x: ElementItem) => {
  let result: ElementItem = {
    path: x.path,
    name: x.name,
    element: x.element,
  };
  if (x?.children) {
    result = {
      ...result,
      children: x.children.map((y) => {
        return {
          path: y.path,
          name: y.name,
          element: y.element,
        };
      }),
    };
  }
  return result;
};
const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          ),
          children: [
            // {
            //   index: true,
            //   element: <Dashboard />,
            // },
            ...privateRoutes.map((x) => {
              return {
                ...itemRoute(x)
              };
            }),
          ],
        },
        {
          path: `/${rootPaths.authRoot}`,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: `/${rootPaths.authRoot}/signin`,
              element: <Signin />,
            },
            {
              path: `/${rootPaths.authRoot}/signup`,
              element: <Signup />,
            },
          ],
        },
      ],
    },
  ],
  // {
  //   basename: '/dnx',
  // },
);

export default router;
