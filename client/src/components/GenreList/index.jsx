
import React from 'react';
import PropTypes from 'prop-types';
import Genre from '../Genre';
import style from './style.scss';

const GenreList = ({ genres }) => (
  <div className={style.grid}>
    {genres.map(genre => <Genre key={genre.id} genre={genre} />)}
  </div>);

GenreList.defaultProps = {
  genres: [],
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired),
};

export default GenreList;
