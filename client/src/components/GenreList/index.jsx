
import React from 'react';
import PropTypes from 'prop-types';
import Genre from '../Genre';
import style from './style.scss';

const GenreList = ({
  genres, changeInterestAction, currentUser, suggestedPeople,
  getSuggestedPeopleAction, changeFollowAction, isFeed,
}) => (
  <div className={style.grid}>
    {genres.map(genre => (
      <Genre
        suggestedPeople={suggestedPeople}
        changeFollowAction={changeFollowAction}
        getSuggestedPeopleAction={getSuggestedPeopleAction}
        currentUser={currentUser}
        changeInterestAction={changeInterestAction}
        key={genre.id}
        genre={genre}
        isFeed={isFeed}
      />))}
  </div>);

GenreList.defaultProps = {
  genres: [],
  changeInterestAction: () => {},
  currentUser: null,
  isFeed: false,
};

GenreList.propTypes = {
  changeInterestAction: PropTypes.func,
  getSuggestedPeopleAction: PropTypes.func.isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  genres: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  suggestedPeople: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFeed: PropTypes.bool,
};

export default GenreList;
