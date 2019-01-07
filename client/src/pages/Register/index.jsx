
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Register from '../../components/Register';
import Header from '../../components/elements/Header';

const RegisterPage = ({ history: { push } }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Register" />
      <Segment>
        <Register push={push} />
      </Segment>
    </Grid.Column>
  </Grid>
);

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(RegisterPage);
