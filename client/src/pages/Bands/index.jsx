
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeLikes, getBands } from '../../thunks/band';
import BandList from '../../components/BandList';

class Bands extends Component {
  componentDidMount() {
    const { getBandsAction } = this.props;

    getBandsAction();
  }

  render() {
    const { bands, changeLikesAction, currentUser } = this.props;

    return (
      <BandList
        currentUser={currentUser}
        changeLikesAction={changeLikesAction}
        bands={bands}
      />
    );
  }
}

Bands.defaultProps = {
  bands: [],
};

Bands.propTypes = {
  getBandsAction: PropTypes.func.isRequired,
  bands: PropTypes.arrayOf(PropTypes.shape({})),
  changeLikesAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth, band }) => (
  {
    currentUser: auth.get('user').get('user'),
    bands: band.get('bands'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getBandsAction: getBands,
    changeLikesAction: changeLikes,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Bands),
);
