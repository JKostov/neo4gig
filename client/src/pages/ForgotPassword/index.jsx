
import React from 'react';
import { Grid } from 'semantic-ui-react';
import ForgotPassword from '../../components/ForgotPassword';
import { Segment, Header } from '../../components/elements';

const ForgotPasswordPage = () => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Forgot password" />
      <Segment>
        <ForgotPassword />
      </Segment>
    </Grid.Column>
  </Grid>
);

export default ForgotPasswordPage;
