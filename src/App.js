//Admin
import { StyledEngineProvider, ThemeProvider } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useState } from 'react';
import DashboardNavbar from 'components/admin/DashboardNavbar';
import DashboardSidebar from 'components/admin/DashboardSidebar';
import GlobalStyles from 'components/admin/GlobalStyles';
import NotFoundA from 'features/admin/NotFound';
import theme2 from './theme';
import pageAdmin from 'features/admin/page';
import { useSelector } from 'react-redux';
//User
import PrivateRoute from 'components/PrivateRoute';
import DefaultLayout from 'components/web/layout/HomePage/DefaultLayout';
import pageGuest from 'features/web/index';
// import pageUser from 'features/web/pageUser';
import NotFound from 'features/web/NotFound';
import React, { Suspense } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Paypal from 'components/web/Paypal/PayPal';
import CheckOut from 'features/web/User/CheckOut';
import UserInfor from 'features/web/User/UserInfor';
import { lazy } from 'react';

import Order from 'features/web/User/Order';

const AccountOverView = lazy(() => import('features/web/User/AccountOverView'));
//admin
const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));
const DashboardLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

function App() {
  //admin
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  // create State
  const user = useSelector((state) => state.user.current);
  // const state = useContext(UserContext);
  // const isAdmin = useSelector((state) => state.user.isAdmin);
  const token = useSelector((state) => state.user.jwt);
  // function
  const showPageGuest = (page) => {
    if (page.length > 0) {
      return page.map((page, index) => <Route key={index} exact={page.exact} path={page.path} component={page.main} />);
    }
  };
  // const showPageUser = (page) => {
  //   if (page.length > 0) {
  //     return page.map((page, index) => (
  //       <PrivateRoute key={index} path={page.path}>
  //         {page.main}
  //       </PrivateRoute>
  //     ));
  //   }
  // };
  const showPageAdmin = (page) => {
    if (page.length > 0) {
      return page.map((page, index) => <Route key={index} exact={page.exact} path={page.path} component={page.main} />);
    }
  };
  return (
    <Router>
      <Suspense fallback>
        {user.role !== 'admin' && (
          <DefaultLayout>
            <Switch>
              {showPageGuest(pageGuest)}
              <PrivateRoute path={'/checkout'}>
                <CheckOut />
              </PrivateRoute>
              <PrivateRoute path={'/paypal'}>
                <Paypal />
              </PrivateRoute>
              <PrivateRoute path={'/order'}>
                <Order />
              </PrivateRoute>
              <PrivateRoute path={'/myaccount'}>
                <AccountOverView />
              </PrivateRoute>
              <PrivateRoute path={'/editaccount'}>
                <UserInfor />
              </PrivateRoute>
              <PrivateRoute path={'/addresses'}>
                <AccountOverView />
              </PrivateRoute>
              <Route path="/*" component={NotFound} exact />
              <Redirect to="/" from="/" />
            </Switch>
          </DefaultLayout>
        )}
        {user.role === 'admin' && (
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme2}>
              <GlobalStyles />
              <DashboardLayoutRoot>
                <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
                <DashboardSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
                <DashboardLayoutWrapper>
                  <DashboardLayoutContainer>
                    <DashboardLayoutContent>
                      <Router>
                        <Switch>
                          {showPageAdmin(pageAdmin)}
                          <Route path="/*" component={NotFoundA} exact />
                          <Redirect to="/" from="/" />
                        </Switch>
                      </Router>
                    </DashboardLayoutContent>
                  </DashboardLayoutContainer>
                </DashboardLayoutWrapper>
              </DashboardLayoutRoot>
            </ThemeProvider>
          </StyledEngineProvider>
        )}

      </Suspense>
    </Router>
  );
}

export default App;
