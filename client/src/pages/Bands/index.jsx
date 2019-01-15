
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBands } from '../../thunks/band';
import BandList from '../../components/BandList';

class Bands extends Component {
  componentDidMount() {
    const { getBandsAction } = this.props;

    getBandsAction();
  }

  render() {
    const { bands } = this.props;

    if (!bands) {
      return null;
    }

    return <BandList bands={bands} />;
  }
}

Bands.defaultProps = {
  bands: [],
};

Bands.propTypes = {
  getBandsAction: PropTypes.func.isRequired,
  bands: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = ({ band }) => (
  {
    bands: band.get('bands'),
  });


const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getBandsAction: getBands,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Bands),
);
