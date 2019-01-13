
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
  events: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default EventList;
