
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ResetPassword from '../../components/ChangePassword';
import { resetPassword, verifyToken } from '../../api/auth';
import { Segment, Header } from '../../components/elements';

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;

    verifyToken(token).catch(() => <Redirect to="/login" />);
  }

  onSubmit({ password }) {
    const {
      match: {
        params: { token },
      },
    } = this.props;

    return resetPassword(password, token);
  }

  render() {
    const {
      history: { push },
    } = this.props;
    return (
      <Grid stackable centered columns={2}>
        <Grid.Column>
          <Header header="Reset password" />
          <Segment>
            <ResetPassword onSubmit={this.onSubmit} push={push} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ResetPasswordPage);
