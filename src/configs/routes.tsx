import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Ploader from '@components/loader/PLoader';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import * as authToken from '@utils/userAuth';

// import Home from '../screens/home/Home';
import Login from '../screens/auth/login';
import Entry from '../screens/register/entry';
import Teams from '../screens/teams';
import TeamView from '../screens/teams/view';
import NotFoundPage from '..//screens/notFound';
import CommingSoon from '../screens/comming';
import PersonalDetail from '../screens/user/personal';
import FlightDetail from '../screens/user/flight';
import TravelDetail from '../screens/user/travel';
import PreviewReg from '../screens/register/preview';

// const Home = React.lazy(() => import('../screens/home/Home'));
const Register = React.lazy(() => import('../screens/register/index'));
const Document = React.lazy(() => import('../screens/register/document'));
const Payment = React.lazy(() => import('../screens/register/payment'));
const PaymentStatus = React.lazy(() => import('../screens/register/status'));

const publicPaths = [{ exact: true, path: '/', component: Login }];

const privatePaths = [
  { exact: true, path: '/applications/add', component: Entry },
  { exact: true, path: '/teams/entry', component: Register },
  { exact: true, path: '/teams', component: Teams },
  { exact: true, path: '/teams/:id/upload-documents', component: Document },
  { exact: true, path: '/team-preview', component: PreviewReg },
  { exact: true, path: '/payment-detail', component: Payment },
  { exact: true, path: '/payment-status', component: PaymentStatus },
  { exact: true, path: '/teams/:id/view', component: TeamView },
  { exact: true, path: '/personal-detail', component: PersonalDetail },
  { exact: true, path: '/passport-detail', component: FlightDetail },
  { exact: true, path: '/travel-detail', component: TravelDetail }
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

const PrivateRoute = ({ path, ...props }: any) => {
  React.useState(nprogress.start());
  useEffect(() => {
    nprogress.done();
    return () => {
      nprogress.start();
    };
  });
  const token = authToken.get();
  console.log(token);
  return token ? <Route key={path} path={path} {...props} /> : <Redirect to={{ pathname: '/' }} />;
};

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <PublicRoute key={path} path={path} {...props} />
));

const privateRoutes = privatePaths.map(({ path, ...props }) => (
  <PrivateRoute key={path} path={path} {...props} />
));

export default () => (
  <BrowserRouter>
    <React.Suspense fallback={<Ploader />}>
      <Switch>
        {publicRoutes}
        {privateRoutes}
        <Route path="/comming-soon" component={CommingSoon} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);
