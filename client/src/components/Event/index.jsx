
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Event = ({
  event: {
    id, venue, date, time,
  },
}) => (
  <div className={style.card} key={id}>
    <div>{venue}</div>
    <div>{date}</div>
    <div>{time}</div>
  </div>
);

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
