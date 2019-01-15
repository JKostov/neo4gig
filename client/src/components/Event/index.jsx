
import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import style from './style.scss';

const Event = ({
  event: {
    id, city, dateAndTime, users,
  }, currentUser, changeAttendanceAction,
}) => (
  <div className={style.card} key={id}>
    <div>City: {city}</div>
    <div>Date: {moment(dateAndTime).format('DD:MM:YYYY')}</div>
    <div>Time: {moment(dateAndTime).format('hh:mm')}</div>
    {currentUser && (
    <Button
      onClick={() => changeAttendanceAction(currentUser.get('id'), currentUser.get('neoId'), id)}
      content={
        users && users.filter(({ id: userId }) => userId === currentUser.get('neoId')).length > 0
          ? 'Leave'
          : 'Attend'
      }
    />
    )}
  </div>
);

Event.defaultProps = {
  changeAttendanceAction: () => {},
  currentUser: null,
};

Event.propTypes = {
  changeAttendanceAction: PropTypes.func,
  currentUser: PropTypes.shape({}),
  event: PropTypes.shape({}).isRequired,
};

export default Event;
