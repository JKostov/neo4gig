
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeInterest, getGenres, getSuggestedPeople } from '../../thunks/genre';
import GenreList from '../../components/GenreList';
import {changeFollow, getFeed} from '../../thunks/feed';

class Genres extends Component {
  componentDidMount() {
    const { getGenresAction, getFeedAction, user } = this.props;

    getGenresAction();
    getFeedAction(user.get('id'));
  }

  render() {
    const {
      genres, changeInterestAction, currentUser,
      getSuggestedPeopleAction, changeFollowAction, suggestedPeople,
    } = this.props;

    if (!genres || !currentUser) {
      return null;
    }

    return (
      <GenreList
        changeInterestAction={changeInterestAction}
        genres={genres}
        suggestedPeople={suggestedPeople}
        currentUser={currentUser}
        getSuggestedPeopleAction={getSuggestedPeopleAction}
        changeFollowAction={changeFollowAction}
      />
    );
  }
}

Genres.defaultProps = {
  genres: [],
  suggestedPeople: [],
  user: null,
  currentUser: null,
};

Genres.propTypes = {
  getGenresAction: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})),
  changeInterestAction: PropTypes.func.isRequired,
  getSuggestedPeopleAction: PropTypes.func.isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  getFeedAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  user: PropTypes.shape({}),
  suggestedPeople: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = ({ auth, feed, genre }) => (
  {
    user: auth.get('user').get('user'),
    currentUser: feed.get('feed'),
    genres: genre.get('genres'),
    suggestedPeople: genre.get('suggestedPeople'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getGenresAction: getGenres,
    changeInterestAction: changeInterest,
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
  )(Genres),
);
