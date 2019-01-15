
import React from 'react';
import PropTypes from 'prop-types';
import Event from '../Event';
import style from './style.scss';

const EventList = ({ events, changeAttendanceAction, currentUser }) => (
  <div className={style.grid}>
    {events.map(event => (
      <Event
        currentUser={currentUser}
        changeAttendanceAction={changeAttendanceAction}
        key={event.id}
        event={event}
      />))}
  </div>);

EventList.defaultProps = {
  events: [],
};

EventList.propTypes = {
  changeAttendanceAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default EventList;
