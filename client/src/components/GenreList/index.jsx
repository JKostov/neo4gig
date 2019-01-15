
import React from 'react';
import PropTypes from 'prop-types';
import Genre from '../Genre';
import style from './style.scss';

const GenreList = ({
  genres, changeInterestAction, currentUser, suggestedPeople,
  getSuggestedPeopleAction, changeFollowAction,
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
      />))}
  </div>);

GenreList.defaultProps = {
  genres: [],
  changeInterestAction: () => {},
  currentUser: null,
};

GenreList.propTypes = {
  changeInterestAction: PropTypes.func,
  getSuggestedPeopleAction: PropTypes.func.isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  genres: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  suggestedPeople: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default GenreList;
