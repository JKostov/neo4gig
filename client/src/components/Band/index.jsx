
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Band = ({
  band: {
    id, name, description,
  },
}) => (
  <div className={style.card} key={id}>
    <div><strong>{name}</strong></div>
    <div>Description:</div>
    <div>{description}</div>
  </div>
);

Band.propTypes = {
  band: PropTypes.shape({}).isRequired,
};

export default Band;
