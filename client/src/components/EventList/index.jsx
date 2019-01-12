
import React from 'react';
import PropTypes from 'prop-types';
import Event from '../Event';
import style from './style.scss';

const EventList = ({ events }) => (
  <div className={style.grid}>
    {events.map(event => <Event key={event.id} event={event} />)}
  </div>);

EventList.defaultProps = {
  events: [],
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired),
};

export default EventList;
