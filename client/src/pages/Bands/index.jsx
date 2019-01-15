
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeLikes, getBands, getSuggestedPeople } from '../../thunks/band';
import BandList from '../../components/BandList';
import { changeFollow, getFeed } from '../../thunks/feed';

class Bands extends Component {
  componentDidMount() {
    const { getBandsAction, getFeedAction, user } = this.props;

    getBandsAction();
    getFeedAction(user.get('id'));
  }

  render() {
    const {
      bands, changeLikesAction, currentUser,
      suggestedPeople, getSuggestedPeopleAction, changeFollowAction,
    } = this.props;

    if (!bands || !currentUser) {
      return null;
    }

    return (
      <BandList
        currentUser={currentUser}
        changeLikesAction={changeLikesAction}
        bands={bands}
        suggestedPeople={suggestedPeople}
        getSuggestedPeopleAction={getSuggestedPeopleAction}
        changeFollowAction={changeFollowAction}
      />
    );
  }
}

Bands.defaultProps = {
  bands: [],
  suggestedPeople: [],
  user: null,
  currentUser: null,
};

Bands.propTypes = {
  getBandsAction: PropTypes.func.isRequired,
  bands: PropTypes.arrayOf(PropTypes.shape({})),
  changeLikesAction: PropTypes.func.isRequired,
  getSuggestedPeopleAction: PropTypes.func.isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  getFeedAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  user: PropTypes.shape({}),
  suggestedPeople: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = ({ feed, auth, band }) => (
  {
    user: auth.get('user').get('user'),
    currentUser: feed.get('feed'),
    suggestedPeople: band.get('suggestedPeople'),
    bands: band.get('bands'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getBandsAction: getBands,
    changeLikesAction: changeLikes,
    getSuggestedPeopleAction: getSuggestedPeople,
    changeFollowAction: changeFollow,
    getFeedAction: getFeed,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Bands),
);
