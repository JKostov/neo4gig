
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Genre = ({
  genre: {
    id, name, description,
  },
}) => (
  <div className={style.card} key={id}>
    <div>{name}</div>
    <div>{description}</div>
  </div>
);

Genre.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Genre;
