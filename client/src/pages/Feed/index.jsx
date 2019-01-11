
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Feed extends Component {

  render() {
    return (<div>Feed</div>);
  }
}

Feed.propTypes = {
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Feed),
);
