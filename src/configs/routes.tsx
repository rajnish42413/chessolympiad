import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Ploader from '@components/loader/PLoader';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// const Home = React.lazy(() => import('../screens/home/Home'));
const Register = React.lazy(() => import('../screens/register/index'));
const Document = React.lazy(() => import('../screens/register/document'));
const Payment = React.lazy(() => import('../screens/register/payment'));
const PaymentStatus = React.lazy(() => import('../screens/register/status'));

const publicPaths = [
  { exact: true, path: '/', component: Register },
  { exact: true, path: '/upload-documents', component: Document },
  { exact: true, path: '/payment-deatil', component: Payment },
  { exact: true, path: '/payment-status', component: PaymentStatus }
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
