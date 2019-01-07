
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Header } from '../../components/elements';
import { login } from '../../thunks/auth';
import Login from '../../components/Login';

const LoginPage = ({ loginAction, history: { push } }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Login" />
      <Segment>
        <Login push={push} login={loginAction} />
      </Segment>
    </Grid.Column>
  </Grid>
);

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginAction: login,
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(LoginPage),
);
