
import React from 'react';
import PropTypes from 'prop-types';
import Genre from '../Genre';
import style from './style.scss';

const GenreList = ({ genres, changeInterestAction, currentUser }) => (
    <div className={style.grid}>
      {genres.map(genre => (
        <Genre
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
  currentUser: PropTypes.shape({}),
  genres: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default GenreList;
