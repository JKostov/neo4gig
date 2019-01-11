
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Genres extends Component {

  render() {
    return (<div>Genres</div>);
  }
}

Genres.propTypes = {
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
  )(Genres),
);
