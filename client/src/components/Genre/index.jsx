
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Genre = ({
  genre: {
    id, name, description,
  },
}) => (
  <div className={style.card} key={id}>
    <div><strong>{name}</strong></div>
    <div>Description:</div>
    <div>{description}</div>
  </div>
);

Genre.propTypes = {
  genre: PropTypes.shape({}).isRequired,
};

export default Genre;
