import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import Loadable from 'react-loadable';
import AppLayout from '../components/AppLayout';
import MostAnticipated from '../pages/MostAnticipated';
import Genres from '../pages/Genres';
import Feed from '../pages/Feed';

const dynamicImport = loader =>
  Loadable({
    loader,
    loading: () => <Loader active inline="centered" />,
  });

const AdminRoutes = () => <Route path="/admin" render={() => 'Admin route'} />;

const LoggedInList = ({ isAdmin }) => (
  <Switch>
    <Route exact path="/" component={MostAnticipated} />
    <Route exact path="/genres" component={dynamicImport(() => import('../pages/Genres'))} />
    <Route exact path="/feed" component={dynamicImport(() => import('../pages/Feed'))} />
    <Route path="/logout" component={dynamicImport(() => import('../components/Logout'))} />
    {isAdmin && <AdminRoutes />}
    <Redirect to="/" />
  </Switch>
);

LoggedInList.propTypes = {
  isAdmin: PropTypes.bool,
};

LoggedInList.defaultProps = {
  isAdmin: false,
};

const LoggedOutList = () => (
  <Switch>
    <Route exact path="/login" component={dynamicImport(() => import('../pages/Login'))} />
    <Route exact path="/register" component={dynamicImport(() => import('../pages/Register'))} />
    <Route
      exact
      path="/forgot-password"
      component={dynamicImport(() => import('../pages/ForgotPassword'))}
    />
    <Route
      path="/reset-password/:token"
      component={dynamicImport(() => import('../pages/ResetPassword'))}
    />
    <Redirect to="/login" />
  </Switch>
);

const Routes = ({ isLoggedIn, isAdmin }) => (
  <AppLayout isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
    {isLoggedIn ? <LoggedInList isAdmin={isAdmin} /> : <LoggedOutList />}
  </AppLayout>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

Routes.defaultProps = {
  isLoggedIn: null,
  isAdmin: false,
};

const mapStateToProps = ({ auth }) => ({
  isAdmin: auth.getIn(['user', 'isAdmin']),
  isLoggedIn: !!auth.get('token'),
});

export default withRouter(connect(mapStateToProps)(Routes));
