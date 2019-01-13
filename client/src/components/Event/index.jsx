
import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import style from './style.scss';

const Event = ({
  event: {
    id, city, dateAndTime,
  },
}) => (
  <div className={style.card} key={id}>
    <div>City: {city}</div>
    <div>Date: {moment(dateAndTime).format('DD:MM:YYYY')}</div>
    <div>Time: {moment(dateAndTime).format('hh:mm')}</div>
  </div>
);

Event.propTypes = {
  event: PropTypes.shape({}).isRequired,
};

export default Event;
