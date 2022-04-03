import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Ploader from '@components/loader/PLoader';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import Home from '../screens/home/Home';
import Login from '../screens/auth/login';
import Entry from '../screens/register/entry';
import Teams from '../screens/teams';
import TeamView from '../screens/teams/view';

// const Home = React.lazy(() => import('../screens/home/Home'));
const Register = React.lazy(() => import('../screens/register/index'));
const Document = React.lazy(() => import('../screens/register/document'));
const Payment = React.lazy(() => import('../screens/register/payment'));
const PaymentStatus = React.lazy(() => import('../screens/register/status'));

const publicPaths = [
  // { exact: true, path: '/', component: Home },
  { exact: true, path: '/', component: Login },
  { exact: true, path: '/teams/register', component: Entry },
  { exact: true, path: '/teams/entry', component: Register },
  { exact: true, path: '/teams', component: Teams },
  { exact: true, path: '/teams/:id/upload-documents', component: Document },
  { exact: true, path: '/payment-detail', component: Payment },
  { exact: true, path: '/payment-status', component: PaymentStatus },
  { exact: true, path: '/teams/:id/view', component: TeamView }
];

const PublicRoute = ({ path, ...props }: any) => {
  React.useState(nprogress.start());
  useEffect(() => {
    nprogress.done();
    return () => {
      nprogress.start();
    };
  });
  return <Route key={path} path={path} {...props} />;
};

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <PublicRoute key={path} path={path} {...props} />
));

export default () => (
  <BrowserRouter>
    <React.Suspense fallback={<Ploader />}>
      <Switch>
        <Suspense fallback={<div />}>
          {publicRoutes}
          {/* <Route component={NotFound} /> */}
        </Suspense>
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);
