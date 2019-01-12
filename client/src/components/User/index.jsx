
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const User = ({ user }) => (
  <div className={style.card} key={user.get('user').get('id')}>
    <div>Name: {user.get('user').get('name')}</div>
    <div>City: {user.get('city')}</div>
    <div>Instrument: {user.get('instrument')}</div>
    <div>Is Musician: {user.get('isMusician').toString()}</div>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default User;
