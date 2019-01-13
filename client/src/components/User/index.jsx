
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const User = ({ user }) => (
  <div className={style.card} key={user.get('id')}>
    <div>Name: {user.get('name')}</div>
    <div>City: {user.get('city')}</div>
    {user.get('isMusician') ? <div>Instrument: {user.get('instrument')}</div> : null}
  </div>
);

User.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default User;
