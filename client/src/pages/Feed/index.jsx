
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../../components/User';

class Feed extends Component {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <User user={user} />
      </Fragment>);
  }
}

Feed.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => (
  {
    user: auth.get('user').get('user'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Feed),
);
