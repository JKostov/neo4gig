
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Profile = ({ user }) => (
  <div className={style.card} key={user.id}>
    <div>Name: {user.name}</div>
    <div>City: {user.city}</div>
    {user.isMusician ? <div>Instrument: {user.instrument}</div> : null}
  </div>
);

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default Profile;
